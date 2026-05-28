// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./MyProfile.css";

// function MyProfile() {
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);

//   const [user, setUser] = useState(null);

//   const [profileImage, setProfileImage] = useState("");
//   const [tempImage, setTempImage] = useState("");

//   const [showPasswordBox, setShowPasswordBox] = useState(false);
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   const [showForgot, setShowForgot] = useState(false);

//   const [msg, setMsg] = useState("");
//   const [msgType, setMsgType] = useState("");

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user") || "null");
//     setUser(storedUser);

//     const savedImage = localStorage.getItem("profileImage");
//     if (savedImage) {
//       setProfileImage(savedImage);
//     }
//   }, []);

//   // OPEN FILE
//   const openFilePicker = () => {
//     fileInputRef.current.click();
//   };

//   // IMAGE SELECT
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setTempImage(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   // SAVE IMAGE + SYNC NAVBAR
//   const handleSaveImage = () => {
//     setProfileImage(tempImage);
//     localStorage.setItem("profileImage", tempImage);

//     // sync navbar instantly
//     window.dispatchEvent(new Event("storage"));

//     setTempImage("");
//   };

//   // CHANGE PASSWORD
//   const handleChangePassword = () => {
//     setMsg("");
//     setMsgType("");

//     const storedUser = JSON.parse(localStorage.getItem("user") || "null");

//     if (!storedUser?.password) {
//       setMsg("❌ User password not found");
//       setMsgType("error");
//       return;
//     }

//     if (storedUser.password !== oldPassword) {
//       setMsg("❌ Old password is incorrect");
//       setMsgType("error");
//       return;
//     }

//     if (oldPassword === newPassword) {
//       setMsg("❌ New password cannot be same as old password");
//       setMsgType("error");
//       return;
//     }

//     const updatedUser = {
//       ...storedUser,
//       password: newPassword,
//     };

//     localStorage.setItem("user", JSON.stringify(updatedUser));
//     setUser(updatedUser);

//     setMsg("✅ Password changed successfully!");
//     setMsgType("success");

//     setOldPassword("");
//     setNewPassword("");

//     setTimeout(() => {
//       setShowPasswordBox(false);
//       setMsg("");
//       setMsgType("");
//     }, 1500);
//   };

//   // FORGOT PASSWORD (UI ONLY SAFE FLOW)
//   const handleForgotPassword = () => {
//     setMsg("📩 Please contact admin or reset via login page");
//     setMsgType("error");
//   };

//   if (!user) {
//     return (
//       <div className="profile-container">
//         <h2>Please login first</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-container">

//       <div className="profile-card">

//         {/* HEADER */}
//         <div className="profile-header">

//           <div className="img-wrapper">

//             <div className="profile-img-box" onClick={openFilePicker}>

//               {tempImage || profileImage ? (
//                 <img
//                   src={tempImage || profileImage}
//                   className="profile-img"
//                   alt="profile"
//                 />
//               ) : (
//                 <div className="emoji-avatar">😊</div>
//               )}

//               <div className="camera-icon">📷</div>

//               <input
//                 type="file"
//                 accept="image/*"
//                 ref={fileInputRef}
//                 onChange={handleImageUpload}
//                 hidden
//               />
//             </div>

//             {tempImage && (
//               <button className="save-btn" onClick={handleSaveImage}>
//                 Save Photo
//               </button>
//             )}
//           </div>

//           <div>
//             <h2>{user.name}</h2>
//             <p>{user.email}</p>
//           </div>
//         </div>

//         <hr />

//         {/* ACCOUNT */}
//         <div className="section">
//           <h3>📌 Account Details</h3>

//           <div className="info-box">
//             <p><b>Name:</b> {user.name}</p>
//             <p><b>Email:</b> {user.email}</p>
//           </div>
//         </div>

//         <hr />

//         {/* SECURITY */}
//         <div className="section">
//           <h3>🔐 Security</h3>

//           {!showPasswordBox ? (
//             <>
//               <button
//                 className="btn-primary"
//                 onClick={() => setShowPasswordBox(true)}
//               >
//                 Change Password
//               </button>

//               <button
//                 className="btn-link"
//                 onClick={() => setShowForgot(!showForgot)}
//               >
//                 Forgot Password?
//               </button>

//               {showForgot && (
//                 <p className="msg error">
//                   📩 Reset link sent to email (demo)
//                 </p>
//               )}
//             </>
//           ) : (
//             <div className="password-box">

//               <input
//                 type="password"
//                 placeholder="Old Password"
//                 value={oldPassword}
//                 onChange={(e) => setOldPassword(e.target.value)}
//                 className="input"
//               />

//               <input
//                 type="password"
//                 placeholder="New Password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 className="input"
//               />

//               <div className="btn-row">
//                 <button className="btn-small" onClick={handleChangePassword}>
//                   Save
//                 </button>

//                 <button
//                   className="btn-cancel"
//                   onClick={() => setShowPasswordBox(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>

//               {msg && (
//                 <p className={`msg ${msgType}`}>
//                   {msg}
//                 </p>
//               )}
//             </div>
//           )}
//         </div>

//         {/* LOGOUT */}
//         <button
//           className="logout-btn"
//           onClick={() => {
//             localStorage.clear();
//             window.dispatchEvent(new Event("storage"));
//             navigate("/");
//           }}
//         >
//           🚪 Logout
//         </button>

//       </div>
//     </div>
//   );
// }

// export default MyProfile;

// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./MyProfile.css";

// function MyProfile() {
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);

//   const [user, setUser] = useState(null);

//   const [profileImage, setProfileImage] = useState("");
//   const [tempImage, setTempImage] = useState("");

//   const [showPasswordBox, setShowPasswordBox] = useState(false);
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   const [msg, setMsg] = useState("");
//   const [msgType, setMsgType] = useState("");

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user") || "null");
//     setUser(storedUser);

//     const savedImage = localStorage.getItem("profileImage");
//     if (savedImage) setProfileImage(savedImage);
//   }, []);

//   const openFilePicker = () => fileInputRef.current.click();

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => setTempImage(reader.result);
//     reader.readAsDataURL(file);
//   };

//   // SAVE IMAGE
//   const handleSaveImage = () => {
//     setProfileImage(tempImage);
//     localStorage.setItem("profileImage", tempImage);
//     window.dispatchEvent(new Event("storage"));
//     setTempImage("");
//   };

//   // REMOVE IMAGE (NEW)
//   const handleRemoveImage = () => {
//     setProfileImage("");
//     setTempImage("");
//     localStorage.removeItem("profileImage");
//     window.dispatchEvent(new Event("storage"));
//   };

//   // PASSWORD CHANGE
//   const handleChangePassword = () => {
//     setMsg("");
//     setMsgType("");

//     if (user.password !== oldPassword) {
//       setMsg("❌ Old password is incorrect");
//       setMsgType("error");
//       return;
//     }

//     if (oldPassword === newPassword) {
//       setMsg("❌ New password cannot be same as old password");
//       setMsgType("error");
//       return;
//     }

//     const updatedUser = { ...user, password: newPassword };

//     localStorage.setItem("user", JSON.stringify(updatedUser));
//     setUser(updatedUser);

//     setMsg("✅ Password changed successfully!");
//     setMsgType("success");

//     setOldPassword("");
//     setNewPassword("");

//     setTimeout(() => {
//       setShowPasswordBox(false);
//       setMsg("");
//       setMsgType("");
//     }, 1500);
//   };

//   if (!user) {
//     return (
//       <div className="profile-container">
//         <h2>Please login first</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-container">
//       <div className="profile-card">

//         {/* HEADER */}
//         <div className="profile-header">

//           <div className="img-wrapper">

//             <div className="profile-img-box" onClick={openFilePicker}>

//               {tempImage || profileImage ? (
//                 <img
//                   src={tempImage || profileImage}
//                   className="profile-img"
//                   alt="profile"
//                 />
//               ) : (
//                 <div className="emoji-avatar">😊</div>
//               )}

//               <div className="camera-icon">📷</div>

//               <input
//                 type="file"
//                 accept="image/*"
//                 ref={fileInputRef}
//                 onChange={handleImageUpload}
//                 hidden
//               />
//             </div>

//             {/* SAVE + REMOVE */}
//             <div className="img-actions">
//               {tempImage && (
//                 <button className="save-btn" onClick={handleSaveImage}>
//                   Save Photo
//                 </button>
//               )}

//               {profileImage && (
//                 <button className="remove-btn" onClick={handleRemoveImage}>
//                   Remove
//                 </button>
//               )}
//             </div>
//           </div>

//           <div>
//             <h2>{user.name}</h2>
//             <p>{user.email}</p>
//           </div>
//         </div>

//         <hr />

//         {/* ACCOUNT */}
//         <div className="section">
//           <h3>📌 Account Details</h3>

//           <div className="info-box">
//             <p><b>Name:</b> {user.name}</p>
//             <p><b>Email:</b> {user.email}</p>
//           </div>
//         </div>

//         <hr />

        {/* SECURITY */}
        {/* <div className="section">
          <h3>🔐 Security</h3>

          {!showPasswordBox ? (
            <button className="btn-primary" onClick={() => setShowPasswordBox(true)}>
              Change Password
            </button>
          ) : (
            <div className="password-box">

              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="input"
              />

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input"
              />

             <div className="btn-row">

  <button className="btn-small" onClick={handleChangePassword}>
    Save
  </button>

  <button
    className="btn-cancel"
    onClick={() => setShowPasswordBox(false)}
  >
    Cancel
  </button>

</div>

<button
  className="forget-password-btn"
  onClick={() => {
    setMsg("📩 Password reset link sent to your email");
    setMsgType("success");

    setTimeout(() => {
      setMsg("");
      setMsgType("");
    }, 2000);
  }}
>
  Forgot Password?
</button>
              {msg && <p className={`msg ${msgType}`}>{msg}</p>}
            </div>
          )}
        </div> */}


//         <div className="section">
//   <h3>🔐 Security</h3>

//   {!showPasswordBox ? (
//     <>
//       <button className="btn-primary" onClick={() => setShowPasswordBox(true)}>
//         Change / Forgot Password
//       </button>
//     </>
//   ) : (
//     <div className="password-box">

//       {/* EMAIL FOR FORGOT PASSWORD */}
//       <input
//         type="email"
//         placeholder="Enter registered email"
//         value={user.email}
//         disabled
//         className="input"
//       />

//       <input
//         type="password"
//         placeholder="Old Password (if known)"
//         value={oldPassword}
//         onChange={(e) => setOldPassword(e.target.value)}
//         className="input"
//       />

//       <input
//         type="password"
//         placeholder="New Password"
//         value={newPassword}
//         onChange={(e) => setNewPassword(e.target.value)}
//         className="input"
//       />

//       <div className="btn-row">
//         <button className="btn-small" onClick={handleChangePassword}>
//           Save
//         </button>

//         <button className="btn-cancel" onClick={() => setShowPasswordBox(false)}>
//           Cancel
//         </button>
//       </div>

//       {/* FORGOT PASSWORD FLOW */}
//       <button
//         className="forget-password-btn"
//         onClick={() => {
//           const resetPass = prompt("Enter new password:");

//           if (!resetPass) return;

//           const updatedUser = { ...user, password: resetPass };

//           localStorage.setItem("user", JSON.stringify(updatedUser));
//           setUser(updatedUser);

//           setMsg("✅ Password reset successful!");
//           setMsgType("success");

//           setTimeout(() => {
//             setMsg("");
//             setShowPasswordBox(false);
//           }, 1500);
//         }}
//       >
//         Forgot Password?
//       </button>

//       {msg && <p className={`msg ${msgType}`}>{msg}</p>}
//     </div>
//   )}
// </div>

//         {/* LOGOUT */}
//         <button
//           className="logout-btn"
//           onClick={() => {
//             localStorage.clear();
//             navigate("/");
//           }}
//         >
//           🚪 Logout
//         </button>

//       </div>
//     </div>
//   );
// }

// export default MyProfile;





// import React, { useEffect, useState } from "react";
// import "./MyProfile.css";

// export default function Profile() {
//   const [user, setUser] = useState({});
//   const [showChangePass, setShowChangePass] = useState(false);
//   const [oldPass, setOldPass] = useState("");
//   const [newPass, setNewPass] = useState("");
//   const [message, setMessage] = useState("");
//   const [profilePic, setProfilePic] = useState("");

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
//     setUser(storedUser);
//     setProfilePic(storedUser.profilePic || "");
//   }, []);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfilePic(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

// const handleSaveProfile = () => {
//   const updatedUser = {
//     ...user,
//     profilePic,
//   };

//   setUser(updatedUser);
//   localStorage.setItem("user", JSON.stringify(updatedUser));

//   // 🔥 sync navbar
//   localStorage.setItem("profileImage", profilePic);

//   setMessage("Profile updated successfully ✅");
//   window.dispatchEvent(new Event("storage"));
// };

//   const handleChangePassword = () => {
//     const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

//     if (!oldPass || !newPass) {
//       setMessage("Fill all fields");
//       return;
//     }

//     if (oldPass === newPass) {
//       setMessage("New password cannot be same as old password");
//       return;
//     }

//     if (storedUser.password && storedUser.password !== oldPass) {
//       setMessage("Old password is incorrect");
//       return;
//     }

//     const updatedUser = {
//       ...storedUser,
//       password: newPass,
//     };

//     localStorage.setItem("user", JSON.stringify(updatedUser));

//     setMessage("Password changed successfully ✅");
//     setOldPass("");
//     setNewPass("");
//     setShowChangePass(false);

//     window.dispatchEvent(new Event("storage"));
//   };

//   return (
//     <div className="profile-page">
//       <h2>My Profile</h2>

//       <div className="profile-card">

//         {/* IMAGE SECTION */}
//         <div className="avatar-section">
//           <img
//             src={
//               profilePic ||
//               "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//             }
//             className="big-avatar"
//             alt="profile"
//           />

//           <label className="camera-icon">
//             📷
//             <input type="file" onChange={handleImageUpload} hidden />
//           </label>
//         </div>

//         {/* ACCOUNT DETAILS */}
//         <div className="details">
//   <h3>Account Details</h3>

//   <input
//     type="text"
//     value={user.name || ""}
//     onChange={(e) => setUser({ ...user, name: e.target.value })}
//     placeholder="Name"
//   />

//   <input
//     type="email"
//     value={user.email || ""}
//     onChange={(e) => setUser({ ...user, email: e.target.value })}
//     placeholder="Email"
//   />
// </div>

//         <button className="save-btn" onClick={handleSaveProfile}>
//           Save Profile
//         </button>

//         {/* PASSWORD SECTION */}
//         <div className="password-box">
//           <h3>Security</h3>

//           <button
//             className="change-btn"
//             onClick={() => setShowChangePass(!showChangePass)}
//           >
//             Change Password
//           </button>

//           <button className="forgot-btn">Forgot Password?</button>

//           {showChangePass && (
//             <div className="pass-form">
//               <input
//                 type="password"
//                 placeholder="Old Password"
//                 value={oldPass}
//                 onChange={(e) => setOldPass(e.target.value)}
//               />
//               <input
//                 type="password"
//                 placeholder="New Password"
//                 value={newPass}
//                 onChange={(e) => setNewPass(e.target.value)}
//               />

//               <button onClick={handleChangePassword} className="save-btn">
//                 Update Password
//               </button>
//             </div>
//           )}
//         </div>

//         {message && <p className="msg">{message}</p>}
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import "./MyProfile.css";

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
                  onClick={() => {
                    const stored = JSON.parse(localStorage.getItem("user") || "{}");

                    const updated = {
                      ...stored,
                      password: newPass,
                    };

                    localStorage.setItem("user", JSON.stringify(updated));

                    setMessage("Password reset successful ✅");
                    setShowForgot(false);
                    setStep(1);
                    setForgotEmail("");

                    window.dispatchEvent(new Event("storage"));
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