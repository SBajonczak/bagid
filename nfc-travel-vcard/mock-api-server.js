const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

// Sample data
const sampleTags = [
  { id: 'e6975c5a-07be-4b76-945b-28e3421b818b', name: 'Koffer 1', userId: 'user123' },
  { id: 'a2b4c6d8-e0f2-11ec-8ea0-0242ac120002', name: 'Rucksack', userId: 'user123' },
  { id: 'b3c5d7e9-e0f2-11ec-8ea0-0242ac120002', name: 'Laptop Tasche', userId: 'user123' },
];

// Endpoint to get all tags for a user
app.get('/api/tags/user', (req, res) => {
  // In a real app, you'd check authorization header
  res.json({ tags: sampleTags });
});

// Endpoint to get a specific tag
app.get('/api/tags/:id', (req, res) => {
  const tag = sampleTags.find(t => t.id === req.params.id);
  if (tag) {
    res.json(tag);
  } else {
    res.status(404).json({ error: 'Tag not found' });
  }
});

// Endpoint to check if a tag is registered
app.get('/api/tags/:id/registered', (req, res) => {
  const tag = sampleTags.find(t => t.id === req.params.id);
  res.json({ registered: !!tag });
});

app.listen(port, () => {
  console.log(`Mock API server running at http://localhost:${port}`);
});
