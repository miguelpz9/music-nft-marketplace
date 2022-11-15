import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    artistTab: 0,
    collectionTab: 0,
}

export const artistTab = createSlice({
    name: "tabSlice",
    initialState,
    reducers:{
        setArtistTab: (state, action) => {
            state.artistTab = action.payload;
        },
        setCollectionTab: (state, action) => {
            state.collectionTab = action.payload;
        }
    }
})

export const  { setArtistTab, setCollectionTab } = artistTab.actions;
export default artistTab;