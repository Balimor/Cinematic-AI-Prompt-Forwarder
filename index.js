const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1366152474469204008/lz4Ess6Hb4IORVUldBFD_VVpGnice3pQhbDU5lBrS0pyo0QBDmC-WpItUO3bRWSe4cFC';

app.post('/send-prompt', async (req, res) => {
  const { prompt_text } = req.body;

  if (!prompt_text) {
    return res.status(400).send('❌ Missing prompt_text');
  }

  try {
    await axios.post(DISCORD_WEBHOOK_URL, {
      content: prompt_text
    });
    console.log('✅ Prompt sent:', prompt_text);
    res.send('✅ Prompt sent to Discord');
  } catch (error) {
    console.error('❌ Discord error:', error.message);
    res.status(500).send('❌ Failed to send to Discord');
  }
});

app.get('/', (req, res) => {
  res.send('🎬 Prompt server is up!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
