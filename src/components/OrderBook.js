import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderBook = ({ symbol, depth = 10 }) => {
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchOrderBook = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.binance.com/api/v3/depth`, {
          params: {
            symbol: symbol,
            limit: depth
          }
        });
        
        const { bids, asks } = response.data;
        
        // Format data
        const formattedBids = bids.map(bid => ({
          price: parseFloat(bid[0]),
          amount: parseFloat(bid[1]),
          total: parseFloat(bid[0]) * parseFloat(bid[1])
        }));
        
        const formattedAsks = asks.map(ask => ({
          price: parseFloat(ask[0]),
          amount: parseFloat(ask[1]),
          total: parseFloat(ask[0]) * parseFloat(ask[1])
        }));
        
        setOrderBook({ bids: formattedBids, asks: formattedAsks });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order book:', error);
        setLoading(false);
      }
    };
    
    fetchOrderBook();
    const interval = setInterval(fetchOrderBook, 2000);
    return () => clearInterval(interval);
  }, [symbol, depth]);
  
  // Calculate total volumes for visualization
  const maxBidTotal = Math.max(...orderBook.bids.map(bid => bid.total), 0);
  const maxAskTotal = Math.max(...orderBook.asks.map(ask => ask.total), 0);
  
  return (
    <div className="h-full flex flex-col p-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">Order Book</h3>
        <div className="flex space-x-2">
          <button className="text-xs px-2 py-1 bg-gray-700 rounded">Depth</button>
          <button className="text-xs px-2 py-1 bg-gray-700 rounded">Scale</button>
        </div>
      </div>
      
      {/* Headers */}
      <div className="grid grid-cols-3 text-xs text-gray-400 py-1 border-b border-gray-700">
        <div>Price (USDT)</div>
        <div className="text-right">Amount</div>
        <div className="text-right">Total</div>
      </div>
      
      {/* Asks (Sell Orders) - display in reverse order (highest to lowest) */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {loading ? (
          <div className="text-center py-2 text-sm text-gray-500">Loading...</div>
        ) : (
          <>
            <div className="max-h-[40%] overflow-y-auto">
              {orderBook.asks.slice().reverse().map((ask, index) => (
                <div key={`ask-${index}`} className="relative grid grid-cols-3 text-xs py-1">
                  <div className="text-red-500">{ask.price.toFixed(2)}</div>
                  <div className="text-right">{ask.amount.toFixed(6)}</div>
                  <div className="text-right">{ask.total.toFixed(2)}</div>
                  <div 
                    className="absolute right-0 top-0 h-full bg-red-900/20" 
                    style={{ width: `${(ask.total / maxAskTotal) * 100}%`, zIndex: -1 }}
                  />
                </div>
              ))}
            </div>
            
            {/* Spread */}
            <div className="py-2 text-center text-xs text-gray-400 border-y border-gray-700">
              Spread: {orderBook.asks[0] && orderBook.bids[0] ? 
                (orderBook.asks[0].price - orderBook.bids[0].price).toFixed(2) : '0.00'} 
              ({orderBook.asks[0] && orderBook.bids[0] ? 
                ((orderBook.asks[0].price - orderBook.bids[0].price) / orderBook.asks[0].price * 100).toFixed(2) : '0.00'}%)
            </div>
            
            {/* Bids (Buy Orders) */}
            <div className="max-h-[40%] overflow-y-auto">
              {orderBook.bids.map((bid, index) => (
                <div key={`bid-${index}`} className="relative grid grid-cols-3 text-xs py-1">
                  <div className="text-green-500">{bid.price.toFixed(2)}</div>
                  <div className="text-right">{bid.amount.toFixed(6)}</div>
                  <div className="text-right">{bid.total.toFixed(2)}</div>
                  <div 
                    className="absolute right-0 top-0 h-full bg-green-900/20" 
                    style={{ width: `${(bid.total / maxBidTotal) * 100}%`, zIndex: -1 }}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderBook;