import React, { useState } from "react";
import "../Styles/Login.css";
import { Header } from "../../GlobalComponents/Header";
import { useNavigate } from "react-router-dom";
import { MyTextInput } from "../../GlobalComponents/TextInput";
// import {
//   emailRegex,
//   passwordRegex,
// } from "../../GlobalComponents/Utils/RegexUtils";
import { useUser } from "../../../hooks/useUser";
import { decodeJwt } from "../../GlobalComponents/Utils/Jwt";
import { login } from "../../../api/AuthAPI";

export const LoginScreen = () => {
  const { saveUserData } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };


  const handleLogin = async () => {
    const response = await login(email, password);
    if (response.error) {
      setError(response.error);
    } else {
      const { token } = response;

      const decodedToken = decodeJwt(token);

      saveUserData({
        token: token,
        UID: decodedToken.id,
        team_id: decodedToken.team,
        role: decodedToken.role,
      });

      if(1){
        if (decodedToken.role === "Developer") {
          navigate("/dashboard", { state: {}});
        } else if (decodedToken.role === "Manager") {
          navigate("/dashboard", { state: {} });
        } else if (decodedToken.role === "Notch") {
          navigate("/dashboard", { state: {} });
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
      <div className="containerBackground">
        <h1 className="title" >Welcome to OraBot!</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleLogin();}}>
          <div className="inputContainer">
              <MyTextInput
                type="email"
                value={email}
                onChange={handleEmail}
                placeholder={"Email"}
              />
              <MyTextInput
                type={"password"}
                value={password}
                onChange={handlePassword}
                placeholder={"Password"}
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button className="btnX" onClick={handleLogin}>
              Log in
            </button>
          </form>
        <div className="footer">
         <p className="termsOfUse">
            By logging in, you agree to our <a href="#" className="link">Terms of Use and Privacy Policy</a>.
          </p>
          <p className="link" onClick={handleRecover}>
            Forgot password?
          </p>
        </div>
      </div>
    </>
  );
};
