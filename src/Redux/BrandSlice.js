import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = { brand: [], isloading: false, error: null }

export let getbrands = createAsyncThunk('brandslice/getproduct',
    async () => {


        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
            .catch((err) => err)
            console.log(data);
            return data.data
    }
)
let brandslice = createSlice({

    name: 'brandslice',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getbrands.pending, (state, action) => {
            state.isloading = true
        });


        builder.addCase(getbrands.fulfilled, (state, action) => {
            state.brands= action.payload
            state.isloading =false
        })

    }


})
 export let brandsreducer = brandslice.reducer