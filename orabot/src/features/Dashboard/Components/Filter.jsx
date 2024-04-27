import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

// Styles
import "../Styles/Filter.css";

const Statuses = ["To do", "Ongoing", "Done"];
const Priority = ["1", "2", "3"];

export const Filter = ({ isDeveloper }) => {
  const [priority, setPriority] = useState(null);
  const [status, setStatus] = useState(null);

  return (
    <div className="filterContainer">
      <div className="filterOpt">
        {!isDeveloper ? (
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
            <button className="btn smaller">+</button>
          </>
        )}
      </div>
      <div className="prioritySelector">
        <div className="status">
          {Statuses.map((st, index) => (
            <button
              className={status === index ? "statusSelAct" : "statusSel"}
              key={st}
              onClick={() => setStatus(status === index ? null : index)}
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
              onClick={() => setPriority(priority === index ? null : index)}
            >
              {pr}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
