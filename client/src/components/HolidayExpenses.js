import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import HolidayExpense from "./HolidayExpense";
import { StateAndHandlerContext } from '../context/stateAndHandler';
import "../styles/ExpensePages.css";


function HolidayExpenses() {

    const { holiday_id, year } = useParams(); 
    const { myHolidays, holidayExpenses, setHolidayExpenses } = useContext(StateAndHandlerContext)

    // find current holiday
    // const currentHoliday = myHolidays.find(holiday => holiday.id == parseInt(holiday_id))
    const currentHoliday = myHolidays ? myHolidays.find((holiday) => holiday.id == parseInt(holiday_id)) : null;

    useEffect(() => {
        if (currentHoliday) {
            // filter the expenses to match the year
            const filteredExpenses = currentHoliday.expenses.filter((exp) => {
                // make sure exp.date exists and check its first 4 chars
                if (exp.date && exp.date.slice(0, 4) === year) {
                    return true;
                } else {
                    return false;
                }
            });
            setHolidayExpenses(filteredExpenses);
        }
    }, [currentHoliday, year]);


    if (!myHolidays || !currentHoliday) {
        return <h3 className="expense-loading">Loading expenses for current holiday...</h3>;
    }

    const count = holidayExpenses.length || 0;

    return (
        <div className="expense-page">
            <div className="expense-page-header">
                <h2>Expenses for {currentHoliday.name} — {year}</h2>
                <p className="expense-page-subtitle">
                    You have <strong>{count}</strong> expense{count === 1 ? "" : "s"} for this holiday in {year}.
                </p>
            </div>

            {count > 0 ? (
                <div className="expense-list">
                    <div className="expense-list-header">
                        <span>Description</span>
                        <span>Date</span>
                        <span>Amount</span>
                    </div>

                    {holidayExpenses.map((expense) => (
                        <div className="expense-row" key={expense.id}>
                            <HolidayExpense
                                expense={expense}
                                holiday_id={holiday_id}
                                category_id={expense.category.id}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <h4 className="expense-empty">No expenses found for this year.</h4>
            )}
        </div>
    );
}

export default HolidayExpenses;



// function HolidayExpenses() {

//     const { holiday_id, year } = useParams(); 
//     const { myHolidays, holidayExpenses, setHolidayExpenses } = useContext(StateAndHandlerContext)

//     // find current holiday
//     // const currentHoliday = myHolidays.find(holiday => holiday.id == parseInt(holiday_id))
//     const currentHoliday = myHolidays ? myHolidays.find((holiday) => holiday.id == parseInt(holiday_id)) : null;

//     useEffect(() => {
//         if (currentHoliday) {
//             // filter the expenses to match the year
//             const filteredExpenses = currentHoliday.expenses.filter((exp) => {
//                 // make sure exp.date exists and check its first 4 chars
//                 if (exp.date && exp.date.slice(0, 4) === year) {
//                     return true;
//                 } else {
//                     return false;
//                 }
//             });
//             setHolidayExpenses(filteredExpenses);
//         }
//     }, [currentHoliday, year]);


//     if (!myHolidays || !currentHoliday) {
//         return (
//             <div className="section-container">
//                 <h3>Loading expenses for current holiday...</h3>
//             </div>
//         );
//     }

//     return (
//         <div className="section-container">
//             {/* section header */}
//             <div className="section-header">
//                 <div>
//                     <h2 className="section-title">
//                         <span className="section-title-emoji">💳</span>
//                         {currentHoliday.name} — {year}
//                     </h2>
//                     <p className="section-subtitle">Expenses for this holiday</p>
//                 </div>
//             </div>

//             {holidayExpenses.length > 0 ? (
//                 holidayExpenses.map((expense) => (
//                     <HolidayExpense
//                         key={expense.id}
//                         expense={expense}
//                         holiday_id={holiday_id}
//                         category_id={expense.category.id}
//                     />
//                 ))
//             ) : (
//                 <h4>No expenses found for this year.</h4>
//             )}
//         </div>
//     );
// }

// export default HolidayExpenses;

