"use client";
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const OrderPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

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
//Remove product
const removeProduct = async(product) =>{
  const newCart =cart.filter(cartItem => cartItem.id !== product.id);
  setCart(newCart);
}
useEffect(() => {
  // Calculate new total amount
  const newTotalAmount = cart.reduce((acc, curr) => acc + curr.totalAmount, 0);
  setTotalAmount(newTotalAmount);
}, [cart]);




const addProductTOCart = async(product) => {

    // check if the adding product exist
    let findProductInCart = await cart.find(i=>{
      return i.id === product.id
    });

console.log('Product added to cart:', product);
if (findProductInCart) {
  let newCart = [];
  let newItem;

  cart.forEach((item) => {
    if (item.id === product.id) {
      newItem = {
        ...item,
        quantity: item.quantity + 1,
        totalAmount: item.totalAmount + product.price,
      };
      newCart.push(newItem);
    }
    else {
      newCart.push(item);
    }
  });
  setCart(newCart);

}
else {
  let addingProduct = {
    ...product,
    quantity: 1,
    totalAmount: product.price,
  };
setCart([...cart, addingProduct]);
}



  }
  return (
    <div className="order-page">
      <header>
        <h1>Connexion Cafe</h1>
        <p>Tuesday, 12 Mar 2024</p>
      </header>

      <div className="order-content">
        <div className="coffee-items">
          {products.map((product) => (
            <div key={product.id} className="coffee-item" onClick={() => addProductTOCart(product)}>
              <img src={product.image} alt={product.item_name} />
              <p>{product.name}</p>
              <p>${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="order-summary">
          <h2>Order Summary</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                {/* <th>Total</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart ? (
                cart.map((cartProduct, key) => (
                  <tr key={key}>
                    <td>{cartProduct.name}</td>
                    <td>{cartProduct.price}</td>
                    <td>{cartProduct.quantity}</td>
                    {/* <td>{cartProduct.totalAmount}</td> */}
                    <td>
                      <button onClick={() => removeProduct(cartProduct)}>Remove</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No Item in Cart</td>
                </tr>
              )}
            </tbody>
          </table>
          <h3>Total Amount: ${totalAmount}</h3>
          {totalAmount !== 0 ? (
            <button className="checkout-btn">Checkout</button>
          ) : (
            <p>Please add a product to the cart</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;