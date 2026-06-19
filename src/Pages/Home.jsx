// src/Pages/Home.jsx

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import MovieCard from "../Components/MovieCard";
import HeroSlider from "../Components/HeroSlider";

import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import "./Home.css";

// // hindi movies Nagpur
// import chhava from "../assets/chhava.png";
// import Kgf from "../assets/Kgf.png";
// import pushpa from "../assets/pushpa.png";
// import golmaal from "../assets/golmaal.png";
// import idiots from "../assets/idoits.png";
// import dhamaal from "../assets/dhammal.png";
// // marathi movies Nagpur
// import jhimma from "../assets/jhimma.png";
// import sairat from "../assets/sairat.png";
// import duniyadari from "../assets/duniyadari.png";
// // English movies Nagpur
// import dragon from "../assets/dragon.png";
// import challenger from "../assets/challegers.png";
// import dune from "../assets/dune.png";
// import avatar from "../assets/avatar.png";
// // hindi movies Mumbai
// import fighter from "../assets/Fighter.png";
// import dhadak from "../assets/dhadak.png";
// import sitaare from "../assets/sitare.png";
// import war from "../assets/war.png";
// import bhaghi from "../assets/bhaghi.png";
// import son from "../assets/son.png";
// // marathi movies Mumbai
// import phullwanti from "../assets/phullwanti.png";
// import ved from "../assets/ved.png";
// import mitwaa from "../assets/mitwaa.png";
// import ganpati from "../assets/ganpati.png";
// // English movies Mumbai
// import good from "../assets/good.png";
// // hindi movies Pune
// import Animal from "../assets/animal.png";
// import saiyaara from "../assets/saiyaara.png";
// import ghuma from "../assets/ghuma.png";
// // English movies Pune
// import gandhi from "../assets/gandhi.png";
// import life from "../assets/life.png";
// import troy from "../assets/troy.png";

// const movies = [
//   // Hindi Nagpur
//   { id: 1,  title: "Chhava",                   rating: 9.2, language: "Hindi",   city: "Nagpur", poster: chhava,     genre: "Action" },
//   { id: 2,  title: "KGF Chapter 2",            rating: 6.0, language: "Hindi",   city: "Nagpur", poster: Kgf,        genre: "Action" },
//   { id: 3,  title: "Pushpa 2",                 rating: 8.1, language: "Hindi",   city: "Nagpur", poster: pushpa,     genre: "Thriller" },
//   { id: 4,  title: "Golmaal 3",                rating: 7.5, language: "Hindi",   city: "Nagpur", poster: golmaal,    genre: "Comedy" },
//   { id: 5,  title: "3 Idiots",                 rating: 9.1, language: "Hindi",   city: "Nagpur", poster: idiots,     genre: "Drama" },
//   { id: 6,  title: "Dhamaal",                  rating: 8.5, language: "Hindi",   city: "Nagpur", poster: dhamaal,    genre: "Comedy" },
//   // Marathi Nagpur
//   { id: 7,  title: "Jhimma",                   rating: 7.8, language: "Marathi", city: "Nagpur", poster: jhimma,     genre: "Drama" },
//   { id: 8,  title: "Sairat",                   rating: 7.0, language: "Marathi", city: "Nagpur", poster: sairat,     genre: "Romance" },
//   { id: 9,  title: "Duniyadari",               rating: 4.7, language: "Marathi", city: "Nagpur", poster: duniyadari, genre: "Drama" },
//   // English Nagpur
//   { id: 10, title: "How to Train Your Dragon", rating: 6.9, language: "English", city: "Nagpur", poster: dragon,     genre: "Adventure" },
//   { id: 11, title: "Challengers",              rating: 7.3, language: "English", city: "Nagpur", poster: challenger, genre: "Drama" },
//   { id: 12, title: "Dune",                     rating: 4.7, language: "English", city: "Nagpur", poster: dune,       genre: "Adventure" },
//   { id: 13, title: "Avatar",                   rating: 8.0, language: "English", city: "Nagpur", poster: avatar,     genre: "Adventure" },
//   // Hindi Mumbai
//   { id: 14, title: "Fighter",                  rating: 6.0, language: "Hindi",   city: "Mumbai", poster: fighter,    genre: "Action" },
//   { id: 15, title: "Dhadak 2",                 rating: 7.9, language: "Hindi",   city: "Mumbai", poster: dhadak,     genre: "Romance" },
//   { id: 16, title: "Sitaare Zameen Par",        rating: 5.5, language: "Hindi",   city: "Mumbai", poster: sitaare,    genre: "Drama" },
//   { id: 17, title: "War 2",                    rating: 6.9, language: "Hindi",   city: "Mumbai", poster: war,        genre: "Action" },
//   { id: 18, title: "Bhaaghi 4",                rating: 9.0, language: "Hindi",   city: "Mumbai", poster: bhaghi,     genre: "Action" },
//   { id: 19, title: "Son of Sardaar 2",          rating: 4.9, language: "Hindi",   city: "Mumbai", poster: son,        genre: "Comedy" },
//   // Marathi Mumbai
//   { id: 20, title: "Phullwanti",               rating: 5.9, language: "Marathi", city: "Mumbai", poster: phullwanti, genre: "Drama" },
//   { id: 21, title: "Ved",                      rating: 6.9, language: "Marathi", city: "Mumbai", poster: ved,        genre: "Romance" },
//   { id: 22, title: "Mitwaa",                   rating: 8.2, language: "Marathi", city: "Mumbai", poster: mitwaa,     genre: "Romance" },
//   { id: 23, title: "Gharat Ganpati",           rating: 9.4, language: "Marathi", city: "Mumbai", poster: ganpati,    genre: "Drama" },
//   // English Mumbai
//   { id: 24, title: "Good Will Hunting",        rating: 4.9, language: "English", city: "Mumbai", poster: good,       genre: "Drama" },
//   { id: 25, title: "Dune",                     rating: 5.3, language: "English", city: "Mumbai", poster: dune,       genre: "Adventure" },
//   { id: 26, title: "Avatar: The Way of Water", rating: 7.6, language: "English", city: "Mumbai", poster: avatar,     genre: "Adventure" },
//   // Hindi Pune
//   { id: 27, title: "Fighter",                  rating: 7.0, language: "Hindi",   city: "Pune",   poster: fighter,    genre: "Action" },
//   { id: 28, title: "Animal",                   rating: 7.2, language: "Hindi",   city: "Pune",   poster: Animal,     genre: "Thriller" },
//   { id: 29, title: "Saiyaara",                 rating: 6.4, language: "Hindi",   city: "Pune",   poster: saiyaara,   genre: "Romance" },
//   { id: 30, title: "Bhaaghi 4",                rating: 9.0, language: "Hindi",   city: "Pune",   poster: bhaghi,     genre: "Action" },
//   { id: 31, title: "Dhamaal",                  rating: 6.7, language: "Hindi",   city: "Pune",   poster: dhamaal,    genre: "Comedy" },
//   // Marathi Pune
//   { id: 32, title: "Mitwaa",                   rating: 5.7, language: "Marathi", city: "Pune",   poster: mitwaa,     genre: "Romance" },
//   { id: 33, title: "Jhimma",                   rating: 7.9, language: "Marathi", city: "Pune",   poster: jhimma,     genre: "Drama" },
//   { id: 34, title: "Duniyadari",               rating: 8.9, language: "Marathi", city: "Pune",   poster: duniyadari, genre: "Drama" },
//   { id: 35, title: "Phullwanti",               rating: 5.5, language: "Marathi", city: "Pune",   poster: phullwanti, genre: "Drama" },
//   { id: 36, title: "Nach Ga Ghuma",            rating: 7.0, language: "Marathi", city: "Pune",   poster: ghuma,      genre: "Comedy" },
//   // English Pune
//   { id: 37, title: "Gandhi",                   rating: 9.1, language: "English", city: "Pune",   poster: gandhi,     genre: "Drama" },
//   { id: 38, title: "Life of Pi",               rating: 5.8, language: "English", city: "Pune",   poster: life,       genre: "Adventure" },
//   { id: 39, title: "Good Will Hunting",        rating: 7.3, language: "English", city: "Pune",   poster: good,       genre: "Drama" },
//   { id: 40, title: "Troy",                     rating: 4.0, language: "English", city: "Pune",   poster: troy,       genre: "Action" },
//   { id: 41, title: "How to Train Your Dragon", rating: 6.0, language: "English", city: "Pune",   poster: dragon,     genre: "Adventure" },
// ];

const GENRES = ["All", "Action", "Comedy", "Romance", "Thriller", "Drama", "Adventure"];

function Home({
  selectedCity,
  selectedLanguage,
  searchTerm,
  isLoggedIn,
}) {
  const location = useLocation();

  const searchQuery =
    new URLSearchParams(location.search).get("search") || "";

  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [activeGenre, setActiveGenre] = useState("All");

  // Backend se movies fetch
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/movies")
      .then((res) => {
        console.log("MOVIES:", res.data);
        setMovies(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const allMovies = movies;

  const handleMovieClick = (movie) => {
    const loggedIn =
      isLoggedIn === true ||
      localStorage.getItem("isLoggedIn") === "true";

    if (!loggedIn) {
      navigate("/signup");
      return;
    }

    navigate(`/theaters/${movie.id}`, {
      state: {
        movie: movie,
      },
    });
  };

  const filteredMovies = allMovies.filter((movie) => {
    const matchCity =
      movie.city === selectedCity;

    const matchLanguage =
      selectedLanguage === "All" ||
      movie.language === selectedLanguage;

    const matchSearch =
      searchQuery === "" ||
      movie.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchGenre =
      activeGenre === "All" ||
      movie.genre === activeGenre;

    return (
      matchCity &&
      matchLanguage &&
      matchSearch &&
      matchGenre
    );
  });

  const trending = [...allMovies]
    .filter((m) => m.city === selectedCity)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);



  return (
    <div className="home-page">

      {/* HERO */}
      <HeroSlider isLoggedIn={isLoggedIn} />

      {/* TRENDING — with poster images */}
      <div className="trending-strip">
        <div className="trending-label">🔥 Trending</div>
        <div className="trending-scroll">
          {trending.map((movie, index) => (
            <div
              className="trending-chip"
              key={movie.id}
              onClick={() => handleMovieClick(movie)}
            >
              {/* Big colored number */}
              <span className="chip-num">{index + 1}</span>

              {/* Movie Poster Thumbnail */}
              <img
                src={movie.poster}
                alt={movie.title}
                className="chip-poster"
              />

              {/* Info */}
              <div className="chip-info">
                <span className="chip-title">{movie.title}</span>
                <span className="chip-sub">⭐ {movie.rating} • {movie.language}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GENRE */}
      <div className="genre-section">
        <div className="genre-header">
          <p className="genre-label">Browse by Genre</p>
        </div>
        <div className="genre-pills">
          {GENRES.map((genre) => (
            <button
              key={genre}
              className={`genre-pill ${activeGenre === genre ? "active" : ""}`}
              onClick={() => setActiveGenre(genre)}
            >
              {genre === "All"       && "🎬 "}
              {genre === "Action"    && "⚔️ "}
              {genre === "Comedy"    && "😂 "}
              {genre === "Romance"   && "💕 "}
              {genre === "Thriller"  && "😱 "}
              {genre === "Drama"     && "🎭 "}
              {genre === "Adventure" && "🌍 "}
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* MOVIES */}
      <div className="movies-section" id="movies-section">
        <div className="section-header">
          <div className="section-title">Now Showing in {selectedCity}</div>
          <span className="section-count">{filteredMovies.length} Movies</span>
        </div>

        {filteredMovies.length > 0 ? (
          <div className="movies-container">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} isLoggedIn={isLoggedIn} />
            ))}
          </div>
        ) : (
          <div className="no-movies">
            <span className="no-movies-icon">🎬</span>
            <p className="no-movies-text">No Movies Found</p>
            <p className="no-movies-sub">Try another city, language or genre</p>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">🎬 CineBook</div>
            <p>Your one-stop destination for booking movies across Nagpur, Mumbai & Pune. Fast, easy and secure movie booking platform.</p>
            <div className="footer-social">
              <a href="https://instagram.com/sakshik173/?utm_source=qr&r=nametag" target="_blank" rel="noreferrer" className="social-btn"><FaInstagram /></a>
              <a href="https://github.com/sakshi-khangar" target="_blank" rel="noreferrer" className="social-btn"><FaGithub /></a>
              <a href="https://linkedin.com/in/sakshi-khangar-01798731b" target="_blank" rel="noreferrer" className="social-btn"><FaLinkedin /></a>
              <a href="mailto:khangars095@gmail.com" className="social-btn"><MdEmail /></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Movies</h4>
            <a>Now Showing</a><a>Coming Soon</a><a>Top Rated</a><a>Hindi Films</a><a>Marathi Films</a>
          </div>
          <div className="footer-col">
            <h4>Cities</h4>
            <a>Nagpur</a><a>Mumbai</a><a>Pune</a>
          </div>
          <div className="footer-col">
            <h4>Help</h4>
            <a>FAQs</a><a>Contact Us</a><a>Cancellation Policy</a><a>Privacy Policy</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 CineBook. Made with ❤️ in Nagpur</p>
          <div className="footer-cities">
            <span className="city-chip">📍 Nagpur</span>
            <span className="city-chip">📍 Mumbai</span>
            <span className="city-chip">📍 Pune</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Home;
