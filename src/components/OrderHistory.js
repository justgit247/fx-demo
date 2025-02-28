import React from 'react';

const OrderHistory = ({ orders }) => {
    return (
        <div>
            <h2>Order History</h2>
            <ul>
                {orders.map((order, index) => (
                    <li key={index}>
                        {order.type} {order.amount} {order.asset} at {order.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderHistory; 