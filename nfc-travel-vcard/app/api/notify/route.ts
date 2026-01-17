import { NextRequest, NextResponse } from 'next/server';
import FormData from 'form-data';

//@ts-expect-error Missing types
import Mailgun, { IMailgunClient } from 'mailgun.js';
import { Twilio } from 'twilio';
import { TagRepo } from '@/lib/TagRepo';
import { verifySecurityToken } from '@/lib/notifySecurity';
import { getConfig } from '@/lib/config';

export const runtime = 'nodejs';

type ChannelKey = 'email' | 'sms';

type ChannelSelection = Partial<Record<ChannelKey, boolean>>;

type ChannelReport = {
  attempted: boolean;
  delivered: boolean;
  error?: string;
};

type NotifyRequestBody = {
  tagId: string;
  message: string;
  location: { lat: number; lng: number };
  mapUrl?: string;
  captchaToken: string;
  timestamp?: number;
  channels?: ChannelSelection;
};

const ipLimiter = new Map<string, { count: number; timestamp: number }>();
const tagLimiter = new Map<string, { count: number; timestamp: number }>();

let cachedMailgunClient: IMailgunClient | null = null;
let cachedTwilioClient: Twilio | null = null;

export async function POST(request: NextRequest) {
  const config = getConfig();
  const clientIp = extractClientIp(request);

  if (!consumeToken(ipLimiter, clientIp, config.rateLimit.ipLimit, config.rateLimit.ipWindowMs)) {
    return NextResponse.json(
      { message: 'Too many requests from this IP. Please try again later.' },
      { status: 429 }
    );
  }

  let body: NotifyRequestBody;

  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { message: 'Invalid JSON payload.' },
      { status: 400 }
    );
  }

  const validationError = validateRequestBody(body);
  if (validationError) {
    return NextResponse.json(
      { message: validationError },
      { status: 400 }
    );
  }

  const securityToken = request.headers.get('x-security-token');
  if (!securityToken) {
    return NextResponse.json(
      { message: 'Missing security token.' },
      { status: 401 }
    );
  }

  try {
    verifySecurityToken(securityToken, body.tagId);
  } catch (error) {
    return NextResponse.json(
      { message: 'Invalid security token.' },
      { status: 401 }
    );
  }

  if (body.timestamp) {
    const drift = Math.abs(Date.now() - body.timestamp);
    if (drift > config.notification.timestampDriftMs) {
      return NextResponse.json(
        { message: 'Notification request expired.' },
        { status: 408 }
      );
    }
  }

  let captchaOk = true;
  if (config.features.recaptchaValidation) {
    try {
      captchaOk = await verifyRecaptcha(body.captchaToken, config.security.recaptchaSecretKey);
    } catch (error) {
      console.error('reCAPTCHA error:', error);
      return NextResponse.json(
        { message: 'CAPTCHA verification failed.' },
        { status: 500 }
      );
    }

    if (!captchaOk) {
      return NextResponse.json(
        { message: 'CAPTCHA verification failed.' },
        { status: 403 }
      );
    }
  }

  if (!consumeToken(tagLimiter, body.tagId, config.rateLimit.tagLimit, config.rateLimit.tagWindowMs)) {
    return NextResponse.json(
      { message: 'This tag has received too many notifications today.' },
      { status: 429 }
    );
  }

  const repo = new TagRepo();
  const tagData = await repo.getTravelDataByTagId(body.tagId);

  if (!tagData) {
    return NextResponse.json(
      { message: 'Could not find owner information.' },
      { status: 404 }
    );
  }

  const ownerEmail = typeof tagData.ownerEmail === 'string' ? tagData.ownerEmail.trim() : '';
  const ownerMobile = typeof tagData.ownerMobile === 'string' ? tagData.ownerMobile.trim() : '';

  const requestedChannels = normalizeChannelSelection(body.channels, {
    email: Boolean(ownerEmail) && config.email.enabled && config.features.emailNotifications,
    sms: Boolean(ownerMobile) && config.sms.enabled && config.features.smsNotifications
  });

  if (!requestedChannels.email && !requestedChannels.sms) {
    return NextResponse.json(
      { message: 'No reachable contact channel is available for this owner.' },
      { status: 422 }
    );
  }

  const sanitizedMessage = sanitizeMessage(body.message, config.notification.maxMessageLength);
  const locationLink = normalizeMapUrl(body.mapUrl, body.location);
  const warnings: string[] = [];

  const channelReports: Record<ChannelKey, ChannelReport> = {
    email: {
      attempted: requestedChannels.email,
      delivered: false
    },
    sms: {
      attempted: requestedChannels.sms,
      delivered: false
    }
  };

  if (requestedChannels.email && ownerEmail) {
    try {
      const mailgunClient = getMailgunClient(config.email);
      const emailData = {
        from: config.email.fromName 
          ? `${config.email.fromName} <${config.email.fromEmail}>`
          : config.email.fromEmail,
        to: [ownerEmail],
        subject: 'Your Bag-Tag: Someone found your luggage',
        html: buildEmailHtml(sanitizedMessage, body.tagId, body.location, locationLink),
        text: buildEmailText(sanitizedMessage, body.tagId, body.location, locationLink)
      };
      
      await mailgunClient.messages.create(config.email.domain, emailData);
      channelReports.email.delivered = true;
    } catch (error) {
      console.error('Mailgun error:', error);
      warnings.push(parseChannelError('Email', error));
      channelReports.email.error = 'Email delivery failed.';
    }
  }

  if (requestedChannels.sms && ownerMobile) {
    try {
      const smsClient = getTwilioClient(config.sms);
      await smsClient.messages.create({
        body: buildSmsBody(sanitizedMessage, body.tagId, locationLink),
        to: ownerMobile,
        from: config.sms.fromNumber
      });
      channelReports.sms.delivered = true;
    } catch (error) {
      console.error('Twilio error:', error);
      warnings.push(parseChannelError('SMS', error));
      channelReports.sms.error = 'SMS delivery failed.';
    }
  }

  const delivered =
    (channelReports.email.attempted && channelReports.email.delivered) ||
    (channelReports.sms.attempted && channelReports.sms.delivered);

  if (!delivered) {
    return NextResponse.json(
      {
        success: false,
        message: 'Notification could not be delivered.',
        channels: channelReports,
        warnings
      },
      { status: 502 }
    );
  }

  const successMessage = buildSuccessMessage(channelReports);

  return NextResponse.json({
    success: true,
    message: successMessage,
    channels: channelReports,
    warnings: warnings.length ? warnings : undefined
  });
}

function validateRequestBody(body: Partial<NotifyRequestBody>): string | null {
  if (!body.tagId || typeof body.tagId!== 'string') {
    return 'tagId is required.';
  }

  if (!body.message || typeof body.message!== 'string') {
    return 'message is required.';
  }

  if (
    !body.location ||
    typeof body.location.lat!== 'number' ||
    typeof body.location.lng!== 'number' ||
    !Number.isFinite(body.location.lat) ||
    !Number.isFinite(body.location.lng)
  ) {
    return 'location.lat and location.lng are required.';
  }

//   if (!body.captchaToken || typeof body.captchaToken!== 'string') {
//     return 'CAPTCHA token is required.';
//   }

  return null;
}

function sanitizeMessage(message: string, maxLength: number): string {
  return message
    .trim()
    .slice(0, maxLength)
    .replace(/<[^>]*>?/gm, '');
}

function normalizeMapUrl(mapUrl: string | undefined, location: { lat: number; lng: number }) {
  if (mapUrl && /^https?:\/\//i.test(mapUrl)) {
    return mapUrl;
  }
  return `https://www.google.com/maps?q=${location.lat},${location.lng}`;
}

function normalizeChannelSelection(
  selection: ChannelSelection | undefined,
  availability: Record<ChannelKey, boolean>
): Record<ChannelKey, boolean> {
  return {
    email: availability.email && (selection?.email ?? true),
    sms: availability.sms && (selection?.sms ?? true)
  };
}

function extractClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  return 'unknown';
}

function consumeToken(
  store: Map<string, { count: number; timestamp: number }>,
  key: string,
  limit: number,
  windowMs: number
) {
  const now = Date.now();
  const windowStart = now - windowMs;

  for (const [entryKey, value] of store) {
    if (value.timestamp < windowStart) {
      store.delete(entryKey);
    }
  }

  const entry = store.get(key) || { count: 0, timestamp: now };
  if (entry.count >= limit) {
    return false;
  }

  store.set(key, { count: entry.count + 1, timestamp: now });
  return true;
}

async function verifyRecaptcha(token: string, secret: string): Promise<boolean> {
  if (!secret) {
    throw new Error('RECAPTCHA_SECRET_KEY is not configured.');
  }

  const params = new URLSearchParams();
  params.append('secret', secret);
  params.append('response', token);

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  });

  if (!response.ok) {
    return false;
  }

  const data = await response.json();
  return Boolean(data.success);
}

function getMailgunClient(emailConfig: { apiKey: string; domain: string }): IMailgunClient {
  if (cachedMailgunClient) {
    return cachedMailgunClient;
  }

  if (!emailConfig.apiKey || !emailConfig.domain) {
    throw new Error('Mailgun is not configured.');
  }

  const mailgun = new Mailgun(FormData);
  cachedMailgunClient = mailgun.client({
    username: 'api',
    key: emailConfig.apiKey
  });
  
  return cachedMailgunClient;
}

function getTwilioClient(smsConfig: { accountSid: string; authToken: string }): Twilio {
  if (cachedTwilioClient) {
    return cachedTwilioClient;
  }

  if (!smsConfig.accountSid || !smsConfig.authToken) {
    throw new Error('Twilio is not configured.');
  }

  cachedTwilioClient = new Twilio(smsConfig.accountSid, smsConfig.authToken);
  return cachedTwilioClient;
}

function buildEmailHtml(
  message: string,
  tagId: string,
  location: { lat: number; lng: number },
  mapUrl: string
) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0066cc;">Someone found your luggage</h2>
      <p>A finder scanned your Bag-Tag and sent the following message:</p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
      <p><strong>Finder location:</strong> ${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}</p>
      <p>
        <a href="${mapUrl}" style="color: #0066cc; text-decoration: none;">
          View on Google Maps
        </a>
      </p>
      <p style="margin-top: 24px; font-size: 13px; color: #666;">
        Tag ID: ${tagId}<br />
        Sent via Bag-Tag notification service.
      </p>
    </div>
  `;
}

function buildEmailText(
  message: string,
  tagId: string,
  location: { lat: number; lng: number },
  mapUrl: string
) {
  return [
    'Someone found your luggage.',
    'Message:',
    message,
    '',
    `Location: ${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`,
    `Maps: ${mapUrl}`,
    '',
    `Tag ID: ${tagId}`
  ].join('\n');
}

function buildSmsBody(message: string, tagId: string, mapUrl: string) {
  const compactMessage = message.replace(/\s+/g, ' ').trim();
  const trimmedMessage = compactMessage.length > 120 ? `${compactMessage.slice(0, 117)}...` : compactMessage;
  return `Bag-Tag alert (${tagId}): ${trimmedMessage} Location: ${mapUrl}`;
}

function parseChannelError(channel: string, error: unknown): string {
  if (error instanceof Error) {
    return `${channel}: ${error.message}`;
  }
  return `${channel}: Unable to deliver.`;
}

function buildSuccessMessage(reports: Record<ChannelKey, ChannelReport>): string {
  const deliveredChannels = Object.entries(reports)
    .filter(([, report]) => report.attempted && report.delivered)
    .map(([channel]) => channel.toUpperCase());

  if (deliveredChannels.length === 2) {
    return 'Notification sent via Email and SMS.';
  }

  if (deliveredChannels.length === 1) {
    return `Notification sent via ${deliveredChannels[0]}.`;
  }

  return 'Notification sent successfully.';
}
