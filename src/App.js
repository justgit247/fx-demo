import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Markets from './pages/Markets';
import UserDashboard from './components/UserDashboard';
import OrderHistory from './components/OrderHistory';
import Favorites from './components/Favorites';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import Trade from './pages/Trade';
import Assets from './pages/Assets';

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

    const handleRemoveFavorite = (favorite) => {
        setFavorites(favorites.filter(f => f !== favorite));
    };

    return (
        <Router>
            <Routes>
                
                <Route path="/markets" element={<Markets />} />
                <Route path="/trade" element={<Trade />} />
                <Route path="/assets" element={<Assets />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/order-history" element={<OrderHistory orders={orders} />} />
                <Route path="/favorites" element={<Favorites favorites={favorites} onRemove={handleRemoveFavorite} />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;
