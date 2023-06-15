const InputForm = () => {

  // TODO: text inside the button
  return (
    <div className="formDiv">
      <form>
        <label for="1person">Ilość 1 osobowych pokoi</label>
        <input type="text" id="1person" placeholder="12"></input>

        <label for="2people">Ilość 2 osobowych pokoi</label>
        <input type="text" id="2people" placeholder="42"></input>

        <label for="3people">Ilość 3 osobowych pokoi</label>
        <input type="text" id="3people" placeholder="5"></input>

        <label for="rooms">Ilość wolnych pokojów</label>
        <input type="text" id="rooms" placeholder="8"></input>

        <label for="file">Wybierz plik z listą żołnierzy (.csv, .xlsx)</label>
        <input type="file" id="file" name="file" accept=".csv , .xlsx" />

        <button className={`btnSubmit`}></button>
      </form>
    </div>
  );
}

export default InputForm;