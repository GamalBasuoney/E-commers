import { configureStore } from '@reduxjs/toolkit'
import { ProductReducer } from './ProductSlice';

const store = configureStore({
  reducer: {
    productRed:ProductReducer
  },
})
export default store