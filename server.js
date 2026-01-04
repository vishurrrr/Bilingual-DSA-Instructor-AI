import 'dotenv/config';
import express from 'express';
import Groq from 'groq-sdk';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// Initialize Groq Client
const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chat Endpoint
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const chatCompletion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a Data Structures and Algorithms instructor. " +
            "Only answer DSA-related questions. " +
            "If the question is not related, reply: This chatbot only supports Data Structures and Algorithms questions."
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const aiResponse = chatCompletion.choices[0].message.content;
    res.json({ response: aiResponse });
  } catch (error) {
    console.error("Error calling Groq API:", error);
    res.status(500).json({ error: "Failed to fetch response from AI" });
  }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
