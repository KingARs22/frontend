import React, { useState, useEffect } from 'react';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState(null);

  // Retrieve userId from localStorage or global state
  const userId = localStorage.getItem('userId');  // or use a context to manage the user ID

  useEffect(() => {
    if (!userId) {
      setError('User is not logged in');
      return;
    }

    // Fetch cart items for the user
    const fetchCart = async () => {
      try {
        const response = await fetch('http://localhost:5000/get-cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }), // Send the userId to the backend
        });

        const data = await response.json();

        if (response.ok) {
          setCart(data.cart);  // Set the cart data if the response is successful
        } else {
          setError(data.message || 'Error fetching cart');
        }
      } catch (error) {
        setError('Error fetching cart');
      }
    };

    fetchCart();
  }, [userId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {cart ? (
        <div>
          <ul>
            {cart.productsInCart.map((item, index) => (
              <li key={index}>
                <p>Product ID: {item.productId}</p>
                <p>Quantity: {item.productQty}</p>
              </li>
            ))}
          </ul>
          {/* Optionally, display total price, remove items, etc. */}
        </div>
      ) : (
        <p>Loading your cart...</p>
      )}
    </div>
  );
};

export default CartPage;
