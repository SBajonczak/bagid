// type LogLevel = 'error' | 'warn' | 'info' | 'debug';

//  const isProd =false;// process.env.NODE_ENV === 'production';

export const logger = {
    error: (...args: unknown[]) => console.error(...args),
    warn: (...args: unknown[]) => console.warn(...args),
    info: (...args: unknown[]) => console.info(...args),
    debug: (...args: unknown[]) => console.debug(...args),
};
