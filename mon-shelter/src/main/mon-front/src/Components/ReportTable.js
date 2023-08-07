import React, { useState } from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const DataTable = ({ data }) => {
    

  const [selectedColumns, setSelectedColumns] = useState([]);

    const columns = [
        { title: 'Ranga', field: 'ranga' },
        { title: 'Imię', field: 'imie' },
        { title: 'Nazwisko', field: 'nazwisko' },
        { title: 'Instytucja', field: 'instytucja' },
        { title: 'Nazwa budynku', field: 'nazwaBudynku' },
        { title: 'Numer pokoju', field: 'numerPokoju' },
        { title: 'Dodatkowe informacje', field: 'dodatkoweInformacje'}
    ];

    const handleColumnSelect = (event, field) => {
        if (event.target.checked) {
            setSelectedColumns(prev => [...prev, field]);
        } else {
            setSelectedColumns(prev => prev.filter(col => col !== field));
        }
    }


  const exportToCSV = (csvData, fileName) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
  
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }

    const exportData = () => {
        if (selectedColumns.length > 0) { // Dodajemy tę linię, aby upewnić się, że mamy wybrane kolumny
        const dataToExport = data?.map(row => {
            const filteredData = {};
            
            selectedColumns.forEach(col => {
            filteredData[col] = row[col];
            });
    
            return filteredData;
        });

        const current = new Date();
        const date = `${current.getDate()}_${current.getMonth()+1}_${current.getFullYear()}`;
    
        exportToCSV(dataToExport, date);
        } else {
        alert("Zaznacz minimum jedną kolumnę do eksportu."); // Możemy dodać ostrzeżenie, jeśli nie ma wybranych kolumn
        }
    }
  

  return (
    <div>
        <table id="report-table">
            <thead>
                <th>Ranga</th>
                <th>Imię</th>
                <th>Nazwisko</th>
                <th>Instytucja</th>
                <th>Budynek</th>
                <th>Pokój</th>
                <th>Dodatkowe informacje</th>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        <td>{row.ranga}</td>
                        <td>{row.imie}</td>
                        <td>{row.nazwisko}</td>
                        <td>{row.instytucja}</td>
                        <td>{row.nazwaBudynku}</td>
                        <td>{row.numerPokoju}</td>
                        <td>{row.dodatkoweInformacje}</td>
                    </tr>
                ))}
            </tbody>
        </table>
            

        {columns.map(col => 
            <div className='inputField' key={col.field}>
                <input 
                    type="checkbox" 
                    id={col.field} 
                    name={col.field} 
                    onChange={(event) => handleColumnSelect(event, col.field)} 
                />
                <label htmlFor={col.field}>{col.title}</label>
            </div>
        )}

        <button className='exportButton' onClick={exportData}>
            Export to Excel
        </button>
    </div>
  )
}

export default DataTable;
