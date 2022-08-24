import { add } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";


import { editSpotThunk } from '../../store/spot';
import { getOneSpotDetails} from '../../store/spot';


function EditSpotForm() {
  const history = useHistory()
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spotsObj = useSelector(state => state.spot)
  console.log('the spot obj in EDIT---', spotsObj)
  const spotsArr = Object.values(spotsObj);
  console.log('the spots array in edit--', spotsArr)

  const spotData = spotsArr.find(spot => String(spot.id) === spotId)

  console.log('the spot data in EDIT comparison----', spotData.address)

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


  const updateAddress = e => setAddress(e.target.value);
  const updateCity = e => setCity(e.target.value);
  const updateState = e => setState(e.target.value);
  const updateCountry = e => setCountry(e.target.value);
  const updateLat = e => setLat(e.target.value);
  const updateLng = e => setLng(e.target.value);
  const updateName = e => setName(e.target.value);
  const updateDescription = e => setDescription(e.target.value);
  const updatePrice = e => setPrice(e.target.value);

  useEffect (() => {
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
      description, price
    }

    let updatedSpot =  await dispatch(editSpotThunk(spotId, spotFormInformation))
    console.log('the createspotform handle submit', updatedSpot)
    if (updatedSpot) {
        history.push(`/spots/${updatedSpot.id}`)
    }
    console.log('the info', spotFormInformation)
  };

  console.log('the information in create spot')
  useEffect(() => {
    const valErrors = [];

    if (!address.length) valErrors.push("Street address is required");
    if (!city.length) valErrors.push("City is required");
    if (!state.length) valErrors.push("State is required");

    if (!lat.length) valErrors.push("Latitude is not valid");
    if (!lng.length) valErrors.push("Longitude is not valid");

    if (name.length > 50) valErrors.push("Name must be less than 50 characters");
    if (!price) valErrors.push("Price per day is required")

    setValidationErrors(valErrors)
  }, [address, city, state, lat, lng, name, price])

  if (spotData != null) {
  return (

    <form onSubmit={handleSubmit}>
      <ul>
        {validationErrors.map((error) => <li key={error}>{error}</li>)}
      </ul>
      <label>
        Address
        <input
          type="text"
          value={address}
          onChange={updateAddress}
          required
        />
      </label>
      <label>
        City
        <input
          type="text"
          value={city}
          onChange={updateCity}
          required
        />
      </label>
      <label>
        State
        <input
          type="text"
          value={state}
          onChange={updateState}
          required
        />
      </label>
      <label>
        Country
        <input
          type="text"
          value={country}
          onChange={updateCountry}
          required
        />
      </label>
      <label>
        lat
        <input
          type="number"
          value={lat}
          onChange={updateLat}
          required
        />
      </label>
      <label>
        lng
        <input
          type="number"
          value={lng}
          onChange={updateLng}
          required
        />
      </label>
      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={updateName}
          required
        />
      </label>
      <label>
        Description
        <input
          type="text"
          value={description}
          onChange={updateDescription}
          required
        />
      </label>
      <label>
        Price
        <input
          type="number"
          value={price}
          onChange={updatePrice}
          required
        />
      </label>
      <button type="submit" disabled={validationErrors.length > 0}>Create New Spot</button>
    </form>
  );
}
}

export default EditSpotForm;
