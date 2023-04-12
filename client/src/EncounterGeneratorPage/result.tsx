import React from "react";
import { Link } from "react-router-dom";

import spinner from "../assets/spinner.gif";

const Result = ({ result }) => {
  if (!result) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <img src={spinner} alt="" className="h-2/5" />
      </div>
    );
  }
  return (
    <div className="mx-auto h-4/6 my-0 flex flex-col items-center max-w-fit px-5 md:h-full">
      <h1 className="font-header decoration-1 text-4xl text-white mb-3 md:text-5xl md:mt-5">
        Your Encounter
      </h1>
      <div className="max-w-lg max-h-screen mb-5 bg-[url('./assets/result-image.jpg')] bg-no-repeat bg-origin-border bg-center">
        <p className="text-sm tracking-widest leading-4 md:text-xl md:tracking-wide md:my-5">
          {result}
        </p>
      </div>
      <button className="bg-br-red w-5/6 h-10 rounded p-1 my-3">
        <span className="font-medium">Reset Options</span>
      </button>
      <button className="bg-br-red w-5/6 h-10 rounded p-1 ">
        <span className="font-medium">Regenerate Encounter</span>
      </button>
    </div>
  );
};

export default Result;
