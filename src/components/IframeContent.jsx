import React, { useState } from "react";
import "./IframeContent.css";

const IframeContent = () => {
  const [iframeInput, setIframeInput] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [topic, setTopic] = useState("general");
  const [iframeClicks, setIframeClicks] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData({
      text: iframeInput,
      subscribed: isSubscribed ? "Yes" : "No",
      topic: topic.toUpperCase()
    });
    setIframeClicks(c => c + 1);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIframeInput("");
    setIsSubscribed(false);
    setTopic("general");
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  return (
    <div className="iframe-content-body">
      <div className="iframe-content-header">
        <h4>🔒 Sandbox Document</h4>
        <span className="badge-iframe">Inside IFrame</span>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="iframe-form">
          <div className="iframe-form-group">
            <label htmlFor="iframe-text-input">IFrame Text input:</label>
            <input
              type="text"
              id="iframe-text-input"
              className="iframe-input"
              placeholder="Enter text inside frame..."
              value={iframeInput}
              onChange={(e) => setIframeInput(e.target.value)}
              required
            />
          </div>

          <div className="iframe-form-group select-group">
            <label htmlFor="iframe-select">Topic Selection:</label>
            <select
              id="iframe-select"
              className="iframe-select"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            >
              <option value="general">General Support</option>
              <option value="billing">Billing Inquiry</option>
              <option value="technical">Technical Assistance</option>
            </select>
          </div>

          <div className="iframe-checkbox-group">
            <input
              type="checkbox"
              id="iframe-checkbox"
              className="iframe-checkbox"
              checked={isSubscribed}
              onChange={(e) => setIsSubscribed(e.target.checked)}
            />
            <label htmlFor="iframe-checkbox">
              Subscribe to frame newsletters
            </label>
          </div>

          <div className="iframe-actions">
            <button
              type="submit"
              id="iframe-action-btn"
              className="iframe-btn"
            >
              Submit Frame Form
            </button>
          </div>
        </form>
      ) : (
        <div className="iframe-success-state">
          <div className="success-icon">✓</div>
          <h5>Form Submitted Successfully!</h5>
          
          <div className="submitted-summary">
            <p>Text: <strong>{submittedData.text}</strong></p>
            <p>Topic: <strong>{submittedData.topic}</strong></p>
            <p>Subscribed: <strong>{submittedData.subscribed}</strong></p>
          </div>

          <div className="iframe-actions">
            <button
              id="iframe-reset-btn"
              className="iframe-btn-secondary"
              onClick={handleReset}
            >
              Reset Frame
            </button>
          </div>
        </div>
      )}

      <div className="iframe-metrics">
        <span>Clicks inside frame: <strong>{iframeClicks}</strong></span>
      </div>
    </div>
  );
};

export default IframeContent;
