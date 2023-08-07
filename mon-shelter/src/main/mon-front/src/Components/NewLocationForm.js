import React, {useState} from 'react';
import {createLocation} from "../Util/API";

const NewLocationForm = (props) => {

    const [name, setName] = useState("");

    const handleSubmit = async () => {
        await createLocation(name)
    };

    return (
        <div className={`formDiv`} id="new-intitution-form">
            <form>
                <h2>Utwórz nową lokalizację</h2>
                <label for="name">Nazwa</label>
                <input
                    name="name"
                    type="text"
                    pattern="[A-Za-z]+"
                    maxLength="100"
                    title="Proszę użyć znaków alfabetu"
                    placeholder="Hotel pod jabłonią"
                    value={name}
                    onChange={event => setName(event.target.value)}/>

                <button
                    className={`btnSubmit`}
                    onClick={handleSubmit}
                    type="submit">
                    Utwórz Lokalizację
                </button>
            </form>
        </div>
    );
}

export default NewLocationForm;
