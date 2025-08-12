import { createSlice } from "@reduxjs/toolkit";
import type { ClientInfo } from "../types/ClientInfo";

const initialState: ClientInfo = {
    firstName: 'Noah',
    lastName: 'Seltzer',
    jobTitle: 'Second Engineer'
}


export const clientInfoSlice = createSlice({
    name: 'clientInfo',
    initialState,
    reducers: {
        updateFirstName: (state, action) => {
            state.firstName = action.payload
        },
        updateLastName: (state, action) => {
            state.lastName = action.payload
        },
        updateJobTitle: (state, action) => {
            state.jobTitle = action.payload
        }
    }
})


export const { updateFirstName, updateLastName, updateJobTitle } = clientInfoSlice.actions

export default clientInfoSlice.reducer;

