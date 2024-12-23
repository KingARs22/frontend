import React, { useState } from 'react';

const ProductForm = () => {
  const [productData, setProductData] = useState({
    productId: '',
    name: '',
    category: '',
    image: '',
    new_price: '',
    old_price: '',
    visibility: 'on',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/create-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const result = await response.json();

      if (result.success) {
        alert('Product created successfully');
        setProductData({
          productId: '',
          name: '',
          category: '',
          image: '',
          new_price: '',
          old_price: '',
          visibility: 'on',
        });
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      alert('Error creating product: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product ID:</label>
          <input
            type="text"
            name="productId"
            value={productData.productId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={productData.image}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>New Price:</label>
          <input
            type="number"
            name="new_price"
            value={productData.new_price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Old Price:</label>
          <input
            type="number"
            name="old_price"
            value={productData.old_price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Visibility:</label>
          <select
            name="visibility"
            value={productData.visibility}
            onChange={handleChange}
          >
            <option value="on">On</option>
            <option value="off">Off</option>
          </select>
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
