import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Styles 
import "../Styles/Archive.css";

// Hooks
import { useUser } from "../../../hooks/useUser";

// Components
import { Header } from "../../GlobalComponents/Header";
import { MyButton } from "../../GlobalComponents/Button"
// Functions
import { getTeamArchivedTasks, getUserArchivedTasks } from "../../../api/TasksAPI";
import { Task } from "../Components/Task";
import { MyTextInput } from "../../GlobalComponents/TextInput";

export const ArchiveScreen = () => {

    const { userData } = useUser();
    const navigate = useNavigate();

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
        if (!userData.token) navigate("/");
    });


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
            const sortedTasks = tasksBetweenRanges.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            setFilteredTasks(sortedTasks);
        } else {
            const sortedTasks = tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            setFilteredTasks(sortedTasks);
        }
    }

    return (
        <>
            <Header back={true} />
            <div className="archived-main-container">
                <div className="archived-background">
                    <h1 className="title">Here are the tasks that have been cancelled over time</h1>
                </div>
                <div className="archived-header-container">
                    <div className="dates">
                        <div>
                            <h3 className="selection">Start Date</h3>
                            <MyTextInput
                                type="date"
                                onChange={handleDateChangeStart}                    
                            />
                        </div>
                        <div>
                            <h3 className="selection">End Date</h3>
                            <MyTextInput
                                type="date"
                                onChange={handleDateChangeEnd}                    
                            />
                        </div>
                    </div>
                    <MyButton onClick={handleRanges} text={"Select range"} className={"orange-button"}/>
                    {error && <p className="error">{error}</p>}
                </div>
                <div className="task-list-container">
                    {error && <p className="error">{error}</p>}
                    {filteredTasks.map((task, index) => (
                    <Task key={index} task={task} role={userData.role} />
                    ))}
                </div>
            </div>
        </>
    );
}
