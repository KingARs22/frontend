import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    
    const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the form data to the backend
    try {
        const response = await fetch('http://localhost:5000/auth/login', { // Adjust the URL if needed
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.status === 200) {
        alert('Login successful');
        localStorage.setItem('userId', data.userId);
        // Redirect or perform other actions after successful login
        } else {
        alert(data.error || 'Invalid email or password');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Error logging in');
    }
    };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          <button type="submit">Continue</button>
        </form>
        <p className='loginsignup-login'>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
