import React, { useState, useEffect } from 'react';
import { Wallet as WalletIcon, Home, BarChart2, Repeat, CreditCard, User, Plus, Minus, TrendingUp, TrendingDown, DollarSign, Bitcoin, ArrowUpRight, ArrowDownRight, Star, Clock, Activity } from 'lucide-react';
import DepositButton from './DepositButton';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const Wallet = () => {
  const [userBalance, setUserBalance] = useState({
    USDT: 10000.00,
    BTC: 0.25,
    ETH: 3.5
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState('USDT');

  // Calculated total balance
  const totalBalance = userBalance.USDT + (userBalance.BTC * 45000) + (userBalance.ETH * 2400);
  
  // Crypto price data
  const cryptoPrices = {
    BTC: { price: 45000, change: 5.2 },
    ETH: { price: 2400, change: 3.8 },
    BNB: { price: 320, change: 2.5 },
    SOL: { price: 105.75, change: 4.3 },
    ADA: { price: 0.45, change: -4.1 },
    XRP: { price: 0.55, change: -3.5 },
    DOGE: { price: 0.08, change: -2.8 }
  };

  // Recent trade history
  const recentTrades = [
    { id: 1, type: 'buy', pair: 'BTC/USDT', amount: 0.05, price: 44850, time: '2 hours ago' },
    { id: 2, type: 'sell', pair: 'ETH/USDT', amount: 0.8, price: 2410, time: '5 hours ago' },
    { id: 3, type: 'buy', pair: 'SOL/USDT', amount: 4.5, price: 102.25, time: '1 day ago' }
  ];

  // Market analysis (simulated)
  const marketAnalysis = {
    btcPrediction: 'Bullish',
    ethPrediction: 'Neutral',
    marketSentiment: 'Positive',
    tradingVolume: '$456B',
    volatilityIndex: 'Medium'
  };

  // Fetch user balance (mocked)
  useEffect(() => {
    const fetchUserBalance = async () => {
      // Simulate API call and set user balance
      setTimeout(() => {
        setUserBalance({
          USDT: 10000.00,
          BTC: 0.25,
          ETH: 3.5
        });
        setIsLoading(false);
      }, 1000);
    };
  
    fetchUserBalance();
  }, []);
  

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
          <Link to="/markets" className="flex items-center space-x-3 px-6 py-3 text-white hover:bg-red-800 transition-colors">
            <BarChart2 size={20} />
            <span className="font-medium">Markets</span>
          </Link>
          <Link to="/wallet" className="flex items-center space-x-3 px-6 py-3 bg-red-800 text-white">
            <WalletIcon size={20} />
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
        {/* Balance Card (Prominent) */}
        <div className="mx-4 mt-4 p-6 bg-gradient-to-r from-red-900 to-red-800 rounded-xl shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <p className="text-gray-300 mb-1">Total Balance</p>
              <h2 className="text-3xl font-bold mb-2">${totalBalance.toLocaleString(undefined, {maximumFractionDigits: 2})}</h2>
              <p className="text-green-400 text-sm flex items-center">
                <ArrowUpRight size={14} className="mr-1" /> +2.4% Today
              </p>
            </div>
            
            <div className="flex space-x-2 mt-4 md:mt-0">
              <button className="bg-red-800 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center">
                <Plus size={16} className="mr-1" /> Deposit
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg flex items-center">
                <Minus size={16} className="mr-1" /> Withdraw
              </button>
            </div>
          </div>
        </div>
        
        {/* Content Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {/* Assets Column */}
          <div className="md:col-span-1">
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg mb-4">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold">Your Assets</h2>
              </div>
              
              {/* USDT Balance */}
              <div className="p-3 border-b border-gray-700 flex justify-between items-center hover:bg-gray-700 transition-colors">
                <div className="flex items-center">
                  <div className="bg-green-600 p-2 rounded-full mr-3">
                    <DollarSign size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium">USDT</h3>
                    <p className="text-xs text-gray-400">Tether USD</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{userBalance.USDT.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">${userBalance.USDT.toLocaleString()}</p>
                </div>
              </div>
              
              {/* BTC Balance */}
              <div className="p-3 border-b border-gray-700 flex justify-between items-center hover:bg-gray-700 transition-colors">
                <div className="flex items-center">
                  <div className="bg-yellow-600 p-2 rounded-full mr-3">
                    <Bitcoin size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium">BTC</h3>
                    <p className="text-xs text-gray-400">Bitcoin</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{userBalance.BTC.toFixed(8)}</p>
                  <p className="text-xs text-gray-400">${(userBalance.BTC * 45000).toLocaleString()}</p>
                </div>
              </div>
              
              {/* ETH Balance */}
              <div className="p-3 flex justify-between items-center hover:bg-gray-700 transition-colors">
                <div className="flex items-center">
                  <div className="bg-blue-600 p-2 rounded-full mr-3">
                    <div className="font-bold">Ξ</div>
                  </div>
                  <div>
                    <h3 className="font-medium">ETH</h3>
                    <p className="text-xs text-gray-400">Ethereum</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{userBalance.ETH.toFixed(6)}</p>
                  <p className="text-xs text-gray-400">${(userBalance.ETH * 2400).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="p-3 text-center">
                <button className="text-red-400 text-sm font-medium hover:text-red-300">
                  View All Assets
                </button>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold">Quick Actions</h2>
              </div>
              <div className="grid grid-cols-2 gap-2 p-3">
                <button className="bg-red-900 hover:bg-red-800 rounded-lg p-3 flex flex-col items-center">
                  <BarChart2 size={18} className="mb-1" />
                  <span className="text-xs font-medium">Trade</span>
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 rounded-lg p-3 flex flex-col items-center">
                  <Repeat size={18} className="mb-1" />
                  <span className="text-xs font-medium">Transfer</span>
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 rounded-lg p-3 flex flex-col items-center">
                  <CreditCard size={18} className="mb-1" />
                  <span className="text-xs font-medium">Buy Crypto</span>
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 rounded-lg p-3 flex flex-col items-center">
                  <Activity size={18} className="mb-1" />
                  <span className="text-xs font-medium">Earn</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Middle Column - Market Overview */}
          <div className="md:col-span-1">
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg mb-4">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold">Market Overview</h2>
              </div>
              
              <div className="px-4 py-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Market Cap</span>
                  <span className="font-medium">$1.82T</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">24h Volume</span>
                  <span className="font-medium">$64.5B</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">BTC Dominance</span>
                  <span className="font-medium">42.8%</span>
                </div>
              </div>
              
              <div className="p-3 border-t border-gray-700">
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <TrendingUp size={14} className="text-green-500 mr-1" /> Top Gainers
                </h3>
                <div className="space-y-2">
                  {Object.entries(cryptoPrices)
                    .filter(([_, data]) => data.change > 0)
                    .sort(([_, a], [__, b]) => b.change - a.change)
                    .slice(0, 3)
                    .map(([symbol, data]) => (
                      <div key={symbol} className="flex justify-between items-center p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer">
                        <div className="font-medium">{symbol}/USDT</div>
                        <div className="flex items-center">
                          <span className="text-green-500 font-medium">${data.price.toLocaleString()}</span>
                          <span className="ml-2 text-green-500 flex items-center">
                            <ArrowUpRight size={14} />
                            {data.change}%
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              
              <div className="p-3 border-t border-gray-700">
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <TrendingDown size={14} className="text-red-500 mr-1" /> Top Losers
                </h3>
                <div className="space-y-2">
                  {Object.entries(cryptoPrices)
                    .filter(([_, data]) => data.change < 0)
                    .sort(([_, a], [__, b]) => a.change - b.change)
                    .slice(0, 3)
                    .map(([symbol, data]) => (
                      <div key={symbol} className="flex justify-between items-center p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer">
                        <div className="font-medium">{symbol}/USDT</div>
                        <div className="flex items-center">
                          <span className="text-red-500 font-medium">${data.price.toLocaleString()}</span>
                          <span className="ml-2 text-red-500 flex items-center">
                            <ArrowDownRight size={14} />
                            {Math.abs(data.change)}%
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Trade Activity & Analysis */}
          <div className="md:col-span-1">
            {/* Recent Trades */}
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg mb-4">
              <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Recent Trades</h2>
                <Clock size={16} className="text-gray-400" />
              </div>
              
              <div className="divide-y divide-gray-700">
                {recentTrades.map(trade => (
                  <div key={trade.id} className="p-3 flex justify-between items-center hover:bg-gray-700 transition-colors">
                    <div>
                      <div className="flex items-center">
                        <div className={`p-1 rounded-md mr-2 ${trade.type === 'buy' ? 'bg-green-800 text-green-400' : 'bg-red-800 text-red-400'}`}>
                          {trade.type === 'buy' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        </div>
                        <span className="font-medium">{trade.pair}</span>
                      </div>
                      <p className="text-xs text-gray-400">{trade.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{trade.amount} {trade.pair.split('/')[0]}</p>
                      <p className="text-xs text-gray-400">${(trade.amount * trade.price).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-3 text-center border-t border-gray-700">
                <Link to="/trades" className="text-red-400 text-sm font-medium hover:text-red-300">
                  View All Trades
                </Link>
              </div>
            </div>
            
            {/* Market Analysis */}
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold">Market Analysis</h2>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <p className="text-xs text-gray-400">BTC Prediction</p>
                    <p className="font-medium text-green-400">{marketAnalysis.btcPrediction}</p>
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <p className="text-xs text-gray-400">ETH Prediction</p>
                    <p className="font-medium text-yellow-400">{marketAnalysis.ethPrediction}</p>
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <p className="text-xs text-gray-400">Market Sentiment</p>
                    <p className="font-medium text-green-400">{marketAnalysis.marketSentiment}</p>
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <p className="text-xs text-gray-400">Trading Volume</p>
                    <p className="font-medium">{marketAnalysis.tradingVolume}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <button className="w-full bg-red-900 hover:bg-red-800 transition-colors py-2 rounded-lg font-medium">
                    Start Trading
                  </button>
                </div>
              </div>
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
          <WalletIcon size={24} />
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
    </div>
  );
};

export default Wallet;