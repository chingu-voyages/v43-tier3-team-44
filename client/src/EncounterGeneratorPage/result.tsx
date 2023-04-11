import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Result = ({ result }) => {
  return (
    <div className=" h-screen mx-auto my-0 flex flex-col items-center max-w-fit p-5">
      <h1 className="font-header decoration-1 text-4xl text-white h-1/6">
        Your Encounter
      </h1>
      <p className="wqe max-w-md text-l mb-5 tracking-wide leading-7 bg-[url('./assets/result-image.jpg')] bg-no-repeat bg-origin-border bg-center">
        {result}
      </p>
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
