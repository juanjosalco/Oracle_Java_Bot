import React from "react";

import "./Styles/PopUpComment.css";

export const PopUpComment = ({ title, message, userID, onClose}) => {

    return (
        <div className="popUpContainerComment">
            <button type="button" onClick={onClose}>
                <img 
                    src="https://firebasestorage.googleapis.com/v0/b/oracle-java-bot.appspot.com/o/Assets%2FIcons%2Fcross.png?alt=media&token=8a61e868-ce6b-4e0f-b8a6-1f3705e11c5e" 
                    alt="Close" 
                    width="20" height="20"
                />
            </button>
            <h1 className="titleComment">{title}</h1>
            <p>{message}</p>
        </div>
    );
}