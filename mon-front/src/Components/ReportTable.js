import React, { Component } from 'react';

class ReportTable extends Component {
    render() {
        return (
            <table id="report-table">
                <thead>
                    <th>Ranga</th>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Instytucja</th>
                    <th>Pokój</th>
                    <th>Dodatkowe informacje</th>
                </thead>
                <tbody>
                    <tr>
                        {/*<td>person.rank</td>*/}
                        {/*<td>person.name</td>*/}
                        {/*<td>person.surename</td>*/}
                        {/*<td>person.institution</td>*/}
                        {/*<td>person.room</td>*/}
                        {/*<td>person.info</td>*/}
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default ReportTable;