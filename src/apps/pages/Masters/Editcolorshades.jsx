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
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Formik, Field, useFormik, useFormikContext } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../index";
import {
  fetchApidata,
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
const Editcolorshades = () => {
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
  console.log("🚀 ~ file: Editcolorshades.jsx:92 ~ Editcolorshades ~ params:", params)
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  const MaterialTypeParams = params.materialType;
  console.log("🚀 ~ file: Editcolorshades.jsx:97 ~ Editcolorshades ~ MaterialTypeParams:", MaterialTypeParams)
  const Data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.loading);
  // const location = useLocation();
  const [openSMPopup, setOpenSMPopup] = useState(false);
  const Year = sessionStorage.getItem("year");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  // ************Lookup Function***************
  function handleShow(type) {
    if (type == "SM") {
      setOpenSMPopup(true);
    }
  }

  useEffect(() => {
    dispatch(fetchApidata(accessID, "get", recID));
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
    Code: Data.Code,
    Description: Data.Description,
    SortOrder: Data.SortOrder,
    checkbox:  Data.Disable,
  };

  // **********Save Function*****************

  const fnSave = async (values) => {
    setLoading(true);
    setIni(false);
    var isCheck = "N";
    if (values.checkbox == true) {
      isCheck = "Y";
    }
    var saveData = {
      RecordID: recID,
      ColourRecordID: params.parentrecID,
      CustRecordID: 0,
      Code: values.Code,
      Description: values.Description,
      SortOrder: values.SortOrder,
      Disable: isCheck,
      HexaColourCode: "0",
    };
    var type = "";
    console.log(saveData);
    if (mode == "A") {
      type = "insert";
    } else {
      type = "update";
    }

    const data = await dispatch(postApidatawol(accessID, type, saveData));
    console.log("🚀 ~ file: Editcolorshades.jsx:188 ~ fnSave ~ data:", data)
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      setIni(true);
      setLoading(false);
      navigate(
        `/Apps/Secondarylistview/TR033/Colors/${params.parentrecID}/${MaterialTypeParams}`
      );
    } else {
      toast.error(data.payload.Msg);
      setLoading(false);
    }
  };

  // 2 save supplier material

  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );
  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );
  const [show, setScreen] = React.useState("0");
  // material
  const [supmatedata, setsupmatedata] = useState({
    RecordID: "",
    Code: "",
    Description: "",
    SortOrder: "",
    Disable: "",
  });
  const [boMode, setBomode] = useState("A");
  // **********ScreenChange Function*********
  const screenChange = (event) => {
    setScreen(event.target.value);

    if (event.target.value == "1") {
      dispatch(fetchExplorelitview("TR117", "colourshadescustomer", recID, ""));
      dispatch(fetchApidata(accessID, "get", recID));
      selectcelldata("", "A", "");
    }

    if (event.target.value == "0") {
      dispatch(fetchApidata(accessID, "get", recID));
    }
  };

  //*************************MATERIAL Lookup Data ****************/

  const [isPopupData, setisPopupdata] = React.useState(false);
  const [selectSMLookupData, setselectSMLookupData] = React.useState({
    SMlookupRecordid: "",
    SMlookupCode: "",
    SMlookupDesc: "",
  });
  //************************** Lookup value assign type based Function *****************/
  const childToParent = (childdata, type) => {
    console.log("type---" + type);
    console.log("Data---" + JSON.stringify(childdata));

    if (type == "Customer") {
      setselectSMLookupData({
        SMlookupRecordid: childdata.RecordID,
        SMlookupCode: childdata.Code,
        SMlookupDesc: childdata.Name,
      });
      setOpenSMPopup(false);
    }
  };

  /****************** colorshades values assign a state variale******************** */
  const selectcelldata = (data, bMode, field) => {
    console.log("selectdata" + JSON.stringify(data));

    setBomode(bMode);
    setIniColor(true);
    // setColor("");
    if (bMode == "A") {
      setsupmatedata({
        RecordID: "",
        Code: "",
        Description: "",
        SortOrder: "",
        Disable: data.Disable,
        HexaColourCode: "",
      });
      setselectSMLookupData({
        SMlookupRecordid: "",
        SMlookupCode: "",
        SMlookupDesc: "",
      });
    } else {
      if (field == "action") {
        console.log("selectdata" + data.Disable);

        setsupmatedata({
          RecordID: data.RecordID,
          Code: data.Code,
          Description: data.Description,
          SortOrder: data.SortOrder,
          Disable: data.Disable,
          HexaColourCode: data.HexaColourCode,
        });
        setselectSMLookupData({
          SMlookupRecordid: data.CustomerID,
          SMlookupCode: data.CustomerCode,
          SMlookupDesc: data.CustomerName,
        });
      }
    }
  };
  //*******Assign colorshade values from Grid table in  Yup initial value******* */
  const supmateInitialvalues = {
    Code: supmatedata.Code,
    Description: supmatedata.Description,
    SortOrder: supmatedata.SortOrder,
    checkbox: supmatedata.Disable,
    hexCode: supmatedata.HexaColourCode,
  };

  // const { resetForm } = useFormikContext();
  /******************************colors  FUNCTION********** */
  const fncolorSave = async (values, resetForm, types) => {
    setIniColor(false);
    if (types == "harddelete") {
      if (supmatedata.RecordID == "") {
        toast.error("Please Select Color Shades ");
        return;
      }
    }

    var saveData = "";
    var type = "";
    if (types === "harddelete") {
      saveData = {
        RecordID: supmatedata.RecordID,
        ColourShadeID: recID,
        CustomerID: selectSMLookupData.SMlookupRecordid,
      };
      type = "harddelete";
    } else {
      setLoading(true);
      if (boMode == "A") {
        saveData = {
          RecordID: "",
          ColourShadeID: recID,
          CustomerID: selectSMLookupData.SMlookupRecordid,
        };
        type = "insert";
      } else {
        saveData = {
          RecordID: supmatedata.RecordID,
          ColourShadeID: recID,
          CustomerID: selectSMLookupData.SMlookupRecordid,
        };
        type = "update";
      }
    }
    console.log("save" + JSON.stringify(saveData));

    const data = await dispatch(postApidata("TR117", type, saveData));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      setLoading(false);
      dispatch(fetchExplorelitview("TR117", "colourshades", recID, ""));
      setIniColor(true);
      resetForm();
      setsupmatedata({
        RecordID: "",
        Code: "",
        Description: "",
        SortOrder: "",
        Disable: "",
      });
      // setColor("");
      selectcelldata("", "A", "");
      dispatch(fetchApidata(accessID, "get", recID));
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

  const clrForm = () => {
    setsupmatedata({
      RecordID: "",
      Code: "",
      Description: "",
      SortOrder: "",
      Disable: "",
    });

    selectcelldata("", "A", "");
  };

  //color search

  const VISIBLE_FIELDS = [
    "SLNO",
    "CustomerCode",
    "CustomerName",
    "action",
  ];
  const columns = React.useMemo(
    () =>
      explorelistViewcolumn.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
    [explorelistViewcolumn]
  );
  const ref = useRef();

  // **********Grid header function************
  const [rowCount, setRowCount] = useState(0);
  function Custombar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>Customers</Typography>
          <Typography variant="h5">{`(${rowCount})`}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <GridToolbarQuickFilter />
          <Tooltip title="Add">
            <IconButton
              onClick={() => {
                const reset = ref.current.resetForm;
                selectcelldata("", "A", "");
                reset();
              }}
            >
              <AddOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </GridToolbarContainer>
    );
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
          navigate(
            `/Apps/Secondarylistview/TR033/Colors/${params.parentrecID}/${MaterialTypeParams}`
          );
        }
      } else {
        return;
      }
    });
  };
  return (
    <React.Fragment>
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
                    navigate(
                      `/Apps/Secondarylistview/TR032/Colors/${MaterialTypeParams}`
                    );
                  }}
                >
                  {`Leather(${MaterialTypeParams})`}
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    setScreen(0);
                  }}
                >
                  Colors shades
                </Typography>
               
              </Breadcrumbs>
            </Box>
          </Box>

          <Box display="flex">
            {/* {mode !== "A" ? (
              MaterialTypeParams == "L" ? (
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small">Explore</InputLabel>

                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={show}
                    label="Explore"
                    onChange={screenChange}
                  >
                    <MenuItem value={0}>Colors shades</MenuItem>
                    <MenuItem value={1}>Customers</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                false
              )
            ) : (
              false
            )} */}
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
                          `/Apps/Secondarylistview/TR033/Colors/${params.parentrecID}/${MaterialTypeParams}`
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



      </Box>
    </React.Fragment>
  );
};

export default Editcolorshades;
