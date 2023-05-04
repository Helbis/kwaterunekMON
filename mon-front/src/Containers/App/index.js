import {createContext, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "../../Pages/Layout";
import Home from "../../Pages/Home";
import ShelteringPage from "../../Pages/ShelteringPage"
import PersonPage from "../../Pages/PersonPage";
import {ToastContainer} from "react-toastify";

export const ThemeContext = createContext(null);

function App() {

    const [theme, setTheme] = useState("dark");

    const toggleTheme = () => {
        setTheme((curr) => (curr === "light" ? "dark" : "light"));
    };

    return (
        <BrowserRouter>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="people" element={<PersonPage/>}/>
                    <Route path="shelter" element={<ShelteringPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
