import React from 'react';
import NewLocationForm from "../Components/NewLocationForm";
import NewRoomForm from "../Components/NewRoomForm";

const CreateLocationPage = (props) => {
  return (
    <div>
      <NewLocationForm />
      <NewRoomForm />
    </div>
  );
}

export default CreateLocationPage;