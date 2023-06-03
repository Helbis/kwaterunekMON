import {Link} from "react-router-dom";
import ReactSwitch from "react-switch";
import {createContext, useState} from "react";
import {List} from "rsuite";

export const ThemeContext = createContext(null);

function NavBar() {

    const [theme, setTheme] = useState("dark");

    const toggleTheme = () => {
        setTheme((curr) => (curr === "light" ? "dark" : "light"));
    };

    // TODO: translate to PL
    // TODO: Why is there a vertical bar?

    return <nav className={`NavBar`}>
        <ul id="nav-links-list">
            <li>
                <Link className={`navButton`} to="/">Home</Link>
            </li>
            <li>
                <Link className={`navButton`} to="people">Person List</Link>
            </li>
            <li>
                <Link className={`navButton`} to="shelters">Shelter List</Link>
            </li>
            <li>|</li>
            <li>
                <Link className={`navButton`} to="create-person">Create Person</Link>
            </li>
            <li>
                <Link className={`navButton`} to="create-institution">Create Institution</Link>
            </li>
            <li>
                <Link className={`navButton`} to="shelter">Shelter</Link>
            </li>
        </ul>
    </nav>;
}

export default NavBar;
