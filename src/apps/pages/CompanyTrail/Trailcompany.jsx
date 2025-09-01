import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Typography,
  Box,
  Paper,
  Button,
  TextField,
  FormLabel,
  FormControl,
  IconButton,
  Checkbox,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFetchData } from "../../../store/reducers/Formapireducer";
import { toast } from "react-hot-toast";
import Listviewpopup from "../Lookup";
import Popup from "../popup";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { companySchema } from "../../Security/validation";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { LoadingButton } from "@mui/lab";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { formGap } from "../../../ui-components/utils";
import { SingleFormikOptimizedAutocomplete } from "../../../ui-components/global/Autocomplete";
import store from "../../..";
import ESS from "../../../assets/img/esslogo6.png";
const Trialcompany = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();

  const recID = params.id;
  const mode = params.Mode;
  const accessID = params.accessID;

  const [openCNpopup, setOpenCNpopup] = useState(false);
  const [isPopupData, setisPopupdata] = useState(false);
  const [selectcnLookupData, setselectcnLookupData] = useState({
    CNlookupRecordid: "",
    CNlookupCode: "",
    CNlookupDesc: "",
  });

  const Data = useSelector((state) => state.formApi.Data);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);

  useEffect(() => {
    dispatch(getFetchData({ accessID:"TR014", get: "get", recID:"-1" }));
  }, [location.key]);

  const initialValues = {
    code: Data.Code,
    recordID: Data.RecordID,
    name: Data.Name,
    address: Data.Address,
    pincode: Data.Pincode,
    phone: Data.Phone,
    fax: Data.Fax,
    email: Data.Email,
    web: Data.Web,
    cst: Data.Cst,
    areacode: Data.Areacode,
    iECode: Data.Iecode,
    rbiCode: Data.Rbicode,
    gst: Data.Gst,
    Lut: Data.Lut,
    sortOrder: Data.SortOrder,
    license: Data.License,
    disable: Data.Disable === "Y",
    stockClose: Data.Process === "Y",
    useregular: Data.Regularslno === "Y",
    noOfEmployees: 5,
    noofusers: 1,
    country: Data.CnRecordID
      ? {
          RecordID: Data.CnRecordID,
          Code: Data.CountryCode,
          Name: Data.CountryName,
        }
      : null,
  };

  const handleShow = (type) => {
    if (type === "CN") setOpenCNpopup(true);
  };

  const childToParent = (childdata, type) => {
    if (type === "Country") {
      setisPopupdata(true);
      setselectcnLookupData({
        CNlookupCode: childdata.Code,
        CNlookupRecordid: childdata.RecordID,
        CNlookupDesc: childdata.Name,
      });
      setOpenCNpopup(false);
    }
  };
const generateAlphaCode = (length = 4) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return result;
};
  const fnSave = async (values) => {
    const idata = {
      RecordID: recID,
      CnRecordID: values.country?.RecordID || "0",
      CountryCode: values.country?.Code || "",
      CountryName: values.country?.Name || "",
      Code: values.code,
      Name: values.name,
      Email: values.email,
      Address: values.address,
      Pincode: values.pincode,
      Phone: values.phone,
      Fax: values.fax,
      Web: values.web,
      Cst: values.cst,
      Areacode: values.areacode,
      Process: values.stockClose ? "Y" : "N",
      Gst: values.gst,
      Regularslno: values.useregular ? "Y" : "N",
      
      // License: values.license,
      License:generateAlphaCode(),
      Disable: "",   
      // NumberOfEmployee: values.noOfEmployees,
      // NumberOfUsers: values.noofusers,
      NumberOfEmployee: "",
      NumberOfUsers: "",
      Iecode: "",
      Rbicode:"",
      Lut: "",
      SortOrder: "",
   
    };


    console.log("Sending to API:", idata);

    try {
      const response = await fetch(
        "https://dvmtapi.bexatm.com/uaam/api/TrialCompanyPostController.php",
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU"
          },
          body: JSON.stringify(idata),
        }
      );

      const result = await response.json();
      if (result.Status === "Y") {
        toast.success(result.Msg || "Company saved successfully.");
        navigate(`/trial-company/notification`);
      } else {
        toast.error(result.Msg || "Failed to save company.");
      }
    } catch (error) {
      console.error("Save Error:", error);
      toast.error("Something went wrong while saving.");
    }
  };

  const fnLogOut = (props) => {
    Swal.fire({
      title: `Do you want ${props}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: props,
    }).then((result) => {
      if (result.isConfirmed) {
        if (props === "Logout") navigate("/");
        if (props === "Close") navigate("/Apps/TR014/Company");
      }
    });
  };

  
  return (
    <Box>
      {getLoading ? <LinearProgress /> : false}
            <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box display="flex" borderRadius="3px" alignItems="center">
            <Box display={"flex"} borderRadius="3px" alignItems="center">
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
              Company Registration
              </Typography>
            </Box>
          </Box>
          <Box display="flex">
            <img src={ESS} style={{ height: "50px", width: "60px" }} />
          </Box>
        </Box>
      </Paper>
      {!getLoading ? (
        <Paper elevation={3} sx={{ margin: "10px" }}>
          {/* <Box m="20px"> */}
          <Formik
            initialValues={initialValues}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                fnSave(values);
              }, 100);
            }}
            // validationSchema={companySchema}
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
                  gap={formGap}
                  padding={1}
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <FormControl
                    fullWidth
                    sx={{ gridColumn: "span 2", gap: formGap }}
                  >
                    {/* {JSON.stringify(errors)} */}
                    <TextField
                      fullWidth
                      // placeholder="Auto"
                      variant="standard"
                      type="text"
                      label="Code"
                      placeholder="Auto"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.code}
                      focused
                      inputProps={{maxLength: 5}}
                      InputProps={{readOnly:true}}
                      name="code"
                      autoFocus
                      // error={!!touched.code && !!errors.code}
                      // helperText={touched.code && errors.code}                      
                      // onInvalid={(e) => {
                      //   e.target.setCustomValidity("Please Fill The Code");
                      // }}
                      // onInput={(e) => {
                      //   e.target.setCustomValidity("");
                      // }}
                      // onInvalid={(e) => {
                      //   e.target.setCustomValidity("Please Fill The Code");
                      // }}
                      // onInput={(e) => {
                      //   e.target.setCustomValidity("");
                      // }}
                    />

                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="Name"
                      onInvalid={(e) => {
                        e.target.setCustomValidity("Please Fill The Name");
                      }}
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                      }}
                      value={values.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="name"
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      required
                      inputProps={{ maxLength: 50 }}
                      autoFocus
                    />

                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="Address"
                      value={values.address}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="address"
                      error={!!touched.address && !!errors.address}
                      helperText={touched.address && errors.address}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      required
                      onInvalid={(e) => {
                        e.target.setCustomValidity("Please Fill The Address");
                      }}
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                      }}
                      inputProps={{ maxLength: 500 }}
                      multiline
                    />
                    {/* <TextField
                      label="ID"
                      variant="standard"
                      value={selectcnLookupData.CNlookupRecordid}
                      focused
                      sx={{ display: "none" }}
                    /> */}
                    <FormControl
                      sx={{
                        gridColumn: "span 2",
                        display: "flex",
                      }}
                    >
                      <FormControl
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <SingleFormikOptimizedAutocomplete 
                    label="Country"
                    id="country"
                    name="country"
                    value={values.country}
                    onChange={(e,newValue)=> {
                      setFieldValue("country",newValue)
                    }}
                    log
                   url={`${store.getState().globalurl.listViewurl}?data={"Query":{"AccessID":"2003","ScreenName":"Country","Filter":"","Any":"","CompId":"4"}}`}
                    />
                    
                        {/* <TextField
                          label="Country"
                          variant="standard"
                          value={selectcnLookupData.CNlookupCode}
                          focused
                          required
                          inputProps={{ tabIndex: "-1" }}
                        />
                        <IconButton
                          sx={{ height: 40, width: 40 }}
                          onClick={() => handleShow("CN")}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>

                        <TextField
                          variant="standard"
                          value={selectcnLookupData.CNlookupDesc}
                          fullWidth
                          inputProps={{ tabIndex: "-1" }}
                          focused
                        /> */}
                      </FormControl>
                     

                    </FormControl>
                     <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="GST"
                      required
                      onInvalid={(e) => {
                        e.target.setCustomValidity("Please Fill The GST");
                      }}
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                      }}
                      value={values.gst}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="gst"
                      error={!!touched.gst && !!errors.gst}
                      helperText={touched.gst && errors.gst}
                      focused
                      inputProps={{ maxLength: 15 }}
                    />
                    {/* <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="LUT"
                      value={values.Lut}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="Lut"
                      // error={!!touched.gst && !!errors.gst}
                      // helperText={touched.gst && errors.gst}
                      inputProps={{readOnly:true}}
                      focused
                    /> */}

                    {/* <TextField
                      fullWidth
                      variant="standard"
                      type="number"
                      label="No Of Users"
                      value={values.noofusers}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="noofusers"
                      sx={{
                        gridColumn: "span 2",
                        input: { textAlign: "right" },
                      }}
                      focused
                      onWheel={(e) => e.target.blur()}
                    /> */}
                  </FormControl>
                  <FormControl sx={{ gridColumn: "span 2", gap: formGap }}>
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="Web URL"
                      
                      value={values.web}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="web"
                      sx={{ gridColumn: "span 2" }}
                      focused
                    />

                    <TextField
                      fullWidth
                      variant="standard"
                      type="email"
                      label="Email ID"
                      required
                      onInvalid={(e) => {
                        e.target.setCustomValidity("Please Fill The Email Id");
                      }}
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                      }}
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="email"
                      sx={{ gridColumn: "span 2" }}
                      focused
                      inputProps={{ maxLength: 45 }}
                    />
                    <TextField
                      fullWidth
                      variant="standard"
                      type="number"
                      label="Pincode"
                      required
                      onInvalid={(e) => {
                        e.target.setCustomValidity("Please Fill The Pincode");
                      }}
                      value={values.pincode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="pincode"
                      error={!!touched.pincode && !!errors.pincode}
                      helperText={touched.pincode && errors.pincode}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 6);

                        e.target.setCustomValidity("");
                      }}
                    />

                    <TextField
                      fullWidth
                      variant="standard"
                      type="number"
                      label="Phone"
                      required
                      onInvalid={(e) => {
                        e.target.setCustomValidity("Please Fill The Phone");
                      }}
                      value={values.phone}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="phone"
                      sx={{ gridColumn: "span 2" }}
                      focused
                      error={!!touched.phone && !!errors.phone}
                      helperText={touched.phone && errors.phone}
                      // inputProps={{maxLength: 10}}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 11);

                        e.target.setCustomValidity("");
                      }}
                    />
                    {/* <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="I.E.Code"
                      
                      onInvalid={(e) => {
                        e.target.setCustomValidity("Please Fill The I.E.Code");
                      }}
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                      }}
                      value={values.iECode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="iECode"
                      error={!!touched.iECode && !!errors.iECode}
                      helperText={touched.iECode && errors.iECode}
                      focused
                      inputProps={{ maxLength: 10 }}
                    /> */}

                    {/* <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="RBI Code"
                      value={values.rbiCode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="rbiCode"
                      // error={!!touched.rbiCode && !!errors.rbiCode}
                      // helperText={touched.rbiCode && errors.rbiCode}
                      focused
                      inputProps={{ maxLength: 5 }}
                    /> */}
                    

                    {/* <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="Subscription Code"
                      required
                      onInvalid={(e) => {
                        e.target.setCustomValidity(
                          "Please Fill The License Key"
                        );
                      }}
                      
                      value={values.license}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="license"
                      error={!!touched.license && !!errors.license}
                      helperText={touched.license && errors.license}
                      focused
                      onInput={(e) => {
                       
                        e.target.setCustomValidity(""); // Clear the custom error
                      }}
                      inputProps={{ maxLength: 4 }}
                      
                    /> */}
                    {/* <TextField
                      fullWidth
                      variant="standard"
                      type="number"
                      label="Sort Order"
                      value={values.sortOrder}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="sortOrder"
                      error={!!touched.sortOrder && !!errors.sortOrder}
                      helperText={touched.sortOrder && errors.sortOrder}
                      sx={{
                        gridColumn: "span 2",
                        background: "",
                        input: { textAlign: "right" },
                      }}
                      focused
                      onWheel={(e) => e.target.blur()}
                     
                    /> */}

                    {/* <TextField
                      fullWidth
                      variant="standard"
                      type="number"
                      label="No Of Employees"
                      value={values.noOfEmployees}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="noOfEmployees"
                      sx={{
                        gridColumn: "span 2",
                        input: { textAlign: "right" },
                      }}
                      focused
                      onWheel={(e) => e.target.blur()}
                    /> */}
                    {/* <Box>
                      <Field
                        //  size="small"
                        type="checkbox"
                        name="disable"
                        id="disable"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        as={Checkbox}
                        label="Disable"
                      />

                      <FormLabel focused={false}>Disable</FormLabel>
                      
                    </Box> */}
                  </FormControl>
                </Box>
                <Box
                  display="flex"
                  padding={1}
                  justifyContent="end"
                  mt="20px"
                  gap="20px"
                >
                  <LoadingButton
                    color="success"
                    variant="contained"
                    type="submit"
                    loading={isLoading}
                  >
                    Save
                  </LoadingButton>

                  <Button
                    color="warning"
                    variant="contained"
                    onClick={() => {
                      navigate("/Apps/TR014/Company");
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          {/* </Box> */}
        </Paper>
      ) : (
        false
      )}

      <Popup
        title="Country"
        openPopup={openCNpopup}
        setOpenPopup={setOpenCNpopup}
      >
        <Listviewpopup
          accessID="2003"
          screenName="Country"
          childToParent={childToParent}
        />
      </Popup>
    </Box>
  );
};

export default Trialcompany;
