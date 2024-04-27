import React, {useState} from "react";

// Components
import { Header } from "../../GlobalComponents/Header";

// Styles
import "../Styles/Recover.css";


export const RecoverScreen = () => {
    const [recoverMethod, setRecoverMethod] = useState("password");
    return (
        <>
        <Header />
        <div className="container">
            <div className="options">
                <button className={recoverMethod === 'password' ? "btnSelector borderSelected" : "btnSelector"} onClick={() => setRecoverMethod('password')}>Password</button>
                <button className={recoverMethod === 'username' ? "btnSelector borderSelected" : "btnSelector"} onClick={() => setRecoverMethod('username')}>Username</button>
            </div>
            <h1 className="title">Provide your information so we can help you recover your account.</h1>
            {recoverMethod === 'username' ? <div className="inputContainer">
                <input type="text" placeholder="Name" className="inputs" />
                <input type="email" placeholder="Email" className="inputs" />
                <input type="text" placeholder="Phone Number" className="inputs" />
            </div> : <div className="inputContainer">
                <input type="text" placeholder="Username" className="inputs" />
            </div>}
            <button className="btnX">Send</button> 
        </div>
    </>
    );
    }
    
