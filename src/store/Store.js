import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../redux/userSlice'
import productSlice from '../redux/productCreate'
import productsCard from '../redux/productList';
import productsId from '../redux/productId';
export const store = configureStore({
    reducer:{
        auth : authSlice,
        product: productSlice,
        productsList:productsCard ,
        productId : productsId
    }
 
  
})
