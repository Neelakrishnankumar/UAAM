import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Button, IconButton } from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import store from "../../index";
import { toast } from "react-toastify";
const initialState = {
  loginData: {},
  Status: "N",
  msg: "",
  loading: false,
  error: "",
};


export const authentication = createAsyncThunk(
  "lgems/authentication",
  async ({idata}) => {
    var url = store.getState().globalurl.authUrl;
    var data = {
     ...idata
    };
    console.log("🚀 ~ file: Formapireducer.js:334 ~ data:", JSON.stringify(data))

    const response = await axios.post(url, data, {
      method:"POST",
      
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
      },
    });
    console.log("🚀 ~ file: Formapireducer.js:345 ~ response:", response)
    return response.data;
  }
);

export const getApiSlice = createSlice({
  name: "loginApi",
  initialState,
  reducers: {
    pending(state) {
      return {
        ...state,
        loading: true,
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
      console.log(
        "stage6--LoginReducer--inside Sucess reducer data" +
          JSON.stringify(action.payload)
      );

      return {
        ...state,
        loading: false,
        error: "",
        loginData: action.payload.apiResponse,
        Status: action.payload.Status,
        msg: action.payload.Msg,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authentication.pending, (state, action) => {
        state.Status = "idle";
        state.loading = true;
      })
      .addCase(authentication.fulfilled, (state, action) => {
        state.Status = "success";
        state.loading = false;
      })
      .addCase(authentication.rejected, (state, action) => {
        state.Status = "Error";
        state.loading = false;
        toast.error('Something Went Wrong')
      })
    }
});

// Destructure and export the plain action creators
export const {
  pending,
  errored,

  Success,
} = getApiSlice.actions;

export default getApiSlice.reducer;

export function fetchApidata(emailID, password, company, year) {
  return async (dispatch) => {
    function onSuccess(success) {
      console.log("2---" + JSON.stringify(success.data));
      localStorage.setItem("loginUserData", JSON.stringify(success.data.Data));
      const datawait = dispatch(
        Success({
          Status: success.data.Status,
          apiResponse: success.data.Data,
          Msg: success.data.Msg,
        })
      );
      return datawait;
    }
    function onError(error) {
      //dispatch({ type: ERROR_GENERATED, error });
      return error;
    }
    try {
      var url = store.getState().globalurl.loginUrl;
      var idata = {
        Query: {
          username: emailID,
          password: password,
          yearrecordid: year,
          companyrecordid: company,
        },
      };
      dispatch(pending());
      idata = JSON.stringify(idata);
      // console.log("🚀 ~ file: LoginReducer.js:94 ~ r eturn ~ idata:", idata)
      const success = await axios.get(url, {
        params: {
          data: idata,
        },
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
        },
      });
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
}
