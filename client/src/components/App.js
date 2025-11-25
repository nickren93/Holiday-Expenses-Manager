import { Outlet } from 'react-router-dom';
import HEM_Logo from '../HEM_Logo.png';
import { StateAndHandlerProvider } from '../context/stateAndHandler';
import '../styles/App.css';

function App() {

  return (
    <main className="App">
      <img id = "logo" src={HEM_Logo} alt="Logo"/>
      <h1 id="mainTitle">Holiday Expenses Manager</h1>
      <h2>Track your holiday expenses and use your money wisely!</h2>
      <p>
          Welcome to your personal Holiday Expense Manager!
          This app allows you to track, plan and manage your expenses for holidays!
      </p>
      
      <StateAndHandlerProvider>
        <Outlet />
      </StateAndHandlerProvider>

    </main>
  )

}

export default App;








// function App() {

//   const { user, setUser, setMyHolidays, setMyCategories } = useContext(StateAndHandlerContext)

//   useEffect(() => {
//     // auto-login
//     fetch("/check_session").then((r) => {
//       if (r.ok) {
//           r.json().then((user) => {
//             setUser(user)
//             // setMyWorkouts(user.workouts)
//             setMyHolidays(user.holidays)
//             setMyCategories(user.categories)
//           });
//       }
//     });
//   }, []);

//   return (
//     <main className="App">
//       <img id = "logo" src={HEM_Logo} alt="Logo"/>
//       <h1 id="mainTitle">Holiday Expenses Manager</h1>
//       <h2>Track your holiday expenses and use your money wisely!</h2>
//       <p>
//           Welcome to your personal Holiday Expense Manager!
//           This app allows you to track, plan and manage your expenses for holidays!
//       </p>
      
//       <StateAndHandlerProvider>
//         {user ?  
//         <div className="page-content">
//           <NavBar />
//           {/* <Outlet context={contextData} /> */}
//           <Outlet />
//         </div>
//         : <Login />}
//         <Footer />
//       </StateAndHandlerProvider>

//     </main>
//   )
// }