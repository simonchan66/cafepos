"use client";

import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const Allstats = () => {
  const [orders, setOrders] = useState([]);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

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
        setOrders(ordersData.sort((a, b) => new Date(b.transaction_time) - new Date(a.transaction_time)));
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleShowOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleCloseOrderDetails = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      const db = getFirestore();
      const orderRef = doc(db, 'transactions', orderId);

      try {
        await deleteDoc(orderRef);
        setOrders(orders.filter((order) => order.id !== orderId));
        console.log('Order deleted successfully!');
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  return (
    <div className="orders-page">
      <header className="bg-gray-800 text-white py-4 px-6">
        <h1 className="text-xl font-semibold">Orders</h1>
      </header>
      <div className="orders-container p-6">
        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2">User</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Total Amount</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-700 hover:bg-gray-800 cursor-pointer"
                    onClick={() => handleShowOrderDetails(order)}
                  >
                    <td className="px-4 py-2 text-white">{order.order_id}</td>
                    <td className="px-4 py-2 text-white">{order.user_name}</td>
                    <td className="px-4 py-2 text-white">{new Date(order.transaction_time).toLocaleDateString()}</td>
                    <td className="px-4 py-2 text-white">${order.total_amount.toFixed(2)}</td>
                    <td className="px-4 py-2 text-white">
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteOrder(order.id);
                        }}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No orders found.</p>
        )}
      </div>
      {showOrderDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Order Details</h2>
              <p>Order ID: {selectedOrder.order_id}</p>
              <p>User: {selectedOrder.user_name}</p>
              <p>Date: {new Date(selectedOrder.transaction_time).toLocaleString()}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-md font-semibold mb-2">Items:</h3>
              <ul>
                {selectedOrder.order_items.map((item, index) => (
                  <li key={index}>
                    {item.item_name} x {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between">
              <div>
                <p>Total Amount: ${selectedOrder.total_amount.toFixed(2)}</p>
                <p>Cash: ${selectedOrder.cash_amount.toFixed(2)}</p>
                <p>Voucher: ${selectedOrder.voucher_amount.toFixed(2)}</p>
              </div>
            </div>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-gray-600 transition-colors duration-300"
              onClick={handleCloseOrderDetails}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Allstats;