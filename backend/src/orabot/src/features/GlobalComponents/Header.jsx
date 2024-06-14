import React from "react";

import { useNavigate, useLocation } from "react-router-dom";

// Styles
import "./Styles/Header.css";


export const Header = (props) => {

    const navigate = useNavigate();
    const location = useLocation();
    const showLogoutButton = location.pathname === "/dashboard";

    const goBack = () => {
        navigate(-1);
    };

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <div className="containerHeader">
            {props.back ? <img 
                className="back" 
                onClick={goBack} 
                src="https://objectstorage.mx-queretaro-1.oraclecloud.com/p/AQJ9ycvPcEbPudU4ypftS1cFQPvSk1b4x9St_e_P4g7ERieTAgagRPGa5-jzpb2P/n/axgyv8vo90ix/b/orabot-ooxbf/o/image-back-icon" 
                alt="Go Back Button" 
                width={20} height={20}
            ></img> : <></>} 
            <h2>OraBot</h2>
            <img 
                src="https://firebasestorage.googleapis.com/v0/b/oracle-java-bot.appspot.com/o/Assets%2FIcons%2FOracle_Logo.png?alt=media&token=6c11678e-d00f-4973-86c5-22851047f6ea" 
                alt="OraBot Logo"
                className="OraBot"
                width={40} height={20} />

            {showLogoutButton && (
                <p
                    className="logout link"
                    onClick={handleLogout}
                >
                    Log out
                </p>
            )}
        </div>
    );
}