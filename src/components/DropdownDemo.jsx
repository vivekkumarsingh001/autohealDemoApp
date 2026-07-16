import React, { useState } from "react";
import "./DropdownDemo.css";

const DropdownDemo = () => {
  // Select states
  const [standardVal, setStandardVal] = useState("");
  const [groupedVal, setGroupedVal] = useState("");
  const [multiVal, setMultiVal] = useState([]);
  const [disabledVal, setDisabledVal] = useState("locked-val");
  
  // Dependent states
  const [countryVal, setCountryVal] = useState("");
  const [stateVal, setStateVal] = useState("");

  // Searchable states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSearchVal, setSelectedSearchVal] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const countriesData = {
    usa: ["California", "New York", "Texas"],
    canada: ["Ontario", "Quebec", "British Columbia"],
    india: ["Delhi", "Maharashtra", "Karnataka"]
  };

  const comboboxOptions = [
    "Apple iPhone",
    "Samsung Galaxy",
    "Google Pixel",
    "OnePlus Nord",
    "Sony Xperia",
    "Xiaomi Redmi",
    "Huawei Mate",
    "Motorola Edge"
  ];

  const filteredCombobox = comboboxOptions.filter(opt =>
    opt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMultiChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setMultiVal(selectedOptions);
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setCountryVal(selectedCountry);
    setStateVal(""); // Reset child dropdown selection
  };

  return (
    <div className="dropdown-showcase-container">
      <div className="dropdown-header-glass">
        <h2>📂 Dropdown Showcase Room</h2>
        <p className="subtitle">
          Demonstrates different selection controls: basic selects, grouped option categories, multi-select listboxes, searchable custom dropdowns, and dependent dropdown arrays.
        </p>
      </div>

      <div className="dropdown-demo-grid">
        {/* Dropdowns Forms Column */}
        <div className="demo-column dropdowns-column">
          <h3>📂 Selection Form Fields</h3>
          <p className="context-desc">
            Interact with the selectors below to test selection states.
          </p>

          <form className="dropdown-form" onSubmit={(e) => e.preventDefault()}>
            {/* Standard Dropdown */}
            <div className="form-group">
              <label htmlFor="select-standard">Standard Dropdown Select</label>
              <select
                id="select-standard"
                className="demo-select"
                value={standardVal}
                onChange={(e) => setStandardVal(e.target.value)}
              >
                <option value="">-- Choose Category --</option>
                <option value="electronics">Electronics</option>
                <option value="books">Books & Novels</option>
                <option value="furniture">Home Furniture</option>
                <option value="clothing">Apparel & Shoes</option>
              </select>
            </div>

            {/* Grouped Options Dropdown */}
            <div className="form-group">
              <label htmlFor="select-grouped">Grouped Category Dropdown</label>
              <select
                id="select-grouped"
                className="demo-select"
                value={groupedVal}
                onChange={(e) => setGroupedVal(e.target.value)}
              >
                <option value="">-- Choose Course --</option>
                <optgroup label="Programming Languages">
                  <option value="js">JavaScript Masterclass</option>
                  <option value="python">Python for Data Science</option>
                  <option value="java">Java Boot Camp</option>
                </optgroup>
                <optgroup label="Design & Creative">
                  <option value="figma">UI/UX Figma Design</option>
                  <option value="photoshop">Adobe Photoshop Essentials</option>
                </optgroup>
              </select>
            </div>

            {/* Multi-Select Dropdown */}
            <div className="form-group">
              <label htmlFor="select-multiple">Multi-Select Listbox (Hold Ctrl to select multiple)</label>
              <select
                id="select-multiple"
                className="demo-select-multi"
                multiple
                value={multiVal}
                onChange={handleMultiChange}
              >
                <option value="html">HTML5 Basics</option>
                <option value="css">CSS3 Layouts</option>
                <option value="react">React Framework</option>
                <option value="node">Node.js Backend</option>
                <option value="sql">SQL Database</option>
              </select>
            </div>

            {/* Custom Searchable Dropdown / Combobox */}
            <div className="form-group custom-combobox-wrapper">
              <label htmlFor="select-searchable-input">Searchable Combobox Dropdown</label>
              <input
                type="text"
                id="select-searchable-input"
                className="demo-select-input"
                placeholder="Type to filter phone products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
              />
              
              {isSearchOpen && (
                <ul className="combobox-results-list">
                  {filteredCombobox.length > 0 ? (
                    filteredCombobox.map((opt, i) => (
                      <li
                        key={i}
                        className={`combobox-option-item ${selectedSearchVal === opt ? "selected" : ""}`}
                        onClick={() => {
                          setSelectedSearchVal(opt);
                          setSearchQuery(opt);
                          setIsSearchOpen(false);
                        }}
                      >
                        {opt}
                      </li>
                    ))
                  ) : (
                    <li className="combobox-no-results">No options matched search</li>
                  )}
                </ul>
              )}
              {selectedSearchVal && (
                <button
                  type="button"
                  className="combobox-clear-btn"
                  onClick={() => {
                    setSelectedSearchVal("");
                    setSearchQuery("");
                  }}
                >
                  ✕ Clear Selection
                </button>
              )}
            </div>

            {/* Dependent Parent Dropdown */}
            <div className="form-group">
              <label htmlFor="select-country">Dependent Step 1: Country</label>
              <select
                id="select-country"
                className="demo-select"
                value={countryVal}
                onChange={handleCountryChange}
              >
                <option value="">-- Choose Country --</option>
                <option value="usa">United States (USA)</option>
                <option value="canada">Canada</option>
                <option value="india">India</option>
              </select>
            </div>

            {/* Dependent Child Dropdown */}
            <div className="form-group">
              <label htmlFor="select-state">Dependent Step 2: State / Region</label>
              <select
                id="select-state"
                className="demo-select"
                value={stateVal}
                onChange={(e) => setStateVal(e.target.value)}
                disabled={!countryVal}
              >
                <option value="">
                  {!countryVal ? "-- Choose Country First --" : "-- Choose State --"}
                </option>
                {countryVal &&
                  countriesData[countryVal].map((state, i) => (
                    <option key={i} value={state.toLowerCase().replace(/ /g, "-")}>
                      {state}
                    </option>
                  ))}
              </select>
            </div>

            {/* Disabled Dropdown */}
            <div className="form-group">
              <label htmlFor="select-disabled">Disabled Dropdown Select (Locked)</label>
              <select
                id="select-disabled"
                className="demo-select disabled-select"
                value={disabledVal}
                disabled
                onChange={(e) => setDisabledVal(e.target.value)}
              >
                <option value="locked-val">Pre-selected Locked Category</option>
                <option value="other">Other Category</option>
              </select>
            </div>

          </form>
        </div>

        {/* Live Preview column */}
        <div className="demo-column preview-column">
          <h3>📂 Selection Output Live Preview</h3>
          <p className="context-desc">
            Visual output reflecting your dropdown selections in real time.
          </p>

          <div className="preview-card-glass">
            <div className="preview-row">
              <span>Standard Option:</span>
              <strong>{standardVal ? standardVal.toUpperCase() : "(none)"}</strong>
            </div>
            <div className="preview-row">
              <span>Grouped Option:</span>
              <strong>{groupedVal ? groupedVal.toUpperCase() : "(none)"}</strong>
            </div>
            <div className="preview-row desc-row">
              <span>Multi-Select Options ({multiVal.length} selected):</span>
              <div className="badges-list">
                {multiVal.length > 0 ? (
                  multiVal.map((val, i) => (
                    <span key={i} className="preview-badge">{val.toUpperCase()}</span>
                  ))
                ) : (
                  <strong style={{ alignSelf: 'flex-end' }}>(none)</strong>
                )}
              </div>
            </div>
            <div className="preview-row">
              <span>Searchable Selection:</span>
              <strong>{selectedSearchVal || "(none)"}</strong>
            </div>
            <div className="preview-row">
              <span>Country Selected:</span>
              <strong>{countryVal ? countryVal.toUpperCase() : "(none)"}</strong>
            </div>
            <div className="preview-row">
              <span>State Selected:</span>
              <strong>{stateVal ? stateVal.toUpperCase() : "(none)"}</strong>
            </div>
            <div className="preview-row">
              <span>Disabled Select value:</span>
              <strong>{disabledVal.toUpperCase()}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownDemo;
