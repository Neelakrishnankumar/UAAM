import React, { useState, useEffect} from "react";
import Swal from "sweetalert2";
import {
  Typography,
  Box,
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
import {
  getFetchData,
  postData,
} from "../../../store/reducers/Formapireducer";
import { toast } from "react-hot-toast";
import Listviewpopup from "../Lookup";
import Popup from "../popup";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { companySchema } from "../../Security/validation";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { LoadingButton } from "@mui/lab";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { screenRightsData } from "../../../store/reducers/screenRightsreducer";
// ***********************************************
// Developer:Priya
// Purpose: Create Company

// ***********************************************

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
    dispatch(screenRightsData(accessID));

    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const Data = useSelector((state) => state.formApi.Data);
  console.log("🚀 ~ Editcompany ~ Data:", Data)
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  // const { UGA_ADD, UGA_VIEW, UGA_MOD, UGA_DEL, UGA_PROCESS, UGA_PRIN } =
  //   useSelector((state) => state.screenRights.data);

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
    disable: Data.Disable  === "Y" ? true : false ,
    stockClose: Data.Process === "Y" ? true : false ,
    useregular:Data.Regularslno === "Y" ? true : false ,
  };
  /*************************LOOKUP DATA*********************/
  const [openCNpopup, setOpenCNpopup] = useState(false);

  function handleShow(type) {
    if (type == "CN") {
      setOpenCNpopup(true);
    }
  }
  const [isPopupData, setisPopupdata] = React.useState(false);
  const [selectcnLookupData, setselectcnLookupData] = React.useState({
    CNlookupRecordid: "",
    CNlookupCode: "",
    CNlookupDesc: "",
  });

  if (isPopupData == false) {
    selectcnLookupData.CNlookupRecordid = Data.CnRecordID;
    selectcnLookupData.CNlookupCode = Data.CountryCode;
    selectcnLookupData.CNlookupDesc = Data.CountryName;
  }
  const childToParent = (childdata, type) => {

    if (type == "Country") {
      setisPopupdata(true);
      setselectcnLookupData({
        CNlookupCode: childdata.Code,
        CNlookupRecordid: childdata.RecordID,
        CNlookupDesc: childdata.Name,
      });
      setOpenCNpopup(false);
    } else {
    }
  };
  /*************************SAVE FUCTION*********************/
  const fnSave = async (values) => {

    var idata = {
      RecordID: recID,
      CnRecordID: selectcnLookupData.CNlookupRecordid,
      CountryCode: selectcnLookupData.CNlookupCode,
      CountryName: selectcnLookupData.CNlookupDesc,
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
      YearID: Year,
      Disable:values.disable === true ? "Y" : "N",
      Process: values.stockClose === true ? "Y" : "N",
      Regularslno: values.useregular === true ? "Y" : "N",
      Finyear,
      CompanyID,
    };
    let action = mode === "A" ? "insert" : "update";
    const data = await dispatch(postData({ accessID, action, idata }));
    if (data.payload.Status == "Y") {
      sessionStorage.setItem("stockflag",  values.stockClose === true ? "Y" : "N");
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
          <Typography variant="h3">Company</Typography>
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
                  <FormControl
                    fullWidth
                    sx={{ gridColumn: "span 2", gap: "40px" }}
                  >
                    <TextField
                      fullWidth
                      placeholder="Auto"
                      variant="filled"
                      type="text"
                      label="Code"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.code}
                      name="code"
                      error={!!touched.code && !!errors.code}
                      helperText={touched.code && errors.code}
                      focused
                      autoFocus
                      inputProps={{ readOnly: true }}
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
                      inputProps={{ maxLength: 50,}}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
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
                      inputProps={{ maxLength: 500,  }}
                      multiline
                    />
                    <TextField
                      label="ID"
                      variant="filled"
                      value={selectcnLookupData.CNlookupRecordid}
                      focused
                      sx={{ display: "none" }}
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
                        <TextField
                          label="Country"
                          variant="filled"
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
                          variant="filled"
                          value={selectcnLookupData.CNlookupDesc}
                          fullWidth
                          inputProps={{ tabIndex: "-1" }}
                          focused
                        />
                      </FormControl>
                    </FormControl>
                    <TextField
                      fullWidth
                      variant="filled"
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
                      variant="filled"
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
                        // e.target.value = Math.max(0, parseInt(e.target.value))
                        //   .toString()
                        //   .slice(0, 11);

                        e.target.setCustomValidity("");
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="LUT"
                     
                      value={values.Lut}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="Lut"
                      // error={!!touched.gst && !!errors.gst}
                      // helperText={touched.gst && errors.gst}
                      focused
                     
                    />
                  </FormControl>
                  <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Web URL"
                      value={values.web}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="web"
                      error={!!touched.web && !!errors.web}
                      helperText={touched.web && errors.web}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="email"
                      label="Email Id"
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
                      inputProps={{ maxLength: 45, }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="I.E.Code"
                      required
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
                      inputProps={{ maxLength: 10, }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="RBI Code"
                      value={values.rbiCode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="rbiCode"
                      error={!!touched.rbiCode && !!errors.rbiCode}
                      helperText={touched.rbiCode && errors.rbiCode}
                      focused
                      inputProps={{ maxLength: 5,}}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
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
                      inputProps={{ maxLength: 15,  }}
                    />
 
                    <TextField
                      fullWidth
                      variant="filled"
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
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                     
                      focused
                      onWheel={(e) => e.target.blur()} 
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 11);
                      }}
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
                      <Field
                        type="checkbox"
                        name="stockClose"
                        id="stockClose"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        as={Checkbox}
                        label="stockClose"
                      />
                      <FormLabel focused={false}>Opening Stock Close</FormLabel>
                      <Field
                        type="checkbox"
                        name="useregular"
                        id="useregular"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        as={Checkbox}
                        label="useregular"
                      />
                      <FormLabel focused={false}>
                        Use Regular Serial Number
                      </FormLabel>
                    </Box>
                  </FormControl>
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
                      navigate("/Apps/TR014/Company");
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

export default Editcompany;
