import { NextRequest, NextResponse } from 'next/server';

type ErrorWithCode = Error & { code?: string };

function normalizeError(error: unknown): ErrorWithCode {
  if (error instanceof Error) {
    return error as ErrorWithCode;
  }
  return new Error(typeof error === 'string' ? error : 'Unknown error');
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
  const requestId = logApiError(request, routeName, error, extra);
  return NextResponse.json(
    {
      error: 'Internal server error',
      requestId,
      route: routeName,
    },
    {
      status: 500,
      headers: {
        'x-request-id': requestId,
      },
    }
  );
}
