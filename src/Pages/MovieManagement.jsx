// src/Pages/MovieManagement.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminMovieCard from "./AdminMovieCard";
import "./AdminMovieCard.css";

const MovieManagement = () => {
  const navigate = useNavigate();

  const [movies, setMovies]             = useState([]);
  const [title, setTitle]               = useState("");
  const [poster, setPoster]             = useState("");
  const [language, setLanguage]         = useState("");
  const [city, setCity]                 = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const saveMovies = (updated) => {
    setMovies(updated);
    localStorage.setItem("movies", JSON.stringify(updated));
  };

  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      navigate("/admin");
      return;
    }
    const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];
    setMovies(storedMovies);
  }, []);

  const resetForm = () => {
    setTitle("");
    setPoster("");
    setLanguage("");
    setCity("");
    setEditingIndex(null);
  };

  const handleAdd = () => {
    if (!title || !poster || !language || !city)
      return alert("Please fill all fields!");

    const newMovie = { title, poster, language, city };
    saveMovies([...movies, newMovie]);
    resetForm();
  };

  const handleEdit = (index) => {
    setTitle(movies[index].title);
    setPoster(movies[index].poster);
    setLanguage(movies[index].language || "");
    setCity(movies[index].city || "");
    setEditingIndex(index);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdate = () => {
    if (editingIndex === null) return;
    const updated = [...movies];
    updated[editingIndex] = { title, poster, language, city };
    saveMovies(updated);
    resetForm();
  };

  const handleDelete = (index) => {
    if (!window.confirm("Delete this movie?")) return;
    const updated = movies.filter((_, i) => i !== index);
    saveMovies(updated);
  };

  return (
    <div className="movie-management-wrapper">

      <h2>🎬 Movie Management</h2>

      {/* ── ADD / EDIT FORM ── */}
      <div className="movie-form">

        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Poster URL"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
        />

        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="">Select Language</option>
          <option value="Hindi">Hindi</option>
          <option value="Marathi">Marathi</option>
          <option value="English">English</option>
        </select>

        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Select City</option>
          <option value="Nagpur">Nagpur</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
        </select>

        {editingIndex === null ? (
          <button onClick={handleAdd}>➕ Add Movie</button>
        ) : (
          <button className="update-btn" onClick={handleUpdate}>✅ Update Movie</button>
        )}

      </div>

      {/* ── MOVIE LIST ── */}
      <div className="movie-list-heading">
        All Movies <span style={{ color: "var(--primary)", fontWeight: 800 }}>({movies.length})</span>
      </div>

      <div className="movie-list">
        {movies.length === 0 ? (
          <div className="no-movies-admin">
            <span>🎬</span>
            No movies added yet. Add your first movie above!
          </div>
        ) : (
          movies.map((movie, index) => (
            <AdminMovieCard
              key={index}
              movie={movie}
              onEdit={() => handleEdit(index)}
              onDelete={() => handleDelete(index)}
            />
          ))
        )}
      </div>

    </div>
  );
};

export default MovieManagement;
