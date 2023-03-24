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