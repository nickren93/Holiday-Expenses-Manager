import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import CategoryExpense from "./CategoryExpense";
import { StateAndHandlerContext } from '../context/stateAndHandler';
import '../styles/PageLayout.css';

function CategoryExpenses() {

    const { category_id, year } = useParams(); 
    const { myCategories,  categoryExpenses, setCategoryExpenses } = useContext(StateAndHandlerContext)

    const currentCategory = myCategories ? myCategories.find((category) => category.id == parseInt(category_id)) : null;

    useEffect(() => {
        if (currentCategory) {
            // ✅ filter the expenses to match the year
            const filteredExpenses = currentCategory.expenses.filter((exp) => {
                // make sure exp.date exists and check its first 4 chars
                if (exp.date && exp.date.slice(0, 4) === year) {
                    return true;
                } else {
                    return false;
                }
            });
            setCategoryExpenses(filteredExpenses);
        }
    }, [currentCategory, year]);


    if (!myCategories || !currentCategory) {
        return (
            <div className="section-container">
                <h3>Loading expenses for current category...</h3>
            </div>
        );
    }

    return (
        <div className="section-container">

            <div className="section-header">
                <div>
                    <h2 className="section-title">
                        <span className="section-title-emoji">🧾</span>
                        {currentCategory.name} — {year}
                    </h2>
                    <p className="section-subtitle">Expenses in this category</p>
                </div>
            </div>

            {categoryExpenses.length > 0 ? (
                <div className="expense-list">
                    <div className="expense-row expense-row-header">
                        <span>Description</span>
                        <span>Date</span>
                        <span className="expense-amount">Amount</span>
                    </div>

                    {categoryExpenses.map((expense) => (
                        <div key={expense.id} className="expense-row">
                            <CategoryExpense 
                                expense={expense}
                                category_id={category_id}
                                holiday_id={expense.holiday.id}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-icon">📂</div>
                    <div className="empty-title">No expenses found</div>
                    <div className="empty-text">Try selecting another year.</div>
                </div>
            )}
        </div>
    );
 
}

export default CategoryExpenses;


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
