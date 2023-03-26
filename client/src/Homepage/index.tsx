import React from "react";


const Homepage = () => {
    return(
        <main className="h-96 flex flex-col">
            <h1 className="font-header text-5xl text-br-red">Welcome to DM Assistant</h1>
            <div className="experiences flex flex-col mt-14">
                <a href="#" className="font-header underline decoration-1 underline-offset-4 text-xl text-white">Generate an Encounter</a>
                <a href="#" className="font-header underline decoration-1 underline-offset-4 text-xl text-white mt-3">Create Characters</a>
            </div>
            <a href="#" className="mt-5 text-white">Sign Up</a>
        </main>
    )
}

export default Homepage