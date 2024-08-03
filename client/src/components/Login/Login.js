import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import "./Login.css";
import Alert from "../Alert/Alert";
import {Link} from "react-router-dom";

function Login({ setIsAuth, setShowSignUp }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertLevel, setAlertLevel] = useState(null);
  const [alertKey, setAlertKey] = useState(0); // Unique key for Alert component
  const cookies = new Cookies();

  const login = () => {
    if (username.length < 1 || password.length < 1) {
      setAlertMessage("Please fill out all the fields correctly.");
      setAlertLevel(4); // Warning level
      setAlertKey(prevKey => prevKey + 1); // Update key to force re-render
      return;
    }
    Axios.post("http://localhost:4000/login", { username, password }).then((res) => {
      if (res.data.message === "success") {
        console.log(res.data);
        const { firstName, lastName, username, address, stats, token, userId } = res.data;
        cookies.set("token", token);
        cookies.set("userId", userId);
        cookies.set("username", username);
        cookies.set("firstName", firstName);
        cookies.set("lastName", lastName);
        cookies.set("address", address);
        cookies.set("stats", stats);
        setIsAuth(true);
      } else {
        console.log(res.data);
        setAlertMessage("Invalid Credentials");
        setAlertLevel(5); // Danger level
        setAlertKey(prevKey => prevKey + 1); // Update key to force re-render
      }
    });
  };

  return (
    <div className="login-container">
      <Alert key={alertKey} message={alertMessage} level={alertLevel} /> {/* Add Alert component */}
      <h2>Login</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
      </div>
      <button onClick={login} className="form-button">Login</button>
      <p>
        New here?{" "}
        
        <Link className="link" to="/signup">Signup</Link>

      </p>
    </div>
  );
}

export default Login;