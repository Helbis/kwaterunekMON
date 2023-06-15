import React, { useState } from 'react';
import { createInstitution } from "../Util/API";

const NewInstitutionForm = (props) => {

  const [name, setName] = useState("");

  const handleSubmit = async () => {
    await createInstitution(name)
  };

  return (
    <div className={`formDiv`} id="new-intitution-form">
      <form>
        <h2>Utwórz nową instytucję:</h2>
        <label for="name">Name</label>
        <input
          name="name"
          placeholder="Name"
          value={name}
          onChange={event => setName(event.target.value)} />
        <input
          type="submit"
          className={`btnSubmit`}
          onClick={handleSubmit}>
        </input>
      </form>
    </div>
  );
}

export default NewInstitutionForm;