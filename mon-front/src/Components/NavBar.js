import { Link } from "react-router-dom";
import ReactSwitch from "react-switch";
import { createContext, useState } from "react";
import { List } from "rsuite";

export const ThemeContext = createContext(null);

const NavBar = () => {

  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  // TODO: Why is there a vertical bar?

  return <nav className={`NavBar`}>
    <ul id="nav-links-list">
      <li>
        <Link className={`navButton`} to="/">Wczytywanie plików</Link>
      </li>
      <li>
        <Link className={`navButton`} to="people">Osoby</Link>
      </li>
      <li>
        <Link className={`navButton`} to="shelters">Zameldowania</Link>
      </li>
      <li>|</li>
      <li>
        <Link className={`navButton`} to="create-person">Dodaj Osobę</Link>
      </li>
      <li>
        <Link className={`navButton`} to="create-institution">Dodaj Instytucję/Pokój</Link>
      </li>
      <li>
        <Link className={`navButton`} to="shelter">Zamelduj</Link>
      </li>
      <li>|</li>
      <li>
        <Link className={`navButton`} to="report">Raport</Link>
      </li>
    </ul>
  </nav>;
}

export default NavBar;
