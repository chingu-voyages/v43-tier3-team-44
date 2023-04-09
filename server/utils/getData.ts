import fs from "fs";
export const getPromptToolkit = async () => {
  return await fs.promises
    .readFile("./promptGeneration/promptToolkit.json", { encoding: "utf8" })
    .then((value) => {
      let promptToolkit = JSON.parse(value);
      return promptToolkit;
    })
    .catch((e) => {
      console.warn("Something bad happened", e);
      return {};
    });
};
