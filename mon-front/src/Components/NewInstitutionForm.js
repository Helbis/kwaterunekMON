import React, {useState} from 'react';
import {createInstitution} from "../Util/API";

function NewInstitutionForm(props) {

    const [name, setName] = useState("");

    const handleSubmit = async () => {
        await createInstitution(name)
    };

    return (
        <div id="new-intitution-form">
            <p>Create new institution:</p>
            <input
                placeholder="Name"
                value={name}
                onChange={event => setName(event.target.value)}/>
            <button
                onClick={handleSubmit}>Submit
            </button>
        </div>
    );
}

export default NewInstitutionForm;