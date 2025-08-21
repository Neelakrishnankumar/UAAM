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
  subScriptionCheck,
  subScriptionIdGet,
} from "../../../store/reducers/Formapireducer";
import React, { useState, useEffect, useRef } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Popup from "../popup";
import Listviewpopup from "../Lookup";
import { formGap } from "../../../ui-components/utils";
import store from "../../..";
import { CheckinAutocomplete, Productautocomplete, SingleFormikOptimizedAutocomplete } from "../../../ui-components/global/Autocomplete";
import * as Yup from "yup";
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
  const getLoading = useSelector((state) => state.formApi.getLoading);
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
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);


  const rowData = location.state || {};
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

  if (!isPopupData) {
    selectProdLookupData.ProdCode = data.OurProductCode;
    selectProdLookupData.ProdDesc = data.OurProductDescription;
    selectProdLookupData.ProdRecordid = data.OurProductID;

    selectProdsubLookupData.ProdsubCode = data.ProductSubscriptionCode;
    selectProdsubLookupData.ProdsubDesc = data.ProductSubscriptionName;
    selectProdsubLookupData.ProdsubRecordid = data.ProdSubscriptionID;
  }

  const [subType, setSubType] = useState("Y");
  function handleShow(type) {
    if (type == "PROD") {
      setOpenProdPopup(true);
    }
    if (type == "PRODSUB") {
      setOpenSubPopup(true);
    }
  }
  const childToParent = async (childdata, type) => {
    setisPopupdata(true);
    console.log("type---" + type);
    console.log("Data---" + JSON.stringify(childdata));

    if (type == "Products") {
      if (params.Mode == "A") {
        const res = await dispatch(
          subScriptionIdGet({
            CompanyID: paramscompID,
            ProductID: childdata.RecordID,
          })
        );
        if (res.payload.SubscriptionID) {
          navigate(
            `/Apps/Secondarylistview/TR238/subscription/${params.filtertype}/Editsubscription/${res.payload.SubscriptionID}/R`
          );
          // dispatch(getFetchData({ accessID, get: "get", recID:res.payload.SubscriptionID }));
        }
      }

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
      if (params.Mode == "R") {
        const res = await dispatch(
          subScriptionCheck({
            oldSubcriptionID: data.ProdSubscriptionID,
            NewSubcriptionID: childdata.RecordID,
          })
        );
        console.log(res, "res");
        const type = res.payload.Type || "Y";
        setSubType(type);
      }

      setOpenSubPopup(false);
    }
  };
  const validationSchema = Yup.object({
    productid: Yup.object()
      .nullable()
      .required("Please fill the Product Code"),

    subscriptionperiod: Yup.string().required('Please fill the Subscription Period '),
    productsubscription: Yup.object()
      .nullable()
      .required("Please fill the Product Subscription"),
    subscriptionStartDate: Yup.string().required('Please fill the Subscription Start date '),

  });
  const [subfromdate, Setsubfromdate] = useState("");
  const [subEnddate, SetsubEnddate] = useState("");
  const [subperiod, Setsubperiod] = useState("");

  const handleChangesub = (e, setter) => {
    const { name, value } = e.target;
    // Update the corresponding state
    setter(value);

    //For Refreshing the end End date
    if (!isNaN(value) && !isNaN(subperiod)) {
      // Step 1: Add the period (in months) to the start date
      const tentativeEndDate = addMonths(value, subperiod);

      // Step 2: Calculate the final end date, 30 days after the tentative end date
      // const finalEndDate = new Date(tentativeEndDate);
      const finalEndDate = new Date(value);
      finalEndDate.setDate(finalEndDate.getDate() + subperiod * 30); // Add 30 days

      const formattedEndDate = finalEndDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD

      // Step 3: Set the calculated end date in the form
      SetsubEnddate(formattedEndDate);
    }
    // Log all state values
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
    productid:
      mode == "A"
        ? null
        : {
          Code: data.OurProductCode,
          Name: data.OurProductDescription,
          RecordID: data.OurProductID,
        },
    productsubscription:
      mode == "A"
        ? null
        : {
          Code: data.ProductSubscriptionCode,
          Name: data.ProductSubscriptionName,
          RecordID: data.ProdSubscriptionID,
        },
  };

  const Fnsave = async (values) => {
    let action = mode === "A" ? "insert" : "insert";
    const idata = {
      RecordID: recID,
      CompanyID: paramscompID,
      OurProductID: values.productid.RecordID || 0,

      ProdSubscriptionID: values.productsubscription.RecordID || 0,
      // OurProductID: selectProdLookupData.ProdRecordid,
      // ProdSubscriptionID: selectProdsubLookupData.ProdsubRecordid,
      StartDate: values.subscriptionStartDate,
      EndDate: values.subscriptionEndDate,
      NoOfMonth: values.subscriptionperiod,
      RetainDate: values.retainDate,
      NotificationDate: values.notificationDate,
      Type: subType,
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
      {getLoading ? <LinearProgress /> : false}
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
      {!getLoading ? (
        <Paper elevation={3} sx={{ margin: "10px" }}>
          <Formik
            initialValues={InitialValue}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                Fnsave(values);
                setSubmitting(false); // ✅ Set submitting to false after save
              }, 100);
            }}
            //  validationSchema={ DesignationSchema}
            validationSchema={validationSchema}
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
              setFieldValue,
            }) => (
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
                    {/* <FormControl
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    > */}
                    <SingleFormikOptimizedAutocomplete
                      disabled={mode == "R"}
                      label="Product Code"
                      id="productid"
                      name="productid"
                      required
                      value={values.productid}
                      error={!!touched.productid && !!errors.productid}
                      helperText={touched.productid && errors.productid}
                      onChange={async (e, newValue) => {
                        setFieldValue("productid", newValue);
                       
                    if (params.Mode == "A" && newValue) {
                          const res = await dispatch(
                    subScriptionIdGet({
                      CompanyID: paramscompID,
                    ProductID: newValue.RecordID,
                            })
                    );
                    if (res.payload.Status == "Y") {
                      navigate(
                        `/Apps/Secondarylistview/TR238/subscription/${params.filtertype}/Editsubscription/${res.payload.SubscriptionID}/R`
                      );
                            // dispatch(getFetchData({accessID, get: "get", recID:res.payload.SubscriptionID }));
                          }
                        }
                      }}

                    log

                    url={`${store.getState().globalurl.listViewurl}?data={"Query":{"AccessID":"2098","ScreenName":"Product ID","Filter":"","Any":"","CompId":"4"}}`}
                    />
                    {touched.productid && errors.productid && (
                      <div style={{ color: "red", fontSize: "9px", marginTop: "-2px" }}>
                        {errors.productid}
                      </div>
                    )}
                    {/* </FormControl> */}
                    <TextField
                      required
                      name="subscriptionStartDate"
                      type="date"
                      id="subscriptionStartDate"
                      label=
                      "Subscription Start Date"
                      variant="standard"
                      focused
                      // onChange={(e) => handleChangesub(e, Setsubfromdate)}
                      // value={subfromdate}
                      value={values.subscriptionStartDate}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        !!touched.subscriptionStartDate &&
                        !!errors.subscriptionStartDate
                      }
                      helperText={
                        touched.subscriptionStartDate && errors.subscriptionStartDate
                      }
                      onInvalid={(e) => {
                        e.target.setCustomValidity(
                          "Please fill the Subscription Start Date"
                        );
                      }}
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                      }}
                      autoFocus
                    />

                    <TextField
                      required
                      name="subscriptionperiod"
                      type="number"
                      id="subscriptionperiod"
                      label="Subscription Period (in months)"

                      variant="standard"
                      focused
                      // onChange={(e) => SubPeriodOnchange(e, Setsubperiod)}
                      // value={subperiod}
                      value={values.subscriptionperiod}
                      onInvalid={(e) => {
                        e.target.setCustomValidity(
                          "Please fill the Subscription Period (in months)"
                        );
                      }}
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                      }}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        const { name, value } = e.target;
                        setFieldValue("subscriptionperiod", value);
                        const startDate = new Date(
                          values.subscriptionStartDate
                        );
                        if (values.subscriptionStartDate && value) {
                          const period = parseInt(value, 10);

                          console.log(period, "period");

                          if (!isNaN(period)) {
                            const finalEndDate = new Date(startDate);
                            finalEndDate.setDate(
                              finalEndDate.getDate() + period * 30
                            ); // Add 30 days

                            const formattedEndDate = finalEndDate
                              .toISOString()
                              .split("T")[0]; // Format as YYYY-MM-DD

                            setFieldValue(
                              "subscriptionEndDate",
                              formattedEndDate
                            );
                          }
                        } else {
                          setFieldValue("subscriptionEndDate", "");
                        }
                      }}
                      error={
                        !!touched.subscriptionperiod &&
                        !!errors.subscriptionperiod
                      }
                      helperText={
                        touched.subscriptionperiod && errors.subscriptionperiod
                      }
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
                    {/* <FormControl
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    > */}

                    <SingleFormikOptimizedAutocomplete
                      // label="Product Subscription"
                      label={
                        <span>
                          Product Subscription <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                        </span>
                      }
                      id="productsubscription"
                      name="productsubscription"
                      value={values.productsubscription}
                      onChange={async (e, newValue) => {
                        setFieldValue("productsubscription", newValue);
                        if (newValue) {
                          if (params.Mode == "R") {
                            const res = await dispatch(
                              subScriptionCheck({
                                oldSubcriptionID: data.ProdSubscriptionID,
                                NewSubcriptionID: newValue.RecordID,
                              })
                            );
                            console.log(res, "res");
                            const type = res.payload.Type || "Y";
                            setSubType(type);
                          }
                        }
                      }}
                    
                      log
                      url={`${store.getState().globalurl.listViewurl
                        }?data={"Query":{"AccessID":"2099","ScreenName":"Product Subscription","Filter":"parentID='${values.productid ? values.productid.RecordID : 0
                        }'","Any":"","CompId":"4"}}`}
                    />
                    {touched.productsubscription && errors.productsubscription && (
                      <div style={{ color: "red", fontSize: "9px", marginTop: "-2px" }}>
                        {errors.productsubscription}
                      </div>
                    )}

                    {/* </FormControl> */}
                    <TextField
                      name="subscriptionEndDate"
                      type="date"
                      id="subscriptionEndDate"
                      label="Subscription End Date"
                      variant="standard"
                      focused
                      // onChange={(e) => handleChangesub(e, SetsubEnddate)}
                      // value={subEnddate}
                      value={values.subscriptionEndDate}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        !!touched.subscriptionEndDate &&
                        !!errors.subscriptionEndDate
                      }
                      helperText={
                        touched.subscriptionEndDate &&
                        errors.subscriptionEndDate
                      }
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
                    color="warning"
                    variant="contained"
                    onClick={() =>
                      navigate(
                        `/Apps/Secondarylistview/TR238/subscription/${params.filtertype}`, { state: rowData }
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
      ) : (
        false
      )}
    </React.Fragment>
  );
};

export default Editsubscription;
