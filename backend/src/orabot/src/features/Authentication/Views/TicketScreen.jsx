import React from "react";

import { useNavigate } from "react-router-dom";

// Styles
import "../Styles/Ticket.css";

// Components
import { Header } from "../../GlobalComponents/Header";
import { MyButton } from "../../GlobalComponents/Button";

export const TicketScreen = () => {
    
    const naigate = useNavigate();

    const handleClick = () => {
        naigate("/");
    }
    
    return (
        <>
            <Header />
            <div className="hero-container">
                <div className="ticket">
                    <h1 className="title left">A <b>ticket</b> has been raised to recover your account.</h1>
                    <p>Please be patient.</p>
                    <MyButton text="Back" onClick={handleClick} />
                </div>
            </div>
        </>
    );
}