export default function generateRandomPrompt(promptToolkit, chosenTemplate) {
    const promptTemplate = promptToolkit.promptTemplates[chosenTemplate];
    let promptTemplateScaffold = promptTemplate;
    let adjectiveArr = [...promptToolkit.generalAdjectives];
    let endFeatureArr = [...promptToolkit.endFeatures];
    // occurrences are length of split arr - 1
    let adjOccurrenceCount = promptTemplate.split(/\&\*\(generalAdjective\)\*\&/g).length - 1;
    let randAdjArr = [];
    for (let i = 1; i <= adjOccurrenceCount; i++) {
        let adjQuantity = adjectiveArr.length;
        promptTemplateScaffold = promptTemplateScaffold.replace(/\&\*\(generalAdjective\)\*\&/, adjectiveArr = pullRandomElement(adjectiveArr));
    }
    let endFeature = pullRandomElement(endFeatureArr)[0];
    promptTemplateScaffold = promptTemplateScaffold.replace(/\&\*\(endFeature\)\*\&/, endFeature);
    let prompt = promptTemplateScaffold;
    return prompt;
}
/** non-mutating */
function pullRandomElement(arr) {
    let arrCopy = [...arr];
    let randIndex = Math.floor(Math.random() * arrCopy.length);
    let pulledElement = arrCopy.splice(randIndex)[0];
    return [pulledElement, arrCopy];
}
