import React from 'react';

const Favorites = ({ favorites }) => {
    return (
        <div>
            <h2>Favorites</h2>
            <ul>
                {favorites.map((favorite, index) => (
                    <li key={index}>{favorite}</li>
                ))}
            </ul>
        </div>
    );
};

export default Favorites; 