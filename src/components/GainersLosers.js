import React from 'react';

const GainersLosers = ({ prices, type }) => {
    const sortedPrices = [...prices].sort((a, b) => parseFloat(b.priceChangePercent) - parseFloat(a.priceChangePercent));
    const displayedPrices = type === 'gainers' ? sortedPrices.slice(0, 5) : sortedPrices.slice(-5);

    return (
        <div>
            <h3 className="text-lg font-bold">{type === 'gainers' ? 'Top Gainers' : 'Top Losers'}</h3>
            <table className="min-w-full bg-[#191B1F] rounded mb-4">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b border-gray-700">Symbol</th>
                        <th className="py-2 px-4 border-b border-gray-700">Last Price</th>
                        <th className="py-2 px-4 border-b border-gray-700">Change (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedPrices.map((price) => (
                        <tr key={price.symbol} className="border-b border-gray-700">
                            <td className="py-2 px-4">{price.symbol}</td>
                            <td className="py-2 px-4 font-bold text-white">{price.lastPrice}</td>
                            <td className={`py-2 px-4 ${type === 'gainers' ? 'text-green-500' : 'text-red-500'}`}>
                                {price.priceChangePercent}%
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GainersLosers; 