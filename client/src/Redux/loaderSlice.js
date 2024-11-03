import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({

    name: "loader",
    initialState:{
        loader: true,
    },

    reducers : {
        showLoader : (state)=>{
            state.loader = false;
        },

        hideLoader : (state)=>{
            state.loader = true;
        }
    }
})

export const { showLoader, hideLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
