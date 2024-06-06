import React from "react";
import "./Styles/TextInput.css";

export const MyTextInput = ({ label, value, onChange, type, placeholder, className }) => {
    const [isVisible, setIsVisible] = React.useState(false);

    if (className === undefined) className = "inputs";

    return (
        <div className="container">
            <label>{label}</label>
            <input
                type={type === "password" ? (isVisible ? "text" : "password") : type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`${className} ${type === "password" ? "relative" : ""}`}
            />
            {type === "password" && (
                <img className="eyeButton" src={isVisible ? "https://objectstorage.mx-queretaro-1.oraclecloud.com/p/AQJ9ycvPcEbPudU4ypftS1cFQPvSk1b4x9St_e_P4g7ERieTAgagRPGa5-jzpb2P/n/axgyv8vo90ix/b/orabot-ooxbf/o/image-eye-closed" : "https://objectstorage.mx-queretaro-1.oraclecloud.com/p/AQJ9ycvPcEbPudU4ypftS1cFQPvSk1b4x9St_e_P4g7ERieTAgagRPGa5-jzpb2P/n/axgyv8vo90ix/b/orabot-ooxbf/o/image-eye-open"} onClick={() => setIsVisible(!isVisible)} alt="fjapof">
                </img>
            )}
        </div>
    );
};
