/**
 * Express adapter for tag routes
 * Maps HTTP requests to business logic
 */

import { Router, Request, Response } from 'express';
import { getTagById } from '../../core/tag.service';
import { mapErrorToHttpResponse } from '../errorHandler';

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
    const errorResponse = mapErrorToHttpResponse(error);
    return res.status(errorResponse.statusCode).json({ 
      error: errorResponse.message 
    });
  }
});

export default router;
