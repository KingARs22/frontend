import React, { useState, useEffect } from 'react'
import './CSS/ShopCategory.css'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'

const ShopCategory = (props) => {
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
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {products.map((item, i)=>{
          if (props.category===item.category){
            return <Item key={i} id ={item.productid} name={item.name} image={item.image} new_price = {item.new_price} old_price={item.old_price}/>
          }
          else{
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  )
}

export default ShopCategory