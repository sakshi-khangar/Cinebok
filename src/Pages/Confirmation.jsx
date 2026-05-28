// src/Pages/Confirmation.jsx

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Confirmation.css";

const Confirmation = () => {

  const location = useLocation();

  const navigate = useNavigate();

  // ✅ GET DATA
  const bookingData = location.state;

  // ✅ Redirect if no data
  if (!bookingData) {
    navigate("/");
    return null;
  }

  const {
    movie,
    theater,
    city,
    time,
    selectedSeats,
    total,
  } = bookingData;

  // ✅ Movie Name Fix
  const movieName =
    typeof movie === "object"
      ? movie.title || movie.name
      : movie;

  // ✅ Booking ID
  const bookingId =
    "BK" + Math.floor(Math.random() * 1000000);

  // ✅ Date
  const date =
    new Date().toLocaleString();

  // ✅ COUPON STATES
  const [coupon, setCoupon] = useState("");

  const [discount, setDiscount] = useState(0);

  const [appliedCoupon, setAppliedCoupon] = useState("");

  // ✅ APPLY COUPON
  const applyCoupon = () => {

    const code = coupon.toUpperCase();

    if (appliedCoupon) {
      alert("Coupon already applied!");
      return;
    }

    if (code === "FIRST50") {
      setDiscount(50);
      setAppliedCoupon(code);
      alert("₹50 Discount Applied!");
    }

    else if (code === "HDFC20") {
      setDiscount(100);
      setAppliedCoupon(code);
      alert("₹100 Cashback Applied!");
    }

    else if (code === "COMBO99") {
      setDiscount(80);
      setAppliedCoupon(code);
      alert("Snack Combo Discount Applied!");
    }

    else if (code === "BOGO") {
      setDiscount(150);
      setAppliedCoupon(code);
      alert("Buy 1 Get 1 Offer Applied!");
    }

    else if (code === "UPI100") {
      setDiscount(100);
      setAppliedCoupon(code);
      alert("UPI Cashback Applied!");
    }

    else {
      alert("Invalid Coupon Code");
    }

  };

  // ✅ FINAL PRICE
  const finalTotal = total - discount;

  return (

    <div className="confirmation-container">

      <div className="confirmation-card">

        <h2 className="success-text">
          🎉 Booking Confirmed!
        </h2>

        {/* COUPON SECTION */}

        <div className="coupon-section">

          <h3>
            🎁 Apply Offer Coupon
          </h3>

          <div className="coupon-box">

            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="coupon-input"
            />

            <button
              className="apply-btn"
              onClick={applyCoupon}
            >
              Apply
            </button>

          </div>

          {appliedCoupon && (
            <p className="coupon-success">
              ✅ Coupon Applied:
              <strong> {appliedCoupon}</strong>
            </p>
          )}

        </div>

        {/* TICKET DETAILS */}

        <div className="ticket-details">

          <p>
            <strong>Booking ID:</strong>
            <span>{bookingId}</span>
          </p>

          <p>
            <strong>Movie:</strong>
            <span>{movieName}</span>
          </p>

          <p>
            <strong>Theater:</strong>
            <span>{theater}</span>
          </p>

          <p>
            <strong>City:</strong>
            <span>{city}</span>
          </p>

          <p>
            <strong>Date:</strong>
            <span>{date}</span>
          </p>

          <p>
            <strong>Show Time:</strong>
            <span>{time}</span>
          </p>

          <p>
            <strong>Seats:</strong>
            <span className="seats-value">
              {selectedSeats?.join(", ")}
            </span>
          </p>

          <p>
            <strong>Original Amount:</strong>
            <span>₹{total}</span>
          </p>

          <p>
            <strong>Discount:</strong>
            <span className="discount-price">
              - ₹{discount}
            </span>
          </p>

          <p className="total-amount">
            <strong>Final Amount:</strong>
            <strong>₹{finalTotal}</strong>
          </p>

        </div>

        {/* BUTTONS */}

        <div className="confirmation-buttons">

          <button
            className="home-btn"
            onClick={() => navigate("/")}
          >
            Back To Home
          </button>

          <button
            className="download-btn"
            onClick={() => window.print()}
          >
            Download Ticket
          </button>

        </div>

      </div>

    </div>

  );
};

export default Confirmation;