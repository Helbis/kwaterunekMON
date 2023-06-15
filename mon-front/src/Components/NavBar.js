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
        <Link className={`navButton`} to="/">Dom</Link>
      </li>
      <li>
        <Link className={`navButton`} to="people">Lista osób</Link>
      </li>
      <li>
        <Link className={`navButton`} to="shelters">Lista kwaterunku</Link>
      </li>
      <li>|</li>
      <li>
        <Link className={`navButton`} to="create-person">Utwórz osobę</Link>
      </li>
      <li>
        <Link className={`navButton`} to="create-institution">Utwórz instytucję</Link>
      </li>
      <li>
        <Link className={`navButton`} to="shelter">Kwaterunek</Link>
      </li>
    </ul>
  </nav>;
}

export default NavBar;
