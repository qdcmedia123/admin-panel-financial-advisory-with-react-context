import React, { useState, useCallback, useContext, useMemo } from "react";
import Header from "components/Layout/Header";
import { withRouter } from "react-router-dom";
import Footer from "components/Layout/Clientfooter";
import service from "components/Service/service";
import PropTypes from "prop-types";
import {endPoints} from 'config/appConfig';
import {GlobalContext} from 'actions/GlobalState';
import { useHistory } from "react-router-dom";
const Login = (props) => {
const {loginWithEmailUser, auth}  = useContext(GlobalContext);

const [formData, setFormData] = useState({
  email: "",
  password: "",
  errors: {},
  reqCode: "",
  loading: true,
});



 
 const onSubmit = async (e) =>  {
  e.preventDefault();
   try {
      const getCode = await service.getAsync(endPoints.auth.getLoginCode);
      // Now dispatch the function 
      formData.reqCode = getCode.data.code;
      
      loginWithEmailUser(formData, props.history);
   } catch (error) {
      console.log(error);
   }
}

const onchangeHandle = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

// Get the error 
const {errors} = auth;
const getErrors =  useMemo(() => {
  if(typeof auth.errors !== 'undefined') {
    if(auth.errors.code == 401) {
      return <div>{auth.errors.message}</div>
    }
    return null;
  }
   return null;
}, [errors])



  return (
    <div>
      <Header />

      <div>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h4 className="modal-title w-100 font-weight-bold">Sign in</h4>
            </div>
            <br />
  {getErrors !== null && <div className = "alert alert-danger">{getErrors}</div>}

            <form onSubmit={onSubmit}>
              <div className="form-group col-md-12">
                <input
                  className="form-control"
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={onchangeHandle}
                  required
                />
              </div>

              <div className="form-group col-md-12">
                <input
                  type="password"
                  id="defaultForm-pass"
                  className="form-control validate"
                  placeholder="Password"
                  value={formData.password}
                  onChange={onchangeHandle}
                  name="password"
                  required
                />
              </div>

              <div className="modal-footer d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary waves-effect waves-light"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}


Login.propTypes = {

};



export default withRouter(Login);