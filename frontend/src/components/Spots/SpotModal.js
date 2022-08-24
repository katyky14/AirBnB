// import React, { useState } from 'react';
// import { Modal } from '../../context/Modal';
// import EditSpotForm from './EditSpot';

// function SpotModalTest() {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <>
//       <button onClick={() => setShowModal(true)}>Log In</button>
//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           <EditSpotForm />
//         </Modal>
//       )}
//     </>
//   );
// }

// export default LoginFormModal;



<div>
{/* <NavLink to={`/spots/${spotId}/edit`}> */}
<button onClick={() => setShowModal(true)}>Edit Spot</button>
{showModal && (
      <Modal onClose={() => setShowModal(false)}>
      <EditSpotForm />
    </Modal>
)}
{/* </NavLink> */}
</div>
