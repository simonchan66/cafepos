"use client";
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const EditProductPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    category: '',
    active: true,
    description: '',
    image: '',
    price: 0,
    name: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async () => {
    const db = getFirestore();
    const colRef = collection(db, 'products');

    try {
      await addDoc(colRef, { ...newProduct, price: parseFloat(newProduct.price) });
      setNewProduct({
        category: '',
        active: true,
        description: '',
        image: '',
        price: 0,
        name: '',
      });
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again.');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      category: product.category,
      active: product.active,
      description: product.description,
      image: product.image,
      price: product.price,
      name: product.name,
    });
  };

  const handleUpdateProduct = async () => {
    const db = getFirestore();
    const productRef = doc(db, 'products', editingProduct.id);

    try {
      await updateDoc(productRef, { ...newProduct, price: parseFloat(newProduct.price) });
      setEditingProduct(null);
      setNewProduct({
        category: '',
        active: true,
        description: '',
        image: '',
        price: 0,
        name: '',
      });
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product. Please try again.');
    }
  };

  const handleDeleteProduct = async (productId) => {
    const db = getFirestore();
    const productRef = doc(db, 'products', productId);

    try {
      await deleteDoc(productRef);
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Edit Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">Add New Product</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block font-semibold mb-1 text-white">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block font-semibold mb-1 text-white">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block font-semibold mb-1 text-white">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block font-semibold mb-1 text-white">
                Image URL
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={newProduct.image}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block font-semibold mb-1 text-white">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleAddProduct}
                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors duration-300"
              >
                Add Product
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">Existing Products</h2>
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-gray-400">Name</th>
                  <th className="px-4 py-2 text-left text-gray-400">Category</th>
                  <th className="px-4 py-2 text-left text-gray-400">Price</th>
                  <th className="px-4 py-2 text-left text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-700">
                    <td className="px-4 py-2 text-white">{product.name}</td>
                    <td className="px-4 py-2 text-white">{product.category}</td>
                    <td className="px-4 py-2 text-white">${product.price.toFixed(2)}</td>
                    <td className="px-4 py-2 flex">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="bg-indigo-500 text-white px-2 py-1 rounded-md hover:bg-indigo-600 transition-colors duration-300 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {editingProduct && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-gray-900 rounded-lg p-8">
            <h2 className="text-xl font-semibold mb-4 text-white">Edit Product</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block font-semibold mb-1 text-white">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block font-semibold mb-1 text-white">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block font-semibold mb-1 text-white">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block font-semibold mb-1 text-white">
                Image URL
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={newProduct.image}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block font-semibold mb-1 text-white">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setEditingProduct(null)}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-colors duration-300 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProduct}
                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors duration-300"
              >
                Update Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProductPage;