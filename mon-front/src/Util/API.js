import axios from "axios";
import {notifyError, notifySuccess, notifyWarning} from "./Notifier";


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
            notifySuccess('Person created successfully!')
        }
        return response.data
    } catch (error) {
        handleError(error)
    }
}

export const fetchInstitutionList = async () => {
    try {
        const response = await axios.get(BASE_API_URL + 'institution/all')
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

export const fetchRoomListByInstitution = async (institution_id) => {
    const url = BASE_API_URL + 'room/' + institution_id
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
            notifySuccess('Assignment created successfully!')
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


function handleError(error) {
    if (error.response.status === 409) {
        notifyWarning(error.response.data.message)
    } else {
        notifyError(error.response.data.message)
        console.log(error)
    }
}