import React, { useState } from "react";
import "./IframeDemo.css";

const IframeDemo = () => {
  const [parentInput, setParentInput] = useState("");
  const [parentClicks, setParentClicks] = useState(0);

  // Dynamic iframe path selection to work on both local dev and GitHub Pages base paths
  const getIframeSrc = () => {
    const isGitHubPages = window.location.pathname.includes("/AutoHealDemoApp");
    const isLocalSubFolder = window.location.pathname.includes("/autohealDemoApp");
    
    if (isGitHubPages) {
      return "/AutoHealDemoApp/iframe-content";
    } else if (isLocalSubFolder) {
      return "/autohealDemoApp/iframe-content";
    }
    return "/iframe-content";
  };

  return (
    <div className="iframe-showcase-container">
      <div className="iframe-header-glass">
        <h2>🖼️ IFrame Showcase Room</h2>
        <p className="subtitle">
          Demonstrates elements nested inside a separate document context (IFrame). Automated testing frameworks (like AutoHeal or Selenium) must switch context into the IFrame to interact with the nested elements.
        </p>
      </div>

      <div className="iframe-demo-grid">
        {/* Parent Window context column */}
        <div className="demo-column parent-context">
          <h3>📂 Parent Window Context</h3>
          <p className="context-desc">
            These elements reside in the top-level main document window.
          </p>
          
          <div className="form-group">
            <label htmlFor="parent-text-input">Parent Text Input:</label>
            <input
              type="text"
              id="parent-text-input"
              className="demo-input"
              placeholder="Type something in parent window..."
              value={parentInput}
              onChange={(e) => setParentInput(e.target.value)}
            />
          </div>

          <div className="form-group">
            <button
              id="parent-action-btn"
              className="demo-btn"
              onClick={() => setParentClicks(c => c + 1)}
            >
              Click Parent Button
            </button>
          </div>

          <div className="parent-live-preview">
            <p>Parent Input Live: <strong>{parentInput || "(empty)"}</strong></p>
            <p>Parent Button Click Count: <strong className="counter">{parentClicks}</strong></p>
          </div>
        </div>

        {/* Embedded IFrame Context Column */}
        <div className="demo-column iframe-context">
          <h3>📦 Embedded IFrame Context</h3>
          <p className="context-desc">
            The box below is a separate document loaded inside an `&lt;iframe&gt;` tag.
          </p>

          <div className="iframe-wrapper">
            <iframe
              src={getIframeSrc()}
              title="Embedded Interaction Showcase"
              id="interaction-iframe"
              className="demo-iframe"
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IframeDemo;
