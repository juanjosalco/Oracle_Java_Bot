import React from "react";

// Components
import { Header } from "../../GlobalComponents/Header";

// Styles
import "../Styles/Dashboard.css";

// Screens
import { DeveloperScreen } from "./DeveloperScreen";
import { ManagerScreen } from "./ManagerScreen";

const Tasks = [
    {title: "Task title", priority: 1, description: "This is a task", date: "12/12/2021", status: "Completed"},
    {title: "Task title", priority: 2, description: "This is a task", date: "12/12/2021", status: "Ongoing"},
    {title: "Task title", priority: 3, description: "This is a task", date: "12/12/2021", status: "To do"},
    {title: "Task title", priority: 1, description: "This is a task", date: "12/12/2021", status: "To do"},
    {title: "Task title", priority: 2, description: "This is a task", date: "12/12/2021", status: "Ongoing"},
]

export const DashboardScreen = () => {
    const isDeveloper = false;

    return (
        <>
        <Header />
        {isDeveloper ? <DeveloperScreen tasks={Tasks} isDeveloper={isDeveloper} /> : <ManagerScreen tasks={Tasks} isDeveloper={isDeveloper} />}
        </>
    );
}