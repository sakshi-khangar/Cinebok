

import React, { useEffect, useState } from "react";
import "./MyProfile.css";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState({});
  const [showChangePass, setShowChangePass] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [message, setMessage] = useState("");
  const [profilePic, setProfilePic] = useState("");

  // forgot password popup
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [step, setStep] = useState(1);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(storedUser);
    setProfilePic(storedUser.profilePic || "");
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ SAVE PROFILE (NAME + EMAIL + IMAGE)
  const handleSaveProfile = () => {
    const updatedUser = {
      ...user,
      profilePic,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setMessage("Profile updated successfully ✅");
    window.dispatchEvent(new Event("storage"));
  };

  // ✅ CHANGE PASSWORD
  const handleChangePassword = () => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (!oldPass || !newPass) {
      setMessage("Fill all fields");
      return;
    }

    if (oldPass === newPass) {
      setMessage("New password cannot be same as old password");
      return;
    }

    if (storedUser.password && storedUser.password !== oldPass) {
      setMessage("Old password is incorrect");
      return;
    }

    const updatedUser = {
      ...storedUser,
      password: newPass,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    setMessage("Password changed successfully ✅");
    setOldPass("");
    setNewPass("");
    setShowChangePass(false);

    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="profile-page">
      <h2>My Profile</h2>

      <div className="profile-card">

        {/* IMAGE */}
        <div className="avatar-section">
          <img
            src={
              profilePic ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            className="big-avatar"
            alt="profile"
          />

          <label className="camera-icon">
            📷
            <input type="file" onChange={handleImageUpload} hidden />
          </label>
        </div>

        {/* DETAILS (EDITABLE) */}
{/* DETAILS (UI UPGRADED) */}
<div className="details">
  <h3>Account Details</h3>

  <div className="input-group">
    <label>Name</label>
    <input
      type="text"
      value={user.name || ""}
      placeholder="Enter your name"
      onChange={(e) => setUser({ ...user, name: e.target.value })}
    />
  </div>

  <div className="input-group">
    <label>Email</label>
    <input
      type="email"
      value={user.email || ""}
      placeholder="Enter your email"
      onChange={(e) => setUser({ ...user, email: e.target.value })}
    />
  </div>
</div>

        <button className="save-btn" onClick={handleSaveProfile}>
          Save Profile
        </button>

        {/* PASSWORD */}
        <div className="password-box">
          <h3>Security</h3>

          <button
            className="change-btn"
            onClick={() => setShowChangePass(!showChangePass)}
          >
            Change Password
          </button>

          <button
            className="forgot-btn"
            onClick={() => setShowForgot(true)}
          >
            Forgot Password?
          </button>

          {showChangePass && (
            <div className="pass-form">
              <input
                type="password"
                placeholder="Old Password"
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
              />

              <input
                type="password"
                placeholder="New Password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />

              <button onClick={handleChangePassword} className="save-btn">
                Update Password
              </button>
            </div>
          )}
        </div>

        {/* MESSAGE */}
        {message && <p className="msg">{message}</p>}
      </div>

      {/* 🔥 FORGOT PASSWORD POPUP */}
      {showForgot && (
        <div className="popup-overlay">
          <div className="popup-box">

            {step === 1 && (
              <>
                <h3>Enter Registered Email</h3>

                <input
                  type="email"
                  value={forgotEmail}
                  placeholder="Email"
                  onChange={(e) => setForgotEmail(e.target.value)}
                />

                <button
                  onClick={() => {
                    const stored = JSON.parse(localStorage.getItem("user") || "{}");

                    if (stored.email === forgotEmail) {
                      setStep(2);
                      setMessage("");
                    } else {
                      setMessage("Email not found ❌");
                    }
                  }}
                >
                  Verify
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <h3>Enter New Password</h3>

                <input
                  type="password"
                  placeholder="New Password"
                  onChange={(e) => setNewPass(e.target.value)}
                />

                <button
   onClick={async () => {

  try {

    await axios.post(
      "http://localhost:8080/api/auth/forgot-password",
      {
        email: forgotEmail,
        newPassword: newPass,
      }
    );

    setMessage("Password reset successful ✅");

    setShowForgot(false);

    setStep(1);

    setForgotEmail("");

    setNewPass("");

  } catch (error) {

    setMessage(
      error.response?.data ||
      "Password reset failed"
    );

  }

}}
                >
                  Save Password
                </button>
              </>
            )}

            <button onClick={() => setShowForgot(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}