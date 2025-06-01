import express from 'express';
import cors from 'cors';
import { TagRepo } from './TagRepo.js';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { Logger } from 'concurrently';

const app = express();
const port = process.env.API_PORT || 3001;

app.use(cors());
app.use(express.json());

// Configure JWT validation with Azure B2C - for ID tokens
const tenant = process.env.AZURE_B2C_TENANT || "sbab2c";
const policy = process.env.AZURE_B2C_POLICY || "B2C_1_susi";

const client = jwksClient({
  // Use discovery endpoint for the correct policy
  jwksUri: `https://${tenant}.b2clogin.com/${tenant}.onmicrosoft.com/${policy}/discovery/v2.0/keys`
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    if (err) {
      console.error('Error getting signing key:', err);
      return callback(err);
    }
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

// Middleware to verify ID token from Azure B2C
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'ID token required' });
  }

  const token = authHeader.split(' ')[1];

  // Decode token for debugging
  const decodedToken = jwt.decode(token, { complete: true });
  // console.log('Token header:', JSON.stringify(decodedToken?.header));
  // console.log('Token payload:', JSON.stringify(decodedToken?.payload));

  // Verify the ID token
  jwt.verify(token, getKey, {
    audience: process.env.AZURE_B2C_CLIENT_ID || "a89e7807-f975-4c90-af58-0c602568ac1c", // Your client ID
    issuer: `https://sbab2c.b2clogin.com/f6bbcd21-1158-4ce1-ac68-b633ddaa32a4/v2.0/`
  }, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(401).json({ error: 'Invalid token', details: err.message });
    }

    req.user = decoded;
    next();
  });
};

// API route to register tag ownership
app.post('/api/tag-owners', verifyToken, async (req, res) => {
  const { tagId, userId, userEmail } = req.body;

  // Validate that the user in the token matches the request
  if (req.user.sub !== userId) {
    return res.status(403).json({ error: 'User ID mismatch' });
  }

  try {
    const repo = new TagRepo();
    const success = await repo.registerTagOwner(tagId, userId, userEmail);
    console.log(`Tag registration attempt for tagId: ${tagId}, userId: ${userId}, userEmail: ${userEmail}`);
    if (success) {
      console.log(`Tag successfully registered for tagId: ${tagId}, userId: ${userId}`);
      res.json({ message: 'Tag successfully registered' });
    } else {
      res.status(400).json({ error: 'Failed to register tag' });
    }
  } catch (error) {
    console.error('Error registering tag:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API route to check tag ownership
app.get('/api/tag-owners/:tagId/verify', verifyToken, async (req, res) => {
  const { tagId } = req.params;
  const userId = req.user.sub;

  try {
    const repo = new TagRepo();
    const isOwner = await repo.verifyTagOwner(tagId, userId);
    if (isOwner!==true){
      res.status(403).json({ error: 'You are not the owner' });
      return;
    }
    res.json({ isOwner });
  } catch (error) {
    console.error('Error verifying tag ownership:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// API route to check if tag exists
app.get('/api/tags/:tagId/registered', async (req, res) => {
  const { tagId } = req.params;
  try {
    const repo = new TagRepo();
    const exists = await repo.tagRegistered(tagId);

    res.json({ exists });
  } catch (error) {
    console.error('Error checking if tag exists:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// API route to check if tag exists
app.get('/api/tags/:tagId/exists', async (req, res) => {
  const { tagId } = req.params;

  try {
    const repo = new TagRepo();
    const exists = await repo.tagExists(tagId);
    if (exists === false) {
      res.status(404).json({ error: 'Tag not found' });
      return;
    }
    res.json({ exists });
  } catch (error) {
    console.error('Error checking if tag exists:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/travel/:tagId', async (req, res) => {
  const { tagId } = req.params;
  const updateData = req.body;

  try {
    const repo = new TagRepo();
    const updated = await repo.updateTravelDataByTagId(tagId, updateData);

    if (updated) {
      res.json({ message: 'Reisedaten erfolgreich aktualisiert.' });
    } else {
      res.status(404).json({ error: 'Keine Daten für diese Tag-ID gefunden.' });
    }
  } catch (error) {
    console.error('Fehler beim Aktualisieren der Reisedaten:', error);
    res.status(500).json({ error: 'Interner Serverfehler.' });
  }
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
