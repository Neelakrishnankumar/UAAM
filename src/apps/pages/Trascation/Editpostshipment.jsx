import {
    Divider,
    InputLabel,
    useTheme,
    MenuItem,
    Box,
    Button,
    TextField,
    IconButton,
    FormLabel,
    FormControl,
    Typography,
    Select,
    Tooltip,
    Breadcrumbs,
    Checkbox,
    CircularProgress,
    LinearProgress,
  } from "@mui/material";
  import axios from "axios";
  import NavigateNextIcon from "@mui/icons-material/NavigateNext";
  import Swal from "sweetalert2";
  import { Formik, Field } from "formik";
  import useMediaQuery from "@mui/material/useMediaQuery";
  import { useParams, useNavigate, useLocation } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import store from "../../../index";
  import {
    postApidata,
    postApidatawol,
    finalinvApidata,
    proformainvApidata,
    StockProcessApi,
    invoiceHeaderGetData,
    invoiceExploreGetData,
    InvoicePostData,
    InvoicePostExploreData,
  } from "../../../store/reducers/Formapireducer";
  import React, { useState, useEffect, useRef } from "react";
  import { toast } from "react-hot-toast";
  import basicSchema from "../../Security/validation";
  import {
    proformainvoiceSchema,
    proformatrailerSchema,
    proformaaccountSchema,
    proformaotherSchema,
    proformaitemsSchema,
  } from "../../Security/validation";
  
  import Listviewpopup from "../Lookup";
  import Popup from "../popup";
  
  import { tokens } from "../../../Theme";
  
  import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
  
  import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
  import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
  import ResetTvIcon from "@mui/icons-material/ResetTv";
  import { useProSidebar } from "react-pro-sidebar";
  import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
  import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarQuickFilter,
  } from "@mui/x-data-grid";
  import { LoadingButton } from "@mui/lab";
  import { getBomData } from "../../../store/reducers/Lookupapireducer";
  // ***********************************************
  // Developer:Gowsalya
  // Purpose:leather,material,product based screen trailer(country) account detail other details
  // ***********************************************
  const Editpostshipment = () => {
    const [pageSize, setPageSize] = React.useState(10);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const YearFlag = sessionStorage.getItem("YearFlag");
    const Year = sessionStorage.getItem("year");
    const location = useLocation();
    const navigate = useNavigate();
    let params = useParams();
    const dispatch = useDispatch();
    var recID = params.id;
    var mode = params.Mode;
    var accessID = params.accessID;
    var parentID = params.filtertype;
    let invoicefilter = params.invFilter;
    const Data = useSelector((state) => state.formApi.Data);
    // console.log("🚀 ~ file: Editproformainvoice.jsx:109 ~ Data:", Data)
    const DataExplore = useSelector((state) => state.formApi.inviceEData);
    console.log("🚀 ~ file: Editproformainvoice.jsx:110 ~ DataExplore:", DataExplore)
    const Status = useSelector((state) => state.formApi.Status);
    const Msg = useSelector((state) => state.formApi.msg);
    const isLoading = useSelector((state) => state.formApi.loading);
    const isPostLoading = useSelector((state) => state.formApi.postLoading);
    const isGetLoading = useSelector((state) => state.formApi.getLoading);
    // console.log("🚀 ~ file: Editproformainvoice.jsx:96 ~ isPostLoading:", isPostLoading)
    const CompanyID = sessionStorage.getItem("compID");
    const Finyear = sessionStorage.getItem("YearRecorid");
    var title = "";
    var LookupFilter = `Type ='${parentID}' AND Sellable='Y'`;
    var portOriginFilter = "";
    var portDestinationFilter = "";
    const [portType, setPortType] = useState("");
    if (parentID == "L") {
      title = "Leather Items";
    }
    if (parentID == "P") {
      title = "Product Items";
    }
    if (parentID == "M") {
      title = "Material Items";
    }
  
    const props = { accessID, get: "get", recID };
    useEffect(() => {
      dispatch(invoiceHeaderGetData(props));
    }, [location.key]);
    const [loading, setLoading] = useState(false);
    const [ini, setIni] = useState(true);
    const [iniAccount, setIniAccount] = useState(true);
    const [iniTralier, setIniTralier] = useState(true);
    const [iniDetail, setIniDetail] = useState(true);
    const [iniMaterial, setIniMaterial] = useState(true);
    const [iniGpcard, setIniGpcard] = useState(true);
    const [iniOther, setIniOther] = useState(true);
    const [invNo, setInvno] = useState("");
    const [invDate, setInvDate] = useState("");
    const [customerID, setCustomerID] = useState("");
  
    //**********Current Date******* */
    const currentDate = new Date();
    var month = `${currentDate.getMonth() + 1}`;
    if (month < 10) {
      month = "0" + month;
    }
    var Day = `${currentDate.getDate()}`;
    if (Day < 10) {
      Day = "0" + Day;
    }
    const todayDate = `${currentDate.getFullYear()}-${month}-${Day}`;
    //*******Assign Proformainovice values from Database in  Yup initial value******* */
    const initialValues = {
      Id: mode == "A" ? Data.Id : Data.Id + " / " + Year,
      Date: mode == "A" ? todayDate : Data.IPDate,
      Consignee: Data.Consignee,
      Buyer: Data.Buyer,
      ProformaNo: Data.ProformaNo,
      Sample: Data.Sample,
      Plcreated: Data.Plcreated,
      Type: Data.Type,
      SortOrder: Data.SortOrder,
      checkbox: Data.Disable,
      OrderBrief: Data.OrderBrief,
      FinalInvoiceNo:
        mode == "A" ? Data.FinalInvoiceNo : Data.FinalInvoiceNo + " / " + Year,
      FinalInvoiceDate: mode == "A" ? todayDate : Data.FinalInvoiceDate,
      ProfoInvoiceNO:
        mode == "A" ? Data.ProfoInvoiceNO : Data.ProfoInvoiceNO + " / " + Year,
      ProfoInvoiceDate: mode == "A" ? todayDate : Data.ProfoInvoiceDate,
    };
  
    //*******Assign Trailer values from Database in  Yup initial value******* */
    const trailerinitialValues = {
      Expdate:
        DataExplore.Expdate == "" || DataExplore.Expdate == null
          ? todayDate
          : DataExplore.Expdate,
      Orderdate:
        DataExplore.Orderdate == "" || DataExplore.Orderdate == null
          ? todayDate
          : DataExplore.Orderdate,
      Transit: DataExplore.Transit,
      ShipmentType: DataExplore.Shipmenttype,
      Ngedate: DataExplore.Ngedate,
      Lastdateofship: DataExplore.Lastdateofship,
      Add: Number(DataExplore.Add).toFixed(3),
      Detect: Number(DataExplore.Detect).toFixed(3),
      Otherref: DataExplore.Otherref,
      BuyerOrder: DataExplore.BuyerOrder,
      Precarrby: DataExplore.Precarrby,
      Precarrbyreciept: DataExplore.Precarrbyreciept,
      Placeofreceipt: DataExplore.Placeofreceipt,
      Exportersref: DataExplore.Exportersref,
      PclAmount: DataExplore.PclAmount,
      Plcreated: DataExplore.Plcreated,
      ShippingMarks: DataExplore.ShippingMarks,
      TotalGrossWeight: DataExplore.TotalGrossWeight,
      TotalNetWeight: DataExplore.TotalNetWeight,
      QuantityUnits: DataExplore.QuantityUnits,
      TotalPackages: DataExplore.TotalPackages,
      FreightRate: DataExplore.FreightRate,
      PaymentTerms: DataExplore.PaymentTerms,
      PaymentDate: DataExplore.PaymentDate,
      Amount: DataExplore.Amount,
      Add1: DataExplore.Add1,
      Amount1: DataExplore.Amount1,
      Add2: DataExplore.Add2,
      Amount2: DataExplore.Amount2,
      Amount3: DataExplore.Amount3,
      Commissionpaid: DataExplore.Commissionpaid,
      
  
    };
  
    //*******Assign account values from Database in  Yup initial value******* */
    const accountinitialValues = {
      Paymentterms: DataExplore.Paymentterms,
      Deliveryperiod: DataExplore.Deliveryperiod,
      QuantityUnits: DataExplore.QuantityUnits,
      Freightrate: DataExplore.Freightrate,
      Refcode: DataExplore.Refcode,
      Referencecode: DataExplore.Referencecode,
      Negotiating: DataExplore.Negotiating,
      Amount: DataExplore.Amount,
    };
    // **********AccountSave Function*****************
    const fnaccountSave = async (values, types) => {
      var ProcessValue = sessionStorage.getItem("ProcessValue");
  
      if (ProcessValue == "Y") {
        toast.error("Your data Already Processed edit not Applicable");
        return;
      }
      setLoading(true);
      setIniAccount(false);
      // console.log(values);
  
      var saveData = {
        RecordID: Data.RecordID,
        Paymentterms: values.Paymentterms || 0,
        Deliveryperiod: values.Deliveryperiod || 0,
        QuantityUnits: values.QuantityUnits || 0,
        Freightrate: values.Freightrate || 0,
        Freightrate: values.Freightrate || 0,
        Refcode: values.Refcode || 0,
        Referencecode: values.Referencecode || 0,
        Negotiating: values.Negotiating || 0,
        OBkRecordID: selectBOLookupData.OBkRecordID || 0,
        ABkRecordID: selectBALookupData.ABkRecordID || 0,
        DirectorsID: selectdirectorLookupData.directorRecordID,
        Amount: values.Amount || 0,
        Finyear,
        CompanyID,
      };
      var type = "";
      if (types === "harddelete") {
        type = "harddelete";
      } else {
        type = "update";
      }
  
      const data = await dispatch(
        InvoicePostExploreData({
          accessID: "TR041",
          action: type,
          idata: saveData,
        })
      );
      if (data.payload.Status == "Y") {
        toast.success(data.payload.Msg);
        setScreen("3");
        setLoading(false);
      } else {
        toast.error(data.payload.Msg);
        setScreen("3");
        setLoading(false);
      }
    };
  
    //*******************Post Shipment***************
    const postshipmentinitialValues = {
      shipmentbill: DataExplore.Shipmentbill,
      shipmentdate: DataExplore.Shipmentdate,
      brcrecondate: DataExplore.Brcrecondate,
      bank: DataExplore.Bank,
      awbbl: DataExplore.Awbbill,
      awbbldate: DataExplore.Awbbilldate,
      clearingagent: DataExplore.Clearingagent,
      mccigsp: DataExplore.Mccigsp,
      mccigspdate: DataExplore.Mccigspdate,
      invoicedeductionamount: DataExplore.Invoicedeductamount,
      actualamount: DataExplore.Actualamount,
      faccomission: DataExplore.Faccomission,
      facamount: DataExplore.Amount1,
      laccomission: DataExplore.Laccomission,
      lacamount: DataExplore.Amount2,
      actualfrieght: DataExplore.Actualfrieght,
      actualinsurance: DataExplore.Actualinsurance,
      invoiceamount: DataExplore.Invoiceamount,
      exchangerate: DataExplore.Exchangerate,
      invoicevalue: DataExplore.Invoicevalue,
      fobvalue: DataExplore.Fobvalue,
      paymentreceivedamount1: DataExplore.Paymentrecordamount1,
      paymentreceiveddate1: DataExplore.Paymentrecorddate1,
      paymentreceivedamount2: DataExplore.Paymentrecordamt2,
      paymentreceiveddate2: DataExplore.Paymentrecorddate2,
      paymentreceivedamount3: DataExplore.Paymentrecordamt3,
      paymentreceiveddate3: DataExplore.Paymentrecorddate3,
      pclamount: DataExplore.Pclamount,
      pclclosingdate: DataExplore.Pclclosingdate,
      amount: DataExplore.AmountInr,
      received: DataExplore.ReceivedInr,
      receiveddate: DataExplore.Receiveddate,
      difference: DataExplore.DifferenceInr,
      brcavailed: DataExplore.Brcavailed === "Y" ? true : false,
      commissionpaid: DataExplore.Commissionpaid === "Y" ? true : false,
    };
    const fnpostshipmentSave = async (values, types) => {
     
      setLoading(true);
     
      // console.log(values);
  
      var saveData = {
        RecordID: Data.RecordID,
        Shipmentbill: values.shipmentbill,
        Shipmentdate: values.shipmentdate,
        Brcrecondate: values.brcrecondate,
        AirlineId:selectairlineLookupData.airlineRecordID,
        Bank: values.bank,
        Awbbill: values.awbbl,
        Awbbilldate: values.awbbldate,
        Clearingagent: values.clearingagent,
        Mccigsp: values.mccigsp,
        Mccigspdate: values.mccigspdate,
        Invoicedeductamount: values.invoicedeductionamount,
        Actualamount: values.actualamount,
        Faccomission: values.faccomission,
        Amount1: values.facamount,
        Laccomission: values.laccomission,
        Amount2: values.lacamount,
        Actualfrieght: values.actualfrieght,
        Actualinsurance: values.actualinsurance,
        Invoiceamount: values.invoiceamount,
        Exchangerate: values.exchangerate,
        Invoicevalue: values.invoicevalue,
        Fobvalue: values.fobvalue,
        Paymentrecordamount1: values.paymentreceivedamount1,
        Paymentrecorddate1: values.paymentreceiveddate1,
        Paymentrecordamt2: values.paymentreceivedamount2,
        Paymentrecorddate2: values.paymentreceiveddate2,
        Paymentrecordamt3: values.paymentreceivedamount3,
        Paymentrecorddate3: values.paymentreceiveddate3,
        Pclamount: values.pclamount,
        Pclclosingdate: values.pclclosingdate,
        AmountInr: values.amount,
        ReceivedInr: values.received,
        Receiveddate: values.receiveddate,
        DifferenceInr: values.difference,
        Brcavailed: values.brcavailed === true ? "Y" : "N",
        Commissionpaid: values.commissionpaid === true ? "Y" : "N",
        Finyear,
        CompanyID,
      };
      var type = "";
      if (types === "harddelete") {
        type = "harddelete";
      } else {
        type = "update";
      }
  
      const data = await dispatch(
        InvoicePostExploreData({
          accessID: "TR142",
          action: type,
          idata: saveData,
        })
      );
      if (data.payload.Status == "Y") {
        toast.success(data.payload.Msg);
        // setScreen("3");
         setLoading(false);
      } else {
        toast.error(data.payload.Msg);
        // setScreen("3");
         setLoading(false);
      }
    };
  
    const fnTralierSave = async (values, types) => {
      var ProcessValue = sessionStorage.getItem("ProcessValue");
  
      if (ProcessValue == "Y") {
        toast.error("Your data Already Processed edit not Applicable");
        return;
      }
      setLoading(true);
      setIniTralier(false);
      if (values.Expdate < values.Orderdate) {
        toast.error("Exp date should be in Greater than Orderdate");
        return;
      }
      if (values.checkbox == true) {
        values.checkbox = "Y";
      } else {
        values.checkbox = "N";
      }
  
      console.log(values);
      var prtType = "";
      if (portType == "") {
        prtType = values.Transit;
      } else prtType = portType;
  
      var saveData = {
        RecordID: Data.RecordID,
        Precarrby: values.Precarrby,
        BuyerOrder: values.BuyerOrder,
        Add: values.Add,
        Detect: values.Detect,
        Otherref: values.Otherref,
        Transit: prtType,
        Orderdate: values.Orderdate,
        Expdate: values.Expdate,
        Lastdateofship: values.Lastdateofship,
        Ngedate: values.Ngedate,
        OPoRecordID: selectPOLookupData.OPoRecordID,
        DPoRecordID: selectPDLookupData.DPoRecordID,
        DSPoRecordID: selectDPLookupData.DSPoRecordID,
        LPoRecordID: selectPLLookupData.LPoRecordID,
        FPoRecordID: selectPFLookupData.FPoRecordID,
        OCnRecordID: selectCOLookupData.OCnRecordID,
        FCnRecordID: selectCFLookupData.FCnRecordID,
        FrRecordID: 0,
        Precarrbyreciept: values.Precarrbyreciept,
        Shipmenttype: values.ShipmentType,
        Finyear,
        CompanyID,
      };
      var type = "";
  
      if (types === "harddelete") {
        type = "harddelete";
      } else {
        type = "update";
      }
  
      const data = await dispatch(
        InvoicePostExploreData({
          accessID: "TR013",
          action: "update",
          idata: saveData,
        })
      );
  
      if (data.payload.Status == "Y") {
        toast.success(data.payload.Msg);
        setLoading(false);
      } else {
        toast.error(data.payload.Msg);
        setLoading(false);
      }
    };
    // **********fnPreShipmentSave Function***************** //
    const fnPreShipmentSave = async (values, types) => {
      var ProcessValue = sessionStorage.getItem("ProcessValue");
  
      if (ProcessValue == "Y") {
        toast.error("Your data Already Processed edit not Applicable");
        return;
      }
      setLoading(true);
      setIniTralier(false);
      if (values.Expdate < values.Orderdate) {
        toast.error("Exp date should be in Greater than Orderdate");
        return;
      }
  
  
  
  
  
      const idata =  {
           RecordID: Data.RecordID,
           Placeofreceipt: values.Placeofreceipt,
           Exportersref: values.Exportersref,
           Otherref: values.Otherref,
           PclAmount: values.PclAmount,
           Plcreated: values.Plcreated,
           Shipmenttype: values.ShipmentType,
           DPoRecordID:  selectPDLookupData.DPoRecordID,
           DeliveryPortCode: selectPDLookupData.DeliveryPortCode,
           DeliveryPortDesc: selectPDLookupData.DeliveryPortDescription,
           DSPoRecordID:selectDPLookupData.DSPoRecordID,
           DischargePortCode: selectDPLookupData.DischargePortCode,
           DischargePortDesc: selectDPLookupData.DischargePortDescription,
           LPoRecordID: selectPLLookupData.LPoRecordID,
           LoadingPortCode: selectPLLookupData.LoadingPortCode,
           LoadingPortDesc: selectPLLookupData.LoadingPortDescription,
           ShippingMarks:values.ShippingMarks,
           TotalGrossWeight: values.TotalGrossWeight,
           TotalNetWeight: values.TotalNetWeight,
           QuantityUnits: values.QuantityUnits,
           TotalPackages: values.TotalPackages,
           FreightRate: values.FreightRate,
           PaymentTerms: values.PaymentTerms,
           PaymentDate:  values.PaymentDate,
           Add: values.Add,
           Amount: values.Amount,
           Add1:  values.Add1,
           Amount1: values.Amount1,
           Add2: values.Add2,
           Amount2:values.Amount2,
           Detect: values.Detect,
           Amount3:  values.Amount3,
           Commissionpaid: values.Commissionpaid,
           Precarrby: values.Precarrby,
           Finyear,
           CompanyID,
       }
  
  
  
  
      const data = await dispatch(
        InvoicePostExploreData({
          accessID: "TR143",
          action: "update",
          idata: idata,
        })
      );
  
      if (data.payload.Status == "Y") {
        toast.success(data.payload.Msg);
        setLoading(false);
      } else {
        toast.error(data.payload.Msg);
        setLoading(false);
      }
    };
  
    // **********Save Function*****************
    const fnSave = async (values, types) => {
      if (Data.Process == "Y") {
        toast.error("Your data Already Processed edit not Applicable");
        return;
      }
  
      if (values.checkbox == true) {
        values.checkbox = "Y";
      } else {
        values.checkbox = "N";
      }
  
      var saveData = {
        RecordID: recID,
        Id: values.Id,
        IPDate: values.Date,
        CustRecordID: selectctyLookupData.CTYlookupRecordid,
        ProformaNo: values.ProformaNo,
        Sample: values.Sample,
        Plcreated: values.Plcreated,
        YearID: Year,
        CurRecordID: selectcurLookupData.CURlookupRecordid,
        SortOrder: 0,
        Disable: "N",
        Type: parentID,
        ConsigneeRecordID: selectCOSLookupData.COSRecordID,
        BuyerRecordID: selectBOCLookupData.BOCRecordID,
        OrderBrief: values.OrderBrief,
        InvType: invoicefilter,
        FinalInvoiceNo: values.FinalInvoiceNo,
        FinalInvoiceDate: values.FinalInvoiceDate,
        ProfoInvoiceNO: values.ProfoInvoiceNO,
        ProfoInvoiceDate: values.ProfoInvoiceDate,
        Amount: 0,
        CompanyID,
        Finyear,
      };
      var type = "";
  
      if (types === "harddelete") {
        type = "harddelete";
      } else {
        if (mode == "A") {
          type = "insert";
        } else {
          type = "update";
        }
      }
  
      const data = await dispatch(
        InvoicePostData({ accessID, action: type, idata: saveData })
      );
      // console.log("🚀 ~ file: Editproformainvoice.jsx:359 ~ fnSave ~ data:", data)
  
      if (data.payload.Status == "Y") {
        toast.success(data.payload.Msg);
        setLoading(false);
        if (mode == "A") {
          navigate(
            `/Apps/Secondarylistview/TR011/Proforma%20Invoice/${parentID}/${invoicefilter}/EditProforma Invoice/${data.payload.Recid}/E`
          );
        }
      } else {
        toast.error(data.payload.Msg);
        setLoading(false);
      }
    };
  
    // **********Save Function*****************
    const fninvoice = async () => {
      setLoading(true);
      setIni(false);
  
      const data = await dispatch(
        finalinvApidata(recID, invNo, invDate, parentID, Year)
      );
      console.log(data);
      if (data.payload.Status == "Y") {
        toast.success(data.payload.Msg);
        setLoading(false);
        navigate(`/Apps/TR043/Invoice Types`);
      } else {
        toast.error(data.payload.Msg);
        setLoading(false);
      }
    };
  
    // **********Save Function*****************
    const fnProformainvoice = async () => {
      var ProcessValue = sessionStorage.getItem("ProcessValue");
  
      if (ProcessValue == "Y") {
        toast.error("Your data Already Processed edit not Applicable");
        return;
      }
      setLoading(true);
      setIni(false);
  
      const data = await dispatch(
        proformainvApidata(recID, invNo, invDate, parentID, Year)
      );
      console.log(data);
      if (data.payload.Status == "Y") {
        toast.success(data.payload.Msg);
        setLoading(false);
        navigate(`/Apps/TR043/Invoice Types`);
      } else {
        toast.error(data.payload.Msg);
        setLoading(false);
      }
    };
    const invoiceCopyFn = async () => {
      var url = store.getState().globalurl.invoiceUrl;
      var data = {
        RecordID: recID,
        CompanyID,
        Finyear,
      };
  
      console.log(data);
      axios
        .post(url, data, {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
          },
        })
  
        .then((response) => {
          console.log(
            "🚀 ~ file: Listviewapireducer.js:96 ~ .then ~ response",
            response.data
          );
          console.log("response data" + JSON.stringify(response));
          if (response.data.Status == "Y") {
            toast.success(`${response.data.Msg}`);
            navigate(
              `/Apps/Secondarylistview/TR011/Proforma%20Invoice/${parentID}/${invoicefilter}`
            );
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    };
  
    const explorelistViewData = useSelector(
      (state) => state.exploreApi.explorerowData
    );
    const explorelistViewcolumn = useSelector(
      (state) => state.exploreApi.explorecolumnData
    );
    const [show, setScreen] = React.useState("0");
  
    const [detaildata, setDetaildata] = useState({
      ProductCardNumber: "",
      RecordID: "",
      Hide: "",
      Hidesqft: "",
      Side: "",
      Sidesqft: "",
      Rate: "",
      Remarks: "",
      ProductCode: "",
      ProductDescription: "",
      ProductQuantity: "",
      SortOrder: "",
      Disable: "",
      Quantity: "",
    });
    const [boMode, setBomode] = useState("A");
    const [chkbox, setchkbox] = useState(false);
    const [proformaval, setProformaval] = useState("");
    const [dateVal, setDateval] = useState("");
    const [accVal, setaccount] = useState("");
    const [corexdata, setCorexdata] = useState({
      RecordID: "",
      RexCode: "",
      RexDescription: "",
      Line: "",
      SortOrder: "",
      Disable: "",
    });
  
    const [batchStarted, setBatchStarted] = useState(0);
  
    // **********ScreenChange Function*********
    const proformaChange = (event) => {
      setProformaval(Data.Type);
      setScreen(event.target.value);
      setDateval(Data.IPDate);
      setInvDate(currentdate);
      setCustomerID(selectctyLookupData.CTYlookupRecordid);
      sessionStorage.setItem("ProcessValue", Data.Process);
      if (event.target.value == "1") {
        setisPopupdata(false);
  
        selectcelldata("", "A", "");
  
        var filter = `${recID} AND Type = '${parentID}'`;
        // dispatch(invoiceHeaderGetData(props));
        dispatch(fetchExplorelitview("TR012", "InvoiceDetails", filter, ""));
      }
      if (event.target.value == "2.1") {
        setisPopupdata(false);
        dispatch(invoiceExploreGetData({ accessID: "TR143", get: "get", recID }));
      }
      if (event.target.value == "2") {
        setisPopupdata(false);
        dispatch(invoiceExploreGetData({ accessID: "TR013", get: "get", recID }));
      }
      if (event.target.value == "3") {
        setisPopupdata(false);
        // dispatch(invoiceHeaderGetData(props));
        dispatch(invoiceExploreGetData({ accessID: "TR041", get: "get", recID }));
      }
      if (event.target.value == "0") {
        setisPopupdata(false);
        // dispatch(invoiceHeaderGetData(props));
      }
      if (event.target.value == "4") {
        setisPopupdata(false);
        // dispatch(invoiceHeaderGetData(props));
        dispatch(invoiceExploreGetData({ accessID: "TR042", get: "get", recID }));
      }
      if (event.target.value == "6") {
        setisPopupdata(false);
        // dispatch(invoiceHeaderGetData(props));
        dispatch(invoiceExploreGetData({ accessID: "TR142", get: "get", recID }));
      }
    };
  
    /****************** Items values assign a state variale******************** */
    const selectcelldata = (data, bMode, field) => {
      console.log("selectdata" + JSON.stringify(data));
      setBomode(bMode);
      if (bMode == "A") {
        setDetaildata({
          RecordID: "",
          Hide: "",
          Hidesqft: "",
          Side: "",
          Sidesqft: "",
          Rate: "",
          Remarks: "",
          ProductCode: "",
          ProductDescription: "",
          ProductQuantity: "",
          SortOrder: "",
          Disable: "",
          Quantity: "",
        });
        setselectCPLookupData({
          CPlookupRecordid: "",
          CPlookupCode: "",
          CPlookupDesc: "",
          CPlookupRate: "",
          CurrencyCode: "Cureency Code",
          CPlookupBomCount: 3,
        });
        setselectmaterialLookupData({
          MlookupRecordid: "",
          MlookupCode: "",
          MlookupDesc: "",
        });
        setselectBOMLookupData({
          BOMCode: "",
          BOMDescription: "",
          BOMRecordID: "",
          bomCount: 3,
          bomID:""
        });
        setCostingLookup({
          sampleSPriTypeLeatherID:0,
          costingRecID: 0,
          costingCode: "",
          costingDescription: "",
          productPrice: "",
          PrimaryLeatherID: "",
          SecondaryLeatherID: "",
          TeritiaryLeatherID: "",
          SamplePrimaryType:"",
        });
        setLeatherLookup({
          leatherRecID: 0,
          leatherCode: "",
          leatherDescription: "",
          ProductCost: "",
          PrimaryLeatherID: "",
        });
        setSecondaryTypeLeatherLookup({
          recordID: "",
          code: "",
          SecondaryTypeLeatherID: "",
          sampleSecTypeLeatherID:"",
          SampleSecondaryType:""
        });
        setTertiaryTypeLeatherLookup({
          recordID: "",
          code: "",
          TertiaryTypeLeatherID: "",
          sampleTriTypeLeatherID:"",
          SampleTertiaryType:""
        });
        setSecondaryLeatherLookup({
          recordID: 0,
          code: "",
          secondaryLeatherID: "",       
        })
        setTertiaryLeatherLookup({
          recordID: 0,
          code: "",
          tertiaryLeatherID: "",       
        })
        setisSample(false);
      } else {
        if (field == "action") {
          if (data.Disable == "Y") {
            setchkbox(true);
          } else {
            setchkbox(false);
          }
          if (data.Addsample == "Y") {
            setisSample(true);
          } else {
            setisSample(false);
          }
          setDetaildata({
            ProductCardNumber: data.ProductCardNumber,
            RecordID: data.RecordID,
            Hide: data.Hide,
            Hidesqft: data.Hidesqft,
            Side: data.Side,
            Sidesqft: data.Sidesqft,
            Rate: data.Rate,
            Remarks: data.Remarks,
            ProductCode: data.ProductCode,
            ProductDescription: data.ProductDescription,
            ProductQuantity: data.ProductQuantity,
            SortOrder: data.SortOrder,
            Disable: data.Disable,
            Quantity: data.Quantity,
          });
          setselectCPLookupData({
            CPlookupRecordid: data.PrdRecordID,
            CPlookupCode: data.ProductCode,
            CPlookupDesc: data.CustomerProductDescription,
            CPlookupRate: data.Rate,
            CurrencyCode: data.CurrencyCode,
            CPlookupBomCount: data.BomCount,
          });
          setselectmaterialLookupData({
            MlookupCode: data.MaterialCode,
            MlookupRecordid: data.MtlRecordID,
            MlookupDesc: data.MaterialDescription,
          });
          setselectBOMLookupData({
            BOMCode: data.BhCode,
            BOMDescription: data.BhDescription,
            BOMRecordID: data.BhRecordID,
            bomCount: data.LCount,
            bomID:data.CostingID
          });
          setBatchStarted(data.BatchStatus);
          setCostingLookup({
            sampleSPriTypeLeatherID:data.SamplePrimaryTypeID,
            costingRecID: data.CostingID,
            costingCode: data.PrimaryType,
            costingDescription: "",
            productPrice: data.ProductCost,
            PrimaryLeatherID: data.PrimaryTypeID,
            SecondaryLeatherID: data.SecondaryTypeID,
            TeritiaryLeatherID: data.TeritiaryTypeID,
            SamplePrimaryType:data.SamplePrimaryType,
          });
          setSecondaryTypeLeatherLookup({
            recordID: data.CostingID,
            code: data.SecondaryType,
            SecondaryTypeLeatherID: data.SecondaryTypeID,
            sampleSecTypeLeatherID:data.SampleSecondaryTypeID,
            SampleSecondaryType:data.SampleSecondaryType
          });
          setTertiaryTypeLeatherLookup({
            recordID: data.CostingID,
            code: data.TeritiaryType,
            TertiaryTypeLeatherID: data.TeritiaryTypeID,
            sampleTriTypeLeatherID:data.SampleTertiaryTypeID,
            SampleTertiaryType:data.SampleTertiaryType
          });
          setLeatherLookup({
            leatherRecID: data.InvoicePLeatherID,
            leatherCode: data.PrimaryLeatherCode,
            leatherDescription: data.PrimaryLeatherDescription,
            ProductCost: data.Rate,
          });
          setSecondaryLeatherLookup({
            recordID: data.InvoiceSLeatherID,
            code: data.SecondaryLeatherCode,
            secondaryLeatherID: data.SecondaryLeatherID,       
          })
          setTertiaryLeatherLookup({
            recordID: data.InvoiceTLeatherID,
            code: data.TeritiaryLeatherCode,
            tertiaryLeatherID: data.TertiaryLeatherID,       
          })
  
        }
      }
    };
    const [issample, setisSample] = useState(false);
    const [selectCPLookupData, setselectCPLookupData] = React.useState({
      CPlookupRecordid: "",
      CPlookupCode: "",
      CPlookupDesc: "",
      CPlookupRate: "",
      CPlookupRCode: "Customer Currency",
      CPlookupBomCount: 3,
    });
    const [costingLookup, setCostingLookup] = React.useState({
      sampleSPriTypeLeatherID:0,
      costingRecID: 0,
      costingCode: "",
      productPrice: "",
      PrimaryLeatherID: "",
      SecondaryLeatherID: "",
      TeritiaryLeatherID: "",
      SamplePrimaryType:""
    });
    const [leatherLookup, setLeatherLookup] = React.useState({
      leatherRecID: 0,
      leatherCode: "",
      leatherDescription: "",
      ProductCost: "",
      primaryLeatherID: "",
    });
  
    const [secondaryLeatherLookup, setSecondaryLeatherLookup] = React.useState({
      recordID:0,
      code:"",
      secondaryLeatherID: "",
    });
    const [tertiaryLeatherLookup, setTertiaryLeatherLookup] = React.useState({
      recordID:0,
      code:"",
      tertiaryLeatherID: "",
    });
  
  
    const [secondaryTypeLeatherLookup, setSecondaryTypeLeatherLookup] =
      React.useState({
        recordID: 0,
        code: "",
        SecondaryTypeLeatherID: "",
         sampleSecTypeLeatherID:0,
         SampleSecondaryType:""
      });
    const [tertiaryTypeLeatherLookup, setTertiaryTypeLeatherLookup] =
      React.useState({
        recordID: 0,
        code: "",
        TertiaryTypeLeatherID: "",
        sampleTriTypeLeatherID:0,
        SampleTertiaryType:""
      });
    //*******Assign Items values from Database in  Yup initial value******* */
    const detailInitialvalues = {
      Sample: issample,
      Hide: Number(detaildata.Hide).toFixed(3),
      Hidesqft: Number(detaildata.Hidesqft).toFixed(3),
      Side: Number(detaildata.Side).toFixed(3),
      Sidesqft: Number(detaildata.Sidesqft).toFixed(3),
      Rate:
        parentID == "P"
          ? Number(leatherLookup.ProductCost).toFixed(2)
          : Number(leatherLookup.Rate).toFixed(2),
      Remarks: detaildata.Remarks,
      ProductCode: detaildata.ProductCode,
      ProductDescription: detaildata.ProductDescription,
      ProductQuantity: Number(detaildata.ProductQuantity).toFixed(4),
      SortOrder: detaildata.SortOrder,
      checkbox: chkbox,
      Quantity: detaildata.Quantity,
      gpCard: detaildata.ProductCardNumber,
      TotalSqfeet: detaildata.TotalSqfeet,
      // gpCard:
      //   boMode !== "A" && detaildata.ProductCardNumber
      //     ? detaildata.ProductCardNumber + "/" + Year
      //     : detaildata.ProductCardNumber,
    };
  
    /******************************Detailsave Function********** */
    const fnDetailsave = async (values, resetForm, types) => {
      var ProcessValue = sessionStorage.getItem("ProcessValue");
      if (ProcessValue == "Y") {
        toast.error("Your data Already Processed edit not Applicable");
        return;
      }
  
      if (types == "harddelete") {
        if (detaildata.RecordID == "") {
          toast.error("please Select Items");
          return;
        }
      }
      var isSampleChecked = "";
  
      if (values.Sample == true) {
        isSampleChecked = "Y";
      } else {
        isSampleChecked = "N";
      }
  
      console.log(values);
  
      var saveData = "";
      var type = "";
  
      if (types === "harddelete") {
        type = "harddelete";
        saveData = {
          RecordID: detaildata.RecordID,
          Hide: values.Hide,
          Hidesqft: values.Hidesqft,
          Side: values.Side,
          Sidesqft: values.Sidesqft,
          Rate: values.Rate,
          Remarks: values.Remarks,
          ProductQuantity: values.ProductQuantity,
          SortOrder: 0,
          Disable: "N",
          IpRecordID: recID,
          PrdRecordID: selectCPLookupData.CPlookupRecordid,
          CustomerProductDescription: selectCPLookupData.CPlookupDesc,
          MtlRecordID: selectmaterialLookupData.MlookupRecordid,
          Type: parentID,
          BhRecordID: selectBOMLookupData.bomID,
          leatherRecID: leatherLookup.leatherRecID,
          CostingID: costingLookup.costingRecID,
          TotalSqfeet: values.Hidesqft + values.Sidesqft,
          Finyear,
          CompanyID,
          InvoicePLeatherID: leatherLookup.leatherRecID,
          Addsample: isSampleChecked,
          LCount:selectBOMLookupData.bomCount,
          BomCount:selectCPLookupData.CPlookupBomCount,
          InvoiceSLeatherID:secondaryLeatherLookup.recordID,
          InvoiceTLeatherID: tertiaryLeatherLookup.recordID,
          SamplePrimaryTypeID:costingLookup.sampleSPriTypeLeatherID,
          SampleSecondaryTypeID:secondaryTypeLeatherLookup.sampleSecTypeLeatherID,
          SampleTertiaryTypeID:tertiaryTypeLeatherLookup.sampleTriTypeLeatherID,
        };
      } else {
        setLoading(true);
        if (boMode == "A") {
          saveData = {
            RecordID: "",
            Hide: values.Hide,
            Hidesqft: values.Hidesqft,
            Side: values.Side,
            Sidesqft: values.Sidesqft,
            Rate: values.Rate,
            Remarks: values.Remarks,
            ProductCode: values.ProductCode,
            ProductDescription: values.ProductDescription,
            ProductQuantity: values.ProductQuantity,
            SortOrder: 0,
            Disable: "N",
            IpRecordID: recID,
            PrdRecordID: selectCPLookupData.CPlookupRecordid,
            CustomerProductDescription: selectCPLookupData.CPlookupDesc,
            MtlRecordID: selectmaterialLookupData.MlookupRecordid,
            Type: parentID,
            BhRecordID: selectBOMLookupData.bomID,
            leatherRecID: leatherLookup.leatherRecID,
            CostingID: costingLookup.costingRecID,
            Addsample: isSampleChecked,
            TotalSqfeet: values.Hidesqft + values.Sidesqft,
            Finyear,
            CompanyID,
            InvoicePLeatherID: leatherLookup.leatherRecID,
            LCount:selectBOMLookupData.bomCount,
            BomCount:selectCPLookupData.CPlookupBomCount,
            InvoiceSLeatherID:secondaryLeatherLookup.recordID,
            InvoiceTLeatherID: tertiaryLeatherLookup.recordID,
            SamplePrimaryTypeID:costingLookup.sampleSPriTypeLeatherID,
            SampleSecondaryTypeID:secondaryTypeLeatherLookup.sampleSecTypeLeatherID,
            SampleTertiaryTypeID:tertiaryTypeLeatherLookup.sampleTriTypeLeatherID,
          };
  
          type = "insert";
        } else {
          saveData = {
            RecordID: detaildata.RecordID,
            Hide: values.Hide,
            Hidesqft: values.Hidesqft,
            Side: values.Side,
            Sidesqft: values.Sidesqft,
            Rate: values.Rate,
            Remarks: values.Remarks,
            ProductCode: values.ProductCode,
            ProductDescription: values.ProductDescription,
            ProductQuantity: values.ProductQuantity,
            SortOrder: 0,
            Disable: "N",
            IpRecordID: recID,
            PrdRecordID: selectCPLookupData.CPlookupRecordid,
            CustomerProductDescription: selectCPLookupData.CPlookupDesc,
            MtlRecordID: selectmaterialLookupData.MlookupRecordid,
            Type: parentID,
            BhRecordID: selectBOMLookupData.bomID,
            leatherRecID: leatherLookup.leatherRecID,
            CostingID: costingLookup.costingRecID,
            Addsample: isSampleChecked,
            TotalSqfeet: values.Hidesqft + values.Sidesqft,
            Finyear,
            CompanyID,
            InvoicePLeatherID: leatherLookup.leatherRecID,
            InvoiceSLeatherID:secondaryLeatherLookup.recordID,
            InvoiceTLeatherID: tertiaryLeatherLookup.recordID,
            LCount:selectBOMLookupData.bomCount,
            BomCount:selectCPLookupData.CPlookupBomCount,
            SamplePrimaryTypeID:costingLookup.sampleSPriTypeLeatherID,
            SampleSecondaryTypeID:secondaryTypeLeatherLookup.sampleSecTypeLeatherID,
            SampleTertiaryTypeID:tertiaryTypeLeatherLookup.sampleTriTypeLeatherID,
          };
          type = "update";
        }
      }
      console.log("save" + JSON.stringify(saveData));
  
      const data = await dispatch(
        InvoicePostData({ accessID: "TR012", action: type, idata: saveData })
      );
  
      if (data.payload.Status == "Y") {
        toast.success(data.payload.Msg);
        setIniDetail(true);
        setLoading(false);
        dispatch(fetchExplorelitview("TR012", "InvoiceDetails", recID, ""));
        resetForm();
        setDetaildata({
          RecordID: "",
          Hide: "",
          Hidesqft: "",
          Side: "",
          Sidesqft: "",
          Rate: "",
          ProductCode: "",
          ProductDescription: "",
          ProductQuantity: "",
          Remarks: "",
          SortOrder: "",
          ProductCardNumber: "",
        });
  
        setchkbox("");
        selectcelldata("", "A", "");
      } else {
        toast.error(data.payload.Msg);
        setLoading(false);
      }
    };
    /****************************** save  FUNCTION********** */
    // const fnmaterialsave = async (values, resetForm, types) => {
    //   var ProcessValue = sessionStorage.getItem("ProcessValue");
  
    //   if (ProcessValue == "Y") {
    //     toast.error("Your data Already Processed edit not Applicable");
    //     return;
    //   }
    //   setLoading(true);
    //   setIniMaterial(false);
    //   if (types == "harddelete") {
    //     if (detaildata.RecordID == "") {
    //       toast.error("please Select Items");
    //       return;
    //     }
    //   }
  
    //   if (values.checkbox == true) {
    //     values.checkbox = "Y";
    //   } else {
    //     values.checkbox = "N";
    //   }
  
    //   console.log(values);
  
    //   var saveData = "";
    //   var type = "";
    //   if (types === "harddelete") {
    //     type = "harddelete";
    //     saveData = {
    //       RecordID: detaildata.RecordID,
    //       Quantity: values.Quantity,
    //       Rate: values.Rate,
    //       SortOrder: 0,
    //       MtlRecordID: selectmaterialLookupData.MlookupRecordid,
    //       IpRecordID: recID,
    //       Type: parentID,
    //     };
    //   } else {
    //     if (boMode == "A") {
    //       saveData = {
    //         RecordID: "",
    //         Quantity: values.Quantity,
    //         Rate: values.Rate,
    //         SortOrder: 0,
    //         MtlRecordID: selectmaterialLookupData.MlookupRecordid,
    //         IpRecordID: recID,
    //         Type: parentID,
    //       };
    //       type = "insert";
    //     } else {
    //       saveData = {
    //         RecordID: detaildata.RecordID,
    //         Quantity: values.Quantity,
    //         Rate: values.Rate,
    //         SortOrder: 0,
    //         MtlRecordID: selectmaterialLookupData.MlookupRecordid,
    //         IpRecordID: recID,
    //         Type: parentID,
    //       };
    //       type = "update";
    //     }
    //   }
    //   console.log("save" + JSON.stringify(saveData));
  
    //   const data = await dispatch(postApidata("TR012", type, saveData));
    //   if (data.payload.Status == "Y") {
    //     toast.success(data.payload.Msg);
    //     setIniMaterial(true);
    //     setLoading(false);
    //     dispatch(fetchExplorelitview("TR012", "InvoiceDetails", recID, ""));
    //     resetForm();
    //     setDetaildata({
    //       RecordID: "",
    //       Hide: "",
    //       Hidesqft: "",
    //       Side: "",
    //       Sidesqft: "",
    //       Rate: "",
    //       ProductCode: "",
    //       ProductDescription: "",
    //       ProductQuantity: "",
    //       Remarks: "",
    //       SortOrder: "",
    //       Quantity: "",
    //     });
    //     setchkbox("");
    //     selectcelldata("", "A", "");
    //   } else {
    //     toast.error(data.payload.Msg);
    //     setLoading(false);
    //   }
    // };
  
    /****************************** save  FUNCTION********** */
    const [cardLoad, setCardLoad] = useState(false);
  
    const fngpCard = async (values) => {
      var ProcessValue = sessionStorage.getItem("ProcessValue");
  
      if (ProcessValue == "Y") {
        toast.error("Your data Already Processed edit not Applicable");
        return;
      }
      setCardLoad(true);
      setIniGpcard(false);
      var saveData = "";
      var type = "insert";
  
      saveData = {
        RecordID: "",
        YearID: Year,
        OrderedQty: values.ProductQuantity,
        ProfomaRecordID: recID,
        ProductRecordID: selectCPLookupData.CPlookupRecordid,
        ProductcardNumber: values.gpCard,
        Type: parentID,
        Flag: 0,
        BOMRecordID: selectBOMLookupData.BOMRecordID,
        CompanyID,
        Finyear,
        CostingID: costingLookup.costingRecID,
        PrimaryLeatherID: leatherLookup.leatherRecID,
        // CompanyID,
      };
  
      const data = await dispatch(
        InvoicePostExploreData({
          accessID: "TR047",
          action: type,
          idata: saveData,
        })
      );
      if (data.payload.Status == "Y") {
        toast.success(data.payload.Msg);
        var filter = `${recID} AND Type = '${parentID}'`;
        dispatch(fetchExplorelitview("TR012", "InvoiceDetails", filter, ""));
        selectcelldata("", "A", "");
        setCardLoad(false);
        return;
      }
      if (data.payload.Status == "N") {
        Swal.fire({
          title: "Are you sure?",
          text: data.payload.Msg,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Change it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            saveData = {
              RecordID: "",
              YearID: Year,
              OrderedQty: values.ProductQuantity,
              ProfomaRecordID: recID,
              ProductRecordID: selectCPLookupData.CPlookupRecordid,
              ProductcardNumber: values.gpCard,
              Type: parentID,
              Flag: 1,
              BOMRecordID: selectBOMLookupData.BOMRecordID,
              CompanyID,
              Finyear,
              PrimaryLeatherID: leatherLookup.leatherRecID,
              // CompanyID,
            };
            const reSubmitData = await dispatch(
              InvoicePostExploreData({
                accessID: "TR047",
                action: type,
                idata: saveData,
              })
            );
            if (reSubmitData.payload.Status == "Y") {
              setIniGpcard(true);
              setLoading(false);
              toast.success(reSubmitData.payload.Msg);
              // setScreen(1)
              var filter = `${recID} AND Type = '${parentID}'`;
              dispatch(
                fetchExplorelitview("TR012", "InvoiceDetails", filter, "")
              );
              selectcelldata("", "A", "");
              setCardLoad(false);
            } else {
              toast.error(reSubmitData.payload.Msg);
              setCardLoad(false);
            }
          } else {
            setCardLoad(false);
          }
        });
      }
  
      // else toast.error(data.payload.Msg);
    };
  
    const style = {
      height: "55px",
      border: "2px solid #1769aa ",
      borderRadius: "5px",
      backgroundColor: "#EDEDED",
    };
  
    /*****************************Search********************** */
    var VISIBLE_FIELDS = [];
  
    if (parentID == "L") {
      VISIBLE_FIELDS = [
        "SLNO",
        "MaterialDescription",
        "Hide",
        "Hidesqft",
        "action",
      ];
    }
  
    if (parentID == "P") {
      VISIBLE_FIELDS = [
        "SLNO",
        "ProductCode",
        "Rate",
        "ProductQuantity",
        "wip",
        "action",
      ];
    }
    if (parentID == "M") {
      VISIBLE_FIELDS = ["SLNO", "MaterialCode", "Quantity", "action"];
    }
  
    const columns = React.useMemo(
      () =>
        explorelistViewcolumn.filter((column) =>
          VISIBLE_FIELDS.includes(column.field)
        ),
      [explorelistViewcolumn]
    );
  
    const otherInitialvalues = {
      Itemheader: DataExplore.Itemheader,
      Notify: DataExplore.Notify,
      Itemfooter: DataExplore.Itemfooter,
    };
    // *************otherSave Function***************
    const fnotherSave = async (values, types) => {
      setLoading(true);
      // setIniOther(false);
      console.log(values);
  
      var saveData = {
        RecordID: Data.RecordID,
        Itemheader: values.Itemheader,
        Notify: values.Notify,
        Itemfooter: values.Itemfooter,
        Finyear,
        CompanyID,
      };
      var type = "";
      if (types === "harddelete") {
        type = "harddelete";
      } else {
        type = "update";
      }
  
      const data = await dispatch(
        InvoicePostExploreData({
          accessID: "TR042",
          action: type,
          idata: saveData,
        })
      );
      if (data.payload.Status == "Y") {
        toast.success(data.payload.Msg);
        // setIniOther(true);
        setLoading(false);
        setScreen("0");
        // navigate(
        //   `/Apps/Secondarylistview/TR011/Proforma%20Invoice/${parentID}/${invoicefilter}/EditProforma Invoice/${recID}/E`
        // );
      } else {
        toast.error(data.payload.Msg);
        setLoading(false);
      }
    };
  
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
          {parentID == "L" ? (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography>List of Leathers</Typography>
              <Typography variant="h5">{`(${rowCount})`}</Typography>
            </Box>
          ) : parentID == "P" ? (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography>List of Products</Typography>
              <Typography variant="h5">{`(${rowCount})`}</Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography>List of Material</Typography>
              <Typography variant="h5">{`(${rowCount})`}</Typography>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <GridToolbarQuickFilter />
            {invoicefilter != "FI" ? (
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
            ) : (
              ""
            )}
          </Box>
        </GridToolbarContainer>
      );
    }
    const [openCTYpopup, setOpenCTYpopup] = useState(false);
    const [openCURpopup, setOpenCURpopup] = useState(false);
    const [openCPpopup, setOpenCPpopup] = useState(false);
    const [openMTPopup, setOpenMTPopup] = useState(false);
    const [openCOSpopup, setOpenCOSpopup] = useState(false);
    const [openBOCpopup, setOpenBOCpopup] = useState(false);
    const [openBOMpopup, setOpenBOMpopup] = useState(false);
    const [openPIpopup, setOpenPIpopup] = useState(false);
    const [openCostingpopup, setOpenCostingpopup] = useState(false);
    const [openSLeatherpopup, setOpenSLeatherpopup] = useState(false);
    const [openTLeatherpopup, setOpenTLeatherpopup] = useState(false);
    const [openLeatherpopup, setOpenLeatherpopup] = useState(false);
    const [openSecodLeatherpopup, setOpenSecodLeatherpopup] = useState(false);
    const [openTeriaryLeatherpopup, setOpenTeriaryLeatherpopup] = useState(false);
    // ************Lookup Function***************
    function handleShow(type) {
      if (type == "CTY") {
        setOpenCTYpopup(true);
      }
      if (type == "CUR") {
        setOpenCURpopup(true);
      }
      if (type == "CP") {
        setOpenCPpopup(true);
      }
      if (type == "MT") {
        setOpenMTPopup(true);
      }
      if (type == "CO") {
        setOpenCOPopup(true);
      }
      if (type == "CF") {
        setOpenCFPopup(true);
      }
      if (type == "PO") {
        setOpenPOPopup(true);
      }
      if (type == "PD") {
        setOpenPDPopup(true);
      }
      if (type == "DP") {
        setOpenDPPopup(true);
      }
      if (type == "PL") {
        setOpenPLPopup(true);
      }
      if (type == "PF") {
        setOpenPFPopup(true);
      }
      if (type == "OF") {
        setOpenOFPopup(true);
      }
      if (type == "BO") {
        setOpenBOPopup(true);
      }
      if (type == "BA") {
        setOpenBAPopup(true);
      }
      if (type == "DIRECTOR") {
        setOpendirectorPopup(true);
      }
      if (type == "COS") {
        setOpenCOSpopup(true);
      }
      if (type == "BOC") {
        setOpenBOCpopup(true);
      }
      if (type == "AIRLINE") {
        setOpenairlinePopup(true);
      }
      if (type == "BOM") {
        if (selectCPLookupData.CPlookupRecordid) {
          setOpenBOMpopup(true);
        } else toast.error("Please select Product Lookup");
      }
      if (type == "PI") {
        setOpenPIpopup(true);
      }
      if (type == "COST") {
        setOpenCostingpopup(true);
      }
      if (type == "LEATHER") {
        setOpenLeatherpopup(true);
      }
      if (type == "SLEATHER") {
        setOpenSLeatherpopup(true);
      }
      if (type == "TLEATHER") {
        setOpenTLeatherpopup(true);
      }
      if (type == "SECONDLEATHER") {
        setOpenSecodLeatherpopup(true);
      }
      if (type == "THIRDLEATHER") {
        setOpenTeriaryLeatherpopup(true);
      }
    }
  
    /********************************* Look up***************************/
    const [isPopupData, setisPopupdata] = React.useState(false);
  
    const [selectctyLookupData, setselectctyLookupData] = React.useState({
      CTYlookupRecordid: "",
      CTYlookupCode: "",
      CTYlookupDesc: "",
    });
    const [selectcurLookupData, setselectcurLookupData] = React.useState({
      CURlookupRecordid: "",
      CURlookupCode: "",
      CURlookupDesc: "",
    });
  
    const [selectmaterialLookupData, setselectmaterialLookupData] =
      React.useState({ MlookupRecordid: "", MlookupCode: "", MlookupDesc: "" });
  
    // detail grid
  
    if (isPopupData == false) {
      selectctyLookupData.CTYlookupRecordid = Data.CustRecordID;
      selectctyLookupData.CTYlookupCode = Data.CustCode;
      selectctyLookupData.CTYlookupDesc = Data.CustName;
    }
    if (isPopupData == false) {
      selectcurLookupData.CURlookupRecordid = Data.CurRecordID;
      selectcurLookupData.CURlookupCode = Data.CurCode;
      selectcurLookupData.CURlookupDesc = Data.CurDescription;
    }
  
    const [selectCOSLookupData, setselectCOSLookupData] = React.useState({
      COSRecordID: "",
      ConsigneeCode: "",
      ConsigneeDescription: "",
    });
    if (isPopupData == false) {
      selectCOSLookupData.COSRecordID = Data.ConsigneeRecordID;
      selectCOSLookupData.ConsigneeCode = Data.ConsigneeSupplierCode;
      selectCOSLookupData.ConsigneeDescription =
        Data.ConsigneeSupplierDescription;
    }
  
    const [selectBOCLookupData, setselectBOCLookupData] = React.useState({
      BOCRecordID: "",
      BOCCode: "",
      BOCDescription: "",
    });
    if (isPopupData == false) {
      selectBOCLookupData.BOCRecordID = Data.BuyerRecordID;
      selectBOCLookupData.BOCCode = Data.BuyerSupplierCode;
      selectBOCLookupData.BOCDescription = Data.BuyerSupplierDescription;
    }
  
    const [selectBOMLookupData, setselectBOMLookupData] = React.useState({
      BOMRecordID: "",
      BOMCode: "",
      BOMDescription: "",
      bomCount: 3,
      bomID:0,
    });
  
    const [selectPILookupData, setselectPILookupData] = React.useState({
      PIRecordID: "",
      PICode: "",
      PIDescription: "",
    });
  
    //  trailer screen country popup
    const [openCOPopup, setOpenCOPopup] = useState(false);
    const [selectCOLookupData, setselectCOLookupData] = React.useState({
      OCnRecordID: "",
      OriginCountryCode: "",
      OriginCountryName: "",
    });
  
    if (isPopupData == false) {
      selectCOLookupData.OCnRecordID = DataExplore.OCnRecordID;
      selectCOLookupData.OriginCountryCode = DataExplore.OriginCountryCode;
      selectCOLookupData.OriginCountryName = DataExplore.OriginCountryName;
    }
  
    const [openCFPopup, setOpenCFPopup] = useState(false);
    const [selectCFLookupData, setselectCFLookupData] = React.useState({
      FCnRecordID: "",
      FinalCountryCode: "",
      FinalCountryName: "",
    });
    if (isPopupData == false) {
      selectCFLookupData.FCnRecordID = DataExplore.FCnRecordID;
      selectCFLookupData.FinalCountryCode = DataExplore.FinalCountryCode;
      selectCFLookupData.FinalCountryName = DataExplore.FinalCountryName;
    }
  
    // port
    const [openPOPopup, setOpenPOPopup] = useState(false);
    const [selectPOLookupData, setselectPOLookupData] = React.useState({
      OPoRecordID: "",
      OrginPortCode: "",
      OrginPortDescription: "",
    });
    if (isPopupData == false) {
      selectPOLookupData.OPoRecordID = DataExplore.OPoRecordID;
      selectPOLookupData.OrginPortCode = DataExplore.OrginPortCode;
      selectPOLookupData.OrginPortDescription = DataExplore.OrginPortDescription;
    }
  
    const [openPDPopup, setOpenPDPopup] = useState(false);
    const [selectPDLookupData, setselectPDLookupData] = React.useState({
      DPoRecordID: "",
      DeliveryPortCode: "",
      DeliveryPortDescription: "",
    });
    if (isPopupData == false) {
      selectPDLookupData.DPoRecordID = DataExplore.DPoRecordID;
      selectPDLookupData.DeliveryPortCode = DataExplore.DeliveryPortCode;
      selectPDLookupData.DeliveryPortDescription =
        DataExplore.DeliveryPortDesc;
    }
    const [openDPPopup, setOpenDPPopup] = useState(false);
    const [selectDPLookupData, setselectDPLookupData] = React.useState({
      DSPoRecordID: "",
      DischargePortCode: "",
      DischargePortDescription: "",
    });
    if (isPopupData == false) {
      selectDPLookupData.DSPoRecordID = DataExplore.DSPoRecordID;
      selectDPLookupData.DischargePortCode = DataExplore.DischargePortCode;
      selectDPLookupData.DischargePortDescription =
        DataExplore.DischargePortDesc;
    }
    const [openPLPopup, setOpenPLPopup] = useState(false);
    const [selectPLLookupData, setselectPLLookupData] = React.useState({
      LPoRecordID: "",
      LoadingPortCode: "",
      LoadingPortDescription: "",
    });
    if (isPopupData == false) {
      selectPLLookupData.LPoRecordID = DataExplore.LPoRecordID;
      selectPLLookupData.LoadingPortCode = DataExplore.LoadingPortCode;
      selectPLLookupData.LoadingPortDescription = DataExplore.LoadingPortDesc;
    }
    const [openPFPopup, setOpenPFPopup] = useState(false);
    const [selectPFLookupData, setselectPFLookupData] = React.useState({
      FPoRecordID: "",
      FinalPortCode: "",
      FinalPortDesc: "",
    });
    if (isPopupData == false) {
      selectPFLookupData.FPoRecordID = DataExplore.FPoRecordID;
      selectPFLookupData.FinalPortCode = DataExplore.FinalPortCode;
      selectPFLookupData.FinalPortDesc = DataExplore.FinalPortDesc;
    }
    // fraight
    const [openOFPopup, setOpenOFPopup] = useState(false);
    const [selectOFLookupData, setselectOFLookupData] = React.useState({
      FrRecordID: "",
      AirlinesCode: "",
      AirlinesDesc: "",
    });
    if (isPopupData == false) {
      selectOFLookupData.FrRecordID = DataExplore.FrRecordID;
      selectOFLookupData.AirlinesCode = DataExplore.AirlinesCode;
      selectOFLookupData.AirlinesDesc = DataExplore.AirlinesDesc;
    }
   // Airline
   const [openairlinePopup, setOpenairlinePopup] = useState(false);
   const [selectairlineLookupData, setselectairlineLookupData] = React.useState({
     airlineRecordID: "",
     airlinecode: "",
     airlinedescription: "",
   });
   if (isPopupData == false) {
     selectairlineLookupData.airlineRecordID = DataExplore.AirlineId;
     selectairlineLookupData.airlinecode = DataExplore.Code;
     selectairlineLookupData.airlinedescription = DataExplore.Name;
   }
    //  Account lookup
    // OPENINEG
    const [openBOPopup, setOpenBOPopup] = useState(false);
    const [selectBOLookupData, setselectBOLookupData] = React.useState({
      OBkRecordID: "",
      OpeningBankcode: "",
      OpeningBankdescription: "",
    });
    if (isPopupData == false) {
      selectBOLookupData.OBkRecordID = DataExplore.OBkRecordID;
      selectBOLookupData.OpeningBankcode = DataExplore.OpeningBankcode;
      selectBOLookupData.OpeningBankdescription =
        DataExplore.OpeningBankdescription;
    }
    // ADVISING
    const [openBAPopup, setOpenBAPopup] = useState(false);
    const [selectBALookupData, setselectBALookupData] = React.useState({
      ABkRecordID: "",
      AdvisingBankcode: "",
      AdvisingBankdescription: "",
    });
    if (isPopupData == false) {
      selectBALookupData.ABkRecordID = DataExplore.ABkRecordID;
      selectBALookupData.AdvisingBankcode = DataExplore.AdvisingBankcode;
      selectBALookupData.AdvisingBankdescription =
        DataExplore.AdvisingBankdescription;
    }
    const [opendirectorPopup, setOpendirectorPopup] = useState(false);
    const [selectdirectorLookupData, setselectdirectorLookupData] = React.useState({
      directorRecordID: "",
      directorcode: "",
      directordescription: "",
    });
    if (isPopupData == false) {
      selectdirectorLookupData.directorRecordID = DataExplore.DirectorsID;
      selectdirectorLookupData.directorcode = DataExplore.directorcode;
      selectdirectorLookupData.directordescription = DataExplore.directordescription;
    }
    //************************** Lookup value assign type based Function *****************/
    const childToParent = async (childdata, type) => {
      console.log("type---" + type);
      console.log("Data---" + JSON.stringify(childdata));
      setisPopupdata(true);
      if (type == "Customer") {
        setselectctyLookupData({
          CTYlookupCode: childdata.Code,
          CTYlookupRecordid: childdata.RecordID,
          CTYlookupDesc: childdata.Name,
        });
        setselectcurLookupData({
          CURlookupCode: childdata.CurrencyCode,
          CURlookupRecordid: childdata.CurrencyRecordID,
          CURlookupDesc: childdata.CurrencyDescription,
        });
        setOpenCTYpopup(false);
      }
      if (type == "Currency") {
        setselectcurLookupData({
          CURlookupCode: childdata.Code,
          CURlookupRecordid: childdata.RecordID,
          CURlookupDesc: childdata.Name,
        });
        setOpenCURpopup(false);
      }
      if (type == "Product") {
        setselectCPLookupData({
          CPlookupRecordid: childdata.ProductRecordID,
          CPlookupCode: childdata.Code,
          CPlookupDesc: childdata.Name,
          CPlookupRate: childdata.CostPrice,
          CPlookupRCode: childdata.CurrencyCode,
          CPlookupBomCount: childdata.BomCount,
        });
        const dataBom = await dispatch(getBomData({ProductID:childdata.ProductRecordID,CustomerID:customerID}));
        if ((childdata.BomCount) == "1") {
          await setselectBOMLookupData({
            BOMCode: dataBom.payload.Data.Code,
            BOMRecordID: dataBom.payload.Data.RecordID,
            BOMDescription: dataBom.payload.Data.Name,
            bomCount: dataBom.payload.Data.Count,
            bomID:dataBom.payload.Data.BomID
          });
        }
  
        setOpenCPpopup(false);
      }
  
  
      if (type == "Material") {
        setselectmaterialLookupData({
          MlookupCode: childdata.Code,
          MlookupRecordid: childdata.RecordID,
          MlookupDesc: childdata.Name,
        });
        setOpenMTPopup(false);
      }
      if (type == "Origin Country") {
        setselectCOLookupData({
          OriginCountryCode: childdata.Code,
          OCnRecordID: childdata.RecordID,
          OriginCountryName: childdata.Name,
        });
        setOpenCOPopup(false);
      }
      if (type == "Destination Country") {
        setselectCFLookupData({
          FinalCountryCode: childdata.Code,
          FCnRecordID: childdata.RecordID,
          FinalCountryName: childdata.Name,
        });
        setOpenCFPopup(false);
      }
      if (type == "Origin Ports") {
        setselectPOLookupData({
          OrginPortCode: childdata.Code,
          OPoRecordID: childdata.RecordID,
          OrginPortDescription: childdata.Name,
        });
        setOpenPOPopup(false);
      }
  
      if (type == "Delivery Ports") {
        setselectPDLookupData({
          DeliveryPortCode: childdata.Code,
          DPoRecordID: childdata.RecordID,
          DeliveryPortDescription: childdata.Name,
        });
        setOpenPDPopup(false);
      }
      if (type == "Discharge Ports") {
        setselectDPLookupData({
          DischargePortCode: childdata.Code,
          DSPoRecordID: childdata.RecordID,
          DischargePortDescription: childdata.Name,
        });
        setOpenDPPopup(false);
      }
      if (type == "Loading Ports") {
        setselectPLLookupData({
          LoadingPortCode: childdata.Code,
          LPoRecordID: childdata.RecordID,
          LoadingPortDescription: childdata.Name,
        });
        setOpenPLPopup(false);
      }
      if (type == "Final Destination") {
        setselectPFLookupData({
          FinalPortCode: childdata.Code,
          FPoRecordID: childdata.RecordID,
          FinalPortDesc: childdata.Name,
        });
        setOpenPFPopup(false);
      }
      if (type == "Vessel") {
        setselectOFLookupData({
          AirlinesCode: childdata.Code,
          FrRecordID: childdata.RecordID,
          AirlinesDesc: childdata.Name,
        });
        setOpenOFPopup(false);
      }
      //airline
      if (type == "Airline") {
        // alert("hai");
        setselectairlineLookupData({
          airlinecode: childdata.Code,
          airlineRecordID: childdata.RecordID,
          airlinedescription: childdata.Name,
        });
        setOpenairlinePopup(false);
      }
      if (type == "Opening Bank") {
        // alert("hai");
        setselectBOLookupData({
          OpeningBankcode: childdata.Code,
          OBkRecordID: childdata.RecordID,
          OpeningBankdescription: childdata.Name,
        });
        setOpenBOPopup(false);
      }
      if (type == "Advising Bank") {
        setselectBALookupData({
          AdvisingBankcode: childdata.Code,
          ABkRecordID: childdata.RecordID,
          AdvisingBankdescription: childdata.Name,
        });
        setOpenBAPopup(false);
      }
      if (type == "Director") {
        setselectdirectorLookupData({
         directorcode: childdata.Code,
         directorRecordID: childdata.RecordID,
         directordescription: childdata.Name,
        });
        setOpendirectorPopup(false);
      }
      if (type == "Consignee") {
        setselectCOSLookupData({
          ConsigneeCode: childdata.Code,
          COSRecordID: childdata.RecordID,
          ConsigneeDescription: childdata.Name,
        });
        setOpenCOSpopup(false);
      }
      if (type == "Buyer/other Customer") {
        setselectBOCLookupData({
          BOCCode: childdata.Code,
          BOCRecordID: childdata.RecordID,
          BOCDescription: childdata.Name,
        });
        setOpenBOCpopup(false);
      }
      if (type == "BOM") {
        setselectBOMLookupData({
          BOMCode: childdata.Code,
          BOMRecordID: childdata.BomID,
          BOMDescription: childdata.Name,
          bomCount: childdata.Count,
          bomID:childdata.BomID
        });
        setLeatherLookup({
          leatherRecID: "",
          leatherCode: "",
          leatherDescription: "",
          ProductCost: childdata.CostingPrice,
          PrimaryLeatherID: "",
        });
        setOpenBOMpopup(false);
      }
      if (type == "Proforma Invoice") {
        setselectPILookupData({
          PICode: childdata.Code,
          PIRecordID: childdata.RecordID,
          PIDescription: childdata.Name,
        });
        setOpenPIpopup(false);
      }
      if (type == "Primary Leather Type") {
        setCostingLookup({
          sampleSPriTypeLeatherID:childdata.RecordID,
          recordID:childdata.RecordID,
          costingRecID: childdata.RecordID,
          costingCode: childdata.Code,
          productPrice: childdata.Cost,
          PrimaryLeatherID: childdata.PrimaryLeatherID,
          SecondaryLeatherID: childdata.SecondaryLeatherID,
          TeritiaryLeatherID: childdata.TeritiaryLeatherID,
          SamplePrimaryType:childdata.Code,
        });
        setOpenCostingpopup(false);
      }
      if (type == "Secondary Leather Type") {
        setSecondaryTypeLeatherLookup({
          recordID: childdata.RecordID,
          code: childdata.SecondaryCode,
          SecondaryTypeLeatherID: childdata.SecondaryLeatherID,
          sampleSecTypeLeatherID:childdata.RecordID,
          SampleSecondaryType:childdata.Code
        });
        setOpenSLeatherpopup(false);
      }
      if (type == "Tertiary Leather Type") {
        setTertiaryTypeLeatherLookup({
          recordID: childdata.RecordID,
          code: childdata.TeritiaryCode,
          TertiaryTypeLeatherID: childdata.TeritiaryLeatherID,
          sampleTriTypeLeatherID:childdata.RecordID,
          SampleTertiaryType:childdata.Code
        });
        setOpenTLeatherpopup(false);
      }
      if (type == "Primary Leather") {
        setLeatherLookup({
          leatherRecID: childdata.RecordID,
          leatherCode: childdata.Code,
          leatherDescription: childdata.Name,
          ProductCost: childdata.ProductCost,
          PrimaryLeatherID: childdata.PrimaryLeatherID,
        });
        setOpenLeatherpopup(false);
      }
      if (type == "Secondary Leather") {
        setSecondaryLeatherLookup({
          recordID: childdata.RecordID,
          code: childdata.Code,
          secondaryLeatherID: childdata.RecordID,       
        })
        setOpenSecodLeatherpopup(false);
      }
      if (type == "Tertiary Leather") {
        setTertiaryLeatherLookup({
          recordID: childdata.RecordID,
          code: childdata.Code,
          tertiaryLeatherID: childdata.RecordID,       
        })
        setOpenTeriaryLeatherpopup(false);
      }
    };
  
    var prtFilterType = "";
    if (portType == "") {
      prtFilterType = DataExplore.Transit;
    } else prtFilterType = portType;
  
    portOriginFilter = `CountryRecordID =${selectCOLookupData.OCnRecordID} AND Type = '${prtFilterType}'`;
    portDestinationFilter = `CountryRecordID =${selectCFLookupData.FCnRecordID} AND Type = '${prtFilterType}'`;
  
    // Appreviation
    var invoiceBreadcrumsType;
    var apprval = "";
    var invAccessID;
    if (parentID == "L") {
      apprval = "Leather-Export";
    }
    if (parentID == "P") {
      apprval = "Product-Export";
    }
    if (parentID == "M") {
      apprval = "Material";
    }
    if (invoicefilter == "SI") {
      invAccessID = "TR073";
      invoiceBreadcrumsType = "Sample Invoice";
    }
    if (invoicefilter == "PI") {
      invAccessID = "TR073";
      invoiceBreadcrumsType = "Proforma Invoice";
    }
    if (invoicefilter == "FI") {
      invAccessID = "TR073";
      invoiceBreadcrumsType = "Final Invoice";
    }
    if (invoicefilter == "IN") {
      invAccessID = "TR011";
      invoiceBreadcrumsType = "Proforma Invoice";
    }
  
    //**********Current Date******* */
    const current = new Date();
    var month = `${current.getMonth() + 1}`;
    if (month < 10) {
      month = "0" + month;
    }
    var Day = `${current.getDate()}`;
    if (Day < 10) {
      Day = "0" + Day;
    }
    const currentdate = `${current.getFullYear()}-${month}-${Day}`;
  
    const { toggleSidebar, broken, rtl } = useProSidebar();
  
    const fnProcess = async () => {
      const props = { accessID, recID };
      const Data = await dispatch(StockProcessApi(props));
      console.log(
        "🚀 ~ file: Editdeliverychalan.jsx:1236 ~ fnProcess ~ Data:",
        Data
      );
      if (Data.payload.Status == "Y") {
        toast.success(Data.payload.Msg);
        navigate(
          `/Apps/Secondarylistview/TR011/Proforma%20Invoice/${parentID}/${invoicefilter}`
        );
      } else {
        toast.success(Data.payload.Msg);
      }
    };
  
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
            navigate(
              `/Apps/Secondarylistview/TR011/Proforma%20Invoice/${parentID}/${invoicefilter}`
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
          {!isLoading ? null : <LinearProgress />}
          <Box
            display="flex"
            justifyContent="space-between"
            p={2}
            flexDirection={{ xs: "column-reverse", sm: "row", md: "row" }}
          >
            <Box display="flex" borderRadius="3px">
              {broken && !rtl && (
                <IconButton onClick={() => toggleSidebar()}>
                  <MenuOutlinedIcon />
                </IconButton>
              )}
              <Breadcrumbs
                maxItems={2}
                aria-label="breadcrumb"
                separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
                sx={{ display: "flex", justifyItems: "center" }}
              >
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    navigate(`/Apps/TR043/Invoice Types`);
                  }}
                >
                  Invoices
                </Typography>
  
                {invoicefilter !== "IN" ? (
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => {
                      navigate(
                        `/Apps/Secondarylistview/${invAccessID}/Proforma Invoice/${parentID}`
                      );
                    }}
                  >
                    {apprval}
                  </Typography>
                ) : (
                  false
                )}
                {invoicefilter == "IN" ? (
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => {
                      navigate(
                        `/Apps/Secondarylistview/${invAccessID}/Proforma Invoice/${parentID}/${invoicefilter}`
                      );
                    }}
                  >
                    {apprval}
                  </Typography>
                ) : (
                  false
                )}
                {show == "0" ? (
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => {
                      navigate(
                        `/Apps/Secondarylistview/TR011/Proforma Invoice/${parentID}/${invoicefilter}`
                      );
                    }}
                  >
                    {invoiceBreadcrumsType}
                  </Typography>
                ) : (
                  false
                )}
                {show == "1" ? (
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => {
                      setScreen(0);
                    }}
                  >
                    {invoiceBreadcrumsType}
                  </Typography>
                ) : (
                  false
                )}
                {show == "2" ? (
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => {
                      setScreen(0);
                    }}
                  >
                    {invoiceBreadcrumsType}
                  </Typography>
                ) : (
                  false
                )}
                {show == "3" ? (
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => {
                      setScreen(0);
                    }}
                  >
                    {invoiceBreadcrumsType}
                  </Typography>
                ) : (
                  false
                )}
                {show == "4" ? (
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => {
                      setScreen(0);
                    }}
                  >
                    {invoiceBreadcrumsType}
                  </Typography>
                ) : (
                  false
                )}
                {show == "5" ? (
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => {
                      setScreen(0);
                    }}
                  >
                    {invoiceBreadcrumsType}
                  </Typography>
                ) : (
                  false
                )}
                {show == "1" ? (
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >
                    {title}
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
                   Pre Shipment
                  </Typography>
                ) : (
                  false
                )}
                {show == "3" ? (
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >
                    Account Details
                  </Typography>
                ) : (
                  false
                )}
                {show == "4" ? (
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >
                    Pre Shipment Continues
                  </Typography>
                ) : (
                  false
                )}
                  {show == "6" ? (
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >
                    Post Shipment
                  </Typography>
                ) : (
                  false
                )}
                {show == "5" ? (
                  invoicefilter == "SI" ? (
                    <Typography
                      variant="h5"
                      color="#0000D1"
                      sx={{ cursor: "default" }}
                    >
                      Generate Proforma Invoice
                    </Typography>
                  ) : (
                    <Typography
                      variant="h5"
                      color="#0000D1"
                      sx={{ cursor: "default" }}
                    >
                      Generate Final Invoice
                    </Typography>
                  )
                ) : (
                  false
                )}
              </Breadcrumbs>
            </Box>
  
            <Box display="flex" justifyContent="space-around">
              {mode !== "A" ? (
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small">Explore</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={show}
                    label="Explore"
                    onChange={proformaChange}
                  >
                    <MenuItem value={0}>{invoiceBreadcrumsType}</MenuItem>
                    <MenuItem value={1}>{title}</MenuItem>
  
                    {invoicefilter == "PI" || invoicefilter == "SI" ?(
                    <MenuItem value={2}>Trailers</MenuItem>
                    ) : (
                      ""
                    )}
                    {invoicefilter == "FI" ?(
                    <MenuItem value={2.1}>Pre Shipment</MenuItem>
                    ) : (
                      ""
                    )}
                     {invoicefilter == "FI" ?(
                    <MenuItem value={4}>Pre Shipment Continues</MenuItem>
                    ) : (
                      ""
                    )}
                     <MenuItem value={3}>Account Details</MenuItem>
                     {invoicefilter == "PI" || invoicefilter == "SI" ?(
                    <MenuItem value={4}>Other Details</MenuItem>
                    ) : (
                      ""
                    )}
                    {invoicefilter == "FI"  ?(
                    <MenuItem value={6}>Post Shipment</MenuItem>
                    ) : (
                      ""
                    )}
                   
                   
                   
                    {invoicefilter != "FI" ? (
                      <MenuItem
                        sx={{ width: "100%" }}
                        onClick={invoiceCopyFn}
                        component="button"
                      >
                        Duplicate
                      </MenuItem>
                    ) : (
                      ""
                    )}
                    {invoicefilter == "SI" ? (
                      <MenuItem value={5}>Generate Proforma Invoice</MenuItem>
                    ) : invoicefilter == "PI" ? (
                      <MenuItem value={5}>Generate Final Invoice</MenuItem>
                    ) : (
                      ""
                    )}
                    {Data.Process != "Y" ? (
                      <MenuItem onClick={fnProcess}>Process</MenuItem>
                    ) : (
                      false
                    )}
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
  
          {show == "0" ? (
            <Box m="20px">
              <Formik
                initialValues={initialValues}
                onSubmit={(values, setSubmitting) => {
                  setTimeout(() => {
                    fnSave(values);
                  }, 100);
                }}
                validationSchema={proformainvoiceSchema}
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
                        mt: "30px",
                      }}
                    >
                      <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                        {invoicefilter == "PI" ? (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Proforma Invoice No"
                            value={values.ProfoInvoiceNO}
                            id="ProfoInvoiceNO"
                            name="ProfoInvoiceNO"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Auto"
                            focused
                            inputProps={{ readOnly: true }}
                            sx={{ background: "#fff6c3" }}
                            // error={!!touched.Id && !!errors.Id}
                            // helperText={touched.Id && errors.Id}
                            onInvalid={(e) => {
                              e.target.setCustomValidity(
                                "Please Fill The FinalInvoiceNo"
                              );
                            }}
                            onInput={(e) => {
                              e.target.value = Math.max(
                                0,
                                parseInt(e.target.value)
                              )
                                .toString()
                                .slice(0, 10);
                              e.target.setCustomValidity("");
                            }}
                          />
                        ) : (
                          ""
                        )}
                        {invoicefilter == "FI" ? (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Final Invoice No"
                            value={values.FinalInvoiceNo}
                            id="FinalInvoiceNo"
                            name="FinalInvoiceNo"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Auto"
                            focused
                            inputProps={{ readOnly: true }}
                            sx={{ background: "#fff6c3" }}
                            // error={!!touched.Id && !!errors.Id}
                            // helperText={touched.Id && errors.Id}
                            onInvalid={(e) => {
                              e.target.setCustomValidity(
                                "Please Fill The FinalInvoiceNo"
                              );
                            }}
                            onInput={(e) => {
                              e.target.value = Math.max(
                                0,
                                parseInt(e.target.value)
                              )
                                .toString()
                                .slice(0, 10);
                              e.target.setCustomValidity("");
                            }}
                          />
                        ) : (
                          ""
                        )}
  
                        {/* {invoicefilter === "PI" ?(
                          <TextField
                          fullWidth
                          key={recID}
                          variant="filled"
                          type="text"
                          label="Sample Invoice ID"
                          value={values.Id}
                          id="Id"
                          name="Id"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          
                          focused
                          placeholder="Auto"
                          inputProps={{readOnly:true}}
                          sx={{background: "#fff6c3"}}
                        /> */}
                        {/* ): invoicefilter === "FI" ?(
  <TextField
                          fullWidth
                          key={recID}
                          variant="filled"
                          type="text"
                          label="Proforma Invoice ID"
                          value={values.ProfoInvoiceNO}
                          id="ProfoInvoiceNO"
                          name="ProfoInvoiceNO"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          
                          focused
                          placeholder="Auto"
                          inputProps={{readOnly:true}}
                          sx={{background: "#fff6c3"}}
                        />
                        ):( */}
                        {invoicefilter == "SI" ? (
                          <TextField
                            fullWidth
                            key={recID}
                            variant="filled"
                            type="text"
                            label="Sample Invoice ID"
                            value={values.Id}
                            id="Id"
                            name="Id"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            focused
                            placeholder="Auto"
                            inputProps={{ readOnly: true }}
                            sx={{ background: "#fff6c3" }}
                          />
                        ) : (
                          ""
                        )}
                      </FormControl>
  
                      <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                        {invoicefilter == "PI" ? (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="Date"
                            label="Proforma Invoice Date"
                            value={values.ProfoInvoiceDate}
                            id="ProfoInvoiceDate"
                            name="ProfoInvoiceDate"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputFormat="YYYY-MM-DD"
                            focused
                            // error={!!touched.Date && !!errors.Date}
                            // helperText={touched.Date && errors.Date}
                            // inputProps={{ maxLength:10}}
                            sx={{ background: "#ffe5f1" }}
                            InputProps={{
                                readOnly: true,
                              }}
                            onInvalid={(e) => {
                              e.target.setCustomValidity(
                                "Please Fill The Final InvoiceDate"
                              );
                            }}
                            onInput={(e) => {
                              e.target.setCustomValidity("");
                            }}
                          />
                        ) : (
                          ""
                        )}
                        {invoicefilter == "FI" ? (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="Date"
                            label="Final Invoice Date"
                            value={values.FinalInvoiceDate}
                            id="FinalInvoiceDate"
                            name="FinalInvoiceDate"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputFormat="YYYY-MM-DD"
                            focused
                            // error={!!touched.Date && !!errors.Date}
                            // helperText={touched.Date && errors.Date}
                            // inputProps={{ maxLength:10}}
                            sx={{ background: "#ffe5f1" }}
                            InputProps={{
                                readOnly: true,
                              }}
                            onInvalid={(e) => {
                              e.target.setCustomValidity(
                                "Please Fill The Final InvoiceDate"
                              );
                            }}
                            onInput={(e) => {
                              e.target.setCustomValidity("");
                            }}
                          />
                        ) : (
                          ""
                        )}
                        {/* {invoicefilter === "PI" ?(
                        <TextField
                          fullWidth
                          variant="filled"
                          type="Date"
                          
                         
                          label=" Sample Invoice Date"
                          value={values.Date}
                          id="Date"
                          name="Date"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          inputFormat="YYYY-MM-DD"
                          focused
                          // error={!!touched.Date && !!errors.Date}
                          // helperText={touched.Date && errors.Date}
                         
                          sx={{ background: "#ffe5f1" }}
                          onInvalid={(e) => { e.target.setCustomValidity('Please Fill The Date') }} 
                          onInput ={(e) => { e.target.setCustomValidity('') }}
                        />
                        ): invoicefilter === "FI" ?( 
                          <TextField
                          fullWidth
                          variant="filled"
                          type="Date"
                          
                         
                          label= "Proforma Invoice Date" 
                          value={values.ProfoInvoiceDate}
                          id="ProfoInvoiceDate"
                          name="ProfoInvoiceDate"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          inputFormat="YYYY-MM-DD"
                          focused
                          // error={!!touched.Date && !!errors.Date}
                          // helperText={touched.Date && errors.Date}
                         
                          sx={{ background: "#ffe5f1" }}
                          onInvalid={(e) => { e.target.setCustomValidity('Please Fill The Date') }} 
                          onInput ={(e) => { e.target.setCustomValidity('') }}
                        />
                          ):( */}
                        {invoicefilter == "SI" ? (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="Date"
                            required
                            label=" Sample Invoice Date"
                            value={values.Date}
                            id="Date"
                            name="Date"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputFormat="YYYY-MM-DD"
                            focused
                            // error={!!touched.Date && !!errors.Date}
                            // helperText={touched.Date && errors.Date}
  
                            sx={{ background: "#ffe5f1" }}
                            InputProps={{
                                readOnly: true,
                              }}
                            onInvalid={(e) => {
                              e.target.setCustomValidity("Please Fill The Date");
                            }}
                            onInput={(e) => {
                              e.target.setCustomValidity("");
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </FormControl>
                    </Box>
                    <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                    <Typography variant="h5">Customer Details:</Typography>
                    <Box
                      display="grid"
                      gap="30px"
                      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      sx={{
                        "& > div": {
                          gridColumn: isNonMobile ? undefined : "span 4",
                        },
                        mt: "30px",
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="ID"
                        variant="filled"
                        value={selectctyLookupData.CTYlookupRecordid}
                        focused
                        sx={{ display: "none" }}
                      />
  
                      <FormControl sx={{ gridColumn: "span 2", display: "flex" }}>
                        <FormControl
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="Customer"
                            variant="filled"
                            value={selectctyLookupData.CTYlookupCode}
                            focused
                            required
                            inputProps={{ tabIndex: "-1" }}
                          />
                          <IconButton
                            sx={{ height: 40, width: 40 }}
                            // onClick={() => handleShow("CTY")}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>
                          {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}
  
                          <TextField
                            id="outlined-basic"
                            label=""
                            variant="filled"
                            value={selectctyLookupData.CTYlookupDesc}
                            fullWidth
                            inputProps={{ tabIndex: "-1" }}
                            focused
                          />
                        </FormControl>
                      </FormControl>
  
                      <TextField
                        id="outlined-basic"
                        label="ID"
                        variant="filled"
                        value={selectCOSLookupData.COSRecordID}
                        focused
                        sx={{ display: "none" }}
                      />
  
                      <FormControl sx={{ gridColumn: "span 2", display: "flex" }}>
                        <FormControl
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="Consignee"
                            variant="filled"
                            value={selectCOSLookupData.ConsigneeCode}
                            focused
                            required
                            inputProps={{ tabIndex: "-1" }}
                          />
                          <IconButton
                            sx={{ height: 40, width: 40 }}
                            // onClick={() => handleShow("COS")}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>
                          {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}
  
                          <TextField
                            id="outlined-basic"
                            label=""
                            variant="filled"
                            value={selectCOSLookupData.ConsigneeDescription}
                            fullWidth
                            inputProps={{ tabIndex: "-1" }}
                            focused
                          />
                        </FormControl>
                      </FormControl>
  
                      <TextField
                        id="outlined-basic"
                        label="ID"
                        variant="filled"
                        value={selectBOCLookupData.BOCRecordID}
                        focused
                        sx={{ display: "none" }}
                      />
  
                      <FormControl sx={{ gridColumn: "span 2", display: "flex" }}>
                        <FormControl
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="Buyer/Other Customer"
                            variant="filled"
                            value={selectBOCLookupData.BOCCode}
                            focused
                            required
                            inputProps={{ tabIndex: "-1" }}
                          />
                          <IconButton
                            sx={{ height: 40, width: 40 }}
                            // onClick={() => handleShow("BOC")}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>
                          {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}
  
                          <TextField
                            id="outlined-basic"
                            label=""
                            variant="filled"
                            value={selectBOCLookupData.BOCDescription}
                            fullWidth
                            inputProps={{ tabIndex: "-1" }}
                            focused
                          />
                        </FormControl>
                      </FormControl>
                      <FormControl sx={{ gridColumn: "span 2" }}>
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Description of Goods"
                          value={values.OrderBrief}
                          id="OrderBrief"
                          name="OrderBrief"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          focused
                          multiline
                          error={!!touched.OrderBrief && !!errors.OrderBrief}
                          helperText={touched.OrderBrief && errors.OrderBrief}
                          InputProps={{
                            readOnly: true,
                          }}
                          inputProps={{ maxLength: 300 }}
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Description of Good"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                      </FormControl>
                    </Box>
                    <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                    <Typography variant="h5">Reference Details:</Typography>
                    <Box
                      display="grid"
                      gap="30px"
                      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      sx={{
                        "& > div": {
                          gridColumn: isNonMobile ? undefined : "span 4",
                        },
                        mt: "30px",
                      }}
                    >
                      <FormControl sx={{ gridColumn: "span 2" }}>
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Customer Order #"
                          value={values.ProformaNo}
                          id="ProformaNo"
                          name="ProformaNo"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          focused
                          error={!!touched.ProformaNo && !!errors.ProformaNo}
                          helperText={touched.ProformaNo && errors.ProformaNo}
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Customer Order #"
                            );
                          }}
                          onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value))
                              .toString()
                              .slice(0, 5);
                            e.target.setCustomValidity("");
                          }}
                          sx={{ background: "#fff6c3" }}
                            InputProps={{
                                readOnly: true,
                            inputProps: {
                               style: { textAlign: "right" },
                            }, 
                          }}
                        />
                      </FormControl>
  
                      <FormControl sx={{ gridColumn: "span 2" }}>
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="LC"
                          value={values.Sample}
                          id="Sample"
                          name="Sample"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          focused
                          error={!!touched.Sample && !!errors.Sample}
                          helperText={touched.Sample && errors.Sample}
                          inputProps={{ maxLength: 15 }}
                          InputProps={{
                            readOnly: true,
                          }}
                          onInvalid={(e) => {
                            e.target.setCustomValidity("Please Fill The LC");
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                      </FormControl>
                      <FormControl sx={{ gridColumn: "span 2" }}>
                        <TextField
                          fullWidth
                          variant="filled"
                          type="date"
                          label="LC Date"
                          value={values.Plcreated}
                          id="Plcreated"
                          name="Plcreated"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          inputFormat="YYYY-MM-DD"
                          focused
                          error={!!touched.Plcreated && !!errors.Plcreated}
                          helperText={touched.Plcreated && errors.Plcreated}
                          // inputProps={{ maxLength:10}}
                          sx={{ background: "#ffe5f1" }}
                          InputProps={{
                            readOnly: true,
                          }}
                          onInvalid={(e) => {
                            e.target.setCustomValidity("Please Fill The LC Date");
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                      </FormControl>
  
                      <TextField
                        id="outlined-basic"
                        label="ID"
                        variant="filled"
                        value={selectcurLookupData.CURlookupRecordid}
                        focused
                        sx={{ display: "none" }}
                      />
  
                      <FormControl sx={{ gridColumn: "span 2", display: "flex" }}>
                        {/* <FormLabel>Currency</FormLabel> */}
                        <FormControl
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="Currency"
                            variant="filled"
                            value={selectcurLookupData.CURlookupCode}
                            focused
                            required
                            inputProps={{ tabIndex: "-1" }}
                          />
                          <IconButton
                            sx={{ height: 40, width: 40 }}
                            // onClick={() => handleShow("CUR")}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>
                          {/* <MoreHorizIcon onClick={()=>handleShow('CUR')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}
  
                          <TextField
                            id="outlined-basic"
                            label=""
                            variant="filled"
                            value={selectcurLookupData.CURlookupDesc}
                            fullWidth
                            inputProps={{ tabIndex: "-1" }}
                            focused
                          />
                        </FormControl>
                      </FormControl>
                      {/* <TextField
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
                        sx={{ gridColumn: "span 2",background: "#fff6c3" }}
                        focused
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" ,},
                          },
                        }}
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 11);
                        }}
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
                    </Box>
{/*   
                    <Box display="flex" justifyContent="end" mt="20px" gap={2}>
                      {YearFlag == "true" ? (
                        <LoadingButton
                          color="secondary"
                          variant="contained"
                          type="submit"
                          loading={isPostLoading}
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
                        type="submit"
                        color="warning"
                        variant="contained"
                        onClick={() => {
                          navigate(
                            `/Apps/Secondarylistview/TR011/Proforma%20Invoice/${parentID}/${invoicefilter}`
                          );
                        }}
                      >
                        Cancel
                      </Button>
                    </Box> */}
                  </form>
                )}
              </Formik>
              <Popup
                title="Customer"
                openPopup={openCTYpopup}
                setOpenPopup={setOpenCTYpopup}
              >
                <Listviewpopup
                  accessID="2009"
                  screenName="Customer"
                  childToParent={childToParent}
                  filterName={"compID"}
                  filterValue={CompanyID}
                />
              </Popup>
              <Popup
                title="Currency"
                openPopup={openCURpopup}
                setOpenPopup={setOpenCURpopup}
              >
                <Listviewpopup
                  accessID="2037"
                  screenName="Currency"
                  childToParent={childToParent}
                />
              </Popup>
              <Popup
                title="Consignee"
                openPopup={openCOSpopup}
                setOpenPopup={setOpenCOSpopup}
              >
                <Listviewpopup
                  accessID="2009"
                  screenName="Consignee"
                  childToParent={childToParent}
                />
              </Popup>
              <Popup
                title="Buyer/other Customer"
                openPopup={openBOCpopup}
                setOpenPopup={setOpenBOCpopup}
              >
                <Listviewpopup
                  accessID="2009"
                  screenName="Buyer/other Customer"
                  childToParent={childToParent}
                />
              </Popup>
            </Box>
          ) : (
            false
          )}
  
          {show == "1" ? (
            <Box m="20px" sx={{ m: 2 }}>
              <Formik
                initialValues={initialValues}
                enableReinitialize={true}
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
                      <FormControl sx={{ gridColumn: "span 2" }}>
                        {invoicefilter == "SI" ? (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="Text"
                            label="Sample Invoice ID"
                            value={values.Id}
                            id="Id"
                            name="Id"
                            sx={{ background: "#fff6c3" }}
                            focused
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        ) : (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label={`${
                              invoicefilter == "PI"
                                ? "Proforma Invoice No "
                                : "Final Invoice No"
                            }`}
                            value={
                              invoicefilter == "PI"
                                ? values.ProfoInvoiceNO
                                : values.FinalInvoiceNo
                            }
                            sx={{ background: "#fff6c3" }}
                            focused
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        )}
                      </FormControl>
                      <FormControl sx={{ gridColumn: "span 2" }}>
                        {invoicefilter == "SI" ? (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="Date"
                            label="Sample Invoice Date"
                            value={values.Date}
                            id="Date"
                            name="Date"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputFormat="YYYY-MM-DD"
                            focused
                            error={!!touched.Date && !!errors.Date}
                            helperText={touched.Date && errors.Date}
                            // inputProps={{ maxLength:10}}
                            sx={{ background: "#ffe5f1" }}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        ) : (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="Date"
                            label={`${
                              invoicefilter == "PI"
                                ? "Proforma Invoice Date "
                                : "Final Invoice Date"
                            }`}
                            value={
                              invoicefilter == "PI"
                                ? values.ProfoInvoiceDate
                                : values.FinalInvoiceDate
                            }
                            id="Date"
                            name="Date"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputFormat="YYYY-MM-DD"
                            focused
                            sx={{ background: "#ffe5f1" }}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        )}
                      </FormControl>
  
                      <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
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
  
                      <FormControl
                        sx={{ gridColumn: "span 2", gap: "40px", mt: "40px" }}
                      >
                        <Formik
                          innerRef={ref}
                          initialValues={detailInitialvalues}
                          onSubmit={(values, { resetForm }) => {
                            setTimeout(() => {
                              invoicefilter == "FI" && parentID == "P"
                                ? toast.error("No Need To Add Product Items")
                                : fnDetailsave(values, resetForm);
                            }, 100);
                          }}
                          validationSchema={proformaitemsSchema}
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
                              {/* Product */}
                              {parentID == "P" ? (
                                <React.Fragment>
                                  <Box sx={{ marginRight: "5px" }}>
                                    <Field
                                      type="checkbox"
                                      name="Sample"
                                      id="Sample"
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      as={Checkbox}
                                      InputProps={{
                                        readOnly: true,
                                      }}
                                    />
                                    <FormLabel focused={false}>Sample</FormLabel>
                                  </Box>
                                  {values.Sample ? (
                                    <FormControl
                                      sx={{
                                        gridColumn: "span 2",
                                        gap: "30px",
                                        width: "100%",
                                        mt: 5,
                                      }}
                                      key={values.Sample}
                                    >
    <TextField
                                        id="psID"
                                        label="ID"
                                        variant="filled"
                                        value={
                                          selectCPLookupData.CPlookupRecordid
                                        }
                                        focused
                                        sx={{ display: "none" }}
                                      />
  
                                      <FormControl
                                        sx={{
                                          gridColumn: "span 2",
                                          display: "flex",
                                        }}
                                      >
                                        <FormControl
                                          sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                          }}
                                        >
                                          <TextField
                                            id="psCode"
                                            label="Product ID"
                                            variant="filled"
                                            value={
                                              selectCPLookupData.CPlookupCode
                                            }
                                            focused
                                            required
                                            inputProps={{ tabIndex: "-1" }}
                                          />
                                          <IconButton
                                            sx={{ height: 40, width: 40 }}
                                            // onClick={() => handleShow("CP")}
                                          >
                                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                          </IconButton>
                                          <TextField
                                            id="psDesc"
                                            label=""
                                            variant="filled"
                                            value={
                                              selectCPLookupData.CPlookupDesc
                                            }
                                            fullWidth
                                            inputProps={{ tabIndex: "-1" }}
                                            focused
                                          />
                                        </FormControl>
                                      </FormControl>
                                      <FormControl
                                        sx={{
                                          gridColumn: "span 2",
                                          display: "flex",
                                        }}
                                      >
                                        <FormControl
                                          sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                          }}
                                        >
                                          <TextField
                                            id="psCode"
                                            label="BOM "
                                            variant="filled"
                                            value={selectBOMLookupData.BOMCode}
                                            focused
                                            required
                                            inputProps={{ tabIndex: "-1" }}
                                          />
                                          <IconButton
                                            sx={{ height: 40, width: 40 }}
                                            // onClick={() => handleShow("BOM")}
                                          >
                                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                          </IconButton>
                                          <TextField
                                            id="psDesc"
                                            label=""
                                            variant="filled"
                                            value={
                                              selectBOMLookupData.BOMDescription
                                            }
                                            fullWidth
                                            inputProps={{ tabIndex: "-1" }}
                                            focused
                                          />
                                        </FormControl>
                                      </FormControl>
                                      <FormControl
                                        fullWidth
                                        sx={{
                                          display: "flex",
                                          flexDirection: "row",
                                          gridColumn: "span 2",
                                          gap: "20px",
                                          //  mt: "10px",
                                        }}
                                      >
                                        {selectBOMLookupData.bomCount == "1" ||
                                        selectBOMLookupData.bomCount == "2" ||
                                        selectBOMLookupData.bomCount == "3" ? (
                                          <Box
                                            sx={{
                                              display: "flex",
                                              flexDirection: "row",
                                              alignItems: "center",
                                            }}
                                          >
                                            <TextField
                                              fullWidth
                                              id="psCode"
                                              label="Primary Leather Type"
                                              variant="filled"
                                              value={costingLookup.SamplePrimaryType}
                                              focused
                                              required
                                              inputProps={{ tabIndex: "-1" }}
                                            />
                                            <IconButton
                                              sx={{ height: 40, width: 40 }}
                                            //   onClick={() => handleShow("COST")}
                                            >
                                              <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                            </IconButton>
                                          </Box>
                                        ) : (
                                          false
                                        )}
                                        {selectBOMLookupData.bomCount == "2" ||
                                        selectBOMLookupData.bomCount == "3" ? (
                                          <Box
                                            sx={{
                                              display: "flex",
                                              flexDirection: "row",
                                              alignItems: "center",
                                              gridColumn: "span 2",
                                            }}
                                          >
                                            <TextField
                                              fullWidth
                                              id="psCode"
                                              label="Secondary Leather Type"
                                              variant="filled"
                                              value={
                                                secondaryTypeLeatherLookup.SampleSecondaryType
                                              }
                                              focused
                                              required
                                              inputProps={{ tabIndex: "-1" }}
                                            />
                                            <IconButton
                                              sx={{ height: 40, width: 40 }}
                                            //   onClick={() => handleShow("SLEATHER")}
                                            >
                                              <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                            </IconButton>
                                          </Box>
                                        ) : (
                                          false
                                        )}
                                        {selectBOMLookupData.bomCount == "3" ? (
                                          <Box
                                            sx={{
                                              display: "flex",
                                              flexDirection: "row",
                                              alignItems: "center",
                                              gridColumn: "span 2",
                                            }}
                                          >
                                            <TextField
                                              fullWidth
                                              id="psCode"
                                              label="tertiary Leather Type"
                                              variant="filled"
                                              value={
                                                tertiaryTypeLeatherLookup.SampleTertiaryType
                                              }
                                              focused
                                              required
                                              inputProps={{ tabIndex: "-1" }}
                                            />
                                            <IconButton
                                              sx={{ height: 40, width: 40 }}
                                            //   onClick={() => handleShow("TLEATHER")}
                                            >
                                              <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                            </IconButton>
                                          </Box>
                                        ) : (
                                          false
                                        )}
                                      </FormControl>
  
                                      <FormControl
                                        fullWidth
                                        sx={{
                                          display: "flex",
                                          flexDirection: "row",
                                          gridColumn: "span 2",
                                          gap: "20px",
                                        }}
                                      >
                                        {selectBOMLookupData.bomCount == "1" ||
                                        selectBOMLookupData.bomCount == "2" ||
                                        selectBOMLookupData.bomCount == "3" ? (
                                          <Box
                                            sx={{
                                              display: "flex",
                                              flexDirection: "row",
                                              alignItems: "center",
                                            }}
                                          >
                                            <TextField
                                              id="psCode"
                                              label="Primary Leather"
                                              required
                                              variant="filled"
                                              value={leatherLookup.leatherCode}
                                              focused
                                              inputProps={{ tabIndex: "-1" }}
                                            />
                                            <IconButton
                                              sx={{ height: 40, width: 40 }}
                                            //   onClick={() =>
                                            //     handleShow("LEATHER")
                                            //   }
                                            >
                                              <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                            </IconButton>
                                          </Box>
                                        ) : (
                                          false
                                        )}
                                        {selectBOMLookupData.bomCount == "2" ||
                                        selectBOMLookupData.bomCount == "3" ? (
                                          <Box
                                            sx={{
                                              display: "flex",
                                              flexDirection: "row",
                                              alignItems: "center",
                                              gridColumn: "span 2",
                                            }}
                                          >
                                            <TextField
                                              id="psCode"
                                              label="Secondary Leather"
                                              required
                                              variant="filled"
                                              value={secondaryLeatherLookup.code}
                                              focused
                                              inputProps={{ tabIndex: "-1" }}
                                            />
                                            <IconButton
                                              sx={{ height: 40, width: 40 }}
                                            //   onClick={() =>
                                            //     handleShow("SECONDLEATHER")
                                            //   }
                                            >
                                              <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                            </IconButton>
                                          </Box>
                                        ) : (
                                          false
                                        )}
                                        {selectBOMLookupData.bomCount == "3" ? (
                                          <Box
                                            sx={{
                                              display: "flex",
                                              flexDirection: "row",
                                              alignItems: "center",
                                              gridColumn: "span 2",
                                            }}
                                          >
                                            <TextField
                                              id="psCode"
                                              label="Tertiary Leather"
                                              required
                                              variant="filled"
                                              value={tertiaryLeatherLookup.code}
                                              focused
                                              inputProps={{ tabIndex: "-1" }}
                                            />
                                            <IconButton
                                              sx={{ height: 40, width: 40 }}
                                            //   onClick={() =>
                                            //     handleShow("THIRDLEATHER")
                                            //   }
                                            >
                                              <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                            </IconButton>
                                          </Box>
                                        ) : (
                                          false
                                        )}
                                      </FormControl>
  
                                
  
                                      <TextField
                                        fullWidth
                                        variant="filled"
                                        type="number"
                                        label={`Rate (${selectcurLookupData.CURlookupCode})`}
                                        id="Rate"
                                        required
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.Rate}
                                        name="Rate"
                                        error={!!touched.Rate && !!errors.Rate}
                                        helperText={touched.Rate && errors.Rate}
                                        sx={{
                                          gridColumn: "span 2",
                                          background: "#fff6c3",
                                          input: { textAlign: "right" },
                                        }}
                                        focused
                                        InputProps={{ readOnly: true }}
                                        onInvalid={(e) => {
                                          e.target.setCustomValidity(
                                            "Please Fill The Rate"
                                          );
                                        }}
                                        onInput={(e) => {
                                          // e.target.value = Math.max(0, parseInt(e.target.value))
                                          //   .toString()
                                          //   .slice(0, 8);
                                          e.target.setCustomValidity("");
                                        }}
                                      />
                                      <TextField
                                        fullWidth
                                        variant="filled"
                                        type="number"
                                        label="Quantity"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        id="ProductQuantity"
                                        name="ProductQuantity"
                                        value={values.ProductQuantity}
                                        error={
                                          !!touched.ProductQuantity &&
                                          !!errors.ProductQuantity
                                        }
                                        helperText={
                                          touched.ProductQuantity &&
                                          errors.ProductQuantity
                                        }
                                        sx={{
                                          gridColumn: "span 2",
                                          background: "#fff6c3",
                                        }}
                                        focused
                                        InputProps={{
                                            readOnly : true,
                                          inputProps: {
                                            style: { textAlign: "right" },
                                          },
                                        }}
                                        onInvalid={(e) => {
                                          e.target.setCustomValidity(
                                            "Please Fill The Quantity"
                                          );
                                        }}
                                        onInput={(e) => {
                                          e.target.value = Math.max(
                                            0,
                                            parseInt(e.target.value)
                                          )
                                            .toString()
                                            .slice(0, 5);
                                          e.target.setCustomValidity("");
                                        }}
                                        required
                                      />
  
                                      {/* <Box
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
                                              fnDetailsave(
                                                values,
                                                resetForm,
                                                "harddelete"
                                              );
                                            }}
                                          >
                                            delete
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
                                      </Box> */}
                                      <Popup
                                        title="Product"
                                        openPopup={openCPpopup}
                                        setOpenPopup={setOpenCPpopup}
                                      >
                                        <Listviewpopup
                                          accessID="2064"
                                          screenName="Product"
                                          childToParent={childToParent}
                                         
                                        />
                                      </Popup>
                                      <Popup
                                        title="BOM"
                                        openPopup={openBOMpopup}
                                        setOpenPopup={setOpenBOMpopup}
                                      >
                                        <Listviewpopup
                                          accessID="2019"
                                          screenName="BOM"
                                          childToParent={childToParent}
                                          filterValue={
                                            selectCPLookupData.CPlookupRecordid
                                          }
                                          filterName="parentID"
                                        />
                                      </Popup>
  
                                      <Popup
                                        title="Primary Leather Type"
                                        openPopup={openCostingpopup}
                                        setOpenPopup={setOpenCostingpopup}
                                      >
                                        <Listviewpopup
                                          accessID="2061"
                                          screenName="Primary Leather Type"
                                          childToParent={childToParent}
                                     
                                        />
                                      </Popup>
                                      <Popup
                                        title="Secondary Leather Type"
                                        openPopup={openSLeatherpopup}
                                        setOpenPopup={setOpenSLeatherpopup}
                                      >
                                        <Listviewpopup
                                          accessID="2061"
                                          screenName="Secondary Leather Type"
                                          childToParent={childToParent}
  
                                        />
                                      </Popup>
                                      <Popup
                                        title="Tertiary Leather Type"
                                        openPopup={openTLeatherpopup}
                                        setOpenPopup={setOpenTLeatherpopup}
                                      >
                                        <Listviewpopup
                                          accessID="2061"
                                          screenName="Tertiary Leather Type"
                                          childToParent={childToParent}
  
                                        />
                                      </Popup>
                                      <Popup
                                        title="Primary Leather"
                                        openPopup={openLeatherpopup}
                                        setOpenPopup={setOpenLeatherpopup}
                                      >
                                        <Listviewpopup
                                          accessID="2063"
                                          screenName="Primary Leather"
                                          childToParent={childToParent}
                                          filterValue={`${costingLookup.sampleSPriTypeLeatherID}`}
                                          filterName="parentID"
                                        />
                                      </Popup>
                                      <Popup
                                        title="Secondary Leather"
                                        openPopup={openSecodLeatherpopup}
                                        setOpenPopup={setOpenSecodLeatherpopup}
                                      >
                                        <Listviewpopup
                                          accessID="2063"
                                          screenName="Secondary Leather"
                                          childToParent={childToParent}
                                          filterValue={`${secondaryTypeLeatherLookup.sampleSecTypeLeatherID}`}
                                          filterName="parentID"
                                        />
                                      </Popup>
                                      <Popup
                                        title="Tertiary Leather"
                                        openPopup={openTeriaryLeatherpopup}
                                        setOpenPopup={setOpenTeriaryLeatherpopup}
                                      >
                                        <Listviewpopup
                                          accessID="2063"
                                          screenName="Tertiary Leather"
                                          childToParent={childToParent}
                                          filterValue={`${tertiaryTypeLeatherLookup.sampleTriTypeLeatherID}`}
                                          filterName="parentID"
                                        />
                                      </Popup>
                                    </FormControl>
                                  ) : (
                                    <FormControl
                                      sx={{
                                        gridColumn: "span 2",
                                        gap: "30px",
                                        width: "100%",
                                        mt: 5,
                                      }}
                                      key={values.Sample}
                                    >
                                      <TextField
                                        id="psID"
                                        label="ID"
                                        variant="filled"
                                        value={
                                          selectCPLookupData.CPlookupRecordid
                                        }
                                        focused
                                        sx={{ display: "none" }}
                                      />
  
                                      <FormControl
                                        sx={{
                                          gridColumn: "span 2",
                                          display: "flex",
                                        }}
                                      >
                                        <FormControl
                                          sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                          }}
                                        >
                                          <TextField
                                            id="psCode"
                                            label="Product ID"
                                            variant="filled"
                                            value={
                                              selectCPLookupData.CPlookupCode
                                            }
                                            focused
                                            required
                                            inputProps={{ tabIndex: "-1" }}
                                          />
                                          <IconButton
                                            sx={{ height: 40, width: 40 }}
                                            // onClick={() => handleShow("CP")}
                                          >
                                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                          </IconButton>
                                          <TextField
                                            id="psDesc"
                                            label=""
                                            variant="filled"
                                            value={
                                              selectCPLookupData.CPlookupDesc
                                            }
                                            fullWidth
                                            inputProps={{ tabIndex: "-1" }}
                                            focused
                                          />
                                        </FormControl>
                                      </FormControl>
                                      <FormControl
                                        sx={{
                                          gridColumn: "span 2",
                                          display: "flex",
                                        }}
                                      >
                                        <FormControl
                                          sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                          }}
                                        >
                                          <TextField
                                            id="psCode"
                                            label="BOM "
                                            variant="filled"
                                            value={selectBOMLookupData.BOMCode}
                                            focused
                                            required
                                            fullWidth
                                            inputProps={{ tabIndex: "-1" }}
                                          />
                                          <IconButton
                                            sx={{ height: 40, width: 40 }}
                                            // onClick={() => handleShow("BOM")}
                                          >
                                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                          </IconButton>
                                          {/* <TextField
                                            id="psDesc"
                                            label=""
                                            variant="filled"
                                            value={
                                              selectBOMLookupData.BOMDescription
                                            }
                                            fullWidth
                                            inputProps={{ tabIndex: "-1" }}
                                            focused
                                          /> */}
                                        </FormControl>
                                      </FormControl>
                                     {selectBOMLookupData.bomCount != "0" ? <FormControl
                                        fullWidth
                                        sx={{
                                          display: "flex",
                                          flexDirection: "row",
                                          gridColumn: "span 2",
                                          gap: "20px",
                                          //  mt: "10px",
                                        }}
                                      >
                                        {selectBOMLookupData.bomCount == "1" ||
                                        selectBOMLookupData.bomCount == "2" ||
                                        selectBOMLookupData.bomCount == "3" ? (
                                          <Box
                                            sx={{
                                              display: "flex",
                                              flexDirection: "row",
                                              alignItems: "center",
                                            }}
                                          >
                                            <TextField
                                              fullWidth
                                              id="psCode"
                                              label="Primary Leather Type"
                                              variant="filled"
                                              value={costingLookup.costingCode}
                                              focused
                                              required
                                              inputProps={{ tabIndex: "-1" }}
                                            />
                                            <IconButton
                                              sx={{ height: 40, width: 40 }}
                                            //   onClick={() => handleShow("COST")}
                                            >
                                              <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                            </IconButton>
                                          </Box>
                                        ) : (
                                          false
                                        )}
                                        {selectBOMLookupData.bomCount == "2" ||
                                        selectBOMLookupData.bomCount == "3" ? (
                                          <Box
                                            sx={{
                                              display: "flex",
                                              flexDirection: "row",
                                              alignItems: "center",
                                              gridColumn: "span 2",
                                            }}
                                          >
                                            <TextField
                                              fullWidth
                                              id="psCode"
                                              label="Secondary Leather Type"
                                              variant="filled"
                                              value={
                                                secondaryTypeLeatherLookup.code
                                              }
                                              focused
                                              required
                                              inputProps={{ tabIndex: "-1" }}
                                            />
                                            <IconButton
                                              sx={{ height: 40, width: 40 }}
                                            //   onClick={() => handleShow("SLEATHER")}
                                            >
                                              <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                            </IconButton>
                                          </Box>
                                        ) : (
                                          false
                                        )}
                                        {selectBOMLookupData.bomCount == "3" ? (
                                          <Box
                                            sx={{
                                              display: "flex",
                                              flexDirection: "row",
                                              alignItems: "center",
                                              gridColumn: "span 2",
                                            }}
                                          >
                                            <TextField
                                              fullWidth
                                              id="psCode"
                                              label="tertiary Leather Type"
                                              variant="filled"
                                              value={
                                                tertiaryTypeLeatherLookup.code
                                              }
                                              focused
                                              required
                                              inputProps={{ tabIndex: "-1" }}
                                            />
                                            <IconButton
                                              sx={{ height: 40, width: 40 }}
                                            //   onClick={() => handleShow("TLEATHER")}
                                            >
                                              <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                            </IconButton>
                                          </Box>
                                        ) : (
                                          false
                                        )}
                                      </FormControl>:false}
  
                                      {selectBOMLookupData.bomCount != "0" ?<FormControl
                                        fullWidth
                                        sx={{
                                          display: "flex",
                                          flexDirection: "row",
                                          gridColumn: "span 2",
                                          gap: "20px",
                                        }}
                                      >
                                        {selectBOMLookupData.bomCount == "1" ||
                                        selectBOMLookupData.bomCount == "2" ||
                                        selectBOMLookupData.bomCount == "3" ? (
                                          <Box
                                            sx={{
                                              display: "flex",
                                              flexDirection: "row",
                                              alignItems: "center",
                                            }}
                                          >
                                            <TextField
                                              id="psCode"
                                              label="Primary Leather"
                                              required
                                              variant="filled"
                                              value={leatherLookup.leatherCode}
                                              focused
                                              inputProps={{ tabIndex: "-1" }}
                                            />
                                            <IconButton
                                              sx={{ height: 40, width: 40 }}
                                            //   onClick={() =>
                                            //     handleShow("LEATHER")
                                            //   }
                                            >
                                              <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                            </IconButton>
                                          </Box>
                                        ) : (
                                          false
                                        )}
                                        {selectBOMLookupData.bomCount == "2" ||
                                        selectBOMLookupData.bomCount == "3" ? (
                                          <Box
                                            sx={{
                                              display: "flex",
                                              flexDirection: "row",
                                              alignItems: "center",
                                              gridColumn: "span 2",
                                            }}
                                          >
                                            <TextField
                                              id="psCode"
                                              label="Secondary Leather"
                                              required
                                              variant="filled"
                                              value={secondaryLeatherLookup.code}
                                              focused
                                              inputProps={{ tabIndex: "-1" }}
                                            />
                                            <IconButton
                                              sx={{ height: 40, width: 40 }}
                                            //   onClick={() =>
                                            //     handleShow("SECONDLEATHER")
                                            //   }
                                            >
                                              <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                            </IconButton>
                                          </Box>
                                        ) : (
                                          false
                                        )}
                                        {selectBOMLookupData.bomCount == "3" ? (
                                          <Box
                                            sx={{
                                              display: "flex",
                                              flexDirection: "row",
                                              alignItems: "center",
                                              gridColumn: "span 2",
                                            }}
                                          >
                                            <TextField
                                              id="psCode"
                                              label="Tertiary Leather"
                                              required
                                              variant="filled"
                                              value={tertiaryLeatherLookup.code}
                                              focused
                                              inputProps={{ tabIndex: "-1" }}
                                            />
                                            <IconButton
                                              sx={{ height: 40, width: 40 }}
                                            //   onClick={() =>
                                            //     handleShow("THIRDLEATHER")
                                            //   }
                                            >
                                              <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                            </IconButton>
                                          </Box>
                                        ) : (
                                          false
                                        )}
                                      </FormControl>:false}
  
                                
  
                                      <TextField
                                        fullWidth
                                        variant="filled"
                                        type="number"
                                        label={`Rate (${selectcurLookupData.CURlookupCode})`}
                                        id="Rate"
                                        required
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.Rate}
                                        name="Rate"
                                        error={!!touched.Rate && !!errors.Rate}
                                        helperText={touched.Rate && errors.Rate}
                                        sx={{
                                          gridColumn: "span 2",
                                          background: "#fff6c3",
                                          input: { textAlign: "right" },
                                        }}
                                        focused
                                        InputProps={{ readOnly: true }}
                                        onInvalid={(e) => {
                                          e.target.setCustomValidity(
                                            "Please Fill The Rate"
                                          );
                                        }}
                                        onInput={(e) => {
                                          // e.target.value = Math.max(0, parseInt(e.target.value))
                                          //   .toString()
                                          //   .slice(0, 8);
                                          e.target.setCustomValidity("");
                                        }}
                                      />
                                      <TextField
                                        fullWidth
                                        variant="filled"
                                        type="number"
                                        label="Quantity"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        id="ProductQuantity"
                                        name="ProductQuantity"
                                        value={values.ProductQuantity}
                                        error={
                                          !!touched.ProductQuantity &&
                                          !!errors.ProductQuantity
                                        }
                                        helperText={
                                          touched.ProductQuantity &&
                                          errors.ProductQuantity
                                        }
                                        sx={{
                                          gridColumn: "span 2",
                                          background: "#fff6c3",
                                        }}
                                        focused
                                        InputProps={{
                                            readOnly : true,
                                          inputProps: {
                                            style: { textAlign: "right" },
                                          },
                                        }}
                                        onInvalid={(e) => {
                                          e.target.setCustomValidity(
                                            "Please Fill The Quantity"
                                          );
                                        }}
                                        onInput={(e) => {
                                          e.target.value = Math.max(
                                            0,
                                            parseInt(e.target.value)
                                          )
                                            .toString()
                                            .slice(0, 5);
                                          e.target.setCustomValidity("");
                                        }}
                                        required
                                      />
  
                                      <TextField
                                        id="psID"
                                        label="ID"
                                        variant="filled"
                                        value={selectBOMLookupData.BOMRecordID}
                                        focused
                                        sx={{ display: "none" }}
                                      />
  
                                      {invoicefilter !== "FI" ? (
                                        boMode !== "A" ? (
                                          <FormControl
                                            sx={{
                                              display: "flex",
                                              flexDirection: "row",
                                              justifyContent: "space-between",
                                            }}
                                          >
                                            <TextField
                                              name="gpCard"
                                              label="Production Number"
                                              id="gpCard"
                                              variant="filled"
                                              placeholder="Auto"
                                              multiline
                                              focused
                                              sx={{ w: 100 }}
                                              value={values.gpCard}
                                              onBlur={handleBlur}
                                              onChange={handleChange}
                                              inputProps={{ readOnly: true }}
                                            />
                                            {batchStarted == 0 ? (
                                              <Box>
                                                <LoadingButton
                                                  // sx={{ h: 55, w: 70, mt: 1 }}
                                                  variant="contained"
                                                  color="primary"
                                                  onClick={() => {
                                                    fngpCard(values);
                                                  }}
                                                  loading={cardLoad}
                                                >
                                                  Generate Production card
                                                </LoadingButton>
                                              </Box>
                                            ) : (
                                              <Box>
                                                <Button
                                                  variant="contained"
                                                  sx={{ h: 55, w: 70, mt: 1 }}
                                                  disabled
                                                >
                                                  {" "}
                                                  Work In Progress
                                                </Button>
                                              </Box>
                                            )}
                                          </FormControl>
                                        ) : (
                                          false
                                        )
                                      ) : (
                                        false
                                      )}
  
                                      {/* <Box
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
                                              fnDetailsave(
                                                values,
                                                resetForm,
                                                "harddelete"
                                              );
                                            }}
                                          >
                                            delete
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
                                      </Box> */}
                                      <Popup
                                        title="Product"
                                        openPopup={openCPpopup}
                                        setOpenPopup={setOpenCPpopup}
                                      >
                                        <Listviewpopup
                                          accessID="2027"
                                          screenName="Product"
                                          childToParent={childToParent}
                                          filterValue={customerID}
                                          filterName="parentID"
                                        />
                                      </Popup>
                                      <Popup
                                        title="Primary Leather Type"
                                        openPopup={openCostingpopup}
                                        setOpenPopup={setOpenCostingpopup}
                                      >
                                        <Listviewpopup
                                          accessID="2058"
                                          screenName="Primary Leather Type"
                                          childToParent={childToParent}
                                          filterValue={`${selectBOMLookupData.BOMRecordID}' AND CustomerRecordID ='${selectctyLookupData.CTYlookupRecordid}' AND ProductRecordID='${selectCPLookupData.CPlookupRecordid}`}
                                          filterName="parentID"
                                        />
                                      </Popup>
                                      <Popup
                                        title="Secondary Leather Type"
                                        openPopup={openSLeatherpopup}
                                        setOpenPopup={setOpenSLeatherpopup}
                                      >
                                        <Listviewpopup
                                          accessID="2058"
                                          screenName="Secondary Leather Type"
                                          childToParent={childToParent}
                                          filterValue={`${selectBOMLookupData.BOMRecordID}' AND CustomerRecordID ='${selectctyLookupData.CTYlookupRecordid}' AND ProductRecordID='${selectCPLookupData.CPlookupRecordid}`}
                                          filterName="parentID"
                                        />
                                      </Popup>
                                      <Popup
                                        title="Tertiary Leather Type"
                                        openPopup={openTLeatherpopup}
                                        setOpenPopup={setOpenTLeatherpopup}
                                      >
                                        <Listviewpopup
                                          accessID="2058"
                                          screenName="Tertiary Leather Type"
                                          childToParent={childToParent}
                                          filterValue={`${selectBOMLookupData.BOMRecordID}' AND CustomerRecordID ='${selectctyLookupData.CTYlookupRecordid}' AND ProductRecordID='${selectCPLookupData.CPlookupRecordid}`}
                                          filterName="parentID"
                                        />
                                      </Popup>
                                      <Popup
                                        title="Primary Leather"
                                        openPopup={openLeatherpopup}
                                        setOpenPopup={setOpenLeatherpopup}
                                      >
                                        <Listviewpopup
                                          accessID="2060"
                                          screenName="Primary Leather"
                                          childToParent={childToParent}
                                          filterValue={`${costingLookup.costingRecID}' AND PrimaryTypeID='${costingLookup.PrimaryLeatherID}`}
                                          filterName="parentID"
                                        />
                                      </Popup>
                                      <Popup
                                        title="Secondary Leather"
                                        openPopup={openSecodLeatherpopup}
                                        setOpenPopup={setOpenSecodLeatherpopup}
                                      >
                                        <Listviewpopup
                                          accessID="2061"
                                          screenName="Secondary Leather"
                                          childToParent={childToParent}
                                          filterValue={`${costingLookup.costingRecID}' AND SecondaryTypeID='${secondaryTypeLeatherLookup.SecondaryTypeLeatherID}`}
                                          filterName="parentID"
                                        />
                                      </Popup>
                                      <Popup
                                        title="Tertiary Leather"
                                        openPopup={openTeriaryLeatherpopup}
                                        setOpenPopup={setOpenTeriaryLeatherpopup}
                                      >
                                        <Listviewpopup
                                          accessID="2062"
                                          screenName="Tertiary Leather"
                                          childToParent={childToParent}
                                          filterValue={`${costingLookup.costingRecID}' AND TertiaryTypeID='${tertiaryTypeLeatherLookup.TertiaryTypeLeatherID}`}
                                          filterName="parentID"
                                        />
                                      </Popup>
                                      
                                      <Popup
                                        title="BOM"
                                        openPopup={openBOMpopup}
                                        setOpenPopup={setOpenBOMpopup}
                                      >
                                        <Listviewpopup
                                          accessID="2067"
                                          screenName="BOM"
                                          childToParent={childToParent}
                                          filterValue={
                                            `${selectCPLookupData.CPlookupRecordid}' AND CustomerID='${customerID} `
                                          }
                                          filterName="parentID"
                                        />
                                      </Popup>
                                    </FormControl>
                                  )}
                                </React.Fragment>
                              ) : null}
  
                              {parentID == "L" ? (
                                <FormControl
                                  sx={{ gridColumn: "span 2", gap: "40px" }}
                                  style={{ width: "100%" }}
                                >
                                  <TextField
                                    id="outlined-basic"
                                    label="ID"
                                    variant="filled"
                                    value={
                                      selectmaterialLookupData.MlookupRecordid
                                    }
                                    focused
                                    sx={{ display: "none" }}
                                  />
  
                                  <FormControl
                                    sx={{
                                      gridColumn: "span 2",
                                      display: "flex",
                                    }}
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
                                        label="Material"
                                        variant="filled"
                                        required
                                        value={
                                          selectmaterialLookupData.MlookupCode
                                        }
                                        focused
                                        inputProps={{ tabIndex: "-1" }}
                                      />
                                      <IconButton
                                        sx={{ height: 40, width: 40 }}
                                        // onClick={() => handleShow("MT")}
                                      >
                                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                      </IconButton>
                                      {/* <MoreHorizIcon onClick={()=>handleShow('MT')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}
  
                                      <TextField
                                        id="outlined-basic"
                                        label=""
                                        variant="filled"
                                        value={
                                          selectmaterialLookupData.MlookupDesc
                                        }
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
                                    label="Hide"
                                    id="Hide"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.Hide}
                                    name="Hide"
                                    sx={{
                                      gridColumn: "span 2",
                                      background: "#fff6c3",
                                    }}
                                    error={!!touched.Hide && !!errors.Hide}
                                    helperText={touched.Hide && errors.Hide}
                                    focused
                                    required
                                    onInvalid={(e) => {
                                      e.target.setCustomValidity(
                                        "Please Fill The Hide"
                                      );
                                    }}
                                    onInput={(e) => {
                                      // e.target.value = Math.max(
                                      //   0,
                                      //   parseInt(e.target.value)
                                      // )
                                      //   .toString()
                                      //   .slice(0, 3);
                                      e.target.setCustomValidity("");
                                    }}
                                    InputProps={{
                                        readOnly : true,
                                      inputProps: {
                                        style: { textAlign: "right" },
                                      },
                                    }}
                                  />
  
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="number"
                                    label="Hide Sq.ft"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    id="Hidesqft"
                                    name="Hidesqft"
                                    value={values.Hidesqft}
                                    error={
                                      !!touched.Hidesqft && !!errors.Hidesqft
                                    }
                                    helperText={
                                      touched.Hidesqft && errors.Hidesqft
                                    }
                                    sx={{
                                      gridColumn: "span 2",
                                      background: "#fff6c3",
                                    }}
                                    focused
                                    onInvalid={(e) => {
                                      e.target.setCustomValidity(
                                        "Please Fill The Hide Sq.ft"
                                      );
                                    }}
                                    onInput={(e) => {
                                      // e.target.value = Math.max(
                                      //   0,
                                      //   parseInt(e.target.value)
                                      // )
                                      //   .toString()
                                      //   .slice(0, 3);
                                      e.target.setCustomValidity("");
                                    }}
                                    required
                                    InputProps={{
                                        readOnly : true,
                                      inputProps: {
                                        style: { textAlign: "right" },
                                      },
                                    }}
                                  />
  
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="number"
                                    label="Side"
                                    id="Side"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.Side}
                                    name="Side"
                                    sx={{
                                      gridColumn: "span 2",
                                      background: "#fff6c3",
                                    }}
                                    error={!!touched.Side && !!errors.Side}
                                    helperText={touched.Side && errors.Side}
                                    focused
                                    required
                                    onInvalid={(e) => {
                                      e.target.setCustomValidity(
                                        "Please Fill The Side"
                                      );
                                    }}
                                    onInput={(e) => {
                                      // e.target.value = Math.max(
                                      //   0,
                                      //   parseInt(e.target.value)
                                      // )
                                      //   .toString()
                                      //   .slice(0, 3);
                                      e.target.setCustomValidity("");
                                    }}
                                    InputProps={{
                                        readOnly : true,
                                      inputProps: {
                                        style: { textAlign: "right" },
                                      },
                                    }}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="number"
                                    label="Side Sq.ft"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    id="Sidesqft"
                                    name="Sidesqft"
                                    required
                                    value={values.Sidesqft}
                                    error={
                                      !!touched.Sidesqft && !!errors.Sidesqft
                                    }
                                    helperText={
                                      touched.Sidesqft && errors.Sidesqft
                                    }
                                    sx={{
                                      gridColumn: "span 2",
                                      background: "#fff6c3",
                                    }}
                                    focused
                                    onInvalid={(e) => {
                                      e.target.setCustomValidity(
                                        "Please Fill The Side Sq.ft"
                                      );
                                    }}
                                    onInput={(e) => {
                                      // e.target.value = Math.max(
                                      //   0,
                                      //   parseInt(e.target.value)
                                      // )
                                      //   .toString()
                                      //   .slice(0, 3);
                                      e.target.setCustomValidity("");
                                    }}
                                    InputProps={{
                                        readOnly : true,
                                      inputProps: {
                                        style: { textAlign: "right" },
                                      },
                                    }}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="number"
                                    required
                                    label="Total Quantity"
                                    id="TotalSqfeet"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={
                                      Number(values.Hidesqft) +
                                      Number(values.Sidesqft)
                                    }
                                    name="TotalSqfeet"
                                    // error={!!touched.totalquantity && !!errors.totalquantity}
                                    // helperText={touched.totalquantity && errors.totalquantity}
  
                                    sx={{
                                      gridColumn: "span 2",
                                      background: "#fff6c3",
                                    }}
                                    focused
                                    InputProps={{
                                        readOnly : true,
                                      inputProps: {
                                        style: { textAlign: "right" },
                                      },
                                    }}
                                    onInput={(e) => {
                                      e.target.setCustomValidity("");
                                    }}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="number"
                                    required
                                    label="Rate"
                                    id="Rate"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.Rate}
                                    name="Rate"
                                    error={!!touched.Rate && !!errors.Rate}
                                    helperText={touched.Rate && errors.Rate}
                                    sx={{
                                      gridColumn: "span 2",
                                      background: "#fff6c3",
                                    }}
                                    focused
                                    InputProps={{
                                        readOnly : true,
                                      inputProps: {
                                        style: { textAlign: "right" },
                                      },
                                    }}
                                    onInvalid={(e) => {
                                      e.target.setCustomValidity(
                                        "Please Fill The Rate"
                                      );
                                    }}
                                    onInput={(e) => {
                                      // e.target.value = Math.max(0, parseInt(e.target.value))
                                      //   .toString()
                                      //   .slice(0, 8);
                                      e.target.setCustomValidity("");
                                    }}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Comments"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    id="Remarks"
                                    name="Remarks"
                                    value={values.Remarks}
                                    error={!!touched.Remarks && !!errors.Remarks}
                                    helperText={touched.Remarks && errors.Remarks}
                                    sx={{ gridColumn: "span 2" }}
                                    focused
                                    inputProps={{ maxLength: 500 }}
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                    multiline
                                  />
  
                                  {/* <Box
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
                                        variant="contained"
                                        color="error"
                                        onClick={() => {
                                          fnDetailsave(
                                            values,
                                            resetForm,
                                            "harddelete"
                                          );
                                        }}
                                      >
                                        delete
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
                                  </Box> */}
                                  <Popup
                                    title="Material"
                                    openPopup={openMTPopup}
                                    setOpenPopup={setOpenMTPopup}
                                  >
                                    <Listviewpopup
                                      accessID="2013"
                                      screenName="Material"
                                      childToParent={childToParent}
                                      filterName=""
                                      filterValue={LookupFilter}
                                    />
                                  </Popup>
                                </FormControl>
                              ) : null}
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
          
          {/* Trailers */}
  
          {show == "2" && !isGetLoading ? (
            <Box m="20px" sx={{ m: 2 }}>
              <Formik
                // onSubmit={handleFormSubmit}
                initialValues={initialValues}
                enableReinitialize={true}
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
                      {/* //<FormControl sx={{ gridColumn: "span 2",gap:'40px' }} > */}
  
                      <FormControl sx={{ gridColumn: "span 2" }}>
                        {invoicefilter == "SI" ? (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="Text"
                            label="Sample Invoice ID"
                            value={values.Id}
                            id="Id"
                            name="Id"
                            sx={{ background: "#fff6c3" }}
                            focused
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        ) : (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label={`${
                              invoicefilter == "PI"
                                ? "Proforma Invoice No "
                                : "Final Invoice No"
                            }`}
                            value={
                              invoicefilter == "PI"
                                ? values.ProfoInvoiceNO
                                : values.FinalInvoiceNo
                            }
                            sx={{ background: "#fff6c3" }}
                            focused
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        )}
                      </FormControl>
                      <FormControl sx={{ gridColumn: "span 2" }}>
                        {invoicefilter == "SI" ? (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="Date"
                            label="Sample Invoice Date"
                            value={values.Date}
                            id="Date"
                            name="Date"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputFormat="YYYY-MM-DD"
                            focused
                            error={!!touched.Date && !!errors.Date}
                            helperText={touched.Date && errors.Date}
                            // inputProps={{ maxLength:10}}
                            sx={{ background: "#ffe5f1" }}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        ) : (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="Date"
                            label={`${
                              invoicefilter == "PI"
                                ? "Proforma Invoice Date "
                                : "Final Invoice Date"
                            }`}
                            value={
                              invoicefilter == "PI"
                                ? values.ProfoInvoiceDate
                                : values.FinalInvoiceDate
                            }
                            id="Date"
                            name="Date"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputFormat="YYYY-MM-DD"
                            focused
                            sx={{ background: "#ffe5f1" }}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        )}
                      </FormControl>
  
                      <FormControl sx={{ gridColumn: "span 4", gap: "40px" }}>
                        <Formik
                          initialValues={trailerinitialValues}
                          onSubmit={(values, setSubmitting) => {
                            setTimeout(() => {
                              fnTralierSave(values, "");
                              // alert("hai");
                            }, 100);
                          }}
                          validationSchema={proformatrailerSchema}
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
                              <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                              <Typography variant="h5">Countries:</Typography>
                              <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                  "& > div": {
                                    gridColumn: isNonMobile
                                      ? undefined
                                      : "span 4",
                                  },
                                  mt: "30px",
                                }}
                              >
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    id="outlined-basic"
                                    label="ID"
                                    variant="filled"
                                    value={selectCOLookupData.OCnRecordID}
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
                                        label="Origin"
                                        variant="filled"
                                        value={
                                          selectCOLookupData.OriginCountryCode
                                        }
                                        focused
                                        inputProps={{ tabIndex: "-1" }}
                                      />
  
                                      {/* <MoreHorizIcon onClick={()=>handleShow('CO')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}
                                      <IconButton
                                        sx={{ height: 40, width: 40 }}
                                        // onClick={() => handleShow("CO")}
                                      >
                                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                      </IconButton>
                                      <TextField
                                        id="outlined-basic"
                                        label=""
                                        variant="filled"
                                        value={
                                          selectCOLookupData.OriginCountryName
                                        }
                                        fullWidth
                                        focused
                                        inputProps={{ tabIndex: "-1" }}
                                      />
                                    </FormControl>
                                  </FormControl>
                                </FormControl>
  
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    id="outlined-basic"
                                    label="ID"
                                    variant="filled"
                                    value={selectCFLookupData.FCnRecordID}
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
                                        label="Final Destination"
                                        variant="filled"
                                        value={
                                          selectCFLookupData.FinalCountryCode
                                        }
                                        focused
                                        inputProps={{ tabIndex: "-1" }}
                                      />
  
                                      {/* <MoreHorizIcon onClick={()=>handleShow('CF')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}
                                      <IconButton
                                        sx={{ height: 40, width: 40 }}
                                        // onClick={() => handleShow("CF")}
                                      >
                                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                      </IconButton>
  
                                      <TextField
                                        id="outlined-basic"
                                        label=""
                                        variant="filled"
                                        value={
                                          selectCFLookupData.FinalCountryName
                                        }
                                        fullWidth
                                        focused
                                        inputProps={{ tabIndex: "-1" }}
                                      />
                                    </FormControl>
                                  </FormControl>
                                </FormControl>
  
                         
                                <FormControl focused variant="filled" sx={{ gridColumn: "span 2" }}>
                      <InputLabel id="productType">Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        
                        id="Transit"
                        name="Transit"
                        value={portType || values.Transit}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        InputProps={{
                            readOnly: true,
                          }}
                      >
                        <MenuItem value="S">by sea</MenuItem>
                        <MenuItem value="A">by Air</MenuItem>
                      </Select>
                    </FormControl>
  
  
                                <FormControl focused variant="filled" sx={{ gridColumn: "span 2" }}>
                      <InputLabel id="productType">Shipment Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        
                        id="ShipmentType"
                        name="ShipmentType"
                        value={values.ShipmentType}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        InputProps={{
                            readOnly: true,
                          }}
                      >
                        <MenuItem value="CA">by Cargo</MenuItem>
                        <MenuItem value="CO">by Courier</MenuItem>
                      </Select>
                    </FormControl>
                              </Box>
  
                              <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                              <Typography variant="h5">Ports :</Typography>
                              <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                  "& > div": {
                                    gridColumn: isNonMobile
                                      ? undefined
                                      : "span 4",
                                  },
                                  mt: "30px",
                                }}
                              >
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    id="outlined-basic"
                                    label="ID"
                                    variant="filled"
                                    value={selectPOLookupData.OPoRecordID}
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
                                        label="Origin"
                                        variant="filled"
                                        value={selectPOLookupData.OrginPortCode}
                                        focused
                                        inputProps={{ tabIndex: "-1" }}
                                      />
                                      <IconButton
                                        sx={{ height: 40, width: 40 }}
                                        // onClick={() => handleShow("PO")}
                                      >
                                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                      </IconButton>
                                      {/* <MoreHorizIcon onClick={()=>handleShow('PO')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}
  
                                      <TextField
                                        id="outlined-basic"
                                        label=""
                                        variant="filled"
                                        value={
                                          selectPOLookupData.OrginPortDescription
                                        }
                                        fullWidth
                                        focused
                                        inputProps={{ tabIndex: "-1" }}
                                      />
                                    </FormControl>
                                  </FormControl>
                                </FormControl>
  
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    id="outlined-basic"
                                    label="ID"
                                    variant="filled"
                                    value={selectPDLookupData.DPoRecordID}
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
                                        label="Delivery"
                                        variant="filled"
                                        value={
                                          selectPDLookupData.DeliveryPortCode
                                        }
                                        focused
                                        inputProps={{ tabIndex: "-1" }}
                                      />
  
                                      {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}
                                      <IconButton
                                        sx={{ height: 40, width: 40 }}
                                        // onClick={() => handleShow("PD")}
                                      >
                                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                      </IconButton>
                                      <TextField
                                        id="outlined-basic"
                                        label=""
                                        variant="filled"
                                        value={
                                          selectPDLookupData.DeliveryPortDescription
                                        }
                                        fullWidth
                                        focused
                                        inputProps={{ tabIndex: "-1" }}
                                      />
                                    </FormControl>
                                  </FormControl>
                                </FormControl>
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    id="outlined-basic"
                                    label="ID"
                                    variant="filled"
                                    value={selectDPLookupData.DSPoRecordID}
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
                                        label="Discharge"
                                        variant="filled"
                                        value={
                                          selectDPLookupData.DischargePortCode
                                        }
                                        focused
                                        inputProps={{ tabIndex: "-1" }}
                                      />
  
                                      {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' />
                                       */}
  
                                      <IconButton
                                        sx={{ height: 40, width: 40 }}
                                        // onClick={() => handleShow("DP")}
                                      >
                                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                      </IconButton>
                                      <TextField
                                        id="outlined-basic"
                                        label=""
                                        variant="filled"
                                        value={
                                          selectDPLookupData.DischargePortDescription
                                        }
                                        fullWidth
                                        focused
                                        inputProps={{ tabIndex: "-1" }}
                                      />
                                    </FormControl>
                                  </FormControl>
                                </FormControl>
  
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    id="outlined-basic"
                                    label="ID"
                                    variant="filled"
                                    value={selectPLLookupData.LPoRecordID}
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
                                        label="Loading"
                                        variant="filled"
                                        value={selectPLLookupData.LoadingPortCode}
                                        focused
                                        inputProps={{ tabIndex: "-1" }}
                                      />
  
                                      <IconButton
                                        sx={{ height: 40, width: 40 }}
                                        // onClick={() => handleShow("PL")}
                                      >
                                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                      </IconButton>
  
                                      <TextField
                                        id="outlined-basic"
                                        label=""
                                        variant="filled"
                                        value={
                                          selectPLLookupData.LoadingPortDescription
                                        }
                                        fullWidth
                                        focused
                                        inputProps={{ tabIndex: "-1" }}
                                      />
                                    </FormControl>
                                  </FormControl>
                                </FormControl>
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    id="outlined-basic"
                                    label="ID"
                                    variant="filled"
                                    value={selectPFLookupData.FPoRecordID}
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
                                        label="Final Deastination"
                                        variant="filled"
                                        value={selectPFLookupData.FinalPortCode}
                                        focused
                                        inputProps={{ tabIndex: "-1" }}
                                      />
                                      <IconButton
                                        sx={{ height: 40, width: 40 }}
                                        // onClick={() => handleShow("PF")}
                                      >
                                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                      </IconButton>
                                      {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' />
                                       */}
                                      <TextField
                                        id="outlined-basic"
                                        label=""
                                        variant="filled"
                                        value={selectPFLookupData.FinalPortDesc}
                                        fullWidth
                                        focused
                                        inputProps={{ tabIndex: "-1" }}
                                      />
                                    </FormControl>
                                  </FormControl>
                                </FormControl>
                              </Box>
  
                              <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                              <Typography variant="h5">Orders</Typography>
                              <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                  "& > div": {
                                    gridColumn: isNonMobile
                                      ? undefined
                                      : "span 4",
                                  },
                                  mt: "30px",
                                }}
                              >
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.BuyerOrder}
                                    id="BuyerOrder"
                                    name="BuyerOrder"
                                    label="Buyer order "
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={
                                      !!touched.BuyerOrder && !!errors.BuyerOrder
                                    }
                                    helperText={
                                      touched.BuyerOrder && errors.BuyerOrder
                                    }
                                    sx={{
                                      gridColumn: "span 2",
                                      // background: "#fff6c3",
                                    }}
                                    focused
                                    inputProps={{ maxLength: 10 }}
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                </FormControl>
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.Precarrbyreciept}
                                    id="Precarrbyreciept"
                                    name="Precarrbyreciept"
                                    label="Pre-Carriage"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={
                                      !!touched.Precarrbyreciept &&
                                      !!errors.Precarrbyreciept
                                    }
                                    helperText={
                                      touched.Precarrbyreciept &&
                                      errors.Precarrbyreciept
                                    }
                                    sx={{
                                      gridColumn: "span 2",
                                      // background: "#fff6c3",
                                    }}
                                    focused
                                    inputProps={{ maxLength: 30 }}
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                </FormControl>
  
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="Date"
                                    label="Date"
                                    value={values.Orderdate}
                                    id="Orderdate"
                                    name="Orderdate"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    inputFormat="YYYY-MM-DD"
                                    focused
                                    //  error={!!touched.Date && !!errors.Date}
                                    // helperText={touched.Date && errors.Date}
                                    sx={{ background: "#ffe5f1" }}
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                </FormControl>
  
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="Date"
                                    label="Expiry.Date"
                                    value={values.Expdate}
                                    id="Expdate"
                                    name="Expdate"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    inputFormat="YYYY-MM-DD"
                                    required
                                    focused
                                    //  error={!!touched.Date && !!errors.Date}
                                    // helperText={touched.Date && errors.Date}
                                    sx={{ background: "#ffe5f1" }}
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                </FormControl>
                              </Box>
                              <Divider variant="fullWidth" sx={{ mt: "20px" }} />
  
                              <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                  "& > div": {
                                    gridColumn: isNonMobile
                                      ? undefined
                                      : "span 4",
                                  },
                                  mt: "30px",
                                }}
                              >
                                <FormControl sx={{ gridColumn: "span 4" }}>
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.Precarrby}
                                    id="Precarrby"
                                    name="Precarrby"
                                    label="Pre carr By"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={
                                      !!touched.Precarrby && !!errors.Precarrby
                                    }
                                    helperText={
                                      touched.Precarrby && errors.Precarrby
                                    }
                                    sx={{
                                      gridColumn: "span 2",
                                      // background: "#fff6c3",
                                    }}
                                    focused
                                    inputProps={{ maxLength: 30 }}
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                </FormControl>
  
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="Date"
                                    label="Last Date of ship"
                                    value={values.Lastdateofship}
                                    id="Lastdateofship"
                                    name="Lastdateofship"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    inputFormat="YYYY-MM-DD"
                                    focused
                                    //  error={!!touched.Date && !!errors.Date}
                                    // helperText={touched.Date && errors.Date}
                                    sx={{ background: "#ffe5f1" }}
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                </FormControl>
  
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="Date"
                                    label="Nge Date"
                                    value={values.Ngedate}
                                    id="Ngedate"
                                    name="Ngedate"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    inputFormat="YYYY-MM-DD"
                                    focused
                                    //  error={!!touched.Date && !!errors.Date}
                                    // helperText={touched.Date && errors.Date}
                                    sx={{ background: "#ffe5f1" }}
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                </FormControl>
                                {/* <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    id="outlined-basic"
                                    label="ID"
                                    variant="filled"
                                    value={selectOFLookupData.FrRecordID}
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
                                        label="Vessel/Fight #"
                                        variant="filled"
                                        value={selectOFLookupData.AirlinesCode}
                                        focused
                                        inputProps={{tabIndex:"-1"}}
                                      />
                                      <IconButton
                                        sx={{ height: 40, width: 40 }}
                                        onClick={() => handleShow("OF")}
                                      >
                                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                      </IconButton>
                                      <TextField
                                        id="outlined-basic"
                                        label=""
                                        variant="filled"
                                        value={selectOFLookupData.AirlinesDesc}
                                        fullWidth
                                        inputProps={{tabIndex:"-1"}}
                                        focused
                                      />
                                    </FormControl>
                                  </FormControl>
                                </FormControl> */}
                              </Box>
  
                              <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                              <Typography variant="h5">Discounts:</Typography>
                              <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                  "& > div": {
                                    gridColumn: isNonMobile
                                      ? undefined
                                      : "span 4",
                                  },
                                  mt: "30px",
                                }}
                              >
                                <FormControl sx={{ gridColumn: "span 4" }}>
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.Add}
                                    id="Add"
                                    name="Add"
                                    label="Add"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.Add && !!errors.Add}
                                    helperText={touched.Add && errors.Add}
                                    focused
                                    sx={{
                                      background: "#fff6c3",
                                      input: { textAlign: "right" },
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                </FormControl>
  
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.Detect}
                                    id="Detect"
                                    name="Detect"
                                    label="Deduct"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.Detect && !!errors.Detect}
                                    helperText={touched.Detect && errors.Detect}
                                    sx={{
                                      gridColumn: "span 2",
                                      background: "#fff6c3",
                                    }}
                                    focused
                                    InputProps={{
                                        readOnly : true,
                                      inputProps: {
                                        style: { textAlign: "right" },
                                      },
                                    }}
                                  />
                                </FormControl>
  
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.Otherref}
                                    id="Otherref"
                                    name="Otherref"
                                    label="Other Ref"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={
                                      !!touched.Otherref && !!errors.Otherref
                                    }
                                    helperText={
                                      touched.Otherref && errors.Otherref
                                    }
                                    sx={{
                                      gridColumn: "span 2",
                                    }}
                                    focused
                                    inputProps={{ maxLength: 500 }}
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                </FormControl>
                              </Box>
                              <Popup
                                title="Origin Country"
                                openPopup={openCOPopup}
                                setOpenPopup={setOpenCOPopup}
                              >
                                <Listviewpopup
                                  accessID="2003"
                                  screenName="Origin Country"
                                  childToParent={childToParent}
                                />
                              </Popup>
                              <Popup
                                title="Destination Country"
                                openPopup={openCFPopup}
                                setOpenPopup={setOpenCFPopup}
                              >
                                <Listviewpopup
                                  accessID="2003"
                                  screenName="Destination Country"
                                  childToParent={childToParent}
                                />
                              </Popup>
                              <Popup
                                title="Origin Ports"
                                openPopup={openPOPopup}
                                setOpenPopup={setOpenPOPopup}
                              >
                                <Listviewpopup
                                  accessID="2014"
                                  screenName="Origin Ports"
                                  childToParent={childToParent}
                                  filterName=""
                                  filterValue={portOriginFilter}
                                />
                              </Popup>
                              <Popup
                                title="Delivery Ports"
                                openPopup={openPDPopup}
                                setOpenPopup={setOpenPDPopup}
                              >
                                <Listviewpopup
                                  accessID="2014"
                                  screenName="Delivery Ports"
                                  childToParent={childToParent}
                                  filterName=""
                                  filterValue={portDestinationFilter}
                                />
                              </Popup>
                              <Popup
                                title="Discharge Ports"
                                openPopup={openDPPopup}
                                setOpenPopup={setOpenDPPopup}
                              >
                                <Listviewpopup
                                  accessID="2014"
                                  screenName="Discharge Ports"
                                  childToParent={childToParent}
                                  filterName=""
                                  filterValue={portDestinationFilter}
                                />
                              </Popup>
                              <Popup
                                title="Loading Ports"
                                openPopup={openPLPopup}
                                setOpenPopup={setOpenPLPopup}
                              >
                                <Listviewpopup
                                  accessID="2014"
                                  screenName="Loading Ports"
                                  childToParent={childToParent}
                                  filterName=""
                                  filterValue={portOriginFilter}
                                />
                              </Popup>
                              <Popup
                                title="Final Destination"
                                openPopup={openPFPopup}
                                setOpenPopup={setOpenPFPopup}
                              >
                                <Listviewpopup
                                  accessID="2014"
                                  screenName="Final Destination"
                                  childToParent={childToParent}
                                  filterName=""
                                  filterValue={portDestinationFilter}
                                />
                              </Popup>
                              <Popup
                                title="Vessel"
                                openPopup={openOFPopup}
                                setOpenPopup={setOpenOFPopup}
                              >
                                <Listviewpopup
                                  accessID="2008"
                                  screenName="Vessel"
                                  childToParent={childToParent}
                                />
                              </Popup>
  
                              {/* <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                              <Box
                                display="flex"
                                justifyContent="end"
                                mt="20px"
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
  
                                <Button
                                  color="warning"
                                  variant="contained"
                                  onClick={() => {
                                    setScreen(0);
                                  }}
                                >
                                  Cancel
                                </Button>
                              </Box> */}
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
  
  
          {show == "2.1" && !isGetLoading ? (
            <Box m="20px" sx={{ m: 2 }}>
              <Formik
                // onSubmit={handleFormSubmit}
                initialValues={initialValues}
                enableReinitialize={true}
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
                      {/* //<FormControl sx={{ gridColumn: "span 2",gap:'40px' }} > */}
  
                      <FormControl sx={{ gridColumn: "span 2" }}>
                        {invoicefilter == "SI" ? (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="Text"
                            label="Sample Invoice ID"
                            value={values.Id}
                            id="Id"
                            name="Id"
                            sx={{ background: "#fff6c3" }}
                            focused
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        ) : (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label={`${
                              invoicefilter == "PI"
                                ? "Proforma Invoice No "
                                : "Final Invoice No"
                            }`}
                            value={
                              invoicefilter == "PI"
                                ? values.ProfoInvoiceNO
                                : values.FinalInvoiceNo
                            }
                            sx={{ background: "#fff6c3" }}
                            focused
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        )}
                      </FormControl>
                      <FormControl sx={{ gridColumn: "span 2" }}>
                        {invoicefilter == "SI" ? (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="Date"
                            label="Sample Invoice Date"
                            value={values.Date}
                            id="Date"
                            name="Date"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputFormat="YYYY-MM-DD"
                            focused
                            error={!!touched.Date && !!errors.Date}
                            helperText={touched.Date && errors.Date}
                            // inputProps={{ maxLength:10}}
                            sx={{ background: "#ffe5f1" }}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        ) : (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="Date"
                            label={`${
                              invoicefilter == "PI"
                                ? "Proforma Invoice Date "
                                : "Final Invoice Date"
                            }`}
                            value={
                              invoicefilter == "PI"
                                ? values.ProfoInvoiceDate
                                : values.FinalInvoiceDate
                            }
                            id="Date"
                            name="Date"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputFormat="YYYY-MM-DD"
                            focused
                            sx={{ background: "#ffe5f1" }}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        )}
                      </FormControl>
  
                      <FormControl sx={{ gridColumn: "span 4", gap: "40px" }}>
                        <Formik
                          initialValues={trailerinitialValues}
                          onSubmit={(values, setSubmitting) => {
                            setTimeout(() => {
                              fnPreShipmentSave(values, "");
                              // alert("hai");
                            }, 100);
                          }}
                          validationSchema={proformatrailerSchema}
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
                              <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                              <Typography variant="h5">Pre Shipment(Data at actuals)</Typography>
                              <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                  "& > div": {
                                    gridColumn: isNonMobile
                                      ? undefined
                                      : "span 4",
                                  },
                                  mt: "30px",
                                }}
                              >
                               
                               <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.Placeofreceipt}
                                    id="Placeofreceipt"
                                    name="Placeofreceipt"
                                    label="Place of Receipt of Pre-Carriage"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    sx={{
                                      gridColumn: "span 2",
                                      // background: "#fff6c3",
                                    }}
                                    focused
                                    InputProps={{
                                        readOnly: true,
                                      }} 
                                  />
                                   <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.Otherref}
                                    id="Otherref"
                                    name="Otherref"
                                    label="Other Ref"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={
                                      !!touched.Otherref && !!errors.Otherref
                                    }
                                    helperText={
                                      touched.Otherref && errors.Otherref
                                    }
                                    sx={{
                                      gridColumn: "span 2",
                                    }}
                                    focused
                                    inputProps={{ maxLength: 500 }}
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                   <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.Exportersref}
                                    id="Exportersref"
                                    name="Exportersref"
                                    label="Exporters Ref #"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                   
                                    sx={{
                                      gridColumn: "span 2",
                                      // background: "#fff6c3",
                                    }}
                                    focused
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                   <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.PclAmount}
                                    id="PclAmount"
                                    name="PclAmount"
                                    label="PCL Amount"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                   
                                    sx={{
                                      gridColumn: "span 2",
                                      // background: "#fff6c3",
                                    }}
                                    focused
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                   <TextField
                                    fullWidth
                                    variant="filled"
                                    type="date"
                                    value={values.Plcreated}
                                    id="Plcreated"
                                    name="Plcreated"
                                    label="PCL Opening Date"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    sx={{
                                      gridColumn: "span 2",
                                      
                                      // background: "#fff6c3",
                                    }}
                                    focused
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                   <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.Precarrby}
                                    id="Precarrby"
                                    name="Precarrby"
                                    label="Pre-Carriage By"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={
                                      !!touched.Precarrby &&
                                      !!errors.Precarrby
                                    }
                                    helperText={
                                      touched.Precarrby &&
                                      errors.Precarrby
                                    }
                                    sx={{
                                      gridColumn: "span 2",
                                      // background: "#fff6c3",
                                    }}
                                    focused
                                    inputProps={{ maxLength: 30 }}
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                             <FormControl focused variant="filled" sx={{ gridColumn: "span 2" }}>
                      <InputLabel id="productType">Shipment Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        
                        id="ShipmentType"
                        name="ShipmentType"
                        value={values.ShipmentType}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        InputProps={{
                            readOnly: true,
                          }}
                      >
                        <MenuItem value="CA">by Cargo</MenuItem>
                        <MenuItem value="CO">by Courier</MenuItem>
                      </Select>
                    </FormControl>
                               
                               
                              </Box>
  
                              <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                              <Typography variant="h5">Ports :</Typography>
                              <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                  "& > div": {
                                    gridColumn: isNonMobile
                                      ? undefined
                                      : "span 4",
                                  },
                                  mt: "30px",
                                }}
                              >
                               
  
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    id="outlined-basic"
                                    label="ID"
                                    variant="filled"
                                    value={selectPDLookupData.DPoRecordID}
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
                                        label="Delivery"
                                        variant="filled"
                                        value={
                                          selectPDLookupData.DeliveryPortCode
                                        }
                                        focused
                                        inputProps={{ tabIndex: "-1" }}
                                      />
  
                                      {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}
                                      <IconButton
                                        sx={{ height: 40, width: 40 }}
                                        // onClick={() => handleShow("PD")}
                                      >
                                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                      </IconButton>
                                      <TextField
                                        id="outlined-basic"
                                        label=""
                                        variant="filled"
                                        value={
                                          selectPDLookupData.DeliveryPortDescription
                                        }
                                        fullWidth
                                        focused
                                        inputProps={{ tabIndex: "-1" }}
                                      />
                                    </FormControl>
                                  </FormControl>
                                </FormControl>
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    id="outlined-basic"
                                    label="ID"
                                    variant="filled"
                                    value={selectDPLookupData.DSPoRecordID}
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
                                        label="Discharge"
                                        variant="filled"
                                        value={
                                          selectDPLookupData.DischargePortCode
                                        }
                                        focused
                                        inputProps={{ tabIndex: "-1" }}
                                      />
  
                                      {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' />
                                       */}
  
                                      <IconButton
                                        sx={{ height: 40, width: 40 }}
                                        // onClick={() => handleShow("DP")}
                                      >
                                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                      </IconButton>
                                      <TextField
                                        id="outlined-basic"
                                        label=""
                                        variant="filled"
                                        value={
                                          selectDPLookupData.DischargePortDescription
                                        }
                                        fullWidth
                                        focused
                                        inputProps={{ tabIndex: "-1" }}
                                      />
                                    </FormControl>
                                  </FormControl>
                                </FormControl>
  
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    id="outlined-basic"
                                    label="ID"
                                    variant="filled"
                                    value={selectPLLookupData.LPoRecordID}
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
                                        label="Loading"
                                        variant="filled"
                                        value={selectPLLookupData.LoadingPortCode}
                                        focused
                                        inputProps={{ tabIndex: "-1" }}
                                      />
  
                                      <IconButton
                                        sx={{ height: 40, width: 40 }}
                                        // onClick={() => handleShow("PL")}
                                      >
                                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                      </IconButton>
  
                                      <TextField
                                        id="outlined-basic"
                                        label=""
                                        variant="filled"
                                        value={
                                          selectPLLookupData.LoadingPortDescription
                                        }
                                        fullWidth
                                        focused
                                        inputProps={{ tabIndex: "-1" }}
                                      />
                                    </FormControl>
                                  </FormControl>
                                </FormControl>
                               
                              </Box>
  
                              <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                              <Typography variant="h5">Shipping Marks</Typography>
                              <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                  "& > div": {
                                    gridColumn: isNonMobile
                                      ? undefined
                                      : "span 4",
                                  },
                                  mt: "30px",
                                }}
                              >
                                 <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.ShippingMarks}
                                    id="ShippingMarks"
                                    name="ShippingMarks"
                                    label=""
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    multiline
                                    sx={{
                                      gridColumn: "span 2",
                                      
                                      // background: "#fff6c3",
                                    }}
                                    focused
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.TotalGrossWeight}
                                    id="TotalGrossWeight"
                                    name="TotalGrossWeight"
                                    label="Total Gross wt"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    sx={{
                                      gridColumn: "span 1",
                                      
                                      // background: "#fff6c3",
                                    }}
                                    focused
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                   <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.TotalNetWeight}
                                    id="TotalNetWeight"
                                    name="TotalNetWeight"
                                    label="Total Net wt"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    sx={{
                                      gridColumn: "span 1",
                                      
                                      // background: "#fff6c3",
                                    }}
                                    focused
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                   <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.QuantityUnits}
                                    id="QuantityUnits"
                                    name="QuantityUnits"
                                    label="Quantity Unit"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    sx={{
                                      gridColumn: "span 2",
                                      
                                      // background: "#fff6c3",
                                    }}
                                    focused
                                    InputProps={{
                                        readOnly: true,
                                      }} 
                                  />
                                   <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.TotalPackages}
                                    id="TotalPackages"
                                    name="TotalPackages"
                                    label="Total Packages"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    sx={{
                                      gridColumn: "span 2",
                                      
                                      // background: "#fff6c3",
                                    }}
                                    focused
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                   <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.FreightRate}
                                    id="FreightRate"
                                    name="FreightRate"
                                    label="Freight Terms"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    sx={{
                                      gridColumn: "span 2",
                                      
                                      // background: "#fff6c3",
                                    }}
                                    focused
                                    InputProps={{
                                        readOnly: true,
                                      }} 
                                  />
                                   <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.PaymentTerms}
                                    id="PaymentTerms"
                                    name="PaymentTerms"
                                    label="Terms of Delivery"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    sx={{
                                      gridColumn: "span 2",
                                      
                                      // background: "#fff6c3",
                                    }}
                                    focused
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.Add}
                                    id="Add"
                                    name="Add"
                                    label="Add"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.Add && !!errors.Add}
                                    helperText={touched.Add && errors.Add}
                                    focused
                                    sx={{
                                      background: "#fff6c3",
                                      input: { textAlign: "right" },
                                      gridColumn: "span 2",
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                  
                                   <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.Amount}
                                    id="Amount"
                                    name="Amount"
                                    label="Amount"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    sx={{
                                      background: "#fff6c3",
                                      input: { textAlign: "right" },
                                      gridColumn: "span 2",
                                    }}
                                    focused
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                   <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.Add2}
                                    id="Add2"
                                    name="Add2"
                                    label="Add"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    sx={{
                                      background: "#fff6c3",
                                      input: { textAlign: "right" },
                                      gridColumn: "span 2",
                                    }}
                                    focused
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                   <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.Amount1}
                                    id="Amount1"
                                    name="Amount1"
                                    label="Amount"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    sx={{
                                      background: "#fff6c3",
                                      input: { textAlign: "right" },
                                      gridColumn: "span 2",
                                    }}
                                    focused
                                    InputProps={{
                                        readOnly: true,
                                      }} 
                                  />
                                  
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.Add1}
                                    id="Add1"
                                    name="Add1"
                                    label="Add"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    sx={{
                                      background: "#fff6c3",
                                      input: { textAlign: "right" },
                                      gridColumn: "span 2",
                                    }}
                                    focused
                                    InputProps={{
                                        readOnly: true,
                                      }} 
                                  />
                                   <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.Amount2}
                                    id="Amount2"
                                    name="Amount2"
                                    label="Amount"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    sx={{
                                      background: "#fff6c3",
                                      input: { textAlign: "right" },
                                      gridColumn: "span 2",
                                    }}
                                    focused
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                  
                                   <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.Detect}
                                    id="Detect"
                                    name="Detect"
                                    label="Deduct"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.Detect && !!errors.Detect}
                                    helperText={touched.Detect && errors.Detect}
                                    focused
                                    sx={{
                                      background: "#fff6c3",
                                      input: { textAlign: "right" },
                                      gridColumn: "span 2",
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.Amount3}
                                    id="Amount3"
                                    name="Amount3"
                                    label="Amount"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    sx={{
                                      gridColumn: "span 2",
                                      
                                      // background: "#fff6c3",
                                    }}
                                    focused
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  /> 
                                   <TextField
                                    fullWidth
                                    variant="filled"
                                    type="date"
                                    value={values.PaymentDate}
                                    id="PaymentDate"
                                    name="PaymentDate"
                                    label="Payment Date"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    sx={{
                                      gridColumn: "span 2",
                                      
                                      // background: "#fff6c3",
                                    }}
                                    focused
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />  
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.Commissionpaid}
                                    id="Commissionpaid"
                                    name="Commissionpaid"
                                    label="Commission Info"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    sx={{
                                      gridColumn: "span 2",
                                      
                                      // background: "#fff6c3",
                                    }}
                                    focused
                                    InputProps={{
                                        readOnly: true,
                                      }} 
                                  />    
                               </Box>
  
                             
                              <Popup
                                title="Origin Country"
                                openPopup={openCOPopup}
                                setOpenPopup={setOpenCOPopup}
                              >
                                <Listviewpopup
                                  accessID="2003"
                                  screenName="Origin Country"
                                  childToParent={childToParent}
                                />
                              </Popup>
                              <Popup
                                title="Destination Country"
                                openPopup={openCFPopup}
                                setOpenPopup={setOpenCFPopup}
                              >
                                <Listviewpopup
                                  accessID="2003"
                                  screenName="Destination Country"
                                  childToParent={childToParent}
                                />
                              </Popup>
                              <Popup
                                title="Origin Ports"
                                openPopup={openPOPopup}
                                setOpenPopup={setOpenPOPopup}
                              >
                                <Listviewpopup
                                  accessID="2014"
                                  screenName="Origin Ports"
                                  childToParent={childToParent}
                                  filterName=""
                                  filterValue={portOriginFilter}
                                />
                              </Popup>
                              <Popup
                                title="Delivery Ports"
                                openPopup={openPDPopup}
                                setOpenPopup={setOpenPDPopup}
                              >
                                <Listviewpopup
                                  accessID="2014"
                                  screenName="Delivery Ports"
                                  childToParent={childToParent}
                                  filterName=""
                                  filterValue={portDestinationFilter}
                                />
                              </Popup>
                              <Popup
                                title="Discharge Ports"
                                openPopup={openDPPopup}
                                setOpenPopup={setOpenDPPopup}
                              >
                                <Listviewpopup
                                  accessID="2014"
                                  screenName="Discharge Ports"
                                  childToParent={childToParent}
                                  filterName=""
                                  filterValue={portDestinationFilter}
                                />
                              </Popup>
                              <Popup
                                title="Loading Ports"
                                openPopup={openPLPopup}
                                setOpenPopup={setOpenPLPopup}
                              >
                                <Listviewpopup
                                  accessID="2014"
                                  screenName="Loading Ports"
                                  childToParent={childToParent}
                                  filterName=""
                                  filterValue={portOriginFilter}
                                />
                              </Popup>
                              <Popup
                                title="Final Destination"
                                openPopup={openPFPopup}
                                setOpenPopup={setOpenPFPopup}
                              >
                                <Listviewpopup
                                  accessID="2014"
                                  screenName="Final Destination"
                                  childToParent={childToParent}
                                  filterName=""
                                  filterValue={portDestinationFilter}
                                />
                              </Popup>
                              <Popup
                                title="Vessel"
                                openPopup={openOFPopup}
                                setOpenPopup={setOpenOFPopup}
                              >
                                <Listviewpopup
                                  accessID="2008"
                                  screenName="Vessel"
                                  childToParent={childToParent}
                                />
                              </Popup>
  
                             
                              {/* <Box
                                display="flex"
                                justifyContent="end"
                                mt="20px"
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
  
                                <Button
                                  color="warning"
                                  variant="contained"
                                  onClick={() => {
                                    setScreen(0);
                                  }}
                                >
                                  Cancel
                                </Button>
                              </Box> */}
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
  
          {/* Account details */}
          {show == "3" ? (
            <Box m="20px" sx={{ m: 2 }}>
              <Formik
                // onSubmit={handleFormSubmit}
                initialValues={initialValues}
                enableReinitialize={true}
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
                      <FormControl sx={{ gridColumn: "span 2" }}>
                        {invoicefilter == "SI" ? (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="Text"
                            label="Sample Invoice ID"
                            value={values.Id}
                            id="Id"
                            name="Id"
                            sx={{ background: "#fff6c3" }}
                            focused
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        ) : (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label={`${
                              invoicefilter == "PI"
                                ? "Proforma Invoice No "
                                : "Final Invoice No"
                            }`}
                            value={
                              invoicefilter == "PI"
                                ? values.ProfoInvoiceNO
                                : values.FinalInvoiceNo
                            }
                            sx={{ background: "#fff6c3" }}
                            focused
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        )}
                      </FormControl>
                      <FormControl sx={{ gridColumn: "span 2" }}>
                        {invoicefilter == "SI" ? (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="Date"
                            label="Sample Invoice Date"
                            value={values.Date}
                            id="Date"
                            name="Date"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputFormat="YYYY-MM-DD"
                            focused
                            error={!!touched.Date && !!errors.Date}
                            helperText={touched.Date && errors.Date}
                            // inputProps={{ maxLength:10}}
                            sx={{ background: "#ffe5f1" }}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        ) : (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="Date"
                            label={`${
                              invoicefilter == "PI"
                                ? "Proforma Invoice Date "
                                : "Final Invoice Date"
                            }`}
                            value={
                              invoicefilter == "PI"
                                ? values.ProfoInvoiceDate
                                : values.FinalInvoiceDate
                            }
                            id="Date"
                            name="Date"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputFormat="YYYY-MM-DD"
                            focused
                            sx={{ background: "#ffe5f1" }}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        )}
                      </FormControl>
  
                      <FormControl sx={{ gridColumn: "span 4", gap: "40px" }}>
                        <Formik
                          initialValues={accountinitialValues}
                          onSubmit={(values, setSubmitting) => {
                            setTimeout(() => {
                              fnaccountSave(values, "");
                              // alert("hai");
                            }, 100);
                          }}
                          validationSchema={proformaaccountSchema}
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
                              <Divider variant="fullWidth" sx={{ mt: "20px" }} />
  
                              <Typography variant="h5">Bank:</Typography>
                              <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                  "& > div": {
                                    gridColumn: isNonMobile
                                      ? undefined
                                      : "span 4",
                                  },
                                }}
                              >
                                <TextField
                                  id="outlined-basic"
                                  label="ID"
                                  variant="filled"
                                  value={selectBOLookupData.OBkRecordID}
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
                                      label="Opening"
                                      variant="filled"
                                      value={selectBOLookupData.OpeningBankcode}
                                      focused
                                      inputProps={{ tabIndex: "-1" }}
                                    />
  
                                    {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}
  
                                    <IconButton
                                      sx={{ height: 40, width: 40 }}
                                    //   onClick={() => handleShow("BO")}
                                    >
                                      <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                    </IconButton>
                                    <TextField
                                      id="outlined-basic"
                                      label=""
                                      variant="filled"
                                      value={
                                        selectBOLookupData.OpeningBankdescription
                                      }
                                      fullWidth
                                      inputProps={{ tabIndex: "-1" }}
                                      focused
                                    />
                                  </FormControl>
                                </FormControl>
  
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.Refcode}
                                    id="Refcode"
                                    name="Refcode"
                                    label="Ref #"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.Refcode && !!errors.Refcode}
                                    helperText={touched.Refcode && errors.Refcode}
                                    focused
                                    inputProps={{ maxLength: 200 }}
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                </FormControl>
  
                                <TextField
                                  id="outlined-basic"
                                  label="ID"
                                  variant="filled"
                                  value={selectBALookupData.ABkRecordID}
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
                                      label="Advising"
                                      variant="filled"
                                      value={selectBALookupData.AdvisingBankcode}
                                      focused
                                      inputProps={{ tabIndex: "-1" }}
                                    />
  
                                    <IconButton
                                      sx={{ height: 40, width: 40 }}
                                    //   onClick={() => handleShow("BA")}
                                    >
                                      <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                    </IconButton>
                                    <TextField
                                      id="outlined-basic"
                                      label=""
                                      variant="filled"
                                      value={
                                        selectBALookupData.AdvisingBankdescription
                                      }
                                      fullWidth
                                      inputProps={{ tabIndex: "-1" }}
                                      focused
                                    />
                                  </FormControl>
                                </FormControl>
  
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.Referencecode}
                                    id="Referencecode"
                                    name="Referencecode"
                                    label="Ref #"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={
                                      !!touched.Referencecode &&
                                      !!errors.Referencecode
                                    }
                                    helperText={
                                      touched.Referencecode &&
                                      errors.Referencecode
                                    }
                                    focused
                                    inputProps={{ maxLength: 200 }}
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                </FormControl>
                              
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    value={values.Negotiating}
                                    id="Negotiating"
                                    name="Negotiating"
                                    label="Negotiating"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={
                                      !!touched.Negotiating &&
                                      !!errors.Negotiating
                                    }
                                    helperText={
                                      touched.Negotiating && errors.Negotiating
                                    }
                                    sx={{ gridColumn: "span 2" }}
                                    focused
                                    inputProps={{ maxLength: 500 }}
                                    onInvalid={(e) => {
                                      e.target.setCustomValidity(
                                        "Please Fill The Negotiating"
                                      );
                                    }}
                                    onInput={(e) => {
                                      e.target.setCustomValidity("");
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                   <TextField
                                  id="outlined-basic"
                                  label="ID"
                                  variant="filled"
                                  value={selectdirectorLookupData.directorRecordID}
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
                                      label="Director"
                                      variant="filled"
                                      value={selectdirectorLookupData.directorcode}
                                      focused
                                      fullWidth
                                      inputProps={{ tabIndex: "-1" }}
                                    />
  
                                    <IconButton
                                      sx={{ height: 40, width: 40 }}
                                    //   onClick={() => handleShow("DIRECTOR")}
                                    >
                                      <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                    </IconButton>
                                    
                                  </FormControl>
                                </FormControl>
                               
                              </Box>
  
                            {invoicefilter == "PI" || invoicefilter == "PI" ?<> <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                              <Typography variant="h5">
                                Account details :
                              </Typography>
                              <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                  "& > div": {
                                    gridColumn: isNonMobile
                                      ? undefined
                                      : "span 4",
                                  },
                                  mt: "30px",
                                }}
                              >
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Payment Terms"
                                    value={values.Paymentterms}
                                    id="Paymentterms"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="Paymentterms"
                                    required
                                    error={
                                      !!touched.Paymentterms &&
                                      !!errors.Paymentterms
                                    }
                                    helperText={
                                      touched.Paymentterms && errors.Paymentterms
                                    }
                                    sx={{ gridColumn: "span 2" }}
                                    focused
                                    inputProps={{ maxLength: 15 }}
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                </FormControl>
  
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="date"
                                    label="Delivery Period"
                                    value={values.Deliveryperiod}
                                    id="Deliveryperiod"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="Deliveryperiod"
                                    inputFormat="YYYY-MM-DD"
                                    error={
                                      !!touched.Deliveryperiod &&
                                      !!errors.Deliveryperiod
                                    }
                                    helperText={
                                      touched.Deliveryperiod &&
                                      errors.Deliveryperiod
                                    }
                                    sx={{ gridColumn: "span 2" }}
                                    focused
                                    inputProps={{ maxLength: 30 }}
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                </FormControl>
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="number"
                                    label="Quantity units"
                                    value={values.QuantityUnits}
                                    id="QuantityUnits"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="QuantityUnits"
                                    error={
                                      !!touched.QuantityUnits &&
                                      !!errors.QuantityUnits
                                    }
                                    helperText={
                                      touched.QuantityUnits &&
                                      errors.QuantityUnits
                                    }
                                    sx={{
                                      gridColumn: "span 2",
                                      background: "#fff6c3",
                                      input: { textAlign: "right" },
                                    }}
                                    focused
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                </FormControl>
  
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Product Rate (In terms)"
                                    value={values.Freightrate}
                                    id="Freightrate"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="Freightrate"
                                    required
                                    error={
                                      !!touched.Freightrate &&
                                      !!errors.Freightrate
                                    }
                                    helperText={
                                      touched.Freightrate && errors.Freightrate
                                    }
                                    sx={{
                                      gridColumn: "span 2",
                                      background: "#fff6c3",
                                    }}
                                    focused
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                </FormControl>
  
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="number"
                                    label="Amount"
                                    value={values.Amount}
                                    id="Amount"
                                    name="Amount"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    required
                                    focused
                                    error={!!touched.Amount && !!errors.Amount}
                                    helperText={touched.Amount && errors.Amount}
                                    sx={{
                                      background: "#fff6c3",
                                      input: { textAlign: "right" },
                                    }}
                                    onInvalid={(e) => {
                                      e.target.setCustomValidity(
                                        "Please Fill The Amount"
                                      );
                                    }}
                                    onInput={(e) => {
                                      // e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,8)
                                      e.target.setCustomValidity("");
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                </FormControl>
                              </Box></>:false} 
                              <Popup
                                title="Opening Bank"
                                openPopup={openBOPopup}
                                setOpenPopup={setOpenBOPopup}
                              >
                                <Listviewpopup
                                  accessID="2006"
                                  screenName="Opening Bank"
                                  childToParent={childToParent}
                                />
                              </Popup>
                              <Popup
                                title="Advising Bank"
                                openPopup={openBAPopup}
                                setOpenPopup={setOpenBAPopup}
                              >
                                <Listviewpopup
                                  accessID="2006"
                                  screenName="Advising Bank"
                                  childToParent={childToParent}
                                />
                              </Popup>
                              <Popup
                                title="Director"
                                openPopup={opendirectorPopup}
                                setOpenPopup={setOpendirectorPopup}
                              >
                                <Listviewpopup
                                  accessID="2068"
                                  screenName="Director"
                                  childToParent={childToParent}
                                />
                                </Popup>
                              {/* <Box
                                display="flex"
                                justifyContent="end"
                                mt="20px"
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
  
                                <Button
                                  color="warning"
                                  variant="contained"
                                  onClick={() => {
                                    setScreen(0);
                                  }}
                                >
                                  Cancel
                                </Button>
                              </Box> */}
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
  
  
          {show == "4" ? (
            <Box m="20px" sx={{ m: 2 }}>
              <Formik
                // onSubmit={handleFormSubmit}
                initialValues={initialValues}
                enableReinitialize={true}
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
                      <FormControl sx={{ gridColumn: "span 2" }}>
                        {invoicefilter == "SI" ? (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="Text"
                            label="Sample Invoice ID"
                            value={values.Id}
                            id="Id"
                            name="Id"
                            sx={{ background: "#fff6c3" }}
                            focused
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        ) : (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label={`${
                              invoicefilter == "PI"
                                ? "Proforma Invoice No "
                                : "Final Invoice No"
                            }`}
                            value={
                              invoicefilter == "PI"
                                ? values.ProfoInvoiceNO
                                : values.FinalInvoiceNo
                            }
                            sx={{ background: "#fff6c3" }}
                            focused
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        )}
                      </FormControl>
                      <FormControl sx={{ gridColumn: "span 2" }}>
                        {invoicefilter == "SI" ? (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="Date"
                            label="Sample Invoice Date"
                            value={values.Date}
                            id="Date"
                            name="Date"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputFormat="YYYY-MM-DD"
                            focused
                            error={!!touched.Date && !!errors.Date}
                            helperText={touched.Date && errors.Date}
                            // inputProps={{ maxLength:10}}
                            sx={{ background: "#ffe5f1" }}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        ) : (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="Date"
                            label={`${
                              invoicefilter == "PI"
                                ? "Proforma Invoice Date "
                                : "Final Invoice Date"
                            }`}
                            value={
                              invoicefilter == "PI"
                                ? values.ProfoInvoiceDate
                                : values.FinalInvoiceDate
                            }
                            id="Date"
                            name="Date"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputFormat="YYYY-MM-DD"
                            focused
                            sx={{ background: "#ffe5f1" }}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        )}
                      </FormControl>
  
                      <FormControl sx={{ gridColumn: "span 4", gap: "40px" }}>
                        <Formik
                          initialValues={otherInitialvalues}
                          onSubmit={(values, setSubmitting) => {
                            setTimeout(() => {
                              fnotherSave(values, "");
                              // alert("hai");
                            }, 100);
                          }}
                          validationSchema={proformaotherSchema}
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
                              <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                              <Typography variant="h5">Other Details:</Typography>
                              <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                  "& > div": {
                                    gridColumn: isNonMobile
                                      ? undefined
                                      : "span 4",
                                  },
                                  mt: "30px",
                                }}
                              >
                                <FormControl sx={{ gridColumn: "span 4" }}>
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Item Header"
                                    value={values.Itemheader}
                                    id="Itemheader"
                                    name="Itemheader"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    required
                                    focused
                                    error={
                                      !!touched.Itemheader && !!errors.Itemheader
                                    }
                                    helperText={
                                      touched.Itemheader && errors.Itemheader
                                    }
                                    inputProps={{ maxLength: 500 }}
                                    onInvalid={(e) => {
                                      e.target.setCustomValidity(
                                        "Please Fill The Item Header"
                                      );
                                    }}
                                    onInput={(e) => {
                                      e.target.setCustomValidity("");
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                </FormControl>
  
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Notify"
                                    value={values.Notify}
                                    id="Notify"
                                    name="Notify"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    required
                                    focused
                                    error={!!touched.Notify && !!errors.Notify}
                                    helperText={touched.Notify && errors.Notify}
                                    inputProps={{ maxLength: 500 }}
                                    onInvalid={(e) => {
                                      e.target.setCustomValidity(
                                        "Please Fill The Notify"
                                      );
                                    }}
                                    onInput={(e) => {
                                      e.target.setCustomValidity("");
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                </FormControl>
  
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Item Footer"
                                    value={values.Itemfooter}
                                    id="Itemfooter"
                                    name="Itemfooter"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    required
                                    focused
                                    error={
                                      !!touched.Itemfooter && !!errors.Itemfooter
                                    }
                                    helperText={
                                      touched.Itemfooter && errors.Itemfooter
                                    }
                                    inputProps={{ maxLength: 500 }}
                                    onInvalid={(e) => {
                                      e.target.setCustomValidity(
                                        "Please Fill The Item Footer"
                                      );
                                    }}
                                    onInput={(e) => {
                                      e.target.setCustomValidity("");
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                  />
                                </FormControl>
                              </Box>
  
                              {/* <Box
                                display="flex"
                                justifyContent="end"
                                mt="20px"
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
                                {/* <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => {
                                      fnotherSave(values, 'harddelete');
                                    }}
                                    >
                                      delete
                                    </Button> */}
                                {/* <Button
                                  color="warning"
                                  variant="contained"
                                  onClick={() => {
                                    setScreen(0);
                                  }}
                                >
                                  Cancel
                                </Button>
                              </Box>  */}
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
  
          {show == "5" ? (
            <Box m="20px">
              <Formik
                // initialValues={initialValues}
                onSubmit={(values, setSubmitting) => {}}
                // validationSchema={proformainvoiceSchema}
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
                        mt: "30px",
                      }}
                    >
                      <FormControl
                        fullWidth
                        sx={{ gridColumn: "span 2", gap: "40px" }}
                      >
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label={`${
                            invoicefilter == "SI"
                              ? "Proforma Invoice NO "
                              : "Final Invoice NO"
                          }`}
                          onBlur={handleBlur}
                          placeholder="Auto"
                          value={invNo}
                          onChange={(e) => setInvno(e.target.value)}
                          // id="Code"
                          // name="Code"
                          // error={!!touched.Code && !!errors.Code}
                          // helperText={touched.Code && errors.Code}
                          sx={{
                            background: "#fff6c3",
                            input: { textAlign: "right" },
                          }}
                          focused
                          // required
                          autoFocus
                          // onInvalid={(e) => { e.target.setCustomValidity('Please Fill The Invoice NO') }}
  
                          InputProps={{
                            readOnly: true,
                          }}
                        />
  
                        <TextField
                          fullWidth
                          variant="filled"
                          type="date"
                          label="Date"
                          // id="Desc"
                          onBlur={handleBlur}
                          // onChange={handleChange}
                          value={invDate}
                          onChange={(e) => setInvDate(e.target.value)}
                          // name="Desc"
                          // error={!!touched.Desc && !!errors.Desc}
                          // helperText={touched.Desc && errors.Desc}
                          sx={{ gridColumn: "span 2" }}
                          focused
                          required
                          inputProps={{ maxLength: 30 }}
                          onInvalid={(e) => {
                            e.target.setCustomValidity("Please Fill The Date");
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
  
                        <TextField
                          id="outlined-basic"
                          label="ID"
                          variant="filled"
                          //  value={selectPILookupData.PIRecordID}
                          focused
                          sx={{ display: "none" }}
                        />
  
                        <FormControl
                          sx={{
                            gridColumn: "span 2",
                            display: "flex",
                          }}
                        >
                          {/* <FormLabel>Material </FormLabel> */}
                          <FormControl
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <TextField
                              id="outlined-basic"
                              label={`${
                                invoicefilter == "SI"
                                  ? "Sample Invoice NO "
                                  : "Proforma Invoice NO"
                              }`}
                              variant="filled"
                              value={Data.Id}
                              focused
                              required
                              inputProps={{ tabIndex: "-1" }}
                            />
                            <IconButton
                              sx={{ height: 40, width: 40 }}
                            //   onClick={() => handleShow("PI")}
                            >
                              <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                            </IconButton>
                            {/* <MoreHorizIcon  onClick={()=>handleShow('SM')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}
  
                            <TextField
                              id="outlined-basic"
                              // label="Description"
                              variant="filled"
                              value={Data.CustName}
                              fullWidth
                              inputProps={{ tabIndex: "-1" }}
                              focused
                            />
                          </FormControl>
                        </FormControl>
                      </FormControl>
                    </Box>
                    {/* <Box display="flex" justifyContent="end" mt="20px" gap={2}>
                      {YearFlag == "true" ? (
                        <LoadingButton
                          color="secondary"
                          variant="contained"
                          onClick={() => {
                            invoicefilter == "SI"
                              ? fnProformainvoice()
                              : fninvoice();
                          }}
                          loading={loading}
                        >
                          Confirm
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
                        type="submit"
                        color="warning"
                        variant="contained"
                        onClick={() => {
                          navigate(
                            `/Apps/Secondarylistview/TR011/Proforma%20Invoice/${parentID}/${invoicefilter}`
                          );
                        }}
                      >
                        Cancel
                      </Button>
                    </Box> */}
                  </form>
                )}
              </Formik>
  
              <Popup
                title="Proforma Invoice"
                openPopup={openPIpopup}
                setOpenPopup={setOpenPIpopup}
              >
                <Listviewpopup
                  accessID="2029"
                  screenName="Proforma Invoice"
                  childToParent={childToParent}
                />
              </Popup>
  
              <Popup
                title="Customer"
                openPopup={openCTYpopup}
                setOpenPopup={setOpenCTYpopup}
              >
                <Listviewpopup
                  accessID="2009"
                  screenName="Customer"
                  childToParent={childToParent}
                />
              </Popup>
              <Popup
                title="Currency"
                openPopup={openCURpopup}
                setOpenPopup={setOpenCURpopup}
              >
                <Listviewpopup
                  accessID="2004"
                  screenName="Currency"
                  childToParent={childToParent}
                />
              </Popup>
              <Popup
                title="Consignee"
                openPopup={openCOSpopup}
                setOpenPopup={setOpenCOSpopup}
              >
                <Listviewpopup
                  accessID="2009"
                  screenName="Consignee"
                  childToParent={childToParent}
                />
              </Popup>
              <Popup
                title="Buyer/other Customer"
                openPopup={openBOCpopup}
                setOpenPopup={setOpenBOCpopup}
              >
                <Listviewpopup
                  accessID="2009"
                  screenName="Buyer/other Customer"
                  childToParent={childToParent}
                />
              </Popup>
            </Box>
          ) : (
            false
          )}
  
           {show == "6" ? (
            <Box m="20px" sx={{ m: 2 }}>
              <Formik
                // onSubmit={handleFormSubmit}
                initialValues={initialValues}
                enableReinitialize={true}
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
                      <FormControl sx={{ gridColumn: "span 2" }}>
                        {invoicefilter == "SI" ? (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="Text"
                            label="Sample Invoice ID"
                            value={values.Id}
                            id="Id"
                            name="Id"
                            sx={{ background: "#fff6c3" }}
                            focused
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        ) : (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label={`${
                              invoicefilter == "PI"
                                ? "Proforma Invoice No "
                                : "Final Invoice No"
                            }`}
                            value={
                              invoicefilter == "PI"
                                ? values.ProfoInvoiceNO
                                : values.FinalInvoiceNo
                            }
                            sx={{ background: "#fff6c3" }}
                            focused
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        )}
                      </FormControl>
                      <FormControl sx={{ gridColumn: "span 2" }}>
                        {invoicefilter == "SI" ? (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="Date"
                            label="Sample Invoice Date"
                            value={values.Date}
                            id="Date"
                            name="Date"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputFormat="YYYY-MM-DD"
                            focused
                            error={!!touched.Date && !!errors.Date}
                            helperText={touched.Date && errors.Date}
                            // inputProps={{ maxLength:10}}
                            sx={{ background: "#ffe5f1" }}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        ) : (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="Date"
                            label={`${
                              invoicefilter == "PI"
                                ? "Proforma Invoice Date "
                                : "Final Invoice Date"
                            }`}
                            value={
                              invoicefilter == "PI"
                                ? values.ProfoInvoiceDate
                                : values.FinalInvoiceDate
                            }
                            id="Date"
                            name="Date"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputFormat="YYYY-MM-DD"
                            focused
                            sx={{ background: "#ffe5f1" }}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        )}
                      </FormControl>
  
                      <FormControl sx={{ gridColumn: "span 4", gap: "40px" }}>
                        <Formik
                          initialValues={postshipmentinitialValues}
                          onSubmit={(values, setSubmitting) => {
                            setTimeout(() => {
                              fnpostshipmentSave(values, "");
                              // alert("hai");
                            }, 100);
                          }}
                          // validationSchema={proformaotherSchema}
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
                                    gridColumn: isNonMobile
                                      ? undefined
                                      : "span 4",
                                  },
                                  mt: "30px",
                                }}
                              >
                                 <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Shipment Bill #"
                                    value={values.shipmentbill}
                                    id="shipmentbill"
                                    name="shipmentbill"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    required
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="date"
                                    label="Shipment Date"
                                    value={values.shipmentdate}
                                    id="shipmentdate"
                                    name="shipmentdate"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    required
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="date"
                                    label="BRC Recon Date"
                                    value={values.brcrecondate}
                                    id="brcrecondate"
                                    name="brcrecondate"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Bank"
                                    value={values.bank}
                                    id="bank"
                                    name="bank"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="AWB / BL #"
                                    value={values.awbbl}
                                    id="awbbl"
                                    name="awbbl"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="date"
                                    label="AWB / BL Date"
                                    value={values.awbbldate}
                                    id="awbbldate"
                                    name="awbbldate"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  <TextField
                                  id="outlined-basic"
                                  label="ID"
                                  variant="filled"
                                   value={selectairlineLookupData.airlineRecordID}
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
                                      label="Airline/Linear"
                                      variant="filled"
                                       value={selectairlineLookupData.airlinecode}
                                      focused
                                      inputProps={{ tabIndex: "-1" }}
                                    />
  
                                    {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}
  
                                    <IconButton
                                      sx={{ height: 40, width: 40 }}
                                       onClick={() => handleShow("AIRLINE")}
                                    >
                                      <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                    </IconButton>
                                    <TextField
                                      id="outlined-basic"
                                      label=""
                                      variant="filled"
                                      value={
                                        selectairlineLookupData.airlinedescription
                                      }
                                      fullWidth
                                      inputProps={{ tabIndex: "-1" }}
                                      focused
                                    />
                                  </FormControl>
                                </FormControl>
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Clearing Agent"
                                    value={values.clearingagent}
                                    id="clearingagent"
                                    name="clearingagent"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="MCCI / GSP #"
                                    value={values.mccigsp}
                                    id="mccigsp"
                                    name="mccigsp"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="date"
                                    label="MCCI / GSP Date"
                                    value={values.mccigspdate}
                                    id="mccigspdate"
                                    name="mccigspdate"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Invoice Deduction Amount"
                                    value={values.invoicedeductionamount}
                                    id="invoicedeductionamount"
                                    name="invoicedeductionamount"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Actual Amount"
                                    value={values.actualamount}
                                    id="actualamount"
                                    name="actualamount"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="F.A.C.Comission%"
                                    value={values.faccomission}
                                    id="faccomission"
                                    name="faccomission"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Amount"
                                    value={values.facamount}
                                    id="facamount"
                                    name="facamount"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="L.A.C.Comission%"
                                    value={values.laccomission}
                                    id="laccomission"
                                    name="laccomission"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Amount"
                                    value={values.lacamount}
                                    id="lacamount"
                                    name="lacamount"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                 
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Actual Frieght"
                                    value={values.actualfrieght}
                                    id="actualfrieght"
                                    name="actualfrieght"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Actual Insurance"
                                    value={values.actualinsurance}
                                    id="actualinsurance"
                                    name="actualinsurance"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Invoice Amount"
                                    value={values.invoiceamount}
                                    id="invoiceamount"
                                    name="invoiceamount"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Exchange Rate"
                                    value={values.exchangerate}
                                    id="exchangerate"
                                    name="exchangerate"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Invoice Value(INR)"
                                    value={values.invoicevalue}
                                    id="invoicevalue"
                                    name="invoicevalue"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="FOB Value"
                                    value={values.fobvalue}
                                    id="fobvalue"
                                    name="fobvalue"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Payment Recd Amt 1"
                                    value={values.paymentreceivedamount1}
                                    id="paymentreceivedamount1"
                                    name="paymentreceivedamount1"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="date"
                                    label="Payment Recd Date"
                                    value={values.paymentreceiveddate1}
                                    id="paymentreceiveddate1"
                                    name="paymentreceiveddate1"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                   <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Payment Recd Amt 2"
                                    value={values.paymentreceivedamount2}
                                    id="paymentreceivedamount2"
                                    name="paymentreceivedamount2"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                    <TextField
                                    fullWidth
                                    variant="filled"
                                    type="date"
                                    label="Payment Recd Date"
                                    value={values.paymentreceiveddate2}
                                    id="paymentreceiveddate2"
                                    name="paymentreceiveddate2"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                    <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Payment Recd Amt 3"
                                    value={values.paymentreceivedamount3}
                                    id="paymentreceivedamount3"
                                    name="paymentreceivedamount3"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="date"
                                    label="Payment Recd Date"
                                    value={values.paymentreceiveddate3}
                                    id="paymentreceiveddate3"
                                    name="paymentreceiveddate3"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="PCL Amount"
                                    value={values.pclamount}
                                    id="pclamount"
                                    name="pclamount"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="date"
                                    label="PCL Closing Date"
                                    value={values.pclclosingdate}
                                    id="pclclosingdate"
                                    name="pclclosingdate"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  
                              </Box>
                              <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                              <Typography variant="h5">Drawback</Typography>
                              <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                  "& > div": {
                                    gridColumn: isNonMobile
                                      ? undefined
                                      : "span 4",
                                  },
                                  mt: "30px",
                                }}
                              >
                               <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Amount(INR)"
                                    value={values.amount}
                                    id="amount"
                                    name="amount"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Received(INR)"
                                    value={values.received}
                                    id="received"
                                    name="received"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="date"
                                    label="Received Date"
                                    value={values.receiveddate}
                                    id="receiveddate"
                                    name="receiveddate"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Difference(INR)"
                                    value={values.difference}
                                    id="difference"
                                    name="difference"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    focused
                                   sx={{gridColumn:"span 2"}}
                                  />
                              </Box>
                              <Box>
                            <Field
                              //  size="small"
                              type="checkbox"
                              name="brcavailed"
                              id="brcavailed"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              as={Checkbox}
                              label="BRC Availed"
                            />
  
                            <FormLabel focused={false}>BRC Availed</FormLabel>
                            <Field
                              //  size="small"
                              type="checkbox"
                              name="commissionpaid"
                              id="commissionpaid"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              as={Checkbox}
                              label="Commission Paid"
                            />
  
                            <FormLabel focused={false}>Commission Paid</FormLabel>
                            </Box>
                              <Box
                                display="flex"
                                justifyContent="end"
                                mt="20px"
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
                                {/* <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => {
                                      fnotherSave(values, 'harddelete');
                                    }}
                                    >
                                      delete
                                    </Button> */}
                                <Button
                                  color="warning"
                                  variant="contained"
                                  onClick={() => {
                                    setScreen(0);
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
                    <Popup
                                title="Airline"
                                openPopup={openairlinePopup}
                                setOpenPopup={setOpenairlinePopup}
                              >
                                <Listviewpopup
                                  accessID="2008"
                                  screenName="Airline"
                                  childToParent={childToParent}
                                />
                              </Popup>
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
  
  export default Editpostshipment;
  