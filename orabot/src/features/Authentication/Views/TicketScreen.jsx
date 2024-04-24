import React from "react";

// Styles
import "../Styles/Ticket.css";

// Components
import { Header } from "../../GlobalComponents/Header";

export const TicketScreen = () => {
    return (
        <>
            <Header />
            <div className="container">
                <h1 className="title left">A <b>ticket</b> has been raised to recover your account.</h1>
                <h1 className="title left">Please be patient.</h1>
                <button className="btnX">Back</button> 
            </div>
        </>
    );
}