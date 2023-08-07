import React, {useEffect, useState} from "react";
import {
    fetchAssignments,
} from "../Util/API";
import {prettyDate} from "../Util/Parser";
import '../Styles/AssignmentsPage.css'

const AssignmentsPage = (props) => {

    const [assignments, setAssignments] = useState([])
    const [filteredAssignments, setFilteredAssignments] = useState([])


    const fetchData = async () => {
        const fetchedAssignments = await fetchAssignments()
        setAssignments(fetchedAssignments)
        setFilteredAssignments(fetchedAssignments)

    };

    function matchPattern(assignment, pattern) {
        const patternUp = pattern.toUpperCase()
        const person = assignment.person != null ? assignment.person.toUpperCase() : ""
        const institution = assignment.institution != null ? assignment.institution.toUpperCase() : ""
        const location = assignment.location != null ? assignment.location.toUpperCase() : ""
        const room = assignment.room != null ? assignment.room.toUpperCase() : ""
        const floor = assignment.floor != null ? assignment.floor.toString().toUpperCase() : ""
        const from = assignment.from != null ? prettyDate(new Date(assignment.from)) : ""
        const to = assignment.to != null ? prettyDate(new Date(assignment.to)) : ""
        const rank = assignment.rank != null ? assignment.rank.toUpperCase() : ""
        return person.includes(patternUp)
            || institution.includes(patternUp)
            || location.includes(patternUp)
            || room.includes(patternUp)
            || floor.includes(patternUp)
            || from.includes(patternUp)
            || to.includes(patternUp)
            || rank.includes(patternUp)
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handlePatternChanged = (e) => {
        const newPattern = e.target.value
        if (newPattern === '') {
            setFilteredAssignments(assignments)
        } else {
            setFilteredAssignments(assignments.filter((assignment) => {
                return matchPattern(assignment, newPattern)
            }))
        }
    }

    return (
        <div>
            <input
                placeholder='Szukaj'
                onChange={handlePatternChanged}
            />
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
                    filteredAssignments
                        .map(assignment =>
                            <tr key={assignment.id}>
                                <td>{assignment.rank}</td>
                                <td>{assignment.person}</td>
                                <td>{assignment.institution}</td>
                                <td>{assignment.location}</td>
                                <td>{assignment.room}</td>
                                <td>{assignment.floor}</td>
                                <td>{prettyDate(new Date(assignment.from))}</td>
                                <td>{prettyDate(new Date(assignment.to))}</td>
                            </tr>
                        )
                }
                </tbody>
            </table>
            <button id='refresh-assignments' className={`btnSubmit`} onClick={fetchData}>Odśwież</button>
        </div>
    )
}

export default AssignmentsPage
