import Select from 'react-select'
import {useEffect, useState} from "react";
import {fetchPersonList} from "../Util/API";

function ShelteringPage(props) {

    const [personList, setPersonList] = useState([])

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const result = await fetchPersonList();
        setPersonList(parsePersonList(result))
    };

    const parsePersonList = (personList) => {
        const parsedList = []
        for (const person of personList) {
            const parsedName = `${person.name} ${person.surname}`
            parsedList.push({value: parsedName, label: parsedName})
        }
        return parsedList
    }

    return (
        <div>
            <Select options={personList}/>
            <button
                onClick={event =>
                fetchData()}>
                Fetch
            </button>
        </div>
    )
}

export default ShelteringPage;