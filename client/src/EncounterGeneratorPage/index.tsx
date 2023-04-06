import React from "react";

import encounterlogo from "../assets/encountergenerator-logo.jpeg";

const EncounterGeneratorPage = () => {
  return (
    <div className="encounter-generator h-full mx-auto my-0 flex flex-col items-center">
      <div className="img-container w-3/5 mt-10 mb-14">
        <img src={encounterlogo} alt="" />
      </div>
      <h1 className="font-header decoration-1 text-4xl text-white mb-5 h-1/6">
        Monster Filter
      </h1>
      <form action="#" className="h-2/6 w-3/5">
        <div className="form-group mb-2">
          <label htmlFor="difficulty" className="hidden">
            Difficulty
          </label>
          <select
            name="difficulty"
            id="difficulty"
            className="w-4/5 rounded h-10 text-vdrk-blue font-light p-2 mb-6"
          >
            <option value="" disabled selected>
              Select Difficulty
            </option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="difficult">Difficult</option>
          </select>
        </div>
        <button className="bg-br-red w-5/6 h-10 rounded p-1 ">
          <span className="font-medium">Next</span>
        </button>
      </form>
    </div>
  );
};

export default EncounterGeneratorPage;
