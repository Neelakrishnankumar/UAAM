import {
  TextField,
  Box,
  Paper,
  Breadcrumbs,
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
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { addMonths, endOfMonth } from "date-fns";
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
import Popup from "../popup";
import Listviewpopup from "../Lookup";
import { formGap } from "../../../ui-components/utils";

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
  // console.log(params, "--find params");

  const isLoading = useSelector((state) => state.formApi.postLoading);
  // const getLoading = useSelector((state) => state.formApi.getLoading);
  // const isLoading = false;
  // const getLoading = false;
  const YearFlag = sessionStorage.getItem("YearFlag");
  // console.log(YearFlag, "---finding YearFlag");

  const Year = sessionStorage.getItem("year");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const location = useLocation();
  // useEffect(() => {
  //   dispatch(getFetchData({ accessID, get: "get", recID }));
  // }, [location.key]);

  //Products Lookup
  const [openProdPopup, setOpenProdPopup] = useState(false);
  const [openSubPopup, setOpenSubPopup] = useState(false);

  const [isPopupData, setisPopupdata] = React.useState(false);
  const [selectProdLookupData, setselectProdLookupData] = React.useState({
    ProdRecordid: "",
    ProdCode: "",
    ProdDesc: "",
  });

  const [selectProdsubLookupData, setselectProdsubLookupData] = React.useState({
    ProdsubRecordid: "",
    ProdsubCode: "",
    ProdsubDesc: "",
  });
  function handleShow(type) {
    if (type == "PROD") {
      setOpenProdPopup(true);
    }
    if (type == "PRODSUB") {
      setOpenSubPopup(true);
    }
  }
  const childToParent = (childdata, type) => {
    console.log("type---" + type);
    console.log("Data---" + JSON.stringify(childdata));

    if (type == "Products") {
      setisPopupdata(true);
      setselectProdLookupData({
        ProdRecordid: childdata.RecordID,
        ProdCode: childdata.Code,
        ProdDesc: childdata.Name,
      });
      setOpenProdPopup(false);
    }
    if (type == "Products Subscription") {
      setOpenSubPopup(true);
      setselectProdsubLookupData({
        ProdsubRecordid: childdata.RecordID,
        ProdsubCode: childdata.Code,
        ProdsubDesc: childdata.Name,
      });
      setOpenSubPopup(false);
    }
  };

  const [subfromdate, Setsubfromdate] = useState("");
  const [subEnddate, SetsubEnddate] = useState("");
  const [subperiod, Setsubperiod] = useState("");

  const handleChangesub = (e, setter) => {
    const { name, value } = e.target;
    console.log(name, "--name in handleChangesub");
    // Update the corresponding state
    setter(value);

    //For Refreshing the end End date
    if (!isNaN(value) && !isNaN(subperiod)) {
      // Step 1: Add the period (in months) to the start date
      const tentativeEndDate = addMonths(value, subperiod);
      console.log(tentativeEndDate, "--tentativeEndDate");

      // Step 2: Calculate the final end date, 30 days after the tentative end date
      // const finalEndDate = new Date(tentativeEndDate);
      const finalEndDate = new Date(value);
      finalEndDate.setDate(finalEndDate.getDate() + subperiod * 30); // Add 30 days

      const formattedEndDate = finalEndDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
      console.log("Final End Date (30 days after):", formattedEndDate);

      // Step 3: Set the calculated end date in the form
      SetsubEnddate(formattedEndDate);
    }
    // Log all state values
    console.log("fromDate:", subfromdate);
    console.log("End Date:", subEnddate);
    console.log("Sub Period:", subperiod);
  };
  const SubPeriodOnchange = (e, setter) => {
    const { name, value } = e.target;
    setter(value);

    if (subfromdate && value) {
      const startDate = new Date(subfromdate);
      const period = parseInt(value, 10);

      if (!isNaN(startDate) && !isNaN(period)) {
        // Step 1: Add the period (in months) to the start date
        const tentativeEndDate = addMonths(startDate, period);
        console.log(tentativeEndDate, "--tentativeEndDate");

        // Step 2: Calculate the final end date, 30 days after the tentative end date
        // const finalEndDate = new Date(tentativeEndDate);
        const finalEndDate = new Date(startDate);
        finalEndDate.setDate(finalEndDate.getDate() + period * 30); // Add 30 days

        const formattedEndDate = finalEndDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
        console.log("Final End Date (30 days after):", formattedEndDate);

        // Step 3: Set the calculated end date in the form
        SetsubEnddate(formattedEndDate);
      }
    }
  };

  // *************** INITIALVALUE  *************** //

  const InitialValue = {
    subscriptionStartDate: "",
    subscriptionperiod: "",
    notificationDate: "",
    subscriptionEndDate: "",
    retainDate: "",
  };

  const Fnsave = async (values) => {
    let action = mode === "A" ? "insert" : "update";
    const idata = {
      RecordID: recID,
      CompanyID: paramscompID,
      OurProductID: selectProdLookupData.ProdRecordid,
      ProdSubscriptionID: selectProdsubLookupData.ProdsubRecordid,
      StartDate: subfromdate,
      EndDate: subEnddate,
      NoOfMonth: subperiod,
      RetainDate: values.retainDate,
      NotificationDate: values.notificationDate,
    };

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate(
        `/Apps/Secondarylistview/TR238/subscription/${params.filtertype}`
      );
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
      <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box display="flex" borderRadius="3px" alignItems="center">
            {broken && !rtl && (
              <IconButton onClick={() => toggleSidebar()}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
            <Box
              display={isNonMobile ? "flex" : "none"}
              borderRadius="3px"
              alignItems="center"
            >
              <Breadcrumbs
                maxItems={3}
                aria-label="breadcrumb"
                separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
              >
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    navigate("/Apps/TR014/Company");
                  }}
                >
                  Company
                </Typography>

                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    navigate(
                      `/Apps/Secondarylistview/TR238/subscription/${params.filtertype}`
                    );
                  }}
                >
                  Subscriptions
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  New
                </Typography>
              </Breadcrumbs>
            </Box>{" "}
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
      </Paper>
      {/* {!getLoading ? ( */}
      {/* <Box m="20px"> */}
      <Paper elevation={3} sx={{ margin: "10px" }}>
        <Formik
          initialValues={InitialValue}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              Fnsave(values);
              setSubmitting(false); // ✅ Set submitting to false after save
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
          }) => (
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

            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gridTemplateColumns="repeat(4, minMax(0, 1fr))"
                gap={formGap}
                padding={1}
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4", // Adjust for mobile view
                  },
                }}
              >
                <FormControl
                  fullWidth
                  sx={{ gridColumn: "span 2", gap: formGap }}
                >
                  <FormControl
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      label="ProductID"
                      variant="standard"
                      value={selectProdLookupData.ProdCode}
                      focused
                      // required
                      inputProps={{ tabIndex: "-1" }}
                    />
                    <IconButton
                      sx={{ height: 40, width: 40 }}
                      onClick={() => handleShow("PROD")}
                    >
                      <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                    </IconButton>

                    <TextField
                      variant="standard"
                      value={selectProdLookupData.ProdDesc}
                      fullWidth
                      inputProps={{ tabIndex: "-1" }}
                      focused
                    />
                  </FormControl>
                  <TextField
                    name="subscriptionStartDate"
                    type="date"
                    id="subscriptionStartDate"
                    label="Subscription Start Date"
                    variant="standard"
                    focused
                    onChange={(e) => handleChangesub(e, Setsubfromdate)}
                    value={subfromdate}
                    // value={values.subscriptionStartDate}
                    // onBlur={handleBlur}
                    // onChange={handleChange}
                    // error={!!touched.subscriptionPeriod && !!errors.subscriptionPeriod}
                    // helperText={touched.subscriptionPeriod && errors.subscriptionPeriod}
                    autoFocus
                  />

                  <TextField
                    name="subscriptionperiod"
                    type="number"
                    id="subscriptionperiod"
                    label="Subscription Period (in months)"
                    variant="standard"
                    focused
                    onChange={(e) => SubPeriodOnchange(e, Setsubperiod)}
                    value={subperiod}
                    // value={values.subscriptionperiod}
                    // onBlur={handleBlur}
                    // onChange={handleChange}
                    // error={!!touched.subscriptionperiod && !!errors.subscriptionperiod}
                    // helperText={touched.subscriptionperiod && errors.subscriptionperiod}
                    autoFocus
                    sx={{
                      gridColumn: "span 2",
                      background: "",
                      input: { textAlign: "right" },
                    }}
                  />
                  <TextField
                    name="retainDate"
                    type="date"
                    id="retainDate"
                    label="Retain Date"
                    variant="standard"
                    focused
                    value={values.retainDate}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.retainDate && !!errors.retainDate}
                    helperText={touched.retainDate && errors.retainDate}
                    autoFocus
                  />
                </FormControl>
                <FormControl
                  fullWidth
                  sx={{ gridColumn: "span 2", gap: formGap }}
                >
                  {/* <TextField
      name="code"
      type="text"
      id="code"
      label="Code"
      variant="standard"
      focused
      required
      value={values.code}
      onBlur={handleBlur}
      onChange={handleChange}
      error={!!touched.code && !!errors.code}
      helperText={touched.code && errors.code}
      autoFocus
    /> */}

                  <FormControl
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      label="Product Subscription"
                      variant="standard"
                      value={selectProdsubLookupData.ProdsubCode}
                      focused
                      // required
                      inputProps={{ tabIndex: "-1" }}
                    />
                    <IconButton
                      sx={{ height: 40, width: 40 }}
                      onClick={() => handleShow("PRODSUB")}
                    >
                      <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                    </IconButton>

                    <TextField
                      variant="standard"
                      value={selectProdsubLookupData.ProdsubDesc}
                      fullWidth
                      inputProps={{ tabIndex: "-1" }}
                      focused
                    />
                  </FormControl>
                  <TextField
                    name="subscriptionEndDate"
                    type="date"
                    id="subscriptionEndDate"
                    label="Subscription End Date"
                    variant="standard"
                    focused
                    onChange={(e) => handleChangesub(e, SetsubEnddate)}
                    value={subEnddate}
                    // value={values.subscriptionEndDate}
                    // onBlur={handleBlur}
                    // onChange={handleChange}
                    // error={!!touched.subscriptionEndDate && !!errors.subscriptionEndDate}
                    // helperText={touched.subscriptionEndDate && errors.subscriptionEndDate}
                    autoFocus
                    inputProps={{ readOnly: true }}
                  />

                  <TextField
                    name="notificationDate"
                    type="date"
                    id="notificationDate"
                    label="Notification Date"
                    variant="standard"
                    focused
                    value={values.notificationDate}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={
                      !!touched.notificationDate && !!errors.notificationDate
                    }
                    helperText={
                      touched.notificationDate && errors.notificationDate
                    }
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
              <Box
                display="flex"
                padding={1}
                justifyContent="end"
                mt="20px"
                gap="20px"
              >
                <Button
                  color="secondary"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() =>
                    navigate(
                      `/Apps/Secondarylistview/TR238/subscription/${params.filtertype}`
                    )
                  }
                >
                  Cancel
                </Button>
              </Box>
            </form>
          )}
        </Formik>
        <Popup
          title="Products"
          openPopup={openProdPopup}
          setOpenPopup={setOpenProdPopup}
        >
          <Listviewpopup
            accessID="2098"
            screenName="Products"
            childToParent={childToParent}
            // filterName={"CompanyID"}
            // filterValue={CompID}
          />
        </Popup>
        <Popup
          title="Products Subscription"
          openPopup={openSubPopup}
          setOpenPopup={setOpenSubPopup}
        >
          <Listviewpopup
            accessID="2099"
            screenName="Products Subscription"
            childToParent={childToParent}
            filterName={"parentID"}
            filterValue={selectProdLookupData.ProdRecordid}
          />
        </Popup>
      </Paper>
      {/* </Box> */}
      {/* // ) : (
      //   false
      // )} */}
    </React.Fragment>
  );
};

export default Editsubscription;
