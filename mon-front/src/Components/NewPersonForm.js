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

  return (
    <div className={`formDiv`}>
      <form id="new-person-form">
        <h2>Dodaj nową osobę</h2>

        <label for="name">Pierwsze imię</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={event => setName(event.target.value)} />

        <label for="surname">Nazwisko</label>
        <input
          type="text"
          name="surname"
          placeholder="Surname"
          value={surname}
          onChange={event => setSurname(event.target.value)}
        />

        <label for="rank">Ranga</label>
        <input
          type="text"
          name="rank"
          placeholder="Rank"
          value={rank}
          onChange={event => setRank(event.target.value)} />

        <label for="telephone">Telefon</label>
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
          onChange={event => setInfo(event.target.value)} />
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