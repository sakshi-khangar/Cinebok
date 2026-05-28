import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminMovies.css";

const AdminMovies = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);

  const [name, setName] = useState("");
  const [city, setCity] = useState("Nagpur");
  const [language, setLanguage] = useState("Hindi");
  const [genre, setGenre] = useState("Action");
  const [rating, setRating] = useState("");
  const [poster, setPoster] = useState("");

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const savedMovies =
      JSON.parse(localStorage.getItem("movies")) || [];

    setMovies(savedMovies);
  }, []);

  // Add / Update Movie

  const handleAddOrUpdateMovie = () => {
    if (!name || !rating || !poster) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      const updatedMovies = movies.map((movie) =>
        movie.id === editId
          ? {
              ...movie,
              title: name,
              city,
              language,
              genre,
              rating,
              poster,
            }
          : movie
      );

      setMovies(updatedMovies);

      localStorage.setItem(
        "movies",
        JSON.stringify(updatedMovies)
      );

      setEditId(null);

      alert("Movie Updated ✅");
    } else {
      const newMovie = {
        id: Date.now(),
        title: name,
        city,
        language,
        genre,
        rating,
        poster,
      };

      const updatedMovies = [...movies, newMovie];

      setMovies(updatedMovies);

      localStorage.setItem(
        "movies",
        JSON.stringify(updatedMovies)
      );

      alert("Movie Added ✅");
    }

    // Reset

    setName("");
    setRating("");
    setPoster("");
    setCity("Nagpur");
    setLanguage("Hindi");
    setGenre("Action");
  };

  // Delete

  const handleDeleteMovie = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure to delete this movie?"
    );

    if (!confirmDelete) return;

    const updatedMovies = movies.filter(
      (movie) => movie.id !== id
    );

    setMovies(updatedMovies);

    localStorage.setItem(
      "movies",
      JSON.stringify(updatedMovies)
    );
  };

  // Edit

  const handleEditMovie = (movie) => {
    setEditId(movie.id);

    setName(movie.title);
    setCity(movie.city);
    setLanguage(movie.language);
    setGenre(movie.genre || "Action");
    setRating(movie.rating);
    setPoster(movie.poster);
  };

  return (
    <div className="admin-container">

      {/* Header */}

      <div className="admin-header">

        <h1 className="admin-title">
          🎬 Manage Movies
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="back-btn"
        >
          Back
        </button>

      </div>

      {/* Form */}

      <div className="form-container">

        <div className="form-grid">

          <input
            type="text"
            placeholder="Movie Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="form-input input-medium"
          />

          {/* City */}

          <select
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
            className="form-select"
          >
            <option>Nagpur</option>
            <option>Mumbai</option>
            <option>Pune</option>
          </select>

          {/* Language */}

          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
            className="form-select"
          >
            <option>Hindi</option>
            <option>Marathi</option>
            <option>English</option>
          </select>

          {/* Genre */}

          <select
            value={genre}
            onChange={(e) =>
              setGenre(e.target.value)
            }
            className="form-select"
          >
            <option>Action</option>
            <option>Comedy</option>
            <option>Drama</option>
            <option>Horror</option>
            <option>Romance</option>
            <option>Sci-Fi</option>
            <option>Thriller</option>
            <option>Adventure</option>
          </select>

          <input
            type="number"
            placeholder="Rating"
            value={rating}
            onChange={(e) =>
              setRating(e.target.value)
            }
            className="form-input input-small"
          />

          <input
            type="text"
            placeholder="Poster URL"
            value={poster}
            onChange={(e) =>
              setPoster(e.target.value)
            }
            className="form-input input-large"
          />

          <button
            onClick={handleAddOrUpdateMovie}
            className="add-btn"
          >
            {editId
              ? "Update Movie"
              : "Add Movie"}
          </button>

        </div>

      </div>

      {/* Movies */}

      <h2 className="section-title">
        Added Movies
      </h2>

      {movies.length === 0 ? (
        <p>No movies added</p>
      ) : (

        <div className="movies-grid">

          {movies.map((movie) => (

            <div
              key={movie.id}
              className="movie-card"
            >

              <img
                src={movie.poster}
                alt={movie.title}
                className="movie-poster"
              />

              <div className="movie-info">

                <h3 className="movie-title">
                  {movie.title}
                </h3>

                <p className="movie-meta">
                  {movie.city} | {movie.language}
                </p>

                <p className="movie-meta">
                  🎭 {movie.genre}
                </p>

                <p className="movie-rating">
                  ⭐ {movie.rating}
                </p>

                <div className="button-group">

                  <button
                    onClick={() =>
                      handleEditMovie(movie)
                    }
                    className="edit-btn"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteMovie(movie.id)
                    }
                    className="delete-btn"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default AdminMovies;