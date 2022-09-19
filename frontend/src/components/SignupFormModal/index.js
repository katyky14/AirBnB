import React, { useState } from "react";
import { Modal } from '../../context/Modal';
import SignupForm from "./SignupForm";

function SignupModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}
                className="button-logout">
                Sign Up
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <div className='login-modal-div-x'>
                        <button onClick={() => setShowModal(false)}
                            className='login-modal-button-x'>
                            <i className='fa-solid fa-x'></i>
                        </button>
                    </div>
                    <div className='login-title-modal'>Sign Up</div>
                    <div className="signup-form-modal">
                        <SignupForm />
                    </div>
                </Modal>
            )}
        </>
    )
}

export default SignupModal;
