import express from 'express'
import Groq from 'groq-sdk';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});
const app = express();

app.use(express.json());



app.post('/api/chat', async (req, res) => {
  const message = req.body.message;
  const salesData = req.body.data;

const systemPrompt = `You are a helpful assistant that answers questions about sales data.
You write clearly without special characters or markdown symbols. You don't show calculation steps. You don't mention the data.

.`;

const userMessage = `${message}\n\nContext:\n${JSON.stringify(salesData)}`;

const completion = await groq.chat.completions.create({
  model: "openai/gpt-oss-120b",
  messages: [
    { role: "system", content: systemPrompt },
    { role: "user", content: userMessage }
  ],
  temperature: 0,
  max_tokens: 2000
});

  const response = completion.choices[0].message.content;
  console.log(response);
  res.send(response);
});

app.listen(3000, () => console.log('Server listening on port 3000'));