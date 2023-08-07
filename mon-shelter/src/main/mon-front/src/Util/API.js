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

export const createPerson = async (name, surname, rank, info, telephone) => {
    function parsePerson(name, surname, rank, info, telephone) {
        const nameData = name ? name : null
        const surnameData = surname ? surname : null
        const rankData = rank ? rank : null
        const telephoneData = telephone ? telephone : null
        const infoData = info ? info : null
        return {
            name: nameData,
            surname: surnameData,
            rank: rankData,
            telephone: telephoneData,
            info: infoData,
            active: true
        }
    }

    try {
        const response = await axios.post(
            BASE_API_URL + 'person',
            parsePerson(name, surname, rank, info, telephone))
        if (200 === response.status) {
            notifySuccess('Osoba dodana pomyślnie!')
        }
        return response.data
    } catch (error) {
        handleError(error)
    }
}

export const createLocation = async (name) => {
    try {
        const response = await axios.post(
            BASE_API_URL + 'location',
            {name: name}
        )
        if (200 === response.status) {
            notifySuccess('Lokacja utworzona pomyślnie!')
        }
        return response.data
    } catch (error) {
        handleError(error)
    }
}

export const createRoom = async (name, slots, locationId) => {
    try {
        const response = await axios.post(
            BASE_API_URL + 'room',
            {
                name: name,
                slots: slots,
                locationId: locationId
            }
        )
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
        const response = await axios.post(
            BASE_API_URL + 'assignment',
            payload)
        if (200 === response.status) {
            notifySuccess('Osoba została zameldowana pomyślnie!')
        }
        return response.data
    } catch (error) {
        handleError(error)
    }
}

export const fetchAssignments = async () => {
    try {
        const response = await axios.get(
            BASE_API_URL + 'assignment/all'
        )
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
        const response = await axios.post(
            BASE_API_URL + 'import/upload',
            payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        )
        notifySuccess(`Zaimportowano nowe osoby: ${response.data}`)
        return response.data
    } catch (error) {
        handleError(error)
    }
}


function handleError(error) {
    if (error.response.status === 409) {
        notifyWarning(error.response.data.detail)
    }
    if (error.response.status === 400) {
        notifyWarning(error.response.data.message)
    } if (error.response.status === 500) {
        notifyWarning('Błąd importu pliku. Upewnij się, że plik .csv, który importujesz jest w kodowniu UTF-8')
    }
    else {
        notifyError(error.response.data.message)
        console.log(error)
    }
}
