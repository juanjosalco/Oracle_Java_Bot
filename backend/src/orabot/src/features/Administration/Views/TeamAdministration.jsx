import React, {useState} from "react";
import { useNavigate } from "react-router-dom";


// Components
import { Header } from "../../GlobalComponents/Header";

import { useUser } from "../../../hooks/useUser";

import { postTeam } from "../../../api/AdminAPI";


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
                <p className="formTitles"> Name </p>
                <textarea
                    placeholder="Name"
                    className="inputArea"
                    defaultValue={name}
                    onChange={handleNameChange}
                    rows={1}
                />
                <p className="formTitles"> Description </p>
                <textarea
                    placeholder="Description"
                    className="inputArea"
                    defaultValue={description}
                    onChange={handleDescriptionChange}
                    rows={1}
                />
                <p className="formTitles"> Manager </p>
                <textarea
                    placeholder="Description"
                    className="inputArea"
                    defaultValue={manager}
                    onChange={handleManagerChange}
                    rows={1}
                />
                <p className="formTitles"> Members </p>
            </div>
            <button className="btn" onClick={AddTeamHandler}>Create Team</button>
            {error && <p className="error">{error}</p>}
        </>
    );
}