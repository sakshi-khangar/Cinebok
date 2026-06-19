

// src/Pages/TheaterSelection.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./TheaterSelection.css";

// const theaters = [
//   // Nagpur
//   {
//     id: 1,
//     name: "PVR Cinemas",
//     city: "Nagpur",
//     timings: ["10:00 AM", "1:00 PM"],
//   },
//   {
//     id: 2,
//     name: "Cinepolis",
//     city: "Nagpur",
//     timings: ["2:30 PM", "6:00 PM"],
//   },
//   {
//     id: 3,
//     name: "INOX",
//     city: "Nagpur",
//     timings: ["9:00 PM"],
//   },

//   // Mumbai
//   {
//     id: 4,
//     name: "Cinepolis: Lake Shore, Thane (EX Viviana Mall)",
//     city: "Mumbai",
//     timings: ["11:00 AM", "3:00 PM"],
//   },
//   {
//     id: 5,
//     name: "INOX Megaplex: Sky City Mall, Borivali",
//     city: "Mumbai",
//     timings: ["5:00 PM", "8:30 PM"],
//   },

//   // Pune
//   {
//     id: 6,
//     name: "PVR ICON | Pavilion Mall",
//     city: "Pune",
//     timings: ["12:00 PM", "4:00 PM"],
//   },
//   {
//     id: 7,
//     name: "City Pride Mangala Multiplex",
//     city: "Pune",
//     timings: ["7:00 PM", "9:00 AM"],
//   },
// ];


const TheaterSelection = () => {

  const [theaters, setTheaters] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();

  const location = useLocation();


useEffect(() => {
  axios
    .get("http://localhost:8080/api/theaters")
    .then((response) => {
      console.log("API DATA:", response.data); // ✔️ HERE
      setTheaters(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}, []);

  // ✅ FULL MOVIE OBJECT
// ✅ FULL MOVIE OBJECT
const movie = location.state?.movie;

// movie city first priority
const selectedCity =
  movie?.city ||
  localStorage.getItem("selectedCity") ||
  "Nagpur";

const filteredTheaters = theaters.filter(
  (t) =>
    t.city?.toLowerCase() ===
    selectedCity?.toLowerCase()
);

  const handleTimeSelect = (theater, time) => {

    navigate("/seats", {
      state: {
        movie: movie, // ✅ important
        theater: theater,
        time: time,
      },
    });

  };

  return (
    <div className="theater-container">

      <h2 className="theater-title">
        🎬 Select Theater & Time
      </h2>

      {filteredTheaters.length === 0 ? (

        <p className="no-theater">
          No theaters available in {selectedCity}
        </p>

      ) : (

        filteredTheaters.map((theater) => (

          <div
            key={theater.id}
            className="theater-card"
          >

            <h3>
              {theater.name} — {theater.city}
            </h3>


{Array.isArray(theater.timings) && theater.timings.length > 0 ? (
  theater.timings.map((time, index) => (
    <button
      key={index}
      className="time-btn"
      onClick={() => handleTimeSelect(theater, time)}
    >
      {time}
    </button>
  ))
) : (
  <p>No timings available</p>
)}

          </div>

        ))

      )}

    </div>
  );
};

export default TheaterSelection;