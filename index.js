const express = require('express');
const axios = require('axios');
const app = express();

// ✅ Use the dynamic port Render assigns
const PORT = process.env.PORT;

// Middleware to parse JSON
app.use(express.json());

// ✅ Your Webhook.site test URL
const TEST_WEBHOOK_URL = 'https://webhook.site/41329ccb-e638-4b73-af6f-f3c7da077e0c';

// POST endpoint to forward prompts
app.post('/send-prompt', async (req, res) => {
  const { prompt_text } = req.body;

  if (!prompt_text) {
    return res.status(400).send('❌ Missing prompt_text');
  }

  try {
    await axios.post(TEST_WEBHOOK_URL, {
      content: prompt_text
    });
    console.log('✅ Prompt sent to Webhook.site:', prompt_text);
    res.send('✅ Prompt sent!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).send('❌ Failed to send prompt');
  }
});

// Health check route
app.get('/', (req, res) => {
  res.send('🎬 Test server is live!');
});

// Bind to all interfaces for public access
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
