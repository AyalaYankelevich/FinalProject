import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./clientSlice";
import attendantReducer from "./attendentSlice";
import appointmentsReducer from "./appointmentsSlice"
const store = configureStore({
  reducer: {
    client: clientReducer,
    attendant: attendantReducer,
    appointments: appointmentsReducer,
  },
});

export default store;