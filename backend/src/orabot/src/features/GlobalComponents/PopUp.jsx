import React from "react";

import "./Styles/PopUp.css";

export const PopUp = ({ title, message, onConfirm, onCancel}) => {

    return (
        <div className="popUpContainer">
                    <h1 className="titleZ">{title}</h1>
                <p>{message}</p>
                <div className="popUpButtons">
                    <button className="btn" onClick={onCancel}>Cancel</button>
                    <button className="btn" onClick={onConfirm}>Confirm</button>
                </div>
        </div>
    );
}