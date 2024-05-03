import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useUser } from "../../../hooks/useUser";
import { getTeamMembers } from "../../../api/AuthAPI";

// Styles
import "../Styles/Filter.css";

const Statuses = ["To do", "Ongoing", "Done"];
const Priority = ["1", "2", "3"];

export const Filter = ({isDeveloper, onTeamMemberSelected, onSortBySelected}) => {
  const [priority, setPriority] = useState(null);
  const [status, setStatus] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const { userData, saveUserData } = useUser();

  const handleTeamMemberSelection = (selectedMember) => {
    onTeamMemberSelected(selectedMember);
  }

  const handleSortBy = (select) => {
    onSortBySelected(select);
  }
  

  useEffect(() => {
    const getData = async () => {
      const teamMembersX = await getTeamMembers(userData.token)
      const keys = Object.keys(teamMembersX)
      const values = Object.values(teamMembersX)
      const arrayOfMembers = []
      keys.forEach((key, index) => {
        arrayOfMembers.push({id: key, name: values[index]})
      })
      setTeamMembers(arrayOfMembers)
    }
    getData()
  }, []);


  

  const emptyTask = {id: 0, title: "", priority: 1, description: "", dueDate: Date.now(), status: ""}

  const handlePriority = (index) => {
    console.log(index)
    setPriority(priority === index ? null : index)
    saveUserData({
      sort: priority
    })
  }

  const handleStatus = (index) => {
    console.log(index)
    setStatus(status === index ? null : index)
    saveUserData({
      sort: status
    })
  }

  return (
    <div className="filterContainer">
      <div className="filterOpt">
        {!isDeveloper ? (
          <>
            <div className="leftSide smaller">
              <p className="textX">Sort by: </p>
              <select className="select" name="Priority" onChange={(e) => handleSortBy(e.target.value)}>
                <option value="selectOrder">Select</option>
                <option value="priority">Priority</option>
                <option value="dueDate">Due date</option>
              </select>
            </div>
            <div className="rightSide smaller">
              <p className="textX sep">Team member: </p>
              <select className="select" name="Priority" onChange={(e) => handleTeamMemberSelection(e.target.value)}>
                <option value="selectMember">Select</option>
                {teamMembers.map((member, index) => (
                  <option key={index} value={member.id}>{member.name}</option>
                ))
                }
              </select>
            </div>
          </>
        ) : (
          <>
            <div className="leftSide bigger">
              <p className="textX">Sort by: </p>
              <select className="select" name="Priority">
                <option value="priority">Priority</option>
                <option value="completed">Date</option>
              </select>
            </div>
            <NavLink className="btnAdd" to={"/task/add"} state={{task: emptyTask, isDeveloper: isDeveloper, isNewTask : true}}>+</NavLink>
          </>
        )}
      </div>
      <div className="prioritySelector">
        <div className="status">
          {Statuses.map((st, index) => (
            <button
              className={status === index ? "statusSelAct" : "statusSel"}
              key={st}
              onClick={() => handleStatus(index)}
            >
              {st}
            </button>
          ))}
        </div>
        <div className="priority">
          {Priority.map((pr, index) => (
            <button
              className={priority === index ? "prioritySelAct" : "prioritySel"}
              key={pr}
              onClick={() => handlePriority(index)}
            >
              {pr}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
