/**
 * Express adapter for tag routes
 * Maps HTTP requests to business logic
 */

import { Router, Request, Response } from 'express';
import { getTagById } from '../../core/tag.service';

const router = Router();

/**
 * GET /api/tags/:tagId
 * Retrieves tag data by ID
 */
router.get('/:tagId', async (req: Request, res: Response) => {
  try {
    const tagId = req.params.tagId;
    
    // Ensure tagId is a string (Express params can be string | string[])
    if (Array.isArray(tagId)) {
      return res.status(400).json({ error: 'Invalid tag ID format' });
    }
    
    const tagData = await getTagById(tagId);
    return res.json(tagData);
  } catch (error) {
    console.error('Error fetching tag data:', error);
    
    if (error instanceof Error) {
      if (error.message === 'Tag not found') {
        return res.status(404).json({ error: 'Tag not found' });
      }
      
      if (error.message.includes('required') || 
          error.message.includes('invalid') || 
          error.message.includes('empty') ||
          error.message.includes('too long')) {
        return res.status(400).json({ error: error.message });
      }
    }
    
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
