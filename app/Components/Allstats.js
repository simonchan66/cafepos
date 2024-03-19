"use client";
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const Allstats = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const db = getFirestore();
      const ordersRef = collection(db, 'transactions');

      try {
        const snapshot = await getDocs(ordersRef);
        const ordersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);


  return (
    <div className="orders-page">
      <header className="bg-gray-800 text-white py-4 px-6">
        <h1 className="text-xl font-semibold">Orders</h1>
      </header>

      <div className="orders-container p-6">
        {orders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-800 text-white p-4 rounded-lg shadow-md"
              >
                <h2 className="text-sm font-semibold mb-1">
                  Order ID: {order.order_id}
                </h2>
                <p className="text-xs mb-1">User: {order.user_name}</p>
                <p className="text-xs mb-1">
                  Time: {new Date(order.transaction_time).toLocaleDateString()}
                </p>
                <div className="mb-2">
                  <h3 className="text-xs font-semibold mb-1">Items:</h3>
                  <ul className="text-xs">
                    {order.order_items.map((item, index) => (
                      <li key={index}>
                        {item.item_name} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between text-xs">
                  <p>Total: ${order.total_amount.toFixed(2)}</p>
                  <div>
                    <p>Cash: ${order.cash_amount.toFixed(2)}</p>
                    <p>Voucher: ${order.voucher_amount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Allstats;