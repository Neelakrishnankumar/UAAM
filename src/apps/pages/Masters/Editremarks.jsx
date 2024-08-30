import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Box,
  Typography,
  FormControl,
  Button,
  IconButton,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  Breadcrumbs,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { Formik, Field } from "formik";
import { RemarksSchema } from "../../Security/validation";
import {
  fetchApidata,
  getFetchData,
  postApidata,
  postData,
} from "../../../store/reducers/Formapireducer";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// ***********************************************
// Developer:Ram
// Purpose:To Create Remark
// ***********************************************
const Editremarks = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  const YearFlag = sessionStorage.getItem("YearFlag");
  const recID = params.id;
  const mode = params.Mode;
  const accessID = params.accessID;
  const parentID = params.filtertype;
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const Year = sessionStorage.getItem("year");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");

  const location = useLocation();
  const { toggleSidebar, broken, rtl } = useProSidebar();
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  const [ini, setIni] = useState(true);
  const [loading, setLoading] = useState(false);
  const Data = useSelector((state) => state.formApi.Data);
  //*******Assign Remark values from Database in  Yup initial value******* */
  const initialValues = {
    remarkCode: Data.Code,
    remarkDescription: Data.Description,
    remarkType: Data.Type,
    sortOrder: Data.SortOrder,
    disable: Data.Disable,
  };
  // **********Save Function*****************
  const fnSave = async (values) => {
    setLoading(true);
    setIni(false);
    // if (values.remarkCode == "") {
    //   toast.error("Please Fill Code");
    //   return;
    // }
    if (values.remarkDescription == "") {
      toast.error("Please Fill Description");
      return;
    }
    var isCheck = "N";
    if (values.disable == true) {
      isCheck = "Y";
    }

    // var type = "";
    // if (mode == "A") {
    //   type = "insert";
    // } else {
    //   type = "update";
    // }

    var idata = {
      RecordID: recID,
      Code: values.remarkCode,
      Description: values.remarkDescription,
      Type: parentID,
      YearID: Year,
      SortOrder: values.sortOrder,
      Disable: isCheck,
      Finyear,
      CompanyID,
    };

    let action = mode === "A" ? "insert" : "update";
    const data = await dispatch(postData({ accessID, action, idata }));

    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      setIni(true);
      setLoading(false);
      navigate(`/Apps/Secondarylistview/TR054/Remarks/${parentID}`);
    } else {
      toast.error(data.payload.Msg);
      setLoading(false);
    }
  };

  const style = {
    height: "55px",
    border: "2px solid #1769aa ",
    borderRadius: "5px",
    backgroundColor: "#EDEDED",
  };

  const options = [
    { name: "Delivery Chalan Remarks", value: "D" },
    { name: "Production Remarks", value: "P" },
  ];
  // Appreviation

  var apprval = "";
  if (parentID == "I") {
    apprval = "Delivery Chalan In";
  }
  if (parentID == "O") {
    apprval = "Delivery Chalan Out";
  }
  if (parentID == "P") {
    apprval = "Production Remarks";
  }
  if (parentID == "R") {
    apprval = "Returnable";
  }
  if (parentID == "N") {
    apprval = "Non-Returnable";
  }

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
          navigate(`/Apps/Secondarylistview/TR054/Remarks/${parentID}`);
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
        <Box display="flex" borderRadius="3px" alignItems="center">
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
                navigate(`/Apps/TR058/Remarks Type`);
              }}
            >
              Remarks
            </Typography>

            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate(`/Apps/Secondarylistview/TR054/Remarks/${parentID}`);
              }}
            >
              {apprval}
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
              }, 100);
            }}
            validationSchema={RemarksSchema}
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
                      focused
                      value={values.remarkCode}
                      name="remarkCode"
                      type="text"
                      id="remarkCode"
                      label="Code"
                      variant="filled"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.remarkCode && !!errors.remarkCode}
                      helperText={touched.remarkCode && errors.remarkCode}
                      inputProps={{ readOnly: true }}
                      autoFocus
                      placeholder="Auto"
                      onInvalid={(e) => {
                        e.target.setCustomValidity("Please Fill The Code");
                      }}
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                      }}
                    />
                    <TextField
                      focused
                      value={values.remarkDescription}
                      name="remarkDescription"
                      required
                      type="text"
                      id="remarkDescription"
                      label="Description"
                      variant="filled"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        !!touched.remarkDescription &&
                        !!errors.remarkDescription
                      }
                      helperText={
                        !!touched.remarkDescription &&
                        !!errors.remarkDescription
                      }
                      inputProps={{ maxLength: 300 }}
                      onInvalid={(e) => {
                        e.target.setCustomValidity(
                          "Please Fill The Description"
                        );
                      }}
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                      }}
                    />

                    {/* <FormControl>
                    <FormLabel>Type:</FormLabel>
                    <Field
                      as="select"
                      label="Type"
                      onChange={handleChange}
                      value={values.remarkType}
                      id="remarkType"
                      name="remarkType"
                      focused
                      style={style}
                    >
                      <option>Select</option>
                      <option value="D">Delivery Chalan Remarks</option>
                      <option value="P">Production Remarks</option>
                    </Field>
                  </FormControl> */}

                    <TextField
                      focused
                      value={values.sortOrder}
                      name="sortOrder"
                      type="number"
                      id="sortOrder"
                      label="Sort Order"
                      variant="filled"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{ background: "#fff6c3" }}
                      error={!!touched.sortOrder && !!errors.sortOrder}
                      helperText={!!touched.sortOrder && !!errors.sortOrder}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                      onWheel={(e) => e.target.blur()} 
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 11);
                      }}
                    />

                    {/* <FormControl>
                    <Field
                      type="checkbox"
                      name="disable"
                      id="disable"
                      as={FormControlLabel}
                      control={<Checkbox checked={values.disable} />}
                      label="Disable"
                    />
                  </FormControl> */}
                  </FormControl>
                </Box>

                <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                  {/* {
  YearFlag == 'true' ? (
    <LoadingButton
                   color="secondary"
                   variant="contained"
                   type="submit"
                   loading={loading}
                  //  disabled={isSubmitting}
                  
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
  )
} */}
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => {
                      navigate(
                        `/Apps/Secondarylistview/TR054/Remarks/${parentID}`
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

export default Editremarks;
