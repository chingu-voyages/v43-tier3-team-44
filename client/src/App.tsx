import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Homepage from "./Homepage";

function App() {
  return (
    <div className="App bg-vdrk-blue text-white min-h-screen flex flex-col justify-center">
      <Router>
        <Routes>
        <Route path="/" element={<Homepage />}>
          
        </Route>
        <Route path="/test" element={"test"}>
          
        </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
