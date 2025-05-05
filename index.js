const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// ✅ Your actual Discord webhook URL
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1366152474469204008/lz4Ess6Hb4IORVUldBFD_VVpGnice3pQhbDU5lBrS0pyo0QBDmC-WpItUO3bRWSe4cFC';

// POST endpoint to receive and forward prompts
app.post('/send-prompt', async (req, res) => {
  const { prompt_text } = req.body;

  if (!prompt_text) {
    return res.status(400).send('❌ Missing prompt_text');
  }

  try {
    await axios.post(DISCORD_WEBHOOK_URL, {
      content: prompt_text
    });
    console.log('✅ Prompt sent to Discord:', prompt_text);
    res.send('✅ Prompt sent!');
  } catch (error) {
    console.error('❌ Error sending to Discord:', error.message);
    res.status(500).send('❌ Failed to send prompt');
  }
});

// Simple health check
app.get('/', (req, res) => {
  res.send('🎬 Prompt server is up!');
});

// Public bind for Render
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
