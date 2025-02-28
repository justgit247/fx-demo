import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Markets from './pages/Markets';
import OrderHistory from './components/OrderHistory';
import Favorites from './components/Favorites';
import Login from './components/Login';
import Dashboard from './pages/CopytradingDashboard';
import Trade from './pages/Trade';
import Assets from './pages/Assets';
import Wallet from './pages/Wallet';
import Trades from './pages/Trades';
import Profile from './pages/Profile';
import Loading from './components/Loading';

import './App.css';

const App = () => {
    const [user] = useState({ name: 'John Doe' });
    const [balance] = useState(1000);
    const [recentTrades] = useState(['Bought BTC', 'Sold ETH']);
    const [favorites, setFavorites] = useState(['BTC', 'ETH', 'USDT']);
    const [orders] = useState([
        { date: '2023-10-01', type: 'Buy', amount: 1, asset: 'BTC', price: 50000 },
        { date: '2023-10-02', type: 'Sell', amount: 0.5, asset: 'ETH', price: 3000 },
    ]);
    const [loading, setLoading] = useState(true);

    const handleRemoveFavorite = (favorite) => {
        setFavorites(favorites.filter(f => f !== favorite));
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Router>
            {loading ? (
                <Loading />
            ) : (
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/markets" element={<Markets />} />
                    <Route path="/trade" element={<Trade />} />
                    <Route path="/assets" element={<Assets />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/order-history" element={<OrderHistory orders={orders} />} />
                    <Route path="/favorites" element={<Favorites favorites={favorites} onRemove={handleRemoveFavorite} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/wallet" element={<Wallet />} />
                    <Route path="/trades" element={<Trades />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            )}
        </Router>
    );
};

export default App;
