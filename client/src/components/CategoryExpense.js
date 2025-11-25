import { useState, useContext } from 'react';
import { StateAndHandlerContext } from '../context/stateAndHandler';
// import '../styles/Workout.css';

function CategoryExpense({ expense, category_id }) {

    const [edit, setEdit] = useState(false);
    const [currentExpense, setCurrentExpense] = useState(expense)
    const { deleteCategoryExpense } = useContext(StateAndHandlerContext)

    function handleSubmit(e){
        e.preventDefault();
        fetch(`/expenses`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(currentExpense)
        })
        .then(resp => resp.json())
        .then(newExpense =>{
            setCurrentExpense(newExpense)
            setEdit(false)
            console.log(newExpense.user)
        })
    }

    function handleDelete() {
        fetch(`/expenses`, {  
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: currentExpense.id })
        })
        .then(resp => {
            if (resp.ok) {
                deleteCategoryExpense(currentExpense.id, category_id); //!!
                console.log("Delete success");
            } else {
                console.error("Failed to delete expense");
            }
        });
    }

    
    return (
        <div className='log'>
            {edit ? (
                <>  
                    <h3>This expense item is for holiday: {currentExpense.holiday.name}</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text" name="date" placeholder="xx/xx/xxxx"
                            value={currentExpense.date}
                            onChange={(e) => setCurrentExpense({...currentExpense, date: e.target.value})}
                        />

                        <span>$</span>
                        <input
                            type="text" name="amount" placeholder="0.00"
                            value={currentExpense.amount}
                            onChange={(e) => setCurrentExpense({...currentExpense, amount: e.target.value})}
                        />

                        <input
                            type="text" name="note" placeholder="Notes for this expense"
                            value={currentExpense.note}
                            onChange={(e) => setCurrentExpense({...currentExpense, note: e.target.value})}
                        />

                        <button type="submit">Submit</button>
                    </form>

                    <button color="secondary" onClick={() => setEdit(false)}>
                        Edit
                    </button>
                </>
            ) : (
                <>
                    <div>
                        <h3>This expense item is for holiday: {currentExpense.holiday.name}</h3>
                        <h4>Date:{currentExpense.date}</h4>
                        <h4>Amount:${currentExpense.amount}</h4>
                        <h4>Note:{currentExpense.note}</h4>
                        <button color="secondary" onClick={() => setEdit(true)}>
                            Edit
                        </button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </>
            )}
        </div>
    )
}

export default CategoryExpense;