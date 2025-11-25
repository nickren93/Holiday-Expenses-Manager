// src/context/user.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const StateAndHandlerContext = React.createContext();

// create a provider component
function StateAndHandlerProvider({ children }) {
    
    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [myHolidays, setMyHolidays] = useState([]);
    const [myCategories, setMyCategories] = useState([]);
    const [allHolidays, setAllHolidays] = useState([]);
    const [allCategories, setAllCategories] = useState([]);

    const [holidayExpenses, setHolidayExpenses] = useState([])
    const [categoryExpenses, setCategoryExpenses] = useState([])

    const [newExpense, setNewExpense] = useState({
        amount: 0.00,
        note: "",
        date: "",
        user_id: undefined,
        holiday_id: undefined,
        category_id: undefined
    })


    // three params for this function, the actual newExpense object and selcetd holiday and category for it
    function handleNewExpense(newExpense, holidayToSubmit, categoryToSubmit){
        fetch(`/expenses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newExpense)
        })
        .then(resp => resp.json())
        .then(newExpense =>{
            const newExpenseToShow = {...newExpense, user_id: user.id}
            setNewExpense(newExpenseToShow)
        
            const holidayToUpdate = myHolidays.find(h => h.id == parseInt(holidayToSubmit.id))
            const categoryToUpdate = myCategories.find(c => c.id == parseInt(categoryToSubmit.id))

            if (holidayToUpdate && categoryToUpdate){
                const updatedHoliday = {
                    ...holidayToUpdate,
                    expenses: [...holidayToUpdate.expenses, newExpenseToShow]
                };
                const newMyHolidays = myHolidays.map((h) => (h.id=== holidayToUpdate.id ? updatedHoliday : h));
                
                const updatedCategory = {
                    ...categoryToUpdate,
                    expenses: [...categoryToUpdate.expenses, newExpenseToShow]
                };
                const newMyCategories = myCategories.map((c) => (c.id=== categoryToUpdate.id ? updatedCategory : c));
                
                setMyHolidays(newMyHolidays)
                setMyCategories(newMyCategories)
            }else if(!categoryToUpdate && holidayToUpdate){
                const updatedHoliday = {
                    ...holidayToUpdate,
                    expenses: [...holidayToUpdate.expenses, newExpenseToShow]
                };
                const newMyHolidays = myHolidays.map((h) => (h.id=== holidayToUpdate.id ? updatedHoliday : h));
                setMyHolidays(newMyHolidays)

                const newCategory = {
                    ...categoryToSubmit,
                    expenses: [newExpenseToShow],  
                }
                setMyCategories([...myCategories, newCategory]);
            }else if(!holidayToUpdate && categoryToUpdate){
                const updatedCategory = {
                    ...categoryToUpdate,
                    expenses: [...categoryToUpdate.expenses, newExpenseToShow]
                };
                const newMyCategories = myCategories.map((c) => (c.id=== categoryToUpdate.id ? updatedCategory : c));
                setMyCategories(newMyCategories)

                const newholiday = {
                    ...holidayToSubmit,
                    expenses: [newExpenseToShow],  
                }
                setMyHolidays([...myHolidays, newholiday]);
            }else{
                 const newCategory = {
                    ...categoryToSubmit,
                    expenses: [newExpenseToShow],  
                }
                setMyCategories([...myCategories, newCategory]);

                const newholiday = {
                    ...holidayToSubmit,
                    expenses: [newExpenseToShow],  
                }
                setMyHolidays([...myHolidays, newholiday]);
            }
        })
    }

    function deleteHolidayExpense(id, holiday_id) {
        const updatedHolidayExpenses = holidayExpenses.filter((expense) => expense.id !== id);
        setHolidayExpenses(updatedHolidayExpenses);

        const updatedCategoryExpenses = categoryExpenses.filter((expense) => expense.id !== id);
        setCategoryExpenses(updatedCategoryExpenses);

        // Update holiday’s expenses list in myHolidays
        setMyHolidays(prevHolidays =>
            prevHolidays.map(h => h.id === parseInt(holiday_id)
                    ? { ...h, expenses: h.expenses.filter(e => e.id !== id) }
                    : h
            )
        );

        // Update category’s expenses list in myCategories
        setMyCategories(prevCategories =>
            prevCategories.map(c => ({
                ...c, expenses: c.expenses ? c.expenses.filter(e => e.id !== id) : []
            }))
        );

        if (updatedHolidayExpenses.length === 0) {
            setMyHolidays(prev => prev.filter(h => h.id !== parseInt(holiday_id)));
            navigate("/myholidays");
        }
    }

    function deleteCategoryExpense(id, category_id) {
        const updatedCategoryExpenses = categoryExpenses.filter((expense) => expense.id !== id);
        setCategoryExpenses(updatedCategoryExpenses);

        const updatedHolidayExpenses = holidayExpenses.filter((expense) => expense.id !== id);
        setHolidayExpenses(updatedHolidayExpenses);

        // Update category’s expenses list in myCategories
        setMyCategories(prevCategories =>
            prevCategories.map(c => c.id === parseInt(category_id)
                    ? { ...c, expenses: c.expenses.filter(e => e.id !== id) }
                    : c
            )
        );

        // Update holiday’s expenses list in myHolidays
        setMyHolidays(prevHolidays =>
            prevHolidays.map(h => ({
                ...h,
                expenses: h.expenses ? h.expenses.filter(e => e.id !== id) : []
            }))
        );

        if (updatedCategoryExpenses.length === 0) {
            setMyCategories(prev => prev.filter(c => c.id !== parseInt(category_id)));
            navigate("/mycategories");
        }
    }

    function logout(){
        fetch(`/logout`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then((resp) => {
            if (resp.ok) {
                setUser(null);
                setMyHolidays([])
                setMyCategories([])
                setNewExpense({
                    amount: 0.00,
                    note: "",
                    date: "",
                    user_id: undefined,
                    holiday_id: undefined,
                    category_id: undefined 
                })
                // navigate("/login");
                navigate("/");
            } else {
                console.error("Logout failed");
            }
        });
    }


    // the value prop of the provider will be our context data
    // this value will be available to child components of this provider
    return (
        <StateAndHandlerContext.Provider value={{ logout, user, setUser, myHolidays, setMyHolidays, 
        myCategories, setMyCategories, allHolidays, setAllHolidays, allCategories, 
        setAllCategories, handleNewExpense, holidayExpenses, setHolidayExpenses, categoryExpenses, 
        setCategoryExpenses, deleteHolidayExpense, deleteCategoryExpense }}>
            {children}
        </StateAndHandlerContext.Provider>
    )
}

export { StateAndHandlerContext, StateAndHandlerProvider };