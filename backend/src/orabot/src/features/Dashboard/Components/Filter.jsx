import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useUser } from "../../../hooks/useUser";
import { getTeamMembers } from "../../../api/AuthAPI";
import Modal from "../../GlobalComponents/Modal";

// Styles
import "../Styles/Filter.css";

const Statuses = ["ToDo", "Ongoing", "Done"];
const Priority = ["1", "2", "3"];

export const Filter = ({role, onTeamMemberSelected, onFilterBy}) => {
  const { userData } = useUser();

  const [priority, setPriority] = useState(-1);
  const [status, setStatus] = useState("ALL");
  const [sortBy, setSortBy] = useState("creationDate");
  const [statusName, setStatusName] = useState("ALL");

  const [teamMembers, setTeamMembers] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const applyFilter = () => {
    setShowModal(false);
    onFilterBy({priority: priority+1, status: statusName, sortBy: sortBy});
  };

  const handleTeamMemberSelection = (selectedMember) => {
    onTeamMemberSelected(selectedMember);
  }

  const handleSortBy = (select) => {
    setSortBy(select);
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
    if(role === "Manager") getData();
  }, [userData.token, role]);

  const emptyTask = {id: 0, title: "", priority: 1, description: "", dueDate: new Date(), status: ""}

  const handlePriority = (index) => {
    const newIndex = index === priority ? null : index;
    setPriority(newIndex === null ? -1 : newIndex);
  };
  

  const handleStatus = (index) => {
    const newIndex = index === status ? null : index;
    setStatus(newIndex !== status ? newIndex : null);
    setStatusName(newIndex !== null ? Statuses[newIndex] : "ALL");
    };

  return (
    <div className="filter-background">
      <div className="filterContainer">
        <Modal show={showModal} handleClose={toggleModal} applyFilter={applyFilter} title={"Sort by"}>
          <div>
            <div >
              <h3 >Sort by: </h3>
              <select name="Priority" onChange={(e) => handleSortBy(e.target.value)}>
                <option value="creationDate">Select</option>
                <option value="priority">Priority</option>
                <option value="dueDate">Due Date</option>
              </select>
              <NavLink className="btnArchived leftMargin" to={"/archive"}><p>Archived</p></NavLink>
            </div>
            <div className="priority">
              <h3 >Priority: </h3>
              <div className="prioritySelector">
                {Priority.map((p, index) => (
                  <button key={index} className={`priorityButton ${priority === index ? "prioritySelAct white" : "prioritySel white"}`} onClick={() => handlePriority(index)}>{p}</button>
                ))}
              </div>
              </div>
            <div className="priority">
              <h3 >Status: </h3>
              <div className="statusSelector">
                {Statuses.map((s, index) => (
                  <button key={index} className={`statusButton ${status === index ? "statusSelAct white" : "statusSel white"}`} onClick={() => handleStatus(index )}>{s}</button>
                ))}
              </div>
              </div>
          </div>
        </Modal>
        <div className="filterOpt">
          {role!=="Developer" ? (
            <>
              <div className="leftSide smaller">
                <div className="burguerMenu" onClick={toggleModal}>
                  <img src="https://objectstorage.mx-queretaro-1.oraclecloud.com/p/AQJ9ycvPcEbPudU4ypftS1cFQPvSk1b4x9St_e_P4g7ERieTAgagRPGa5-jzpb2P/n/axgyv8vo90ix/b/orabot-ooxbf/o/image-filter-icon" alt="Burger menu for sorting and filter" width={'100%'} height={'100%'} className="imageB" />
                </div>
              </div>
              <div className="rightSide smaller">
                <div className="teamM"><p className="textX sep">Team member: </p></div>
                <select className="select" name="Priority" onChange={(e) => handleTeamMemberSelection(e.target.value)}>
                  <option value="select">All</option>
                  {teamMembers.map((member, index) => (
                    <option key={index} value={member.id}>{member.name}</option>
                  ))
                  }
                </select>
              </div>
            </>
          ) : (
            <>
            <div className="leftSide smaller">
                <div className="burguerMenu" onClick={toggleModal}>
                  <img src="https://objectstorage.mx-queretaro-1.oraclecloud.com/p/AQJ9ycvPcEbPudU4ypftS1cFQPvSk1b4x9St_e_P4g7ERieTAgagRPGa5-jzpb2P/n/axgyv8vo90ix/b/orabot-ooxbf/o/image-filter-icon" alt="Burger Menu for sorting and filter" width={'100%'} height={'100%'} className="imageB" />
                </div>
              </div>
              <NavLink className="btnAdd" to={"/task/add"} state={{task: emptyTask, role: role, isNewTask : true}}>+</NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
