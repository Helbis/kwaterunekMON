import {useState} from "react";
import {notifyError} from "../Util/Notifier";
import {importPersonList} from "../Util/API";

const ImportForm = () => {

    const [file, setFile] = useState("")

    const handleFileChanged = (e) => {
        if (!e.target.files.length) {
            notifyError('Wybierz właściwy plik')
        }
        setFile(e.target.files[0])
    };

    const handleSubmit = (event) => {
        if(!file) {
            notifyError('Wybierz właściwy plik')
            return
        }
        if(window.confirm("Czy chcesz zaimportować osoby z pliku?")){
            importPersonList(file)
        }
    }


    return (
        <div className="formDiv">
            <label htmlFor="file">Wybierz plik z listą żołnierzy (.csv)</label>
            <input type="file" lang="pl" onChange={handleFileChanged} title="Proszę wybrać plik w opisanym formacie"
                   id="file" name="file" accept=".csv"/>

            <button className={`btnSubmit`} onClick={handleSubmit}>Importuj osoby</button>
        </div>
    );
}

export default ImportForm;
