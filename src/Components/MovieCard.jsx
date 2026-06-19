// src/Components/MovieCard.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

function MovieCard({ movie }) {

  const navigate = useNavigate();

  const handleBooking = () => {

    const loggedIn =
      localStorage.getItem("isLoggedIn");

    if (!loggedIn) {
      navigate("/signup");
      return;
    }

    // ✅ FULL MOVIE OBJECT PASS
    navigate(`/theaters/${movie.id}`, {
      state: {
        movie: movie,
      },
    });

  };

  return (

    <div className="movie-card">

      <div className="movie-image-wrapper">

        <img
          src={movie.poster || movie.posterUrl}
          alt={movie.title || movie.name}
          className="movie-image"
        />

        <div className="rating-badge">
          ⭐ {movie.rating || 7.0}
        </div>

        <div className="lang-tag">
          {movie.language}
        </div>

      </div>

      <div className="movie-info">

        <h3>
          {movie.title || movie.name}
        </h3>

        <button
          className="book-btn"
          onClick={handleBooking}
        >
          Book Now
        </button>

      </div>

    </div>

  );
}

export default MovieCard;