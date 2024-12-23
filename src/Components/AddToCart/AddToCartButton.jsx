import React, { useState } from 'react';

const AddToCartButton = ({ productId }) => {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  const handleAddToCart = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch('http://localhost:5000/cart/addtocart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for session
        body: JSON.stringify({
          userId,
          productId,
          quantity,
        }),
      });
      console.log(quantity);

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message || 'Error adding product to cart');
      }
    } catch (error) {
      setMessage('Network error. Please try again later.');
    }
  };

  return (
    <div>
      <input
        type="number"
        value={quantity}
        min="1"
        onChange={(e) => setQuantity(Number(e.target.value))}
        style={{ width: '60px', marginRight: '10px' }}
      />
      <button onClick={handleAddToCart}>Add to Cart</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddToCartButton;
