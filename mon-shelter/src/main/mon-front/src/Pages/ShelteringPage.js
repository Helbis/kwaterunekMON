import Select from 'react-select'
import { useEffect, useRef, useState } from "react";
import { fetchLocationList, fetchPersonList, fetchRoomListByLocation, postAssignment } from "../Util/API";
import '../Styles/ShelteringPage.css'
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { prettyDate } from "../Util/Parser";

const ShelteringPage = () => {

  const [personList, setPersonList] = useState([])
  const [locationList, setLocationList] = useState([])
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

    const fetchedInstitutionList = await fetchLocationList()
    setLocationList(parseInstitutionList(fetchedInstitutionList))

  };

  const parsePersonList = (personList) => {
    const parsedList = []
    for (const person of personList) {
      const parsedName = `${person.rank} ${person.name} ${person.surname} ${person.institution}`
      parsedList.push({ value: person.id, label: parsedName })
    }
    return parsedList
  }

  const parseInstitutionList = (institutionList) => {
    const parsedList = []
    for (const institution of institutionList) {
      const parsedName = `${institution.name}`
      parsedList.push({ value: institution.id, label: parsedName })
    }
    return parsedList
  };

  function parseRoomList(roomList) {
    const parsedList = []
    for (const room of roomList) {
      const parsedName = `${room.name} (${room.slots} slots)`
      parsedList.push({ value: room.id, label: parsedName })
    }
    return parsedList
  }

  async function handleInstitutionChanged(newValue) {
    selectRoomRef.current.clearValue()
    const result = await fetchRoomListByLocation(newValue.value)
    setRoomList(parseRoomList(result))
  }


  function formatDateRange(date) {
    if (date == null || date[0] == null || date[1] == null) {
      return ''
    }
    return `${prettyDate(date[0])} - ${prettyDate(date[1])}`
  }

  function submitAssignment() {
    postAssignment(selectedDate[0], selectedDate[1], selectedPerson, selectedRoom)
  }

  function handleRoomChanged(newValue) {
    if (newValue != null) {
      setSelectedRoom(newValue.value)
    } else {
      setSelectedRoom('')
    }
  }

  return (
    <div className='formDiv'>

        {/*reference: https://rsuitejs.com/components/date-range-picker/    */}
        <DateRangePicker
          placeholder="Wybierz przedział..."
          format="dd-MM-yyyy"
          value={selectedDate}
          onChange={newVal => setSelectedDate(newVal)}
          id='date-range-picker'
        />
        <Select
          options={personList}
          placeholder={'Wybierz osobę...'}onChange={newValue => setSelectedPerson(newValue.value)}
        />
        <Select
          options={locationList}placeholder={'Wybierz lokalizacje...'}
          onChange={newValue => handleInstitutionChanged(newValue)}
        />
        <Select
          options={roomList}
          placeholder={'Wybierz pokój...'}onChange={newValue => handleRoomChanged(newValue)}
          ref={selectRoomRef}
        /><button className={`btnSubmit`} onClick={event => submitAssignment()}>Zatwierdź</button>

        </div>
    )
}

export default ShelteringPage;
