import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const user = useSelector(state => state.session.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const valErrors= [];

    // if (!credential.length)  valErrors.push('Invalid Credential')
    // if (!password.length) valErrors.push('Invalid Credentials')
    // setErrors(valErrors);

      setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        const dataArr = data.errors;
        const resArr = dataArr.map(ele => ele.message)
        console.log('the data error', resArr)
        if (data && data.errors)
        if(!user) return alert("Invalid Credentials")
        // if (!user) {
        //   return (
        //     <div>Invalid Credentials</div>
        //   )
        // }
       // console.log('data in user', data)
       //if(!user) return (resArr[0])
        setErrors(data.errors);
      }
      );
    };
    //console.log('the errors', errors)
  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>

        ))}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;
