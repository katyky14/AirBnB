import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";


import GetAllSpots from "./components/Spots/GetSpots";
import GetSpotByCurrentUser from "./components/Spots/GetSpotCurrent";
import SpotByDetail from "./components/Spots/GetSpotDetails";

// import CreateSpotForm from "./components/Spots/CreateSpot";

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
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path={'/spots'} >
            <GetAllSpots />
          </Route>
          {/* <Route path='/spots/current'>{GetSpotByCurrentUSer}</Route> */}
            <Route exact path='/spots/current'>
              <GetSpotByCurrentUser />
            </Route>
          <Route exact path='/spots/:spotId'>
              <SpotByDetail />
            </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
