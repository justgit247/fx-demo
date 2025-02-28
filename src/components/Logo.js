import React from 'react';

const Logo = () => {
    return (
        <div className="flex items-center justify-center h-16">
            <svg width="300" height="100" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
                {/* Logo Shape - Diamond in Binance yellow */}
                <g>
                    {/* Main diamond */}
                    <path d="M50,50 L65,35 L80,50 L65,65 Z" fill="#F3BA2F" />
                    
                    {/* Top diamond */}
                    <path d="M65,20 L72.5,27.5 L65,35 L57.5,27.5 Z" fill="#F3BA2F" />
                    
                    {/* Right diamond */}
                    <path d="M95,50 L87.5,57.5 L80,50 L87.5,42.5 Z" fill="#F3BA2F" />
                    
                    {/* Bottom diamond */}
                    <path d="M65,80 L57.5,72.5 L65,65 L72.5,72.5 Z" fill="#F3BA2F" />
                    
                    {/* Left diamond */}
                    <path d="M35,50 L42.5,42.5 L50,50 L42.5,57.5 Z" fill="#F3BA2F" />
                </g>

                {/* FX Text with gradient */}
                <text x="115" y="58" fontFamily="'Montserrat', 'Arial', sans-serif" fontSize="36" fontWeight="bold" fill="#F3BA2F">FX</text>
                
                {/* DEMO Text slightly smaller */}
                <text x="175" y="58" fontFamily="'Montserrat', 'Arial', sans-serif" fontSize="24" fontWeight="normal" fill="#F3BA2F">DEMO</text>
                
                {/* Optional: subtle shadow for better contrast on any background */}
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="1" floodOpacity="0.3" />
                </filter>
            </svg>
        </div>
    );
};

export default Logo;