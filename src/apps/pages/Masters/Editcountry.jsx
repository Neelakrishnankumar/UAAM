import {
  InputLabel,
  useTheme,
  MenuItem,
  Breadcrumbs,
  Menu,
  Box,
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
  Checkbox,
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
  fetchApidata,
  getFetchData,
  postApidata,
  postApidatawol,
  postData,
} from "../../../store/reducers/Formapireducer";
import { fetchComboData1 } from "../../../store/reducers/Comboreducer";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import basicSchema from "../../Security/validation";
import {
  countrySchema,
  seaportSchema,
  airportSchema,
  rexSchema,
} from "../../Security/validation";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Listviewpopup from "../Lookup";
import Popup from "../popup";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { tokens } from "../../../Theme";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { fnFileUpload } from "../../../store/reducers/Imguploadreducer";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { LoadingButton } from "@mui/lab";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Swal from "sweetalert2";
// ***********************************************
// Developer:Ram & Priya
// Purpose:To Create Country & country based sea port air port and rex created in country screen
// ***********************************************
const Editcountry = () => {
  const [pageSize, setPageSize] = React.useState(10);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  const YearFlag = sessionStorage.getItem("YearFlag");
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const Data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const exploreLoading = useSelector((state) => state.exploreApi.loading);
  const ref = useRef();
  const Year = sessionStorage.getItem("year");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  const [ini, setIni] = useState(true);
  const [iniPort, setIniPort] = useState(true);
  const [iniair, setIniair] = useState(true);
  const [loading, setLoading] = useState(false);
  // const [inirex ,setInirex] = useState(true);
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

  var apiData = "";
  apiData = {
    RecordID: Data.RecordID,
    Code: Data.Code,
    Name: Data.Name,
    Disable: Data.Disable === "Y" ? true : false,
    SortOrder: Data.SortOrder,
  };
  //*******Assign Country values from Database in  Yup initial value******* */
  const initialValues = {
    Code: apiData.Code,
    Name: apiData.Name,
    SortOrder: apiData.SortOrder,
    checkbox: apiData.Disable,
  };
  //************Save Function*******************
  const fnSave = async (values, types) => {
    var idata = {
      RecordID: recID,
      Code: values.Code,
      YearID: Year,
      Name: values.Name,
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
        navigate(
          `/Apps/TR025/Country/EditCountry/${data.payload.Recid}/E`
        );
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
  const [show, setScreen] = React.useState("C");
  // port
  const [coportdata, setCopportdata] = useState({
    RecordID: "",
    PortCode: "",
    PortDescription: "",
    Type: "",
    SortOrder: "",
    Disable: "",
  });
  const [boMode, setBomode] = useState("A");
  // rex
  const [corexdata, setCorexdata] = useState({
    RecordID: "",
    RexCode: "",
    RexDescription: "",
    Line: "",
    SortOrder: "",
    Disable: "",
  });
  const [bonotifyMode, setnotifyBomode] = useState("A");

  const [selectedFile, setSelectedFile] = useState();
  const [uploadFile, setUploadFile] = useState();

  /*****************File upload************ */
  const changeHandler = async (event) => {
    setSelectedFile(event.target.files[0]);

    console.log(event.target.files[0]);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "attachments");

    const fileData = await dispatch(
      fnFileUpload(formData, corexdata.RecordID, "TR031")
    );

    console.log("fileData" + JSON.stringify(fileData));
    setUploadFile(fileData.payload.apiResponse);
  };
  // **********ScreenChange Function*********
  const screenChange = (event) => {
    setScreen(event.target.value);
    selectcelldata("", "A", "");
    if (event.target.value == "S") {
      var filter = `${recID} AND Type = '${event.target.value}'`;
      dispatch(fetchExplorelitview("TR030", "Port", filter, ""));
    }
    if (event.target.value == "A") {
      var filter = `${recID} AND Type = '${event.target.value}'`;
      dispatch(fetchExplorelitview("TR030", "Port", filter, ""));
    }
    if (event.target.value == "R") {
      var filter = `${recID} AND CompID = '${CompanyID}'`;
      dispatch(fetchExplorelitview("TR031", "Rex", filter, ""));
    }
  };

  /****************** port values assign a state variale******************** */
  const selectcelldata = (data, bMode, field) => {
    setBomode(bMode);
    setIniPort(true);
    setIniair(true);
    if (bMode == "A") {
      setCopportdata({
        RecordID: "",
        PortCode: "",
        PortDescription: "",
        PortType: "",
        SortOrder: "",
        Disable: "",
      });
    } else {
      if (field == "action") {
        setCopportdata({
          RecordID: data.RecordID,
          PortCode: data.Code,
          PortDescription: data.Description,
          PortType: data.PortType,
          SortOrder: data.SortOrder,
          Disable: data.Disable,
        });
      }
    }
  };
  //*******Assign port values from Grid table in  Yup initial value******* */
  const coportInitialvalues = {
    PortCode: coportdata.PortCode,
    PortDescription: coportdata.PortDescription,
    PortType: coportdata.PortType,
    SortOrder: coportdata.SortOrder,
    checkbox: coportdata.Disable,
  };

  /******************************CountryPort save  FUNCTION********** */
  const fnCoportsave = async (values, resetForm, del) => {

    setLoading(true);
    if (del) {
      if (coportdata.RecordID == "") {
        toast.error("Please Select Port");
        setLoading(false);
        return;
      }
    }
    const idata = {
      RecordID: coportdata.RecordID,
      Code: values.PortCode,
      Description: values.PortDescription,
      Type: show,
      CNRecordID: recID,
      SortOrder: values.SortOrder,
      Disable:"N",
      Finyear,
      CompanyID,
    };
    let action =
      boMode === "A" && !del
        ? "insert"
        : boMode === "E" && del
        ? "harddelete"
        : "update";
    const response = await dispatch(
      explorePostData({ accessID: "TR030", action, idata })
    );
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      setIniPort(true);
      setLoading(false);
      var filter = `${recID} AND Type = '${show}'`;
      dispatch(fetchExplorelitview("TR030", "Port", filter, ""));
      resetForm();
      setCopportdata({
        RecordID: "",
        PortCode: "",
        PortDescription: "",
        PortType: "",
        SortOrder: "",
        Disable: "",
      });

      selectcelldata("", "A", "");
    } else {
      toast.error(response.payload.Msg);
      setLoading(false);
    }
  };

  /*******************************Port Clear fn************** */

  /****************** Rex values assign a state variale******************** */
  const selectNotifycelldata = (datanotify, notifyMode, fieldvalue) => {
    // console.log("selectdata" + JSON.stringify(datanotify));
    setnotifyBomode(notifyMode);
    if (notifyMode == "A") {
      setUploadFile("");
      setCorexdata({
        RecordID: "",
        RexCode: "",
        RexDescription: "",
        Line: "",
        SortOrder: "",
        Disable: "",
      });
    } else {
      if (fieldvalue == "action") {
        setUploadFile(datanotify.Attachments);

        setCorexdata({
          RecordID: datanotify.RecordID,
          RexCode: datanotify.Code,
          RexDescription: datanotify.Description,
          Line: datanotify.Line,
          SortOrder: datanotify.SortOrder,
          Disable: datanotify.Disable,
        });
      }
    }
  };
  const corexInitialvalues = {
    RexCode: corexdata.RexCode,
    RexDescription: corexdata.RexDescription,
    Line: corexdata.Line,
    SortOrder: corexdata.SortOrder,
    checkbox: corexdata.Disable,
  };

  /*******************************Rex save********************* */
  const fnCnrexsave = async (values, resetForm, del) => {
    var document = "";
    if (del) {
      if (corexdata.RecordID == "") {
        toast.error("Please Select REX");
        return;
      }
    }

    if (uploadFile == undefined) {
      document = "";
    } else {
      document = uploadFile;
    }

    if (values.RexCode == "") {
      toast.error("Please Enter Code");
      return;
    }
    if (values.RexDescription == "") {
      toast.error("Please Enter Description");
      return;
    }
    setLoading(true);
    const idata = {
      RecordID: corexdata.RecordID,
      Code: values.RexCode,
      Description: values.RexDescription,
      Line: values.Line,
      SortOrder: values.SortOrder,
      Disable: "N",
      CNRecordID: recID,
      Attachments: document,
      Finyear,
      CompanyID,
    };
    let action =
      bonotifyMode === "A" && !del
        ? "insert"
        : bonotifyMode === "E" && del
        ? "harddelete"
        : "update";
    const response = await dispatch(
      explorePostData({ accessID: "TR031", action, idata })
    );

    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      var filter = `${recID} AND CompID = '${CompanyID}'`;
      dispatch(fetchExplorelitview("TR031", "Rex", filter, ""));
      resetForm();
      setIniair(true);
      setLoading(false);

      setCorexdata({
        RecordID: "",
        RexCode: "",
        RexDescription: "",
        Line: "",
        SortOrder: "",
        Disable: "",
      });
      setUploadFile("");
      selectNotifycelldata("", "A", "");
    } else {
      toast.error(response.payload.Msg);
      setLoading(false);
    }
  };

  const fnViewFile = () => {
    var filePath = store.getState().globalurl.attachmentUrl + uploadFile;

    if (uploadFile == "" || uploadFile == undefined) {
      toast.error("Please Upload File");
      return;
    } else {
      window.open(filePath, "_blank");
    }
  };
/*****************************Search********************** */
  var VISIBLE_FIELDS = [];

  if (show == "S") {
    VISIBLE_FIELDS = ["SLNO", "Code", "Description", "Type", "action"];
  } else if (show == "A") {
    VISIBLE_FIELDS = ["SLNO", "Code", "Description", "Type", "action"];
  } else {
    VISIBLE_FIELDS = ["SLNO", "Code", "Description", "action"];
  }

  const columns = React.useMemo(
    () =>
      explorelistViewcolumn.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
    [explorelistViewcolumn]
  );

  // **********Grid header function************
  const [rowCount, setRowCount] = useState(0);
  function CustomToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>List of Rex</Typography>
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
                selectNotifycelldata("", "A", "");
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

  // **********Grid header function************

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
          <Typography>List of Port</Typography>
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
          <Tooltip title="ADD">
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
          navigate("/Apps/TR025/Country");
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
                    setScreen("C");
                  }}
                >
                  Country
                </Typography>
                {show == "S" ? (
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >
                    Sea Port
                  </Typography>
                ) : (
                  false
                )}
                {show == "A" ? (
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >
                    Air Port
                  </Typography>
                ) : (
                  false
                )}
                {show == "R" ? (
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >
                    Rex Port
                  </Typography>
                ) : (
                  false
                )}
              </Breadcrumbs>
            </Box>
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
                  <MenuItem value={"C"}>Country</MenuItem>
                  <MenuItem value={"S"}>Sea Port</MenuItem>
                  <MenuItem value={"A"}>Air Port</MenuItem>
                  <MenuItem value={"R"}>REX</MenuItem>
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
        {!getLoading && show == "C" ? (
          <Box m="20px">
            <Formik
              initialValues={initialValues}
              onSubmit={(values, setSubmitting) => {
                setTimeout(() => {
                  fnSave(values);
                }, 100);
              }}
              validationSchema={countrySchema}
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
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        value={values.Code}
                        id="Code"
                        name="Code"
                        label="Code"
                        onInvalid={(e) => {
                          e.target.setCustomValidity("Please Fill The Code");
                        }}
                        placeholder="Auto"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{ readOnly: true }}
                        error={!!touched.Code && !!errors.Code}
                        helperText={touched.Code && errors.Code}
                        autoFocus
                        focused
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 4);
                          e.target.setCustomValidity("");
                        }}
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        required
                        inputProps={{ maxLength: 25 }}
                        value={values.Name}
                        id="Name"
                        name="Name"
                        label="Name"
                        onInvalid={(e) => {
                          e.target.setCustomValidity("Please Fill The Name");
                        }}
                        onInput={(e) => {
                          e.target.setCustomValidity("");
                        }}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        error={!!touched.Name && !!errors.Name}
                        helperText={touched.Name && errors.Name}
                        multiline
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Sort Order"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.SortOrder}
                        name="SortOrder"
                        error={!!touched.SortOrder && !!errors.SortOrder}
                        helperText={touched.SortOrder && errors.SortOrder}
                        sx={{ background: "#fff6c3" }}
                        // value={values.Weight}
                        id="SortOrder"
                        focused
                        onWheel={(e) => e.target.blur()} 
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

                      <Box
                        sx={{
                          "& .MuiFormControlLabel-label": { fontSize: "13px" },
                        }}
                      >
                        <FormControl>
                          <Box>
                            <Field
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
                    </FormControl>
                  
       

                    <FormControl
                      sx={{ gridColumn: "span 2", gap: "40px" }}
                    ></FormControl>
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
                        navigate(`/Apps/TR025/Country`);
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

        {show == "S" ? (
          <Box m="20px" sx={{ m: 2 }}>
            <Formik
              // onSubmit={handleFormSubmit}
              initialValues={initialValues}
              enableReinitialize={ini}
              validationSchema={countrySchema}
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
                        value={values.Code}
                        id="Code"
                        name="Code"
                        label="Code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{ readOnly: true }}
                        error={!!touched.Code && !!errors.Code}
                        helperText={touched.Code && errors.Code}
                        focused
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        inputProps={{ readOnly: true }}
                        value={values.Name}
                        id="Name"
                        name="Name"
                        label="Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        error={!!touched.Name && !!errors.Name}
                        helperText={touched.Name && errors.Name}
                        multiline
                      />
                      <Box m="5px">
                        <Box
                          m="5px 0 0 0"
                          height="55vh"
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

                              console.log(
                                "cellparams" + JSON.stringify(params)
                              );
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

                    {/* <Stack  
       
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
   <img  src={userimg} style={{width:'200px',height:'150px'}} />
       </Stack>
               */}

                    <FormControl
                      sx={{
                        gridColumn: "span 2",
                        gap: "40px",
                        mt: { xs: "opx", md: "210px" },
                      }}
                    >
                      <Formik
                        innerRef={ref}
                        initialValues={coportInitialvalues}
                        onSubmit={(values, { resetForm }) => {
                          setTimeout(() => {
                            fnCoportsave(values, resetForm, false);
                          }, 100);
                        }}
                        validationSchema={seaportSchema}
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
                          resetForm,
                        }) => (
                          <form onSubmit={handleSubmit}>
                            <FormControl
                              sx={{ gridColumn: "span 2", gap: "40px" }}
                              style={{ width: "100%" }}
                            >
                              <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Code"
                                id="PortCode"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.PortCode}
                                name="PortCode"
                                sx={{ gridColumn: "span 2", marginTop: "30px" }}
                                error={!!touched.PortCode && !!errors.PortCode}
                                helperText={touched.PortCode && errors.PortCode}
                                focused
                                required
                                inputProps={{ maxLength: 5 }}
                                onInvalid={(e) => {
                                  e.target.setCustomValidity(
                                    "Please Fill The Code"
                                  );
                                }}
                                onInput={(e) => {
                                  e.target.setCustomValidity("");
                                }}
                              />

                              <TextField
                                fullWidth
                                required
                                variant="filled"
                                type="text"
                                label="Description"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                id="PortDescription"
                                name="PortDescription"
                                value={values.PortDescription}
                                error={
                                  !!touched.PortDescription &&
                                  !!errors.PortDescription
                                }
                                helperText={
                                  touched.PortDescription &&
                                  errors.PortDescription
                                }
                                focused
                                inputProps={{ maxLength: 50 }}
                                multiline
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
        <FormLabel>Type</FormLabel>
         
                <Field as="select"  label="Type" 
                onChange={handleChange}
                 value={values.PortType}
                 id="PortType"
                 name="PortType" 
                
                focused 
                style={style} >
                   <option >Select</option>
                  <option value='R'>ByRoad</option>
                  <option value='S' >ByShip</option>
                  <option value='A'>ByAir</option>
                  
           </Field>
           </FormControl> */}

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
                                sx={{ background: "#fff6c3" }}
                                focused
                                onWheel={(e) => e.target.blur()} 
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: "right" },
                                  },
                                }}
                                onInput={(e) => {
                                  e.target.value = Math.max(
                                    0,
                                    parseInt(e.target.value)
                                  )
                                    .toString()
                                    .slice(0, 11);
                                }}
                              />
                              {/* <FormControl sx={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}> */}
                              {/* <FormControlLabel control={<Field type="checkbox" name="checkbox" id="checkbox"  label="Disable" />} label="Disable" /> */}

                              {/* </FormControl> */}
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
                                        fnCoportsave(values, resetForm, true);
                                        
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
                                  setScreen("C");
                                }}
                              >
                                Cancel
                              </Button>
                            </Box>
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
        {show == "A" ? (
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
                        value={values.Code}
                        id="Code"
                        name="Code"
                        label="Code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{ readOnly: true }}
                        error={!!touched.Code && !!errors.Code}
                        helperText={touched.Code && errors.Code}
                        focused
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        inputProps={{ readOnly: true }}
                        value={values.Name}
                        id="Name"
                        name="Name"
                        label="Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        error={!!touched.Name && !!errors.Name}
                        helperText={touched.Name && errors.Name}
                        multiline
                      />
                      <Box m="5px">
                        <Box
                          m="5px 0 0 0"
                          height="55vh"
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

                              console.log(
                                "cellparams" + JSON.stringify(params)
                              );
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

                    {/* <Stack  
       
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
   <img  src={userimg} style={{width:'200px',height:'150px'}} />
       </Stack>
               */}

                    <FormControl
                      sx={{
                        gridColumn: "span 2",
                        gap: "40px",
                        mt: { xs: "opx", md: "210px" },
                      }}
                    >
                      <Formik
                        innerRef={ref}
                        initialValues={coportInitialvalues}
                        onSubmit={(values, { resetForm }) => {
                          setTimeout(() => {
                            fnCoportsave(values, resetForm, false);
                          }, 100);
                        }}
                        validationSchema={airportSchema}
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
                          resetForm,
                        }) => (
                          <form onSubmit={handleSubmit}>
                            <FormControl
                              sx={{ gridColumn: "span 2", gap: "40px" }}
                              style={{ width: "100%" }}
                            >
                              <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Code"
                                id="PortCode"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.PortCode}
                                name="PortCode"
                                sx={{ gridColumn: "span 2", marginTop: "30px" }}
                                error={!!touched.PortCode && !!errors.PortCode}
                                helperText={touched.PortCode && errors.PortCode}
                                focused
                                required
                                inputProps={{ maxLength: 8 }}
                                onInvalid={(e) => {
                                  e.target.setCustomValidity(
                                    "Please Fill The Code"
                                  );
                                }}
                                onInput={(e) => {
                                  e.target.setCustomValidity("");
                                }}
                              />

                              <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Description"
                                required
                                onBlur={handleBlur}
                                onChange={handleChange}
                                id="PortDescription"
                                name="PortDescription"
                                value={values.PortDescription}
                                error={
                                  !!touched.PortDescription &&
                                  !!errors.PortDescription
                                }
                                helperText={
                                  touched.PortDescription &&
                                  errors.PortDescription
                                }
                                sx={{ gridColumn: "span 2" }}
                                focused
                                inputProps={{ maxLength: 45 }}
                                multiline
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
        <FormLabel>Type</FormLabel>
         
                <Field as="select"  label="Type" 
                onChange={handleChange}
                 value={values.PortType}
                 id="PortType"
                 name="PortType" 
                
                focused 
                style={style} >
                   <option >Select</option>
                  <option value='R'>ByRoad</option>
                  <option value='S' >ByShip</option>
                  <option value='A'>ByAir</option>
                  
           </Field>
           </FormControl> */}

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
                                sx={{ background: "#fff6c3" }}
                                focused
                                onWheel={(e) => e.target.blur()} 
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: "right" },
                                  },
                                }}
                                inputProps={{ maxLength: 9 }}
                              />
                              {/* <FormControl sx={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}> */}
                              {/* <FormControlLabel control={<Field type="checkbox" name="checkbox" id="checkbox"  label="Disable" />} label="Disable" /> */}

                              {/* </FormControl> */}
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
                                        fnCoportsave(values, resetForm, true);
                                        
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
                                  setScreen("C");
                                }}
                              >
                                Cancel
                              </Button>
                            </Box>
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

        {/* notify */}
        {show == "R" ? (
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
                        value={values.Code}
                        id="Code"
                        name="Code"
                        label="Code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{ readOnly: true }}
                        error={!!touched.Code && !!errors.Code}
                        helperText={touched.Code && errors.Code}
                        focused
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        inputProps={{ readOnly: true }}
                        value={values.Name}
                        id="Name"
                        name="Name"
                        label="Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        error={!!touched.Name && !!errors.Name}
                        helperText={touched.Name && errors.Name}
                        multiline
                      />
                      <Box m="5px">
                        <Box
                          m="5px 0 0 0"
                          height="55vh"
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
                              const particularRow = params.row;
                              const currentparticularField = params.field;
                              selectNotifycelldata(
                                particularRow,
                                "E",
                                currentparticularField
                              );
                              //  alert("hi"+JSON.stringify(particularRow));
                              console.log(
                                "cellparams" + JSON.stringify(params)
                              );
                            }}
                            components={{
                              Toolbar: CustomToolbar,
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

                    {/* <Stack  
       
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
   <img  src={userimg} style={{width:'200px',height:'150px'}} />
       </Stack> */}

                    <FormControl
                      sx={{
                        gridColumn: "span 2",
                        gap: "40px",
                        mt: { xs: "opx", md: "210px" },
                      }}
                    >
                      <Formik
                        innerRef={ref}
                        initialValues={corexInitialvalues}
                        onSubmit={(values, { resetForm }) => {
                          setTimeout(() => {
                            fnCnrexsave(values, resetForm, false);
                          }, 100);
                        }}
                        // validationSchema={rexSchema}
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
                          resetForm,
                        }) => (
                          <form onSubmit={handleSubmit}>
                            <FormControl
                              sx={{ gridColumn: "span 2", gap: "40px" }}
                              style={{ width: "100%" }}
                            >
                              <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Code"
                                id="RexCode"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.RexCode}
                                name="RexCode"
                                sx={{ gridColumn: "span 2", marginTop: "30px" }}
                                error={!!touched.RexCode && !!errors.RexCode}
                                helperText={touched.RexCode && errors.RexCode}
                                focused
                                required
                                inputProps={{ maxLength: 20 }}
                                onInvalid={(e) => {
                                  e.target.setCustomValidity(
                                    "Please Fill The Code"
                                  );
                                }}
                                onInput={(e) => {
                                  e.target.setCustomValidity("");
                                }}
                              />

                              <TextField
                                fullWidth
                                variant="filled"
                                required
                                type="text"
                                label="Description"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                id="RexDescription"
                                name="RexDescription"
                                value={values.RexDescription}
                                // error={
                                //   !!touched.RexDescription &&
                                //   !!errors.RexDescription
                                // }
                                // helperText={
                                //   touched.RexDescription &&
                                //   errors.RexDescription
                                // }
                                sx={{ gridColumn: "span 2" }}
                                focused
                                inputProps={{ maxLength: 1000 }}
                                multiline
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
                                label="Line"
                                value={values.Line}
                                id="Line"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="Line"
                                error={!!touched.Line && !!errors.Line}
                                helperText={touched.Line && errors.Line}
                                sx={{ gridColumn: "span 2" }}
                                focused
                                inputProps={{ maxLength: 200 }}
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
                                sx={{ background: "#fff6c3" }}
                                focused
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: "right" },
                                  },
                                }}
                                onWheel={(e) => e.target.blur()} 
                                onInput={(e) => {
                                  e.target.value = Math.max(
                                    0,
                                    parseInt(e.target.value)
                                  )
                                    .toString()
                                    .slice(0, 11);
                                }}
                              />
                              {/* <FormControl sx={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}> */}
                              {/* <FormControlLabel control={<Field type="checkbox" name="checkbox" id="checkbox"  label="Disable" />} label="Disable" /> */}

                              {/* </FormControl> */}

                              <FormControl
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                }}
                              >
                                {/* <FormControlLabel control={<Field type="checkbox" name="checkbox" id="checkbox"  label="Disable" />} label="Disable" /> */}
                                <Box>
                                  <Typography variant="h6">
                                    Certificate Attachment
                                  </Typography>
                                  <IconButton
                                    size="large"
                                    color="warning"
                                    aria-label="upload picture"
                                    component="label"
                                  >
                                    <input
                                      hidden
                                      accept="all/*"
                                      type="file"
                                      onChange={changeHandler}
                                    />
                                    <PictureAsPdfOutlinedIcon fontSize="large" />
                                  </IconButton>
                                  <Button
                                    variant="contained"
                                    component={"a"}
                                    onClick={() => {
                                      fnViewFile();
                                    }}
                                  >
                                    View{" "}
                                  </Button>
                                </Box>
                              </FormControl>
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
                                        fnCoportsave(values, resetForm, true);
                                        
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
                                  setScreen("C");
                                }}
                              >
                                Cancel
                              </Button>
                            </Box>
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

export default Editcountry;
