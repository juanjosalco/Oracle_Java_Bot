import React from "react";
import { useLocation } from "react-router-dom";

// Components
import { Header } from "../../GlobalComponents/Header";

// Styles
import "../Styles/Dashboard.css";

// Screens
import { DeveloperScreen } from "./DeveloperScreen";
import { ManagerScreen } from "./ManagerScreen";

export const DashboardScreen = () => {

    const location = useLocation();

    const { state } = location;

    return (
        <>
        <Header />
        {state.isDeveloper ? <DeveloperScreen isDeveloper={state.isDeveloper} /> : <ManagerScreen isDeveloper={state.isDeveloper} />}
        </>
    );
}