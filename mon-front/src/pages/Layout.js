import {Outlet, Link} from "react-router-dom";
import ReactSwitch from "react-switch";
import {createContext, useState} from "react";

export const ThemeContext = createContext(null);
const Layout = () => {

    const [theme, setTheme] = useState("dark");

    const toggleTheme = () => {
        setTheme((curr) => (curr === "light" ? "dark" : "light"));
    };


    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            <div className="App" id={theme}>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/people">Person List</Link>
                        </li>
                    </ul>
                </nav>
                <div className='App-header'>
                    <p>Darko mode</p><ReactSwitch onChange={toggleTheme} checked={theme === "dark"}/>
                </div>
                <Outlet/>
            </div>
        </ThemeContext.Provider>
    )
};

export default Layout;