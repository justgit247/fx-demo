import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Import Firestore
import { doc, getDoc } from 'firebase/firestore';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js'; // Import Chart.js and registerables
import { FaHome, FaChartLine, FaExchangeAlt, FaWallet, FaUser } from 'react-icons/fa';
import axios from 'axios';

// Register Chart.js components
Chart.register(...registerables);

const Dashboard = () => {
    const [prices, setPrices] = useState([]);
    const [userBalance, setUserBalance] = useState(0);
    const [activeTab, setActiveTab] = useState('favorites'); // State for active tab
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
                setPrices(response.data);
            } catch (error) {
                console.error('Error fetching prices:', error);
            }
        };

        fetchPrices();
        const interval = setInterval(fetchPrices, 10000); // Update every 10 seconds
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchUserBalance = async () => {
            const userDocRef = doc(db, 'users', 'YOUR_USER_ID'); // Replace with actual user ID
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                setUserBalance(userDoc.data().balance || 0);
            }
        };

        fetchUserBalance();
    }, []);

    const renderMarketData = () => {
        return prices.map((price) => {
            const priceChange = parseFloat(price.priceChangePercent);
            return (
                <tr key={price.symbol} className="border-b border-gray-700">
                    <td className="py-2 px-4">{price.symbol}</td>
                    <td className="py-2 px-4 font-bold text-white">{price.lastPrice}</td>
                    <td className={`py-2 px-4 ${priceChange < 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {priceChange}%
                    </td>
                </tr>
            );
        });
    };

    const renderFavorites = () => {
        const favorites = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT']; // Example favorites
        return favorites.map((symbol) => {
            const priceData = prices.find(price => price.symbol === symbol);
            return (
                <tr key={symbol} className="border-b border-gray-700">
                    <td className="py-2 px-4">{symbol}</td>
                    <td className="py-2 px-4 font-bold text-white">{priceData ? priceData.lastPrice : 'N/A'}</td>
                    <td className={`py-2 px-4 ${priceData && parseFloat(priceData.priceChangePercent) < 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {priceData ? priceData.priceChangePercent : 'N/A'}%
                    </td>
                </tr>
            );
        });
    };

    const renderHotAssets = () => {
        // Example hot assets (you can replace this with actual data)
        const hotAssets = ['SOLUSDT', 'AVAXUSDT', 'MATICUSDT'];
        return hotAssets.map((symbol) => {
            const priceData = prices.find(price => price.symbol === symbol);
            return (
                <tr key={symbol} className="border-b border-gray-700">
                    <td className="py-2 px-4">{symbol}</td>
                    <td className="py-2 px-4 font-bold text-white">{priceData ? priceData.lastPrice : 'N/A'}</td>
                    <td className={`py-2 px-4 ${priceData && parseFloat(priceData.priceChangePercent) < 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {priceData ? priceData.priceChangePercent : 'N/A'}%
                    </td>
                </tr>
            );
        });
    };

    const renderGainersLosers = () => {
        const gainers = prices.sort((a, b) => parseFloat(b.priceChangePercent) - parseFloat(a.priceChangePercent)).slice(0, 5);
        const losers = prices.sort((a, b) => parseFloat(a.priceChangePercent) - parseFloat(b.priceChangePercent)).slice(0, 5);
        
        return (
            <div>
                <h3 className="text-lg font-bold">Top Gainers</h3>
                <table className="min-w-full bg-[#191B1F] rounded mb-4">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-700">Symbol</th>
                            <th className="py-2 px-4 border-b border-gray-700">Last Price</th>
                            <th className="py-2 px-4 border-b border-gray-700">Change (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gainers.map((price) => (
                            <tr key={price.symbol} className="border-b border-gray-700">
                                <td className="py-2 px-4">{price.symbol}</td>
                                <td className="py-2 px-4 font-bold text-white">{price.lastPrice}</td>
                                <td className={`py-2 px-4 text-green-500`}>
                                    {price.priceChangePercent}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h3 className="text-lg font-bold">Top Losers</h3>
                <table className="min-w-full bg-[#191B1F] rounded">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-700">Symbol</th>
                            <th className="py-2 px-4 border-b border-gray-700">Last Price</th>
                            <th className="py-2 px-4 border-b border-gray-700">Change (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {losers.map((price) => (
                            <tr key={price.symbol} className="border-b border-gray-700">
                                <td className="py-2 px-4">{price.symbol}</td>
                                <td className="py-2 px-4 font-bold text-white">{price.lastPrice}</td>
                                <td className={`py-2 px-4 text-red-500`}>
                                    {price.priceChangePercent}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-screen bg-[#121212] text-[#EAECEF]">
            {/* Header */}
            <header className="flex justify-between items-center p-2 bg-[#191B1F]">
                <h1 className="text-lg">Crypto Dashboard</h1>
                <div className="flex items-center">
                    <input type="text" placeholder="Search..." className="p-1 rounded bg-[#191B1F] border border-gray-600 text-sm" />
                    <button className="ml-2 p-1 bg-[#F0B90B] rounded text-sm">Notifications</button>
                    <FaUser className="ml-2 text-xl" />
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow p-2 overflow-y-auto">
                <div className="bg-[#191B1F] p-4 rounded mb-4">
                    <h2 className="text-lg font-bold">Total Balance</h2>
                    <p className="text-2xl font-bold">${userBalance.toFixed(2)}</p>
                    <button className="mt-2 p-2 bg-[#F0B90B] rounded">Add Funds</button>
                </div>

                {/* Tabs for Favorites, Hot, Gainers/Losers */}
                <div className="mb-4 flex justify-around">
                    <button onClick={() => setActiveTab('favorites')} className={`py-2 px-4 ${activeTab === 'favorites' ? 'bg-[#F0B90B]' : 'bg-[#191B1F]'} rounded`}>
                        Favorites
                    </button>
                    <button onClick={() => setActiveTab('hot')} className={`py-2 px-4 ${activeTab === 'hot' ? 'bg-[#F0B90B]' : 'bg-[#191B1F]'} rounded`}>
                        Hot
                    </button>
                    <button onClick={() => setActiveTab('gainersLosers')} className={`py-2 px-4 ${activeTab === 'gainersLosers' ? 'bg-[#F0B90B]' : 'bg-[#191B1F]'} rounded`}>
                        Gainers/Losers
                    </button>
                </div>

                {/* Render Active Tab Content */}
                {activeTab === 'favorites' && (
                    <table className="min-w-full bg-[#191B1F] rounded">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-gray-700">Symbol</th>
                                <th className="py-2 px-4 border-b border-gray-700">Last Price</th>
                                <th className="py-2 px-4 border-b border-gray-700">Change (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderFavorites()}
                        </tbody>
                    </table>
                )}
                {activeTab === 'hot' && (
                    <table className="min-w-full bg-[#191B1F] rounded">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-gray-700">Symbol</th>
                                <th className="py-2 px-4 border-b border-gray-700">Last Price</th>
                                <th className="py-2 px-4 border-b border-gray-700">Change (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderHotAssets()}
                        </tbody>
                    </table>
                )}
                {activeTab === 'gainersLosers' && renderGainersLosers()}
            </main>

            {/* Bottom Navigation for Mobile */}
            <nav className="fixed bottom-0 left-0 right-0 bg-[#191B1F] p-2 flex justify-around">
                <FaHome className="text-white" onClick={() => navigate('/')} />
                <FaChartLine className="text-white" onClick={() => navigate('/markets')} />
                <FaExchangeAlt className="text-white" onClick={() => navigate('/trade')} />
                <FaWallet className="text-white" onClick={() => navigate('/assets')} />
            </nav>
        </div>
    );
};

export default Dashboard; 