import {Link} from "react-router-dom";

function NavBar() {
    return <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/people">Person List</Link>
            </li>
            <li>
                <Link to="/shelter">Shelter</Link>
            </li>
        </ul>
    </nav>;
}

export default NavBar;