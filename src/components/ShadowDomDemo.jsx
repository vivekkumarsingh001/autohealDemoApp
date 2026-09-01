import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./ShadowDomDemo.css";

const ShadowDomDemo = () => {
  // Light DOM state
  const [lightInput, setLightInput] = useState("");
  const [lightClicks, setLightClicks] = useState(0);

  // Shadow DOM state
  const [shadowInput, setShadowInput] = useState("");
  const [shadowClicks, setShadowClicks] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Ref to attach shadow root to
  const shadowHostRef = useRef(null);
  const [shadowRoot, setShadowRoot] = useState(null);

  useEffect(() => {
    if (shadowHostRef.current && !shadowRoot) {
      // Check if a shadow root is already attached to avoid browser errors (e.g. under React StrictMode)
      let root = shadowHostRef.current.shadowRoot;
      if (!root) {
        root = shadowHostRef.current.attachShadow({ mode: "open" });
      }
      setShadowRoot(root);
    }
  }, [shadowRoot]);

  const handleShadowSubmit = (e) => {
    e.preventDefault();
    setSubmittedData({
      text: shadowInput,
      subscribed: isSubscribed ? "Yes" : "No"
    });
    setShadowClicks(c => c + 1);
  };

  const handleShadowReset = () => {
    setShadowInput("");
    setIsSubscribed(false);
    setSubmittedData(null);
  };

  return (
    <div className="shadow-showcase-container">
      <div className="shadow-header-glass">
        <h2>👥 Shadow DOM Showcase Room</h2>
        <p className="subtitle">
          Demonstrates encapsulation using Shadow DOM. Automated testing frameworks (like AutoHeal or Selenium) must query the Shadow Root of the host element to access and interact with the elements inside the shadow tree.
        </p>
      </div>

      <div className="shadow-demo-grid">
        {/* Light DOM Context Column */}
        <div className="demo-column light-context">
          <h3>📂 Standard DOM Context (Light DOM)</h3>
          <p className="context-desc">
            These elements reside in the normal document body. Standard XPaths can easily locate them.
          </p>

          <div className="form-group">
            <label htmlFor="light-text-input">Light DOM Text Input:</label>
            <input
              type="text"
              id="light-text-input"
              className="demo-input"
              placeholder="Type in light DOM..."
              value={lightInput}
              onChange={(e) => setLightInput(e.target.value)}
            />
          </div>

          <div className="form-group">
            <button
              id="light-action-btn"
              className="demo-btn"
              onClick={() => setLightClicks(c => c + 1)}
            >
              Click Light DOM Button
            </button>
          </div>

          <div className="light-live-preview">
            <p>Input Live: <strong>{lightInput || "(empty)"}</strong></p>
            <p>Button Clicks: <strong className="counter">{lightClicks}</strong></p>
          </div>
        </div>

        {/* Shadow DOM Context Column */}
        <div className="demo-column shadow-context">
          <h3>👥 Encapsulated Context (Shadow DOM)</h3>
          <p className="context-desc">
            The container below is a shadow tree attached to a shadow host. Standard DOM queries cannot find these elements directly.
          </p>

          {/* Shadow Host element */}
          <div id="shadow-host" ref={shadowHostRef}></div>

          {/* Render the inner elements into the shadow root via React Portal */}
          {shadowRoot && createPortal(
            <div className="shadow-wrapper">
              {/* Style block inside the Shadow Root is required since global styles do not penetrate */}
              <style>{`
                .shadow-wrapper {
                  font-family: system-ui, 'Segoe UI', Roboto, sans-serif;
                  background: rgba(170, 59, 255, 0.04);
                  border: 2px dashed #aa3bff;
                  border-radius: 12px;
                  padding: 1.5rem;
                  box-sizing: border-box;
                  display: flex;
                  flex-direction: column;
                  gap: 1rem;
                  color: #6b6375;
                }

                @media (prefers-color-scheme: dark) {
                  .shadow-wrapper {
                    background: rgba(192, 132, 252, 0.05);
                    border-color: #c084fc;
                    color: #9ca3af;
                  }
                }

                .shadow-title {
                  font-size: 1rem;
                  font-weight: 700;
                  color: #aa3bff;
                  margin: 0 0 0.25rem 0;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                }

                @media (prefers-color-scheme: dark) {
                  .shadow-title {
                    color: #c084fc;
                  }
                }

                .badge-shadow {
                  font-size: 0.7rem;
                  font-weight: 700;
                  background: rgba(170, 59, 255, 0.15);
                  padding: 0.15rem 0.5rem;
                  border-radius: 4px;
                }

                .shadow-form {
                  display: flex;
                  flex-direction: column;
                  gap: 0.85rem;
                }

                .shadow-form-group {
                  display: flex;
                  flex-direction: column;
                  gap: 0.4rem;
                }

                .shadow-form-group label {
                  font-size: 0.8rem;
                  font-weight: 600;
                  color: #333;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                }

                @media (prefers-color-scheme: dark) {
                  .shadow-form-group label {
                    color: #f3f4f6;
                  }
                }

                .shadow-input-el {
                  padding: 0.65rem 0.85rem;
                  border-radius: 6px;
                  border: 1px solid #e5e4e7;
                  background: #f4f3ec;
                  color: #08060d;
                  font-size: 0.9rem;
                  outline: none;
                  transition: all 0.25s ease;
                }

                @media (prefers-color-scheme: dark) {
                  .shadow-input-el {
                    border-color: #2e303a;
                    background: #1f2028;
                    color: #f3f4f6;
                  }
                }

                .shadow-input-el:focus {
                  border-color: #aa3bff;
                  background: #ffffff;
                  box-shadow: 0 0 0 3px rgba(170, 59, 255, 0.15);
                }

                @media (prefers-color-scheme: dark) {
                  .shadow-input-el:focus {
                    border-color: #c084fc;
                    background: #16171d;
                    box-shadow: 0 0 0 3px rgba(192, 132, 252, 0.2);
                  }
                }

                .shadow-checkbox-group {
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                }

                .shadow-checkbox-el {
                  width: 16px;
                  height: 16px;
                  cursor: pointer;
                  accent-color: #aa3bff;
                }

                @media (prefers-color-scheme: dark) {
                  .shadow-checkbox-el {
                    accent-color: #c084fc;
                  }
                }

                .shadow-checkbox-group label {
                  font-size: 0.85rem;
                  cursor: pointer;
                  user-select: none;
                }

                .shadow-btn-submit {
                  padding: 0.65rem 1.25rem;
                  border-radius: 6px;
                  border: none;
                  background: #aa3bff;
                  color: #fff;
                  font-size: 0.9rem;
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.2s ease;
                  width: 100%;
                  text-align: center;
                  box-shadow: 0 4px 12px rgba(170, 59, 255, 0.15);
                }

                .shadow-btn-submit:hover {
                  background: #9b28ff;
                  transform: translateY(-1px);
                }

                .shadow-success-display {
                  background: #f4f3ec;
                  border: 1px solid #e5e4e7;
                  border-radius: 8px;
                  padding: 0.75rem;
                  font-size: 0.8rem;
                  display: flex;
                  flex-direction: column;
                  gap: 0.3rem;
                }

                @media (prefers-color-scheme: dark) {
                  .shadow-success-display {
                    background: #1f2028;
                    border-color: #2e303a;
                  }
                }

                .shadow-success-display p {
                  margin: 0;
                }

                .shadow-success-display strong {
                  color: #aa3bff;
                }

                @media (prefers-color-scheme: dark) {
                  .shadow-success-display strong {
                    color: #c084fc;
                  }
                }

                .shadow-btn-reset {
                  padding: 0.5rem 1rem;
                  border-radius: 6px;
                  border: 1px solid #e5e4e7;
                  background: #ffffff;
                  color: #08060d;
                  font-size: 0.8rem;
                  font-weight: 600;
                  cursor: pointer;
                  margin-top: 0.5rem;
                  transition: all 0.2s ease;
                }

                @media (prefers-color-scheme: dark) {
                  .shadow-btn-reset {
                    border-color: #2e303a;
                    background: #1f2028;
                    color: #f3f4f6;
                  }
                }

                .shadow-btn-reset:hover {
                  background: #f4f3ec;
                }

                @media (prefers-color-scheme: dark) {
                  .shadow-btn-reset:hover {
                    background: #2e303a;
                  }
                }

                .shadow-metrics {
                  border-top: 1px solid #e5e4e7;
                  padding-top: 0.5rem;
                  font-size: 0.75rem;
                  color: #6b6375;
                }

                @media (prefers-color-scheme: dark) {
                  .shadow-metrics {
                    border-color: #2e303a;
                    color: #9ca3af;
                  }
                }

                .shadow-metrics strong {
                  color: #aa3bff;
                }

                @media (prefers-color-scheme: dark) {
                  .shadow-metrics strong {
                    color: #c084fc;
                  }
                }
              `}</style>

              <div className="shadow-title">
                <span>🛡️ Shadow DOM Sandbox</span>
                <span className="badge-shadow">Open Mode</span>
              </div>

              {!submittedData ? (
                <form onSubmit={handleShadowSubmit} className="shadow-form">
                  <div className="shadow-form-group">
                    <label htmlFor="shadow-text-input">Shadow DOM Input:</label>
                    <input
                      type="text"
                      id="shadow-text-input"
                      className="shadow-input-el"
                      placeholder="Type inside shadow root..."
                      value={shadowInput}
                      onChange={(e) => setShadowInput(e.target.value)}
                      required
                    />
                  </div>

                  <div className="shadow-checkbox-group">
                    <input
                      type="checkbox"
                      id="shadow-checkbox"
                      className="shadow-checkbox-el"
                      checked={isSubscribed}
                      onChange={(e) => setIsSubscribed(e.target.checked)}
                    />
                    <label htmlFor="shadow-checkbox">Confirm shadow subscription</label>
                  </div>

                  <button
                    type="submit"
                    id="shadow-action-btn"
                    className="shadow-btn-submit"
                  >
                    Submit Shadow Form
                  </button>
                </form>
              ) : (
                <div className="shadow-form-group">
                  <div className="shadow-success-display">
                    <p>Submitted text: <strong>{submittedData.text}</strong></p>
                    <p>Subscribed status: <strong>{submittedData.subscribed}</strong></p>
                  </div>
                  <button
                    id="shadow-reset-btn"
                    className="shadow-btn-reset"
                    onClick={handleShadowReset}
                  >
                    Reset Form
                  </button>
                </div>
              )}

              <div className="shadow-metrics">
                <span>Submissions: <strong>{shadowClicks}</strong></span>
              </div>
            </div>,
            shadowRoot
          )}
        </div>
      </div>
    </div>
  );
};

export default ShadowDomDemo;
