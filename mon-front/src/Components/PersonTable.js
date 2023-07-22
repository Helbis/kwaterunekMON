import React, { Component } from 'react';

class PersonTable extends Component {
  render() {
    return (
      <table id="person-table">
        <thead>
          <tr>
            <th>Ranga</th>
            <th>Imię i Nazwisko</th>
            <th>Numer Telefonu</th>
            <th>Dodatkowe Informacje</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.persons
              .map(person =>
                <tr key={person.id}>
                  <td>{person.rank}</td>
                  <td>{person.name} {person.surname}</td>
                  <td>{person.telephone}</td>
                  <td>{person.info}</td>
                </tr>
              )
          }
        </tbody>
      </table>
    )
  }
}

export default PersonTable;