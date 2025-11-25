import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { StateAndHandlerContext } from '../context/stateAndHandler';

function LoginForm() {

  const [error, setError] = useState("");
  const { setUser, setMyHolidays, setMyCategories } = useContext(StateAndHandlerContext)

  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    username: yup.string().required("Must enter username"),
    password: yup.string().required("Must enter a password"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values))
      fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((r) => {
        if (r.ok) {
            r.json().then((user) => {
              setUser(user)
              setMyHolidays(user.holidays)
              setMyCategories(user.categories)
              navigate("/");
            });
        } else {
            r.json().then((err) => setError(err.error));
        }
      });
    },
  });
  //----------------------------------------------------------------------------------

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <label htmlFor="username">Username</label>
        <br />
        <input
          id="username"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <p style={{ color: "red" }}> {formik.errors.username}</p>

        <label htmlFor="password">Password</label>
        <br />
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <p style={{ color: "red" }}> {formik.errors.password}</p>

        <button type="submit">Submit</button>

        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>
              <p>{error}</p>
            
          </div>
        )}
      </form>

    </div>
  );
}

export default LoginForm;
