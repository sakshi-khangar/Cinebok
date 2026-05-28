// src/Pages/AdminOffers.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminMovies.css";

const AdminOffers = () => {

  const navigate = useNavigate();

  const [offers, setOffers] = useState([]);

  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiry, setExpiry] = useState("");
  const [color, setColor] = useState("#ff4d6d");

  const [editId, setEditId] = useState(null);

  useEffect(() => {

    const savedOffers =
      JSON.parse(localStorage.getItem("offers")) || [];

    setOffers(savedOffers);

  }, []);

  // ADD / UPDATE OFFER

  const handleAddOrUpdateOffer = () => {

    if (
      !title ||
      !code ||
      !discount ||
      !expiry
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {

      const updatedOffers = offers.map((offer) =>
        offer.id === editId
          ? {
              ...offer,
              title,
              code,
              discount,
              expiry,
              color,
            }
          : offer
      );

      setOffers(updatedOffers);

      localStorage.setItem(
        "offers",
        JSON.stringify(updatedOffers)
      );

      alert("Offer Updated ✅");

      setEditId(null);

    } else {

      const newOffer = {
        id: Date.now(),
        title,
        code,
        discount,
        expiry,
        color,
      };

      const updatedOffers = [
        ...offers,
        newOffer,
      ];

      setOffers(updatedOffers);

      localStorage.setItem(
        "offers",
        JSON.stringify(updatedOffers)
      );

      alert("Offer Added ✅");
    }

    // RESET

    setTitle("");
    setCode("");
    setDiscount("");
    setExpiry("");
    setColor("#ff4d6d");
  };

  // DELETE

  const handleDeleteOffer = (id) => {

    const confirmDelete = window.confirm(
      "Delete this offer?"
    );

    if (!confirmDelete) return;

    const updatedOffers = offers.filter(
      (offer) => offer.id !== id
    );

    setOffers(updatedOffers);

    localStorage.setItem(
      "offers",
      JSON.stringify(updatedOffers)
    );
  };

  // EDIT

  const handleEditOffer = (offer) => {

    setEditId(offer.id);

    setTitle(offer.title);
    setCode(offer.code);
    setDiscount(offer.discount);
    setExpiry(offer.expiry);
    setColor(offer.color);
  };

  return (

    <div className="admin-container">

      {/* HEADER */}

      <div className="admin-header">

        <h1 className="admin-title">
          🔥 Manage Offers
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
            placeholder="Offer Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="form-input input-medium"
          />

          <input
            type="text"
            placeholder="Coupon Code"
            value={code}
            onChange={(e) =>
              setCode(e.target.value.toUpperCase())
            }
            className="form-input"
          />

          <input
            type="text"
            placeholder="Discount Details"
            value={discount}
            onChange={(e) =>
              setDiscount(e.target.value)
            }
            className="form-input input-large"
          />

          <input
            type="text"
            placeholder="Expiry"
            value={expiry}
            onChange={(e) =>
              setExpiry(e.target.value)
            }
            className="form-input"
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >

            <label
              style={{
                fontWeight: "600",
                color: "var(--text)",
              }}
            >
              Color
            </label>

            <input
              type="color"
              value={color}
              onChange={(e) =>
                setColor(e.target.value)
              }
              style={{
                width: "50px",
                height: "40px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            />

          </div>

          <button
            onClick={handleAddOrUpdateOffer}
            className="add-btn"
          >
            {editId
              ? "Update Offer"
              : "Add Offer"}
          </button>

        </div>

      </div>

      {/* OFFERS */}

      <h2 className="section-title">
        Added Offers
      </h2>

      {offers.length === 0 ? (

        <p>No offers added</p>

      ) : (

        <div className="movies-grid">

          {offers.map((offer) => (

            <div
              key={offer.id}
              className="movie-card"
              style={{
                borderTop: `5px solid ${offer.color}`,
              }}
            >

              <div className="movie-info">

                <h3 className="movie-title">
                  {offer.title}
                </h3>

                <p className="movie-meta">
                  🎟 Code: {offer.code}
                </p>

                <p className="movie-meta">
                  💰 {offer.discount}
                </p>

                <p className="movie-meta">
                  ⏳ {offer.expiry}
                </p>

                <div className="button-group">

                  <button
                    onClick={() =>
                      handleEditOffer(offer)
                    }
                    className="edit-btn"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteOffer(offer.id)
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

export default AdminOffers;