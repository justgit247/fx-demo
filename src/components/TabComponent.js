import React, { useState } from 'react';
import Favorites from './Favorites'; // Favorites component
import GainersLosers from './GainersLosers'; // Gainers and losers component

const TabComponent = ({ prices }) => {
    const [activeTab, setActiveTab] = useState('favorites');

    const renderContent = () => {
        switch (activeTab) {
            case 'favorites':
                return <Favorites prices={prices} />;
            case 'gainers':
                return <GainersLosers prices={prices} type="gainers" />;
            case 'losers':
                return <GainersLosers prices={prices} type="losers" />;
            default:
                return <Favorites prices={prices} />;
        }
    };

    return (
        <div className="bg-[#191B1F] rounded p-4">
            {/* Tab Navigation */}
            <div className="flex space-x-4 mb-4">
                <button
                    className={`flex-1 py-2 text-center ${activeTab === 'favorites' ? 'bg-[#F0B90B] text-black' : 'text-white'}`}
                    onClick={() => setActiveTab('favorites')}
                >
                    Favorites
                </button>
                <button
                    className={`flex-1 py-2 text-center ${activeTab === 'gainers' ? 'bg-[#F0B90B] text-black' : 'text-white'}`}
                    onClick={() => setActiveTab('gainers')}
                >
                    Top Gainers
                </button>
                <button
                    className={`flex-1 py-2 text-center ${activeTab === 'losers' ? 'bg-[#F0B90B] text-black' : 'text-white'}`}
                    onClick={() => setActiveTab('losers')}
                >
                    Top Losers
                </button>
            </div>

            {/* Tab Content */}
            <div>
                {renderContent()}
            </div>
        </div>
    );
};

export default TabComponent; 