import { createSlice } from "@reduxjs/toolkit";
import { fetchDataAsyncAction } from "./thunk";

const  attendentSlice = createSlice({
    name: "attendent",
    initialState: {
        attendentList: [],
        loading: false,
        error: false
    },
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataAsyncAction.pending, (state) => {
                state.loading = true;
                state.attendentList = [];
                state.error = false;
            })
            .addCase(fetchDataAsyncAction.fulfilled, (state, action) => {
               state.attendentList = action.payload;
               state.loading = false;
               state.error = false;
            })
            .addCase(fetchDataAsyncAction.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
    }
});
 
export default attendentSlice.reducer;
