import React, {useState} from "react";
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

    return(
        <>
            <Header back={true} />
            <div className="formContainer">
                <h1 className="formTitles"> Name </h1>
                <MyTextInput
                    placeholder="Name"
                    value={name}
                    onChange={handleNameChange}
                    className={"inputArea"}
                ></MyTextInput>
                <p className="formTitles"> Description </p>
                <MyTextInput
                    placeholder="Description"
                    value={description}
                    onChange={handleDescriptionChange}
                    className={"inputArea"}
                >
                </MyTextInput>
                <p className="formTitles"> Manager </p>
                <MyTextInput
                    placeholder="Manager"
                    value={manager}
                    onChange={handleManagerChange}
                    className={"inputArea"}
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