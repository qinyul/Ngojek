import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin:null,
    destination:null,
    travelTimeInformation:null,
    currentLocation:null,
    focusOnUser:false
}

export const navSlice = createSlice({
    name:'nav',
    initialState,
    reducers:{
        setOrigin:(state,action) => {
            state.origin = action.payload
        },
        setDestination:(state,action) => {
            state.destination = action.payload
        },
        setTravelTimeInformation:(state,action) => {
            state.travelTimeInformation = action.payload
        },
        setCurrentLocation:(state,action) => {
            state.currentLocation = action.payload
        },
        setFocusOnUser:(state,action) => {
            state.focusOnUser = action.payload
        }
    }
})

export const {setOrigin,setDestination,setTravelTimeInformation,setCurrentLocation,setFocusOnUser} = navSlice.actions

export const selectOrigin = (state) => state.nav.origin
export const selectDestination = (state) => state.nav.destination
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation
export const selectCurrentLocation = (state) => state.nav.currentLocation
export const selectFocusOnUser = (state) => state.nav.focusOnUser

export default navSlice.reducer