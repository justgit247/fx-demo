import React from 'react';
import { User, Bell, Settings } from 'lucide-react';

const TopBar = ({ userBalance, selectedPair, onLayoutChange }) => {
  return (
    <div className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4">
      {/* Logo */}
      <div className="flex items-center">
        <div className="text-xl font-medium text-white mr-4">
          <span className="text-yellow-500">FX</span>
          <span className="text-gray-400 text-sm font-light">DEMO</span>
        </div>
        <div className="hidden md:block">
          <span className="text-sm font-light text-gray-400">
            {selectedPair} <span className="text-green-500 ml-2">
              ${userBalance ? parseFloat(userBalance.USDT).toFixed(2) : '0.00'} USDT
            </span>
          </span>
        </div>
      </div>
      
      {/* Layout Controls */}
      <div className="hidden md:flex space-x-2">
        <button 
          onClick={() => onLayoutChange('default')}
          className="px-3 py-1 text-xs rounded bg-gray-800 hover:bg-gray-700"
        >
          Default
        </button>
        <button 
          onClick={() => onLayoutChange('compact')}
          className="px-3 py-1 text-xs rounded bg-gray-800 hover:bg-gray-700"
        >
          Compact
        </button>
        <button 
          onClick={() => onLayoutChange('advanced')}
          className="px-3 py-1 text-xs rounded bg-gray-800 hover:bg-gray-700"
        >
          Advanced
        </button>
      </div>
      
      {/* User Controls */}
      <div className="flex items-center space-x-4">
        <Bell size={18} className="text-gray-400 cursor-pointer hover:text-white" />
        <Settings size={18} className="text-gray-400 cursor-pointer hover:text-white" />
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
          <User size={16} />
        </div>
      </div>
    </div>
  );
};

export default TopBar;