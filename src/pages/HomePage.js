import React, { useState, useEffect } from 'react';
import { Menu, X, TrendingUp, Briefcase, BarChart2, User, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Custom Logo component using the provided SVG
const Logo = () => {
  return (
    <div className="flex items-center justify-center h-12">
      <svg width="120" height="40" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
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

const HomePage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [tickerData, setTickerData] = useState([
    { symbol: 'BTC/USDT', price: '65,842.30', change: '+2.4%', direction: 'up' },
    { symbol: 'ETH/USDT', price: '3,421.15', change: '+1.8%', direction: 'up' },
    { symbol: 'SOL/USDT', price: '142.76', change: '-0.5%', direction: 'down' },
    { symbol: 'ADA/USDT', price: '0.58', change: '+3.2%', direction: 'up' },
    { symbol: 'XRP/USDT', price: '0.62', change: '-1.1%', direction: 'down' },
    { symbol: 'DOT/USDT', price: '7.94', change: '+0.7%', direction: 'up' },
    { symbol: 'DOGE/USDT', price: '0.12', change: '+5.3%', direction: 'up' },
    { symbol: 'AVAX/USDT', price: '32.45', change: '-0.8%', direction: 'down' }
  ]);
  
  const [featuredCoins, setFeaturedCoins] = useState([
    { name: 'Bitcoin', symbol: 'BTC', price: '65,842.30', change: '+2.4%', marketCap: '$1.28T', volume: '$42.1B' },
    { name: 'Ethereum', symbol: 'ETH', price: '3,421.15', change: '+1.8%', marketCap: '$410.5B', volume: '$18.7B' },
    { name: 'Solana', symbol: 'SOL', price: '142.76', change: '-0.5%', marketCap: '$61.2B', volume: '$3.5B' }
  ]);
  
  const [news, setNews] = useState([
    { id: 1, title: 'Bitcoin Surges Past $65K Amid Institutional Adoption', time: '2 hours ago' },
    { id: 2, title: 'New Regulations Expected to Impact Crypto Markets', time: '4 hours ago' },
    { id: 3, title: 'Top 5 DeFi Projects to Watch in 2025', time: '6 hours ago' }
  ]);

  // Simulate ticker movement
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerData(prevData => {
        return prevData.map(item => {
          const change = ((Math.random() - 0.5) * 0.4).toFixed(1);
          const newPrice = parseFloat(item.price.replace(',', '')) * (1 + parseFloat(change) / 100);
          return {
            ...item,
            price: newPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            change: change > 0 ? `+${change}%` : `${change}%`,
            direction: change > 0 ? 'up' : 'down'
          };
        });
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-red-900 sticky top-0 z-10 shadow-md">
        <div className="flex items-center">
          <Logo />
        </div>
        
        {/* Desktop Navigation - centered */}
        <nav className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-6">
            <a href="#markets" className="flex items-center px-2 py-1 hover:text-yellow-400 transition-colors">
              <BarChart2 size={16} className="mr-1" />
              <span>Markets</span>
            </a>
            <a href="#trade" className="flex items-center px-2 py-1 hover:text-yellow-400 transition-colors">
              <TrendingUp size={16} className="mr-1" />
              <span>Trade</span>
            </a>
            <a href="#wallet" className="flex items-center px-2 py-1 hover:text-yellow-400 transition-colors">
              <Briefcase size={16} className="mr-1" />
              <span>Wallet</span>
            </a>
            <a href="#account" className="flex items-center px-2 py-1 hover:text-yellow-400 transition-colors">
              <User size={16} className="mr-1" />
              <span>Account</span>
            </a>
          </div>
        </nav>
        
        <div className="flex items-center space-x-3">
          <Link to="/login">
            <button className="hidden md:block bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md transition-colors font-medium">
              Sign In
            </button>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-1 rounded-md hover:bg-red-800 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-red-900 border-t border-red-800 absolute top-14 left-0 right-0 z-10 shadow-lg">
          <div className="py-2 px-4 space-y-3">
            <a href="#markets" className="flex items-center py-2 hover:text-yellow-400 transition-colors">
              <BarChart2 size={18} className="mr-2" />
              <span>Markets</span>
            </a>
            <a href="#trade" className="flex items-center py-2 hover:text-yellow-400 transition-colors">
              <TrendingUp size={18} className="mr-2" />
              <span>Trade</span>
            </a>
            <a href="#wallet" className="flex items-center py-2 hover:text-yellow-400 transition-colors">
              <Briefcase size={18} className="mr-2" />
              <span>Wallet</span>
            </a>
            <a href="#account" className="flex items-center py-2 hover:text-yellow-400 transition-colors">
              <User size={18} className="mr-2" />
              <span>Account</span>
            </a>
            <Link to="/login">
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md transition-colors mt-2 font-medium">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Live Ticker */}
      <div className="bg-gray-800 py-2 border-t border-b border-gray-700 overflow-hidden">
        <div className="flex animate-marquee">
          {tickerData.concat(tickerData).map((ticker, index) => (
            <div key={index} className="flex items-center px-4 whitespace-nowrap">
              <span className="font-medium">{ticker.symbol}</span>
              <span className="mx-2">{ticker.price}</span>
              <span className={ticker.direction === 'up' ? 'text-green-400' : 'text-red-400'}>
                {ticker.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-900 to-gray-900 py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="md:flex md:items-center md:space-x-8">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Trade Smarter, Not Harder</h1>
              <p className="text-gray-300 text-lg mb-6">Advanced tools for cryptocurrency traders in one powerful platform.</p>
              <div className="flex space-x-4">
                <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-md font-medium transition-colors">
                  Get Started
                </button>
                <button className="border border-white hover:bg-white hover:text-red-900 px-6 py-3 rounded-md font-medium transition-colors">
                  View Markets
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img src="/assets/1.jpg" alt="Trading Platform Interface" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cryptocurrencies */}
      <section className="py-12 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Cryptocurrencies</h2>
            <a href="#markets" className="text-red-400 hover:text-red-300 flex items-center">
              View All <ChevronRight size={16} />
            </a>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-left">Asset</th>
                  <th className="py-3 px-4 text-right">Price</th>
                  <th className="py-3 px-4 text-right">24h Change</th>
                  <th className="py-3 px-4 text-right hidden md:table-cell">Market Cap</th>
                  <th className="py-3 px-4 text-right hidden md:table-cell">Volume (24h)</th>
                  <th className="py-3 px-4 text-right"></th>
                </tr>
              </thead>
              <tbody>
                {featuredCoins.map((coin, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <img src={`/api/placeholder/32/32`} alt={coin.name} className="w-8 h-8 mr-3 rounded-full" />
                        <div>
                          <div className="font-medium">{coin.name}</div>
                          <div className="text-gray-400 text-sm">{coin.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right font-medium">${coin.price}</td>
                    <td className={`py-4 px-4 text-right ${coin.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {coin.change}
                    </td>
                    <td className="py-4 px-4 text-right hidden md:table-cell">{coin.marketCap}</td>
                    <td className="py-4 px-4 text-right hidden md:table-cell">{coin.volume}</td>
                    <td className="py-4 px-4 text-right">
                      <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition-colors">
                        Trade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Our Platform</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Trading Tools</h3>
              <p className="text-gray-300">Professional charting with multiple technical indicators and drawing tools.</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-4 text-black">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enhanced Security</h3>
              <p className="text-gray-300">Two-factor authentication, cold storage, and advanced encryption protocols.</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Low Trading Fees</h3>
              <p className="text-gray-300">Competitive trading fees with volume-based discounts for active traders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-12 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Latest Crypto News</h2>
            <a href="#news" className="text-red-400 hover:text-red-300 flex items-center">
              More News <ChevronRight size={16} />
            </a>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {news.map(item => (
              <div key={item.id} className="bg-gray-700 rounded-lg overflow-hidden hover:bg-gray-600 transition-colors">
                 <img src="/assets/3.jpg" alt="News" className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="font-medium mb-2">{item.title}</h3>
                  <div className="text-gray-400 text-sm">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-700 to-red-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Start Trading Today</h2>
          <p className="text-lg mb-8 opacity-90">Join thousands of traders and invest in the future of finance.</p>
          <button className="bg-yellow-500 text-black hover:bg-yellow-400 px-8 py-3 rounded-md font-medium text-lg transition-colors">
            Create Free Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Logo />
              </div>
              <p className="text-gray-400 mb-4">Advanced cryptocurrency trading platform for modern investors.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Products</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Spot Trading</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Margin Trading</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Futures</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Staking</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fee Schedule</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Risk Warning</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AML Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>© 2025 FXDEMO. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;