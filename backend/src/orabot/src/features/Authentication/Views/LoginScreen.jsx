import React, { useEffect, useState } from "react";
import "../Styles/Login.css";
import { Header } from "../../GlobalComponents/Header";
import { useNavigate } from "react-router-dom";
import {
  emailRegex,
  passwordRegex,
} from "../../GlobalComponents/Utils/RegexUtils";
import { useUser } from "../../../hooks/useUser";
import { decodeJwt } from "../../GlobalComponents/Utils/Jwt";
import { login } from "../../../api/AuthAPI";

export const LoginScreen = () => {
  const { userData, saveUserData } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const validateCredentials = () => {
    if (email.trim() === "" || password.trim() === "") {
      setError("Please enter both email and password.");
      return false;
    } else if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    } else if (!passwordRegex.test(password)) {
      setError("Please enter a valid password.");
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    const response = await login(email, password);
    if (response.error) {
      setError(response.error);
    } else {
      const { token } = response;
      setToken(response.token);

      const decodedToken = decodeJwt(token);

      saveUserData({
        token: token,
        UID: decodedToken.id,
        team_id: decodedToken.team,
        role: decodedToken.role,
      });

      console.log("userData.role = " + decodedToken.role);

      if(1){
        if (decodedToken.role === "Developer") {
          navigate("/dashboard", { state: { isDeveloper: true } });
        } else if (decodedToken.role === "Manager") {
          navigate("/dashboard", { state: { isDeveloper: false } });
        }
      }
    
    }
  };

  const handleRecover = () => {
    navigate("/recover");
  };

  return (
    <>
      <Header back={false} />
      <div className="container">
        <h1>Welcome to OraBot!</h1>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Email"
            className="inputs"
            value={email}
            onChange={handleEmail}
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
        <button className="btnX" onClick={handleLogin}>
          Log in
        </button>
        <button className="questionBtn" onClick={handleRecover}>
          Forgot password?
        </button>
      </div>
    </>
  );
};
