/**
 * Centralized Configuration Module
 * 
 * This module provides type-safe access to all application configuration settings,
 * environment variables, and feature flags. All configuration values are validated
 * and have documented defaults.
 */

/**
 * Database Configuration
 */
export interface DatabaseConfig {
  server: string;
  database: string;
  user: string;
  password: string;
  encrypt: boolean;
  trustServerCertificate: boolean;
}

/**
 * Email Provider Configuration (Mailgun)
 */
export interface EmailConfig {
  enabled: boolean;
  provider: 'mailgun';
  apiKey: string;
  domain: string;
  fromEmail: string;
  fromName?: string;
}

/**
 * SMS Provider Configuration (Twilio)
 */
export interface SmsConfig {
  enabled: boolean;
  accountSid: string;
  authToken: string;
  fromNumber: string;
}

/**
 * Security Configuration
 */
export interface SecurityConfig {
  recaptchaSecretKey: string;
  notifyTokenSecret: string;
  tokenTtlMs: number;
}

/**
 * Rate Limiting Configuration
 */
export interface RateLimitConfig {
  ipLimit: number;
  ipWindowMs: number;
  tagLimit: number;
  tagWindowMs: number;
}

/**
 * Notification Configuration
 */
export interface NotificationConfig {
  maxMessageLength: number;
  timestampDriftMs: number;
}

/**
 * Feature Flags
 */
export interface FeatureFlags {
  smsNotifications: boolean;
  emailNotifications: boolean;
  asyncNotifications: boolean;
  recaptchaValidation: boolean;
  notifyButton: boolean;
}

export interface PublicFeatureFlags {
  notifyButton: boolean;
}

export interface PublicConfig {
  features: PublicFeatureFlags;
}

/**
 * Complete Application Configuration
 */
export interface AppConfig {
  database: DatabaseConfig;
  email: EmailConfig;
  sms: SmsConfig;
  security: SecurityConfig;
  rateLimit: RateLimitConfig;
  notification: NotificationConfig;
  features: FeatureFlags;
}

/**
 * Get environment variable with optional default
 */
function readEnv(key: string): string | undefined {
  if (typeof process === 'undefined' || !process.env) {
    return undefined;
  }
  return process.env[key];
}

function getEnv(key: string, defaultValue?: string): string {
  const value = readEnv(key);
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Required environment variable ${key} is not set`);
  }
  return value;
}

/**
 * Get boolean environment variable
 */
function getBoolEnv(key: string, defaultValue: boolean): boolean {
  const value = readEnv(key);
  if (value === undefined) {
    return defaultValue;
  }
  return value.toLowerCase() === 'true' || value === '1';
}

/**
 * Get number environment variable
 */
function getNumberEnv(key: string, defaultValue: number): number {
  const value = readEnv(key);
  if (value === undefined) {
    return defaultValue;
  }
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    throw new Error(`Environment variable ${key} must be a valid number`);
  }
  return parsed;
}

/**
 * Build database configuration from environment variables
 */
function buildDatabaseConfig(): DatabaseConfig {
  return {
    server: getEnv('DB_SERVER'),
    database: getEnv('DB_DATABASE'),
    user: getEnv('DB_USER'),
    password: getEnv('DB_PASSWORD'),
    encrypt: getBoolEnv('DB_ENCRYPT', true),
    trustServerCertificate: getBoolEnv('DB_TRUST_SERVER_CERTIFICATE', false),
  };
}

/**
 * Build email configuration from environment variables
 */
function buildEmailConfig(): EmailConfig {
  const enabled = getBoolEnv('EMAIL_ENABLED', true);
  const provider = 'mailgun' as const;
  
  return {
    enabled,
    provider,
    apiKey: enabled ? getEnv('MAILGUN_API_KEY') : '',
    domain: enabled ? getEnv('MAILGUN_DOMAIN') : '',
    fromEmail: enabled ? getEnv('MAILGUN_FROM_EMAIL', getEnv('EMAIL_FROM', 'noreply@bag-tag.de')) : '',
    fromName: getEnv('MAILGUN_FROM_NAME', 'Bag-Tag'),
  };
}

/**
 * Build SMS configuration from environment variables
 */
function buildSmsConfig(): SmsConfig {
  const enabled = getBoolEnv('SMS_ENABLED', true);
  
  return {
    enabled,
    accountSid: enabled ? getEnv('TWILIO_ACCOUNT_SID') : '',
    authToken: enabled ? getEnv('TWILIO_AUTH_TOKEN') : '',
    fromNumber: enabled ? getEnv('TWILIO_SMS_FROM', getEnv('TWILIO_FROM_NUMBER', '')) : '',
  };
}

/**
 * Build security configuration from environment variables
 */
function buildSecurityConfig(): SecurityConfig {
  return {
    recaptchaSecretKey: getEnv('RECAPTCHA_SECRET_KEY', ''),
    notifyTokenSecret: getEnv('NOTIFY_TOKEN_SECRET', getEnv('FUNCTION_APP_SECRET', '')),
    tokenTtlMs: getNumberEnv('NOTIFY_TOKEN_TTL_MS', 10 * 60 * 1000), // 10 minutes default
  };
}

/**
 * Build rate limiting configuration from environment variables
 */
function buildRateLimitConfig(): RateLimitConfig {
  return {
    ipLimit: getNumberEnv('RATE_LIMIT_IP_MAX', 5),
    ipWindowMs: getNumberEnv('RATE_LIMIT_IP_WINDOW_MS', 60 * 60 * 1000), // 1 hour default
    tagLimit: getNumberEnv('RATE_LIMIT_TAG_MAX', 3),
    tagWindowMs: getNumberEnv('RATE_LIMIT_TAG_WINDOW_MS', 24 * 60 * 60 * 1000), // 24 hours default
  };
}

/**
 * Build notification configuration from environment variables
 */
function buildNotificationConfig(): NotificationConfig {
  return {
    maxMessageLength: getNumberEnv('NOTIFICATION_MAX_MESSAGE_LENGTH', 500),
    timestampDriftMs: getNumberEnv('NOTIFICATION_TIMESTAMP_DRIFT_MS', 15 * 60 * 1000), // 15 minutes default
  };
}

/**
 * Build feature flags from environment variables
 */
function buildFeatureFlags(): FeatureFlags {
  return {
    smsNotifications: getBoolEnv('FEATURE_SMS_NOTIFICATIONS', true),
    emailNotifications: getBoolEnv('FEATURE_EMAIL_NOTIFICATIONS', true),
    asyncNotifications: getBoolEnv('FEATURE_ASYNC_NOTIFICATIONS', false),
    recaptchaValidation: getBoolEnv('FEATURE_RECAPTCHA_VALIDATION', false),
    notifyButton: getBoolEnv('NEXT_PUBLIC_FEATURE_NOTIFY_BUTTON_ENABLED', false),
  };
}

function buildPublicFeatureFlags(): PublicFeatureFlags {
  return {
    notifyButton: process.env.NEXT_PUBLIC_FEATURE_NOTIFY_BUTTON_ENABLED === 'true',
  };
}

/**
 * Load and validate complete application configuration
 */
function loadConfig(): AppConfig {
  try {
    return {
      database: buildDatabaseConfig(),
      email: buildEmailConfig(),
      sms: buildSmsConfig(),
      security: buildSecurityConfig(),
      rateLimit: buildRateLimitConfig(),
      notification: buildNotificationConfig(),
      features: buildFeatureFlags(),
    };
  } catch (error) {
    console.error('Configuration error:', error);
    throw error;
  }
}

// Singleton instance - loaded once at startup
let configInstance: AppConfig | null = null;
let publicConfigInstance: PublicConfig | null = null;

/**
 * Get application configuration
 * Loads configuration once and caches it for subsequent calls
 */
export function getConfig(): AppConfig {
  if (!configInstance) {
    configInstance = loadConfig();
  }
  return configInstance;
}

export function getPublicConfig(): PublicConfig {
  if (!publicConfigInstance) {
    publicConfigInstance = {
      features: buildPublicFeatureFlags(),
    };
  }
  return publicConfigInstance;
}

/**
 * Reset configuration cache (useful for testing)
 */
export function resetConfig(): void {
  configInstance = null;
  publicConfigInstance = null;
}

/**
 * Validate required configuration is present
 * Throws error if required settings are missing
 */
export function validateConfig(): void {
  const config = getConfig();
  
  // Validate database config
  if (!config.database.server || !config.database.database) {
    throw new Error('Database configuration is incomplete');
  }
  
  // Validate email if enabled
  if (config.email.enabled && config.features.emailNotifications) {
    if (!config.email.apiKey || !config.email.domain || !config.email.fromEmail) {
      throw new Error('Email is enabled but configuration is incomplete (apiKey, domain, fromEmail required)');
    }
  }
  
  // Validate SMS if enabled
  if (config.sms.enabled && config.features.smsNotifications) {
    if (!config.sms.accountSid || !config.sms.authToken || !config.sms.fromNumber) {
      throw new Error('SMS is enabled but configuration is incomplete');
    }
  }
  
  // Validate security token secret
  if (!config.security.notifyTokenSecret) {
    throw new Error('Notify token secret is required');
  }
}

// Export a default config accessor
const config = {
  get: getConfig,
  getPublic: getPublicConfig,
  validate: validateConfig,
  reset: resetConfig,
};

export default config;
