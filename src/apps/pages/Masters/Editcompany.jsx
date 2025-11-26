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
  MenuItem,
  InputLabel,
  Select,
  Chip,
  Breadcrumbs,
} from "@mui/material";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  BankFetchData,
  BankpostData,
  CompReportFetchData,
  CompReportpostData,
  getFetchData,
  postData,
} from "../../../store/reducers/Formapireducer";
import { toast } from "react-hot-toast";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { LoadingButton } from "@mui/lab";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { formGap } from "../../../ui-components/utils";
import {
  CheckinAutocomplete,
  SingleFormikOptimizedAutocomplete,
} from "../../../ui-components/global/Autocomplete";
import store from "../../..";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  CompanyimageUpload,
  imageUpload,
} from "../../../store/reducers/Imguploadreducer";
import Resizer from "react-image-file-resizer";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import { Image } from "@mui/icons-material";

export const companySchema = Yup.object().shape({
  address: Yup.string().max(500, "Address must be 500 character "),
  phone: Yup.string().max(10, "Not Valid Phone Number"),
  pincode: Yup.number()
    .min(10000, "Not valid Pin Code")
    .max(999999, "Not valid Pin Code"),
  country: Yup.object().required("Please select a country").nullable(),
  license: Yup.string()
    .matches(
      /^[a-zA-Z0-9]{4}$/,
      "Please enter alphabets only, exactly 4 characters"
    ) // Only letters and digits, 4 characters long
    .test(
      "contains-both",
      "The code must contain both letters and numbers",
      (value) => {
        return /[a-zA-Z]/.test(value) && /\d/.test(value); // Must contain both letters and numbers
      }
    ),
  iECode: Yup.string()
    .matches(/^[-_ a-zA-Z0-9]+$/, "Please enter alphabets only")
    .min(10, "I.E.Code must be 10 character"),
  gst: Yup.string()
    .matches(/^[-_ a-zA-Z0-9]+$/, "Only Numeric and Alphabets ")
    .min(15, "GST must be 15 character"),
  email: Yup.string().email("Please enter a valid Email"),
  name: Yup.string()
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
  const [errorMsgData, setErrorMsgData] = useState(null);
  const [validationSchema, setValidationSchema] = useState(null);
  const [BankValidationSchema, setBankValidationSchema] = useState(null);
  const [show, setScreen] = React.useState("0");
  const [headerImage, setheaderImage] = useState("");
  const [footerImage, setfooterImage] = useState("");
  const [esignImage, setesignImage] = useState("");
  const [qrCodeImage, setqrCodeImage] = useState("");

  //IMAGE PREVIEW
  const [headerFile, setHeaderFile] = useState(null);
  const [headerPreview, setHeaderPreview] = useState(null);
  const [headerUploaded, setHeaderUploaded] = useState(null);

  const data = useSelector((state) => state.formApi.Data);
  let recID = params.id;
  let mode = params.Mode;
  let accessID = params.accessID;
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/validationcms.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch validationcms.json");
        return res.json();
      })
      .then((data) => {
        setErrorMsgData(data);
        // const schema = Yup.object().shape({
        //   address: Yup.string().required(data.Company.address),
        //   name: Yup.string().required(data.Company.name),
        //   country: Yup.object().required(data.Company.country).nullable(),
        //   email: Yup.string().required(data.Company.email),
        //   pincode: Yup.string().required(data.Company.pincode),
        //   license: Yup.string().required(data.Company.license),

        //   gst: Yup.string().required(data.Company.gst),
        //   phone: Yup.string().required(data.Company.phone),
        // });
        let schemaFields1 = {
          address: Yup.string().required(data.Company.address),
          name: Yup.string().required(data.Company.name),
          country: Yup.object().required(data.Company.country).nullable(),
          email: Yup.string()
            .required(data.Company.email)
            .matches(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              "Invalid Email format"
            ),

          pincode: Yup.string()
            .required(data.Company.pincode)
            .matches(/^\d{6}$/, "Invalid Pincode"),
          license: Yup.string().required(data.Company.license),
          gst: Yup.string()
            .required(data.Company.gst)
            .matches(
              /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
              "Invalid GST number"
            ),

          phone: Yup.string()
            .required(data.Company.phone)
            .matches(/^[6-9]\d{9}$/, "Invalid Phone Number"),
        };

        // IE Code
        schemaFields1.iECode = Yup.string()
          .nullable()
          .notRequired()
          .transform((value) => (value === "" ? null : value))
          .matches(/^[A-Za-z0-9]{10}$/, data.Company.iECode);

        // RBI Code
        schemaFields1.rbiCode = Yup.string()
          .nullable()
          .notRequired()
          .transform((value) => (value === "" ? null : value))
          .matches(/^[A-Za-z0-9]{7,11}$/, data.Company.rbiCode);

        // ************** 2. BANK SCHEMA **************
        const BankSchema = Yup.object().shape({
          bankname: Yup.string().required(data.BankDetails.bankname),
          branchname: Yup.string().required(data.BankDetails.branchname),
          Accounttype: Yup.string().required(data.BankDetails.Accounttype),

          ifsc: Yup.string()
            .required(data.BankDetails.ifsc)
            .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code"),

          accountnumber: Yup.string()
            .required(data.BankDetails.accountnumber)
            .matches(/^\d{9,18}$/, "Invalid Account Number"),

          bankloc: Yup.string().required(data.BankDetails.bankloc),
          accountholdname: Yup.string().required(
            data.BankDetails.accountholdname
          ),
          bankaddress: Yup.string().required(data.BankDetails.bankaddress),
        });

        // ************** 3. SET STATE **************
        const schema1 = Yup.object().shape(schemaFields1);

        setBankValidationSchema(BankSchema);
        setValidationSchema(schema1);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, []);
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  const [validationSchema2, setValidationSchema2] = useState(null);

  const { toggleSidebar, broken, rtl } = useProSidebar();
  const Data = useSelector((state) => state.formApi.Data);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const partyBankgetdata = useSelector((state) => state.formApi.BankData);
  const CompReportgetdata = useSelector(
    (state) => state.formApi.CompReportData
  );
  const BankgetLoading = useSelector((state) => state.formApi.BankgetLoading);
  const CompReportgetLoading = useSelector(
    (state) => state.formApi.CompReportgetLoading
  );
  const BankisLoading = useSelector((state) => state.formApi.BankpostLoading);
  const CompReportpostDataLoading = useSelector(
    (state) => state.formApi.CompReportpostDataLoading
  );
  const [loading, setLoading] = useState(false);

  const rowData = location.state || {};
  const screenChange = (event) => {
    setScreen(event.target.value);
    if (event.target.value == "0") {
      console.log(event.target.value, "--find event.target.value");

      if (recID && mode === "E") {
        dispatch(getFetchData({ accessID, get: "get", recID }));
      } else {
        dispatch(getFetchData({ accessID, get: "", recID }));
      }
    }
    if (event.target.value == "1") {
      if (recID && mode === "E") {
        dispatch(BankFetchData({ get: "get", recID }));
      } else {
        dispatch(BankFetchData({ get: "", recID }));
      }
    }
    if (event.target.value == "2") {
      if (recID && mode === "E") {
        dispatch(CompReportFetchData({ recID }));
      } else {
        dispatch(CompReportFetchData({ get: "", recID }));
      }
    }
  };

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
    Module: mode === "E" ? Data.Module : "",
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
      Module: values.Module,
    };
    console.log(values.Module);

    let action = mode === "A" ? "insert" : "update";
    const data = await dispatch(postData({ accessID, action, idata }));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      navigate(`/Apps/TR014/Company`);
    } else {
      toast.error(data.payload.Msg);
    }
  };

  const BankInitialValue = {
    code: partyBankgetdata.Code || "",
    name: partyBankgetdata.Name || "",
    bankname: partyBankgetdata.BankName || "",
    Accounttype: partyBankgetdata.BankAccountType || "",
    branchname: partyBankgetdata.BankBranchName || "",
    ifsc: partyBankgetdata.BankIfsc || "",
    bankloc: partyBankgetdata.BankLocation || "",
    accountnumber: partyBankgetdata.BankAccountNo || "",
    bankaddress: partyBankgetdata.BankAddress || "",
    accountholdname: partyBankgetdata.BankAccountHolderName || "",
  };

  const Banksave = async (values, del) => {
    setLoading(true);

    let action =
      mode === "A" && !del
        ? "insert"
        : mode === "E" && del
        ? "harddelete"
        : "update";

    const idata = {
      action: "update",
      RecordID: recID,
      BankName: values.bankname,
      BankBranchName: values.branchname,
      BankAccountHolderName: values.accountholdname,
      BankAccountNo: values.accountnumber,
      BankAccountType: values.Accounttype,
      BankIfsc: values.ifsc,
      BankLocation: values.bankloc,
      BankAddress: values.bankaddress,
    };

    try {
      const response = await dispatch(BankpostData({ idata }));

      if (response.payload.Status === "Y") {
        toast.success(response.payload.Msg);
        // navigate("/Apps/TR243/Party");
        //setScreen(0);
      } else {
        toast.error(response.payload.Msg);
      }
    } catch (error) {
      toast.error("An error occurred while saving data.");
    } finally {
      setLoading(false);
    }
  };

  const CompReportInitialValue = {
    code: CompReportgetdata.Code || "",
    name: CompReportgetdata.Name || "",
    CmHeader: CompReportgetdata.CmHeader || "",
    CmFooter: CompReportgetdata.CmFooter || "",
    Signature: CompReportgetdata.Signature || "",
    QrCode: CompReportgetdata.QrCode || "",
  };

  const CompReportsave = async (values, del) => {
    setLoading(true);

    const idata = {
      action: "update",
      CompanyID: recID,
      QrCode: qrCodeImage,
      Signature: esignImage,
      CmHeader: headerImage,
      CmFooter: footerImage,
    };

    try {
      const response = await dispatch(CompReportpostData({ idata }));

      if (response.payload.Status === "Y") {
        toast.success(response.payload.Msg);
        // navigate("/Apps/TR243/Party");
        //setScreen(0);
      } else {
        toast.error(response.payload.Msg);
      }
    } catch (error) {
      toast.error("An error occurred while saving data.");
    } finally {
      setLoading(false);
    }
  };
  const fnLogOut = (props) => {
    Swal.fire({
      title: errorMsgData.Warningmsg[props],
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

  const getFileHeaderChange = async (event) => {
    setheaderImage(event.target.files[0]);
    const file = event.target.files[0];

    if (!file) return;
    setHeaderFile(file);

    setHeaderPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "images");

    const fileData = await dispatch(CompanyimageUpload({ formData }));
    setheaderImage(fileData.payload.name);
    console.log(">>>", fileData.payload);
    console.log(
      "🚀 ~ file: Editdeliverychalan.jsx:1143 ~ getFileChange ~ fileData:",
      fileData
    );
    if (fileData.payload.Status == "Y") {
      // console.log("I am here");
      toast.success(fileData.payload.Msg);
    }
  };
  //   const getFileHeaderChange = async (e) => {
  //   let files = e.target.files;
  //   let fileReader = new FileReader();

  //   fileReader.readAsDataURL(files[0]);
  //   fileReader.onload = (event) => {
  //     let fileInput = !!event.target.result;
  //     if (fileInput) {
  //       try {
  //         Resizer.imageFileResizer(
  //           files[0],
  //           150,
  //           150,
  //           "JPEG",
  //           100,
  //           0,
  //           async (uri) => {
  //             const formData = { file: uri, type: "images" };
  //             const fileData = await dispatch(CompanyimageUpload({ formData }));
  //             console.log("Uploaded File Response:", fileData);

  //             if (fileData?.payload?.Status === "Y") {
  //               toast.success(fileData.payload.Msg);
  //               setheaderImage(fileData.payload.name);
  //             } else {
  //               toast.error("File upload failed.");
  //             }
  //           },
  //           "base64",
  //           150,
  //           150
  //         );
  //       } catch (err) {
  //         console.log(err);
  //         toast.error("An error occurred during file processing.");
  //       }
  //     }
  //   };
  // };

  const getFileFooterChange = async (event) => {
    setfooterImage(event.target.files[0]);

    console.log(event.target.files[0]);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "images");

    const fileData = await dispatch(CompanyimageUpload({ formData }));
    setfooterImage(fileData.payload.name);
    console.log(">>>", fileData.payload);
    console.log(
      "🚀 ~ file: Editdeliverychalan.jsx:1143 ~ getFileChange ~ fileData:",
      fileData
    );
    if (fileData.payload.Status == "Y") {
      // console.log("I am here");
      toast.success(fileData.payload.Msg);
    }
  };

  const getFileESignChange = async (event) => {
    setesignImage(event.target.files[0]);

    console.log(event.target.files[0]);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "images");

    const fileData = await dispatch(CompanyimageUpload({ formData }));
    setesignImage(fileData.payload.name);
    console.log(">>>", fileData.payload);
    console.log(
      "🚀 ~ file: Editdeliverychalan.jsx:1143 ~ getFileChange ~ fileData:",
      fileData
    );
    if (fileData.payload.Status == "Y") {
      // console.log("I am here");
      toast.success(fileData.payload.Msg);
    }
  };

  const getFileQRCodeChange = async (event) => {
    setqrCodeImage(event.target.files[0]);

    console.log(event.target.files[0]);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "images");

    const fileData = await dispatch(CompanyimageUpload({ formData }));
    setqrCodeImage(fileData.payload.name);
    console.log(">>>", fileData.payload);
    console.log(
      "🚀 ~ file: Editdeliverychalan.jsx:1143 ~ getFileChange ~ fileData:",
      fileData
    );
    if (fileData.payload.Status == "Y") {
      // console.log("I am here");
      toast.success(fileData.payload.Msg);
    }
  };

  return (
    <Box>
      {getLoading ? <LinearProgress /> : false}
      {BankgetLoading ? <LinearProgress /> : false}
      {CompReportgetLoading ? <LinearProgress /> : false}
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
            <Breadcrumbs
              maxItems={3}
              aria-label="breadcrumb"
              separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
            >
              <Typography
                variant="h3"
                onClick={() => navigate("/Apps/TR014/Company")}
              >
                {mode === "E"
                  ? `Company(${rowData.CompanyName})`
                  : "Company(New)"}
              </Typography>
              {mode === "E" && show == "0" ? (
                <Typography variant="h3">Company Details</Typography>
              ) : null}
              {mode === "E" && show == "1" ? (
                <Typography variant="h3">Bank Details</Typography>
              ) : null}
              {mode === "E" && show == "2" ? (
                <Typography variant="h3">Report Settings</Typography>
              ) : null}
            </Breadcrumbs>
          </Box>

          <Box display="flex">
            {mode !== "A" ? (
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Explore</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={show}
                  label="Explore"
                  onChange={screenChange}
                >
                  <MenuItem value={0}>Company</MenuItem>
                  <MenuItem value={1}>Bank Deatils</MenuItem>
                  <MenuItem value={2}>Report Settings</MenuItem>
                </Select>
              </FormControl>
            ) : (
              false
            )}
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
      {/* {!getLoading ? ( */}
      {show == "0" ? (
        <Paper elevation={3} sx={{ margin: "10px" }}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                fnSave(values);
              }, 100);
            }}
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
                      label={
                        <>
                          Name{" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </>
                      }
                      // onInvalid={(e) => {
                      //   e.target.setCustomValidity("Please fill the Name");
                      // }}
                      // onInput={(e) => {
                      //   e.target.setCustomValidity("");
                      // }}
                      value={values.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="name"
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      // required
                      inputProps={{ maxLength: 50 }}
                      autoFocus
                    />

                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label={
                        <>
                          Address{" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </>
                      }
                      value={values.address}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="address"
                      error={!!touched.address && !!errors.address}
                      helperText={touched.address && errors.address}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      // required
                      // onInvalid={(e) => {
                      //   e.target.setCustomValidity("Please fill the Address");
                      // }}
                      // onInput={(e) => {
                      //   e.target.setCustomValidity("");
                      // }}
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
                        <CheckinAutocomplete
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
                          error={!!touched.country && !!errors.country}
                          helperText={touched.country && errors.country}
                          onChange={(e, newValue) => {
                            setFieldValue("country", newValue);
                          }}
                          // log
                          url={`${
                            store.getState().globalurl.listViewurl
                          }?data={"Query":{"AccessID":"2003","ScreenName":"Country","Filter":"","Any":"","CompId":"4"}}`}
                        />

                        {/* {touched.country && errors.country && (
                          <div style={{ color: "red", fontSize: "12px", marginTop: "2px" }}>
                            {errors.country}
                          </div>
                        )} */}
                      </FormControl>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        label="RBI Code"
                        value={values.rbiCode}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="rbiCode"
                        error={!!touched.rbiCode && !!errors.rbiCode}
                        helperText={touched.rbiCode && errors.rbiCode}
                        focused
                        // inputProps={{ maxLength: 5 }}
                      />
                    </FormControl>
                    <TextField
                      fullWidth
                      variant="standard"
                      type="number"
                      label={
                        <>
                          Pincode
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </>
                      }
                      // required
                      // onInvalid={(e) => {
                      //   e.target.setCustomValidity("Please fill the Pincode");
                      // }}
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
                      label={
                        <>
                          Phone
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </>
                      }
                      // required
                      // onInvalid={(e) => {
                      //   e.target.setCustomValidity("Please fill the Phone");
                      // }}
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
                          .slice(0, 10);

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
                      label={
                        <>
                          Email ID
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </>
                      }
                      // required
                      // onInvalid={(e) => {
                      //   e.target.setCustomValidity("Please fill the Email Id");
                      // }}
                      // onInput={(e) => {
                      //   e.target.setCustomValidity("");
                      // }}
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      name="email"
                      sx={{ gridColumn: "span 2" }}
                      focused
                      inputProps={{ maxLength: 45 }}
                    />
                    {/* <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="I.E.Code"
                      // required
                      // onInvalid={(e) => {
                      //   e.target.setCustomValidity("Please fill the I.E.Code");
                      // }}
                      // onInput={(e) => {
                      //   e.target.setCustomValidity("");
                      // }}
                      value={values.iECode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="iECode"
                      error={!!touched.iECode && !!errors.iECode}
                      helperText={touched.iECode && errors.iECode}
                      focused
                    // inputProps={{ maxLength: 10 }}
                    /> */}
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      id="iECode"
                      name="iECode"
                      value={values.iECode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="I.E.Code"
                      focused
                      onWheel={(e) => e.target.blur()}
                      error={!!touched.iECode && !!errors.iECode}
                      helperText={touched.iECode && errors.iECode}
                    />

                    {/* <FormControl
                      variant="standard"
                      fullWidth
                      // required 
                      focused>
                      <InputLabel id="module-label">Module</InputLabel>
                      <Select
                        labelId="module-label"
                        id="Module"
                        name="Module"
                        multiple
                        value={values.Module}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        renderValue={(selected) => selected.join(', ')}
                      >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Task">Task</MenuItem>
                        <MenuItem value="Project">Project</MenuItem>
                        <MenuItem value="Attendance">Attendance</MenuItem>
                        <MenuItem value="Request">Request</MenuItem>
                        <MenuItem value="Assessment">Assessment</MenuItem>
                        <MenuItem value="Myprofile">Myprofile</MenuItem>
                      </Select>
                    </FormControl> */}
                    <FormControl variant="standard" fullWidth focused>
                      <InputLabel id="module-label">Module</InputLabel>

                      <Select
                        labelId="module-label"
                        id="Module"
                        name="Module"
                        multiple
                        // Convert comma-separated string to array for MUI Select
                        value={values.Module ? values.Module.split(",") : []}
                        onChange={(e) => {
                          // Convert array back to comma-separated string
                          handleChange({
                            target: {
                              name: "Module",
                              value: e.target.value.join(","),
                            },
                          });
                        }}
                        onBlur={handleBlur}
                        renderValue={(selected) => selected.join(", ")}
                      >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Task">Task</MenuItem>
                        <MenuItem value="Project">Project</MenuItem>
                        <MenuItem value="Attendance">Attendance</MenuItem>
                        <MenuItem value="Request">Request</MenuItem>
                        <MenuItem value="Assessment">Assessment</MenuItem>
                        <MenuItem value="Myprofile">Myprofile</MenuItem>
                      </Select>
                    </FormControl>

                    {/* <FormControl variant="standard" fullWidth focused>
                      <InputLabel id="module-label">Module</InputLabel>

                      <Select
                        labelId="module-label"
                        id="Module"
                        name="Module"
                        multiple
                        value={values.Module?.split(",") || []} // convert string to array safely
                        onChange={(e) => {
                          // Convert selected array back to comma-separated string
                          handleChange({
                            target: {
                              name: "Module",
                              value: e.target.value.join(","),
                            },
                          });
                        }}
                        onBlur={handleBlur}
                        renderValue={(selected) => (
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {selected.map((value) => (
                              <Chip
                                key={value}
                                label={value}
                                onDelete={() => {
                                  // Remove value inside the field
                                  const newSelected = (values.Module || "")
                                    .split(",")
                                    .filter((item) => item !== value)
                                    .join(",");
                                  handleChange({
                                    target: { name: "Module", value: newSelected },
                                  });
                                }}
                              />
                            ))}
                          </Box>
                        )}
                      >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Task">Task</MenuItem>
                        <MenuItem value="Project">Project</MenuItem>
                        <MenuItem value="Attendance">Attendance</MenuItem>
                        <MenuItem value="Request">Request</MenuItem>
                        <MenuItem value="Assessment">Assessment</MenuItem>
                        <MenuItem value="Myprofile">Myprofile</MenuItem>
                      </Select>
                    </FormControl> */}
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label={
                        <>
                          GST
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </>
                      }
                      // required
                      // onInvalid={(e) => {
                      //   e.target.setCustomValidity("Please fill the GST");
                      // }}
                      // onInput={(e) => {
                      //   e.target.setCustomValidity("");
                      // }}
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
                      label={
                        <>
                          Subscription Code
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </>
                      }
                      // required
                      // onInvalid={(e) => {
                      //   e.target.setCustomValidity(
                      //     "Please fill the Subscription Code"
                      //   );
                      // }}
                      // onInput={(e) => {
                      //   e.target.setCustomValidity("");
                      // }}
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

      {show == "1" ? (
        <Paper elevation={3} sx={{ margin: "10px" }}>
          <Formik
            initialValues={BankInitialValue}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                Banksave(values);
              }, 100);
            }}
            validationSchema={BankValidationSchema}
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
                  gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                  // gap="30px"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 2",
                    },
                  }}
                >
                  {/* {CompanyAutoCode == "Y" ? (
                    <TextField
                      name="code"
                      type="text"
                      id="code"
                      label="Code"
                      variant="standard"
                      placeholder="Auto"
                      focused
                      // required
                      value={values.code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.code && !!errors.code}
                      helperText={touched.code && errors.code}
                      sx={{
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                        },
                      }}
                      InputProps={{ readOnly: true }}
                      // autoFocus
                    />
                  ) : ( */}
                  <TextField
                    name="code"
                    type="text"
                    id="code"
                    label={
                      <>
                        Code
                        {/* <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span> */}
                      </>
                    }
                    variant="standard"
                    focused
                    // required
                    value={values.code}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.code && !!errors.code}
                    helperText={touched.code && errors.code}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    InputProps={{
                      inputProps: {
                        readOnly: true,
                      },
                    }}
                    autoFocus
                  />
                  {/* )} */}
                  <TextField
                    name="name"
                    type="text"
                    id="name"
                    label={
                      <>
                        Name
                        {/* <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span> */}
                      </>
                    }
                    variant="standard"
                    focused
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    InputProps={{
                      inputProps: {
                        readOnly: true,
                      },
                    }}
                    // required
                    //autoFocus={CompanyAutoCode == "Y"}
                  />
                  <TextField
                    name="bankname"
                    type="text"
                    id="bankname"
                    label={
                      <>
                        Bank Name
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
                    variant="standard"
                    focused
                    // required
                    value={values.bankname}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.bankname && !!errors.bankname}
                    helperText={touched.bankname && errors.bankname}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    autoFocus
                  />
                  <TextField
                    name="Accounttype"
                    type="text"
                    id="Accounttype"
                    label={
                      <>
                        Account Type
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
                    variant="standard"
                    focused
                    // required
                    value={values.Accounttype}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.Accounttype && !!errors.Accounttype}
                    helperText={touched.Accounttype && errors.Accounttype}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    autoFocus
                  />
                  <TextField
                    name="branchname"
                    label={
                      <>
                        Branch Name
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
                    variant="standard"
                    focused
                    // required
                    value={values.branchname}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    // onChange={(e) => {
                    //   const input = e.target.value.toUpperCase();
                    //   if (/^[A-Z0-9]*$/.test(input) || input === "") {
                    //     handleChange({
                    //       target: {
                    //         name: "branchname",
                    //         value: input,
                    //       },
                    //     });
                    //   }
                    // }}
                    error={!!touched.branchname && !!errors.branchname}
                    helperText={touched.branchname && errors.branchname}
                    sx={{
                      backgroundColor: "#ffffff",
                    }}
                    autoFocus
                  />
                  <TextField
                    name="ifsc"
                    label={
                      <>
                        IFSC Code
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
                    variant="standard"
                    focused
                    // required
                    value={values.ifsc}
                    onBlur={handleBlur}
                    //  onChange={handleChange}
                    onChange={(e) => {
                      const input = e.target.value.toUpperCase();
                      if (/^[0-9A-Z]*$/.test(input) || input === "") {
                        // This updates Formik value correctly
                        handleChange({
                          target: {
                            name: "ifsc",
                            value: input,
                          },
                        });
                      }
                    }}
                    error={!!touched.ifsc && !!errors.ifsc}
                    helperText={touched.ifsc && errors.ifsc}
                    sx={{
                      backgroundColor: "#ffffff",
                    }}
                    autoFocus
                  />
                  <TextField
                    name="accountholdname"
                    type="text"
                    id="accountholdname"
                    label={
                      <>
                        Account Holder Name
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
                    variant="standard"
                    focused
                    // required
                    value={values.accountholdname}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={
                      !!touched.accountholdname && !!errors.accountholdname
                    }
                    helperText={
                      touched.accountholdname && errors.accountholdname
                    }
                    // inputProps={{ maxLength: 10 }}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    autoFocus
                  />

                  <TextField
                    name="bankloc"
                    type="text"
                    id="bankloc"
                    label={
                      <>
                        Bank Location
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
                    variant="standard"
                    focused
                    // required
                    value={values.bankloc}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    autoFocus
                    error={!!touched.bankloc && !!errors.bankloc}
                    helperText={touched.bankloc && errors.bankloc}
                  />
                  {/* <TextField
                    name="accountnumber"
                    type="number"
                    id="accountnumber"
                    label="Account Number"
                    variant="standard"
                    focused
                     required
                    value={values.accountnumber}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    autoFocus
                  /> */}
                  <TextField
                    name="accountnumber"
                    type="text" // use "text" instead of "number" to preserve leading 0s and better control
                    id="accountnumber"
                    label={
                      <>
                        Account Number
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
                    variant="standard"
                    focused
                    // required
                    value={values.accountnumber}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      const input = e.target.value;
                      // Allow only digits
                      if (/^\d*$/.test(input)) {
                        handleChange({
                          target: {
                            name: "accountnumber",
                            value: input,
                          },
                        });
                      }
                    }}
                    error={!!touched.accountnumber && !!errors.accountnumber}
                    helperText={touched.accountnumber && errors.accountnumber}
                    sx={{
                      backgroundColor: "#ffffff",
                    }}
                    autoFocus
                  />
                  <TextField
                    name="bankaddress"
                    type="text"
                    id="bankaddress"
                    label={
                      <>
                        Bank Address
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
                    variant="standard"
                    focused
                    // required
                    value={values.bankaddress}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    error={!!touched.bankaddress && !!errors.bankaddress}
                    helperText={touched.bankaddress && errors.bankaddress}
                    autoFocus
                  />
                </Box>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  padding={1}
                  gap="20px"
                >
                  {/* {YearFlag == "true" ? ( */}
                  <LoadingButton
                    color="secondary"
                    variant="contained"
                    type="submit"
                    loading={isLoading}
                  >
                    Save
                  </LoadingButton>
                  {/* ) : (
                    <Button
                      color="secondary"
                      variant="contained"
                      disabled={true}
                    >
                      Save
                    </Button>
                  )}{" "} */}

                  <Button
                    color="warning"
                    variant="contained"
                    onClick={() => {
                      setScreen(0);
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Paper>
      ) : (
        false
      )}

      {show == "2" ? (
        <Paper elevation={3} sx={{ margin: "10px" }}>
          <Formik
            initialValues={CompReportInitialValue}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                CompReportsave(values);
              }, 100);
            }}
            //validationSchema={BankValidationSchema}
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
                  gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                  // gap="30px"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 2",
                    },
                  }}
                >
                  {/* {CompanyAutoCode == "Y" ? (
                    <TextField
                      name="code"
                      type="text"
                      id="code"
                      label="Code"
                      variant="standard"
                      placeholder="Auto"
                      focused
                      // required
                      value={values.code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.code && !!errors.code}
                      helperText={touched.code && errors.code}
                      sx={{
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                        },
                      }}
                      InputProps={{ readOnly: true }}
                      // autoFocus
                    />
                  ) : ( */}
                  <TextField
                    name="code"
                    type="text"
                    id="code"
                    label={
                      <>
                        Code
                        {/* <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span> */}
                      </>
                    }
                    variant="standard"
                    focused
                    // required
                    value={values.code}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.code && !!errors.code}
                    helperText={touched.code && errors.code}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    InputProps={{
                      inputProps: {
                        readOnly: true,
                      },
                    }}
                    autoFocus
                  />
                  {/* )} */}
                  <TextField
                    name="name"
                    type="text"
                    id="name"
                    label={
                      <>
                        Name
                        {/* <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span> */}
                      </>
                    }
                    variant="standard"
                    focused
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    InputProps={{
                      inputProps: {
                        readOnly: true,
                      },
                    }}
                    // required
                    //autoFocus={CompanyAutoCode == "Y"}
                  />
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  padding={1}
                  gap="20px"
                >
                  <Box>
                    {/* HEADER IMAGE */}
                    <Tooltip title="Header Image Upload">
                      <IconButton
                        size="small"
                        color="warning"
                        aria-label="upload picture"
                        component="label"
                      >
                        <input
                          hidden
                          accept="all/*"
                          type="file"
                          onChange={getFileHeaderChange}
                        />
                        <PictureAsPdfOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Button
                      size="small"
                      variant="contained"
                      component={"a"}
                      onClick={() => {
                        CompReportgetdata.CmHeader || headerImage
                          ? window.open(
                              headerImage
                                ? store.getState().globalurl.imageUrl +
                                    headerImage
                                : store.getState().globalurl.imageUrl +
                                    CompReportgetdata.CmHeader,
                              "_blank"
                            )
                          : toast.error("Please Upload File");
                      }}
                    >
                      Header Image View
                    </Button>
                    {/* <Image
                      src={
                        headerPreview
                          ? headerPreview 
                          : headerUploaded
                          ? store.getState().globalurl.imageUrl + headerUploaded
                          : store.getState().globalurl.imageUrl +
                            CompReportgetdata.CmHeader
                      }
                      width={300}
                      height={300}
                    /> */}
                  </Box>
                  <Box>
                    {/* FOOTER IMAGE */}
                    <Tooltip title="Footer Upload">
                      <IconButton
                        size="small"
                        color="warning"
                        aria-label="upload picture"
                        component="label"
                      >
                        <input
                          hidden
                          accept="all/*"
                          type="file"
                          onChange={getFileFooterChange}
                        />
                        <PictureAsPdfOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Button
                      size="small"
                      variant="contained"
                      component={"a"}
                      onClick={() => {
                        CompReportgetdata.CmFooter || footerImage
                          ? window.open(
                              footerImage
                                ? store.getState().globalurl.imageUrl +
                                    footerImage
                                : store.getState().globalurl.imageUrl +
                                    CompReportgetdata.CmFooter,
                              "_blank"
                            )
                          : toast.error("Please Upload File");
                      }}
                    >
                      Footer Image View
                    </Button>
                  </Box>
                  <Box>
                    {/* E-SIGN IMAGE */}
                    <Tooltip title="E-Sign Upload">
                      <IconButton
                        size="small"
                        color="warning"
                        aria-label="upload picture"
                        component="label"
                      >
                        <input
                          hidden
                          accept="all/*"
                          type="file"
                          onChange={getFileESignChange}
                        />
                        <PictureAsPdfOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Button
                      size="small"
                      variant="contained"
                      component={"a"}
                      onClick={() => {
                        CompReportgetdata.Signature || esignImage
                          ? window.open(
                              esignImage
                                ? store.getState().globalurl.imageUrl +
                                    esignImage
                                : store.getState().globalurl.imageUrl +
                                    CompReportgetdata.Signature,
                              "_blank"
                            )
                          : toast.error("Please Upload File");
                      }}
                    >
                      E-Sign Image View
                    </Button>
                  </Box>
                  <Box>
                    {/* QR CODE IMAGE */}
                    <Tooltip title="QR Code Upload">
                      <IconButton
                        size="small"
                        color="warning"
                        aria-label="upload picture"
                        component="label"
                      >
                        <input
                          hidden
                          accept="all/*"
                          type="file"
                          onChange={getFileQRCodeChange}
                        />
                        <PictureAsPdfOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Button
                      size="small"
                      variant="contained"
                      component={"a"}
                      onClick={() => {
                        CompReportgetdata.QrCode || qrCodeImage
                          ? window.open(
                              qrCodeImage
                                ? store.getState().globalurl.imageUrl +
                                    qrCodeImage
                                : store.getState().globalurl.imageUrl +
                                    CompReportgetdata.QrCode,
                              "_blank"
                            )
                          : toast.error("Please Upload File");
                      }}
                    >
                      QR Code View
                    </Button>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  padding={1}
                  gap="20px"
                >
                  {/* {YearFlag == "true" ? ( */}
                  <LoadingButton
                    color="secondary"
                    variant="contained"
                    type="submit"
                    loading={isLoading}
                  >
                    Save
                  </LoadingButton>
                  {/* ) : (
                    <Button
                      color="secondary"
                      variant="contained"
                      disabled={true}
                    >
                      Save
                    </Button>
                  )}{" "} */}

                  <Button
                    color="warning"
                    variant="contained"
                    onClick={() => {
                      setScreen(0);
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Paper>
      ) : (
        false
      )}
    </Box>
  );
};

export default Editcompany;
