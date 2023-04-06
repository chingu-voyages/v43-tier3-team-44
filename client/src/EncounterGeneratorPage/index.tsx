import React from "react";

import encounterlogo from "../assets/encountergenerator-logo.jpeg";

const EncounterGeneratorPage = () => {
  return (
    <div className="encounter-generator h-full mx-auto my-0 flex flex-col items-center">
      <div className="img-container w-4/5 mb-10 h-2/6">
        <img src={encounterlogo} alt="" />
      </div>
      <h1 className="font-header decoration-1 text-4xl text-white mb-5 h-1/6">
        Monster Filter
      </h1>
      <form action="#" className="h-2/6">
        <div className="form-group mb-2">
          <label htmlFor=""></label>
          <input type="text" name="" />
        </div>
        <div className="form-group mb-2">
          <label htmlFor=""></label>
          <input type="text" name="" />
        </div>
        <div className="form-group mb-2">
          <input type="text" name="" />
          <label htmlFor=""></label>
        </div>
        <div className="form-group mb-5">
          <input type="text" name="" />
          <label htmlFor=""></label>
        </div>
        <button className="bg-br-red w-5/6 rounded-sm p-1 ">
          <span className="font-medium">Next</span>
        </button>
      </form>
    </div>
  );
};

export default EncounterGeneratorPage;
