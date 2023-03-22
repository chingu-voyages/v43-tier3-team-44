import express from 'express';
import { OpenAIApi, Configuration } from 'openai';
import dotenv from 'dotenv';
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
openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt('lynx'),
    temperature: 0.6,
})
    .then((res) => {
    console.log(res.data.choices[0].text);
});
function generatePrompt(animal) {
    const capitalizedAnimal = animal[0].toUpperCase() + animal.slice(1).toLowerCase();
    return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
}
