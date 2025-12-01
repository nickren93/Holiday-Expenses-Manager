import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { StateAndHandlerContext } from '../context/stateAndHandler';
import "../styles/PageLayout.css";


function NewHoliday() {

    const { allHolidays, setAllHolidays } = useContext(StateAndHandlerContext)

    const navigate = useNavigate()

    const formSchema = yup.object().shape({
      name: yup.string().required("Must enter a holiday name."),
      description: yup.string().required("Must enter a description for this holiday."),
      year: yup.number().required("Must choose a year.").min(1900).max(2150),
    });

    const formik = useFormik({
      initialValues: {
        name: "",
        description: "",
        year: "",
      },
      validationSchema: formSchema,
      onSubmit: (newHoliday) => {
        fetch("/holidays", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(newHoliday)
        })
        .then(resp => resp.json())
        .then(newHoliday =>{
          setAllHolidays([
            ...allHolidays,
            newHoliday
          ])
          console.log(allHolidays)
          formik.resetForm();
          navigate("/expense/new");
        })
      },
    });

  return (

    <div className="form-page">

      {/* HEADER */}
      <h2 className="section-title">
          <span className="section-title-emoji">🏖️</span>
          Create a New Holiday
      </h2>
      <p className="section-subtitle">
          Add a new holiday to organize your expenses.
      </p>

      {/* FORM CARD */}
      <div className="form-card">
        <form onSubmit={formik.handleSubmit}>

          {/* YEAR */}
          <div className="form-group">
              <label htmlFor="year" className="form-label">Year</label>
              <select
                  id="year"
                  name="year"
                  className="form-input"
                  onChange={formik.handleChange}
                  value={formik.values.year}
              >
                  <option value="">-- Select Year --</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
              </select>
              <p className="form-error"> {formik.errors.year}</p>
          </div>

          {/* NAME */}
          <div className="form-group">
              <label htmlFor="name" className="form-label">Holiday Name</label>
              <input
                  id="name"
                  name="name"
                  className="form-input"
                  onChange={formik.handleChange}
                  value={formik.values.name}
              />
              <p className="form-error"> {formik.errors.name}</p>
          </div>

          {/* DESCRIPTION */}
          <div className="form-group">
              <label htmlFor="description" className="form-label">Description</label>
              <input
                  id="description"
                  name="description"
                  type="text"
                  className="form-input"
                  onChange={formik.handleChange}
                  value={formik.values.description}
              />
              <p className="form-error"> {formik.errors.description}</p>
          </div>

          <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "12px" }}>
              Create Holiday
          </button>
        </form>
      </div>

      {/* BACK LINK */}
      <Link to={`/newexpense`} className="btn-secondary" style={{ marginTop: "1.5rem" }}>
          ← Back
      </Link>
           
    </div>
  );
}

export default NewHoliday;

