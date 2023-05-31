import React from 'react';
import NewInstitutionForm from "../Components/NewInstitutionForm";
import NewRoomForm from "../Components/NewRoomForm";

function CreateInstitutionPage(props) {
    return (
        <div>
            <NewInstitutionForm/>
            <p>----------------------------------</p>
            <NewRoomForm/>
        </div>
    );
}

export default CreateInstitutionPage;