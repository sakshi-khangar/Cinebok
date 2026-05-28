// src/Pages/SeatSelection.jsx

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SeatSelection.css";

const SeatSelection = () => {

  const location = useLocation();

  const navigate = useNavigate();

  const { theater, time } = location.state || {};

  const movie = location.state?.movie;

  const [selectedSeats, setSelectedSeats] = useState([]);

  const seatLayout = [
    { row: "A", type: "silver", price: 150 },
    { row: "B", type: "silver", price: 150 },
    { row: "C", type: "gold", price: 250 },
    { row: "D", type: "gold", price: 250 },
    { row: "E", type: "platinum", price: 400 },
  ];

  if (!theater || !time) {
    return (
      <h2
        style={{
          padding: "40px",
          color: "var(--text)",
        }}
      >
        No show selected
      </h2>
    );
  }

  const storedBookings =
    JSON.parse(localStorage.getItem("bookings")) || [];

  const bookedSeats = storedBookings
    .filter(
      (b) =>
        b.theater === theater.name &&
        b.time === time
    )
    .flatMap((b) => b.seats || []);

  const toggleSeat = (seatId) => {

    if (bookedSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {

      setSelectedSeats(
        selectedSeats.filter((s) => s !== seatId)
      );

    } else {

      if (selectedSeats.length >= 4) {
        alert("Maximum 4 seats allowed!");
        return;
      }

      setSelectedSeats([
        ...selectedSeats,
        seatId,
      ]);

    }
  };

  const calculateTotal = () => {

    let total = 0;

    selectedSeats.forEach((seat) => {

      const row = seat.charAt(0);

      const foundRow = seatLayout.find(
        (r) => r.row === row
      );

      total += foundRow.price;

    });

    return total;
  };

  const handleConfirm = () => {

    if (selectedSeats.length === 0) {
      alert("Please select at least 1 seat");
      return;
    }

    // ✅ Movie Name Fix
    const movieName =
      movie?.title ||
      movie?.name ||
      movie ||
      "Unknown Movie";

    const bookingData = {
      movie: movieName,
      theater: theater.name,
      city: theater.city,
      time,
      seats: selectedSeats,
      total: calculateTotal(),
      date: new Date().toLocaleString(),
    };

    const oldBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    localStorage.setItem(
      "bookings",
      JSON.stringify([
        ...oldBookings,
        bookingData,
      ])
    );

    navigate("/confirmation", {

      state: {

        movie: movieName,

        theater:
          theater.name +
          " - " +
          theater.city,

        city: theater.city,

        time,

        selectedSeats,

        total: calculateTotal(),

      },

    });

  };

  return (
    <div className="seat-container">

      <h2>🎟 Select Your Seats</h2>

      <div className="seat-info">

        <p>
          <strong>Theater:</strong>
          {" "}
          {theater.name} — {theater.city}
        </p>

        <p>
          <strong>Show Time:</strong>
          {" "}
          {time}
        </p>

      </div>

      <div className="screen-wrapper">
        <div className="screen">
          SCREEN
        </div>
      </div>

      <div className="hall">

        {seatLayout.map((rowData, rowIndex) => (

          <div
            key={rowIndex}
            className="seat-row"
          >

            <span className="row-label">
              {rowData.row}
            </span>

            {[...Array(8)].map((_, i) => {

              const seatId =
                rowData.row + (i + 1);

              const isSelected =
                selectedSeats.includes(seatId);

              const isBooked =
                bookedSeats.includes(seatId);

              return (

                <div
                  key={seatId}
                  className={`seat ${rowData.type} ${
                    isSelected
                      ? "selected"
                      : ""
                  } ${
                    isBooked
                      ? "booked"
                      : ""
                  }`}
                  onClick={() =>
                    toggleSeat(seatId)
                  }
                >
                  {!isBooked && (i + 1)}
                </div>

              );

            })}

          </div>

        ))}

      </div>

      <div className="legend">

        <div>
          <span className="box silver"></span>
          Silver ₹150
        </div>

        <div>
          <span className="box gold"></span>
          Gold ₹250
        </div>

        <div>
          <span className="box platinum"></span>
          Platinum ₹400
        </div>

        <div>
          <span className="box booked"></span>
          Booked
        </div>

      </div>

      {selectedSeats.length > 0 && (

        <div className="booking-summary">

          <h3>
            Selected Seats
            {" "}
            <span>
              {selectedSeats.join(", ")}
            </span>
          </h3>

          <div className="total-price">
            ₹{calculateTotal()}
          </div>

          <button
            className="confirm-btn"
            onClick={handleConfirm}
          >
            ✅ Confirm Booking
          </button>

        </div>

      )}

    </div>
  );
};

export default SeatSelection;