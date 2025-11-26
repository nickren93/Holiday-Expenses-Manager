import { useContext } from "react";
import { Link } from "react-router-dom";
// import '../styles/Home.css';
import '../styles/PageLayout.css';
import MyCategory from "./MyCategory";
import { StateAndHandlerContext } from '../context/stateAndHandler';

function MyCategories(){
    
    const { user, myCategories } = useContext(StateAndHandlerContext)

    if (!user) {
        return (
            <div className="section-container">
                <div className="empty-state">
                    <div className="empty-icon">🔐</div>
                    <div className="empty-title">Please log in</div>
                    <div className="empty-text">Sign in to view your categories.</div>
                </div>
            </div>
        );
    }

    if (myCategories.length == 0){
        return(
            <div className="section-container">
                <div className="empty-state">
                    <div className="empty-icon">🗂️</div>
                    <div className="empty-title">No categories yet</div>
                    <div className="empty-text">
                        Categories help you organize expenses. Start by adding one!
                    </div>
                    <Link to={`/newexpense`} className="btn-primary" style={{ marginTop: "1rem" }}>
                        + Create an Expense
                    </Link>
                </div>
            </div>
        )
    }
    //---------------------------------------------------------------------------------------
    const categoriesByYear = {};

    for (let i = 0; i < myCategories.length; i++) {
        const category = myCategories[i];

        if (category.expenses && category.expenses.length > 0) {

            for (let j = 0; j < category.expenses.length; j++) {
                const exp = category.expenses[j];
                const date = exp.date; 
                let year = "Unknown";

                if (date && date.length >= 4) {
                    year = date.slice(0, 4);
                }

                if (!categoriesByYear[year]) {
                    categoriesByYear[year] = [];
                }

                let alreadyAdded = false;
                for (let k = 0; k < categoriesByYear[year].length; k++) {
                    if (categoriesByYear[year][k].id === category.id) {
                        alreadyAdded = true;
                        break;
                    }
                }

                if (!alreadyAdded) {
                    categoriesByYear[year].push(category);
                }
            }

        } else {
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
        <div className="section-container">
            {/* Section Heading */}
            <div className="section-header">
                <div>
                    <h2 className="section-title">
                        <span className="section-title-emoji">🧾</span>
                        My Categories
                    </h2>
                    <p className="section-subtitle">Grouped by year</p>
                </div>

                <div className="section-actions">
                    <Link to="/newexpense" className="btn-primary">+ Add Expense</Link>
                </div>
            </div>

            {sortedYears.map((year) => (
                <div key={year} style={{ marginBottom: "2rem" }}>
                    <h3 className="section-subtitle" style={{ fontSize: "1.2rem" }}>
                        <span className="tag tag--category">{year}</span>
                    </h3>
                    <div className="card-grid">
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