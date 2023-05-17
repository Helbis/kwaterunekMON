import {Link} from "react-router-dom";
import ReactSwitch from "react-switch";
import {createContext, useState} from "react";

export const ThemeContext = createContext(null);

function NavBar() {

    const [theme, setTheme] = useState("dark");

    const toggleTheme = () => {
        setTheme((curr) => (curr === "light" ? "dark" : "light"));
    };

    return <nav>
        <ul id="nav-links-list">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/people">Person List</Link>
            </li>
            <li>
                <Link to="/shelter">Shelter</Link>
            </li>
            <li>
                <Link to="shelters">Shelter List</Link>
            </li>
        </ul>
    </nav>;
}

export default NavBar;