import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import EncounterGeneratorPage from "./EncounterGeneratorPage/monsterFilter";
import PartyCharacters from "./EncounterGeneratorPage/partyCharacters";
import Homepage from "./Homepage";
import Result from "./EncounterGeneratorPage/result";
const defaultEncounterValue = {
  difficulty: "",
  challengeRating: "",
  monsterType: "",
  numberOfPlayers: 0,
  levelOfPlayers: 1,
};

function App() {
  const [encounter, setEncounter] = useState(defaultEncounterValue);
  const [result, setResult] = useState("");

  // Use the below function to save the value correctly in the main state
  const saveEncounter = (encounter) => {
    setEncounter((previousValue) => {
      return { ...previousValue, ...encounter };
    });
  };
  return (
    <div className="App bg-vdrk-blue text-white min-h-screen flex flex-col pt-10">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route
            path="/encounter-generator"
            element={
              <EncounterGeneratorPage
                encounter={encounter}
                saveEncounter={saveEncounter}
              />
            }
          ></Route>
          <Route
            path="/party-characters"
            element={
              <PartyCharacters
                encounter={encounter}
                saveEncounter={saveEncounter}
                setResult={setResult}
              />
            }
          ></Route>
          <Route path="/result" element={<Result result={result} />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
