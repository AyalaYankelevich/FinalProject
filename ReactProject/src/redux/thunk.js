import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../api";


export const fetchDataAsyncAction = createAsyncThunk("users/fetchData", async () => {
    const data = await fetchData();
    return data;
});