import {React} from "react";
import { NavLink } from "react-router-dom";

// Styles
import "../Styles/Task.css";

export const Task = ({ task }) => {
    
  return (
    <NavLink to={"/task/:"+task.id} state={task}>
      <div className="taskContainer">
        <div className="task">
          <div
            className={`circle ${
              task.status === "To do"
                ? "red"
                : task.status === "Ongoing"
                ? "orange"
                : "green"
            }`}
          />
          <div className="taskInfo">
            <div className="titleInfo">
              <h1 className="titleX">{task.title}</h1>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/oracle-java-bot.appspot.com/o/Assets%2FIcons%2Fediting.png?alt=media&token=4a4f5588-1d15-450c-9e7b-ec2c7e6ecd68"
                alt="Edit icon"
                width={24}
                height={24}
              />
            </div>
            <div className="priorInfo">
              <div className="prior">
                <p className="textP">{`Priority: `}</p>
                <div
                  className={`priorP `}
                >
                  <p className={`xd ${
                    task.priority === 1
                      ? "red"
                      : task.priority === 2
                      ? "orange"
                      : "green"
                  }`}>{`${task.priority}`}</p>
                </div>
              </div>

              <div className="statusX">
                <p className="static">Due date</p>
                <p className="date">{task.date}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};
