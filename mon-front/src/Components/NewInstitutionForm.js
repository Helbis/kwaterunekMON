import React, { useState } from 'react';
import { createInstitution } from "../Util/API";

const NewInstitutionForm = (props) => {

  const [name, setName] = useState("");

  const handleSubmit = async () => {
    await createInstitution(name)
  };
  // TODO: text for button
  return (
    <div className={`formDiv`} id="new-intitution-form">
      <form>
        <h2>Utwórz nową instytucję:</h2>
        <label for="name">Nazwa</label>
        <input
          name="name"
          placeholder="Hotel pod jabłonią"
          value={name}
          onChange={event => setName(event.target.value)} />
        <button
          className={`btnSubmit`}
          onClick={handleSubmit}>
        </button>
      </form>
    </div>
  );
}

export default NewInstitutionForm;