import React, {useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Components
import { Header } from "../../GlobalComponents/Header";
import { useUser } from "../../../hooks/useUser";
import toast, { Toaster } from 'react-hot-toast';


// Styles
import "../Styles/Dashboard.css";

// Screens
import { DeveloperScreen } from "./DeveloperScreen";
import { ManagerScreen } from "./ManagerScreen";
import { AdminScreen } from "./AdminScreen";

export const DashboardScreen = () => {

    const { userData } = useUser();

    const location = useLocation();
    const navigate = useNavigate();

    const { state } = location;

    const handleToast = () => {
        if(!state) return;
        if(state.toast === "taskCreated"){
            toast.success("Task created successfully", {
                duration: 4000,
            });
        }
        else if(state.toast === "taskDeleted"){
            toast.success("Task deleted successfully", {
                duration: 4000,
            });
        }
        else if(state.toast === "taskUpdated"){
            toast.success("Task updated successfully", {
                duration: 4000,
            });
        }
        else if(state.toast === "userCreated"){
            toast.success("User created successfully", {
                duration: 4000,
            });
        }
        else if(state.toast === "teamCreated"){
            toast.success("Team created successfully", {
                duration: 4000,
            });
        }
    }

    useEffect(() => {
        if (!userData.token) navigate("/");
        else handleToast()
    });

    return (
        <>
        <Header />
        {userData.role === "Developer" ? <DeveloperScreen /> : <div></div>}
        {userData.role === "Manager" ? <ManagerScreen /> : <div></div>}
        {userData.role === "Notch" ? <AdminScreen /> : <div></div>}
        <Toaster />
        </>
    );
}