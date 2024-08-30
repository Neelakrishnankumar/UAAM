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
} from "@mui/material";
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
import { HsnSchema } from "../../Security/validation";
// import CryptoJS from "crypto-js";
const EditHsn = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  const data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");


  const { toggleSidebar, broken, rtl } = useProSidebar();
  const location = useLocation();
  const getLoading = useSelector((state) => state.formApi.getLoading);

  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  // *************** INITIALVALUE  *************** //

  const hsnInitialValue = {
    hsnCode: data.Code,
    igst: data.Igst,
    cgst: data.Cgst,
    sgst: data.Sgst,
    sortOrder: data.SortOrder,
    disable: data.Disable === "Y" ? true : false,
  };

  const hsnSaveFn = async (values) => {
    var isCheck = "N";
    if (values.disable == true) {
      isCheck = "Y";
    }

    const idata = {
      RecordID: recID,
      Code: values.hsnCode,
      Igst: values.igst,
      Cgst: values.cgst,
      Sgst: values.sgst,
      SortOrder: values.sortOrder,
      Disable: isCheck,
      Finyear,
      CompanyID,
    };
    let action = mode === "A" ? "insert" : "update";
    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate("/Apps/TR096/HSN");
    } else {
      toast.error(response.payload.Msg);
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
          navigate("/Apps/TR096/HSN");
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
          <Typography variant="h3">HSN</Typography>
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
            initialValues={hsnInitialValue}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                hsnSaveFn(values);
              }, 100);
            }}
            validationSchema={HsnSchema}
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
                      name="hsnCode"
                      type="text"
                      id="hsnCode"
                      label="HSN Code"
                      variant="filled"
                      focused
                      required
                      value={values.hsnCode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.hsnCode && !!errors.hsnCode}
                      helperText={touched.hsnCode && errors.hsnCode}
                      autoFocus
                    />
                    <TextField
                      name="sgst"
                      type="number"
                      id="sgst"
                      label="SGST"
                      variant="filled"
                      focused
                      value={values.sgst}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.sgst && !!errors.sgst}
                      helperText={touched.sgst && errors.sgst}
                      sx={{
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                      inputprops={{
                        maxlength: 13,
                        step: 0.01,
                      }}
                    />
                    <TextField
                      name="cgst"
                      type="number"
                      id="cgst"
                      label="CGST"
                      variant="filled"
                      focused
                      value={values.cgst}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.cgst && !!errors.cgst}
                      helperText={touched.cgst && errors.cgst}
                      sx={{ background: "#fff6c3" }}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                      inputProps={{ maxLength: 25 }}
                    />
                    <TextField
                      name="igst"
                      type="number"
                      id="igst"
                      label="IGST"
                      variant="filled"
                      focused
                      value={values.igst}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.igst && !!errors.igst}
                      helperText={touched.igst && errors.igst}
                      sx={{ background: "#fff6c3" }}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                    />

                    <TextField
                      name="sortOrder"
                      type="number"
                      id="sortOrder"
                      label="Sort Order"
                      variant="filled"
                      focused
                      value={values.sortOrder}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.sortOrder && !!errors.sortOrder}
                      helperText={touched.sortOrder && errors.sortOrder}
                      sx={{ background: "#fff6c3" }}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                      onWheel={(e) => e.target.blur()} 
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
                      navigate("/Apps/TR096/HSN");
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

export default EditHsn;
