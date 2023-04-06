import React from "react";

import encounterlogo from "../assets/encountergenerator-logo.jpeg";

const EncounterGeneratorPage = () => {
  return (
    <div className="encounter-generator h-full mx-auto my-0 flex flex-col items-center">
      <div className="img-container w-3/5 mt-5 mb-12">
        <img src={encounterlogo} alt="" />
      </div>
      <h1 className="font-header decoration-1 text-4xl text-white mb-5 h-1/6">
        Monster Filter
      </h1>
      <form action="#" className="w-3/5">
        <div className="form-group mb-3">
          <label htmlFor="difficulty" className="hidden">
            Difficulty
          </label>
          <select
            name="difficulty"
            id="difficulty"
            className="w-4/5 rounded h-10 text-vdrk-blue font-light p-2"
          >
            <option value="" disabled selected className="text-light-gray">
              Select Difficulty
            </option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="difficult">Difficult</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="monster-type" className="hidden">
            Monster Type
          </label>
          <input
            type="text"
            name="monster-type"
            className="w-4/5 rounded h-10 text-vdrk-blue font-light p-2"
            placeholder="Monster Type"
          />
        </div>
        <button className="bg-br-red w-5/6 h-10 rounded p-1 ">
          <span className="font-medium">Next</span>
        </button>
      </form>
    </div>
  );
};

export default EncounterGeneratorPage;
