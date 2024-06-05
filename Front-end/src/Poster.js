import React from "react";
import "./Poster.css";

const Poster = ({ poster, onClick }) => {
  return (
    <div className="poster" onClick={() => onClick(poster)}>
      <img src={poster.image} alt={poster.title} />
      <h3>{poster.title}</h3>
    </div>
  );
};

export default Poster;
