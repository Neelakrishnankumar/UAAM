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
  Breadcrumbs,
  LinearProgress,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
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
} from "../../../store/reducers/Formapireducer";
import React, { useState, useEffect, useRef } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { fixedassetSchema } from "../../Security/validation";

// import CryptoJS from "crypto-js";



const Editfixedasset = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  console.log(params);
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  var filtertype = params.filtertype;
  var parentID = params.parentID;
  const data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const location = useLocation();
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  var apprval = "";
  if (parentID == "P") {
    apprval = "Product";
  }
  if (parentID == "E") {
    apprval = "Employee";
  }
  if (parentID == "M") {
    apprval = "Material";
  }
  if (parentID == "F") {
    apprval = "Fixed Asset";
  }
  // *************** INITIALVALUE  *************** //

  const InitialValue = {
    code: data.Code,
    name: data.Name,
    comment: data.Comments,
    dateofprice: data.DateofPrice,
    sortorder: data.SortOrder,
    disable: data.Disable === "Y" ? true : false,
  };

  const Fnsave = async (values) => {
    let action = mode === "A" ? "insert" : "update";
    var isCheck = "N";
    if (values.disable == true) {
      isCheck = "Y";
    }

    const idata = {
      RecordID: recID,
      Code: values.code,
      Name: values.name,
      Comments: values.comment,
      DateofPrice: values.dateofprice,
      SortOrder: values.sortorder,
      Disable: isCheck,
      parentID: filtertype,
      Finyear,
      CompanyID,
    };

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate(
        `/Apps/Secondarylistview/TR138/Fixed%20Assets/${filtertype}/${parentID}`
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
          navigate(
            `/Apps/Secondarylistview/TR138/Fixed%20Assets/${filtertype}/${parentID}`
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
                navigate(`/Apps/TR135/Fixed%20Asset%20Type`);
              }}
            >
              Fixed Asset Type
            </Typography>

            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate(
                  `/Apps/Secondarylistview/TR137/Fixed%20Assets%20Category/${parentID}`
                );
              }}
            >
              Fixed Asset Category
            </Typography>
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate(
                  `/Apps/Secondarylistview/TR138/Fixed%20Assets/${filtertype}/${parentID}`
                );
              }}
            >
              Fixed Asset
            </Typography>
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              {mode === "A" ? "New" : data.Name}
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
            <IconButton color="error" onClick={() => fnLogOut("Logout")}>
              <LogoutOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      

      {!getLoading ? (
        <Box Box m="20px">
          <Formik
            initialValues={InitialValue}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                Fnsave(values);
              }, 100);
            }}
             validationSchema={fixedassetSchema}
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
                  <FormControl
                    fullWidth
                    sx={{ gridColumn: "span 2", gap: "40px" }}
                  >
                    <TextField
                      name="code"
                      type="text"
                      id="code"
                      label="Code"
                      variant="filled"
                      focused
                      required
                      value={values.code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.code && !!errors.code}
                      helperText={touched.code && errors.code}
                      autoFocus
                    />
                    <TextField
                      name="name"
                      type="text"
                      id="name"
                      label="Description"
                      variant="filled"
                      focused
                      value={values.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                      autoFocus
                    />
                    <TextField
                      name="comment"
                      type="text"
                      id="comment"
                      label="Comments"
                      variant="filled"
                      focused
                      value={values.comment}
                      onBlur={handleBlur}
                      onChange={handleChange}
                        error={!!touched.comment && !!errors.comment}
                        helperText={touched.comment && errors.comment}
                      autoFocus
                    />
                    {/* <TextField
                      name="dateofprice"
                      type="text"
                      id="dateofprice"
                      label="Date Of Price"
                      variant="filled"
                      focused
                      value={values.dateofprice}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    //   error={!!touched.name && !!errors.name}
                    //   helperText={touched.name && errors.name}
                      autoFocus
                    /> */}
                    <TextField
                      name="sortorder"
                      type="number"
                      id="sortorder"
                      label="Sort Order"
                      variant="filled"
                      focused
                      value={values.sortorder}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.sortorder && !!errors.sortorder}
                      helperText={touched.sortorder && errors.sortorder}
                      sx={{ background: "#fff6c3" }}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 8);
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
                      navigate(
                        `/Apps/Secondarylistview/TR138/Fixed%20Assets/${filtertype}/${parentID}`
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

export default Editfixedasset;
