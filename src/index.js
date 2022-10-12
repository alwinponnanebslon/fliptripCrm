import React from "react";
import ReactDOM from "react-dom";
import Main from "./Entryfile/Main";
window.Popper = require("popper.js").default;
import { Provider } from "react-redux";
import { persistor, store } from "./redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

function Loading() {
  return <div>loading...</div>;
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <Main />
      <Toaster />
    </PersistGate>
  </Provider>,
  document.getElementById("app")
);

if (module.hot) {
  // enables hot module replacement if plugin is installed
  module.hot.accept();
}
