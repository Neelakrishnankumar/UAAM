import {
  Checkbox,
  InputLabel,
  useTheme,
  MenuItem,
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
} from "@mui/material";
import { Formik, Field } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../index";
import {
  fetchApidata,
  postApidata,
} from "../../../store/reducers/Formapireducer";
import { fetchComboData1 } from "../../../store/reducers/Comboreducer";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import basicSchema from "../../Security/validation";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Listviewpopup from "../Lookup";
import Popup from "../popup";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { tokens } from "../../../Theme";

import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

const Editleathermaster = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const listViewData = useSelector((state) => state.listviewApi.rowData);
  const listViewcolumn = useSelector((state) => state.listviewApi.columnData);
  const [pageSize, setPageSize] = React.useState(10);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //var bMode = params.Mode;

  // const onClick = () => setShowText(true);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

  const ProductCategory = useSelector(
    (state) => state.comboApi.productCategory
  );
  const [openSMPopup, setOpenSMPopup] = useState(false);
  // const [openMTPopup,setOpenMTPopup] = useState(false);
  var loginrecid = sessionStorage.getItem("loginRecid");
  console.log(loginrecid);

  function handleShow(type) {
    if (type == "SM") {
      setOpenSMPopup(true);
    }
  }

  useEffect(() => {
    dispatch(fetchApidata(accessID, "get", recID));
  }, []);
  // save
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

  //*************************Leather UOm  Lookup Data ****************/

  const [isPopupData, setisPopupdata] = React.useState(false);
  const [selectSMLookupData, setselectSMLookupData] = React.useState({
    SMlookupRecordid: "",
    SMlookupCode: "",
    SMlookupDesc: "",
  });

  if (isPopupData == false) {
    selectSMLookupData.SMlookupRecordid = Data.UomRecordID;

    selectSMLookupData.SMlookupDesc = Data.UomDesc;
  }
  const childToParent = (childdata, type) => {
    console.log("type---" + type);
    console.log("Data---" + JSON.stringify(childdata));

    if (type == "UOM") {
      setisPopupdata(true);
      setselectSMLookupData({
        SMlookupRecordid: childdata.RecordID,
        SMlookupCode: childdata.Code,
        SMlookupDesc: childdata.Name,
      });
      setOpenSMPopup(false);
    }
  };
  var apiData = "";
  apiData = {
    Code: Data.Code,
    Description: Data.Description,
    Rate: Data.Rate,
    SortOrder: Data.SortOrder,
    Disable: Data.Disable,
  };

  const initialValues = {
    Code: apiData.Code,
    Description: apiData.Description,
    Rate: apiData.Rate,
    SortOrder: apiData.SortOrder,
    checkbox: apiData.Disable,
  };

  /********************************Leather Master save****************** */

  const fnSave = async (values) => {
    if (values.Code == "") {
      toast.error("Please Enter Code");
      return;
    }
    if (values.Description == "") {
      toast.error("Please Enter Description");
      return;
    }
    if (selectSMLookupData.SMlookupRecordid == "") {
      toast.error("Please Choose UOM lookup");
      return;
    }

    if (values.checkbox == true) {
      values.checkbox = "Y";
    } else {
      values.checkbox = "N";
    }

    console.log(values);

    var saveData = {
      RecordID: Data.RecordID,
      Code: values.Code,
      Description: values.Description,
      UomRecordID: selectSMLookupData.SMlookupRecordid,
      Rate: values.Rate,
      SortOrder: values.SortOrder,
      Disable: values.checkbox,
    };
    var type = "";

    if (mode == "A") {
      type = "insert";
    } else {
      type = "update";
    }

    const data = await dispatch(postApidata(accessID, type, saveData));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      navigate(`/Apps/TR034/Leather Master`);
    } else toast.error(data.payload.Msg);
  };

  /******************************Leather Type Screen */
  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );
  console.log("row" + JSON.stringify(explorelistViewData));
  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );
  const [show, setScreen] = React.useState("0");

  const [leatypedata, setleatypedata] = useState({
    RecordID: "",
    LeatherCode: "",
    Description: "",
    Fixrate: "",
    Laterate: "",
    Supp1: "",
    Supp2: "",
    Supp3: "",
    Supp3: "",
    SortOrder: "",
  });
  const [chkbox, setchkbox] = useState(false);
  const [boMode, setBomode] = useState("A");

  const [bonotifyMode, setnotifyBomode] = useState("A");

  const handleChange = (event) => {
    setScreen(event.target.value);

    if (event.target.value == "1") {
      dispatch(fetchExplorelitview("TR035", "Leather Type", recID, ""));
      selectcelldata("", "A", "");
    }

    if (event.target.value == "0") {
      dispatch(fetchApidata(accessID, "get", recID));
    }
  };

  /*****************Leather type Fn******************** */
  const selectcelldata = (data, bMode, field) => {
    console.log("selectdata" + JSON.stringify(data));

    setBomode(bMode);

    if (bMode == "A") {
      setleatypedata({
        RecordID: "",
        Code: "",
        Description: "",
        Fixrate: "",
        Laterate: "",
        Supp1: "",
        Supp2: "",
        Supp3: "",
        SortOrder: "",
        Disable: "",
      });
    } else {
      if (field == "action") {
        if (data.Disable == "Y") {
          setchkbox(true);
        } else {
          setchkbox(false);
        }

        setleatypedata({
          RecordID: data.RecordID,
          Code: data.Code,
          Description: data.Description,
          Fixrate: data.FixRate,
          Laterate: data.LateRate,
          Supp1: data.Supp1,
          Supp2: data.Supp2,
          Supp3: data.Supp3,
          SortOrder: data.SortOrder,
        });
      }
    }
  };

  const leathertypesInitialvalues = {
    Code: leatypedata.Code,
    Description: leatypedata.Description,
    Fixrate: leatypedata.Fixrate,
    Laterate: leatypedata.Laterate,
    Supp1: leatypedata.Supp1,
    Supp2: leatypedata.Supp2,
    Supp3: leatypedata.Supp3,
    SortOrder: leatypedata.SortOrder,
    checkbox: chkbox,
  };

  /*************************Leather type clear */

  const clrForm = () => {
    setleatypedata({
      RecordID: "",
      Code: "",
      Description: "",
      Fixrate: "",
      Laterate: "",
      Supp1: "",
      Supp2: "",
      Supp3: "",
      SortOrder: "",
    });

    selectcelldata("", "A", "");
  };

  /******************************Leather type Save   FUNCTION********** */
  const fnLeathertypesave = async (values, resetForm) => {
    if (values.Code == "") {
      toast.error("Please Enter Code");
      return;
    }
    if (values.Description == "") {
      toast.error("Please Enter Description");
      return;
    }

    if (values.checkbox == true) {
      values.checkbox = "Y";
    } else {
      values.checkbox = "N";
    }

    console.log(values);

    var saveData = "";
    var type = "";

    if (boMode == "A") {
      saveData = {
        RecordID: "",
        Code: values.Code,
        Description: values.Description,
        Fixrate: values.Fixrate,
        Laterate: values.Laterate,
        Supp1: values.Supp1,
        Supp2: values.Supp2,
        Supp3: values.Supp3,
        SortOrder: values.SortOrder,
        Disable: values.checkbox,
        LeaRecordID: recID,
      };
      type = "insert";
    } else {
      saveData = {
        RecordID: leatypedata.RecordID,
        Code: values.Code,
        Description: values.Description,
        Fixrate: values.Fixrate,
        Laterate: values.Laterate,
        Supp1: values.Supp1,
        Supp2: values.Supp2,
        Supp3: values.Supp3,
        SortOrder: values.SortOrder,
        Disable: values.checkbox,
        LeaRecordID: recID,
      };
      type = "update";
    }
    console.log("save" + JSON.stringify(saveData));

    const data = await dispatch(postApidata("TR035", type, saveData));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);

      dispatch(fetchExplorelitview("TR035", "Leather Type", recID, ""));
      resetForm();
      setleatypedata({
        RecordID: "",
        Code: "",
        Description: "",
        Fixrate: "",
        Laterate: "",
        Supp1: "",
        Supp2: "",
        Supp3: "",
        SortOrder: "",
        Disable: "",
      });
      selectcelldata("", "A", "");
    } else toast.error(data.payload.Msg);
  };

  const style = {
    // margin: '1em 0em',

    height: "55px",
    border: "2px solid #1769aa ",
    borderRadius: "5px",
    backgroundColor: "#EDEDED",
  };

  /*****************************************Search************ */
  var VISIBLE_FIELDS = [];

  if (show == "1") {
    VISIBLE_FIELDS = ["SLNO", "Code", "Description", "action"];
  } else {
  }

  const columns = React.useMemo(
    () =>
      explorelistViewcolumn.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
    [explorelistViewcolumn]
  );

  /*****************search******* *******************************/
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
          <Typography>List of Leather Types</Typography>
          <Typography variant="h5">{`(${explorelistViewData.length})`}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <GridToolbarQuickFilter />
          <IconButton onClick={() => selectcelldata("", "A", "")}>
            <AddOutlinedIcon />
          </IconButton>
        </Box>
      </GridToolbarContainer>
    );
  }

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between" p={2}>
        {/* SEARCH BAR */}
        <Box
          display="flex"
          // backgroundColor={colors.primary[400]}
          borderRadius="3px"
          alignItems={"center"}
        >
          {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton> */}
          {show == "0" ? (
            <Typography variant="h3">Leather Master </Typography>
          ) : (
            false
          )}
          {show == "1" ? (
            <Typography variant="h3">Leather Types</Typography>
          ) : (
            false
          )}
          {/* {show=="2" ? <Typography variant="h3">Supplier Notification</Typography>:false} */}
        </Box>

        {/* ICONS */}

        <Box display="flex">
          {mode !== "A" ? (
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">Explore</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={show}
                label="Explore"
                onChange={handleChange}
              >
                <MenuItem value={0}>Leather Master</MenuItem>
                <MenuItem value={1}>Leather Types</MenuItem>
              </Select>
            </FormControl>
          ) : (
            false
          )}
          {/* <IconButton onClick={handleMenu}>
            <SettingsOutlinedIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            
            <MenuItem onClick={() => navigate("./changepassword")}>
              Change Password
            </MenuItem>
            <MenuItem onClick={() => navigate("/")}>Logout</MenuItem>
          </Menu> */}
             <IconButton onClick={() => navigate("/")} color="error">
             <LogoutOutlinedIcon />
          </IconButton>
          {/* <IconButton>
          <PersonOutlinedIcon />
        </IconButton> */}
        </Box>
      </Box>
      {show == "0" ? (
        <Box m="20px">
          {/* { <Header title="Products" subtitle="" /> } */}

          <Formik
            // onSubmit={handleFormSubmit}
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={basicSchema}
          >
            {({ values, errors, touched, handleBlur, handleChange }) => (
              <form>
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
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.Code && !!errors.Code}
                      helperText={touched.Code && errors.Code}
                      sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                      focused
                      inputProps={{ maxLength: 10 }}
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
                      multiline
                      rows={2}
                      inputProps={{ maxLength: 100 }}
                      focused
                    />
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
                      <FormLabel>UOM</FormLabel>
                      <FormControl
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <TextField
                          id="outlined-basic"
                          label="Description"
                          variant="filled"
                          value={selectSMLookupData.SMlookupDesc}
                          fullWidth
                          required
                          focused
                        />
                        <MoreHorizIcon
                          onClick={() => handleShow("SM")}
                          color="white"
                          sx={{ height: "30px" }}
                          mt="15px"
                          fontSize="medium"
                        />
                      </FormControl>
                    </FormControl>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="Number"
                      value={values.Rate}
                      id="Rate"
                      name="Rate"
                      label="Rate"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.Rate && !!errors.Rate}
                      helperText={touched.Rate && errors.Rate}
                      inputProps={{ maxLength: 12 }}
                      focused
                      sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
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
   <Avatar variant="rounded" src={userimg} sx={{width:'200px',height:'150px'}} />
   
   </Stack> */}
                </Box>
                <Box display="flex" justifyContent="end" mt="20px" gap={2}>
                  <Button
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
                      navigate(`/Apps/TR034/Leather Master`);
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
                <Popup
                  title="UOM"
                  openPopup={openSMPopup}
                  setOpenPopup={setOpenSMPopup}
                >
                  <Listviewpopup
                    accessID="2005"
                    screenName="UOM"
                    childToParent={childToParent}
                  />
                </Popup>
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
            enableReinitialize={true}
            validationSchema={basicSchema}
          >
            {({ values, errors, touched, handleBlur, handleChange }) => (
              <form>
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
                      inputProps={{ maxLength: 10 }}
                      value={values.Code}
                      id="Code"
                      name="Code"
                      label="Code"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      error={!!touched.Code && !!errors.Code}
                      helperText={touched.Code && errors.Code}
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
                      inputProps={{ maxLength: 100 }}
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
                      initialValues={leathertypesInitialvalues}
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
                        resetForm,
                      }) => (
                        <form>
                          {/* mt:{xs:"opx",md:"210px"} */}

                          <FormControl
                            sx={{ gridColumn: "span 2", gap: "40px" }}
                            style={{ width: "100%" }}
                          >
                            <TextField
                              id="outlined-basic"
                              label=""
                              variant="filled"
                              //  value={selectSMLookupData.SMlookupRecordid}
                              focused
                              sx={{ display: "none" }}
                            />

                            <TextField
                              fullWidth
                              variant="filled"
                              type="text"
                              label="Code"
                              id="Code"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.Code}
                              name="Code"
                              sx={{ gridColumn: "span 2" }}
                              error={!!touched.Code && !!errors.Code}
                              helperText={touched.Code && errors.Code}
                              focused
                              required
                              inputProps={{ maxLength: 10 }}
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
                              error={
                                !!touched.Description && !!errors.Description
                              }
                              helperText={
                                touched.Description && errors.Description
                              }
                              inputProps={{ maxLength: 100 }}
                              focused
                            />
                            <TextField
                              fullWidth
                              variant="filled"
                              type="number"
                              value={values.Fixrate}
                              id="Fixrate"
                              name="Fixrate"
                              label="FixRate"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={!!touched.Fixrate && !!errors.Fixrate}
                              helperText={touched.Fixrate && errors.Fixrate}
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: "right" },
                                },
                              }}
                              inputProps={{ maxLength: 12 }}
                              focused
                            />
                            <TextField
                              fullWidth
                              variant="filled"
                              type="text"
                              value={values.Laterate}
                              id="Laterate"
                              name="Laterate"
                              label="LatestRate"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={!!touched.Laterate && !!errors.Laterate}
                              helperText={touched.Laterate && errors.Laterate}
                              inputProps={{ maxLength: 12 }}
                              focused
                            />
                            <TextField
                              fullWidth
                              variant="filled"
                              type="text"
                              value={values.Supp1}
                              id="Supp1"
                              name="Supp1"
                              label="Supplier1"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={!!touched.Supp1 && !!errors.Supp1}
                              helperText={touched.Supp1 && errors.Supp1}
                              inputProps={{ maxLength: 100 }}
                              focused
                            />
                            <TextField
                              fullWidth
                              variant="filled"
                              type="text"
                              value={values.Supp2}
                              id="Supp2"
                              name="Supp2"
                              label="Supplier2"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              // error={!!touched.Coe && !!errors.Coe}
                              // helperText={touched.Coe && errors.Coe}

                              focused
                            />
                            <TextField
                              fullWidth
                              variant="filled"
                              type="text"
                              value={values.Supp3}
                              id="Supp3"
                              name="Supp3"
                              label="Supplier3"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              // error={!!touched.Coe && !!errors.Coe}
                              // helperText={touched.Coe && errors.Coe}

                              focused
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
                              error={!!touched.SortOrder && !!errors.SortOrder}
                              helperText={touched.SortOrder && errors.SortOrder}
                              sx={{ gridColumn: "span 2" }}
                              focused
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: "right" },
                                },
                              }}
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

                          <Box
                            display="flex"
                            justifyContent="end"
                            mt="30px"
                            gap={2}
                          >
                            <Button
                              color="secondary"
                              variant="contained"
                              onClick={() => {
                                fnLeathertypesave(values, resetForm);
                              }}
                            >
                              Save
                            </Button>
                            <Button
                              type="reset"
                              color="error"
                              variant="contained"
                              onClick={() => {
                                clrForm();
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

export default Editleathermaster;
