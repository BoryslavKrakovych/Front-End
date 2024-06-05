import React from "react";
import "./Selector.css";

const Selector = ({ label, options, selected, onChange }) => {
  return (
    <div className="selector">
      <label>{label}:</label>
      <select value={selected} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Selector;
