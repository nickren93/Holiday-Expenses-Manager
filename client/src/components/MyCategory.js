// import '../styles/Workout.css';
import { Link } from "react-router-dom";

function MyCategory({ category_id, name, about, year }) {
    
    return (
        <div className="myHoliday-card"> 
            <h2>{name}</h2>
            <h3> About: {about} </h3>
            <Link to={`/categories/${category_id}/expenses/${year}`} className="view-profile">
                See expenses for category "{name}" in {year} 
            </Link>
        </div>
    )
}

export default MyCategory;