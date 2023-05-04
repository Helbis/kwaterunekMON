import {Outlet} from "react-router-dom";
import ReactSwitch from "react-switch";
import {createContext, useState} from "react";
import NavBar from "../Components/NavBar";

export const ThemeContext = createContext(null);

const Layout = () => {

    const [theme, setTheme] = useState("dark");

    const toggleTheme = () => {
        setTheme((curr) => (curr === "light" ? "dark" : "light"));
    };


    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            <div className="App" id={theme}>
                <div className='App-header'>
                    <NavBar/>
                    <p>Darko mode</p><ReactSwitch onChange={toggleTheme} checked={theme === "dark"}/>
                </div>
                <div className='App-content'>
                    <Outlet/>
                </div>
            </div>
        </ThemeContext.Provider>
    )
};

export default Layout;