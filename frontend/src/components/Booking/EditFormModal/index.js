import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditBookingForm from "./EditBookingForm";

import '../bookingForm.css'

function EditBookingFormModal({ bookingId, spotId }) {
    const [showModal, setShowModal] = useState(false);

    return  (
        <>
            <button onClick={() => setShowModal(true)}
                className="edit-booking-button" >
                Change Reservation
            </button>

        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <div>
                    <button onClick={() => setShowModal(false)}
                    className="edit-booking-modal-button-x "
                    >
                        <i className='fa-solid fa-x'></i>
                    </button>
                </div>
                <div className="edit-booking-modal-text">Change Reservation</div>
                <EditBookingForm bookingId={bookingId} spotId={spotId} setShowModal={setShowModal}/>
            </Modal>
        )}

        </>
    )

}

export default EditBookingFormModal
