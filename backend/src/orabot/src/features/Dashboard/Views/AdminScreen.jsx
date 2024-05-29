import React from "react";
import { NavLink} from "react-router-dom";

export const AdminScreen = () => {

    const blockedUsers = ["user1", "user2", "user3"];

    return (
        <>
            <div className="containerDashboard">
                <div>
                    <h1 className="title left bold">Hi, this is the administrator view</h1>
                    <h3 className="subtitle">Here you can administrate teams, and unblock users</h3>
                </div>
                <div>
                    <NavLink to="/team" className="btnDash">Create Team</NavLink>
                    <NavLink to="/user" className="btnDash">Add User</NavLink>
                    <NavLink className="btnDash">Modify</NavLink>
                </div>

                <h1 className="title left bold">Blocked Users</h1>
                {blockedUsers.map((user, index) => (
                    <div key={index} className="blockedUser">
                        <p>{user}</p>
                        <button className="unblockBtn">Unblock</button>
                    </div>
                ))}
            </div>
        </>
    );
}