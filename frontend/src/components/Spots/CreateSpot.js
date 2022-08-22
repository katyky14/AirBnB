// import { add } from "lodash";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";


// import { spotForm } from '../../store/spot'

// function CreateSpotForm() {
//   const dispatch = useDispatch();

//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [country, setCountry] = useState("");
//   const [lat, setLat] = useState(0);
//   const [lng, setLng] = useState(0);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [validationErrors, setValidationErrors] = useState([]);


//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // const spotFormInformation = async (e) => {
//     //     address,
//     //     city,
//     //     state,
//     //     country,
//     //     lat,
//     //     lng,
//     //     name,
//     //     description, price
//     // }
//     //console.log('the parameter', e)
//     // let createSpot =  await dispatch(spotForm(spotFormInformation))
//     // console.log('the createspotform handle submit', createSpot)
// };

// console.log('the information in create spot')
//   useEffect(() => {
//     const valErrors = [];

//     if (!address.length) valErrors.push("Street address is required");
//     if (!city.length) valErrors.push("City is required");
//     if (!state.length) valErrors.push("State is required");

//     if (!lat.length) valErrors.push("Latitude is not valid");
//     if (!lng.length) valErrors.push("Longitude is not valid");

//     if (name.length > 50) valErrors.push("Name must be less than 50 characters");
//     if (!price) valErrors.push("Price per day is required")

//     setValidationErrors(valErrors)
//   }, [address, city, state, lat, lng, name, price])

//   return (
//     <form onSubmit={handleSubmit}>
//       <ul>
//         {validationErrors.map((error) => <li key={error}>{error}</li>)}
//       </ul>
//       <label>
//         Address
//         <input
//           type="text"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         City
//         <input
//           type="text"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         State
//         <input
//           type="text"
//           value={state}
//           onChange={(e) => setState(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Country
//         <input
//           type="text"
//           value={country}
//           onChange={(e) => setCountry(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         lat
//         <input
//           type="number"
//           value={lat}
//           onChange={(e) => setLat(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         lng
//         <input
//           type="number"
//           value={lng}
//           onChange={(e) => setLng(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Name
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Description
//         <input
//           type="text"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Price
//         <input
//           type="number"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           required
//         />
//       </label>
//       <button type="submit" disabled={validationErrors.length > 0}>Create New Spot</button>
//     </form>
//   );
// }

// export default CreateSpotForm;
