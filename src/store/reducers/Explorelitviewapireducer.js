import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, IconButton, Tooltip, Stack, Box } from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import store from "../..";

import { useNavigate } from "react-router-dom";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingTwoToneIcon from '@mui/icons-material/PendingTwoTone';
import OpenInBrowserOutlinedIcon from '@mui/icons-material/OpenInBrowserOutlined';
import TimelineIcon from '@mui/icons-material/Timeline';
import workinProgress from '../../assets/img/wip.png'
import DescriptionIcon from '@mui/icons-material/Description';
const initialState = {
  explorerowData: [],
  explorecolumnData: [],
  loading: false,
  error: "",
  clickeddata: "",
  popupOpen:false,
  Data:{},
  exploreRowDataID:[],
  exploreColumnDataID:[],
  isLookupOpen:false

};


export const userGroupExplore= createAsyncThunk("explore/listview",
  async ({ CompanyID,UsergroupID }) => {
    var url = store.getState().globalurl.userGroupUrl;
    var data = { CompanyID,UsergroupID };
    console.log("get" + JSON.stringify(data));
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    return response.data;
  }
);

export const getFetchUserData = createAsyncThunk(
  "allScreen/Header",
  async ({ accessID, get, recID,}) => {
    var url = store.getState().globalurl.apiUrl;
    var data = { 
      accessid: accessID,
      action: get,
      recid: recID,};
   
    
    console.log("🚀 ~ file: Formapireducer.js:225 ~ data:", JSON.stringify(data))

    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    return response.data;
  }
);

export const packingListView = createAsyncThunk(
  "packing/detail",
  async ({ accessID, screenName, filter,any,CompID}) => {
    var url = store.getState().globalurl.listViewurl;
    var idata = {
      Query: {
        AccessID: accessID,
        ScreenName: screenName,
        Filter: filter,
        Any: any,
        CompId:CompID
      },
    };
   
    
    console.log("🚀 ~ file: Formapireducer.js:225 ~ data:", JSON.stringify(idata))
    idata = JSON.stringify(idata);
    const response = await axios
    .get(url, {
      params: {
        data: idata,
      },
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    })
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    return response.data;
  }
);
export const getApiSlice = createSlice({
  name: "exploreApi",
  initialState,
  reducers: {
    lookupOpen(state,action){
      state.isLookupOpen = !state.isLookupOpen
    },
    userGroupRowUpdate(state,action){
      state.explorerowData = action.payload.rowData
    },
    packingRowUpdate(state,action){
     console.log("🚀 ~ file: Explorelitviewapireducer.js:96 ~ packingRowUpdate ~ action:", action)
     switch(action.payload.type){

      case "INSERTED":
       state.exploreRowDataID.push(...action.payload.data)
        break
      case "EDITED":
        state.exploreRowDataID = action.payload.data
        break
      case "RESET":
          state.exploreRowDataID = action.payload.data
        break
     }
    },
    addtionalQtyCal(state,action){
      console.log("🚀 ~ file: Explorelitviewapireducer.js:138 ~ addtionalQtyCal ~ action:", action)
      
      // for(let row of action.payload.listviewData){
      //   console.log("🚀 ~ file: Explorelitviewapireducer.js:142 ~ addtionalQtyCal ~ row:", row)
     
      //   return{
      //     ...row,
      //     RequiredQty:"hai"
      //   }
      // }
      const newArr =  action.payload.listviewData.map((row)=>{

        return{
          ...row,
          RequiredQty: Number(row.RequiredQty) +(Number(action.payload.values.AdditionalQty) *Number(row.BomQty))
        }
    
      })
        

      state.explorerowData =  newArr

      
    },
    pending(state) {
      return {
        ...state,
        loading: true,
        explorerowData: [],
        explorecolumnData: [],
        error: false,
      };
    },
    errored(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    Success(state, action) {
      if(action.payload.screen == "batch"){
        return {
          ...state,
          loading: false,
          error: "",
          explorerowData: action.payload.rowDataBatch,
          // explorecolumnData: action.payload.columndata,
          // clickeddata:action.payload.currentRow,
        };
      }else{
      return {
        ...state,
        loading: false,
        error: "",
        explorerowData: action.payload.rowdata,
        explorecolumnData: action.payload.columndata,
        // clickeddata:action.payload.currentRow,
      };}
    },
    openPopup: (state,action) => {
       state.popupOpen  = action.payload.isOpen
    }
  },
  extraReducers(builder) {
    builder
      .addCase(userGroupExplore.pending, (state, action) => {
        state.explorerowData =  []
        state.Status = "idle";
        state.loading = true;
      })
      .addCase(userGroupExplore.fulfilled, (state, action) => {
        state.Status = "success";
        state.loading = false;

        state.explorerowData =  action.payload.Data

        
        // state.explorecolumnData= action.payload.columndata
      })
      .addCase(userGroupExplore.rejected, (state, action) => {
        state.Status = "Error";
        state.loading = false;
      })
      .addCase(packingListView.pending, (state, action) => {
        state.exploreColumnDataID=[]
        state.exploreRowDataID=[]
        state.Status = "idle";
        state.loading = true;
      })
      .addCase(packingListView.fulfilled, (state, action) => {
        state.Status = "success";
        state.loading = false;
        state.exploreColumnDataID=action.payload.Data.columns
        state.exploreRowDataID=action.payload.Data.rows

      })
      .addCase(packingListView.rejected, (state, action) => {
        state.Status = "Error";
        state.loading = false;
      })
      .addCase(getFetchUserData.pending, (state, action) => {
        state.Status = "idle";
        state.loading = true;
        state.Data =  {}
        state.explorerowData=[]
      })
      .addCase(getFetchUserData.fulfilled, (state, action) => {
        state.Status = "success";
        state.loading = false;

        state.Data =  action.payload.Data

        if(action.payload.Data.Groupaccess){
          state.explorerowData = action.payload.Data.Groupaccess
        }

        
        // state.explorecolumnData= action.payload.columndata
      })
      .addCase(getFetchUserData.rejected, (state, action) => {
        state.Status = "Error";
        state.loading = false;
      })
    }
});

// Destructure and export the plain action creators
export const {
  pending,
  errored,
  packingRowUpdate,
  Success,
  openPopup,
  addtionalQtyCal,
  userGroupRowUpdate,
  lookupOpen
} = getApiSlice.actions;

export default getApiSlice.reducer;

export const fetchExplorelitview =
  (AccessID, screenName, filter, any) => async (dispatch, getState) => {
    console.log("🚀 ~ file: Explorelitviewapireducer.js:209 ~ filter:", filter)
    // const navigate = useNavigate();  
    var url = store.getState().globalurl.listViewurl;

    if (filter != "" && AccessID !== "TR210" && AccessID !== "TR146" && AccessID !== "TR208" && AccessID !== "TR019" && AccessID !== "TR017"&& AccessID !== "TR088" && AccessID !== "TR016"&& AccessID !== "TR125" && AccessID !== "TR126"&& AccessID !== "TR130"&& AccessID !== "TR131"&& AccessID !=="TR139") {
      filter = "parentID=" + filter;

    }
    if((AccessID == "TR017")||(AccessID == "TR088") ){
      filter = filter
    }
    // if (AccessID == "TR019") { TR208
    //   filter = "MtlRecordID=" + filter;

    // }
    const CompId = sessionStorage.getItem("compID")
    var idata = {
      Query: {
        AccessID: AccessID,
        ScreenName: screenName,
        Filter: filter,
        Any: any,
        CompId
      },
    };

    idata = JSON.stringify(idata);
    console.log("data--" + idata);
    dispatch(pending());
    axios
      .get(url, {
        params: {
          data: idata,
        },
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
        },
      })
      .then((response) => {
         console.log("without authorization---"+JSON.stringify(response.data));
        var exploreData = response.data;
      
  if (exploreData.Status == "Y") {
    if(AccessID!="TR077" )
    {
      if(AccessID == "TR075")
      {
       // exploreData.
      var obj = {};
      var currentRow = "";
      obj = {
        field: "lookup",
        headerName: "",
        width:80,
        align:"center",
        sortable: false,
          disableColumnMenu:true,
        renderCell: (params) => {
                       
          return (
            <Stack direction="row" >  
         <Tooltip title="Leather">
                <IconButton onClick={()=>dispatch(lookupOpen())} color="info" size="small">
                    <OpenInBrowserOutlinedIcon />
                  </IconButton>
                </Tooltip>
            </Stack>
          );
        },
      };
   
      exploreData.Data.columns.push( obj);
      
    }

    if(AccessID == "TR017")
      {
       // exploreData.
      var obj = {};
      var currentRow = "";
      obj = {
        field: "print",
        headerName: "",
        width:80,
        align:"center",
        sortable: false,
        disableColumnMenu:true,
        renderCell: (params) => {
                       
          return (
           <div>
             <Tooltip title="All BOM">
            <IconButton
              component="a"
              href={`${
                store.getState().globalurl.pdfurl
              }Internalorder.php?Token=${params.row.Hashtoken}`}
              target="_blank"
              rel="noreferrer"
              color=""
              size="small"
            >
              <PrintOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Internal Order">
          <IconButton
            component="a"
            href={`${
              store.getState().globalurl.pdfurl
            }Invoiceinternalorder.php?Token=${params.row.Hashtoken}`}
            target="_blank"
            rel="noreferrer"
            color="primary"
            size="small"
          >
            <PrintOutlinedIcon />
          </IconButton>
        </Tooltip>
        </div>
          );
        },
      };
   
      exploreData.Data.columns.push( obj);
    
    }
    
    if(AccessID == "TR075")
    {
     // exploreData.
    var obj = {};
    var currentRow = "";
    obj = {
      field: "action",
      headerName: "",
      width:80,
      align:"center",
      sortable: false,
        disableColumnMenu:true,
      renderCell: (params) => {
                     
        return (
          <Stack direction="row" >
            {params.row.Pstype=="CC" ? ( 
            
              <Tooltip title="Edit">
              <IconButton color="info" size="small">
                  <ModeEditOutlinedIcon />
                </IconButton>
              </Tooltip>
            
        ):( 
         
            false
          
      )}
          </Stack>
        );
      },
    };
 
    exploreData.Data.columns.push( obj);
    
  }
  else
  {
    var obj = {};
    var currentRow = "";
    obj = {
      field: "action",
      headerName: "",
      width:50,
      align:"center",
      sortable: false,
        disableColumnMenu:true,
      renderCell: (params) => {
        const fnedit = () => {
          currentRow = params.row;
          console.log(JSON.stringify(currentRow));
        };
        //  const fnfetch=(currentRow)=>{

        //  }

        return (
          <Stack direction="row" spacing={4}>
            
              <Tooltip title="Edit">
                <IconButton color="info" size="small">
                  <ModeEditOutlinedIcon />
                </IconButton>
              </Tooltip>
           
          </Stack>
        );
      },
    };
    exploreData.Data.columns.splice(2, 0, obj);
   


    if(AccessID=="TR012")
    {
    var obj1 = {};
   
    obj1 = {
      field: "wip",
      headerName: "",
      width:120,
      sortable: false,
      disableColumnMenu:true,
      renderCell: (params) => {
       return (
          <Stack direction="row" spacing={4}>
           
              {
             ( params.row.BatchStatus=="1" ?
             (params.row.BatchCompleted =="N" ?(
              <React.Fragment>
             <Link to={`./Editworkinprocess/${params.row.PrdRecordID}/${params.row.parentID}/${params.row.BhRecordID}/${params.row.ProductionCardRecordID}/E`}>
         
              <Tooltip title="Work Inprogress">
             
                <IconButton color="info" size="small">
                <PendingTwoToneIcon/>
                </IconButton>
              </Tooltip>
              </Link>
             <Link to={`./Timeline/${params.row.RecordID}`}>
         
             <Tooltip title="Timeline">
            
               <IconButton color="info" size="small">
               <TimelineIcon/>
               </IconButton>
             </Tooltip>
             </Link> 
              
              
              
             </React.Fragment> )
              :
              (
                <React.Fragment>
              
              
              <Link to={`./Editworkinprocess/${params.row.PrdRecordID}/${params.row.parentID}/${params.row.BhRecordID}/${params.row.ProductionCardRecordID}/E`}>
         
              <Tooltip title="Batch Completed">
                <IconButton color="success" size="small">
                  <CheckCircleOutlineIcon />
                </IconButton>
              </Tooltip>
              </Link>
              
              <Link to={`./Timeline/${params.row.RecordID}`}>
         
             <Tooltip title="Timeline">
            
               <IconButton color="info" size="small">
               <TimelineIcon/>
               </IconButton>
             </Tooltip>
             </Link> 
              
              </React.Fragment> )
             ):false)
      }
            
      
          </Stack>
        );
      },
    };
    exploreData.Data.columns.push( obj1);
  }
 
  }

}
      else{

      if(AccessID=="TR077")
      {
      var object2 = {};

      object2 = {
        field: "status",
        headerName: "",
        headerAlign: 'center',
        width:70,
        sortable: false,
        disableColumnMenu:true,
        renderCell: (params) => {
        return (
            <Stack direction="row" spacing={4}>
           
           {params.row.Quantity == params.row.completedQty ?
            <Link to={`/Apps/Secondarylistview/TR074/BATCHS/${params.row.Type}/Editbatchissue/${params.row.RecordID}/E/N`}>
          
          <Tooltip title="Batch">
          
            <IconButton color="info" size="small">
            <ReceiptLongIcon/>
            </IconButton>
          </Tooltip>
          </Link>
              :
              <Link to={`/Apps/Secondarylistview/TR074/BATCHS/${params.row.Type}/Editbatchissue/${params.row.RecordID}/E`}>
          
              <Tooltip title="Batch">
              
                <IconButton color="info" size="small">
                <ReceiptLongIcon/>
                </IconButton>
              </Tooltip>
              </Link>
        }
              
        
            </Stack>
          );
        },
      };
      exploreData.Data.columns.splice(4,0,object2);
      }
      }
    dispatch(
      Success({
        columndata: exploreData.Data.columns,
        rowdata: exploreData.Data.rows,
      })
    );
  } else {
    dispatch(Success({ columndata: [], rowdata: [] }));
  }
      })

      .catch((error) => {
        dispatch(errored(error.message));
      });
  };
