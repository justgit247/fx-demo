import React, { useState, useEffect } from 'react';
import { Home, BarChart2, Repeat, CreditCard, Star, TrendingUp, TrendingDown, Plus, Minus, Users, User } from 'lucide-react';
import axios from 'axios';
import DepositButton from './DepositButton';
import { Link, useNavigate } from 'react-router-dom';

const CopytradingDashboard = () => {
  const [marketData, setMarketData] = useState([]);
  const [userBalance, setUserBalance] = useState({
    USDT: 10000.00,
    BTC: 0.25,
    ETH: 3.5
  });
  const [userWatchlist, setUserWatchlist] = useState(['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'ADAUSDT']);
  const [isLoading, setIsLoading] = useState(true);
  const [totalBalanceUSDT, setTotalBalanceUSDT] = useState(0);
  const [recentTrades, setRecentTrades] = useState([
    { id: 1, symbol: 'BTCUSDT', side: 'BUY', amount: '0.05', price: '79850.00', total: '2337.50', time: '12:30:45' },
    { id: 2, symbol: 'ETHUSDT', side: 'SELL', amount: '0.75', price: '2450.00', total: '1837.50', time: '10:15:20' },
    { id: 3, symbol: 'ADAUSDT', side: 'BUY', amount: '1500', price: '0.55', total: '825.00', time: '09:05:30' }
  ]);
  const [isMobile, setIsMobile] = useState(false);
  const username = "Alex Thompson";
  const navigate = useNavigate();

  // Function to handle wallet navigation
  const handleWalletClick = () => {
    navigate('/wallet');
  };

  // Check screen size on mount and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add resize listener
    window.addEventListener('resize', checkScreenSize);
    
    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Fetch market data
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
        const formattedData = response.data
          .filter(item => item.symbol.endsWith('USDT'))
          .map(item => ({
            symbol: item.symbol,
            priceChange: parseFloat(item.priceChange),
            priceChangePercent: parseFloat(item.priceChangePercent),
            lastPrice: parseFloat(item.lastPrice),
            volume: parseFloat(item.volume),
            quoteVolume: parseFloat(item.quoteVolume)
          }))
          .sort((a, b) => b.quoteVolume - a.quoteVolume);
        
        setMarketData(formattedData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching market data:', error);
        // If Binance API fails, use mock data
        const mockData = generateMockMarketData();
        setMarketData(mockData);
        setIsLoading(false);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Generate mock market data if API fails
  const generateMockMarketData = () => {
    // Same implementation as before
    const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'ADAUSDT', 'DOGEUSDT', 'XRPUSDT', 'SOLUSDT', 'DOTUSDT', 'AVAXUSDT', 'MATICUSDT'];
    const mockData = symbols.map(symbol => {
      const basePrice = symbol === 'BTCUSDT' ? 45000 : 
                        symbol === 'ETHUSDT' ? 2400 : 
                        symbol === 'BNBUSDT' ? 350 : 
                        symbol === 'ADAUSDT' ? 0.5 :
                        symbol === 'DOGEUSDT' ? 0.12 :
                        symbol === 'XRPUSDT' ? 0.55 :
                        symbol === 'SOLUSDT' ? 105 :
                        symbol === 'DOTUSDT' ? 7.5 :
                        symbol === 'AVAXUSDT' ? 28 : 1.2; // MATICUSDT
                        
      const changePercent = (Math.random() * 10) - 5; // Random between -5% and +5%
      
      return {
        symbol,
        priceChange: basePrice * (changePercent / 100),
        priceChangePercent: changePercent,
        lastPrice: basePrice,
        volume: Math.random() * 10000,
        quoteVolume: Math.random() * 50000000
      };
    });
    
    return mockData;
  };

  // Calculate total balance in USDT
  useEffect(() => {
    if (marketData.length > 0 && userBalance) {
      let total = userBalance.USDT || 0;
      
      // Add BTC value
      const btcPrice = marketData.find(item => item.symbol === 'BTCUSDT')?.lastPrice || 45000; // Fallback price
      total += (userBalance.BTC || 0) * btcPrice;
      
      // Add ETH value
      const ethPrice = marketData.find(item => item.symbol === 'ETHUSDT')?.lastPrice || 2400; // Fallback price
      total += (userBalance.ETH || 0) * ethPrice;
      
      setTotalBalanceUSDT(total);
    }
  }, [marketData, userBalance]);

  // Toggle watchlist item
  const handleToggleWatchlist = (symbol) => {
    if (userWatchlist.includes(symbol)) {
      setUserWatchlist(userWatchlist.filter(item => item !== symbol));
    } else {
      setUserWatchlist([...userWatchlist, symbol]);
    }
  };

  // Get top gainers and losers
  const getTopGainers = () => {
    return [...marketData]
      .sort((a, b) => b.priceChangePercent - a.priceChangePercent)
      .slice(0, 5);
  };

  const getTopLosers = () => {
    return [...marketData]
      .sort((a, b) => a.priceChangePercent - b.priceChangePercent)
      .slice(0, 5);
  };

  // Get watchlist items
  const getWatchlistItems = () => {
    return marketData.filter(item => userWatchlist.includes(item.symbol));
  };

  // Function to handle deposit action
  const handleDeposit = (coin, amount) => {
    // Implement your deposit logic here
    console.log(`Depositing ${amount} of ${coin}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Desktop Sidebar - Only visible on desktop */}
      {!isMobile && <DesktopSidebar onWalletClick={handleWalletClick} />}
      
      {/* Mobile Top Bar - Only visible on mobile */}
      {isMobile && <MobileTopBar />}
      
      {/* Content Area */}
      <div className={`${isMobile ? 'pt-16 pb-16' : 'ml-64'}`}>
        <div className="p-4">
          {/* Welcome Section */}
          <div className="mb-6 bg-gray-800 rounded-lg p-4">
            <h1 className="text-xl font-semibold text-white">Welcome, {username}</h1>
            <p className="text-gray-400">Here's your copytrading dashboard overview</p>
          </div>
          
          {/* Balance Overview */}
          <div className="mb-6 bg-red-900 rounded-lg p-4 text-white">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Total Balance</h2>
              <DepositButton onDepositClick={handleDeposit} />
            </div>
            <div className="text-2xl font-bold">${totalBalanceUSDT.toFixed(2)}</div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="bg-gray-800 p-2 rounded">
                <p className="text-xs text-gray-400">USDT</p>
                <p className="font-semibold">{userBalance.USDT.toFixed(2)}</p>
              </div>
              <div className="bg-gray-800 p-2 rounded">
                <p className="text-xs text-gray-400">BTC</p>
                <p className="font-semibold">{userBalance.BTC.toFixed(8)}</p>
              </div>
              <div className="bg-gray-800 p-2 rounded">
                <p className="text-xs text-gray-400">ETH</p>
                <p className="font-semibold">{userBalance.ETH.toFixed(6)}</p>
              </div>
            </div>
          </div>
          
          {/* Recent Trades */}
          <div className="mb-6 bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-white mb-3">Recent Trades</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-700">
                    <th className="text-left py-2">Pair</th>
                    <th className="text-left py-2">Side</th>
                    <th className="text-right py-2">Amount</th>
                    <th className="text-right py-2">Price</th>
                    <th className="text-right py-2">Total</th>
                    <th className="text-right py-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTrades.map(trade => (
                    <tr key={trade.id} className="border-b border-gray-700">
                      <td className="py-2 text-white">{trade.symbol}</td>
                      <td className={`py-2 ${trade.side === 'BUY' ? 'text-green-500' : 'text-red-500'}`}>{trade.side}</td>
                      <td className="py-2 text-right text-gray-300">{trade.amount}</td>
                      <td className="py-2 text-right text-gray-300">{trade.price}</td>
                      <td className="py-2 text-right text-gray-300">${trade.total}</td>
                      <td className="py-2 text-right text-gray-400">{trade.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Favorites Section */}
          <div className="mb-6 bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-white mb-3">Favorites</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-700">
                    <th className="text-left py-2">Pair</th>
                    <th className="text-right py-2">Price</th>
                    <th className="text-right py-2">24h Change</th>
                    <th className="text-right py-2">Volume</th>
                    <th className="text-center py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getWatchlistItems().map(item => (
                    <tr key={item.symbol} className="border-b border-gray-700">
                      <td className="py-2 text-white">{item.symbol}</td>
                      <td className="py-2 text-right text-gray-300">${item.lastPrice.toFixed(item.lastPrice < 1 ? 6 : 2)}</td>
                      <td className={`py-2 text-right ${item.priceChangePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {item.priceChangePercent >= 0 ? '+' : ''}{item.priceChangePercent.toFixed(2)}%
                      </td>
                      <td className="py-2 text-right text-gray-300">${(item.quoteVolume / 1000000).toFixed(2)}M</td>
                      <td className="py-2 text-center">
                        <button 
                          className="text-yellow-500"
                          onClick={() => handleToggleWatchlist(item.symbol)}
                        >
                          <Star size={16} fill="#EAB308" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Top Gainers and Losers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Top Gainers */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <TrendingUp size={20} className="text-green-500 mr-2" />
                <h2 className="text-lg font-semibold text-white">Top Gainers</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-400 border-b border-gray-700">
                      <th className="text-left py-2">Pair</th>
                      <th className="text-right py-2">Price</th>
                      <th className="text-right py-2">24h Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getTopGainers().map(item => (
                      <tr key={item.symbol} className="border-b border-gray-700">
                        <td className="py-2 text-white">{item.symbol}</td>
                        <td className="py-2 text-right text-gray-300">${item.lastPrice.toFixed(item.lastPrice < 1 ? 6 : 2)}</td>
                        <td className="py-2 text-right text-green-500">
                          +{item.priceChangePercent.toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Top Losers */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <TrendingDown size={20} className="text-red-500 mr-2" />
                <h2 className="text-lg font-semibold text-white">Top Losers</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-400 border-b border-gray-700">
                      <th className="text-left py-2">Pair</th>
                      <th className="text-right py-2">Price</th>
                      <th className="text-right py-2">24h Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getTopLosers().map(item => (
                      <tr key={item.symbol} className="border-b border-gray-700">
                        <td className="py-2 text-white">{item.symbol}</td>
                        <td className="py-2 text-right text-gray-300">${item.lastPrice.toFixed(item.lastPrice < 1 ? 6 : 2)}</td>
                        <td className="py-2 text-right text-red-500">
                          {item.priceChangePercent.toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Wallet Button with Deposit Button next to it */}
          <div className="flex justify-between items-center">
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={handleWalletClick}
            >
              Go to Wallet
            </button>
            <DepositButton onDepositClick={handleDeposit} />
          </div>
        </div>
      </div>
      
      {/* Mobile Bottom Tabs - Only visible on mobile */}
      {isMobile && <MobileBottomTabs onWalletClick={handleWalletClick} />}
    </div>
  );
};

// Desktop Sidebar Component
const DesktopSidebar = ({ onWalletClick }) => {
  return (
    <div className="fixed h-screen w-64 bg-red-900 text-gray-300 flex flex-col left-0 top-0">
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M16,16 L20,12 L24,16 L20,20 Z" fill="#F3BA2F" />
            <path d="M16,8 L18,10 L16,12 L14,10 Z" fill="#F3BA2F" />
            <path d="M24,16 L22,18 L20,16 L22,14 Z" fill="#F3BA2F" />
            <path d="M16,24 L14,22 L16,20 L18,22 Z" fill="#F3BA2F" />
            <path d="M8,16 L10,14 L12,16 L10,18 Z" fill="#F3BA2F" />
          </svg>
          <div>
            <span className="font-medium text-lg text-white">FX</span>
            <span className="font-light text-sm ml-1 text-gray-400">COPY</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 py-6 overflow-y-auto">
        <div className="px-4 mb-6">
          <p className="text-xs font-light uppercase tracking-wider text-gray-500 mb-4">Main</p>
          <nav>
            <NavItem icon={<Home size={18} />} label="Dashboard" active />
            <NavItem icon={<BarChart2 size={18} />} label="Markets" />
            <NavItem icon={<Repeat size={18} />} label="Trades" />
            <NavItem icon={<BarChart2 size={18} />} label="Futures" />
            <NavItem icon={<CreditCard size={18} />} label="Wallet" onClick={onWalletClick} />
          </nav>
        </div>

        <div className="px-4 mb-6">
          <p className="text-xs font-light uppercase tracking-wider text-gray-500 mb-4">Copy Trading</p>
          <nav>
            <NavItem icon={<User size={18} />} label="Top Traders" />
            <NavItem icon={<Users size={18} />} label="My Copiers" />
          </nav>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-800">
        <nav>
          <NavItem icon={<User size={18} />} label="Profile" />
          <NavItem icon={<CreditCard size={18} />} label="Settings" />
        </nav>
      </div>
    </div>
  );
};

// Mobile Top Bar Component
const MobileTopBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-red-900 text-white flex items-center justify-between px-4 z-10">
      <div className="flex items-center space-x-2">
        <svg width="24" height="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path d="M16,16 L20,12 L24,16 L20,20 Z" fill="#F3BA2F" />
          <path d="M16,8 L18,10 L16,12 L14,10 Z" fill="#F3BA2F" />
          <path d="M24,16 L22,18 L20,16 L22,14 Z" fill="#F3BA2F" />
          <path d="M16,24 L14,22 L16,20 L18,22 Z" fill="#F3BA2F" />
          <path d="M8,16 L10,14 L12,16 L10,18 Z" fill="#F3BA2F" />
        </svg>
        <div>
          <span className="font-medium text-white">FX COPY</span>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Star size={20} />
        <User size={20} />
      </div>
    </div>
  );
};

// Mobile Bottom Tabs Component
const MobileBottomTabs = ({ onWalletClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-red-900 text-gray-300 flex justify-around items-center border-t border-gray-800 z-10">
      <BottomTab icon={<Home size={20} />} label="Home" active />
      <BottomTab icon={<BarChart2 size={20} />} label="Markets" />
      <BottomTab icon={<Repeat size={20} />} label="Trades" />
      <BottomTab icon={<CreditCard size={20} />} label="Wallet" onClick={onWalletClick} />
      <BottomTab icon={<User size={20} />} label="Profile" />
    </div>
  );
};

// Navigation Item Component for Sidebar
const NavItem = ({ icon, label, active = false, onClick }) => {
  return (
    <div 
      className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer mb-1 transition-colors ${active ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 hover:text-white'}`}
      onClick={onClick}
    >
      <div className="text-gray-400">{icon}</div>
      <span className={`font-light text-sm ${active ? 'text-white' : ''}`}>{label}</span>
    </div>
  );
};

// Bottom Tab Component for Mobile
const BottomTab = ({ icon, label, active = false, onClick }) => {
  return (
    <div className="flex flex-col items-center" onClick={onClick}>
      <div className={`${active ? 'text-white' : 'text-gray-400'}`}>{icon}</div>
      <span className={`text-xs mt-1 ${active ? 'text-white' : 'text-gray-400'}`}>{label}</span>
    </div>
  );
};

export default CopytradingDashboard;