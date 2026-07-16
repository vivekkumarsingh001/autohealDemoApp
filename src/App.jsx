import "./App.css";
import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import CheckboxDemo from "./components/CheckboxDemo";
import TextboxDemo from "./components/TextboxDemo";
import TablesDemo from "./components/TablesDemo";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";

const LazyLoadingDemo = lazy(() => import("./components/LazyLoadingDemo"));
const IframeDemo = lazy(() => import("./components/IframeDemo"));
const IframeContent = lazy(() => import("./components/IframeContent"));
const ShadowDomDemo = lazy(() => import("./components/ShadowDomDemo"));
const ButtonDemo = lazy(() => import("./components/ButtonDemo"));
const DropdownDemo = lazy(() => import("./components/DropdownDemo"));

const RouteSpinner = () => (
  <div className="route-spinner-container" style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    gap: '1rem'
  }}>
    <div className="spinner" style={{
      width: '40px',
      height: '40px',
      border: '4px solid rgba(170, 59, 255, 0.1)',
      borderTop: '4px solid #aa3bff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <span style={{ color: '#6b6375', fontWeight: 550 }}>Loading Showcase Module...</span>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistedIds, setWishlistedIds] = useState([]);

  const toggleWishlist = (productId) => {
    setWishlistedIds((prev) => {
      const isAlreadyWishlisted = prev.includes(productId);
      const newWishlist = isAlreadyWishlisted
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      setWishlistCount(newWishlist.length);
      return newWishlist;
    });
  };
  const [cartHighlight, setCartHighlight] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      let newItems;
      if (existingItem) {
        newItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prevItems, { ...product, quantity: 1 }];
      }
      
      const totalCount = newItems.reduce((total, item) => total + item.quantity, 0);
      setCartCount(totalCount);
      
      return newItems;
    });

    setCartHighlight(true);
    setTimeout(() => setCartHighlight(false), 1000);
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== productId);
      const totalCount = newItems.reduce((total, item) => total + item.quantity, 0);
      setCartCount(totalCount);
      return newItems;
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => {
      const newItems = prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
      const totalCount = newItems.reduce((total, item) => total + item.quantity, 0);
      setCartCount(totalCount);
      return newItems;
    });
  };

  const handleBuyNow = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert(`Proceeding to checkout with ${cartCount} items`);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <Router basename={window.location.pathname.includes("/AutoHealDemoApp") ? "/AutoHealDemoApp" : window.location.pathname.includes("/autohealDemoApp") ? "/autohealDemoApp" : "/"}>
      <div className="app">
        <header className="header">
          <div className="top-bar">
            <div className="logo">
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h1>algoshack Demo App</h1>
              </Link>
            </div>
            <div className="user-actions">
              <Link to="/register" className="register-link">Register</Link>
              <span className="separator">|</span>
              <Link to="/login" className="login-link">Login</Link>
              <div 
                className={`cart-info ${cartHighlight ? 'cart-highlight' : ''}`}
                onClick={toggleCart}
                style={{ cursor: 'pointer' }}
              >
                <span className="cart-icon">🛒</span>
                <span className="cart-count">({cartCount})</span>
              </div>
              <div className="wishlist-info">
                <span className="wishlist-icon">❤️</span>
                <span className="wishlist-count">({wishlistCount})</span>
              </div>
              <div 
                className="refresh-info"
                onClick={() => window.location.href = "https://vivekkumarsingh001.github.io/autohealDemoApp/"}
                style={{ cursor: 'pointer' }}
                title="Go to Production Live Demo"
              >
                <span className="refresh-icon">🔄</span>
              </div>
            </div>
          </div>

          <div className="search-section">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search store"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">Search</button>
            </form>
          </div>
        </header>

        <nav className="categories">
          <ul className="category-list">
            <li>
              <Link to="/category/checkbox">CHECKBOX</Link>
            </li>
            <li>
              <Link to="/category/textbox">TEXTBOX</Link>
            </li>
            <li>
              <Link to="/category/button">BUTTON</Link>
            </li>
            <li>
              <Link to="/category/tables">TABLES</Link>
            </li>
            <li>
              <Link to="/category/dropdown">DROPDOWN</Link>
            </li>
            <li>
              <Link to="/category/lazy-loading">LAZY LOADING</Link>
            </li>
            <li>
              <Link to="/category/iframe">IFRAME</Link>
            </li>
            <li>
              <Link to="/category/shadow-dom">SHADOW DOM</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} cartCount={cartCount} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category/checkbox" element={<CheckboxDemo />} />
          <Route path="/category/textbox" element={<TextboxDemo />} />
          <Route path="/category/tables" element={<TablesDemo />} />
          <Route path="/category/lazy-loading" element={
            <Suspense fallback={<RouteSpinner />}>
              <LazyLoadingDemo 
                addToCart={addToCart} 
                toggleWishlist={toggleWishlist}
                wishlistedIds={wishlistedIds}
              />
            </Suspense>
          } />
          <Route path="/category/iframe" element={
            <Suspense fallback={<RouteSpinner />}>
              <IframeDemo />
            </Suspense>
          } />
          <Route path="/iframe-content" element={
            <Suspense fallback={<RouteSpinner />}>
              <IframeContent />
            </Suspense>
          } />
          <Route path="/category/shadow-dom" element={
            <Suspense fallback={<RouteSpinner />}>
              <ShadowDomDemo />
            </Suspense>
          } />
          <Route path="/category/button" element={
            <Suspense fallback={<RouteSpinner />}>
              <ButtonDemo />
            </Suspense>
          } />
          <Route path="/category/dropdown" element={
            <Suspense fallback={<RouteSpinner />}>
              <DropdownDemo />
            </Suspense>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Cart 
          cartItems={cartItems}
          cartCount={cartCount}
          isOpen={isCartOpen}
          onClose={toggleCart}
          onRemoveItem={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onBuyNow={handleBuyNow}
        />
      </div>
    </Router>
  );
}

export default App;