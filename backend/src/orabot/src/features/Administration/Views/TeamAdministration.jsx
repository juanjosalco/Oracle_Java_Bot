import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";


// Components
import { Header } from "../../GlobalComponents/Header";

import { useUser } from "../../../hooks/useUser";

import { postTeam } from "../../../api/AdminAPI";
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
  const [userDate] = useState(userData.user);

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
    });

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
                <MyTextInput
                    placeholder="Manager"
                    label="Manager"
                    value={manager}
                    onChange={handleManagerChange}
                >
                </MyTextInput>
            </div>
            <div className="buttonsContainer">
                <MyButton text={"Cancel"} onClick={() => navigate("/dashboard")}></MyButton>
                <MyButton text={"Create Team"} onClick={AddTeamHandler} className={"button red"}></MyButton>
            </div>
            {error && <p className="error">{error}</p>}
        </>
    );
}