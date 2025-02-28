import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, BarChart2, Repeat, CreditCard, Settings, Bell, HelpCircle, LogOut, User, Plus } from 'lucide-react';
import TradingView from './Tradingview';
import OrderBook from './OrderBook';
import TradeHistory from './TradeHistory';
import PlaceOrderForm from './PlaceOrderForm';
import MarketOverview from './MarketOverview';

export const ResponsiveNavigation = ({ 
    marketData, 
    selectedPair, 
    userBalance, 
    userWatchlist = [], 
    onPairSelect, 
    onToggleWatchlist, 
    orderHistory, 
    handlePlaceOrder,
    onDepositClick
}) => {
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();

    // Check screen size on mount and when window resizes
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        // Initial check
        checkScreenSize();
        
        // Add resize listener
        window.addEventListener('resize', checkScreenSize);
        
        // Clean up
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Function to handle Wallet button click
    const handleWalletClick = () => {
        console.log('Wallet button clicked!');
        navigate('/wallet');
    };

    // Ensure userWatchlist is an array before using filter
    const filteredWatchlist = userWatchlist.filter(item => item); // Adjust the filter condition as needed

    return (
        <>
            {/* Desktop Sidebar - Only visible on desktop */}
            {!isMobile && <DesktopSidebar />}
            
            {/* Mobile Top Bar - Only visible on mobile */}
            {isMobile && <MobileTopBar />}
            
            {/* Content Area */}
            <div className={`bg-gray-100 ${isMobile ? 'pt-16 pb-16' : 'ml-64'}`} style={{ minHeight: '100vh' }}>
                {/* Dashboard Content */}
                <div className="p-4">
                    <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
                    <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-3/5 h-1/2 lg:h-full p-1">
                            <TradingView 
                                symbol={selectedPair} 
                                layoutView="default"
                            />
                        </div>
                        
                        <div className="lg:w-2/5 h-1/2 lg:h-full flex flex-col p-1">
                            <div className="flex-1 mb-1 bg-gray-800 rounded">
                                <OrderBook 
                                    symbol={selectedPair} 
                                    depth={10}
                                />
                            </div>
                            <div className="flex-1 mt-1 bg-gray-800 rounded">
                                <TradeHistory 
                                    symbol={selectedPair}
                                    userHistory={orderHistory.filter(order => order.symbol === selectedPair)}
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="h-56 lg:h-64 p-1 border-t border-gray-800">
                        <PlaceOrderForm 
                            symbol={selectedPair}
                            userBalance={userBalance}
                            onPlaceOrder={handlePlaceOrder}
                            marketPrice={marketData.find(item => item.symbol === selectedPair)?.lastPrice || 0}
                        />
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="px-4 mb-6">
                    <p className="text-xs font-light uppercase tracking-wider text-gray-500 mb-4">Account</p>
                    <nav>
                        <NavItem icon={<User size={18} />} label="Profile" />
                        <NavItem icon={<Bell size={18} />} label="Notifications" />
                        <NavItem icon={<Settings size={18} />} label="Settings" />
                        <NavItem 
                            icon={<CreditCard size={18} />} 
                            label="Wallet" 
                            onClick={handleWalletClick}
                        />
                        <NavItem icon={<Plus size={18} />} label="Deposit" onClick={onDepositClick} />
                    </nav>
                </div>
            </div>
            
            {/* Mobile Bottom Tabs - Only visible on mobile */}
            {isMobile && <MobileBottomTabs />}
        </>
    );
};

// Desktop Sidebar Component
const DesktopSidebar = () => {
    return (
        <div className="fixed h-screen w-64 bg-red-900 text-gray-300 flex flex-col left-0 top-0">
            {/* Logo Section */}
            <div className="p-4 border-b border-gray-800">
                <div className="flex items-center space-x-2">
                    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16,16 L20,12 L24,16 L20,20 Z" fill="#F3BA2F" />
                        <path d="M16,8 L18,10 L16,12 L14,10 Z" fill="#F3BA2F" />
                        <path d="M24,16 L22,18 L20,16 L22,14 Z" fill="#F3BA2F" />
                        <path d="M16,24 L14,22 L16,20 L18,22 Z" fill="#F3BA2F" />
                        <path d="M8,16 L10,14 L12,16 L10,18 Z" fill="#F3BA2F" />
                    </svg>
                    <div>
                        <span className="font-medium text-lg text-white">FX</span>
                        <span className="font-light text-sm ml-1 text-gray-400">DEMO</span>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="flex-1 py-6 overflow-y-auto">
                <div className="px-4 mb-6">
                    <p className="text-xs font-light uppercase tracking-wider text-gray-500 mb-4">Main</p>
                    <nav>
                        <NavItem icon={<Home size={18} />} label="Dashboard" active />
                        <NavItem icon={<BarChart2 size={18} />} label="Markets" />
                        <NavItem icon={<Repeat size={18} />} label="Exchange" />
                        <NavItem icon={<CreditCard size={18} />} label="Wallet" />
                    </nav>
                </div>

                <div className="px-4 mb-6">
                    <p className="text-xs font-light uppercase tracking-wider text-gray-500 mb-4">Account</p>
                    <nav>
                        <NavItem icon={<User size={18} />} label="Profile" />
                        <NavItem icon={<Bell size={18} />} label="Notifications" />
                        <NavItem icon={<Settings size={18} />} label="Settings" />
                    </nav>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="p-4 border-t border-gray-800">
                <nav>
                    <NavItem icon={<HelpCircle size={18} />} label="Help Center" />
                    <NavItem icon={<LogOut size={18} />} label="Log Out" />
                </nav>
            </div>
        </div>
    );
};

// Mobile Top Bar Component
const MobileTopBar = () => {
    return (
        <div className="fixed top-0 left-0 right-0 h-16 bg-red-900 text-white flex items-center justify-between px-4 z-10">
            <div className="flex items-center space-x-2">
                <svg width="24" height="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16,16 L20,12 L24,16 L20,20 Z" fill="#F3BA2F" />
                    <path d="M16,8 L18,10 L16,12 L14,10 Z" fill="#F3BA2F" />
                    <path d="M24,16 L22,18 L20,16 L22,14 Z" fill="#F3BA2F" />
                    <path d="M16,24 L14,22 L16,20 L18,22 Z" fill="#F3BA2F" />
                    <path d="M8,16 L10,14 L12,16 L10,18 Z" fill="#F3BA2F" />
                </svg>
                <div>
                    <span className="font-medium text-white">FX DEMO</span>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <Bell size={20} />
                <User size={20} />
            </div>
        </div>
    );
};

// Mobile Bottom Tabs Component
const MobileBottomTabs = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 h-16 bg-red-900 text-gray-300 flex justify-around items-center border-t border-gray-800 z-10">
            <BottomTab icon={<Home size={20} />} label="Home" active />
            <BottomTab icon={<BarChart2 size={20} />} label="Markets" />
            <BottomTab icon={<Repeat size={20} />} label="Exchange" />
            <BottomTab icon={<CreditCard size={20} />} label="Wallet" />
            <BottomTab icon={<Settings size={20} />} label="More" />
        </div>
    );
};

// Navigation Item Component for Sidebar
const NavItem = ({ icon, label, active = false, onClick }) => {
    return (
        <div 
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer mb-1 transition-colors ${active ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 hover:text-white'}`}
            onClick={onClick}
        >
            <div className="text-gray-400">{icon}</div>
            <span className={`font-light text-sm ${active ? 'text-white' : ''}`}>{label}</span>
        </div>
    );
};

// Bottom Tab Component for Mobile
const BottomTab = ({ icon, label, active = false }) => {
    return (
        <div className="flex flex-col items-center">
            <div className={`${active ? 'text-white' : 'text-gray-400'}`}>{icon}</div>
            <span className={`text-xs mt-1 ${active ? 'text-white' : 'text-gray-400'}`}>{label}</span>
        </div>
    );
};