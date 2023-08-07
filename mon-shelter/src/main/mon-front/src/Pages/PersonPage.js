import React, {useEffect, useState} from "react";
import "../Styles/PersonPage.css"
import PersonTable from "../Components/PersonTable";
import {fetchPersonList} from "../Util/API";

const PersonPage = () => {
    const [persons, setPersons] = useState([])
    const [filteredPersons, setFilteredPersons] = useState([])

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const result = await fetchPersonList();
        setPersons(result)
        setFilteredPersons(result)
    };

    function matchPattern(person, pattern) {
        const patternUp = pattern.toUpperCase()
        const name = person.name != null ? person.name.toUpperCase() : ""
        const surname = person.surname != null ? person.surname.toUpperCase() : ""
        const institution = person.institution != null ? person.institution.toUpperCase() : ""
        const telephone = person.telephone != null ? person.telephone.toUpperCase() : ""
        const info = person.info != null ? person.info.toUpperCase() : ""
        const rank = person.rank != null ? person.rank.toUpperCase() : ""
        return name.includes(patternUp)
            || surname.includes(patternUp)
            || institution.includes(patternUp)
            || telephone.includes(patternUp)
            || info.includes(patternUp)
            || rank.includes(patternUp)
    }

    const handlePatternChanged = (e) => {
        const newPattern = e.target.value
        if (newPattern === '') {
            setFilteredPersons(persons)
        } else {
            setFilteredPersons(persons.filter((person) => {
                return matchPattern(person,newPattern)
            }))
        }
    }

    // TODO: add theme support maybe
    return (
        <div className={`person-page-container`}>
            <input
                placeholder='Szukaj'
                onChange={handlePatternChanged}
            />
            <PersonTable persons={filteredPersons}/>
        </div>
    )
}

export default PersonPage;