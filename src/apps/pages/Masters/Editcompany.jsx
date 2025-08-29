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
import { Formik, Field } from "formik";
import * as Yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFetchData, postData } from "../../../store/reducers/Formapireducer";
import { toast } from "react-hot-toast";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { LoadingButton } from "@mui/lab";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { formGap } from "../../../ui-components/utils";
import { SingleFormikOptimizedAutocomplete } from "../../../ui-components/global/Autocomplete";
import store from "../../..";

export const companySchema = Yup.object().shape({
  address: Yup.string().max(500, "Address must be 500 character "),
  phone: Yup.string().max(10, "Not Valid Phone Number"),
  pincode: Yup
    .number()
    .min(10000, "Not valid Pin Code")
    .max(999999, "Not valid Pin Code"),
    country: Yup.object()
    .required('Please select a country')
    .nullable(),
    license: Yup.string()
    .matches(/^[a-zA-Z0-9]{4}$/, "Please enter alphabets only, exactly 4 characters") // Only letters and digits, 4 characters long
    .test('contains-both', 'The code must contain both letters and numbers', value => {
      return /[a-zA-Z]/.test(value) && /\d/.test(value); // Must contain both letters and numbers
    }),
  iECode: Yup
    .string()
    .matches(/^[-_ a-zA-Z0-9]+$/, "Please enter alphabets only")
    .min(10, "I.E.Code must be 10 character"),
  gst: Yup
    .string()
    .matches(/^[-_ a-zA-Z0-9]+$/, "Only Numeric and Alphabets ")
    .min(15, "GST must be 15 character"),
  email: Yup.string().email("Please enter a valid Email"),
  name: Yup
    .string()
    .max(50)
    .matches(/^[A-Za-z\s\.'-]+$/, "Please enter alphabets only"),
});


const Editcompany = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");

  let recID = params.id;
  let mode = params.Mode;
  let accessID = params.accessID;

  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const Data = useSelector((state) => state.formApi.Data);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const rowData = location.state || {};


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
    disable: Data.Disable === "Y" ? true : false,
    stockClose: Data.Process === "Y" ? true : false,
    useregular: Data.Regularslno === "Y" ? true : false,
    noOfEmployees: Data.NumberOfEmployee,
    noofusers: Data.NumberOfUsers,
    country: Data.CnRecordID
      ? {
          RecordID: Data.CnRecordID,
          Code: Data.CountryCode,
          Name: Data.CountryName,
        }
      : null,
  };

  /*************************SAVE FUCTION*********************/
  const fnSave = async (values) => {
    var idata = {
      RecordID: recID,
      CnRecordID: values.country.RecordID || 0,
      CountryCode: values.country.Code || "",
      CountryName: values.country.Name || "",
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
      Iecode: values.iECode,
      Rbicode: values.rbiCode,
      Gst: values.gst,
      Lut: values.Lut,
      SortOrder: values.sortOrder,
      License: values.license,
      Disable: values.disable === true ? "Y" : "N",
      Process: values.stockClose === true ? "Y" : "N",
      Regularslno: values.useregular === true ? "Y" : "N",
      NumberOfEmployee: values.noOfEmployees,
      NumberOfUsers: values.noofusers,
    };
    let action = mode === "A" ? "insert" : "update";
    const data = await dispatch(postData({ accessID, action, idata }));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      navigate(`/Apps/TR014/Company`);
    } else {
      toast.error(data.payload.Msg);
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
    <Box>
      {getLoading ? <LinearProgress /> : false}
      <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box
            display="flex"
            borderRadius="3px"
            alignItems={"center"}
            justifyContent="space-between"
          >
            {broken && !rtl && (
              <IconButton onClick={() => toggleSidebar()}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
            <Typography variant="h3">
              {mode === "E"
                ? `Company(${rowData.CompanyName})`
                : "Company(New)"}
            </Typography>
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
      </Paper>
      {!getLoading ? (
        <Paper elevation={3} sx={{ margin: "10px" }}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                fnSave(values);
              }, 100);
            }}
            validationSchema={companySchema}
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
                      variant="standard"
                      type="text"
                      label="Code"
                      placeholder="Auto"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.code}
                      focused
                      inputProps={{ maxLength: 5 }}
                      InputProps={{ readOnly: true }}
                      name="code"
                      autoFocus
                    />

                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="Name"
                      onInvalid={(e) => {
                        e.target.setCustomValidity("Please fill the Name");
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
                        e.target.setCustomValidity("Please fill the Address");
                      }}
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                      }}
                      inputProps={{ maxLength: 500 }}
                      multiline
                    />
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
                          label={
                            <>
                              Country
                              <span style={{ color: "red", fontSize: "20px" }}>
                                {" "}
                                *{" "}
                              </span>
                            </>
                          }
                          id="country"
                          name="country"
                          value={values.country}
                          onChange={(e, newValue) => {
                            setFieldValue("country", newValue);
                          }}
                          log
                          url={`${
                            store.getState().globalurl.listViewurl
                          }?data={"Query":{"AccessID":"2003","ScreenName":"Country","Filter":"","Any":"","CompId":"4"}}`}
                        />
                      </FormControl>
                    </FormControl>
                    <TextField
                      fullWidth
                      variant="standard"
                      type="number"
                      label="Pincode"
                      required
                      onInvalid={(e) => {
                        e.target.setCustomValidity("Please fill the Pincode");
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
                        e.target.setCustomValidity("Please fill the Phone");
                      }}
                      value={values.phone}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="phone"
                      sx={{ gridColumn: "span 2" }}
                      focused
                      error={!!touched.phone && !!errors.phone}
                      helperText={touched.phone && errors.phone}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 11);

                        e.target.setCustomValidity("");
                      }}
                    />
                    <TextField
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
                    />
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="LUT"
                      value={values.Lut}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="Lut"
                      inputProps={{ readOnly: true }}
                      focused
                    />
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
                        e.target.setCustomValidity("Please fill the Email Id");
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
                      type="text"
                      label="I.E.Code"
                      onInvalid={(e) => {
                        e.target.setCustomValidity("Please fill the I.E.Code");
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
                    />

                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="RBI Code"
                      value={values.rbiCode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="rbiCode"
                      focused
                      inputProps={{ maxLength: 5 }}
                    />
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="GST"
                      required
                      onInvalid={(e) => {
                        e.target.setCustomValidity("Please fill the GST");
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

                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="Subscription Code"
                      required
                      onInvalid={(e) => {
                        e.target.setCustomValidity(
                          "Please fill the Subscription Code"
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
                    />

                    <TextField
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
                    />
                    <TextField
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
                    />
                    <Box>
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
                    </Box>
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
                    color="secondary"
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
    </Box>
  );
};

export default Editcompany;
