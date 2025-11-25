import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { StateAndHandlerContext } from '../context/stateAndHandler';
import '../styles/NavBar.css';

function NavBar() {

    const { logout } = useContext(StateAndHandlerContext)

    return(
        <nav>
            <NavLink to="/" className="nav-link">
                Home
            </NavLink>

            <NavLink to="/myholidays" className="nav-link">
                My Holidays
            </NavLink>

            <NavLink to="/mycategories" className="nav-link">
                My Expense Categories
            </NavLink>

            <NavLink to="/newexpense" className="nav-link">
                New Expense
            </NavLink>

            <button onClick={logout}>Logout</button>
        </nav> 
    )
}

export default NavBar;