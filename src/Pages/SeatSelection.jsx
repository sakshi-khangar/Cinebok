// src/Pages/SeatSelection.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SeatSelection.css";

const SeatSelection = () => {

  const location = useLocation();

  const navigate = useNavigate();

  const { theater, time } = location.state || {};

  const movie = location.state?.movie;

const [selectedSeats, setSelectedSeats] = useState([]);
const [bookedSeats, setBookedSeats] = useState([]);

  const seatLayout = [
    { row: "A", type: "silver", price: 150 },
    { row: "B", type: "silver", price: 150 },
    { row: "C", type: "gold", price: 250 },
    { row: "D", type: "gold", price: 250 },
    { row: "E", type: "platinum", price: 400 },
  ];

useEffect(() => {

  if (!theater || !time) return;

  axios
    .get(
      `http://localhost:8080/api/bookings/${theater.id}/${time}`
    )
    .then((response) => {

      const seats = response.data.map(
        (b) => b.seatNumber
      );

      setBookedSeats(seats);

    })
    .catch((error) => {
      console.log(error);
    });

}, [theater, time]);


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

  const handleConfirm = async () => {

  if (selectedSeats.length === 0) {
    alert("Please select at least 1 seat");
    return;
  }

  const movieName =
    movie?.title ||
    movie?.name ||
    movie ||
    "Unknown Movie";

  try {

    await Promise.all(

  selectedSeats.map((seat) =>
    axios.post(
      "http://localhost:8080/api/bookings",
      {
        theaterId: theater.id,
        showTime: time,
        seatNumber: seat,
      }
    )
  )

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

  } catch (error) {

    console.log(error);

    alert(
      "Some seats are already booked. Please refresh and try again."
    );

  }

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