import React, { useState, useEffect } from "react";
import "./Carousel.css";

const Carousel = ({ posters }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % posters.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [posters.length]);

  return (
    <div className="carousel">
      <div>
      <h3> Ласкаво просимо до театральної афіші!</h3>
      </div>
      <p>{posters.map((poster, index) => (
        <div
          key={poster.id}
          className={`carousel-item ${index === currentIndex ? "active" : ""}`}
          style={{ display: index === currentIndex ? "block" : "none" }}
        >
          <img
            src={poster.image}
            alt={poster.title}
            className="carousel-image"
          />
        </div>
      ))}</p>
      <div>
      <p> У цьому веб-застосунку ви можете створити обліковий запис,</p>
      <p> щоб зберігати свої улюблені вистави, купувати квитки та ставити оцінки і коментарі про вистави.</p>
      <p> Для отримання цих функцій, будь ласка, зайдіть в обліковий запис, або зареєструйтеся.</p>
      </div>
    
  
    </div>
    
  );
};

export default Carousel;
