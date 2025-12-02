import { useEffect, useContext } from "react";
import { Outlet, Link } from 'react-router-dom';
import Login from './Login';
import { StateAndHandlerContext } from '../context/stateAndHandler';
import '../styles/Home.css';

function Home(){

    const { user, setUser, setMyHolidays, setMyCategories, myHolidays, myCategories } 
    = useContext(StateAndHandlerContext);

    useEffect(() => {
        // auto-login
        fetch("/check_session").then((r) => {
            if (r.ok) {
                r.json().then((user) => {
                    setUser(user);
                    setMyHolidays(user.holidays);
                    setMyCategories(user.categories);
                });
            }
        });
    }, []);

    if (!user) return(
        <main className="App">
            <Login />
            {/* <Footer /> */}
        </main>
    ) 

    // Stats
    // const totalExpenses = myExpenses?.reduce((sum, e) => sum + e.amount, 0) || 0;

    let totalExpenses = 0;
    for(let i=0; i < myHolidays.length; i++){
        for(let j=0; j < myHolidays[i].expenses.length; j++){
            totalExpenses += myHolidays[i].expenses[j].amount;
        }
    } //for each. replace later !!

    return(
        <main className="App">

            {/* --- NEW: Better Welcome Section --- */}
            <div className="home-hero">
                <h1>Welcome back, {user.name}! 👋</h1>
                <p className="subtitle">
                    Manage all your holiday expenses in one place.
                </p>

                <div className="hero-buttons">
                    <Link to="/expense/new" className="btn-primary">➕ Add New Expense</Link>
                    <Link to="/myholidays" className="btn-secondary">View My Holidays →</Link>
                </div>
            </div>

            {/* --- NEW: Dashboard Stats --- */}
            <section className="stats-section">
                <div className="stat-card">
                    <h3>Total Expenses</h3>
                    <p className="stat-number">${totalExpenses.toFixed(2)}</p>
                </div>

                <div className="stat-card">
                    <h3>Your Holidays</h3>
                    <p className="stat-number">{myHolidays?.length || 0}</p>
                </div>

                <div className="stat-card">
                    <h3>Your Categories</h3>
                    <p className="stat-number">{myCategories?.length || 0}</p>
                </div>
            </section>

            {/* --- Keep your NavBar + Outlet exactly the same --- */}
            <div className="page-content">
                {/* <NavBar /> */}
                <Outlet />
            </div>

            {/* --- NEW: Quick Actions --- */}
            <section className="quick-actions">
                <h2>Quick Actions</h2>

                <div className="actions-grid">
                    <Link className="action-card" to="/newexpenses/newholiday">
                        <h4>Create a New Holiday</h4>
                        <p>Start planning your next event</p>
                    </Link>

                    <Link className="action-card" to="/newexpenses/newcategory">
                        <h4>Create a New Category</h4>
                        <p>Organize your spending better</p>
                    </Link>

                    <Link className="action-card" to="/newexpense">
                        <h4>Add an Expense</h4>
                        <p>Track your new spending</p>
                    </Link>
                </div>
            </section>

        </main>
    )         
}

export default Home;



// function Home(){

//     const { user, setUser, setMyHolidays, setMyCategories } = useContext(StateAndHandlerContext)

//     useEffect(() => {
//         // auto-login
//         fetch("/check_session").then((r) => {
//         if (r.ok) {
//             r.json().then((user) => {
//                 setUser(user)
//                 // setMyWorkouts(user.workouts)
//                 setMyHolidays(user.holidays)
//                 setMyCategories(user.categories)
//             });
//         }
//         });
//     }, [])

//     return(
//         <main className="App">
//             {user ?  
//             <div className="page-content">
//                 <h2>Welcome back, {user.name}!</h2>
//                 <NavBar />
//                 <Outlet />
//             </div>
//             : <Login />}
//             <Footer />
//         </main>
//     )         
// }

// export default Home;