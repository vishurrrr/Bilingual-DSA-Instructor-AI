import 'dotenv/config';
import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function main() {
  const response = await client.chat.completions.create({
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
        content: "What is a mango tree",
      },
    ],
  });

  console.log(response.choices[0].message.content);
}

main();
