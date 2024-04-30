import React from "react";

// Components
import { Task } from "../Components/Task";
import { Filter } from "../Components/Filter";

export const ManagerScreen = (props) => {
    return (
        <>
          <div className="containerDashboard">
            <h1 className="title left bold">Hi, these are the tasks of your team</h1>
            <h3 className="subtitle">
                Here you can see what your team is working on.
            </h3>
          </div>
          <Filter isDeveloper={props.isDeveloper} />
          {props.tasks.map((task, index) => (
            <Task key={index} task={task} isDeveloper={props.isDeveloper}/>
          ))}
        </>
      );
}