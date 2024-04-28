import React, { useState } from "react";

// Styles
import "../Styles/Login.css";
import { Header } from "../../GlobalComponents/Header";
import { useNavigate } from "react-router-dom";

export const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const validateCredentials = () => {
    // Perform your validation here, e.g., check if username and password are not empty
    if (username.trim() === "" || password.trim() === "") {
      setError("Please enter both username and password.");
      return false;
    }
    // Add more validation logic as needed

    return true;
  };

  const handleLogin = () => {
    if (validateCredentials()) {
      // If validation passes, navigate to the dashboard
      navigate("/dashboard");
    }
  };

  const handleRecover = () => {
    navigate("/recover");
  };

  return (
    <>
      <Header back={false}/>
      <div className="container">
        <h1>Welcome to OraBot!</h1>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Username"
            className="inputs"
            value={username}
            onChange={handleUsername}
          />
          <input
            type="password"
            placeholder="Password"
            className="inputs"
            value={password}
            onChange={handlePassword}
          />
        </div>
        {error && <p className="error">{error}</p>}
          <button className="btnX" onClick={handleLogin}>Log in</button>
        <button className="questionBtn" onClick={handleRecover}>Forgot username or password?</button>
      </div>
    </>
  );
};
