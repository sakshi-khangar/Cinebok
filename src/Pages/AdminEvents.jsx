import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminMovies.css";

const AdminEvents = () => {

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Music Concert");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const [editId, setEditId] = useState(null);

  useEffect(() => {

    const savedEvents =
      JSON.parse(localStorage.getItem("events")) || [];

    setEvents(savedEvents);

  }, []);

  // ADD / UPDATE EVENT

  const handleAddOrUpdate = () => {

    if (
      !title ||
      !date ||
      !location ||
      !price ||
      !image
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {

      const updatedEvents = events.map((event) =>
        event.id === editId
          ? {
              ...event,
              title,
              category,
              date,
              location,
              price: `₹${price}`,
              image,
            }
          : event
      );

      setEvents(updatedEvents);

      localStorage.setItem(
        "events",
        JSON.stringify(updatedEvents)
      );

      alert("Event Updated ✅");

      setEditId(null);

    } else {

      const newEvent = {
        id: Date.now(),
        title,
        category,
        date,
        location,
        price: `₹${price}`,
        image,
      };

      const updatedEvents = [...events, newEvent];

      setEvents(updatedEvents);

      localStorage.setItem(
        "events",
        JSON.stringify(updatedEvents)
      );

      alert("Event Added ✅");
    }

    // RESET

    setTitle("");
    setCategory("Music Concert");
    setDate("");
    setLocation("");
    setPrice("");
    setImage("");
  };

  // DELETE

  const handleDelete = (id) => {

    const confirmDelete =
      window.confirm("Delete this event?");

    if (!confirmDelete) return;

    const updatedEvents = events.filter(
      (event) => event.id !== id
    );

    setEvents(updatedEvents);

    localStorage.setItem(
      "events",
      JSON.stringify(updatedEvents)
    );
  };

  // EDIT

  const handleEdit = (event) => {

    setEditId(event.id);

    setTitle(event.title);
    setCategory(event.category);
    setDate(event.date);
    setLocation(event.location);
    setPrice(event.price.replace("₹", ""));
    setImage(event.image);
  };

  return (

    <div className="admin-container">

      {/* HEADER */}

      <div className="admin-header">

        <h1 className="admin-title">
          🎉 Manage Events
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="back-btn"
        >
          Back
        </button>

      </div>

      {/* FORM */}

      <div className="form-container">

        <div className="form-grid">

          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="form-input input-medium"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="form-select"
          >
            <option>Music Concert</option>
            <option>Comedy Show</option>
            <option>Sports Event</option>
            <option>Night Party</option>
            <option>Festival</option>
          </select>

          <input
            type="text"
            placeholder="Date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="form-input"
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            className="form-input"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="form-input input-small"
          />

          <input
            type="text"
            placeholder="Event Image URL"
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
            className="form-input input-large"
          />

          <button
            onClick={handleAddOrUpdate}
            className="add-btn"
          >
            {editId
              ? "Update Event"
              : "Add Event"}
          </button>

        </div>

      </div>

      {/* EVENTS */}

      <h2 className="section-title">
        Added Events
      </h2>

      {events.length === 0 ? (

        <p>No events added</p>

      ) : (

        <div className="movies-grid">

          {events.map((event) => (

            <div
              key={event.id}
              className="movie-card"
            >

              <img
                src={event.image}
                alt={event.title}
                className="movie-poster"
              />

              <div className="movie-info">

                <h3 className="movie-title">
                  {event.title}
                </h3>

                <p className="movie-meta">
                  🎭 {event.category}
                </p>

                <p className="movie-meta">
                  📍 {event.location}
                </p>

                <p className="movie-meta">
                  📅 {event.date}
                </p>

                <p className="movie-rating">
                  {event.price}
                </p>

                <div className="button-group">

                  <button
                    onClick={() =>
                      handleEdit(event)
                    }
                    className="edit-btn"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(event.id)
                    }
                    className="delete-btn"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default AdminEvents;