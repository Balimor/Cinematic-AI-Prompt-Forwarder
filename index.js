const express = require('express');
const axios = require('axios');
const app = express();

// ✅ Required for Render to expose the app publicly
const PORT = process.env.PORT;

app.use(express.json());

// ✅ Replace this with your actual Discord webhook
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1366152474469204008/lz4Ess6Hb4IORVUldBFD_VVpGnice3pQhbDU5lBrS0pyo0QBDmC-WpItUO3bRWSe4cFC';

// 🎯 POST endpoint to receive cinematic prompt and forward to Discord
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
    res.send('✅ Prompt sent to Discord!');
  } catch (error) {
    console.error('❌ Error sending to Discord:', error.message);
    res.status(500).send('❌ Failed to send prompt to Discord');
  }
});

// Root health check route
app.get('/', (req, res) => {
  res.send('🎬 Cinematic Prompt Server is live and listening!');
});

// ✅ Bind to 0.0.0.0 for public Render access
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
