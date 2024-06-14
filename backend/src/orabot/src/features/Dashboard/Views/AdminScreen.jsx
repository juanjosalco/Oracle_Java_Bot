import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"; 
import { useUser } from "../../../hooks/useUser";
import { getBlockedUsers, unblockUser } from "../../../api/AdminAPI";
import { MyButton } from "../../GlobalComponents/Button";

export const AdminScreen = () => {

    const { userData } = useUser();
    const [blockedUsers, setBlockedUsers] = useState([]);
    const navigate = useNavigate();

    const unlockHandler = async (userID) => {
        try {
            await unblockUser(userData.token, userID).then(() => {
                setBlockedUsers(blockedUsers.filter(user => user.id !== userID));
            });
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
                <div className="buttonsContainer">
                    <MyButton className="orange-button" onClick={() => {navigate("/team")}} text={"Create Team"}></MyButton>
                    <MyButton className="orange-button" onClick={() => {navigate("/user")}} text={"Add User"}></MyButton>
                </div>

                <div className="blocked-users-header">
                    <h1>Blocked Users</h1>
                </div>
                <div className="blocked-users-container">
                    {
                        blockedUsers ? blockedUsers.map((user, index) => (
                        <div key={index} className="blocked-user">
                            <p>{user.firstname + " " + user.lastname}</p>
                            <MyButton  text="Unblock" onClick={() => unlockHandler(user.id)}/>
                        </div>
                    )) : <p>No blocked users</p>
                    }
                </div>
            </div>
        </>
    );
}