import React, { useState } from "react";
import "./Home.css";

// Make sure to accept props
const Home = ({ addToCart, cartCount }) => {
  const [products, setProducts] = useState([

    {
      id: 1,
      name: "Bluetooth Speaker",
      price: "$79.99",
      icon: "🔊",
      category: "Electronics",
      addedToCart: false,
    },
        {
      id: 3,
      name: "Socks",
      price: "$89.99",
      icon: "👟",
      category: "Socks",
      addedToCart:false,
    },
    {
      id: 5,
      name: "Box",
      price: "$29.99",
      icon: "📦",
      category: "Boxxx",
      addedToCart: false,
    },
     {
      id: 6,
      name: "Wireless Headphones",
      price: "$39.99",
      icon: "🎧",
      category: "Electronics",
      addedToCart: false,
    },
    {
      id: 7,
      name: "Gaming Mouse",
      price: "$29.99",
      icon: "🖱️",
      category: "Electronics",
      addedToCart: false,
    },
     {
      id: 4,
      name: "Books",
      price: "$19.99",
      icon: "📚",
      category: "Books",
      addedToCart: false,
    },
    {
      id: 8,
      name: "Smart Watch",
      price: "$149.99",
      icon: "⌚",
      category: "Electronics",
      addedToCart: false,
    },
    {
      id: 9,
      name: "Coffee Mug",
      price: "$12.99",
      icon: "☕",
      category: "Home & Kitchen",
      addedToCart: false,
    },
    {
      id: 10,
      name: "Backpack",
      price: "$49.99",
      icon: "🎒",
      category: "Accessories",
      addedToCart: false,
    },
    {
      id: 11,
      name: "Desk Lamp",
      price: "$34.99",
      icon: "💡",
      category: "Home & Kitchen",
      addedToCart: false,
    },
    {
      id: 12,
      name: "Sunglasses",
      price: "$59.99",
      icon: "🕶️",
      category: "Accessories",
      addedToCart: false,
    },
    {
      id: 13,
      name: "Yoga Mat",
      price: "$29.99",
      icon: "🧘",
      category: "Sports",
      addedToCart: false,
    },
    {
      id: 14,
      name: "Power Bank",
      price: "$44.99",
      icon: "🔋",
      category: "Electronics",
      addedToCart: false,
    },
    {
      id: 15,
      name: "Water Bottle",
      price: "$15.99",
      icon: "💧",
      category: "Sports",
      addedToCart: false,
    },
    {
      id: 16,
      name: "Notebook Set",
      price: "$9.99",
      icon: "📓",
      category: "Stationery",
      addedToCart: false,
    },
    {
      id: 17,
      name: "Bluetooth Speaker",
      price: "$79.99",
      icon: "🔊",
      category: "Electronics",
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
