import axios from "axios";
import {notifyError, notifySuccess, notifyWarning} from "./Notifier";


// const BASE_API_URL = 'https://mon-shelter.onrender.com/api/';
const BASE_API_URL = 'http://localhost:8080/api/';

export const fetchPersonList = async () => {
    try {
        const response = await axios.get(BASE_API_URL + 'person/allActive')
        return response.data
    } catch (error) {
        handleError(error)
    }
}

function parsePerson(id, name, surname, institution, rank, info, telephone) {
    const idData = id ? id : null
    const nameData = name ? name : null
    const surnameData = surname ? surname : null
    const institutionData = institution ? institution : null
    const rankData = rank ? rank : null
    const telephoneData = telephone ? telephone : null
    const infoData = info ? info : null
    return {
        id: idData,
        name: nameData,
        surname: surnameData,
        institution: institutionData,
        rank: rankData,
        telephone: telephoneData,
        info: infoData,
        active: true
    }
}

export const createPerson = async (name, surname, institution, rank, info, telephone) => {
    try {
        const response = await axios.post(BASE_API_URL + 'person', parsePerson(null, name, surname, institution, rank, info, telephone))
        if (200 === response.status) {
            notifySuccess('Osoba dodana pomyślnie!')
        }
        return response.data
    } catch (error) {
        handleError(error)
    }
}

export const editPerson = async (id, name, surname, institution, rank, info, telephone) => {
    try {
        const response = await axios.put(BASE_API_URL + 'person', parsePerson(id, name, surname, institution, rank, info, telephone), {
            headers: {
                'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json',
            }
        })
        if (200 === response.status) {
            notifySuccess('Osoba edytowana pomyślnie!')
        }
    } catch (error) {
        handleError(error)
    }
}

export const deletePerson = async (id) => {
    try {
        const response = await axios.delete(BASE_API_URL + `person/${id}`)
        if (200 === response.status) {
            notifySuccess('Osoba usunięta pomyślnie!')
        }
    } catch (error) {
        handleError(error)
    }
}

export const createLocation = async (name) => {
    try {
        const response = await axios.post(BASE_API_URL + 'location', {name: name})
        if (200 === response.status) {
            notifySuccess('Lokacja utworzona pomyślnie!')
        }
        return response.data
    } catch (error) {
        handleError(error)
    }
}

export const createRoom = async (name, floor, slots, locationId) => {
    try {
        const response = await axios.post(BASE_API_URL + 'room', {
            name: name, floor: floor, slots: slots, locationId: locationId
        })
        if (200 === response.status) {
            notifySuccess('Pokój utworzony pomyślnie!')
        }
    } catch (error) {
        handleError(error)
    }
}

export const fetchLocationList = async () => {
    try {
        const response = await axios.get(BASE_API_URL + 'location/all')
        return response.data
    } catch (error) {
        handleError(error)
    }
}

export const fetchRoomList = async () => {
    try {
        const response = await axios.get(BASE_API_URL + 'room/all')
        return response.data
    } catch (error) {
        handleError(error)
    }
}

export const fetchRoomListByLocation = async (location_id) => {
    const url = BASE_API_URL + 'room/' + location_id
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        handleError(error)
    }
}
export const postAssignment = async (beginDate, endDate, personId, roomId) => {
    const payload = {
        fromTime: beginDate.toISOString(),
        toTime: endDate.toISOString(),
        personId: personId,
        roomId: roomId,
        active: true
    }
    try {
        const response = await axios.post(BASE_API_URL + 'assignment', payload)
        if (200 === response.status) {
            notifySuccess('Osoba została zameldowana pomyślnie!')
        }
        return response.data
    } catch (error) {
        handleError(error)
    }
}

export const editAssignmentPerson = async (assignmentId, personId) => {
    const params = {
        assignmentId: assignmentId, personId: personId
    }
    try {
        const response = await axios.put(BASE_API_URL + 'assignment', null,
            {params: params})
        if (200 === response.status) {
            notifySuccess('Zamledowana osoba zmieniona pomyślnie!')
        }
    } catch (error) {
        handleError(error)
    }
}

export const deleteAssignment = async (assignmentId) => {
    try {
        const response = await axios.delete(BASE_API_URL + `assignment/${assignmentId}`)
        if (200 === response.status) {
            notifySuccess('Rezerwacja została usunięta!')
        }
    } catch (error) {
        handleError(error)
    }
}

export const fetchAssignments = async () => {
    try {
        const response = await axios.get(BASE_API_URL + 'assignment/all')
        return response.data
    } catch (error) {
        handleError(error)
    }
}

export const importPersonList = async (importFile) => {
    const payload = {
        file: importFile
    }
    try {
        const response = await axios.post(BASE_API_URL + 'import/upload', payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        notifySuccess(`Zaimportowano nowe osoby: ${response.data}`)
        return response.data
    } catch (error) {
        handleError(error)
    }
}


function handleError(error) {
    if (error.response.status === 409) {
        notifyWarning(error.response.data.detail)
    } else if (error.response.status === 400) {
        notifyWarning(error.response.data.message)
    } else if (error.response.status === 500) {
        notifyWarning('Błąd importu pliku. Upewnij się, że plik .csv, który importujesz jest w kodowniu UTF-8')
    } else {
        notifyError(error.response.data.message)
        console.log(error)
    }
}
