// import '../styles/Workout.css';
import { Link } from "react-router-dom";

function MyHoliday({ holiday_id, name, description, year }) {
    
    return (
        <div className="myHoliday-card"> 
            <h2>{name}</h2>
            <h3> name: {name} </h3>
            <h3> Description: {description} </h3>
            <Link to={`/holidays/${holiday_id}/expenses/${year}`} className="view-profile">
                See expenses for {name} in {year} 
            </Link>
        </div>
    )
}

export default MyHoliday;