# Configuration Documentation

This document describes all configuration settings, environment variables, and feature flags available in the Bag-Tag NFC Travel vCard application.

## Overview

All configuration is managed through environment variables and accessed via the centralized configuration module (`lib/config.ts`). This ensures type safety, validation, and clear defaults.

## Environment Variables

### Database Configuration

#### `DB_SERVER` (string, **required**)
Database server hostname or IP address.

**Example:** `your-server.database.windows.net`

#### `DB_DATABASE` (string, **required**)
Database name to connect to.

**Example:** `bagtag-production`

#### `DB_USER` (string, **required**)
Database username for authentication.

**Example:** `bagtaguser`

#### `DB_PASSWORD` (string, **required**)
Database password for authentication.

**Example:** `SecurePassword123!`

#### `DB_ENCRYPT` (boolean, optional, default: `true`)
Enable SSL/TLS encryption for database connections.

**Values:** `true`, `false`, `1`, `0`

#### `DB_TRUST_SERVER_CERTIFICATE` (boolean, optional, default: `false`)
Trust server certificate without validation (for development only).

**Values:** `true`, `false`, `1`, `0`

---

### Email Configuration (Mailgun)

#### `EMAIL_ENABLED` (boolean, optional, default: `true`)
Master switch to enable or disable email notifications entirely.

**Values:** `true`, `false`, `1`, `0`

**Note:** When `false`, email notifications will not be attempted even if owner has email address.

#### `MAILGUN_API_KEY` (string, **required when email enabled**)
Mailgun API key for authentication.

**Example:** `key-1234567890abcdef1234567890abcdef`

**How to get:** Create an API key in Mailgun dashboard under Settings > API Keys

**Security:** Keep this secret and never commit to version control.

#### `MAILGUN_DOMAIN` (string, **required when email enabled**)
Mailgun domain to send emails from.

**Example:** `mg.bag-tag.de` or `sandboxXXXXXXXXXXXXXXXXXXXXXXXX.mailgun.org`

**How to get:** Configure a domain in Mailgun dashboard under Sending > Domains

**Note:** For production, use a verified custom domain. For testing, use the sandbox domain.

#### `MAILGUN_FROM_EMAIL` (string, **required when email enabled**)
Email address to use as sender for all notifications.

**Example:** `noreply@bag-tag.de` or `noreply@mg.bag-tag.de`

**Fallback:** Falls back to `EMAIL_FROM` if not set (default: `noreply@bag-tag.de`).

**Note:** This address must match your configured Mailgun domain.

#### `MAILGUN_FROM_NAME` (string, optional, default: `Bag-Tag`)
Display name to use as sender name for email notifications.

**Example:** `Bag-Tag Notifications` or `NFC Luggage Tag`

**Format:** Will be formatted as `"Name" <email@domain.com>` in email headers.

#### `EMAIL_FROM` (string, optional, default: `noreply@bag-tag.de`)
Fallback email address if `MAILGUN_FROM_EMAIL` is not set.

---

### SMS Configuration (Twilio)

#### `SMS_ENABLED` (boolean, optional, default: `true`)
Master switch to enable or disable SMS notifications entirely.

**Values:** `true`, `false`, `1`, `0`

**Note:** When `false`, SMS notifications will not be attempted even if owner has phone number.

#### `TWILIO_ACCOUNT_SID` (string, **required when SMS enabled**)
Twilio account SID for authentication.

**Example:** `AC0295ce6b5749938d5f8f84b4b9303c92`

**How to get:** Found in Twilio Console dashboard

#### `TWILIO_AUTH_TOKEN` (string, **required when SMS enabled**)
Twilio authentication token.

**Example:** `8c92154c5c078dd641257e54230b85e8`

**How to get:** Found in Twilio Console dashboard

**Security:** Keep this secret and never commit to version control.

#### `TWILIO_SMS_FROM` (string, **required when SMS enabled**)
Phone number to use as sender for SMS notifications.

**Example:** `+1234567890`

**Fallback:** Falls back to `TWILIO_FROM_NUMBER` if not set.

**Format:** Must include country code with `+` prefix.

**Note:** This number must be registered and verified in Twilio.

#### `TWILIO_FROM_NUMBER` (string, optional)
Fallback phone number if `TWILIO_SMS_FROM` is not set.

---

### Security Configuration

#### `NOTIFY_TOKEN_SECRET` (string, **required**)
Secret key used to sign and verify notification security tokens.

**Example:** `supersecrettokenvalue12345`

**Fallback:** Falls back to `FUNCTION_APP_SECRET` if not set.

**Security:** Must be a strong random string (minimum 32 characters recommended).

**Generation:** `openssl rand -base64 32`

#### `FUNCTION_APP_SECRET` (string, optional)
Fallback secret if `NOTIFY_TOKEN_SECRET` is not set.

#### `NOTIFY_TOKEN_TTL_MS` (number, optional, default: `600000`)
Time-to-live for notification security tokens in milliseconds.

**Default:** 600000 (10 minutes)

**Recommended range:** 300000 - 900000 (5-15 minutes)

#### `RECAPTCHA_SECRET_KEY` (string, **required when reCAPTCHA enabled**)
Google reCAPTCHA secret key for bot protection.

**Example:** `6LeI-UssAAAAAMuKv6bYBLz1dyeMaQgAHQZyrD6n`

**How to get:** Register site at https://www.google.com/recaptcha/admin

**Note:** Only required when `FEATURE_RECAPTCHA_VALIDATION` is enabled.

---

### Rate Limiting Configuration

#### `RATE_LIMIT_IP_MAX` (number, optional, default: `5`)
Maximum number of notification requests allowed per IP address within the time window.

**Default:** 5 requests

**Recommended range:** 3-10

#### `RATE_LIMIT_IP_WINDOW_MS` (number, optional, default: `3600000`)
Time window for IP-based rate limiting in milliseconds.

**Default:** 3600000 (1 hour)

**Recommended range:** 1800000 - 7200000 (30 minutes - 2 hours)

#### `RATE_LIMIT_TAG_MAX` (number, optional, default: `3`)
Maximum number of notifications a single tag can receive within the time window.

**Default:** 3 notifications

**Recommended range:** 2-5

**Purpose:** Prevents spam to tag owners and reduces abuse.

#### `RATE_LIMIT_TAG_WINDOW_MS` (number, optional, default: `86400000`)
Time window for tag-based rate limiting in milliseconds.

**Default:** 86400000 (24 hours)

**Recommended range:** 43200000 - 172800000 (12 hours - 2 days)

---

### Notification Configuration

#### `NOTIFICATION_MAX_MESSAGE_LENGTH` (number, optional, default: `500`)
Maximum length of notification message in characters.

**Default:** 500 characters

**Recommended range:** 300-1000

**Purpose:** Prevents abuse and ensures messages fit within SMS/email constraints.

#### `NOTIFICATION_TIMESTAMP_DRIFT_MS` (number, optional, default: `900000`)
Maximum allowed time drift for notification timestamps in milliseconds.

**Default:** 900000 (15 minutes)

**Recommended range:** 600000 - 1800000 (10-30 minutes)

**Purpose:** Prevents replay attacks by rejecting old notification requests.

---

### Feature Flags

#### `FEATURE_SMS_NOTIFICATIONS` (boolean, optional, default: `true`)
Enable SMS notifications as a delivery channel.

**Values:** `true`, `false`, `1`, `0`

**Note:** Even when enabled, SMS requires `SMS_ENABLED=true` and valid Twilio configuration.

#### `FEATURE_EMAIL_NOTIFICATIONS` (boolean, optional, default: `true`)
Enable email notifications as a delivery channel.

**Values:** `true`, `false`, `1`, `0`

**Note:** Even when enabled, email requires `EMAIL_ENABLED=true` and valid SendGrid configuration.

#### `FEATURE_ASYNC_NOTIFICATIONS` (boolean, optional, default: `false`)
Enable asynchronous notification processing (background jobs).

**Values:** `true`, `false`, `1`, `0`

**Status:** Not yet implemented. Reserved for future use.

**Purpose:** When enabled, notifications will be queued and processed asynchronously instead of blocking the HTTP request.

#### `FEATURE_RECAPTCHA_VALIDATION` (boolean, optional, default: `false`)
Enable reCAPTCHA validation for notification requests.

**Values:** `true`, `false`, `1`, `0`

**Note:** Requires `RECAPTCHA_SECRET_KEY` to be set.

**Recommendation:** Enable in production to prevent bot abuse.

---

## Configuration Examples

### Development Environment

```env
# Database
DB_SERVER=localhost
DB_DATABASE=bagtag-dev
DB_USER=devuser
DB_PASSWORD=devpassword
DB_ENCRYPT=false
DB_TRUST_SERVER_CERTIFICATE=true

# Email (disabled for local dev, or use Mailgun sandbox)
EMAIL_ENABLED=false
# Or for testing:
# EMAIL_ENABLED=true
# MAILGUN_API_KEY=key-your-test-api-key
# MAILGUN_DOMAIN=sandboxXXXXXXXXXXXXXXXXXXXXXXXX.mailgun.org
# MAILGUN_FROM_EMAIL=noreply@sandboxXXXXXXXXXXXXXXXXXXXXXXXX.mailgun.org

# SMS (disabled for local dev)
SMS_ENABLED=false

# Security
NOTIFY_TOKEN_SECRET=dev-secret-key-change-in-production
RECAPTCHA_SECRET_KEY=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe

# Rate Limiting (relaxed for dev)
RATE_LIMIT_IP_MAX=100
RATE_LIMIT_TAG_MAX=50

# Features
FEATURE_RECAPTCHA_VALIDATION=false
```

### Production Environment

```env
# Database
DB_SERVER=bagtag-prod.database.windows.net
DB_DATABASE=bagtag-production
DB_USER=produser
DB_PASSWORD=<strong-password>
DB_ENCRYPT=true
DB_TRUST_SERVER_CERTIFICATE=false

# Email (Mailgun)
EMAIL_ENABLED=true
MAILGUN_API_KEY=key-your-production-api-key
MAILGUN_DOMAIN=mg.bag-tag.de
MAILGUN_FROM_EMAIL=noreply@bag-tag.de
MAILGUN_FROM_NAME=Bag-Tag

# SMS
SMS_ENABLED=true
TWILIO_ACCOUNT_SID=ACxxxx
TWILIO_AUTH_TOKEN=<secret-token>
TWILIO_SMS_FROM=+49123456789

# Security
NOTIFY_TOKEN_SECRET=<strong-random-secret-generated-with-openssl>
RECAPTCHA_SECRET_KEY=<production-recaptcha-key>

# Rate Limiting
RATE_LIMIT_IP_MAX=5
RATE_LIMIT_TAG_MAX=3

# Features
FEATURE_SMS_NOTIFICATIONS=true
FEATURE_EMAIL_NOTIFICATIONS=true
FEATURE_RECAPTCHA_VALIDATION=true
FEATURE_ASYNC_NOTIFICATIONS=false
```

### Staging Environment (Email only, no SMS)

```env
# Database
DB_SERVER=bagtag-staging.database.windows.net
DB_DATABASE=bagtag-staging
DB_USER=staginguser
DB_PASSWORD=<password>

# Email only (Mailgun)
EMAIL_ENABLED=true
MAILGUN_API_KEY=key-your-staging-api-key
MAILGUN_DOMAIN=mg.staging.bag-tag.de
MAILGUN_FROM_EMAIL=staging@bag-tag.de
MAILGUN_FROM_NAME=Bag-Tag Staging

# SMS disabled
SMS_ENABLED=false

# Security
NOTIFY_TOKEN_SECRET=<staging-secret>

# Features
FEATURE_SMS_NOTIFICATIONS=false
FEATURE_EMAIL_NOTIFICATIONS=true
```

---

## Validation

The configuration system includes automatic validation that runs at startup:

- **Required settings:** Throws error if missing (e.g., `DB_SERVER`, `DB_DATABASE`)
- **Conditional requirements:** Validates based on enabled features (e.g., `SENDGRID_API_KEY` required if email enabled)
- **Type checking:** Ensures numbers are valid, booleans are properly formatted
- **Defaults:** Applies sensible defaults for all optional settings

To manually validate configuration:

```typescript
import { validateConfig } from '@/lib/config';

validateConfig(); // Throws error if configuration is invalid
```

---

## Security Best Practices

1. **Never commit secrets:** Use `.env.local` for local development (already in `.gitignore`)
2. **Use strong secrets:** Generate with `openssl rand -base64 32`
3. **Rotate regularly:** Change `NOTIFY_TOKEN_SECRET` and API keys periodically
4. **Environment isolation:** Use different credentials for dev/staging/production
5. **Least privilege:** Grant database users only necessary permissions
6. **Enable encryption:** Always use `DB_ENCRYPT=true` in production
7. **Monitor usage:** Track API usage for SendGrid and Twilio to detect abuse

---

## Troubleshooting

### Email not sending

1. Check `EMAIL_ENABLED=true`
2. Check `FEATURE_EMAIL_NOTIFICATIONS=true`
3. Verify `MAILGUN_API_KEY` is valid
4. Verify `MAILGUN_DOMAIN` is correctly configured
5. Verify `MAILGUN_FROM_EMAIL` matches your Mailgun domain
6. Check Mailgun dashboard (Sending > Logs) for delivery errors
7. For sandbox domain, ensure recipient email is authorized in Mailgun

### SMS not sending

1. Check `SMS_ENABLED=true`
2. Check `FEATURE_SMS_NOTIFICATIONS=true`
3. Verify Twilio credentials are correct
4. Verify `TWILIO_SMS_FROM` is a valid Twilio number
5. Check Twilio console for delivery errors

### Rate limiting too aggressive

1. Increase `RATE_LIMIT_IP_MAX` and `RATE_LIMIT_TAG_MAX`
2. Increase window durations (`*_WINDOW_MS` settings)
3. Consider implementing user-specific quotas (future feature)

### Token expiration errors

1. Increase `NOTIFY_TOKEN_TTL_MS` (but not too much for security)
2. Check system clock synchronization
3. Verify `NOTIFICATION_TIMESTAMP_DRIFT_MS` is appropriate

---

## Future Configuration (Planned)

These settings are planned for future implementation:

- `SMS_MONTHLY_QUOTA_DEFAULT` (int): Default SMS quota per user per month
- `SMS_QUOTA_RESET_DAY` (int): Day of month to reset quotas (1-28)
- `MAILGUN_REGION` (enum): Mailgun API region (US/EU) for data residency
- `MAILGUN_TEMPLATE_ID` (string): Use Mailgun templates for email formatting
- `NOTIFICATION_QUEUE_ENABLED` (bool): Enable message queue for async processing
- `NOTIFICATION_RETRY_ATTEMPTS` (int): Number of retry attempts for failed deliveries
- `OWNER_NOTIFICATION_PREFERENCES` (bool): Allow owners to configure their notification preferences

---

## Migration from SendGrid to Mailgun

If migrating from SendGrid to Mailgun:

1. **Install Mailgun.js:** Already included in dependencies (`mailgun.js`, `form-data`)
2. **Environment variables:** Replace `SENDGRID_*` variables with `MAILGUN_*` variables
3. **Domain setup:** Configure and verify your domain in Mailgun dashboard
4. **API key:** Create a new API key in Mailgun (Settings > API Keys)
5. **Testing:** Use Mailgun sandbox domain for testing before production
6. **No code changes needed:** The application automatically uses Mailgun configuration

### SendGrid to Mailgun Variable Mapping

| SendGrid Variable | Mailgun Variable | Notes |
|------------------|------------------|-------|
| `SENDGRID_API_KEY` | `MAILGUN_API_KEY` | Different format, create new in Mailgun |
| `SENDGRID_FROM_EMAIL` | `MAILGUN_FROM_EMAIL` | Must match Mailgun domain |
| N/A | `MAILGUN_DOMAIN` | **New required field** |
| N/A | `MAILGUN_FROM_NAME` | Optional, defaults to "Bag-Tag" |

---

## Migration from Legacy Configuration

If migrating from direct `process.env` access:

1. **No breaking changes:** Old environment variables still work
2. **New features:** Feature flags default to `true` to maintain current behavior
3. **Validation:** May catch previously silent misconfigurations
4. **Type safety:** TypeScript now enforces correct types

---

## Support

For questions or issues with configuration:

1. Check this documentation
2. Review `.env.local.example` for reference
3. Check application logs for configuration errors
4. Refer to `lib/config.ts` for implementation details
