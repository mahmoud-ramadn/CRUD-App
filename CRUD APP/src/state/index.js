import { configureStore } from "@reduxjs/toolkit";
import Posts from "./postSilce";
import auth from './authSlices'
const store = configureStore({
    reducer:{Posts ,auth}
})

export default store;