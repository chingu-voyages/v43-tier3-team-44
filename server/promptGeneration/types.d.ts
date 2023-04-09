export interface promptToolkit {
  [key: string]: string[];
  promptTemplates: { [key: string]: string };
}

export interface userPromptValue {
  challengeRating: string;
  difficulty: string;
  monsterType: string;
  partyAverageLevel: number;
  partyNumber: number;
  [key: string]: string;
};