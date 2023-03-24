import { expect, test } from "@jest/globals";
import generateRandomPrompt from './promptGeneration/promptGeneration';
import fs from "fs";

let rawPromptToolkit = fs.readFileSync("./promptGeneration/promptToolkit.json", {
  encoding: "utf8",
});
let promptToolkit = JSON.parse(rawPromptToolkit);

let prompt = generateRandomPrompt(promptToolkit, "twoPara");
test("no unreplaced templates of form &*(example)*&", () => {

  expect(prompt).not.toMatch(/\&\*\([a-zA-Z]*\)\*\&/g);
});
