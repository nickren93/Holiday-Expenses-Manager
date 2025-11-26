import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { StateAndHandlerContext } from '../context/stateAndHandler';
import "../styles/PageLayout.css";

function NewCategory() {

    const { allCategories, setAllCategories } = useContext(StateAndHandlerContext)

    const navigate = useNavigate()

    const formSchema = yup.object().shape({
      name: yup.string().required("Must enter a holiday name."),
      about: yup.string().required("Must enter a description for what this catgeory is about."),
    });

    const formik = useFormik({
      initialValues: {
        name: "",
        about: "",
      },
      validationSchema: formSchema,
      onSubmit: (newCategory) => {
        fetch("/categories", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(newCategory)
        })
        .then(resp => resp.json())
        .then(newCategory =>{
          setAllCategories([
            ...allCategories,
            newCategory
          ])
          console.log(allCategories)
          formik.resetForm();
          navigate("/newexpense");
        })
      },
    });

    return (

      <div className="form-page">

        {/* HEADER */}
        <h2 className="section-title">
            <span className="section-title-emoji">🧾</span>
            Create a New Category
        </h2>
        <p className="section-subtitle">
            Categories help organize your spending—add a new one below.
        </p>

        {/* FORM CARD */}
        <div className="form-card">

            <form onSubmit={formik.handleSubmit}>

                {/* Name */}
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Category Name</label>
                    <input
                        id="name"
                        name="name"
                        className="form-input"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    <p className="form-error">{formik.errors.name}</p>
                </div>

                {/* About */}
                <div className="form-group">
                    <label htmlFor="about" className="form-label">What is this category about?</label>
                    <input
                        id="about"
                        name="about"
                        type="text"
                        className="form-input"
                        onChange={formik.handleChange}
                        value={formik.values.about}
                    />
                    <p className="form-error">{formik.errors.about}</p>
                </div>

                <button 
                    type="submit" 
                    className="btn-primary"
                    style={{ width: "100%", marginTop: "12px" }}
                >
                    Create Category
                </button>

            </form>

        </div>

        {/* BACK BUTTON */}
        <Link to={`/newexpense`} className="btn-secondary" style={{ marginTop: "1.5rem" }}>
            ← Back
        </Link>

      </div>
    );
}

export default NewCategory;


// function NewCategory() {

//     const { allCategories, setAllCategories } = useContext(StateAndHandlerContext)

//     const navigate = useNavigate()

//     const formSchema = yup.object().shape({
//       name: yup.string().required("Must enter a holiday name."),
//       about: yup.string().required("Must enter a description for what this catgeory is about."),
//     });

//     const formik = useFormik({
//       initialValues: {
//         name: "",
//         about: "",
//       },
//       validationSchema: formSchema,
//       onSubmit: (newCategory) => {
//         fetch("/categories", {
//           method: "POST",
//           headers: {
//               "Content-Type": "application/json"
//           },
//           body: JSON.stringify(newCategory)
//         })
//         .then(resp => resp.json())
//         .then(newCategory =>{
//           setAllCategories([
//             ...allCategories,
//             newCategory
//           ])
//           console.log(allCategories)
//           formik.resetForm();
//           navigate("/newexpense");
//         })
//       },
//     });

//     return (

//         <div className="Workouts Page">
//         <p>Create a new category: </p>
//         <form onSubmit={formik.handleSubmit}>
//             <label htmlFor="name">Name</label>
//             <br />
//             <input
//             id="name"
//             name="name"
//             onChange={formik.handleChange}
//             value={formik.values.name}
//             />
//             <p style={{ color: "red" }}> {formik.errors.name}</p>

//             <label htmlFor="about">What is this category about:</label>
//             <br />
//             <input
//             id="about"
//             name="about"
//             type="about"
//             onChange={formik.handleChange}
//             value={formik.values.about}
//             />
//             <p style={{ color: "red" }}> {formik.errors.about}</p>

//             <button type="submit">Create Category</button>
//         </form>
//         <Link to={`/newexpense`} className="view-profile">Back</Link>       
//         </div>
//     );
// }

// export default NewCategory;

