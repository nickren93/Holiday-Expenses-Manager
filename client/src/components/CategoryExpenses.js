import { useEffect, useContext } from "react";
import { useParams, Link  } from "react-router-dom";
import CategoryExpense from "./CategoryExpense";
import { StateAndHandlerContext } from '../context/stateAndHandler';
import "../styles/ExpensePages.css";

function CategoryExpenses() {

    const { category_id } = useParams(); 
    const { myCategories,  categoryExpenses, setCategoryExpenses } = useContext(StateAndHandlerContext)

    const currentCategory = myCategories ? myCategories.find((category) => category.id == parseInt(category_id)) : null;

    useEffect(() => {
        if (currentCategory) {
            setCategoryExpenses(currentCategory.expenses);
        }
    }, [currentCategory]);


    if (!myCategories || !currentCategory) {
        return <h3 className="expense-loading">Loading expenses for current category...</h3>;
    }

    const count = categoryExpenses.length || 0;

    return (
        <div className="expense-page">
            <div className="expense-page-header">
                <h2>Expenses for {currentCategory.name}</h2>
                <p className="expense-page-subtitle">
                    You have <strong>{count}</strong> expense{count === 1 ? "" : "s"} in this category.
                </p>
            </div>

            {count > 0 ? (
                <div className="expense-list">
                    <div className="expense-list-header">
                        <span>Description</span>
                        <span>Date</span>
                        <span>Amount</span>
                    </div>

                    {categoryExpenses.map((expense) => (
                        <div className="expense-row" key={expense.id}>
                            <CategoryExpense 
                                expense={expense}
                                category_id={category_id}
                                holiday_id={expense.holiday.id}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <h4 className="expense-empty">No expenses found for this category.</h4>
            )}

            <br/>

            <Link to={"/mycategories"} className="btn-secondary">
                Back
            </Link>
        </div>
    );
 
}

export default CategoryExpenses;


// function CategoryExpenses() {

//     const { category_id, year } = useParams(); 
//     const { myCategories,  categoryExpenses, setCategoryExpenses } = useContext(StateAndHandlerContext)

//     const currentCategory = myCategories ? myCategories.find((category) => category.id == parseInt(category_id)) : null;

//     useEffect(() => {
//         if (currentCategory) {
//             // filter the expenses to match the year
//             const filteredExpenses = currentCategory.expenses.filter((exp) => {
//                 // make sure exp.date exists and check its first 4 chars
//                 if (exp.date && exp.date.slice(0, 4) === year) {
//                     return true;
//                 } else {
//                     return false;
//                 }
//             });
//             setCategoryExpenses(filteredExpenses);
//         }
//     }, [currentCategory, year]);


//     if (!myCategories || !currentCategory) {
//         return <h3 className="expense-loading">Loading expenses for current category...</h3>;
//     }

//     const count = categoryExpenses.length || 0;

//     return (
//         <div className="expense-page">
//             <div className="expense-page-header">
//                 <h2>Expenses for {currentCategory.name} — {year}</h2>
//                 <p className="expense-page-subtitle">
//                     You have <strong>{count}</strong> expense{count === 1 ? "" : "s"} in this category in {year}.
//                 </p>
//             </div>

//             {count > 0 ? (
//                 <div className="expense-list">
//                     <div className="expense-list-header">
//                         <span>Description</span>
//                         <span>Date</span>
//                         <span>Amount</span>
//                     </div>

//                     {categoryExpenses.map((expense) => (
//                         <div className="expense-row" key={expense.id}>
//                             <CategoryExpense 
//                                 expense={expense}
//                                 category_id={category_id}
//                                 holiday_id={expense.holiday.id}
//                             />
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <h4 className="expense-empty">No expenses found for this year.</h4>
//             )}
//         </div>
//     );
 
// }

// export default CategoryExpenses;


// function CategoryExpenses() {

//     const { category_id } = useParams(); 
//     const { myCategories, setMyCategories, categoryExpenses, setCategoryExpenses } = useContext(StateAndHandlerContext)

//     const currentCategory = myCategories.find(category => category.id == parseInt(category_id))

//     useEffect(() => {
//         if (currentCategory) {
//             setCategoryExpenses(currentCategory.expenses);
//         }
//     }, []);

//     if (!currentCategory) {
//         return <h3>Loading categoryExpenses for current categroy...</h3>;
//     }

//     return (
//         <div className="logs">
//             <h2>{currentCategory.name}</h2>
//             <br></br>
//             {categoryExpenses.map((expense) => (
//                 <CategoryExpense key={expense.id} expense={expense} category_id={category_id}/>
//             ))}
//         </div>
//     );
 
// }

// export default CategoryExpenses;
