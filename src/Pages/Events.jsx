// // src/Pages/Events.jsx

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./Events.css";

// function Events() {
//   const navigate = useNavigate();
//   const events = [

//     {
//       id: 1,
//       title: "Arijit Singh Live Concert",
//       category: "Music Concert",
//       date: "12 June 2026",
//       location: "Nagpur Stadium",
//       price: "₹1499",
//       image:
//         "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop",
//     },

//     {
//       id: 2,
//       title: "Stand-Up Comedy Night",
//       category: "Comedy Show",
//       date: "18 June 2026",
//       location: "PVR Auditorium",
//       price: "₹799",
//       image:
//         "https://images.unsplash.com/photo-1527224857830-43a7acc85260?q=80&w=1200&auto=format&fit=crop",
//     },

//     {
//       id: 3,
//       title: "IPL Final Live Screening",
//       category: "Sports Event",
//       date: "22 June 2026",
//       location: "CineBook Arena",
//       price: "₹499",
//       image:
//         "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1200&auto=format&fit=crop",
//     },

//     {
//       id: 4,
//       title: "DJ Neon Party",
//       category: "Night Party",
//       date: "29 June 2026",
//       location: "Downtown Club",
//       price: "₹999",
//       image:
//         "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop",
//     },

//   ];

//   return (

//     <div className="events-page">

//       {/* HEADER */}

//       <div className="events-header">

//         <h1>
//           🎉 Upcoming Events
//         </h1>

//         <p>
//           Book tickets for concerts, comedy, sports & more
//         </p>

//       </div>

//       {/* EVENTS GRID */}

//       <div className="events-grid">

//         {events.map((event) => (

//           <div
//             className="event-card"
//             key={event.id}
//           >

//             {/* IMAGE */}

//             <div className="event-image-wrapper">

//               <img
//                 src={event.image}
//                 alt={event.title}
//                 className="event-image"
//               />

//               <span className="live-badge">
//                 LIVE
//               </span>

//             </div>

//             {/* CONTENT */}

//             <div className="event-content">

//               <span className="event-category">
//                 {event.category}
//               </span>

//               <h2 className="event-title">
//                 {event.title}
//               </h2>

//               <div className="event-info">

//                 <p>
//                   📅 {event.date}
//                 </p>

//                 <p>
//                   📍 {event.location}
//                 </p>

//               </div>

//               <div className="event-footer">

//                 <span className="event-price">
//                   {event.price}
//                 </span>

//                 <button
//   className="book-btn"
//   onClick={() =>
//     navigate("/event-booking", {
//       state: event,
//     })
//   }
// >
//   Book Now
// </button>

//               </div>

//             </div>

//           </div>

//         ))}

//       </div>

//     </div>

//   );
// }

// export default Events;





// src/Pages/Events.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import "./Events.css";

function Events() {

  const navigate = useNavigate();

  // DEFAULT EVENTS

  const defaultEvents = [

    {
      id: 1,
      title: "Arijit Singh Live Concert",
      category: "Music Concert",
      date: "12 June 2026",
      location: "Nagpur Stadium",
      price: "₹1499",
      image:
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: 2,
      title: "Stand-Up Comedy Night",
      category: "Comedy Show",
      date: "18 June 2026",
      location: "PVR Auditorium",
      price: "₹799",
      image:
        "https://images.unsplash.com/photo-1527224857830-43a7acc85260?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: 3,
      title: "IPL Final Live Screening",
      category: "Sports Event",
      date: "22 June 2026",
      location: "CineBook Arena",
      price: "₹499",
      image:
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: 4,
      title: "DJ Neon Party",
      category: "Night Party",
      date: "29 June 2026",
      location: "Downtown Club",
      price: "₹999",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop",
    },

  ];

  // ADMIN ADDED EVENTS

  const adminEvents =
    JSON.parse(localStorage.getItem("events")) || [];

  // MERGE BOTH

  const events = [
    ...defaultEvents,
    ...adminEvents,
  ];

  return (

    <div className="events-page">

      {/* HEADER */}

      <div className="events-header">

        <h1>
          🎉 Upcoming Events
        </h1>

        <p>
          Book tickets for concerts, comedy, sports & more
        </p>

      </div>

      {/* EVENTS GRID */}

      <div className="events-grid">

        {events.map((event) => (

          <div
            className="event-card"
            key={event.id}
          >

            {/* IMAGE */}

            <div className="event-image-wrapper">

              <img
                src={event.image}
                alt={event.title}
                className="event-image"
              />

              <span className="live-badge">
                LIVE
              </span>

            </div>

            {/* CONTENT */}

            <div className="event-content">

              <span className="event-category">
                {event.category}
              </span>

              <h2 className="event-title">
                {event.title}
              </h2>

              <div className="event-info">

                <p>
                  📅 {event.date}
                </p>

                <p>
                  📍 {event.location}
                </p>

              </div>

              <div className="event-footer">

                <span className="event-price">
                  {event.price}
                </span>

                <button
                  className="book-btn"
                  onClick={() =>
                    navigate("/event-booking", {
                      state: event,
                    })
                  }
                >
                  Book Now
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Events;