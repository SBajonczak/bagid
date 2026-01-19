/**
 * Framework-agnostic tag service
 * Business logic for tag operations without Express or Next.js dependencies
 */

import { TagRepo } from '../../lib/TagRepo';
import { TagData, TagNotFoundError, ValidationError } from './types';

/**
 * Validates a tag ID
 * @param tagId - The tag ID to validate
 * @throws ValidationError if tag ID is invalid
 */
function validateTagId(tagId: string): void {
  if (!tagId || typeof tagId !== 'string') {
    throw new ValidationError('Tag ID is required and must be a string');
  }

  // Basic sanitization check
  if (tagId.trim().length === 0) {
    throw new ValidationError('Tag ID cannot be empty');
  }

  // Check for invalid characters (basic security check)
  if (tagId.length > 255) {
    throw new ValidationError('Tag ID is too long');
  }
}

/**
 * Gets tag data by tag ID
 * @param tagId - The tag ID to retrieve
 * @returns Tag data object
 * @throws ValidationError if validation fails
 * @throws TagNotFoundError if tag not found
 */
export async function getTagById(tagId: string): Promise<TagData> {
  // Validate input
  validateTagId(tagId);

  // Get tag data from repository
  const repo = new TagRepo();
  const tagData = await repo.getTravelDataByTagId(tagId);

  if (!tagData) {
    throw new TagNotFoundError(tagId);
  }

  return tagData as TagData;
}
