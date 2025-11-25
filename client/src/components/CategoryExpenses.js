import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import CategoryExpense from "./CategoryExpense";
import { StateAndHandlerContext } from '../context/stateAndHandler';

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
        return <h3>Loading expenses for current categroy....</h3>;
    }

    return (
        <div className="logs">
            <h2>Expenses for {currentCategory.name} - {year}</h2>
            <br />

            {categoryExpenses.length > 0 ? (
                categoryExpenses.map((expense) => (
                    <CategoryExpense 
                        key={expense.id}
                        expense={expense}
                        category_id={category_id}
                        holiday_id={expense.holiday.id}
                    />
                ))
            ) : (
                <h4>No expenses found for this year.</h4>
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
