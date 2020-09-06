import React, {useCallback} from 'react';
import "assets/css/styles.css";
import {HashRouter as Router, Route, Switch } from "react-router-dom";
import Login from 'components/Auth'
import Dashboard from 'components/Dashboard';
import {GlobalProvider, GlobalContext, setCurrentUser, setUserDetails} from 'actions/GlobalState';
import setAuthToken from "utils/setAuthToken";
import PrivateRoute from "components/Common/PrivateRoute";
import jwt_decode from "jwt-decode";
let history;


/*
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  const userDetails = localStorage.userDetails;

  // Set user and isAuthenticated
  GlobalContext.dispatch(setCurrentUser(decoded));
  GlobalContext.dispatch(setUserDetails(JSON.parse(userDetails)));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    //GlobalProvider.dispatch(logoutUser());
    window.location.href = "/#/login";
  }
}
*/






function App() {
  return (
    <GlobalProvider>
<Router basename="/" history={history}>
<Router basename="/" history={history}>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Switch>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />

        </Switch>
        
    </Router>
    </Router>
    </GlobalProvider>
    
    
    
  );
}

export default App;
