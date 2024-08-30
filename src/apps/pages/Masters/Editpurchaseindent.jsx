import React from "react";
import {
  TextField,
  Box,
  Typography,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  Tooltip,
  Breadcrumbs,
} from "@mui/material"; 
import MatxCustomizer from "../Mailpdf";
import { mailOpen,getMail } from "../../../store/reducers/Listviewapireducer";
import EmailIcon from '@mui/icons-material/Email';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Formik } from "formik";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFetchData, postData,StockProcessApi,hashtoken} from "../../../store/reducers/Formapireducer";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../Theme";
import Popup from "../popup";
import Listviewpopup from "../Lookup";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import store from "../../../index";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
const Editpurchaseindent = () => {
  // *************** PAGE VARIABLES *************** //
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const yearData = sessionStorage.getItem("year");
  const yearFlag = sessionStorage.getItem("YearFlag");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const Year = sessionStorage.getItem("year");
  var invoice;
  const mailData = useSelector((state) => state.listviewApi.mailData);
//  console.log(mailData);
  const open = useSelector((state) => state.listviewApi.mailOpen);
  const hashtokendata = useSelector((state) => state.formApi.hashtokenData);
  console.log("🚀 ~ file: Secondarylistview.jsx:73 ~ ListviewSecondary ~ hashtokendata:", hashtokendata)
  // *************** PAGE PARAMS *************** //
  const recID = params.id;
  const mode = params.Mode;
  const accessID = params.accessID;
  const parentid = params.parentid;
  const prdCardNo = params.prdCardNo;
  const supplierID = params.supplierID;
  // *************** CALL REDUX ACTION TO GET DATA *************** //
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
    dispatch(hashtoken({hashtoken:{"Indentdata":`compID=${CompanyID}&RecID=${recID}&Type=${params.Type == "L" ? "L":"M"}`}}));
  }, [location.key]);
  console.log("Test",`compID=${CompanyID}&RecID=${recID}`);
  //console.log(recID);
  console.log("🚀 ~ file: Secondarylistview.jsx:73 ~ ListviewSecondary ~ params:", params)
  // *************** REDUX STATES *************** //
  const data = useSelector((state) => state.formApi.Data);
  const isLoading = useSelector((state) => state.formApi.postLoading);
console.log(data);
  // *************** HEADER PAGE LOOKUP  *************** //
  const [isPopupData, setisPopupdata] = useState(false);

  // MATERIAL
  const [materialLookup, setMaterialLookup] = useState({
    matRecordID: "",
    matCode: "",
    matName: "",
  });

  // SUPPLIER
  const [supplierLookup, setSupplierLookup] = useState({
    supRecordID: "",
    supCode: "",
    supName: "",
  });

  // EMPLOYEE QUALITY CHECKED
  const [empCheLookup, setEmpCheLookup] = useState({
    empCheRecordID: "",
    empCheCode: "",
    empCheName: "",
  });

  // EMPLOYEE APPROVED FOR PAYMENT
  const [empPayLookup, setEmpPayLookup] = useState({
    empPayRecordID: "",
    empPayCode: "",
    empPayName: "",
  });

  // EMPLOYEE QUALITY APPROVED
  const [empAppLookup, setEmpAppLookup] = useState({
    empAppRecordID: "",
    empAppCode: "",
    empAppName: "",
  });
  // EMPLOYEE QUALITY APPROVED BY
  const [QtyApprovedLookup, setQtyApprovedLookup] = useState({
    QtyApprovedRecordID: "",
    QtyApprovedCode: "",
    QtyApprovedName: "",
  });

  // EMPLOYEE QUANTITY APPROVED
  const [empQtyAppLookup, setEmpQtyAppLookup] = useState({
    empQtyAppRecordID: "",
    empQtyAppCode: "",
    empQtyAppName: "",
  });

  // ORDER REFERENCE
  const [ordRefLookup, setOrdRefLookup] = useState({
    ordRefRecordID: "",
    ordRefCode: "",
    ordRefCusRecID: "",
  });


    // COLOR
    const [colorLookup, setColorLookup] = useState({
      colorRecordID: "",
      colorCode: "",
      colorName: "",
    });
// Prepared By 
const [PreparedbyLookup, setPreparedbyLookup] = useState({
  PreparedbyRecordID: "",
  PreparedbyCode: "",
  PreparedbyName: "",
});

  const [openMatPopup, setOpenMatPopup] = useState(false);
  const [openSupPopup, setOpenSupPopup] = useState(false);
  const [openEmpChePopup, setOpenEmpChePopup] = useState(false);
  const [openEmpPayPopup, setOpenEmpPayPopup] = useState(false);
  const [openEmpAppPopup, setOpenEmpAppPopup] = useState(false);
  const [openEmpQtyAppPopup, setOpenEmpQtyAppPopup] = useState(false);
  const [openOrdRefPopup, setOpenOrdRefPopup] = useState(false);
  const [openColorPopup, setOpenColorPopup] = useState(false);
  const [OpenApprovedPopup, setOpenApprovedPopup] = useState(false);
  const [OpenPreparedPopup, setOpenPreparedPopup] = useState(false);
  function openPopup(type) {
    if (type == "MAT") {
      setOpenMatPopup(true);
    }
    if (type == "SUP") {
      setOpenSupPopup(true);
    }
    if (type == "EMPCHE") {
      setOpenEmpChePopup(true);
    }
    if (type == "EMPPAY") {
      setOpenEmpPayPopup(true);
    }
    if (type == "EMPAPP") {
      setOpenEmpAppPopup(true);
    }
    if (type == "EMPQTYAPP") {
      setOpenEmpQtyAppPopup(true);
    }
    if (type == "ORDREF") {
      setOpenOrdRefPopup(true);
    }
    if (type == "CLR") {
      setOpenColorPopup(true);
    }
    if (type == "APPVED") {
      setOpenApprovedPopup(true);
    }
    if (type == "PREPARE") {
      setOpenPreparedPopup(true);
    }
  }

  const childToParent = async (childdata, type) => {
    console.log(JSON.stringify(childdata));
    console.log(type);
    if (type == "Supplier") {
      setisPopupdata(true);
      setSupplierLookup({
        supRecordID: childdata.RecordID,
        supCode: childdata.Code,
        supName: childdata.Name,
      });
      setOpenSupPopup(false);
    }
    if (type == "Material") {
      setisPopupdata(true);
      setMaterialLookup({
        matRecordID: childdata.RecordID,
        matCode: childdata.Code,
        matName: childdata.Name,
      });
      setOpenMatPopup(false);
    }

    if (type == "Employee Qty / Quality Checked By") {
      setisPopupdata(true);
      setEmpCheLookup({
        empCheRecordID: childdata.RecordID,
        empCheCode: childdata.Code,
        empCheName: childdata.Name,
      });
      setOpenEmpChePopup(false);
    }
    if (type == "Employee Approved For Payment") {
      setisPopupdata(true);
      setEmpPayLookup({
        empPayRecordID: childdata.RecordID,
        empPayCode: childdata.Code,
        empPayName: childdata.Name,
      });
      setOpenEmpPayPopup(false);
    }
    if (type == "Employee Qty / Quality Approved By") {
      setisPopupdata(true);
      setEmpAppLookup({
        empAppRecordID: childdata.RecordID,
        empAppCode: childdata.Code,
        empAppName: childdata.Name,
      });
      setOpenEmpAppPopup(false);
    }
    if (type == "Employee Approved By") {
      setisPopupdata(true);
      setEmpQtyAppLookup({
        empQtyAppRecordID:childdata.RecordID,
        empQtyAppCode:childdata.Code,
        empQtyAppName: childdata.Name,
      });
      setOpenEmpQtyAppPopup(false);
    }
    if (type == "Order Reference") {
      setisPopupdata(true);
      setOrdRefLookup({
        ordRefRecordID:childdata.RecordID,
        ordRefCode: childdata.Code,
        ordRefCusRecID: childdata.CustomerRecordID,
      });
      setOpenOrdRefPopup(false);
    }
    if (type == "Colors") {
      setisPopupdata(true);
      setColorLookup({
        colorRecordID:childdata.RecordID,
        colorCode:childdata.Code,
        colorName: childdata.Name,
      });
      setOpenColorPopup(false);
    }
    if (type == "Qty / Approved By") {
      setisPopupdata(true);
      setQtyApprovedLookup({
        QtyApprovedRecordID:childdata.RecordID,
        QtyApprovedCode:childdata.Code,
        QtyApprovedName: childdata.Name,
      });
      setOpenApprovedPopup(false);
    }
    if (type == "Prepared By") {
      setisPopupdata(true);
      setPreparedbyLookup({
        PreparedbyRecordID:childdata.RecordID,
        PreparedbyCode:childdata.Code,
        PreparedbyName: childdata.Name,
      });
      setOpenPreparedPopup(false);
    }
  };

  if(!isPopupData){
  // MATERIAL
  materialLookup.matRecordID = data.MaterialID;
  materialLookup.matCode = data.MaterialCode;
  materialLookup.matName = data.MaterialDescription;

  // SUPPLIER
  supplierLookup.supRecordID = data.SupplierRecID;
  supplierLookup.supCode = data.SupplierCode;
  supplierLookup.supName = data.SupplierDescription;

  // EMPLOYEE QUALITY CHECKED
  empCheLookup.empCheRecordID = data.CheckedEMPID;
  empCheLookup.empCheCode = data.CheckedEMPCode;
  empCheLookup.empCheName = data.CheckedEMPDescription;
  
  // EMPLOYEE APPROVED FOR PAYMENT
  empPayLookup.empPayRecordID = data.ApprovalPaymentEMPID;
  empPayLookup.empPayCode = data.ApprovalPaymentEMPCode;
  empPayLookup.empPayName = data.ApprovalPaymentEMPDescription;
  
  // EMPLOYEE QUALITY APPROVED
  empAppLookup.empAppRecordID = data.ApprovalEMPID;
  empAppLookup.empAppCode = data.ApprovalEMPCode;
  empAppLookup.empAppName = data.ApprovalEMPDescription;

  // EMPLOYEE QUANTITY APPROVED
  empQtyAppLookup.empQtyAppRecordID = data.ApprovalEMPID;
  empQtyAppLookup.empQtyAppCode = data.ApprovalEMPCode;
  empQtyAppLookup.empQtyAppName = data.ApprovalEMPDescription;

  // ORDER REFERENCE
  ordRefLookup.ordRefRecordID = data.CustomerRecordID;
  ordRefLookup.ordRefCode = data.CustomerCode;
  ordRefLookup.ordRefCusRecID = data.CustomerDescription;

    // Colors
    colorLookup.colorRecordID = data.ColourID;
    colorLookup.colorCode = data.ColourCode;
    colorLookup.colorName = data.ColourDescription;

      // QTY Quality Approved
      QtyApprovedLookup.QtyApprovedRecordID = data.ReceivedByEMPID;
      QtyApprovedLookup.QtyApprovedCode = data.ReceivedByEMPCode;
      QtyApprovedLookup.QtyApprovedName = data.ReceivedByEMPDescription;
  //  Prepared by
  PreparedbyLookup.PreparedbyRecordID = data.PreparedByEMPID;
  PreparedbyLookup.PreparedbyCode = data.PreparedByEMPCode;
  PreparedbyLookup.PreparedbyName = data.PreparedByEMPDescription;
      
  }
  // ***************  SCREEN INITIALVALUE *************** //
  const initialValue = {
    indentNo: data.IndentNo,
    purchaseDate: data.IndentDate,
    purchasePrice: data.Purchaseprice,
    availableStock: data.Availablestock,
    requiredQty: data.Quantity,
    orderReference: data.Invoiceno,
    approvedQty: data.ApprovedQty,
    dateReceipt: data.DateofReceipt,
    qualityRemark: data.QualityRemarks,
    dcNo: data.Dcno,
    invoiceNo: data.Invoiceno,
    invoiceValue: data.InvoiceValue,
    Chqreqdate: data.Chqreqdate,
    ApprovedPayment: data.ApprovedPayment
  };

   // *************** HEADER SCREEN SAVE FUNCTION *************** //

   const indentOroderFn = async(values) => {
    let action ="update";
    // RecordID, Indentno,IndentDate,SupplierRecID,QuantityRefinish =0,LeatherDespatchdate=0,Swatchref=0,
    //  OrderDespatchdate=0, Lotno=0, Wetbluegrade=0, Processcode1=0, Processcode2=0, Dcno1 =0, Dcno2=0,
    //   Dcno3=0, Processstartadate1=0,Processfinishdate1=0, Processstartadate2=0,Processfinishdate2=0,
    //    Dcnodate1=0, Dcnodate2=0, Dcnodate2=0, SortOrder=0, Disable=0,Remarks=0, QuantitytoProduce=0,
    //     PreparedByEMPID=0,  ApprovalEMPID,CheckedEMPID, ReceivedByEMPID=0, Purchaseprice,
    //      Reasonforpurchase=0, ApprovedQty,Chqreqdate, DateofReceipt, Dcno, Invoiceno, InvoiceValue, 
    //      ApprovedPayment, QualityRemarks

    const idata = {
       RecordID: data.RecordID,
      Indentno: values.indentNo,
      IndentDate: values.purchaseDate,
      QuantityRefinish:0,
      LeatherDespatchdate: 0,
      Swatchref: 0,
      OrderDespatchdate: 0,
      Lotno: 0,
      Wetbluegrade: 0,
      Processcode1: 0,
      Processcode2: 0,
      Dcno1: 0,
      Dcno2: 0,
      Dcno3: 0,
      Processstartadate1: 0,
      Processfinishdate1: 0,
      Processstartadate2: 0,
      Processfinishdate2: 0,
      Dcnodate1: 0,
      Dcnodate2:0,
      Dcnodate2: 0,
      Disable: 0,
      SortOrder: 0,
      QuantitytoProduce: 0,
      // PreparedByEMPID: 0,
      ApprovalEMPID:empQtyAppLookup.empQtyAppRecordID,
      CheckedEMPID: empCheLookup.empCheRecordID,
      // ReceivedByEMPID:0,
      Purchaseprice:values.purchasePrice,
      Reasonforpurchase:0,
      ApprovedQty:values.approvedQty,
      Chqreqdate:0,
      DateofReceipt: values.dateReceipt,
      Dcno:values.dcNo,
      Invoiceno:values.invoiceNo,
      InvoiceValue:values.invoiceValue,
      // ApprovedPayment:empPayLookup.empPayRecordID,
      QualityRemarks:values.qualityRemark,
      SupplierRecID:supplierLookup.supRecordID,
      Remarks:0,
      Finyear:Year,
      CompanyID:CompanyID,
      ReceivedByEMPID:QtyApprovedLookup.QtyApprovedRecordID,
      PreparedByEMPID:PreparedbyLookup.PreparedbyRecordID,
      Chqreqdate:values.Chqreqdate,
      ApprovedPayment:values.ApprovedPayment,
     
    };

    const response = await dispatch(postData({ accessID, action,idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate(
       
        `/Apps/Secondarylistview/TR119/List of Supplier/${supplierID}/${parentid}`
      );
    } else{
       toast.error(response.payload.Msg)
    };
  };
  const fnProcess = async() => {

    const props = {accessID,recID}
    const Data = await dispatch(StockProcessApi(props))
     console.log("🚀 ~ file: Editpurchaseindent.jsx:320 ~ fnProcess ~ Data:", Data)
    if (Data.payload.Status == "Y") {
      toast.success(Data.payload.Msg);
      navigate( `/Apps/Secondarylistview/TR119/List of Supplier/${supplierID}/${parentid}`)
    }else{
      toast.success(Data.payload.Msg);

    }}
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
           
            `/Apps/Secondarylistview/TR119/List of Supplier/${supplierID}/${parentid}`
          );
        }
      } else {
        return;
      }
    });
  };
  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box display="flex" borderRadius="3px" alignItems="center">
          
          <Breadcrumbs maxItems={3} aria-label="breadcrumb" separator={<NavigateNextIcon sx={{color:'#0000D1'}}/>}>
<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  onClick={() => { navigate(`/Apps/TR047/Production%20Card`); }}>{`Production card(${params.prdCardNo})`}</Typography>
<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  onClick={() => { navigate(``); }}> {params.remarkDec === "L" ? "Leather" : "Material"}</Typography>
<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  onClick={() => { navigate(`/Apps/Secondarylistview/TR056/Indent Order/${parentid}`)}}>Indent Items</Typography>
<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  onClick={() => { navigate(`/Apps/Secondarylistview/TR119/List of Supplier/${supplierID}/${parentid}`)}}>List of supplier</Typography>
<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}>Purchase Indent</Typography>
  
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

      <Box m="20px">
        <Formik
          initialValues={initialValue}
          enableReinitialize={true}
          onSubmit={(values, { resetForm }) => {
            setTimeout(() => {
              indentOroderFn(values, resetForm);
            }, 100);
          }}
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
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  name="indentNo"
                  type="text"
                  id="indentNo"
                  value={values.indentNo}
                  label="Indent No"
                  variant="filled"
                  sx={{ gridColumn: "span 2" }}
                  focused
                  inputProps={{ readOnly:true }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <TextField
                  name="purchaseDate"
                  type="date"
                  id="purchaseDate"
                  label="Date"
                  variant="filled"
                  sx={{ gridColumn: "span 2" }}
                  focused
                  value={values.purchaseDate}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gridColumn: "span 2",
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    label="Article No"
                    variant="filled"
                    focused
                    inputProps={{ tabIndex: "-1" }}
                    value={materialLookup.matCode}
                  />
                  <IconButton
                    // onClick={() => openPopup("MAT")}
                    sx={{ height: 40, width: 40 }}
                  >
                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                  </IconButton>
                  <TextField
                    label="Article Name"
                    variant="filled"
                    fullWidth
                    inputProps={{ tabIndex: "-1" }}
                    value={materialLookup.matName}
                    focused
                  />
                </Box>
                <TextField
                  name="purchasePrice"
                  type="number"
                  id="purchasePrice"
                  label="Purchase Price"
                  variant="filled"
                  sx={{ gridColumn: "span 2", background: "#fff6c3" ,input:{textAlign:"right"}}}
                  focused
                  onWheel={(e) => e.target.blur()} 
                  value={values.purchasePrice}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <TextField
                  name="availableStock"
                  type="number"
                  id="availableStock"
                  label="Available Stock"
                  variant="filled"
                  sx={{ gridColumn: "span 2", background: "#fff6c3" ,input:{textAlign:"right"}}}
                  focused
                  onWheel={(e) => e.target.blur()} 
                  value={values.availableStock}
                  inputProps={{readOnly:true}}
                  onBlur={handleBlur}
                  onChange={handleChange}

                />
                <TextField
                  name="requiredQty"
                  type="number"
                  id="requiredQty"
                  label="Required Qty"
                  variant="filled"
                  sx={{ gridColumn: "span 2", background: "#fff6c3" ,input:{textAlign:"right"}}}
                  focused
                  onWheel={(e) => e.target.blur()} 
                  value={values.requiredQty}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gridColumn: "span 2",
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    label="Order Reference"
                    variant="filled"
                    focused
                    inputProps={{ tabIndex: "-1" }}
                    value={ordRefLookup.ordRefCode}
                  />
                  <IconButton
                    // onClick={() => openPopup("SUP")}
                    sx={{ height: 40, width: 40 }}
                  >
                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                  </IconButton>
                  <TextField
                    variant="filled"
                    fullWidth
                    inputProps={{ tabIndex: "-1" }}
                    value={ordRefLookup.ordRefCusRecID}
                    focused
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gridColumn: "span 2",
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    label="Supplier"
                    variant="filled"
                    focused
                    inputProps={{ tabIndex: "-1" }}
                    value={supplierLookup.supCode}
                  />
                  <IconButton
                    // onClick={() => openPopup("SUP")}
                    sx={{ height: 40, width: 40 }}
                  >
                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                  </IconButton>
                  <TextField
                    variant="filled"
                    fullWidth
                    inputProps={{ tabIndex: "-1" }}
                    value={supplierLookup.supName}
                    focused
                  />
                </Box>

                <TextField
                  name="approvedQty"
                  type="number"
                  id="approvedQty"
                  label="Approved Qty"
                  variant="filled"
                  sx={{ gridColumn: "span 2", background: "#fff6c3" ,input:{textAlign:"right"}}}
                  focused
                  onWheel={(e) => e.target.blur()} 
                  value={values.approvedQty}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gridColumn: "span 2",
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    label="Approved By"
                    variant="filled"
                    focused
                    inputProps={{ tabIndex: "-1" }}
                    value={empQtyAppLookup.empQtyAppCode}
                  />
                  <IconButton
                    onClick={() => openPopup("EMPQTYAPP")}
                    sx={{ height: 40, width: 40 }}
                  >
                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                  </IconButton>
                  <TextField
                    variant="filled"
                    fullWidth
                    inputProps={{ tabIndex: "-1" }}
                    value={empQtyAppLookup.empQtyAppName}
                    focused
                  />
                </Box>
                <TextField
                  name="dateReceipt"
                  type="date"
                  id="dateReceipt"
                  label="Date of Receipt"
                  variant="filled"
                  sx={{ gridColumn: "span 2" }}
                  focused
                  value={values.dateReceipt}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                 <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gridColumn: "span 2",
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    label="Color"
                    variant="filled"
                    focused
                    inputProps={{ tabIndex: "-1" }}
                    value={colorLookup.colorCode}
                  />
                  <IconButton
                    // onClick={() => openPopup("CLR")}
                    sx={{ height: 40, width: 40 }}
                  >
                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                  </IconButton>
                  <TextField
                    variant="filled"
                    fullWidth
                    inputProps={{ tabIndex: "-1" }}
                    value={colorLookup.colorName}
                    focused
                  />
                </Box>
                <TextField
                  name="qualityRemark"
                  type="text"
                  id="qualityRemark"
                  label="Qty / Quality Remarks"
                  variant="filled"
                  sx={{ gridColumn: "span 2" }}
                  focused
                  value={values.qualityRemark}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <TextField
                  name="dcNo"
                  type="number"
                  id="dcNo"
                  label="D.C.No."
                  variant="filled"
                  sx={{ gridColumn: "span 2", background: "#fff6c3" ,input:{textAlign:"right"}}}
                  focused
                  onWheel={(e) => e.target.blur()} 
                  value={values.dcNo}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <TextField
                  name="invoiceNo"
                  type="text"
                  id="invoiceNo"
                  label="Invoice No"
                  variant="filled"
                  sx={{ gridColumn: "span 2" }}
                  focused
                  
                  value={values.invoiceNo}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <TextField
                  name="invoiceValue"
                  type="number"
                  id="invoiceValue"
                  label="Invoice Value"
                  variant="filled"
                  sx={{ gridColumn: "span 2", background: "#fff6c3" ,input:{textAlign:"right"}}}
                  focused
                  onWheel={(e) => e.target.blur()} 
                  value={values.invoiceValue}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gridColumn: "span 2",
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    label="Qty / Quality Checked By"
                    variant="filled"
                    focused
                    inputProps={{ tabIndex: "-1" }}
                    value={empCheLookup.empCheCode}
                  />
                  <IconButton
                    onClick={() => openPopup("EMPCHE")}
                    sx={{ height: 40, width: 40 }}
                  >
                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                  </IconButton>
                  <TextField
                    variant="filled"
                    fullWidth
                    inputProps={{ tabIndex: "-1" }}
                    value={empCheLookup.empCheName}
                    focused
                  />
                </Box>
               
                  <TextField
                  name="ApprovedPayment"
                  type="text"
                  id="ApprovedPayment"
                  label="Payment"
                  variant="filled"
                  sx={{ gridColumn: "span 2" }}
                  focused
                  value={values.ApprovedPayment}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gridColumn: "span 2",
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    label="Qty / Quality Approved By"
                    variant="filled"
                    focused
                    inputProps={{ tabIndex: "-1" }}
                    value={QtyApprovedLookup.QtyApprovedCode}
                  />
                  <IconButton
                    onClick={() => openPopup("APPVED")}
                    sx={{ height: 40, width: 40 }}
                  >
                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                  </IconButton>
                  <TextField
                    variant="filled"
                    fullWidth
                    inputProps={{ tabIndex: "-1" }}
                    value={QtyApprovedLookup.QtyApprovedName}
                    focused
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gridColumn: "span 2",
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    label="Prepared By"
                    variant="filled"
                    focused
                    inputProps={{ tabIndex: "-1" }}
                    value={PreparedbyLookup.PreparedbyCode}
                  />
                  <IconButton
                    onClick={() => openPopup("PREPARE")}
                    sx={{ height: 40, width: 40 }}
                  >
                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                  </IconButton>
                  <TextField
                    variant="filled"
                    fullWidth
                    inputProps={{ tabIndex: "-1" }}
                    value={PreparedbyLookup.PreparedbyName}
                    focused
                  />
                </Box>
                <TextField
                  name="Chqreqdate"
                  type="Date"
                  id="Chqreqdate"
                  label="Cheque Req Date"
                  variant="filled"
                  sx={{ gridColumn: "span 2" }}
                  focused
                  value={values.Chqreqdate}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px" gap="20px">
              {data.Process != "Y" ?(
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={fnProcess}
                      
                    >
                      Process
                    </Button>
                ):null}
              <LoadingButton loading={isLoading} type="submit" variant="contained" color="secondary">
                  SAVE
                </LoadingButton>
                <Button onClick={()=>{navigate(
           `/Apps/Secondarylistview/TR108/Material%20IndentOrder/${parentid}/${prdCardNo}`
          );}} variant="contained" color="error">
                  CANCEL
                </Button>
                {data.Process == "Y" ?( 
                <a href={`${store.getState().globalurl.pdfurl}purchaseindent.php?Token=${hashtokendata.Hashtoken}`} target="_blank" 
                    rel="noreferrer">
                    <Button  variant="contained" color="primary" >
                    <PrintOutlinedIcon/>
                    </Button>
                    </a>
                     ):null}
                     {data.Process == "Y" ?( 
                    <Button  variant="contained" color="info" size="small" onClick={()=> {dispatch(mailOpen({row:{RecordID:recID},link:`${store.getState().globalurl.pdfurl}purchaseindent.php?Token=${hashtokendata.Hashtoken}`})); dispatch(getMail({"Templateid":"ET_007","RecordID":recID,"UserName":"Trinity"}))} } >
                  <EmailIcon/>
                </Button>
                   ):null}
              </Box>
              <MatxCustomizer open={open}screenName={invoice} rowData={mailData} type={''} />
            </form>
          )}
        </Formik>
        <Popup
          title="Material"
          openPopup={openMatPopup}
          setOpenPopup={setOpenMatPopup}
        >
          <Listviewpopup
            accessID="2013"
            screenName="Material"
            childToParent={childToParent}
          />
        </Popup>
        <Popup
          title="Supplier"
          openPopup={openSupPopup}
          setOpenPopup={setOpenSupPopup}
        >
          <Listviewpopup
            accessID="2017"
            screenName="Supplier"
            childToParent={childToParent}
          />
        </Popup>
        <Popup
          title="Employee"
          openPopup={openEmpChePopup}
          setOpenPopup={setOpenEmpChePopup}
        >
          <Listviewpopup
            accessID="2024"
            screenName="Employee Qty / Quality Checked By"
            childToParent={childToParent}
          />
        </Popup>
        <Popup
          title="Employee"
          openPopup={openEmpPayPopup}
          setOpenPopup={setOpenEmpPayPopup}
        >
          <Listviewpopup
            accessID="2024"
            screenName="Employee Approved For Payment"
            childToParent={childToParent}
          />
        </Popup>
        <Popup
          title="Employee"
          openPopup={openEmpAppPopup}
          setOpenPopup={setOpenEmpAppPopup}
        >
          <Listviewpopup
            accessID="2024"
            screenName="Employee Qty / Quality Approved By"
            childToParent={childToParent}
          />
        </Popup>
        <Popup
          title="Employee"
          openPopup={openEmpQtyAppPopup}
          setOpenPopup={setOpenEmpQtyAppPopup}
        >
          <Listviewpopup
            accessID="2024"
            screenName="Employee Approved By"
            childToParent={childToParent}
          />
        </Popup>
        <Popup
          title="Order Reference"
          openPopup={openOrdRefPopup}
          setOpenPopup={setOpenOrdRefPopup}
        >
          <Listviewpopup
            accessID="2029"
            screenName="Order Reference"
            childToParent={childToParent}
          />
        </Popup>
        <Popup
          title="Colors"
          openPopup={openColorPopup}
          setOpenPopup={setOpenColorPopup}
        >
          <Listviewpopup
            accessID="2007"
            screenName="Colors"
            childToParent={childToParent}
          />
        </Popup>
        <Popup
          title="Qty / Approved By"
          openPopup={OpenApprovedPopup}
          setOpenPopup={setOpenApprovedPopup}
        >
          <Listviewpopup
            accessID="2024"
            screenName="Qty / Approved By"
            childToParent={childToParent}
          />
        </Popup>
        <Popup
          title="Prepared By"
          openPopup={OpenPreparedPopup}
          setOpenPopup={setOpenPreparedPopup}
        >
          <Listviewpopup
            accessID="2024"
            screenName="Prepared By"
            childToParent={childToParent}
          />
        </Popup>
      </Box>
    </React.Fragment>
  );
};

export default Editpurchaseindent;
