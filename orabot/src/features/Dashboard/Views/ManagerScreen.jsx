import React, {useState, useEffect} from "react";

// Components
import { Task } from "../Components/Task";
import { Filter } from "../Components/Filter";

import { getTeamTasks } from "../../../api/TasksAPI";

import { useUser } from "../../../hooks/useUser";

export const ManagerScreen = (props) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const { userData } = useUser();

  const getManagerTasks = async () => {
    const tasks = await getTeamTasks(userData.token);
    if (tasks.error) {
      setError(tasks.error);
    } else {
      setTasks(tasks);
    } 
  };

  useEffect(() => {
    getManagerTasks()
      }, []);

    return (
        <>
          <div className="containerDashboard">
            <h1 className="title left bold">Hi, these are the tasks of your team</h1>
            <h3 className="subtitle">
                Here you can see what your team is working on.
            </h3>
          </div>
          <Filter isDeveloper={props.isDeveloper} />
          {error && <p className="error">{error}</p>}
          {tasks.map((task, index) => (
            <Task key={index} task={task} isDeveloper={props.isDeveloper} />
        ))}
        </>
      );
}