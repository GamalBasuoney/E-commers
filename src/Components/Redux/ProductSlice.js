import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

let initialState = {products:[]};

export let getProducts = createAsyncThunk('product/getProducts',async function() {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((res) => res.data)
    console.log('share',data);
    return data
})

let productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        updateProducts: (state, action) => {
            state.products = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        });
    },
});

export let ProductReducer = productSlice.reducer;
export let { updateProducts, extraReducers } = productSlice.actions;