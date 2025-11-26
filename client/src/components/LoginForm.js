import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { StateAndHandlerContext } from '../context/stateAndHandler';
import "../styles/PageLayout.css";

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
    <div className="auth-form-inner">

      <h3 className="auth-form-title">Log In</h3>

      <form onSubmit={formik.handleSubmit} className="form-grid">

        {/* Username */}
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            id="username"
            name="username"
            className="form-input"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <p className="form-error">{formik.errors.username}</p>
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-input"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <p className="form-error">{formik.errors.password}</p>
        </div>

        <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "12px" }}>
          Log In
        </button>

        {error && (
          <div className="form-error-box">
            <p>{error}</p>
          </div>
        )}

      </form>

    </div>
  );
}

export default LoginForm;


// function LoginForm() {

//   const [error, setError] = useState("");
//   const { setUser, setMyHolidays, setMyCategories } = useContext(StateAndHandlerContext)

//   const navigate = useNavigate();

//   const formSchema = yup.object().shape({
//     username: yup.string().required("Must enter username"),
//     password: yup.string().required("Must enter a password"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       password: "",
//     },
//     validationSchema: formSchema,
//     onSubmit: (values) => {
//       console.log(JSON.stringify(values))
//       fetch("/login", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       }).then((r) => {
//         if (r.ok) {
//             r.json().then((user) => {
//               setUser(user)
//               setMyHolidays(user.holidays)
//               setMyCategories(user.categories)
//               navigate("/");
//             });
//         } else {
//             r.json().then((err) => setError(err.error));
//         }
//       });
//     },
//   });
//   //----------------------------------------------------------------------------------

//   return (
//     <div>
//       <h1>Log in</h1>
//       <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
//         <label htmlFor="username">Username</label>
//         <br />
//         <input
//           id="username"
//           name="username"
//           onChange={formik.handleChange}
//           value={formik.values.username}
//         />
//         <p style={{ color: "red" }}> {formik.errors.username}</p>

//         <label htmlFor="password">Password</label>
//         <br />
//         <input
//           id="password"
//           name="password"
//           type="password"
//           onChange={formik.handleChange}
//           value={formik.values.password}
//         />
//         <p style={{ color: "red" }}> {formik.errors.password}</p>

//         <button type="submit">Submit</button>

//         {error && (
//           <div style={{ color: "red", marginTop: "10px" }}>
//               <p>{error}</p>
            
//           </div>
//         )}
//       </form>

//     </div>
//   );
// }

// export default LoginForm;
