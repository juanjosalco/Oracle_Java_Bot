import React from "react";

// Components
import { Header } from "../../GlobalComponents/Header";

// Styles
import "../Styles/Dashboard.css";

// Screens
import { DeveloperScreen } from "./DeveloperScreen";
import { ManagerScreen } from "./ManagerScreen";

const Tasks = [
    {id: 1, title: "Task title", priority: 1, description: "This is a task", date: "2021-12-23", status: "Done"},
    {id: 2, title: "Task title", priority: 2, description: "This is a task", date: "2021-12-24", status: "Ongoing"},
    {id: 3, title: "Task title", priority: 3, description: "This is a task", date: "2021-12-25", status: "To do"},
    {id: 4, title: "Task title", priority: 1, description: "This is a task", date: "2022-05-06", status: "To do"},
    {id: 5, title: "Task title", priority: 2, description: "This is a task", date: "2023-07-12", status: "Ongoing"},
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