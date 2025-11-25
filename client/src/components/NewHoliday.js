import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { StateAndHandlerContext } from '../context/stateAndHandler';


function NewHoliday() {

    const { allHolidays, setAllHolidays } = useContext(StateAndHandlerContext)

    const navigate = useNavigate()

    const formSchema = yup.object().shape({
      name: yup.string().required("Must enter a holiday name."),
      description: yup.string().required("Must enter a description for this holiday."),
    });

    const formik = useFormik({
      initialValues: {
        name: "",
        description: "",
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
          navigate("/newexpense");
        })
      },
    });

  return (

    <div className="Workouts Page">
      <p>Create a new holiday: </p>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <p style={{ color: "red" }}> {formik.errors.name}</p>

        <label htmlFor="description">Description</label>
        <br />
        <input
          id="description"
          name="description"
          type="description"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        <p style={{ color: "red" }}> {formik.errors.description}</p>

        <button type="submit">Create Holiday</button>
      </form>
      <Link to={`/newexpense`} className="view-profile">Back</Link>      
    </div>
  );
}

export default NewHoliday;

