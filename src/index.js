import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import decode from "jwt-decode";
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import rootReducer from "./rootReducer";
import { userLoggedIn } from "./actions/auth";
import registerServiceWorker from "./registerServiceWorker";
import setAuthorizationHeader from "./utils/setAuthorizationHeader";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.sandwBlogJWT) {
  const payload = decode(localStorage.sandwBlogJWT);
  const user = {
    token: localStorage.sandwBlogJWT,
    email: payload.email,
    confirmed: payload.confirmed
  };
  setAuthorizationHeader(localStorage.sandwBlogJWT);
  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

registerServiceWorker();
