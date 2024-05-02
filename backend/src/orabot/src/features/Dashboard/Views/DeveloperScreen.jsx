import React, { useEffect, useState } from "react";

// Components
import { Task } from "../Components/Task";
import { Filter } from "../Components/Filter";

import { getTasks } from "../../../api/TasksAPI";

import { useUser } from "../../../hooks/useUser";

export const DeveloperScreen = (props) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const { userData } = useUser();

  const getDeveloperTasks = async () => {
    const tasks = await getTasks(userData.token);
    if (tasks.error) {
      setError(tasks.error);
    } else {
      setTasks(tasks);
    } 
  };

  useEffect(() => {
getDeveloperTasks()
  }, []);

  return (
    <>
      <div className="containerDashboard">
        <h1 className="title left bold">Hi, these are your tasks</h1>
        <h3 className="subtitle">
          Here you can see and modify your assigned tasks.
        </h3>
      </div>
      <Filter isDeveloper={props.isDeveloper} />
      {error && <p className="error">{error}</p>}
      {tasks.map((task, index) => (
        <Task key={index} task={task} isDeveloper={props.isDeveloper} />
      ))}
    </>
  );
};
