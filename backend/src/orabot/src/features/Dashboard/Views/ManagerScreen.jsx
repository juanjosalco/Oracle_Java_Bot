import React, { useState, useEffect } from "react";

// Components
import { Task } from "../Components/Task";
import { Filter } from "../Components/Filter";

import { getTeamTasks } from "../../../api/TasksAPI";

import { useUser } from "../../../hooks/useUser";

export const ManagerScreen = (props) => {
  const { userData } = useUser();

  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [selectedTeamMember, setSelectedTeamMember] = useState("select");
  const [filterOptions, setFilterOptions] = useState({ priority: 0, status: "ALL", sortBy: "creationDate" })

  const handleTeamMemberSelection = (selectedMember) => {
    setSelectedTeamMember(selectedMember);
  };

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

  const tasksFromTeamMember = (tasks, teamMember) => {
    return teamMember === 'select' ? tasks : tasks.filter((task) => task.assignee === Number(teamMember));
  };

  useEffect(() => {
    const getData = async () => {
      const tasksX = await getManagerTasks();
      let filteredTasks = tasksFromTeamMember(tasksX, selectedTeamMember);
      filteredTasks = sortTasks(filteredTasks);
      setTasks(filteredTasks);
    };

    getData();
  }, [selectedTeamMember, filterOptions]);

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
        onFilterBy={setFilterOptions}
      />
      {error && <p className="error">{error}</p>}
      {tasks.map((task, index) => (
        <Task key={index} task={task} isDeveloper={props.isDeveloper} />
      ))}
    </>
  );
};
