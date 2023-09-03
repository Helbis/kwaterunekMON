import '../Styles/PersonEditDialog.css'
import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import * as API from "../Util/API";

const PersonEditDialog = forwardRef((props, ref) => {

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('');
    const [institution, setInstitution] = useState('')
    const [rank, setRank] = useState('');
    const [telephone, setTelephone] = useState('');
    const [info, setInfo] = useState('');
    const [visibilityClass, setVisibilityClass] = useState('non-visible')

    useImperativeHandle(ref, () => ({
        openDialog(id, name, surname, institution, rank, telephone, info) {
            setVisibilityClass('')
            setId(id)
            setName(name != null ? name : '')
            setSurname(surname != null ? surname : '')
            setInstitution(institution != null ? institution : '')
            setRank(rank != null ? rank : '')
            setTelephone(telephone != null ? telephone : '')
            setInfo(info != null ? info : '')
        },
    }));
    const handleSubmit = async () => {
        await API.editPerson(id, name, surname, institution, rank, info, telephone)
        setVisibilityClass('non-visible')
        props.refreshAction()
    }

    return (
        <div className={`person-edit-box ${visibilityClass}`}>
            <p className='person-edit-title'>Edycja osoby</p>
            <label htmlFor="name">*Imię</label>
            <input
                type="text"
                name="name"
                pattern="[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s\-]+"
                title="Proszę użyć znaków alfabetu"
                maxLength="100"
                value={name}
                className={'text-input'}
                onChange={event => setName(event.target.value)}
            />

            <label htmlFor="surname">*Nazwisko</label>
            <input
                type="text"
                name="surname"
                pattern="[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s\-]+"
                title="Proszę użyć znaków alfabetu"
                maxLength="100"
                value={surname}
                className={'text-input'}
                onChange={event => setSurname(event.target.value)}
            />
            <label htmlFor="name">*Instytucja</label>
            <input
                type="text"
                name="name"
                placeholder="Instytucja"
                title="Proszę użyć znaków alfabetu"
                maxLength="100"
                value={institution}
                className={'text-input'}
                onChange={event => setInstitution(event.target.value)}/>
            <label htmlFor="rank">Ranga</label>
            <input
                type="text"
                name="rank"
                maxLength="100"
                className={'text-input'}
                value={rank}
                onChange={event => setRank(event.target.value)}/>

            <label htmlFor="telephone">Numer Telefonu</label>
            <input
                type="tel"
                name="telephone"
                title="Proszę wpisać numer telefonu jako +48XXXYYYZZZ lub XXXYYYZZZ"
                className={'text-input'}
                value={telephone}
                onChange={event => setTelephone(event.target.value)}
            />

            <label htmlFor="info">Informacje dodatkowe</label>
            <input
                type="text"
                name="info"
                maxLength="500"
                title="Maksymalna liczba znaków to 500"
                className={'text-input'}
                value={info}
                onChange={event => setInfo(event.target.value)}/>
            <button
                className={`btnSubmit`}
                onClick={handleSubmit}
                type={"submit"}>
                Zatwierdź
            </button>
            <button
                className={'btnClose'}
                onClick={() => {
                    setVisibilityClass('non-visible')
                }}
            >
                Zamknij
            </button>
        </div>
    )
});

export default PersonEditDialog