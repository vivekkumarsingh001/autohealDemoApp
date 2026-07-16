import React, { useState, useEffect } from "react";
import "./ButtonDemo.css";

const ButtonDemo = () => {
  // Click states
  const [standardClicks, setStandardClicks] = useState(0);
  const [doubleClicks, setDoubleClicks] = useState(0);
  const [rightClicks, setRightClicks] = useState(0);
  const [showRightClickMenu, setShowRightClickMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  // Hover states
  const [isHovered, setIsHovered] = useState(false);

  // Delayed trigger states
  const [isDelayedLoading, setIsDelayedLoading] = useState(false);
  const [delayedClicks, setDelayedClicks] = useState(0);

  // Form states
  const [formInput, setFormInput] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedText, setSubmittedText] = useState("");

  const handleRightClick = (e) => {
    e.preventDefault(); // Prevent standard browser context menu
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setShowRightClickMenu(true);
    setRightClicks(c => c + 1);
  };

  const handleDelayedClick = () => {
    if (isDelayedLoading) return;
    setIsDelayedLoading(true);

    // Simulate 3 seconds network/action latency
    setTimeout(() => {
      setDelayedClicks(c => c + 1);
      setIsDelayedLoading(false);
    }, 3000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmittedText(formInput);
    setFormSubmitted(true);
  };

  const handleFormReset = () => {
    setFormInput("");
    setFormSubmitted(false);
    setSubmittedText("");
  };

  // Close context menu on standard clicks anywhere
  useEffect(() => {
    const closeMenu = () => setShowRightClickMenu(false);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  return (
    <div className="button-showcase-container">
      <div className="button-header-glass">
        <h2>🖱️ Button Showcase Room</h2>
        <p className="subtitle">
          Demonstrates all types of button elements: standard click triggers, double-click validations, right-click context interceptors, hover reveals, and delayed action wait-states.
        </p>
      </div>

      <div className="button-demo-grid">
        {/* Buttons Controls Column */}
        <div className="demo-column buttons-column">
          <h3>📂 Interactive Button Fields</h3>
          <p className="context-desc">
            Trigger actions by clicking, double-clicking, or right-clicking the buttons below.
          </p>

          <div className="button-actions-list">
            {/* Standard Button */}
            <div className="button-row">
              <span className="button-meta">Standard Click:</span>
              <button
                id="btn-click"
                className="btn-showcase standard"
                onClick={() => setStandardClicks(c => c + 1)}
              >
                Click Me
              </button>
            </div>

            {/* Double Click Button */}
            <div className="button-row">
              <span className="button-meta">Double Click Action:</span>
              <button
                id="btn-double-click"
                className="btn-showcase double-click"
                onDoubleClick={() => setDoubleClicks(c => c + 1)}
                title="Double click to trigger"
              >
                Double Click Me
              </button>
            </div>

            {/* Right Click / Context Menu Button */}
            <div className="button-row">
              <span className="button-meta">Right Click (Context Menu):</span>
              <button
                id="btn-right-click"
                className="btn-showcase right-click"
                onContextMenu={handleRightClick}
                title="Right click to trigger custom context menu"
              >
                Right Click Me
              </button>
            </div>

            {/* Hover Action Button */}
            <div className="button-row">
              <span className="button-meta">Hover Over Reveal:</span>
              <button
                id="btn-hover"
                className={`btn-showcase hover-btn ${isHovered ? "active" : ""}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {isHovered ? "🔑 ALGO-SECRET-99" : "Hover to Show Code"}
              </button>
            </div>

            {/* Delayed Action Button */}
            <div className="button-row">
              <span className="button-meta">Delayed Wait Action (3s):</span>
              <button
                id="btn-delayed"
                className={`btn-showcase delayed-btn ${isDelayedLoading ? "loading" : ""}`}
                onClick={handleDelayedClick}
                disabled={isDelayedLoading}
              >
                {isDelayedLoading ? (
                  <>
                    <span className="spinner-indicator"></span> Loading Wait...
                  </>
                ) : (
                  "Trigger 3s Delay"
                )}
              </button>
            </div>

            {/* Disabled Button */}
            <div className="button-row">
              <span className="button-meta">Disabled Button (Locked):</span>
              <button
                id="btn-disabled"
                className="btn-showcase disabled-btn"
                disabled
              >
                Locked Button
              </button>
            </div>
          </div>

          {/* Simple Inline Form for Submit / Reset */}
          <div className="button-form-wrapper">
            <h4>Form Submit & Reset Testing</h4>
            <form onSubmit={handleFormSubmit} className="button-inline-form">
              <input
                type="text"
                id="form-text-btn-input"
                className="demo-input-btn"
                placeholder="Enter some text..."
                value={formInput}
                onChange={(e) => setFormInput(e.target.value)}
                required
              />
              <div className="form-btn-actions">
                <button
                  type="submit"
                  id="btn-submit"
                  className="btn-action-submit"
                >
                  Submit Form
                </button>
                <button
                  type="button"
                  id="btn-reset"
                  className="btn-action-reset"
                  onClick={handleFormReset}
                >
                  Reset Form
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Live Preview column */}
        <div className="demo-column preview-column">
          <h3>📂 Button Event Live Preview</h3>
          <p className="context-desc">
            Visual output reflecting your button interactions in real time.
          </p>

          <div className="preview-card-glass">
            <div className="preview-row">
              <span>Standard Click Count:</span>
              <strong className="counter">{standardClicks}</strong>
            </div>
            <div className="preview-row">
              <span>Double Click Count:</span>
              <strong className="counter">{doubleClicks}</strong>
            </div>
            <div className="preview-row">
              <span>Right Click Count:</span>
              <strong className="counter">{rightClicks}</strong>
            </div>
            <div className="preview-row">
              <span>Hover active status:</span>
              <strong>{isHovered ? "YES (REVEALED)" : "NO (HIDDEN)"}</strong>
            </div>
            <div className="preview-row">
              <span>Delayed Action Count:</span>
              <strong className="counter">{delayedClicks}</strong>
            </div>
            <div className="preview-row">
              <span>Delayed Action State:</span>
              <span className={`status-pill-btn ${isDelayedLoading ? "waiting" : "idle"}`}>
                {isDelayedLoading ? "Simulating Latency..." : "Standing By"}
              </span>
            </div>
            <div className="preview-row desc-row">
              <span>Inline Form Submission:</span>
              <p className="preview-form-text">
                {formSubmitted ? `Submitted: "${submittedText}"` : "Form not submitted yet"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Right-Click Context Menu Overlay */}
      {showRightClickMenu && (
        <div
          className="custom-context-menu"
          style={{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }}
        >
          <div className="menu-header">⚡ Context Menu Triggered</div>
          <ul className="menu-options">
            <li onClick={() => alert("Context Action 1 triggered!")}>Option 1</li>
            <li onClick={() => alert("Context Action 2 triggered!")}>Option 2</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ButtonDemo;
