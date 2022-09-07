import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import './LoginForm.css';


function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const user = useSelector(state => state.session.user);


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

      <div className='main-container '>
        <form onSubmit={handleSubmit} className="background modal-div" >
          <h1 className="welcome-div">Welcome to Homebnb</h1>


          {hasSubmitted && errors.length > 0 && (
            <ul >
              {errors.map((error, idx) => (
                <li className="error-li" key={idx}>{error}</li>
              ))}
            </ul>
          )}

          <div className="form-element">

            <label >
              Username or Email
              <input
                className="input-login"
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="form-element">

            <label >
              Password
              <input
                className="input-login"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit" className="button1">Log In</button>
          <button type="submit" onClick={() => {
            setCredential("luffy@user.io");
            setPassword('password')
          }}
            className="button1"
          > Demo User
          </button>
        </form>
      </div>

  );
}

export default LoginForm;
