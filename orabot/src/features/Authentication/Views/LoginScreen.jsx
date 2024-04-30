import React, { useState } from "react";

// Styles
import "../Styles/Login.css";
import { Header } from "../../GlobalComponents/Header";
import { useNavigate } from "react-router-dom";
import { emailRegex, passwordRegex } from "../../GlobalComponents/Utils/RegexUtils";

export const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("Developer");
  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const validateCredentials = () => {
    
    if (username.trim() === "" || password.trim() === "") {
      setError("Please enter both username and password.");
      return false;
    }
    else if (!emailRegex.test(username)) {
      setError("Please enter a valid email address.");
      return false;
    }
    else if (!passwordRegex.test(password)) {
      setError("Please enter a valid password.");
      return false;
    }

    return true;
  };

  const handleLogin = () => {
    setRole("Developer");
    if (validateCredentials()) {
      // If validation passes, navigate to the dashboard
      if(role === "Developer") {
        navigate("/dashboard", { state: { isDeveloper: true } });
      }
      else if(role === "Manager"){
        navigate("/dashboard", { state: { isDeveloper: false } });
      }

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
