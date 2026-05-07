import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gender: "Male",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

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

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "radio" ? value : value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Simulate API call
      console.log("Registration data:", formData);

      // Show success message
      setShowSuccess(true);

      // Reset form after 2 seconds and redirect
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/");
      }, 2000);
    }
  };

  return (
    <>
      <div className="register-container">
        <div className="register-wrapper">
          <div className="register-sidebar">
            <div className="sidebar-section">
              <h3>CATEGORIES</h3>
              <ul className="sidebar-list">
                <li>
                  <Link to="/category/books">Books</Link>
                </li>
                <li>
                  <Link to="/category/computers">Computers</Link>
                </li>
                <li>
                  <Link to="/category/electronics">Electronics</Link>
                </li>
                <li>
                  <Link to="/category/apparel">Apparel & Shoes</Link>
                </li>
                <li>
                  <Link to="/category/digital-downloads">
                    Digital downloads
                  </Link>
                </li>
                <li>
                  <Link to="/category/jewelry">Jewelry</Link>
                </li>
                <li>
                  <Link to="/category/gift-cards">Gift Cards</Link>
                </li>
              </ul>
            </div>

            <div className="sidebar-section">
              <h3>MANUFACTURERS</h3>
              <ul className="sidebar-list">
                <li>
                  <Link to="/manufacturer/tricentis">Tricentis</Link>
                </li>
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
                <button type="submit" className="newsletter-button">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="register-form-container">
            {showSuccess && (
              <div className="success-message">
                Registration successful! Redirecting to home page...
              </div>
            )}

            <h2 className="register-title">Register</h2>

            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-section">
                <h3>Your Personal Details</h3>

                <div className="form-group">
                  <label className="form-label">Gender:</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === "Male"}
                        onChange={handleChange}
                      />
                      Male
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === "Female"}
                        onChange={handleChange}
                      />
                      Female
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label required">First name:</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`form-input ${errors.firstName ? "error" : ""}`}
                  />
                  {errors.firstName && (
                    <span className="error-message">{errors.firstName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label required">Last name:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`form-input ${errors.lastName ? "error" : ""}`}
                  />
                  {errors.lastName && (
                    <span className="error-message">{errors.lastName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label required">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? "error" : ""}`}
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>
              </div>

              <div className="form-section">
                <h3>Your Password</h3>

                <div className="form-group">
                  <label className="form-label required">Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-input ${errors.password ? "error" : ""}`}
                  />
                  {errors.password && (
                    <span className="error-message">{errors.password}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label required">
                    Confirm password:
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`form-input ${errors.confirmPassword ? "error" : ""}`}
                  />
                  {errors.confirmPassword && (
                    <span className="error-message">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="register-button">
                  Register
                </button>
                <Link to="/" className="cancel-button">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
