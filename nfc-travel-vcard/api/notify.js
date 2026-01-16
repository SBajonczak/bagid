const Mailgun = require('mailgun.js');
const formData = require('form-data');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    try {
        // Validate request body
        if (!req.body || !req.body.to || !req.body.message || !req.body.location) {
            context.res = {
                status: 400,
                body: { error: "Missing required fields" }
            };
            return;
        }
        
        const { to, message, location, mapUrl } = req.body;

        if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
            context.res = {
                status: 500,
                body: { error: 'Mailgun is not configured (missing MAILGUN_API_KEY or MAILGUN_DOMAIN).' }
            };
            return;
        }

        // Create email content
        const subject = "Your Bag-Tag: Someone found your luggage";
        const htmlBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #0066cc;">Good news! Someone found your luggage</h2>
                
                <p>Someone scanned your Bag-Tag and wants to get in touch with you about your luggage.</p>
                
                <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="margin-top: 0;">Message:</h3>
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
                
                <h3>Their Location:</h3>
                <p>
                    <a href="${mapUrl}" style="color: #0066cc; text-decoration: none;">
                        View on Google Maps
                    </a>
                </p>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                    <p style="color: #666; font-size: 14px;">
                        This message was sent via your Bag-Tag.<br>
                        © ${new Date().getFullYear()} Bag-Tag.de
                    </p>
                </div>
            </div>
        `;

        // Send email using Mailgun
        const mailgun = new Mailgun(formData);
        const mg = mailgun.client({
            username: 'api',
            key: process.env.MAILGUN_API_KEY,
            url: process.env.MAILGUN_API_BASE || 'https://api.mailgun.net'
        });

        await mg.messages.create(process.env.MAILGUN_DOMAIN, {
            from: process.env.MAILGUN_FROM || `Bag-Tag <mailgun@${process.env.MAILGUN_DOMAIN}>`,
            to,
            subject,
            html: htmlBody
        });
        
        context.res = {
            status: 200,
            body: { success: true, message: "Notification sent successfully" }
        };
    } catch (error) {
        context.log.error('Error sending notification:', error);
        
        context.res = {
            status: 500,
            body: { 
                error: "Failed to send notification",
                details: error.message
            }
        };
    }
};
