import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { useUser } from "../../../hooks/useUser";

// Styles
import "../Styles/Filter.css";

const Statuses = ["To do", "Ongoing", "Done"];
const Priority = ["1", "2", "3"];

export const Filter = (props) => {
  const [priority, setPriority] = useState(null);
  const [status, setStatus] = useState(null);
  const { userData, saveUserData } = useUser();

  const emptyTask = {id: 0, title: "", priority: 1, description: "", dueDate: new Date(), status: ""}

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
        {!props.isDeveloper ? (
          <>
            <div className="leftSide smaller">
              <p className="textX">Sort by: </p>
              <select className="select" name="Priority">
                <option value="priority">Priority</option>
                <option value="completed">Date</option>
              </select>
            </div>
            <div className="rightSide smaller">
              <p className="textX sep">Team member: </p>
              <select className="select" name="Priority">
                <option value="priority">Sydney Sweeney</option>
                <option value="completed">Chuy</option>
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
            <NavLink className="btnAdd" to={"/task/add"} state={{task: emptyTask, isDeveloper: props.isDeveloper, isNewTask : true}}>+</NavLink>
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
