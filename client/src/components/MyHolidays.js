import { useContext } from "react";
import { Link } from "react-router-dom";
import '../styles/PageLayout.css';
import MyHoliday from "./MyHoliday";
import { StateAndHandlerContext } from '../context/stateAndHandler';

function MyHolidays(){
    
    const { user, myHolidays } = useContext(StateAndHandlerContext)

    if (!user) {
        return (
            <div className="section-container">
                <div className="empty-state">
                    <div className="empty-icon">🔐</div>
                    <div className="empty-title">Please log in</div>
                    <div className="empty-text">Sign in to view your holidays.</div>
                </div>
            </div>
        )
    }

    if (myHolidays.length === 0){
        return (
            <div className="section-container">
                <div className="empty-state">
                    <div className="empty-icon">🌍</div>
                    <div className="empty-title">No holidays yet</div>
                    <div className="empty-text">
                        You haven’t added any holidays. Start by creating your first expense (it will create a holiday automatically).
                    </div>
                    <Link to={`/newexpense`} className="btn-primary" style={{ marginTop: "1rem" }}>
                        + Create an Expense
                    </Link>
                </div>
            </div>
        )
    }
    
    // Step 1: create an empty object to store holidays by year
    const holidaysByYear = {};

    // Step 2: go through each holiday
    myHolidays.forEach((holiday) => {
        const year = holiday.year || "Unknown";

        if (!holidaysByYear[year]) {
            holidaysByYear[year] = [];
        }
        holidaysByYear[year].push(holiday);
    });

    // Step 3: make a list of all years and sort them newest first
    const sortedYears = Object.keys(holidaysByYear).sort((a, b) => b.localeCompare(a));

    // Step 4: show grouped holidays
    return (
        <div className="section-container">

            {/* Section Heading */}
            <div className="section-header">
                <div>
                    <h2 className="section-title">
                        <span className="section-title-emoji">🏖️</span>
                        My Holidays
                    </h2>
                    <p className="section-subtitle">Grouped by year</p>
                </div>

                <div className="section-actions">
                    <Link to="/newexpense" className="btn-primary">+ Add Expense</Link>
                </div>
            </div>

            {/* grouped holidays section*/}
            {sortedYears.map((year) => (
                <div key={year} style={{ marginBottom: "2rem" }}>
                    <h3 className="section-subtitle" style={{ fontSize: "1.2rem" }}>
                        <span className="tag tag--holiday">{year}</span>
                    </h3>
                    <div className="card-grid">
                        {holidaysByYear[year].map((holiday) => (
                            <MyHoliday
                                key={holiday.id}
                                holiday_id={holiday.id}
                                name={holiday.name}
                                description={holiday.description}
                                year = {year}
                            />
                        ))}
                    </div>  
                </div>
            ))}
        </div>
    );          
}

export default MyHolidays;



// function MyHolidays(){
    
//     const { user, myHolidays } = useContext(StateAndHandlerContext)

//     if (!user) {
//         return (
//             <div className="section-container">
//                 <div className="empty-state">
//                     <div className="empty-icon">🔐</div>
//                     <div className="empty-title">Please log in</div>
//                     <div className="empty-text">Sign in to view your holidays.</div>
//                 </div>
//             </div>
//         )
//     }

//     if (myHolidays.length === 0){
//         return (
//             <div className="section-container">
//                 <div className="empty-state">
//                     <div className="empty-icon">🌍</div>
//                     <div className="empty-title">No holidays yet</div>
//                     <div className="empty-text">
//                         You haven’t added any holidays. Start by creating your first expense (it will create a holiday automatically).
//                     </div>
//                     <Link to={`/newexpense`} className="btn-primary" style={{ marginTop: "1rem" }}>
//                         + Create an Expense
//                     </Link>
//                 </div>
//             </div>
//         )
//     }
    
//     // Step 1: create an empty object to store holidays by year
//     const holidaysByYear = {};

//     // Step 2: go through each holiday
//     for (let i = 0; i < myHolidays.length; i++) {
//         const holiday = myHolidays[i];

//         // if the holiday has expenses
//         if (holiday.expenses && holiday.expenses.length > 0) {

//             // loop through all expenses to collect all years
//             for (let j = 0; j < holiday.expenses.length; j++) {
//                 const exp = holiday.expenses[j];
//                 const date = exp.date; // like "2025-12-25"
//                 let year = "Unknown";

//                 // get the first 4 characters if it looks like a valid date
//                 if (date && date.length >= 4) {
//                     year = date.slice(0, 4);
//                 }

//                 // if we don’t have this year yet, create it
//                 if (!holidaysByYear[year]) {
//                     holidaysByYear[year] = [];
//                 }

//                 // check if this holiday is already added to that year
//                 let alreadyAdded = false;
//                 for (let k = 0; k < holidaysByYear[year].length; k++) {
//                     if (holidaysByYear[year][k].id === holiday.id) {
//                         alreadyAdded = true;
//                         break;
//                     }
//                 }

//                 // only add the holiday once per year
//                 if (!alreadyAdded) {
//                     holidaysByYear[year].push(holiday);
//                 }
//             }

//         } else {
//             // if no expenses at all
//             if (!holidaysByYear["Unknown"]) {
//                 holidaysByYear["Unknown"] = [];
//             }
//             holidaysByYear["Unknown"].push(holiday);
//         }
//     }

//     // Step 3: make a list of all years and sort them newest first
//     const sortedYears = Object.keys(holidaysByYear).sort((a, b) => b.localeCompare(a));

//     // Step 4: show grouped holidays
//     return (
//         <div className="section-container">
//             <h2>Your holidays (by year):</h2>

//             {sortedYears.map((year) => (
//                 <div key={year}>
//                     <h3 style={{ textDecoration: "underline" }}>{year}</h3>
//                     {holidaysByYear[year].map((holiday) => (
//                         <MyHoliday
//                             key={holiday.id}
//                             holiday_id={holiday.id}
//                             name={holiday.name}
//                             description={holiday.description}
//                             year = {year}
//                         />
//                     ))}
//                 </div>
//             ))}
//         </div>
//     );          
// }

// export default MyHolidays;



// function MyHolidays(){
    
//     const { user, myHolidays } = useContext(StateAndHandlerContext)

//     if (!user) {
//         return <h2>Please Login for more!</h2>;  // or redirect, or show nothing
//     }

//     if (myHolidays.length == 0){
//         return(
//             <div>
//                 <h2>You don't have any Holiday record.</h2>
//                 <Link to={`/newexpense`} className="view-profile">Create an expense record.</Link>
//             </div>
//         )
//     }

//     return(
//         <div className="workout-list">
//             <h2>Your holidays:</h2>
//                 { myHolidays.map((holiday) => (<MyHoliday key={holiday.id} holiday_id={holiday.id} 
//                 name={holiday.name} description={holiday.description} />
//             ))}
//         </div>
//     )           
// }

// export default MyHolidays;