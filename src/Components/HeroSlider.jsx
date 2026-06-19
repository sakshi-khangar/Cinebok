


// // src/Components/HeroSlider.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./HeroSlider.css";

// import chavva1   from "../assets/chva.jpeg";
// import Pushpa2   from "../assets/Pushpa1.png";
// import idiots1   from "../assets/idiots1.jpg";
// import ganapati1 from "../assets/ganapati1.jpg";

// // const slides = [
// //   {
// //     id: 1, title: "Chhava",
// //     genre: "⚔️ Action • Drama",
// //     desc: "The epic story of Chhatrapati Sambhaji Maharaj — a warrior king who never surrendered.",
// //     rating: "9.2", language: "Hindi", year: "2025",
// //     movieId: 1, trailer: "https://youtu.be/77vRyWNqZjM",
// //     image: chavva1,
// //     // Each movie has a custom position to focus on best part of image
// //     bgPos: "center 20%",
// //   },
// //   {
// //     id: 2, title: "Pushpa 2",
// //     genre: "🔥 Action • Thriller",
// //     desc: "The rise continues. Pushpa Raj returns with a vengeance in this explosive sequel.",
// //     rating: "8.1", language: "Hindi", year: "2024",
// //     movieId: 3, trailer: "https://youtu.be/TAKgvZsmEwE",
// //     image: Pushpa2,
// //     bgPos: "center 15%",
// //   },
// //   {
// //     id: 3, title: "3 Idiots",
// //     genre: "🎓 Comedy • Drama",
// //     desc: "All is well! The timeless classic that changed how India thinks about education.",
// //     rating: "9.1", language: "Hindi", year: "2009",
// //     movieId: 5, trailer: "https://youtu.be/K0eDlFX9GMc",
// //     image: idiots1,
// //     bgPos: "center 30%",
// //   },
// //   {
// //     id: 4, title: "Gharat Ganpati",
// //     genre: "🎭 Family • Drama",
// //     desc: "A heartwarming Marathi film celebrating the joy of Ganesh festival and family bonds.",
// //     rating: "9.4", language: "Marathi", year: "2024",
// //     movieId: 23, trailer: "https://youtu.be/IQHCZq73jYk",
// //     image: ganapati1,
// //     bgPos: "center 25%",
// //   },
// // ];

// const [slides, setSlides] = useState([]);

// function HeroSlider({ isLoggedIn }) {
//   const [current, setCurrent] = useState(0);
//   const [animating, setAnimating] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setInterval(() => goSlide((current + 1) % slides.length), 5000);
//     return () => clearInterval(timer);
//   }, [current]);

//   const goSlide = (n) => {
//     if (animating) return;
//     setAnimating(true);
//     setTimeout(() => setAnimating(false), 600);
//     setCurrent(n);
//   };

//   const handleBook = (movieId) => {
//     const loggedIn = isLoggedIn || localStorage.getItem("isLoggedIn") === "true";
//     if (!loggedIn) { navigate("/signup"); return; }
//     navigate(`/theaters/${movieId}`);
//   };

//   const slide = slides[current];

//   return (
//     <div className="hero-scroller">
//       <div
//         className={`hero-slide ${animating ? "animating" : ""}`}
//         style={{
//           backgroundImage: `
//             linear-gradient(
//               90deg,
//               rgba(5,5,20,0.90) 0%,
//               rgba(5,5,20,0.72) 30%,
//               rgba(5,5,20,0.35) 58%,
//               rgba(5,5,20,0.65) 100%
//             ),
//             url(${slide.image})
//           `,
//           backgroundSize: "cover",
//           backgroundPosition: slide.bgPos || "center center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         {/* Extra dark overlay on left for text readability */}
//         <div className="hero-overlay" />

//         {/* Bottom fade into page bg */}
//         <div className="hero-fade" />

//         {/* Content */}
//         <div className="hero-content" key={slide.id}>
//           <div className="hero-genre">{slide.genre}</div>
//           <h1 className="hero-title">{slide.title}</h1>
//           <p className="hero-desc">{slide.desc}</p>
//           <div className="hero-meta">
//             <span className="hero-rating">⭐ {slide.rating}</span>
//             <span className="hero-lang">{slide.language}</span>
//             <span className="hero-year">{slide.year}</span>
//           </div>
//           <div className="hero-btns">
//             <button className="btn-book" onClick={() => handleBook(slide.movieId)}>
//               🎟 Book Now
//             </button>
//             <button className="btn-trailer" onClick={() => window.open(slide.trailer, "_blank")}>
//               ▶ Trailer
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Arrows */}
//       <button className="hero-arrow arrow-left"  onClick={() => goSlide((current - 1 + slides.length) % slides.length)}>‹</button>
//       <button className="hero-arrow arrow-right" onClick={() => goSlide((current + 1) % slides.length)}>›</button>

//       {/* Dots */}
//       <div className="hero-dots">
//         {slides.map((_, i) => (
//           <div key={i} className={`hero-dot ${i === current ? "active" : ""}`} onClick={() => goSlide(i)} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default HeroSlider;


// src/Components/HeroSlider.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HeroSlider.css";

function HeroSlider({ isLoggedIn }) {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const navigate = useNavigate();

  // 🔥 FETCH FROM BACKEND
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/movies/hero")
      .then((res) => {
        const formatted = res.data.map((m) => ({
          id: m.id,
          title: m.title,
          genre: m.genre,
          desc: m.description,
          rating: m.rating,
          language: m.language,
          year: m.releaseDate,
          movieId: m.id,
          image: m.poster, // backend field
          bgPos: "center 20%"
        }));

        setSlides(formatted);
      })
      .catch((err) => console.log(err));
  }, []);

  // 🔥 auto slide
  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      goSlide((current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [current, slides]);

  const goSlide = (n) => {
    if (animating || slides.length === 0) return;

    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);
    setCurrent(n);
  };

  const handleBook = (movieId) => {
    const loggedIn =
      isLoggedIn || localStorage.getItem("isLoggedIn") === "true";

    if (!loggedIn) {
      navigate("/signup");
      return;
    }

    navigate(`/theaters/${movieId}`);
  };

  // 🔥 SAFE CHECK
  if (slides.length === 0) {
    return <div className="hero-scroller">Loading...</div>;
  }

  const slide = slides[current];

  return (
    <div className="hero-scroller">

      {/* SLIDE */}
      <div
        className={`hero-slide ${animating ? "animating" : ""}`}
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(5,5,20,0.90) 0%,
              rgba(5,5,20,0.72) 30%,
              rgba(5,5,20,0.35) 58%,
              rgba(5,5,20,0.65) 100%
            ),
            url(${slide.image})
          `,
          backgroundSize: "cover",
          backgroundPosition: slide.bgPos,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="hero-overlay" />
        <div className="hero-fade" />

        {/* CONTENT */}
        <div className="hero-content" key={slide.id}>
          <div className="hero-genre">{slide.genre}</div>

          <h1 className="hero-title">{slide.title}</h1>

          <p className="hero-desc">
            {slide.desc || "No description available"}
          </p>

          <div className="hero-meta">
            <span className="hero-rating">⭐ {slide.rating}</span>
            <span className="hero-lang">{slide.language}</span>
            <span className="hero-year">{slide.year}</span>
          </div>

          <div className="hero-btns">
            <button
              className="btn-book"
              onClick={() => handleBook(slide.movieId)}
            >
              🎟 Book Now
            </button>

            <button
              className="btn-trailer"
              onClick={() =>
                window.open(
                  "https://www.youtube.com",
                  "_blank"
                )
              }
            >
              ▶ Trailer
            </button>
          </div>
        </div>
      </div>

      {/* ARROWS */}
      <button
        className="hero-arrow arrow-left"
        onClick={() =>
          goSlide((current - 1 + slides.length) % slides.length)
        }
      >
        ‹
      </button>

      <button
        className="hero-arrow arrow-right"
        onClick={() => goSlide((current + 1) % slides.length)}
      >
        ›
      </button>

      {/* DOTS */}
      <div className="hero-dots">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`hero-dot ${i === current ? "active" : ""}`}
            onClick={() => goSlide(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;