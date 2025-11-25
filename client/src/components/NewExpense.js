import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { StateAndHandlerContext } from '../context/stateAndHandler';
import { useFormik } from "formik";
import * as yup from "yup";

function NewExpense() {

  const { allHolidays, setAllHolidays, allCategories, setAllCategories,
    handleNewExpense} = useContext(StateAndHandlerContext)
  
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

  const formSchema = yup.object().shape({
    amount: yup.number().required("Must enter the amount for this transaction."),
    date: yup.date().required("Must enter a date"),
    note: yup.string().required("Must enter a note about this transaction."),
    holiday_id: yup.string().required("Please select a holiday for this transaction."),
    category_id: yup.string().required("Please select a category for this transaction."),
  });

  const formik = useFormik({
    initialValues: {
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

  return (

    <div>
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="holiday_id">Holiday Option</label>
          <br />
          <select
              id="holiday_id"
              name="holiday_id"
              onChange={formik.handleChange}
              value={formik.values.holiday_id}
          >
              <option value="">-- Choose a holiday --</option>
              {allHolidays.map((h) => (<option key={h.id} value={h.id}> {h.name} </option>))}
          </select>
          <p style={{ color: "red" }}>{formik.errors.holiday_id}</p>

        <p>Can't find your holiday?</p>
        <Link to={`/newexpenses/newholiday`} className="view-profile">Create a holiday!</Link>
        <br />
        <br />

        <label htmlFor="category_id">Category Option</label>
          <br />
          <select
              id="category_id"
              name="category_id"
              onChange={formik.handleChange}
              value={formik.values.category_id}
          >
              <option value="">-- Choose a category --</option>
              {allCategories.map((c) => (<option key={c.id} value={c.id}> {c.name} </option>))}
          </select>
          <p style={{ color: "red" }}>{formik.errors.category_id}</p>

        <p>Can't find your category?</p>
        <Link to={`/newexpenses/newcategory`} className="view-profile">Create a category!</Link>
        <br />
        <br />

        <label htmlFor="amount">Amount</label>
        <br />
        <input
          id="amount"
          name="amount"
          onChange={formik.handleChange}
          value={formik.values.amount}
        />
        <p style={{ color: "red" }}> {formik.errors.amount}</p>

        <label htmlFor="note">Note</label>
        <br />
        <input
          id="note"
          name="note"
          onChange={formik.handleChange}
          value={formik.values.note}
        />
        <p style={{ color: "red" }}> {formik.errors.note}</p>

        <label htmlFor="date">Date</label>
        <br />
        <input
          id="date"
          name="date"
          type="date"
          pattern="\d{4}-\d{2}-\d{2}"
          onChange={formik.handleChange}
          value={formik.values.date}
        />
        <p style={{ color: "red" }}> {formik.errors.date}</p>

        <button type="submit">Submit</button>
      </form>

    </div>  
  );
}

export default NewExpense;