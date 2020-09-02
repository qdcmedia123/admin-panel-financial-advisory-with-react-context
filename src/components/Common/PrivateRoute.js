import React, {useContext, useCallback} from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {GlobalContext} from 'actions/GlobalState';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  const state = useContext(GlobalContext);

  return (<Route
    {...rest}
    render={(props) =>
      state.auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />)
  };


export default PrivateRoute;
