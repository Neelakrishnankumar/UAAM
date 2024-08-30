import React, { useState, useEffect, useRef } from "react";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import {
  useTheme,
  TextField,
  Box,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  FormControlLabel,
  Checkbox,
  Tooltip,
  Breadcrumbs,
  LinearProgress,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { Formik, Field, Form, useField, useFormikContext } from "formik";
import { deliverychalanSchema } from "../../Security/validation";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Resizer from "react-image-file-resizer";
import {
  dcpostSummary,
  dcSummary,
  explorePostData,
  fetchApidata,
  getFetchData,
  postApidata,
  postApidatawol,
  postData,
  StockProcessApi,
} from "../../../store/reducers/Formapireducer";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import store from "../../../index";
import Listviewpopup from "../Lookup";
import Popup from "../popup";
import { tokens } from "../../../Theme";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { imageUpload } from "../../../store/reducers/Imguploadreducer";
// ***********************************************
// Developer:Gowsalya
// Purpose:Create chalan and item based screen
// ***********************************************

async function fetchNewTextC(a, b) {
  await new Promise((r) => setTimeout(r, 200));
  return ` ${Number(a || 0) + Number(b || 0)}`;
}

const MyField = (props) => {
  const {
    values: { HideSqft, SideSqft },
    setFieldValue,
    touched,
  } = useFormikContext();
  const [field, meta] = useField(props);

  React.useEffect(() => {
    let isCurrent = true;
    // your business logic around when to fetch goes here.

    fetchNewTextC(HideSqft, SideSqft).then((Totalqty) => {
      if (!!isCurrent) {
        // prevent setting old values
        setFieldValue(props.name, Totalqty.trim());
        // alert(Totalqty)
      }
    });

    return () => {
      isCurrent = false;
    };
  }, [HideSqft, SideSqft, setFieldValue, props.name]);

  return (
    <React.Fragment>
      <TextField {...props} {...field} />
      {/* {!!meta.touched && !!meta.error && <div>{meta.error}</div>} */}
    </React.Fragment>
  );
};

const Editdeliverychalan = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const listViewData = useSelector((state) => state.listviewApi.rowData);
  const listViewcolumn = useSelector((state) => state.listviewApi.columnData);
  const [pageSize, setPageSize] = React.useState(10);
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var parentRecID = params.parentRecID;
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  var secondaryAccessID = params.secondaryAccessID;
  var parentID = params.filtertype;
  const chaildID = params.CType;
  const remarkType = params.remarkType;
  const remarkDec = params.remarkDec;
  var filter = `${recID} AND Type = '${parentID}'`;

  const Data = useSelector((state) => state.formApi.Data);
  // console.log(
  //   "🚀 ~ file: Editdeliverychalan.jsx:229 ~ Editdeliverychalan ~ Data:",
  //   Data
  // );
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.loading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const postLoading = useSelector((state) => state.formApi.postLoading);
  const exploreLoading = useSelector((state) => state.exploreApi.loading);

  const summaryData = useSelector((state) => state.formApi.summaryData);
  console.log("summarydata", summaryData);
  const [show, setScreen] = React.useState(0);
  const [portType, setPortType] = useState("R");
  const location = useLocation();
  const screenChange = (event) => {
    setScreen(event.target.value);
  };
  useEffect(() => {
    dispatch(getFetchData({ accessID: "TR052", get: "get", recID }));
  }, [location.key]);

  const [ini, setIni] = useState(true);
  const [iniItem, setIniItem] = useState(true);
  const [loading, setLoading] = useState(false);
  // Lookup
  const [isPopupData, setisPopupdata] = React.useState(false);
  const [openDSpopup, setOpenDSpopup] = useState(false);
  const [openDRpopup, setOpenDRpopup] = useState(false);
  const [openDPpopup, setOpenDPpopup] = useState(false);
  const [openDLpopup, setOpenDLpopup] = useState(false);
  const [openDMpopup, setOpenDMpopup] = useState(false);
  const [openCPpopup, setOpenCPpopup] = useState(false);
  const [openGRDPopup, setOpenGRDPopup] = useState(false);
  const [openSUBPopup, setOpenSUBPopup] = useState(false);
  const [openDCPopup, setOpenDCPopup] = useState(false);
  const [openGatPopup, setOpenGatPopup] = useState(false);
  const [openRecIPopup, setOpenRecIPopup] = useState(false);
  const [openJwbPopup, setOpenJwbPopup] = useState(false);
  const [openPurIPopup, setOpenPurIPopup] = useState(false);
  const [openLocIPopup, setOpenLocIPopup] = useState(false);
  const [openIndentPopup, setOpenIndentPopup] = useState(false);
  const [openJobworkSupplierPopup, setOpenJobworkSupplierPopup] = useState(false);
  // ************Lookup Function***************
  function handleShow(type) {
    if (type == "LOC") {
      setOpenLocIPopup(true);
    }
    if (type == "JWSV") {
      setOpenJobworkSupplierPopup(true);
    }
    if (type == "PUI") {
      setOpenPurIPopup(true);
    }
    if (type == "REI") {
      setOpenRecIPopup(true);
    }
    if (type == "JWB") {
      setOpenJwbPopup(true);
    }
    if (type == "GAT") {
      setOpenGatPopup(true);
    }
    if (type == "DS") {
      setOpenDSpopup(true);
    }
    if (type == "CO") {
      setOpenDRpopup(true);
    }
    if (type == "DP") {
      setOpenDPpopup(true);
    }

    if (type == "DM") {
      setOpenDMpopup(true);
    }
    if (type == "CP") {
      setOpenCPpopup(true);
    }
    if (type == "DL") {
      setOpenDLpopup(true);
    }
    if (type == "GRD") {
      setOpenGRDPopup(true);
    }
    if (type == "SUB") {
      setOpenSUBPopup(true);
    }
    if (type == "DC") {
      setOpenDCPopup(true);
    }
    if (type == "INDENT") {
      setOpenIndentPopup(true);
    }
  }

  //************************** Lookup value assign type based Function *****************/

  const childToParent = (childdata, type) => {
    console.log("type---" + type);
    console.log("Data---" + JSON.stringify(childdata));
    setisPopupdata(true);

    if (type == "Supplier") {
      setselectDSLookupData({
        SUPlookupCode: childdata.Code,
        SUPlookupRecordid: childdata.RecordID,
        SUPlookupDesc: childdata.Name,
      });
      setOpenDSpopup(false);
    }
    if (type == "Company") {
      setselectDRLookupData({
        DRlookupCode: childdata.Code,
        DRlookupRecordid: childdata.RecordID,
        DRlookupDesc: childdata.Name,
      });
      setOpenDRpopup(false);
    }
    if (type == "Production Card") {
      setselectDPLookupData({
        DPlookupCode: childdata.Code,
        DPlookupRecordid: childdata.RecordID,
        DPlookupDesc: childdata.Name,
      });
      setOpenDPpopup(false);
    }
    if (type == "Material") {
      setselectDMLookupData({
        DMlookupCode: childdata.Code,
        DMlookupRecordid: childdata.MtlRecordID,
        DMlookupDesc: childdata.Name,
        DMlookupCgst: childdata.Cgst,
        DMlookupIgst: childdata.Igst,
        DMlookupSgst: childdata.Sgst,
        DMlookupHsnCode: childdata.HsnCode,
        DMlookupLateRate: childdata.Laterate,
        MaterialType: childdata.Type || childdata.MaterialType ,
      });
      setOpenDMpopup(false);
    }
    if (type == "Indent") {
      setselectIndentLookupData({
        IndentlookupCode: childdata.Code,
        IndentlookupRecordid: childdata.RecordID,
        IndentMaterialID: childdata.MaterialID,
      });
      setOpenIndentPopup(false);
    }
    if (type == "Jobwork Supplier") {
      setselectJwSupplierLookupData({
        jwslookupRecordid: childdata.RecordID,
        jwslookupCode: childdata.Name,
        jwslookupoDesc: childdata.Name,
      });
      setOpenJobworkSupplierPopup(false);
    }
    if (type == "Product") {
      setselectCPLookupData({
        CPlookupCode: childdata.Code,
        CPlookupRecordid: childdata.RecordID,
        CPlookupDesc: childdata.Name,
      });
      setOpenCPpopup(false);
    }
    if (type == "Leather") {
      setselectDMLookupData({
        DMlookupCode: childdata.Code,
        DMlookupRecordid: childdata.MtlRecordID,
        DMlookupDesc: childdata.Name,
        DMlookupCgst: childdata.Cgst,
        DMlookupIgst: childdata.Igst,
        DMlookupSgst: childdata.Sgst,
        DMlookupHsnCode: childdata.HsnCode,
        DMlookupLateRate: childdata.Laterate,
        MaterialType: childdata.Type,
      });
      setselectDLLookupData({
        DLlookupCode: childdata.Code,
        DLlookupRecordid: childdata.MtlRecordID,
        DLlookupDesc: childdata.Name,
      });

      setOpenDLpopup(false);
    }
    if (type == "Grade") {
      // setisPopupdata(true);
      setselectgrdLookupData({
        GRDlookupCode: childdata.Code,
        GRDlookupRecordid: childdata.RecordID,
        GRDlookupDesc: childdata.Name,
      });
      setOpenGRDPopup(false);
    }

    if (type == "Substance") {
      // setisPopupdata(true);
      setselectsubLookupData({
        SUBlookupCode: childdata.Code,
        SUBlookupRecordid: childdata.RecordID,
        SUBlookupDesc: childdata.Name,
      });
      setOpenSUBPopup(false);
    }
    if (type == "Customer") {
      setselectDCLookupData({
        DClookupRecordid: childdata.RecordID,
        DClookupCode: childdata.Code,
        DClookupDesc: childdata.Name,
      });
      setOpenDCPopup(false);
    }
    if (type == "Gate Entry") {
      setGateLookup({
        gatRecordID: childdata.RecordID,
        gatCode: childdata.Code,
        gatName: childdata.Name,
      });
      setOpenGatPopup(false);
    }
    if (type == "Purchasing Incharge") {
      setPurLookup({
        purRecordID: childdata.RecordID,
        purCode: childdata.Code,
        purName: childdata.Name,
      });
      setOpenPurIPopup(false);
    }
    if (type == "Receiving Incharge") {
      setRecLookup({
        recRecordID: childdata.RecordID,
        recCode: childdata.Code,
        recName: childdata.Name,
      });
      setOpenRecIPopup(false);
    }
    if (type == "Job Work Components") {
      setJwbLookup({
        jwbRecordID: childdata.RecordID,
        jwbCode: childdata.Code,
        jwbName: childdata.Name,
      });
      setOpenJwbPopup(false);
    }
    if (type == "Location") {
      setLocaLookup({
        LocaRecordID: childdata.RecordID,
        LocaCode: childdata.Code,
        LocaName: childdata.Name,
      });
      setOpenLocIPopup(false);
    }
  };

  /********************************* Look up***************************/
  const [LocaLookup, setLocaLookup] = React.useState({
    LocaRecordID: "",
    LocaCode: "",
    LocaName: "",
  });
  const [gateLookup, setGateLookup] = React.useState({
    gatRecordID: "",
    gatCode: "",
    gatName: "",
  });

  const [purLookup, setPurLookup] = React.useState({
    purRecordID: "",
    purCode: "",
    purName: "",
  });
  const [recLookup, setRecLookup] = React.useState({
    recRecordID: "",
    recCode: "",
    recName: "",
  });

  //-----JOB WORK LOOKUP------//
  const [jwbLookup, setJwbLookup] = React.useState({
    jwbRecordID: "",
    jwbCode: "",
    jwbName: "",
  });
  const [selectDCLookupData, setselectDCLookupData] = React.useState({
    DClookupRecordid: "",
    DClookupCode: "",
    DClookupDesc: "",
  });
  // header
  const [selectDSLookupData, setselectDSLookupData] = React.useState({
    SUPlookupRecordid: "",
    SUPlookupCode: "",
    SUPlookupDesc: "",
  });
  const [selectDRLookupData, setselectDRLookupData] = React.useState({
    DRlookupRecordid: "",
    DRlookupCode: "",
    DRlookupDesc: "",
  });
  const [selectDPLookupData, setselectDPLookupData] = React.useState({
    DPlookupRecordid: "",
    DPlookupCode: "",
    DPlookupDesc: "",
  });
  // CHALAN MATERIAL LOOKUP
  const [selectDMLookupData, setselectDMLookupData] = React.useState({
    DMlookupRecordid: "",
    DMlookupCode: "",
    DMlookupDesc: "",
    DMlookupIgst: "",
    DMlookupSgst: "",
    DMlookupCgst: "",
    DMlookupHsnCode: "",
    DMlookupLateRate: "",
    DMlookupdamageQuantity: "",
    MaterialType: "",
  });
  const [selectIndentLookupData, setselectIndentLookupData] = React.useState({
    IndentlookupRecordid: "",
    IndentlookupCode: "",
    IndentMaterialID: "",
  });
  const [selectJwSupplierLookupData, setselectJwSupplierLookupData] = React.useState({
    jwslookupRecordid: "",
    jwslookupCode: "",
    jwslookupoDesc: "",
  });
  // CHALAN PRODUCT LOOKUP
  const [selectCPLookupData, setselectCPLookupData] = React.useState({
    CPlookupRecordid: "",
    CPlookupCode: "",
    CPlookupDesc: "",
  });
  // CHALAN LEATHER LOOKUP
  const [selectDLLookupData, setselectDLLookupData] = React.useState({
    DLlookupRecordid: "",
    DLlookupCode: "",
    DLlookupDesc: "",
  });
  // grade
  const [selectgrdLookupData, setselectgrdLookupData] = React.useState({
    GRDlookupRecordid: "",
    GRDlookupCode: "",
    GRDlookupDesc: "",
  });
  // substance
  const [selectsubLookupData, setselectsubLookupData] = React.useState({
    SUBlookupRecordid: "",
    SUBlookupCode: "",
    SUBlookupDesc: "",
  });

  if (isPopupData == false) {
    selectDSLookupData.SUPlookupRecordid = Data.SuppRecordID;
    selectDSLookupData.SUPlookupCode = Data.SupplierCode;
    selectDSLookupData.SUPlookupDesc = Data.SupplierName;
  }

  if (isPopupData == false) {
    selectDRLookupData.DRlookupRecordid = Data.CompanyrecordID;
    selectDRLookupData.DRlookupCode = Data.CompanyCode;
    selectDRLookupData.DRlookupDesc = Data.CompanyName;
  }
  if (isPopupData == false) {
    selectDPLookupData.DPlookupRecordid = Data.PcdhRecordID;
    selectDPLookupData.DPlookupCode = Data.ProductionCardNo;
    selectDPLookupData.DPlookupDesc = Data.ProductionQty;
  }
  if (isPopupData == false) {
    selectDCLookupData.DClookupRecordid = Data.CustomerRecordID;
    selectDCLookupData.DClookupCode = Data.CustomerCode;
    selectDCLookupData.DClookupDesc = Data.CustomerName;
  }

  if (isPopupData == false) {
    gateLookup.gatRecordID = Data.GateEntry;
    gateLookup.gatCode = Data.StoregateCode;
    gateLookup.gatName = Data.StoregateName;

    purLookup.purRecordID = Data.PurchaseIncharge;
    purLookup.purCode = Data.PurchaseInchargeCode;
    purLookup.purName = Data.PurchaseInchargeName;

    recLookup.recRecordID = Data.RecevingIncharge;
    recLookup.recCode = Data.RecevingInchargeCode;
    recLookup.recName = Data.RecevingInchargeName;

    jwbLookup.jwbRecordID = Data.JobworkBomID;
    jwbLookup.jwbCode = Data.JobworkCode;
    jwbLookup.jwbName = Data.JobworkName;

    LocaLookup.LocaRecordID = Data.LocationRecordID;
    LocaLookup.LocaCode = Data.LocationCode;
    LocaLookup.LocaName = Data.LocationName;
  }

  // header
  //  var apiData = "";
  //  apiData = {
  //    Code: Data.Code,
  //    dcDate: Data.dcDate,
  //    Type: ,
  //    SortOrder: ,
  //    Disable: ,
  //  };
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  //*******Assign Deliverychalan values from Database in  Yup initial value******* */
  const initialValues = {
    Code: mode == "A" ? Data.Code : Data.Code + " / " + Year,
    dcDate: mode == "A" ? today : Data.dcDate,
    Type: Data.Type,
    SortOrder: Data.SortOrder,
    checkbox: Data.Disable,
    InvoiceID: Data.InvoiceNo,
    InvoiceDate: Data.InvoiceDate,
    wastageQuantity: Number,
    gateEntry: Data.GateEntry,
    comments: Data.Comments,
    returnQuantity: Data.ReturnQuantity,
    damagedQuantity: Data.DamagedQuantity,
    receivedDate: Data.ReceivedDate,
    receivedQuantity: Data.ReceivedQuantity,
    quantity: Data.JobworkQty,
  };

  var prtFilterType = "";
  if (portType == "") {
    prtFilterType = `parentID ='${Data.Type}' AND ${
      parentID.slice(-1) == "I"
        ? "(DcType IN ('I','B'))"
        : "(DcType IN ('O','B'))"
    }`;
  } else
    prtFilterType = `parentID ='${portType}' AND ${
      parentID.slice(-1) == "I"
        ? "(DcType IN ('I','B'))"
        : "(DcType IN ('O','B'))"
    }`;
  const [ImageName, setImgName] = useState("");

  // **********Save Function*****************
  const fnSave = async (values) => {
    let action = mode === "A" ? "insert" : "update";
    var isCheck = "N";
    if (values.disable == true) {
      isCheck = "Y";
    }
    var idata = {
      RecordID: recID,
      Code: Data.Code,
      dcDate: values.dcDate,
      Type: remarkType,
      YearID: Year,
      Disable: values.disable == true ? "Y" : "N",
      SortOrder: 0,
      SuppRecordID: selectDSLookupData.SUPlookupRecordid,
      SupplierCode: selectDSLookupData.SUPlookupCode,
      SupplierName: selectDSLookupData.SUPlookupDesc,
      RemarkRecordID: parentRecID,
      ChalanType: parentID,
      InvoiceNo: parentID == "MI" || parentID == "LI" ? values.InvoiceID : 0,
      InvoiceDate:
        parentID == "MI" || parentID == "LI" ? values.InvoiceDate : 0,
      CustomerRecordID: selectDCLookupData.DClookupRecordid,
      CustomerCode: selectDCLookupData.DClookupCode,
      CustomerName: selectDCLookupData.DClookupDesc,
      GateEntry: gateLookup.gatRecordID,
      StoregateCode: gateLookup.gatCode,
      StoregateName: gateLookup.gatName,
      Comments: values.comments,
      ReceivedDate: values.receivedDate,
      ReceivedQuantity: values.receivedQuantity,
      ReturnQuantity: values.returnQuantity,
      DamagedQuantity: values.damagedQuantity,
      CompanyrecordID: selectDRLookupData.DRlookupRecordid,
      CompanyCode: selectDRLookupData.DRlookupCode,
      CompanyName: selectDRLookupData.DRlookupDesc,
      Finyear,
      CompanyID,
      JobworkQty: values.quantity,
      ImageName: ImageName ? ImageName : Data.ImageName,
      PurchaseIncharge: purLookup.purRecordID,
      PurchaseInchargeCode: purLookup.purCode,
      PurchaseInchargeName: purLookup.purName,
      RecevingIncharge: recLookup.recRecordID,
      RecevingInchargeCode: recLookup.recCode,
      RecevingInchargeName: recLookup.recName,
      JobworkBomID: jwbLookup.jwbRecordID,
      JobworkCode: jwbLookup.jwbCode,
      JobworkName: jwbLookup.jwbName,
      LocationRecordID: LocaLookup.LocaRecordID,
      LocationCode: LocaLookup.LocaCode,
      LocationName: LocaLookup.LocaName,
      Jobflag: parentRecID == "24" || parentRecID == "34" ? "Y" : "N",
    };

    const response = await dispatch(
      postData({ accessID: "TR052", action, idata })
    );
    console.log(response);

    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      if (mode === "A") {
        navigate(
          `/Apps/Secondarylistview/TR097/Remarks/${parentID}/${secondaryAccessID}/${parentRecID}/DC/${remarkType}/${remarkDec}/EditDelivery Chalan/${response.payload.Recid}/E`
        );
      }
    } else {
      toast.error(response.payload.Msg ? response.payload.Msg : "Error");
    }
  };

  // chalan detail

  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );
  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );

  const [boMode, setBomode] = useState("A");
  const [detaildata, setDetaildata] = useState({
    RecordID: "",
    Quantity: "",
    Rate: "",
    Reference: "",
    Bomqty: "",
    Type: "",
    HideQty: "",
    HideSqft: "",
    SideQty: "",
    SideSqft: "",
    Totalqty: "",
    SortOrder: "",
    damageQuantity: "",
    detailComments: "",
    DchalanDetailRating: "",
    IndentFlag: "N",
    jobworkFlag: "N",
  });
  //*******Assign chalan items values from Grid table in  Yup initial value******* */
  const detailInitialvalues = {
    Code: mode == "A" ? Data.Code : Data.Code + " / " + Year,
    dcDate: mode == "A" ? today : Data.dcDate,
    Quantity: Number(detaildata.Quantity).toFixed(4),
    Rate: detaildata.Rate,
    Reference: detaildata.Reference,
    Type: detaildata.Type,
    HideQty: detaildata.HideQty,
    HideSqft: Number(detaildata.HideSqft),
    SideQty: detaildata.SideQty,
    SideSqft: Number(detaildata.SideSqft),
    bomQty: detaildata.Bomqty,
    Totalqty: Number(detaildata.Totalqty).toFixed(4),
    SortOrder: detaildata.SortOrder,
    hsnCode: selectDMLookupData.DMlookupHsnCode,
    igst: selectDMLookupData.DMlookupIgst,
    sgst: selectDMLookupData.DMlookupSgst,
    cgst: selectDMLookupData.DMlookupCgst,
    lateRate: selectDMLookupData.DMlookupLateRate,
    wastageQuantity: Number,
    damageQuantity: detaildata.damageQuantity,
    netquantity: Number,
    ActDamageQuantity: Number,
    detailComments: detaildata.detailComments,
    netPrice: Number(detaildata.netPrice),
    amount: detaildata.amount,
    DchalanDetailRating: detaildata.DchalanDetailRating,
    IndentFlag: detaildata.IndentFlag == "Y" ? true : false,
    jobworkFlag: detaildata.jobworkFlag == "Y" ? true : false,
  };
  /******************Items values assign a state variale******************** */
  const selectcelldata = (data, bMode, field) => {
    console.log(
      "🚀 ~ file: Editdeliverychalan.jsx:743 ~ selectcelldata ~ data:",
      data
    );
    setBomode(bMode);

    if (bMode == "A") {
      setDetaildata({
        RecordID: "",
        Quantity: "",
        Rate: "",
        Reference: "",
        Bomqty: "",
        Type: "",
        HideQty: "",
        HideSqft: "",
        SideQty: "",
        SideSqft: "",
        DchalanDetailRating: "",
        Totalqty: "",
        SortOrder: "",
        damageQuantity: "",
        detailComments: "",
        MaterialType: "",
        IndentFlag: "",
        jobworkFlag: "",
      });
      setselectgrdLookupData({
        GRDlookupCode: "",
        GRDlookupDesc: "",
        GRDlookupRecordid: "",
      });
      setselectsubLookupData({
        SUBlookupCode: "",
        SUBlookupDesc: "",
        SUBlookupRecordid: "",
      });
      setselectIndentLookupData({
        IndentlookupCode: "",
        IndentMaterialID: "",
        IndentlookupRecordid: "",
      });
      setselectJwSupplierLookupData({
        jwslookupRecordid:'',
        jwslookupCode: '',
        jwslookupoDesc: '',
      });
      setselectDMLookupData({
        DMlookupRecordid: "",
        DMlookupCode: "",
        DMlookupDesc: "",
        DMlookupIgst: "",
        DMlookupSgst: "",
        DMlookupCgst: "",
        DMlookupHsnCode: "",
        DMlookupLateRate: "",
        DMlookupdamageQuantity: "",
        MaterialType: "",
      });
    } else {
      if (field == "action") {
        setIniItem(true);
        setDetaildata({
          RecordID: data.RecordID,
          Quantity: data.Quantity,
          Rate: data.Rate,
          Reference: data.Reference,
          Bomqty: data.Bomqty,
          Type: data.Type,
          HideQty: data.HideQty,
          HideSqft: data.HideSqft,
          SideQty: data.SideQty,
          SideSqft: data.SideSqft,
          DchalanDetailRating: data.DchalanDetailRating,
          Totalqty: data.Totalsqft,
          SortOrder: data.SortOrder,
          damageQuantity: data.DamageQty,
          detailComments: data.Comments,
          IndentFlag: data.Indentflag,
          jobworkFlag: data.Jobworkflag
        });
        if (parentID == "MI" || parentID == "MO") {
          // alert("hai")
          setselectDMLookupData({
            DMlookupCode: data.MaterialCode,
            DMlookupDesc: data.MaterialDescription,
            DMlookupRecordid: data.MaterialRecordID,
            DMlookupCgst: Number(data.Cgst),
            DMlookupIgst: Number(data.Igst),
            DMlookupSgst: Number(data.Sgst),
            DMlookupHsnCode: data.HsnCode,
            DMlookupLateRate: data.LateRate,
            DMlookupdamageQuantity: data.DamageQty,
            MaterialType: data.MaterialType,
          });
        }
        if (parentID == "LI" || parentID == "LO") {
          // alert("hai")
          setselectDMLookupData({
            DMlookupCode: data.MaterialCode,
            DMlookupDesc: data.MaterialDescription,
            DMlookupRecordid: data.MaterialRecordID,
            DMlookupCgst: Number(data.Cgst),
            DMlookupIgst: Number(data.Igst),
            DMlookupSgst: Number(data.Sgst),
            DMlookupHsnCode: data.HsnCode,
            DMlookupLateRate: data.Rate,
            DMlookupdamageQuantity: data.DamageQty,
            MaterialType: data.MaterialType,
          });
        }

        setselectJwSupplierLookupData({
          jwslookupRecordid: data.JobworksupplierID,
          jwslookupCode: data.Suppliercode,
          jwslookupoDesc: data.Suppliername,
        });
        setselectIndentLookupData({
          IndentlookupCode: data.IndentCode,
          IndentMaterialID: data.IndentMaterialID,
          IndentlookupRecordid: data.IndentRecordID,
        });
        setselectCPLookupData({
          CPlookupCode: data.ProductCode,
          CPlookupDesc: data.ProductDescription,
          CPlookupRecordid: data.ProductRecordID,
        });
        setselectDLLookupData({
          DLlookupCode: data.LeatherCode,
          DLlookupDesc: data.LeatherDescription,
          DLlookupRecordid: data.LeatherRecordID,
        });
        setselectgrdLookupData({
          GRDlookupCode: data.GradeCode,
          GRDlookupDesc: data.GradeDescription,
          GRDlookupRecordid: data.GradeRecordID,
        });
        setselectsubLookupData({
          SUBlookupCode: data.SubstanceCode,
          SUBlookupDesc: data.SubstanceDesc,
          SUBlookupRecordid: data.SubstanceRecordID,
        });
      }
    }
  };

  var Lfilter = parentID;
  let [isProcess, setIsProcess] = useState(Data.Process);
  var LookupFilter = `parentID='${
    selectDSLookupData.SUPlookupRecordid
  }' AND Type ${
    Lfilter.substring(0, 1) === "M" ? `IN ('P', 'M', 'R')` : `IN('L')`
  }`;
  /******************************Detail save  FUNCTION********** */

  const fnchalanDetailsave = async (values, resetForm, del) => {
    setLoading(true);
    if (del) {
      if (isProcess == "Y") {
        toast.error("Your data Already Processed edit not Applicable");
        return;
      }
    }
    const idata = {
      RecordID: detaildata.RecordID,
      Quantity: values.Quantity,
      Reference: values.Reference,
      Bomqty: values.bomQty,
      Type: parentID,
      HideQty: values.HideQty,
      HideSqft: values.HideSqft,
      SideQty: values.SideQty,
      SideSqft: values.SideSqft,
      HsnCode: values.hsnCode,
      SortOrder: 0,
      Disable: "N",
      Finyear,
      CompanyID,
      Totalsqft: values.Totalqty,
      MaterialRecordID: selectDMLookupData.DMlookupRecordid,
      ProductRecordID: selectCPLookupData.CPlookupRecordid,
      LeatherRecordID: selectDLLookupData.DLlookupRecordid,
      DchalanhdrRecordID: recID,
      Rate: parentID === "PO" ? values.Rate : values.lateRate,
      GradeRecordID: selectgrdLookupData.GRDlookupRecordid,
      SubstanceRecordID: selectsubLookupData.SUBlookupRecordid,
      Igst: values.igst,
      Sgst: values.sgst,
      Cgst: values.cgst,
      DamageQty: values.damageQuantity,
      Comments: values.detailComments,
      DchalanDetailRating: values.DchalanDetailRating,
      Indentflag: values.IndentFlag === true ? "Y" : "N",
      Jobworkflag: values.jobworkFlag === true ? "Y" : "N",
      NetPrice: (
        (1 + (values.sgst / 100 + values.cgst / 100 + values.igst / 100)) *
        Number(values.lateRate)
      ).toFixed(2),
      TotalAmount:
        parentID == "LI" || parentID == "LO"
          ? (
              (1 +
                (values.sgst / 100 + values.cgst / 100 + values.igst / 100)) *
              (Number(values.lateRate) *
                (Number(values.Totalqty) - values.damageQuantity))
            ).toFixed(2)
          : (
              (1 +
                (values.sgst / 100 + values.cgst / 100 + values.igst / 100)) *
              (Number(values.lateRate) *
                (Number(values.Quantity) - values.damageQuantity))
            ).toFixed(2),
      MaterialType: selectDMLookupData.MaterialType,
      NetQty:
        parentID == "LI" || parentID == "LO"
          ? values.Totalqty - values.damageQuantity
          : values.Quantity - values.damageQuantity,
      IndentID: selectIndentLookupData.IndentlookupRecordid || 0,
      JobworksupplierID: selectJwSupplierLookupData.jwslookupRecordid || 0,
    };
    let action =
      boMode === "A" && !del
        ? "insert"
        : boMode === "E" && del
        ? "harddelete"
        : "update";

    const response = await dispatch(
      explorePostData({ accessID: "TR053", action, idata })
    );

    //  const data = await dispatch(postApidata("TR053", type, saveData));
    if (response.payload.Status == "Y") {
      //  dispatch(fetchApidata(secondaryAccessID, "get", recID));
      toast.success(response.payload.Msg);

      setLoading(false);
      dispatch(fetchExplorelitview("TR053", "chalanItems", filter, ""));

      resetForm();
      selectcelldata("", "A", "");
    } else {
      toast.error(response.payload.Msg);
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
        {parentID == "MI" || parentID == "MO" ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography>Material</Typography>
            <Typography variant="h5">{`(${rowCount})`}</Typography>
          </Box>
        ) : parentID == "PI" || parentID == "PO" ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography>Products</Typography>
            <Typography variant="h5">{`(${rowCount})`}</Typography>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography>Leather</Typography>
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
          <Tooltip title="Add">
            <IconButton
              onClick={() => {
                const reset = ref.current.resetForm;
                reset();
                selectcelldata("", "A", "");

                clrForm();
              }}
            >
              <AddOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </GridToolbarContainer>
    );
  }

  /******************************* Clear fn************** */
  const clrForm = () => {
    setDetaildata({
      RecordID: "",
      Quantity: "",
      Rate: "",
      Reference: "",
      Type: "",
      HideQty: "",
      HideSqft: "",
      SideQty: "",
      SideSqft: "",
      Totalqty: "",
      SortOrder: "",
    });
    setselectDLLookupData({
      DLlookupRecordid: "",
      DLlookupCode: "",
      DLlookupDesc: "",
    });
    setselectIndentLookupData({
      IndentlookupRecordid: "",
      IndentlookupCode: "",
      IndentMaterialID: "",
    });
    setselectCPLookupData({
      CPlookupRecordid: "",
      CPlookupCode: "",
      CPlookupDesc: "",
    });
    setselectDMLookupData({
      DMlookupRecordid: "",
      DMlookupCode: "",
      DMlookupDesc: "",
      DMlookupIgst: "",
      DMlookupSgst: "",
      DMlookupCgst: "",
      DMlookupHsnCode: "",
      DMlookupLateRate: "",
      MaterialType: "",
    });
    setselectgrdLookupData({
      GRDlookupRecordid: "",
      GRDlookupCode: "",
      GRDlookupDesc: "",
    });
    setselectsubLookupData({
      SUBlookupRecordid: "",
      SUBlookupCode: "",
      SUBlookupDesc: "",
    });
    selectcelldata("", "A", "");
  };
  const isFieldPurchase =
    selectDRLookupData.DRlookupDesc === "Purchase" &&
    (parentID === "MI" || parentID === "LI");
  const isFieldImported =
    selectDRLookupData.DRlookupDesc === "Imported" &&
    (parentID === "MI" || parentID === "LI");
  const [showFieldPurchase, setShowFieldPurchase] = useState(isFieldPurchase);
  const [showFieldImported, setShowFieldImported] = useState(isFieldImported);
  // **********ScreenChange Function*********
  const chanlanChange = (event) => {
    setScreen(event.target.value);
    setShowFieldPurchase(isFieldPurchase);
    setShowFieldImported(isFieldImported);
    if (event.target.value == "0") {
      //  dispatch(fetchApidata(secondaryAccessID, "get", recID));

      setIsProcess(Data.Process);
    }
    if (event.target.value == "1") {
      var filter = `${recID} AND Type = '${parentID}'`;
      setIsProcess(Data.Process);
      dispatch(fetchExplorelitview("TR053", "chalanItems", filter, ""));
      selectcelldata("", "A", "");
      clrForm();
    }
    if (event.target.value == "2") {
      dispatch(dcSummary({ HeaderID: recID, Type: parentID }));

      setIsProcess(Data.Process);
    }
  };
  // combo name
  var title = "";
  if (parentID == "LI" || parentID == "LO") {
    title = "Leather Items";
  }
  if (parentID == "PO") {
    title = "Product Items";
  }
  if (parentID == "MI" || parentID == "MO") {
    title = "Material Items";
  }

  var VISIBLE_FIELDS = [];

  if (parentID == "LI" || parentID == "LO") {
    VISIBLE_FIELDS = [
      "SLNO",
      "LeatherCode",
      "LeatherDescription",
      "Totalsqft",
      "action",
    ];
  }

  if (parentID == "MI" || parentID == "MO") {
    VISIBLE_FIELDS = [
      "SLNO",
      "MaterialCode",
      "MaterialDescription",
      "Quantity",
      "Rate",
      "action",
    ];
  }
  if (parentID == "PO") {
    VISIBLE_FIELDS = [
      "SLNO",
      "ProductCode",
      "ProductDescription",
      "Quantity",
      "Rate",
      "action",
    ];
  }
  const columns = React.useMemo(
    () =>
      explorelistViewcolumn.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
    [explorelistViewcolumn]
  );

  console.log(columns);
  // Appreviation
  var apprval = "";
  if (parentID == "LI") {
    apprval = "Leather In";
  }
  if (parentID == "LO") {
    apprval = "Leather Out";
  }
  if (parentID == "MI") {
    apprval = "Material In";
  }
  if (parentID == "MO") {
    apprval = "Material Out";
  }
  if (parentID == "PO") {
    apprval = "Product Out";
  }
  var Appreviation = "";
  if (parentID == "MI" || parentID == "LI") {
    Appreviation = "In";
  }
  if (parentID == "MO" || parentID == "LO" || parentID == "PO") {
    Appreviation = "Out";
  }

  const [tQty, setTQty] = useState();
  function fnCalc(values, setFieldValue) {
    // console.log(ref);

    const Totalqty = Number(values.HideSqft) + Number(values.SideSqft);
    setTQty(Totalqty);
  }

  const fnProcess = async () => {
    const props = { secondaryAccessID, recID };
    const Data = await dispatch(StockProcessApi(props));
    if (Data.payload.Status == "Y") {
      toast.success(Data.payload.Msg);
      navigate(
        `/Apps/Secondarylistview/TR097/Remarks/${parentID}/${secondaryAccessID}/${parentRecID}/DC/${remarkType}/${remarkDec}`
      );
    } else {
      toast.success(Data.payload.Msg);
    }
  };

  // Summary
  const summaryInitialvalues = {
    Code: mode == "A" ? Data.Code : Data.Code + " / " + Year,
    dcDate: mode == "A" ? today : Data.dcDate,
    totalamount: Number(summaryData.TotalAmount),
    centraltax: summaryData.CGST,
    statetax: summaryData.SGST,
    nettotal: summaryData.Netprice,
    paymentdetail: summaryData.PaymentDetails,
    transportexpensive: Number(summaryData.TransporterAmount),
    transportcharge: summaryData.TransporterComments,
    freighthandling: Number(summaryData.FrieghtAmount),
    freightcharge: summaryData.FrieghtComments,
    numberofitems: summaryData.CountT,
  };
  const FnSummary = async (values, resetForm, del) => {
    const idata = {
      HeaderID: recID,
      TotalAmount: values.totalamount,
      PaymentDetails: values.paymentdetail,
      TransporterAmount: values.transportexpensive,
      TransporterComments: values.transportcharge,
      FrieghtAmount: values.freighthandling,
      FrieghtComments: values.freightcharge,
      NumberOfItems: values.numberofitems,
      Netprice:
        Number(values.totalamount) +
        Number(values.transportexpensive) +
        Number(values.freighthandling),
      Finyear,
      CompanyID,
    };

    const response = await dispatch(dcpostSummary({ data: idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
    } else {
      toast.error(response.payload.Msg);
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
            `/Apps/Secondarylistview/TR097/Remarks/${parentID}/${secondaryAccessID}/${parentRecID}/DC/${remarkType}/${remarkDec}`
          );
        }
      } else {
        return;
      }
    });
  };

  const priceClac = (values) => {
    values.netPrice = (
      (1 + (values.sgst / 100 + values.cgst / 100 + values.igst / 100)) *
      Number(values.lateRate)
    ).toFixed(2);
    console.log(
      "🚀 ~ file: Editdeliverychalan.jsx:1303 ~ priceClac ~ values:",
      values
    );
  };

  // *************** GET FILES FROM INPUT *************** //

  const getFileChange = async (e) => {
    let files = e.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      console.log(event.target.result);
      let fileInput = false;
      if (event.target.result) {
        console.log(event.target.result);
        fileInput = true;
      }
      if (fileInput) {
        try {
          Resizer.imageFileResizer(
            e.target.files[0],
            150,
            150,
            "JPEG",
            100,
            0,
            async (uri) => {
              console.log(uri);
              const formData = { image: uri, type: "images" };
              console.log("---" + JSON.stringify(formData));
              const fileData = await dispatch(imageUpload({ formData }));
              setImgName(fileData.payload.name);
              console.log(
                "🚀 ~ file: Editdeliverychalan.jsx:1143 ~ getFileChange ~ fileData:",
                fileData
              );
            },
            "base64",
            150,
            150
          );
        } catch (err) {
          console.log(err);
        }
      }
    };
  };
  return (
    <React.Fragment>
      {getLoading ? <LinearProgress /> : false}
      <Box sx={{ height: "100vh", overflow: "auto" }}>
        <Box display="flex" justifyContent="space-between" p={"5px 16px"}>
          <Box display="flex" borderRadius="3px" alignItems="center">
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
                maxItems={2}
                aria-label="breadcrumb"
                separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
              >
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    navigate("/Apps/TR059/Delivery%20Type");
                  }}
                >
                  Delivery Type
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  {apprval}
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    navigate(
                      `/Apps/Secondarylistview/TR097/Remarks/${parentID}/${secondaryAccessID}/${parentRecID}/DC/${remarkType}/${remarkDec}`
                    );
                  }}
                >
                  Remarks({remarkDec})
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    setScreen(0);
                  }}
                >
                  DC({Appreviation})
                </Typography>
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
                    Summary
                  </Typography>
                ) : (
                  false
                )}
              </Breadcrumbs>
            </Box>

            {/* {show === 1 ? <Typography variant="h3">{title}</Typography> : false} */}
          </Box>

          <Box display="flex">
            {mode !== "A" ? (
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel>Explore</InputLabel>
                <Select value={show} label="Explore" onChange={chanlanChange}>
                  <MenuItem value={0}>Delivery Challan</MenuItem>
                  <MenuItem value={1}>{title}</MenuItem>
                  <MenuItem value={2}>Summary</MenuItem>
                  {Data.Process == "N" ? (
                    <MenuItem onClick={fnProcess}> Process </MenuItem>
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
              <IconButton>
                <LogoutOutlinedIcon
                  onClick={() => fnLogOut("Logout")}
                  color="error"
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Box
          display={isNonMobile ? "none" : "flex"}
          borderRadius="3px"
          alignItems="center"
          pl={"20px"}
        >
          <Breadcrumbs
            maxItems={2}
            aria-label="breadcrumb"
            separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
          >
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate("/Apps/TR059/Delivery%20Type");
              }}
            >
              Delivery Type
            </Typography>
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              {apprval}
            </Typography>
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              Remarks({remarkDec})
            </Typography>

            {show == "1" ? (
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/TR052/Delivery Chalan/${parentID}`
                  );
                }}
              >
                {apprval}
              </Typography>
            ) : (
              false
            )}
          </Breadcrumbs>
        </Box>
        {!getLoading && show == "0"  ? (
          <Box m="20px">
            <Formik
              initialValues={initialValues}
              onSubmit={(values, setSubmitting) => {
                setTimeout(() => {
                  fnSave(values);
                }, 100);
              }}
              validationSchema={deliverychalanSchema}
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
                    gridTemplateColumns="repeat(4 , minMax(0,1fr))"
                    gap="30px"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      // required
                      placeholder="Auto"
                      variant="filled"
                      type="text"
                      label="Code"
                      id="Code"
                      name="Code"
                      value={values.Code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      autoFocus
                      error={!!touched.Code && !!errors.Code}
                      helperText={touched.Code && errors.Code}
                      inputProps={{ maxLength: 5, readOnly: true }}
                    />

                    <TextField
                      fullWidth
                      required
                      variant="filled"
                      type="date"
                      label="Date"
                      id="dcDate"
                      name="dcDate"
                      tabIndex={2}
                      value={values.dcDate}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputFormat="YYYY-MM-DD"
                      sx={{ gridColumn: "span 2" }}
                      focused
                      inputProps={{ maxLength: 22 }}
                    />

                    {parentID == "MI" || parentID == "LI" ? (
                      <React.Fragment>
                        <TextField
                          fullWidth
                          sx={{ gridColumn: "span 2" }}
                          variant="filled"
                          type="text"
                          label={
                            parentRecID == "24" ? "Jobwork ID" : "Invoice ID"
                          }
                          id="InvoiceID"
                          name="InvoiceID"
                          value={values.InvoiceID}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          focused
                          error={!!touched.InvoiceID && !!errors.InvoiceID}
                          helperText={touched.InvoiceID && errors.InvoiceID}
                        />
                        <TextField
                          sx={{ gridColumn: "span 2" }}
                          fullWidth
                          variant="filled"
                          type="date"
                          label={
                            parentRecID == "24"
                              ? "Jobwork Date"
                              : "Invoice Date"
                          }
                          id="InvoiceDate"
                          name="InvoiceDate"
                          value={values.InvoiceDate}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          inputFormat="YYYY-MM-DD"
                          focused
                        />
                      </React.Fragment>
                    ) : (
                      false
                    )}
                    <FormControl
                      sx={{
                        gridColumn: "span 2",
                        display: "flex",
                      }}
                    >
                      {parentID == "PO" ? (
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
                            value={selectDCLookupData.DClookupRecordid}
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
                              label="Customer"
                              variant="filled"
                              value={selectDCLookupData.DClookupCode}
                              focused
                              required
                              inputProps={{ tabIndex: "-1" }}
                            />
                            <IconButton
                              sx={{ height: 40, width: 40 }}
                              onClick={() => handleShow("DC")}
                            >
                              <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                            </IconButton>
                            <TextField
                              id="outlined-basic"
                              // label="Description"
                              variant="filled"
                              value={selectDCLookupData.DClookupDesc}
                              fullWidth
                              inputProps={{ tabIndex: "-1" }}
                              focused
                            />
                          </FormControl>
                        </FormControl>
                      ) : parentRecID == "23" ? (
                        <FormControl
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="Company"
                            variant="filled"
                            value={selectDRLookupData.DRlookupCode}
                            focused
                            required
                            inputProps={{ tabIndex: "-1" }}
                          />
                          <IconButton
                            sx={{ height: 40, width: 40 }}
                            onClick={() => handleShow("CO")}
                            tabIndex={"-1"}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>

                          <TextField
                            id="outlined-basic"
                            label=""
                            variant="filled"
                            value={selectDRLookupData.DRlookupDesc}
                            fullWidth
                            inputProps={{ tabIndex: "-1" }}
                            focused
                          />
                        </FormControl>
                      ) : (
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
                            value={selectDSLookupData.SUPlookupRecordid}
                            focused
                            sx={{ display: "none" }}
                          />
                          <TextField
                            id="outlined-basic"
                            label="Supplier/Vendor"
                            variant="filled"
                            value={selectDSLookupData.SUPlookupCode}
                            focused
                            required
                            inputProps={{ tabIndex: "-1" }}
                          />
                          <IconButton
                            sx={{ height: 40, width: 40 }}
                            onClick={() => handleShow("DS")}
                            tabIndex={"-1"}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>

                          <TextField
                            id="outlined-basic"
                            label=""
                            variant="filled"
                            value={selectDSLookupData.SUPlookupDesc}
                            fullWidth
                            inputProps={{ tabIndex: "-1" }}
                            focused
                            // inputProps={{ tabIndex: "-1" }}
                          />
                        </FormControl>
                      )}
                    </FormControl>

                    {parentRecID == "34" &&  parentID == "MI" ? (
                     
                        <FormControl
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gridColumn: "span 2",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="Job Work Components"
                            variant="filled"
                            value={jwbLookup.jwbCode}
                            focused
                            //  required
                            inputProps={{ tabIndex: "-1" }}
                          />
                          <IconButton
                            sx={{ height: 40, width: 40 }}
                            onClick={() => handleShow("JWB")}
                            tabIndex={"-1"}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>
                          <TextField
                            id="outlined-basic"
                            label=""
                            variant="filled"
                            value={jwbLookup.jwbName}
                            fullWidth
                            inputProps={{ tabIndex: "-1" }}
                            focused
                            // inputProps={{ tabIndex: "-1" }}
                          />
                        </FormControl>):false}
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Comments"
                      id="comments"
                      name="comments"
                      value={values.comments}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      focused
                      autoFocus
                      sx={{ gridColumn: "span 2" }}
                    />
                    <FormControl
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gridColumn: "span 2",
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="Location"
                        variant="filled"
                        value={LocaLookup.LocaCode}
                        focused
                        required
                        inputProps={{ tabIndex: "-1" }}
                      />
                      <IconButton
                        sx={{ height: 40, width: 40 }}
                        onClick={() => handleShow("LOC")}
                        tabIndex={"-1"}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>

                      <TextField
                        id="outlined-basic"
                        label=""
                        variant="filled"
                        value={LocaLookup.LocaName}
                        fullWidth
                        inputProps={{ tabIndex: "-1" }}
                        focused
                        // inputProps={{ tabIndex: "-1" }}
                      />
                    </FormControl>
                    <FormControl
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gridColumn: "span 2",
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="Gate Entry"
                        variant="filled"
                        value={gateLookup.gatCode}
                        focused
                        required
                        inputProps={{ tabIndex: "-1" }}
                      />
                      <IconButton
                        sx={{ height: 40, width: 40 }}
                        onClick={() => handleShow("GAT")}
                        tabIndex={"-1"}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>

                      <TextField
                        id="outlined-basic"
                        label=""
                        variant="filled"
                        value={gateLookup.gatName}
                        fullWidth
                        inputProps={{ tabIndex: "-1" }}
                        focused
                        // inputProps={{ tabIndex: "-1" }}
                      />
                    </FormControl>
                    <FormControl
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gridColumn: "span 2",
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="Purchasing Incharge"
                        variant="filled"
                        value={purLookup.purCode}
                        focused
                        required
                        inputProps={{ tabIndex: "-1" }}
                      />
                      <IconButton
                        sx={{ height: 40, width: 40 }}
                        onClick={() => handleShow("PUI")}
                        tabIndex={"-1"}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>

                      <TextField
                        id="outlined-basic"
                        label=""
                        variant="filled"
                        value={purLookup.purName}
                        fullWidth
                        inputProps={{ tabIndex: "-1" }}
                        focused
                      />
                    </FormControl>
                    <FormControl
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gridColumn: "span 2",
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="Receiving Incharge"
                        variant="filled"
                        value={recLookup.recCode}
                        focused
                        required
                        inputProps={{ tabIndex: "-1" }}
                      />
                      <IconButton
                        sx={{ height: 40, width: 40 }}
                        onClick={() => handleShow("REI")}
                        tabIndex={"-1"}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>

                      <TextField
                        id="outlined-basic"
                        label=""
                        variant="filled"
                        value={recLookup.recName}
                        fullWidth
                        inputProps={{ tabIndex: "-1" }}
                        focused
                        // inputProps={{ tabIndex: "-1" }}
                      />
                    </FormControl>
                      {parentRecID === "24" ?<>
                        <FormControl
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gridColumn: "span 2",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="JobWorkComponents"
                            variant="filled"
                            value={jwbLookup.jwbCode}
                            focused
                            //  required
                            inputProps={{ tabIndex: "-1" }}
                          />
                          <IconButton
                            sx={{ height: 40, width: 40 }}
                            onClick={() => handleShow("JWB")}
                            tabIndex={"-1"}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>
                          <TextField
                            id="outlined-basic"
                            label=""
                            variant="filled"
                            value={jwbLookup.jwbName}
                            fullWidth
                            inputProps={{ tabIndex: "-1" }}
                            focused
                            // inputProps={{ tabIndex: "-1" }}
                          />
                        </FormControl>
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Jobwork Required Qty"
                          id="quantity"
                          name="quantity"
                          value={values.quantity}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          focused
                          autoFocus
                          sx={{
                            background: "#fff6c3",
                            input: { textAlign: "right" },
                            gridColumn: "span 2",
                          }}
                        />
                      </> : false}

                    
                    {/* <TextField
                     fullWidth
                     variant="filled"
                     type="text"
                     label="Gate Entry"
                     id="gateEntry"
                     name="gateEntry"
                     value={values.gateEntry}
                     onBlur={handleBlur}
                     onChange={handleChange}
                     focused
                     autoFocus
                     sx={{  }}
                   /> */}
                    {parentRecID == "34" &&  parentID == "MI" ? (
                      <>
                        {/* <FormControl
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gridColumn: "span 2",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="Job Work Components"
                            variant="filled"
                            value={jwbLookup.jwbCode}
                            focused
                            //  required
                            inputProps={{ tabIndex: "-1" }}
                          />
                          <IconButton
                            sx={{ height: 40, width: 40 }}
                            onClick={() => handleShow("JWB")}
                            tabIndex={"-1"}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>
                          <TextField
                            id="outlined-basic"
                            label=""
                            variant="filled"
                            value={jwbLookup.jwbName}
                            fullWidth
                            inputProps={{ tabIndex: "-1" }}
                            focused
                            // inputProps={{ tabIndex: "-1" }}
                          />
                        </FormControl> */}

                        <TextField
                          fullWidth
                          variant="filled"
                          type="date"
                          label="Received Date"
                          id="receivedDate"
                          name="receivedDate"
                          value={values.receivedDate}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          focused
                          autoFocus
                          sx={{ gridColumn: "span 2" }}
                        />

                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Received Quantity"
                          id="receivedQuantity"
                          name="receivedQuantity"
                          value={values.receivedQuantity}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          focused
                          autoFocus
                          sx={{
                            background: "#fff6c3",
                            input: { textAlign: "right" },
                            gridColumn: "span 2",
                          }}
                        />
                      </>
                    ) : (
                      false
                    )}

                    {parentRecID == "34" &&  parentID == "MI"? (
                      <>
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Damaged Quantity"
                          id="damagedQuantity"
                          name="damagedQuantity"
                          value={values.damagedQuantity}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          focused
                          autoFocus
                          sx={{
                            background: "#fff6c3",
                            input: { textAlign: "right" },
                            gridColumn: "span 2",
                          }}
                        />

                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Return Quantity"
                          id="returnQuantity"
                          name="returnQuantity"
                          value={values.returnQuantity}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          focused
                          autoFocus
                          sx={{
                            background: "#fff6c3",
                            input: { textAlign: "right" },
                            gridColumn: "span 2",
                          }}
                        />
                      </>
                    ) : (
                      false
                    )}
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px" gap="20px">
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
                        onChange={getFileChange}
                      />
                      <PictureAsPdfOutlinedIcon />
                    </IconButton>
                    <Button
                      variant="contained"
                      component={"a"}
                      onClick={() => {
                        Data.ImageName || ImageName
                          ? window.open(
                              ImageName
                                ? store.getState().globalurl.attachmentUrl +
                                    ImageName
                                : store.getState().globalurl.attachmentUrl +
                                    Data.ImageName,
                              "_blank"
                            )
                          : toast.error("Please Upload File");
                      }}
                    >
                      View
                    </Button>
                    {YearFlag == "true" ? (
                      <LoadingButton
                        color="secondary"
                        variant="contained"
                        type="submit"
                        loading={postLoading}
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
                      variant="contained"
                      color="warning"
                      onClick={() => {
                        navigate(
                          `/Apps/Secondarylistview/TR097/Remarks/${parentID}/${secondaryAccessID}/${parentRecID}/DC/${remarkType}/${remarkDec}`
                        );
                      }}
                    >
                      CANCEL
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
            <Popup
              title="Customer"
              openPopup={openDCPopup}
              setOpenPopup={setOpenDCPopup}
            >
              <Listviewpopup
                accessID="2009"
                screenName="Customer"
                childToParent={childToParent}
              />
            </Popup>
            {parentRecID == "26" ? (
              <Popup
                title="Supplier"
                openPopup={openDSpopup}
                setOpenPopup={setOpenDSpopup}
              >
                <Listviewpopup
                  accessID="2017"
                  screenName="Supplier"
                  childToParent={childToParent}
                  filterName={"Jobwork"}
                  filterValue={"Y"}
                />
              </Popup>
            ) : (
              <Popup
                title="Supplier"
                openPopup={openDSpopup}
                setOpenPopup={setOpenDSpopup}
              >
                <Listviewpopup
                  accessID="2017"
                  screenName="Supplier"
                  childToParent={childToParent}
                />
              </Popup>
            )}
            <Popup
              title="Company"
              openPopup={openDRpopup}
              setOpenPopup={setOpenDRpopup}
            >
              <Listviewpopup
                accessID="2030"
                screenName="Company"
                childToParent={childToParent}
              />
            </Popup>
            <Popup
              title="Gate Entry"
              openPopup={openGatPopup}
              setOpenPopup={setOpenGatPopup}
            >
              <Listviewpopup
                accessID="2050"
                screenName="Gate Entry"
                childToParent={childToParent}
                filterName={"parentID"}
                filterValue={LocaLookup.LocaRecordID}
              />
            </Popup>
            <Popup
              title="Purchasing Incharge"
              openPopup={openPurIPopup}
              setOpenPopup={setOpenPurIPopup}
            >
              <Listviewpopup
                accessID="2024"
                screenName="Purchasing Incharge"
                childToParent={childToParent}
              />
            </Popup>
            <Popup
              title="Receiving Incharge"
              openPopup={openRecIPopup}
              setOpenPopup={setOpenRecIPopup}
            >
              <Listviewpopup
                accessID="2024"
                screenName="Receiving Incharge"
                childToParent={childToParent}
              />
            </Popup>
            <Popup
              title="Job Work Components"
              openPopup={openJwbPopup}
              setOpenPopup={setOpenJwbPopup}
            >
             {parentRecID == '34' ? <Listviewpopup
                accessID="2087"
                screenName="Job Work Components"
                childToParent={childToParent}
                filterName={'parentID'}
                filterValue={selectDSLookupData.SUPlookupRecordid}
              />: <Listviewpopup
              accessID="2072"
              screenName="Job Work Components"
              childToParent={childToParent}
            />}
            </Popup>
            <Popup
              title="Location"
              openPopup={openLocIPopup}
              setOpenPopup={setOpenLocIPopup}
            >
              <Listviewpopup
                accessID="2051"
                screenName="Location"
                childToParent={childToParent}
                filterName={"parentID"}
                filterValue={CompanyID}
              />
            </Popup>
          </Box>
        ) : (
          false
        )}
        {show == "1" && parentRecID != "24" && parentRecID != "34"? (
          <Box m="20px" sx={{ m: 2 }}>
            <Formik
              innerRef={ref}
              initialValues={detailInitialvalues}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  fnchalanDetailsave(values, resetForm, false);
                }, 100);
              }}
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
                setFieldValue,
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
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Code"
                      id="Code"
                      name="Code"
                      value={values.Code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      InputProps={{ readOnly: true }}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      inputProps={{ maxLength: 22 }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="date"
                      label="Date"
                      id="IvoiceDate"
                      name="dcDate"
                      InputProps={{ readOnly: true }}
                      value={values.dcDate}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputFormat="YYYY-MM-DD"
                      sx={{ gridColumn: "span 2" }}
                      focused
                    />
                    <FormControl sx={{ gridColumn: "span 2" }}>
                      <Box m="5px">
                        <Box
                          m="5px 0 0 0"
                          height="600px"
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

                    <FormControl
                      fullWidth
                      sx={{ gridColumn: "span 2", height: "450px" }}
                    >
                     <Box sx={{display:'flex'}}>
                     {parentID == "MI" || parentID == "LI" ? (
                        <Box sx={{ marginRight: "5px" }}>
                          <Field
                            type="checkbox"
                            name="IndentFlag"
                            id="IndentFlag"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            as={Checkbox}
                          />
                          <FormLabel focused={false}>
                            Non Indent Material
                          </FormLabel>
                        </Box>
                      ) : (
                        false
                      )}

                       {parentID == "MI"  ? (
                        <Box sx={{ marginRight: "5px" }}>
                          <Field
                            type="checkbox"
                            name="jobworkFlag"
                            id="jobworkFlag"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            as={Checkbox}
                          />
                          <FormLabel focused={false}>
                            Job Work
                          </FormLabel>
                        </Box>
                      ) : (
                        false
                      )}
                      
                      </Box> 

                      {parentID == "MI" || parentID == "MO" ? (
                        <FormControl
                          sx={{
                            gap: "30px",
                          }}
                          fullWidth
                        >
                          {!values.IndentFlag && parentID == "MI" ? (
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
                                  marginTop: "20px",
                                }}
                              >
                                <TextField
                                  id="psCode"
                                  label="Indent"
                                  variant="filled"
                                  value={
                                    selectIndentLookupData.IndentlookupCode
                                  }
                                  focused
                                  required
                                  inputProps={{ tabIndex: "-1" }}
                                  fullWidth
                                />
                                <IconButton
                                  sx={{ height: 40, width: 40 }}
                                  onClick={() => handleShow("INDENT")}
                                >
                                  <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                </IconButton>
                              </FormControl>
                            </FormControl>
                          ) : (
                            false
                          )}

                          <FormControl
                            sx={{
                              gridColumn: "span 2",
                              display: "flex",
                            }}
                          >
                            <TextField
                              id="psID"
                              label="ID"
                              variant="filled"
                              value={selectDMLookupData.DMlookupRecordid}
                              focused
                              sx={{ display: "none" }}
                            />

                            <FormControl
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: parentID == "MO" ? "50px" : "0px",
                              }}
                            >
                              <TextField
                                id="psCode"
                                label="Material ID"
                                variant="filled"
                                value={selectDMLookupData.DMlookupCode}
                                focused
                                required
                                inputProps={{ tabIndex: "-1" }}
                              />
                              <IconButton
                                sx={{ height: 40, width: 40 }}
                                onClick={() => handleShow("DM")}
                              >
                                <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                              </IconButton>
                              <TextField
                                id="psDesc"
                                label=""
                                variant="filled"
                                value={selectDMLookupData.DMlookupDesc}
                                fullWidth
                                inputProps={{ tabIndex: "-1" }}
                                focused
                              />
                            </FormControl>
                          </FormControl>

                          {values.jobworkFlag && parentID == "MI" ? (
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
                                  marginTop: "20px",
                                }}
                              >
                                <TextField
                                  id="psCode"
                                  label="Jobwork Vendor Supplier"
                                  variant="filled"
                                  value={
                                    selectJwSupplierLookupData.jwslookupoDesc
                                  }
                                  focused
                                  required
                                  inputProps={{ tabIndex: "-1" }}
                                  fullWidth
                                />
                                <IconButton
                                  sx={{ height: 40, width: 40 }}
                                  onClick={() => handleShow("JWSV")}
                                >
                                  <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                </IconButton>
                              </FormControl>
                            </FormControl>
                          ) : (
                            false
                          )}
                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Reference"
                            id="Reference"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.Reference}
                            name="Reference"
                            sx={{ gridColumn: "span 2" }}
                            focused
                            multiline
                          />

                          <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="HSN Code"
                            id="hsnCode"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.hsnCode}
                            name="hsnCode"
                            sx={{
                              gridColumn: "span 2",
                              background: "#fff6c3",
                              input: { textAlign: "right" },
                            }}
                            focused
                            inputProps={{ readOnly: true }}
                          />
                          <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Rate"
                            id="lateRate"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.lateRate}
                            name="lateRate"
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
                            required
                          />

                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Quantity"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            id="Quantity"
                            name="Quantity"
                            value={values.Quantity}
                            sx={{
                              gridColumn: "span 2",
                              background: "#fff6c3",
                            }}
                            focused
                            onInvalid={(e) => {
                              e.target.setCustomValidity(
                                "Please Fill The Quantity"
                              );
                            }}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right" },
                              },
                            }}
                            required
                          />

                          <Popup
                            title="Material"
                            openPopup={openDMpopup}
                            setOpenPopup={setOpenDMpopup}
                          >
                            {parentRecID == "23" ? (
                              <Listviewpopup
                                accessID="2013"
                                screenName="Material"
                                childToParent={childToParent}
                                filterName="Type"
                                filterValue={"Type NOT IN('L')"}
                              />
                            ) : (
                              <Listviewpopup
                                accessID="2031"
                                screenName="Material"
                                childToParent={childToParent}
                                filterName="parentID"
                                filterValue={
                                  values.IndentFlag
                                    ? `parentID='${selectDSLookupData.SUPlookupRecordid}' AND Indentflag='Y'`
                                    : parentID == "MI"
                                    ? `parentID='${selectDSLookupData.SUPlookupRecordid}' AND MtlRecordID ='${selectIndentLookupData.IndentMaterialID}'`
                                    : `parentID='${selectDSLookupData.SUPlookupRecordid}'`
                                }
                              />
                            )}
                          </Popup>
                          <Popup
                            title="Indent"
                            openPopup={openIndentPopup}
                            setOpenPopup={setOpenIndentPopup}
                          >
                            <Listviewpopup
                              accessID="2065"
                              screenName="Indent"
                              childToParent={childToParent}
                              filterName="parentID"
                              filterValue={selectDSLookupData.SUPlookupRecordid}
                            />
                          </Popup>
                          <Popup
                            title="Jobwork Supplier"
                            openPopup={openJobworkSupplierPopup}
                            setOpenPopup={setOpenJobworkSupplierPopup}
                          >
                            <Listviewpopup
                              accessID="2086"
                              screenName="Jobwork Supplier"
                              childToParent={childToParent}
                              filterName="parentID"
                              filterValue={selectDMLookupData.DMlookupRecordid}
                            />
                          </Popup>
                        </FormControl>
                      ) : parentID == "PI" || parentID == "PO" ? (
                        <FormControl
                          sx={{
                            gridColumn: "span 2",
                            gap: "30px",
                          }}
                          style={{ width: "100%" }}
                        >
                          <TextField
                            id="psID"
                            label="ID"
                            variant="filled"
                            value={selectCPLookupData.CPlookupRecordid}
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
                                marginTop: "50px",
                              }}
                            >
                              <TextField
                                id="psCode"
                                label="Product ID"
                                variant="filled"
                                value={selectCPLookupData.CPlookupCode}
                                focused
                                required
                                inputProps={{ tabIndex: "-1" }}
                              />
                              <IconButton
                                sx={{ height: 40, width: 40 }}
                                onClick={() => handleShow("CP")}
                              >
                                <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                              </IconButton>
                              <TextField
                                id="psDesc"
                                label=""
                                variant="filled"
                                value={selectCPLookupData.CPlookupDesc}
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
                            label="Reference"
                            id="Reference"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.Reference}
                            name="Reference"
                            sx={{ gridColumn: "span 2" }}
                            focused
                            multiline
                          />
                          <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Rate"
                            id="Rate"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.Rate}
                            name="Rate"
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
                            required
                          />
                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Quantity"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            id="Quantity"
                            name="Quantity"
                            value={values.Quantity}
                            sx={{
                              gridColumn: "span 2",
                              background: "#fff6c3",
                            }}
                            focused
                            onInvalid={(e) => {
                              e.target.setCustomValidity(
                                "Please Fill The Quantity"
                              );
                            }}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right" },
                              },
                            }}
                            required
                          />
                          <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Rating"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            id="DchalanDetailRating"
                            name="DchalanDetailRating"
                            value={values.DchalanDetailRating}
                            sx={{
                              gridColumn: "span 2",
                              background: "#fff6c3",
                              input: { textAlign: "right" },
                            }}
                            focused
                          />

                          <Popup
                            title="Product"
                            openPopup={openCPpopup}
                            setOpenPopup={setOpenCPpopup}
                          >
                            <Listviewpopup
                              accessID="2002"
                              screenName="Product"
                              childToParent={childToParent}
                            />
                          </Popup>
                        </FormControl>
                      ) : (
                        <FormControl
                          sx={{
                            gridColumn: "span 2",
                            gap: "30px",
                          }}
                          style={{ width: "100%" }}
                        >
                          {!values.IndentFlag && parentID == "LI" ? (
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
                                  marginTop: "20px",
                                }}
                              >
                                <TextField
                                  id="psCode"
                                  label="Indent"
                                  variant="filled"
                                  value={
                                    selectIndentLookupData.IndentlookupCode
                                  }
                                  focused
                                  required
                                  inputProps={{ tabIndex: "-1" }}
                                  fullWidth
                                />
                                <IconButton
                                  sx={{ height: 40, width: 40 }}
                                  onClick={() => handleShow("INDENT")}
                                >
                                  <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                </IconButton>
                              </FormControl>
                            </FormControl>
                          ) : (
                            false
                          )}
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
                                marginTop: parentID == "LO" ? "50px" : "0px",
                              }}
                            >
                              <TextField
                                id="outlined-basic"
                                label="ID"
                                variant="filled"
                                value={selectDLLookupData.DLlookupRecordid}
                                focused
                                sx={{ display: "none" }}
                              />
                              <TextField
                                id="outlined-basic"
                                label="Leather"
                                variant="filled"
                                value={selectDLLookupData.DLlookupCode}
                                focused
                                required
                              />
                              <IconButton
                                sx={{ height: 40, width: 40 }}
                                onClick={() => handleShow("DL")}
                              >
                                <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                              </IconButton>
                              <TextField
                                id="outlined-basic"
                                label=""
                                variant="filled"
                                value={selectDLLookupData.DLlookupDesc}
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
                            <TextField
                              id="outlined-basic"
                              label="ID"
                              variant="filled"
                              value={selectgrdLookupData.GRDlookupRecordid}
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
                                label="Grade"
                                variant="filled"
                                value={selectgrdLookupData.GRDlookupCode}
                                focused
                              />
                              <IconButton
                                sx={{ height: 40, width: 40 }}
                                onClick={() => handleShow("GRD")}
                              >
                                <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                              </IconButton>
                              {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                              <TextField
                                id="outlined-basic"
                                label=""
                                variant="filled"
                                value={selectgrdLookupData.GRDlookupDesc}
                                fullWidth
                                focused
                              />
                            </FormControl>
                          </FormControl>
                          {/* substance */}

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
                              value={selectsubLookupData.SUBlookupRecordid}
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
                                label="Substance"
                                variant="filled"
                                value={selectsubLookupData.SUBlookupCode}
                                focused
                              />
                              <IconButton
                                sx={{ height: 40, width: 40 }}
                                onClick={() => handleShow("SUB")}
                              >
                                <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                              </IconButton>
                              {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                              <TextField
                                id="outlined-basic"
                                label=""
                                variant="filled"
                                value={selectsubLookupData.SUBlookupDesc}
                                fullWidth
                                focused
                              />
                            </FormControl>
                          </FormControl>

                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Reference"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            id="Reference"
                            name="Reference"
                            value={values.Reference}
                            // error={!!touched.Reference && !!errors.Reference}
                            // helperText={touched.Reference && errors.Reference}
                            sx={{ gridColumn: "span 2" }}
                            focused
                            inputProps={{ maxLength: 100 }}
                            multiline
                          />

                          <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="HSN Code"
                            id="hsnCode"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.hsnCode}
                            name="hsnCode"
                            sx={{
                              gridColumn: "span 2",
                              background: "#fff6c3",
                              input: { textAlign: "right" },
                            }}
                            focused
                            inputProps={{ readOnly: true }}
                          />

                          <Popup
                            title="Leather"
                            openPopup={openDLpopup}
                            setOpenPopup={setOpenDLpopup}
                          >
                            {parentRecID == "23" ? (
                              <Listviewpopup
                                accessID="2013"
                                screenName="Leather"
                                childToParent={childToParent}
                                filterName="Type"
                                filterValue={"Type='L'"}
                              />
                            ) : (
                              <Listviewpopup
                                accessID="2031"
                                screenName="Leather"
                                childToParent={childToParent}
                                filterName="parentID"
                                filterValue={
                                  values.IndentFlag
                                    ? `parentID='${selectDSLookupData.SUPlookupRecordid}' AND Indentflag='Y'`
                                    : parentID == "LI"
                                    ? `parentID='${selectDSLookupData.SUPlookupRecordid}' AND MtlRecordID ='${selectIndentLookupData.IndentMaterialID}'`
                                    : `parentID='${selectDSLookupData.SUPlookupRecordid}'`
                                }
                              />
                            )}
                          </Popup>
                          <Popup
                            title="Indent"
                            openPopup={openIndentPopup}
                            setOpenPopup={setOpenIndentPopup}
                          >
                            <Listviewpopup
                              accessID="2065"
                              screenName="Indent"
                              childToParent={childToParent}
                              filterName="parentID"
                              filterValue={selectDSLookupData.SUPlookupRecordid}
                            />
                          </Popup>
                          
                          <Popup
                            title="Grade"
                            openPopup={openGRDPopup}
                            setOpenPopup={setOpenGRDPopup}
                          >
                            <Listviewpopup
                              accessID="2022"
                              screenName="Grade"
                              childToParent={childToParent}
                            />
                          </Popup>
                          <Popup
                            title="Substance"
                            openPopup={openSUBPopup}
                            setOpenPopup={setOpenSUBPopup}
                          >
                            <Listviewpopup
                              accessID="2023"
                              screenName="Substance"
                              childToParent={childToParent}
                            />
                          </Popup>
                        </FormControl>
                      )}
                    </FormControl>
                    {parentID == "MI" || parentID == "MO" ? (
                      <React.Fragment>
                        {parentRecID === "22" ? (
                          <>
                            <TextField
                              fullWidth
                              variant="filled"
                              type="number"
                              label="SGST"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              id="sgst"
                              name="sgst"
                              value={values.sgst}
                              sx={{
                                gridColumn: "span 2",
                                background: "#fff6c3",
                              }}
                              focused
                              onInvalid={(e) => {
                                e.target.setCustomValidity(
                                  "Please Fill The SGST"
                                );
                              }}
                              onInput={(e) => {
                                e.target.setCustomValidity("");
                              }}
                              InputProps={{
                                readOnly: true,
                                inputProps: {
                                  style: { textAlign: "right" },
                                },
                              }}
                            />
                            <TextField
                              fullWidth
                              variant="filled"
                              type="number"
                              label="CGST"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              id="cgst"
                              name="cgst"
                              value={values.cgst}
                              sx={{
                                gridColumn: "span 2",
                                background: "#fff6c3",
                                input: { textAlign: "right" },
                              }}
                              focused
                              onInvalid={(e) => {
                                e.target.setCustomValidity(
                                  "Please Fill The CGST"
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
                              fullWidth
                              variant="filled"
                              type="number"
                              label="IGST"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              id="igst"
                              name="igst"
                              value={values.igst}
                              sx={{
                                gridColumn: "span 2",
                                background: "#fff6c3",
                                input: { textAlign: "right" },
                              }}
                              focused
                              onInvalid={(e) => {
                                e.target.setCustomValidity(
                                  "Please Fill The IGST"
                                );
                              }}
                              onInput={(e) => {
                                e.target.setCustomValidity("");
                              }}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          </>
                        ) : (
                          false
                        )}
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Damage Quantity"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="damageQuantity"
                          name="damageQuantity"
                          value={values.damageQuantity}
                          sx={{
                            gridColumn: "span 2",
                            background: "#fff6c3",
                            input: { textAlign: "right" },
                          }}
                          focused
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Damage Quantity"
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
                          label="Net Quantity"
                          onBlur={handleBlur}
                          onChange={() =>
                            (values.netquantity =
                              values.Quantity - values.damageQuantity)
                          }
                          id="netquantity"
                          name="netquantity"
                          value={values.Quantity - values.damageQuantity}
                          sx={{
                            gridColumn: "span 2",
                            background: "#F0CDB5",
                          }}
                          focused
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                        />

                        {parentRecID === "22" ? (
                          <>
                            <TextField
                              fullWidth
                              variant="filled"
                              type="number"
                              label="Net Price"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              id="netPrice"
                              name="netPrice"
                              value={(
                                (1 +
                                  (values.sgst / 100 +
                                    values.cgst / 100 +
                                    values.igst / 100)) *
                                Number(values.lateRate)
                              ).toFixed(2)}
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
                            <TextField
                              fullWidth
                              variant="filled"
                              type="number"
                              label="Amount"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              id="amount"
                              name="amount"
                              value={(
                                (1 +
                                  (values.sgst / 100 +
                                    values.cgst / 100 +
                                    values.igst / 100)) *
                                (Number(values.lateRate) *
                                  (Number(values.Quantity) -
                                    values.damageQuantity))
                              ).toFixed(2)}
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
                            />{" "}
                          </>
                        ) : (
                          false
                        )}
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Rating"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="DchalanDetailRating"
                          name="DchalanDetailRating"
                          value={values.DchalanDetailRating}
                          sx={{
                            gridColumn: "span 2",
                            background: "#fff6c3",
                            input: { textAlign: "right" },
                          }}
                          focused
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Comments"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="detailComments"
                          name="detailComments"
                          value={values.detailComments}
                          sx={{ gridColumn: "span 2" }}
                          focused
                          inputProps={{ maxLength: 100 }}
                          multiline
                        />
                      </React.Fragment>
                    ) : (
                      false
                    )}
                    {parentID == "LI" || parentID == "LO" ? (
                      <React.Fragment>
                        {parentRecID === "22" ? (
                          <>
                            <TextField
                              fullWidth
                              variant="filled"
                              type="number"
                              label="SGST"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              id="sgst"
                              name="sgst"
                              value={values.sgst}
                              sx={{
                                gridColumn: "span 2",
                                background: "#fff6c3",
                                input: { textAlign: "right" },
                              }}
                              focused
                              inputProps={{ readOnly: true }}
                            />
                            <TextField
                              fullWidth
                              variant="filled"
                              type="number"
                              label="CGST"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              id="cgst"
                              name="cgst"
                              value={values.cgst}
                              sx={{
                                gridColumn: "span 2",
                                background: "#fff6c3",
                                input: { textAlign: "right" },
                              }}
                              focused
                              inputProps={{ readOnly: true }}
                            />
                            <TextField
                              fullWidth
                              variant="filled"
                              type="number"
                              label="IGST"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              id="igst"
                              name="igst"
                              value={values.igst}
                              sx={{
                                gridColumn: "span 2",
                                background: "#fff6c3",
                                input: { textAlign: "right" },
                              }}
                              focused
                              onInvalid={(e) => {
                                e.target.setCustomValidity(
                                  "Please Fill The IGST"
                                );
                              }}
                              onInput={(e) => {
                                e.target.setCustomValidity("");
                              }}
                              inputProps={{ readOnly: true }}
                            />
                          </>
                        ) : (
                          false
                        )}

                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Rate"
                          id="lateRate"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.lateRate}
                          name="lateRate"
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
                          required
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Side Qty"
                          id="SideQty"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.SideQty}
                          name="SideQty"
                          sx={{
                            gridColumn: "span 2",
                            background: "#fff6c3",
                          }}
                          focused
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Side Qty"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
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
                          label="Hide Qty"
                          id="HideQty"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.HideQty}
                          name="HideQty"
                          sx={{
                            gridColumn: "span 2",
                            background: "#fff6c3",
                          }}
                          focused
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Hide Qty"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
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
                          label="Side Sq.ft"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="SideSqft"
                          name="SideSqft"
                          value={values.SideSqft}
                          sx={{
                            gridColumn: "span 2",
                            background: "#fff6c3",
                            input: { textAlign: "right" },
                          }}
                          focused
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Hide Sq.ft"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="HideSqft"
                          name="HideSqft"
                          value={values.HideSqft}
                          sx={{
                            gridColumn: "span 2",
                            background: "#fff6c3",
                            input: { textAlign: "right" },
                          }}
                          focused
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Hide Sq.ft"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />

                        <MyField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Total Quantity"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="Totalqty"
                          name="Totalqty"
                          value={values.Totalqty}
                          required
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
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Damage Quantity"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="damageQuantity"
                          name="damageQuantity"
                          value={values.damageQuantity}
                          sx={{
                            gridColumn: "span 2",
                            background: "#fff6c3",
                            input: { textAlign: "right" },
                          }}
                          focused
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Damage Quantity"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                        {parentRecID === "22" ? (
                          <>
                            <TextField
                              fullWidth
                              variant="filled"
                              type="text"
                              label="Net Quantity"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              id="netquantity"
                              name="netquantity"
                              value={values.Totalqty - values.damageQuantity}
                              sx={{
                                gridColumn: "span 2",
                                background: "#F0CDB5",
                                input: { textAlign: "right" },
                              }}
                              focused
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                            <TextField
                              fullWidth
                              variant="filled"
                              type="number"
                              label="Net Price"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              id="netPrice"
                              name="netPrice"
                              value={(
                                (1 +
                                  (values.sgst / 100 +
                                    values.cgst / 100 +
                                    values.igst / 100)) *
                                Number(values.lateRate)
                              ).toFixed(2)}
                              sx={{
                                gridColumn: "span 2",
                                background: "#F0CDB5",
                                input: { textAlign: "right" },
                              }}
                              focused
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          </>
                        ) : (
                          false
                        )}
                        {parentRecID === "22" ? (
                          <>
                            <TextField
                              fullWidth
                              variant="filled"
                              type="number"
                              label="Amount"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              id="amount"
                              name="amount"
                              value={(
                                (1 +
                                  (values.sgst / 100 +
                                    values.cgst / 100 +
                                    values.igst / 100)) *
                                (Number(values.lateRate) *
                                  (Number(values.Totalqty) -
                                    values.damageQuantity))
                              ).toFixed(2)}
                              sx={{
                                gridColumn: "span 2",
                                background: "#F0CDB5",
                                input: { textAlign: "right" },
                              }}
                              focused
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          </>
                        ) : (
                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Net Quantity"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            id="netquantity"
                            name="netquantity"
                            value={values.Totalqty - values.damageQuantity}
                            sx={{
                              gridColumn: "span 2",
                              background: "#F0CDB5",
                            }}
                            focused
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right" },
                              },
                            }}
                          />
                        )}
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Rating"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="DchalanDetailRating"
                          name="DchalanDetailRating"
                          value={values.DchalanDetailRating}
                          sx={{
                            gridColumn: "span 2",
                            background: "#fff6c3",
                            input: { textAlign: "right" },
                          }}
                          focused
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Comments"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="detailComments"
                          name="detailComments"
                          value={values.detailComments}
                          sx={{ gridColumn: "span 2" }}
                          focused
                          inputProps={{ maxLength: 100 }}
                          multiline
                        />
                      </React.Fragment>
                    ) : (
                      false
                    )}
                  </Box>
                  <Box display="flex" justifyContent="end" mt="30px" gap={2}>
                    {YearFlag == "true" ? (
                      <LoadingButton
                        color="secondary"
                        variant="contained"
                        type="submit"
                        mt="30px"
                        disabled={isSubmitting}
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
                </Form>
              )}
            </Formik>
          </Box>
        ) : (
          false
        )}
        {/* job work  items */}
        {show == "1"  && parentRecID === "24" && ( parentID == "MO") ? (
          <Box m="20px" sx={{ m: 2 }}>
            <Formik
              innerRef={ref}
              initialValues={detailInitialvalues}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  fnchalanDetailsave(values, resetForm, false);
                }, 100);
              }}
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
                setFieldValue,
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
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Code"
                      id="Code"
                      name="Code"
                      value={values.Code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      InputProps={{ readOnly: true }}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      inputProps={{ maxLength: 22 }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="date"
                      label="Date"
                      id="IvoiceDate"
                      name="dcDate"
                      InputProps={{ readOnly: true }}
                      value={values.dcDate}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputFormat="YYYY-MM-DD"
                      sx={{ gridColumn: "span 2" }}
                      focused
                    />
                    <FormControl sx={{ gridColumn: "span 2" }}>
                      <Box m="5px">
                        <Box
                          m="5px 0 0 0"
                          height="587px"
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

                    <FormControl
                      fullWidth
                      sx={{ gridColumn: "span 2", height: "600px" }}
                    >
                    
                      {parentID == "MI" || parentID == "MO" ? (
                        <FormControl
                          sx={{
                            gap: "30px",
                          }}
                          fullWidth
                        >
                         

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
                                marginTop: parentID == "MO" ? "50px" : "0px",
                              }}
                            >
                              <TextField
                                id="psCode"
                                label="Material ID"
                                variant="filled"
                                value={selectDMLookupData.DMlookupCode}
                                focused
                                required
                                inputProps={{ tabIndex: "-1" }}
                              />
                              <IconButton
                                sx={{ height: 40, width: 40 }}
                                onClick={() => handleShow("DM")}
                              >
                                <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                              </IconButton>
                              <TextField
                                id="psDesc"
                                label=""
                                variant="filled"
                                value={selectDMLookupData.DMlookupDesc}
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
                            label="Reference"
                            id="Reference"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.Reference}
                            name="Reference"
                            sx={{ gridColumn: "span 2" }}
                            focused
                            multiline
                          />

                          <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="HSN Code"
                            id="hsnCode"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.hsnCode}
                            name="hsnCode"
                            sx={{
                              gridColumn: "span 2",
                              background: "#fff6c3",
                              input: { textAlign: "right" },
                            }}
                            focused
                            inputProps={{ readOnly: true }}
                          />
                       
                       <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="BOM Qty"
                            id="bomQty"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.bomQty}
                            name="bomQty"
                            sx={{
                              gridColumn: "span 2",
                              background: "#fff6c3",
                            }}
                            focused
                            InputProps={{ 
                              inputProps: {
                                readOnly: true ,
                                style: { textAlign: "right" },
                              },
                            }}
                            required
                          />

                          <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Rate"
                            id="lateRate"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.lateRate}
                            name="lateRate"
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
                            required
                          />

                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Quantity"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            id="Quantity"
                            name="Quantity"
                            value={values.Quantity}
                            sx={{
                              gridColumn: "span 2",
                              background: "#fff6c3",
                            }}
                            focused
                            onInvalid={(e) => {
                              e.target.setCustomValidity(
                                "Please Fill The Quantity"
                              );
                            }}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right" },
                              },
                            }}
                            required
                          />
<TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Damage Quantity"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="damageQuantity"
                          name="damageQuantity"
                          value={values.damageQuantity}
                          sx={{
                            gridColumn: "span 2",
                            background: "#fff6c3",
                            input: { textAlign: "right" },
                          }}
                          focused
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Damage Quantity"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                          <Popup
                            title="Material"
                            openPopup={openDMpopup}
                            setOpenPopup={setOpenDMpopup}
                          >
                            {parentRecID == "23" ? (
                              <Listviewpopup
                                accessID="2013"
                                screenName="Material"
                                childToParent={childToParent}
                                filterName="Type"
                                filterValue={"Type NOT IN('L')"}
                              />
                            ) : (
                              <Listviewpopup
                                accessID="2031"
                                screenName="Material"
                                childToParent={childToParent}
                                filterName="parentID"
                                filterValue={
                                  values.IndentFlag
                                    ? `parentID='${selectDSLookupData.SUPlookupRecordid}' AND Indentflag='Y'`
                                    : parentID == "MI"
                                    ? `parentID='${selectDSLookupData.SUPlookupRecordid}' AND MtlRecordID ='${selectIndentLookupData.IndentMaterialID}'`
                                    : `parentID='${selectDSLookupData.SUPlookupRecordid}'`
                                }
                              />
                            )}
                          </Popup>
                          <Popup
                            title="Indent"
                            openPopup={openIndentPopup}
                            setOpenPopup={setOpenIndentPopup}
                          >
                            <Listviewpopup
                              accessID="2065"
                              screenName="Indent"
                              childToParent={childToParent}
                              filterName="parentID"
                              filterValue={selectDSLookupData.SUPlookupRecordid}
                            />
                          </Popup>
                        </FormControl>
                      ) : parentID == "PI" || parentID == "PO" ? (
                        <FormControl
                          sx={{
                            gridColumn: "span 2",
                            gap: "30px",
                          }}
                          style={{ width: "100%" }}
                        >
                          <TextField
                            id="psID"
                            label="ID"
                            variant="filled"
                            value={selectCPLookupData.CPlookupRecordid}
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
                                marginTop: "50px",
                              }}
                            >
                              <TextField
                                id="psCode"
                                label="Product ID"
                                variant="filled"
                                value={selectCPLookupData.CPlookupCode}
                                focused
                                required
                                inputProps={{ tabIndex: "-1" }}
                              />
                              <IconButton
                                sx={{ height: 40, width: 40 }}
                                onClick={() => handleShow("CP")}
                              >
                                <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                              </IconButton>
                              <TextField
                                id="psDesc"
                                label=""
                                variant="filled"
                                value={selectCPLookupData.CPlookupDesc}
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
                            label="Reference"
                            id="Reference"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.Reference}
                            name="Reference"
                            sx={{ gridColumn: "span 2" }}
                            focused
                            multiline
                          />
                          <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Rate"
                            id="Rate"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.Rate}
                            name="Rate"
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
                            required
                          />
                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Quantity"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            id="Quantity"
                            name="Quantity"
                            value={values.Quantity}
                            sx={{
                              gridColumn: "span 2",
                              background: "#fff6c3",
                            }}
                            focused
                            onInvalid={(e) => {
                              e.target.setCustomValidity(
                                "Please Fill The Quantity"
                              );
                            }}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right" },
                              },
                            }}
                            required
                          />
                          <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Rating"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            id="DchalanDetailRating"
                            name="DchalanDetailRating"
                            value={values.DchalanDetailRating}
                            sx={{
                              gridColumn: "span 2",
                              background: "#fff6c3",
                              input: { textAlign: "right" },
                            }}
                            focused
                          />

                          <Popup
                            title="Product"
                            openPopup={openCPpopup}
                            setOpenPopup={setOpenCPpopup}
                          >
                            <Listviewpopup
                              accessID="2002"
                              screenName="Product"
                              childToParent={childToParent}
                            />
                          </Popup>
                        </FormControl>
                      ) : (
                        <FormControl
                          sx={{
                            gridColumn: "span 2",
                            gap: "30px",
                          }}
                          style={{ width: "100%" }}
                        >
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
                                marginTop: parentID == "LO" ? "50px" : "0px",
                              }}
                            >
                              <TextField
                                id="outlined-basic"
                                label="ID"
                                variant="filled"
                                value={selectDLLookupData.DLlookupRecordid}
                                focused
                                sx={{ display: "none" }}
                              />
                              <TextField
                                id="outlined-basic"
                                label="Leather"
                                variant="filled"
                                value={selectDLLookupData.DLlookupCode}
                                focused
                                required
                              />
                              <IconButton
                                sx={{ height: 40, width: 40 }}
                                onClick={() => handleShow("DL")}
                              >
                                <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                              </IconButton>
                              <TextField
                                id="outlined-basic"
                                label=""
                                variant="filled"
                                value={selectDLLookupData.DLlookupDesc}
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
                            label="Reference"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            id="Reference"
                            name="Reference"
                            value={values.Reference}
                            sx={{ gridColumn: "span 2" }}
                            focused
                            inputProps={{ maxLength: 100 }}
                            multiline
                          />

                          <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="HSN Code"
                            id="hsnCode"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.hsnCode}
                            name="hsnCode"
                            sx={{
                              gridColumn: "span 2",
                              background: "#fff6c3",
                              input: { textAlign: "right" },
                            }}
                            focused
                            inputProps={{ readOnly: true }}
                          />
  <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Rate"
                          id="lateRate"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.lateRate}
                          name="lateRate"
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
                          required
                        />
                         <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Side Qty"
                          id="SideQty"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.SideQty}
                          name="SideQty"
                          sx={{
                            gridColumn: "span 2",
                            background: "#fff6c3",
                          }}
                          focused
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Side Qty"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
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
                          label="Hide Qty"
                          id="HideQty"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.HideQty}
                          name="HideQty"
                          sx={{
                            gridColumn: "span 2",
                            background: "#fff6c3",
                          }}
                          focused
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Hide Qty"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                        />
                          <Popup
                            title="Leather"
                            openPopup={openDLpopup}
                            setOpenPopup={setOpenDLpopup}
                          >
                            {parentRecID == "23" ? (
                              <Listviewpopup
                                accessID="2013"
                                screenName="Leather"
                                childToParent={childToParent}
                                filterName="Type"
                                filterValue={"Type='L'"}
                              />
                            ) : (
                              <Listviewpopup
                                accessID="2031"
                                screenName="Leather"
                                childToParent={childToParent}
                                filterName="parentID"
                                filterValue={
                                  values.IndentFlag
                                    ? `parentID='${selectDSLookupData.SUPlookupRecordid}' AND Indentflag='Y'`
                                    : parentID == "LI"
                                    ? `parentID='${selectDSLookupData.SUPlookupRecordid}' AND MtlRecordID ='${selectIndentLookupData.IndentMaterialID}'`
                                    : `parentID='${selectDSLookupData.SUPlookupRecordid}'`
                                }
                              />
                            )}
                          </Popup>
                          <Popup
                            title="Indent"
                            openPopup={openIndentPopup}
                            setOpenPopup={setOpenIndentPopup}
                          >
                            <Listviewpopup
                              accessID="2065"
                              screenName="Indent"
                              childToParent={childToParent}
                              filterName="parentID"
                              filterValue={selectDSLookupData.SUPlookupRecordid}
                            />
                          </Popup>
                          <Popup
                            title="Grade"
                            openPopup={openGRDPopup}
                            setOpenPopup={setOpenGRDPopup}
                          >
                            <Listviewpopup
                              accessID="2022"
                              screenName="Grade"
                              childToParent={childToParent}
                            />
                          </Popup>
                          <Popup
                            title="Substance"
                            openPopup={openSUBPopup}
                            setOpenPopup={setOpenSUBPopup}
                          >
                            <Listviewpopup
                              accessID="2023"
                              screenName="Substance"
                              childToParent={childToParent}
                            />
                          </Popup>
                        </FormControl>
                      )}
                    </FormControl>
                    {parentID == "MI" || parentID == "MO" ? (
                      <React.Fragment>
                      
                      <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Comments"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="detailComments"
                          name="detailComments"
                          value={values.detailComments}
                          sx={{ gridColumn: "span 2" }}
                          focused
                          inputProps={{ maxLength: 100 }}
                          multiline
                        /> 
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Net Quantity"
                          onBlur={handleBlur}
                          onChange={() =>
                            (values.netquantity =
                              values.Quantity - values.damageQuantity)
                          }
                          id="netquantity"
                          name="netquantity"
                          value={values.Quantity - values.damageQuantity}
                          sx={{
                            gridColumn: "span 2",
                            background: "#F0CDB5",
                          }}
                          focused
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                        />

                       
                        
                      
                      </React.Fragment>
                    ) : (
                      false
                    )}
                    {parentID == "LI" || parentID == "LO" ? (
                      <React.Fragment>
                        {/* {parentRecID === "22" ? (
                          <>
                            <TextField
                              fullWidth
                              variant="filled"
                              type="number"
                              label="SGST"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              id="sgst"
                              name="sgst"
                              value={values.sgst}
                              sx={{
                                gridColumn: "span 2",
                                background: "#fff6c3",
                                input: { textAlign: "right" },
                              }}
                              focused
                              inputProps={{ readOnly: true }}
                            />
                            <TextField
                              fullWidth
                              variant="filled"
                              type="number"
                              label="CGST"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              id="cgst"
                              name="cgst"
                              value={values.cgst}
                              sx={{
                                gridColumn: "span 2",
                                background: "#fff6c3",
                                input: { textAlign: "right" },
                              }}
                              focused
                              inputProps={{ readOnly: true }}
                            />
                            <TextField
                              fullWidth
                              variant="filled"
                              type="number"
                              label="IGST"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              id="igst"
                              name="igst"
                              value={values.igst}
                              sx={{
                                gridColumn: "span 2",
                                background: "#fff6c3",
                                input: { textAlign: "right" },
                              }}
                              focused
                              onInvalid={(e) => {
                                e.target.setCustomValidity(
                                  "Please Fill The IGST"
                                );
                              }}
                              onInput={(e) => {
                                e.target.setCustomValidity("");
                              }}
                              inputProps={{ readOnly: true }}
                            />
                          </>
                        ) : (
                          false
                        )} */}

                      
                       

                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Side Sq.ft"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="SideSqft"
                          name="SideSqft"
                          value={values.SideSqft}
                          sx={{
                            gridColumn: "span 2",
                            background: "#fff6c3",
                            input: { textAlign: "right" },
                          }}
                          focused
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Hide Sq.ft"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="HideSqft"
                          name="HideSqft"
                          value={values.HideSqft}
                          sx={{
                            gridColumn: "span 2",
                            background: "#fff6c3",
                            input: { textAlign: "right" },
                          }}
                          focused
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Hide Sq.ft"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />

                        <MyField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Total Quantity"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="Totalqty"
                          name="Totalqty"
                          value={values.Totalqty}
                          required
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
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Damage Quantity"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="damageQuantity"
                          name="damageQuantity"
                          value={values.damageQuantity}
                          sx={{
                            gridColumn: "span 2",
                            background: "#fff6c3",
                            input: { textAlign: "right" },
                          }}
                          focused
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Damage Quantity"
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
                            label="Net Quantity"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            id="netquantity"
                            name="netquantity"
                            value={values.Totalqty - values.damageQuantity}
                            sx={{
                              gridColumn: "span 2",
                              background: "#F0CDB5",
                            }}
                            focused
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right" },
                              },
                            }}
                          />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Comments"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="detailComments"
                          name="detailComments"
                          value={values.detailComments}
                          sx={{ gridColumn: "span 2" }}
                          focused
                          inputProps={{ maxLength: 100 }}
                          multiline
                        />
                      </React.Fragment>
                    ) : (
                      false
                    )}
                  </Box>
                  <Box display="flex" justifyContent="end" mt="30px" gap={2}>
                    {YearFlag == "true" ? (
                      <LoadingButton
                        color="secondary"
                        variant="contained"
                        type="submit"
                        mt="30px"
                        disabled={isSubmitting}
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
                </Form>
              )}
            </Formik>
          </Box>
        ) : (
          false
        )}

        {show == "1"  && parentRecID === "34" && ( parentID == "MI") ? (
          <Box m="20px" sx={{ m: 2 }}>
            <Formik
              innerRef={ref}
              initialValues={detailInitialvalues}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  fnchalanDetailsave(values, resetForm, false);
                }, 100);
              }}
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
                setFieldValue,
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
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Code"
                      id="Code"
                      name="Code"
                      value={values.Code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      InputProps={{ readOnly: true }}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      inputProps={{ maxLength: 22 }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="date"
                      label="Date"
                      id="IvoiceDate"
                      name="dcDate"
                      InputProps={{ readOnly: true }}
                      value={values.dcDate}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputFormat="YYYY-MM-DD"
                      sx={{ gridColumn: "span 2" }}
                      focused
                    />
                    <FormControl sx={{ gridColumn: "span 2" }}>
                      <Box m="5px">
                        <Box
                          m="5px 0 0 0"
                          height="500px"
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

                    <FormControl
                      fullWidth
                      sx={{ gridColumn: "span 2", height: "433px" }}
                    >
                    
                      {parentID == "MI" || parentID == "MO" ? (
                        <FormControl
                          sx={{
                            gap: "30px",
                          }}
                          fullWidth
                        >
                         

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
                                marginTop: parentID == "MO" ? "50px" : "0px",
                              }}
                            >
                              <TextField
                                id="psCode"
                                label="Material ID"
                                variant="filled"
                                value={selectDMLookupData.DMlookupCode}
                                focused
                                required
                                inputProps={{ tabIndex: "-1" }}
                              />
                              <IconButton
                                sx={{ height: 40, width: 40 }}
                                onClick={() => handleShow("DM")}
                              >
                                <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                              </IconButton>
                              <TextField
                                id="psDesc"
                                label=""
                                variant="filled"
                                value={selectDMLookupData.DMlookupDesc}
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
                            label="Reference"
                            id="Reference"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.Reference}
                            name="Reference"
                            sx={{ gridColumn: "span 2" }}
                            focused
                            multiline
                          />

                          <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="HSN Code"
                            id="hsnCode"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.hsnCode}
                            name="hsnCode"
                            sx={{
                              gridColumn: "span 2",
                              background: "#fff6c3",
                              input: { textAlign: "right" },
                            }}
                            focused
                            inputProps={{ readOnly: true }}
                          />
                          <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Rate"
                            id="lateRate"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.lateRate}
                            name="lateRate"
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
                            required
                          />

                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Quantity"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            id="Quantity"
                            name="Quantity"
                            value={values.Quantity}
                            sx={{
                              gridColumn: "span 2",
                              background: "#fff6c3",
                            }}
                            focused
                            onInvalid={(e) => {
                              e.target.setCustomValidity(
                                "Please Fill The Quantity"
                              );
                            }}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right" },
                              },
                            }}
                            required
                          />
<TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Damage Quantity"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="damageQuantity"
                          name="damageQuantity"
                          value={values.damageQuantity}
                          sx={{
                            gridColumn: "span 2",
                            background: "#fff6c3",
                            input: { textAlign: "right" },
                          }}
                          focused
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Damage Quantity"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                          <Popup
                            title="Material"
                            openPopup={openDMpopup}
                            setOpenPopup={setOpenDMpopup}
                          >
                        
                              <Listviewpopup
                                accessID="2073"
                                screenName="Material"
                                childToParent={childToParent}
                                filterName="parentID"
                                filterValue={
                                  jwbLookup.jwbRecordID
                                }
                              />  
                          </Popup>
                          <Popup
                            title="Indent"
                            openPopup={openIndentPopup}
                            setOpenPopup={setOpenIndentPopup}
                          >
                            <Listviewpopup
                              accessID="2065"
                              screenName="Indent"
                              childToParent={childToParent}
                              filterName="parentID"
                              filterValue={selectDSLookupData.SUPlookupRecordid}
                            />
                          </Popup>
                        </FormControl>
                      ) : parentID == "PI" || parentID == "PO" ? (
                        <FormControl
                          sx={{
                            gridColumn: "span 2",
                            gap: "30px",
                          }}
                          style={{ width: "100%" }}
                        >
                          <TextField
                            id="psID"
                            label="ID"
                            variant="filled"
                            value={selectCPLookupData.CPlookupRecordid}
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
                                marginTop: "50px",
                              }}
                            >
                              <TextField
                                id="psCode"
                                label="Product ID"
                                variant="filled"
                                value={selectCPLookupData.CPlookupCode}
                                focused
                                required
                                inputProps={{ tabIndex: "-1" }}
                              />
                              <IconButton
                                sx={{ height: 40, width: 40 }}
                                onClick={() => handleShow("CP")}
                              >
                                <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                              </IconButton>
                              <TextField
                                id="psDesc"
                                label=""
                                variant="filled"
                                value={selectCPLookupData.CPlookupDesc}
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
                            label="Reference"
                            id="Reference"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.Reference}
                            name="Reference"
                            sx={{ gridColumn: "span 2" }}
                            focused
                            multiline
                          />
                          <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Rate"
                            id="Rate"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.Rate}
                            name="Rate"
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
                            required
                          />
                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Quantity"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            id="Quantity"
                            name="Quantity"
                            value={values.Quantity}
                            sx={{
                              gridColumn: "span 2",
                              background: "#fff6c3",
                            }}
                            focused
                            onInvalid={(e) => {
                              e.target.setCustomValidity(
                                "Please Fill The Quantity"
                              );
                            }}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right" },
                              },
                            }}
                            required
                          />
                          <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Rating"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            id="DchalanDetailRating"
                            name="DchalanDetailRating"
                            value={values.DchalanDetailRating}
                            sx={{
                              gridColumn: "span 2",
                              background: "#fff6c3",
                              input: { textAlign: "right" },
                            }}
                            focused
                          />

                          <Popup
                            title="Product"
                            openPopup={openCPpopup}
                            setOpenPopup={setOpenCPpopup}
                          >
                            <Listviewpopup
                              accessID="2002"
                              screenName="Product"
                              childToParent={childToParent}
                            />
                          </Popup>
                        </FormControl>
                      ) : (
                        <FormControl
                          sx={{
                            gridColumn: "span 2",
                            gap: "30px",
                          }}
                          style={{ width: "100%" }}
                        >
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
                                marginTop: parentID == "LO" ? "50px" : "0px",
                              }}
                            >
                              <TextField
                                id="outlined-basic"
                                label="ID"
                                variant="filled"
                                value={selectDLLookupData.DLlookupRecordid}
                                focused
                                sx={{ display: "none" }}
                              />
                              <TextField
                                id="outlined-basic"
                                label="Leather"
                                variant="filled"
                                value={selectDLLookupData.DLlookupCode}
                                focused
                                required
                              />
                              <IconButton
                                sx={{ height: 40, width: 40 }}
                                onClick={() => handleShow("DL")}
                              >
                                <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                              </IconButton>
                              <TextField
                                id="outlined-basic"
                                label=""
                                variant="filled"
                                value={selectDLLookupData.DLlookupDesc}
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
                            label="Reference"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            id="Reference"
                            name="Reference"
                            value={values.Reference}
                            sx={{ gridColumn: "span 2" }}
                            focused
                            inputProps={{ maxLength: 100 }}
                            multiline
                          />

                          <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="HSN Code"
                            id="hsnCode"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.hsnCode}
                            name="hsnCode"
                            sx={{
                              gridColumn: "span 2",
                              background: "#fff6c3",
                              input: { textAlign: "right" },
                            }}
                            focused
                            inputProps={{ readOnly: true }}
                          />
  <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Rate"
                          id="lateRate"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.lateRate}
                          name="lateRate"
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
                          required
                        />
                         <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Side Qty"
                          id="SideQty"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.SideQty}
                          name="SideQty"
                          sx={{
                            gridColumn: "span 2",
                            background: "#fff6c3",
                          }}
                          focused
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Side Qty"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
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
                          label="Hide Qty"
                          id="HideQty"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.HideQty}
                          name="HideQty"
                          sx={{
                            gridColumn: "span 2",
                            background: "#fff6c3",
                          }}
                          focused
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Hide Qty"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                        />
                          <Popup
                            title="Leather"
                            openPopup={openDLpopup}
                            setOpenPopup={setOpenDLpopup}
                          >
                            {parentRecID == "23" ? (
                              <Listviewpopup
                                accessID="2013"
                                screenName="Leather"
                                childToParent={childToParent}
                                filterName="Type"
                                filterValue={"Type='L'"}
                              />
                            ) : (
                              <Listviewpopup
                                accessID="2031"
                                screenName="Leather"
                                childToParent={childToParent}
                                filterName="parentID"
                                filterValue={
                                  values.IndentFlag
                                    ? `parentID='${selectDSLookupData.SUPlookupRecordid}' AND Indentflag='Y'`
                                    : parentID == "LI"
                                    ? `parentID='${selectDSLookupData.SUPlookupRecordid}' AND MtlRecordID ='${selectIndentLookupData.IndentMaterialID}'`
                                    : `parentID='${selectDSLookupData.SUPlookupRecordid}'`
                                }
                              />
                            )}
                          </Popup>
                          <Popup
                            title="Indent"
                            openPopup={openIndentPopup}
                            setOpenPopup={setOpenIndentPopup}
                          >
                            <Listviewpopup
                              accessID="2065"
                              screenName="Indent"
                              childToParent={childToParent}
                              filterName="parentID"
                              filterValue={selectDSLookupData.SUPlookupRecordid}
                            />
                          </Popup>
                          <Popup
                            title="Grade"
                            openPopup={openGRDPopup}
                            setOpenPopup={setOpenGRDPopup}
                          >
                            <Listviewpopup
                              accessID="2022"
                              screenName="Grade"
                              childToParent={childToParent}
                            />
                          </Popup>
                          <Popup
                            title="Substance"
                            openPopup={openSUBPopup}
                            setOpenPopup={setOpenSUBPopup}
                          >
                            <Listviewpopup
                              accessID="2023"
                              screenName="Substance"
                              childToParent={childToParent}
                            />
                          </Popup>
                        </FormControl>
                      )}
                    </FormControl>
                    {parentID == "MI" || parentID == "MO" ? (
                      <React.Fragment>
                      
                      <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Comments"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="detailComments"
                          name="detailComments"
                          value={values.detailComments}
                          sx={{ gridColumn: "span 2" }}
                          focused
                          inputProps={{ maxLength: 100 }}
                          multiline
                        /> 
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Net Quantity"
                          onBlur={handleBlur}
                          onChange={() =>
                            (values.netquantity =
                              values.Quantity - values.damageQuantity)
                          }
                          id="netquantity"
                          name="netquantity"
                          value={values.Quantity - values.damageQuantity}
                          sx={{
                            gridColumn: "span 2",
                            background: "#F0CDB5",
                          }}
                          focused
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                        />

                       
                        
                      
                      </React.Fragment>
                    ) : (
                      false
                    )}
                    {parentID == "LI" || parentID == "LO" ? (
                      <React.Fragment>
                        {/* {parentRecID === "22" ? (
                          <>
                            <TextField
                              fullWidth
                              variant="filled"
                              type="number"
                              label="SGST"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              id="sgst"
                              name="sgst"
                              value={values.sgst}
                              sx={{
                                gridColumn: "span 2",
                                background: "#fff6c3",
                                input: { textAlign: "right" },
                              }}
                              focused
                              inputProps={{ readOnly: true }}
                            />
                            <TextField
                              fullWidth
                              variant="filled"
                              type="number"
                              label="CGST"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              id="cgst"
                              name="cgst"
                              value={values.cgst}
                              sx={{
                                gridColumn: "span 2",
                                background: "#fff6c3",
                                input: { textAlign: "right" },
                              }}
                              focused
                              inputProps={{ readOnly: true }}
                            />
                            <TextField
                              fullWidth
                              variant="filled"
                              type="number"
                              label="IGST"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              id="igst"
                              name="igst"
                              value={values.igst}
                              sx={{
                                gridColumn: "span 2",
                                background: "#fff6c3",
                                input: { textAlign: "right" },
                              }}
                              focused
                              onInvalid={(e) => {
                                e.target.setCustomValidity(
                                  "Please Fill The IGST"
                                );
                              }}
                              onInput={(e) => {
                                e.target.setCustomValidity("");
                              }}
                              inputProps={{ readOnly: true }}
                            />
                          </>
                        ) : (
                          false
                        )} */}

                      
                       

                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Side Sq.ft"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="SideSqft"
                          name="SideSqft"
                          value={values.SideSqft}
                          sx={{
                            gridColumn: "span 2",
                            background: "#fff6c3",
                            input: { textAlign: "right" },
                          }}
                          focused
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Hide Sq.ft"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="HideSqft"
                          name="HideSqft"
                          value={values.HideSqft}
                          sx={{
                            gridColumn: "span 2",
                            background: "#fff6c3",
                            input: { textAlign: "right" },
                          }}
                          focused
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Hide Sq.ft"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />

                        <MyField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Total Quantity"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="Totalqty"
                          name="Totalqty"
                          value={values.Totalqty}
                          required
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
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Damage Quantity"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="damageQuantity"
                          name="damageQuantity"
                          value={values.damageQuantity}
                          sx={{
                            gridColumn: "span 2",
                            background: "#fff6c3",
                            input: { textAlign: "right" },
                          }}
                          focused
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Damage Quantity"
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
                            label="Net Quantity"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            id="netquantity"
                            name="netquantity"
                            value={values.Totalqty - values.damageQuantity}
                            sx={{
                              gridColumn: "span 2",
                              background: "#F0CDB5",
                            }}
                            focused
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right" },
                              },
                            }}
                          />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Comments"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="detailComments"
                          name="detailComments"
                          value={values.detailComments}
                          sx={{ gridColumn: "span 2" }}
                          focused
                          inputProps={{ maxLength: 100 }}
                          multiline
                        />
                      </React.Fragment>
                    ) : (
                      false
                    )}
                  </Box>
                  <Box display="flex" justifyContent="end" mt="30px" gap={2}>
                    {YearFlag == "true" ? (
                      <LoadingButton
                        color="secondary"
                        variant="contained"
                        type="submit"
                        mt="30px"
                        disabled={isSubmitting}
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
                </Form>
              )}
            </Formik>
          </Box>
        ) : (
          false
        )}
        {show == "2" ? (
          <Box m="20px" sx={{ m: 2 }}>
            <Formik
              innerRef={ref}
              initialValues={summaryInitialvalues}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  FnSummary(values, resetForm);
                }, 100);
              }}
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
                setFieldValue,
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
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Code"
                      id="Code"
                      name="Code"
                      value={values.Code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      InputProps={{ readOnly: true }}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      inputProps={{ maxLength: 22 }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="date"
                      label="Date"
                      id="IvoiceDate"
                      name="dcDate"
                      InputProps={{ readOnly: true }}
                      value={values.dcDate}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputFormat="YYYY-MM-DD"
                      sx={{ gridColumn: "span 2" }}
                      focused
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Transport Expensive"
                      id="transportexpensive"
                      name="transportexpensive"
                      value={values.transportexpensive}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                      focused
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Transport Comments"
                      id="transportcharge"
                      name="transportcharge"
                      value={values.transportcharge}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{ gridColumn: "span 2" }}
                      focused
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Freight Charge"
                      id="freighthandling"
                      name="freighthandling"
                      value={values.freighthandling}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                      focused
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Freight Comments"
                      id="freightcharge"
                      name="freightcharge"
                      value={values.freightcharge}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{ gridColumn: "span 2" }}
                      focused
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Nos Of Items"
                      id="numberofitems"
                      name="numberofitems"
                      value={values.numberofitems}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                      focused
                      InputProps={{
                        inputProps: {
                          readOnly: true,
                          style: { textAlign: "right" },
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Total Amount"
                      id="totalamount"
                      name="totalamount"
                      value={values.totalamount}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                        textAlign: "right",
                      }}
                      focused
                      InputProps={{
                        inputProps: {
                          readOnly: true,
                          style: { textAlign: "right" },
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Net Price"
                      id="nettotal"
                      name="nettotal"
                      value={
                        Number(values.totalamount) +
                        Number(values.transportexpensive) +
                        Number(values.freighthandling)
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                        textAlign: "right",
                      }}
                      focused
                      InputProps={{
                        inputProps: {
                          readOnly: true,
                          style: { textAlign: "right" },
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Payment Detail"
                      id="paymentdetail"
                      name="paymentdetail"
                      value={values.paymentdetail}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      //  InputProps={{ readOnly: true }}
                      sx={{ gridColumn: "span 2" }}
                      focused
                    />
                  </Box>
                  <Box display="flex" justifyContent="end" mt="30px" gap={2}>
                    {YearFlag == "true" ? (
                      <LoadingButton
                        color="secondary"
                        variant="contained"
                        type="submit"
                        mt="30px"
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
                </Form>
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

export default Editdeliverychalan;
