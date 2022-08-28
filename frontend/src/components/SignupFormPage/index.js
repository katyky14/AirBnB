import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          //if (data && data.errors) setErrors(data.errors);
          const valErrors = Object.values(data.errors)
          if(valErrors) setErrors(valErrors)
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form onSubmit={handleSubmit} className="main-container">
      <div className="div-container">
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>


      <label className="label-style">
        Email
        <input
         className="input"
         type="text"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         required
         />
      </label>
      <label className="label-style">
        Username
        <input
        className="input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        />
      </label>
      <label className="label-style">
        Password
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
      </label>
      <label className="label-style">
        Confirm Password
        <input
        className="input"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        />
      </label>
      <button type="submit" className="input button">Sign Up</button>
        </div>
    </form>
  );
}

export default SignupFormPage;
