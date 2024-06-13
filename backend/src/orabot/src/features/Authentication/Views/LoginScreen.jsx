import React, { useState } from "react";
import "../Styles/Login.css";
import { Header } from "../../GlobalComponents/Header";
import { NavLink, useNavigate } from "react-router-dom";
import { MyTextInput } from "../../GlobalComponents/TextInput";
import { useUser } from "../../../hooks/useUser";
import { decodeJwt } from "../../GlobalComponents/Utils/Jwt";
import { login } from "../../../api/AuthAPI";
import { MyButton } from "../../GlobalComponents/Button";

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
      <div className="login-container">
        <div className="container-background">
          <div className="background-blur">
            <h1 className="login-title" >Welcome to OraBot!</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleLogin();}}>
              <div className="input-container">
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
                  <div>
                    <MyButton text={"Log in"} onClick={handleLogin} className="login-button"/>
                  </div>

                </div>
                {error && <p className="error">{error}</p>}
              </form>
            <div className="footer">
              <p className="termsOfUse">
                By logging in, you agree to our <NavLink to="/terms-of-service" className="hyperlink">Terms of Use</NavLink> and <NavLink to="/privacy-policy" className="hyperlink">Privacy Policy</NavLink>.
              </p>
              <p className="termsOfUse">
                Also check our <NavLink to="/user-agreement" className="hyperlink">End-User Agreement</NavLink>.
              </p>
              <p className="hyperlink" onClick={handleRecover}>
                Forgot password?
              </p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};
