import "../Styles/AssignmentEditDialog.css"
import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {prettyDate} from "../Util/Parser";
import Select from "react-select";
import {fetchPersonList} from "../Util/API";
import * as API from "../Util/API";

const AssignmentEditDialog = forwardRef((props, ref) => {

    const [assignment, setAssignment] = useState(null)
    const [personList, setPersonList] = useState([])
    const [selectedPerson, setSelectedPerson] = useState('')

    const [visibilityClass, setVisibilityClass] = useState('non-visible')

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const fetchedPersonList = await fetchPersonList();
        setPersonList(parsePersonList(fetchedPersonList))
    };

    const parsePersonList = (personList) => {
        const parsedList = []
        for (const person of personList) {
            const parsedName = `${person.rank} ${person.name} ${person.surname} ${person.institution}`
            parsedList.push({value: person, label: parsedName})
        }
        return parsedList
    }

    useImperativeHandle(ref, () => ({
        openAssignmentEditDialog(assignmentData) {
            fetchData()
            setVisibilityClass('')
            setAssignment(assignmentData)
        },
    }));

    const handleSubmit = async () => {
        await API.editAssignmentPerson(assignment.id, selectedPerson.id)
        setVisibilityClass('non-visible')
        props.refreshAction()
    }

    return (
        <div className={`assignment-edit-box ${visibilityClass}`}>
            <h2>Zmień zameldowaną osobę:</h2>
            {(assignment) != null && (
                <div>
                    <ul>
                        <li>
                            <b>Data:</b> {prettyDate(new Date(assignment.from))} - {prettyDate(new Date(assignment.to))}
                        </li>
                        <li><b>Lokalizacja:</b> {assignment.location}</li>
                        <li><b>Pokój</b> {assignment.room}</li>
                    </ul>
                    <Select
                        className={'select-dropdown'}
                        options={personList}
                        placeholder={'Wybierz osobę...'} onChange={newValue => setSelectedPerson(newValue.value)}
                    />
                </div>
            )}
            <button
                className={`btnSubmit`}
                onClick={handleSubmit}
                type={"submit"}>
                Zatwierdź
            </button>
            <button
                className={'btnClose'}
                onClick={() => {
                    setVisibilityClass('non-visible')
                }}
            >
                Zamknij
            </button>
        </div>
    );
});

export default AssignmentEditDialog