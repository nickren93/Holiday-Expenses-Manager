import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import CategoryExpense from "./CategoryExpense";
import { StateAndHandlerContext } from '../context/stateAndHandler';

function CategoryExpenses() {

    const { category_id } = useParams(); 
    const { myCategories, setMyCategories, categoryExpenses, setCategoryExpenses } = useContext(StateAndHandlerContext)

    const currentCategory = myCategories.find(category => category.id == parseInt(category_id))

    useEffect(() => {
        if (currentCategory) {
            setCategoryExpenses(currentCategory.expenses);
        }
    }, []);

    if (!currentCategory) {
        return <h3>Loading categoryExpenses for current categroy...</h3>;
    }

    return (
        <div className="logs">
            <h2>{currentCategory.name}</h2>
            <br></br>
            {categoryExpenses.map((expense) => (
                <CategoryExpense key={expense.id} expense={expense} category_id={category_id}/>
            ))}
        </div>
    );
 
}

export default CategoryExpenses;
