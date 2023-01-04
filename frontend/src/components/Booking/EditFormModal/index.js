import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditBookingForm from "./EditBookingForm";


function EditBookingFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
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
                <div>Edit Reservation</div>
                <EditBookingForm />
            </Modal>
        )}

        </>
    )

}

export default EditBookingFormModal
