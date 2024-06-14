import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";


// Components
import { Header } from "../../GlobalComponents/Header";

import { useUser } from "../../../hooks/useUser";

import { getManagers, postTeam } from "../../../api/AdminAPI";
import { MyTextInput } from "../../GlobalComponents/TextInput";
import { MyButton } from "../../GlobalComponents/Button";


export const TeamAdministration = () => {

    const { userData } = useUser();

    // Router
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [manager, setManager] = useState("");
  const [description, setDescription] = useState(null);
  const [error, setError] = useState("");
  const [managers, setManagers] = useState([]);

  const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleManagerChange = (e) => {
        setManager(e.target.value);
    }

    const CreateTeam = async () => {
        const team = {
          name: name,
          description: description,
          manager: manager,
        }
        const response = await postTeam(userData.token, team);
        if (response.error) {
            setError(response.error);
          } else {
            navigate("/dashboard", { state: { toast: "teamCreated" } });
          }
    }

    const AddTeamHandler = () => {
        CreateTeam();
    }

    useEffect(() => {
        if (!userData.token) navigate("/");
        const fetchManagers = async () => {
            const response = await getManagers(userData.token);
            const managers = response.filter((manager) => manager.team === null);
            if (response.error) {
                setError(response.error);
            } else {
                setManagers(managers);
            }
        }
        fetchManagers();
    }, [managers, userData.token, navigate]);

    return(
        <>
            <Header back={true} />
            <div className="formContainer">
                <MyTextInput
                    placeholder="Team name"
                    label="Name"
                    value={name}
                    onChange={handleNameChange}
                ></MyTextInput>
                <MyTextInput
                    placeholder="Description"
                    label="Description"
                    value={description}
                    onChange={handleDescriptionChange}
                >
                </MyTextInput>
                <h4>Manager:</h4>
                <select className="select-container" value={manager} onChange={handleManagerChange}>
                    { managers.length > 0 ? <option key={-1} value={null}>Select staff as manager: </option> : null} 
                    {
                        managers.length > 0 ?
                        managers.map((manager) => (
                            <option key={manager.id} value={manager.id}>{manager.firstname + " " + manager.lastname}</option>
                        ))
                        :
                        <option key={null} value={null}>No managers available</option>
                    }
                </select>

            </div>
            <div className="buttonsContainer">
                <MyButton text={"Cancel"} onClick={() => navigate("/dashboard")}></MyButton>
                <MyButton text={"Create Team"} onClick={AddTeamHandler} className={"button red"}></MyButton>
            </div>
            {error && <p className="error">{error}</p>}
        </>
    );
}