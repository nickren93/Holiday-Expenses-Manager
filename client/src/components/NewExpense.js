import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { StateAndHandlerContext } from '../context/stateAndHandler';
import { useFormik } from "formik";
import * as yup from "yup";
import "../styles/PageLayout.css";

function NewExpense() {

  const { allHolidays, setAllHolidays, allCategories, setAllCategories,
    handleNewExpense} = useContext(StateAndHandlerContext)

  // const [selectedYear, setSelectedYear] = useState("");
  
  // get all latest holidays (including any new ones added by other users) from db
  useEffect(() => {
    fetch("/holidays")
      .then((r) => r.json())
      .then(setAllHolidays);
  }, []);

  // get all latest categories (including any new ones added by other users) from db
  useEffect(() => {
    fetch("/categories")
      .then((r) => r.json())
      .then(setAllCategories);
  }, []);

  // const holidaysThisYear = selectedYear
  //   ? allHolidays.filter(h => String(h.year) === selectedYear)
  //   : [];

  const formSchema = yup.object().shape({
    year: yup.string().required("Please select a year."),
    amount: yup.number().required("Must enter the amount for this transaction.").
    min(0.01, "Amount must be greater than $0.00."),
    date: yup.date().required("Must enter a date").test(
      "matches-selected-year",
      "Date must be within the chosen year.",
      function (value) {
        const selectedYear = this.parent.year; // ← formik.values.year
        if (!selectedYear || !value) return false;

        const dateYear = new Date(value).getFullYear();
        return String(dateYear) === String(selectedYear);
      }
    ),
    note: yup.string().required("Must enter a note about this transaction."),
    holiday_id: yup.string().required("Please select a holiday for this transaction."),
    category_id: yup.string().required("Please select a category for this transaction."),
  });

  const formik = useFormik({
    initialValues: {
      year: "",
      amount: 0.00,
      date: "",
      note: "",
      holiday_id: "",
      category_id: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
        // holiday selected by user from drop down (from all holidays)
        const selectedHoliday = allHolidays.find(h => h.id == parseInt(values.holiday_id))
        // temporarily set the expenses for that holiday to be empty since its new
        const holidayToSubmit = { ...selectedHoliday, expenses: [] };
        
        // categoryselected by user from drop down (from all holidays)
        const selectedCategory = allCategories.find(c => c.id == parseInt(values.category_id))
        // temporarily set the expenses for that category to be empty since its new
        const categoryToSubmit = { ...selectedCategory, expenses: []}

        // any form input including number is default to be string, so we need to convert it to float for price
        const cleanedValues = {
          ...values,
          amount: parseFloat(values.amount),
        };
        
        handleNewExpense(cleanedValues, holidayToSubmit, categoryToSubmit)
        formik.resetForm();
    },
  });

  const holidaysOfSelectedYear = formik.values.year
    ? allHolidays.filter((h) => String(h.year) === String(formik.values.year))
    : [];

  return (

    <div className="form-page">

      {/* -------------------- HEADER -------------------- */}
      <h2 className="section-title">
        <span className="section-title-emoji">💸</span>
        Add a New Expense
      </h2>

      <p className="section-subtitle">
        Log spending for any holiday or category.
      </p>

      {/* -------------------- FORM CARD -------------------- */}
      <div className="form-card">

        <form onSubmit={formik.handleSubmit}>

          {/* YEAR SELCET FIRST */}
          <div className="form-group">
            <label htmlFor="year" className="form-label"> Year</label>
            <select
              className="form-input"
              id="year"
              name="year"
              value={formik.values.year}
              onChange={(e) => {
                formik.handleChange(e);
                formik.setFieldValue("holiday_id", ""); // reset holiday selection
              }}
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
              <option value="2027">2028</option>
              <option value="2027">2029</option>
            </select>
            <p className="error-text">{formik.errors.year}</p>
          </div>

          
          {/* Date */}
          <div className="form-group">
            <label htmlFor="date" className="form-label">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              pattern="\d{4}-\d{2}-\d{2}"
              className="form-input"
              onChange={formik.handleChange}
              value={formik.values.date}
              min={`${formik.values.year}-01-01`}
              max={`${formik.values.year}-12-31`}
            />
            <p className="form-error">{formik.errors.date}</p>
          </div>

          {/* HOLIDAY DROPDOWN FILTERED BY YEAR */}
          <div className="form-group">
            <label htmlFor="holiday_id" className="form-label">Holiday</label>

            <select
              id="holiday_id"
              name="holiday_id"
              className="form-input"
              onChange={formik.handleChange}
              value={formik.values.holiday_id}
              disabled={!formik.values.year}   // disable until year selected
            >
              <option value="">-- Choose a holiday --</option>
              {holidaysOfSelectedYear.map((h) => (
                <option key={h.id} value={h.id}>{h.name}</option>
              ))}
            </select>

            <p className="form-error">{formik.errors.holiday_id}</p>

            <p className="small-text">Can't find your holiday?</p>
            <Link to="/newexpenses/newholiday" className="btn-link">
              Create one →
            </Link>
          </div>

          {/* Category Select */}
          <div className="form-group" style={{ marginTop: "1.2rem" }}>
            <label htmlFor="category_id" className="form-label">Category</label>
            <select
              id="category_id"
              name="category_id"
              className="form-input"
              onChange={formik.handleChange}
              value={formik.values.category_id}
            >
              <option value="">-- Choose a category --</option>
              {allCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <p className="form-error">{formik.errors.category_id}</p>

            <Link to={`/newexpenses/newcategory`} className="link-inline">
              Can't find your category? → Create one
            </Link>
          </div>

          {/* Amount */}
          <div className="form-group">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input
              id="amount"
              name="amount"
              className="form-input"
              onChange={formik.handleChange}
              value={formik.values.amount}
            />
            <p className="form-error">{formik.errors.amount}</p>
          </div>

          {/* Note */}
          <div className="form-group">
            <label htmlFor="note" className="form-label">Note</label>
            <input
              id="note"
              name="note"
              className="form-input"
              onChange={formik.handleChange}
              value={formik.values.note}
            />
            <p className="form-error">{formik.errors.note}</p>
          </div>

          {/* Submit */}
          <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "1rem" }}>
            Submit
          </button>

        </form>
      </div>

    </div>
  );
}

export default NewExpense;



// function NewExpense() {

//   const { allHolidays, setAllHolidays, allCategories, setAllCategories,
//     handleNewExpense} = useContext(StateAndHandlerContext)
  
//   // get all latest holidays (including any new ones added by other users) from db
//   useEffect(() => {
//     fetch("/holidays")
//       .then((r) => r.json())
//       .then(setAllHolidays);
//   }, []);

//   // get all latest categories (including any new ones added by other users) from db
//   useEffect(() => {
//     fetch("/categories")
//       .then((r) => r.json())
//       .then(setAllCategories);
//   }, []);

//   const formSchema = yup.object().shape({
//     amount: yup.number().required("Must enter the amount for this transaction."),
//     date: yup.date().required("Must enter a date"),
//     note: yup.string().required("Must enter a note about this transaction."),
//     holiday_id: yup.string().required("Please select a holiday for this transaction."),
//     category_id: yup.string().required("Please select a category for this transaction."),
//   });

//   const formik = useFormik({
//     initialValues: {
//       amount: 0.00,
//       date: "",
//       note: "",
//       holiday_id: "",
//       category_id: "",
//     },
//     validationSchema: formSchema,
//     onSubmit: (values) => {
//         // holiday selected by user from drop down (from all holidays)
//         const selectedHoliday = allHolidays.find(h => h.id == parseInt(values.holiday_id))
//         // temporarily set the expenses for that holiday to be empty since its new
//         const holidayToSubmit = { ...selectedHoliday, expenses: [] };
        
//         // categoryselected by user from drop down (from all holidays)
//         const selectedCategory = allCategories.find(c => c.id == parseInt(values.category_id))
//         // temporarily set the expenses for that category to be empty since its new
//         const categoryToSubmit = { ...selectedCategory, expenses: []}

//         // any form input including number is default to be string, so we need to convert it to float for price
//         const cleanedValues = {
//           ...values,
//           amount: parseFloat(values.amount),
//         };
        
//         handleNewExpense(cleanedValues, holidayToSubmit, categoryToSubmit)
//         formik.resetForm();
//     },
//   });

//   return (

//     <div>
//       <form onSubmit={formik.handleSubmit}>

//         <label htmlFor="holiday_id">Holiday Option</label>
//           <br />
//           <select
//               id="holiday_id"
//               name="holiday_id"
//               onChange={formik.handleChange}
//               value={formik.values.holiday_id}
//           >
//               <option value="">-- Choose a holiday --</option>
//               {allHolidays.map((h) => (<option key={h.id} value={h.id}> {h.name} </option>))}
//           </select>
//           <p style={{ color: "red" }}>{formik.errors.holiday_id}</p>

//         <p>Can't find your holiday?</p>
//         <Link to={`/newexpenses/newholiday`} className="view-profile">Create a holiday!</Link>
//         <br />
//         <br />

//         <label htmlFor="category_id">Category Option</label>
//           <br />
//           <select
//               id="category_id"
//               name="category_id"
//               onChange={formik.handleChange}
//               value={formik.values.category_id}
//           >
//               <option value="">-- Choose a category --</option>
//               {allCategories.map((c) => (<option key={c.id} value={c.id}> {c.name} </option>))}
//           </select>
//           <p style={{ color: "red" }}>{formik.errors.category_id}</p>

//         <p>Can't find your category?</p>
//         <Link to={`/newexpenses/newcategory`} className="view-profile">Create a category!</Link>
//         <br />
//         <br />

//         <label htmlFor="amount">Amount</label>
//         <br />
//         <input
//           id="amount"
//           name="amount"
//           onChange={formik.handleChange}
//           value={formik.values.amount}
//         />
//         <p style={{ color: "red" }}> {formik.errors.amount}</p>

//         <label htmlFor="note">Note</label>
//         <br />
//         <input
//           id="note"
//           name="note"
//           onChange={formik.handleChange}
//           value={formik.values.note}
//         />
//         <p style={{ color: "red" }}> {formik.errors.note}</p>

//         <label htmlFor="date">Date</label>
//         <br />
//         <input
//           id="date"
//           name="date"
//           type="date"
//           pattern="\d{4}-\d{2}-\d{2}"
//           onChange={formik.handleChange}
//           value={formik.values.date}
//         />
//         <p style={{ color: "red" }}> {formik.errors.date}</p>

//         <button type="submit">Submit</button>
//       </form>

//     </div>  
//   );
// }

// export default NewExpense;