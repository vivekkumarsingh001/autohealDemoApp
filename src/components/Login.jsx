import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate API call
      console.log("Login data:", formData);
      
      // Show success message
      setShowSuccess(true);
      
      // Store remember me preference
      if (formData.rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      
      // Redirect after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/");
      }, 2000);
    }
  };

  // Load remembered email if exists
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail, rememberMe: true }));
    }
  }, []);

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Sidebar */}
        <div className="login-sidebar">
          <div className="sidebar-section">
            <h3>CATEGORIES</h3>
            <ul className="sidebar-list">
              <li><Link to="/category/books">Books</Link></li>
              <li><Link to="/category/computers">Computers</Link></li>
              <li><Link to="/category/electronics">Electronics</Link></li>
              <li><Link to="/category/apparel">Apparel & Shoes</Link></li>
              <li><Link to="/category/digital-downloads">Digital downloads</Link></li>
              <li><Link to="/category/jewelry">Jewelry</Link></li>
              <li><Link to="/category/gift-cards">Gift Cards</Link></li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>MANUFACTURERS</h3>
            <ul className="sidebar-list">
              <li><Link to="/manufacturer/tricentis">Tricentis</Link></li>
            </ul>
          </div>

          <div className="sidebar-section newsletter">
            <h3>NEWSLETTER</h3>
            <p>Sign up for our newsletter:</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-button">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Login Form */}
        <div className="login-form-container">
          {showSuccess && (
            <div className="success-message">
              Login successful! Redirecting to home page...
            </div>
          )}
          
          <h2 className="login-title">Welcome, Please Sign In!</h2>
          
          <form onSubmit={handleSubmit} className="login-form">
            {/* New Customer Section */}
            <div className="form-section new-customer">
              <h3>New Customer</h3>
              <p className="new-customer-text">
                By creating an account on our website you will be able to shop faster, 
                be up to date on an orders status, and keep track of the orders you 
                have previously made.
              </p>
              <Link to="/register" className="register-button-link">
                Register
              </Link>
            </div>

            {/* Returning Customer Section */}
            <div className="form-section returning-customer">
              <h3>Returning Customer</h3>
              
              <div className="form-group">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? "error" : ""}`}
                  placeholder="Enter your email"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input ${errors.password ? "error" : ""}`}
                  placeholder="Enter your password"
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  Remember me?
                </label>
                <Link to="/forgot-password" className="forgot-password">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="login-button">
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;