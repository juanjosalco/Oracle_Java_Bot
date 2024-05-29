import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

// Components
import { Header } from "../../GlobalComponents/Header";

import "../Styles/Administration.css";
import { postUser } from "../../../api/AdminAPI";

import { useUser } from "../../../hooks/useUser";

export const UserAdministration = () => {
    const { userData } = useUser();

    // Router
  const navigate = useNavigate();


    const [firstname, setFirstName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Developer");
    const [team, setTeam] = useState(1);
    const [phonenumber, setPhone] = useState("");
    const [error, setError] = useState("");

    const handleEmailChange = (e) => {
          setEmail(e.target.value);
      };
    
      const handleLastNameChange = (e) => {
        setLastname(e.target.value);
    };

    const handleNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleTeamChange = (e) => {
        setTeam(e.target.value);
    }

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const addUser = async () => {
        // GET TEAM ID
        setTeam(1);
        const newUser = {
          email: email,
          firstname: firstname,
          lastname: lastname,
          password: password,
          role: role,
          phonenumber: phonenumber,
          teamId: team
        }
        const response = await postUser(userData.token, newUser);
        if (response.error) {
            setError(response.error);
          } else {
            navigate("/dashboard", { state: { toast: "userCreated" } });
          }
    }

    
    useEffect(() => {
        const getAllTeams = async () => {
            console.log("HOLA")
            // const response = await getAllTeams(userData.token);
            // if (response.error) {
            //     setError(response.error);
            //   } else {
            //     console.log(response);
            //   }
        }
        
        getAllTeams();

    }, [userData.token]);

    
    const AddUserHandler = () => {
        addUser();
    }
    
    return(
        <>
            <Header back={true} />
            <div className="formContainer">
                <p className="formTitles"> Name </p>
                <textarea
                    placeholder="Name"
                    className="inputArea"
                    defaultValue={firstname}
                    onChange={handleNameChange}
                    rows={1}
                />
                <p className="formTitles"> Lastname </p>
                <textarea
                    placeholder="Lastname"
                    className="inputArea"
                    defaultValue={lastname}
                    onChange={handleLastNameChange}
                    rows={1}
                />
                <p className="formTitles"> Email </p>
                <textarea
                    placeholder="Email"
                    className="inputArea"
                    defaultValue={email}
                    onChange={handleEmailChange}
                    rows={1}
                />
                <p className="formTitles"> Password </p>
                <textarea
                    placeholder="Password"
                    className="inputArea"
                    defaultValue={password}
                    onChange={handlePasswordChange}
                    rows={1}
                />
                <p className="formTitles"> Role </p>
                <select value={role} onChange={handleRoleChange}>
                    <option value="1">Developer</option>
                    <option value="2">Manager</option>
                    <option value="3">Admin</option>
                </select>
                <p className="formTitles"> Team </p>
                <select value={team}>
                    <option value="1">Team1</option>
                    <option value="2">Team2</option>
                    <option value="3">Team3</option>
                </select>
                <p className="formTitles"> Phone number </p>
                <textarea
                    placeholder="Phone number"
                    className="inputArea"
                    defaultValue={phonenumber}
                    onChange={handlePhoneChange}
                    rows={1}
                />
            </div>
            <button className="btn" onClick={AddUserHandler}>Add User</button>
            {error && <p className="error">{error}</p>}
        </>
    );
}