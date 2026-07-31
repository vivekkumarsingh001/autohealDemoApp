import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TablesDemo.css";

const TablesDemo = () => {
  const [activeTab, setActiveTab] = useState("threeColumn");
  const [selectedRows, setSelectedRows] = useState({});

  // Sample data for 3-column table
  const [threeColumnData, setThreeColumnData] = useState([
    { id: 1, name: "Product A", price: "$29.99", stock: "In Stock" },
    { id: 2, name: "Product B", price: "$49.99", stock: "Low Stock" },
    { id: 3, name: "Product C", price: "$19.99", stock: "Out of Stock" },
    { id: 4, name: "Product D", price: "$99.99", stock: "In Stock" },
    { id: 5, name: "Product E", price: "$59.99", stock: "In Stock" },
  ]);

  // Sample data for 4-column table
  const [fourColumnData, setFourColumnData] = useState([
    { id: 1, name: "User A", email: "userA@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "User B", email: "userB@example.com", role: "Editor", status: "Active" },
    { id: 3, name: "User C", email: "userC@example.com", role: "Viewer", status: "Inactive" },
    { id: 4, name: "User D", email: "userD@example.com", role: "Admin", status: "Active" },
    { id: 5, name: "User E", email: "userE@example.com", role: "Editor", status: "Pending" },
  ]);

  // Sample data for 5-column table
  const [fiveColumnData, setFiveColumnData] = useState([
    { id: 1, product: "Laptop", category: "Electronics", price: "$999", stock: "15", rating: "4.5" },
    { id: 2, product: "Mouse", category: "Accessories", price: "$29", stock: "50", rating: "4.2" },
    { id: 3, product: "Keyboard", category: "Accessories", price: "$79", stock: "30", rating: "4.7" },
    { id: 4, product: "Monitor", category: "Electronics", price: "$299", stock: "10", rating: "4.8" },
    { id: 5, product: "Headphones", category: "Audio", price: "$149", stock: "25", rating: "4.4" },
  ]);

  const [searchInput, setSearchInput] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Search popup states
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [searchFound, setSearchFound] = useState(false);
  const [searchedName, setSearchedName] = useState("");

  const handleSearchSubmit = () => {
    const term = searchInput.toLowerCase().trim();
    let found = false;

    if (activeTab === "threeColumn") {
      found = threeColumnData.some(item => 
        item.name.toLowerCase().includes(term)
      );
    } else if (activeTab === "fourColumn") {
      found = fourColumnData.some(item => 
        item.name.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term)
      );
    } else if (activeTab === "fiveColumn") {
      found = fiveColumnData.some(item => 
        item.product.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
      );
    }

    setSearchedName(searchInput);
    setSearchFound(found);
    setShowSearchPopup(true);
  };

  const handleSelectRow = (tableId, rowId) => {
    setSelectedRows(prev => ({
      ...prev,
      [`${tableId}_${rowId}`]: !prev[`${tableId}_${rowId}`]
    }));
  };

  const handleSelectAll = (tableId, data) => {
    const allSelected = data.every(row => selectedRows[`${tableId}_${row.id}`]);
    const newSelected = {};
    data.forEach(row => {
      newSelected[`${tableId}_${row.id}`] = !allSelected;
    });
    setSelectedRows(prev => ({ ...prev, ...newSelected }));
  };

  const handleDeleteSelected = (tableId, data, setData) => {
    const rowsToDelete = data.filter(row => selectedRows[`${tableId}_${row.id}`]);
    if (rowsToDelete.length === 0) {
      alert("Please select at least one row to delete");
      return;
    }
    
    if (window.confirm(`Are you sure you want to delete ${rowsToDelete.length} row(s)?`)) {
      const newData = data.filter(row => !selectedRows[`${tableId}_${row.id}`]);
      setData(newData);
      
      // Clear selected rows for deleted items
      const newSelectedRows = { ...selectedRows };
      rowsToDelete.forEach(row => {
        delete newSelectedRows[`${tableId}_${row.id}`];
      });
      setSelectedRows(newSelectedRows);
    }
  };

  const handleDeleteRow = (tableId, rowId, data, setData) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      const newData = data.filter(row => row.id !== rowId);
      setData(newData);
      
      // Clear selected row for deleted item
      const newSelectedRows = { ...selectedRows };
      delete newSelectedRows[`${tableId}_${rowId}`];
      setSelectedRows(newSelectedRows);
    }
  };

  const getSelectedCount = (tableId, data) => {
    return data.filter(row => selectedRows[`${tableId}_${row.id}`]).length;
  };

  const isAllSelected = (tableId, data) => {
    return data.length > 0 && data.every(row => selectedRows[`${tableId}_${row.id}`]);
  };

  // Filter functions
  const getFilteredThreeColumnData = () => {
    let filtered = threeColumnData;
    if (appliedSearchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(appliedSearchTerm.toLowerCase())
      );
    }
    if (filterStatus) {
      filtered = filtered.filter(item => item.stock === filterStatus);
    }
    return filtered;
  };

  const getFilteredFourColumnData = () => {
    let filtered = fourColumnData;
    if (appliedSearchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(appliedSearchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(appliedSearchTerm.toLowerCase())
      );
    }
    if (filterStatus) {
      filtered = filtered.filter(item => item.role === filterStatus);
    }
    return filtered;
  };

  const getFilteredFiveColumnData = () => {
    let filtered = fiveColumnData;
    if (appliedSearchTerm) {
      filtered = filtered.filter(item => 
        item.product.toLowerCase().includes(appliedSearchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(appliedSearchTerm.toLowerCase())
      );
    }
    return filtered;
  };

  return (
    <div className="tables-demo-container">
      <div className="tables-demo-wrapper">
        {/* Sidebar */}
        <div className="tables-sidebar">
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

          <div className="sidebar-section info-box">
            <h3>TABLE FEATURES</h3>
            <ul>
              <li>✓ Checkbox Selection</li>
              <li>✓ Select All Functionality</li>
              <li>✓ Delete Single Row</li>
              <li>✓ Delete Multiple Rows</li>
              <li>✓ Search & Filter</li>
              <li>✓ Responsive Design</li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="tables-content">
          <div className="tables-header">
            <h2>Table Demos with Checkbox & Delete</h2>
            <p>Select rows using checkboxes and delete single or multiple rows</p>
          </div>

          {/* Tab Navigation */}
          <div className="tabs-navigation">
            <button 
              className={`tab-btn ${activeTab === "threeColumn" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("threeColumn");
                setSearchInput("");
                setAppliedSearchTerm("");
                setFilterStatus("");
              }}
            >
              📊 3 Columns
            </button>
            <button 
              className={`tab-btn ${activeTab === "fourColumn" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("fourColumn");
                setSearchInput("");
                setAppliedSearchTerm("");
                setFilterStatus("");
              }}
            >
              📈 4 Columns
            </button>
            <button 
              className={`tab-btn ${activeTab === "fiveColumn" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("fiveColumn");
                setSearchInput("");
                setAppliedSearchTerm("");
                setFilterStatus("");
              }}
            >
              📉 5 Columns
            </button>
            <button 
              className={`tab-btn ${activeTab === "emptyTable" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("emptyTable");
                setSearchInput("");
                setAppliedSearchTerm("");
                setFilterStatus("");
              }}
            >
              🔲 Empty Table
            </button>
          </div>

          {/* 3-Column Table */}
          {activeTab === "threeColumn" && (
            <div className="table-container">
              <div className="table-header-actions">
                <h3>3-Column Table - Product Inventory</h3>
                <div className="batch-actions">
                  <span className="selected-count">
                    {getSelectedCount("three", getFilteredThreeColumnData())} row(s) selected
                  </span>
                  <button 
                    className="delete-selected-btn"
                    onClick={() => handleDeleteSelected("three", getFilteredThreeColumnData(), setThreeColumnData)}
                  >
                    🗑️ Delete Selected
                  </button>
                </div>
              </div>
              <div className="table-controls">
                <div className="search-controls-wrapper">
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="table-search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearchSubmit();
                      }
                    }}
                  />
                  <button className="table-search-btn" onClick={handleSearchSubmit}>
                    Search
                  </button>
                </div>
                <select 
                  className="table-filter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">All Stock</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th className="checkbox-col">
                        <input
                          type="checkbox"
                          checked={isAllSelected("three", getFilteredThreeColumnData())}
                          onChange={() => handleSelectAll("three", getFilteredThreeColumnData())}
                        />
                      </th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Stock Status</th>
                      <th className="action-col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredThreeColumnData().map(item => (
                      <tr key={item.id} className={selectedRows[`three_${item.id}`] ? "selected" : ""}>
                        <td className="checkbox-col">
                          <input
                            type="checkbox"
                            checked={selectedRows[`three_${item.id}`] || false}
                            onChange={() => handleSelectRow("three", item.id)}
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>
                          <span className={`status-badge ${item.stock.toLowerCase().replace(' ', '-')}`}>
                            {item.stock}
                          </span>
                        </td>
                        <td className="action-col">
                          <button 
                            className="delete-row-btn"
                            onClick={() => handleDeleteRow("three", item.id, threeColumnData, setThreeColumnData)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4-Column Table */}
          {activeTab === "fourColumn" && (
            <div className="table-container">
              <div className="table-header-actions">
                <h3>4-Column Table - User Management</h3>
                <div className="batch-actions">
                  <span className="selected-count">
                    {getSelectedCount("four", getFilteredFourColumnData())} row(s) selected
                  </span>
                  <button 
                    className="delete-selected-btn"
                    onClick={() => handleDeleteSelected("four", getFilteredFourColumnData(), setFourColumnData)}
                  >
                    🗑️ Delete Selected
                  </button>
                </div>
              </div>
              <div className="table-controls">
                <div className="search-controls-wrapper">
                  <input 
                    type="text" 
                    placeholder="Search users..." 
                    className="table-search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearchSubmit();
                      }
                    }}
                  />
                  <button className="table-search-btn" onClick={handleSearchSubmit}>
                    Search
                  </button>
                </div>
                <select 
                  className="table-filter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">All Roles</option>
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th className="checkbox-col">
                        <input
                          type="checkbox"
                          checked={isAllSelected("four", getFilteredFourColumnData())}
                          onChange={() => handleSelectAll("four", getFilteredFourColumnData())}
                        />
                      </th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th className="action-col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredFourColumnData().map(user => (
                      <tr key={user.id} className={selectedRows[`four_${user.id}`] ? "selected" : ""}>
                        <td className="checkbox-col">
                          <input
                            type="checkbox"
                            checked={selectedRows[`four_${user.id}`] || false}
                            onChange={() => handleSelectRow("four", user.id)}
                          />
                        </td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <span className={`status-badge ${user.status.toLowerCase()}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="action-col">
                          <button 
                            className="delete-row-btn"
                            onClick={() => handleDeleteRow("four", user.id, fourColumnData, setFourColumnData)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5-Column Table */}
          {activeTab === "fiveColumn" && (
            <div className="table-container">
              <div className="table-header-actions">
                <h3>5-Column Table - Product Catalog</h3>
                <div className="batch-actions">
                  <span className="selected-count">
                    {getSelectedCount("five", getFilteredFiveColumnData())} row(s) selected
                  </span>
                  <button 
                    className="delete-selected-btn"
                    onClick={() => handleDeleteSelected("five", getFilteredFiveColumnData(), setFiveColumnData)}
                  >
                    🗑️ Delete Selected
                  </button>
                </div>
              </div>
              <div className="table-controls">
                <div className="search-controls-wrapper">
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="table-search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearchSubmit();
                      }
                    }}
                  />
                  <button className="table-search-btn" onClick={handleSearchSubmit}>
                    Search
                  </button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th className="checkbox-col">
                        <input
                          type="checkbox"
                          checked={isAllSelected("five", getFilteredFiveColumnData())}
                          onChange={() => handleSelectAll("five", getFilteredFiveColumnData())}
                        />
                      </th>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Rating</th>
                      <th className="action-col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredFiveColumnData().map(product => (
                      <tr key={product.id} className={selectedRows[`five_${product.id}`] ? "selected" : ""}>
                        <td className="checkbox-col">
                          <input
                            type="checkbox"
                            checked={selectedRows[`five_${product.id}`] || false}
                            onChange={() => handleSelectRow("five", product.id)}
                          />
                        </td>
                        <td>{product.product}</td>
                        <td>{product.category}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                        <td>⭐ {product.rating}</td>
                        <td className="action-col">
                          <button 
                            className="delete-row-btn"
                            onClick={() => handleDeleteRow("five", product.id, fiveColumnData, setFiveColumnData)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Empty Table */}
          {activeTab === "emptyTable" && (
            <div className="table-container">
              <h3>Empty Table - No Data Available</h3>
              <p className="empty-table-message">This table demonstrates how an empty table looks</p>
              <div className="table-responsive">
                <table className="data-table empty-table">
                  <thead>
                    <tr>
                      <th className="checkbox-col">
                        <input type="checkbox" disabled />
                      </th>
                      <th>Column 1</th>
                      <th>Column 2</th>
                      <th>Column 3</th>
                      <th>Column 4</th>
                      <th className="action-col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="6" className="empty-state">
                        <div className="empty-state-content">
                          <span className="empty-icon">📭</span>
                          <p>No data available</p>
                          <button className="add-data-btn">+ Add Data</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Features Section */}
          <div className="features-section">
            <h3>Table Features Demonstrated:</h3>
            <div className="features-grid">
              <div className="feature-card">
                <span className="feature-icon">☑️</span>
                <h4>Checkbox Selection</h4>
                <p>Select individual rows or all rows at once</p>
              </div>
              <div className="feature-card">
                <span className="feature-icon">🗑️</span>
                <h4>Delete Functionality</h4>
                <p>Delete single rows or multiple selected rows</p>
              </div>
              <div className="feature-card">
                <span className="feature-icon">🔍</span>
                <h4>Search & Filter</h4>
                <p>Real-time search and filter capabilities</p>
              </div>
              <div className="feature-card">
                <span className="feature-icon">📱</span>
                <h4>Responsive Design</h4>
                <p>Tables that work on all screen sizes</p>
              </div>
              <div className="feature-card">
                <span className="feature-icon">🎨</span>
                <h4>Visual Feedback</h4>
                <p>Selected rows highlight and status badges</p>
              </div>
              <div className="feature-card">
                <span className="feature-icon">✅</span>
                <h4>Confirmation Dialogs</h4>
                <p>Safe delete with user confirmation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Result Popup Overlay */}
      {showSearchPopup && (
        <div className="search-popup-overlay">
          <div className={`search-popup-card ${searchFound ? "found" : "not-found"}`}>
            <span className="search-popup-icon">
              {searchFound ? "🎉" : "🔍"}
            </span>
            <h3>{searchFound ? "Product Found" : "Product Not Found"}</h3>
            <p className="search-popup-message">
              {searchFound 
                ? `We found matching results for "${searchedName}" in the table!`
                : `Sorry, we couldn't find any results matching "${searchedName}".`}
            </p>
            <button 
              className="search-popup-ok-btn"
              onClick={() => {
                setAppliedSearchTerm(searchInput);
                setShowSearchPopup(false);
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TablesDemo;