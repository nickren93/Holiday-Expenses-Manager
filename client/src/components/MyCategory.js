import { Link } from "react-router-dom";

function MyCategory({ category_id, name, about, year }) {
    
    return (
        <div className="item-card">

            {/* Header */}
            <div className="item-card-header">
                <div>
                    <div className="item-card-title">{name}</div>
                    <div className="item-card-meta">{about}</div>
                </div>

                <span className="tag tag--category">{year}</span>
            </div>

            {/* Footer */}
            <div className="item-card-footer">
                <span className="item-card-meta">
                    View all expenses
                </span>
                <Link to={`/mycategories/${category_id}/expenses`} className="btn-secondary">
                    Open →
                </Link>
            </div>

        </div>
    )
}

export default MyCategory;



// function MyCategory({ category_id, name, about, year }) {
    
//     return (
//         <div className="myHoliday-card"> 
//             <h2>{name}</h2>
//             <h3> About: {about} </h3>
//             <Link to={`/categories/${category_id}/expenses/${year}`} className="view-profile">
//                 See expenses for category "{name}" in {year} 
//             </Link>
//         </div>
//     )
// }

// export default MyCategory;