import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import '../styles/Login.css';
import "../styles/PageLayout.css";

function Login() {
  const [showLogin, setShowLogin] = useState(true);


  return (
    <div className="auth-container">

      {/* Card wrapper */}
      <div className="auth-card">

        {/* Header */}
        <h2 className="auth-title">
          {showLogin ? "Welcome Back" : "Create Your Account"}
        </h2>
        <p className="auth-subtitle">
          {showLogin
            ? "Log in to continue tracking your holiday expenses."
            : "Sign up to start managing your holiday spending."}
        </p>

        {/* Forms */}
        <div className="auth-form-wrapper">
          {showLogin ? <LoginForm /> : <SignUpForm />}
        </div>

        {/* Switch Forms */}
        <p className="auth-switch">
          {showLogin ? (
            <>
              Don't have an account?{" "}
              <button
                className="btn-text"
                onClick={() => setShowLogin(false)}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="btn-text"
                onClick={() => setShowLogin(true)}
              >
                Log In
              </button>
            </>
          )}
        </p>

      </div>
    </div>
  );
}

export default Login;


// function Login() {
//   const [showLogin, setShowLogin] = useState(true);


//   return (
//     <div>
//       {showLogin ? (
//         <>
//           <LoginForm />
//           <p>
//             Don't have an account? &nbsp;
//             <button color="secondary" onClick={() => setShowLogin(false)}>
//               Sign Up
//             </button>
//           </p>
//         </>
//       ) : (
//         <>
//           <SignUpForm />

//           <p>
//             Already have an account? &nbsp;
//             <button color="secondary" onClick={() => setShowLogin(true)}>
//               Log In
//             </button>
//           </p>
//         </>
//       )}
//     </div>
//   );
// }

// export default Login;
