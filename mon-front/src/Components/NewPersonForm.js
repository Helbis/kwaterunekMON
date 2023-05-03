import React, {Component} from 'react';
import axios from "axios";

class NewPersonForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            surname: null,
            rank: null,
            telephone: null,
            info: null
        }
    }

    render() {
        return (
            <div id='new-person-form'>
                <p>Create new person:</p>
                <input placeholder='Name' value={this.state.name} onChange={this.handleChangeName}/>
                <input placeholder='Surname' value={this.state.surname} onChange={this.handleChangeSurname}/>
                <input placeholder='Rank' value={this.state.rank} onChange={this.handleChangeRank}/>
                <input placeholder='Telephone' value={this.state.telephone} onChange={this.handleChangeTelephone}/>
                <input placeholder='Info' value={this.state.info} onChange={this.handleChangeInfo}/>
                <button onClick={() => {
                    this.handleSubmit()
                }}>Submit
                </button>
            </div>
        );
    }

    handleChangeName = (e) => {
        this.setState({name: e.target.value})
    }

    handleChangeSurname = (e) => {
        this.setState({surname: e.target.value})
    }

    handleChangeRank = (e) => {
        this.setState({rank: e.target.value})
    }

    handleChangeTelephone = (e) => {
        this.setState({telephone: e.target.value})
    }

    handleChangeInfo = (e) => {
        this.setState({info: e.target.value})
    }

    handleSubmit = async () => {
        await axios.post('http://localhost:8080/api/person', {
            name: this.state.name,
            surname: this.state.surname,
            rank: this.state.rank,
            info: this.state.info,
            telephone: this.state.telephone,
            active: true
        })
            .then(
                () => {
                    this.props.onSubmit()
                }).catch(
                (error) => {
                    alert(error.message)
                }
            );
    }
}

export default NewPersonForm;