import React, {useState,useEffect} from 'react'
import remove_icon from '../Assets/cart_cross_icon.png';

const CartProducts = (props) => {

    const { productId } = props.productId; // Extract productId from the URL
    const [product, setProduct] = useState(null); // Store product details
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    

    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const response = await fetch(`http://localhost:5000/product/${productId}`);
            const data = await response.json();
    
            if (response.ok) {
              setProduct(data.product);
              setError(null);
            } else {
              setError(data.message || 'Error fetching product');
            }
          } catch (err) {
            setError('Failed to connect to the server. Please try again later.');
          } finally {
            setLoading(false);
          }
        };
    
        fetchProduct();
      }, [productId]);
    
      if (loading) {
        return <p>Loading...</p>;
      }
    
      if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
      }
  return (
    <div>
        <div className="cartitems-format cartitems-format-main">
        <img className='carticon-product-icon' src={product.image} alt="" />
        <p>{product.name}</p>
        <p>${product.new_price}</p>
        <button className='cartitems-quantity'>{props.quantity}</button>
        <p>{product.new_price*props.quantity}</p>
        <img className='cartitems-remove-icon' src={remove_icon} alt="" />
    </div>
    <hr />
</div>
  )
}

export default CartProducts