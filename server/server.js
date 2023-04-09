var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import { OpenAIApi, Configuration } from "openai";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { generateRandomEncounterPrompt, generateEncounterWithUserData, } from "./promptGeneration/promptGeneration.js";
import { getPromptToolkit } from "./utils/getData.js";
dotenv.config();
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// * APP CONFIGURATION
// TODO: Only enable our origin(s)
let app = express();
const port = 4000;
app.use(cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
}));
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
createRoutes();
// * APP ROUTES
function createRoutes() {
    return __awaiter(this, void 0, void 0, function* () {
        const promptToolkit = yield getPromptToolkit();
        // ?DEFAULT APP ROUTE
        app.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
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
            let prompt = generateRandomEncounterPrompt(promptToolkit, "encounterGenerator");
            return;
        }));
        // ? ROUTE TO GET MONSTERS IF NEEDED IN FRONTEND
        app.get("/monsters", (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send(promptToolkit.monsters);
        }));
        //? ROUTE TO CREATE ENCOUNTER FROM USER INPUT
        app.post("/createEncounter", cors(), (req, ourServerRes) => __awaiter(this, void 0, void 0, function* () {
            const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
            let prompt = generateEncounterWithUserData({
                userPromptValue: body,
                promptToolkit: promptToolkit,
                chosenTemplate: "encounterGenerator",
            });
            openai.createCompletion({
                model: "text-davinci-003",
                prompt,
                temperature: 0.6,
                max_tokens: 1000
            })
                .then((res) => {
                let GPTTextRes = res.data.choices[0].text;
                console.log({ prompt, GPTTextRes });
                ourServerRes.send(GPTTextRes);
            });
            // res.send(prompt);
        }));
        app.listen(port, () => {
            console.log("listening on " + port);
        });
    });
}
