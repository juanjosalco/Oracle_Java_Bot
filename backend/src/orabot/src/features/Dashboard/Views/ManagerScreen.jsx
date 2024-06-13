import React, { useState, useEffect } from "react";

// Components
import { Task } from "../Components/Task";
import { Filter } from "../Components/Filter";

import { getTeamTasks } from "../../../api/TasksAPI";

import { useUser } from "../../../hooks/useUser";

export const ManagerScreen = () => {
  const { userData } = useUser();

  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [selectedTeamMember, setSelectedTeamMember] = useState("select");
  const [filterOptions, setFilterOptions] = useState({ priority: 0, status: "ALL", sortBy: "creationDate" })

  const handleTeamMemberSelection = (selectedMember) => {
    setSelectedTeamMember(selectedMember);
  };

  const tasksFromTeamMember = (tasks, teamMember) => {
    return teamMember === 'select' ? tasks : tasks.filter((task) => task.assignee === Number(teamMember));
  };

  useEffect(() => {
    const sortTasks = (tasks) => {
      if (filterOptions.sortBy === "priority") {
        return tasks.sort((a, b) => a.priority - b.priority);
      } else if (filterOptions.sortBy === "dueDate") {
        return tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      } else {
        return tasks;
      }
    };
  
    const getManagerTasks = async () => {
      const tasksX = await getTeamTasks(userData.token, filterOptions.priority, filterOptions.sortBy, filterOptions.status);
      if (tasksX.error) {
        setError(tasksX.error);
      } else {
        return tasksX;
      }
    };

    const getData = async () => {
      const tasksX = await getManagerTasks();
      let filteredTasks = tasksFromTeamMember(tasksX, selectedTeamMember);
      filteredTasks = sortTasks(filteredTasks);
      setTasks(filteredTasks);
    };

    getData();
  }, [selectedTeamMember, filterOptions, userData.token]);

  return (
    <>
    <div className="containerDashboard">
      <Filter
        role={userData.role}
        onTeamMemberSelected={handleTeamMemberSelection}
        onFilterBy={setFilterOptions}
      />
      {error && <p className="error">{error}</p>}
      {tasks.map((task, index) => (
        <Task key={index} task={task} role={userData.role} />
      ))}
    </div>
    </>
  );
};
