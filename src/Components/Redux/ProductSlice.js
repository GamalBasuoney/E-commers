import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

let initialState = {products:[]};

export let getProducts = createAsyncThunk('product/getProducts',async function() {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((res) => res.data)
    console.log(data);
    return data
})

let productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},

    extraReducers:(builder) => {
        builder.addCase('fulfilled',(state,action)=> {
            state.products = action.payload
        })
    }
})

export let ProductReducer = productSlice.reducer;
export let {extraReducers} = productSlice.actions;

