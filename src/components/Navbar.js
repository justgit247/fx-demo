import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaChartLine, FaExchangeAlt, FaWallet, FaUser } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="bg-[#191B1F] p-4 flex justify-around">
            <Link to="/" className="text-white flex flex-col items-center">
                <FaHome />
                <span>Home</span>
            </Link>
            <Link to="/markets" className="text-white flex flex-col items-center">
                <FaChartLine />
                <span>Markets</span>
            </Link>
            <Link to="/trade" className="text-white flex flex-col items-center">
                <FaExchangeAlt />
                <span>Trade</span>
            </Link>
            <Link to="/assets" className="text-white flex flex-col items-center">
                <FaWallet />
                <span>Assets</span>
            </Link>
            <Link to="/profile" className="text-white flex flex-col items-center">
                <FaUser />
                <span>Profile</span>
            </Link>
        </nav>
    );
};

export default Navbar; 