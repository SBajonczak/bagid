import { NextRequest, NextResponse } from 'next/server';

type ErrorWithCode = Error & { code?: string };

function normalizeError(error: unknown): ErrorWithCode {
  if (error instanceof Error) {
    return error as ErrorWithCode;
  }
  return new Error(typeof error === 'string' ? error : 'Unknown error');
}

function isErrorDetailEnabled(): boolean {
  const value = process.env.API_EXPOSE_ERROR_DETAILS;
  return value === 'true' || value === '1';
}

function categorizeError(message: string): string {
  const text = message.toLowerCase();
  if (
    text.includes('econnrefused') ||
    text.includes('enotfound') ||
    text.includes('timeout') ||
    text.includes('failed to connect') ||
    text.includes('connect')
  ) {
    return 'connectivity';
  }
  if (text.includes('auth') || text.includes('login') || text.includes('credential')) {
    return 'authentication';
  }
  if (text.includes('sql') || text.includes('database') || text.includes('query')) {
    return 'database';
  }
  return 'internal';
}

export function getRequestId(request: NextRequest): string {
  return request.headers.get('x-request-id') || crypto.randomUUID();
}

export function logApiError(
  request: NextRequest,
  routeName: string,
  error: unknown,
  extra: Record<string, unknown> = {}
): string {
  const requestId = getRequestId(request);
  const normalized = normalizeError(error);

  const payload = {
    event: 'api_error',
    route: routeName,
    method: request.method,
    path: request.nextUrl.pathname,
    requestId,
    errorName: normalized.name,
    errorMessage: normalized.message,
    errorCode: normalized.code,
    ...extra,
  };

  console.error(`[API_ERROR] ${JSON.stringify(payload)}`);
  if (normalized.stack) {
    console.error(`[API_ERROR_STACK] requestId=${requestId} route=${routeName}\n${normalized.stack}`);
  }

  return requestId;
}

export function internalApiError(
  request: NextRequest,
  routeName: string,
  error: unknown,
  extra: Record<string, unknown> = {}
) {
  const normalized = normalizeError(error);
  const requestId = logApiError(request, routeName, error, extra);
  const includeDetail = isErrorDetailEnabled();

  const responseBody: {
    error: string;
    requestId: string;
    route: string;
    detail?: string;
    errorCode?: string;
    errorType?: string;
  } = {
    error: 'Internal server error',
    requestId,
    route: routeName,
  };

  if (includeDetail) {
    responseBody.detail = normalized.message;
    responseBody.errorCode = normalized.code;
    responseBody.errorType = categorizeError(normalized.message);
  }

  return NextResponse.json(
    responseBody,
    {
      status: 500,
      headers: {
        'x-request-id': requestId,
      },
    }
  );
}
