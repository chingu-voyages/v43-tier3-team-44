import React from "react";
import { Link } from "react-router-dom";
import encounterlogo from "../assets/encountergenerator-logo.jpeg";

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const PartyCharacters = ({ encounter, saveEncounter }) => {
  return (
    <div className="encounter-generator h-full mx-auto my-0 flex flex-col items-center">
      <div className="img-container w-3/5 mt-5 mb-12">
        <img src={encounterlogo} alt="" />
      </div>
      <h1 className="font-header decoration-1 text-4xl text-white mb-5 h-1/6">
        Player Details
      </h1>
      <form className="w-3/5">
        <div className="form-group mb-3">
          <label htmlFor="number-of-players" className="hidden">
            Number of Players
          </label>
          <input
            type="text"
            name="number-of-players"
            className="w-4/5 rounded h-10 text-vdrk-blue font-light p-2"
            placeholder="Number of Players"
            onChange={(e) => {
              saveEncounter({ numberOfPlayers : e.target.value });
            }}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="levelOfPlayers" className="hidden">
            Level of Players
          </label>
          <input
            type="text"
            name="level-of-players"
            className="w-4/5 rounded h-10 text-vdrk-blue font-light p-2"
            placeholder="Level of Players"
            onChange={(e) => {
              saveEncounter({ levelOfPlayers : e.target.value });
            }}
          />
        </div>

        <Link to="/result">
          <button
            className="bg-br-red w-5/6 h-10 rounded p-1 "
            onClick={async () => {
              await postData(
                "http://localhost:4000/createEncounter",
                encounter
              );
            }}
          >
            <span className="font-medium">Next</span>
          </button>
        </Link>
      </form>
    </div>
  );
};

export default PartyCharacters;
