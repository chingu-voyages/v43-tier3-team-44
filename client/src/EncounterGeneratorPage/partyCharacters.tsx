import React from "react";

const PartyCharacters = ({ encounter }) => {
  return (
    <div>
      {Object.keys(encounter).map((elem) => (
        <p key={elem}>
          {elem}: {encounter[elem]}
        </p>
      ))}
    </div>
  );
};

export default PartyCharacters;
