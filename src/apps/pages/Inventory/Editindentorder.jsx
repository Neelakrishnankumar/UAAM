import {
  TextField,
  Box,
  Typography,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  Divider,
  Tooltip,
  Breadcrumbs,
  Checkbox
} from "@mui/material";
import MatxCustomizer from "../Mailpdf";
import { mailOpen,getMail } from "../../../store/reducers/Listviewapireducer";
import EmailIcon from '@mui/icons-material/Email';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import Swal from "sweetalert2";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from '@mui/icons-material/ResetTv';
import { Field, Formik } from "formik";
import { CheckBox } from "@mui/icons-material";
import basicSchema from "../../Security/validation";
import store from "../../../index";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApidata,
  postApidata,
  StockProcessApi,
  hashtoken
} from "../../../store/reducers/Formapireducer";
import React, { useState, useEffect,useRef } from "react";
import { toast } from "react-hot-toast";

import Listviewpopup from "../Lookup";
import Popup from "../popup";
import { tokens } from "../../../Theme";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
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
import { LoadingButton } from "@mui/lab";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
 // ***********************************************
//  Developer:Gowsalya
// Purpose:To Create Tannery

// ***********************************************
const Editindentorder = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const YearFlag = sessionStorage.getItem("YearFlag")
  const [show, setScreen] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const { toggleSidebar, broken, rtl } = useProSidebar();
  
  const screenChange = (event) => {
    setScreen(event.target.value);
  };
  let params = useParams();
  console.log("🚀 ~ file: Editindentorder.jsx:71 ~ Editindentorder ~ params:", params)
  const mode = params.Mode;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  var recID = params.id;
  var parenid = params.parenid;
  var accessID = params.accessID;
  var supplierID = params.supplierID;
  const Data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.loading);
  var compID = sessionStorage.getItem("compID");
  const CompanyName = sessionStorage.getItem("company");
  const Year = sessionStorage.getItem("year");
  console.log("🚀 ~ file: Secondarylistview.jsx:73 ~ ListviewSecondary ~ params:", params)
  useEffect(() => {
    dispatch(fetchApidata(accessID, "get", recID));
    dispatch(hashtoken({hashtoken:{"Indentdata":`compID=${compID}&intRecID=${recID}&CompanyName=${CompanyName}&Type=${params.Type}`}}));
  }, []);
  const [ini ,setIni] = useState(true);
  const [loading, setLoading] = useState(false)
  var invoice;
  const mailData = useSelector((state) => state.listviewApi.mailData);
//  console.log(mailData);
  const open = useSelector((state) => state.listviewApi.mailOpen);
  const hashtokendata = useSelector((state) => state.formApi.hashtokenData);

  var apiData = "";
  apiData = {
    IndentNo: Data.IndentNo,
    Date: Data.Date,
    IndentDate: Data.IndentDate,
    Availablestock: Data.Availablestock,
    Quantity: Data.Quantity,
    QuantityRefinish: Data.QuantityRefinish,
    LeatherDespatchdate: Data.LeatherDespatchdate,
    LeaDespatchDate: Data.LeaDespatchDate,
    Swatchref: Data.Swatchref,
    Orderno: Data.Orderno,
    OrderDespatchdate: Data.OrderDespatchdate,
    Lotno: Data.Lotno,
    Wetbluegrade: Data.Wetbluegrade,
    Processcode1: Data.Processcode1,
    Processstartadate1: Data.Processstartadate1,
    Processfinishdate1: Data.Processfinishdate1,
    Processcode2: Data.Processcode2,
    Processstartadate2: Data.Processstartadate2,
    Processfinishdate2: Data.Processfinishdate2,
    Remarks: Data.Remarks,
    Dcno1: Data.Dcno1,
    Dcnodate1: Data.Dcnodate1,
    Dcno2: Data.Dcno2,
    Dcnodate2: Data.Dcnodate2,
    Dcno3: Data.Dcno3,
    Dcnodate3: Data.Dcnodate3,
    Disable: Data.Disable,
    SortOrder: Data.SortOrder,
    MaterialRequiredQty: Data.MaterialRequiredQty,
    CustomerOrderNo: Data.CustomerOrderNo,
    QuantitytoProduce: Data.QuantitytoProduce,
  };
//*******Assign Indent order values from Database in  Yup initial value******* */
  const initialValues = {
    IndentNo: apiData.IndentNo,
    Date: apiData.Date,
    IndentDate: apiData.IndentDate,
    Availablestock: apiData.Availablestock,
    Quantity: apiData.Quantity,
    QuantityRefinish: apiData.QuantityRefinish,
    LeatherDespatchdate: apiData.LeatherDespatchdate,
     LeaDespatchDate: apiData.LeaDespatchDate,
    Swatchref: apiData.Swatchref,
    Orderno: apiData.Orderno,
    OrderDespatchdate: apiData.OrderDespatchdate,
    Lotno: apiData.Lotno,
    Wetbluegrade: apiData.Wetbluegrade,
    Processcode1: apiData.Processcode1,
    Processstartadate1: apiData.Processstartadate1,
    Processfinishdate1: apiData.Processfinishdate1,
    Processcode2: apiData.Processcode2,
    Processstartadate2: apiData.Processstartadate2,
    Processfinishdate2: apiData.Processfinishdate2,
    Remarks: apiData.Remarks,
    Dcno1: apiData.Dcno1,
    Dcnodate1: apiData.Dcnodate1,
    Dcno2: apiData.Dcno2,
    Dcnodate2: apiData.Dcnodate2,
    Dcno3: apiData.Dcno3,
    Dcnodate3: apiData.Dcnodate3,
    SortOrder: apiData.SortOrder,
    checkbox: apiData.Disable,
    MaterialRequiredQty: apiData.MaterialRequiredQty,
    CustomerOrderNo: apiData.CustomerOrderNo,
    QuantitytoProduce: apiData.QuantitytoProduce,
    approvedQty: Data.QuantitytoProduce,
  };
  // **********Save Function*****************
  const fnSave = async (values) => {
    setLoading(true)
    setIni(false)
    console.log(
      "🚀 ~ file: Editmaterial.jsx:249 ~ Editmatrial ~ values",
      values
    );
    // if (values.Processfinishdate1 < values.Processstartadate1  ){
    //   toast.error("Finish date should be greater than strart date ")
    //  setLoading(false)
    //   return
    // }
    // if (values.Processfinishdate2 < values.Processstartadate2  ){
    //   toast.error("Finish date should be greater than strart date ")
    //  setLoading(false)
    //   return
    // }
   

    if (values.checkbox == true) {
      values.checkbox = "Y";
    } else {
      values.checkbox = "N";
    }
   

    var saveData = {
      RecordID: Data.RecordID,
      Indentno: values.IndentNo,
      IndentDate: values.IndentDate,
      QuantityRefinish: values.QuantityRefinish,
      LeatherDespatchdate: values.LeatherDespatchdate,
      Swatchref: values.Swatchref,
      OrderDespatchdate: "",
      Lotno: "",
      Wetbluegrade: "",
      Processcode1: "",
      Processcode2: "",
      Dcno1: "",
      Dcno2: "",
      Dcno3: "",
      Processstartadate1: "",
      Processfinishdate1: "",
      Processstartadate2: "",
      Processfinishdate2: "",
      Dcnodate1: "",
      Dcnodate2:"",
      Dcnodate3: "",
      Disable: "N",
      SortOrder: 0,
      QuantitytoProduce: values.QuantitytoProduce,
      PreparedByEMPID: selectIOPLookupData.IOPlookupRecordid,
      ApprovalEMPID:selectIOALookupData.IOAlookupRecordid,
      CheckedEMPID: selectIOCLookupData.IOClookupRecordid,
      ReceivedByEMPID:selectIORLookupData.IORlookupRecordid,
      SupplierRecID:selectSUPLookupData.SUPlookupRecordid,
      Remarks:"",
      ApprovedQty:values.approvedQty,
      Chqreqdate:0, 
      DateofReceipt:0,
      Dcno:0,
      Invoiceno:0, 
      InvoiceValue:0, 
      ApprovedPayment:0,
      QualityRemarks:0,
      Finyear:Year,
      CompanyID:compID,
    };
    var type = "update";

   

    const data = await dispatch(postApidata(accessID, type, saveData));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      setLoading(false)
      navigate(
       
        `/Apps/Secondarylistview/TR119/List of Supplier/${supplierID}/${parenid}`
      );
    } else{
       toast.error(data.payload.Msg)
       setLoading(false)  
    };
  };
  const fnProcess = async() => {

    const props = {accessID,recID}
    const Data = await dispatch(StockProcessApi(props))
     console.log("🚀 ~ file: Editindentorder.jsx:320 ~ fnProcess ~ Data:", Data)
    if (Data.payload.Status == "Y") {
      toast.success(Data.payload.Msg);
      navigate( `/Apps/Secondarylistview/TR119/List of Supplier/${supplierID}/${parenid}`)
    }else{
      toast.success(Data.payload.Msg);

    }}
  const [openILpopup, setOpenILpopup] = useState(false);
  const [openSUPPopup, setOpenSUPPopup] = useState(false);
  const [openIOPPopup, setOpenIOPPopup] = useState(false);
  const [openIORPopup, setOpenIORPopup] = useState(false);
  const [openIOCPopup, setOpenIOCPopup] = useState(false);
  const [openIOAPopup, setOpenIOAPopup] = useState(false);
  // ************Lookup Function***************
  function handleShow(type) {
    if (type == "IL") {
      setOpenILpopup(true);
    }
    if (type == "SUP") {
      setOpenSUPPopup(true);
    }
    if (type == "IOP") {
      setOpenIOPPopup(true);
    }
    if (type == "IOR") {
      setOpenIORPopup(true);
    }
    if (type == "IOC") {
      setOpenIOCPopup(true);
    }
    if (type == "IOA") {
      setOpenIOAPopup(true);
    }
  }

  /********************************* Look up***************************/
  const [isPopupData, setisPopupdata] = React.useState(false);
  const [selectILLookupData, setselectILLookupData] = React.useState({
    ILlookupRecordid: "",
    ILlookupCode: "",
    ILlookupDesc: "",
  });
  const [selectICLookupData, setselectICLookupData] = React.useState({
    IClookupRecordid: "",
    IClookupCode: "",
    IClookupDesc: "",
  });
  const [selectICULookupData, setselectICULookupData] = React.useState({
    ICUlookupRecordid: "",
    ICUlookupCode: "",
    ICULlookupDesc: "",
  });
  const [selectISLookupData, setselectISLookupData] = React.useState({
    ISlookupRecordid: "",
    ISlookupCode: "",
    ISlookupDesc: "",
  });
  // SUPPLIER
  const [selectSUPLookupData, setselectSUPLookupData] = React.useState({
    SUPlookupRecordid: "",
    SUPlookupCode: "",
    SUPlookupDesc: "",
  });
   // PREPARED
   const [selectIOPLookupData, setselectIOPLookupData] = React.useState({
    IOPlookupRecordid: "",
    IOPlookupCode: "",
    IOPlookupDesc: "",
  });
    // Received
    const [selectIORLookupData, setselectIORLookupData] = React.useState({
      IORlookupRecordid: "",
      IORlookupCode: "",
      IORlookupDesc: "",
    });
     // CHECKED
     const [selectIOCLookupData, setselectIOCLookupData] = React.useState({
      IOClookupRecordid: "",
      IOClookupCode: "",
      IOClookupDesc: "",
    });
     // Approval
     const [selectIOALookupData, setselectIOALookupData] = React.useState({
      IOAlookupRecordid: "",
      IOAlookupCode: "",
      IOAlookupDesc: "",
    });

     

    // const printfn= () =>{
    
    //   <a href={`${store.getState().globalurl.pdfurl}indent.php?compID=3&intRecID=${recID}`} target="_blank" 
    //                 rel="noreferrer"></a>
    // }

//************************** Lookup value assign type based Function *****************/
  const childToParent = (childdata, type) => {
    console.log("type---" + type);
    console.log("Data---" + JSON.stringify(childdata));
    setisPopupdata(true);
    if (type == "Leather") {
      setselectILLookupData({
        ILlookupCode: childdata.Code,
        ILlookupRecordid: childdata.RecordID,
        ILlookupDesc: childdata.Name,
      });
      setOpenILpopup(false);
    }
    // if (type == "Supplier") {
    //   setselectSUPLookupData({
    //     SUPlookupCode: childdata.Code,
    //     SUPlookupRecordid: childdata.RecordID,
    //     SUPlookupDesc: childdata.Name,
    //   });
    //   setOpenSUPPopup(false);
    // }
    if (type == "Supplier") {
      setselectSUPLookupData({
        SUPlookupCode: childdata.Code,
        SUPlookupRecordid: childdata.SuppRecordID,
        SUPlookupDesc: childdata.Name,
      });
      setOpenSUPPopup(false);
    }
    if (type == "Indentorder Prepared") {
      setselectIOPLookupData({
        IOPlookupCode: childdata.Code,
        IOPlookupRecordid: childdata.RecordID,
        IOPlookupDesc: childdata.Name,
      });
      setOpenIOPPopup(false);
    }
    if (type == "Indentorder Received") {
      setselectIORLookupData({
        IORlookupCode: childdata.Code,
        IORlookupRecordid: childdata.RecordID,
        IORlookupDesc: childdata.Name,
      });
      setOpenIORPopup(false);
    }
    if (type == "Indentorder Checked") {
      setselectIOCLookupData({
        IOClookupCode: childdata.Code,
        IOClookupRecordid: childdata.RecordID,
        IOClookupDesc: childdata.Name,
      });
      setOpenIOCPopup(false);
    }
    if (type == "Indentorder Approval") {
      setselectIOALookupData({
        IOAlookupCode: childdata.Code,
        IOAlookupRecordid: childdata.RecordID,
        IOAlookupDesc: childdata.Name,
      });
      setOpenIOAPopup(false);
    }
  };

  if (isPopupData == false) {
    selectILLookupData.ILlookupRecordid = Data.MaterialRecordID;
    selectILLookupData.ILlookupCode = Data.MaterialCode;
    selectILLookupData.ILlookupDesc = Data.MaterialDescription;
  }
  // COLOR
  if (isPopupData == false) {
    selectICLookupData.IClookupRecordid = Data.ColourRecordID;
    selectICLookupData.IClookupCode = Data.ColourCode;
    selectICLookupData.IClookupDesc = Data.ColourDescription;
  }
  // Customer
  if (isPopupData == false) {
    selectICULookupData.ICUlookupRecordid = Data.CustomerRecordID;
    selectICULookupData.ICUlookupCode = Data.CustomerCode;
    selectICULookupData.ICULlookupDesc = Data.CustomerDescription;
  }
  // substance
  if (isPopupData == false) {
    selectISLookupData.ISlookupRecordid = Data.SubstanceRecordID;
    selectISLookupData.ISlookupCode = Data.SubstanceCode;
    selectISLookupData.ISlookupDesc = Data.SubstanceDescription;
  }
   // SUPPLIER
   if (isPopupData == false) {
    selectSUPLookupData.SUPlookupRecordid = Data.SupplierRecID;
    selectSUPLookupData.SUPlookupCode = Data.SupplierCode;
    selectSUPLookupData.SUPlookupDesc = Data.SupplierDescription;
  }
  // PREPARED
  if (isPopupData == false) {
    selectIOPLookupData.IOPlookupRecordid = Data.PreparedByEMPID;
    selectIOPLookupData.IOPlookupCode = Data.PreparedByEMPCode;
    selectIOPLookupData.IOPlookupDesc = Data.PreparedByEMPDescription;
  }
   // RECEIVED
   if (isPopupData == false) {
    selectIORLookupData.IORlookupRecordid = Data.ReceivedByEMPID;
    selectIORLookupData.IORlookupCode = Data.ReceivedByEMPCode;
    selectIORLookupData.IORlookupDesc = Data.ReceivedByEMPDescription;
  }
     // CHECKED
     if (isPopupData == false) {
      selectIOCLookupData.IOClookupRecordid = Data.CheckedEMPID;
      selectIOCLookupData.IOClookupCode = Data.CheckedEMPCode;
      selectIOCLookupData.IOClookupDesc = Data.CheckedEMPDescription;
    }
     // Approval
     if (isPopupData == false) {
      selectIOALookupData.IOAlookupRecordid = Data.ApprovalEMPID;
      selectIOALookupData.IOAlookupCode = Data.ApprovalEMPCode;
      selectIOALookupData.IOAlookupDesc = Data.ApprovalEMPDescription;
    }
    const ref = useRef(null)
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
              navigate("/")
               }
              if (props === "Close") {
                navigate(
                 
                  `/Apps/Secondarylistview/TR119/List of Supplier/${supplierID}/${parenid}`
                );
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
          <Box display="flex" borderRadius="3px" alignItems="center">
          {broken && !rtl && (
          <IconButton
            
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        )}
            {/* {show === 0 ? (
              <Typography variant="h3">Indent Order</Typography>
            ) : (
              false
            )}
            {show === 1 ? <Typography variant="h3">Summery</Typography> : false} */}
            <Breadcrumbs maxItems={3} aria-label="breadcrumb" separator={<NavigateNextIcon sx={{color:'#0000D1'}}/>}>
<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  onClick={() => { navigate(`/Apps/TR047/Production%20Card`); }}>{`Production card(${params.prdCardNo})`}</Typography>
<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} onClick={() => { navigate(`/Apps/TR047/Production%20Card`); }} >{params.Type == "L"?"Leather":"Material"}</Typography>
<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} onClick={() => { navigate(`/Apps/TR047/Production%20Card`); }} >Indent Items</Typography>
<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  onClick={() => { navigate(`/Apps/Secondarylistview/TR119/List of Supplier/${supplierID}/${parenid}`)}}>List of supplier</Typography>
<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}>Indent</Typography>
  
</Breadcrumbs>
          </Box>
          <Box display="flex">
            {/* {mode !== "A" ? (
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel>Explore</InputLabel>
                <Select value={show} label="Explore" onChange={screenChange}>
                  <MenuItem value={0}>Indent Order</MenuItem>
                  <MenuItem value={1}>Summery</MenuItem>
                </Select>
              </FormControl>
            ) : (
              false
            )} */}
            <Tooltip title='Close'>
            <IconButton onClick={() =>   fnLogOut('Close')} color="error">
              < ResetTvIcon  />
            </IconButton>
            </Tooltip>
            <Tooltip title='Logout'>
            <IconButton onClick={() => fnLogOut('Logout')}>
              <LogoutOutlinedIcon color="error" />
            </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {show == "0" ? (
          <Box m="20px">
            <Formik
              initialValues={initialValues}
              enableReinitialize={ini}
              validationSchema={basicSchema}
            >
              {({ values, errors, touched, handleBlur, handleChange }) => (
                <form>
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
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Indent #"
                        value={values.IndentNo}
                        id="IndentNo"
                        name="IndentNo"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        autoFocus
                        inputProps={{ readOnly:true }}
                        onInvalid={(e) => { e.target.setCustomValidity('Please Fill The Indent #') }} 
                        onInput ={(e) => { e.target.setCustomValidity('') }}
                      />
                      <TextField
                        id="outlined-basic"
                        label="ID"
                        variant="filled"
                         value={selectSUPLookupData.SUPlookupRecordid}
                        focused
                        sx={{ display: "none" }}
                      />

                      <FormControl
                        sx={{ gridColumn: "span 2", display: "flex" }}
                      >
                        <FormControl
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="Supplier"
                            variant="filled"
                             value={selectSUPLookupData.SUPlookupCode}
                            focused
                            required
                            inputProps={{tabIndex:"-1"}}
                          />
                          <IconButton
                                    sx={{ height: 40, width: 40 }}
                                    onClick={() => handleShow("SUP")}
                                  >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>
                          {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                          <TextField
                            id="outlined-basic"
                            label=""
                            variant="filled"
                             value={selectSUPLookupData.SUPlookupDesc}
                            fullWidth
                            inputProps={{tabIndex:"-1"}}
                            focused
                           
                          />
                        </FormControl>
                      </FormControl>

                      <TextField
                        id="outlined-basic"
                        label="ID"
                        variant="filled"
                        value={selectICLookupData.IClookupRecordid}
                        focused
                        sx={{ display: "none" }}
                      />

                      <FormControl
                        sx={{ gridColumn: "span 2", display: "flex" }}
                      >
                        <FormControl
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="Color ID"
                            variant="filled"
                            value={selectICLookupData.IClookupCode}
                            focused
                            required
                            inputProps={{tabIndex:"-1"}}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                          <IconButton
                            sx={{ height: 40, width: 40 }}
                            onClick={() => handleShow("CTY")}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>
                          {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                          <TextField
                            id="outlined-basic"
                            label=""
                            variant="filled"
                            value={selectICLookupData.IClookupDesc}
                            fullWidth
                            inputProps={{tabIndex:"-1"}}
                            focused
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </FormControl>
                      </FormControl>

                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Available Stock"
                        value={values.Availablestock}
                        id="Availablestock"
                        name="Availablestock"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        // sx={{ background: "#fff6c3" }}
                        focused
                        //  error={!!touched.Id && !!errors.Id}
                        //  helperText={touched.Id && errors.Id}
                        inputProps={{ maxLength: 10,readOnly:true }}
                        
                        sx={{ background: "#fff6c3" ,gridColumn:'span 2',input:{textAlign:"right"}}}
                       
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 10);
                        }}
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Quantity to refinish"
                        value={values.QuantityRefinish}
                        id="QuantityRefinish"
                        name="QuantityRefinish"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        
                        focused
                        //  error={!!touched.Id && !!errors.Id}
                        //  helperText={touched.Id && errors.Id}
                        inputProps={{ maxLength: 10 }}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                            maxLength: 10,
                          },
                        }}
                        sx={{ background: "#fff6c3" ,gridColumn:'span 2'}}
                        onInvalid={(e) => { e.target.setCustomValidity('Please Fill The Quantity to Refinish ') }} 
                    
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 10);
                            e.target.setCustomValidity('')
                        }}
                      />
<TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Approved Qty"
                        value={values.approvedQty}
                        id="approvedQty"
                        name="approvedQty"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                            maxLength: 10,
                          },
                        }}
                        sx={{ background: "#fff6c3" ,gridColumn:'span 2'}}
                        onInvalid={(e) => { e.target.setCustomValidity('Please Fill The Approved Qty') }} 
                    
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 10);
                            e.target.setCustomValidity('')
                        }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Swatch for reference"
                        value={values.Swatchref}
                        id="Swatchref"
                        name="Swatchref"
                        onBlur={handleBlur}
                        onChange={handleChange}
                       
                        focused
                        // error={!!touched.Id && !!errors.Id}
                        // helperText={touched.Id && errors.Id}
                        inputProps={{ maxLength: 10 }}
                        onInvalid={(e) => { e.target.setCustomValidity('Please Fill The Swatch for Reference') }} 
                    onInput ={(e) => { e.target.setCustomValidity('') }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Customer Order"
                        value={values.CustomerOrderNo}
                        id="CustomerOrderNo"
                        name="CustomerOrderNo"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        // error={!!touched.Id && !!errors.Id}
                        // helperText={touched.Id && errors.Id}
                        inputProps={{ maxLength: 10 }}
                        InputProps={{
                          readOnly: true,
                          style: { textAlign: "right" },
                        }}
                        sx={{ background: "#fff6c3" ,gridColumn:'span 2'}}
                       
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 11);
                        }}
                      />
                      <TextField
                        id="outlined-basic"
                        label="ID"
                        variant="filled"
                        focused
                        sx={{ display: "none" }}
                      />

                      
                        <FormControl
                        sx={{ gridColumn: "span 2", display: "flex" }}
                      >
                        <FormControl
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="ID"
                            variant="filled"
                             value={selectIOPLookupData.IOPlookupRecordid}
                            focused
                            sx={{ display: "none" }}
                          />
                          <TextField
                            id="outlined-basic"
                            label="Prepared By"
                            variant="filled"
                             value={selectIOPLookupData.IOPlookupCode}
                            focused
                           
                            inputProps={{tabIndex:"-1"}}
                          />
                          <IconButton
                                    sx={{ height: 40, width: 40 }}
                                    onClick={() => handleShow("IOP")}
                                  >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>
                          {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                          <TextField
                            id="outlined-basic"
                            label=""
                            variant="filled"
                             value={selectIOPLookupData.IOPlookupDesc}
                            fullWidth
                            inputProps={{tabIndex:"-1"}}
                            focused
                           
                          />
                        </FormControl>
                      </FormControl>
  <FormControl
                        sx={{ gridColumn: "span 2", display: "flex" }}
                      >
                        <FormControl
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="ID"
                            variant="filled"
                           value={selectIORLookupData.IORlookupRecordid}
                            focused
                            sx={{ display: "none" }}
                          />
                          <TextField
                            id="outlined-basic"
                            label="Received By"
                            variant="filled"
                             value={selectIORLookupData.IORlookupCode}
                            focused
                           
                            inputProps={{tabIndex:"-1"}}
                          />
                          <IconButton
                            sx={{ height: 40, width: 40 }}
                            onClick={() => handleShow("IOR")}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>
                          {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                          <TextField
                            id="outlined-basic"
                            label=""
                            variant="filled"
                            value={selectIORLookupData.IORlookupDesc}
                            fullWidth
                            inputProps={{tabIndex:"-1"}}
                            focused
                           
                          />
                        </FormControl>
                      </FormControl>
                      </FormControl>
                      <FormControl
                      fullWidth
                      sx={{ gridColumn: "span 2", gap: "40px" }}
                    >
                      <FormControl
                        sx={{ gridColumn: "span 2", display: "flex" }}
                      >
                        <FormControl
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="ID"
                            variant="filled"
                             value={selectIOALookupData.IOAlookupRecordid}
                            focused
                            sx={{ display: "none" }}
                          />
                          <TextField
                            id="outlined-basic"
                            label="Approval"
                            variant="filled"
                             value={selectIOALookupData.IOAlookupCode}
                            focused
                           
                            inputProps={{tabIndex:"-1"}}
                          />
                          <IconButton
                            sx={{ height: 40, width: 40 }}
                            onClick={() => handleShow("IOA")}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>
                          {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                          <TextField
                            id="outlined-basic"
                            label=""
                            variant="filled"
                             value={selectIOALookupData.IOAlookupDesc}
                            fullWidth
                            inputProps={{tabIndex:"-1"}}
                            focused
                            
                          />
                        </FormControl>
                      </FormControl>

                   
                     
                   
                   
                      <TextField
                        fullWidth
                        variant="filled"
                        type="Date"
                        label="Date"
                        value={values.IndentDate}
                        id="IndentDate"
                        name="IndentDate"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputFormat="YYYY-MM-DD"
                        required
                        focused
                       
                        // error={!!touched.Id && !!errors.Id}
                        // helperText={touched.Id && errors.Id}
                        inputProps={{ maxLength: 10 }}
                      />
                      <TextField
                        id="outlined-basic"
                        label="ID"
                        variant="filled"
                        value={selectILLookupData.ILlookupRecordid}
                        focused
                        sx={{ display: "none" }}
                      />

                      <FormControl
                        sx={{ gridColumn: "span 2", display: "flex" }}
                      >
                        <FormControl
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="Leather"
                            variant="filled"
                            value={selectILLookupData.ILlookupCode}
                            focused
                            required
                            inputProps={{tabIndex:"-1"}}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                          <IconButton
                            sx={{ height: 40, width: 40 }}
                            onClick={() => handleShow("CTY")}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>
                          {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                          <TextField
                            id="outlined-basic"
                            label=""
                            variant="filled"
                            value={selectILLookupData.ILlookupDesc}
                            fullWidth
                            inputProps={{tabIndex:"-1"}}
                            focused
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </FormControl>
                      </FormControl>

                      {/* <FormControl
                        sx={{ gridColumn: "span 2", display: "flex" }}
                      >
                        <FormControl
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="ID"
                            variant="filled"
                            value={selectISLookupData.ISlookupRecordid}
                            focused
                            sx={{ display: "none" }}
                          />
                          <TextField
                            id="outlined-basic"
                            label="Substance"
                            variant="filled"
                            value={selectISLookupData.ISlookupCode}
                            focused
                            required
                            inputProps={{tabIndex:"-1"}}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                          <IconButton
                            sx={{ height: 40, width: 40 }}
                            onClick={() => handleShow("CTY")}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>
                          {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                          {/* <TextField
                            id="outlined-basic"
                            label=""
                            variant="filled"
                            value={selectISLookupData.ISlookupDesc}
                            fullWidth
                            inputProps={{tabIndex:"-1"}}
                            focused
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </FormControl>
                      </FormControl> */} 

                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Required Qty"
                        value={values.Quantity}
                        id="Quantity"
                        name="Quantity"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        // sx={{ background: "#fff6c3" }}
                        focused
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right"  },
                            readOnly:true
                          },
                        }}
                        //  error={!!touched.Id && !!errors.Id}
                        //  helperText={touched.Id && errors.Id}
                        sx={{ background: "#fff6c3" ,gridColumn:'span 2'}}
                       
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 10);
                        }}
                      
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Quantity to Produce"
                        value={values.QuantitytoProduce}
                        id="QuantitytoProduce"
                        name="QuantitytoProduce"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        // error={!!touched.Id && !!errors.Id}
                        // helperText={touched.Id && errors.Id}
                        inputProps={{ maxLength: 10 }}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                            maxLength: 10,
                          },
                        }}
                        sx={{ background: "#fff6c3" ,gridColumn:'span 2'}}
                       
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 10);
                        }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label="Leather Despatch Date"
                        value={values.LeatherDespatchdate}
                        id="LeatherDespatchdate"
                        name="LeatherDespatchdate"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        focused
                        sx={{ background: "#ffe5f1" }}
                        //  error={!!touched.Id && !!errors.Id}
                        //  helperText={touched.Id && errors.Id}
                        inputProps={{ maxLength: 10 }}
                        onInvalid={(e) => { e.target.setCustomValidity('Please Fill The Leather Despatch Date') }} 
                    onInput ={(e) => { e.target.setCustomValidity('') }}
                      />

                      <TextField
                        id="outlined-basic"
                        label="ID"
                        variant="filled"
                        value={selectICULookupData.ICUlookupRecordid}
                        focused
                        sx={{ display: "none" }}
                      />

                      <FormControl
                        sx={{ gridColumn: "span 2", display: "flex" }}
                      >
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
                            value={selectICULookupData.ICUlookupCode}
                            focused
                            required
                            inputProps={{tabIndex:"-1"}}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                          <IconButton
                            sx={{ height: 40, width: 40 }}
                            onClick={() => handleShow("CTY")}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>
                          {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                          <TextField
                            id="outlined-basic"
                            label=""
                            variant="filled"
                            value={selectICULookupData.ICULlookupDesc}
                            fullWidth
                            inputProps={{tabIndex:"-1"}}
                            focused
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </FormControl>
                      </FormControl>

                      {/* <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label="Order Despatch Date"
                        value={values.OrderDespatchdate}
                        id="OrderDespatchdate"
                        name="OrderDespatchdate"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={{ background: "#ffe5f1" }}
                        focused
                        // error={!!touched.Id && !!errors.Id}
                        // helperText={touched.Id && errors.Id}
                        inputProps={{ maxLength: 10 }}
                      /> */}
  <FormControl
                        sx={{ gridColumn: "span 2", display: "flex" }}
                      >
                        <FormControl
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="ID"
                            variant="filled"
                             value={selectIOCLookupData.IOClookupRecordid}
                            focused
                            sx={{ display: "none" }}
                          />
                          <TextField
                            id="outlined-basic"
                            label="Checked By"
                            variant="filled"
                             value={selectIOCLookupData.IOClookupCode}
                            focused
                           
                            inputProps={{tabIndex:"-1"}}
                          />
                          <IconButton
                            sx={{ height: 40, width: 40 }}
                            onClick={() => handleShow("IOC")}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>
                          {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                          <TextField
                            id="outlined-basic"
                            label=""
                            variant="filled"
                             value={selectIOCLookupData.IOClookupDesc}
                            fullWidth
                            inputProps={{tabIndex:"-1"}}
                            focused
                           
                          />
                        </FormControl>
                      </FormControl>
                   

                      
                      {/*  */}
                    </FormControl>
                  </Box>
                  {/* <Divider fullWidth sx={{mt:3}}/>

                  <Box display='flex' justifyContent='center'> <Typography variant='h5' mt={3}>Preparations at Tannery</Typography></Box>

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

                    <FormControl sx={{gridColumn:'span 4', gap:'40px',mt:'10px'}}> 
   <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Lot No"
                        value={values.Lotno}
                        id="Lotno"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Lotno"
                        error={!!touched.Lotno && !!errors.Lotno}
                        helperText={touched.Lotno && errors.Lotno}
                        
                        focused
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                            maxLength: 10,
                          },
                        }}
                        sx={{ background: "#fff6c3" ,gridColumn:'span 2'}}
                       
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 10);
                        }}
                      />
                       <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Wet blue grade"
                        value={values.Wetbluegrade}
                        id="Wetbluegrade"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Wetbluegrade"
                        // error={!!touched.Fax && !!errors.Fax}
                        // helperText={touched.Fax && errors.Fax}
                        
                        focused
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                            maxLength: 10,
                          },
                        }}
                        sx={{ background: "#fff6c3" ,gridColumn:'span 2'}}
                       
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 10);
                        }}
                      /> 
                    </FormControl>
                    <FormControl sx={{gridColumn:'span 2', gap:'40px'}}>
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Process 1 code"
                        value={values.Processcode1}
                        id="Processcode1"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Processcode1"
                        // error={!!touched.Fax && !!errors.Fax}
                        // helperText={touched.Fax && errors.Fax}
                        sx={{ gridColumn: "span 2" }}
                        focused
                      />
                        <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Process 2 code"
                        value={values.Processcode2}
                        id="Processcode2"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Processcode2"
                        inputFormat="YYYY-MM-DD"
                        // error={!!touched.Fax && !!errors.Fax}
                        // helperText={touched.Fax && errors.Fax}
                        sx={{ gridColumn: "span 2" }}
                        focused
                      />
                    </FormControl>

                    <FormControl sx={{gridColumn:'span 1', gap:'40px'}}>
                    <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label=" Start Date"
                        value={values.Processstartadate1}
                        id="Processstartadate1"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Processstartadate1"
                        inputFormat="YYYY-MM-DD"
                        // error={!!touched.Fax && !!errors.Fax}
                        // helperText={touched.Fax && errors.Fax}
                        sx={{ gridColumn: "span 2", background: "#ffe5f1" }}
                        focused
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label=" Start Date"
                        value={values.Processstartadate2}
                        id="Processstartadate2"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Processstartadate2"
                        inputFormat="YYYY-MM-DD"
                        // error={!!touched.Fax && !!errors.Fax}
                        // helperText={touched.Fax && errors.Fax}
                        sx={{ gridColumn: "span 2", background: "#ffe5f1" }}
                        focused
                      />
                    </FormControl>
                    <FormControl sx={{gridColumn:'span 1', gap:'40px'}}>
                    <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label=" Finish Date"
                        value={values.Processfinishdate1}
                        id="Processfinishdate1"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Processfinishdate1"
                        inputFormat="YYYY-MM-DD"
                        // error={!!touched.Fax && !!errors.Fax}
                        // helperText={touched.Fax && errors.Fax}
                        sx={{ gridColumn: "span 2", background: "#ffe5f1" }}
                        focused
                      />
                       <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label=" Finish Date"
                        value={values.Processfinishdate2}
                        id="Processfinishdate2"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Processfinishdate2"
                        inputFormat="YYYY-MM-DD"
                        // error={!!touched.Fax && !!errors.Fax}
                        // helperText={touched.Fax && errors.Fax}
                        sx={{ gridColumn: "span 2", background: "#ffe5f1" }}
                        focused
                      />
                    </FormControl>
                    
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Remarks"
                        value={values.Remarks}
                        id="Remarks"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Remarks"
                        multiline
                        // error={!!touched.Fax && !!errors.Fax}
                        // helperText={touched.Fax && errors.Fax}
                        sx={{ gridColumn: "span 4" }}
                        focused
                       
                      />
                  </Box>

                  <Divider fullWidth sx={{mt:3}}/> */}

                  {/* <Box display='flex' justifyContent='center'> <Typography variant='h5' mt={3}>Dispatch Details</Typography></Box>

                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(4 , minMax(0,1fr))"
                    gap="30px"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                        mt:3
                      },
                    }}
                  >
                  <FormControl sx={{gridColumn:'span 3' ,gap:'40px'}}>
                  <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="D/C. No 1"
                        value={values.Dcno1}
                        id="Dcno1"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Dcno1"
                        // error={!!touched.Fax && !!errors.Fax}
                        // helperText={touched.Fax && errors.Fax}
                        sx={{ gridColumn: "span 2" }}
                        focused
                      />
                       <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="D/C. No 2"
                        value={values.Dcno2}
                        id="Dcno2"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Dcno2"
                        // error={!!touched.Fax && !!errors.Fax}
                        // helperText={touched.Fax && errors.Fax}
                        sx={{ gridColumn: "span 2" }}
                        focused
                      />
                       <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="D/C. No 3"
                        value={values.Dcno3}
                        id="Dcno3"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Dcno3"
                        // error={!!touched.Fax && !!errors.Fax}
                        // helperText={touched.Fax && errors.Fax}
                        sx={{ gridColumn: "span 2" }}
                        focused
                      />
                  </FormControl>
                  <FormControl sx={{gridColumn:'span 1' ,gap:'40px'}}>
                  <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label="D/C. Date 1"
                        value={values.Dcnodate1}
                        id="Dcnodate1"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Dcnodate1"
                        inputFormat="YYYY-MM-DD"
                        // error={!!touched.Fax && !!errors.Fax}
                        // helperText={touched.Fax && errors.Fax}
                        sx={{ gridColumn: "span 2", background: "#ffe5f1" }}
                        focused
                      />
                     
                     
                      <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label="D/C. Date 2"
                        value={values.Dcnodate2}
                        id="Dcnodate2"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Dcnodate2"
                        inputFormat="YYYY-MM-DD"
                        // error={!!touched.Fax && !!errors.Fax}
                        // helperText={touched.Fax && errors.Fax}
                        sx={{ gridColumn: "span 2", background: "#ffe5f1" }}
                        focused
                      />
                       <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label="D/C. Date 3"
                        value={values.Dcnodate3}
                        id="Dcnodate3"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Dcnodate3"
                        inputFormat="YYYY-MM-DD"
                        // error={!!touched.Fax && !!errors.Fax}
                        // helperText={touched.Fax && errors.Fax}
                        sx={{ gridColumn: "span 2", background: "#ffe5f1" }}
                        focused
                      />
                  </FormControl> */}
                   
                    
                  {/* <TextField
                        name="SortOrder"
                        type="number"
                        id="SortOrder"
                        label="Sort Order"
                        variant="filled"
                        value={values.SortOrder}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        sx={{ background: "#fff6c3" ,gridColumn:'span 2'}}
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
                        // error={!!touched.sortorder && !!errors.sortorder}
                        // helperText={touched.sortorder && errors.sortorder}
                     
                     /> */}
                    {/* <FormControl sx={{ gridColumn: "span 2", mt: "20px" }}>
                        
                        
                    <Field
                      type="checkbox"
                      name="checkbox"
                      id="checkbox"
                      as={FormControlLabel}
                      control={<Checkbox checked={values.checkbox} />}
                      label="Disable"
                    />
                      </FormControl> */}
                    
                  {/* </Box> */}


                  <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                  {Data.Process != "Y" ?(
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={fnProcess}
                      
                    >
                      Process
                    </Button>
                ):null}
                  {
  YearFlag == 'true' ? (
                    <LoadingButton
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        fnSave(values);
                      }}
                      loading={loading}
                    >
                      SAVE
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
                      variant="contained"
                      color="error"
                      onClick={() => {
                        navigate(
                          `/Apps/Secondarylistview/TR056/Indent Order/${parenid}/${params.prdCardNo}`
                        );
                      }}
                    >          
                      CANCEL
                    </Button>
                    {Data.Process == "Y" ?( 
                    <a href={`${store.getState().globalurl.pdfurl}indent.php?Token=${hashtokendata.Hashtoken}`} target="_blank" 
                    rel="noreferrer">
                    <Button  variant="contained" color="primary" >
                    <PrintOutlinedIcon/>
                    </Button>
                    </a>
                       ):null}
                       {Data.Process == "Y" ?( 
                    <Button variant="contained" color="primary" size="small" onClick={()=> {dispatch(mailOpen({row:{RecordID:recID},link:`${store.getState().globalurl.pdfurl}indent.php?Token=${hashtokendata.Hashtoken}`})); dispatch(getMail({"Templateid":"ET_008","RecordID":recID,"UserName":"Trinity"}))} } >
                  <EmailIcon/>
                </Button>
                 ):null}
              </Box>
              <MatxCustomizer open={open}screenName={invoice} rowData={mailData} type={''} />
                  <Popup
                              title="Supplier"
                              openPopup={openSUPPopup}
                              setOpenPopup={setOpenSUPPopup}
                            >
                              <Listviewpopup
                                accessID="2028"
                                screenName="Supplier"
                                childToParent={childToParent}
                                filterName="parentID"
                                filterValue={Data.MaterialRecordID}
                              />
                            </Popup>
                            <Popup
                              title="Indentorder Prepared"
                              openPopup={openIOPPopup}
                              setOpenPopup={setOpenIOPPopup}
                            >
                              <Listviewpopup
                                accessID="2024"
                                screenName="Indentorder Prepared"
                                childToParent={childToParent}
                              />
                            </Popup>
                            <Popup
                              title="Indentorder Received"
                              openPopup={openIORPopup}
                              setOpenPopup={setOpenIORPopup}
                            >
                              <Listviewpopup
                                accessID="2024"
                                screenName="Indentorder Received"
                                childToParent={childToParent}
                              />
                            </Popup>
                            <Popup
                              title="Indentorder Checked"
                              openPopup={openIOCPopup}
                              setOpenPopup={setOpenIOCPopup}
                            >
                              <Listviewpopup
                                accessID="2024"
                                screenName="Indentorder Checked"
                                childToParent={childToParent}
                              />
                            </Popup>
                            <Popup
                              title="Indentorder Approval"
                              openPopup={openIOAPopup}
                              setOpenPopup={setOpenIOAPopup}
                            >
                              <Listviewpopup
                                accessID="2024"
                                screenName="Indentorder Approval"
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
              enableReinitialize={ini}
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
                    {/* <FormControl sx={{ gridColumn: "span 4", gap: "40px" }}>
                      

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
                            componentsProps={{
                              toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    </FormControl> */}
                    {/* <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <Formik
                        // initialValues={}
                        enableReinitialize={true}
                        validationSchema={basicSchema}
                       
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
                           

                            <Box
                              display="flex"
                              justifyContent="end"
                              mt="30px"
                              gap={2}
                            >
                              <Button
                                color="secondary"
                                variant="contained"
                              
                              >
                                Save
                              </Button>
                              <Button
                                type="reset"
                                color="error"
                                variant="contained"
                              
                              >
                                Cancel
                              </Button>
                            </Box>
                          
                          </form>
                        )}
                      </Formik>
                    </FormControl> */}
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
export default Editindentorder;
