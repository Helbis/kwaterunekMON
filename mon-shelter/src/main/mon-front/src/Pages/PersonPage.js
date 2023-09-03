import React, {useEffect, useState} from "react";
import "../Styles/PersonPage.css"
import PersonTable from "../Components/PersonTable";
import {fetchPersonList} from "../Util/API";

const PersonPage = () => {
    const [persons, setPersons] = useState([])
    const [filteredPersons, setFilteredPersons] = useState([])
    const [pattern, setPattern] = useState('')

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const result = await fetchPersonList()
        setPersons(result)
        applyPattern(pattern, result)
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

    function applyPattern(newPattern, allPersons) {
        if (newPattern === '') {
            setFilteredPersons(allPersons)
        } else {
            setFilteredPersons(allPersons.filter((person) => {
                return matchPattern(person, newPattern)
            }))
        }
    }

    const handlePatternChanged = (e) => {
        const newPattern = e.target.value
        setPattern(newPattern)
        applyPattern(newPattern, persons);
    }

    // TODO: add theme support maybe
    return (
        <div className={`person-page-container`}>
            <input
                className={'text-input search-input'}
                placeholder='Szukaj'
                onChange={handlePatternChanged}
            />
            <PersonTable persons={filteredPersons} refreshAction={() => {
                fetchData()
            }}/>
        </div>
    )
}

export default PersonPage;