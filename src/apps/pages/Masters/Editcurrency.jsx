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
  Tooltip
} from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { Formik, Field } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams, useNavigate,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../index";
import {
  fetchApidata,
  postApidata,
  postApidatawol,
  postData
} from "../../../store/reducers/Formapireducer";
import { fetchComboData1 } from "../../../store/reducers/Comboreducer";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
// import basicSchema from "../../Security/validation";
import {currencySchema, curwisebankSchema} from "../../Security/validation";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Listviewpopup from "../Lookup";
import Popup from "../popup";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { tokens } from "../../../Theme";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from '@mui/icons-material/ResetTv';
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
import { useRef } from "react";
import { LoadingButton } from "@mui/lab";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Swal from "sweetalert2";
// ***********************************************
//  Developer:Gowsalya
// Purpose:To Create curreny & currency wise bank

// ***********************************************
const Editcurrency = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [pageSize, setPageSize] = React.useState(10);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);



  const isNonMobile = useMediaQuery("(min-width:600px)");


  const YearFlag = sessionStorage.getItem("YearFlag")
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
  const location = useLocation();
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const ProductCategory = useSelector(
    (state) => state.comboApi.productCategory
  );
  const Year = sessionStorage.getItem("year")
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");

  const [openSMPopup, setOpenSMPopup] = useState(false);
  // ************Lookup Function***************
  function handleShow(type) {
    if (type == "SM") {
      setOpenSMPopup(true);
    }
  }

  useEffect(() => {
    dispatch(fetchApidata(accessID, "get", recID));
  }, [location.key]);
  // save
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

  //*******Assign Currency values from Database in  Yup initial value******* */
  const initialValues = {
    Code: Data.Code,
    Description: Data.Description,
    MinorDescription:Data.MinorDescription,
    Decimal:  Number(Data.Decimal).toFixed(2) ,
    Rate: Number(Data.Rate).toFixed(2),
    Fixedrate: Data.Fixedrate? Number(Data.Fixedrate).toFixed(2): "",
    SortOrder: Data.SortOrder,
    checkbox: Data.Disable,
  };
 
  // **********Save Function*****************
  const fnSave = async (values, types) => {
    const isCheck = values.checkbox ?  "Y": "N";
    const  action = mode == "A" ? "insert" : "update" ;

    const idata = {
      RecordID:recID,
      Code: values.Code,
      Description: values.Description,
      MinorDescription:values.MinorDescription,
      Decimal: 0,
      Rate: values.Rate,
      Fixedrate: values.Fixedrate,
      SortOrder: values.SortOrder,
      YearID:Year,
      Disable: isCheck,
      Finyear,
      CompanyID,
    };
    const data = await dispatch(postData({accessID,action,idata}));
    console.log("🚀 ~ file: Editcurrency.jsx:155 ~ fnSave ~ data:", data)
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      setLoading(false)     

        navigate(`/Apps/TR023/Currency/EditCurrency/${data.payload.Recid}/E`)
      
    } else {
      toast.error(data.payload.Msg)
      setLoading(false) 
    };
  };

  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );
  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );
  const [show, setScreen] = React.useState("0");

  const [supmatedata, setsupmatedata] = useState({
    RecordID: "",
    Address: "",
    SortOrder: "",
    Disable: "",
  });
  const [boMode, setBomode] = useState("A");
  // **********ScreenChange Function*********
  const screenChange = (event) => {
    setScreen(event.target.value);

    if (event.target.value == "1") {
      dispatch(fetchExplorelitview("TR024", "Currencybank", recID, ""));
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
    SMlookupAddress: "",
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
        SMlookupAddress:childdata.Address,
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
        SMlookupAddress:"",
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
          SMlookupRecordid: data.BkRecordID,
          SMlookupCode: data.BankCode,
          SMlookupDesc: data.BankName,
          SMlookupAddress:data.Address,
        });
      }
    }
  };
  //*******Assign currency wise bank values from Grid table in  Yup initial value******* */
  const supmateInitialvalues = {
    Address: Data.Address,
    SortOrder: supmatedata.SortOrder,
    checkbox: supmatedata.Disable,
  };

  /******************************Currencysave  FUNCTION********** */
  const fncurrencySave = async (values, resetForm, types) => {
    
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
          SMlookupAddress:"",
        });
        return;
      }
      saveData = {
        RecordID: supmatedata.RecordID,
        CurRecordID: recID,
        Address: selectSMLookupData.SMlookupAddress,
        SortOrder: values.SortOrder,
        Disable: values.checkbox,
        BkRecordID: selectSMLookupData.SMlookupRecordid,
      };
      type = "harddelete";
    } else {
      setLoading(true)
      if (boMode == "A") {
        saveData = {
          RecordID: "",
          CurRecordID: recID,
          Address:selectSMLookupData.SMlookupAddress,
          SortOrder: values.SortOrder,
          Disable: values.checkbox,
          BkRecordID: selectSMLookupData.SMlookupRecordid,
        };
        type = "insert";
      } else {
        saveData = {
          RecordID: supmatedata.RecordID,
          CurRecordID: recID,
          Address: selectSMLookupData.SMlookupAddress,
          SortOrder: values.SortOrder,
          Disable: values.checkbox,
          BkRecordID: selectSMLookupData.SMlookupRecordid,
        };
        type = "update";
      }
    }
    console.log("save" + JSON.stringify(saveData));

    const data = await dispatch(postApidata("TR024", type, saveData));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      setInicurrency(true)
      setLoading(false)
      dispatch(fetchExplorelitview("TR024", "Currencybank", recID, ""));
      resetForm();
      setsupmatedata({ RecordID: "", Address: "", SortOrder: "", Disable: "" });
      selectcelldata("", "A", "");
    } else{ toast.error(data.payload.Msg)
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
          <Typography>Currency wise bank details</Typography>
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
  const fnLogOut = (props) =>{
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
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: props
      }).then( (result)=>{
          if(result.isConfirmed){
            if(props === 'Logout'){
            navigate("/")}
            if(props === 'Close'){
              navigate("/Apps/TR023/Currency")
            }
          }else{
            return
          }
      })
    }
  return (
    <React.Fragment>
      <Box sx={{ height: "100vh", overflow: "auto" }}>
        
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
        <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} onClick={()=> {setScreen(0)}}>Currency</Typography>
{show == "1" ? (<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  >Currency wise bank details</Typography>):false}
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
                  <MenuItem value={0}>Currency</MenuItem>
                  <MenuItem value={1}>Currency wise bank details</MenuItem>
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
        {show == "0" ? (
          <Box m="20px">
            <Formik
            initialValues={initialValues}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                fnSave(values);
                // alert("hai");
              }, 100);
            }}
            validationSchema={currencySchema}
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
                        id="Code"
                        name="Code"
                        label="Code"
                        
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.Code}
                        error={!!touched.Code && !!errors.Code}
                        helperText={touched.Code && errors.Code}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        autoFocus
                       
                       
                        onInvalid={(e) => { e.target.setCustomValidity('Please Fill The Code') }} 
                        onInput ={(e) => { e.target.setCustomValidity('') }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Major Description"
                        value={values.Description}
                        id="Description"
                        name="Description"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Description && !!errors.Description}
                        helperText={touched.Description && errors.Description}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        inputProps={{ maxLength: 25 }}
                        onInvalid={(e) => { e.target.setCustomValidity('Please Fill The Description') }} 
                        onInput ={(e) => { e.target.setCustomValidity('') }}
                      />
                       <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Minor Description"
                        value={values.MinorDescription}
                        id="MinorDescription"
                        name="MinorDescription"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.MinorDescription && !!errors.MinorDescription}
                        helperText={touched.MinorDescription && errors.MinorDescription}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        inputProps={{ maxLength: 25 }}
                        onInvalid={(e) => { e.target.setCustomValidity('Please Fill The MinorDescription') }} 
                        onInput ={(e) => { e.target.setCustomValidity('') }}
                      />
                       {/* <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Decimal"
                        value={values.Decimal}
                        id="Decimal"
                        name="Decimal"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        error={!!touched.Decimal && !!errors.Decimal}
                        helperText={touched.Decimal && errors.Decimal}
                        sx={{ gridColumn: "span 2", background: "#fff6c3",input:{textAlign:"right"} }}
                        // onInput={(e) => {
                        //   e.target.value = Math.max(0, parseInt(e.target.value))
                        //     .toString()
                        //     .slice(0, 6);
                        // }}
                       
                        
                      /> */}
               
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Rate"
                        id="Rate"
                        name="Rate"
                        value={values.Rate}
                        onBlur={handleBlur}
                        onChange={handleChange}
                       
                        sx={{ gridColumn: "span 2", background: "#fff6c3",input:{textAlign:"right"} }}
                        focused
                        error={!!touched.Rate && !!errors.Rate}
                        helperText={touched.Rate && errors.Rate}
                        onInvalid={(e) => { e.target.setCustomValidity('Please Fill The Rate') }} 
                        onInput ={(e) => { e.target.setCustomValidity('') }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Fixed Rate"
                        id="Fixedrate"
                        name="Fixedrate"
                        required
                        value={values.Fixedrate}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={{ gridColumn: "span 2", background: "#fff6c3",input:{textAlign:"right"} }}
                        focused
                        error={!!touched.Fixedrate && !!errors.Fixedrate}
                        helperText={touched.Fixedrate && errors.Fixedrate}
                        onInvalid={(e) => { e.target.setCustomValidity('Please Fill The Fixed Rate') }} 
                        onInput ={(e) => { e.target.setCustomValidity('') }}
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
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 11);
                        }}
                      />
                      
                       
                     <Box >
                     
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
            
                    <Button
                      color="warning"
                      variant="contained"
                      onClick={() => {
                        navigate(`/Apps/TR023/Currency`);
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
              validationSchema={currencySchema}
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
                        value={values.Code}
                        error={!!touched.Code && !!errors.Code}
                        helperText={touched.Code && errors.Code}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        inputProps={{ readOnly: true }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Description"
                        value={values.Description}
                        id="Description"
                        name="Description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Description && !!errors.Description}
                        helperText={touched.Description && errors.Description}
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
                                    label="Bank Master ID"
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
                                label="Address"
                                id="Address"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={selectSMLookupData.SMlookupAddress}
                                name="Address"
                                sx={{ gridColumn: "span 2" }}
                                error={!!touched.Address && !!errors.Address}
                                helperText={touched.Address && errors.Address}
                                focused
                                multiline
                                inputProps={{ maxLength: 500 }}
                                onInvalid={(e) => { e.target.setCustomValidity('Please Fill The Address') }} 
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
                    fncurrencySave(
                      values,
                      resetForm,
                      "harddelete"
                    );
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
                                accessID="2006"
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
    </React.Fragment>
  );
};

export default Editcurrency;
