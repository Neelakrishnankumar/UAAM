import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, IconButton, Tooltip, Stack, Box, Alert } from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import store from "../..";
// import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useNavigate } from "react-router-dom";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import PauseCircleOutlinedIcon from "@mui/icons-material/PauseCircleOutlined";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import NotStartedOutlinedIcon from "@mui/icons-material/NotStartedOutlined";
import { toast } from "react-hot-toast";
import { redirect } from "react-router-dom";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SendIcon from "@mui/icons-material/Send";
import EmailIcon from "@mui/icons-material/Email";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import { StockProcessApi } from "./Formapireducer";
import OpenInBrowserOutlinedIcon from '@mui/icons-material/OpenInBrowserOutlined';
import Swal from "sweetalert2";
const initialState = {
  rowData: [],
  columnData: [],
  loading: false,
  error: "",
  mailOpen: false,
  mailData: {},
  mailGetData: {},
  materialRecID:"",
  colorsRecID:"",
  isLookupOpen:false,
  isLookupColorOpen:false,
  productionCardRecid:0,
};


const Finyear = sessionStorage.getItem("year");
export const getMail = createAsyncThunk("mail/get", async (data) => {
  var url = store.getState().globalurl.mailContentGeturl;

  // console.log("get" + JSON.stringify(data));
  // console.log("🚀 ~ file: Formapireducer.js:26 ~ data:", data);
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
});

export const sendMail = createAsyncThunk(
  "mail/send",
  async ({ accessID, action, idata }) => {
    const url = store.getState().globalurl.mailSendUrl;
    const data = {
      ToID: idata.ToID,
      Cc: idata.Cc,
      Subject: idata.Subject,
      Attachment: idata.Attachment,
      Message: idata.Message,
    };
    console.log("get" + JSON.stringify(data));
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    toast.success("Mail Send Successfully");
    return response.data;
  }
);

export const getApiSlice = createSlice({
  name: "listviewApi",
  initialState,
  reducers: {
    productionlookupOpen(state,action){
      state.isLookupOpen = !state.isLookupOpen
      //here change
      state.materialRecID = action.payload.materialRecID;
      state.productionCardRecid = action.payload.productionCardID;
    },
    productionColorlookupOpen(state,action){
      state.isLookupColorOpen = !state.isLookupColorOpen
       //here change
       state.materialRecID = action.payload.materialRecID;
    },
    mailOpen(state, action) {
      state.mailOpen = !state.mailOpen;
      state.mailData = action.payload;
    },
    pending(state) {
      return {
        ...state,
        loading: true,
        error: false,
        rowData: [],
        columnData: [],
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
        rowData: action.payload.rowdata,
        columnData: action.payload.columndata,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMail.fulfilled, (state, action) => {
        state.loading = false;

        state.mailGetData = action.payload;
      })
      .addCase(getMail.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

// Destructure and export the plain action creators
export const { pending, errored, mailOpen, Success,productionlookupOpen,productionColorlookupOpen } = getApiSlice.actions;

export default getApiSlice.reducer;

// const loader = async () => {

//     return redirect("/");

// };

const productionCardUPdate = (type, recID) => async(dispatch, getState) => {
  //  alert(type);
  const compID = sessionStorage.getItem("compID");  
  var updateName = "";

  if (type === "S") {
    updateName = "Production Card Started ";

    // Swal.fire({
    //   title: `Do you want Start Production Card?`,
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Ok",
    // }).then((result) => {
    //   if (result.isConfirmed) {

    //     var url = store.getState().globalurl.pcdurl;
    //     var data = {
    //       accessid: "TR047",
    //       Type: type,
    //       RecordID: recID,
    //     };
    //     console.log("🚀 ~ file: Listviewapireducer.js:113 ~ data:", data);
      
    //     axios
    //       .post(url, data, {
    //         headers: {
    //           Authorization:
    //             "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
    //         },
    //       })
      
    //       .then((response) => {
    //         console.log(
    //           "🚀 ~ file: Listviewapireducer.js:96 ~ .then ~ response",
    //           response.data
    //         );
    //         // console.log("response data" + response.data);
    //         if (response.data.Status == "Y") {
    //           toast.success(`${updateName}`);

            
    //           dispatch( fetchListview(
    //               "TR047",
    //               "Production Card",
    //               "",
    //               "",
    //               compID
    //             ))
              
    //           // window.location.href = '/Apps/TR056/Customer%20Order'
    //         } else {
    //           toast.error(`${"Error"}`);
    //         }
    //       })
    //       .catch((error) => {
    //         dispatch(errored);
    //         //dispatch(errored({"action":Action,"Status":apidata.Status,"apiResponse":apidata.Data,"Msg":""}))
    //       });
        
  //     } else {
  //       return;
  //     }
  //   });
  //  return;
  }
  if (type === "P") {
    updateName = "Production Card Paused";
  }
  if (type === "C") {
    updateName = "Production Card Completed";
  }
  if (type === "R") {
    updateName = "Production Card Continued";
  }
  var url = store.getState().globalurl.pcdurl;
  var data = {
    accessid: "TR047",
    Type: type,
    RecordID: recID,
  };
  console.log("🚀 ~ file: Listviewapireducer.js:113 ~ data:", data);

  axios
    .post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    })

    .then((response) => {
      console.log(
        "🚀 ~ file: Listviewapireducer.js:96 ~ .then ~ response",
        response.data
      );
      // console.log("response data" + response.data);
      if (response.data.Status == "Y") {
        toast.success(`${updateName}`);
        // window.location.href = '/Apps/TR056/Customer%20Order'
      } else {
        toast.error(`${"Error"}`);
      }
    })
    .catch((error) => {
      dispatch(errored);
      //dispatch(errored({"action":Action,"Status":apidata.Status,"apiResponse":apidata.Data,"Msg":""}))
    });
};

const fnProcess = (recID, accessid) => (dispatch, getState) => {
  var url = store.getState().globalurl.imageNameUpdateUrl;

  var data = { accessid: accessid, Recordid: recID,Action:"none",ImageName :"no" };
  console.log(
    "🚀 ~ file: Listviewapireducer.js:228 ~ fnProcess ~ data:",
    JSON.stringify(data)
  );

  axios
    .post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    })

    .then((response) => {
      console.log(
        "🚀 ~ file: Listviewapireducer.js:96 ~ .then ~ response",
        response.data
      );
      // console.log("response data" + response.data);
      if (response.data.Status == "Y") {
        // window.location.href = '/Apps/TR056/Customer%20Order'
      } else {
        toast.error(`${"Error"}`);
      }
    });
};

const indentOrderSave =
  (type, recID, SupplierID, parentID) => (dispatch, getState) => {
    var url = store.getState().globalurl.indentUrl;
    const Finyear = sessionStorage.getItem("year");
    const CompanyID = sessionStorage.getItem("compID");  
    const yearID = sessionStorage.getItem("YearRecorid");

    var data = {
      accessid: "TR056",
      Type: type,
      RecordID: recID,
      SupplierID,
      Finyear,
      CompanyID,
      yearID
    };

    console.log("INDENTSTRUCT" + JSON.stringify(data));
    // dispatch(pending());

    
    axios
      .post(url, data, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
        },
      })

      .then((response) => {
        console.log(
          "🚀 ~ file: Listviewapireducer.js:96 ~ .then ~ response",
          response.data
        );
        // alert( JSON.stringify( response.data))
        console.log("response data" + response.data);
        console.log("response data" + response.data.Type);

        if (response.data.Status == "Y") {
          if (response.data.Insert == "Y") {
            toast.success(response.data.Msg);
            if (response.data.Type == "L") {
              window.location.href = `/Apps/Secondarylistview/TR056/Indent Order/${parentID}/${recID}/${response.data.ProdcrdNO}/${response.data.Type}/EditIndent%20Order/${response.data.RecordID}/E`;
            } else {
              window.location.href = `/Apps/Secondarylistview/TR056/Indent Order/${parentID}/${recID}/${response.data.ProdcrdNO}/${response.data.Type}/EditMaterial IndentOrder/${response.data.RecordID}/E`;
            }
          } else {
            if (response.data.Type == "L") {
              window.location.href = `/Apps/Secondarylistview/TR056/Indent Order/${parentID}/${recID}/${response.data.ProdcrdNO}/${response.data.Type}/EditIndent%20Order/${response.data.RecordID}/E`;
            } else {
              window.location.href = `/Apps/Secondarylistview/TR056/Indent Order/${parentID}/${recID}/${response.data.ProdcrdNO}/${response.data.Type}/EditMaterial IndentOrder/${response.data.RecordID}/E`;
            }
          }
        } else {
          toast.error(response.data.Msg);
        }
      });
  };

const PurchaseIndent = createAsyncThunk(
  "Production Card/Indent",
  ({ RecordID }) => {
    var url = store.getState().globalurl.pIndentUrl;
    var data = {
      accessid: "TR108",
      RecordID: RecordID,
    };

    console.log("INDENTSTRUCT" + JSON.stringify(data));
    // dispatch(pending());
    axios
      .post(url, data, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
        },
      })

      .then((response) => {
        console.log(
          "🚀 ~ file: Listviewapireducer.js:96 ~ .then ~ response",
          response.data
        );
        // console.log("response data" + response.data);
        if (response.data.Status == "Y") {
          if (response.data.Insert == "Y") {
            toast.success(response.data.Msg);
            window.location.href = `/Apps/Secondarylistview/TR108/Material IndentOrder/${RecordID}/${response.data.ProdcrdNO}`;
          } else {
            window.location.href = `/Apps/Secondarylistview/TR108/Material IndentOrder/${RecordID}/${response.data.ProdcrdNO}`;
          }
        } else {
          toast.error(response.data.Msg);
        }
      });
  }
);

const CustomerOrderSave = (type, recID) => (dispatch, getState) => {
  //  alert(type);

  var url = store.getState().globalurl.pcdurl;
  var data = {
    accessid: "TR047",
    Type: type,
    RecordID: recID,
  };

  console.log(data);
  // dispatch(pending());
  axios
    .post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    })

    .then((response) => {
      console.log(
        "🚀 ~ file: Listviewapireducer.js:96 ~ .then ~ response",
        response.data
      );
      // console.log("response data" + response.data);
      if (response.data.Status == "Y") {
        toast.success(``);
        // window.location.href = '/Apps/TR056/Customer%20Order'
      } else {
        toast.error(``);
      }
    })
    .catch((error) => {
      dispatch(errored);
      //dispatch(errored({"action":Action,"Status":apidata.Status,"apiResponse":apidata.Data,"Msg":""}))
    });
};
export const fetchListview =
  (AccessID, screenName, filter, any, CompId) => async (dispatch, getState) => {
    // const navigate = useNavigate();;
    var url = store.getState().globalurl.listViewurl;
    var compID = sessionStorage.getItem("compID");
    // alert(compID);
    const year = sessionStorage.getItem("year");
    const company = sessionStorage.getItem("company");
    // alert("Inside listview--",sessionStorage.getItem("UserName"));
    var LoggedInUserName = sessionStorage.getItem("UserName");
    // alert("LoggedInUserName",LoggedInUserName);
    if (filter != "" && AccessID !== "TR115" && AccessID !== "TR118"  && AccessID !== "TR155"  && AccessID !== "TR152" && AccessID !== "TR148" ) {
      if (
        AccessID == "TR011" ||
        AccessID == "TR008" ||
        AccessID == "TR054" ||
        AccessID == "TR052" ||
        AccessID == "TR060" ||
        AccessID == "TR003" ||
        AccessID == "TR021" ||
        AccessID == "TR073" ||
        AccessID == "TR050" ||
        AccessID == "TR074" ||
        AccessID == "TR077" ||
        AccessID == "TR079" ||
        AccessID == "TR080" ||
        AccessID == "TR032" ||
        AccessID == "TR087"
      ) {
        if (AccessID == "TR080") {
          filter =
            "parentID='" +
            filter +
            "'" +
            " " +
            "AND" +
            " " +
            "Finyear='" +
            year +
            "'";
        }
        if (AccessID != "TR080") {
          filter = "parentID='" + filter + "'";
          // console.log("---3---",filter);
        }
      }
      if (
        AccessID != "TR051" &&
        AccessID != "TR032" &&
        AccessID != "TR004" &&
        AccessID != "TR011" &&
        AccessID != "TR008" &&
        AccessID != "TR054" &&
        AccessID != "TR052" &&
        AccessID != "TR060" &&
        AccessID != "TR003" &&
        AccessID != "TR021" &&
        AccessID != "TR073" &&
        AccessID != "TR050" &&
        AccessID != "TR074" &&
        AccessID != "TR077" &&
        AccessID != "TR079" &&
        AccessID != "TR080" &&
        AccessID != "TR063" &&
        AccessID != "TR047" &&
        AccessID != "TR097" &&
        AccessID != "TR102" &&
        AccessID != "TR103" &&
        AccessID != "TR105" &&
        AccessID != "TR002" &&
        AccessID != "TR087" &&
        AccessID != "TR123" &&
        AccessID !=  "TR124" &&
        AccessID !=  "TR010" &&
        AccessID !=  "TR091" &&
        AccessID !=  "TR140" &&
         AccessID != "TR022"
      ) {
        filter = "parentID=" + `'${filter}'`;
        // console.log("---4---",filter);
      }

      if (
        AccessID == "TR051" ||
        AccessID == "TR047" ||
        AccessID == "TR097" ||
        AccessID == "TR063" ||
        AccessID == "TR004" ||
        AccessID == "TR103" ||
        AccessID == "TR102" ||
        AccessID == "TR105" ||
        AccessID == "TR002" ||
        AccessID == "TR086" ||
        AccessID == "TR123" || 
        AccessID == "TR124" ||
        AccessID == "TR091" 
        
      ) {
        filter = filter;
      }
     
    }
    var idata = {
      Query: {
        // "ScreenName": screenName,
        AccessID: AccessID,
        ScreenName: screenName,
        Filter: filter,
        Any: any,
        CompId,
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
        console.log("without authorization---" + JSON.stringify(response));
        var listviewData = response.data;
        if (listviewData.Status == "Y") {
          var obj = {};
          if (AccessID == "TR047") {
            obj = {
              field: "action",
              headerName: "Action",
              headerAlign: "center",
              sortable: false,
              filterable: false,
              disableColumnMenu: true,
              minWidth: 300,
              maxWidth: 300,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Stack direction="row">
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Type}/${params.row.Number}/${params.row.Quantity}`}
                    >
                      <Tooltip title="Production Card Items">
                        <IconButton color="info">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID1}/${params.row.ChildName1}/${params.row.RecordID}/${params.row.Number}`}
                    >
                      <Tooltip title="Indent Items">
                        <IconButton color="error">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                    <Link
                       to={`/Apps/TR146/Production Card/EditInspection Form/${params.row.RecordID}`}
                    >
                      <Tooltip title="Inspection Form">
                        <IconButton color="info">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                    {params.row.Startdate != "" ? (
                    <Tooltip title="Print">
                        <IconButton
                          component="a"
                          href={`${
                            store.getState().globalurl.pdfurl
                          }productioncard.php?Token=${params.row.Hashtoken}`}
                          target="_blank"
                          rel="noreferrer"
                          color="info"
                          size="small"
                        >
                          <PrintOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                       ) : null}
                    {params.row.Process != "Y" && params.row.Completeddate ? (
                      <Link>
                        <IconButton
                          color="primary"
                          variant="contained"
                          onClick={fnProcess(params.row.RecordID, "TR047")}
                        >
                          <SettingsBackupRestoreIcon />
                        </IconButton>
                      </Link>
                    ) : null}

                    {params.row.Startdate == "" ? (
               <Link>
                        <Tooltip title={params.row.Startdate}>
                          <IconButton
                            color="success"
                            onClick={
                         
                                    productionCardUPdate(
                                      "S",
                                      params.row.RecordID
                                    )
                             
                             }
                          >
                            <PlayCircleOutlineOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                        </Link>
                    ) : params.row.Startdate != "" &&
                      params.row.Completeddate == "" ? (
                      <Box>
                        {params.row.Pausedate == "" ? (
                          <Link>
                            <Tooltip title={params.row.Pausedate || "Pause"}>
                              <IconButton
                                color="warning"
                                onClick={productionCardUPdate(
                                  "P",
                                  params.row.RecordID
                                )}
                              >
                                <PauseCircleOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>
                        ) : params.row.ContinueDate == "" ? (
                          <Link>
                            <Tooltip title="Continue">
                              <IconButton
                                color="primary"
                                onClick={productionCardUPdate(
                                  "R",
                                  params.row.RecordID
                                )}
                              >
                                <NotStartedOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>
                        ) : (
                          false
                        )}
                        <Link>
                          <Tooltip
                            title={params.row.Completeddate || "Complete"}
                          >
                            <IconButton
                              color="success"
                              onClick={productionCardUPdate(
                                "C",
                                params.row.RecordID
                              )}
                            >
                              <TaskAltOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      </Box>
                    ) : (
                      ""
                    )}
                    {params.row.Process == "Y" ? (
                      <Tooltip title="Print">
                        <IconButton
                          component="a"
                          href={`${
                            store.getState().globalurl.pdfurl
                          }PRODUCTIONCARD.php?Token=${params.row.Hashtoken}`}
                          target="_blank"
                          rel="noreferrer"
                          color="info"
                          size="small"
                        >
                          <PrintOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      false
                    )}
                    
                      <Tooltip title="Production Requirement">
                        <IconButton
                          component="a"
                          href={`${
                            store.getState().globalurl.pdfurl
                          }ProductionRequirement.php?Token=${params.row.Hashtoken}`}
                          target="_blank"
                          rel="noreferrer"
                          sx={{color:"#4615b2"}}
                          size="small"
                        >
                          <PrintOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    
                    {params.row.Process == "Y" ? (
                      <Tooltip title="Email">
                        <IconButton
                          color="info"
                          size="small"
                          onClick={() => {
                            dispatch(
                              mailOpen({
                                row: params.row,
                                link: `${
                                  store.getState().globalurl.pdfurl
                                }PRODUCTIONCARD.php?Token=${
                                  params.row.Hashtoken
                                }`,
                              })
                            );
                            dispatch(
                              getMail({
                                Templateid: "ET_006",
                                RecordID: params.row.RecordID,
                                UserName: "Trinity",
                              })
                            );
                          }}
                        >
                          <EmailIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}

                    {/* <Link><Tooltip title="Start"><IconButton color="success" onClick={productionCardUPdate("S",params.row.RecordID)} ><PlayCircleOutlineOutlinedIcon/></IconButton></Tooltip></Link>
             <Link><Tooltip title="Pause"><IconButton color="warning" onClick={productionCardUPdate("P",params.row.RecordID)}><PauseCircleOutlinedIcon/></IconButton></Tooltip></Link>
            <Link><Tooltip title="Complete"><IconButton color="success" onClick={productionCardUPdate("C",params.row.RecordID)}><TaskAltOutlinedIcon/></IconButton></Tooltip></Link> */}
                    {/* </Stack> */}
                  </Stack>
                );
              },
            };
          } else if (AccessID == "TR058" || AccessID == "TR059") {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 250,
              sortable: false,
              filterable: false,
              headerAlign: "center",
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    {/* // <Stack direction="row" spacing={1}> */}
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Type}`}
                    >
                      <Tooltip
                        title={
                          AccessID == "TR058"
                            ? "List of Remarks"
                            : "List of Delivery challan"
                        }
                      >
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          }  else if (AccessID == "TR146" ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 250,
              sortable: false,
              filterable: false,
              headerAlign: "center",
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    <Link
                        to={`./EditJobWork Category/${params.row.RecordID}/E`}
                      >
                        <Tooltip title="Edit">
                          <IconButton color="info" size="small">
                            <ModeEditOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    <Link
                      to={`./EditJobwork/${params.row.RecordID}/E`}
                    >
                      <Tooltip
                        title={
                         "List of Job Work"
                        }
                      >
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          }else if (AccessID == "TR076") {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 250,
              sortable: false,
              filterable: false,
              headerAlign: "center",
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    {/* // <Stack direction="row" spacing={1}> */}
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Type}`}
                    >
                      <Tooltip title="List of Batch">
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (AccessID == "TR064") {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 250,
              sortable: false,
              filterable: false,
              headerAlign: "center",
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    {/* // <Stack direction="row" spacing={1}> */}
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Type}`}
                    >
                      <Tooltip title="List of Stock">
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (AccessID == "TR049") {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 250,
              sortable: false,
              filterable: false,
              headerAlign: "center",
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    {/* // <Stack direction="row" spacing={1}> */}
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Type}`}
                    >
                      <Tooltip title="List of UOM">
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR063"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              filterable: false,
              renderCell: (params) => {
                return (
                  <Box>
                    <Link
                      to={`./Edit${screenName}/${params.row.RecordID}/${params.row.YearID}/E`}
                    >
                      <Tooltip title="Edit">
                        <IconButton color="info" size="small">
                          <ModeEditOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR043"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 150,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    {params.row.Code == "P" ? (
                      <Link
                        to={`/Apps/Secondarylistview/TR073/${params.row.ChildName}/${params.row.Type}`}
                      >
                        <Tooltip title="List Of Invoice">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : params.row.Code == "L" ? (
                      <Link
                        to={`/Apps/Secondarylistview/TR011/Proforma Invoice/${params.row.Code}/FI`}
                      >
                        <Tooltip title="List Of Invoice">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : null}

                    {params.row.Code == "PL"  ? (
                      <Link
                        to={`/Apps/Secondarylistview/TR211/Local Invoice/${params.row.Code}`}

                      >
                        <Tooltip title="List Of Invoice">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : null}

                    { params.row.Code == "LL" ? (
                      <Link
                        to={`/Apps/Secondarylistview/TR084/Local Invoice/${params.row.Code}/${params.row.Type}`}
                      >
                        <Tooltip title="List Of Invoice">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : null}


                    

                    

                    {/* ( <Link to={`/Apps/Secondarylistview/TR083/Local Invoce/${params.row.Type}/IN`}>
                      <Tooltip title="Edit">
                        <IconButton color="info" size="small">
                          <ReceiptLongIcon />
                        </IconButton>
                      </Tooltip>
                  </Link>) */}
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR044"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 250,
              sortable: false,
              filterable: false,
              headerAlign: "center",
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Type}`}
                    >
                      <Tooltip title="List of Category">
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          }
          // STOCKENQUIRY
          else if (
            AccessID == "TR078"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 150,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    {params.row.Type == "S" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.SuppChildID}/${params.row.SuppChildName}/${params.row.Type}/${params.row.Description}`}
                      >
                        <Tooltip title="List Of Stock">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : params.row.Type == "PD" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.PrdcrdChildID}/${params.row.PrdcrdChildName}/${params.row.Type}`}
                      >
                        <Tooltip title="List Of Stock">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : params.row.Type == "L" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.PrdcrdChildID}/${params.row.PrdcrdChildName}/${params.row.parentID}/${params.row.Type}`}
                      >
                        <Tooltip title="List Of Stock">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : params.row.Type == "CC" || params.row.Type == "PC" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Type}/${params.row.Code}`}
                      >
                        <Tooltip title="List Of Stock">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.RemarkChildID}/${params.row.RemarkChildName}/${params.row.Code}`}
                      >
                        <Tooltip title="List Of Stock">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    )}
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR072"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Type}/${params.row.Description}`}
                    >
                      <Tooltip title="List Of Process">
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR116"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              align: "center",
              renderCell: (params) => {
                return (
                  <Box>
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Type}`}
                    >
                      <Tooltip title="List Of Packing List">
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR116"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Type}`}
                    >
                      <Tooltip title="">
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          }
          //
          else if (
            AccessID == "TR087"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    {params.row.parentID == "N" ? (
                      <Link to={`./EditPacking List/${params.row.RecordID}/E`}>
                        <Tooltip title="Edit">
                          <IconButton color="info" size="small">
                            <ModeEditOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      <Link
                        to={`/Apps/Secondarylistview/TR087/Packing List/${params.row.parentID}/EditAssorted/${params.row.RecordID}/E`}
                      >
                        <Tooltip title="Edit">
                          <IconButton color="info" size="small">
                            <ModeEditOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    )}
                    {params.row.Process == "Y" ? (
                      <Tooltip title="Print">
                        <IconButton
                          component="a"
                          href={`${
                            store.getState().globalurl.pdfurl
                          }productpacking.php?Token=${params.row.Hashtoken}`}
                          target="_blank"
                          rel="noreferrer"
                          color="info"
                          size="small"
                        >
                          <PrintOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                    {params.row.Process == "Y" ? (
                      <Tooltip title="Email">
                        <IconButton
                          color="info"
                          size="small"
                          onClick={() => {
                            dispatch(
                              mailOpen({
                                row: params.row,
                                link: `${
                                  store.getState().globalurl.pdfurl
                                }productpacking.php?Token=${params.row.Hashtoken}`,
                              })
                            );
                            dispatch(
                              getMail({
                                Templateid: "ET_010",
                                RecordID: params.row.RecordID,
                                UserName: "Trinity",
                              })
                            );
                          }}
                        >
                          <EmailIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR072"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 150,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Type}/${params.row.Description}`}
                    >
                      <Tooltip title="List Of Process">
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR073"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 150,
              sortable: false,
              headerAlign: "center",
              align: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.parentID}/${params.row.Code}`}
                    >
                      <Tooltip title={params.row.Description}>
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR079"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    <Link
                      to={`/Apps/Secondarylistview/TR080/Stock/${params.row.RecordID}/${params.row.Name}/${params.row.parentID}`}
                    >
                      <Tooltip title="Stock">
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR051"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              align: "center",
              renderCell: (params) => {
                return (
                  <Box>
                    {/* <Tooltip title="Indent Order">
                        
                       <IconButton color="info" size="small" onClick={indentOrderSave('insert',params.row.RecordID)}>
                         <ReceiptLongIcon />
                       </IconButton>
                     </Tooltip> */}
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.MtlRecordID}/${params.row.ProductionCardNO}/${params.row.Type}`}
                    >
                      <Tooltip title="Edit">
                        <IconButton
                          color="info"
                          onClick={() =>
                            sessionStorage.setItem(
                              "indentRecID",
                              params.row.RecordID
                            )
                          }
                          size="small"
                        >
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR113"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Link
                    to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.RecordID}`}
                  >
                    <Tooltip title="Edit">
                      <IconButton color="info" size="small">
                        <ListAltOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Link>
                );
              },
            };
          } else if (
            AccessID == "TR111"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Link
                    to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.RecordID}/${params.row.Name}`}
                  >
                    <Tooltip title="Edit">
                      <IconButton color="info" size="small">
                        <ListAltOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Link>
                );
              },
            };
          }
           else if (
            AccessID == "TR101"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    {params.row.Code === "CR" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.ChildID1}/${params.row.ChildName1}/${params.row.RecordID}`}
                      >
                        <Tooltip title="List Of Invoice">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Code}/${params.row.RecordID}`}
                      >
                        <Tooltip title="List Of Invoice">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    )}
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR140"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.ChildID}/Costing/${params.row.ProductRecordID}/${params.row.ProductDescription}/${params.row.CustomerRecordID}`}
                      >
                        <Tooltip title="List Of BOM">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                  </Box>
                );
              },
            };
          }else if (
            AccessID == "TR141"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                      <Link
                        to={`./costing-product/${params.row.ReferenceNo}/${params.row.RecordID}/TR091`}
                      >
                        <Tooltip title="List Of Costing">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR103"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Description}/${params.row.RecordID}`}
                      state={{ rowData: params.row }}
                    >
                      <Tooltip title="List Of Invoice">
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR104"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    <Link
                      to={`./${params.row.ChildID}/${params.row.ChildName}/${params.row.Code}`}
                    >
                      <Tooltip title="List Of Invoice">
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (AccessID == "TR080") {
            listviewData.Data.columns.push(obj);
            dispatch(
              Success({
                columndata: listviewData.Data.columns,
                rowdata: listviewData.Data.rows,
              })
            );
          } else if (
            AccessID !== "TR105" &&
            AccessID !== "TR102" &&
            AccessID !== "TR111" &&
            AccessID !== "TR112" &&
            AccessID !== "TR114" &&
            AccessID !== "TR115"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 250,
              headerAlign: "center",
              align: "center",
              filterable: false,
              sortable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                const indentRecID = sessionStorage.getItem("indentRecID");
                return (
                  <Stack direction="row">
                    {AccessID !== "TR119" &&
                    AccessID !== "TR118" &&
                    AccessID !== "TR032" &&
                    AccessID !== "TR099" &&
                    AccessID !== "TR048" &&
                    AccessID !== "TR010" &&
                    AccessID !== "TR083" &&
                    AccessID !== "TR097" &&
                    AccessID !== "TR135" &&
                    AccessID !== "TR136" &&
                    AccessID !== "TR091" &&
                    AccessID !== "TR151" &&
                    AccessID !== "TR052" ? (
                      <Link
                        to={`./Edit${screenName}/${params.row.RecordID}/E`}
                        state={{
                          CustomerID: params.row.CustomerRecordID,
                          ProductID: params.row.ProductRecordID,
                          BomID: params.row.BomRecordID,
                        }}
                      >
                        <Tooltip title="Edit">
                          <IconButton color="info" size="small">
                            <ModeEditOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR052" || AccessID == "TR151" ? (
                      <Link
                        to={`./EditDelivery Chalan/${params.row.RecordID}/E`}
                      >
                        <Tooltip title="Edit">
                          <IconButton color="info" size="small">
                            <ModeEditOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR091" ? (
                      <Link
                        to={`./${params.row.FirstLeatherID}/Edit${screenName}/${params.row.RecordID}/E`}
                      >
                        <Tooltip title="Edit">
                          <IconButton color="info" size="small">
                            <ModeEditOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {params.row.Process == "Y" && AccessID == "TR052" ? (
                      <Tooltip title="Print">
                        <IconButton
                          component="a"
                          href={`${
                            store.getState().globalurl.pdfurl
                          }deliverychallan.php?Token=${params.row.Hashtoken}`}
                          target="_blank"
                          rel="noreferrer"
                          color="info"
                          size="small"
                        >
                          <PrintOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      false
                    )}
                 {params.row.Process != "Y" && params.row.parentID == "MO"  && AccessID == "TR052" ? (
                      <Link>
                        <IconButton
                          color="primary"
                          variant="contained"
                          onClick={fnProcess(params.row.RecordID, "TR052")}
                        >
                          <SettingsBackupRestoreIcon />
                        </IconButton>
                      </Link>
                    ) : null}
                     {params.row.Process != "Y" && params.row.parentID == "LO"  && AccessID == "TR052" ? (
                      <Link>
                        <IconButton
                          color="primary"
                          variant="contained"
                          onClick={fnProcess(params.row.RecordID, "TR052")}
                        >
                          <SettingsBackupRestoreIcon />
                        </IconButton>
                      </Link>
                    ) : null}
                    {params.row.Process != "Y" && params.row.parentID == "PO"  && AccessID == "TR052" ? (
                      <Link>
                        <IconButton
                          color="primary"
                          variant="contained"
                          onClick={fnProcess(params.row.RecordID, "TR052")}
                        >
                          <SettingsBackupRestoreIcon />
                        </IconButton>
                      </Link>
                    ) : null}
                    {AccessID == "TR091" ? (
                      <Link
                        // to={"./price-of-other-customer"}
                        to={`./price-of-other-customer/${params.row.RecordID}`}
                      >
                        <Tooltip title="Edit">
                          <IconButton color="info" size="small">
                            <AssessmentIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR099" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.RecordID}`}
                      >
                        <Tooltip title="List of  usergroups">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR014" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.RecordID}`}
                      >
                        <Tooltip title="Locations">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR123" ? (
                      <Link
                        to={`/Apps/Secondarylistview/TR132/DailyTask/${params.row.RecordID}`}
                      >
                        <Tooltip title="Daily Task Icon">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR132" ? (
                      <Link
                        to={`/Apps/Secondarylistview/TR134/Daily Hour Task/${params.row.RecordID}/${params.row.parentID}`}
                      >
                        <Tooltip title="Daily Hours Task ">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                      {AccessID == "TR136" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Type}/${params.row.RecordID}`}
                      >
                        <Tooltip title="Finance Entry">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                      
                    ) : (
                      false
                    )}
                     {AccessID == "TR135" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Type}`}
                      >
                        <Tooltip title="Fixed Asset Category">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                      
                    ) : (
                      false
                    )}
                     {AccessID == "TR137" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.RecordID}/${params.row.parentID}`}
                      >
                        <Tooltip title="Fixed Assets">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                      
                    ) : (
                      false
                    )}
                    {AccessID == "TR128" ? (
                      <Box>
                        <Link
                          to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.RecordID}/${params.row.parentID}`}
                        >
                          <Tooltip title="Gate">
                            <IconButton color="info" size="small">
                              <ListAltOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                        <Link
                          to={`/Apps/Secondarylistview/${params.row.ChildID1}/${params.row.ChildName1}/${params.row.RecordID}/${params.row.parentID}`}
                        >
                          <Tooltip title="Bin">
                            <IconButton color="info" size="small">
                              <ListAltOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      </Box>
                    ) : (
                      false
                    )}

                    {/* http://skillglow.beyondexs.com/trinity/tcpdf/BOMCC.php?compID=3&PBBHID=99 */}
                    {AccessID == "TR083" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.ChildID}/Colors/${params.row.Type}`}
                      >
                        <Tooltip title="List of Colors">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}

                    {AccessID == "TR032" ? (
                      <Link to={`./Edit${screenName}/${params.row.RecordID}/E`}>
                        <Tooltip title="Edit">
                          <IconButton color="info" size="small">
                            <ModeEditOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {/* http://skillglow.beyondexs.com/trinity/tcpdf/BOMCC.php?compID=3&PBBHID=99 */}
                    {AccessID == "TR032" && params.row.MType === "L" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.ChildID}/Colors/${params.row.RecordID}/${params.row.Description}`}
                      >
                        <Tooltip title="List of Color shades">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR033" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.ChildID}/Colors-customer/${params.row.RecordID}/${params.row.parentName}/${params.row.Description}`}
                      >
                        <Tooltip title="List of Customer">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}

                    {AccessID == "TR097" ? (
                      <Link
                        to={`./${params.row.ChildID}/${params.row.RecordID}/DC/${params.row.Type}/${params.row.Description}/`}
                      >
                        <Tooltip title="List of Delivery Chalan">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR109" && params.row.Process == "Y" ? (
                      <Box>
                      <Tooltip title="Print">
                        <IconButton
                          component="a"
                          href={`${
                            store.getState().globalurl.pdfurl
                          }Leatherpackingreport.php?Token=${
                            params.row.Hashtoken
                          }`}
                          target="_blank"
                          rel="noreferrer"
                          color="info"
                          size="small"
                        >
                          <PrintOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                       <Tooltip title="Print">
                       <IconButton
                         component="a"
                         href={`${
                           store.getState().globalurl.pdfurl
                         }LEATHERPACKING.php?Token=${
                           params.row.Hashtoken
                         }`}
                         target="_blank"
                         rel="noreferrer"
                         color="info"
                         size="small"
                       >
                         <PrintOutlinedIcon />
                       </IconButton>
                     </Tooltip>
                     </Box>
                    ) : (
                      false
                    )}
                    {AccessID == "TR109" && params.row.Process == "Y" ? (
                      <IconButton
                        color="info"
                        size="small"
                        onClick={() => {
                          dispatch(
                            mailOpen({
                              row: params.row,
                              link: `${
                                store.getState().globalurl.pdfurl
                              }Leatherpackingreport.php?Token=${
                                params.row.Hashtoken
                              }`,
                            })
                          );
                          dispatch(
                            getMail({
                              Templateid: "ET_011",
                              RecordID: params.row.RecordID,
                              UserName: "Trinity",
                            })
                          );
                        }}
                      >
                        <EmailIcon />
                      </IconButton>
                    ) : null}
                    {AccessID == "TR050" && params.row.Process != "Y" ? (
                      <Link>
                        {" "}
                        <IconButton
                          color="primary"
                          variant="contained"
                          onClick={fnProcess(params.row.RecordID, "TR050")}
                          // onClick={()=>alert("hai")}
                        >
                          <SettingsBackupRestoreIcon />
                        </IconButton>
                      </Link>
                    ) : null}

                    {AccessID == "TR050" && params.row.Process == "Y" ? (
                      <Tooltip title="Cutting Component">
                        <IconButton
                          component="a"
                          href={`${
                            store.getState().globalurl.pdfurl
                          }BOMCC.php?Token=${params.row.Hashtoken}`}
                          target="_blank"
                          rel="noreferrer"
                          color="primary"
                          size="small"
                        >
                          <PrintOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      false
                    )}

                    {AccessID == "TR050" && params.row.Process == "Y" ? (
                      <Tooltip title="Production">
                        <IconButton
                          component="a"
                          href={`${
                            store.getState().globalurl.pdfurl
                          }BOMPROD.php?Token=${params.row.Hashtoken}`}
                          target="_blank"
                          rel="noreferrer"
                          color="success"
                          size="small"
                        >
                          <PrintOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      false
                    )}

                    {AccessID == "TR050" && params.row.Process == "Y" ? (
                      <Tooltip title="Packing">
                        <IconButton
                          component="a"
                          href={`${
                            store.getState().globalurl.pdfurl
                          }BOMPACK.php?Token=${params.row.Hashtoken}`}
                          target="_blank"
                          rel="noreferrer"
                          color="error"
                          size="small"
                        >
                          <PrintOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      false
                    )}
                    {AccessID == "TR050" && params.row.Process == "Y" ? (
                      <Tooltip title="All BOM">
                        <IconButton
                          component="a"
                          href={`${
                            store.getState().globalurl.pdfurl
                          }BOMALL.php?Token=${params.row.Hashtoken}`}
                          target="_blank"
                          rel="noreferrer"
                          color=""
                          size="small"
                        >
                          <PrintOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      false
                    )}
                     {AccessID == "TR050" && params.row.Process == "Y" ? (
                      <Tooltip title="Internal Order">
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
                    ) : (
                      false
                    )}
                    {AccessID == "TR050" && params.row.Process == "Y" ? (
                      <IconButton
                        color="info"
                        size="small"
                        onClick={() => {
                          dispatch(
                            mailOpen({
                              row: params.row,
                              link: `${
                                store.getState().globalurl.pdfurl
                              }BOMALL.php?Token=${params.row.Hashtoken}`,
                            })
                          );
                          dispatch(
                            getMail({
                              Templateid: "ET_005",
                              RecordID: params.row.RecordID,
                              UserName: "Trinity",
                            })
                          );
                        }}
                      >
                        <EmailIcon />
                      </IconButton>
                    ) : (
                      false
                    )}
                    {/* {AccessID == "TR087" ?
                 <IconButton component="a"  href={`${store.getState().globalurl.pdfurl}productpackinglist.php?`} target="_blank" 
                 rel="noreferrer"  color="info" size="small" ><PrintOutlinedIcon/>
                 </IconButton>
                :false} */}

                    {AccessID == "TR074" ? (
                      params.row.Complete == "N" ? (
                        <Box>
                          <Link
                            to={`./Editbatchissue/${params.row.RecordID}/E`}
                          >
                            <Tooltip title="Issue">
                              <IconButton color="info" size="small">
                                <ListAltOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>

                          <Link
                            to={`./Editbatchcompletion/${params.row.RecordID}/E`}
                          >
                            <Tooltip title="Completion">
                              <IconButton color="error" size="small">
                                <ListAltOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>
                        </Box>
                      ) : (
                        <Box>
                          <Tooltip title="Batch Completed">
                            <IconButton color="success" size="small">
                              <CheckCircleOutlineIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )
                    ) : (
                      false
                    )}

                    {AccessID == "TR074" ? (
                      params.row.parentID == "CC" &&
                      params.row.Process == "Y" ? (
                        <Tooltip title="Print ">
                          <IconButton
                            component="a"
                            href={`${
                              store.getState().globalurl.pdfurl
                            }BATCHCC.php?Token=${params.row.Hashtoken}`}
                            target="_blank"
                            rel="noreferrer"
                            color="info"
                            size="small"
                          >
                            <PrintOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        false
                      )
                    ) : (
                      false
                    )}
                    {AccessID == "TR074" ? (
                      params.row.parentID == "PC" &&
                      params.row.Process == "Y" ? (
                        <Tooltip title="Print">
                          <IconButton
                            component="a"
                            href={`${
                              store.getState().globalurl.pdfurl
                            }BATCHPROD.php?Token=${params.row.Hashtoken}`}
                            target="_blank"
                            rel="noreferrer"
                            color="info"
                            size="small"
                          >
                            <PrintOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        false
                      )
                    ) : (
                      false
                    )}
                    {AccessID == "TR074" ? (
                      params.row.parentID == "PK" &&
                      params.row.Process == "Y" ? (
                        <Tooltip title="Print">
                          <IconButton
                            component="a"
                            href={`${
                              store.getState().globalurl.pdfurl
                            }BATCHPACK.php?Token=${params.row.Hashtoken}`}
                            target="_blank"
                            rel="noreferrer"
                            color="info"
                            size="small"
                          >
                            <PrintOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        false
                      )
                    ) : (
                      false
                    )}
                    {AccessID == "TR155" ? (
                         <Tooltip title="Print">
                          <IconButton
                            component="a"
                            href={`${
                              store.getState().globalurl.pdfurl
                            }openpurchaseorder.php?Token=${params.row.Hashtoken}`}
                            target="_blank"
                            rel="noreferrer"
                            color="info"
                            size="small"
                          >
                            <PrintOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                    ) : null}
                      {AccessID == "TR152" ? (
                         <Tooltip title="Print">
                          <IconButton
                            component="a"
                            href={`${
                              store.getState().globalurl.pdfurl
                            }purchaseorder.php?Token=${params.row.Hashtoken}`}
                            target="_blank"
                            rel="noreferrer"
                            color="info"
                            size="small"
                          >
                            <PrintOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                    ) : null}
                    {AccessID == "TR074" &&
                    params.row.parentID == "CC" &&
                    params.row.Process == "Y" ? (
                      <Tooltip title="Email">
                        <IconButton
                          color="info"
                          size="small"
                          onClick={() => {
                            dispatch(
                              mailOpen({
                                row: params.row,
                                link: `${
                                  store.getState().globalurl.pdfurl
                                }BATCHCC.php?Token=${params.row.Hashtoken}`,
                              })
                            );
                            dispatch(
                              getMail({
                                Templateid: "ET_013",
                                RecordID: params.row.RecordID,
                                UserName: "Trinity",
                              })
                            );
                          }}
                        >
                          <EmailIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                    {AccessID == "TR074" &&
                    params.row.parentID == "PC" &&
                    params.row.Process == "Y" ? (
                      <Tooltip title="Email">
                        <IconButton
                          color="info"
                          size="small"
                          onClick={() => {
                            dispatch(
                              mailOpen({
                                row: params.row,
                                link: `${
                                  store.getState().globalurl.pdfurl
                                }BATCHPROD.php?Token=${params.row.Hashtoken}`,
                              })
                            );
                            dispatch(
                              getMail({
                                Templateid: "ET_014",
                                RecordID: params.row.RecordID,
                                UserName: "Trinity",
                              })
                            );
                          }}
                        >
                          <EmailIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                    {AccessID == "TR074" &&
                    params.row.parentID == "PK" &&
                    params.row.Process == "Y" ? (
                      <Tooltip title="Email">
                        <IconButton
                          color="info"
                          size="small"
                          onClick={() => {
                            dispatch(
                              mailOpen({
                                row: params.row,
                                link: `${
                                  store.getState().globalurl.pdfurl
                                }BATCHPACK.php?Token=${params.row.Hashtoken}`,
                              })
                            );
                            dispatch(
                              getMail({
                                Templateid: "ET_015",
                                RecordID: params.row.RecordID,
                                UserName: "Trinity",
                              })
                            );
                          }}
                        >
                          <EmailIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}



                    {AccessID == "TR048" ? (
                      <Box>
                      <Link
                        to={`./EditIssue/${params.row.RecordID}/${params.row.MaterialDescription}/${params.row.ItemType}/${params.row.HeaderQty}/E`}
                      >
                        <Tooltip title="Issue">
                          <IconButton color="info" size="small">
                            <SummarizeOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                       {/* <Link
                       to={`./EditIssue/${params.row.RecordID}/${params.row.MaterialDescription}/${params.row.ItemType}/${params.row.HeaderQty}/E`}
                     > */}
                       <Tooltip title="Alter Material">
                        {/* //here change */}
                       <IconButton onClick={()=>dispatch(productionlookupOpen({materialRecID:params.row.MtlRecordID,productionCardID:params.row.PcdhRecordID}))} color="info" size="small">
                           <OpenInBrowserOutlinedIcon />
                         </IconButton>
                       </Tooltip>
                       {params.row.Colourflag == "Y" ?  (
                       <Tooltip title="Alter Color">
                        {/* //here change */}
                       <IconButton onClick={()=>dispatch(productionColorlookupOpen({materialRecID:params.row.MtlRecordID}))} color="info" size="small">
                           <OpenInBrowserOutlinedIcon  color="warning"/>
                         </IconButton>
                       </Tooltip>
                       ) : (
                        false
                       )}
                     {/* </Link> */}
                     </Box>
                    ) : (
                      false
                    )}
                    
                    {/* {AccessID == "TR048" ?
        
                    
                   params.row.Type =="M"?
                    <Tooltip title="Indent">
                    <IconButton color="info" size="small"  onClick={()=>dispatch(PurchaseIndent({RecordID:params.row.RecordID}))}>
                       <ReceiptLongIcon />
                    </IconButton>
                  </Tooltip>
                  :false

                 
                :false} */}
                    {/* INDENT ITEM --- PRODUCTION CARD */}
                    {AccessID == "TR118" ? (
                      <Link
                        to={`./${params.row.ChildID}/${params.row.ChildName}/PC/${params.row.RecordID}/${params.row.Type}`}
                      >
                        <Tooltip title="Edit">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR119" ? (
                      <Tooltip title="Indent Order">
                        <IconButton
                          color="info"
                          size="small"
                          onClick={indentOrderSave(
                            "insert",
                            indentRecID,
                            params.row.SupplierID,
                            params.row.parentID,
                            
                          )}
                        >
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      false
                    )}
                    {AccessID == "TR003" ? (
                      <Link
                        to={`/Apps/Secondarylistview/TR004/List%20of%20Materials/${params.row.RecordID}/${params.row.parentID}/${params.row.Name}/${params.row.SearchPhrase}/pm`}
                      >
                        <Tooltip title="Material">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR001" ? (
                      <Link
                        to={`/Apps/Secondarylistview/TR050/List of BOM/${params.row.RecordID}/${params.row.ProductDescription}/${params.row.Description}/all-bom/${params.row.parentID}`}
                      >
                        <Tooltip title="List of BOM">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}

                    {/* {AccessID == "TR079" ?
                     <Link to={`/Apps/Secondarylistview/TR080/Material Master/${params.row.RecordID}`}>
                     <Tooltip title="Material Master">
                       <IconButton color="info" size="small">
                         <ReceiptLongIcon />
                       </IconButton>
                     </Tooltip>
                 </Link>
                :false} */}
                    {AccessID == "TR001" ? (
                      <Link
                        to={`/Apps/TR069/Editproductstock/${params.row.RecordID}/${params.row.ModelCode}/${params.row.Description}/E`}
                      >
                        <Tooltip title="Stock">
                          <IconButton color="error" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR004" ? (
                      params.row.STKType != "S" ? (
                        <Link to={`./Editstock/${params.row.RecordID}/E`}>
                          <Tooltip title="Stock">
                            <IconButton color="info" size="small">
                              <ListAltOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      ) : (
                        false
                      )
                    ) : (
                      false
                    )}

                    {AccessID == "TR002" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.RecordID}/${params.row.Name}`}
                      >
                        <Tooltip title="Products">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR147" ? (
                      <Link
                        to={`/Apps/Secondarylistview/TR148/Job Work/${params.row.RecordID}/${params.row.Name}`}
                      >
                        <Tooltip title="Jobwork">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    
                    {AccessID == "TR010" ? (
                      <Link
                        to={`./Edit${screenName}/${params.row.RecordID}/E/${0}`}
                      >
                        <Tooltip title="Edit">
                          <IconButton color="info" size="small">
                            <ModeEditOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}

                    {AccessID == "TR010" ? (
                      <Link
                        to={`./Edit${screenName}/${params.row.RecordID}/E/${2}`}
                      >
                        <Tooltip title="Customer Products">
                          <IconButton color="info" size="small">
                            <WysiwygIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR010" ? (
                      <Link
                        to={`/Apps/TR400/Editcustomerlinechart/EditCustomer Line Chart/${params.row.RecordID}/E`}
                      >
                        <Tooltip title="Customer Analysis">
                          <IconButton color="info" size="small">
                            <AssessmentIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}

                    {/* {AccessID == "TR011" ?
                   <Link to={`/Apps/product-analysis/${params.row.CustRecordID}/E`}>
                   <Tooltip title="Customer Analysis">
                     <IconButton color="info" size="small"  >
                       <AssessmentIcon />
                     </IconButton>title={ params.row.Process == "Y" ? 'INVOICE' : 'DARFT INVOICE'}
                   </Tooltip>
                 </Link>
                :false} */}
                {params.row.InvType == "SI" && AccessID == "TR011" &&  params.row.Print == "Y"   ? (<Tooltip title={ params.row.Process == "Y" ? 'INVOICE' : 'DARFT INVOICE'}>
                            <IconButton
                              component="a"
                              href={`${
                                store.getState().globalurl.pdfurl
                              }sampleinvoice.php?Token=${params.row.Hashtoken}`}
                              target="_blank"
                              rel="noreferrer"
                              color="info"
                              size="small"
                            >
                              <PrintOutlinedIcon />
                            </IconButton>
                          </Tooltip>) : false }

                          {params.row.InvType == "FI" && AccessID == "TR011" &&  params.row.parentID == "P" &&  params.row.Print == "Y"   ? (
                            <Tooltip title={ params.row.Process == "Y" ? 'INVOICE' : 'DARFT INVOICE'}>
                            <IconButton
                              component="a"
                              href={`${
                                store.getState().globalurl.pdfurl
                              }finalreport.php?Token=${params.row.Hashtoken}`}
                              target="_blank"
                              rel="noreferrer"
                              color="info"
                              size="small"
                            >
                              <PrintOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        ) : false } 

                       {params.row.InvType == "FI" && AccessID == "TR011" &&  params.row.parentID == "L" &&  params.row.Print == "Y"    ? (
                          <Tooltip title={ params.row.Process == "Y" ? 'INVOICE' : 'DARFT INVOICE'}>
                          <IconButton
                            component="a"
                            href={`${
                              store.getState().globalurl.pdfurl
                            }leatherinvoice.php?Token=${
                              params.row.Hashtoken
                            }`}
                            target="_blank"
                            rel="noreferrer"
                            color="info"
                            size="small"
                          >
                            <PrintOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                        ) : false } 
                         {params.row.InvType == "PI" && AccessID == "TR011" &&  params.row.parentID == "P" &&  params.row.Print == "Y"   ? (
                          <>
                        <Tooltip title={ params.row.Process == "Y" ? 'INVOICE' : 'DARFT INVOICE'}>
                            <IconButton
                              component="a"
                              href={`${
                                store.getState().globalurl.pdfurl
                              }report.php?Token=${params.row.Hashtoken}`}
                              target="_blank"
                              rel="noreferrer"
                              color="info"
                              size="small"
                            >
                              <PrintOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Leather Consumption">
                            <IconButton
                              component="a"
                              href={`${
                                store.getState().globalurl.pdfurl
                              }leatherconsumption.php?Token=${params.row.Hashtoken}`}
                              target="_blank"
                              rel="noreferrer"
                              color="info"
                              size="small"
                            >
                              <PrintOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        
                        </>
                        ) : false } 

                    {/* {AccessID == "TR011" ? (
                      params.row.Process == "Y" ? (
                        params.row.InvType == "SI" ? (
                          <Tooltip title="Print">
                            <IconButton
                              component="a"
                              href={`${
                                store.getState().globalurl.pdfurl
                              }sampleinvoice.php?Token=${params.row.Hashtoken}`}
                              target="_blank"
                              rel="noreferrer"
                              color="info"
                              size="small"
                            >
                              <PrintOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        ) : params.row.InvType == "FI" &&
                          params.row.parentID == "P" ? (
                          <Tooltip title="Print">
                            <IconButton
                              component="a"
                              href={`${
                                store.getState().globalurl.pdfurl
                              }finalreport.php?Token=${params.row.Hashtoken}`}
                              target="_blank"
                              rel="noreferrer"
                              color="info"
                              size="small"
                            >
                              <PrintOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        ) : params.row.parentID == "L" &&
                          params.row.InvType == "FI" &&
                          params.row.Process == "Y" ? (
                          <Tooltip title="Print">
                            <IconButton
                              component="a"
                              href={`${
                                store.getState().globalurl.pdfurl
                              }leatherinvoice.php?Token=${
                                params.row.Hashtoken
                              }`}
                              target="_blank"
                              rel="noreferrer"
                              color="info"
                              size="small"
                            >
                              <PrintOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        ) : (<>
                        <Tooltip title="Print">
                            <IconButton
                              component="a"
                              href={`${
                                store.getState().globalurl.pdfurl
                              }report.php?Token=${params.row.Hashtoken}`}
                              target="_blank"
                              rel="noreferrer"
                              color="info"
                              size="small"
                            >
                              <PrintOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Leather Consumption">
                            <IconButton
                              component="a"
                              href={`${
                                store.getState().globalurl.pdfurl
                              }leatherconsumption.php?Token=${params.row.Hashtoken}`}
                              target="_blank"
                              rel="noreferrer"
                              color="info"
                              size="small"
                            >
                              <PrintOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        
                        </>
                          
                        )
                      ) : (
                        false
                      )
                    ) : (
                      false
                    )} */}

                    {AccessID == "TR011" &&
                    params.row.InvType == "PI" &&
                    params.row.Process == "Y" ? (
                      <Tooltip title="Email">
                        <IconButton
                          color="info"
                          size="small"
                          onClick={() => {
                            dispatch(
                              mailOpen({
                                row: params.row,
                                link: `${
                                  store.getState().globalurl.pdfurl
                                }report.php?Token=${params.row.Hashtoken}
                              }`,
                              })
                            );
                            dispatch(
                              getMail({
                                Templateid: "ET_001",
                                RecordID: params.row.RecordID,
                                UserName: "Trinity",
                              })
                            );
                          }}
                        >
                          <EmailIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                    {AccessID == "TR011" &&
                    params.row.InvType == "SI" &&
                    params.row.Process == "Y" ? (
                      <Tooltip title="Email">
                        <IconButton
                          color="info"
                          size="small"
                          onClick={() => {
                            dispatch(
                              mailOpen({
                                row: params.row,
                                link: `${
                                  store.getState().globalurl.pdfurl
                                }sampleinvoice.php?Token=${params.row.Hashtoken}
                              }`,
                              })
                            );
                            dispatch(
                              getMail({
                                Templateid: "ET_003",
                                RecordID: params.row.RecordID,
                                UserName: "Trinity",
                              })
                            );
                          }}
                        >
                          <EmailIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                    {AccessID == "TR011" &&
                    params.row.parentID == "P" &&
                    params.row.InvType == "FI" &&
                    params.row.Process == "Y" ? (
                      <Box>
                      <Tooltip title="Email">
                        <IconButton
                          color="info"
                          size="small"
                          onClick={() => {
                            dispatch(
                              mailOpen({
                                row: params.row,
                                link: `${
                                  store.getState().globalurl.pdfurl
                                }report.php?Token=${params.row.Hashtoken}
                              }`,
                              })
                            );
                            dispatch(
                              getMail({
                                Templateid: "ET_002",
                                RecordID: params.row.RecordID,
                                UserName: "Trinity",
                              })
                            );
                          }}
                        >
                          <EmailIcon />
                        </IconButton>
                      </Tooltip>
                       <Link
                       to={`./Editpostshipment/${params.row.RecordID}/E`}
                     >
                       <Tooltip title="Post Shipment">
                         <IconButton color="primary">
                           <ListAltOutlinedIcon />
                         </IconButton>
                       </Tooltip>
                     </Link>
                     </Box>
                    ) : null}
                    {AccessID == "TR011" &&
                    params.row.parentID == "L" &&
                    params.row.InvType == "FI" &&
                    params.row.Process == "Y" ? (
                      <Tooltip title="Email">
                        <IconButton
                          color="info"
                          size="small"
                          onClick={() => {
                            dispatch(
                              mailOpen({
                                row: params.row,
                                link: `${
                                  store.getState().globalurl.pdfurl
                                }leatherinvoice.php?Token=${
                                  params.row.Hashtoken
                                }
                              }`,
                              })
                            );
                            dispatch(
                              getMail({
                                Templateid: "ET_012",
                                RecordID: params.row.RecordID,
                                UserName: "Trinity",
                              })
                            );
                          }}
                        >
                          <EmailIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}

                    {AccessID == "TR084" ? (
                      params.row.Process == "Y" &&
                      params.row.parentID == "PL" ? (
                        <Tooltip title="Print">
                          <IconButton
                            component="a"
                            href={`${
                              store.getState().globalurl.pdfurl
                            }domesticinvoice.php?Token=${params.row.Hashtoken}`}
                            target="_blank"
                            rel="noreferrer"
                            color="info"
                            size="small"
                            download={true}
                          >
                            <PrintOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      ) : params.row.Process == "Y" &&
                        params.row.parentID == "LL" ? (
                        <Tooltip title="Print">
                          <IconButton
                            component="a"
                            href={`${
                              store.getState().globalurl.pdfurl
                            }leatherdomesticinvoice.php?Token=${
                              params.row.Hashtoken
                            }`}
                            target="_blank"
                            rel="noreferrer"
                            color="info"
                            size="small"
                          >
                            <PrintOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        false
                      )
                    ) : (
                      false
                    )}
                    {AccessID == "TR084" &&
                    params.row.Process == "Y" &&
                    params.row.parentID == "PL" ? (
                      <Tooltip title="Email">
                        <IconButton
                          color="info"
                          size="small"
                          onClick={() => {
                            dispatch(
                              mailOpen({
                                row: params.row,
                                link: `${
                                  store.getState().globalurl.pdfurl
                                }domesticinvoice.php?Token=${
                                  params.row.Hashtoken
                                }`,
                              })
                            );
                            dispatch(
                              getMail({
                                Templateid: "ET_004",
                                RecordID: params.row.RecordID,
                                UserName: "Trinity",
                              })
                            );
                          }}
                        >
                          <EmailIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                    {AccessID == "TR084" &&
                    params.row.Process == "Y" &&
                    params.row.parentID == "LL" ? (
                      <Tooltip title="Email">
                        <IconButton
                          color="info"
                          size="small"
                          onClick={() => {
                            dispatch(
                              mailOpen({
                                row: params.row,
                                link: `${
                                  store.getState().globalurl.pdfurl
                                }leatherdomesticinvoice.php?Token=${
                                  params.row.Hashtoken
                                }`,
                              })
                            );
                            dispatch(
                              getMail({
                                Templateid: "ET_004",
                                RecordID: params.row.RecordID,
                                UserName: "Trinity",
                              })
                            );
                          }}
                        >
                          <EmailIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}

                    {params.row.ImgApp == "Y" ? (
                      AccessID == "TR002" ? (
                        <Link
                          to={`/Apps/${screenName}/imageupload/${AccessID}/${params.row.RecordID}`}
                        >
                          <Tooltip title="Image upload">
                            <IconButton color="info" size="small">
                              <AddPhotoAlternateIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      ) : AccessID == "TR009" ? (
                        <Link
                          to={`/Apps/${screenName}/imageupload/${AccessID}/${params.row.RecordID}`}
                        >
                          <Tooltip title="Image upload">
                            <IconButton color="info" size="small">
                              <AddPhotoAlternateIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      ) : AccessID == "TR010" ? (
                        <Link
                          to={`/Apps/${screenName}/imageupload/${AccessID}/${params.row.RecordID}`}
                        >
                          <Tooltip title="Image upload">
                            <IconButton color="info" size="small">
                              <AddPhotoAlternateIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      ) : AccessID == "TR027" ? (
                        <Box>
                        <Link
                          to={`/Apps/${screenName}/imageupload/${AccessID}/${params.row.RecordID}`}
                        >
                          <Tooltip title="Image upload">
                            <IconButton color="info" size="small">
                              <AddPhotoAlternateIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                        <Link
                        to={`/Apps/Secondarylistview/TR123/Check In/${params.row.RecordID}`}
                      >
                        <Tooltip title="Check In">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                      <Link
                        to={`/Apps/Secondarylistview/TR124/Check Out/${params.row.RecordID}`}
                      >
                        <Tooltip title="Check Out">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                      <Link
                        to={`/Apps/TR027/Employees/EditEmpfinance entry/E/${params.row.RecordID}/${params.row.Name}`}
                      >
                        <Tooltip title="Finance Entry">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                      </Box>
                      )  : AccessID == "TR003" ? (
                        <Link
                          to={`/Apps/Secondarylistview/${AccessID}/${screenName}/${params.row.parentID}/EditMaterial Category/imageupload/${params.row.RecordID}`}
                        >
                          <Tooltip title="Image upload">
                            <IconButton color="info" size="small">
                              <AddPhotoAlternateIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      ) : AccessID == "TR004" ? (
                        <Link
                          to={`/Apps/Secondarylistview/${AccessID}/${screenName}/${params.row.parentID}/${params.row.Type}/${params.row.parentName}/${params.row.SearchPhrase}/imageupload/${params.row.RecordID}`}
                        >
                          <Tooltip title="Image upload">
                            <IconButton color="info" size="small">
                              <AddPhotoAlternateIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      ) : AccessID == "TR001" ? (
                        <Link
                          to={`/Apps/Secondarylistview/${AccessID}/${screenName}/${params.row.parentID}/${params.row.ProductDescription}/imageupload/${params.row.RecordID}`}
                        >
                          <Tooltip title="Image upload">
                            <IconButton color="info" size="small">
                              <AddPhotoAlternateIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      ) : (
                        false
                      )
                    ) : (
                      ""
                    )}
                  </Stack>
                );
              },
            };
          }
          if (AccessID == "TR047") {
            const obj = {
              field: "Status",
              headerName: "",
              headerAlign: "center",
              sortable: false,
              filterable: false,
              disableColumnMenu: true,
              minWidth: 100,
              maxWidth: 100,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Stack direction="row">
                    {params.row.Startdate == "" ? (
                      <Link>
                        <Tooltip title="Not yet Started">
                          <IconButton color="success">
                            <PlayCircleOutlineOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : params.row.Startdate != "" &&
                      params.row.Completeddate == "" ? (
                      <Box>
                        {params.row.Pausedate == "" ? (
                          <Link>
                            <Tooltip
                              title={params.row.Pausedate || "Inprogress"}
                            >
                              <IconButton color="primary">
                                <NotStartedOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>
                        ) : params.row.ContinueDate == "" ? (
                          <Link>
                            <Tooltip title="Inprogress">
                              <IconButton color="primary">
                                <NotStartedOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>
                        ) : (
                          false
                        )}
                        <Link>
                          
                        </Link>
                      </Box>
                    ) : (
                      <Link>
                        <Tooltip title="Completed">
                          <IconButton color="success">
                            <TaskAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    )}
                  </Stack>
                );
              },
            };
            listviewData.Data.columns.splice(2, 0, obj);
          }

          listviewData.Data.columns.push(obj);

          dispatch(
            Success({
              columndata: listviewData.Data.columns,
              rowdata: listviewData.Data.rows,
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
