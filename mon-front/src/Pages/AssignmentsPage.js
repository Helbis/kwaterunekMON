import React, { useEffect, useState } from "react";
import {
  fetchAssignments,
  fetchInstitutionList,
  fetchPersonList,
  fetchRoomList
} from "../Util/API";
import { prettyDate } from "../Util/Parser";
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

  const getRoomNameById = (id) => {
    const found = rooms.find(idMatches(id))
    if (found != null) {
      return `${found.name}`
    }
  }

  const getInstitutionNameByRoomId = (id) => {
    const foundRoom = rooms.find(idMatches(id))
    if (foundRoom != null) {
      const found = institutions.find(idMatches(foundRoom.institutionId))
      if (found != null) {
        return `${found.name}`
      }
    }
  }
// FIXME: finalize translation to PL!
  return (
    <div>
      <table id='assignments-table'>
        <thead>
          <tr>
            <th>Osoba</th>
            <th>Instytucja</th>
            <th>Pokój</th>
            <th>Od</th>
            <th>Do</th>
          </tr>
        </thead>
        <tbody>
          {
            assignments
              .map(assignment =>
                <tr key={assignment.id}>
                  <td>{getPersonNameById(assignment.personId)}</td>
                  <td>{getInstitutionNameByRoomId(assignment.roomId)}</td>
                  <td>{getRoomNameById(assignment.roomId)}</td>
                  <td>{prettyDate(new Date(assignment.fromTime))}</td>
                  <td>{prettyDate(new Date(assignment.toTime))}</td>
                </tr>
              )
          }
        </tbody>
      </table>
      <input type="submit" onClick={fetchData}></input>
    </div>
  )
}

export default AssignmentsPage