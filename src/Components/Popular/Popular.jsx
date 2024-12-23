import React, { useState, useEffect } from 'react';
import './Popular.css';
import Item from '../Item/Item';

const Popular = () => {
  const [products, setProducts] = useState([]); // State to store products
  const [loading, setLoading] = useState(true); // Loading state to show loading indicator
  const [error, setError] = useState(null); // Error state to handle errors

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/get-product'); // Replace with your backend URL
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json(); // Parse the response as JSON
        setProducts(data.products); // Set the products to the state
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError('Error fetching products');
        setLoading(false); // Set loading to false on error
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there's an error
  }

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {products.slice(0, 4).map((item, i) => { // Display only the first 4 products
          return (
            <Item
              key={i}
              id={item.productId}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
