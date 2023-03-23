import express from 'express';
import { OpenAIApi, Configuration, CreateCompletionResponse } from 'openai';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

// When promptToolkit.json structure is nailed down, make this interface
// more specific and don't use `any`.
interface promptToolkit {
  [key: string]: any;
}


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

fs.promises.readFile('./promptToolkit.json', {encoding: 'utf8'})
.then(value => {
  let promptToolkit: promptToolkit = JSON.parse(value);
  let prompt = generatePrompt(promptToolkit, 'twoPara');
  console.log(prompt);

  // openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt,
  //   temperature: 0.6,
  // })
  // .then((res) => {
  //   console.log({prompt, res: res.data.choices[0].text});
  // })
})





function generatePrompt(promptToolkit: promptToolkit, chosenTemplate: string) {
  let promptTemplate: string = promptToolkit.promptTemplates[chosenTemplate];
  let prompt = promptTemplate.replace(/\&\*\(generalAdjective\)\*\&/g, 'absurd');
  return prompt;
}
