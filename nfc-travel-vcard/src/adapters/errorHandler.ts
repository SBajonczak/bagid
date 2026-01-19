/**
 * Shared error handling utilities
 * Maps business logic errors to HTTP responses
 */

import { TagNotFoundError, ValidationError } from '../core/types';

export interface ErrorResponse {
  statusCode: number;
  message: string;
}

/**
 * Maps an error to an HTTP error response
 * @param error - The error to map
 * @returns An error response with status code and message
 */
export function mapErrorToHttpResponse(error: unknown): ErrorResponse {
  console.error('Error in request handler:', error);

  if (error instanceof TagNotFoundError) {
    return {
      statusCode: 404,
      message: 'Tag not found'
    };
  }

  if (error instanceof ValidationError) {
    return {
      statusCode: 400,
      message: error.message
    };
  }

  // Default to 500 for unknown errors
  return {
    statusCode: 500,
    message: 'Internal server error'
  };
}
