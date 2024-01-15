import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";

// define initial state
const initialState = {
   
    user:{
        type: "LOGGED_USER",
        userdata:"Mukesh kanna"  
    },
   logout:{
    type: "LOGOUT",
    userdata:null  
   }
}

// create slice
const slice = createSlice({
    name:'app',
    initialState,
    reducers:{
        //Toggle sidebar
        S(state,action){
            state.sidebar.open = !state.sidebar.open
        },
        updateSidebarType(state, action){
            state.sidebar.type = action.payload.type;
        },
        LoggedUser(state, action){
            state.user = action.payload.type;
        },
        logout(state, action){
            state.user = action.payload.type;
        }
        
    }
});

// export reducer
export default slice.reducer;

//thunk functions - perform async operations
export function ToggleSidebar (){
    return async () =>{
        dispatch(slice.actions.toggleSidebar());
    }
}

export function LoggedUser (){
    return async () =>{
        dispatch(slice.actions.LoggedUser());
    }
}

export function logout (){
    return async () =>{
        dispatch(slice.actions.logout());
    }
}


export function UpdateSidebarType (type){
    return async () =>{
        dispatch(slice.actions.updateSidebarType({
            type
        }))
    }
}