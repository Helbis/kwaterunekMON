import React, {useEffect, useState} from "react";
import {
    fetchAssignments,
    fetchInstitutionList,
    fetchPersonList,
    fetchRoomList
} from "../Util/API";
import {prettyDate} from "../Util/Parser";
import '../Styles/AssignmentsPage.css'

const AssignmentsPage = (props) => {

    const [assignments, setAssignments] = useState([])
    const [persons, setPersons] = useState([])
    const [institutions, setInstitutions] = useState([])
    const [rooms, setRooms] = useState([])

    const fetchData = async () => {
        const assignments = await fetchAssignments()
        setAssignments(assignments)
        const persons = await fetchPersonList()
        setPersons(persons)
        const institutions = await fetchInstitutionList()
        setInstitutions(institutions)
        const rooms = await fetchRoomList()
        setRooms(rooms)
    };

    useEffect(() => {
        fetchData();
    }, []);

    function idMatches(id) {
        return (element) => element.id === id
    }

    // element.id === id

    const getPersonNameById = (id) => {
        const found = persons.find(idMatches(id))
        if (found != null) {
            return `${found.name} ${found.surname}`
        }
    }
    const getPersonRankById = (id) => {
        const found = persons.find(idMatches(id))
        if (found != null) {
            return `${found.rank}`
        }
    }
    const getPersonInstitutionById = (id) => {
        const found = persons.find(idMatches(id))
        if (found != null) {
            return `${found.institution}`
        }
    }

    const getRoomNameById = (id) => {
        const found = rooms.find(idMatches(id))
        if (found != null) {
            return `${found.name}`
        }
    }

    const getRoomFloorById = (id) => {
        const found = rooms.find(idMatches(id))
        if (found != null) {
            return `${found.floor}`
        }
    }

    const getLocationNameByRoomId = (id) => {
        const foundRoom = rooms.find(idMatches(id))
        if (foundRoom != null) {
            const found = institutions.find(idMatches(foundRoom.locationId))
            if (found != null) {
                return `${found.name}`
            }
        }
    }

    return (
        <div>
            <table id='assignments-table'>
                <thead>
                <tr>
                    <th>Ranga</th>
                    <th>Osoba</th>
                    <th>Instytucja</th>
                    <th>Lokalizacja</th>
                    <th>Pokój</th>
                    <th>Piętro</th>
                    <th>Zameldowany od</th>
                    <th>Zameldowany do</th>
                </tr>
                </thead>
                <tbody>
                {
                    assignments
                        .map(assignment =>
                            <tr key={assignment.id}>
                                <td>{getPersonRankById(assignment.personId)}</td>
                                <td>{getPersonNameById(assignment.personId)}</td>
                                <td>{getPersonInstitutionById(assignment.personId)}</td>
                                <td>{getLocationNameByRoomId(assignment.roomId)}</td>
                                <td>{getRoomNameById(assignment.roomId)}</td>
                                <td>{getRoomFloorById(assignment.roomId)}</td>
                                <td>{prettyDate(new Date(assignment.fromTime))}</td>
                                <td>{prettyDate(new Date(assignment.toTime))}</td>
                            </tr>
                        )
                }
                </tbody>
            </table>
            <button className={`btnSubmit`} onClick={fetchData}>Odśwież</button>
        </div>
    )
}

export default AssignmentsPage
