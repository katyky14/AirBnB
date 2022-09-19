import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupForm from "./SignupForm";
import "./SignupFormModal.css";
function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className="signup-button" onClick={() => setShowModal(true)}>
        Sign Up
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="signup-modal-exit-button-div">
            <button
              onClick={() => setShowModal(false)}
              className="signup-modal-exit-button"
            >
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
          <div className="signup-modal-header">
            <div className="signup-modal-h3-container">
              <h1 className="signup-modal-header-text">
                <div>Sign Up</div>
              </h1>
            </div>
          </div>
          <div className="signup-modal-form">
            <SignupForm />
          </div>
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;


import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./SignupForm.css";

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({
          firstName,
          lastName,
          email,
          username,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors({
      password: "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul className="signup_error">
        {Object.values(errors).map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div className="signup-input-item">
        <input
          type="text"
          placeholder=" "
          value={firstName}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
        <label>First Name</label>
      </div>
      <div className="signup-input-item">
        <input
          type="text"
          placeholder=" "
          value={lastName}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
        <label>Last Name</label>
      </div>
      <div className="signup-input-item">
        <input
          type="text"
          placeholder=" "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Email</label>
      </div>
      <div className="signup-input-item">
        <input
          type="text"
          placeholder=" "
          minLength={4}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Username</label>
      </div>
      <div className="signup-input-item">
        <input
          placeholder=" "
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Password</label>
      </div>
      <div className="signup-input-item">
        <input
          type="password"
          placeholder=" "
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <label>Confirm Password</label>
      </div>
      <button className="signup-modal-submit" type="submit">
        Create Account
      </button>
    </form>
  );
}

// export default SignupForm;
