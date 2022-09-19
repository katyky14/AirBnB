import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './SignUpFormModal.css';

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  // if (sessionUser) return <Redirect to="/" />; // for sign up to not refresh?

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          //if (data && data.errors) setErrors(data.errors);
          const valErrors = Object.values(data.errors)
          if (valErrors) setErrors(valErrors)
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form onSubmit={handleSubmit} className="main-container-signup-modal">
      <div className="div-container-signup-modal">
        <ul className="ul-error-signup-modal">
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>


        <label className="label-style-signup-modal">
          Email
          <input
            className="input-signup-modal"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="label-style-signup-modal">
          Username
          <input
            className="input-signup-modal"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="label-style-signup-modal">
          Password
          <input
            className="input-signup-modal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label className="label-style-signup-modal">
          Confirm Password
          <input
            className="input-signup-modal"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="button-signup-modal">Sign Up</button>
      </div>
    </form>
  );
}

export default SignupForm;
