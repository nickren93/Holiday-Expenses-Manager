import '../styles/PageLayout.css';
import { Link } from "react-router-dom";


function MyHoliday({ holiday_id, name, description, year }) {

    return (
        <div className="item-card">

            {/* Header */}
            <div className="item-card-header">
                <div>
                    <div className="item-card-title">{name}</div>
                    <div className="item-card-meta">{description || "No description"}</div>
                </div>

                <span className="tag tag--holiday">{year}</span>
            </div>

            {/* Footer Actions */}
            <div className="item-card-footer">
                <span className="item-card-meta">
                    View all expenses
                </span>
                <Link to={`/myholidays/${holiday_id}/expenses/${year}`} className="btn-secondary">
                    Open →
                </Link>
            </div>

        </div>
    );
}

export default MyHoliday;



// function MyHoliday({ holiday_id, name, description, year }) {
    
//     return (
//         <div className="myHoliday-card"> 
//             <h2>{name}</h2>
//             <h3> name: {name} </h3>
//             <h3> Description: {description} </h3>
//             <Link to={`/holidays/${holiday_id}/expenses/${year}`} className="view-profile">
//                 See expenses for {name} in {year} 
//             </Link>
//         </div>
//     )
// }

// export default MyHoliday;