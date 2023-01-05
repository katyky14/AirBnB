import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditBookingForm from "./EditBookingForm";


function EditBookingFormModal({ bookingId, spotId }) {
    const [showModal, setShowModal] = useState(false);

    return  (
        <>
            <button onClick={() => setShowModal(true)}
                className="" >
                Edit Reservation
            </button>

        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <div>
                    <button onClick={() => setShowModal(false)}
                    className=""
                    >
                        <i className='fa-solid fa-x'></i>
                    </button>
                </div>
                <div>Change Reservation</div>
                <EditBookingForm bookingId={bookingId} spotId={spotId} setShowModal={setShowModal}/>
            </Modal>
        )}

        </>
    )

}

export default EditBookingFormModal
