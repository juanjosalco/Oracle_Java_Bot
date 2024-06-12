import React from "react";

import "./Styles/Button.css";

export const MyButton = ({ text, onClick, className }) => {
    if (className === undefined) className = "btnGlobal";
    return (
        <div className="btnContainer">
            <button className={className} onClick={onClick}>
                {text}
            </button>
        </div>
    );
};