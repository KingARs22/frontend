import React from 'react'
import {Link} from 'react-router-dom'
import './Item.css'
const Item = (props) => {
  const handleClick = () => {
    // Print the final link to the console
    const link = `/product/${props.id}`;
    console.log("Final link: ", link);

    // Scroll to top before navigating
    window.scrollTo(0, 0);
};
  return (
    <div className='item'>
        <Link to={`/product/${props.id}`}>
            <img
                src={props.image}
                alt=""
                onClick={handleClick} // Log the link and navigate
            />
        </Link>
        <p>{props.name}</p>
        <div className="item-prices">
            <div className="item-price-new">
                Rs.{props.new_price}
            </div>
            <div className="item-price-old">
                Rs.{props.old_price}
            </div>
        </div>
    </div>
  )
}

export default Item