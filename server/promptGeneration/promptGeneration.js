export default function generateRandomOneshotPrompt(promptToolkit, chosenTemplate) {
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
////////// RANDOMIZER //////////
const monstersArr = [
    "Lich",
    "Mind Flayer",
    "Goblin",
    "Dragon",
    "Ice Troll",
    "Necromancer",
];
const [monster] = pullRandomElement(monstersArr);
const numOfCharactersArr = ["1", "2", "3", "4", "5"];
const [numOfCharacters] = pullRandomElement(numOfCharactersArr);
const charactersArr = [
    "Barbarian",
    "Bard",
    "Cleric",
    "Druid",
    "Fighter",
    "Monk",
    "Paladin",
    "Ranger",
    "Rogue",
    "Sorcerer",
    "Warlock",
    "Wizard",
    "Artificer",
    "Blood Hunter",
];
pullRandomElement(charactersArr);
const deadlyEncountersArr = [
    "Easy",
    "Medium",
    "Hard",
    "Deadly",
    "Double Deadly",
    "Total Party Kill",
];
const [levelOfDeadliness] = pullRandomElement(deadlyEncountersArr);
//******** An appropriately equipped and well-rested party of four adventurers should be able to defeat a monster that has a challenge rating equal to its level without suffering any deaths. For example, a party of four 3rd-level characters should find a monster with a challenge rating of 3 to be a worthy challenge, but not a deadly one. ********\\
const challengeRatingsArr = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
];
const [challengeRatings] = pullRandomElement(challengeRatingsArr);
const levelOfCharactersArr = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
];
const [levelOfCharacters] = pullRandomElement(levelOfCharactersArr);
/** non-mutating */
function pullRandomElement(arr) {
    let arrCopy = [...arr];
    let randIndex = Math.floor(Math.random() * arrCopy.length);
    let pulledElement = arrCopy.splice(randIndex)[0];
    return [pulledElement, arrCopy];
}
