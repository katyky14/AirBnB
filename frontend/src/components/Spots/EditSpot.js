import { add } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";


import { editSpotThunk } from '../../store/spot';
import { getOneSpotDetails } from '../../store/spot';
import { getCurrentSpotThunk } from '../../store/spot';

import '../spotCss/EditForm.css'


function EditSpotForm() {
  const history = useHistory()
  const { spotId } = useParams();
  const dispatch = useDispatch();
  //console.log('the spot id', spotId);
  const spotsObj = useSelector(state => state.spot)
  //console.log('the spot obj in EDIT---', spotsObj)
  const spotsArr = Object.values(spotsObj);
  //console.log('the spots array in edit--', spotsArr)

  const spotData = spotsArr.find(spot => String(spot.id) === spotId)

  //console.log('the spot data in EDIT comparison----', spotData.address)

  const [address, setAddress] = useState(spotData.address);
  const [city, setCity] = useState(spotData.city);
  const [state, setState] = useState(spotData.state);
  const [country, setCountry] = useState(spotData.country);
  const [lat, setLat] = useState(spotData.lat);
  const [lng, setLng] = useState(spotData.lng);
  const [name, setName] = useState(spotData.name);
  const [description, setDescription] = useState(spotData.description);
  const [price, setPrice] = useState(spotData.price);
  const [validationErrors, setValidationErrors] = useState([]);
  const [previewImage, setPreviewImage] = useState(spotData.previewImage)


  const updateAddress = e => setAddress(e.target.value);
  const updateCity = e => setCity(e.target.value);
  const updateState = e => setState(e.target.value);
  const updateCountry = e => setCountry(e.target.value);
  const updateLat = e => setLat(e.target.value);
  const updateLng = e => setLng(e.target.value);
  const updateName = e => setName(e.target.value);
  const updateDescription = e => setDescription(e.target.value);
  const updatePrice = e => setPrice(e.target.value);
  const updatePreviewImage = e => setPreviewImage(e.target.value);

  useEffect(() => {
    dispatch(getOneSpotDetails(spotId))
  }, [dispatch, spotId]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const spotFormInformation = {
      id: spotId,
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

    let updatedSpot = await dispatch(editSpotThunk(spotId, spotFormInformation))

    //console.log('the createspotform handle submit', updatedSpot)
    if (updatedSpot) {
      history.push(`/spots/user`)
    }
    //console.log('the info', spotFormInformation)
  };

  //console.log('the information in create spot')
  useEffect(() => {
    const valErrors = [];

    if (!address.length) valErrors.push("Street address is required");
    if (!city.length) valErrors.push("City is required");
    if (!state.length) valErrors.push("State is required");
    if (!country.length) valErrors.push("Country is required");
    if (!lat) valErrors.push("Lat is required");
    if (!lng) valErrors.push("Lng is required");
    if (!description.length) valErrors.push("Description is required");

    if (lat > 90 || lat < -90) valErrors.push("Latitude must be between -90 and 90"); //-90 to 90
    if (!lng > 180 || lng < -180) valErrors.push("Longitude must be between -180 and 180"); //-180 to 180

    if (name.length > 50) valErrors.push("Name must be less than 50 characters");
    if (!price) valErrors.push("Price per day is required")

    if(!previewImage.match(/\.(jpg|jpeg|png|gif)$/)) valErrors.push('Please provide a valid image extension [png/jpg/jpeg]')
    if (!previewImage.length) valErrors.push("Image is required");


    setValidationErrors(valErrors)
  }, [address, city, state, lat, lng, name, price, previewImage])

  if (spotData != null) {
    return (

      <form onSubmit={handleSubmit} className="main-edit-div">
        <h2 className="h2-info2">Edit Your Information</h2>
        <div className="div-container-edit">

          <ul>
            {validationErrors.map((error) => <li className="li-edit" key={error}><span className="li-edit-error-asterisk">*</span> {error}</li>)}
          </ul>
          <label>

            <input
              className="input-style-edit"
              placeholder="Address"
              type="text"
              value={address}
              onChange={updateAddress}
              required
            />
          </label>
          <label>

            <input
              className="input-style-edit"
              placeholder="City"
              type="text"
              value={city}
              onChange={updateCity}
              required
            />
          </label>
          <label>

            <input
              className="input-style-edit"
              placeholder="State"
              type="text"
              value={state}
              onChange={updateState}
              required
            />
          </label>
          <label>

            <input
              className="input-style-edit"
              placeholder="Country"
              type="text"
              value={country}
              onChange={updateCountry}
              required
            />
          </label>
          <label>

            <input
              className="input-style-edit"
              placeholder="Lat"
              type="number"
              value={lat}
              onChange={updateLat}
              required
            />
          </label>
          <label>

            <input
              className="input-style-edit"
              placeholder="Lng"
              type="number"
              value={lng}
              onChange={updateLng}
              required
            />
          </label>
          <label>

            <input
              className="input-style-edit"
              placeholder="Name"
              type="text"
              value={name}
              onChange={updateName}
              required
            />
          </label>
          <label>

            <input
              className="input-style-edit"
              placeholder="Description"
              type="text"
              value={description}
              onChange={updateDescription}
              required
            />
          </label>
          <label>

            <input
              className="input-style-edit"
              placeholder="Price"
              type="number"
              value={price}
              onChange={updatePrice}
              required
            />
          </label>
          <label>

            <input
              className="input-style-edit"
              placeholder="Preview Image"
              type="string"
              value={previewImage}
              onChange={updatePreviewImage}
              required
            />
          </label>
          <button className="button-edit" type="submit" disabled={validationErrors.length > 0}>Edit Spot</button>
        </div>
      </form>
    );
  }
}

export default EditSpotForm;
