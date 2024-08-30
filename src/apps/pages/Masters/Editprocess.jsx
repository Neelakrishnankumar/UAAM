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
  Tooltip,
  FormLabel,
  Breadcrumbs,
  LinearProgress,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
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
import { processSchema } from "../../Security/validation";
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
// Purpose: Create Process
// ***********************************************
const EditProcess = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [checked, setChecked] = React.useState();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const YearFlag = sessionStorage.getItem("YearFlag");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  var processType = params.Type;
  var processDescription = params.Desc;
  const Data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.loading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const location = useLocation();
  const Year = sessionStorage.getItem("year");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");

  console.log(Data);
  const { toggleSidebar, broken, rtl } = useProSidebar();
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  const [ini, setIni] = useState(true);
  const [loading, setLoading] = useState(false);

  var apiData = "";
  apiData = {
    Code: Data.Code,
    Description: Data.Description,
    SortOrder: Data.SortOrder,
    Disable: Data.Disable,
    Duration: Data.Duration,
    Incharge: Data.Incharge,
  };
  //*******Assign peocess values from Database in  Yup initial value******* */
  const initialValues = {
    Code: apiData.Code,
    Description: apiData.Description,
    SortOrder: apiData.SortOrder,
    checkbox: apiData.Disable === "Y" ? true : false,
    Duration: apiData.Duration === "Y" ? true : false,
    Incharge: apiData.Incharge === "Y" ? true : false,
  };
  // **********Save Function*****************
  const fnSave = async (values) => {
    setLoading(true);
    setIni(false);
    // if (values.Code == "") {
    //   toast.error("Please Fill ID");
    //   return;
    // }
    if (values.Description == "") {
      toast.error("Please Fill Description");
      return;
    }

    var isCheck = "N";
    if (values.checkbox == true) {
      isCheck = "Y";
    }
    var isDuration = "N";
    if (values.Duration == true) {
      isDuration = "Y";
    }
    var isIncharge = "N";
    if (values.Incharge == true) {
      isIncharge = "Y";
    }
    console.log(values);

    var idata = {
      RecordID: recID,
      Code: values.Code,
      Description: values.Description,
      SortOrder: values.SortOrder,
      Disable: isCheck,
      Duration: isDuration,
      Incharge: isIncharge,
      YearID: Year,
      Type: processType,
      Finyear,
      CompanyID,
    };
    // var type = "";

    // if (mode == "A") {
    //   type = "insert";
    // } else {
    //   type = "update";
    // }

    // const data = await dispatch(postApidata(accessID, type, saveData));

    let action = mode === "A" ? "insert" : "update";
    const data = await dispatch(postData({ accessID, action, idata }));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      setIni(true);
      setLoading(false);
      navigate(
        `/Apps/Secondarylistview/TR021/Process/${processType}/${processDescription}`
      );
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
          navigate(
            `/Apps/Secondarylistview/TR021/Process/${processType}/${processDescription}`
          );
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
        <Box display="flex" borderRadius="3px" alignItems={"center"}>
          {broken && !rtl && (
            <IconButton onClick={() => toggleSidebar()}>
              <MenuOutlinedIcon />
            </IconButton>
          )}
          <Breadcrumbs
            maxItems={2}
            aria-label="breadcrumb"
            separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
          >
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate(`/Apps/TR072/Process%20Stage`);
              }}
            >
              Process Stage
            </Typography>
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate(
                  `/Apps/Secondarylistview/TR021/Process/${processType}/${processDescription}`
                );
              }}
            >
              {processDescription}
            </Typography>

            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate(
                  `/Apps/Secondarylistview/TR021/Process/${processType}/${processDescription}`
                );
              }}
            >
              {mode === "A" ? "New" : Data.Description}
            </Typography>
          </Breadcrumbs>
        </Box>

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
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                fnSave(values);
              }, 100);
            }}
            validationSchema={processSchema}
            enableReinitialize={ini}
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
                      label="Stage/Process"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.Code}
                      id="Code"
                      name="Code"
                      error={!!touched.Code && !!errors.Code}
                      helperText={touched.Code && errors.Code}
                      // sx={{ background: "#fff6c3" }}
                      focused
                      autoFocus
                      placeholder="Auto"
                      inputProps={{ readOnly: true }}
                      onInvalid={(e) => {
                        e.target.setCustomValidity(
                          "Please Fill The Stage/Process"
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
                      label="Description"
                      value={values.Description}
                      id="Description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="Description"
                      error={!!touched.Description && !!errors.Description}
                      helperText={touched.Description && errors.Description}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      required
                      inputProps={{ maxLength: 25 }}
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
                      type="number"
                      label="Sort Order"
                      value={values.SortOrder}
                      id="SortOrder"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="SortOrder"
                      error={!!touched.SortOrder && !!errors.SortOrder}
                      helperText={touched.SortOrder && errors.SortOrder}
                      sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                      focused
                      onWheel={(e) => e.target.blur()} 
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 8);
                      }}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                    />
                    <FormControl>
                      <Box>
                        <Field
                          //  size="small"
                          type="checkbox"
                          name="Duration"
                          id="Duration"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          as={Checkbox}
                          label="Duration"
                        />

                        <FormLabel focused={false}>Duration</FormLabel>
                      </Box>

                      <Box>
                        <Field
                          //  size="small"
                          type="checkbox"
                          name="Incharge"
                          id="Incharge"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          as={Checkbox}
                          label="In-charge"
                        />

                        <FormLabel focused={false}>In-charge</FormLabel>
                      </Box>

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
                  {/*      
    <FormControl sx={{ gridColumn: "span 2" }}>
     <Stack  
       
       sx={{
    //    width: {sm:'100%',md:'100%',lg:'100%'},
       gridColumn: "span 2",
       alignContent:'center',
       justifyContent:'center',
       alignItems:'center',
       position:'relative',
       right:'0px'
       
   }}
   >
   <Avatar variant="rounded" src={userimg} sx={{width:'200px',height:'150px'}} />
   
       </Stack>
     </FormControl> */}
                </Box>
                <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                  {YearFlag == "true" ? (
                    <LoadingButton
                      color="secondary"
                      variant="contained"
                      type="submit"
                      loading={loading}
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
                      navigate(
                        `/Apps/Secondarylistview/TR021/Process/${processType}/${processDescription}`
                      );
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

export default EditProcess;
