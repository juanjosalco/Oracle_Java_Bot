import React from "react";

// Styles
import "../Styles/Login.css";
import { Header } from "../../GlobalComponents/Header";

export const LoginScreen = () => {
    return (
        <>
            <Header />
            <div className="container">
                <h1>Welcome to OraBot!</h1>
                <div className="inputContainer">
                    <input type="text" placeholder="Username" className="inputs" />
                    <input type="password" placeholder="Password" className="inputs" />
                </div>
                <button className="btn">Log in</button> 
                <button className="questionBtn">Forgot username or password?</button> 
            </div>
        </>
        
    );
}