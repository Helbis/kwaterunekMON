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

    // TODO: translate to PL
    return (
        <div className={`formDiv`}>
        <form id="new-person-form">
            <p>Create new person</p>

            <label for="name">First name</label>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={event => setName(event.target.value)}/>

            <label for="surname">Surname</label>
            <input
                type="text"
                name="surname"
                placeholder="Surname"
                value={surname}
                onChange={event => setSurname(event.target.value)}
            />

            <label for="rank">Rank</label>
            <input
                type="text"
                name="rank"
                placeholder="Rank"
                value={rank}
                onChange={event => setRank(event.target.value)}/>

            <label for="telephone">Telephone</label>
            <input
                type="text"
                name="telephone"
                placeholder="Telephone"
                value={telephone}
                onChange={event => setTelephone(event.target.value)}
            />

            <label for="info">Info</label>
            <input
                type="text"
                name="info"
                placeholder="Info"
                value={info}
                onChange={event => setInfo(event.target.value)}/>
            <input
                type="submit"
                className={`btnSubmit`}
                onClick={handleSubmit}>
            </input>
        </form>
        </div>
    );


}

export default NewPersonForm;