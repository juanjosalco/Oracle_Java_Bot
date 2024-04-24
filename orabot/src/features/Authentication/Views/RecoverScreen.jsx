import React from "react";

// Components
import { Header } from "../../GlobalComponents/Header";

// Styles
import "../Styles/Recover.css";


export const RecoverScreen = () => {
    return (
        <>
        <Header />
        <div className="container">
            <h1 className="title">Provide your information so we can help you recover your account.</h1>
            <div className="inputContainer">
                <input type="text" placeholder="Name" className="inputs" />
                <input type="email" placeholder="Email" className="inputs" />
                <input type="text" placeholder="Phone Number" className="inputs" />
            </div>
            <button className="btnX">Send</button> 
        </div>
    </>
    );
    }
    
