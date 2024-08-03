import "./App.css";

import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import React, { useState, useEffect, useMemo } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Profile from "./components/Profile/Profile";
import IntroPage from "./components/IntroPage/IntroPage";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Test from "./components/Profile/Test";
import Navbar from "./components/IntroPage/Navbar/Navbar";






function App() {
  

  const api_key = process.env.REACT_APP_API_KEY;
  const cookies = useMemo(() => new Cookies(), []);
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);
  const [serverStatus, setServerStatus] = useState("loading");

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("address");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };

  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await fetch("http://localhost:4000/test");
        if (response.ok) {
          setServerStatus("ok");
        } else {
          setServerStatus("down");
        }
      } catch (error) {
        setServerStatus("down");
      }
    };

    checkServer();
  }, []);

  useEffect(() => {
    if (token) {
      client
        .connectUser(
          {
            id: cookies.get("userId"),
            name: cookies.get("username"),
            firstName: cookies.get("firstName"),
            lastName: cookies.get("lastName"),
            hashedPassword: cookies.get("hashedPassword"),
          },
          token
        )
        .then(() => {
          setIsAuth(true);
        });
    }
  }, [token, client, cookies]);

  if (serverStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (serverStatus === "down") {
    return <ErrorPage />;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/test" element={<Test />} />
          <Route
            path="/"
            element={isAuth ? <Navigate to="/profile" /> : <IntroPage />}
          />

          <Route
            path="/profile"
            element={
              isAuth ? (
                <Chat client={client}>
                  <Navbar />
                  <Profile logOut={logOut} />
                </Chat>
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/login"
            element={
              isAuth ? (
                <Navigate to="/profile" />
              ) : (
                <>
                <Navbar />
                <Login setIsAuth={setIsAuth} />
                </>
              )
            }
          />

          <Route
            path="/signup"
            element={
              isAuth ? (
                <Navigate to="/profile" />
              ) : (
                <>
                <Navbar />
                <SignUp setIsAuth={setIsAuth} />
                </>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
