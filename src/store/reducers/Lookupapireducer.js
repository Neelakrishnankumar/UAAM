import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
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
// import DoneIcon from '@material-ui/icons/Done';
const initialState = {
  lookuprowData: [],
  lookupcolumnData: [],
  selectedData: {},
  loading: false,
  error: "",
};

//const [openPopup,setOpenPopup] = useState(false);
export const getBomData = createAsyncThunk("Stock/process",async({ProductID,CustomerID}) =>{
  var url = store.getState().globalurl.bomLkUrl;
        var data = {"ProductID":ProductID,"CustomerID":CustomerID,action:'get'}
        console.log("get" + JSON.stringify(data));
 const response = await axios
    .post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
  return response.data
});
export const getApiSlice = createSlice({
  name: "lookupApi",
  initialState,
  reducers: {
    pending(state) {
      return {
        ...state,
        loading: true,
        error: false,
        lookuprowData: [],
        lookupcolumnData: [],
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
      return {
        ...state,
        loading: false,
        error: "",
        lookuprowData: action.payload.rowdata,
        lookupcolumnData: action.payload.columndata,
      };
    },
    Success2(state, action) {
      return {
        ...state,
        loading: false,
        error: "",
        selectedData: action.payload.selectedData,
      };
    },
  },
});

// Destructure and export the plain action creators
export const { pending, errored, Success, Success2 } = getApiSlice.actions;

export default getApiSlice.reducer;

export const fetchLookup =
  (AccessID, screenName, filter, any,CompId,comUomNum) => async (dispatch, getState) => {
    var url = store.getState().globalurl.listViewurl;
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
    console.log("data--"+idata);
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
        var lookupData = response.data;
        if (lookupData.Status == "Y") {
          if(screenName == "Purchase UOM"){
            lookupData.Data.rows.splice(0, 0,{"RecordID":"-2","SLNO":"1","Code":"NO","Name":"Numbers","SortOrder":"0","Disable":"N","CreatedDateTime":"07-11-2023 03:58:45","Type":"A"})
            lookupData.Data.rows.push({"RecordID":"-3","SLNO":lookupData.Data.rows.length +1,"Code":"ME","Name":"MTRS","SortOrder":"0","Disable":"N","CreatedDateTime":"07-11-2023 03:58:45","Type":"A"})
          }
          if((screenName == "Consumption UOM" && filter =="Type NOT IN ('A','C','S')" ) || comUomNum){
            lookupData.Data.rows.splice(0, 0,{"RecordID":"-2","SLNO":"1","Code":"NO","Name":"Numbers","SortOrder":"0","Disable":"N","CreatedDateTime":"07-11-2023 03:58:45","Type":"A"})
          }
          dispatch(
            Success({
              columndata: lookupData.Data.columns,
              rowdata: lookupData.Data.rows,
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

export const AssignData = (data) => (dispatch, getState) => {
  dispatch(Success2({ selectedData: data }));
};


