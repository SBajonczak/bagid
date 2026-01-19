/**
 * Framework-agnostic tag service
 * Business logic for tag operations without Express or Next.js dependencies
 */

import { TagRepo } from '../../lib/TagRepo';

/**
 * Validates a tag ID
 * @param tagId - The tag ID to validate
 * @throws Error if tag ID is invalid
 */
function validateTagId(tagId: string): void {
  if (!tagId || typeof tagId !== 'string') {
    throw new Error('Tag ID is required and must be a string');
  }

  // Basic sanitization check
  if (tagId.trim().length === 0) {
    throw new Error('Tag ID cannot be empty');
  }

  // Check for invalid characters (basic security check)
  if (tagId.length > 255) {
    throw new Error('Tag ID is too long');
  }
}

/**
 * Gets tag data by tag ID
 * @param tagId - The tag ID to retrieve
 * @returns Tag data object
 * @throws Error if validation fails or tag not found
 */
export async function getTagById(tagId: string): Promise<any> {
  // Validate input
  validateTagId(tagId);

  // Get tag data from repository
  const repo = new TagRepo();
  const tagData = await repo.getTravelDataByTagId(tagId);

  if (!tagData) {
    throw new Error('Tag not found');
  }

  return tagData;
}
