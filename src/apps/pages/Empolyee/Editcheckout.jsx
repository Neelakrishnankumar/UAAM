import {
  TextField,
  Box,
  Typography,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  FormControlLabel,
  Tooltip,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { Field, Formik } from "formik";
import { CheckBox } from "@mui/icons-material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { gradeSchema } from "../../Security/validation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  fetchApidata,
  getFetchData,
  postApidata,
  postData,
} from "../../../store/reducers/Formapireducer";
import React, { useState, useEffect, useRef } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import {  HsnSchema } from "../../Security/validation";
import Popup from "../popup";
import Listviewpopup from "../Lookup";
// import CryptoJS from "crypto-js";
const Editcheckout = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  console.log("🚀 ~ file: Editcheckout.jsx:45 ~ Editcheckout ~ params:", params)
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  const data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const { toggleSidebar, broken, rtl } = useProSidebar();
   const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const location = useLocation();
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  const style = {
    height: "55px",
    border: "2px solid #1769aa ",
    borderRadius: "5px",
    backgroundColor: "#EDEDED",
  };

  // *************** INITIALVALUE  *************** //

  const InitialValue = {
    checkouttype: data.CheckOutType,
    date: data.CheckOutDate,
    comment: data.CheckOutComment,
    checkouttime: data.CheckOutTime,
  };

  const Fnsave = async (values) => {
    let action = mode === "A" ? "insert" : "update";

    const idata = {
      RecordID: recID,
      CheckOutType: values.checkouttype,
      CheckOutDate: values.date,
      CheckOutComment: values.comment,
      EmployeeID: selectEMPLOYEELookupData.EMPLOYEElookupRecordid,
      LocationRecID: locationLookup.locationRecordID,
      GateRecID: gateLookup.gateRecordID,
      CheckOutTime: values.checkouttime,
      Finyear,
      CompanyID,
    };

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate("/Apps/TR124/Check Out");
    } else {
      toast.error(response.payload.Msg);
    }
  };
  const [isPopupData, setisPopupdata] = React.useState(false);
  const [selectEMPLOYEELookupData, setselectEMPLOYEELookupData] =
    React.useState({
      EMPLOYEElookupRecordid: "",
      EMPLOYEElookupCode: "",
      EMPLOYEElookupDesc: "",
    });
  const [locationLookup, SetLocationLookup] = useState({
    locationRecordID: "",
    locationCode: "",
    locationName: "",
  });
  const [gateLookup, SetGateLookup] = useState({
    gateRecordID: "",
    gateCode: "",
    gateName: "",
  });
  if (isPopupData == false) {
    selectEMPLOYEELookupData.EMPLOYEElookupRecordid = data.EmployeeID;
    selectEMPLOYEELookupData.EMPLOYEElookupCode = data.EmployeeCode;
    selectEMPLOYEELookupData.EMPLOYEElookupDesc = data.EmployeeName;

    //Location
    locationLookup.locationRecordID = data.LocationRecID;
    locationLookup.locationCode = data.LocationCode;
    locationLookup.locationName = data.LocationName;

    //Gate
    gateLookup.gateRecordID = data.GateRecID;
    gateLookup.gateCode = data.GateCode;
    gateLookup.gateName = data.GateName;
  }

  const [openEMPLOYEEPopup, setOpenEMPLOYEEPopup] = useState(false);
  const [openLOCATIONPopup, setOpenLOCATIONPopup] = useState(false);
  const [openGATEPopup, setOpenGATEPopup] = useState(false);
  function handleShow(type) {
    if (type == "EMPLOYEE") {
      setOpenEMPLOYEEPopup(true);
    }
    if (type == "LOCATION") {
      setOpenLOCATIONPopup(true);
    }
    if (type == "GATE") {
      setOpenGATEPopup(true);
    }
  }
  /************************** Lookup value assign type based Function *****************/
  const childToParent = (childdata, type) => {
    console.log("type---" + type);
    console.log("Data---" + JSON.stringify(childdata));

    if (type == "Employee") {
      setisPopupdata(true);
      setselectEMPLOYEELookupData({
        EMPLOYEElookupRecordid: childdata.RecordID,
        EMPLOYEElookupCode: childdata.Code,
        EMPLOYEElookupDesc: childdata.Name,
      });
      setOpenEMPLOYEEPopup(false);
    }
    if (type == "Location") {
      setisPopupdata(true);
      SetLocationLookup({
        locationCode: childdata.Code,
        locationName: childdata.Name,
        locationRecordID: childdata.RecordID,
      });
      // console.log(locationLookup)
      setOpenLOCATIONPopup(false);
    }
    if (type == "Gate") {
      setisPopupdata(true);
      SetGateLookup({
        gateRecordID: childdata.RecordID,
        gateCode: childdata.Code,
        gateName: childdata.Name,
      });

      setOpenGATEPopup(false);
    }
  };
  const fnLogOut = (props) => {
    Swal.fire({
      title: `Do you want ${props}?`,
      // text:data.payload.Msg,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: props,
    }).then((result) => {
      if (result.isConfirmed) {
        if (props === "Logout") {
          navigate("/");
        }
        if (props === "Close") {
          navigate("/Apps/TR124/Check Out");
        }
      } else {
        return;
      }
    });
  };
  return (
    <React.Fragment>
      {getLoading ? <LinearProgress /> : false}
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box display="flex" borderRadius="3px" alignItems="center">
          {broken && !rtl && (
            <IconButton onClick={() => toggleSidebar()}>
              <MenuOutlinedIcon />
            </IconButton>
          )}
          <Typography variant="h3">Check Out</Typography>
        </Box>
        <Box display="flex">
          <Tooltip title="Close">
            <IconButton onClick={() => fnLogOut("Close")} color="error">
              <ResetTvIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton color="error" onClick={() => fnLogOut("Logout")}>
              <LogoutOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {!getLoading ? (
        <Box m="20px">
          <Formik
            initialValues={InitialValue}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                Fnsave(values);
              }, 100);
            }}
            //  validationSchema={ HsnSchema}
            enableReinitialize={true}
          >
            {({
              errors,
              touched,
              handleBlur,
              handleChange,
              isSubmitting,
              values,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(4 , minMax(0,1fr))"
                  gap="30px"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <FormControl sx={{ gridColumn: "span 2", display: "flex" }}>
                    <FormControl
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="ID"
                        variant="filled"
                        value={selectEMPLOYEELookupData.EMPLOYEERecordID}
                        focused
                        sx={{ display: "none" }}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Employee Id"
                        variant="filled"
                        value={selectEMPLOYEELookupData.EMPLOYEElookupCode}
                        focused
                        required
                        inputProps={{ tabIndex: "-1" }}
                      />
                      <IconButton
                        sx={{ height: 40, width: 40 }}
                        //  onClick={() => handleShow("EMPLOYEE")}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>
                      {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                      <TextField
                        id="outlined-basic"
                        label=""
                        variant="filled"
                        value={selectEMPLOYEELookupData.EMPLOYEElookupDesc}
                        fullWidth
                        inputProps={{ tabIndex: "-1" }}
                        focused
                      />
                    </FormControl>
                  </FormControl>
                  <FormControl
                    sx={{
                      gridColumn: "span 2",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="ID"
                      variant="filled"
                      value={locationLookup.locationRecordID}
                      focused
                      sx={{ display: "none" }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Location"
                      variant="filled"
                      value={locationLookup.locationCode}
                      focused
                      required
                      DESIGN
                      inputProps={{ tabIndex: "-1" }}
                    />
                    {/* <Button  variant='contained'  sx={{height:'30px',width:'30px',mt:'9px'}} > */}
                    {/* <MoreHorizIcon onClick={()=>handleShow('DE')} color='white' sx={{height:'30px',}} mt='15px' fontSize='medium' /> */}
                    {/* </Button> */}
                    <IconButton
                      sx={{ height: 40, width: 40 }}
                      onClick={() => handleShow("LOCATION")}
                    >
                      <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                    </IconButton>
                    <TextField
                      id="outlined-basic"
                      label=""
                      variant="filled"
                      value={locationLookup.locationName}
                      fullWidth
                      focused
                      inputProps={{ tabIndex: "-1" }}
                    />
                  </FormControl>
                  <FormControl
                    sx={{
                      gridColumn: "span 2",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="ID"
                      variant="filled"
                      value={gateLookup.gateRecordID}
                      focused
                      sx={{ display: "none" }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Gate"
                      variant="filled"
                      value={gateLookup.gateCode}
                      focused
                      required
                      DESIGN
                      inputProps={{ tabIndex: "-1" }}
                    />
                    {/* <Button  variant='contained'  sx={{height:'30px',width:'30px',mt:'9px'}} > */}
                    {/* <MoreHorizIcon onClick={()=>handleShow('DE')} color='white' sx={{height:'30px',}} mt='15px' fontSize='medium' /> */}
                    {/* </Button> */}
                    <IconButton
                      sx={{ height: 40, width: 40 }}
                      onClick={() => handleShow("GATE")}
                    >
                      <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                    </IconButton>
                    <TextField
                      id="outlined-basic"
                      label=""
                      variant="filled"
                      value={gateLookup.gateName}
                      fullWidth
                      focused
                      inputProps={{ tabIndex: "-1" }}
                    />
                  </FormControl>
                  <TextField
                    name="date"
                    type="date"
                    id="date"
                    label="Check Out Date"
                    variant="filled"
                    focused
                    inputFormat="YYYY-MM-DD"
                    value={values.date}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.date && !!errors.date}
                    helperText={touched.date && errors.date}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <FormControl
                    focused
                    variant="filled"
                    sx={{ gridColumn: "span 2" }}
                  >
                    <InputLabel id="status">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="checkouttype"
                      name="checkouttype"
                      value={values.checkouttype}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <MenuItem value="R">Regular</MenuItem>
                      <MenuItem value="L">Late</MenuItem>
                      <MenuItem value="P">Permission</MenuItem>
                      <MenuItem value="O">Onduty</MenuItem>
                      <MenuItem value="V">Leave</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    name="checkouttime"
                    type="time"
                    id="checkouttime"
                    label="Check Out Time"
                    inputFormat="HH:mm:aa"
                    value={values.checkouttime}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    focused
                    sx={{ gridColumn: "span 2" }}
                    variant="filled"
                  />
                  <TextField
                    name="comment"
                    type="text"
                    id="comment"
                    label="Check Out Comment"
                    variant="filled"
                    focused
                    value={values.comment}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.comment && !!errors.comment}
                    helperText={touched.comment && errors.comment}
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                  {YearFlag == "true" ? (
                    <LoadingButton
                      color="secondary"
                      variant="contained"
                      type="submit"
                      loading={isLoading}
                    >
                      Save
                    </LoadingButton>
                  ) : (
                    <Button
                      color="secondary"
                      variant="contained"
                      disabled={true}
                    >
                      Save
                    </Button>
                  )}
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => {
                      navigate("/Apps/TR124/Check Out");
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          <Popup
            title="Employee"
            openPopup={openEMPLOYEEPopup}
            setOpenPopup={setOpenEMPLOYEEPopup}
          >
            <Listviewpopup
              accessID="2024"
              screenName="Employee"
              childToParent={childToParent}
            />
          </Popup>
          <Popup
            title="Location"
            openPopup={openLOCATIONPopup}
            setOpenPopup={setOpenLOCATIONPopup}
          >
            <Listviewpopup
              accessID="2051"
              screenName="Location"
              childToParent={childToParent}
            />
          </Popup>
          <Popup
            title="Gate"
            openPopup={openGATEPopup}
            setOpenPopup={setOpenGATEPopup}
          >
            <Listviewpopup
              accessID="2050"
              screenName="Gate"
              childToParent={childToParent}
            />
          </Popup>
        </Box>
      ) : (
        false
      )}
    </React.Fragment>
  );
};

export default Editcheckout;
