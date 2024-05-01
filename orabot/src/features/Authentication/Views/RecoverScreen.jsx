import React from "react";

import { useNavigate } from "react-router-dom";

// Components
import { Header } from "../../GlobalComponents/Header";

// Styles
import "../Styles/Recover.css";


export const RecoverScreen = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/ticket");
    }

    return (
        <>
        <Header back={true}/>
        <div className="container">
            <div className="options">
                <button className={"btnSelector borderSelected"}>Password</button>
            </div>
            <h1 className="title">Provide your information so we can help you recover your account.</h1>
            <div className="inputContainer">
                <input type="text" placeholder="Email" className="inputs" />
            </div>
            <button className="btnX" onClick={handleClick}>Send</button> 
        </div>
    </>
    );
    }
    
