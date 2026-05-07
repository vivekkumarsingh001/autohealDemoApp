import React, { useState } from "react";
import "./Filter.css";

const Filter = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    language: {
      any: true,
      java: false,
      python: false
    },
    level: {
      beginner: true,
      intermediate: true,
      advanced: true
    },
    minEnrollments: "any"
  });

  const [openSections, setOpenSections] = useState({
    language: true,
    level: true,
    enrollments: true
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleLanguageChange = (type) => {
    if (type === "any") {
      setFilters(prev => ({
        ...prev,
        language: {
          any: true,
          java: false,
          python: false
        }
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        language: {
          any: false,
          [type]: !prev.language[type]
        }
      }));
    }
  };

  const handleLevelChange = (level) => {
    setFilters(prev => ({
      ...prev,
      level: {
        ...prev.level,
        [level]: !prev.level[level]
      }
    }));
  };

  const handleEnrollmentsChange = (value) => {
    setFilters(prev => ({
      ...prev,
      minEnrollments: value
    }));
  };

  const getSelectedCount = () => {
    let count = 0;
    if (filters.language.java) count++;
    if (filters.language.python) count++;
    if (filters.level.beginner) count++;
    if (filters.level.intermediate) count++;
    if (filters.level.advanced) count++;
    if (filters.minEnrollments !== "any") count++;
    return count;
  };

  const handleReset = () => {
    setFilters({
      language: {
        any: true,
        java: false,
        python: false
      },
      level: {
        beginner: true,
        intermediate: true,
        advanced: true
      },
      minEnrollments: "any"
    });
    
    // Call onApplyFilters with reset filters
    if (onApplyFilters) {
      onApplyFilters({
        language: {
          any: true,
          java: false,
          python: false
        },
        level: {
          beginner: true,
          intermediate: true,
          advanced: true
        },
        minEnrollments: "any"
      });
    }
  };

  const handleApply = () => {
    if (onApplyFilters) {
      onApplyFilters(filters);
    }
  };

  const selectedCount = getSelectedCount();

  return (
    <div className="filter-container">
      <div className="filter-card">
        <div className="filter-header">
          <h3 className="filter-title">
            Filters
            {selectedCount > 0 && (
              <span className="selected-count">{selectedCount}</span>
            )}
          </h3>
          <button className="reset-icon" onClick={handleReset} title="Reset all">
            ↻
          </button>
        </div>

        {/* Language Section */}
        <div className="filter-section">
          <div className="section-header" onClick={() => toggleSection("language")}>
            <h4 className="section-title">Language</h4>
            <span className="toggle-icon">{openSections.language ? "−" : "+"}</span>
          </div>
          {openSections.language && (
            <div className="filter-options">
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.language.any}
                  onChange={() => handleLanguageChange("any")}
                />
                <span className="checkmark"></span>
                Any
              </label>
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.language.java}
                  onChange={() => handleLanguageChange("java")}
                />
                <span className="checkmark"></span>
                Java
              </label>
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.language.python}
                  onChange={() => handleLanguageChange("python")}
                />
                <span className="checkmark"></span>
                Python
              </label>
            </div>
          )}
        </div>

        {/* Level Section */}
        <div className="filter-section">
          <div className="section-header" onClick={() => toggleSection("level")}>
            <h4 className="section-title">Level</h4>
            <span className="toggle-icon">{openSections.level ? "−" : "+"}</span>
          </div>
          {openSections.level && (
            <div className="filter-options">
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.level.beginner}
                  onChange={() => handleLevelChange("beginner")}
                />
                <span className="checkmark"></span>
                Beginner
              </label>
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.level.intermediate}
                  onChange={() => handleLevelChange("intermediate")}
                />
                <span className="checkmark"></span>
                Intermediate
              </label>
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.level.advanced}
                  onChange={() => handleLevelChange("advanced")}
                />
                <span className="checkmark"></span>
                Advanced
              </label>
            </div>
          )}
        </div>

        {/* Min Enrollments Section */}
        <div className="filter-section">
          <div className="section-header" onClick={() => toggleSection("enrollments")}>
            <h4 className="section-title">Min enrollments</h4>
            <span className="toggle-icon">{openSections.enrollments ? "−" : "+"}</span>
          </div>
          {openSections.enrollments && (
            <div className="filter-options radio-options">
              <label className="filter-option">
                <input
                  type="radio"
                  name="enrollments"
                  value="any"
                  checked={filters.minEnrollments === "any"}
                  onChange={(e) => handleEnrollmentsChange(e.target.value)}
                />
                <span className="radio-mark"></span>
                Any
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="enrollments"
                  value="100"
                  checked={filters.minEnrollments === "100"}
                  onChange={(e) => handleEnrollmentsChange(e.target.value)}
                />
                <span className="radio-mark"></span>
                100+
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="enrollments"
                  value="500"
                  checked={filters.minEnrollments === "500"}
                  onChange={(e) => handleEnrollmentsChange(e.target.value)}
                />
                <span className="radio-mark"></span>
                500+
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="enrollments"
                  value="1000"
                  checked={filters.minEnrollments === "1000"}
                  onChange={(e) => handleEnrollmentsChange(e.target.value)}
                />
                <span className="radio-mark"></span>
                1000+
              </label>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="filter-actions">
          <button className="btn-apply" onClick={handleApply}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;