import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { StateAndHandlerContext } from '../context/stateAndHandler';

function NavBar() {

    const { logout } = useContext(StateAndHandlerContext)

    return (
        <nav className="sidebar-nav">

            <NavLink to="/" className="sidebar-link">
                🏠 Dashboard
            </NavLink>

            <NavLink to="/myholidays" className="sidebar-link">
                🎉 My Holidays
            </NavLink>

            <NavLink to="/mycategories" className="sidebar-link">
                🗂 My Categories
            </NavLink>

            <NavLink to="/expense/new" className="sidebar-link">
                ➕ Add Expense
            </NavLink>

            <button className="sidebar-logout" onClick={logout}>
                Logout
            </button>

        </nav>
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