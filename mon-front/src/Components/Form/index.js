const InputForm = () => {

  return (
    <div className="formDiv">
      <form>
        <label for="1person">Ilość 1 osobowych pokoi</label>
        <input type="number" title="Proszę wpisać liczbę od 0 do 500" min="0" max="500" id="1person" placeholder="12"></input>

        <label for="2people">Ilość 2 osobowych pokoi</label>
        <input type="number" title="Proszę wpisać liczbę od 0 do 500" min="0" max="500" id="2people" placeholder="42"></input>

        <label for="3people">Ilość 3 osobowych pokoi</label>
        <input type="number" title="Proszę wpisać liczbę od 0 do 500" min="0" max="500" id="3people" placeholder="5"></input>

        <label for="rooms">Ilość wolnych pokojów</label>
        <input type="number" title="Proszę wpisać liczbę od 0 do 500" min="0" max="500" id="rooms" placeholder="8"></input>

        <label for="file">Wybierz plik z listą żołnierzy (.csv, .xlsx)</label>
        <input type="file" lang="pl" title="Proszę wybrać plik w opisanym formacie" id="file" name="file" accept=".csv , .xlsx" />

        <button className={`btnSubmit`}>Wyślij formularz</button>
      </form>
    </div>
  );
}

export default InputForm;