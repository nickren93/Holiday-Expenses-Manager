import { useState, useContext } from 'react';
import { StateAndHandlerContext } from '../context/stateAndHandler';
import '../styles/PageLayout.css';

function HolidayExpense({ expense, holiday_id, category_id }) {

    const [edit, setEdit] = useState(false);
    const [currentExpense, setCurrentExpense] = useState(expense)
    const { setMyHolidays, setMyCategories, setCategoryExpenses, deleteHolidayExpense } 
    = useContext(StateAndHandlerContext)

    function handleSubmit(e){
        e.preventDefault();

        const updatedExpense = {
            id: currentExpense.id,
            amount: parseFloat(currentExpense.amount), // convert to float
            date: currentExpense.date,
            note: currentExpense.note,
            category: currentExpense.category
        };
        
        fetch(`/expenses`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedExpense)
        })
        .then(resp => resp.json())
        .then(newExpense =>{
            setCurrentExpense(newExpense)
            // setHolidayExpenses(updatedHolidayExpenses) //
            setMyHolidays((prev) => 
                prev.map((h) =>
                    h.id === parseInt(holiday_id)
                    ? {
                        ...h,
                        expenses: h.expenses.map((e) =>
                            e.id === newExpense.id ? newExpense : e
                        ),
                    }
                    : h
                )
            );
            setCategoryExpenses((prev) =>
                prev.map((e) => (e.id === newExpense.id ? newExpense : e))
            );
            setMyCategories((prev) => 
                prev.map((c) =>
                    c.id === parseInt(category_id)
                    ? {
                        ...c,
                        expenses: c.expenses.map((e) =>
                            e.id === newExpense.id ? newExpense : e
                        ),
                    }
                    : c
                )
            );
            console.log(newExpense.user)
            setEdit(false) 
        })
        .catch((err) => {
            console.error("Error:", err);
        });
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
                deleteHolidayExpense(currentExpense.id, holiday_id); //!!
                console.log("Delete success");
            } else {
                console.error("Failed to delete expense");
            }
        });
    }
    

    if (!edit) {
        return (
            <>
                <span>{currentExpense.note}</span>
                <span className="expense-date">{currentExpense.date}</span>
                <span className="expense-amount">
                    ${Number(currentExpense.amount).toFixed(2)}
                </span>

                {/* Hidden expanded section (block below list) */}
                <div className="expanded-row-content">
                    <div className="expanded-row-card">
                        <p><strong>Category:</strong> {currentExpense.category.name}</p>
                        <div className="expanded-row-actions">
                            <button 
                                className="btn-secondary-outline" 
                                onClick={() => setEdit(true)}
                            >
                                Edit
                            </button>
                            <button 
                                className="btn-danger"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    /* ---------------------------------------------
       EDIT MODE (inside expense list)
    ----------------------------------------------*/
    return (
        <div className="form-card" style={{ marginTop: "1rem" }}>
            <h3 className="form-title">Edit Expense</h3>
            <p className="form-subtitle">
                Update amount, date, or notes for this expense.
            </p>

            <form onSubmit={handleSubmit} className="form-grid">

                {/* Date */}
                <div className="form-group">
                    <label className="form-label">Date</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="YYYY-MM-DD"
                        value={currentExpense.date}
                        onChange={(e) =>
                            setCurrentExpense({ ...currentExpense, date: e.target.value })
                        }
                    />
                </div>

                {/* Amount */}
                <div className="form-group">
                    <label className="form-label">Amount</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="0.00"
                        value={currentExpense.amount}
                        onChange={(e) =>
                            setCurrentExpense({ ...currentExpense, amount: e.target.value })
                        }
                    />
                </div>

                {/* Note */}
                <div className="form-group">
                    <label className="form-label">Note</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Notes"
                        value={currentExpense.note}
                        onChange={(e) =>
                            setCurrentExpense({ ...currentExpense, note: e.target.value })
                        }
                    />
                </div>

                {/* Category (read only — not changing logic) */}
                <div className="form-group">
                    <label className="form-label">Category</label>
                    <p>{currentExpense.category.name}</p>
                </div>

                <div className="form-actions">
                    <button 
                        type="button" 
                        className="btn-secondary-outline" 
                        onClick={() => setEdit(false)}
                    >
                        Cancel
                    </button>

                    <button type="submit">
                        Save Changes
                    </button>
                </div>

            </form>
        </div>
    );
}

export default HolidayExpense;



// function HolidayExpense({ expense, holiday_id, category_id }) {

//     const [edit, setEdit] = useState(false);
//     const [currentExpense, setCurrentExpense] = useState(expense)
//     const { setMyHolidays, setMyCategories, setCategoryExpenses, deleteHolidayExpense } 
//     = useContext(StateAndHandlerContext)

//     function handleSubmit(e){
//         e.preventDefault();

//         const updatedExpense = {
//             id: currentExpense.id,
//             amount: parseFloat(currentExpense.amount), // convert to float
//             date: currentExpense.date,
//             note: currentExpense.note,
//             category: currentExpense.category
//         };
        
//         fetch(`/expenses`, {
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(updatedExpense)
//         })
//         .then(resp => resp.json())
//         .then(newExpense =>{
//             setCurrentExpense(newExpense)
//             // setHolidayExpenses(updatedHolidayExpenses) //
//             setMyHolidays((prev) => 
//                 prev.map((h) =>
//                     h.id === parseInt(holiday_id)
//                     ? {
//                         ...h,
//                         expenses: h.expenses.map((e) =>
//                             e.id === newExpense.id ? newExpense : e
//                         ),
//                     }
//                     : h
//                 )
//             );
//             setCategoryExpenses((prev) =>
//                 prev.map((e) => (e.id === newExpense.id ? newExpense : e))
//             );
//             setMyCategories((prev) => 
//                 prev.map((c) =>
//                     c.id === parseInt(category_id)
//                     ? {
//                         ...c,
//                         expenses: c.expenses.map((e) =>
//                             e.id === newExpense.id ? newExpense : e
//                         ),
//                     }
//                     : c
//                 )
//             );
//             console.log(newExpense.user)
//             setEdit(false) 
//         })
//         .catch((err) => {
//             console.error("Error:", err);
//         });
//     }

//     function handleDelete() {
//         fetch(`/expenses`, {  
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ id: currentExpense.id })
//         })
//         .then(resp => {
//             if (resp.ok) {
//                 deleteHolidayExpense(currentExpense.id, holiday_id); //!!
//                 console.log("Delete success");
//             } else {
//                 console.error("Failed to delete expense");
//             }
//         });
//     }

//     return (
//         <div className='log'>
//             {edit ? (
//                 <>  
//                     <h3>This expense item's category: {currentExpense.category.name}</h3>
//                     <form onSubmit={handleSubmit}>
//                         <input
//                             type="text" name="date" placeholder="xx/xx/xxxx"
//                             value={currentExpense.date}
//                             onChange={(e) => setCurrentExpense({...currentExpense, date: e.target.value})}
//                         />

//                         <span>$</span>
//                         <input
//                             type="text" name="amount" placeholder="0.00"
//                             value={currentExpense.amount}
//                             onChange={(e) => setCurrentExpense({...currentExpense, amount: e.target.value})}
//                         />

//                         <input
//                             type="text" name="note" placeholder="Notes for this expense"
//                             value={currentExpense.note}
//                             onChange={(e) => setCurrentExpense({...currentExpense, note: e.target.value})}
//                         />

//                         {/* <h2>Select your option:</h2>
//                         <select value={selected} onChange={handleSelectChange}>
//                             <option value="">-- Choose a category --</option>
//                             {allCategories.map((category) => (<option key={category.id} value={category.id}> {category.name} </option>))}
//                         </select> */}

//                         <button type="submit">Submit</button>
//                     </form>

//                     <button color="secondary" onClick={() => setEdit(false)}>
//                         Cancel Edit
//                     </button>
//                 </>
//             ) : (
//                 <>
//                     <div>
//                         <h3>This expense item's category: {currentExpense.category.name}</h3>
//                         <h4>Date:{currentExpense.date}</h4>
//                         <h4>Amount:${currentExpense.amount}</h4>
//                         <h4>Note:{currentExpense.note}</h4>
//                         <button color="secondary" onClick={() => setEdit(true)}>
//                             Edit
//                         </button>
//                         <button onClick={handleDelete}>Delete</button>
//                     </div>
//                 </>
//             )}
//         </div>
//     )
// }

// export default HolidayExpense;