import React, { useEffect, useState } from "react";

// Styles 
import "../Styles/Archive.css";

// Hooks
import { useUser } from "../../../hooks/useUser";

// Components
import { Header } from "../../GlobalComponents/Header";

// Functions
import { getTeamArchivedTasks, getUserArchivedTasks } from "../../../api/TasksAPI";
import { Task } from "../Components/Task";

export const ArchiveScreen = () => {

    const { userData } = useUser();

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");

    const handleDateChangeStart = (e) => {
        const newDate = e.target.value;
        const formattedDate = new Date(newDate).toISOString().split("T")[0];
        setStartDate(formattedDate);
    };

    const handleDateChangeEnd = (e) => {
        const newDate = e.target.value;
        const formattedDate = new Date(newDate).toISOString().split("T")[0];
        setEndDate(formattedDate);
    };

    useEffect(() => {
        const getAllTasks = async () => {
            const tasksX = await userData.role === "Developer" ? getUserArchivedTasks(userData.token) : getTeamArchivedTasks(userData.token);
            if (tasksX.error) {
                setError(tasksX.error);
            } else {
                return tasksX;
            }
        };

        const getData = async () => {
            const tasksX = await getAllTasks();
            setTasks(tasksX);
            setFilteredTasks(tasksX);
        };

        getData();
    }, [userData.token, userData.role]);

    const handleRanges = () => {
        if (startDate !== "" && endDate !== "") {
            const tasksBetweenRanges = tasks.filter(task => {
                const taskDate = new Date(task.dueDate).toISOString().split("T")[0];
                return taskDate >= startDate && taskDate <= endDate;
            });
            setFilteredTasks(tasksBetweenRanges);
        } else {
            setFilteredTasks(tasks);
        }
    }

    return (
        <>
            <Header back={true} />
            <div className="containerDashboard">
                <h1>Here are the tasks that have been cancelled over time</h1>
                <div className="dates">
                    <h3 className="selection">Start Date</h3>
                    <h3 className="selection">End Date</h3>
                </div>
                <div className="dates">
                    <input
                        type="date"
                        className="dueDate right"
                        onChange={handleDateChangeStart}
                    />
                    <input
                        type="date"
                        className="dueDate left"
                        onChange={handleDateChangeEnd}
                    />
                </div>
                <button className="btnRange" onClick={handleRanges}>Select range</button>
                {error && <p className="error">{error}</p>}
            </div>
            {filteredTasks.map((task, index) => (
                <Task key={index} task={task} role={userData.role} />
            ))}
        </>
    );
}
