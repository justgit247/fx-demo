// src/pages/Markets.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import moment from 'moment';
import { Wallet, Home, BarChart2, Repeat, CreditCard, User, ArrowUpRight, ArrowDownRight, X, Star, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { Chart, registerables } from 'chart.js';

// Register all necessary components
Chart.register(...registerables);

const Markets = () => {
  const [markets, setMarkets] = useState([]);
  const [filteredMarkets, setFilteredMarkets] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [updateInterval, setUpdateInterval] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const fetchMarkets = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
        setMarkets(response.data);
        setFilteredMarkets(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching market data:', error);
        setIsLoading(false);
      }
    };

    fetchMarkets();
    const interval = setInterval(fetchMarkets, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Filter markets based on search term
    const filtered = markets.filter(market => 
      market.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMarkets(filtered);
    setCurrentPage(1);
  }, [searchTerm, markets]);

  const fetchChartData = async (symbol) => {
    try {
      const response = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=24`);
      const formattedData = response.data.map(item => ({
        time: moment(item[0]).toISOString(),
        open: parseFloat(item[1]),
        high: parseFloat(item[2]),
        low: parseFloat(item[3]),
        close: parseFloat(item[4]),
      }));
      setChartData(formattedData);
      setSelectedMarket(symbol);
      setIsModalOpen(true);

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
      setChartData(prevData => [...prevData.slice(1), ...newData]);
    } catch (error) {
      console.error('Error updating chart data:', error);
    }
  };

  const renderMarketList = () => {
    const sortedMarkets = [...filteredMarkets].sort((a, b) => (a.symbol === 'BTCUSDT' ? -1 : 1));
    const indexOfLastMarket = currentPage * itemsPerPage;
    const indexOfFirstMarket = indexOfLastMarket - itemsPerPage;
    const currentMarkets = sortedMarkets.slice(indexOfFirstMarket, indexOfLastMarket);

    return currentMarkets.map((market) => {
      const priceChange = parseFloat(market.priceChangePercent);
      const isHotStock = market.symbol === 'BTCUSDT';
      return (
        <div 
          key={market.symbol} 
          className="border-b border-gray-700 p-3 cursor-pointer hover:bg-gray-700 transition-colors flex justify-between items-center"
          onClick={() => fetchChartData(market.symbol)}
        >
          <div className="flex items-center">
            {isHotStock && (
              <div className="bg-red-900 p-1 rounded-full mr-2 text-xs">🔥</div>
            )}
            <div>
              <h3 className="font-medium">{market.symbol}</h3>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold">{market.lastPrice}</p>
            <p className={`text-xs flex items-center ${priceChange < 0 ? 'text-red-500' : 'text-green-500'}`}>
              {priceChange < 0 ? 
                <ArrowDownRight size={14} /> : 
                <ArrowUpRight size={14} />
              } {market.priceChangePercent}%
            </p>
          </div>
        </div>
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

    // Cleanup previous chart instance if it exists
    if (chartInstance) {
      chartInstance.destroy();
    }

    const newChartInstance = new Chart(document.getElementById('myChart'), {
      type: 'line',
      data: data,
      options: {
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
      },
    });

    setChartInstance(newChartInstance);
  };

  const totalPages = Math.ceil(filteredMarkets.length / itemsPerPage);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col md:flex-row">
      {/* Sidebar Navigation (Desktop Only) */}
      <div className="hidden md:flex flex-col bg-red-900 w-64 min-h-screen sticky top-0">
        {/* Logo */}
        <div className="p-4 flex items-center justify-center border-b border-red-800">
          <Logo className="h-8" />
        </div>
        
        {/* Navigation Links */}
        <div className="flex-1 py-6">
          <Link to="/dashboard" className="flex items-center space-x-3 px-6 py-3 text-white hover:bg-red-800 transition-colors">
            <Home size={20} />
            <span className="font-medium">Home</span>
          </Link>
          <Link to="/markets" className="flex items-center space-x-3 px-6 py-3 bg-red-800 text-white">
            <BarChart2 size={20} />
            <span className="font-medium">Markets</span>
          </Link>
          <Link to="/wallet" className="flex items-center space-x-3 px-6 py-3 text-white hover:bg-red-800 transition-colors">
            <Wallet size={20} />
            <span className="font-medium">Wallet</span>
          </Link>
          <Link to="/trades" className="flex items-center space-x-3 px-6 py-3 text-white hover:bg-red-800 transition-colors">
            <Repeat size={20} />
            <span className="font-medium">Trades</span>
          </Link>
          <Link to="/profile" className="flex items-center space-x-3 px-6 py-3 text-white hover:bg-red-800 transition-colors">
            <User size={20} />
            <span className="font-medium">Profile</span>
          </Link>
        </div>
        
        {/* User Actions */}
        <div className="p-4 border-t border-red-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User size={18} />
              <span className="font-medium">User</span>
            </div>
            <Star size={18} className="cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Top Bar (Mobile Only) */}
      <div className="md:hidden sticky top-0 bg-red-900 text-white p-2 shadow-lg z-10 flex items-center justify-between">
        <div className="flex items-center pl-2">
          <Logo className="h-5" />
        </div>
        <div className="flex items-center space-x-4 pr-2">
          <Star size={18} className="cursor-pointer" />
          <User size={18} className="cursor-pointer" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        {/* Header Card */}
        <div className="mx-4 mt-4 p-6 bg-gradient-to-r from-red-900 to-red-800 rounded-xl shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Markets</h1>
              <p className="text-gray-300">Trade cryptocurrencies with real-time data</p>
            </div>
            
            {/* Search Bar */}
            <div className="mt-4 md:mt-0 w-full md:w-1/3">
              <div className="flex bg-gray-800 rounded-lg items-center overflow-hidden">
                <Search size={18} className="ml-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search markets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-800 text-white w-full p-2 pl-2 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Markets Table */}
        <div className="grid grid-cols-1 gap-4 p-4">
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Market Overview</h2>
              <BarChart2 size={18} className="text-gray-400" />
            </div>
            
            <div className="divide-y divide-gray-700">
              {renderMarketList()}
            </div>
            
            {/* Pagination Controls */}
            <div className="p-4 border-t border-gray-700 flex justify-between items-center">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="bg-gray-700 text-white p-2 rounded-lg disabled:opacity-50 flex items-center"
              >
                <ChevronLeft size={16} />
                <span className="ml-1">Previous</span>
              </button>
              <span className="text-gray-400">Page {currentPage} of {totalPages}</span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="bg-gray-700 text-white p-2 rounded-lg disabled:opacity-50 flex items-center"
              >
                <span className="mr-1">Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tab Navigation (Mobile Only) */}
      <div className="bg-red-900 p-2 flex justify-around fixed bottom-0 w-full md:hidden">
        <Link to="/dashboard" className="flex flex-col items-center text-white">
          <Home size={24} />
          <span className="text-xs font-medium">Dashboard</span>
        </Link>
        <Link to="/markets" className="flex flex-col items-center text-white">
          <BarChart2 size={24} />
          <span className="text-xs font-medium">Markets</span>
        </Link>
        <Link to="/wallet" className="flex flex-col items-center text-white">
          <Wallet size={24} />
          <span className="text-xs font-medium">Wallet</span>
        </Link>
        <Link to="/trades" className="flex flex-col items-center text-white">
          <Repeat size={24} />
          <span className="text-xs font-medium">Trades</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center text-white">
          <User size={24} />
          <span className="text-xs font-medium">Profile</span>
        </Link>
      </div>

      {/* Modal for Chart */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">{selectedMarket} Chart</h2>
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  if (updateInterval) clearInterval(updateInterval);
                }} 
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <canvas id="myChart" height="300"></canvas>
          </div>
        </div>
      )}
    </div>
  );
};

export default Markets;