import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counterSlice";
import artistTab from "./slices/tabSlice";
import walletSlice from "./slices/walletSlice";

export const store = configureStore(
    {
        reducer:{
            counter: counterSlice.reducer,
            tabSlice: artistTab.reducer,
            walletSlice: walletSlice.reducer
        },
    }
)