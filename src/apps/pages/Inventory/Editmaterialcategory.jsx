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
  Breadcrumbs,
  FormLabel,
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
  postApidata,
  getFetchData,
  postData,
} from "../../../store/reducers/Formapireducer";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import basicSchema from "../../Security/validation";
import { materialcategoriesSchema } from "../../Security/validation";
// import wallet from '../../../assets/img/wallet.jpg'
import Topbar from "../../../ui-components/global/Topbar";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// ***********************************************
// Developer:Priya
// Purpose:To Create Material
// ***********************************************

const Materialcatedit = () => {
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
  const style = {
    height: "55px",
    border: "2px solid #1769aa ",
    borderRadius: "5px",
    backgroundColor: "#EDEDED",
  };

  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  var Typesdata = params.Type;

  const Data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.loading);
  var materialType = "";
  console.log("---" + JSON.stringify(Data));
  var BC_type_Material = "";
  if (Typesdata == "L") {
    materialType = "Leather Type";
    BC_type_Material = "Leather Type";
  }
  if (Typesdata == "M") {
    materialType = "Material Category";
    BC_type_Material = "Material Type";
  }
  if (Typesdata == "S") {
    materialType = "service Category";
    BC_type_Material = "service Type";
  }
  if (Typesdata == "R") {
    materialType = "RF Material Category";
    BC_type_Material = "RF Material Type";
  }
  if (Typesdata == "P") {
    materialType = "Packing Material Category";
    BC_type_Material = "Packing Material Type";
  }
  if (Typesdata == "LS") {
    materialType = "Sales-Leather Category";
    BC_type_Material = "Sales-Leather Type";
  }
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const location = useLocation();
  const { toggleSidebar, broken, rtl } = useProSidebar();
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
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
    Hidevisible: Data.Hidevisible,
    Desc: Data.Desc,
    Code: Data.Code,
    Mgroup: Data.Mgroup,
    SortOrder: Data.SortOrder,
    Disable: Data.Disable,
    OperationStage: Data.OperationStage,
  };
  const [checked, setChecked] = React.useState();
  //*******Assign Materialcategory values from Database in  Yup initial value******* */
  const initialValues = {
    Hidevisible: apiData.Hidevisible,
    Desc: apiData.Desc,
    Desc1: apiData.Desc,
    Code: apiData.Code,
    Mgroup: apiData.Mgroup,
    cgst: Data.Cgst,
    sgst: Data.Sgst,
    igst: Data.Igst,
    hsnCode: Data.HsnCode,
    SortOrder: apiData.SortOrder,
    checkbox: apiData.Disable,
    OperationStage: apiData.OperationStage,
    fixedPrice: Data.Fixrate,
    latestPrice: Data.Laterate,
    Wastage:Data.Wastage
  };
  // **********Save Function*****************
  const fnSave = async (values, types) => {
    setLoading(true);
    setIni(false);
    if (values.Code == "") {
      toast.error("Please Fill ID");
      return;
    }
    if (values.Desc == "") {
      toast.error("Please Fill Description");
      return;
    }
    var isCheck = "N";
    if (values.checkbox == true) {
      isCheck = "Y";
    }
    var isHidevisible = "N";
    if (values.Hidevisible == true) {
      isHidevisible = "Y";
    }
    var idata = {
      RecordId: recID,
      Hidevisible: isHidevisible,
      Desc: Typesdata === "S" ? values.Desc1 : values.Desc,
      // Code: values.Code,
      Type: Typesdata,
      Mgroup: values.Mgroup,
      SortOrder: values.SortOrder,
      Disable: isCheck,
      OperationStage: values.OperationStage,
      Igst: 0,
      Sgst: 0,
      Cgst: 0,
      HsnCode: 0,
      Laterate:Typesdata === "L" ? values.latestPrice :0,
      Fixrate:Typesdata === "L" ? values.fixedPrice:0,
      Finyear,
      CompanyID,
      Wastage:values.Wastage
    };
    // var type = "";

    // if (types === "harddelete") {
    //   type = "harddelete";
    // } else {
    //   if (mode == "A") {
    //     type = "insert";
    //   } else {
    //     type = "update";
    //   }
    // }

    // const data = await dispatch(postApidata(accessID, type, idata));
    let action = mode === "A" ? "insert" : "update";
    const data = await dispatch(postData({ accessID, action, idata }));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      setIni(true);
      setLoading(false);
      navigate(
        `/Apps/Secondarylistview/TR003/Material%20Category/${Typesdata}`
      );
    } else {
      toast.error(data.payload.Msg);
      setLoading(false);
    }
  };
  const validate = (values) => {
    const errors = {};

    if (!values.Code) {
      errors.Code = "Required";
    } else if (values.Desc) {
      errors.email = "Invalid email address";
    }

    return errors;
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
          navigate(
            `/Apps/Secondarylistview/TR003/Material%20Category/${Typesdata}`
          );
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
                navigate("/Apps/TR044/Materials%20Type");
              }}
            >
              Material Type
            </Typography>
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate(
                  `/Apps/Secondarylistview/TR003/Material%20Category/${Typesdata}`
                );
              }}
            >
              {materialType}
            </Typography>
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              {mode === "A" ? "New" : Data.Desc}
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
                // alert("hai");
              }, 100);
            }}
            validationSchema={materialcategoriesSchema}
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
                  <FormControl sx={{ gridColumn: "span 2", gap: "30px" }}>
                    {/* <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="ID"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.Code}
                    id="Code"
                    name="Code"
                    error={!!touched.Code && !!errors.Code}
                    helperText={touched.Code && errors.Code}
                    sx={{ background: "#fff6c3" }}
                    focused
                    required
                    autoFocus
                    onInvalid={(e) => { e.target.setCustomValidity('Please Fill The Code') }} 
                    
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 3);
                        e.target.setCustomValidity('')
                    }}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right",  },
                      },
                    }}
                  /> */}

                    <TextField
                      fullWidth
                      required
                      variant="filled"
                      type="text"
                      // label="Search Phrase "
                      label={
                        Typesdata == "L" ? "Leather type" : "Search Phrase "
                      }
                      value={values.Mgroup}
                      id="Mgroup"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="Mgroup"
                      error={!!touched.Mgroup && !!errors.Mgroup}
                      helperText={touched.Mgroup && errors.Mgroup}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      inputProps={{ maxLength: 5 }}
                      onInvalid={(e) => {
                        e.target.setCustomValidity(
                          "Please Fill The Search Phrase"
                        );
                      }}
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                      }}
                    />
                    {Typesdata == "M" ||
                    Typesdata == "LS" ||
                    Typesdata == "L" ||
                    Typesdata == "P" ||
                    Typesdata == "F" ||
                    Typesdata == "R" ? (
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Description"
                        value={values.Desc}
                        id="Desc"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Desc"
                        error={!!touched.Desc && !!errors.Desc}
                        helperText={touched.Desc && errors.Desc}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        required
                        inputProps={{ maxLength: 70 }}
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
                    ) : (
                      ""
                    )}
                    {Typesdata == "S" ? (
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Description"
                        value={values.Desc1}
                        id="Desc1"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Desc1"
                        error={!!touched.Desc1 && !!errors.Desc1}
                        helperText={touched.Desc1 && errors.Desc1}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        required
                        inputProps={{ maxLength: 70 }}
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
                    ) : (
                      ""
                    )}
                    <FormControl>
                      {Typesdata == "L" || Typesdata == "LS" ? (
                        <React.Fragment>
                          <FormLabel>Type</FormLabel>

                          <Field
                            as="select"
                            label="Type"
                            onChange={handleChange}
                            value={values.OperationStage}
                            id="OperationStage"
                            name="OperationStage"
                            focused
                            style={style}
                          >
                            <option>Select</option>
                            <option value="L">Leather</option>
                            <option value="F">Fabrics</option>
                          </Field>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <FormLabel>Material Type</FormLabel>
                          <Field
                            as="select"
                            label="Type"
                            onChange={handleChange}
                            value={values.OperationStage}
                            id="OperationStage"
                            name="OperationStage"
                            focused
                            style={style}
                          >
                            <option>Select</option>
                            <option value="PC">Production</option>
                            <option value="PK">Packing</option>
                          </Field>
                        </React.Fragment>
                      )}
                    </FormControl>
                  
               {/*   <TextField
                    fullWidth
                    
                    variant="filled"
                    type="number"
                    label="CGST "
                    value={values.cgst}
                    id="cgst"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="cgst"
                    error={!!touched.cgst && !!errors.cgst}
                    helperText={touched.cgst && errors.cgst}
                    sx={{ gridColumn: "span 2",background: "#fff6c3",input:{textAlign:"right"} }}
                    focused
                    inputProps={{ maxLength: 3 }}
                    onInvalid={(e) => { e.target.setCustomValidity('Please Fill The CGST') }} 
                    onInput ={(e) => { e.target.setCustomValidity('') }}
                  />
                  <TextField
                    fullWidth
                    
                    variant="filled"
                    type="text"
                    label="SGST "
                    value={values.sgst}
                    id="sgst"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="sgst"
                    error={!!touched.sgst && !!errors.sgst}
                    helperText={touched.sgst && errors.sgst}
                    sx={{ gridColumn: "span 2",background: "#fff6c3",input:{textAlign:"right"} }}
                    focused
                    inputProps={{ maxLength: 3 }}
                    onInvalid={(e) => { e.target.setCustomValidity('Please Fill The SGST') }} 
                    onInput ={(e) => { e.target.setCustomValidity('') }}
                  />
                  <TextField
                    fullWidth
                    
                    variant="filled"
                    type="text"
                    label="IGST "
                    value={values.igst}
                    id="igst"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="igst"
                    error={!!touched.igst && !!errors.igst}
                    helperText={touched.igst && errors.igst}
                    sx={{ gridColumn: "span 2",background: "#fff6c3",input:{textAlign:"right"} }}
                    focused
                    inputProps={{ maxLength: 3 }}
                    onInvalid={(e) => { e.target.setCustomValidity('Please Fill The IGST') }} 
                    onInput ={(e) => { e.target.setCustomValidity('') }}
                  /> */}
                  {Typesdata == "L" ?
                   <TextField
                      fullWidth
                      required
                      variant="filled"
                      type="number"
                      label="Latest Price"
                      value={values.latestPrice}
                      id="latestPrice"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="latestPrice"
                      error={!!touched.latestPrice && !!errors.latestPrice}
                      helperText={touched.latestPrice && errors.latestPrice}
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                      focused
                      onWheel={(e) => e.target.blur()} 
                      inputProps={{ maxLength: 3 }}
                      onInvalid={(e) => {
                        e.target.setCustomValidity(
                          "Please Fill The Latest Price"
                        );
                      }}
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                      }}
                    />:false}
  
                    <FormControl>
                      <Box>
                        <Field
                          //  size="small"
                          type="checkbox"
                          name="Hidevisible"
                          id="Hidevisible"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          as={Checkbox}
                          label="Total Hides Visible"
                        />

                        <FormLabel focused={false}>
                          Total Hides Visible
                        </FormLabel>
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

                  <FormControl sx={{ gridColumn: "span 2", gap: "30px" }}>
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

                    {Typesdata == "L" ? <TextField
                      fullWidth
                      required
                      variant="filled"
                      type="number"
                      // label="Search Phrase "
                      label="Fixed Price"
                      value={values.fixedPrice}
                      id="fixedPrice"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="fixedPrice"
                      error={!!touched.fixedPrice && !!errors.fixedPrice}
                      helperText={touched.fixedPrice && errors.fixedPrice}
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                        marginTop: "10px",
                        input: { textAlign: "right" },
                      }}
                      focused
                      onWheel={(e) => e.target.blur()} 
                      inputProps={{ maxLength: 3 }}
                      onInvalid={(e) => {
                        e.target.setCustomValidity(
                          "Please Fill The Fixed Price"
                        );
                      }}
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                      }}
                    />:false}
                     <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Wastage"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.Wastage}
                    id="Wastage"
                    name="Wastage"
                    error={!!touched.Wastage && !!errors.Wastage}
                    helperText={touched.Wastage && errors.Wastage}
                    sx={{ background: "#fff6c3" }}
                    focused
                    autoFocus
                    onWheel={(e) => e.target.blur()} 
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right",  },
                      },
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
                          .slice(0, 11);
                      }}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                    />
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

                  <Button
                    color="warning"
                    variant="contained"
                    onClick={() => {
                      navigate(
                        `/Apps/Secondarylistview/TR003/Material%20Category/${Typesdata}`
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

// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// const checkoutSchema = yup.object().shape({
//   firstName: yup.string().required("required"),
//   lastName: yup.string().required("required"),
//   email: yup.string().email("invalid email").required("required"),
//   contact: yup
//     .string()
//     .matches(phoneRegExp, "Phone number is not valid")
//     .required("required"),
//   address1: yup.string().required("required"),
//   address2: yup.string().required("required"),
// });
// const initialValues = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   contact: "",
//   address1: "",
//   address2: "",
// };

export default Materialcatedit;
