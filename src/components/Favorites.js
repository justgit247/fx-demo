import React from 'react';

const Favorites = ({ prices }) => {
    const favorites = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT']; // Example favorites
    return (
        <div>
            <h2 className="text-lg font-bold">Favorites</h2>
            <table className="min-w-full bg-[#191B1F] rounded">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b border-gray-700">Symbol</th>
                        <th className="py-2 px-4 border-b border-gray-700">Last Price</th>
                        <th className="py-2 px-4 border-b border-gray-700">Change (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {favorites.map((symbol) => {
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
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Favorites; 