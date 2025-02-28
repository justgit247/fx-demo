import React from 'react';
import { Link } from 'react-router-dom';

const BottomNavbar = () => {
    return (
        <nav className="bg-[#191B1F] p-4 fixed bottom-0 left-0 right-0 flex justify-around">
            <Link to="/" className="text-white">Home</Link>
            <Link to="/markets" className="text-white">Markets</Link>
            <Link to="/trade" className="text-white">Trade</Link>
            <Link to="/assets" className="text-white">Assets</Link>
            <Link to="/profile" className="text-white">Profile</Link>
        </nav>
    );
};

export default BottomNavbar; 