import React, { useEffect, useState } from "react";
import "./MyBookings.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(data);
  }, []);

  return (
    <div className="bookings-page">
      <h2 className="title">🎟 My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="empty">
          No bookings found. Start booking your favorite movies 🍿
        </div>
      ) : (
        <div className="booking-grid">
          {bookings.map((b, index) => (
            <div className="booking-card" key={index}>
              <h3 className="movie-name">
                🎬 {b.movieTitle || b.movie || "Unknown Movie"}
              </h3>

              <div className="details">
                <p><span>🏢 Theater:</span> {b.theater}</p>
                <p><span>📅 Date:</span> {b.date}</p>
                <p><span>⏰ Time:</span> {b.time}</p>
                <p><span>🎫 Seats:</span> {b.seats || "N/A"}</p>
                <p><span>💺 Screen:</span> {b.screen || "Standard"}</p>
              </div>

              <div className="status">
                ✅ Confirmed
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;