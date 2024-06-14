import React from "react";

import "./Styles/PopUp.css";
import {MyButton} from "./Button";

export const PopUp = ({ title, message, onConfirm, onCancel}) => {

    return (
        <div className="popUpBlur">
            <div className="popUpContainer">
                        <h1 className="titleZ">{title}</h1>
                    <p>{message}</p>
                    <div className="popUpButtons">
                        <MyButton onClick={onCancel} text="Cancel" />
                        <MyButton className="orange-button" onClick={onConfirm} text="Confirm" />
                    </div>
            </div>
        </div>
    );
}