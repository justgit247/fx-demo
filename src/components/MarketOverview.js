import React, { useState } from 'react';
import { Search, Star, ArrowUp, ArrowDown } from 'lucide-react';
import PropTypes from 'prop-types';

const MarketOverview = ({ marketData = [], userWatchlist, onPairSelect, onToggleWatchlist, selectedPair }) => {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'gainers', 'losers', 'watchlist'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'quoteVolume', direction: 'desc' });

  if (!marketData || !Array.isArray(marketData)) {
    return <div>Loading...</div>; // Handle loading state
  }

  // Filter data based on active tab and search query
  const filteredData = marketData.filter(item => {
    // Filter by search query
    if (searchQuery && !item.symbol.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by tab
    if (activeTab === 'gainers') {
      return item.priceChangePercent > 0;
    } else if (activeTab === 'losers') {
      return item.priceChangePercent < 0;
    } else if (activeTab === 'watchlist') {
      return userWatchlist.includes(item.symbol);
    }
    
    return true;
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key === 'symbol') {
      return sortConfig.direction === 'asc' 
        ? a.symbol.localeCompare(b.symbol)
        : b.symbol.localeCompare(a.symbol);
    }
    
    return sortConfig.direction === 'asc' 
      ? a[sortConfig.key] - b[sortConfig.key]
      : b[sortConfig.key] - a[sortConfig.key];
  });

  // Handle sort
  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  return (
    <div className="h-full flex flex-col">
      {/* Tabs and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2 border-b border-gray-800">
        <div className="flex space-x-1 mb-2 sm:mb-0">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 text-xs rounded ${activeTab === 'all' ? 'bg-gray-700' : 'bg-gray-800 text-gray-400'}`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveTab('gainers')}
            className={`px-3 py-1 text-xs rounded ${activeTab === 'gainers' ? 'bg-green-900' : 'bg-gray-800 text-gray-400'}`}
          >
            Gainers
          </button>
          <button 
            onClick={() => setActiveTab('losers')}
            className={`px-3 py-1 text-xs rounded ${activeTab === 'losers' ? 'bg-red-900' : 'bg-gray-800 text-gray-400'}`}
          >
            Losers
          </button>
          <button 
            onClick={() => setActiveTab('watchlist')}
            className={`px-3 py-1 text-xs rounded ${activeTab === 'watchlist' ? 'bg-yellow-900' : 'bg-gray-800 text-gray-400'}`}
          >
            Watchlist
          </button>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-8 py-1 text-sm bg-gray-800 border border-gray-700 rounded w-full sm:w-40"
          />
          <Search size={14} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      
      {/* Table Header */}
      <div className="grid grid-cols-4 md:grid-cols-5 text-xs text-gray-400 px-2 py-2 border-b border-gray-800">
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => handleSort('symbol')}
        >
          <span>Pair</span>
          {sortConfig.key === 'symbol' && (
            sortConfig.direction === 'asc' ? <ArrowUp size={12} className="ml-1" /> : <ArrowDown size={12} className="ml-1" />
          )}
        </div>
        <div 
          className="text-right cursor-pointer" 
          onClick={() => handleSort('lastPrice')}
        >
          <span>Price</span>
          {sortConfig.key === 'lastPrice' && (
            sortConfig.direction === 'asc' ? <ArrowUp size={12} className="ml-1 inline" /> : <ArrowDown size={12} className="ml-1 inline" />
          )}
        </div>
        <div 
          className="text-right cursor-pointer" 
          onClick={() => handleSort('priceChangePercent')}
        >
          <span>24h Change</span>
          {sortConfig.key === 'priceChangePercent' && (
            sortConfig.direction === 'asc' ? <ArrowUp size={12} className="ml-1 inline" /> : <ArrowDown size={12} className="ml-1 inline" />
          )}
        </div>
        <div 
          className="hidden md:block text-right cursor-pointer" 
          onClick={() => handleSort('quoteVolume')}
        >
          <span>Volume</span>
          {sortConfig.key === 'quoteVolume' && (
            sortConfig.direction === 'asc' ? <ArrowUp size={12} className="ml-1 inline" /> : <ArrowDown size={12} className="ml-1 inline" />
          )}
        </div>
        <div className="text-center">Watch</div>
      </div>
      
      {/* Table Body */}
      <div className="flex-1 overflow-y-auto">
        {sortedData.length > 0 ? (
          sortedData.map(pair => (
            <div 
              key={pair.symbol}
              className={`grid grid-cols-4 md:grid-cols-5 text-xs px-2 py-2 border-b border-gray-700 hover:bg-gray-800 cursor-pointer ${
                selectedPair === pair.symbol ? 'bg-gray-800' : ''
              }`}
              onClick={() => onPairSelect(pair.symbol)}
            >
              <div className="flex items-center">
                <span className="text-white">{pair.symbol.replace('USDT', '')}</span>
                <span className="text-gray-500 ml-1">/USDT</span>
              </div>
              <div className="text-right">
                ${parseFloat(pair.lastPrice).toFixed(
                  pair.lastPrice < 1 ? 5 : pair.lastPrice < 10 ? 3 : 2
                )}
              </div>
              <div className={`text-right ${pair.priceChangePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {pair.priceChangePercent >= 0 ? '+' : ''}{pair.priceChangePercent.toFixed(2)}%
              </div>
              <div className="hidden md:block text-right">
                ${(pair.quoteVolume / 1000000).toFixed(2)}M
              </div>
              <div className="flex justify-center" onClick={(e) => {
                e.stopPropagation();
                onToggleWatchlist(pair.symbol);
              }}>
                <Star 
                  size={14} 
                  className={userWatchlist.includes(pair.symbol) 
                    ? 'text-yellow-500 fill-yellow-500' 
                    : 'text-gray-500'
                  } 
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-sm text-gray-500">
            {searchQuery ? 'No matching pairs found' : 'No data available'}
          </div>
        )}
      </div>
    </div>
  );
};

MarketOverview.propTypes = {
  marketData: PropTypes.array.isRequired,
};

export default MarketOverview;