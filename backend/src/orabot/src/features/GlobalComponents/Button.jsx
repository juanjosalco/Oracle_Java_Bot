import React from "react";

import "./Styles/Button.css";

export const MyButton = ({ text, onClick, className }) => {
    if (className === undefined) className = "default-button";
    return (
        <div className="button-component-container">
            <button className={className} onClick={onClick}>
                {text}
            </button>
        </div>
    );
};