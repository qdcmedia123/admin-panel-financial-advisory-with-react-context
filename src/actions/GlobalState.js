import React, {createContext, useReducer, useEffect} from 'react';
import AppReducer from 'reducer/AppReducer';
import Service from 'components/Service/service';
import {endPoints} from 'config/appConfig';
import jwt_decode from "jwt-decode";
import  setAuthToken from 'utils/setAuthToken'
import {ContextDevTool} from 'react-context-devtool';
import {useHistory} from 'react-router-dom';


import {
    GET_ERRORS,
    SET_CURRENT_USER,
    CLEAR_ERRORS,
    CURRENT_USER_DETAILS,
  } from "types";

export const initialState = {
    employees: [
        { id: 1, name: 'Ishan Manandhar', location: 'Kathmandu', designation: 'Frontend Dev' }
    ],
    auth: {      
        isAuthenticated: false,
        user: {},
        details: {}      
    },
  
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    // Here we need to work on how we can check the localstorage 
  useEffect(() => {
    if (localStorage.jwtToken) {
      // Set auth token header auth
      setAuthToken(localStorage.jwtToken);
      // Decode token and get user info and exp
      const decoded = jwt_decode(localStorage.jwtToken);
      const userDetails = localStorage.userDetails;
    
      // Set user and isAuthenticated
      dispatch(setCurrentUser(decoded));
      dispatch(setUserDetails(JSON.parse(userDetails)));
      // Check for expired token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Logout user
        //GlobalProvider.dispatch(logoutUser());
        window.location.href = "/#/login";
      }
    }
  }, [localStorage])

    const [state, dispatch] = useReducer(AppReducer, initialState);
    
     function loginWithEmailUser (login_EmailUser, history){
        Service.post(endPoints.auth.login, login_EmailUser)
          .then((res) => {
    
             if (res.data.code === 200) {
              console.log(res)
              const token = res.data.data.access_token;
              localStorage.setItem("jwtToken", token);
              localStorage.setItem("userDetails", JSON.stringify(res.data.data));
              const decoded = jwt_decode(token);
              
          
              dispatch(setCurrentUser(decoded));
              dispatch(setUserDetails(res.data.data));
              setAuthToken(token);
              history.push("dashboard");
            } else {
              console.log(res.data);
              dispatch({
                type: GET_ERRORS,
                payload: res.data,
              });
            }
            
           

          })
          .catch((err) =>
            dispatch({
              type: GET_ERRORS,
              payload: err,
            })
          );
      };

      return (<GlobalContext.Provider value = {{
        employees: state.employees,
        auth: state.auth,
        loginWithEmailUser
      }}>

<ContextDevTool context={GlobalContext} id="uniqContextId" displayName="Context Display Name" />
{children}
</GlobalContext.Provider>)
}

//CURRENT_USER_DETAILS,SET_CURRENT_USER

export const setCurrentUser = (decoded) => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded,
    };
  };
  
  // Setting all details of response for the purpose to accessing variable properties of user
  export const setUserDetails = (data) => {
    return {
      type: CURRENT_USER_DETAILS,
      payload: data,
    };
  };


  export const Errors = (err) => {
    return {
      type: GET_ERRORS,
      payload: err.response.data,
    };
  };
  
  export const clearErrors = () => {
    return {
      type: CLEAR_ERRORS,
    };
  };