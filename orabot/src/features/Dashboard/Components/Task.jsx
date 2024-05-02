import {React} from "react";
import { NavLink } from "react-router-dom";

// Styles
import "../Styles/Task.css";

export const Task = (props) => {

  const date = new Date(props.task.dueDate).toISOString().split("T")[0];
  
  return (
    <NavLink to={"/task/:"+props.task.id} state={{task: props.task, isDeveloper: props.isDeveloper}}>
      <div className="taskContainer">
        <div className="task">
          <div
            className={`circle ${
              props.task.status === "To do"
                ? "red"
                : props.task.status === "Ongoing"
                ? "orange"
                : "green"
            }`}
          />
          <div className="taskInfo">
            <div className="titleInfo">
              <h1 className="titleX">{props.task.title}</h1>
              {props.isDeveloper && <img
                src="https://firebasestorage.googleapis.com/v0/b/oracle-java-bot.appspot.com/o/Assets%2FIcons%2Fediting.png?alt=media&token=4a4f5588-1d15-450c-9e7b-ec2c7e6ecd68"
                alt="Edit icon"
                width={24}
                height={24}
              />}
            </div>
            <div className="priorInfo">
              <div className="prior">
                <p className="textP">{`Priority: `}</p>
                <div
                  className={`priorP `}
                >
                  <p className={`xd ${
                    props.task.priority === 1
                      ? "red"
                      : props.task.priority === 2
                      ? "orange"
                      : "green"
                  }`}>{`${props.task.priority}`}</p>
                </div>
              </div>

              <div className="statusX">
                <p className="static">Due date</p>
                <p className="date">{date}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};
