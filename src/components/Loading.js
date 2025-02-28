import React from 'react';
import Logo from './Logo';

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-900 to-red-950">
            <div className="relative">
                <div className="absolute inset-0 bg-red-500 opacity-20 rounded-full blur-xl animate-pulse"></div>
                <div className="relative animate-bounce">
                    <Logo />
                </div>
            </div>
            
            <h2 className="text-red-100 text-2xl mt-8 font-semibold tracking-wide">
                Loading your portfolio...
            </h2>
            
            <p className="text-red-300 mt-3 text-center max-w-md px-6">
                Preparing real-time market data and analyzing trading opportunities
            </p>
            
            <div className="mt-10 relative">
                <div className="flex space-x-3">
                    <div className="w-3 h-3 rounded-full bg-red-400 animate-ping"></div>
                    <div className="w-3 h-3 rounded-full bg-red-300 animate-ping delay-150"></div>
                    <div className="w-3 h-3 rounded-full bg-red-200 animate-ping delay-300"></div>
                </div>
                <div className="mt-1 h-px w-full bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-6 text-red-400 text-sm font-light">
                Market data refreshes every 15 seconds
            </div>
        </div>
    );
};

export default Loading;