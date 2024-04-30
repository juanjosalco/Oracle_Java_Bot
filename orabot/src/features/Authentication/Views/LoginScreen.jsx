import React, { useEffect, useState } from "react";
import "../Styles/Login.css";
import { Header } from "../../GlobalComponents/Header";
import { useNavigate } from "react-router-dom";
import { emailRegex, passwordRegex } from "../../GlobalComponents/Utils/RegexUtils";
import { useUser } from "../../../hooks/useUser";
import { decodeJwt } from "../../GlobalComponents/Utils/Jwt";
import axios from "axios";

export const LoginScreen = () => {
 const { userData, saveUserData } = useUser();
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const [error, setError] = useState("");
 const [role, setRole] = useState("Developer");
 const navigate = useNavigate();



 // Get token from backend
 const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJUZXN0TWFuYWdlckB0ZXN0LmNvbSIsImV4cCI6MTcxNTM2MDEwOCwicm9sZSI6Ik1hbmFnZXIiLCJpZCI6MCwidGVhbSI6MX0.EQ2K22QMq-t66PR5dZ9mQ6n5T5TuX-KTzqJ6yWJei7moDkmC2PhRbxpwdhAm41PdVz_xpdMIFJYApBurQy5YxQ";
 // Decode jwt
 const decodedToken = decodeJwt(token);
 // Use jwt 
//  console.log(decodedToken.role)

 const handleUsername = (e) => {
    setUsername(e.target.value);
 };

 const handlePassword = (e) => {
    setPassword(e.target.value);
 };

  const testSavingData = () => {
    saveUserData({
       token: "1",
       UID: "Developer",
       team_id: "John Doe",
       role: "d",
    });

 };

 // Use useEffect to log the updated state after it has been set
 useEffect(() => {
    testSavingData();
 }, []); // Empty dependency array means this effect runs once after the initial render

 useEffect(() => {
    // console.log(userData);
 }, [userData]); // This effect runs whenever userData changes

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
      axios.post("http://localhost:8080/login", {
        email: username,
        password: password
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    if (validateCredentials()) {
      if(role === "Developer") {
        navigate("/dashboard", { state: { isDeveloper: true } });
      } else if(role === "Manager"){
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
