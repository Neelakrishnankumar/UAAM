import {
  TextField,
  Box,
  Typography,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  FormControlLabel,
  Tooltip,
  Checkbox,
  LinearProgress,
  Breadcrumbs,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { Field, Formik } from "formik";
// import { category, CheckBox } from "@mui/icons-material";
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
import { SalarySchema } from "../../Security/validation";
import Popup from "../popup";
import Listviewpopup from "../Lookup";
// import CryptoJS from "crypto-js";
const EditSalaryComponent = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  const parentID = params.filtertype;
  const data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const location = useLocation();

  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  const style = {
    height: "55px",
    border: "2px solid #1769aa ",
    borderRadius: "5px",
    backgroundColor: "#EDEDED",
  };

  // *************** INITIALVALUE  *************** //

  const InitialValue = {
    description: data.Name,
    type: data.Type,
    category: data.Category == "Allowance" ? "A" : "D",
    sortOrder: data.Sortorder,     
    disable: data.Disable === "Y" ? true : false,
  };

  const Fnsave = async (values) => {
    let action = mode === "A" ? "insert" : "update";
  

    const idata = {
      RecordID: recID,
      Name: values.description,
      Type: values.type,
      Category: values.category,
      SortOrder: values.sortOrder,
      Disable: values.disable === true ? "Y" : "N",
    };

    const response = await dispatch(postData({ accessID, action, idata }));

    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate(
        `/Apps/Secondarylistview/TR205/SalaryComponent/${params.row.RecordID}`
      );
    } else {
      toast.error(response.payload.Msg);
    }
  };

  const fnLogOut = (props) => {
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
            `/Apps/Secondarylistview/TR205/SalaryComponent/${params.row.RecordID}`
          );
        }
      } else {
        return;
      }
    });
  };
  return (
    <React.Fragment>
      {getLoading ? <LinearProgress /> : false}
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box display="flex" borderRadius="3px" alignItems="center">
          {broken && !rtl && (
            <IconButton onClick={() => toggleSidebar()}>
              <MenuOutlinedIcon />
            </IconButton>
          )}
          <Typography variant="h3">Salary Component</Typography>
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

      {!getLoading ? (
        <Box m="20px">
          <Formik
            initialValues={InitialValue}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                Fnsave(values);
              }, 100);
            }}
            //  validationSchema={ SalarySchema}
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
                  gridTemplateColumns="repeat(4 , minMax(0,1fr))"
                  gap="30px"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <TextField
                    name="description"
                    type="text"
                    id="description"
                    label="Name"
                    variant="filled"
                    focused
                    value={values.description}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{ gridColumn: "span 2" }}
                  />

                  <FormControl
                    focused
                    variant="filled"
                    sx={{ gridColumn: "span 2" }}
                  >
                    <InputLabel id="status">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="type"
                      name="type"
                      value={values.type}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <MenuItem value="BS">PERCENTAGE OF BASIC SALARY</MenuItem>
                      <MenuItem value="FA">FIXED AMOUNT</MenuItem>
                      <MenuItem value="P">POLICY</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl
                    focused
                    variant="filled"
                    sx={{ gridColumn: "span 2" }}
                  >
                    <InputLabel id="status">Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="category"
                      name="category"
                      value={values.category}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <MenuItem value="A">ALLOWANCE</MenuItem>
                      <MenuItem value="D">DEDUCTION</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                      name="sortOrder"
                      type="number"
                      id="sortOrder"
                      label="Sortorder"
                      variant="filled"
                      focused
                      value={values.sortOrder}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.sortOrder && !!errors.sortOrder}
                      helperText={touched.sortOrder && errors.sortOrder}
                      sx={{ gridColumn: "span 2" }}
                    />
                  <FormControl>
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
                      navigate("/Apps/TR205/Salary Component");
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

export default EditSalaryComponent;
