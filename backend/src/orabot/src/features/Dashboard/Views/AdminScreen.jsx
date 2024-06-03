import React, { useEffect, useState } from "react";
import { NavLink} from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import { getBlockedUsers, unblockUser } from "../../../api/AdminAPI";

export const AdminScreen = () => {

    const { userData } = useUser();
    const [blockedUsers, setBlockedUsers] = useState([]);

    const unlockHandler = async (userID) => {
        try {
            await unblockUser(userData.token, userID);
        } catch (error) {
            console.error("Failed to unblock user:", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBlockedUsers(userData.token);
                if(!data) setBlockedUsers(null);
                setBlockedUsers(data); 
            } catch (error) {
                console.error("Failed to fetch blocked users:", error);
            }
        };
        fetchData();
    }, [userData]);

    return (
        <>
            <div className="containerDashboard">
                <div className="containerHero">
                    <h1 className="title left bold">Hi, this is the administrator view</h1>
                    <h3 className="subtitle">Here you can administrate teams, and unblock users</h3>
                </div>
                <div>
                    <NavLink to="/team" className="btnDash">Create Team</NavLink>
                    <NavLink to="/user" className="btnDash">Add User</NavLink>
                    <NavLink className="btnDash">Modify</NavLink>
                </div>

                <h1 className="title left bold">Blocked Users</h1>
                {
                    blockedUsers ? blockedUsers.map((user, index) => (
                    <div key={index} className="blockedUser">
                        <p>{user.firstname + " " + user.lastname}</p>
                        <button className="unblockBtn" onClick={() => unlockHandler(user.id)}>Unblock</button>
                    </div>
                )) : <p>No blocked users</p>
                }
            </div>
        </>
    );
}