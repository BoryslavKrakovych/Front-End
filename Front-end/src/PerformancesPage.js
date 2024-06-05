import React, { useState } from "react";
import Poster from "./Poster";
import Selector from "./Selector";
import SearchBar from "./SearchBar";
import "./PerformancesPage.css";

const PerformancesPage = ({ posters, onPosterClick }) => {
  const [genre, setGenre] = useState("Всі жанри");
  const [date, setDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosters = posters.filter((poster) => {
    return (
      (genre === "Всі жанри" || poster.genre === genre) &&
      (!date || poster.date === date) &&
      poster.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="performances-page">
      <div className="selectors">
        <Selector
          label="Жанр:"
          options={["Всі жанри", "Драма", "Трагедія", "Комедія", "Пригода"]}
          selected={genre}
          onChange={setGenre}
        />
        <div className="selector">
          <label>Дата:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="posters-grid">
        {filteredPosters.map((poster) => (
          <Poster key={poster._id} poster={poster} onClick={onPosterClick} />
        ))}
      </div>
    </div>
  );
};

export default PerformancesPage;