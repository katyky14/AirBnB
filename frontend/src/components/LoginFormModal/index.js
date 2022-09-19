import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

import './LoginForm.css'

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}
        className="button-logout">Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} >

          <div className='login-modal-div-x'>
            <button onClick={() => setShowModal(false)}
            className='login-modal-button-x'>
              <i className='fa-solid fa-x'></i>
            </button>
          </div>

          <div className='login-title-modal'>Log In</div>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}


export default LoginFormModal;
