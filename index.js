const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/send-prompt', async (req, res) => {
  const { prompt_text } = req.body;
  if (!prompt_text) {
    return res.status(400).send('Missing prompt_text');
  }

  try {
    await axios.post('https://hook.eu2.make.com/s7krn7hxd78zuxwqk08r6nnl2v5egzvo', {
      prompt_text
    });
    res.send('Prompt forwarded successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error forwarding prompt');
  }
});

app.get('/', (req, res) => {
  res.send('Cinematic Server is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
