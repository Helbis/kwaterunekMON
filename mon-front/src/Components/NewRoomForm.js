import React, {useEffect, useState} from 'react';
import {createRoom, fetchInstitutionList, fetchPersonList, fetchRoomListByInstitution} from "../Util/API";
import Select from "react-select";
import {notifySuccess} from "../Util/Notifier";

function NewRoomForm(props) {

    const [institutionList, setInstitutionList] = useState([])
    const [roomList, setRoomList] = useState([])
    const [selectedInstitution, setSelectedInstitution] = useState(null)

    const [roomName, setRoomName] = useState('')
    const [roomSlots, setRoomSlots] = useState(0)

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

        const fetchedInstitutionList = await fetchInstitutionList()
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
                const parsedName = `${room.name} (${room.slots} slots)`
                parsedList.push({value: room.id, label: parsedName})
            }
            return parsedList
        }

        const result = await fetchRoomListByInstitution(newValue.value)
        setRoomList(parseRoomList(result))
    }


    const handleSubmit = async () => {
        await createRoom(roomName, roomSlots, selectedInstitution.value)
        await fetchData()

    }

    return (
        <div id="new-room-form">
            <Select
                options={institutionList}
                onChange={newValue => handleInstitutionChanged(newValue)}
            />
            <input
                placeholder="Name"
                value={roomName}
                onChange={event => setRoomName(event.target.value)}/>
            <input
                placeholder="Slots"
                value={roomSlots}
                type="number"
                onChange={event => setRoomSlots(parseInt(event.target.value))}/>
            <button
                onClick={handleSubmit}>Submit
            </button>
            <p>Institution's rooms:</p>
            <ul>
                {roomList.map(room =>
                    <li key={room.value}>{room.label}</li>
                )}
            </ul>
        </div>
    );
}

export default NewRoomForm;