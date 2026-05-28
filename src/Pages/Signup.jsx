// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../App.css";

// const Signup = () => {
//   const navigate = useNavigate();

//   // toggle state
//   const [isLogin, setIsLogin] = useState(false);

//   // form states
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // SIGNUP FUNCTION
//   const handleSignup = () => {
//     if (!name || !email || !password) {
//       alert("Please fill all fields");
//       return;
//     }

//     const user = {
//       name,
//       email,
//       password,
//     };

//     localStorage.setItem("user", JSON.stringify(user));

//     alert("Signup successful!");
//     setIsLogin(true);
//   };

//   // LOGIN FUNCTION
//   const handleLogin = () => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));

//     if (
//       storedUser &&
//       email === storedUser.email &&
//       password === storedUser.password
//     ) {
//       alert("Login successful");

//       localStorage.setItem("isLoggedIn", "true");

//       navigate("/");
//     } else {
//       alert("Invalid email or password");
//     }
//   };

//   return (
//     <div className="signup-container">

//       <div className="signup-box">

//         <h2>
//           {isLogin ? "Login" : "Signup"}
//         </h2>

//         {/* Name only for Signup */}
//         {!isLogin && (
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         )}

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {isLogin ? (
//           <button onClick={handleLogin}>
//             Login
//           </button>
//         ) : (
//           <button onClick={handleSignup}>
//             Signup
//           </button>
//         )}

//         <p className="toggle-text">
//           {isLogin
//             ? "Don't have an account?"
//             : "Already have an account?"}

//           <span
//             onClick={() => setIsLogin(!isLogin)}
//           >
//             {isLogin ? " Signup" : " Login"}
//           </span>
//         </p>

//       </div>

//     </div>
//   );
// };

// export default Signup;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Signup = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // SIGNUP FUNCTION
  const handleSignup = () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const user = {
      name,
      email,
      password,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    alert("Signup successful!");

    navigate("/");

    // IMPORTANT: refresh UI
    window.location.reload();
  };

  // LOGIN FUNCTION
  const handleLogin = () => {
    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (
      storedUser &&
      email === storedUser.email &&
      password === storedUser.password
    ) {
      alert("Login successful");

      localStorage.setItem(
        "isLoggedIn",
        "false"
      );

      navigate("/");

      window.location.reload();
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="signup-container">

      <div className="signup-box">

        <h2>
          {isLogin ? "Login" : "Signup"}
        </h2>

        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {isLogin ? (
          <button onClick={handleLogin}>
            Login
          </button>
        ) : (
          <button onClick={handleSignup}>
            Signup
          </button>
        )}

        <p className="toggle-text">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <span
            onClick={() =>
              setIsLogin(!isLogin)
            }
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              color: "#e50914",
              marginLeft: "5px",
            }}
          >
            {isLogin
              ? " Signup"
              : " Login"}
          </span>
        </p>

      </div>

    </div>
  );
};

export default Signup;
