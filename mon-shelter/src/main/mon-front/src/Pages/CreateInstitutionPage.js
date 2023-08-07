import React from 'react';
import NewInstitutionForm from "../Components/NewInstitutionForm";
import NewRoomForm from "../Components/NewRoomForm";

const CreateInstitutionPage = (props) => {
  return (
    <div>
      <NewInstitutionForm />
      <NewRoomForm />
    </div>
  );
}

export default CreateInstitutionPage;