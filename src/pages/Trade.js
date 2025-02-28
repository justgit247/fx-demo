import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Trade = () => {
    const [symbol, setSymbol] = useState('');
    const [amount, setAmount] = useState('');
    const [orderType, setOrderType] = useState('buy');

    const handleTrade = (e) => {
        e.preventDefault();
        // Implement trade logic here (e.g., call to your backend or Binance API)
        console.log(`Executing ${orderType} order for ${amount} of ${symbol}`);
    };

    return (
        <div className="p-4 bg-[#121212] text-[#EAECEF]">
            <Navbar />
            <h1 className="text-2xl font-bold mb-4">Trade</h1>
            <form onSubmit={handleTrade} className="bg-[#191B1F] p-4 rounded">
                <div className="mb-4">
                    <label className="block mb-2">Symbol</label>
                    <input
                        type="text"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                        className="p-2 rounded bg-[#2A2A2A] border border-gray-600 w-full"
                        placeholder="e.g., BTCUSDT"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="p-2 rounded bg-[#2A2A2A] border border-gray-600 w-full"
                        placeholder="Amount to trade"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Order Type</label>
                    <select
                        value={orderType}
                        onChange={(e) => setOrderType(e.target.value)}
                        className="p-2 rounded bg-[#2A2A2A] border border-gray-600 w-full"
                    >
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                    </select>
                </div>
                <button type="submit" className="p-2 bg-[#F0B90B] rounded w-full">Execute Trade</button>
            </form>
        </div>
    );
};

export default Trade; 