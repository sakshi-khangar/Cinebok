// src/Components/AdminMovieCard.jsx
import React from "react";

function AdminMovieCard({ movie, onEdit, onDelete }) {
  return (
    <div className="admin-movie-card">

      <div className="admin-movie-image-wrapper">
        <img
          src={movie.poster}
          alt={movie.title}
          className="admin-movie-image"
        />
      </div>

      <div className="admin-movie-info">
        <h3>{movie.title}</h3>

        {/* Language + City tags */}
        <div className="admin-movie-tags">
          {movie.language && (
            <span className="admin-tag lang">{movie.language}</span>
          )}
          {movie.city && (
            <span className="admin-tag city">📍 {movie.city}</span>
          )}
        </div>

        <div className="admin-btn-group">
          <button className="admin-edit-btn" onClick={onEdit}>✏️ Edit</button>
          <button className="admin-delete-btn" onClick={onDelete}>🗑 Delete</button>
        </div>
      </div>

    </div>
  );
}

export default AdminMovieCard;
