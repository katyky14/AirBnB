// import { add } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";


import { spotFormThunk } from '../../store/spot'

function CreateSpotForm() {
  const history = useHistory()
  const dispatch = useDispatch();
  //const spotsObj = useSelector(state => state.spot)
  //console.log('the spot obj in FORM---', spotsObj)

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (validationErrors.length) return alert(`Cannot Submit, please fill the required fields`)

    const spotFormInformation =  {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description, price,
        previewImage
    }

    let createSpot =  await dispatch(spotFormThunk(spotFormInformation))
    //console.log('the create spot form handle submit', createSpot)
    if (createSpot) {
        history.push(`/spots/${createSpot.id}`)
    }
    //console.log('the info', spotFormInformation)
};


  useEffect(() => {
    const valErrors = [];

    if (!address.length) valErrors.push("Street address is required");
    if (!city.length) valErrors.push("City is required");
    if (!state.length) valErrors.push("State is required");

    if (lat > 90 || lat < -90) valErrors.push("Latitude must be between -90 and 90"); //-90 to 90
    if (!lng > 180 || lng < -180) valErrors.push("Longitude must be between -180 and 180"); //-180 to 180

    if (name.length > 50) valErrors.push("Name must be less than 50 characters");
    if (!price) valErrors.push("Price per day is required")

    if (!previewImage.length) valErrors.push("Image is required");

    setValidationErrors(valErrors)
  }, [address, city, state, lat, lng, name, price, previewImage]);

  return (
    <form onSubmit={handleSubmit}>
      {hasSubmitted && validationErrors.length > 0 && (

        <ul>
        {validationErrors.map((error) => <li key={error}>{error}</li>)}
      </ul>
        )}
      <label>
        Address
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        //   required
        />
      </label>
      <label>
        City
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        //   required
        />
      </label>
      <label>
        State
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        //   required
        />
      </label>
      <label>
        Country
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        //   required
        />
      </label>
      <label>
        lat
        <input
          type="number"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        //   required
        />
      </label>
      <label>
        lng
        <input
          type="number"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        //   required
        />
      </label>
      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Description
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          // required
        />
      </label>
      <label>
        Price
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          // required
        />
      </label>
      <label>
        Preview Image
        <input
          type="string"
          value={previewImage}
          onChange={(e) => setPreviewImage(e.target.value)}
          // required
        />
      </label>
      <button >Create New Spot</button>
    </form>
  );
}

export default CreateSpotForm;
