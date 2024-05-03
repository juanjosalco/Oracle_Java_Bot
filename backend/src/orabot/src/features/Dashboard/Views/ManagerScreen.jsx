import React, { useState, useEffect } from "react";
// Import other necessary components and hooks

// Components
import { Task } from "../Components/Task";
import { Filter } from "../Components/Filter";

import { getTeamTasks } from "../../../api/TasksAPI";

import { useUser } from "../../../hooks/useUser";

export const ManagerScreen = (props) => {
  const { userData } = useUser();

  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const handleTeamMemberSelection = (selectedMember) => {
    setSelectedTeamMember(selectedMember);
  };

  const handleSortBy = (selectedOrder) => {
    setSortBy(selectedOrder);
  };

  const sortTasks = (tasks) => {
    if (sortBy === "priority") {
      return tasks.sort((a, b) => a.priority - b.priority);
    } else if (sortBy === "dueDate") {
      return tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else {
      return tasks;
    }
  };

  const getManagerTasks = async () => {
    const tasksX = await getTeamTasks(userData.token);
    if (tasksX.error) {
      setError(tasksX.error);
    } else {
      return tasksX;
    }
  };

  const tasksFromTeamMember = (tasks, teamMember) => {
    return tasks.filter((task) => task.assignee === Number(teamMember));
  };

  useEffect(() => {
    const getData = async () => {
      const tasksX = await getManagerTasks();
      let filteredTasks = tasksFromTeamMember(tasksX, selectedTeamMember);
      filteredTasks = sortTasks(filteredTasks); // Apply sorting here
      setTasks(filteredTasks);
    };

    getData();
  }, [selectedTeamMember, sortBy]); // Depend on sortBy to re-sort tasks when it changes

  return (
    <>
      <div className="containerDashboard">
        <h1 className="title left bold">
          Hi, these are the tasks of your team
        </h1>
        <h3 className="subtitle">
          Here you can see what your team is working on.
        </h3>
      </div>
      <Filter
        isDeveloper={props.isDeveloper}
        onTeamMemberSelected={handleTeamMemberSelection}
        onSortBySelected={handleSortBy}
      />
      {error && <p className="error">{error}</p>}
      {tasks.map((task, index) => (
        <Task key={index} task={task} isDeveloper={props.isDeveloper} />
      ))}
    </>
  );
};
