// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Auth.css";

// const Auth = () => {
//   const navigate = useNavigate();

//   const [isLogin, setIsLogin] = useState(true);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // SIGNUP
//   const handleSignup = () => {
//     if (!name || !email || !password) {
//       alert("Please fill all fields");
//       return;
//     }

//     const user = {
//       name,
//       email,
//       password
//     };

//     localStorage.setItem("user", JSON.stringify(user));

//     alert("Signup successful! Please login");
//     setIsLogin(true);
//   };

//   // LOGIN
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
//     <div className="auth-container">

//       <div className="auth-box">

//         <h2>
//           {isLogin ? "Login" : "Register"}
//         </h2>

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
//             Register
//           </button>
//         )}

//         <p className="toggle-text">
//           {isLogin
//             ? "Don't have an account?"
//             : "Already have an account?"}

//           <span
//             onClick={() => setIsLogin(!isLogin)}
//           >
//             {isLogin ? " Register" : " Login"}
//           </span>
//         </p>

//       </div>

//     </div>
//   );
// };

// export default Auth;
