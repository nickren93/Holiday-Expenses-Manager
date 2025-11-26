import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { StateAndHandlerContext } from '../context/stateAndHandler';
import '../styles/NavBar.css';

function NavBar() {

    const { logout } = useContext(StateAndHandlerContext)

    return(
        <header className="navbar-container">
            <div className="navbar-inner">

                {/* BRAND / LOGO */}
                <div className="navbar-brand">
                    🌴 Holiday Expenses
                </div>

                {/* NAVIGATION LINKS */}
                <nav className="navbar-links">
                    <NavLink to="/" className="nav-link">
                        Home
                    </NavLink>

                    <NavLink to="/myholidays" className="nav-link">
                        My Holidays
                    </NavLink>

                    <NavLink to="/mycategories" className="nav-link">
                        My Categories
                    </NavLink>

                    <NavLink to="/newexpense" className="nav-link">
                        New Expense
                    </NavLink>
                </nav>

                {/* LOGOUT BUTTON */}
                <button 
                    className="btn-logout"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>
        </header>
    )
}

export default NavBar;


// function NavBar() {

//     const { logout } = useContext(StateAndHandlerContext)

//     return(
//         <nav>
//             <NavLink to="/" className="nav-link">
//                 Home
//             </NavLink>

//             <NavLink to="/myholidays" className="nav-link">
//                 My Holidays
//             </NavLink>

//             <NavLink to="/mycategories" className="nav-link">
//                 My Expense Categories
//             </NavLink>

//             <NavLink to="/newexpense" className="nav-link">
//                 New Expense
//             </NavLink>

//             <button onClick={logout}>Logout</button>
//         </nav> 
//     )
// }

// export default NavBar;