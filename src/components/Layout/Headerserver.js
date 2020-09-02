import React, { useState, useEffect, Fragment } from "react";
import { logoutUser } from "actions/authActions";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
//import CashIcon from 'assets/img/Group.png';
import Logo from "assets/img/wf-logo.svg";

function App(props) {
  // Check permission
  const userDetails = useSelector((state) => state.auth.details);
  // const [admin, setAdmin] = useState(false);
  const [listCompliance, setListCompliance] = useState(false);
  const [listLead, setListLead] = useState(false);
  const [createUser, setCreateUser] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [notificationTabAction, setNotificationTabAction] = useState(false);
  // User Managment role

  const [complianceUAEOnly, setComplianceUAEOnly] = useState(false);

  // List client
  const [listClients, setListClients] = useState(false);
  const [listPortfolio, setListPortfolio] = useState(false);

  useEffect(() => {
    const isAdmin = function isAdmin() {
      if (typeof userDetails.data !== "undefined") {
        if (typeof userDetails.data.permission_mapping !== "undefined") {
          if (
            userDetails.data.permission_mapping.admin === true ||
            userDetails.data.permission_mapping.list_clients === true
          ) {
            //setAdmin(true);
          }

          // Chekc
          if (userDetails.data.permission_mapping.list_compliance === true) {
            setListCompliance(true);
          }

          // Check if list_lead is true
          if (userDetails.data.permission_mapping.list_leads === true) {
            setListLead(true);
          }

          // Create user
          if (userDetails.data.permission_mapping.create_user === true) {
            setCreateUser(true);
          }

          // Compliance UAE Only
          if (
            userDetails.data.permission_mapping.compliance_uae_only === true
          ) {
            setComplianceUAEOnly(true);
          }

          // List Clients permission
          if (userDetails.data.permission_mapping.list_clients === true) {
            setListClients(true);
          }

          if (userDetails.data.permission_mapping.show_users === true) {
            setShowUsers(true);
          }

          //List Listprotfolio
          if (userDetails.data.permission_mapping.list_listProtfolio === true) {
            setListPortfolio(true);
          }
        }
      }
    };
    isAdmin();
  }, [userDetails]);

  const falseReturn = (event) => {
    event.preventDefault();
    return false;
  };

  return (
    <Fragment>
      <div className="collapse12">
        <div className="">
          <div className="row">
            <div className="col">
              <nav className="navbar navbar-expand-lg ">
                <a className="navbar-brand" href="#/dashboard">
                  <img src={Logo} alt="Wealthface" title="Dashboard" />
                </a>

                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div></div>
                <div
                  className="collapse navbar-collapse justify-content-end"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav">
                    {/* Check if list leads is enabled */}
                    {listLead ? (
                      <li className="nav-item dropdown">
                        <a
                          href="!#"
                          className=" nav-link dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          Leads<b className="caret"></b>
                        </a>
                        <ul className="dropdown-menu">
                          <li className="dropdown">
                            <a
                              className="dropdown-item"
                              href="/#/leads/list/all"
                            >
                              All
                            </a>
                          </li>

                          <li className="dropdown">
                            <a
                              className="dropdown-item"
                              href="/#/leads/list/usa"
                            >
                              USA Regulation
                            </a>
                          </li>

                          <li className="dropdown">
                            <a
                              className="dropdown-item"
                              href="/#/leads/list/uae"
                            >
                              UAE Regulation
                            </a>
                          </li>
                        </ul>
                      </li>
                    ) : (
                      <Fragment></Fragment>
                    )}

                    {listClients ? (
                      <li className="nav-item dropdown">
                        <a
                          href="!#"
                          className=" nav-link dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          Clients <b className="caret"></b>
                        </a>
                        <ul className="dropdown-menu">
                          <li className="dropdown">
                            <a
                              className="dropdown-item"
                              href="/#/accounts/list/all"
                            >
                              All
                            </a>
                          </li>

                          <li className="dropdown">
                            <a
                              className="dropdown-item"
                              href="/#/accounts/list/usa"
                            >
                              USA Regulation
                            </a>
                          </li>

                          <li className="dropdown">
                            <a
                              className="dropdown-item"
                              href="/#/accounts/list/uae"
                            >
                              UAE Regulation
                            </a>
                          </li>

                          <li className="dropdown">
                            <a
                              className="dropdown-item"
                              href="/#/accounts/report"
                            >
                              Report
                            </a>
                          </li>
                        </ul>
                      </li>
                    ) : (
                      <Fragment></Fragment>
                    )}

                    {listCompliance ? (
                      <li className="nav-item dropdown">
                        <a
                          href="!#"
                          className=" nav-link dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          Compliance<b className="caret"></b>
                        </a>

                        <ul className="dropdown-menu">
                          <li className="dropdown">
                            <a
                              className="dropdown-item"
                              href="/#/compliance/list/uae"
                            >
                              UAE Regulation
                            </a>
                          </li>

                          {!complianceUAEOnly && (
                            <li className="dropdown">
                              <a
                                className="dropdown-item"
                                href="/#/compliance/list/usa"
                              >
                                USA Regulation
                              </a>
                            </li>
                          )}

                          <li className="dropdown"></li>
                          <a
                            className="dropdown-item"
                            href="/#/compliance/risk_assessment_matrix"
                          >
                            {" "}
                            Risk Assessment Matrix
                          </a>
                        </ul>
                      </li>
                    ) : (
                      <Fragment></Fragment>
                    )}

                    {/* User managment */}

                    {showUsers ? (
                      <li className="nav-item dropdown">
                        <a
                          href="!#"
                          className=" nav-link dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          User Managment<b className="caret"></b>
                        </a>

                        <ul className="dropdown-menu multi-level">
                          {createUser ? (
                            <li>
                              <a
                                className="dropdown-item"
                                href="/#/user/create_user"
                              >
                                Create User
                              </a>
                            </li>
                          ) : (
                            <Fragment></Fragment>
                          )}

                          <li>
                            <a className="dropdown-item" href="/#/users/list">
                              List Users
                            </a>
                          </li>
                        </ul>
                      </li>
                    ) : (
                      <Fragment></Fragment>
                    )}

                    {listPortfolio ? (
                      <Fragment>
                        <li className="nav-item">
                          <a href="/#/portfolio/list" className=" nav-link">
                            Portfolio List
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="/#/portfolio/portfolio_allocation"
                            className=" nav-link"
                          >
                            Portfolio Allocation
                          </a>
                        </li>
                      </Fragment>
                    ) : (
                      <Fragment></Fragment>
                    )}

                    {listPortfolio ? (
                      <Fragment>
                        <li className="nav-item dropdown">
                          <a
                            href="!#"
                            className=" nav-link dropdown-toggle"
                            data-toggle="dropdown"
                          >
                            Referal<b className="caret"></b>
                          </a>

                          <ul className="dropdown-menu">
                            <li className="dropdown">
                              <a
                                className="dropdown-item"
                                href="#/referal/refer_a_client"
                              >
                                Admin
                              </a>
                            </li>

                            <li className="dropdown">
                              <a
                                className="dropdown-item"
                                href="/#/referal/client_referal_points_table"
                              >
                                Client
                              </a>
                            </li>

                            
                          </ul>
                        </li>
                      </Fragment>
                    ) : (
                      <Fragment></Fragment>
                    )}


{listPortfolio ? (
                      <Fragment>
                        <li className="nav-item dropdown">
                          <a
                            href="!#"
                            className=" nav-link dropdown-toggle"
                            data-toggle="dropdown"
                          >
                            Reporting<b className="caret"></b>
                          </a>

                          <ul className="dropdown-menu">
                            <li className="dropdown">
                              <a
                                className="dropdown-item"
                                href="/#/trade"
                              >
                                Trades
                              </a>
                            </li>

                            <li className="dropdown">
                              <a
                                className="dropdown-item"
                                href="/#/report/funding"
                              >
                                Funding
                              </a>
                            </li>

                            
                          </ul>
                        </li>
                      </Fragment>
                    ) : (
                      <Fragment></Fragment>
                    )}



                      



                    <li className="nav-item">
                      <a
                        onClick={props.logoutUser}
                        className="nav-link"
                        href="/"
                      >
                        Logout &nbsp;
                        <i
                          className="fa fa-sign-out-alt fa-lg"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </li>

                    <li className="nav-item">
                      <a onClick={falseReturn} className="nav-link" href="!#">
                        <i
                          className="fa fa-bell fa-lg"
                          aria-hidden="true"
                          onClick={() =>
                            setNotificationTabAction(!notificationTabAction)
                          }
                        ></i>
                        {/* This will be optional as well if there is any notification then It will be below icon otherwide emtpy */}
                        <i className="fa fa-circle is__notification"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

    
    </Fragment>
  );
}

App.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

export default connect(null, { logoutUser })(withRouter(App));
