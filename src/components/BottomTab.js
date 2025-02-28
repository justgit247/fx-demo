import React from 'react';
import { Link } from 'react-router-dom';

const BottomTab = () => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-[#191B1F] p-2 flex justify-around">
            <Link to="/dashboard" className="text-white hover:text-[#F0B90B]">
                {/* Replace with an appropriate icon */}
                <span>Dashboard</span>
            </Link>
            <Link to="/markets" className="text-white hover:text-[#F0B90B]">
                <span>Markets</span>
            </Link>
            <Link to="/trade" className="text-white hover:text-[#F0B90B]">
                <span>Trade</span>
            </Link>
            <Link to="/assets" className="text-white hover:text-[#F0B90B]">
                <span>Assets</span>
            </Link>
            <Link to="/profile" className="text-white hover:text-[#F0B90B]">
                <span>Profile</span>
            </Link>
        </nav>
    );
};

export default BottomTab; 