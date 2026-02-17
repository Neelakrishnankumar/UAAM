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

// import CryptoJS from "crypto-js";
const Editsubscription = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  var paramscompID = params.filtertype;
  const data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  console.log(params, "--find params");
  
  const isLoading = useSelector((state) => state.formApi.postLoading);
  // const getLoading = useSelector((state) => state.formApi.getLoading);
// const isLoading = false;
// const getLoading = false;
  const YearFlag = sessionStorage.getItem("YearFlag");
  console.log(YearFlag, "---finding YearFlag");
  
  const Year = sessionStorage.getItem("year");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const location = useLocation();
  // useEffect(() => {
  //   dispatch(getFetchData({ accessID, get: "get", recID }));
  // }, [location.key]);

//startDtae

  // *************** INITIALVALUE  *************** //

  const InitialValue = {
    subscriptionStartDate: '',
    subscriptionperiod: '',
    notificationDate: '',
    subscriptionEndDate: '',
    retainDate: ''
  };

  const Fnsave = async (values) => {
    let action = mode === "A" ? "insert" : "update";
      const idata = {
      RecordID: recID,
      CompanyID: paramscompID,
      StartDate: values.subscriptionStartDate,
      EndDate: values.subscriptionEndDate,
      NoOfMonth: values.subscriptionperiod,
      RetainDate: values.retainDate,
      NotificationDate: values.notificationDate,
    
    };

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate(`/Apps/Secondarylistview/TR238/subscription/${params.filtertype}`);
    } else {
      toast.error(response.payload.Msg);
    }
  };









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
          navigate("/Apps/TR014/Company");
        }
      } else {
        return;
      }
    });
  };
  return (
    <React.Fragment>

      {/* {getLoading ? <LinearProgress /> : false} */}
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box display="flex" borderRadius="3px" alignItems="center">
          {broken && !rtl && (
            <IconButton 
            onClick={() => toggleSidebar()}
            >
              <MenuOutlinedIcon />
            </IconButton>
          )}
          <Typography variant="h3">Subscription</Typography>
        </Box>
        <Box display="flex">
          <Tooltip title="Close">
            <IconButton 
            onClick={() => fnLogOut("Close")} color="error"
            >
              <ResetTvIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton color="error" 
            onClick={() => fnLogOut("Logout")}
            >
              <LogoutOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* {!getLoading ? ( */}
        <Box m="20px">
          <Formik
            initialValues={InitialValue}
            onSubmit={(values, { setSubmitting }) => {
  setTimeout(() => {
    Fnsave(values);
    setSubmitting(false);  // ✅ Set submitting to false after save
  }, 100);
}}

            // onSubmit={(values, setSubmitting) => {
            //   setTimeout(() => {
            //     Fnsave(values);
            //   }, 100);
            // }}
            //  validationSchema={ DesignationSchema}
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
            }) => 

  //               useEffect((values) => {
  //   if (values.subscriptionStartDate && values.subscriptionperiod) {
  //     const startDate = new Date(values.subscriptionStartDate);
  //     const period = parseInt(values.subscriptionperiod, 10);

  //     if (!isNaN(startDate) && !isNaN(period)) {
  //       const tentativeEndDate = addMonths(startDate, period);
  //       const lastDayOfMonth = endOfMonth(tentativeEndDate);

  //       handleChange({
  //         target: {
  //           name: "subscriptionEndDate",
  //           value: lastDayOfMonth.toISOString().split("T")[0],
  //         },
  //       });
  //     }
  //   }
  // }, [values.subscriptionStartDate, values.subscriptionperiod]);

              (
              <form 
              onSubmit={handleSubmit}
              >
                <Box
  display="grid"
  gridTemplateColumns="repeat(4, minMax(0, 1fr))"
  gap="30px"
  sx={{
    "& > div": {
      gridColumn: isNonMobile ? undefined : "span 4", // Adjust for mobile view
    },
  }}
>
<FormControl fullWidth sx={{ gridColumn: "span 2", gap: "40px" }}>
  <TextField
      name="subscriptionStartDate"
      type="date"
      id="subscriptionStartDate"
      label="Subscription Start Date"
      variant="filled"
      focused
      value={values.subscriptionStartDate}
      onBlur={handleBlur}
      onChange={handleChange}
      error={!!touched.subscriptionPeriod && !!errors.subscriptionPeriod}
      helperText={touched.subscriptionPeriod && errors.subscriptionPeriod}
      autoFocus
    />
  
  
   <TextField
      name="subscriptionperiod"
      type="number"
      id="subscriptionperiod"
      label="Subscription Period (in months)"
      variant="filled"
      focused
      value={values.subscriptionperiod}
      onBlur={handleBlur}
      onChange={handleChange}
      error={!!touched.subscriptionperiod && !!errors.subscriptionperiod}
      helperText={touched.subscriptionperiod && errors.subscriptionperiod}
      autoFocus
      sx={{
        gridColumn: "span 2",
        background: "#fff6c3",
        input: { textAlign: "right" },
      }}
     
    />
    <TextField
      name="notificationDate"
      type="date"
      id="notificationDate"
      label="Notification Date"
      variant="filled"
      focused
      value={values.notificationDate}
      onBlur={handleBlur}
      onChange={handleChange}
      error={!!touched.notificationDate && !!errors.notificationDate}
      helperText={touched.notificationDate && errors.notificationDate}
      autoFocus
    />
  </FormControl>
  <FormControl fullWidth sx={{ gridColumn: "span 2", gap: "40px" }}>
    {/* <TextField
      name="code"
      type="text"
      id="code"
      label="Code"
      variant="filled"
      focused
      required
      value={values.code}
      onBlur={handleBlur}
      onChange={handleChange}
      error={!!touched.code && !!errors.code}
      helperText={touched.code && errors.code}
      autoFocus
    /> */}
    <TextField
      name="subscriptionEndDate"
      type="date"
      id="subscriptionEndDate"
      label="Subscription End Date"
      variant="filled"
      focused
      value={values.subscriptionEndDate}
      onBlur={handleBlur}
      onChange={handleChange}
      error={!!touched.subscriptionEndDate && !!errors.subscriptionEndDate}
      helperText={touched.subscriptionEndDate && errors.subscriptionEndDate}
      autoFocus
      // inputProps={{ readOnly: true }}
    />
 <TextField
      name="retainDate"
      type="date"
      id="retainDate"
      label="Retain Date"
      variant="filled"
      focused
      value={values.retainDate}
      onBlur={handleBlur}
      onChange={handleChange}
      error={!!touched.retainDate && !!errors.retainDate}
      helperText={touched.retainDate && errors.retainDate}
      autoFocus
    />
  </FormControl>

 

  
</Box>

 {/* {YearFlag == "true" ? (
    <LoadingButton color="secondary" variant="contained" type="submit" 
    loading={isLoading}>
      Save
    </LoadingButton>
  ) : (
    <Button color="secondary" variant="contained" 
    disabled
    >
      Save
    </Button>
  )} */}
<Box display="flex" justifyContent="end" mt="20px" gap="20px">
 
   <Button color="secondary" variant="contained" 
type="submit"  
disabled={isSubmitting}
    >
      Save
    </Button>
  <Button color="error" variant="contained" 
  onClick={() => navigate(`/Apps/Secondarylistview/TR238/subscription/${params.filtertype}`)}
  >
    Cancel
  </Button>
</Box>

              </form>
            )}
          </Formik>
        </Box>
      {/* // ) : (
      //   false
      // )} */}
    </React.Fragment>
  );
};

export default Editsubscription;
