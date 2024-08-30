import {
  Checkbox,
  InputLabel,
  useTheme,
  MenuItem,
  Menu,
  Box,
  Breadcrumbs,
  Button,
  TextField,
  Stack,
  IconButton,
  Avatar,
  FormLabel,
  FormControl,
  Typography,
  FormControlLabel,
  Select,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Formik, Field, useFormik, useFormikContext } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../index";
import {
  fetchApidata,
  getFetchData,
  postApidata,
  postApidatawol,
  postData,
} from "../../../store/reducers/Formapireducer";
import { fetchComboData1 } from "../../../store/reducers/Comboreducer";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import { colorsSchema, colorshadesSchema } from "../../Security/validation";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Listviewpopup from "../Lookup";
import Popup from "../popup";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { tokens } from "../../../Theme";

import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { useRef } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// ***********************************************
// Developer:Ram
// Purpose: Create colors & color shades
// ***********************************************
const Editcolor = () => {
  const theme = useTheme();
  const location = useLocation();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const YearFlag = sessionStorage.getItem("YearFlag");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  const MaterialTypeParams = params.materialType;
  const Data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.loading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const Year = sessionStorage.getItem("year");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");

  const { toggleSidebar, broken, rtl } = useProSidebar();

  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  const [ini, setIni] = useState(true);
  const [loading, setLoading] = useState(false);

  var apprval = "";
  if (MaterialTypeParams == "M") {
    apprval = "Material";
  }
  if (MaterialTypeParams == "L") {
    apprval = "Leather";
  }
  var apiData = "";
  apiData = {
    Code: Data.Code,
    Description: Data.Description,
    SortOrder: Data.SortOrder,
    Disable: Data.Disable,
    // Type: Data.Type,
  };
  //*******Assign color values from Database in  Yup initial value******* */
  const initialValues = {
    Code: apiData.Code,
    Description: apiData.Description,
    SortOrder: apiData.SortOrder,
    checkbox: Data.Disable=="Y"?true:false,
    HexCode: Data.HexaColourCode,
  };

  // **********Save Function*****************

  const fnSave = async (values) => {
    setLoading(true);
    setIni(false);

    if (values.Description == "") {
      toast.error("Please Enter Description");
      return;
    }
    var isCheck = "N";
    if (values.checkbox == true) {
      isCheck = "Y";
    }

    var idata = {
      RecordID: recID,
      Code: values.Code,
      Description: values.Description,
      SortOrder: values.SortOrder,
      Disable: values.checkbox == true?"Y":"N",
      HexaColourCode: "0",
      Type: MaterialTypeParams,
      YearID: Year,
      Finyear,
      CompanyID,
    };
    // var type = "";
    // console.log(idata);
    // if (mode == "A") {
    //   type = "insert";
    // } else {
    //   type = "update";
    // }

    // const data = await dispatch(postApidatawol(accessID, type, idata));
    let action = mode === "A" ? "insert" : "update";
    const data = await dispatch(postData({ accessID, action, idata }));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      setIni(true);
      setLoading(false);

      navigate(`/Apps/Secondarylistview/TR032/Colors/${MaterialTypeParams}`);
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
          navigate(
            `/Apps/Secondarylistview/TR032/Colors/${MaterialTypeParams}`
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
      <Box sx={{ height: "100vh", overflow: "auto" }}>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box display="flex" borderRadius="3px" alignItems={"center"}>
            {broken && !rtl && (
              <IconButton onClick={() => toggleSidebar()}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
            <Box
              display={isNonMobile ? "flex" : "none"}
              borderRadius="3px"
              alignItems="center"
            >
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
                    navigate(`/Apps/TR083/Colors - Material type`);
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
                      `/Apps/Secondarylistview/TR032/Colors/${MaterialTypeParams}`
                    );
                  }}
                >
                  {apprval}
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  Color
                </Typography>
              </Breadcrumbs>
            </Box>
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
              validationSchema={colorsSchema}
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
                      {MaterialTypeParams == "M" ? (
                        false
                      ) : (
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          id="Code"
                          name="Code"
                          label="Color Code"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.Code}
                          error={!!touched.Code && !!errors.Code}
                          helperText={touched.Code && errors.Code}
                          sx={{ gridColumn: "span 2" }}
                          focused
                          autoFocus
                          onInvalid={(e) => {
                            e.target.setCustomValidity("Please Fill The Code");
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                      )}

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        value={values.Description}
                        id="Description"
                        name="Description"
                        label="Description"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Description && !!errors.Description}
                        helperText={touched.Description && errors.Description}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        inputProps={{ maxLength: 15 }}
                        onInvalid={(e) => {
                          e.target.setCustomValidity(
                            "Please Fill The Description"
                          );
                        }}
                        onInput={(e) => {
                          e.target.setCustomValidity("");
                        }}
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        id="SortOrder"
                        name="SortOrder"
                        label="Sort Order"
                        value={values.SortOrder}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.SortOrder && !!errors.SortOrder}
                        helperText={touched.SortOrder && errors.SortOrder}
                        sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                        focused
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
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                    {YearFlag == "true" ? (
                      <LoadingButton
                        color="secondary"
                        variant="contained"
                        type="submit"
                        loading={loading}
                        // disabled={isSubmitting}
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
                          `/Apps/Secondarylistview/TR032/Colors/${MaterialTypeParams}`
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
      </Box>
    </React.Fragment>
  );
};

export default Editcolor;
