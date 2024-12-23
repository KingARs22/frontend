import React,{useState} from 'react'

const CreateProducts = () => {
    const [productData, setProductData] = useState({
        id: '',
        name: '',
        category: '',
        image: '',
        new_price: '',
        old_price: '',
      });
    const [message, setMessage] = useState(null);
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

  // Handle form submission
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
                if (response.status === 201) {
                    setMessage({ success: true, text: result.message });
                } else {
                    setMessage({ success: false, text: result.message });
                }
            } catch (error) {
            setMessage({ success: false, text: 'Error creating product: ' + error.message });
            setProductData({
                id: '',
                name: '',
                category: '',
                image: '',
                new_price: '',
                old_price: '',
              });
        }
    };


  return (
    <div className="createproducts">
      <h1>Create New Product</h1>
      {message && (
        <div style={{ color: message.success ? 'green' : 'red' }}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input
            type="number"
            name="id"
            value={productData.id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Name:</label>
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
        <button type="submit">Create Product</button>
      </form>
    </div>
  )
}

export default CreateProducts