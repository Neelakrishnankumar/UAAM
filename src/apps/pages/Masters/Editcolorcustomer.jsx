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
const Editcolorcustomer = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const listViewData = useSelector((state) => state.listviewApi.rowData);
  const listViewcolumn = useSelector((state) => state.listviewApi.columnData);
  const [pageSize, setPageSize] = React.useState(10);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const location = useLocation();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const YearFlag = sessionStorage.getItem("YearFlag");
  const navigate = useNavigate();
  let params = useParams();
  console.log(
    "🚀 ~ file: Editcolorshades.jsx:92 ~ Editcolorshades ~ params:",
    params
  );
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
  // const location = useLocation();
  const [openSMPopup, setOpenSMPopup] = useState(false);
  const Year = sessionStorage.getItem("year");
  
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");

  const { toggleSidebar, broken, rtl } = useProSidebar();
  // ************Lookup Function***************
  function handleShow(type) {
    if (type == "SM") {
      setOpenSMPopup(true);
    }
  }

  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
    // dispatch(fetchComboData1("TR002", "getall", recID, "ProductCategory"));
  }, [location.key]);
  const [ini, setIni] = useState(true);
  const [iniColor, setIniColor] = useState(true);
  const [loading, setLoading] = useState(false);
  var apprval = "";
  if (MaterialTypeParams == "M") {
    apprval = "Material";
  }
  if (MaterialTypeParams == "L") {
    apprval = "Leather";
  }

  //*******Assign color values from Database in  Yup initial value******* */
  const initialValues = {
    SortOrder: Data.Sortorder,
  };

  //*************************MATERIAL Lookup Data ****************/

  const [isPopupData, setisPopupdata] = React.useState(false);
  const [selectSMLookupData, setselectSMLookupData] = React.useState({
    SMlookupRecordid: "",
    SMlookupCode: "",
    SMlookupDesc: "",
  });

  if (!isPopupData) {
    selectSMLookupData.SMlookupRecordid = Data.CustomerID;
    selectSMLookupData.SMlookupCode = Data.CustomerCode;
    selectSMLookupData.SMlookupDesc = Data.CustomerName;
  }
  //************************** Lookup value assign type based Function *****************/
  const childToParent = (childdata, type) => {
    console.log("type---" + type);
    console.log("Data---" + JSON.stringify(childdata));
    setisPopupdata(true);
    if (type == "Customer") {
      setselectSMLookupData({
        SMlookupRecordid: childdata.RecordID,
        SMlookupCode: childdata.Code,
        SMlookupDesc: childdata.Name,
      });
      setOpenSMPopup(false);
    }
  };

  const fncolorSave = async (values) => {
    setIniColor(false);
    var saveData = "";
    var type = "";
    setLoading(true);
    if (mode == "A") {
      saveData = {
        RecordID: "",
        ColourShadeID: params.parentrecID,
        CustomerID: selectSMLookupData.SMlookupRecordid,
        Sortorder: values.SortOrder,
      };
      type = "insert";
    } else {
      saveData = {
        RecordID: recID,
        ColourShadeID: params.parentrecID,
        CustomerID: selectSMLookupData.SMlookupRecordid,
        Sortorder: values.SortOrder,
      };
      type = "update";
    }

    console.log("save" + JSON.stringify(saveData));

    const data = await dispatch(postApidata("TR117", type, saveData));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      setLoading(false);
      setIniColor(true);
      navigate(
        `/Apps/Secondarylistview/TR117/Colors-customer/${params.parentrecID}/${MaterialTypeParams}/${params.colorShade}`
      );
    } else {
      toast.error(data.payload.Msg);
      setLoading(false);
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
            `/Apps/Secondarylistview/TR117/Colors-customer/${params.parentrecID}/${MaterialTypeParams}/${params.colorShade}`
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
                  Colors(MT)
                </Typography>

                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    navigate(`/Apps/Secondarylistview/TR032/Colors/L`);
                  }}
                >
                  {`Leather(${MaterialTypeParams})`}
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    navigate(
                      `/Apps/Secondarylistview/TR117/Colors-customer/${params.parentrecID}/${MaterialTypeParams}/${params.colorShade}`
                    );
                  }}
                >
                  {`Color shades(${params.colorShade})`}
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  Customer
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
                  fncolorSave(values);
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
                    <FormControl
                      sx={{
                        gridColumn: "span 2",
                        display: "flex",
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="ID"
                        variant="filled"
                        value={selectSMLookupData.SMlookupRecordid}
                        focused
                        sx={{ display: "none" }}
                      />
                      <FormControl
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <TextField
                          id="outlined-basic"
                          label="Customer ID"
                          variant="filled"
                          value={selectSMLookupData.SMlookupCode}
                          focused
                          inputProps={{ tabIndex: "-1" }}
                        />
                        <IconButton
                          sx={{ height: 40, width: 40 }}
                          onClick={() => handleShow("SM")}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>
                        <TextField
                          id="outlined-basic"
                          variant="filled"
                          value={selectSMLookupData.SMlookupDesc}
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
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 11);
                      }}
                    />
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px" gap="20px">
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
                      color="error"
                      variant="contained"
                      onClick={() => {
                        navigate(
                          `/Apps/Secondarylistview/TR117/Colors-customer/${params.parentrecID}/${MaterialTypeParams}/${params.colorShade}`
                        );
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
            <Popup
              title="Customer"
              openPopup={openSMPopup}
              setOpenPopup={setOpenSMPopup}
            >
              <Listviewpopup
                accessID="2009"
                screenName="Customer"
                childToParent={childToParent}
              />
            </Popup>
          </Box>
        ) : (
          false
        )}
      </Box>
    </React.Fragment>
  );
};

export default Editcolorcustomer;
