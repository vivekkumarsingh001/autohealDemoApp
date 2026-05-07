import React from "react";
import "./Cart.css";

const Cart = ({ cartItems, cartCount, isOpen, onClose, onRemoveItem, onUpdateQuantity, onBuyNow }) => {
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.substring(1));
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="cart-overlay" onClick={onClose}></div>}
      
      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="cart-close" onClick={onClose}>×</button>
        </div>
        
        <div className="cart-items-container">
          {cartCount === 0 ? (
            <div className="cart-empty">
              <div className="empty-cart-icon">🛒</div>
              <p>Your cart is empty</p>
              <button className="continue-shopping" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items-list">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      {item.icon}
                    </div>
                    <div className="cart-item-details">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-price">{item.price}</div>
                      <div className="cart-item-category">{item.category}</div>
                    </div>
                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button 
                          className="quantity-btn"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button 
                        className="remove-item"
                        onClick={() => onRemoveItem(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                    <div className="cart-item-total">
                      ${(parseFloat(item.price.substring(1)) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cart-footer">
                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Subtotal ({cartCount} items):</span>
                    <strong>${getTotalPrice().toFixed(2)}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Shipping:</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <strong>${getTotalPrice().toFixed(2)}</strong>
                  </div>
                </div>
                
                <div className="cart-buttons">
                  <button className="buy-now-btn" onClick={onBuyNow}>
                    Buy Now
                  </button>
                  <button className="continue-shopping-btn" onClick={onClose}>
                    Continue Shopping
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;