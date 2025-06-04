const crypto = require('crypto');

module.exports = async function (context, req) {
    const tagId = context.bindingData.tagId;
    
    // Validate tagId
    if (!tagId || typeof tagId !== 'string' || tagId.length < 5) {
        context.res = {
            status: 400,
            body: { error: "Invalid tag ID" }
        };
        return;
    }
    
    try {
        // Generate a random token with timestamp
        const timestamp = Date.now();
        const randomBytes = crypto.randomBytes(32).toString('hex');
        
        // Create HMAC signature using your function app's secret
        const hmac = crypto.createHmac('sha256', process.env.FUNCTION_APP_SECRET);
        hmac.update(`${tagId}:${timestamp}:${randomBytes}`);
        const signature = hmac.digest('hex');
        
        // Create a token that expires in 10 minutes
        const token = Buffer.from(JSON.stringify({
            tagId,
            timestamp,
            randomValue: randomBytes,
            signature,
            expires: timestamp + (10 * 60 * 1000) // 10 minutes
        })).toString('base64');
        
        context.res = {
            body: { token }
        };
    } catch (error) {
        context.log.error('Error generating security token:', error);
        
        context.res = {
            status: 500,
            body: { 
                error: "Failed to generate security token",
                details: error.message
            }
        };
    }
};
