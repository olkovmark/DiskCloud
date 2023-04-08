import { compose } from "redux";
import userReducer from "./userReducer.js";
import fileReducer from "./fileReducer.js";

import { configureStore } from "@reduxjs/toolkit";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = configureStore({
  reducer: {
    user: userReducer,
    file: fileReducer,
  },
  devTools: true,
  enhancers: composeEnhancers,
});