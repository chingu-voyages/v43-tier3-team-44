import express from "express";
import { OpenAIApi, Configuration } from "openai";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

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


createRoutes();

// * APP ROUTES
async function createRoutes() {


   const promptToolkit: promptToolkit = await getPromptToolkit();

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
  app.post("/createEncounter", cors(), async (req, res) => {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    let prompt = generateEncounterWithUserData({
      userPromptValue: body,
      promptToolkit: promptToolkit,
      chosenTemplate: "encounterGenerator",
    });

    

    res.send(prompt);
  });
  app.listen(port, () => {
    console.log("listening on " + port);
  });
}
