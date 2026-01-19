/**
 * Shared types for tag data
 */

export interface TagData {
  tagId: string;
  hasData: number;
  tagName: string;
  ownerFirstName: string;
  ownerLastName: string;
  ownerAddress: string;
  ownerEmail: string;
  ownerMobile: string;
  ownerLandline: string | null;
  ownerOther: string | null;
  guideFirstName: string | null;
  guideLastName: string | null;
  guideEmail: string | null;
  guideMobile: string | null;
  guideLandline: string | null;
  destinationAccommodation: string | null;
  destinationAddress: string | null;
  transportation: string | null;
  transportationNumber: string | null;
  transportationDate: string | null;
}

/**
 * Custom error types for better error handling
 */
export class TagNotFoundError extends Error {
  constructor(tagId: string) {
    super(`Tag not found: ${tagId}`);
    this.name = 'TagNotFoundError';
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
