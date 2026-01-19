/**
 * Express Server Bootstrap
 * This file runs ONLY in local development and Docker environments
 * It is NOT imported by Next.js and will NOT be included in Vercel builds
 */

import express from 'express';
import cors from 'cors';
import tagRoutes from './src/adapters/express/tag.routes';

const app = express();
const PORT = process.env.EXPRESS_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Express API' });
});

// Mount tag routes under /api/tags
app.use('/api/tags', tagRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server only if this file is run directly (not imported)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Express API server listening on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`API endpoint: http://localhost:${PORT}/api/tags/:tagId`);
  });
}

export default app;
