import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../api";

export const fetchByController = createAsyncThunk(
  "api/fetchByController",
  async ({ controller, action = "", params = {}, method = "get" }, thunkAPI) => {
    try {
      return await fetchData(controller, action, params, method);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);