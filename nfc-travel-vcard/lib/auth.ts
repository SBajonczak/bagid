import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const tenant = process.env.AZURE_B2C_TENANT || "bagtagauth";
const policy = process.env.AZURE_B2C_POLICY || "B2C_1_susi";

const client = jwksClient({
  jwksUri: `https://${tenant}.b2clogin.com/${tenant}.onmicrosoft.com/${policy}/discovery/v2.0/keys`
});

function getKey(header: unknown, callback: jwt.SigningKeyCallback) {
  //@ts-expect-error kid will not be undefined
  client.getSigningKey(header.kid, function (err, key) {
    if (err) {
      console.error('Error getting signing key:', err);
      return callback(err);
    }
    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
}

export interface TokenPayload {
  sub: string;
  email?: string;
  name?: string;
  aud: string;
  iss: string;
}

export async function verifyToken(request: NextRequest): Promise<TokenPayload | null> {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];

  return new Promise((resolve) => {
    jwt.verify(token, getKey, {
      audience: "2e08ce02-4722-4efe-b6de-c98b201907ab",
      issuer: `https://bagtagauth.b2clogin.com/430cd0a4-c177-46a9-8eff-cc6ecd09c9a2/v2.0/`
    }, (err, decoded) => {
      if (err) {
        console.error('Token verification error:', err);
        resolve(null);
      } else {
        resolve(decoded as TokenPayload);
      }
    });
  });
}
