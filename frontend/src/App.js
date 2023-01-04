import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

//import SignupFormModal from "./components/SignupFormPage/SignupFormModal";
import GetAllSpots from "./components/Spots/GetSpots";
import GetSpotByCurrentUser from "./components/Spots/GetSpotCurrent";
import SpotByDetail from "./components/Spots/GetSpotDetails";
import CreateSpotForm from "./components/Spots/CreateSpotForm";
import EditSpotForm from "./components/Spots/EditSpot";
import CreateReviewForm from "./components/Reviews/CreateReviews";
import ReviewCurrentUser from "./components/Reviews/GetReviewUser";
import GetUserBooking from "./components/Booking/GetUserBooking";
import MapContainer from "./components/Maps";
import EditBookingForm from "./components/Booking/EditBookingForm";
import BookingTrip from "./components/Booking/TripReservation";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/reviews'>
            <ReviewCurrentUser />
          </Route>
          <Route path='/spots/:spotId/reviews/new'>
            <CreateReviewForm />
          </Route>
          <Route path='/spots/:spotId/edit'>
            <EditSpotForm />
          </Route>
            <Route exact path='/spots/user'>
              <GetSpotByCurrentUser />
            </Route>
          <Route exact path='/spots/new'>
            <CreateSpotForm />
          </Route>
          <Route exact path='/spots/:spotId'>
              <SpotByDetail />
          </Route>
          {/* <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route exact path='/' >
            <GetAllSpots />
          </Route>
          <Route path='/maps'>
            <MapContainer />
          </Route>
          <Route path='/user/bookings'>
            <GetUserBooking />
          </Route>
          <Route path='/bookings/edit'>
            <EditBookingForm />
          </Route>
          <Route path='/trips/:spotId/booking/:bookingId'>
            <BookingTrip />
          </Route>
        </Switch>
      )}
    </>
  );
}


export default App;
