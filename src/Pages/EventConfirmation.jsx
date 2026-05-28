// src/Pages/EventConfirmation.jsx

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EventConfirmation.css";

function EventConfirmation() {

  const location = useLocation();

  const navigate = useNavigate();

  const booking = location.state;

  if (!booking) {
    navigate("/");
    return null;
  }
  const bookingId =
    "EV" + Math.floor(Math.random() * 1000000);

  return (

    <div className="event-confirmation-page">

      <div className="event-confirmation-card">

        <h1>
          🎉 Event Booking Confirmed
        </h1>

        <img
          src={booking.image}
          alt={booking.title}
          className="confirm-image"
        />
         <div className="confirm-details">

          <p>
            <strong>Booking ID:</strong>
            <span>{bookingId}</span>
          </p>

          <p>
            <strong>Event:</strong>
            <span>{booking.title}</span>
          </p>

          <p>
            <strong>Date:</strong>
            <span>{booking.date}</span>
          </p>

          <p>
            <strong>Location:</strong>
            <span>{booking.location}</span>
          </p>
          <p>
            <strong>Tickets:</strong>
            <span>{booking.tickets}</span>
          </p>

          <p>
            <strong>Total:</strong>
            <span className="confirm-price">
              ₹{booking.total}
            </span>
          </p>

        </div>

        <button
          className="event-home-btn"
          onClick={() => navigate("/")}
        >
          Back To Home
        </button>
         </div>

    </div>

  );
}

export default EventConfirmation;