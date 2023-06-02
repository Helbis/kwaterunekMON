import React, {useState} from 'react';
import {createPerson} from "../Util/API";

function NewPersonForm(props) {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [rank, setRank] = useState("");
    const [telephone, setTelephone] = useState("");
    const [info, setInfo] = useState("");

    const handleSubmit = async () => {
        await createPerson(name, surname, rank, info, telephone)
    };

    return (
        <div id="new-person-form">
            <p>Create new person:</p>
            <input
                placeholder="Name"
                value={name}
                onChange={event => setName(event.target.value)}/>
            <input
                placeholder="Surname"
                value={surname}
                onChange={event => setSurname(event.target.value)}
            />
            <input
                placeholder="Rank"
                value={rank}
                onChange={event => setRank(event.target.value)}/>
            <input
                placeholder="Telephone"
                value={telephone}
                onChange={event => setTelephone(event.target.value)}
            />
            <input
                placeholder="Info"
                value={info}
                onChange={event => setInfo(event.target.value)}/>
            <button
                onClick={handleSubmit}>Submit
            </button>
        </div>
    );


}

export default NewPersonForm;