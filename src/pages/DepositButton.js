import React, { useState, useEffect } from 'react';
import { Copy, QrCode, Download, Share2, ChevronDown, ArrowLeft } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react'; // Use QRCodeSVG for SVG rendering

// Logo component to be used in QR code and modal
const Logo = ({ size = 24, color = "#F3BA2F" }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M16,16 L20,12 L24,16 L20,20 Z" fill={color} />
    <path d="M16,8 L18,10 L16,12 L14,10 Z" fill={color} />
    <path d="M24,16 L22,18 L20,16 L22,14 Z" fill={color} />
    <path d="M16,24 L14,22 L16,20 L18,22 Z" fill={color} />
    <path d="M8,16 L10,14 L12,16 L10,18 Z" fill={color} />
  </svg>
);

// Coin icons for various cryptocurrencies
const CoinIcon = ({ symbol, size = 24 }) => {
  const getIconForSymbol = () => {
    switch (symbol.toUpperCase()) {
      case 'BTC':
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#F7931A"/>
            <path d="M22.5 14.255c.325-2.135-1.325-3.275-3.55-4.05l.725-2.9-1.775-.425-.7 2.825c-.45-.125-.925-.225-1.4-.35l.725-2.85-1.775-.425-.725 2.9c-.375-.075-.75-.175-1.1-.25l-2.45-.6-.475 1.9s1.325.3 1.3.325c.725.175.85.65.825 1.025l-.825 3.325c.05 0 .1.025.175.075-.05-.025-.125-.05-.2-.075l-1.15 4.625c-.1.25-.325.625-.85.475.025.025-1.3-.325-1.3-.325l-.9 2.05 2.325.575c.425.1.85.225 1.275.325l-.725 2.95 1.775.425.725-2.9c.475.125.925.25 1.375.35l-.725 2.875 1.775.425.725-2.95c2.975.55 5.2.325 6.125-2.325.75-2.125-.025-3.35-1.575-4.15.675-.4 1.275-1.025 1.425-2.375zM18.35 19.13c-.525 2.125-4.1.975-5.25.7l.95-3.775c1.15.275 4.85.825 4.3 3.075zm.525-5.525c-.475 1.925-3.425.95-4.375.7l.85-3.425c.95.25 4.025.7 3.525 2.725z" fill="white"/>
          </svg>
        );
      case 'ETH':
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#627EEA"/>
            <path d="M16.498 4v8.87l7.497 3.35L16.498 4z" fill="#C0CBF6"/>
            <path d="M16.498 4L9 16.22l7.498-3.35V4z" fill="white"/>
            <path d="M16.498 21.968v6.027L24 17.616l-7.502 4.352z" fill="#C0CBF6"/>
            <path d="M16.498 27.995v-6.027L9 17.616l7.498 10.379z" fill="white"/>
            <path d="M16.498 20.573l7.497-4.353-7.497-3.348v7.701z" fill="#8197EE"/>
            <path d="M9 16.22l7.498 4.353v-7.701L9 16.22z" fill="#C0CBF6"/>
          </svg>
        );
      case 'USDT':
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#26A17B"/>
            <path d="M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117" fill="white"/>
          </svg>
        );
      case 'SOL':
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#9945FF"/>
            <path d="M10.5 10.5a.8.8 0 01.5-.2h13.2c.3 0 .5.4.3.6l-3.2 3.2c-.2.1-.4.2-.6.2H7.5c-.3 0-.5-.4-.3-.6l3.3-3.2zm.5 7.8a.8.8 0 01.5-.2h13.2c.3 0 .5.4.3.6l-3.2 3.2c-.2.1-.4.2-.6.2H7.5c-.3 0-.5-.4-.3-.6l3.3-3.2zm-3.8-3.9c-.1-.1-.1-.4.3-.6l3.2-3.2c.2-.1.4-.2.6-.2h13.2c.3 0 .5.4.3.6l-3.2 3.2c-.2.1-.4.2-.6.2H7.5l-.3-.1z" fill="white"/>
          </svg>
        );
      // Add more cases as needed
      default:
        return (
          <div style={{ 
            width: size, 
            height: size, 
            borderRadius: '50%', 
            backgroundColor: '#627EEA', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: 'white',
            fontSize: size/2
          }}>
            {symbol.substring(0, 1)}
          </div>
        );
    }
  };

  return getIconForSymbol();
};

// Networks available for each coin
const networks = {
  BTC: ['Bitcoin Network', 'Lightning Network'],
  ETH: ['Ethereum (ERC20)', 'Arbitrum One', 'Optimism'],
  USDT: ['Ethereum (ERC20)', 'Tron (TRC20)', 'Solana', 'BNB Chain (BEP20)'],
  BNB: ['BNB Chain (BEP20)', 'BNB Beacon Chain (BEP2)'],
  SOL: ['Solana'],
  MATIC: ['Polygon'],
  DOGE: ['Dogecoin Network'],
  ADA: ['Cardano'],
  XRP: ['XRP Ledger'],
  DOT: ['Polkadot']
};

// Main Deposit Modal Component
const DepositModal = ({ isOpen, onClose, userBalance, onDeposit }) => {
  const [step, setStep] = useState(1); // 1: Select Coin, 2: Select Network, 3: Show Address
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [depositAddress, setDepositAddress] = useState('');
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setStep(1);
      setSelectedCoin(null);
      setSelectedNetwork(null);
    }
  }, [isOpen]);

  // Generate a realistic-looking deposit address based on the coin
  useEffect(() => {
    if (selectedCoin && selectedNetwork) {
      let address = '';
      
      switch(selectedCoin) {
        case 'BTC':
          address = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';
          break;
        case 'ETH':
        case 'USDT':
          if (selectedNetwork.includes('ERC20')) {
            address = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
          } else if (selectedNetwork.includes('TRC20')) {
            address = 'TJYeasTPa6gpEEiNGJUFkAdYAzRxgNqJyH';
          } else if (selectedNetwork.includes('BEP20')) {
            address = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
          } else if (selectedNetwork.includes('Solana')) {
            address = 'HN7cABqLq46Es1jh92dQQisAq3uN76dHvFVMKtqQzXxr';
          }
          break;
        case 'SOL':
          address = 'HN7cABqLq46Es1jh92dQQisAq3uN76dHvFVMKtqQzXxr';
          break;
        case 'BNB':
          address = selectedNetwork.includes('BEP20') ? 
            '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' : 
            'bnb1u7jm0cll5r3at2machm8qh7yx95cszjd8majr3';
          break;
        case 'DOGE':
          address = 'DDTMXrcMSTRV4YrZzYUaAfuZjmY7TNs9Xn';
          break;
        default:
          address = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
      }
      
      setDepositAddress(address);
    }
  }, [selectedCoin, selectedNetwork]);

  // Popular coins to show at the top
  const popularCoins = ['BTC', 'ETH', 'USDT', 'BNB', 'SOL'];
  
  // Other coins
  const otherCoins = ['MATIC', 'DOGE', 'ADA', 'XRP', 'DOT'];
  
  // All available coins
  const allCoins = [...popularCoins, ...otherCoins];

  const handleCoinSelect = (coin) => {
    setSelectedCoin(coin);
    setStep(2);
  };

  const handleNetworkSelect = (network) => {
    setSelectedNetwork(network);
    setStep(3);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(depositAddress)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error('Could not copy text: ', err));
  };

  const handleGoBack = () => {
    if (step === 2) {
      setStep(1);
      setSelectedCoin(null);
    } else if (step === 3) {
      setStep(2);
      setSelectedNetwork(null);
    }
  };

  const handleSaveQRCode = () => {
    // In a real app, you would generate a downloadable image
    // This is a simplified version for demonstration
    alert('QR Code saved!');
  };

  const handleShareAddress = () => {
    if (navigator.share) {
      navigator.share({
        title: `${selectedCoin} deposit address`,
        text: `My ${selectedCoin} deposit address: ${depositAddress}`,
      })
      .catch(error => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support Web Share API
      alert(`Share address: ${depositAddress}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-gray-900 w-full max-w-md mx-3 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-red-900 flex items-center">
          {step > 1 && (
            <button 
              className="mr-2 text-white hover:bg-red-800 rounded-full p-1"
              onClick={handleGoBack}
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <h2 className="text-white text-lg font-medium">
            {step === 1 ? 'Deposit Crypto' : 
             step === 2 ? `Deposit ${selectedCoin}` : 
             `Deposit ${selectedCoin} (${selectedNetwork})`}
          </h2>
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
          {/* Step 1: Select Coin */}
          {step === 1 && (
            <div>
              <p className="text-gray-400 mb-4">Select the cryptocurrency you want to deposit</p>
              
              <div className="mb-4">
                <h3 className="text-white text-sm font-medium mb-2">Popular Coins</h3>
                <div className="grid grid-cols-2 gap-2">
                  {popularCoins.map(coin => (
                    <button
                      key={coin}
                      className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                      onClick={() => handleCoinSelect(coin)}
                    >
                      <CoinIcon symbol={coin} size={24} />
                      <span className="ml-3 text-white">{coin}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-white text-sm font-medium mb-2">Other Coins</h3>
                <div className="grid grid-cols-2 gap-2">
                  {otherCoins.map(coin => (
                    <button
                      key={coin}
                      className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                      onClick={() => handleCoinSelect(coin)}
                    >
                      <CoinIcon symbol={coin} size={24} />
                      <span className="ml-3 text-white">{coin}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Select Network */}
          {step === 2 && selectedCoin && (
            <div>
              <div className="flex items-center mb-4">
                <CoinIcon symbol={selectedCoin} size={32} />
                <div className="ml-3">
                  <h3 className="text-white font-medium">{selectedCoin}</h3>
                  <p className="text-gray-400 text-sm">Select network</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {networks[selectedCoin].map(network => (
                  <button
                    key={network}
                    className="w-full flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    onClick={() => handleNetworkSelect(network)}
                  >
                    <span className="text-white">{network}</span>
                    <ChevronDown size={18} className="text-gray-400" />
                  </button>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center text-yellow-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="ml-2 font-medium">Important</span>
                </div>
                <p className="mt-2 text-gray-400 text-sm">
                  Make sure you select the correct network for your deposit. Sending funds to the wrong network may result in permanent loss.
                </p>
              </div>
            </div>
          )}
          
          {/* Step 3: Show Address */}
          {step === 3 && selectedCoin && selectedNetwork && (
            <div>
              <div className="flex items-center mb-4">
                <CoinIcon symbol={selectedCoin} size={32} />
                <div className="ml-3">
                  <h3 className="text-white font-medium">{selectedCoin}</h3>
                  <p className="text-gray-400 text-sm">{selectedNetwork}</p>
                </div>
              </div>
              
              <div className="flex justify-center mb-4">
                <div className="relative p-3 bg-white rounded-xl">
                  <QRCodeSVG 
                    value={depositAddress} 
                    size={200} 
                    renderAs="svg"
                    level="H"
                    imageSettings={{
                      src: "data:image/svg+xml;base64," + btoa(`
                        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16,16 L20,12 L24,16 L20,20 Z" fill="#F3BA2F" />
                          <path d="M16,8 L18,10 L16,12 L14,10 Z" fill="#F3BA2F" />
                          <path d="M24,16 L22,18 L20,16 L22,14 Z" fill="#F3BA2F" />
                          <path d="M16,24 L14,22 L16,20 L18,22 Z" fill="#F3BA2F" />
                          <path d="M8,16 L10,14 L12,16 L10,18 Z" fill="#F3BA2F" />
                        </svg>
                      `),
                      excavate: true,
                      width: 40,
                      height: 40,
                    }}
                  />
                  <div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1"
                    style={{ width: 40, height: 40 }}
                  >
                    <CoinIcon symbol={selectedCoin} size={32} />
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="text-gray-400 text-sm block mb-1">
                  {selectedCoin} Deposit Address ({selectedNetwork})
                </label>
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-800 p-3 rounded-l-lg truncate text-white">
                    {depositAddress}
                  </div>
                  <button 
                    className={`p-3 rounded-r-lg ${copied ? 'bg-green-700' : 'bg-gray-700'} text-white`}
                    onClick={handleCopyAddress}
                  >
                    {copied ? 'Copied!' : <Copy size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-2 mb-4">
                <button 
                  className="flex-1 flex items-center justify-center bg-gray-800 py-2 rounded-lg text-white"
                  onClick={handleSaveQRCode}
                >
                  <Download size={18} className="mr-2" />
                  <span>Save QR</span>
                </button>
                <button 
                  className="flex-1 flex items-center justify-center bg-gray-800 py-2 rounded-lg text-white"
                  onClick={handleShareAddress}
                >
                  <Share2 size={18} className="mr-2" />
                  <span>Share</span>
                </button>
              </div>
              
              <div className="p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center text-yellow-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="ml-2 font-medium">Important</span>
                </div>
                <div className="mt-2 text-gray-400 text-sm space-y-2">
                  <p>• Send only {selectedCoin} to this deposit address.</p>
                  <p>• Ensure you're sending through the {selectedNetwork} network.</p>
                  <p>• Minimum deposit: 0.0001 {selectedCoin}</p>
                  <p>• Your deposit will be credited after network confirmation.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Deposit button component to be integrated into your dashboard
const DepositButton = ({ userBalance, setUserBalance, onDepositClick, onOpenModal, onCloseModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [depositAddress, setDepositAddress] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
    if (onOpenModal) onOpenModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (onCloseModal) onCloseModal();
  };

  const handleDeposit = (coin, amount) => {
    setUserBalance(prev => ({
      ...prev,
      [coin]: prev[coin] + amount
    }));
    handleCloseModal();
  };

  return (
    <>
      <button 
        className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
        onClick={handleOpenModal}
      >
        Deposit
      </button>
      {isModalOpen && (
        <DepositModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          userBalance={userBalance}
          onDeposit={handleDeposit}
        />
      )}
    </>
  );
};

export default DepositButton;