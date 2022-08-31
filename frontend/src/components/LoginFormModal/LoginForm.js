import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
//import DemoUser from "../DemoUser/demoUser";
import { useHistory } from "react-router-dom";

import './LoginForm.css';


function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const user = useSelector(state => state.session.user);

  // useEffect(() => {
  //   const valErrors = [];

  //   if (!credential.length) valErrors.push("Invalid Credentials");
  //   if(!password.length) valErrors.push("Invalid Credentials")
  //   if (!user) valErrors.push("Invalid Credentials")

  //   setErrors(valErrors);
  // }, [credential, password])
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true)
    history.push('/')
    // const valErrors= [];

    // if (!credential.length)  valErrors.push('Invalid Credential')
    // if (!password.length) valErrors.push('Invalid Credentials')
    // setErrors(valErrors);

    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        //const dataArr = data.errors;
        //const resArr = dataArr.map(ele => ele.message)
        //console.log('the data error', resArr)
        if (data && data.errors)
          //if (!user) return alert("Invalid Credentials")
        // if (!user) {
        //   return (
        //     <div>Invalid Credentials</div>
        //   )
        // }
        // console.log('data in user', data)
        //if(!user) return (resArr[0])
        setErrors([data.errors[0].message]);
      }
    );
  };
  //console.log('the errors', errors)
  return (
    <>
    <form onSubmit={handleSubmit} className="background modal-div" >
      <div className='main-container open-div'>
      <h1 className="welcome-div">Welcome to Homebnb</h1>


      {hasSubmitted && errors.length > 0 && (
        <ul >
          {errors.map((error, idx) => (
            <li className="error-li" key={idx}>{error}</li>
            ))}
        </ul>
      )}

      <label className='label-style'>
        Username or Email
        <input
         className="input"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          />
      </label>
      <label className='label-style'>
        Password
        <input
         className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
      </label>
      <button type="submit" className="button1">Log In</button>
      <button type="submit" onClick={() => {
        setCredential("luffy@user.io");
        setPassword('password')}}
        className="button1"
        > Demo User
      </button>
      </div>
    </form>
  </>
  );
}

export default LoginForm;
