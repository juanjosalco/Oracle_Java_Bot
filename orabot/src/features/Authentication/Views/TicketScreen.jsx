import React from "react";

import { useNavigate } from "react-router-dom";

// Styles
import "../Styles/Ticket.css";

// Components
import { Header } from "../../GlobalComponents/Header";

export const TicketScreen = () => {
    
    const naigate = useNavigate();

    const handleClick = () => {
        naigate("/");
    }
    
    return (
        <>
            <Header />
            <div className="container">
                <h1 className="title left">A <b>ticket</b> has been raised to recover your account.</h1>
                <h1 className="title left">Please be patient.</h1>
                <button className="btnX" onClick={handleClick}>Back</button> 
            </div>
        </>
    );
}