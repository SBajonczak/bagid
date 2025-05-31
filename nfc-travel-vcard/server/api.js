import express from 'express';
import cors from 'cors';
import { TagRepo } from './TagRepo.js';

const app = express();
const port = process.env.API_PORT || 3001;

app.use(cors());
app.use(express.json());

// Add a debug route to verify the API is working
app.get('/api/debug', (req, res) => {
  console.log('Debug endpoint called');
  res.json({ 
    message: 'API server is working', 
    time: new Date().toISOString(),
    headers: req.headers,
    path: req.path,
    originalUrl: req.originalUrl
  });
});

// API-Route für Reisedaten nach Tag-ID
app.get('/api/travel/:tagId', async (req, res) => {
  const { tagId } = req.params;
  console.log(`API-Anfrage für Tag-ID: ${tagId}`);
  
  // Add request debugging
  console.log('Request headers:', req.headers);
  console.log('Request path:', req.path);
  console.log('Original URL:', req.originalUrl);
  
  try {
    const repo = new TagRepo();
    const data = await repo.getTravelDataByTagId(tagId);
    
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: 'Keine Daten für diese Tag-ID gefunden.' });
    }
  } catch (error) {
    console.error('Fehler beim Abrufen der Reisedaten:', error);
    res.status(500).json({ error: 'Interner Serverfehler.' });
  }
});

// Server starten
app.listen(port, () => {
  console.log(`API-Server läuft auf http://localhost:${port}`);
});
