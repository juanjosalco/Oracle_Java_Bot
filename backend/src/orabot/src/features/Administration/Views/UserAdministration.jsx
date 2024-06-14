import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

// Components
import { Header } from "../../GlobalComponents/Header";

import "../Styles/Administration.css";
import { postUser, getAllTeams } from "../../../api/AdminAPI";

import { useUser } from "../../../hooks/useUser";
import { MyTextInput } from "../../GlobalComponents/TextInput";
import { MyButton } from "../../GlobalComponents/Button";
import "../../GlobalComponents/Styles/Selector.css";

export const UserAdministration = () => {
    const { userData } = useUser();

    // Router
  const navigate = useNavigate();


    const [firstname, setFirstName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Developer");
    const [team, setTeam] = useState(null);
    const [phonenumber, setPhone] = useState("");
    const [error, setError] = useState("");
    const [teams, setTeams] = useState([]);

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
        const fetchData = async () => {
            try {
                const data = await getAllTeams(userData.token);
                if(!data) setTeams(null);
                setTeams(data); 
            } catch (error) {
                console.error("Failed to fetch Teams:", error);
            }
        };
        fetchData();
    }, [userData]);
    
    const AddUserHandler = () => {
        addUser();
    }

    useEffect(() => {
        if (!userData.token) navigate("/");
    }, []);
    
    return(
        <>
            <Header back={true} />
            <div className="formContainer">
                <MyTextInput
                    placeholder="Name"
                    label="Name"
                    value={firstname}
                    onChange={handleNameChange}
                    
                ></MyTextInput>
                <MyTextInput
                    placeholder="Lastname"
                    label="Lastname"
                    value={lastname}
                    onChange={handleLastNameChange}
                    
                ></MyTextInput>
                <MyTextInput
                    placeholder="example@oracle.com"
                    label="Email"
                    value={email}
                    onChange={handleEmailChange}
                    
                ></MyTextInput>
                <MyTextInput
                    placeholder="********"
                    label="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    
                ></MyTextInput>
                <p className="formTitles"> Role </p>
                <select className="select-container" value={role} onChange={handleRoleChange}>
                    <option key={null} value={null}>Select a role: </option>
                    <option value="1">Developer</option>
                    <option value="2">Manager</option>
                </select>
                <p className="formTitles"> Team </p>
                <select className="select-container" value={team} onChange={handleTeamChange}>
                    <option key={null} value={null}>Select a team: </option>
                    {teams.map((team) => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                </select>
                <MyTextInput
                    placeholder="Phone number"
                    value={phonenumber}
                    onChange={handlePhoneChange}
                    label="Phone number"
                ></MyTextInput>
            {error && <p className="error">{error}</p>}
            <div className="buttonsContainer">
                <MyButton text="Cancel" onClick={() => navigate("/dashboard")}></MyButton>
                <MyButton text="Add User" onClick={AddUserHandler} className="button red"></MyButton>
            </div>
            </div>
        </>
    );
}