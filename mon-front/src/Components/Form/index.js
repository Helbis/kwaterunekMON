const InputForm = () => {
    return (
        <div className="main-form">
            <form>
                <label for="1person">Number of 1 person rooms</label>
                <input type="text" id="1person" placeholder="1 person rooms"></input>

                <label for="2people">Number of 2 people rooms</label>
                <input type="text" id="2people" placeholder="2 people rooms"></input>

                <label for="3people">Number of 3 people rooms</label>
                <input type="text" id="3people" placeholder="3 people rooms"></input>

                <label for="rooms">Number of available rooms</label>
                <input type="text" id="rooms" placeholder="rooms"></input>

                <label for="file">Choose file witf soldiers (.csv, .xlsx)</label>
                <input type="file" id="file" name="file" accept=".csv , .xlsx"/>

                <input type="submit"></input>
            </form>
        </div>
      );
}
export default InputForm;