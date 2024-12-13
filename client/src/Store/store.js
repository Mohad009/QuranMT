import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/UserSlice"
import studReducer from "../Features/studentSlice"
export const store=configureStore({
    reducer:{
        users:userReducer,
        students:studReducer
    }
})
