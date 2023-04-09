g;
export const generateEncounterWithUserData = (param) => {
    const { promptToolkit, chosenTemplate } = param;
    let { userPromptValue } = param;
    userPromptValue = enforceUserPromptValueStringsLength(userPromptValue, 30);
    console.log(promptToolkit === null || promptToolkit === void 0 ? void 0 : promptToolkit.promptTemplates);
    const promptTemplate = promptToolkit === null || promptToolkit === void 0 ? void 0 : promptToolkit.promptTemplates[chosenTemplate];
    let promptTemplateScaffold = promptTemplate;
    let playerQuantityString = "";
    [promptTemplateScaffold] = chooseAndReplace(promptTemplateScaffold, "encounterDifficulty", [(userPromptValue === null || userPromptValue === void 0 ? void 0 : userPromptValue.difficulty) || "1"]);
    [promptTemplateScaffold] = chooseAndReplace(promptTemplateScaffold, "monster", [userPromptValue === null || userPromptValue === void 0 ? void 0 : userPromptValue.monsterType]);
    [promptTemplateScaffold] = chooseAndReplace(promptTemplateScaffold, "challengeRating", [userPromptValue === null || userPromptValue === void 0 ? void 0 : userPromptValue.challengeRating]);
    [promptTemplateScaffold, playerQuantityString] = chooseAndReplace(promptTemplateScaffold, "numOfPlayers", [String(userPromptValue === null || userPromptValue === void 0 ? void 0 : userPromptValue.partyNumber) || "1"]);
    [promptTemplateScaffold] = chooseAndReplace(promptTemplateScaffold, "playerLevel", [String(userPromptValue === null || userPromptValue === void 0 ? void 0 : userPromptValue.partyAverageLevel)]);
    let prompt = promptTemplateScaffold;
    return prompt;
};
function enforceUserPromptValueStringsLength(userPromptValue, maxLength) {
    let mutableUserPromptValue = Object.assign({}, userPromptValue);
    for (const key in userPromptValue) {
        const typedKey = key;
        if (userPromptValue[typedKey].length > 30) {
            mutableUserPromptValue[typedKey] = userPromptValue[typedKey].slice(0, maxLength);
        }
    }
    return mutableUserPromptValue;
}
export function generateRandomOneshotPrompt(promptToolkit, chosenTemplate) {
    const promptTemplate = promptToolkit.promptTemplates[chosenTemplate];
    let promptTemplateScaffold = promptTemplate;
    let adjectiveArr = [...promptToolkit.generalAdjectives];
    let endFeatureArr = [...promptToolkit.endFeatures];
    // occurrences are length of split arr - 1
    let adjOccurrenceCount = promptTemplate.split(/\&\*\(generalAdjective\)\*\&/g).length - 1;
    let randAdjArr = [];
    for (let i = 1; i <= adjOccurrenceCount; i++) {
        let adjQuantity = adjectiveArr.length;
        let currentAdj;
        [currentAdj, adjectiveArr] = pullRandomElement(adjectiveArr);
        promptTemplateScaffold = promptTemplateScaffold.replace(/\&\*\(generalAdjective\)\*\&/, currentAdj);
    }
    let endFeature = pullRandomElement(endFeatureArr)[0];
    promptTemplateScaffold = promptTemplateScaffold.replace(/\&\*\(endFeature\)\*\&/, endFeature);
    let prompt = promptTemplateScaffold;
    return prompt;
}
export function generateRandomEncounterPrompt(promptToolkit, chosenTemplate) {
    const promptTemplate = promptToolkit.promptTemplates[chosenTemplate];
    let promptTemplateScaffold = promptTemplate;
    let { encounterDifficulties, monsters, challengeRatings, numOfPlayers, playerLevels, classes, } = promptToolkit;
    let playerQuantityString = "";
    [promptTemplateScaffold] = chooseAndReplace(promptTemplateScaffold, "encounterDifficulty", encounterDifficulties);
    [promptTemplateScaffold] = chooseAndReplace(promptTemplateScaffold, "monster", monsters);
    [promptTemplateScaffold] = chooseAndReplace(promptTemplateScaffold, "challengeRating", challengeRatings);
    [promptTemplateScaffold, playerQuantityString] = chooseAndReplace(promptTemplateScaffold, "numOfPlayers", numOfPlayers);
    [promptTemplateScaffold] = chooseAndReplace(promptTemplateScaffold, "playerLevel", playerLevels);
    for (let i = 1; i < parseInt(playerQuantityString) + 1; i++) {
        let soughtString = "character(s):";
        let insertIndex = promptTemplateScaffold.indexOf(soughtString) + soughtString.length;
        let expandedScaffold = promptTemplateScaffold.slice(0, insertIndex) +
            (i > 1 ? " &*(class)*&," : " &*(class)*&") +
            promptTemplateScaffold.slice(insertIndex);
        [promptTemplateScaffold] = chooseAndReplace(expandedScaffold, "class", classes);
        console.log(promptTemplateScaffold);
    }
    let prompt = promptTemplateScaffold;
    return prompt;
}
function chooseAndReplace(promptTemplateScaffold, keyToReplace, sourceArr) {
    const regex = new RegExp(`\\&\\*\\(${keyToReplace}\\)\\*\\&`);
    let [chosenElement] = pullRandomElement(sourceArr);
    promptTemplateScaffold = promptTemplateScaffold.replace(regex, chosenElement);
    if (keyToReplace !== "numOfPlayers") {
        return [promptTemplateScaffold];
    }
    else {
        return [promptTemplateScaffold, chosenElement];
    }
}
/** non-mutating */
function pullRandomElement(arr) {
    let arrCopy = [...arr];
    let randIndex = Math.floor(Math.random() * arrCopy.length);
    let pulledElement = arrCopy.splice(randIndex)[0];
    return [pulledElement, arrCopy];
}
