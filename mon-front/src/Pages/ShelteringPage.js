import Select from 'react-select'
import {useEffect, useRef, useState} from "react";
import {fetchInstitutionList, fetchPersonList, fetchRoomListByInstitution, postAssignment} from "../Util/API";
import '../Styles/ShelteringPage.css'
import {DateRangePicker} from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import 'react-toastify/dist/ReactToastify.css';

function ShelteringPage() {

    const [personList, setPersonList] = useState([])
    const [institutionList, setInstitutionList] = useState([])
    const [roomList, setRoomList] = useState([])

    const [selectedPerson, setSelectedPerson] = useState('')
    const [selectedRoom, setSelectedRoom] = useState('')
    const [selectedDate, setSelectedDate] = useState([new Date(), new Date()]);

    const selectRoomRef = useRef();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const fetchedPersonList = await fetchPersonList();
        setPersonList(parsePersonList(fetchedPersonList))

        const fetchedInstitutionList = await fetchInstitutionList()
        setInstitutionList(parseInstitutionList(fetchedInstitutionList))

    };

    const parsePersonList = (personList) => {
        const parsedList = []
        for (const person of personList) {
            const parsedName = `${person.name} ${person.surname}`
            parsedList.push({value: person.id, label: parsedName})
        }
        return parsedList
    }

    const parseInstitutionList = (institutionList) => {
        const parsedList = []
        for (const institution of institutionList) {
            const parsedName = `${institution.name}`
            parsedList.push({value: institution.id, label: parsedName})
        }
        return parsedList
    };

    function parseRoomList(roomList) {
        const parsedList = []
        for (const room of roomList) {
            const parsedName = `${room.name}`
            parsedList.push({value: room.id, label: parsedName})
        }
        return parsedList
    }

    async function handleInstitutionChanged(newValue) {
        selectRoomRef.current.clearValue()
        const result = await fetchRoomListByInstitution(newValue.value)
        setRoomList(parseRoomList(result))
    }

    function printValues() {
        console.log(`Selected Person: ${selectedPerson}`)
        console.log(`Selected Room: ${selectedRoom}`)
        console.log(`Selected Date: ${selectedDate}`)
        console.log(`ISO date: ${selectedDate[0].toISOString()}`)
    }

    function prettyDate(date) {
        if (date == null || date[0] == null || date[1] == null) {
            return ''
        }
        return `${date[0].getDate()}/${date[0].getMonth() + 1}/${date[0].getFullYear()}
        - ${date[1].getDate()}/${date[1].getMonth() + 1}/${date[1].getFullYear()}`
    }

    function submitAssignment() {
        postAssignment(selectedDate[0], selectedDate[1], selectedPerson, selectedRoom)
    }

    function handleRoomChanged(newValue) {
        if(newValue!=null) {
            setSelectedRoom(newValue.value)
        } else {
            setSelectedRoom('')
        }
    }

    return (
        <div className='sheltering-page-container'>
            <div className='left-pane'>
                <p>DEBUG LEFT PANE</p>
                {/*reference: https://rsuitejs.com/components/date-range-picker/    */}
                <DateRangePicker
                    placeholder="Date Range"
                    format="dd-MM-yyyy"
                    value={selectedDate}
                    onChange={newVal => setSelectedDate(newVal)}
                    id='date-range-picker'
                />
                <Select
                    options={personList}
                    onChange={newValue => setSelectedPerson(newValue.value)}
                />
                <Select
                    options={institutionList}
                    onChange={newValue => handleInstitutionChanged(newValue)}
                />
                <Select
                    options={roomList}
                    onChange={newValue => handleRoomChanged(newValue)}
                    ref={selectRoomRef}
                />

                <button onClick={event => printValues()}>Print Values</button>
                <br/>
                <button onClick={event => submitAssignment()}>Submit</button>

            </div>
            <div className='right-pane'>
                <p>DEBUG RIGHT PANE</p>
                <p>Selected person id: {selectedPerson}</p>
                <p>Selected room id: {selectedRoom}</p>
                <p>Selected date: {prettyDate(selectedDate)}</p>
            </div>
        </div>
    )
}

export default ShelteringPage;