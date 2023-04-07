import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import EncounterGeneratorPage from "./EncounterGeneratorPage/monsterFilter";
import PartyCharacters from "./EncounterGeneratorPage/partyCharacters";
import Homepage from "./Homepage";

function App() {
  return (
    <div className="App bg-vdrk-blue text-white min-h-screen flex flex-col py-20">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route
            path="/encounter-generator"
            element={<EncounterGeneratorPage />}
          ></Route>
          <Route path="/party-characters" element={<PartyCharacters />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
