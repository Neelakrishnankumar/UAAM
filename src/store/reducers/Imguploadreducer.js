import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


import store from "../../index";
import { toast } from "react-hot-toast";

const initialState = {
  uploadedImgName: "",
  imgStatus: "N",
  imgMsg: "",
  imgLoading: false,
  imgError: "",
};

export const imageUpload = createAsyncThunk(
  "Image/deliverychalan",
  async ({ formData }) => {
    console.log("🚀 ~ file: Imguploadreducer.js:19 ~ formData:", formData)
    const url = store.getState().globalurl.imgUploadUrl;
    const response = await axios.post(url, formData, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log("🚀 ~ file: Imguploadreducer.js:26 ~ response:", response)
    return response.data;
  }
);
export const fileUpload = createAsyncThunk(
  "Image/Finance Entry",
  async ({ formData }) => {
    console.log("🚀 ~ file: Imguploadreducer.js:19 ~ formData:", formData)
    const url = store.getState().globalurl.fileUploadUrl;
    const response = await axios.post(url, formData, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log("🚀 ~ file: Imguploadreducer.js:26 ~ response:", response)
    return response.data;
  }
);
export const getApiSlice = createSlice({
  name: "imageApi",
  initialState,
  reducers: {
    pending(state) {
      return {
        ...state,
        imgLoading: true,
        imgError: false,
      };
    },
    errored(state, action) {
      return {
        ...state,
        imgLoading: false,
        imgError: action.payload,
      };
    },
    Success(state, action) {
      return {
        ...state,
        imgLoading: false,
        imgError: "",
        uploadedImgName: action.payload.apiResponse,
        imgStatus: action.payload.Status,
        imgMsg: action.payload.Msg,
      };
    },
  },
});

// Destructure and export the plain action creators
export const { pending, errored, Success } = getApiSlice.actions;

export default getApiSlice.reducer;

export const fnFetchImage = (AccessID, recID) => (dispatch, getState) => {


  var url = store.getState().globalurl.imageNameUpdateUrl;
  var data = {
    accessid: AccessID,
    Recordid: recID,
    Action: "get",
    ImageName: "",
  };

  console.log(data);
  dispatch(pending());
  axios
    .post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    })

    .then((response) => {
      console.log("response data" + JSON.stringify(response.data));
      var apidata = response.data;

      //     apidata=eval(apidata);
      //    console.log("apidatastatus"+typeof(response.data))
      if (apidata.Status == "Y") {
        if (apidata.Imgname == "") {
          apidata.Imgname = "Defaultimg.jpg";
        }
        dispatch(
          Success({ Status: "Y", apiResponse: apidata.Imgname, Msg: "" })
        );
      } else {
        dispatch(
          Success({ Status: "Y", apiResponse: apidata.Imgname, Msg: "" })
        );
      }
    })
    .catch((error) => {
      dispatch(errored);
      //dispatch(errored({"action":Action,"Status":apidata.Status,"apiResponse":apidata.Data,"Msg":""}))
    });
};

export const fnImageUpload =
  (formData, id, accessid) => async (dispatch, getState) => {
    var url = store.getState().globalurl.imgUploadUrl;

    console.log("--" + url);
    console.log(formData);
    dispatch(pending());
    axios
      .post(url, formData, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4MTA0OTV9.y3Bq2I7MMJLevEIVzb7m6UIirv86uvhoCBbb5qxF3lk",
        },
      })

      .then((response) => {
        console.log(response.data.Msg + "--" + response.data.name);
        toast.success("Image uploaded Sucessfully");
        dispatch(
          Success({
            Status: "Y",
            apiResponse: response.data.name,
            Msg: response.data.Msg,
          })
        );

        var uploadImgurl = store.getState().globalurl.imageNameUpdateUrl;
        var imgData = {
          Recordid: id,
          ImageName: response.data.name,
          accessid: accessid,
          Action: "post",
        };

        axios
          .post(uploadImgurl, imgData, {
            headers: {
              Authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5Njc3NTN9.qtpn_hA0J4cbo56pfT4rVjPx0T6LaAzQznOiFQP3cyc",
            },
          })

          .then((imgresponse) => {
            console.log("--" + JSON.stringify(imgresponse));
          })
          .catch((error) => {
            dispatch(errored);
          });
      })
      .catch((error) => {
        dispatch(errored);
      });
  };

export function fnFileUpload(formData, id, accessid) {
  return async (dispatch) => {
    function onSuccess(success) {
      console.log("2---" + JSON.stringify(success.data));
      toast.success("Document uploaded Sucessfully");

      const datawait = dispatch(
        Success({
          Status: "Y",
          apiResponse: success.data.name,
          Msg: success.data.Msg,
        })
      );
      var uploadImgurl = store.getState().globalurl.imageNameUpdateUrl;
      var imgData = {
        Recordid: id,
        ImageName: success.data.name,
        accessid: accessid,
      };

      axios
        .post(uploadImgurl, imgData, {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5Njc3NTN9.qtpn_hA0J4cbo56pfT4rVjPx0T6LaAzQznOiFQP3cyc",
          },
        })

        .then((imgresponse) => {
          console.log("--" + JSON.stringify(imgresponse));
        })
        .catch((error) => {
          dispatch(errored);
        });
      return datawait;
    }
    function onError(error) {
      //dispatch({ type: ERROR_GENERATED, error });
      return error;
    }
    try {
      var url = store.getState().globalurl.fileUploadUrl;

      dispatch(pending());

      const success = await axios.post(url, formData, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4MTA0OTV9.y3Bq2I7MMJLevEIVzb7m6UIirv86uvhoCBbb5qxF3lk",
        },
      });
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
}

export function fnCsvFileUpload(formData) {
  console.log("🚀 ~ fnCsvFileUpload ~ formData:",JSON.stringify(formData) )
  return async (dispatch) => {
    function onSuccess(success) {
      console.log("2---" + JSON.stringify(success.data));
      toast.success("Document uploaded Sucessfully");

      const datawait = dispatch(
        Success({
          Status: "Y",
          apiResponse: success.data.name,
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
      var url = store.getState().globalurl.csvUploadUrl;

      dispatch(pending());

      const success = await axios.post(url, formData, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4MTA0OTV9.y3Bq2I7MMJLevEIVzb7m6UIirv86uvhoCBbb5qxF3lk",
        },
      });
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
}
