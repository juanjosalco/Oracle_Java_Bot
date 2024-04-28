import React from "react";

import { useNavigate } from "react-router-dom";

// Styles
import "./Styles/Header.css";


export const Header = (props) => {

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="containerHeader">
            {props.back? <img className="back" onClick={goBack} src="https://firebasestorage.googleapis.com/v0/b/oracle-java-bot.appspot.com/o/Assets%2FIcons%2FOracle_Logo.png?alt=media&token=6c11678e-d00f-4973-86c5-22851047f6ea" alt="Go Back Button"></img> : <></>} 
            <h2>OraBot</h2>
            <img src="https://firebasestorage.googleapis.com/v0/b/oracle-java-bot.appspot.com/o/Assets%2FIcons%2FOracle_Logo.png?alt=media&token=6c11678e-d00f-4973-86c5-22851047f6ea" alt="OraBot Logo" width={40} height={20} />
        </div>
    );
}