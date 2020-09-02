import isEmpty from "validation/is-empty";

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    CLEAR_ERRORS,
    CURRENT_USER_DETAILS,
  } from "types";
  
export default (state, action) => {
    switch(action.type) {
        case CURRENT_USER_DETAILS:
            return  {
                ...state,
                auth: {
                    isAuthenticated:state.auth.isAuthenticated,
                    user: state.auth.user,
                    details: action.payload
                }
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                auth:{
                    isAuthenticated: !isEmpty(action.payload),
                    user: action.payload,
                } 
              };
        
        case CLEAR_ERRORS: 
            return {
                ...state
            }
        case GET_ERRORS:
            return {
                ...state,
                auth: {
                    ...state.auth.isAuthenticated,
                    ...state.auth.user,
                    errors: action.payload
                }
            }

        default: return state;
    }

    
}