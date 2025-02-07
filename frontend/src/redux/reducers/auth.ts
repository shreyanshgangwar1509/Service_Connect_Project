import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: null,
    isAdmin: false,
    isVerified: false,
    isWorker: false,
    loader:true,
}


const authSlice = createSlice({
    name: 'auth',
    initialState  ,
    reducers: {
        userExist: (state, action) => {
            state.user = action.payload;
            state.loader = false;
        },
        userNotExist: (state, action) => {
            state.user = null;
            state.loader = false;
        },
        setworker: (state, action) => {
            state.isWorker = action.payload;

        },
        setIsverified: (state, action) => {
            state.isVerified = action.payload;
        }
    },
    
})

export default authSlice
export const {userExist,setworker,setIsverified,userNotExist}=authSlice.actions