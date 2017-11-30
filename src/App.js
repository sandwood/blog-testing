import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
import ConfirmationPage from "./components/pages/ConfirmationPage";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import BlogPage from "./components/pages/BlogPage";
import NavBarsPage from "./components/pages/NavBarsPage";
import "./components/pages/css/main.css";

const App = ({ location, isAuthenticated, isConfirmed }) => (
  <div>
    {isConfirmed && isAuthenticated ? (
      <div>
        <NavBarsPage />
        <Route location={location} path="/" exact component={HomePage} />
        <Route location={location} path="/blog" exact component={BlogPage} />
        <Route
          location={location}
          path="/reset_password/:token"
          exact
          component={ResetPasswordPage}
        />
        <Route
          location={location}
          path="/confirmation/:token"
          exact
          component={ConfirmationPage}
        />
      </div>
    ) : (
      <div>
        <Route location={location} path="/" exact component={LoginPage} />
        <Route
          location={location}
          path="/reset_password/:token"
          exact
          component={ResetPasswordPage}
        />
        <Route
          location={location}
          path="/confirmation/:token"
          exact
          component={ConfirmationPage}
        />
        <Route location={location} path="/blog" exact component={LoginPage} />
      </div>
    )}
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isConfirmed: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
    isConfirmed: !!state.user.confirmed
  };
}

export default connect(mapStateToProps, null)(App);
