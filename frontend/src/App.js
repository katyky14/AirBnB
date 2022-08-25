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
          <Route path='/spots/:spotId/reviews'>
            <CreateReviewForm />
          </Route>
          <Route path='/spots/:spotId/edit'>
            <EditSpotForm />
          </Route>
            <Route exact path='/spots/current'>
              <GetSpotByCurrentUser />
            </Route>
          <Route exact path='/spots/:spotId'>
              <SpotByDetail />
          </Route>
          <Route exact path='/spots'>
            <CreateSpotForm />
          </Route>
          <Route exact path='/' >
            <GetAllSpots />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}


export default App;
