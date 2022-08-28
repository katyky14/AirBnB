// import { add } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import { spotFormThunk } from '../../store/spot'

import '../spotCss/SpotForm.css'


function CreateSpotForm() {
  const history = useHistory()
  const dispatch = useDispatch();
  //const spotsObj = useSelector(state => state.spot)
  //console.log('the spot obj in FORM---', spotsObj)

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
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

    const spotFormInformation = {
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

    let createSpot = await dispatch(spotFormThunk(spotFormInformation))
    //console.log('the create spot form handle submit', createSpot.length)
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
    if(!country.length) valErrors.push("Country is required");
    if (!lat) valErrors.push("Lat is required");
    if (!lng) valErrors.push("Lng is required");
    if (!description.length) valErrors.push("Description is required");

    if (lat > 90 || lat < -90) valErrors.push("Latitude must be between -90 and 90"); //-90 to 90
    if (!lng > 180 || lng < -180) valErrors.push("Longitude must be between -180 and 180"); //-180 to 180

    if (name.length > 50) valErrors.push("Name must be less than 50 characters");
    if (!price) valErrors.push("Price per day is required")

    if (!previewImage.length) valErrors.push("Image is required");

    setValidationErrors(valErrors)
  }, [address, city, state, lat, lng, name, price, previewImage]);

  return (
    <form onSubmit={handleSubmit} className="main-spot-div">
      <h1 className="h2-info">Enter your information</h1>
      <div className="div-container-spot">

        {hasSubmitted && validationErrors.length > 0 && (

          <ul>
            {validationErrors.map((error) => <li className="li-spot" key={error}>{error}</li>)}
          </ul>
        )}
        <label >
          <input
          className="input-style-spot"
          placeholder="Address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          //   required
          />
        </label>
        <label >
          <input
          className="input-style-spot"
          placeholder="City"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          //   required
          />
        </label>
        <label >

          <input
          className="input-style-spot"
          placeholder="State"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          //   required
          />
        </label>
        <label >

          <input
          className="input-style-spot"
          placeholder="Country"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          //   required
          />
        </label>
        <label >

          <input
          className="input-style-spot"
          placeholder="Lat"
            type="number"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          //   required
          />
        </label>
        <label >

          <input
          className="input-style-spot"
          placeholder="Lng"
            type="number"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          //   required
          />
        </label>
        <label >

          <input
          className="input-style-spot"
          placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>

          <input
          className="input-style-spot"
          placeholder="Description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          // required
          />
        </label>
        <label>
          <input
          className="input-style-spot"
          placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          // required
          />
        </label>
        <label>

          <input
          className="input-style-spot"
          placeholder="Preview Image"
            type="string"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
          // required
          />
        </label>
        <button className="button-spot">Create New Spot</button>
      </div>
    </form>
  );
}

export default CreateSpotForm;
