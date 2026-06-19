

// src/Components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

function Navbar({ selectedCity, setSelectedCity, selectedLanguage, setSelectedLanguage }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [profileImage, setProfileImage] = useState("");

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const filterRef = useRef(null);
  const searchRef = useRef(null);

  const cities = ["Nagpur", "Mumbai", "Pune"];
  const languages = ["All", "Hindi", "Marathi", "English"];

  // ✅ FIXED SYNC (ONLY IMPORTANT PART FIXED)
  const sync = () => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");

    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    setUser(storedUser);

    // 🔥 FIX: correct image sync
    setProfileImage(storedUser?.profilePic || "");

    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const stored = JSON.parse(localStorage.getItem("notifications") || "[]");

    const bookingNotifs = bookings.map((b, i) => ({
      id: `booking-${i}`,
      icon: "🎟",
      text: `Booking confirmed: ${b.theater} — ${b.time}`,
      time: b.date || "Recently",
    }));

    const merged = [...stored, ...bookingNotifs]
      .reduce((acc, n) => {
        if (!acc.find(x => x.id === n.id)) acc.push(n);
        return acc;
      }, [])
      .slice(0, 10);

    setNotifications(merged);
  };

  useEffect(() => {
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, [location]);

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
      if (filterRef.current && !filterRef.current.contains(e.target)) setShowFilter(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSearch(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleMoviesClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      document.getElementById("movies-section")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById("movies-section")?.scrollIntoView({ behavior: "smooth" });
      }, 450);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setProfileImage(""); // 🔥 FIX
    setShowProfile(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

  return (
    <nav className="navbar">

      <Link to="/" className="nav-logo">
        <span className="logo-icon">🎬</span>
        <span className="logo-text">CineBook</span>
      </Link>

      <ul className="nav-links">
        <li>
          <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
            Home
          </Link>
        </li>
        <li>
          <a href="#movies-section" className="nav-link" onClick={handleMoviesClick}>
            Movies
          </a>
        </li>
        <li>
          <Link to="/offers" className={`nav-link ${isActive("/offers") ? "active" : ""}`}>
            Offers
          </Link>
        </li>
        <li>
          <Link to="/events" className={`nav-link ${isActive("/events") ? "active" : ""}`}>
            Events
          </Link>
        </li>
      </ul>

      <div className="nav-right">

        {/* SEARCH */}
        <div className="search-wrapper" ref={searchRef}>
          <button className="icon-btn" onClick={() => setShowSearch(!showSearch)}>🔍</button>
          {showSearch && (
            <form className="search-dropdown" onSubmit={handleSearch}>
              <input
                autoFocus
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input-dropdown"
              />
              <button type="submit" className="search-go-btn">Go</button>
            </form>
          )}
        </div>

        {/* FILTER (UNCHANGED) */}
        <div className="filter-wrapper" ref={filterRef}>
          <button className="icon-btn filter-btn" onClick={() => setShowFilter(!showFilter)}>
            📍 <span className="filter-label">{selectedCity}</span>
            <span className="filter-caret">▾</span>
          </button>

          {showFilter && (
            <div className="filter-dropdown">
              <p className="filter-section-title">📍 City</p>
              <div className="filter-chips">
                {cities.map((c) => (
                  <button
                    key={c}
                    className={`filter-chip ${selectedCity === c ? "active" : ""}`}
                    onClick={() => {
                      setSelectedCity(c);
                      localStorage.setItem("selectedCity", c);
                      setShowFilter(false);
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <p className="filter-section-title">🌐 Language</p>

              <div className="filter-chips">
                {languages.map((l) => (
                  <button
                    key={l}
                    className={`filter-chip ${selectedLanguage === l ? "active" : ""}`}
                    onClick={() => {
                      setSelectedLanguage(l);
                      localStorage.setItem("selectedLanguage", l);
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* THEME */}
        {/* <button className="icon-btn" onClick={toggleTheme}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button> */}

        {/* ADMIN */}
        <Link to="/admin" className="admin-link">Admin</Link>
             {/* THEME */}
        <button className="icon-btn" onClick={toggleTheme}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {/* PROFILE (FIXED IMAGE) */}
        <div className="profile-wrapper" ref={profileRef}>
          <img
            src={
              profileImage
                ? profileImage
                : `https://i.pravatar.cc/40?u=${user?.name || "guest"}`
            }
            alt="profile"
            className="profile-avatar"
            onClick={() => setShowProfile(!showProfile)}
          />

          {showProfile && (
            <div className="profile-dropdown">
              {isLoggedIn ? (
                <>
                  <div className="profile-info">
                    <img
                      src={
                        profileImage
                          ? profileImage
                          : `https://i.pravatar.cc/48?u=${user?.name || "guest"}`
                      }
                      className="profile-big-avatar"
                      alt="av"
                    />
                    <div>
                      <p className="profile-name">{user?.name || "User"}</p>
                      <p className="profile-email">{user?.email || ""}</p>
                    </div>
                  </div>

                  <hr className="profile-divider" />

                  <button
                    className="profile-menu-item"
                    onClick={() => {
                      navigate("/profile");
                      setShowProfile(false);
                    }}
                  >
                    👤 My Profile
                  </button>

                  <hr className="profile-divider" />

                  <button className="profile-logout-btn" onClick={handleLogout}>
                    🚪 Logout
                  </button>
                </>
              ) : (
                <button
                  className="profile-login-btn"
                  onClick={() => navigate("/signup")}
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;