import React, {useState, useEffect} from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { useParams } from 'react-router-dom';

import AddToCartButton from '../AddToCart/AddToCartButton'

const ProductDisplay = (props) => {
    const { productId } = useParams(); // Extract productId from the URL
    const [product, setProduct] = useState(null); // Store product details
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    

    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const response = await fetch(`http://localhost:5000/product/${productId}`);
            const data = await response.json();
            console.log(productId)
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
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={product.image} alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-star">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-prices-old">Rs{product.old_price}</div>
                <div className="productdisplay-right-prices-new">Rs{product.new_price}</div>
            </div>
            <div className="productdisplay-right-description">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam inventore mollitia dicta reiciendis tenetur et in blanditiis eligendi doloremque illum, nihil quos natus enim, ullam corporis ab rem cupiditate. Dolorem.
            </div>
            <div className="productdisplay-right-size">
                <h1>Select Size</h1>
                <div className="productdisplay-right-sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div>
            <AddToCartButton productId={product.productId}/>
            <p className='productdisplay-right-category'><span>Category:</span>LALALALALALALa</p>
            <p className='productdisplay-right-category'><span>Tags:</span>LAlalaa</p>
        </div>
    </div>
  )
}

export default ProductDisplay