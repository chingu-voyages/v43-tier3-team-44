import express from "express";
import { OpenAIApi, Configuration } from "openai";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
let app = express();
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
fs.promises
    .readFile("./promptGeneration/promptToolkit.json", { encoding: "utf8" })
    .then((value) => {
    let promptToolkit = JSON.parse(value);
    let prompt = generateRandomPrompt(promptToolkit, "twoPara");
    console.log(prompt);
    process.exit();
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
function generatePrompt(promptToolkit, chosenTemplate) {
    let promptTemplate = promptToolkit.promptTemplates[chosenTemplate];
    let prompt = promptTemplate.replace(/\&\*\(generalAdjective\)\*\&/g, "absurd");
    return prompt;
}
export default function generateRandomPrompt(promptToolkit, chosenTemplate) {
    const promptTemplate = promptToolkit.promptTemplates[chosenTemplate];
    let promptTemplateScaffold = promptTemplate;
    let adjectiveArr = [...promptToolkit.generalAdjectives];
    let endFeatureArr = [...promptToolkit.endFeatures];
    // occurences are length of split arr - 1
    let adjOccurrenceCount = promptTemplate.split(/\&\*\(generalAdjective\)\*\&/g).length - 1;
    let randAdjArr = [];
    for (let i = 1; i <= adjOccurrenceCount; i++) {
        let adjQuantity = adjectiveArr.length;
        let randIndex = Math.floor(Math.random() * adjQuantity);
        promptTemplateScaffold = promptTemplateScaffold.replace(/\&\*\(generalAdjective\)\*\&/, adjectiveArr.splice(randIndex)[0]);
    }
    let randIndex = Math.floor(Math.random() * endFeatureArr.length);
    let endFeature = endFeatureArr[randIndex];
    promptTemplateScaffold = promptTemplateScaffold.replace(/\&\*\(endFeature\)\*\&/, endFeature);
    let prompt = promptTemplateScaffold;
    return prompt;
}

////////// RANDOMIZER //////////

const randomizer = (arr) => {
    randomGenerator = Math.floor(Math.random() * arr.length)
    return arr[randomGenerator];
}

const monstersArr = ["Lich", "Mind Flayer", "Goblin", "Dragon", "Ice Troll", "Necromancer"];
const monster = randomizer(monstersArr);

const numOfCharactersArr = ["1", "2", "3", "4", "5"];
const numOfCharacters = randomizer(numOfCharactersArr);

const charactersArr = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard", "Artificer", "Blood Hunter"];
randomizer(charactersArr);

const deadlyEncountersArr = ["Easy", "Medium", "Hard", "Deadly", "Double Deadly", "Total Party Kill"];
const levelOfDeadliness = randomizer(deadlyEncountersArr);

//******** An appropriately equipped and well-rested party of four adventurers should be able to defeat a monster that has a challenge rating equal to its level without suffering any deaths. For example, a party of four 3rd-level characters should find a monster with a challenge rating of 3 to be a worthy challenge, but not a deadly one. ********\\
const challengeRatingsArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
const challengeRatings = randomizer(challengeRatingsArr);

const levelOfCharactersArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
const levelOfCharacters = randomizer(levelOfCharactersArr);

// Coleman's prompt, if we want to use it
/*
const prompt = `I need help creating my D&D encounter for my session. In 200 words or less, can you help create an encounter where the party walks into a potential fight? Also, make sure the encounter is a ${levelOfDeadliness} encounter which includes a ${monster} with a challenge rating of ${challengeRatings}. The party is comprised of ${numOfCharacters} level ${levelOfCharacters} characters: 1 bard, 1 barbarian, 1 sorcerer, and 1 druid.`;
*/

// ======================= \\