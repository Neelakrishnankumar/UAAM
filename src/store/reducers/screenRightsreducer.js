import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    data:{
        "SM_RECID":"",
        "SM_CAPTION1":"",
        "SM_CAPTION2":"",
        "UGA_UGRECID":"",
        "UGA_CO":"",
        "UGA_ADD":false,
        "UGA_VIEW":false,
        "UGA_MOD":false,
        "UGA_DEL":false,
        "UGA_PROCESS":false,
        "UGA_PRINT":false,
        "UGA_ACCESSID":"",
        "Menu":""
    }
}

const screenRights = createSlice({
    name:"screenRights",
    initialState,
    reducers:{
        screenRightsData: (state,action) => {
         
       
            const Groupaccess = JSON.parse(sessionStorage.getItem("Groupaccess")) || [];
            state.data =  Groupaccess.find(({ UGA_ACCESSID }) => UGA_ACCESSID === action.payload);

        }
    }
})


export const {
    screenRightsData
  } = screenRights.actions;
  
  export default screenRights.reducer;