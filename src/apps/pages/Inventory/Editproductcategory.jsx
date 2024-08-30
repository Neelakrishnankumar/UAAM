import {
  Typography,
  Menu,
  Box,
  Button,
  TextField,
  Stack,
  IconButton,
  Avatar,
  FormLabel,
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
  LinearProgress,
} from "@mui/material";
import { Formik, Field, ErrorMessage } from "formik";
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
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { productcategoriesSchema } from "../../Security/validation";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// ***********************************************
//  Developer:Priya
// Purpose:To Create Different Product Category

// ***********************************************
const Editproductcategory = () => {
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
  const handleFormSubmit = (values) => {
    console.log(values);
  };
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
  const location = useLocation();
  const { toggleSidebar, broken, rtl } = useProSidebar();
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  // save
  const [ini, setIni] = useState(true);
  const [loading, setLoading] = useState(false);
  var userimg = store.getState().globalurl.imageUrl;
  if (mode == "A") {
    userimg = userimg + "Defaultimg.jpg";
  } else {
    if (
      Data.ImageName == undefined ||
      Data.ImageName == null ||
      Data.ImageName == ""
    ) {
      userimg = userimg + "Defaultimg.jpg";
    } else {
      userimg = userimg + Data.ImageName;
    }
  }

  var apiData = "";
  apiData = {
    Code: Data.Code,
    HsnCode: Data.HsnCode,
    Desc: Data.Desc,
    Cgst: Data.Cgst,
    Sgst: Data.Sgst,
    Igst: Data.Igst,
    SortOrder: Data.SortOrder,
    Disable: Data.Disable,
    Prefix: Data.Prefix,
    Nextno: Data.Nextno,
  };
  //*******Assign Productcategory values from Database in  Yup initial value******* */
  const initialValues = {
    code: apiData.Code,
    HsnCode: apiData.HsnCode,
    desc: apiData.Desc,
    // Cgst: apiData.Cgst,
    Cgst: Number(apiData.Cgst).toFixed(2),
    // Sgst: apiData.Sgst,
    Sgst: Number(apiData.Sgst).toFixed(2),
    // Igst: apiData.Igst,
    Igst: Number(apiData.Igst).toFixed(2),
    SortOrder: apiData.SortOrder,
    checkbox: Data.Disable === "Y" ? true : false,
    Prefix: apiData.Prefix,
    Nextno: apiData.Nextno,
  };
  //************Save Function*******************
  const fnSave = async (values, types) => {
    setLoading(true);
    setIni(false);
    if (values.code == "") {
      toast.error("Please Fill Code");
      return;
    }
    if (values.HsnCode == "") {
      toast.error("Please Fill HsnCode");
      return;
    }
    if (values.desc == "") {
      toast.error("Please Fill Description");
      return;
    }
    var isCheck = "N";
    if (values.checkbox == true) {
      isCheck = "Y";
    }

    var idata = "";
    var type = "";

    if (types === "harddelete") {
      idata = {
        RecordId: recID,
        HsnCode: values.HsnCode,
        Desc: values.desc,
        Cgst: 0,
        Sgst: 0,
        Igst: 0,
        Code: values.code,
        SortOrder: values.SortOrder,
        Disable:values.checkbox === true ? "Y" : "N",
        Prefix: values.Prefix,
        Nextno: values.Nextno,
        Finyear,
        CompanyID,
      };
      type = "harddelete";
    } else {
      if (mode == "A") {
        idata = {
          RecordId: "",
          HsnCode: values.HsnCode,
          Desc: values.desc,
          Cgst: 0,
          Sgst: 0,
          Igst: 0,
          Code: values.code,
          SortOrder: values.SortOrder,
          Disable: values.checkbox === true ? "Y" : "N",
          Prefix: values.Prefix,
          Nextno: values.Nextno,
          Finyear,
          CompanyID,
        };
        type = "insert";
      } else {
        idata = {
          RecordId: recID,
          HsnCode: values.HsnCode,
          Desc: values.desc,
          Cgst: 0,
          Sgst: 0,
          Igst: 0,
          Code: values.code,
          SortOrder: values.SortOrder,
          Disable: values.checkbox === true ? "Y" : "N",
          Prefix: values.Prefix,
          Nextno: values.Nextno,
          Finyear,
          CompanyID,
        };
        type = "update";
      }
    }
    // const data = await dispatch(postApidata(accessID, type, idata));
    let action = mode === "A" ? "insert" : "update";
    const data = await dispatch(postData({ accessID, action, idata }));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      setIni(true);
      setLoading(false);
      navigate(`/Apps/TR002/Categories`);
    } else {
      toast.error(data.payload.Msg);
      setLoading(false);
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
          navigate("/Apps/TR002/Categories");
        }
      } else {
        return;
      }
    });
  };
  const ref = useRef(null);
  return (
    <React.Fragment>
      {getLoading ? <LinearProgress /> : false}
      <Box sx={{ height: "100vh", overflow: "auto" }}>
        <Box display="flex" justifyContent="space-between" p={2}>
          {/* SEARCH BAR */}
          <Box
            display="flex"
            // backgroundColor={colors.primary[400]}
            borderRadius="3px"
            alignItems={"center"}
          >
            {broken && !rtl && (
              <IconButton onClick={() => toggleSidebar()}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
            <Typography variant="h3">Product Category</Typography>
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
              onSubmit={(values, setSubmitting) => {
                setTimeout(() => {
                  fnSave(values);
                  // alert("hai");
                }, 100);
              }}
              validationSchema={productcategoriesSchema}
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
                        type="number"
                        label="Code"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.code}
                        id="code"
                        name="code"
                        sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                        focused
                        autoFocus
                        error={!!touched.code && !!errors.code}
                        helperText={touched.code && errors.code}
                        onInvalid={(e) => {
                          e.target.setCustomValidity("Please Fill The Code");
                        }}
                        onWheel={(e) => e.target.blur()} 
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 3);
                          e.target.setCustomValidity("");
                        }}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="HSN"
                        id="HsnCode"
                        required
                        sx={{ background: "#fff6c3" }}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.HsnCode}
                        name="HsnCode"
                        error={!!touched.HsnCode && !!errors.HsnCode}
                        helperText={touched.HsnCode && errors.HsnCode}
                        focused
                        onWheel={(e) => e.target.blur()} 
                        // inputProps={{ maxLength: 15 }}
                        // onInvalid={(e) => {
                        //   e.target.setCustomValidity("Please Fill The HSN");
                        // }}
                        // onInput={(e) => {
                        //   e.target.value = Math.max(0, parseInt(e.target.value))
                        //     .toString()
                        //     .slice(0, 8);
                        //   e.target.setCustomValidity("");
                        // }}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Description"
                        id="desc"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.desc}
                        name="desc"
                        error={!!touched.desc && !!errors.desc}
                        helperText={touched.desc && errors.desc}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        inputProps={{ maxLength: 30 }}
                        multiline
                        // rows={2}
                        onInvalid={(e) => {
                          e.target.setCustomValidity(
                            "Please Fill The Description"
                          );
                        }}
                       
                        onInput={(e) => {
                          e.target.setCustomValidity("");
                        }}
                      />
                      {/* <TextField
                    fullWidth
                    variant="filled"
                    type="Number"
                    label="CGST"
                    value={values.Cgst}
                    id="Cgst"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="Cgst"
                    error={!!touched.Cgst && !!errors.Cgst}
                    helperText={touched.Cgst && errors.Cgst}
                    focused
                   
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                        // maxLength: 8,
                      },
                    }}
                    sx={{ background: "#fff6c3" }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="Number"
                    label="SGST"
                    value={values.Sgst}
                    id="Sgst"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="Sgst"
                    error={!!touched.Sgst && !!errors.Sgst}
                    helperText={touched.Sgst && errors.Sgst}
                    sx={{ background: "#fff6c3" }}
                    focused
                   
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                        // maxLength: 8,
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="Number"
                    label="IGST"
                    value={values.Igst}
                    id="Igst"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="Igst"
                    error={!!touched.Igst && !!errors.Igst}
                    helperText={touched.Igst && errors.Igst}
                    sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                    focused
                   
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                      // maxLength: 1,
                    }}
                  /> */}
                      <TextField
                        fullWidth
                        variant="filled"
                        type="Number"
                        label="Prefix"
                        value={values.Prefix}
                        id="Prefix"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Prefix"
                        error={!!touched.Prefix && !!errors.Prefix}
                        helperText={touched.Prefix && errors.Prefix}
                        sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                        focused
                        onWheel={(e) => e.target.blur()} 
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                          // maxLength: 1,
                        }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="Number"
                        label="Next no"
                        value={values.Nextno}
                        id="Nextno"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Nextno"
                        // error={!!touched.Prefix && !!errors.Prefix}
                        // helperText={touched.Prefix && errors.Prefix}
                        sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                        focused
                        onWheel={(e) => e.target.blur()} 
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                          // maxLength: 1,
                        }}
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        label="Sort Order"
                        id="SortOrder"
                        type="number"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.SortOrder}
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
                          // maxLength: 11,
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
                    <FormControl sx={{ gridColumn: "span 2" }}>
                      <Stack
                        sx={{
                          //    width: {sm:'100%',md:'100%',lg:'100%'},
                          gridColumn: "span 2",
                          alignContent: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                          right: "0px",
                        }}
                      >
                        <Avatar
                          variant="rounded"
                          src={userimg}
                          sx={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    </FormControl>
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px" gap={2}>
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
                    {/* <Button
                  color="error"
                  variant="contained"
                  onClick={() => {
                    fnSave(values, "harddelete");
                  }}
                >
                  Delete
                </Button> */}
                    <Button
                      color="warning"
                      variant="contained"
                      onClick={() => {
                        navigate(`/Apps/TR002/Categories`);
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
      </Box>
    </React.Fragment>
  );
};

export default Editproductcategory;
