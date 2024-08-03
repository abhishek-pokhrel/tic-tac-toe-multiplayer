import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import "./SignUp.css";
import Alert from "../Alert/Alert";
import {Link} from "react-router-dom";

function SignUp({ setIsAuth }) {
  const cookies = new Cookies();
  const [user, setUser] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [alertLevel, setAlertLevel] = useState(null);
  const [alertKey, setAlertKey] = useState(0); // Unique key for Alert component

  const signUp = () => {
    if (!user.firstName || !user.lastName || !user.username || !user.password || !user.address) {
      setAlertMessage("Please fill out all the fields correctly.");
      setAlertLevel(4); // Warning level
      setAlertKey((prevKey) => prevKey + 1); // Update key to force re-render
      return;
    }

    Axios.post("http://localhost:4000/signup", user).then((res) => {
      if (res.data.status === "failed") {
        setAlertMessage("Username is taken! Choose another one!");
        setAlertLevel(5); // Danger level
        setAlertKey((prevKey) => prevKey + 1); // Update key to force re-render
        return;
      }

      const { token, userId, firstName, lastName, username, address, hashedPassword } = res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("address", address);
      cookies.set("hashedPassword", hashedPassword);
      setIsAuth(true);
    });
  };

  return (
    <div className="sign-up-container">
      <Alert key={alertKey} message={alertMessage} level={alertLevel} />{" "}
      {/* Add Alert component */}
      <h2>Sign Up</h2>
      
      <div className="form-group">
        <input
          name="firstName"
          placeholder="First Name"
          onChange={(event) => {
            setUser({ ...user, firstName: event.target.value });
          }}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <input
          name="lastName"
          placeholder="Last Name"
          onChange={(event) => {
            setUser({ ...user, lastName: event.target.value });
          }}
          className="form-input"
        />
      </div>
      
      <div className="form-group">
        <input
          name="username"
          placeholder="Username"
          onChange={(event) => {
            setUser({ ...user, username: event.target.value });
          }}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <input
          name="address"
          type="text"
          placeholder="Address"
          onChange={(event) => {
            setUser({ ...user, address: event.target.value });
          }}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setUser({ ...user, password: event.target.value });
          }}
          className="form-input"
        />
      </div>
      <button onClick={signUp} className="form-button">
        Sign Up
      </button>
      <p>
        Returning user?{" "}
        
        <Link className="link" to="/login">Login</Link>

      </p>
    </div>
  );
}

export default SignUp;
