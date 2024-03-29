import React, {useState} from 'react';
import {createPerson} from "../Util/API";

const NewPersonForm = (props) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [institution, setInstitution] = useState("")
    const [rank, setRank] = useState("");
    const [telephone, setTelephone] = useState("");
    const [info, setInfo] = useState("");

    const handleSubmit = async () => {
        await createPerson(name, surname, institution, rank, info, telephone)
    };

    return (
        <div className={`formDiv`}>
            <h2>Dodaj nową osobę</h2>
            <label for="name">*Imię</label>
            <input
                className={'text-input'}
                type="text"
                name="name"
                placeholder="Jan"
                pattern="[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s\-]+"
                title="Proszę użyć znaków alfabetu"
                maxLength="100"
                value={name}
                onChange={event => setName(event.target.value)}/>

            <label for="surname">*Nazwisko</label>
            <input
                className={'text-input'}
                type="text"
                name="surname"
                placeholder="Kowalski"
                pattern="[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s\-]+"
                title="Proszę użyć znaków alfabetu"
                maxLength="100"
                value={surname}
                onChange={event => setSurname(event.target.value)}
            />
            <label htmlFor="name">*Instytucja</label>
            <input
                className={'text-input'}
                type="text"
                name="name"
                placeholder="Instytucja"
                title="Proszę użyć znaków alfabetu"
                maxLength="100"
                value={institution}
                onChange={event => setInstitution(event.target.value)}/>

            <label for="rank">Ranga</label>
            <input
                className={'text-input'}
                type="text"
                name="rank"
                placeholder="Szeregowy"
                title="Proszę użyć znaków alfabetu"
                maxLength="100"
                value={rank}
                onChange={event => setRank(event.target.value)}/>

            <label for="telephone">Numer Telefonu</label>
            <input
                className={'text-input'}
                type="tel"
                name="telephone"
                placeholder="+48654876999"
                title="Proszę wpisać numer telefonu jako +48XXXYYYZZZ lub XXXYYYZZZ"
                value={telephone}
                onChange={event => setTelephone(event.target.value)}
            />

            <label for="info">Informacje dodatkowe</label>
            <input
                className={'text-input'}
                type="text"
                name="info"
                maxLength="500"
                placeholder="Dodatkowe informacje"
                title="Maksymalna liczba znaków to 500"
                value={info}
                onChange={event => setInfo(event.target.value)}/>
            <button
                className={`btnSubmit`}
                onClick={handleSubmit}>
                Zatwierdź
            </button>
        </div>
    );
}

export default NewPersonForm;
