import {
  Typography,
  Box,
  Button,
  TextField,
  Stack,
  IconButton,
  Avatar,
  Menu,
  FormControl,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormGroup,
  RadioGroup,
  Radio,
  FormLabel,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import { Formik, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../index";
import {
  fetchApidata,
  getFetchData,
  postApidata,
  postData,
} from "../../../store/reducers/Formapireducer";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import {deptSchema} from "../../Security/validation";
import wallet from "../../../assets/img/wallet.jpg";
import Topbar from "../../../ui-components/global/Topbar";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// ***********************************************
//  Developer:Gowsalya
// Purpose:To Create Department

// ***********************************************
const Editdept = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  const Data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.loading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const location = useLocation();
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  const [ini, setIni] = useState(true);
  const [loading, setLoading] = useState(false);
  var apiData = "";
  apiData = {
    Code: Data.Code,
    Name: Data.Name,
    Loc: Data.Loc,
    SortOrder: Data.SortOrder,
    Disable: Data.Disable,
  };
  //*******Assign Department values from Database in  Yup initial value******* */
  const initialValues = {
    Code: apiData.Code,
    Name: apiData.Name,
    Loc: apiData.Loc,
    SortOrder: apiData.SortOrder,
    checkbox: Data.Disable === "Y" ? true : false,
  };
  // **********Save Function*****************
  const fnSave = async (values) => {
    setLoading(true);
    setIni(false);
    if (values.Code == "") {
      toast.error("Please Enter Code");
      return;
    }
    if (values.Name == "") {
      toast.error("Please Enter Description");
      return;
    }
    var isCheck = "N";
    if (values.checkbox == true) {
      isCheck = "Y";
    }
    console.log(values);

    var idata = {
      RecordID: recID,
      Name: values.Name,
      Code: values.Code,
      Loc: values.Loc,
      SortOrder: values.SortOrder,
      Disable: values.checkbox === true ? "Y" : "N",
      Finyear,
      CompanyID,
    };
    // var type = "";

    // if (mode == "A") {
    //   type = "insert";
    // } else {
    //   type = "update";
    // }

    // const data = await dispatch(postApidata(accessID, type, idata));
    let action = mode === "A" ? "insert" : "update";
    const data = await dispatch(postData({ accessID, action, idata }));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      setLoading(false);
      navigate(`/Apps/TR026/Department`);
    } else {
      toast.error(data.payload.Msg);
      setLoading(false);
    }
  };

  const ref = useRef(null);
  const fnLogOut = (props) => {
    //   if(Object.keys(ref.current.touched).length === 0){
    //     if(props === 'Logout'){
    //       navigate("/")}
    //       if(props === 'Close'){
    //         navigate("/Apps/TR022/Bank Master")
    //       }

    //       return
    //  }
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
          navigate("/Apps/TR026/Department");
        }
      } else {
        return;
      }
    });
  };
  //  console.log("dept",deptSchema);
  return (
    <React.Fragment>
      {getLoading ? <LinearProgress /> : false}
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box display="flex" borderRadius="3px" alignItems={"center"}>
          {broken && !rtl && (
            <IconButton onClick={() => toggleSidebar()}>
              <MenuOutlinedIcon />
            </IconButton>
          )}
          <Typography variant="h3">Department</Typography>
        </Box>

        {/* ICONS */}

        <Box display="flex">
          <Tooltip title="Close">
            <IconButton onClick={() => fnLogOut("Close")} color="error">
              <ResetTvIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton onClick={() => fnLogOut("Logout")} color="error">
              <LogoutOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      {!getLoading ? (
        <Box m="20px">
      <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={(values) => {
              setTimeout(() => {
                fnSave(values);
              }, 100);
            }}
            validationSchema={deptSchema}
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
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  
                  <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Code"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.Code}
                      id="Code"
                      name="Code"
                      error={!!touched.Code && !!errors.Code}
                      helperText={touched.Code && errors.Code}
                      required
                      focused
                      autoFocus
                      inputProps={{ maxLength: 8 }}
                      onInvalid={(e) => {
                        e.target.setCustomValidity("Please Fill The Code");
                      }}
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                      }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Description"
                      value={values.Name}
                      id="Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="Name"
                      error={!!touched.Name && !!errors.Name}
                      helperText={touched.Name && errors.Name}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      required
                      inputProps={{ maxLength: 90 }}
                      multiline
                      onInvalid={(e) => {
                        e.target.setCustomValidity(
                          "Please Fill The Description"
                        );
                      }}
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Location"
                      value={values.Loc}
                      id="Loc"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="Loc"
                      error={!!touched.Loc && !!errors.Loc}
                      helperText={touched.Loc && errors.Loc}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      inputProps={{ maxLength: 90 }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="Number"
                      label="Sort Order "
                      value={values.SortOrder}
                      id="SortOrder"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="SortOrder"
                      error={!!touched.SortOrder && !!errors.SortOrder}
                      helperText={touched.SortOrder && errors.SortOrder}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      onWheel={(e) => e.target.blur()} 
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right", background: "#fff6c3" },
                        },
                      }}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 8);
                      }}
                    />
                    <FormControl>
                      <Box>
                        <Field
                          //  size="small"
                          type="checkbox"
                          name="checkbox"
                          id="checkbox"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          as={Checkbox}
                          label="Disable"
                        />

                        <FormLabel focused={false}>Disable</FormLabel>
                      </Box>
                    </FormControl>
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px" gap={2}>
                  {YearFlag == "true" ? (
                    <LoadingButton
                      color="secondary"
                      variant="contained"
                      type="submit"
                      loading={loading}
                      // onClick={() => {
                      //   fnSave(values);
                      // }}
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
                  {/* <Button
                    color="error"
                    variant="contained"
                    
                    >
                    Delete
                  </Button> */}
                  <Button
                    color="warning"
                    variant="contained"
                    onClick={() => {
                      navigate(`/Apps/TR026/Department`);
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          
        </Box>
      ) : (
        false
      )}
    </React.Fragment>
  );
};

export default Editdept;
