import { useEffect, useContext } from "react";
import Footer from "./Footer";
import { Outlet } from 'react-router-dom';
import Login from './Login';
import NavBar from './NavBar';
import { StateAndHandlerContext } from '../context/stateAndHandler';
import '../styles/Home.css';
// import MyWorkout from "./MyWorkout";

function Home(){

    const { user, setUser, setMyHolidays, setMyCategories } = useContext(StateAndHandlerContext)

    useEffect(() => {
        // auto-login
        fetch("/check_session").then((r) => {
        if (r.ok) {
            r.json().then((user) => {
                setUser(user)
                // setMyWorkouts(user.workouts)
                setMyHolidays(user.holidays)
                setMyCategories(user.categories)
            });
        }
        });
    }, [])

    return(
        <main className="App">
            {user ?  
            <div className="page-content">
                <h2>Welcome back, {user.name}!</h2>
                <NavBar />
                <Outlet />
            </div>
            : <Login />}
            <Footer />
        </main>
    )         
}

export default Home;