import React, { useRef } from "react";
import {
  Typography,
  Box,
  MenuItem,
  Button,
  TextField,
  IconButton,
  FormControlLabel,
  FormControl,
  Checkbox,
  FormLabel,
  Tooltip,
  LinearProgress,
  Select,
  InputLabel,
  Breadcrumbs,
  colors,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFetchData, postApidata, postData } from "../../../store/reducers/Formapireducer";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { bankmasterSchema, currencySchema, curwisebankSchema } from "../../Security/validation";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { useLocation } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Swal from "sweetalert2";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import store from "../../..";
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useTheme } from "@emotion/react";
import { tokens } from "../../../Theme";
import Popup from "../popup";
import Listviewpopup from "../Lookup";

// ***********************************************
// Developer:Gowsalya
// Purpose:To Create Bankmaster
// ***********************************************

const Editbankmasters = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const YearFlag = sessionStorage.getItem("YearFlag");
  let location = useLocation();
  let recID = params.id;
  let mode = params.Mode;
  let accessID = params.accessID;
  const Year = sessionStorage.getItem("year");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");

  const { toggleSidebar, broken, rtl } = useProSidebar();
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);

  const getLoading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const Data = useSelector((state) => state.formApi.Data);


  const [pageSize, setPageSize] = React.useState(10);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);



  // const isNonMobile = useMediaQuery("(min-width:600px)");


  // const YearFlag = sessionStorage.getItem("YearFlag")
  function handleShow(type) {
    if (type == "SM") {
      setOpenSMPopup(true);
    }
  }

  const [ini ,setIni] = useState(true);
  const [inicurrency ,setInicurrency] = useState(true);
  const [loading, setLoading] = useState(false)
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

  /*************************BANK MASTER  YUP INITIAL VALUE*********************/
  const initialValues = {
    code: Data.Code,
    RecordID: Data.RecordID,
    shiftcode:Data.SwiftCode,
    accountnumber:Data.AccountNo,
    description: Data.Description,
    address: Data.Address,
    phone: Data.Phone,
    fax: Data.Fax,
    BeneficiarDetail: Data.BeneficiarDetail,
    sortOrder: Data.SortOrder,
    disable: Data.Disable === "Y" ? true : false,
  };
  // **********ScreenChange Function*********
  
  /*************************SAVE FUNCTION*********************/
  const fnSave = async (values, resetForm) => {
    var idata = {
      RecordID: recID,
      Code: values.code,
      Description: values.description,
      YearID: Year,
      Disable: values.disable == true ? "Y" : "N",
      Address: values.address,
      Phone:0,
      Fax: values.fax,
      SortOrder: values.sortOrder,
      SwiftCode: values.shiftcode,
      AccountNo:values.accountnumber,
      BeneficiaryDetail:values.BeneficiarDetail,
      Finyear,
      CompanyID,
    };
    let action = mode === "A" ? "insert" : "update";

    const data = await dispatch(postData({ accessID, action, idata }));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      navigate(`/Apps/TR022/Bank`);
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

  const screenChange = (event) => {
    setScreen(event.target.value);

    if (event.target.value == "1") {
      dispatch(fetchExplorelitview("TR024", "Currencybank", recID, ""));
      dispatch(getFetchData({ accessID, get: "get", recID }));
      selectcelldata("", "A", "");
    }

    if (event.target.value == "0") {
      dispatch(getFetchData({ accessID, get: "get", recID }));
    }
  };


  const [supmatedata, setsupmatedata] = useState({
    RecordID: "",
    Address: "",
    SortOrder: "",
    Disable: "",
  });
  const [boMode, setBomode] = useState("A");
   const [openSMPopup, setOpenSMPopup] = useState(false);
  // // **********ScreenChange Function*********
  // const screenChange = (event) => {
  //   setScreen(event.target.value);

  //   if (event.target.value == "1") {
  //     dispatch(fetchExplorelitview("TR024", "Currencybank", recID, ""));
  //     dispatch(fetchApidata(accessID, "get", recID));
  //     selectcelldata("", "A", "");
  //   }

  //   if (event.target.value == "0") {
  //     dispatch(fetchApidata(accessID, "get", recID));
  //   }
  // };

  //*************************MATERIAL Lookup Data ****************/

  const [isPopupData, setisPopupdata] = React.useState(false);
  const [selectSMLookupData, setselectSMLookupData] = React.useState({
    SMlookupRecordid: "",
    SMlookupCode: "",
    SMlookupDesc: "",
    // SMlookupAddress: "",
  });
  // *************Type based Lookup open Function**************
  const childToParent = (childdata, type) => {
    console.log("type---" + type);
    console.log("Data---" + JSON.stringify(childdata));

    if (type == "Currency Bank") {
      setselectSMLookupData({
        SMlookupRecordid: childdata.RecordID,
        SMlookupCode: childdata.Code,
        SMlookupDesc: childdata.Name,
        // SMlookupAddress:childdata.Address,
      });
      setOpenSMPopup(false);
    }
  };
  /****************** currency wise bank values assign a state variale******************** */
  const selectcelldata = (data, bMode, field) => {
    console.log("selectdata" + JSON.stringify(data));

    setBomode(bMode);
    setInicurrency(true)
    if (bMode == "A") {
      setsupmatedata({
        RecordID: "",
        Address: "",
        SortOrder: "",
        Disable: data.Disable,
      });
      setselectSMLookupData({
        SMlookupRecordid: "",
        SMlookupCode: "",
        SMlookupDesc: "",
        // SMlookupAddress:"",
      });
    } else {
      if (field == "action") {
        setsupmatedata({
          RecordID: data.RecordID,
          Address: data.Address,
          SortOrder: data.SortOrder,
          Disable: data.Disable,
        });
        setselectSMLookupData({
          SMlookupRecordid: data.CurRecordID,
          SMlookupCode: data.Code,
          SMlookupDesc: data.Description,
          // SMlookupAddress:data.Address,
        });
      }
    }
  };
  //*******Assign currency wise bank values from Grid table in  Yup initial value******* */
  const supmateInitialvalues = {
    Address: supmatedata.Address,
    SortOrder: supmatedata.SortOrder,
    checkbox: supmatedata.Disable,
  };

  /******************************Currencysave  FUNCTION********** */
  const fncurrencySave = async (values, resetForm, types) => {
    console.log("save",values);
   
    setInicurrency(false)
    if(types == 'harddelete'){
      if(supmatedata.RecordID == ''){
        toast.error('Please Select Currency wise bank details')
        return
      }
    }

    if (selectSMLookupData.SMlookupCode == "") {
      toast.error("Please Choose Bank Master Lookup");
      return;
    }

    if (values.Address == "") {
      toast.error("Please Enter Address");
      return;
    }

    if (values.checkbox == true) {
      values.checkbox = "Y";
    } else {
      values.checkbox = "N";
    }

    // console.log(values);

    var saveData = "";
    var type = "";
    if (types === "harddelete") {
      if(supmatedata.RecordID=="")
      {
      
        setsupmatedata({ RecordID: "", Address: "", SortOrder: "", Disable: "" });
        setselectSMLookupData({
          SMlookupRecordid: "",
          SMlookupCode: "",
          SMlookupDesc: "",
          // SMlookupAddress:"",
        });
        return;
      }
      saveData = {
        RecordID: supmatedata.RecordID,
        CurRecordID: selectSMLookupData.SMlookupRecordid,
        Address:values.Address,
        SortOrder: values.SortOrder,
        Disable: values.checkbox,
        BkRecordID: recID ,
      };
      type = "harddelete";
    } else {
      setLoading(true)
      if (boMode == "A") {
        saveData = {
          RecordID: "",
          CurRecordID: selectSMLookupData.SMlookupRecordid ,
          // Address:selectSMLookupData.SMlookupAddress,
          Address:values.Address,
          SortOrder: values.SortOrder,
          Disable: values.checkbox,
          BkRecordID:recID,
        };
        type = "insert";
      } else {
        saveData = {
          RecordID: supmatedata.RecordID,
          CurRecordID:selectSMLookupData.SMlookupRecordid,
          // Address: selectSMLookupData.SMlookupAddress,
          Address:values.Address,
          SortOrder: values.SortOrder,
          Disable: values.checkbox,
          BkRecordID:recID,
        };
        type = "update";
      }
    }
    console.log("save" + JSON.stringify(saveData));

    const response = await dispatch(postApidata("TR024", type, saveData));
    console.log(response);
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      setInicurrency(true)
      setLoading(false)
      dispatch(fetchExplorelitview("TR024", "Currencybank", recID ,""));
      resetForm();
      setsupmatedata({ RecordID: "", Address: "", SortOrder: "", Disable: "" });
      selectcelldata("", "A", "");
    } else{ toast.error(response.payload.Msg)
      setLoading(false) 
    };
  };

  const style = {
    height: "55px",
    border: "2px solid #1769aa ",
    borderRadius: "5px",
    backgroundColor: "#EDEDED",
  };

  const VISIBLE_FIELDS = ["SLNO", "Description", "Code", "action"];

  const columns = React.useMemo(
    () =>
      explorelistViewcolumn.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
    [explorelistViewcolumn]
  );

  const ref = useRef();

  // **********Grid header function************
  const [rowCount ,setRowCount] = useState(0);
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
          <Typography>Bank wise Currency details</Typography>
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
          <IconButton onClick={() => {
            const reset = ref.current.resetForm
            selectcelldata("", "A", "")
            reset()
            }}>
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
          navigate("/Apps/TR022/Bank");
        }
      } else {
        return;
      }
    });
  };

  return (
     <React.Fragment>
    <Box>
      {/* {getLoading ? <LinearProgress /> : false} */}
      <Box sx={{ height: "100vh", overflow: "auto" }}>
        {/* <Box display="flex" justifyContent="space-between" p={2}>
          <Box display="flex" borderRadius="3px" alignItems={"center"}>
            {broken && !rtl && (
              <IconButton onClick={() => toggleSidebar()}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
            <Typography variant="h3">Bank</Typography>
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
        </Box> */}
         <Box display="flex" justifyContent="space-between" p={2}>
        {broken && !rtl && (
          <IconButton
            
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        )}
         <Box display={isNonMobile ? 'flex' : 'none'} borderRadius="3px" alignItems="center">
        <Breadcrumbs maxItems={3} aria-label="breadcrumb" separator={<NavigateNextIcon sx={{color:'#0000D1'}}/>}>
        <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} onClick={()=> {setScreen(0)}}>Bank</Typography>
{show == "1" ? (<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  >Bank wise Currency detail</Typography>):false}
        </Breadcrumbs>
        </Box>
          {/* SEARCH BAR */}
          {/* <Box display="flex" borderRadius="3px" alignItems={"center"}>
            {show == "0" ? (
              <Typography variant="h3">Currency </Typography>
            ) : (
              false
            )}
            {show == "1" ? (
              <Typography variant="h3">{isNonMobile ? 'Currency wise bank details' : 'CWBD'}</Typography>
            ) : (
              false
            )}
          </Box> */}

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
                  <MenuItem value={0}>Bank</MenuItem>
                  <MenuItem value={1}>Bank wise Currency detail</MenuItem>
                </Select>
              </FormControl>
            ) : (
              false
            )}
            
            <Tooltip title="Close">
<IconButton onClick={() =>   fnLogOut('Close')} color="error">
              <ResetTvIcon />
            </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
            <IconButton onClick={() => fnLogOut('Logout')} color="error">
              <LogoutOutlinedIcon />
            </IconButton>
            </Tooltip>
          </Box>
        </Box>
        {show=="0" ? (
          <Box m="20px">
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { resetForm }, touched) => {
                setTimeout(() => {
                  fnSave(values, resetForm, touched);
                }, 100);
              }}
              // validationSchema={bankmasterSchema}
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
                <Form onSubmit={handleSubmit}>
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
                        label="RecordID"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.RecordID}
                        name="RecordID"
                        sx={{ display: "none" }}
                        inputProps={{ maxLength: 10 }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Code"
                        value={values.code}
                        name="code"
                        // error={!!touched.code && !!errors.code}
                        // helperText={touched.code && errors.code}
                        focused
                        // autoFocus
                        placeholder="Auto"
                        inputProps={{ readOnly: true }}
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Name"
                        value={values.description}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="description"
                        error={!!touched.description && !!errors.description}
                        helperText={touched.description && errors.description}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        required
                        onInvalid={(e) => {
                          e.target.setCustomValidity("Please Fill The Name");
                        }}
                        onInput={(e) => {
                          e.target.setCustomValidity("");
                        }}
                        inputProps={{ maxLength: 50 }}
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Address"
                        required
                        value={values.address}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="address"
                        error={!!touched.address && !!errors.address}
                        helperText={touched.address && errors.address}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        inputProps={{ maxLength: 500 }}
                        onInvalid={(e) => {
                          e.target.setCustomValidity("Please Fill The Address");
                        }}
                        onInput={(e) => {
                          e.target.setCustomValidity("");
                        }}
                        multiline
                      />
                       <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Beneficiary Details"
                        required
                        value={values.BeneficiarDetail}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="BeneficiarDetail"
                        sx={{ gridColumn: "span 2" }}
                        focused
                        inputProps={{ maxLength: 500 }}
                        onInvalid={(e) => {
                          e.target.setCustomValidity("Please Fill The Beneficiary");
                        }}
                        onInput={(e) => {
                          e.target.setCustomValidity("");
                        }}
                        multiline
                      />
                       <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Account Number"
                       required
                        value={values.accountnumber}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="accountnumber"
                       id= "accountnumber"
                        sx={{ gridColumn: "span 2" }}
                        focused
                       
                      />
                       <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Swift Code"
                        required
                        value={values.shiftcode}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="shiftcode"
                       id= "shiftcode"
                        sx={{ gridColumn: "span 2" }}
                        focused
                       
                      />
                      {/* <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Phone"
                        value={values.phone}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="phone"
                        required
                        error={!!touched.phone && !!errors.phone}
                        helperText={touched.phone && errors.phone}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        onInvalid={(e) => {
                          e.target.setCustomValidity("Please Fill The Phone");
                        }}
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 11);
                          e.target.setCustomValidity("");
                        }}
                      /> */}
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Fax"
                        value={values.fax}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="fax"
                        error={!!touched.fax && !!errors.fax}
                        helperText={touched.fax && errors.fax}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 11);
                        }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="Number"
                        label="Sort Order"
                        value={values.sortOrder}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="sortOrder"
                        error={!!touched.sortOrder && !!errors.sortOrder}
                        helperText={touched.sortOrder && errors.sortOrder}
                        sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                        focused
                        onWheel={(e) => e.target.blur()} 
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 11);
                        }}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                      />

                      {/* <FormControlLabel
                      control={
                        <Field
                          type="checkbox"
                          name="disable"
                          id="disable"
                          label="Disable"
                        />
                      }
                      label="Disable"
                    /> */}
                      <Box
                        sx={{
                          "& .MuiFormControlLabel-label": { fontSize: "13px" },
                        }}
                      >
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
                    </FormControl>
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                    {YearFlag == "true" ? (
                      <LoadingButton
                        color="secondary"
                        variant="contained"
                        type="submit"
                        // disabled={isSubmitting}
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
                        navigate("/Apps/TR022/Bank");
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Form>
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
              validationSchema={bankmasterSchema}
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
                        id="Code"
                        name="Code"
                        label="Code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.code}
                        // error={!!touched.Code && !!errors.Code}
                        // helperText={touched.Code && errors.Code}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        inputProps={{ readOnly: true }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Description"
                        value={values.description}
                        id="Description"
                        name="Description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        // error={!!touched.Description && !!errors.Description}
                        // helperText={touched.Description && errors.Description}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        inputProps={{ readOnly: true }}
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
                            }}
                            components={{
                              Toolbar: Custombar,
                            }}
                            onStateChange={(stateParams) => setRowCount(stateParams.pagination.rowCount)}
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
                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                    <Formik
                    innerRef={ref}
            initialValues={supmateInitialvalues}
            onSubmit={(values, {resetForm}) => {
              setTimeout(() => {
                fncurrencySave(values, resetForm);
                // alert("hai");
              }, 100);
            }}
            validationSchema={curwisebankSchema}
            enableReinitialize={inicurrency}
          >
            {({
              errors,
              touched,
              handleBlur,
              handleChange,
              isSubmitting,
              values,
              handleSubmit,
              resetForm
            }) => (
              <form onSubmit={handleSubmit}>
                            <FormControl
                              sx={{
                                gridColumn: "span 2",
                                gap: "40px",
                                mt: { xs: "opx", md: "210px" },
                              }}
                              style={{ width: "100%" }}
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
                                  gridColumn: "span 2",
                                  display: "flex",
                                  mt: "-17px",
                                }}
                              >
                                {/* <FormLabel>Bank Master ID</FormLabel> */}
                                <FormControl
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginTop:"45px", 
                                  }}
                                >
                                  <TextField
                                    id="outlined-basic"
                                    label="Currency ID"
                                    variant="filled"
                                    value={selectSMLookupData.SMlookupCode}
                                    focused
                                    required
                                    inputProps={{tabIndex:"-1"}}
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
                                    // label="Description"
                                    variant="filled"
                                    value={selectSMLookupData.SMlookupDesc}
                                    fullWidth
                                    inputProps={{tabIndex:"-1"}}
                                    focused
                                  />
                                </FormControl>
                              </FormControl>

                              <TextField
                                fullWidth
                                required
                                variant="filled"
                                type="text"
                                label="Comment"
                                id="Address"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Address}
                                name="Address"
                                sx={{ gridColumn: "span 2" }}
                                error={!!touched.Address && !!errors.Address}
                                helperText={touched.Address && errors.Address}
                                focused
                                multiline
                                inputProps={{ maxLength: 500 }}
                                onInvalid={(e) => { e.target.setCustomValidity('Please Fill The Comments') }} 
                                onInput ={(e) => { e.target.setCustomValidity('') }}
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
                                  gridColumn: "span 2",
                                  background: "#fff6c3",
                                }}
                                focused
                                onWheel={(e) => e.target.blur()} 
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: "right" },
                                  },
                                }}
                                inputProps={{ maxLength: 9 }}
                                onInput={(e) => {
                                  e.target.value = Math.max(
                                    0,
                                    parseInt(e.target.value)
                                  )
                                    .toString()
                                    .slice(0, 2);
                                }}
                              />
                              {/* <FormControl sx={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
         <FormControlLabel control={<Field type="checkbox" name="checkbox" id="checkbox"  label="Disable" />} label="Disable" />
        
                            
             </FormControl> */}
                            </FormControl>

                            <Box
                              display="flex"
                              justifyContent="end"
                              mt="30px"
                              gap={2}
                            >
                              {
  YearFlag == 'true' ? (
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
  )
}
{
YearFlag == 'true' ? (
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
                        fncurrencySave(
                          values,
                          resetForm,
                          "harddelete"
                        );
                        
                      } else {
                        return;
                      }
                    }); }}



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
)
}
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
                              title="Currency Bank"
                              openPopup={openSMPopup}
                              setOpenPopup={setOpenSMPopup}
                            >
                              <Listviewpopup
                                accessID="2037"
                                screenName="Currency Bank"
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
    </Box>
    </React.Fragment>
  );
};

export default Editbankmasters;
