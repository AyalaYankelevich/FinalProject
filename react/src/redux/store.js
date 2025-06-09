import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./clientSlice";
const store = configureStore({
  reducer: {
    client: clientReducer,
  },
});

export default store;