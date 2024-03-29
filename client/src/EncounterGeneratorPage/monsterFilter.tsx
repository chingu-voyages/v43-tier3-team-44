import React from "react";
import { Link } from "react-router-dom";

import encounterlogo from "../assets/encountergenerator-logo.jpeg";
import { ChallengeRatings } from "../utils/defaultValues";

const EncounterGeneratorPage = ({ encounter, saveEncounter }) => {
  // const [formData, setFormData] = React.useState<defaultEncounterValue | {}>();
  return (
    <div className="encounter-generator h-full mx-auto my-0 flex flex-col items-center">
      <div className="img-container w-3/5 mt-5 mb-12">
        <img src={encounterlogo} alt="" />
      </div>
      <h1 className="font-header decoration-1 text-4xl text-white mb-5 h-1/6">
        Monster Filter
      </h1>
      <form className="w-3/5">
        <div className="form-group mb-3">
          <label htmlFor="difficulty" className="hidden">
            Difficulty
          </label>
          <select
            name="difficulty"
            id="difficulty"
            onChange={(e) => {
              saveEncounter({ difficulty: e.target.value });
            }}
            className="w-4/5 rounded h-10 text-vdrk-blue font-light p-2"
          >
            <option value="" disabled selected className="text-light-gray">
              Select Difficulty
            </option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="difficult">Hard</option>
            <option value="difficult">Deadly</option>
            <option value="difficult">Double Deadly</option>
            <option value="difficult">Total Party Kill</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="challenge-rating" className="hidden">
            Challenge Rating
          </label>
          <select
            name="challenge-rating"
            id="challenge-rating"
            className="w-4/5 rounded h-10 text-vdrk-blue font-light p-2"
            onChange={(e) => {
              saveEncounter({ challengeRating: e.target.value });
            }}
          >
            <option value="" disabled selected className="text-light-gray">
              Challenge Rating
            </option>
            {ChallengeRatings.map((num) => {
              let value: any;
              if (num !== 0 && num < 1) {
                value = `1/${1 / num}`;
              } else {
                value = num;
              }
              return <option value={`${value}`}>{value}</option>;
            })}
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
            onChange={(e) => {
              saveEncounter({ monsterType: e.target.value });
            }}
          />
        </div>
        <Link to="/party-characters">
          <button className="bg-br-red w-5/6 h-10 rounded p-1 ">
            <span className="font-medium">Next</span>
          </button>
        </Link>
      </form>
    </div>
  );
};

export default EncounterGeneratorPage;
