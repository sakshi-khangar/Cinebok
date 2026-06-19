import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Signup = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
const [forgotEmail, setForgotEmail] = useState("");
const [newPassword, setNewPassword] = useState("");

  // SIGNUP FUNCTION

  const handleSignup = async () => {

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {

    const response = await axios.post(
      "http://localhost:8080/api/auth/register",
      {
        name,
        email,
        password,
      }
    );

    localStorage.setItem(
      "user",
      JSON.stringify(response.data)
    );

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    alert("Signup successful");

    navigate("/");

    window.location.reload();

  } catch (error) {

    alert(
      error.response?.data ||
      "Signup failed"
    );

  }

};

  // LOGIN FUNCTION
const handleLogin = async () => {

  try {

    const response = await axios.post(
      "http://localhost:8080/api/auth/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem(
      "user",
      JSON.stringify(response.data)
    );

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    alert("Login successful");

    navigate("/");

    window.location.reload();

  } catch (error) {

    alert(
      error.response?.data ||
      "Invalid email or password"
    );

  }

};

const handleForgotPassword = async () => {

  if (!forgotEmail || !newPassword) {
    alert("Fill all fields");
    return;
  }

  try {

    const response = await axios.post(
      "http://localhost:8080/api/auth/forgot-password",
      {
        email: forgotEmail,
        newPassword: newPassword,
      }
    );

    alert(response.data);

    setShowForgot(false);

    setForgotEmail("");

    setNewPassword("");

  } catch (error) {

    alert(
      error.response?.data ||
      "Password reset failed"
    );

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

      <hr />

<button
  onClick={() =>
    window.location.href =
      "http://localhost:8080/oauth2/authorization/google"
  }
>
  Continue with Google
</button>

<button
  onClick={() =>
    window.location.href =
      "http://localhost:8080/oauth2/authorization/github"
  }
>
  Continue with GitHub
</button>

      {isLogin && (
        <p
          style={{
            color: "#e50914",
            cursor: "pointer",
            marginTop: "10px",
            textAlign: "center",
          }}
          onClick={() =>
            setShowForgot(true)
          }
        >
          Forgot Password?
        </p>
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

      {/* FORGOT PASSWORD */}

      {showForgot && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "10px",
          }}
        >

          <h3>Reset Password</h3>

          <input
            type="email"
            placeholder="Enter Email"
            value={forgotEmail}
            onChange={(e) =>
              setForgotEmail(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
          />

          <button
            onClick={
              handleForgotPassword
            }
          >
            Update Password
          </button>

          <button
            style={{
              marginTop: "10px",
            }}
            onClick={() =>
              setShowForgot(false)
            }
          >
            Close
          </button>

        </div>
      )}

    </div>

  </div>
);
};

export default Signup;
