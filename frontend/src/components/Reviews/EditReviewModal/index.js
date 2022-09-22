
import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditReview from './EditReview';


function EditReviewModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit Review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditReview />
                </Modal>
            )}
        </>
    );
}

export default EditReviewModal;
