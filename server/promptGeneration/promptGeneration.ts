import { userPromptValue, promptToolkit } from "./types";

export const generateEncounterWithUserData = (param: {
  userPromptValue: userPromptValue;
  promptToolkit: promptToolkit;
  chosenTemplate: string;
}) => {
  const { promptToolkit, chosenTemplate } = param;
  let { userPromptValue } = param;

  userPromptValue = enforceUserPromptValueStringsLength(userPromptValue, 30);

  // console.log(promptToolkit?.promptTemplates);
  const promptTemplate = promptToolkit?.promptTemplates[chosenTemplate];
  let promptTemplateScaffold = promptTemplate;
  let playerQuantityString = "";

  [promptTemplateScaffold] = chooseAndReplace(
    promptTemplateScaffold,
    "encounterDifficulty",
    [userPromptValue?.difficulty || "1"]
  );
  [promptTemplateScaffold] = chooseAndReplace(
    promptTemplateScaffold,
    "monster",
    [userPromptValue?.monsterType]
  );
  [promptTemplateScaffold] = chooseAndReplace(
    promptTemplateScaffold,
    "challengeRating",
    [userPromptValue?.challengeRating]
  );
  [promptTemplateScaffold, playerQuantityString] = chooseAndReplace(
    promptTemplateScaffold,
    "numOfPlayers",
    [String(userPromptValue?.numberOfPlayers) || "1"]
  );
  [promptTemplateScaffold] = chooseAndReplace(
    promptTemplateScaffold,
    "playerLevel",
    [String(userPromptValue?.levelOfPlayers)]
  );

  let prompt = promptTemplateScaffold;
  return prompt;
};

function enforceUserPromptValueStringsLength(
  userPromptValue: userPromptValue,
  maxLength: number
): userPromptValue {
  let mutableUserPromptValue = { ...userPromptValue };

  for (const key in userPromptValue) {
    const typedKey = key as keyof userPromptValue;
    if (userPromptValue[typedKey].length > 30) {
      mutableUserPromptValue[typedKey] = userPromptValue[typedKey].slice(
        0,
        maxLength
      );
    }
  }
  return mutableUserPromptValue;
}

export function generateRandomOneshotPrompt(
  promptToolkit: promptToolkit,
  chosenTemplate: string
): string {
  const promptTemplate = promptToolkit.promptTemplates[chosenTemplate];
  let promptTemplateScaffold = promptTemplate;
  let adjectiveArr = [...promptToolkit.generalAdjectives];
  let endFeatureArr = [...promptToolkit.endFeatures];
  // occurrences are length of split arr - 1
  let adjOccurrenceCount =
    promptTemplate.split(/\&\*\(generalAdjective\)\*\&/g).length - 1;
  let randAdjArr = [];
  for (let i = 1; i <= adjOccurrenceCount; i++) {
    let adjQuantity = adjectiveArr.length;
    let currentAdj;
    [currentAdj, adjectiveArr] = pullRandomElement(adjectiveArr);
    promptTemplateScaffold = promptTemplateScaffold.replace(
      /\&\*\(generalAdjective\)\*\&/,
      currentAdj
    );
  }
  let endFeature = pullRandomElement(endFeatureArr)[0];
  promptTemplateScaffold = promptTemplateScaffold.replace(
    /\&\*\(endFeature\)\*\&/,
    endFeature
  );
  let prompt = promptTemplateScaffold;
  return prompt;
}

export function generateRandomEncounterPrompt(
  promptToolkit: promptToolkit,
  chosenTemplate: string
): string {
  const promptTemplate = promptToolkit.promptTemplates[chosenTemplate];
  let promptTemplateScaffold = promptTemplate;
  let {
    encounterDifficulties,
    monsters,
    challengeRatings,
    numOfPlayers,
    playerLevels,
    classes,
  } = promptToolkit;
  let playerQuantityString = "";

  [promptTemplateScaffold] = chooseAndReplace(
    promptTemplateScaffold,
    "encounterDifficulty",
    encounterDifficulties
  );
  [promptTemplateScaffold] = chooseAndReplace(
    promptTemplateScaffold,
    "monster",
    monsters
  );
  [promptTemplateScaffold] = chooseAndReplace(
    promptTemplateScaffold,
    "challengeRating",
    challengeRatings
  );
  [promptTemplateScaffold, playerQuantityString] = chooseAndReplace(
    promptTemplateScaffold,
    "numOfPlayers",
    numOfPlayers
  );
  [promptTemplateScaffold] = chooseAndReplace(
    promptTemplateScaffold,
    "playerLevel",
    playerLevels
  );

  for (let i = 1; i < parseInt(playerQuantityString) + 1; i++) {
    let soughtString = "character(s):";
    let insertIndex =
      promptTemplateScaffold.indexOf(soughtString) + soughtString.length;

    let expandedScaffold =
      promptTemplateScaffold.slice(0, insertIndex) +
      (i > 1 ? " &*(class)*&," : " &*(class)*&") +
      promptTemplateScaffold.slice(insertIndex);
    [promptTemplateScaffold] = chooseAndReplace(
      expandedScaffold,
      "class",
      classes
    );
    // console.log(promptTemplateScaffold);
  }

  let prompt = promptTemplateScaffold;
  return prompt;
}

function chooseAndReplace(
  promptTemplateScaffold: string,
  keyToReplace: string,
  sourceArr: string[]
) {
  const regex = new RegExp(`\\&\\*\\(${keyToReplace}\\)\\*\\&`);

  let [chosenElement] = pullRandomElement(sourceArr);
  promptTemplateScaffold = promptTemplateScaffold.replace(regex, chosenElement);

  if (keyToReplace !== "numOfPlayers") {
    return [promptTemplateScaffold];
  } else {
    return [promptTemplateScaffold, chosenElement];
  }
}

/** non-mutating */
function pullRandomElement(arr: any[]): [string, string[]] {
  let arrCopy = [...arr];
  let randIndex = Math.floor(Math.random() * arrCopy.length);

  let pulledElement = arrCopy.splice(randIndex)[0];

  return [pulledElement, arrCopy];
}
