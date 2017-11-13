import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import HomePage from "./components/pages/HomePage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
import ConfirmationPage from "./components/pages/ConfirmationPage";

const App = ({ location }) => (
  <Container textAlign="center">
    <Route location={location} path="/" exact component={HomePage} />
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
  </Container>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
