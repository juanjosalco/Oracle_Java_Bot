import React, {useEffect} from "react";
import { useLocation } from "react-router-dom";

// Components
import { Header } from "../../GlobalComponents/Header";

import toast, { Toaster } from 'react-hot-toast';

// Styles
import "../Styles/Dashboard.css";

// Screens
import { DeveloperScreen } from "./DeveloperScreen";
import { ManagerScreen } from "./ManagerScreen";

export const DashboardScreen = () => {

    const handleToast = (message) => {
        if(message === "taskCreated"){
            toast.success("Task created successfully", {
                duration: 4000,
            });
        }
        else if(message === "taskDeleted"){
            toast.success("Task deleted successfully", {
                duration: 4000,
            });
        }
        else if(message === "taskUpdated"){
            toast.success("Task updated successfully", {
                duration: 4000,
            });
        }
    }

    const location = useLocation();

    const { state } = location;

    useEffect(() => {
        handleToast(state.toast)
          }, [state.toast]);

    return (
        <>
        <Header />
        {state.isDeveloper ? <DeveloperScreen isDeveloper={state.isDeveloper} /> : <ManagerScreen isDeveloper={state.isDeveloper} />}
        <Toaster />
        </>
    );
}