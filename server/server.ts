import express from "express";
import { OpenAIApi, Configuration } from "openai";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import {
  generateRandomEncounterPrompt,
  generateEncounterWithUserData,
} from "./promptGeneration/promptGeneration.js";
import { getData } from "./utils/getData.js";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// * APP CONFIGURATION
// TODO: Only enable our origin(s)
let app = express();
const port = 4000;
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// * APP ROUTES

// ?DEFAULT APP ROUTE
app.get("/", async (req, res) => {
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

  const promptToolkit = await getData();
  let prompt = generateRandomEncounterPrompt(
    promptToolkit,
    "encounterGenerator"
  );
  // process.exit();
  // openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt,
  //   temperature: 0.6,
  // })
  // .then((res) => {
  //   console.log({prompt, res: res.data.choices[0].text});
  // })
  return;
});

// ? ROUTE TO GET MONSTERS IF NEEDED IN FRONTEND
app.get("/monsters", async (req, res) => {
  const promptToolkit = await getData();
  res.send(promptToolkit.monsters);
});

//? ROUTE TO CREATE ENCOUNTER FROM USER INPUT
app.post("/createEncounter", cors(), async (req, res) => {
  const promptToolkit = await getData();
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  let prompt = generateEncounterWithUserData({
    promptValue: body,
    promptToolkit: promptToolkit,
    chosenTemplate: "encounterGenerator",
  });
  res.send(prompt);
});
app.listen(port, () => {
  console.log("listening on " + port);
});
