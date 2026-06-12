import { useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { StateAndHandlerContext } from '../context/stateAndHandler';
import "../styles/PageLayout.css";

function SignUpForm() {

  const [errors, setErrors] = useState([]);
  const { setUser } = useContext(StateAndHandlerContext)

  const navigate = useNavigate();

  //----------------------------------------------------------------------------------
  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter your name"),  //////
    username: yup.string().required("Must enter username"),
    password: yup.string().required("Must enter a password"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",  //////
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
        fetch("/signup", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }).then((r) => {
          // setIsLoading(false);
          if (r.ok) {
              r.json().then((user) => {
                setUser(user)
                navigate("/");
              });
          } else {
              r.json().then((err) => setErrors(err.errors));
          }
        });
    },
  });
  //----------------------------------------------------------------------------------

  return (
    <div className="auth-form-inner">

      <h3 className="auth-form-title">Sign Up</h3>

      <form onSubmit={formik.handleSubmit} className="form-grid">

        {/* Name */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            id="name"
            name="name"
            className="form-input"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <p className="form-error">{formik.errors.name}</p>
        </div>

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

        {/* Submit */}
        <button 
          type="submit" 
          className="btn-primary"
          style={{ width: "100%", marginTop: "12px" }}
        >
          Sign Up
        </button>

        {/* Server-side errors */}
        {errors.length > 0 && (
          <div className="form-error-box">
            {errors.map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </div>
        )}

      </form>

    </div>
  );
}

export default SignUpForm;


// import { useState, useContext } from "react";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { StateAndHandlerContext } from '../context/stateAndHandler';
// import "../styles/PageLayout.css";

// function SignUpForm() {

//   const [errors, setErrors] = useState([]);
//   const { setUser } = useContext(StateAndHandlerContext)

//   const navigate = useNavigate();

//   //----------------------------------------------------------------------------------
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
//         fetch("/signup", {
//           method: "POST",
//           headers: {
//               "Content-Type": "application/json",
//           },
//           body: JSON.stringify(values),
//         }).then((r) => {
//           // setIsLoading(false);
//           if (r.ok) {
//               r.json().then((user) => {
//                 setUser(user)
//                 navigate("/");
//               });
//           } else {
//               r.json().then((err) => setErrors(err.errors));
//           }
//         });
//     },
//   });
//   //----------------------------------------------------------------------------------

//   return (
//     <div className="auth-form-inner">

//       <h3 className="auth-form-title">Sign Up</h3>

//       <form onSubmit={formik.handleSubmit} className="form-grid">

//         {/* Username */}
//         <div className="form-group">
//           <label htmlFor="username" className="form-label">Username</label>
//           <input
//             id="username"
//             name="username"
//             className="form-input"
//             onChange={formik.handleChange}
//             value={formik.values.username}
//           />
//           <p className="form-error">{formik.errors.username}</p>
//         </div>

//         {/* Password */}
//         <div className="form-group">
//           <label htmlFor="password" className="form-label">Password</label>
//           <input
//             id="password"
//             name="password"
//             type="password"
//             className="form-input"
//             onChange={formik.handleChange}
//             value={formik.values.password}
//           />
//           <p className="form-error">{formik.errors.password}</p>
//         </div>

//         {/* Submit */}
//         <button 
//           type="submit" 
//           className="btn-primary"
//           style={{ width: "100%", marginTop: "12px" }}
//         >
//           Sign Up
//         </button>

//         {/* Server-side errors */}
//         {errors.length > 0 && (
//           <div className="form-error-box">
//             {errors.map((err, index) => (
//               <p key={index}>{err}</p>
//             ))}
//           </div>
//         )}

//       </form>

//     </div>
//   );
// }

// export default SignUpForm;
