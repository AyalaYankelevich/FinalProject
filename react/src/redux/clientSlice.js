import { createSlice } from "@reduxjs/toolkit";
import { fetchByController } from "./thunk"; // <-- import your generic thunk

const clientSlice = createSlice({
  name: "client",
  initialState: {
    clientList: [],
    client: null,
    loading: false,
    error: null,
    loginLoading: false,
    loginError: null,
    createLoading: false,
    createError: null,
  },
  reducers: {
    logout(state) {
      state.client = null;
      state.loginError = null;
    },
    clearErrors(state) {
      state.error = null;
      state.loginError = null;
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all clients
    builder
      .addCase(
        fetchByController.pending,
        (state, action) => {
          // Identify by meta.arg
          const { controller, action: act, method } = action.meta.arg || {};
          if (controller === "Client" && act === "getAll" && (!method || method === "get")) {
            state.loading = true;
            state.error = null;
          }
          if (controller === "Client" && act === "get" && (!method || method === "get")) {
            state.loginLoading = true;
            state.loginError = null;
            state.client = null;
          }
          if (controller === "Client" && act === "create" && (method === "post")) {
            state.createLoading = true;
            state.createError = null;
          }
        }
      )
      .addCase(
        fetchByController.fulfilled,
        (state, action) => {
          const { controller, action: act, method } = action.meta.arg || {};
          if (controller === "Client" && act === "getAll" && (!method || method === "get")) {
            state.loading = false;
            state.clientList = action.payload;
            state.error = null;
          }
          if (controller === "Client" && act === "get" && (!method || method === "get")) {
            state.loginLoading = false;
            state.client = action.payload;
            state.loginError = null;
          }
          if (controller === "Client" && act === "create" && (method === "post")) {
            state.createLoading = false;
            state.client = action.payload;
            state.createError = null;
          }
        }
      )
      .addCase(
        fetchByController.rejected,
        (state, action) => {
          const { controller, action: act, method } = action.meta.arg || {};
          if (controller === "Client" && act === "getAll" && (!method || method === "get")) {
            state.loading = false;
            state.error = action.payload || "Failed to fetch clients";
          }
          if (controller === "Client" && act === "get" && (!method || method === "get")) {
            state.loginLoading = false;
            state.client = null;
            state.loginError = action.payload || "Login failed";
          }
          if (controller === "Client" && act === "create" && (method === "post")) {
            state.createLoading = false;
            state.createError = action.payload || "Failed to create client";
          }
        }
      );
  },
});

export const { logout, clearErrors } = clientSlice.actions;
export default clientSlice.reducer;
