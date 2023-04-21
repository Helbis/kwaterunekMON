import React from "react";
import axios from "axios";
import "../styles/PersonPage.css"
import PersonTable from "../Components/PersonTable";
import NewPersonForm from "../Components/NewPersonForm";

export default class PersonPage extends React.Component {

    constructor(props) {
        super(props);
        this.formRef = React.createRef();
    }

    state = {
        persons: []
    }

    componentDidMount() {
        this.fetchPersons()
    }

    fetchPersons = () => {
        axios.get(`http://localhost:8080/api/person/allActive`)
            .then(res => {
                const persons = res.data;
                this.setState({persons});
            })
    }

    render() {
        return (
            <div>
                <PersonTable persons={this.state.persons}/>
                <div className='person-form-container'>
                    <NewPersonForm onSubmit={() => {
                        this.handleSubmit()
                    }} ref={this.formRef}/>
                </div>
            </div>
        )
    }

    handleSubmit() {
        this.fetchPersons()
    }

}