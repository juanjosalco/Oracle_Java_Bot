import React, { useState } from "react";
import "./Styles/TextInput.css";
import { calculateBytes } from "./Utils/ByteCounter";

export const MyTextInput = ({ label, value, onChange, type, placeholder, className, maxLength }) => {
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

    if (className === undefined) className = "inputs";

    return (
        <div className="container">
            <label>{label}</label>
            <input
                type={type === "password"? (isVisible? "text" : "password") : type}
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                className={`${className} ${type === "password"? "relative" : ""}`}
                maxLength={maxLength ? maxLength : 1024}
            />
            <div className="decorations">
                {type === "password" && (
                    <img className="eyeButton" src={isVisible? "https://objectstorage.mx-queretaro-1.oraclecloud.com/p/AQJ9ycvPcEbPudU4ypftS1cFQPvSk1b4x9St_e_P4g7ERieTAgagRPGa5-jzpb2P/n/axgyv8vo90ix/b/orabot-ooxbf/o/image-eye-closed" : "https://objectstorage.mx-queretaro-1.oraclecloud.com/p/AQJ9ycvPcEbPudU4ypftS1cFQPvSk1b4x9St_e_P4g7ERieTAgagRPGa5-jzpb2P/n/axgyv8vo90ix/b/orabot-ooxbf/o/image-eye-open"} onClick={() => setIsVisible(!isVisible)} alt="fjapof">
                    </img>
                )}
                {maxLength ? <span className={calculateBytes(inputValue) === maxLength ?  "character-counter-overflow" : "character-counter"} >{calculateBytes(inputValue)}/{maxLength}</span> : null}
            </div>
        </div>
    );
};
