/*import { useForm } from 'react-hook-form';
export default function Form({ onSubmit }) {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="field1" {...register("field1")} placeholder="Pole 1" />
      <input name="field2" {...register("field2")} placeholder="Pole 2" />
      { Dodaj więcej pól według potrzeb }
      <button type="submit">Wyślij</button>
    </form>
  );
}*/

import React, {useEffect, useState} from 'react';
import Select from 'react-select';

const ReportForm = (propos) => {
    return (
        <div className={`formDiv`} id="report-form">
            <h2>Wybierz dane do wyświetlenia</h2>
            <Select 
                placeholder={`Wybierz rangę`}
            />
            <Select 
                placeholder={`Wybierz imię`}
            />
            <Select 
                placeholder={`Wybierz nazwisko`}
            />
            <Select 
                placeholder={`Wybierz instytucję`}
            />
            <Select 
                placeholder={`Wybierz budynek`}
            />
            <button className={`btnSubmit`}>
                    Zatwierdź
            </button>
        </div>
    )
}
export default ReportForm;