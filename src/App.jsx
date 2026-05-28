// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import TheaterSelection from "./Pages/TheaterSelection";
import SeatSelection from "./Pages/SeatSelection";
import Confirmation from "./Pages/Confirmation";
import AdminDashboard from "./Pages/Admindashboard";
import AdminLogin from "./Pages/Adminlogin";
import AdminMovies from "./Pages/AdminMovies";
import Offers from "./Pages/Offers";
import Events from "./Pages/Events";
import MyProfile from "./Pages/MyProfile";
import EventConfirmation from "./Pages/EventConfirmation";
import EventBooking from "./Pages/EventBooking";
import AdminEvents from "./Pages/AdminEvents";
import AdminOffers from "./Pages/AdminOffers";

// import MyBookings from "./Pages/MyBookings";







function App() {
  const [isLoggedIn, setIsLoggedIn]             = useState(false);
  const [userName, setUserName]                 = useState("");
  const [selectedCity, setSelectedCity]         = useState("Nagpur");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [searchTerm, setSearchTerm]             = useState("");

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar
          isLoggedIn={isLoggedIn}
          userName={userName}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <Routes>
          <Route path="/"                element={<Home isLoggedIn={isLoggedIn} selectedCity={selectedCity} selectedLanguage={selectedLanguage} searchTerm={searchTerm} />} />
          <Route path="/signup"          element={<Signup setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />} />
          <Route path="/theaters/:id"    element={<TheaterSelection isLoggedIn={isLoggedIn} />} />
          <Route path="/seats"           element={<SeatSelection />} />
          <Route path="/confirmation"    element={<Confirmation />} />
          <Route path="/admin"           element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/movies"    element={<AdminMovies />} />
          
      <Route path="/offers" element={<Offers />} />

      
    <Route path="/events" element={<Events />} />
    <Route path="/event-booking" element={<EventBooking />} />
    <Route
  path="/event-confirmation"
  element={<EventConfirmation />}
/>

<Route
  path="/admin/events"
  element={<AdminEvents />}
/>
<Route
  path="/admin/offers"
  element={<AdminOffers />}
/>

    <Route path="/profile" element={<MyProfile />} />

   
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
