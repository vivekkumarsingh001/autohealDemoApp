import React, { useState } from "react";
import Filter from "./Filter";
import "./CheckboxDemo.css";

const CheckboxDemo = () => {
  const [appliedFilters, setAppliedFilters] = useState(null);

  // Sample courses data
  const courses = [
    { id: 1, name: "Java Programming Masterclass", language: "java", level: "beginner", enrollments: 1500 },
    { id: 2, name: "Python for Data Science", language: "python", level: "intermediate", enrollments: 2300 },
    { id: 3, name: "Advanced Java Development", language: "java", level: "advanced", enrollments: 800 },
    { id: 4, name: "Python Web Development", language: "python", level: "beginner", enrollments: 1200 },
    { id: 5, name: "Java Spring Boot Framework", language: "java", level: "intermediate", enrollments: 950 },
    { id: 6, name: "Machine Learning with Python", language: "python", level: "advanced", enrollments: 1800 },
    { id: 7, name: "Java Fundamentals", language: "java", level: "beginner", enrollments: 2100 },
    { id: 8, name: "Python Automation", language: "python", level: "intermediate", enrollments: 750 },
  ];

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
    console.log("Filters applied:", filters);
  };

  const filterCourses = () => {
    if (!appliedFilters) return courses;

    return courses.filter(course => {
      // Language filter
      const languageMatch = 
        appliedFilters.language.any ||
        (appliedFilters.language.java && course.language === "java") ||
        (appliedFilters.language.python && course.language === "python");

      // Level filter
      const levelMatch = 
        (appliedFilters.level.beginner && course.level === "beginner") ||
        (appliedFilters.level.intermediate && course.level === "intermediate") ||
        (appliedFilters.level.advanced && course.level === "advanced");

      // Enrollments filter
      let enrollmentsMatch = true;
      if (appliedFilters.minEnrollments !== "any") {
        const minEnroll = parseInt(appliedFilters.minEnrollments);
        enrollmentsMatch = course.enrollments >= minEnroll;
      }

      return languageMatch && levelMatch && enrollmentsMatch;
    });
  };

  const filteredCourses = filterCourses();

  return (
    <div className="checkbox-demo-container">
      <div className="checkbox-demo-wrapper">
        {/* Filter Sidebar */}
        <div className="filter-sidebar">
          <Filter onApplyFilters={handleApplyFilters} />
        </div>

        {/* Content Area */}
        <div className="content-area">
          <div className="demo-header">
            <h2>Checkbox & Radio Button Demo</h2>
            <p>This page demonstrates various checkbox and radio button filters</p>
            {appliedFilters && (
              <div className="active-filters">
                <span className="filter-badge">
                  Active Filters: {getActiveFilterCount(appliedFilters)}
                </span>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="results-section">
            <h3>Courses ({filteredCourses.length})</h3>
            <div className="courses-grid">
              {filteredCourses.map(course => (
                <div key={course.id} className="course-card">
                  <div className="course-icon">
                    {course.language === "java" ? "☕" : "🐍"}
                  </div>
                  <div className="course-info">
                    <h4>{course.name}</h4>
                    <div className="course-details">
                      <span className={`level-badge level-${course.level}`}>
                        {course.level}
                      </span>
                      <span className="language-badge">
                        {course.language === "java" ? "Java" : "Python"}
                      </span>
                      <span className="enrollments">
                        📊 {course.enrollments}+ students
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="no-results">
                <p>No courses match your filters. Try adjusting your selection!</p>
              </div>
            )}
          </div>

          {/* Demo Explanation */}
          <div className="demo-explanation">
            <h3>Checkbox Features Demonstrated:</h3>
            <ul>
              <li>✓ Custom-styled checkboxes with CSS</li>
              <li>✓ Multiple selection in Language and Level filters</li>
              <li>✓ Radio buttons for mutually exclusive selections (Enrollments)</li>
              <li>✓ "Any" option that automatically deselects other checkboxes</li>
              <li>✓ Real-time filtering of content based on selections</li>
              <li>✓ Visual feedback with selected count badges</li>
              <li>✓ Reset button to clear all filters</li>
              <li>✓ Collapsible sections for better UX</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to count active filters
const getActiveFilterCount = (filters) => {
  let count = 0;
  if (filters.language.java) count++;
  if (filters.language.python) count++;
  if (filters.level.beginner) count++;
  if (filters.level.intermediate) count++;
  if (filters.level.advanced) count++;
  if (filters.minEnrollments !== "any") count++;
  return count;
};

export default CheckboxDemo;