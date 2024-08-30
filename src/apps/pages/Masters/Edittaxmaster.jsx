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
} from "@mui/material";
import { Formik, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../index";
import {
  fetchApidata,
  postApidata,
} from "../../../store/reducers/Formapireducer";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import basicSchema from "../../Security/validation";
import wallet from "../../../assets/img/wallet.jpg";
import Topbar from "../../../ui-components/global/Topbar";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const Edittaxmaster = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");

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

  useEffect(() => {
    dispatch(fetchApidata(accessID, "get", recID));
  }, []);

  var apiData = "";
  apiData = {
    RecordID: Data.RecordID,
    HsnCode: Data.HsnCode,
    Cgst: Data.Cgst,
    Sgst: Data.Sgst,
    Igst: Data.Igst,
    Remarks: Data.Remarks,
    SortOrder: Data.SortOrder,
    Disable: Data.Disable,
  };
  const initialValues = {
    HsnCode: apiData.HsnCode,
    Cgst: apiData.Cgst,
    Sgst: apiData.Sgst,
    Igst: apiData.Igst,
    Remarks: apiData.Remarks,
    SortOrder: apiData.SortOrder,
    checkbox: apiData.Disable,
  };

  /***********************************SAVE FN********************** */

  const fnSave = async (values) => {
    if (values.HsnCode == "") {
      toast.error("Please Enter HsnCode");
      return;
    }

    if (values.checkbox == true) {
      values.checkbox = "Y";
    } else {
      values.checkbox = "N";
    }

    console.log(values);

    var saveData = {
      RecordID: Data.RecordID,
      HsnCode: values.HsnCode,
      Cgst: values.Cgst,
      Sgst: values.Sgst,
      Igst: values.Igst,
      Remarks: values.Remarks,
      SortOrder: values.SortOrder,
      Disable: values.checkbox,
    };
    var type = "";

    if (mode == "A") {
      type = "insert";
    } else {
      type = "update";
    }

    const data = await dispatch(postApidata(accessID, type, saveData));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      navigate(`/Apps/TR029/Tax Master`);
    } else toast.error(data.payload.Msg);
  };

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between" p={2}>
        {/* SEARCH BAR */}
        <Box
          display="flex"
          // backgroundColor={colors.primary[400]}
          borderRadius="3px"
          alignItems={"center"}
        >
          {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton> */}
          <Typography variant="h3">Tax Master</Typography>
        </Box>

        {/* ICONS */}

        <Box display="flex">
          {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton> */}

          {/* <IconButton onClick={handleMenu}>
            <SettingsOutlinedIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
           
            <MenuItem onClick={() => navigate("./changepassword")}>
              Change Password
            </MenuItem>
            <MenuItem onClick={() => navigate("/")}>Logout</MenuItem>
          </Menu> */}
             <IconButton onClick={() => navigate("/")} color="error">
             <LogoutOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
      <Box m="20px">
        <Formik
          // onSubmit={handleFormSubmit}
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={basicSchema}
        >
          {({ values, errors, touched, handleBlur, handleChange }) => (
            <form>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="HSN Code"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.HsnCode}
                    id="HsnCode"
                    name="HsnCode"
                    error={!!touched.Code && !!errors.Code}
                    helperText={touched.Code && errors.Code}
                    sx={{ background: "#fff6c3" }}
                    focused
                    required
                    inputProps={{ maxLength: 15 }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="CGST"
                    value={values.Cgst}
                    id="Cgst"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="Cgst"
                    error={!!touched.Cgst && !!errors.Cgst}
                    helperText={touched.Cgst && errors.Cgst}
                    focused
                    inputProps={{ maxLength: 11 }}
                    sx={{ background: "#fff6c3" }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
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
                    inputProps={{ maxLength: 11 }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
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
                    inputProps={{ maxLength: 11 }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Remarks"
                    value={values.Remarks}
                    id="Remarks"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="Remarks"
                    error={!!touched.Remarks && !!errors.Remarks}
                    helperText={touched.Remarks && errors.Remarks}
                    sx={{ gridColumn: "span 2" }}
                    focused
                    inputProps={{ maxLength: 100 }}
                    multiline
                    rows={2}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="Number"
                    label="Sort Order"
                    value={values.SortOrder}
                    id="SortOrder"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="SortOrder"
                    error={!!touched.SortOrder && !!errors.SortOrder}
                    helperText={touched.SortOrder && errors.SortOrder}
                    sx={{ gridColumn: "span 2" }}
                    focused
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
                    inputProps={{ maxLength: 11 }}
                  />
                  <FormControl>
                    <FormControlLabel
                      control={
                        <Field
                          type="checkbox"
                          name="checkbox"
                          id="checkbox"
                          label="Disable"
                        />
                      }
                      label="Disable"
                    />
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
              <Box display="flex" justifyContent="end" mt="20px" gap={2}>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    fnSave(values);
                  }}
                >
                  Save
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => {
                    navigate(`/Apps/TR029/Tax%20Master`);
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </React.Fragment>
  );
};

export default Edittaxmaster;
