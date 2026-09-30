import  searchSlice  from "./features/searchSlice";

import collectionSlice from "./features/collectionSlice"

import {configureStore} from '@reduxjs/toolkit'


export const store = configureStore({
    reducer:{
        search: searchSlice,
        collection : collectionSlice
    }
})