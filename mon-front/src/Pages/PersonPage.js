import React, { useEffect, useState } from "react";
import "../Styles/PersonPage.css"
import PersonTable from "../Components/PersonTable";
import { fetchPersonList } from "../Util/API";

const PersonPage = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await fetchPersonList();
    setPersons(result)
  };

  // TODO: add theme support maybe
  return (
    <div className={`person-page-container`}>
      <PersonTable persons={persons} />
    </div>
  )
}

export default PersonPage;