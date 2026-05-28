// src/Pages/EventBooking.jsx

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EventBooking.css";

function EventBooking() {

  const location = useLocation();

  const navigate = useNavigate();

  const event = location.state;

  const [tickets, setTickets] = useState(1);

  if (!event) {
    navigate("/");
    return null;
  }

  const numericPrice = Number(
    event.price.replace("₹", "")
  );

  const total = numericPrice * tickets;

  const handleBooking = () => {

    navigate("/event-confirmation", {
      state: {
        ...event,
        tickets,
        total,
      },
    });
 };

  return (

    <div className="event-booking-page">

      <div className="event-booking-card">

        <img
          src={event.image}
          alt={event.title}
          className="booking-image"
        />

        <div className="booking-content">

          <span className="booking-category">
            {event.category}
          </span>

          <h1> {event.title}
          </h1>

          <p>
            📅 {event.date}
          </p>

          <p>
            📍 {event.location}
          </p>
          <div className="ticket-section">

            <label>
              Select Tickets
            </label>

            <select
              value={tickets}
              onChange={(e) =>
                setTickets(Number(e.target.value))
              }
            >
              <option value={1}>1 Ticket</option>
              <option value={2}>2 Tickets</option>
              <option value={3}>3 Tickets</option>
              <option value={4}>4 Tickets</option>
              <option value={5}>5 Tickets</option>
            </select>

          </div>

          <div className="booking-footer">

            <h2>
              Total: ₹{total}
            </h2>

            <button
              className="confirm-btn"
              onClick={handleBooking}
            >
              Confirm Booking
            </button>

          </div>

        </div>

      </div>

    </div>
     );
}

export default EventBooking;