import React, { useState } from 'react';
import { createPerson } from "../Util/API";

const NewPersonForm = (props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [rank, setRank] = useState("");
  const [telephone, setTelephone] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = async () => {
    await createPerson(name, surname, rank, info, telephone)
  };
// TODO: text for button
  return (
    <div className={`formDiv`}>
      <form id="new-person-form">
        <h2>Dodaj nową osobę</h2>

        <label for="name">Pierwsze imię</label>
        <input
          type="text"
          name="name"
          placeholder="Jan"
          value={name}
          onChange={event => setName(event.target.value)} />

        <label for="surname">Nazwisko</label>
        <input
          type="text"
          name="surname"
          placeholder="Kowalski"
          value={surname}
          onChange={event => setSurname(event.target.value)}
        />

        <label for="rank">Ranga</label>
        <input
          type="text"
          name="rank"
          placeholder="Szeregowy"
          value={rank}
          onChange={event => setRank(event.target.value)} />

        <label for="telephone">Telefon</label>
        <input
          type="text"
          name="telephone"
          placeholder="+48654876999"
          value={telephone}
          onChange={event => setTelephone(event.target.value)}
        />

        <label for="info">Info</label>
        <input
          type="text"
          name="info"
          placeholder="Dodatkowe informacje"
          value={info}
          onChange={event => setInfo(event.target.value)} />
        <button
          className={`btnSubmit`}
          onClick={handleSubmit}>
        </button>
      </form>
    </div>
  );
}

export default NewPersonForm;