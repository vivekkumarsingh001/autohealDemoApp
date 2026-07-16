import React, { useState } from "react";
import "./TextboxDemo.css";

const TextboxDemo = () => {
  // Input states
  const [standardVal, setStandardVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [passwordVal, setPasswordVal] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [numberVal, setNumberVal] = useState("");
  const [telVal, setTelVal] = useState("");
  const [urlVal, setUrlVal] = useState("");
  const [dateVal, setDateVal] = useState("");
  const [textareaVal, setTextareaVal] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Simple validation helpers
  const isEmailValid = emailVal === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
  const isNumberValid = numberVal === "" || (Number(numberVal) >= 1 && Number(numberVal) <= 100);
  const isUrlValid = urlVal === "" || /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(urlVal);

  const getPasswordStrength = () => {
    if (!passwordVal) return { label: "Empty", class: "empty", width: "0%" };
    if (passwordVal.length < 6) return { label: "Weak", class: "weak", width: "30%" };
    if (passwordVal.length < 10) return { label: "Medium", class: "medium", width: "65%" };
    return { label: "Strong", class: "strong", width: "100%" };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEmailValid || !isNumberValid || !isUrlValid) {
      alert("Please fix validation errors before submitting.");
      return;
    }
    setSubmittedData({
      standard: standardVal,
      email: emailVal,
      password: showPassword ? passwordVal : "••••••••",
      number: numberVal,
      tel: telVal,
      url: urlVal,
      date: dateVal,
      textarea: textareaVal
    });
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setStandardVal("");
    setEmailVal("");
    setPasswordVal("");
    setNumberVal("");
    setTelVal("");
    setUrlVal("");
    setDateVal("");
    setTextareaVal("");
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  const strength = getPasswordStrength();

  return (
    <div className="textbox-showcase-container">
      <div className="textbox-header-glass">
        <h2>⌨️ Textbox Showcase Room</h2>
        <p className="subtitle">
          Demonstrates all types of text input elements, placeholders, read-only/disabled states, live value previews, character counters, and regex format validations.
        </p>
      </div>

      <div className="textbox-demo-grid">
        {/* Input Forms column */}
        <div className="demo-column inputs-column">
          <h3>📝 Input Form Fields</h3>
          <p className="context-desc">
            Fill in the text fields below. Each control has specific validation rules.
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="textbox-form">
              {/* Standard text input */}
              <div className="form-group">
                <label htmlFor="text-standard">Standard Text Input</label>
                <input
                  type="text"
                  id="text-standard"
                  className="demo-input"
                  placeholder="Enter standard alphanumeric text..."
                  value={standardVal}
                  onChange={(e) => setStandardVal(e.target.value)}
                  required
                />
              </div>

              {/* Email Input */}
              <div className="form-group">
                <label htmlFor="text-email">Email Input</label>
                <input
                  type="email"
                  id="text-email"
                  className={`demo-input ${!isEmailValid ? "invalid" : ""}`}
                  placeholder="Enter valid email (e.g. name@domain.com)..."
                  value={emailVal}
                  onChange={(e) => setEmailVal(e.target.value)}
                  required
                />
                {!isEmailValid && (
                  <span className="validation-error">Invalid email address format</span>
                )}
              </div>

              {/* Password Input */}
              <div className="form-group">
                <label htmlFor="text-password">Password Input</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="text-password"
                    className="demo-input password-input"
                    placeholder="Enter security password..."
                    value={passwordVal}
                    onChange={(e) => setPasswordVal(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {/* Password Strength Indicator */}
                {passwordVal && (
                  <div className="password-strength-meter">
                    <span className="strength-label">
                      Strength: <strong className={strength.class}>{strength.label}</strong>
                    </span>
                    <div className="strength-bar-bg">
                      <div
                        className={`strength-bar-fill ${strength.class}`}
                        style={{ width: strength.width }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Number Input */}
              <div className="form-group">
                <label htmlFor="text-number">Number Input (Range: 1 to 100)</label>
                <input
                  type="number"
                  id="text-number"
                  className={`demo-input ${!isNumberValid ? "invalid" : ""}`}
                  placeholder="Enter age/count (1 - 100)..."
                  min="1"
                  max="100"
                  value={numberVal}
                  onChange={(e) => setNumberVal(e.target.value)}
                  required
                />
                {!isNumberValid && (
                  <span className="validation-error">Number must be between 1 and 100</span>
                )}
              </div>

              {/* Telephone Input */}
              <div className="form-group">
                <label htmlFor="text-tel">Telephone Input</label>
                <input
                  type="tel"
                  id="text-tel"
                  className="demo-input"
                  placeholder="Enter phone digits (e.g. +1-555-0199)..."
                  value={telVal}
                  onChange={(e) => setTelVal(e.target.value)}
                  required
                />
              </div>

              {/* URL Input */}
              <div className="form-group">
                <label htmlFor="text-url">URL Input</label>
                <input
                  type="url"
                  id="text-url"
                  className={`demo-input ${!isUrlValid ? "invalid" : ""}`}
                  placeholder="Enter address (e.g. https://google.com)..."
                  value={urlVal}
                  onChange={(e) => setUrlVal(e.target.value)}
                  required
                />
                {!isUrlValid && (
                  <span className="validation-error">Invalid URL format (include http:// or https://)</span>
                )}
              </div>

              {/* Date Input */}
              <div className="form-group">
                <label htmlFor="text-date">Date Selection Input</label>
                <input
                  type="date"
                  id="text-date"
                  className="demo-input"
                  value={dateVal}
                  onChange={(e) => setDateVal(e.target.value)}
                  required
                />
              </div>

              {/* Textarea Multi-line Input */}
              <div className="form-group">
                <div className="textarea-label-row">
                  <label htmlFor="text-area">Textarea (Multi-line Description)</label>
                  <span className="char-counter">{textareaVal.length} chars</span>
                </div>
                <textarea
                  id="text-area"
                  className="demo-textarea"
                  placeholder="Type a longer narrative description..."
                  value={textareaVal}
                  onChange={(e) => setTextareaVal(e.target.value)}
                  maxLength={500}
                  required
                />
              </div>

              {/* Disabled Input */}
              <div className="form-group">
                <label htmlFor="text-disabled">Disabled Input (Locked)</label>
                <input
                  type="text"
                  id="text-disabled"
                  className="demo-input disabled-input"
                  value="This field is permanently disabled"
                  disabled
                />
              </div>

              {/* Read-Only Input */}
              <div className="form-group">
                <label htmlFor="text-readonly">Read-Only Input (Selectable, Non-editable)</label>
                <input
                  type="text"
                  id="text-readonly"
                  className="demo-input readonly-input"
                  value="SECURE-KEY-998877"
                  readOnly
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="demo-btn submit-btn">
                  Submit Text Fields
                </button>
              </div>
            </form>
          ) : (
            <div className="textbox-success-state">
              <div className="success-icon">✓</div>
              <h3>Data Submitted Successfully!</h3>
              <p>The text area data has been compiled. You can inspect the values in the preview block.</p>
              <button className="demo-btn reset-btn" onClick={handleReset}>
                Reset Inputs
              </button>
            </div>
          )}
        </div>

        {/* Live Preview column */}
        <div className="demo-column preview-column">
          <h3>📂 Form Output Live Preview</h3>
          <p className="context-desc">
            Visual output reflecting your inputs in real time.
          </p>

          <div className="preview-card-glass">
            <div className="preview-row">
              <span>Standard:</span>
              <strong>{standardVal || "(empty)"}</strong>
            </div>
            <div className="preview-row">
              <span>Email:</span>
              <strong className={!isEmailValid ? "error-text" : ""}>
                {emailVal || "(empty)"}
              </strong>
            </div>
            <div className="preview-row">
              <span>Password (Hashed):</span>
              <strong>{passwordVal ? "•".repeat(passwordVal.length) : "(empty)"}</strong>
            </div>
            <div className="preview-row">
              <span>Number:</span>
              <strong className={!isNumberValid ? "error-text" : ""}>
                {numberVal || "(empty)"}
              </strong>
            </div>
            <div className="preview-row">
              <span>Telephone:</span>
              <strong>{telVal || "(empty)"}</strong>
            </div>
            <div className="preview-row">
              <span>URL:</span>
              <strong className={!isUrlValid ? "error-text" : ""}>
                {urlVal || "(empty)"}
              </strong>
            </div>
            <div className="preview-row">
              <span>Date Selected:</span>
              <strong>{dateVal || "(empty)"}</strong>
            </div>
            <div className="preview-row desc-row">
              <span>Textarea Value:</span>
              <p className="preview-textarea-text">{textareaVal || "(empty)"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextboxDemo;