import React, { useState } from "react";
import "./Home.css";

// Make sure to accept props
const Home = ({ addToCart, cartCount }) => {
  const [products, setProducts] = useState([
    {
      id: 3,
      name: "Sample Product 3",
      price: "$79.99",
      icon: "👟",
      category: "Shoes",
      addedToCart: false,
    },
    {
      id: 1,
      name: "Sample Product 1",
      price: "$29.99",
      icon: "📦",
      category: "Electronics",
      addedToCart: false,
    },
    {
      id: 4,
      name: "Sample Product 4",
      price: "$19.99",
      icon: "📚",
      category: "Books",
      addedToCart: false,
    },
    {
      id: 2,
      name: "Sample Product 2",
      price: "$29.99",
      icon: "📦📚",
      category: "Boxxx",
      addedToCart: false,
    },
  ]);

  const handleAddToCart = (product) => {
    console.log("handleAddToCart called with:", product); // Debug log
    console.log("addToCart function:", addToCart); // Debug log

    // Check if addToCart exists before calling
    if (addToCart && typeof addToCart === "function") {
      // Update product addedToCart status for green highlight
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === product.id ? { ...p, addedToCart: true } : p,
        ),
      );

      // Call the parent's addToCart function
      addToCart(product);

      // Remove green highlight from product after 2 seconds
      setTimeout(() => {
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === product.id ? { ...p, addedToCart: false } : p,
          ),
        );
      }, 2000);
    } else {
      console.error("addToCart is not a function!", addToCart);
    }
  };

  return (
    <>
      <div className="featured-products">
        <h2>Welcome to algoshack Demo App</h2>
        <p>Discover our amazing collection of products!</p>

        <div className="product-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className={`product-card ${product.addedToCart ? "added-to-cart" : ""}`}
            >
              <div className="product-image">{product.icon}</div>
              <h3>{product.name}</h3>
              <p className="category">{product.category}</p>
              <p className="price">{product.price}</p>
              <button
                className="add-to-cart"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
