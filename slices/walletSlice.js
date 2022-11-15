import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    walletAddress: '',
    walletAmount: 0,
    contract:null,
    verified:false,
    initialized:false,
    signer:null,
    language:"es",
    search:"",
    sidebarOpen:false,
    mouseOver:false
}

export const walletSlice = createSlice({
    name: "walletSlice",
    initialState,
    reducers:{
        setWalletAddress: (state, action) => {
            state.walletAddress = action.payload;
        },
        setWalletAmount: (state, action) => {
            state.walletAmount = action.payload;
        },
        setContract: (state, action) => {
            state.contract = action.payload;
        },
        setVerified: (state, action) => {
            state.verified = action.payload;
        },
        setInitialized: (state, action) => {
            state.initialized = action.payload;
        },
        setSigner: (state, action) => {
            state.signer = action.payload;
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setSidebarOpen: (state, action) => {
            state.sidebarOpen = action.payload;
        },
        setMouseOver: (state, action) => {
            state.mouseOver = action.payload;
        }
    }
})

export const  { setWalletAddress, setWalletAmount, setContract, setVerified, setInitialized, setSigner, setLanguage, setSearch, setSidebarOpen, setMouseOver} = walletSlice.actions;
export default walletSlice;