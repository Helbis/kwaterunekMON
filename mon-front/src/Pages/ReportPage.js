import React, { useEffect, useState } from "react";
import "../Styles/PersonPage.css"
import Form from "../Components/ReportForm";
import ReportTable from "../Components/ReportTable";

const ReportPage = () => {

  return (
    <div className="report-page-container">
      <Form />
      <ReportTable />
    </div>
      
  )
}

export default ReportPage;