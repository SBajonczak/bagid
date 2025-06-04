const nodemailer = require('nodemailer');
const crypto = require('crypto');
const axios = require('axios');

// In-memory rate limiting (replace with Azure Redis Cache for production)
const ipLimiter = new Map();
const tagLimiter = new Map();

module.exports = async function (context, req) {
    try {
        const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        
        // Check IP rate limiting (max 5 requests per hour)
        const ipKey = `${clientIp}`;
        const now = Date.now();
        const hourAgo = now - (60 * 60 * 1000);
        
        // Clean up old entries
        ipLimiter.forEach((value, key) => {
            if (value.timestamp < hourAgo) ipLimiter.delete(key);
        });
        
        const ipRequests = ipLimiter.get(ipKey) || { count: 0, timestamp: now };
        
        if (ipRequests.count >= 5) {
            context.res = {
                status: 429,
                body: { message: "Too many requests. Try again later." }
            };
            return;
        }
        
        ipLimiter.set(ipKey, { count: ipRequests.count + 1, timestamp: now });
        
        // Validate required fields
        if (!req.body || !req.body.tagId || !req.body.message || 
            !req.body.location || !req.body.captchaToken || !req.headers['x-security-token']) {
            context.res = {
                status: 400,
                body: { message: "Missing required fields" }
            };
            return;
        }
        
        const { tagId, message, location, captchaToken, timestamp } = req.body;
        const securityToken = req.headers['x-security-token'];
        
        // Validate security token
        let tokenData;
        try {
            tokenData = JSON.parse(Buffer.from(securityToken, 'base64').toString());
            
            // Check if token is expired
            if (tokenData.expires < Date.now()) {
                throw new Error('Token expired');
            }
            
            // Verify token signature
            const hmac = crypto.createHmac('sha256', process.env.FUNCTION_APP_SECRET);
            hmac.update(`${tokenData.tagId}:${tokenData.timestamp}:${tokenData.randomValue}`);
            const signature = hmac.digest('hex');
            
            if (signature !== tokenData.signature || tokenData.tagId !== tagId) {
                throw new Error('Invalid token');
            }
        } catch (error) {
            context.res = {
                status: 401,
                body: { message: "Invalid security token" }
            };
            return;
        }
        
        // Verify reCAPTCHA
        const recaptchaResponse = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            null,
            {
                params: {
                    secret: process.env.RECAPTCHA_SECRET_KEY,
                    response: captchaToken
                }
            }
        );
        
        if (!recaptchaResponse.data.success) {
            context.res = {
                status: 403,
                body: { message: "CAPTCHA verification failed" }
            };
            return;
        }
        
        // Check tag rate limiting (max 3 notifications per day per tag)
        const tagKey = `${tagId}`;
        const dayAgo = now - (24 * 60 * 60 * 1000);
        
        // Clean up old entries
        tagLimiter.forEach((value, key) => {
            if (value.timestamp < dayAgo) tagLimiter.delete(key);
        });
        
        const tagRequests = tagLimiter.get(tagKey) || { count: 0, timestamp: now };
        
        if (tagRequests.count >= 3) {
            context.res = {
                status: 429,
                body: { message: "This tag has received too many notifications today." }
            };
            return;
        }
        
        tagLimiter.set(tagKey, { count: tagRequests.count + 1, timestamp: now });
        
        // Fetch owner's email from database
        let ownerEmail;
        try {
            // In a real implementation, we would look this up in the database
            // Here we're just using the tagId as an example
            const tagDataResponse = await context.df.callActivity('GetTagData', tagId);
            ownerEmail = tagDataResponse.ownerEmail;
            
            if (!ownerEmail) {
                throw new Error('Owner email not found');
            }
        } catch (error) {
            context.res = {
                status: 404,
                body: { message: "Could not find owner information" }
            };
            return;
        }
        
        // Sanitize message
        const sanitizedMessage = message
            .trim()
            .substring(0, 500) // Limit length
            .replace(/<[^>]*>?/gm, ''); // Remove HTML tags
            
        // Generate Google Maps link for directions
        const directionsUrl = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
        
        // Create email content
        const subject = "Your Bag-Tag: Someone found your luggage";
        const htmlBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #0066cc;">Good news! Someone found your luggage</h2>
                
                <p>Someone scanned your Bag-Tag and wants to get in touch with you about your luggage.</p>
                
                <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="margin-top: 0;">Message:</h3>
                    <p style="white-space: pre-wrap;">${sanitizedMessage}</p>
                </div>
                
                <h3>Their Location:</h3>
                <p>
                    <a href="${directionsUrl}" style="color: #0066cc; text-decoration: none;">
                        View on Google Maps
                    </a>
                </p>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                    <p style="color: #666; font-size: 14px;">
                        This message was sent via your Bag-Tag.<br>
                        Tag ID: ${tagId}<br>
                        © ${new Date().getFullYear()} Bag-Tag.de
                    </p>
                </div>
            </div>
        `;
        
        // Configure email transport
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        
        // Send email
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: ownerEmail,
            subject,
            html: htmlBody
        });
        
        // Log the notification for audit purposes
        context.log.info(`Notification sent for tag ${tagId} from IP ${clientIp}`);
        
        context.res = {
            status: 200,
            body: { success: true, message: "Notification sent successfully" }
        };
    } catch (error) {
        context.log.error('Error sending notification:', error);
        
        context.res = {
            status: 500,
            body: { 
                message: "Failed to send notification",
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            }
        };
    }
};
