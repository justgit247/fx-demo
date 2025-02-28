import React from 'react';

const UserBalance = ({ balance }) => {
    return (
        <div className="bg-[#191B1F] p-4 rounded mb-4">
            <h2 className="text-lg font-bold">Total Balance</h2>
            <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
            <button className="mt-2 p-2 bg-[#F0B90B] rounded">Add Funds</button>
        </div>
    );
};

export default UserBalance; 