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
  Divider,
  LinearProgress,
} from "@mui/material";
import { Formik, Field } from "formik";
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
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import basicSchema from "../../Security/validation";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
const Editboms = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorE2, setAnchorE2] = React.useState(null);

  const handleMenus = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleCloses = () => {
    setAnchorE2(null);
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

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
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");

  // console.log(Data);
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  // save

  var userimg = store.getState().globalurl.imageUrl;
  if (mode == "A") {
    userimg = userimg + "Defaultimg.jpg";
  } else userimg = userimg + Data.ImageName;

  var apiData = "";
  apiData = {
    Id: Data.Code,
    HsnCode: Data.HsnCode,
    Desc: Data.Desc,
    SortOrder: Data.SortOrder,
    Disable: Data.Disable,
  };

  const initialValues = {
    code: apiData.Id,
    HsnCode: apiData.HsnCode,
    desc: apiData.Desc,
    SortOrder: apiData.SortOrder,
    checkbox: apiData.Disable,
  };

  const fnSave = async (values) => {
    if (values.checkbox == true) {
      values.checkbox = "Y";
    } else {
      values.checkbox = "N";
    }

    console.log(values);

    var idata = "";
    var type = "";

    if (mode == "A") {
      idata = {
        RecordId: Data.RecordId,
        HsnCode: values.HsnCode,
        Desc: values.desc,
        Code: values.code,
        SortOrder: values.SortOrder,
        Disable: values.checkbox,
        Finyear,
        CompanyID,
      };
      type = "insert";
    } else {
      idata = {
        RecordId: Data.RecordId,
        HsnCode: values.HsnCode,
        Desc: values.desc,
        Code: values.code,
        SortOrder: values.SortOrder,
        Disable: values.checkbox,
        Finyear,
        CompanyID,
      };
      type = "update";
    }

    // const data = await dispatch(postApidata(accessID, type, idata));
    let action = mode === "A" ? "insert" : "update";
    const data = await dispatch(postData({ accessID, action, idata }));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      navigate(`/Apps/TR002/Product Category`);
    } else toast.error(data.payload.Msg);
  };

  return (
    <React.Fragment>
      {getLoading ? <LinearProgress /> : false}
      <Box display="flex" justifyContent="space-between" p={2}>
        {/* SEARCH BAR */}
        <Box display="flex" borderRadius="3px" alignItems={"center"}>
          <Typography variant="h3"> BOM</Typography>
        </Box>

        <Box display="flex">
          <IconButton onClick={handleMenus}>
            <MoreVertOutlinedIcon />
          </IconButton>
          <Menu
            anchorEl={anchorE2}
            keepMounted
            open={Boolean(anchorE2)}
            onClose={handleCloses}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <IconButton>
              <NotificationsNoneOutlinedIcon />
            </IconButton>
            <Divider />
            <IconButton>
              <NotificationsNoneOutlinedIcon />
            </IconButton>
          </Menu>

          <IconButton onClick={() => navigate("/")} color="error">
            <LogoutOutlinedIcon />
          </IconButton>

          {/* <IconButton  onClick={handleMenu}>
          <SettingsOutlinedIcon/>
        </IconButton> 
        <Menu  anchorEl={anchorEl} keepMounted
             
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              
                <MenuItem onClick={()=>navigate('./changepassword')} >Change Password</MenuItem>
                <MenuItem onClick={()=>navigate('/')}>Logout</MenuItem>
              </Menu> */}
        </Box>
      </Box>
      {!getLoading ? (
        <Box m="20px">
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={basicSchema}
            onSubmit={async (values) => {
              alert("submit", values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
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
                      type="text"
                      label="Project id"
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="code"
                      name="code"
                      //   error={!!touched.code && !!errors.code}
                      // helperText={touched.code && errors.code}
                      sx={{ gridColumn: "span 2" }}
                      focused
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Material id"
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="materialId"
                      name="materialId"
                      //   error={!!touched.code && !!errors.code}
                      // helperText={touched.code && errors.code}
                      sx={{ gridColumn: "span 2" }}
                      focused
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="BOM Quantity"
                      id="bomQuantity"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="bomQuantity"
                      // error={!!touched.HsnCode && !!errors.HsnCode}
                      //  helperText={touched.HsnCode && errors.HsnCode}
                      focused
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Material Cost"
                      id="materialCost"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="materialCost"
                      // error={!!touched.desc && !!errors.desc}
                      // helperText={touched.desc && errors.desc}

                      focused
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Sort Order"
                      id="sortOrder"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="sortOrder"
                      // error={!!touched.desc && !!errors.desc}
                      // helperText={touched.desc && errors.desc}
                      focused
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
                  <FormControl sx={{ gridColumn: "span 2" }}>
                    <Stack
                      sx={{
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
                  <Button
                    type="submit"
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
                      navigate(`/Apps/TR002/Product Category`);
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

export default Editboms;
