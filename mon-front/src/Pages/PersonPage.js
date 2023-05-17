import React, {useEffect, useState} from "react";
import "../Styles/PersonPage.css"
import PersonTable from "../Components/PersonTable";
import NewPersonForm from "../Components/NewPersonForm";
import {fetchPersonList} from "../Util/API";

export default function PersonPage() {

    const [persons, setPersons] = useState([])

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const result = await fetchPersonList();
        setPersons(result)
    };

    return (
        <div className="person-page-container">
            <PersonTable persons={persons}/>
            <div
                className='person-form-container'>
                <NewPersonForm
                    afterSubmit={() => fetchData()}
                />
            </div>
        </div>
    )
}