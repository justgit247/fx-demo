import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Import Firestore
import { doc, getDoc } from 'firebase/firestore';

const Assets = () => {
    const [userBalance, setUserBalance] = useState(0);
    const [transactionHistory, setTransactionHistory] = useState([]);

    useEffect(() => {
        const fetchUserAssets = async () => {
            const userDocRef = doc(db, 'users', 'YOUR_USER_ID'); // Replace with actual user ID
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                setUserBalance(userDoc.data().balance || 0);
                setTransactionHistory(userDoc.data().transactionHistory || []);
            }
        };

        fetchUserAssets();
    }, []);

    return (
        <div className="p-4 bg-[#121212] text-[#EAECEF]">
            <h1 className="text-2xl font-bold mb-4">Assets</h1>
            <div className="bg-[#191B1F] p-4 rounded mb-4">
                <h2 className="text-lg font-bold">Total Balance</h2>
                <p className="text-2xl font-bold">${userBalance.toFixed(2)}</p>
                <div className="mt-4 flex space-x-2">
                    <button className="p-2 bg-[#F0B90B] rounded">Deposit</button>
                    <button className="p-2 bg-[#F0B90B] rounded">Withdraw</button>
                    <button className="p-2 bg-[#F0B90B] rounded">Transfer</button>
                    <button className="p-2 bg-[#F0B90B] rounded">Buy</button>
                </div>
            </div>

            <h2 className="text-lg font-bold mb-2">Transaction History</h2>
            <table className="min-w-full bg-[#191B1F] rounded">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b border-gray-700">Date</th>
                        <th className="py-2 px-4 border-b border-gray-700">Type</th>
                        <th className="py-2 px-4 border-b border-gray-700">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactionHistory.map((transaction, index) => (
                        <tr key={index} className="border-b border-gray-700">
                            <td className="py-2 px-4">{transaction.date}</td>
                            <td className="py-2 px-4">{transaction.type}</td>
                            <td className="py-2 px-4">{transaction.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Assets; 