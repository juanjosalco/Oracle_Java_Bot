import React, { useState } from "react";
import "./Styles/TextInput.css";
import { calculateBytes } from "./Utils/ByteCounter";
import "../GlobalComponents/Utils/RegexUtils";

export const MyTextInput = ({ label, value, onChange, type, placeholder, className, maxLength, regex }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    const handleInputChange = (event) => {
        const newValue = type === "email" ? event.target.value.toLowerCase() : event.target.value;
        const newLength = calculateBytes(newValue);
        
        if (newLength > maxLength) {
            setInputValue(newValue.slice(0, calculateBytes(maxLength)));
            onChange(event); 
        } else {
            setInputValue(newValue);
            onChange(event); 
        }
    };

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate() + 1).padStart(2, '0');
    const minStr = `${year}-${month}-${day}`;
    const maxStr = `${year + 1}-${month}-${day + 1}`;
    if (className === undefined) className = "default-input";
    if (type === "TextArea") className = "default-input-area";

    return (
        <div className="input-component-container">
            <label className="input-label">{label}</label>
            {type !== "TextArea" && (
                <input
                    type={type === "password"? (isVisible? "text" : "password") : type}
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className={`${className} ${type === "password"? "relative" : ""}`}
                    maxLength={maxLength ? maxLength : 1024}
                    {...type === "date" && {min: minStr, max: maxStr}}
                />
            )}
            {type === "TextArea" && (
                <textarea
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className={className}
                    maxLength={maxLength ? maxLength : 1024}
                />
            )}
            
            <div className="decorations">
                {type === "password" && (
                    <img className="eye-button" src={isVisible? "https://objectstorage.mx-queretaro-1.oraclecloud.com/p/AQJ9ycvPcEbPudU4ypftS1cFQPvSk1b4x9St_e_P4g7ERieTAgagRPGa5-jzpb2P/n/axgyv8vo90ix/b/orabot-ooxbf/o/image-eye-icon-slash-thin" : "https://objectstorage.mx-queretaro-1.oraclecloud.com/p/AQJ9ycvPcEbPudU4ypftS1cFQPvSk1b4x9St_e_P4g7ERieTAgagRPGa5-jzpb2P/n/axgyv8vo90ix/b/orabot-ooxbf/o/image-eye-icon-thin"} onClick={() => setIsVisible(!isVisible)} alt="fjapof">
                    </img>
                )}
                {maxLength ? <span className={calculateBytes(inputValue) === maxLength ?  "character-counter-overflow" : "character-counter"} >{calculateBytes(inputValue)}/{maxLength}</span> : null}
            </div>
        </div>
    );
};
