import React, { useEffect, useState } from "react";
import "../Styles/PersonPage.css"
import "../Styles/ReportPage.css"
import Form from "../Components/ReportForm";
import DataTable from "../Components/ReportTable";

const ReportPage = () => {

  const data = [
    { ranga: 'Generał', imie: 'Jan', nazwisko: 'Nowak', instytucja: 'Testowa jednostka', numerPokoju: '4', nazwaBudynku: 'Testowy' },
    { ranga: 'Generał', imie: 'Jan', nazwisko: 'Nowak', instytucja: 'Testowa jednostka', numerPokoju: '4', nazwaBudynku: 'Testowy' , dodatkoweInformacje: 'Zastępstwo'}
  ];

  return (
    <div className="report-page-container">
      <Form />
      <DataTable data={data} />
    </div>
      
  )
}

export default ReportPage;