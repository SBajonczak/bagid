'use strict';

const MASK = '***';

function isSensitiveKey(key) {
  return /(SECRET|TOKEN|PASSWORD|PASS|KEY|AUTH|SID)/i.test(key);
}

function formatValue(key, value) {
  if (value === undefined) {
    return '(not set)';
  }
  if (value === '') {
    return '(empty)';
  }
  if (isSensitiveKey(key)) {
    return MASK;
  }
  return String(value);
}

function printGroup(title, keys) {
  console.log(`\n[Startup] ${title}`);
  for (const key of keys) {
    console.log(`- ${key}=${formatValue(key, process.env[key])}`);
  }
}

function collectPublicEnvKeys() {
  return Object.keys(process.env)
    .filter((k) => k.startsWith('NEXT_PUBLIC_'))
    .sort();
}

const uiPort = process.env.PORT || '3000';
const uiHost = process.env.HOSTNAME || process.env.HOST || '0.0.0.0';
const publicPort = process.env.PUBLIC_PORT || process.env.WEBSITES_PORT || '8090';

console.log('[Startup] Container boot detected');
console.log(`[Startup] UI listens on: http://${uiHost}:${uiPort}`);
console.log(`[Startup] Public endpoint via nginx: http://0.0.0.0:${publicPort}`);

const apiKeys = [
  'NODE_ENV',
  'PORT',
  'HOST',
  'HOSTNAME',
  'PUBLIC_PORT',
  'WEBSITES_PORT',
  'DB_PROVIDER',
  'DB_SERVER',
  'DB_DATABASE',
  'DB_USER',
  'DB_PASSWORD',
  'DB_ENCRYPT',
  'DB_TRUST_SERVER_CERTIFICATE',
  'TURSO_DATABASE_URL',
  'TURSO_AUTH_TOKEN',
  'EMAIL_ENABLED',
  'MAILGUN_API_KEY',
  'MAILGUN_DOMAIN',
  'MAILGUN_FROM_EMAIL',
  'MAILGUN_FROM_NAME',
  'SMS_ENABLED',
  'TWILIO_ACCOUNT_SID',
  'TWILIO_AUTH_TOKEN',
  'TWILIO_SMS_FROM',
  'TWILIO_FROM_NUMBER',
  'RECAPTCHA_SECRET_KEY',
  'NOTIFY_TOKEN_SECRET',
  'FUNCTION_APP_SECRET',
  'FEATURE_SMS_NOTIFICATIONS',
  'FEATURE_EMAIL_NOTIFICATIONS',
  'FEATURE_ASYNC_NOTIFICATIONS',
  'FEATURE_RECAPTCHA_VALIDATION',
];

printGroup('API env values', apiKeys);

const publicKeys = collectPublicEnvKeys();
if (publicKeys.length === 0) {
  console.log('\n[Startup] UI env values');
  console.log('- No NEXT_PUBLIC_ variables found');
} else {
  printGroup('UI env values', publicKeys);
}

console.log('\n[Startup] Environment dump complete\n');
