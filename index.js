// index.js

const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON body
app.use(express.json());

// Replace with your actual Discord webhook URL
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1366152474469204008/lz4Ess6Hb4IORVUldBFD_VVpGnice3pQhbDU5lBrS0pyo0QBDmC-WpItUO3bRWSe4cFC';

// Route to receive and forward prompt to Discord
app.post('/send-prompt', async (req, res) => {
  const { prompt_text } = req.body;

  if (!prompt_text) {
    return res.status(400).send('❌ Missing prompt_text');
  }

  try {
    await axios.post(DISCORD_WEBHOOK_URL, {
      content: prompt_text
    });
    res.send('✅ Prompt sent to Discord successfully!');
  } catch (error) {
    console.error('❌ Error sending to Discord:', error.message);
    res.status(500).send('❌ Failed to send prompt to Discord');
  }
});

// Optional root route
app.get('/', (req, res) => {
  res.send('🎬 Cinematic Prompt Server is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
