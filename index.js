const express = require('express');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// ✅ POST route that just logs and responds
app.post('/send-prompt', (req, res) => {
  console.log('✅ Received POST to /send-prompt');
  console.log('🧾 Request body:', req.body);

  res.send('✅ Prompt received successfully.');
});

// Health check route
app.get('/', (req, res) => {
  res.send('🧪 POST test server is live!');
});

// Bind to all interfaces for Render
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Listening on port ${PORT}`);
});
