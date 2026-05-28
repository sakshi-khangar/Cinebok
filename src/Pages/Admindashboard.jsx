// // src/Pages/AdminDashboard.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Admin.css";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [bookings, setBookings] = useState([]);
//   const [filterCity, setFilterCity] = useState("All");

//   useEffect(() => {
//     if (!localStorage.getItem("admin")) {
//       navigate("/admin");
//     }
//     const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
//     setBookings(storedBookings);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("admin");
//     navigate("/");
//   };

//   const deleteBooking = (index) => {
//     const updated = bookings.filter((_, i) => i !== index);
//     localStorage.setItem("bookings", JSON.stringify(updated));
//     setBookings(updated);
//   };

//   const filteredBookings =
//     filterCity === "All" ? bookings : bookings.filter((b) => b.city === filterCity);

//   const totalRevenue = filteredBookings.reduce((sum, b) => sum + b.total, 0);
//   const totalSeats = filteredBookings.flatMap((b) => b.seats).length;

//   return (
//     <div className="admin-container">

//       {/* Header */}
//       <div className="dashboard-header">
//         <h2>📊 Admin Dashboard</h2>
//         <button onClick={handleLogout}>Logout</button>
//       </div>

//       {/* Filter */}
//       <div className="filter-row">
//         <label>Filter by City:</label>
//         <select
//           value={filterCity}
//           onChange={(e) => setFilterCity(e.target.value)}
//           className="select"
//         >
//           <option value="All">All Cities</option>
//           <option value="Nagpur">Nagpur</option>
//           <option value="Mumbai">Mumbai</option>
//           <option value="Pune">Pune</option>
//         </select>
//       </div>

//       {/* Stats */}
//       <div className="dashboard-stats">
//         <div className="stat-card">
//           Total Revenue
//           <span className="stat-value">₹{totalRevenue}</span>
//         </div>
//         <div className="stat-card">
//           Total Seats Sold
//           <span className="stat-value">{totalSeats}</span>
//         </div>
//         <div className="stat-card">
//           Total Bookings
//           <span className="stat-value">{filteredBookings.length}</span>
//         </div>
//       </div>

//       {/* Booking Cards */}
//       <h3>All Bookings</h3>

//       {filteredBookings.length === 0 ? (
//         <p style={{ color: "var(--text-muted)" }}>No bookings found</p>
//       ) : (
//         filteredBookings.map((booking, index) => (
//           <div key={index} className="booking-card">
//             <p><strong>Theater:</strong> {booking.theater}</p>
//             <p><strong>City:</strong> {booking.city}</p>
//             <p><strong>Time:</strong> {booking.time}</p>
//             <p><strong>Date:</strong> {booking.date}</p>
//             <p><strong>Seats:</strong> {booking.seats.join(", ")}</p>
//             <p><strong>Total:</strong> ₹{booking.total}</p>
//             <button onClick={() => deleteBooking(index)}>Cancel Booking</button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filterCity, setFilterCity] = useState("All");

  useEffect(() => {
    const admin = localStorage.getItem("admin");

    // 🔐 Protect route
    if (!admin) {
      navigate("/admin"); // login page
      return;
    }

    // 📦 Load bookings safely
    const storedBookings = JSON.parse(
      localStorage.getItem("bookings") || "[]"
    );

    setBookings(storedBookings);
  }, [navigate]);

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  // ❌ Delete booking
  const deleteBooking = (index) => {
    const updated = bookings.filter((_, i) => i !== index);
    localStorage.setItem("bookings", JSON.stringify(updated));
    setBookings(updated);
  };

  // 🔍 Filter
  const filteredBookings =
    filterCity === "All"
      ? bookings
      : bookings.filter((b) => b.city === filterCity);

  // 💰 Revenue safe calculate
  const totalRevenue = filteredBookings.reduce(
    (sum, b) => sum + Number(b.total || 0),
    0
  );

  // 🎟 Seats safe calculate
  const totalSeats = filteredBookings.reduce(
    (sum, b) => sum + (b.seats ? b.seats.length : 0),
    0
  );

  return (
    <div className="admin-container">

      {/* HEADER */}
      <div className="dashboard-header">
        <h2>📊 Admin Dashboard</h2>

       <div className="admin-actions">

  <button
    className="manage-btn"
    onClick={() => navigate("/admin/movies")}
  >
    🎬 Manage Movies
  </button>

  <button
    className="manage-btn events-btn"
    onClick={() => navigate("/admin/events")}
  >
    🎉 Manage Events
  </button>

  <button
  className="manage-btn"
  onClick={() => navigate("/admin/offers")}
>
  🔥 Manage Offers
</button>

  <button
    className="logout-btn"
    onClick={handleLogout}
  >
    Logout
  </button>

</div>
      </div>

      {/* FILTER */}
      <div className="filter-row">
        <label>Filter by City:</label>

        <select
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
          className="select"
        >
          <option value="All">All Cities</option>
          <option value="Nagpur">Nagpur</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
        </select>
      </div>

      {/* STATS */}
      <div className="dashboard-stats">

        <div className="stat-card">
          Total Revenue
          <span className="stat-value">₹{totalRevenue}</span>
        </div>

        <div className="stat-card">
          Total Seats Sold
          <span className="stat-value">{totalSeats}</span>
        </div>

        <div className="stat-card">
          Total Bookings
          <span className="stat-value">
            {filteredBookings.length}
          </span>
        </div>

      </div>

      {/* BOOKINGS */}
      <h3>All Bookings</h3>

      {filteredBookings.length === 0 ? (
        <p style={{ color: "var(--text-muted)" }}>
          No bookings found
        </p>
      ) : (
        filteredBookings.map((booking, index) => (
          <div key={index} className="booking-card">

            <p>
              <strong>Movie:</strong>{" "}
              {
  booking.movieTitle ||
  booking.movie ||
  booking.title ||
  booking.movieName ||
  "Unknown"
}
            </p>

            <p>
              <strong>Theater:</strong>{" "}
              {booking.theater || "N/A"}
            </p>

            <p>
              <strong>City:</strong>{" "}
              {booking.city || "N/A"}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {booking.date || "N/A"}
            </p>

            <p>
              <strong>Time:</strong>{" "}
              {booking.time || "N/A"}
            </p>

            <p>
              <strong>Seats:</strong>{" "}
              {booking.seats
                ? booking.seats.join(", ")
                : "N/A"}
            </p>

            <p>
              <strong>Total:</strong> ₹{booking.total || 0}
            </p>

            <button onClick={() => deleteBooking(index)}>
              Cancel Booking
            </button>

          </div>
        ))
      )}

    </div>
  );
};

export default AdminDashboard;