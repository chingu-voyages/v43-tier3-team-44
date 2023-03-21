import express from 'express';
import { OpenAIApi, Configuration } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let app  = express();
const port = 3000;

app.get("/", (req, res) => {
  if (!configuration.apiKey) {
    const message = "OpenAI API key not configured, please add it to .env";
    res.status(500).json({
      error: {
        message,
      },
    });
    console.error(message);
    return;
  }
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("listening on " + port);
});
