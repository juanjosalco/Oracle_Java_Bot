import React, { useState } from "react"; // Importa useState de React

import { useNavigate } from "react-router-dom";
import {emailRegex} from "../../GlobalComponents/Utils/RegexUtils";

// Components
import { Header } from "../../GlobalComponents/Header";
import { emailSend } from "../../../api/EmailAPI";

// Styles
import "../Styles/Recover.css";
import { MyTextInput } from "../../GlobalComponents/TextInput";
import { MyButton } from "../../GlobalComponents/Button";

export const RecoverScreen = () => {
    const navigate = useNavigate();
    const [userEmail, setEmail] = useState(""); // Inicializa el estado email
    const [error, setError] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
      };

    const handleEmailSend = async () => {
        // Valida el correo electrónico usando emailRegex
        if (!emailRegex.test(userEmail)) {
            setError("Please enter a valid email address.");
            return; // Detiene la ejecución si el correo electrónico no es válido
        }

        const response = await emailSend(userEmail);
        if (response.error) {
            setError(response.error);
        } else {
            navigate("/ticket");
        }
    };

    return (
        <>
            <Header back={true}/>
            <div className="container">
                <div className="options">
                    <button className={"btnSelector borderSelected"}>Password reset</button>
                </div>
                <h1 className="titleRecover">Provide your information so we can help you recover your account.</h1>
                <div className="inputContainer">
                    <MyTextInput 
                        type={"text"}
                        placeholder={"Email"}
                        value={userEmail}
                        onChange={handleEmail}>

                    </MyTextInput>
                </div>
                {error && <p className="error">{error}</p>}
                <MyButton text={"Send"} onClick={handleEmailSend} className={"btnGlobal"}/>
            </div>
        </>
    );
}

    

    
