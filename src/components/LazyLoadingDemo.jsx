import React, { useState, useEffect, useRef, useCallback } from "react";
import "./LazyLoadingDemo.css";

// Generate mock items helper
const generateMockItems = (startIndex, count) => {
  const categories = ["Gadgets", "Workspace", "Lifestyle", "Fashion", "Minimalism"];
  const unsplashIds = [
    "photo-1523275335684-37898b6baf30", // White watch
    "photo-1505740420928-5e560c06d30e", // Headphones
    "photo-1572635196237-14b3f281503f", // Glasses
    "photo-1542291026-7eec264c27ff", // Red sneaker
    "photo-1560343090-f0409e92791a", // Shoe close up
    "photo-1526170375885-4d8ecf77b99f", // Polaroid camera
    "photo-1491553895911-0055eca6402d", // Nike shoes
    "photo-1583394838336-acd977736f90", // Retro microphone
    "photo-1581091226825-a6a2a5aee158", // Desk setup
    "photo-1486406146926-c627a92ad1ab", // Modern architecture
    "photo-1507679799987-c73779587ccf", // Suit/watch
    "photo-1542496658-e33a6d0d50f6", // Desk calendar
    "photo-1555041469-a586c61ea9bc", // Green couch
    "photo-1511556532299-8f662fc26c06", // Abstract art
    "photo-1498049794561-7780e7231661", // Laptop desk
    "photo-1527443224154-c4a3942d3acf", // Dual monitors
  ];

  return Array.from({ length: count }, (_, i) => {
    const id = startIndex + i;
    const category = categories[id % categories.length];
    const imageId = unsplashIds[id % unsplashIds.length];
    
    return {
      id,
      title: `Premium Item #${id + 1}`,
      description: `A beautifully crafted luxury item designed for modern ${category.toLowerCase()} enthusiasts. Features minimalist styling and premium materials.`,
      category,
      price: `$${(29.99 + (id * 12.5) % 199).toFixed(2)}`,
      imageUrl: `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=600&q=80`,
      placeholderUrl: `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=50&q=30`, // Tiny low-quality image
    };
  });
};

// Sub-component for individual lazy loaded image
const LazyImage = ({ src, placeholder, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect(); // Stop observing once it's visible
          }
        });
      },
      { rootMargin: "100px" } // Load slightly before it enters the viewport
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`lazy-image-container ${isLoaded ? "loaded" : ""}`} ref={imgRef}>
      {/* Tiny low-res blurred background wrapper */}
      {!isLoaded && (
        <img
          src={placeholder}
          alt={alt}
          className="lazy-image-placeholder"
        />
      )}
      
      {/* High-res image loaded only when in view */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`lazy-image-actual ${isLoaded ? "visible" : "hidden"}`}
          onLoad={() => setIsLoaded(true)}
        />
      )}
      
      {!isLoaded && <div className="lazy-image-shimmer" />}
    </div>
  );
};

const LazyLoadingDemo = ({ addToCart, toggleWishlist, wishlistedIds = [] }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [latency, setLatency] = useState(1000); // 1s default simulated network delay
  const [mode, setMode] = useState("scroll"); // 'scroll' (infinite) or 'button' (load more button)
  const [page, setPage] = useState(0);
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [modalDelay, setModalDelay] = useState(2); // Default 2 seconds
  const [isModalAdding, setIsModalAdding] = useState(false);

  const closeModal = () => {
    setSelectedItem(null);
    setIsAddedToCart(false);
    setIsModalAdding(false);
  };

  const observerRef = useRef(null);
  const sentinelRef = useRef(null);

  const ITEMS_PER_PAGE = 8;
  const MAX_ITEMS = 40;

  // Load a batch of items
  const loadMoreItems = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, latency));

    const nextBatch = generateMockItems(items.length, ITEMS_PER_PAGE);
    
    setItems((prev) => {
      const merged = [...prev, ...nextBatch];
      if (merged.length >= MAX_ITEMS) {
        setHasMore(false);
      }
      return merged;
    });
    
    setPage((prev) => prev + 1);
    setIsLoading(false);
  }, [items.length, isLoading, hasMore, latency]);

  // Initial Load
  useEffect(() => {
    loadMoreItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // IntersectionObserver for Infinite Scroll
  useEffect(() => {
    if (mode !== "scroll" || !hasMore) return;

    const currentSentinel = sentinelRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && !isLoading) {
          loadMoreItems();
        }
      },
      { threshold: 0.1 }
    );

    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
      observer.disconnect();
    };
  }, [mode, hasMore, isLoading, loadMoreItems]);

  const handleReset = () => {
    setItems([]);
    setPage(0);
    setHasMore(true);
    // Trigger initial load on clean slate
    setIsLoading(true);
    setTimeout(() => {
      const initialBatch = generateMockItems(0, ITEMS_PER_PAGE);
      setItems(initialBatch);
      setPage(1);
      setHasMore(true);
      setIsLoading(false);
    }, latency);
  };

  return (
    <div className="lazy-loading-showcase">
      <div className="showcase-header-glass">
        <h2>✨ Lazy Loading Demo Room</h2>
        <p className="subtitle">
          Experience clean, performance-optimized loading states. Observe both dynamic route chunks and content loading patterns.
        </p>

        <div className="controls-grid">
          <div className="control-group">
            <label>⚡ Network Speed Simulation</label>
            <select
              value={latency}
              onChange={(e) => setLatency(Number(e.target.value))}
              className="control-select"
            >
              <option value="0">Ultra-fast (0ms)</option>
              <option value="500">Fast 3G (500ms)</option>
              <option value="1200">Slow 3G (1.2s)</option>
              <option value="20000">Poor Connection (20s)</option>
            </select>
          </div>

          <div className="control-group">
            <label>🔄 Pagination Trigger</label>
            <div className="toggle-container">
              <button
                className={`toggle-btn ${mode === "scroll" ? "active" : ""}`}
                onClick={() => setMode("scroll")}
              >
                Infinite Scroll
              </button>
              <button
                className={`toggle-btn ${mode === "button" ? "active" : ""}`}
                onClick={() => setMode("button")}
              >
                "Load More" Button
              </button>
            </div>
          </div>

          <div className="control-group actions-group">
            <button className="reset-btn" onClick={handleReset}>
              Reset Demo
            </button>
          </div>
        </div>

        <div className="stats-strip">
          <span className="stat-pill">Loaded: <strong>{items.length}</strong> / {MAX_ITEMS} items</span>
          <span className="stat-pill">Trigger mode: <strong>{mode === "scroll" ? "Automatic On Scroll" : "Manual Click"}</strong></span>
          <span className="stat-pill status-pill">
            Status: <span className={`status-dot ${isLoading ? "loading" : "idle"}`}></span>
            {isLoading ? "Fetching Next Batch..." : hasMore ? "Ready for More" : "All Items Loaded"}
          </span>
        </div>
      </div>

      {/* Grid containing Lazy Loaded Cards */}
      <div className="lazy-items-grid">
        {items.map((item) => (
          <div key={item.id} className="lazy-item-card">
            <button 
              className={`wishlist-btn ${wishlistedIds.includes(item.id) ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                if (toggleWishlist && typeof toggleWishlist === 'function') {
                  toggleWishlist(item.id);
                }
              }}
              title={wishlistedIds.includes(item.id) ? "Remove from Wishlist" : "Add to Wishlist"}
              aria-label="Wishlist"
            >
              {wishlistedIds.includes(item.id) ? "❤️" : "🤍"}
            </button>
            <LazyImage
              src={item.imageUrl}
              placeholder={item.placeholderUrl}
              alt={item.title}
            />
            <div className="card-details">
              <span className="card-badge">{item.category}</span>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-description">{item.description}</p>
              <div className="card-footer">
                <span className="card-price">{item.price}</span>
                <button className="card-action-btn" onClick={() => {
                  setSelectedItem(item);
                  setIsAddedToCart(false);
                }}>
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Skeleton loaders shown when content is fetching */}
        {isLoading &&
          Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <div key={`skeleton-${i}`} className="lazy-item-card skeleton">
              <div className="skeleton-image-placeholder shimmer" />
              <div className="card-details">
                <div className="skeleton-line badge shimmer" />
                <div className="skeleton-line title shimmer" />
                <div className="skeleton-line desc shimmer" />
                <div className="skeleton-line desc-short shimmer" />
                <div className="card-footer">
                  <div className="skeleton-line price shimmer" />
                  <div className="skeleton-line button shimmer" />
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Manual Button Trigger Option */}
      {mode === "button" && hasMore && !isLoading && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={loadMoreItems}>
            Load Next {ITEMS_PER_PAGE} Items
          </button>
        </div>
      )}

      {/* Infinite Scroll observer target sentinel */}
      {mode === "scroll" && hasMore && <div ref={sentinelRef} className="scroll-sentinel" />}

      {!hasMore && (
        <div className="end-of-content">
          <div className="end-icon">🎉</div>
          <h3>You've Reached the End!</h3>
          <p>All {MAX_ITEMS} items have been lazy loaded successfully. Scroll up or reset the demo to try again.</p>
        </div>
      )}

      {selectedItem && (
        <div className="popup-overlay" onClick={closeModal}>
          <div className="popup-modal" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>{isAddedToCart ? "Item Added Successfully!" : "Add Item to Cart"}</h3>
              <button className="popup-close-x" onClick={closeModal}>✕</button>
            </div>
            <div className="popup-body">
              <div className="popup-product-info">
                <div className="popup-product-emoji">
                  {selectedItem.category === "Gadgets" ? "🔊" : 
                   selectedItem.category === "Workspace" ? "🖱️" : 
                   selectedItem.category === "Lifestyle" ? "🧘" : 
                   selectedItem.category === "Fashion" ? "🕶️" : "📦"}
                </div>
                <div>
                  <h4>{selectedItem.title}</h4>
                  <p className="popup-price">{selectedItem.price}</p>
                </div>
              </div>
              <p className="popup-desc">
                {isAddedToCart 
                  ? `Successfully added "${selectedItem.title}" to your shopping cart. You can continue browsing.` 
                  : `Are you sure you want to add "${selectedItem.title}" to your shopping cart?`}
              </p>

              {/* Success Button Delay Dropdown */}
              {!isAddedToCart && (
                <div className="popup-delay-group">
                  <label htmlFor="popup-delay-select">⏳ Success Button Delay:</label>
                  <select
                    id="popup-delay-select"
                    className="popup-delay-select"
                    value={modalDelay}
                    onChange={(e) => setModalDelay(Number(e.target.value))}
                    disabled={isModalAdding}
                  >
                    <option value="2">2 Seconds</option>
                    <option value="5">5 Seconds</option>
                    <option value="8">8 Seconds</option>
                    <option value="10">10 Seconds</option>
                    <option value="15">15 Seconds</option>
                    <option value="20">20 Seconds</option>
                    <option value="30">30 Seconds</option>
                    <option value="60">60 Seconds</option>
                  </select>
                </div>
              )}
            </div>
            <div className="popup-footer">
              {!isAddedToCart ? (
                <>
                  <button 
                    className="popup-btn cancel" 
                    onClick={closeModal}
                    disabled={isModalAdding}
                  >
                    Cancel
                  </button>
                  <button 
                    className="popup-btn confirm" 
                    disabled={isModalAdding}
                    onClick={() => {
                      setIsModalAdding(true);
                      if (addToCart && typeof addToCart === 'function') {
                        addToCart({
                          id: `lazy-${selectedItem.id}`,
                          name: selectedItem.title,
                          price: selectedItem.price,
                          icon: selectedItem.category === "Gadgets" ? "🔊" : 
                                selectedItem.category === "Workspace" ? "🖱️" : 
                                selectedItem.category === "Lifestyle" ? "🧘" : 
                                selectedItem.category === "Fashion" ? "🕶️" : "📦",
                          category: selectedItem.category
                        });
                      }
                      setTimeout(() => {
                        setIsAddedToCart(true);
                        setIsModalAdding(false);
                      }, modalDelay * 1000);
                    }}
                  >
                    {isModalAdding ? (
                      <>
                        <span className="spinner-indicator"></span> Adding...
                      </>
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </>
              ) : (
                <button className="popup-btn continue" onClick={closeModal}>
                  Continue
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyLoadingDemo;
