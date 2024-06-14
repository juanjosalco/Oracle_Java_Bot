import {React, useEffect, useState} from "react";

// Styles
import "../Styles/Hero.css";

//Hooks
import { useUser } from "../../../hooks/useUser";


export const Hero = () => {
  const { userData } = useUser();
  const [ message, setMessage ] = useState("");
  const [ title, setTitle ] = useState("");

  useEffect(() => {
    const dailyMessage = [
      "Welcome to your dashboard",
      "What are you working on today?",
      "What's on your mind today?",
      "What's your plan for today?",
      "Let's get started!",
      "Hello! Ready to tackle your tasks today?",
      "What's your focus for today?",
      "What goals are you setting today?",
      "How can we make today productive?",
      "What's the first task on your list?",
      "Let's achieve something great today!",
      "What are your priorities for today?",
      "How can we assist with your tasks today?",
      "What will you accomplish today?",
      "Let's start your day with a plan!"
    ];

    switch (userData?.role) {
      case "Manager":
        setMessage("Welcome Manager, here you can see your team's tasks");
        break;
      case "Developer":
        setMessage("Welcome Developer, here you can see and manage your tasks");
        break;
      case "Notch":
        setMessage("Welcome Admin, here you can manage users and teams");
        break;
      default:
        setMessage("Get out of here!");
        break;
    }

    setTitle(dailyMessage[Math.floor(Math.random() * dailyMessage.length)]);
  }, [userData.role]);

  return (
    <>
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">{userData.role === "Notch" ? "Administration Dashboard": title }</h1>
          <p className="hero-text">{message}</p>
        </div>

      </div>
  </>
  );
};