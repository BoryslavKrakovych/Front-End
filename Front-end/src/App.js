import React, { useState, useEffect } from "react";
import axios from "axios";
import Poster from "./Poster";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import PerformancesPage from "./PerformancesPage";
import Carousel from "./Carousel";
import CommentsSection from "./CommentsSection";
import WeatherPage from "./WeatherPage";
import ContactsPage from "./ContactsPage";
import PrivacyPolicyPage from "./PrivacyPolicyPage";
import AboutPage from "./AboutPage";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("username"));
  const [selectedPoster, setSelectedPoster] = useState(null);
  const [posters, setPosters] = useState([]);
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    const fetchPosters = async () => {
      const response = await axios.get('http://localhost:5000/posters');
      setPosters(response.data);
    };
    fetchPosters();
  }, []);
  
  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = "/images/logo.jpg";
    }
  }, []);

  const handlePosterClick = (poster) => {
    setSelectedPoster(poster);
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      if (response.data === 'Login successful') {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        setIsLoggedIn(true);
        setCurrentPage("performances");
      } else {
        alert('Помилка входу. Можливо, неправильно введені ім`я чи пароль. Спробуйте ввести ім`я та пароль ще раз, або введіть інші.');
      }
    } catch (error) {
      console.error("Login error:", error);
      alert('Помилка входу. Можливо, неправильно введені ім`я чи пароль. Спробуйте ввести ім`я та пароль ще раз, або введіть інші.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    setIsLoggedIn(false);
    setCurrentPage("home");
  };

  const handleRegister = async (username, password) => {
    try {
      await axios.post('http://localhost:5000/register', { username, password });
      setIsLoggedIn(true);
      setCurrentPage("performances");
    } catch (error) {
      console.error("Registration error:", error);
      alert('Помилка реєстрації. Можливо, це ім`я вже існує. Спробуйте ввести ім`я та пароль ще раз, або введіть інші.');
    }
  };

  return (
    <div className="App">
      <header className="header">
        <img src="/images/logo.jpg" alt="Logo" className="logo" />
        <h1>Театральна афіша</h1>
        <nav>
          <button className="nav-button" onClick={() => setCurrentPage("about")}>Про сайт</button>
          <button className="nav-button" onClick={() => setCurrentPage("privacy-policy")}>Політика конфіденційності</button>
          <button className="nav-button" onClick={() => setCurrentPage("contacts")}>Контакти</button>
          <button className="nav-button" onClick={() => setCurrentPage("weather")}>Погода</button>
          <button className="nav-button" onClick={() => setCurrentPage("home")}>Головна</button>
          {isLoggedIn ? (
            <>
              <button className="nav-button" onClick={handleLogout}>Вийти</button>
            </>
          ) : (
            <>
              <button className="nav-button" onClick={() => setCurrentPage("login")}>Вхід</button>
              <button className="nav-button" onClick={() => setCurrentPage("register")}>Реєстрація</button>
            </>
          )}
        </nav>
      </header>
      <main>
        {currentPage === "home" && (
          isLoggedIn ? (
            <PerformancesPage posters={posters} onPosterClick={handlePosterClick} />
          ) : (
            <Carousel posters={posters} />
          )
        )}
        {currentPage === "login" && !isLoggedIn && <LoginForm onLogin={handleLogin} />}
        {currentPage === "register" && !isLoggedIn && <RegistrationForm onRegister={handleRegister} />}
        {currentPage === "performances" && isLoggedIn && (
          <PerformancesPage posters={posters} onPosterClick={handlePosterClick} />
        )}
        {currentPage === "weather" && <WeatherPage />}
        {currentPage === "contacts" && <ContactsPage />}
        {currentPage === "privacy-policy" && <PrivacyPolicyPage />}
        {currentPage === "about" && <AboutPage />}
        {selectedPoster && (
          <div className="modal" onClick={() => setSelectedPoster(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>{selectedPoster.title}</h2>
              <p><strong>Опис вистави:</strong>{selectedPoster.description}</p>
              <p><strong>Жанр вистави:</strong> {selectedPoster.genre}</p>
              <p><strong>Дата вистави:</strong> {selectedPoster.date}</p>
              <p><strong>Час вистави:</strong> {selectedPoster.time}</p>
              <p><strong>Актори:</strong> {selectedPoster.actors.join(', ')}</p>
              {isLoggedIn && <CommentsSection posterId={selectedPoster._id} />}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;