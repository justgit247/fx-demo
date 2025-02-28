import React from 'react';
import { CoinIcon } from './DepositButton'; // Adjust the import based on your structure

const DepositModal = ({ isOpen, onClose, userBalance, onDeposit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-gray-900 w-full max-w-md mx-3 rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 bg-red-900 flex items-center">
          <h2 className="text-white text-lg font-medium">Deposit Crypto</h2>
          <button 
            className="ml-auto text-white hover:bg-red-800 rounded-full p-1"
            onClick={onClose}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="p-4">
          {/* Add your deposit logic here */}
          <p className="text-gray-400">Select the cryptocurrency you want to deposit.</p>
          {/* Example of displaying user balance */}
          <div>
            <h3 className="text-white">Your Balance:</h3>
            <p className="text-white">{userBalance.USDT} USDT</p>
          </div>
          {/* Add more content as needed */}
        </div>
      </div>
    </div>
  );
};

export default DepositModal;