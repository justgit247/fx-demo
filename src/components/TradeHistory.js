import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TradeHistory = ({ symbol, userHistory = [] }) => {
  const [trades, setTrades] = useState([]);
  const [activeTab, setActiveTab] = useState('market'); // 'market' or 'user'
  
  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await axios.get(`https://api.binance.com/api/v3/trades`, {
          params: {
            symbol: symbol,
            limit: 20
          }
        });
        
        const formattedTrades = response.data.map(trade => ({
          id: trade.id,
          price: parseFloat(trade.price),
          quantity: parseFloat(trade.qty),
          time: new Date(trade.time),
          isBuyerMaker: trade.isBuyerMaker
        }));
        
        setTrades(formattedTrades);
      } catch (error) {
        console.error('Error fetching trades:', error);
      }
    };
    
    fetchTrades();
    const interval = setInterval(fetchTrades, 5000);
    return () => clearInterval(interval);
  }, [symbol]);
  
  // Format time to HH:MM:SS
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  
  return (
    <div className="h-full flex flex-col p-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">Trade History</h3>
        <div className="flex space-x-1">
          <button 
            className={`text-xs px-2 py-1 rounded ${activeTab === 'market' ? 'bg-gray-700' : 'bg-gray-800 text-gray-400'}`}
            onClick={() => setActiveTab('market')}
          >
            Market
          </button>
          <button 
            className={`text-xs px-2 py-1 rounded ${activeTab === 'user' ? 'bg-gray-700' : 'bg-gray-800 text-gray-400'}`}
            onClick={() => setActiveTab('user')}
          >
            My Trades
          </button>
        </div>
      </div>
      
      {/* Headers */}
      <div className="grid grid-cols-3 text-xs text-gray-400 py-1 border-b border-gray-700">
        <div>Price</div>
        <div className="text-right">Amount</div>
        <div className="text-right">Time</div>
      </div>
      
      {/* Trade list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {activeTab === 'market' ? (
          trades.length > 0 ? (
            trades.map(trade => (
              <div key={trade.id} className="grid grid-cols-3 text-xs py-1">
                <div className={trade.isBuyerMaker ? 'text-red-500' : 'text-green-500'}>
                  {trade.price.toFixed(2)}
                </div>
                <div className="text-right">{trade.quantity.toFixed(6)}</div>
                <div className="text-right text-gray-400">{formatTime(trade.time)}</div>
              </div>
            ))
          ) : (
            <div className="text-center py-2 text-sm text-gray-500">No recent trades</div>
          )
        ) : (
          userHistory.length > 0 ? (
            userHistory.map(order => (
              <div key={order.id} className="grid grid-cols-3 text-xs py-1">
                <div className={order.side === 'sell' ? 'text-red-500' : 'text-green-500'}>
                  {parseFloat(order.price).toFixed(2)}
                </div>
                <div className="text-right">{parseFloat(order.quantity).toFixed(6)}</div>
                <div className="text-right text-gray-400">
                  {formatTime(new Date(order.timestamp))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-2 text-sm text-gray-500">No trade history</div>
          )
        )}
      </div>
    </div>
  );
};

export default TradeHistory;