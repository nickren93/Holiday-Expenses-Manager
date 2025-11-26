import { useContext } from "react";
import { Link } from "react-router-dom";
import '../styles/Home.css';
import MyCategory from "./MyCategory";
import { StateAndHandlerContext } from '../context/stateAndHandler';

function MyCategories(){
    
    const { user, myCategories } = useContext(StateAndHandlerContext)

    if (!user) {
        return <h2>Please Login for more!</h2>;  // or redirect, or show nothing
    }

    if (myCategories.length == 0){
        return(
            <div>
                <h2>You don't have any expense category on record.</h2>
                <Link to={`/newexpense`} className="view-profile">Create an expense record.</Link>
            </div>
        )
    }
    //---------------------------------------------------------------------------------------
    // create an empty object to store categories by year
    const categoriesByYear = {};

    // go through each category
    for (let i = 0; i < myCategories.length; i++) {
        const category = myCategories[i];

        // if the category has expenses
        if (category.expenses && category.expenses.length > 0) {

            // loop through all expenses to collect all years
            for (let j = 0; j < category.expenses.length; j++) {
                const exp = category.expenses[j];
                const date = exp.date; // like "2025-12-25"
                let year = "Unknown";

                // get the first 4 characters if it looks like a valid date
                if (date && date.length >= 4) {
                    year = date.slice(0, 4);
                }

                // if we don’t have this year yet, create it
                if (!categoriesByYear[year]) {
                    categoriesByYear[year] = [];
                }

                // check if this category is already added to that year
                let alreadyAdded = false;
                for (let k = 0; k < categoriesByYear[year].length; k++) {
                    if (categoriesByYear[year][k].id === category.id) {
                        alreadyAdded = true;
                        break;
                    }
                }

                // only add the category once per year
                if (!alreadyAdded) {
                    categoriesByYear[year].push(category);
                }
            }

        } else {
            // if no expenses at all
            if (!categoriesByYear["Unknown"]) {
                categoriesByYear["Unknown"] = [];
            }
            categoriesByYear["Unknown"].push(category);
        }
    }

    // make a list of all years and sort them newest first
    const sortedYears = Object.keys(categoriesByYear).sort((a, b) => b.localeCompare(a));
    //----------------------------------------------------------------------------------------

    return(
        <div className="workout-list">
            <h2>Your categories (by year):</h2>

            {sortedYears.map((year) => (
                <div key={year}>
                    <h3 style={{ textDecoration: "underline" }}>{year}</h3>
                    {categoriesByYear[year].map((category) => (
                        <MyCategory
                            key={category.id}
                            category_id={category.id}
                            name={category.name}
                            about={category.about}
                            year = {year}
                        />
                    ))}
                </div>
            ))}
        </div>
    )           
}

export default MyCategories;



// function MyCategories(){
    
//     const { user, myCategories } = useContext(StateAndHandlerContext)

//     if (!user) {
//         return <h2>Please Login for more!</h2>;  // or redirect, or show nothing
//     }

//     if (myCategories.length == 0){
//         return(
//             <div>
//                 <h2>You don't have any expense category on record.</h2>
//                 <Link to={`/newexpense`} className="view-profile">Create an expense record.</Link>
//             </div>
//         )
//     }

//     return(
//         <div className="workout-list">
//             <h2>Your categories:</h2>
//                 { myCategories.map((category) => (<MyCategory key={category.id} category_id={category.id} 
//                 name={category.name} about={category.about} />
//             ))}
//         </div>
//     )           
// }

// export default MyCategories;