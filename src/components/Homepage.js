import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
    return (
        <>

            <div className="homepageBackground"></div>
            <div className="w-full max-w-screen-lg mx-auto flex flex-col justify-center px-3" style={{height: "100%"}}>
                <h1 className="text-4xl text-white text-shadow-md lg:text-5xl">Welcome to ScratchMap.</h1>
                <h3 className="text-2xl text-white text-shadow-md lg:text-3xl">Create interactive maps to show countries that you have visited.</h3>
                <Link to="/about" className="self-start lg:text-lg font-bold text-white bg-primary-500 rounded px-3 py-2 mt-3 hover:border-transparent hover:text-primary-500 hover:bg-white">Learn more</Link>
            </div>
        </>
    )
}

export default Homepage