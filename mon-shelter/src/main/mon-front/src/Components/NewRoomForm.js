import React, {useEffect, useState} from 'react';
import {createRoom, fetchLocationList, fetchRoomListByLocation} from "../Util/API";
import Select from "react-select";
import {notifyError} from "../Util/Notifier";

const NewRoomForm = (props) => {
    const [institutionList, setInstitutionList] = useState([])
    const [roomList, setRoomList] = useState([])
    const [selectedInstitution, setSelectedInstitution] = useState(null)

    const [roomName, setRoomName] = useState('')
    const [roomSlots, setRoomSlots] = useState(1)
    const [roomFloor, setRoomFloor] = useState(0)

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const parseInstitutionList = (institutionList) => {
            const parsedList = []
            for (const institution of institutionList) {
                const parsedName = `${institution.name}`
                parsedList.push({value: institution.id, label: parsedName})
            }
            return parsedList
        };

        const fetchedInstitutionList = await fetchLocationList()
        setInstitutionList(parseInstitutionList(fetchedInstitutionList))
        if (selectedInstitution != null) {
            await handleInstitutionChanged(selectedInstitution)
        }
    };

    async function handleInstitutionChanged(newValue) {
        setSelectedInstitution(newValue)

        function parseRoomList(roomList) {
            const parsedList = []
            for (const room of roomList) {
                const parsedName = `${room.name}, Piętro ${room.floor}, (${room.slots}-osobowy)`
                parsedList.push({value: room.id, label: parsedName})
            }
            return parsedList
        }

        const result = await fetchRoomListByLocation(newValue.value)
        setRoomList(parseRoomList(result))
    }


    const handleSubmit = async () => {
        if (selectedInstitution == null) {
            notifyError('Nie wybrano lokalizacji pokoju!')
            return
        }
        await createRoom(roomName, roomFloor, roomSlots, selectedInstitution.value)
        await fetchData()

    }

    return (
        <div className={`formDiv`} id="new-room-form">
            <h2>Dodaj nowy pokój</h2>
            <Select
                className={'select-dropdown'}
                placeholder={`*Wybierz lokalizację...`}
                options={institutionList}
                onChange={newValue => handleInstitutionChanged(newValue)}
                value={selectedInstitution}
            />
            <label for="name">*Nazwa</label>
            <input
                type="text"
                name="name"
                placeholder="Duża sypialnia"
                title="Proszę użyć znaków alfabetu"
                className={'text-input'}
                maxLength="100"
                value={roomName}
                onChange={event => setRoomName(event.target.value)}/>

            <label htmlFor="Floor">*Piętro</label>
            <input
                name="Floor"
                placeholder="5"
                value={roomFloor}
                className={'text-input'}
                type="number"
                title="Proszę podać numer piętra"
                onChange={event => setRoomFloor(parseInt(event.target.value))}/>

            <label for="Slots">*Ilość miejsc</label>
            <input
                name="Slots"
                placeholder="5"
                value={roomSlots}
                type="number"
                className={'text-input'}
                title="Proszę wpisać liczbę minimum 1"
                min="1"
                onChange={event => setRoomSlots(parseInt(event.target.value))}/>

            <button
                className={`btnSubmit`}
                onClick={handleSubmit}>
                Zatwierdź
            </button>

            <div className={`institution-rooms`}>
                <h2>Pokoje w wybranej instytucji:</h2>
                <ul>
                    {roomList.map(room =>
                        <li key={room.value}>{room.label}</li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default NewRoomForm;
