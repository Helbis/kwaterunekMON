import React, {Component, useRef, useState} from 'react';
import PersonEditDialog from "./PersonEditDialog";
import {deletePerson, importPersonList} from "../Util/API";
import * as API from "../Util/API";

const PersonTable = (props) => {

    const editDialogRef = useRef()
    const [isEditing, setIsEditing] = useState(false)
    const toggleEdit = (id, name, surname, institution, rank, telephone, info) => {
        setIsEditing(true)
        editDialogRef.current.openDialog(id, name, surname, institution, rank, telephone, info)
    }

    const deletePerson = async (id,name) => {
        if (window.confirm(`Czy chcesz usunąć osobę: ${name}?`)) {
            await API.deletePerson(id)
            props.refreshAction()
        }
    }

    return (
        <div className={'person-page-container'}>
            <PersonEditDialog ref={editDialogRef} refreshAction={props.refreshAction}/>
            <table id="person-table">
                <thead>
                <tr>
                    <th>Ranga</th>
                    <th>Imię i Nazwisko</th>
                    <th>Instytucja</th>
                    <th>Numer Telefonu</th>
                    <th>Dodatkowe Informacje</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.persons
                        .map(person =>
                            <tr key={person.id}>
                                <td>{person.rank}</td>
                                <td>{person.name} {person.surname}</td>
                                <td>{person.institution}</td>
                                <td>{person.telephone}</td>
                                <td>{person.info}</td>
                                <td>
                                    <button
                                        title={'Edytuj'}
                                        className={'action-person-button'}
                                        onClick={() => toggleEdit(person.id, person.name, person.surname, person.institution, person.rank, person.telephone, person.info)}>
                                        ✏️
                                    </button>
                                    <button
                                        title={'Usuń'}
                                        className={'action-person-button'}
                                        onClick={() => deletePerson(person.id, `${person.rank} ${person.name} ${person.surname}`)}
                                    >
                                        ❌
                                    </button>
                                </td>
                            </tr>
                        )
                }
                </tbody>
            </table>
        </div>
    )

}

export default PersonTable;