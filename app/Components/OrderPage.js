"use client";
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const OrderPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const db = getFirestore();
      const colRef = collection(db, 'products');

      try {
        const snapshot = await getDocs(colRef);
        const productsData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="order-page">
      <header>
        <h1>Connexion Cafe</h1>
        <p>Tuesday, 12 Mar 2024</p>
      </header>
      <div className="coffee-items">
        {products.map((product) => (
          <div key={product.id} className="coffee-item">
            <img src={product.image} alt={product.item_name} />
            <p>{product.name}</p>
            <p>${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="order-summary">
        {/* Add order summary */}
        <div className="order-item">
          <p>Cappuccino</p>
          <p>2</p>
          <p>$6.00</p>
        </div>
        {/* Add more order items */}
        <p className="sub-total">Sub total: $21.00</p>
        <button>Continue to Payment</button>
      </div>
    </div>
  );
};

export default OrderPage;