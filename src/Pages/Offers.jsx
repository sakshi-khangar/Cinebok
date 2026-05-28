// // src/Pages/Offers.jsx

// import React from "react";
// import "./Offers.css";

// const offers = [
//   {
//     id: 1,
//     title: "🎉 First Booking Offer",
//     code: "FIRST50",
//     discount: "Get ₹50 OFF on your first booking",
//     expiry: "Valid till 30 June",
//     color: "#ff4d6d",
//   },
//   {
//     id: 2,
//     title: "💳 HDFC Bank Offer",
//     code: "HDFC20",
//     discount: "20% Cashback using HDFC Cards",
//     expiry: "Weekend Special",
//     color: "#4361ee",
//   },
//   {
//     id: 3,
//     title: "🍿 Combo Offer",
//     code: "COMBO99",
//     discount: "Popcorn + Coke at just ₹99",
//     expiry: "Limited Time",
//     color: "#f59f00",
//   },
//   {
//     id: 4,
//     title: "🎬 Buy 1 Get 1",
//     code: "BOGO",
//     discount: "Buy 1 ticket & Get 1 FREE",
//     expiry: "Friday Only",
//     color: "#12b886",
//   },
// ];

// function Offers() {

//   const copyCode = (code) => {
//     navigator.clipboard.writeText(code);
//     alert(`${code} copied!`);
//   };

//   return (
//     <div className="offers-page">

//       <div className="offers-header">
//         <h1>🔥 Latest Offers</h1>
//         <p>Save more on your movie bookings</p>
//       </div>

//       <div className="offers-container">

//         {offers.map((offer) => (
//           <div
//             key={offer.id}
//             className="offer-card"
//             style={{ borderColor: offer.color }}
//           >

//             <div
//               className="offer-top"
//               style={{ background: offer.color }}
//             >
//               <h2>{offer.title}</h2>
//             </div>

//             <div className="offer-body">

//               <p className="offer-discount">
//                 {offer.discount}
//               </p>

//               <div className="coupon-box">
//                 <span>{offer.code}</span>

//                 <button
//                   onClick={() => copyCode(offer.code)}
//                 >
//                   Copy
//                 </button>
//               </div>

//               <p className="offer-expiry">
//                 ⏳ {offer.expiry}
//               </p>

//             </div>

//           </div>
//         ))}

//       </div>

//     </div>
//   );
// }

// export default Offers;



// src/Pages/Offers.jsx

import React from "react";
import "./Offers.css";

function Offers() {

  // DEFAULT OFFERS

  const defaultOffers = [

    {
      id: 1,
      title: "🎉 First Booking Offer",
      code: "FIRST50",
      discount: "Get ₹50 OFF on your first booking",
      expiry: "Valid till 30 June",
      color: "#ff4d6d",
    },

    {
      id: 2,
      title: "💳 HDFC Bank Offer",
      code: "HDFC20",
      discount: "20% Cashback using HDFC Cards",
      expiry: "Weekend Special",
      color: "#4361ee",
    },

    {
      id: 3,
      title: "🍿 Combo Offer",
      code: "COMBO99",
      discount: "Popcorn + Coke at just ₹99",
      expiry: "Limited Time",
      color: "#f59f00",
    },

    {
      id: 4,
      title: "🎬 Buy 1 Get 1",
      code: "BOGO",
      discount: "Buy 1 ticket & Get 1 FREE",
      expiry: "Friday Only",
      color: "#12b886",
    },

  ];

  // ADMIN OFFERS

  const adminOffers =
    JSON.parse(localStorage.getItem("offers")) || [];

  // MERGE BOTH

  const offers = [
    ...defaultOffers,
    ...adminOffers,
  ];

  const copyCode = (code) => {

    navigator.clipboard.writeText(code);

    alert(`${code} copied!`);
  };

  return (

    <div className="offers-page">

      <div className="offers-header">

        <h1>
          🔥 Latest Offers
        </h1>

        <p>
          Save more on your movie bookings
        </p>

      </div>

      <div className="offers-container">

        {offers.map((offer) => (

          <div
            key={offer.id}
            className="offer-card"
            style={{
              borderColor: offer.color,
            }}
          >

            <div
              className="offer-top"
              style={{
                background: offer.color,
              }}
            >

              <h2>
                {offer.title}
              </h2>

            </div>

            <div className="offer-body">

              <p className="offer-discount">
                {offer.discount}
              </p>

              <div className="coupon-box">

                <span>
                  {offer.code}
                </span>

                <button className="copy-btn"
                  onClick={() =>
                    copyCode(offer.code)
                  }
                >
                  Copy
                </button>

              </div>

              <p className="offer-expiry">
                ⏳ {offer.expiry}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Offers;