import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import HolidayExpense from "./HolidayExpense";
import { StateAndHandlerContext } from '../context/stateAndHandler';


function HolidayExpenses() {

    const { holiday_id, year } = useParams(); 
    const { myHolidays, holidayExpenses, setHolidayExpenses } = useContext(StateAndHandlerContext)

    // find current holiday
    // const currentHoliday = myHolidays.find(holiday => holiday.id == parseInt(holiday_id))
    const currentHoliday = myHolidays ? myHolidays.find((holiday) => holiday.id == parseInt(holiday_id)) : null;

    useEffect(() => {
        if (currentHoliday) {
            // ✅ filter the expenses to match the year
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
        return <h3>Loading expenses for current holiday...</h3>;
    }

    return (
        <div className="logs">
            <h2>Expenses for {currentHoliday.name} - {year}</h2>
            <br />
            {holidayExpenses.length > 0 ? (
                holidayExpenses.map((expense) => (
                    <HolidayExpense
                        key={expense.id}
                        expense={expense}
                        holiday_id={holiday_id}
                        category_id={expense.category.id}
                    />
                ))
            ) : (
                <h4>No expenses found for this year.</h4>
            )}
        </div>
    );
}

export default HolidayExpenses;




// function HolidayExpenses() {

//     const {  holiday_id } = useParams(); 

//     const { myHolidays, setMyHolidays, holidayExpenses, setHolidayExpenses } = useContext(StateAndHandlerContext)

//     // find current holiday
//     const currentHoliday = myHolidays.find(holiday => holiday.id == parseInt(holiday_id))

//     useEffect(() => {
//         if (currentHoliday) {
//             setHolidayExpenses(currentHoliday.expenses);
//         }
//     }, []);


//     if (!currentHoliday) {
//         return <h3>Loading holidayExpenses for current holiday...</h3>;
//     }

//     return (
//         <div className="logs">
//             <h2>{currentHoliday.name}</h2>
//             <br></br>
//             {holidayExpenses.map((expense) => (
//                 <HolidayExpense key={expense.id} expense={expense} holiday_id={holiday_id }/>
//             ))}
//         </div>
//     );
// }

// export default HolidayExpenses;
