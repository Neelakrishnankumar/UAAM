import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import store from "../../index";
import { useNavigate } from "react-router-dom";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

const initialState = {
  productCategory: [],
  materialCategory: [],
  company: [],
  year: [],
  comboLoading: false,
  comboError: "",
};

export const getApiSlice = createSlice({
  name: "comboApi",
  initialState,
  reducers: {
    pending(state) {
      return {
        ...state,
        comboLoading: true,
        comboError: false,
      };
    },
    errored(state, action) {
      return {
        ...state,
        comboLoading: false,
        comboError: action.payload,
      };
    },
    Success(state, action) {
      if (action.payload.type == "ProductCategory") {
        return {
          ...state,
          comboLoading: false,
          comboError: "",
          productCategory: action.payload.apiResponse,
        };
      }
      if (action.payload.type == "MaterialCategory") {
        return {
          ...state,
          comboLoading: false,
          comboError: "",
          materialCategory: action.payload.apiResponse,
        };
      }
      if (action.payload.type == "Company") {
        return {
          ...state,
          comboLoading: false,
          comboError: "",
          company: action.payload.apiResponse,
        };
      }
      if (action.payload.type == "Year") {
        return {
          ...state,
          comboLoading: false,
          comboError: "",
          year: action.payload.apiResponse,
        };
      }
    },
  },
});

// Destructure and export the plain action creators
export const {
  pending,
  errored,

  Success,
} = getApiSlice.actions;

export default getApiSlice.reducer;

export const fetchComboData1 =
  (AccessID, Action, recid, type) => async (dispatch, getState) => {
    // const navigate = useNavigate();
    var url = store.getState().globalurl.apiUrl;
    var data = {
      accessid: AccessID,
      action: Action,
      recid: "",
    };
    console.log("Url---",url);
console.log("--====",JSON.stringify(data));
    dispatch(pending());
    axios
      .post(url, data, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5Njc3NTN9.qtpn_hA0J4cbo56pfT4rVjPx0T6LaAzQznOiFQP3cyc",
        },
      })

      .then((response) => {
        console.log("response data" + response.data);
        //console.log("without authorization---"+JSON.stringify(response));
        var comboData = response.data;
        if (comboData.Status == "Y") {
          dispatch(Success({ type: type, apiResponse: comboData.Data }));
        } else {
          dispatch(Success({ type: "", apiResponse: [] }));
        }
      })

      .catch((error) => {
        dispatch(errored(error.message));
      });
  };

export function fetchComboData(AccessID, Action, recid, type) {
  return async (dispatch) => {
    function onSuccess(success) {
      console.log("2---" + success.data.Status);
      const datawait = dispatch(
        Success({ type: type, apiResponse: success.data.Data })
      );
      return datawait;
    }
    function onError(error) {
      //dispatch({ type: ERROR_GENERATED, error });
      return error;
    }
    try {
      var url = store.getState().globalurl.apiUrl;
      var data = {
        accessid: AccessID,
        action: Action,
        recid: "",
      };

      dispatch(pending());
      console.log("postdata" + JSON.stringify(data));
      const success = await axios.post(url, data, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5Njc3NTN9.qtpn_hA0J4cbo56pfT4rVjPx0T6LaAzQznOiFQP3cyc",
        },
      });
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
}
