import { Outlet } from 'react-router-dom';
import HEM_Logo from '../HEM_Logo.png';
import { StateAndHandlerProvider } from '../context/stateAndHandler';
import '../styles/AppLayout.css';
import NavBar from './NavBar';
import Footer from './Footer';

function App() {

  return (
    <StateAndHandlerProvider>

      <div className="dashboard-layout">

        {/* LEFT SIDEBAR */}
        <aside className="sidebar">
          <NavBar />
        </aside>

        {/* MAIN AREA */}
        <div className="main-area">

          {/* TOP HEADER */}
          <header className="top-header">
            <img id="top-logo" src={HEM_Logo} alt="Logo" />
            <div className="top-header-text">
              <h1>Holiday Expenses Manager</h1>
              <h2>Track your holiday expenses and use your money wisely!</h2>
              <p>
                Welcome to your personal Holiday Expense Manager — 
                track, plan and organize your holiday spending!
              </p>
            </div>
          </header>

          {/* PAGE CONTENT */}
          <main className="page-content">
            <Outlet />
          </main>

          {/* FOOTER */}
          <Footer />

        </div>

      </div>

    </StateAndHandlerProvider>
  );
}

export default App;



// function App() {

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
//         <Outlet />
//       </StateAndHandlerProvider>

//     </main>
//   )

// }

// export default App;
