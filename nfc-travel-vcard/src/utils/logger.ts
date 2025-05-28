type LogLevel = 'error' | 'warn' | 'info' | 'debug';

const isProd = process.env.NODE_ENV === 'production';

export const logger = {
    error: (...args: any[]) => console.error(...args),
    warn: (...args: any[]) => !isProd && console.warn(...args),
    info: (...args: any[]) => !isProd && console.info(...args),
    debug: (...args: any[]) => !isProd && console.debug(...args),
};
