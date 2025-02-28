// src/pages/Markets.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2'; // Import Line from react-chartjs-2
import 'chartjs-adapter-moment'; // Import the date adapter
import moment from 'moment';
import { FaChartLine, FaTimes, FaArrowUp, FaArrowDown, FaBars } from 'react-icons/fa';
import BottomNavbar from '../components/BottomNavbar'; // Import the Bottom Navbar component

const Markets = () => {
    const [markets, setMarkets] = useState([]);
    const [filteredMarkets, setFilteredMarkets] = useState([]);
    const [selectedMarket, setSelectedMarket] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Number of items per page
    const [updateInterval, setUpdateInterval] = useState(null); // Interval for updating chart data
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    useEffect(() => {
        const fetchMarkets = async () => {
            try {
                const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
                setMarkets(response.data);
                setFilteredMarkets(response.data); // Initialize filtered markets
            } catch (error) {
                console.error('Error fetching market data:', error);
            }
        };

        fetchMarkets();
        const interval = setInterval(fetchMarkets, 10000); // Update market data every 10 seconds
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Filter markets based on search term
        const filtered = markets.filter(market => 
            market.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMarkets(filtered);
        setCurrentPage(1); // Reset to first page on search
    }, [searchTerm, markets]);

    const fetchChartData = async (symbol) => {
        try {
            const response = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=24`);
            const formattedData = response.data.map(item => ({
                time: moment(item[0]).toISOString(), // Use ISO format for time
                open: parseFloat(item[1]),
                high: parseFloat(item[2]),
                low: parseFloat(item[3]),
                close: parseFloat(item[4]),
            }));
            setChartData(formattedData);
            setSelectedMarket(symbol);
            setIsModalOpen(true); // Open the modal when data is fetched

            // Start updating the chart data every 5 seconds
            if (updateInterval) clearInterval(updateInterval);
            const interval = setInterval(() => updateChartData(symbol), 5000);
            setUpdateInterval(interval);
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };

    const updateChartData = async (symbol) => {
        try {
            const response = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=1`);
            const newData = response.data.map(item => ({
                time: moment(item[0]).toISOString(),
                open: parseFloat(item[1]),
                high: parseFloat(item[2]),
                low: parseFloat(item[3]),
                close: parseFloat(item[4]),
            }));
            setChartData(prevData => [...prevData.slice(1), ...newData]); // Update the chart data
        } catch (error) {
            console.error('Error updating chart data:', error);
        }
    };

    const renderMarketList = () => {
        // Sort markets to put BTC/USDT at the top
        const sortedMarkets = [...filteredMarkets].sort((a, b) => (a.symbol === 'BTCUSDT' ? -1 : 1));
        const indexOfLastMarket = currentPage * itemsPerPage;
        const indexOfFirstMarket = indexOfLastMarket - itemsPerPage;
        const currentMarkets = sortedMarkets.slice(indexOfFirstMarket, indexOfLastMarket);

        return currentMarkets.map((market) => {
            const priceChange = parseFloat(market.priceChangePercent);
            const isHotStock = market.symbol === 'BTCUSDT'; // Example condition for hot stock
            return (
                <tr key={market.symbol} className="border-b border-gray-700 cursor-pointer hover:bg-gray-800" onClick={() => fetchChartData(market.symbol)}>
                    <td className="py-4 px-4 flex items-center">
                        {isHotStock && <span className="text-red-500 mr-1 text-lg" style={{ lineHeight: '1' }}>🔥</span>} {/* Fire emoji for hot stock */}
                        <span className="text-sm">{market.symbol}</span>
                    </td>
                    <td className="py-4 px-4 font-bold text-white">{market.lastPrice}</td>
                    <td className={`py-4 px-4 flex items-center ${priceChange < 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {priceChange < 0 ? <FaArrowDown className="mr-1" /> : <FaArrowUp className="mr-1" />} {market.priceChangePercent}%
                    </td>
                </tr>
            );
        });
    };

    const renderChart = () => {
        if (!selectedMarket || chartData.length === 0) return null;

        const data = {
            labels: chartData.map(item => item.time),
            datasets: [{
                label: selectedMarket,
                data: chartData.map(item => ({
                    x: item.time,
                    y: [item.open, item.high, item.low, item.close],
                })),
                borderColor: '#F0B90B',
                backgroundColor: 'rgba(240, 185, 11, 0.5)',
            }],
        };

        return (
            <div className="mt-4">
                <h2 className="text-lg font-bold mb-2">Chart for {selectedMarket} <span role="img" aria-label="chart">📈</span></h2>
                <div className="bg-[#191B1F] p-4 rounded">
                    <Line
                        data={data}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                x: {
                                    type: 'time',
                                    time: {
                                        unit: 'hour',
                                    },
                                    grid: {
                                        display: false,
                                    },
                                },
                                y: {
                                    beginAtZero: false,
                                    grid: {
                                        color: '#444',
                                    },
                                },
                            },
                        }}
                        height={300}
                    />
                </div>
                <div className="flex justify-between mt-4">
                    <button className="bg-green-500 text-white px-4 py-2 rounded">Buy</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded">Sell</button>
                </div>
            </div>
        );
    };

    const totalPages = Math.ceil(filteredMarkets.length / itemsPerPage);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Sidebar for Desktop */}
            <div className={`hidden md:flex flex-col bg-[#191B1F] p-4 w-64 h-screen fixed`}>
                <h2 className="text-xl font-bold text-white mb-4">Navigation</h2>
                <ul>
                    <li className="text-white py-2 hover:bg-gray-700 cursor-pointer">Home</li>
                    <li className="text-white py-2 hover:bg-gray-700 cursor-pointer">Markets</li>
                    <li className="text-white py-2 hover:bg-gray-700 cursor-pointer">Settings</li>
                    <li className="text-white py-2 hover:bg-gray-700 cursor-pointer">Profile</li>
                    {/* Add bottom tab links here */}
                    <li className="text-white py-2 hover:bg-gray-700 cursor-pointer">Tab 1</li>
                    <li className="text-white py-2 hover:bg-gray-700 cursor-pointer">Tab 2</li>
                </ul>
            </div>

            <div className="flex-1 p-4 bg-[#121212] text-[#EAECEF] md:ml-64">
                <h1 className="text-2xl font-bold mb-4 flex items-center">
                    <FaChartLine className="mr-2" /> Markets
                </h1>
                <input
                    type="text"
                    placeholder="Search markets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4 p-2 rounded bg-gray-700 text-white w-full"
                />
                <table className="min-w-full bg-[#191B1F] rounded mb-4">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-700">Symbol</th>
                            <th className="py-2 px-4 border-b border-gray-700">Last Price</th>
                            <th className="py-2 px-4 border-b border-gray-700">24h Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderMarketList()}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="flex justify-between mt-4">
                    <button 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="self-center">Page {currentPage} of {totalPages}</span>
                    <button 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>

                {/* Modal for Chart */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                        <div className="bg-white p-4 rounded shadow-lg w-11/12 md:w-1/2 h-full">
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                                <FaTimes />
                            </button>
                            {renderChart()}
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Navigation Bar for Mobile */}
            <BottomNavbar /> {/* Include the Bottom Navbar at the bottom */}
        </div>
    );
};

export default Markets;