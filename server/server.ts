import express from "express";
import { OpenAIApi, Configuration } from "openai";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";

import {
  generateRandomEncounterPrompt,
  generateEncounterWithUserData,
} from "./promptGeneration/promptGeneration.js";
import { getPromptToolkit } from "./utils/getData.js";
import { promptToolkit } from "./promptGeneration/types.js";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// * APP CONFIGURATION
// TODO: Only enable our origin(s)
let app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
const port = 4000;
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

createRoutes();

// * APP ROUTES
async function createRoutes() {
  const promptToolkit: promptToolkit = await getPromptToolkit();

  const __dirname = path.resolve();

  app.use(express.static(path.resolve(__dirname, "../client/build")));

  // All other GET requests not handled before will return our React app
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });

  // ?DEFAULT APP ROUTE
  app.get("/randomPrompt", async (req, res) => {
    if (!configuration.apiKey) {
      const message = "OpenAI API key not configured, please add it to .env";
      res.status(500).json({
        error: {
          message,
        },
      });
      // console.error(message);
      return;
    }

    let prompt = generateRandomEncounterPrompt(
      promptToolkit,
      "encounterGenerator"
    );

    return;
  });

  // ? ROUTE TO GET MONSTERS IF NEEDED IN FRONTEND
  app.get("/monsters", async (req, res) => {
    res.send(promptToolkit.monsters);
  });

  //? ROUTE TO CREATE ENCOUNTER FROM USER INPUT
  app.post("/createEncounter", cors(), async (req, ourServerRes) => {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    let prompt = generateEncounterWithUserData({
      userPromptValue: body,
      promptToolkit: promptToolkit,
      chosenTemplate: "encounterGenerator",
    });

    openai
      .createCompletion({
        model: "text-davinci-003",
        prompt,
        temperature: 0.6,
        max_tokens: 1000,
      })
      .then((res) => {
        let GPTTextRes = res.data.choices[0].text;
        console.log({ prompt, GPTTextRes });
        ourServerRes.send(GPTTextRes);
      });

    // res.send(prompt);
  });
  app.listen(port, () => {
    console.log("listening on " + port);
  });
}
