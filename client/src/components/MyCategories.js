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

    return(
        <div className="workout-list">
            <h2>Your categories:</h2>
                { myCategories.map((category) => (<MyCategory key={category.id} category_id={category.id} 
                name={category.name} about={category.about} />
            ))}
        </div>
    )           
}

export default MyCategories;