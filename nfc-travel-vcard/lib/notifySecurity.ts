import { createHmac, randomBytes } from 'crypto';

export interface SecurityTokenPayload {
  tagId: string;
  timestamp: number;
  randomValue: string;
  expires: number;
  signature: string;
}

const DEFAULT_TTL_MS = 10 * 60 * 1000;

function getSecret(): string {
  const secret = process.env.NOTIFY_TOKEN_SECRET || process.env.FUNCTION_APP_SECRET;
  if (!secret) {
    throw new Error('NOTIFY_TOKEN_SECRET is not configured.');
  }
  return secret;
}

function signPayload(secret: string, tagId: string, timestamp: number, randomValue: string): string {
  const hmac = createHmac('sha256', secret);
  hmac.update(`${tagId}:${timestamp}:${randomValue}`);
  return hmac.digest('hex');
}

export function generateSecurityToken(tagId: string, ttlMs: number = DEFAULT_TTL_MS): string {
  if (!tagId) {
    throw new Error('tagId is required to create a security token.');
  }

  const secret = getSecret();
  const timestamp = Date.now();
  const randomValue = randomBytes(32).toString('hex');
  const expires = timestamp + ttlMs;
  const signature = signPayload(secret, tagId, timestamp, randomValue);

  const payload: SecurityTokenPayload = {
    tagId,
    timestamp,
    randomValue,
    expires,
    signature
  };

  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

export function verifySecurityToken(token: string, expectedTagId: string): SecurityTokenPayload {
  if (!token) {
    throw new Error('Missing security token.');
  }

  const secret = getSecret();
  let payload: SecurityTokenPayload;

  try {
    payload = JSON.parse(Buffer.from(token, 'base64').toString());
  } catch (error) {
    throw new Error('Malformed security token.');
  }

  if (payload.tagId!==expectedTagId) {
    throw new Error('Security token does not match requested tag.');
  }

  if (payload.expires < Date.now()) {
    throw new Error('Security token expired.');
  }

  const expectedSignature = signPayload(secret, payload.tagId, payload.timestamp, payload.randomValue);
  if (expectedSignature!==payload.signature) {
    throw new Error('Security token signature mismatch.');
  }

  return payload;
}
