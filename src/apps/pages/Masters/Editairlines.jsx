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
import { Formik, Field } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../index";
import {
  explorePostData,
  getFetchData,
  postData,
} from "../../../store/reducers/Formapireducer";
import { fetchComboData1 } from "../../../store/reducers/Comboreducer";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import basicSchema from "../../Security/validation";
import { airlinesSchema, tarifSchema } from "../../Security/validation";
import Listviewpopup from "../Lookup";
import Popup from "../popup";
import { tokens } from "../../../Theme";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useRef } from "react";
import { LoadingButton } from "@mui/lab";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Swal from "sweetalert2";
// ***********************************************
//  Developer:Gowsalya
// Purpose:To Create Airlines &Traif

// ***********************************************
const Editairlines = () => {
  const [pageSize, setPageSize] = React.useState(10);
  const theme = useTheme();
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const colors = tokens(theme.palette.mode);
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const YearFlag = sessionStorage.getItem("YearFlag");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  const Data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const exploreLoading = useSelector((state) => state.exploreApi.loading);

  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");

  const location = useLocation();
  const ref = useRef();
  const [openSMPopup, setOpenSMPopup] = useState(false);
  const [openUOMPopup, setOpenUOMPopup] = useState(false);
  const Year = sessionStorage.getItem("year");
  // ************Lookup Function***************
  function handleShow(type) {
    if (type == "SM") {
      setOpenSMPopup(true);
    }

    if (type == "UOM") {
      setOpenUOMPopup(true);
    }
  }

  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  const [ini, setIni] = useState(true);
  const [iniTarif, setIniTarif] = useState(true);
  const [loading, setLoading] = useState(false);
  var userimg = store.getState().globalurl.imageUrl;
  if (mode == "A") {
    userimg = userimg + "DefaultProduct.jpg";
  } else {
    if (
      Data.ImageName == undefined ||
      Data.ImageName == null ||
      Data.ImageName == ""
    ) {
      userimg = userimg + "DefaultProduct.jpg";
    } else {
      userimg = userimg + Data.ImageName;
    }
  }

  const initialValues = {
    Code:  Data.Code,
    Description: Data.Description,
    SortOrder: Data.SortOrder,
    checkbox:  Data.Disable === "Y" ? true : false,
  };
  // **********Save Function*****************
  const fnSave = async (values, types) => {
    var idata = {
      YearID: Year,
      RecordID: recID,
      Code: values.Code,
      Description: values.Description,
      SortOrder: values.SortOrder,
      Disable: values.checkbox == true ? "Y" : "N",
      Finyear,
      CompanyID,
    };
    let action = mode === "A" ? "insert" : "update";
    const data = await dispatch(postData({ accessID, action, idata }));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      if (mode == "A") {
        navigate(`/Apps/TR036/Airlines/EditAirlines/${data.payload.Recid}/E`);
      }
    } else {
      toast.error(data.payload.Msg);
    }
  };

  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );
  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );
  const [show, setScreen] = React.useState("0");
  const [tabledata, settabdata] = useState({
    RecordID: "",
    FromKg: "",
    Tokg: "",
    RatePerKg: "",
    HandCharge: "",
    Type: "",
    SortOrder: "",
    Disable: "",
    Length: "",
    Width: "",
    Height: "",
  });
  const [boMode, setBomode] = useState("A");
  // **********ScreenChange Function*********
  const screenChange = (event) => {
    setScreen(event.target.value);
    if (event.target.value == "1") {
      dispatch(fetchExplorelitview("TR037", "Tarif", recID, ""));
      selectcelldata("", "A", "");
    }
    if (event.target.value == "2") {
      dispatch(fetchExplorelitview("TR037", "Tarif", recID, ""));
      selectcelldata("", "A", "");
    }
  };

  //************************* Lookup Data ****************/

  const [selectSMLookupData, setselectSMLookupData] = React.useState({
    SMlookupRecordid: "",
    SMlookupCode: "",
    SMlookupDesc: "",
  });
  const [selectUOMLookupData, setselectUOMLookupData] = React.useState({
    UOMlookupRecordid: "",
    UOMlookupDesc: "",
  });
  //************************** Lookup value assign type based Function *****************/
  const childToParent = (childdata, type) => {
    console.log("type---" + type);
    console.log("Data---" + JSON.stringify(childdata));

    if (type == "Country") {
      setselectSMLookupData({
        SMlookupRecordid: childdata.RecordID,
        SMlookupCode: childdata.Code,
        SMlookupDesc: childdata.Name,
      });
      setOpenSMPopup(false);
    }

    if (type == "UOM") {
      setselectUOMLookupData({
        UOMlookupRecordid: childdata.RecordID,
        UOMlookupDesc: childdata.Name,
      });
      setOpenUOMPopup(false);
    }
  };
  /****************** Traif values assign a state variale******************** */

  const selectcelldata = (data, bMode, field) => {
    console.log("selectdata" + JSON.stringify(data));

    setBomode(bMode);
    setIniTarif(true);
    if (bMode == "A") {
      settabdata({
        RecordID: "",
        FromKg: "",
        Tokg: "",
        RatePerKg: "",
        HandCharge: "",
        Type: "",
        SortOrder: "",
        Disable: data.Disable,
        Length: "",
        Width: "",
        Height: "",
      });
      setselectSMLookupData({
        SMlookupRecordid: "",
        SMlookupCode: "",
        SMlookupDesc: "",
      });
      setselectUOMLookupData({
        UOMlookupRecordid: "",
        UOMlookupCode: "",
        UOMlookupDesc: "",
      });
    } else {
      if (field == "action") {
        settabdata({
          RecordID: data.RecordID,
          FromKg: data.FromKg,
          Tokg: data.Tokg,
          RatePerKg: data.RatePerKg,
          HandCharge: data.HandCharge,
          Type: data.Type,
          SortOrder: data.SortOrder,
          Disable: data.Disable,
          Length: data.Length,
          Width: data.Width,
          Height: data.Height,
        });
        setselectSMLookupData({
          SMlookupRecordid: data.CnRecordID,
          SMlookupCode: data.CountryCode,
          SMlookupDesc: data.CountryName,
        });
        setselectUOMLookupData({
          UOMlookupRecordid: data.UomRecordID,
          UOMlookupDesc: data.UomDescription,
        });
      }
    }
  };
  //*******Assign Traif values from Grid table in  Yup initial value******* */
  const tarifInitialvalues = {
    FromKg: tabledata.FromKg,
    Tokg: tabledata.Tokg,
    // RatePerKg: tabledata.RatePerKg,
    RatePerKg: Number(tabledata.RatePerKg).toFixed(2),
    // HandCharge: tabledata.HandCharge,
    HandCharge: Number(tabledata.HandCharge).toFixed(2),
    Type: tabledata.Type,
    SortOrder: tabledata.SortOrder,
    checkbox: tabledata.Disable,
    Length: tabledata.Length,
    Width: tabledata.Width,
    Height: tabledata.Height,
  };

  console.log("type" + tabledata.Type);

  // clear

  const clrForm = () => {
    settabdata({
      RecordID: "",
      FromKg: "",
      Tokg: "",
      RatePerKg: "",
      HandCharge: "",
      SortOrder: "",
      Disable: "",
      Length: "",
      Width: "",
      Height: "",
    });

    selectcelldata("", "A", "");
  };

  /******************************Traif  function********** */
  const fnmaterialSave = async (values, resetForm, del) => {
    setLoading(true);
    setIniTarif(false);
    if (del) {
      if (tabledata.RecordID == "") {
        toast.error("Please Select TARIF");
        setLoading(false);
        return;
      }
    }
    var typeoftarif = "";
    var length = "";
    var height = "";
    var width = "";
    var fromqty = "";
    var toqty = "";
    if (show == "1") {
      typeoftarif = "V";
    }
    if (show == "2") {
      typeoftarif = "W";
    }

    if (show == "1") {
      fromqty = "0";
      toqty = "0";
    } else {
      fromqty = values.FromKg;
      toqty = values.Tokg;
    }

    if (show == "2") {
      length = "0";
      height = "0";
      width = "0";
    } else {
      length = values.Length;
      height = values.Width;
      width = values.Height;
    }

    // if (selectSMLookupData.SMlookupCode == "") {
    //   toast.error("Please Choose Country Lookup");
    //   return;
    // }
    // if (selectUOMLookupData.UOMlookupDesc =='') {
    //   toast.error("Please Choose UOM Lookup");
    //   return;
    // }

    // if (values.FromKg == "") {
    //   toast.error("Please Enter From kg");
    //   return;
    // }

    if (values.checkbox == true) {
      values.checkbox = "Y";
    } else {
      values.checkbox = "N";
    }

    const idata = {
      RecordID: tabledata.RecordID,
      Fromkg: fromqty,
      Tokg: toqty,
      Rateperkg: values.RatePerKg,
      Handcharge: values.HandCharge,
      SortOrder: values.SortOrder,
      Disable: values.checkbox,
      CountryRecordID: selectSMLookupData.SMlookupRecordid,
      UomRecordID: selectUOMLookupData.UOMlookupRecordid,
      Type: typeoftarif,
      AirlinesRecordID: recID,
      Length: length,
      Width: width,
      Height: height,
      Finyear,
      CompanyID,
    };
    let action =
      boMode === "A" && !del
        ? "insert"
        : boMode === "E" && del
        ? "harddelete"
        : "update";

    console.log("save" + JSON.stringify(idata));
    const response = await dispatch(
      explorePostData({ accessID: "TR037", action, idata })
    );
    // const data = await dispatch(postApidata("TR037", type, idata));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      setIniTarif(true);
      setLoading(false);
      dispatch(fetchExplorelitview("TR037", "Tarif", recID, ""));
      resetForm();
      settabdata({
        RecordID: "",
        FromKg: "",
        Tokg: "",
        RatePerKg: "",
        HandCharge: "",
        SortOrder: "",
        Disable: "",
        Length: "",
        Width: "",
        Height: "",
      });
      selectcelldata("", "A", "");
    } else {
      toast.error(response.payload.Msg);
      setLoading(false);
    }
  };

  const style = {
    height: "55px",
    border: "2px solid #1769aa ",
    borderRadius: "5px",
    backgroundColor: "#EDEDED",
  };

  console.log(explorelistViewcolumn);
  var VISIBLE_FIELDS = "";
  {
    show == "1"
      ? (VISIBLE_FIELDS = [
          "SLNO",
          "CountryName",
          "Length",
          "Width",
          "Height",
          "RatePerKg",
          "action",
        ])
      : (VISIBLE_FIELDS = [
          "SLNO",
          "CountryName",
          "FromKg",
          "Tokg",
          "RatePerKg",
          "action",
        ]);
  }
  function filterByID(item) {
    if (item.hide !== true) {
      return true;
    }
  }

  const columns = React.useMemo(
    () =>
      explorelistViewcolumn.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
    [explorelistViewcolumn]
  );
  console.log(
    "🚀 ~ file: Editairlines.jsx:416 ~ Editairlines ~ columns",
    columns
  );

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
          {show == "1" ? (
            <Typography>Tarif By Volume</Typography>
          ) : (
            <Typography>Tarif By Weight</Typography>
          )}

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
          navigate("/Apps/TR036/Airlines");
        }
      } else {
        return;
      }
    });
  };

  var typeoftarif = "";
  if (show == "1") {
    typeoftarif = "V";
  }
  if (show == "2") {
    typeoftarif = "W";
  }
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
                    setScreen(0);
                  }}
                >
                  Airlines
                </Typography>
                {show == "1" ? (
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >
                    Tarif By Volume
                  </Typography>
                ) : (
                  false
                )}
                {show == "2" ? (
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >
                    Tarif By Weight
                  </Typography>
                ) : (
                  false
                )}
              </Breadcrumbs>
            </Box>
            {/* {show == "0" ? (
              <Typography variant="h3">Airlines</Typography>
            ) : (
              false
            )}
            {show == "1" ? <Typography variant="h3">Tarif By Volume</Typography> : false}
            {show == "2" ? <Typography variant="h3">Tarif By Weight</Typography> : false} */}
          </Box>

          <Box display="flex">
            {mode !== "A" ? (
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Explore</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={show}
                  label="Explore"
                  onChange={screenChange}
                >
                  <MenuItem value={0}>Airlines</MenuItem>
                  <MenuItem value={1}>Tarif By Volume</MenuItem>
                  <MenuItem value={2}>Tarif By Weight</MenuItem>
                </Select>
              </FormControl>
            ) : (
              false
            )}

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
        {!getLoading && show == "0" ? (
          <Box m="20px">
            <Formik
              initialValues={initialValues}
              onSubmit={(values, setSubmitting) => {
                setTimeout(() => {
                  fnSave(values);
                }, 100);
              }}
              validationSchema={airlinesSchema}
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
                        value={values.Code}
                        id="Code"
                        name="Code"
                        label="Code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Code && !!errors.Code}
                        helperText={touched.Code && errors.Code}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        autoFocus
                        placeholder="Auto"
                        inputProps={{ readOnly: true }}
                        onInvalid={(e) => {
                          e.target.setCustomValidity("Please Fill The Code");
                        }}
                        onInput={(e) => {
                          e.target.setCustomValidity("");
                        }}
                      />
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
                        focused
                        inputProps={{ maxLength: 30 }}
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
                        value={values.SortOrder}
                        id="SortOrder"
                        name="SortOrder"
                        label="Sort Order"
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
                        inputProps={{ maxLength: 10 }}
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
                  <Box display="flex" justifyContent="end" mt="20px" gap={2}>
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
                      color="warning"
                      variant="contained"
                      onClick={() => {
                        navigate(`/Apps/TR036/Airlines`);
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

        {show == "1" ? (
          <Box m="20px" sx={{ m: 2 }}>
            <Formik
              // onSubmit={handleFormSubmit}
              initialValues={initialValues}
              enableReinitialize={ini}
              validationSchema={basicSchema}
            >
              {({ values, errors, touched, handleBlur, handleChange }) => (
                <Box>
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
                        inputProps={{ readOnly: true }}
                        value={values.Code}
                        id="Code"
                        name="Code"
                        label="Code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        //  error={!!touched.Desc && !!errors.Desc}
                        //  helperText={touched.Desc && errors.Desc}
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        value={values.Description}
                        id="Description"
                        name="Description"
                        label="Description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{ readOnly: true }}
                        error={!!touched.Description && !!errors.Description}
                        helperText={touched.Description && errors.Description}
                        focused
                      />

                      <Box m="5px">
                        <Box
                          m="5px 0 0 0"
                          height="75vh"
                          sx={{
                            "& .MuiDataGrid-root": {
                              border: "none",
                            },
                            "& .MuiDataGrid-cell": {
                              borderBottom: "none",
                            },
                            "& .name-column--cell": {
                              color: colors.greenAccent[300],
                            },
                            "& .MuiDataGrid-columnHeaders": {
                              backgroundColor: colors.blueAccent[800],
                              borderBottom: "none",
                            },
                            "& .MuiDataGrid-virtualScroller": {
                              backgroundColor: colors.primary[400],
                            },
                            "& .MuiDataGrid-footerContainer": {
                              borderTop: "none",
                              backgroundColor: colors.blueAccent[800],
                            },
                            "& .MuiCheckbox-root": {
                              color: `${colors.greenAccent[200]} !important`,
                            },
                          }}
                        >
                          <DataGrid
                            // checkboxSelection
                            loading={exploreLoading}
                            rows={explorelistViewData}
                            columns={columns}
                            disableSelectionOnClick
                            getRowId={(row) => row.RecordID}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) =>
                              setPageSize(newPageSize)
                            }
                            rowsPerPageOptions={[5, 10, 20]}
                            pagination
                            onCellClick={(params) => {
                              const currentRow = params.row;
                              const currentcellField = params.field;
                              selectcelldata(currentRow, "E", currentcellField);

                              console.log(JSON.stringify(params));
                            }}
                            components={{
                              Toolbar: Custombar,
                            }}
                            onStateChange={(stateParams) =>
                              setRowCount(stateParams.pagination.rowCount)
                            }
                            componentsProps={{
                              toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    </FormControl>
                    <FormControl
                      sx={{
                        gridColumn: "span 2",
                        gap: "40px",
                        mt: { xs: "opx", md: "210px" },
                      }}
                    >
                      <Formik
                        innerRef={ref}
                        initialValues={tarifInitialvalues}
                        onSubmit={(values, { resetForm }) => {
                          setTimeout(() => {
                            fnmaterialSave(values, resetForm, false);
                            // alert("hai");
                          }, 100);
                        }}
                        validationSchema={tarifSchema}
                        enableReinitialize={iniTarif}
                      >
                        {({
                          errors,
                          touched,
                          handleBlur,
                          handleChange,
                          isSubmitting,
                          values,
                          handleSubmit,
                          resetForm,
                        }) => (
                          <form onSubmit={handleSubmit}>
                            {/* mt:{xs:"opx",md:"210px"} */}

                            <FormControl
                              sx={{ gridColumn: "span 2", gap: "40px" }}
                              style={{ width: "100%" }}
                            >
                              <TextField
                                id="outlined-basic"
                                label=""
                                variant="filled"
                                value={selectSMLookupData.SMlookupRecordid}
                                focused
                                sx={{ display: "none" }}
                              />

                              <FormControl
                                sx={{
                                  gridColumn: "span 2",
                                  display: "flex",
                                  mt: "-17px",
                                }}
                              >
                                {/* <FormLabel></FormLabel> */}
                                <FormControl
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginTop: "45px",
                                  }}
                                >
                                  <TextField
                                    id="outlined-basic"
                                    label="Country ID"
                                    variant="filled"
                                    value={selectSMLookupData.SMlookupCode}
                                    focused
                                    required
                                    inputProps={{ tabIndex: "-1" }}
                                  />
                                  <IconButton
                                    sx={{ height: 40, width: 40 }}
                                    onClick={() => handleShow("SM")}
                                  >
                                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                  </IconButton>
                                  {/* <MoreHorizIcon  onClick={()=>handleShow('SM')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

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
                                id="outlined-basic"
                                label=""
                                variant="filled"
                                value={selectUOMLookupData.UOMlookupRecordid}
                                focused
                                sx={{ display: "none" }}
                              />

                              <FormControl
                                sx={{
                                  gridColumn: "span 2",
                                  display: "flex",
                                  mt: "-17px",
                                }}
                              >
                                {/* <FormLabel></FormLabel> */}
                                <FormControl
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
                                >
                                  <TextField
                                    id="outlined-basic"
                                    label="UOM"
                                    variant="filled"
                                    value={selectUOMLookupData.UOMlookupDesc}
                                    fullWidth
                                    required
                                    focused
                                    inputProps={{ tabIndex: "-1" }}
                                  />
                                  <IconButton
                                    sx={{ height: 40, width: 40 }}
                                    onClick={() => handleShow("UOM")}
                                  >
                                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                  </IconButton>
                                </FormControl>
                              </FormControl>

                              <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Length"
                                id="Length"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Length}
                                name="Length"
                                error={!!touched.Length && !!errors.Length}
                                helperText={touched.Length && errors.Length}
                                required
                                focused
                                sx={{
                                  background: "#fff6c3",
                                  input: { textAlign: "right" },
                                }}
                              />

                              <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                id="Width"
                                name="Width"
                                label="Width"
                                value={values.Width}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!touched.Width && !!errors.Width}
                                helperText={touched.Width && errors.Width}
                                focused
                                sx={{
                                  background: "#fff6c3",
                                  input: { textAlign: "right" },
                                }}
                              />
                              <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                id="Height"
                                name="Height"
                                label="Height"
                                value={values.Height}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!touched.Height && !!errors.Height}
                                helperText={touched.Height && errors.Height}
                                focused
                                sx={{
                                  background: "#fff6c3",
                                  input: { textAlign: "right" },
                                }}
                              />

                              <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                id="Rate Per Kg"
                                name="RatePerKg"
                                label="Rate"
                                value={values.RatePerKg}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                sx={{
                                  background: "#fff6c3",
                                  input: { textAlign: "right" },
                                }}
                                error={
                                  !!touched.RatePerKg && !!errors.RatePerKg
                                }
                                helperText={
                                  touched.RatePerKg && errors.RatePerKg
                                }
                                focused
                              />
                              <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                id="HandCharge"
                                name="HandCharge"
                                label="Hand Charge"
                                value={values.HandCharge}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={
                                  !!touched.HandCharge && !!errors.HandCharge
                                }
                                helperText={
                                  touched.HandCharge && errors.HandCharge
                                }
                                focused
                                sx={{
                                  background: "#fff6c3",
                                  input: { textAlign: "right" },
                                }}
                              />

                              <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Sort Order"
                                id="SortOrder"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.SortOrder}
                                name="SortOrder"
                                error={
                                  !!touched.SortOrder && !!errors.SortOrder
                                }
                                helperText={
                                  touched.SortOrder && errors.SortOrder
                                }
                                sx={{
                                  background: "#fff6c3",
                                  input: { textAlign: "right" },
                                }}
                                focused
                                onWheel={(e) => e.target.blur()} 
                                inputProps={{ maxLength: 9 }}
                                onInput={(e) => {
                                  e.target.value = Math.max(
                                    0,
                                    parseInt(e.target.value)
                                  )
                                    .toString()
                                    .slice(0, 9);
                                }}
                              />
                              {/* <FormControl sx={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
         <FormControlLabel control={<Field type="checkbox" name="checkbox" id="checkbox"  label="Disable" />} label="Disable" />
        
                            
             </FormControl>
             */}
                            </FormControl>

                            <Box
                              display="flex"
                              justifyContent="end"
                              mt="30px"
                              gap={2}
                            >
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
                              {YearFlag == "true" ? (
                                <Button
                                  color="error"
                                  variant="contained"
                                  onClick={() => {
                                    Swal.fire({
                                      title: `Do you want Delete?`,
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#3085d6",
                                      cancelButtonColor: "#d33",
                                      confirmButtonText: "Confirm",
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        fnmaterialSave(values, resetForm, true);
                                        
                                      } else {
                                        return;
                                      }
                                    });                                  }}
                                >
                                  Delete
                                </Button>
                              ) : (
                                <Button
                                  color="error"
                                  variant="contained"
                                  disabled={true}
                                >
                                  Delete
                                </Button>
                              )}
                              <Button
                                type="reset"
                                color="warning"
                                variant="contained"
                                onClick={() => {
                                  setScreen(0);
                                }}
                              >
                                Cancel
                              </Button>
                            </Box>
                            <Popup
                              title="Country"
                              openPopup={openSMPopup}
                              setOpenPopup={setOpenSMPopup}
                            >
                              <Listviewpopup
                                accessID="2003"
                                screenName="Country"
                                childToParent={childToParent}
                              />
                            </Popup>
                            <Popup
                              title="UOM"
                              openPopup={openUOMPopup}
                              setOpenPopup={setOpenUOMPopup}
                            >
                              <Listviewpopup
                                accessID="2005"
                                screenName="UOM"
                                filterName="Type"
                                filterValue={typeoftarif}
                                childToParent={childToParent}
                              />
                            </Popup>
                          </form>
                        )}
                      </Formik>
                    </FormControl>
                  </Box>
                </Box>
              )}
            </Formik>
          </Box>
        ) : (
          false
        )}

        {show == "2" ? (
          <Box m="20px" sx={{ m: 2 }}>
            <Formik
              // onSubmit={handleFormSubmit}
              initialValues={initialValues}
              enableReinitialize={ini}
              validationSchema={basicSchema}
            >
              {({ values, errors, touched, handleBlur, handleChange }) => (
                <Box>
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
                        inputProps={{ readOnly: true }}
                        value={values.Code}
                        id="Code"
                        name="Code"
                        label="Code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        //  error={!!touched.Desc && !!errors.Desc}
                        //  helperText={touched.Desc && errors.Desc}
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        value={values.Description}
                        id="Description"
                        name="Description"
                        label="Description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{ readOnly: true }}
                        error={!!touched.Description && !!errors.Description}
                        helperText={touched.Description && errors.Description}
                        focused
                      />

                      <Box m="5px">
                        <Box
                          m="5px 0 0 0"
                          height="75vh"
                          sx={{
                            "& .MuiDataGrid-root": {
                              border: "none",
                            },
                            "& .MuiDataGrid-cell": {
                              borderBottom: "none",
                            },
                            "& .name-column--cell": {
                              color: colors.greenAccent[300],
                            },
                            "& .MuiDataGrid-columnHeaders": {
                              backgroundColor: colors.blueAccent[800],
                              borderBottom: "none",
                            },
                            "& .MuiDataGrid-virtualScroller": {
                              backgroundColor: colors.primary[400],
                            },
                            "& .MuiDataGrid-footerContainer": {
                              borderTop: "none",
                              backgroundColor: colors.blueAccent[800],
                            },
                            "& .MuiCheckbox-root": {
                              color: `${colors.greenAccent[200]} !important`,
                            },
                          }}
                        >
                          <DataGrid
                            // checkboxSelection
                            loading={exploreLoading}
                            rows={explorelistViewData}
                            columns={columns}
                            disableSelectionOnClick
                            getRowId={(row) => row.RecordID}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) =>
                              setPageSize(newPageSize)
                            }
                            rowsPerPageOptions={[5, 10, 20]}
                            pagination
                            onCellClick={(params) => {
                              const currentRow = params.row;
                              const currentcellField = params.field;
                              selectcelldata(currentRow, "E", currentcellField);

                              console.log(JSON.stringify(params));
                            }}
                            components={{
                              Toolbar: Custombar,
                            }}
                            onStateChange={(stateParams) =>
                              setRowCount(stateParams.pagination.rowCount)
                            }
                            componentsProps={{
                              toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    </FormControl>
                    <FormControl
                      sx={{
                        gridColumn: "span 2",
                        gap: "40px",
                        mt: { xs: "opx", md: "210px" },
                      }}
                    >
                      <Formik
                        innerRef={ref}
                        initialValues={tarifInitialvalues}
                        onSubmit={(values, { resetForm }) => {
                          setTimeout(() => {
                            fnmaterialSave(values, resetForm, false);
                            // alert("hai");
                          }, 100);
                        }}
                        validationSchema={tarifSchema}
                        enableReinitialize={iniTarif}
                      >
                        {({
                          errors,
                          touched,
                          handleBlur,
                          handleChange,
                          isSubmitting,
                          values,
                          handleSubmit,
                          resetForm,
                        }) => (
                          <form onSubmit={handleSubmit}>
                            {/* mt:{xs:"opx",md:"210px"} */}

                            <FormControl
                              sx={{ gridColumn: "span 2", gap: "40px" }}
                              style={{ width: "100%" }}
                            >
                              <TextField
                                id="outlined-basic"
                                label=""
                                variant="filled"
                                value={selectSMLookupData.SMlookupRecordid}
                                focused
                                sx={{ display: "none" }}
                              />

                              <FormControl
                                sx={{
                                  gridColumn: "span 2",
                                  display: "flex",
                                  mt: "-17px",
                                }}
                              >
                                {/* <FormLabel></FormLabel> */}
                                <FormControl
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginTop: "45px",
                                  }}
                                >
                                  <TextField
                                    id="outlined-basic"
                                    label="Country ID"
                                    variant="filled"
                                    value={selectSMLookupData.SMlookupCode}
                                    focused
                                    required
                                    inputProps={{ tabIndex: "-1" }}
                                  />
                                  <IconButton
                                    sx={{ height: 40, width: 40 }}
                                    onClick={() => handleShow("SM")}
                                  >
                                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                  </IconButton>
                                  {/* <MoreHorizIcon  onClick={()=>handleShow('SM')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

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
                                id="outlined-basic"
                                label=""
                                variant="filled"
                                value={selectUOMLookupData.UOMlookupRecordid}
                                focused
                                sx={{ display: "none" }}
                              />

                              <FormControl
                                sx={{
                                  gridColumn: "span 2",
                                  display: "flex",
                                  mt: "-17px",
                                }}
                              >
                                {/* <FormLabel></FormLabel> */}
                                <FormControl
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
                                >
                                  <TextField
                                    id="outlined-basic"
                                    label="UOM"
                                    variant="filled"
                                    value={selectUOMLookupData.UOMlookupDesc}
                                    fullWidth
                                    required
                                    focused
                                    inputProps={{ tabIndex: "-1" }}
                                  />
                                  <IconButton
                                    sx={{ height: 40, width: 40 }}
                                    onClick={() => handleShow("UOM")}
                                  >
                                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                  </IconButton>
                                </FormControl>
                              </FormControl>

                              <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="From Qty"
                                id="FromKg"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.FromKg}
                                name="FromKg"
                                error={!!touched.FromKg && !!errors.FromKg}
                                helperText={touched.FromKg && errors.FromKg}
                                required
                                focused
                                sx={{
                                  background: "#fff6c3",
                                  input: { textAlign: "right" },
                                }}
                                onInvalid={(e) => {
                                  e.target.setCustomValidity(
                                    "Please Fill The From Quantity"
                                  );
                                }}
                                onInput={(e) => {
                                  e.target.value = Math.max(
                                    0,
                                    parseInt(e.target.value)
                                  )
                                    .toString()
                                    .slice(0, 45);
                                  e.target.setCustomValidity("");
                                }}
                              />

                              <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                id="Tokg"
                                name="Tokg"
                                label="To Qty"
                                value={values.Tokg}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!touched.Tokg && !!errors.Tokg}
                                helperText={touched.Tokg && errors.Tokg}
                                focused
                                sx={{
                                  background: "#fff6c3",
                                  input: { textAlign: "right" },
                                }}
                                onInput={(e) => {
                                  e.target.value = Math.max(
                                    0,
                                    parseInt(e.target.value)
                                  )
                                    .toString()
                                    .slice(0, 45);
                                }}
                              />

                              <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                id="Rate Per Kg"
                                name="RatePerKg"
                                label="Rate Per KG"
                                value={values.RatePerKg}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                sx={{
                                  background: "#fff6c3",
                                  input: { textAlign: "right" },
                                }}
                                error={
                                  !!touched.RatePerKg && !!errors.RatePerKg
                                }
                                helperText={
                                  touched.RatePerKg && errors.RatePerKg
                                }
                                focused
                              />
                              <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                id="HandCharge"
                                name="HandCharge"
                                label="Hand Charge"
                                value={values.HandCharge}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={
                                  !!touched.HandCharge && !!errors.HandCharge
                                }
                                helperText={
                                  touched.HandCharge && errors.HandCharge
                                }
                                focused
                                sx={{
                                  background: "#fff6c3",
                                  input: { textAlign: "right" },
                                }}
                              />

                              <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Sort Order"
                                id="SortOrder"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.SortOrder}
                                name="SortOrder"
                                error={
                                  !!touched.SortOrder && !!errors.SortOrder
                                }
                                helperText={
                                  touched.SortOrder && errors.SortOrder
                                }
                                sx={{
                                  background: "#fff6c3",
                                  input: { textAlign: "right" },
                                }}
                                focused
                                onWheel={(e) => e.target.blur()} 
                                inputProps={{ maxLength: 9 }}
                                onInput={(e) => {
                                  e.target.value = Math.max(
                                    0,
                                    parseInt(e.target.value)
                                  )
                                    .toString()
                                    .slice(0, 9);
                                }}
                              />
                              {/* <FormControl sx={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
                  <FormControlLabel control={<Field type="checkbox" name="checkbox" id="checkbox"  label="Disable" />} label="Disable" />
                  
                                      
                      </FormControl>
                      */}
                            </FormControl>

                            <Box
                              display="flex"
                              justifyContent="end"
                              mt="30px"
                              gap={2}
                            >
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
                              {YearFlag == "true" ? (
                                <Button
                                  color="error"
                                  variant="contained"
                                  onClick={() => {
                                    Swal.fire({
                                      title: `Do you want Delete?`,
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#3085d6",
                                      cancelButtonColor: "#d33",
                                      confirmButtonText: "Confirm",
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        fnmaterialSave(values, resetForm, true);
                                        
                                      } else {
                                        return;
                                      }
                                    });
                                  }}
                                >
                                  Delete
                                </Button>
                              ) : (
                                <Button
                                  color="error"
                                  variant="contained"
                                  disabled={true}
                                >
                                  Delete
                                </Button>
                              )}
                              <Button
                                type="reset"
                                color="warning"
                                variant="contained"
                                onClick={() => {
                                  setScreen(0);
                                }}
                              >
                                Cancel
                              </Button>
                            </Box>
                            <Popup
                              title="Country"
                              openPopup={openSMPopup}
                              setOpenPopup={setOpenSMPopup}
                            >
                              <Listviewpopup
                                accessID="2003"
                                screenName="Country"
                                childToParent={childToParent}
                              />
                            </Popup>
                            <Popup
                              title="UOM"
                              openPopup={openUOMPopup}
                              setOpenPopup={setOpenUOMPopup}
                            >
                              <Listviewpopup
                                accessID="2005"
                                screenName="UOM"
                                filterName="Type"
                                filterValue={typeoftarif}
                                childToParent={childToParent}
                              />
                            </Popup>
                          </form>
                        )}
                      </Formik>
                    </FormControl>
                  </Box>
                </Box>
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

export default Editairlines;
