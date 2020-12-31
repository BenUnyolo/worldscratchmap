import React from 'react';
import { Link } from 'react-router-dom';

// import { ReactComponent as WorldPicture } from '../globe.svg';
import Globe from '../images/globeSVG';

const About = () => {
    return (
        <div className="p-3">
            <div className="md:flex md:items-center">
                <div className="md:w-1/2">
                    <p className="text-2xl mb-4">Welcome to the World Scratch Map, a site where you can create interactive maps to show countries that you have visited.</p>
                    <p className="text-2xl mb-4">To get started click 'Register' in the navigation menu above to create an account.</p>
                    <p className="text-2xl mb-4">Once you have created an account head over to the 'Edit Map' page to start building your map.</p>
                </div>
                <div className="ml-3 w-full md:w-1/2">
                    <Globe />
                </div>
            </div>
            <p className="text-2xl">Site created by Ben Unyolo, to check out more go to <Link to="https://benunyolo.com">benunyolo.com</Link>.</p>
        </div>
    )
}

export default About