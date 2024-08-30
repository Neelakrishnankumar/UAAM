import {
  useTheme,
  MenuItem,
  Menu,
  Box,
  Breadcrumbs,
  Button,
  InputLabel,
  TextField,
  Stack,
  IconButton,
  Avatar,
  FormLabel,
  FormControl,
  Typography,
  FormControlLabel,
  Select,
  Skeleton,
  Tooltip,
  Checkbox,
  LinearProgress,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Formik, Field, Form, useField, useFormikContext } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../index";
import {
  fetchApidata,
  postApidata,
  customerLeather,
  explorePostData,
  postData,
  getFetchData,
} from "../../../store/reducers/Formapireducer";
import { fetchComboData1 } from "../../../store/reducers/Comboreducer";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import basicSchema from "../../Security/validation";
import {
  customersSchema,
  cusnotifySchema,
  cusproductSchema,
} from "../../Security/validation";
import Listviewpopup from "../Lookup";
import Popup from "../popup";
import { tokens } from "../../../Theme";
import Swal from "sweetalert2";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { LoadingButton } from "@mui/lab";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { fnFileUpload } from "../../../store/reducers/Imguploadreducer";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
// ***********************************************
//  Developer:Gowsalya
// Purpose:Create customer

// ***********************************************
async function fetchNewTextC(a, b) {
  // await new Promise((r) => setTimeout(r, 200));
  return ` ${Number(a || 0) * Number((b || 0) / 100) + Number(a)}`;
}

const MyField = (props) => {
  const {
    values: { costPrice, variantPercentage },
    setFieldValue,
    touched,
  } = useFormikContext();
  const [field, meta] = useField(props);

  React.useEffect(() => {
    let isCurrent = true;
    // your business logic around when to fetch goes here.
    if (
      costPrice !== "" &&
      variantPercentage !== ""
      // (touched.costPrice || touched.variantPercentage)
    ) {
      fetchNewTextC(costPrice, variantPercentage).then((agreedPrice) => {
        if (!!isCurrent) {
          // prevent setting old values
          setFieldValue(props.name, agreedPrice.trim());
          // alert(Totalqty)
        }
      });
    }
    return () => {
      isCurrent = false;
    };
  }, [costPrice, variantPercentage, setFieldValue, props.name]);

  return (
    <React.Fragment>
      <TextField {...props} {...field} />
    </React.Fragment>
  );
};
const Editcustomermaster = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const [pageSize, setPageSize] = React.useState(10);
  var loginrecid = sessionStorage.getItem("loginRecid");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var screeNo = params.show;
  var accessID = params.accessID;
  const Data = useSelector((state) => state.formApi.Data);
  const customerLeatherData = useSelector(
    (state) => state.formApi.customerLeatherData
  );
  const exploreLoading = useSelector((state) => state.exploreApi.loading);
  const getLoading = useSelector((state) => state.formApi.getLoading);

  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.loading);
  const [tot, setTot] = useState();

  const [portType, setPortType] = useState("");
  var LookupFilter = `Type' ='L`;
  const ref = useRef();
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const productfilter = "parentID=" + recID;
  useEffect(() => {
    // dispatch(fetchApidata(accessID, "get", recID));
    dispatch(getFetchData({ accessID, get: "get", recID }));
    if (screeNo == 2) {
      dispatch(
        fetchExplorelitview("TR017", "Customer Products", productfilter, "")
      );
      selectcelldata("", "A", "");
      // dispatch(fetchApidata(accessID, "get", recID));
    }

    // dispatch(fetchComboData1("TR010", "getall", recID, "customermaster"));
  }, [location.key, screeNo]);
  const [ini, setIni] = useState(true);
  const [iniNotification, setIniNotification] = useState(true);
  const [iniProduct, setIniProduct] = useState(true);
  const [loading, setLoading] = useState(false);
  const [Code, setCode] = useState();
  const [Name, setName] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [uploadFile, setUploadFile] = useState();
  var userimg = store.getState().globalurl.imageUrl;
  if (mode == "A") {
    userimg = userimg + "Defaultimg.jpg";
  } else {
    if (
      Data.ImageName == undefined ||
      Data.ImageName == null ||
      Data.ImageName == ""
    ) {
      userimg = userimg + "Defaultimg.jpg";
    } else {
      userimg = userimg + Data.ImageName;
    }
  }

  //*******Assign customer master values from Database in  Yup initial value******* */
  const initialValues = {
    CURRecordID: Data.CURRecordID,
    Code: Data.Code,
    Name: Data.Name,
    Email: Data.Email,
    Address1: Data.Address1,
    Address2: Data.Address2,
    Type: Data.Type,
    Fac: Data.Fac,
    Lac: Data.Lac,
    Contact: Data.Contact,
    Bank: Data.Bank,
    Web: Data.Web,
    Phone: Data.Phone,
    Fax: Data.Fax,
    Regularnextno: Data.Regularnextno,
    Assortednextno: Data.Assortednextno,
    InvTolPercentage: Data.InvTolPercentage,
    SortOrder: Data.SortOrder,
    ForiegnAgentFlag: Data.ForiegnAgentFlag == "Y" ? true : false,
    LocalAgentFlag: Data.LocalAgentFlag == "Y" ? true : false,
    profit: Data.Profit,
    checkbox: Data.Disable == "Y" ? true : false,
    identityNO: Data.IdentityNO,
    notify: Data.Notifyone,
    notifyFax: Data.Notifyfax,
    notifyTel: Data.Notifytel,
  };

  const productcompnyInitialValue = {};
  const [openCTYpopup, setOpenCTYpopup] = useState(false);
  const [openCURpopup, setOpenCURpopup] = useState(false);
  const [openCPpopup, setOpenCPpopup] = useState(false);
  const [openCCpopup, setOpenCCpopup] = useState(false);
  const [openCLpopup, setOpenCLpopup] = useState(false);
  const [OpenCLRPopup, setOpenCLRPopup] = useState(false);
  const [OpenLPrdPopup, setOpenLPrdPopup] = useState(false);
  const [OpenCostPopup, setOpenCostPopup] = useState(false);
  // ************Lookup Function***************
  function handleShow(type) {
    if (type == "COST") {
      setOpenCostPopup(true);
    }
    if (type == "PRD") {
      setOpenLPrdPopup(true);
    }
    if (type == "CTY") {
      setOpenCTYpopup(true);
    }
    if (type == "CUR") {
      setOpenCURpopup(true);
    }
    if (type == "CP") {
      setOpenCPpopup(true);
    }
    if (type == "CO") {
      setOpenCOPopup(true);
    }
    if (type == "CF") {
      setOpenCFPopup(true);
    }
    if (type == "BANK") {
      setOpenBankPopup(true);
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
    if (type == "CC") {
      setOpenCCpopup(true);
    }
    if (type == "CL") {
      setOpenCLpopup(true);
    }
    if (type == "CLR") {
      setOpenCLRPopup(true);
    }
    if (type == "LEATHER1") {
      setOpenleather1Popup(true);
    }
    if (type == "LEATHER2") {
      setOpenleather2Popup(true);
    }
    if (type == "BOM") {
      setOpenBOMPopup(true);
    }
    if (type == "COST") {
      setOpenCostingPopup(true);
    }
  }

  /********************************* Look up***************************/
  const [isPopupData, setisPopupdata] = React.useState(false);

  const [selectcurLookupData, setselectcurLookupData] = React.useState({
    CURlookupRecordid: "",
    CURlookupCode: "",
    CURlookupDesc: "",
  });
  const [selectCPLookupData, setselectCPLookupData] = React.useState({
    CPlookupRecordid: "",
    CPlookupCode: "",
    CPlookupDesc: "",
    CostPrice: "",
  });
  const [selectCCLookupData, setselectCCLookupData] = React.useState({
    CClookupRecordid: "",
    CClookupCode: "",
    CClookupDesc: "",
    CCRecordId: "",
  });

  const [costLookupData, setSelectCostLookupData] = React.useState({
    costLookupRecordid: "",
    costLookupCode: "",
    costLookupDesc: "",
    costLookupCostPrice: "",
  });
  if (isPopupData == false) {
    selectcurLookupData.CURlookupRecordid = Data.CURRecordID;
    selectcurLookupData.CURlookupCode = Data.CurrCode;
    selectcurLookupData.CURlookupDesc = Data.CurDescription;
  }

  /**********************************Lookup********************** */

  const [openCOPopup, setOpenCOPopup] = useState(false);
  const [selectCOLookupData, setselectCOLookupData] = React.useState({
    OCnRecordID: "",
    OriginCountryCode: "",
    OriginCountryName: "",
  });
  if (isPopupData == false) {
    selectCOLookupData.OCnRecordID = Data.OCnRecordID;
    selectCOLookupData.OriginCountryCode = Data.OriginCountryCode;
    selectCOLookupData.OriginCountryName = Data.OriginCountryName;
  }

  const [openCFPopup, setOpenCFPopup] = useState(false);
  const [selectCFLookupData, setselectCFLookupData] = React.useState({
    FCnRecordID: "",
    FinalCountryCode: "",
    FinalCountryName: "",
  });
  if (isPopupData == false) {
    selectCFLookupData.FCnRecordID = Data.FCnRecordID;
    selectCFLookupData.FinalCountryCode = Data.FinalCountryCode;
    selectCFLookupData.FinalCountryName = Data.FinalCountryName;
  }
  const [openBankPopup, setOpenBankPopup] = useState(false);
  const [selectBankLookupData, setselectBankLookupData] = React.useState({
    BankRecordID: "",
    BankCode: "",
    BankName: "",
  });
  if (isPopupData == false) {
    selectBankLookupData.BankRecordID = Data.BankID;
    selectBankLookupData.BankCode = Data.BankCode;
    selectBankLookupData.BankName = Data.BankName;
  }

  // Leather1
  const [openleather1Popup, setOpenleather1Popup] = useState(false);
  const [leather1Lookup, setleather1Lookup] = useState({
    leather1RecordID: "",
    leather1Code: "",
    leather1Name: "",
  });
  // if (isPopupData == false) {
  //   leather1Lookup.leather1Code = Data.SLeatherCode;
  //   leather1Lookup.leather1Name = Data.SLeatherName;
  //   leather1Lookup.leather1RecordID = Data.SLeatherRecordID;
  // }

  //Leather2
  const [openleather2Popup, setOpenleather2Popup] = useState(false);
  const [leather2Lookup, setleather2Lookup] = useState({
    leather2RecordID: "",
    leather2Code: "",
    leather2Name: "",
  });
  // if (isPopupData == false) {
  //   leather2Lookup.leather2Code = Data.TLeatherCode;
  //   leather2Lookup.leather2Name = Data.TLeatherName;
  //   leather2Lookup.leather2RecordID = Data.TLeatherRecordID;
  // }
  //bom
  const [openBOMPopup, setOpenBOMPopup] = useState(false);
  const [BOMLookup, setBOMLookup] = useState({
    BOMRecordID: "",
    BOMCode: "",
    BOMCount:0
  });

  const [openCostingPopup, setOpenCostingPopup] = useState(false);
  const [costingLookup, setCostingLookup] = useState({
    costingRecordID: "",
    costingCode: "",
    PrimaryLeahterRecID:"",
    SecondaryLeatherRecID:"",
    TertriayLeatherRecID:"",
    costingPrice:""
  });
  // if (isPopupData == false) {
  //   BOMLookup.BOMCode = Data.BomCode;
  //   BOMLookup.BOMRecordID = Data.BomID;
  // }
  // port
  const [openPOPopup, setOpenPOPopup] = useState(false);
  const [selectPOLookupData, setselectPOLookupData] = React.useState({
    OPoRecordID: "",
    OrginPortCode: "",
    OrginPortDescription: "",
  });
  if (isPopupData == false) {
    selectPOLookupData.OPoRecordID = Data.OPoRecordID;
    selectPOLookupData.OrginPortCode = Data.OrginPortCode;
    selectPOLookupData.OrginPortDescription = Data.OrginPortDescription;
  }

  const [openPDPopup, setOpenPDPopup] = useState(false);
  const [selectPDLookupData, setselectPDLookupData] = React.useState({
    DPoRecordID: "",
    DeliveryPortCode: "",
    DeliveryPortDescription: "",
  });
  if (isPopupData == false) {
    selectPDLookupData.DPoRecordID = Data.DPoRecordID;
    selectPDLookupData.DeliveryPortCode = Data.DeliveryPortCode;
    selectPDLookupData.DeliveryPortDescription = Data.DeliveryPortDescription;
  }
  const [openDPPopup, setOpenDPPopup] = useState(false);
  const [selectDPLookupData, setselectDPLookupData] = React.useState({
    DSPoRecordID: "",
    DischargePortCode: "",
    DischargePortDescription: "",
  });
  if (isPopupData == false) {
    selectDPLookupData.DSPoRecordID = Data.DSPoRecordID;
    selectDPLookupData.DischargePortCode = Data.DischargePortCode;
    selectDPLookupData.DischargePortDescription = Data.DischargePortDescription;
  }
  const [openPLPopup, setOpenPLPopup] = useState(false);
  const [selectPLLookupData, setselectPLLookupData] = React.useState({
    LPoRecordID: "",
    LoadingPortCode: "",
    LoadingPortDescription: "",
  });
  if (isPopupData == false) {
    selectPLLookupData.LPoRecordID = Data.LPoRecordID;
    selectPLLookupData.LoadingPortCode = Data.LoadingPortCode;
    selectPLLookupData.LoadingPortDescription = Data.LoadingPortDescription;
  }
  const [openPFPopup, setOpenPFPopup] = useState(false);
  const [selectPFLookupData, setselectPFLookupData] = React.useState({
    FPoRecordID: "",
    FinalPortCode: "",
    FinalPortDesc: "",
  });
  if (isPopupData == false) {
    selectPFLookupData.FPoRecordID = Data.FPoRecordID;
    selectPFLookupData.FinalPortCode = Data.FinalPortCode;
    selectPFLookupData.FinalPortDesc = Data.FinalPortDesc;
  }

  const [selectCLLookupData, setselectCLLookupData] = React.useState({
    CULRecordID: "",
    CULCode: "",
    CULDescription: "",
  });
  //************************** Lookup value assign type based Function *****************/

  const childToParent = (childdata, type) => {
    console.log("🚀 ~ childToParent ~ childdata:", childdata)
    setisPopupdata(true);
    if (type == "Currency") {
      setselectcurLookupData({
        CURlookupCode: childdata.Code,
        CURlookupRecordid: childdata.RecordID,
        CURlookupDesc: childdata.Name,
      });
      setOpenCURpopup(false);
    }
    if (type == "Costing") {
      setCostingLookup({
        costingRecordID: childdata.RecordID,
        costingCode: childdata.Code,
        PrimaryLeahterRecID:childdata.PrimaryLeatherID,
        SecondaryLeatherRecID:childdata.SecondaryLeatherID,
        TertriayLeatherRecID:childdata.TeritiaryLeatherID,
        costingPrice:childdata.Cost
      });
      setOpenCostingPopup(false);
    }

    if (type == "Customer Product") {
      setselectCPLookupData({
        CPlookupRecordid: childdata.RecordID,
        CPlookupCode: childdata.Code,
        CPlookupDesc: childdata.Name,
        CostPrice: childdata.Costprice,
      });
      setOpenCPpopup(false);
    }
    if (type == "Product Costing") {
      setSelectCostLookupData({
        costLookupRecordid: childdata.RecordID,
        costLookupCode: childdata.Code,
        costLookupDesc: childdata.Name,
        costLookupCostPrice: childdata.CostingPrice,
      });
      setOpenCostPopup(false);
    }
    if (type == "Customer Company") {
      setselectCCLookupData({
        CClookupRecordid: childdata.RecordID,
        CClookupCode: childdata.Code,
        CClookupDesc: childdata.Name,
      });
      setOpenCCpopup(false);
    }
    if (type == "Origin Country") {
      console.log("lkptype" + type);
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
    if (type == "Bank") {
      setselectBankLookupData({
        BankCode: childdata.Code,
        BankRecordID: childdata.RecordID,
        BankName: childdata.Name,
      });
      setOpenBankPopup(false);
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
    if (type == "Primary Leather") {
      setselectCLLookupData({
        CULCode: childdata.Code,
        CULDescription: childdata.Name,
        CULRecordID: childdata.RecordID,
      });
      setOpenCLpopup(false);
    }
    if (type == "Color") {
      setselectclrLookupData({
        ClrlookupRecordid: childdata.RecordID,
        ClrlookupCode: childdata.Code,
        ClrlookupDesc: childdata.Name,
      });
      setOpenCLRPopup(false);
    }
    if (type == "Leather") {
      setLeatherProductData({
        LPRecordID: childdata.ProductRecordID,
        LPName: childdata.Code,
        LPCode: childdata.Name,
      });
      setOpenLPrdPopup(false);
    }
    if (type == "Secondary Leather") {
      setisPopupdata(true);
      setleather1Lookup({
        leather1RecordID: childdata.RecordID,
        leather1Code: childdata.Code,
        leather1Name: childdata.Name,
      });
      setOpenleather1Popup(false);
    }
    if (type == "Tertiary Leather") {
      setisPopupdata(true);
      setleather2Lookup({
        leather2RecordID: childdata.RecordID,
        leather2Code: childdata.Code,
        leather2Name: childdata.Name,
      });
      setOpenleather2Popup(false);
    }
    if (type == "BOM") {
      setisPopupdata(true);
      setBOMLookup({
        BOMRecordID: childdata.RecordID,
        BOMCode: childdata.Code,
        BOMCount: childdata.Count
      });
      dispatch(
        customerLeather({
          HeaderRecordID: childdata.RecordID,
          ProductRecordID: LetherProductLookup.LPRecordID,
          CustomerRecordID: recID,
        })
      );

      setOpenBOMPopup(false);
    }
  };
  // **********Save Function*****************
  const fnSave = async (values) => {
    var idata = {
      RecordID: recID,
      YearID: Year,
      CURRecordID: selectcurLookupData.CURlookupRecordid,
      Code: values.Code,
      Name: values.Name,
      Email: values.Email,
      Address1: values.Address1,
      Address2: values.Address2,
      Type: values.Type,
      OCnRecordID: selectCOLookupData.OCnRecordID,
      OriginCountryCode: selectCOLookupData.OriginCountryCode,
      OriginCountryName: selectCOLookupData.OriginCountryName,
      FCnRecordID: selectCFLookupData.FCnRecordID,
      FinalCountryCode: selectCFLookupData.FinalCountryCode,
      FinalCountryName: selectCFLookupData.FinalCountryName,
      BankID: selectBankLookupData.BankRecordID,
      BankCode: selectBankLookupData.BankCode,
      BankName: selectBankLookupData.BankName,
      OPoRecordID: selectPOLookupData.OPoRecordID,
      OrginPortCode: selectPOLookupData.OrginPortCode,
      OrginPortDescription: selectPOLookupData.OrginPortDescription,
      DPoRecordID: selectPDLookupData.DPoRecordID,
      DeliveryPortCode: selectPDLookupData.DeliveryPortCode,
      DeliveryPortDescription: selectPDLookupData.DeliveryPortDescription,
      DSPoRecordID: selectDPLookupData.DSPoRecordID,
      DischargePortCode: selectDPLookupData.DischargePortCode,
      DischargePortDescription: selectDPLookupData.DischargePortDescription,
      LPoRecordID: selectPLLookupData.LPoRecordID,
      LoadingPortCode: selectPLLookupData.LoadingPortCode,
      LoadingPortDescription: selectPLLookupData.LoadingPortDescription,
      FPoRecordID: selectPFLookupData.FPoRecordID,
      FinalPortCode: selectPFLookupData.FinalPortCode,
      FinalPortDesc: selectPFLookupData.FinalPortDesc,
      Fac: values.Fac,
      Lac: values.Lac,
      Contact: values.Contact,
      // Bank: values.Bank,
      Web: values.Web,
      Phone: values.Phone,
      Fax: values.Fax,
      Regularnextno: values.Regularnextno,
      Assortednextno: values.Assortednextno,
      SortOrder: values.SortOrder,
      InvTolPercentage: values.InvTolPercentage,
      ForiegnAgentFlag: values.ForiegnAgentFlag == true ? "Y" : "N",
      LocalAgentFlag: values.LocalAgentFlag == true ? "Y" : "N",
      Profit: values.profit,
      Disable: values.checkbox == true ? "Y" : "N",
      IdentityNO: values.identityNO,
      Notifyone: values.notify,
      Notifyfax: values.notifyFax,
      Notifytel: values.notifyTel,
      Finyear,
      CompanyID,

    };

    const action = mode === "A" ? "insert" : "update";
    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate(
        `/Apps/TR010/Customers/EditCustomers/${response.payload.Recid}/E/0`
      );
    } else {
      toast.error(response.payload.Msg);
    }
  };

  /*************************************Notification Screen **** */
  const style = {
    height: "55px",
    borderBottom: "2px solid #1769aa ",
    backgroundColor: "#EDEDED",
    borderTop: "2px solid #EDEDED",
    borderRight: "2px solid #EDEDED",
    borderLeft: "2px solid #EDEDED",
    borderTopLeftRadius: "3px",
    borderTopRightRadius: "3px",
  };
  const [show, setShow] = useState(screeNo);
  const [notifyCmode, setnotifyCmode] = useState("A");
  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );
  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );
  const [notInfo, setNotInfo] = useState({
    RecordID: "",
    NotifyType: "",
    Purpose: "",
    Response: "",
    SortOrder: "",
    Disable: "",
  });

  /*************SEARCH********************** */

  var VISIBLE_FIELDS = [];
  if (show == "1") {
    VISIBLE_FIELDS = [
      "SLNO",
      "NotificationType",
      "Purpose",
      "Response",
      "action",
    ];
  } else if (show == "2") {
    VISIBLE_FIELDS = [
      "SLNO",
      "ProductCode",
      "ProductName",
      "AgreedPrice",
      "action",
    ];
  } else if (show == "4") {
    VISIBLE_FIELDS = [
      "SLNO",
      "LeatherCode",
      "ProductCode",
      "LeatherName",
      "AgreedPrice",
      "action",
    ];
  } else {
    VISIBLE_FIELDS = ["SLNO", "CompanyCode", "CompanyName", "action"];
  }
  // console.log(explorelistViewcolumn)

  const columns = React.useMemo(
    () =>
      explorelistViewcolumn.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
    [explorelistViewcolumn]
  );
  console.log("listcolumnew" + JSON.stringify(columns));
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
          <Typography>List of Customer Notification</Typography>
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
                fnCustomernot("", "A", "");
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
          <Typography>List of products</Typography>
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

  function CustombarCompany() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>Companies</Typography>
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
  function CustomToolbarLeather() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>List of Leather</Typography>
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
                selectcellcustleatherdata("", "A", "");
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

  // **********ScreenChange Function*********
  const handleChange = (event) => {
    setShow(event.target.value);
    setCode(Data.Code);
    setName(Data.Name);
    if (event.target.value == "1") {
      dispatch(
        fetchExplorelitview("TR018", "Customer Notification", recID, "")
      );
      fnCustomernot("", "A", "");
    }

    if (event.target.value == "2") {
      dispatch(
        fetchExplorelitview("TR017", "Customer Products", productfilter, "")
      );

      selectcelldata("", "A", "");
      // dispatch(fetchApidata(accessID, "get", recID));
    }
    if (event.target.value == "0") {
      // dispatch(fetchApidata(accessID, "get", recID));
    }
    if (event.target.value == "3") {
      dispatch(fetchExplorelitview("TR082", "Customer Company", recID, ""));

      selectcelldata("", "A", "");
      // dispatch(fetchApidata(accessID, "get", recID));
    }
    if (event.target.value == "4") {
      dispatch(fetchExplorelitview("TR093", "Leather", recID, ""));

      selectcellcustleatherdata("", "A", "");
      // dispatch(fetchApidata(accessID, "get", recID));
    }
  };

  /****************** Notification values assign a state variale******************** */
  // const fnCustomernot = (notedata, notemode, fieldvalue) => {
  //   // alert("hi");
  //   console.log("selectdata" + JSON.stringify(notedata));

  //   setnotifyCmode(notemode);
  //   setIniNotification(true);
  //   // setIniProduct(true)
  //   if (notemode == "A") {
  //     setNotInfo({
  //       RecordID: "",
  //       NotifyType: "",
  //       Purpose: "",
  //       Response: "",
  //       SortOrder: "",
  //       Disable: "",
  //     });
  //   } else {
  //     if (fieldvalue == "action") {
  //       setNotInfo({
  //         RecordID: notedata.RecordID,
  //         NotifyType: notedata.NotifyType,
  //         Purpose: notedata.Purpose,
  //         Response: notedata.Response,
  //         SortOrder: notedata.SortOrder,
  //         Disable: notedata.Disable,
  //       });
  //     }
  //   }
  // };
  //*******Assign Notification values from Grid table in  Yup initial value******* */
  const fnCustomernot = (notedata, notemode, fieldvalue) => {
    console.log("selectdata" + JSON.stringify(notedata));

    setnotifyCmode(notemode);
    setIniNotification(true);
    
    if (notemode == "A") {
      setNotInfo({
        RecordID: "",
        NotifyType: "",
        Purpose: "",
        Response: "",
        SortOrder: "",
        Disable: "",
      });
    } else {
      if (fieldvalue == "action") {
        setNotInfo({
          RecordID: notedata.RecordID,
          NotifyType: notedata.NotifyType,
          Purpose: notedata.Purpose,
          Response: notedata.Response,
          SortOrder: notedata.SortOrder,
          Disable: notedata.Disable,
        });
      }
    }
  };
  const cusnoticationvalues = {
    NotifyType: notInfo.NotifyType,
    Purpose: notInfo.Purpose,
    Response: notInfo.Response,
    SortOrder: notInfo.SortOrder,
    checkbox: notInfo.Disable,
  };
  /******************************Notification SAVE FUNCTION********** */
 const fnCnotesave = async (values, resetForm, del) => {
   if (!del) {
     setLoading(true);
   }
    if (del) {
      if (notInfo.RecordID == "") {
        toast.error("please Select Notification");
        setLoading(false);
        return;
      }
    }
  //   if (values.NotifyType == "") {
  //     toast.error("Please Choose Notification type");
  //     return;
  //   }
  //   if (values.Purpose == "") {
  //     toast.error("Please Enter Purpose");
  //     return;
  //  }
   if (values.checkbox == true) {
      values.checkbox = "Y";
    } else {
      values.checkbox = "N";
    }
        const idata = {
          RecordID: notInfo.RecordID,
          CustRecordID: recID,
          UsrRecordID: loginrecid,
          NotificationType: values.NotifyType,
          Purpose: values.Purpose,
          Response: values.Response,
          SortOrder: values.SortOrder,
          Disable: values.checkbox,
          Finyear,
          CompanyID,
        };
    let action =
      notifyCmode === "A" && !del
        ? "insert"
        : notifyCmode === "E" && del
        ? "harddelete"
        : "update";
   // const data = await dispatch(postApidata("TR018", type, saveData));
   const response = await dispatch(
      explorePostData({accessID:"TR018", action, idata })
    );
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      setLoading(false);
      dispatch(
        fetchExplorelitview("TR018", "Customer Notification", recID, "")
      );
      
      resetForm();
      setNotInfo({
        RecordID: "",
        NotifyType: "",
        Purpose: "",
        Response: "",
        SortOrder: "",
        Disable: "",
      });

      fnCustomernot("", "A", "");
      // dispatch(fetchApidata(accessID, "get", recID));
    } else {
      toast.error(response.payload.Msg);
      setLoading(false);
    }
  };
  /**************************Product Screen************** */
  const [supproductdata, setproductdata] = useState({
    RecordID: "",
    AgreedPrice: "",
    OrderQty: "",
    DeliveredQty: "",
    PendingQty: "",
    SortOrder: "",
    Disable: "",
    VariantPercentage: "",
    Diesdescription: "",
  });

  const [boMode, setBomode] = useState("A");
  const [leatherMode, setleatherMode] = useState("A");
  const [custleatherdata, setcustleatherdata] = useState({
    RecordID: "",
    AgreedPrice: "",
    SortOrder: "",
    leatherDescription:""
  });
  const [cusComRecID, setCusComRecID] = useState();
  const [selectclrLookupData, setselectclrLookupData] = React.useState({
    ClrlookupRecordid: "",
    ClrlookupCode: "",
    ClrlookupDesc: "",
  });

  const [LetherProductLookup, setLeatherProductData] = React.useState({
    LPRecordID: "",
    LPName: "",
    LPCode: "",
  });
  /****************** Product values assign a state variale******************** */
  const selectcelldata = (data, bMode, field) => {
    console.log("selectdata" + JSON.stringify(data));

    setBomode(bMode);

    if (bMode == "A") {
      setUploadFile("");
      setproductdata({
        RecordID: "",
        AgreedPrice: "",
        OrderQty: "",
        DeliveredQty: "",
        PendingQty: "",
        SortOrder: "",
        Disable: data.Disable,
        VariantPercentage: "",
        Diesdescription: "",
      });
      setselectCPLookupData({
        CPlookupRecordid: "",
        CPlookupCode: "",
        CPlookupDesc: "",
        CostPrice: "",
      });
      setSelectCostLookupData({
        costLookupRecordid: "",
        costLookupCode: "",
        costLookupDesc: "",
        costLookupCostPrice: "",
      });
      setselectCCLookupData({
        CClookupRecordid: "",
        CClookupCode: "",
        CClookupDesc: "",
      });
      setselectclrLookupData({
        ClrlookupRecordid: "",
        ClrlookupCode: "",
        ClrlookupDesc: "",
      });
      setLeatherProductData({
        LPRecordID: "",
        LPName: "",
        LPCode: "",
      });
    } else {
      if (field == "action") {
        setUploadFile(data.Diesimage);
        setproductdata({
          RecordID: data.RecordID,
          AgreedPrice: data.AgreedPrice,
          OrderQty: data.OrderQty,
          DeliveredQty: data.DeliveredQty,
          PendingQty: data.PendingQty,
          SortOrder: data.SortOrder,
          Disable: data.Disable,
          VariantPercentage: data.VariantPercentage,
          Diesdescription: data.Diesdescription,
        });
        setselectCPLookupData({
          CPlookupRecordid: data.PrdRecordID,
          CPlookupCode: data.ProductCode,
          CPlookupDesc: data.ProductName,
          CostPrice: data.Costprice,
        });
        setselectCCLookupData({
          CClookupRecordid: data.CompanyRecordID,
          CClookupCode: data.CompanyCode,
          CClookupDesc: data.CompanyName,
        });
        setSelectCostLookupData({
          costLookupRecordid: data.CostingID,
          costLookupCode: data.BomCode,
          costLookupDesc: data.BomCode,
          costLookupCostPrice: data.Costprice,
        });
        setCusComRecID(data.RecordID);
      }
    }
  };
  //*******Assign  Product values from Grid table in  Yup initial value******* */
  const productInitialvalues = {
    // AgreedPrice: supproductdata.AgreedPrice,
    AgreedPrice: supproductdata.AgreedPrice
      ? Number(supproductdata.AgreedPrice).toFixed(3)
      : "",
    OrderQty: supproductdata.OrderQty,
    OrderQty: Number(supproductdata.OrderQty).toFixed(0),
    DeliveredQty: supproductdata.DeliveredQty,
    DeliveredQty: Number(supproductdata.DeliveredQty).toFixed(0),
    // DeliveredQty: Number(supproductdata.DeliveredQty).toFixed(3),
    PendingQty: supproductdata.PendingQty,
    SortOrder: supproductdata.SortOrder,
    checkbox: supproductdata.Disable,
    costPrice: costLookupData.costLookupCostPrice,
    variantPercentage: supproductdata.VariantPercentage,
    Diesdescription: supproductdata.Diesdescription,
  };
  /**************Prdouct save Function **********/
  // const formik = useFormik({
  //   initialValues: productInitialvalues,
  //   onSubmit: (values, {resetForm}) => {
  //     setTimeout(() => {
  //       fnproductSave(values, resetForm);
  //       // alert("hai");
  //     }, 100);
  //   },
  //   enableReinitialize:true,
  //   validationSchema:cusproductSchema
  // });
  // formik.values.PendingQty = formik.values.OrderQty - formik.values.DeliveredQty

  // const fnproductSave = async (values, resetForm, del) => {
  //   setIniProduct(false);
  //   setLoading(true);
  //   if (del) {
  //     if (supproductdata.RecordID == "") {
  //       toast.error("Please Select Customer products");
  //       setLoading(false);
  //       return;
  //     }
  //   }

  //   if (selectCPLookupData.CPlookupCode == "") {
  //     toast.error("Please Choose Product Lookup ");
  //     return;
  //   }
  //   if (values.OrderQty == "") {
  //     toast.error("Please Choose Order Quantity ");
  //     return;
  //   }

  //   if (values.checkbox == true) {
  //     values.checkbox = "Y";
  //   } else {
  //     values.checkbox = "N";
  //   }
  //   var document = "";
  //   if (uploadFile == undefined) {
  //     document = "";
  //   } else {
  //     document = uploadFile;
  //   }
  //   // if (values.AgreedPrice == "0.000") {
  //   //   toast.error("Please Fill The Agreed Price");
  //   //   return;
  //   // }
  //   // console.log(values);

  //   const idata = {
  //     RecordID: supproductdata.RecordID,
  //     AgreedPrice: values.AgreedPrice,
  //     OrderQty: "0",
  //     DeliveredQty: "0",
  //     PendingQty: "0",
  //     SortOrder: values.SortOrder,
  //     Disable: values.checkbox,
  //     PrdRecordID: selectCPLookupData.CPlookupRecordid,
  //     CustRecordID: recID,
  //     Diesdescription: values.Diesdescription,
  //     Diesimage: document,
  //     Finyear,
  //     CompanyID,
  //   };

  //   console.log("save" + JSON.stringify(idata));
  //   let action =
  //     boMode === "A" && !del
  //       ? "insert"
  //       : boMode === "E" && del
  //       ? "harddelete"
  //       : "update";
  //   const response = await dispatch(
  //     explorePostData({ accessID: "TR017", action, idata })
  //   );

  //   // const data = await dispatch(postApidata("TR017", type, idata));
  //   if (response.payload.Status == "Y") {
  //     toast.success(response.payload.Msg);
  //     setLoading(false);
  //     dispatch(
  //       fetchExplorelitview("TR017", "Customer Products", productfilter, "")
  //     );
  //     setIniProduct(true);
  //     resetForm();
  //     // setproductdata({RecordID:"",AgreedPrice:"",OrderQty:"",DeliveredQty:"",PendingQty:"",SortOrder:"",Disable:""})
  //     selectcelldata("", "A", "");
  //     dispatch(fetchApidata(accessID, "get", recID));
  //   } else {
  //     toast.error(response.payload.Msg);
  //     setLoading(false);
  //   }
  // };
  const fnproductSave = async (values, resetForm,del) => {
    setLoading(true);
    var document = "";
    if (uploadFile == undefined) {
      document = "";
    } else {
      document = uploadFile;
    }
    if (del) {
      if (supproductdata.RecordID == "") {
        toast.error("Please Select Customer products");
        setLoading(false);
        return;
      }
    }

    if (selectCPLookupData.CPlookupCode == "") {
      toast.error("Please Choose Product Lookup ");
      return;
    }
    if (values.OrderQty == "") {
      toast.error("Please Choose Order Quantity ");
      return;
    }

    if (values.checkbox == true) {
      values.checkbox = "Y";
    } else {
      values.checkbox = "N";
    }
    // if (values.AgreedPrice == "0.000") {
    //   toast.error("Please Fill The Agreed Price");
    //   return;
    // }
    // console.log(values);

    
       const idata = {
          RecordID: supproductdata.RecordID,
          AgreedPrice: values.AgreedPrice,
          OrderQty: "0",
          DeliveredQty: "0",
          PendingQty: "0",
          SortOrder: values.SortOrder,
          Disable: values.checkbox,
          PrdRecordID: selectCPLookupData.CPlookupRecordid || 0,
          CustRecordID: recID,
          MaterialRecordID: "0",
          VariantPercentage: values.AgreedPrice - values.costPrice,
          Costprice: values.costPrice,
          Diesdescription: values.Diesdescription || "",
          Diesimage: document,
          Finyear,
          CompanyID,
          CostingID:costLookupData.costLookupRecordid || 0,
          BomheaderID:costLookupData.costLookupRecordid
    };
    let action =
      boMode === "A" && !del
        ? "insert"
        : boMode === "E" && del
        ? "harddelete"
        : "update";
    const response = await dispatch(
      explorePostData({ accessID: "TR017", action, idata })
    );
    // const data = await dispatch(postApidata("TR017", type, saveData));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      setLoading(false);
      dispatch(
        fetchExplorelitview("TR017", "Customer Products", productfilter, "")
      );
     
      resetForm();
      // setproductdata({RecordID:"",AgreedPrice:"",OrderQty:"",DeliveredQty:"",PendingQty:"",SortOrder:"",Disable:""})
      selectcelldata("", "A", "");
      // dispatch(fetchApidata(accessID, "get", recID));
    } else {
      toast.error(response.payload.Msg);
      setLoading(false);
    }
  };

  const fnCusCompanySave = async (del) => {
    // if (values.checkbox == true) {
    //   values.checkbox = "Y";
    // } else {
    //   values.checkbox = "N";
    // }
    setLoading(true);
    if (del) {
      if (cusComRecID.RecordID == "") {
        toast.error("Please Select Customer company");
        setLoading(false);
        return;
      }
    }

    if (selectCCLookupData.CClookupCode == "") {
      toast.error("Please Choose Company Lookup ");
      return;
    }
    const idata = {
      RecordID: cusComRecID,
      CompanyRecordID: selectCCLookupData.CClookupRecordid,
      CustRecordID: recID,
      Finyear,
      CompanyID,
    };

    console.log("save" + JSON.stringify(idata));
    let action =
      boMode === "A" && !del
        ? "insert"
        : boMode === "E" && del
        ? "harddelete"
        : "update";
    const response = await dispatch(
      explorePostData({ accessID: "TR075", action, idata })
    );
    // const data = await dispatch(postApidata("TR075", type, idata));

    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      setLoading(false);
      dispatch(fetchExplorelitview("TR082", "Customer Company", recID, ""));

      // setproductdata({RecordID:"",AgreedPrice:"",OrderQty:"",DeliveredQty:"",PendingQty:"",SortOrder:"",Disable:""})
      selectcelldata("", "A", "");
      // dispatch(fetchApidata(accessID, "get", recID));
    } else {
      toast.error(response.payload.Msg);
      setLoading(false);
    }
  };
  // const fnCusCompanySave = async (types) => {
  //   var saveData;
  //   var type;
  //   if (types === "harddelete") {
  //     saveData = {
  //       RecordID: cusComRecID,
  //       CompanyRecordID: selectCCLookupData.CClookupRecordid,
  //       CustRecordID: recID,
  //     };
  //     type = "harddelete";
  //   } else {
  //     setLoading(true);
  //     if (boMode == "A") {
  //       saveData = {
  //         RecordID: "",
  //         CompanyRecordID: selectCCLookupData.CClookupRecordid,
  //         CustRecordID: recID,
  //       };
  //       type = "insert";
  //     } else {
  //       saveData = {
  //         RecordID: cusComRecID,
  //         CompanyRecordID: selectCCLookupData.CClookupRecordid,
  //         CustRecordID: recID,
  //       };
  //       type = "update";
  //     }
  //   }
  //   console.log("save" + JSON.stringify(saveData));

  //   const data = await dispatch(postApidata("TR075", type, saveData));
  //   if (data.payload.Status == "Y") {
  //     toast.success(data.payload.Msg);
  //     setLoading(false);
  //     dispatch(fetchExplorelitview("TR082", "Customer Company", recID, ""));

  //     // setproductdata({RecordID:"",AgreedPrice:"",OrderQty:"",DeliveredQty:"",PendingQty:"",SortOrder:"",Disable:""})
  //     selectcelldata("", "A", "");
  //     dispatch(fetchApidata(accessID, "get", recID));
  //   } else {
  //     toast.error(data.payload.Msg);
  //     setLoading(false);
  //   }
  // };

  function handleClick(values) {
    values.PendingQty = Number(values.OrderQty) - Number(values.DeliveredQty);
  }

  //************************** Lookup value assign type based Function *****************/

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
          navigate("/Apps/TR010/Customers");
        }
      } else {
        return;
      }
    });
  };
  // customer leather function

  const selectcellcustleatherdata = (data, bMode, field) => {
    console.log("🚀 ~ selectcellcustleatherdata ~ data:", data)
    // console.log("selectdata" + JSON.stringify(data));

    setleatherMode(bMode);

    if (bMode == "A") {
      setcustleatherdata({
        RecordID: "",
        AgreedPrice: "",
        SortOrder: "",
        leatherDescription:""
      });

      setselectCLLookupData({
        CULCode: "",
        CULDescription: "",
        CULRecordID: "",
      });
      setselectclrLookupData({
        ClrlookupRecordid: "",
        ClrlookupCode: "",
        ClrlookupDesc: "",
      });
      setLeatherProductData({
        LPRecordID: "",
        LPName: "",
        LPCode: "",
      });
      setleather1Lookup({
        leather1RecordID: "",
        leather1Code: "",
        leather1Name: "",
      });
      setleather2Lookup({
        leather2RecordID: "",
        leather2Code: "",
        leather2Name: "",
      });
      setBOMLookup({
        BOMRecordID: "",
        BOMCode: "",
        BOMCount:0
      });
      setCostingLookup({
        costingRecordID: "",
        costingCode: "",
        PrimaryLeahterRecID:"",
        SecondaryLeatherRecID:"",
        TertriayLeatherRecID:"",
        costingPrice:""
      })
    } else {
      if (field == "action") {
        if (show == 4) {
          // dispatch(
          //   customerLeather({
          //     HeaderRecordID: data.BomID,
          //     ProductRecordID: data.ProductID,
          //     CustomerRecordID: recID,
          //   })
          // );
        }
        setcustleatherdata({
          RecordID: data.RecordID,
          AgreedPrice: data.AgreedPrice,
          SortOrder: data.SortOrder,
          leatherDescription:data.LeatherDescription
        });

        setselectCLLookupData({
          CULCode: data.LeatherCode,
          CULDescription: data.LeatherName,
          CULRecordID: data.LeatherRecordID,
        });
        setselectclrLookupData({
          ClrlookupRecordid: data.ColourShadeRecordID,
          ClrlookupCode: data.ColourshadeCode,
          ClrlookupDesc: data.Colourshadedescription,
        });

        setLeatherProductData({
          LPRecordID: data.ProductID,
          LPName: data.ProductName,
          LPCode: data.ProductCode,
        });
        setleather1Lookup({
          leather1RecordID: data.SLeatherRecordID,
          leather1Code: data.SLeatherCode,
          leather1Name: data.SLeatherName,
        });
        setleather2Lookup({
          leather2RecordID: data.TLeatherRecordID,
          leather2Code: data.TLeatherCode,
          leather2Name: data.TLeatherName,
        });
        setBOMLookup({
          BOMRecordID: data.BomID,
          BOMCode: data.BomCode,
          BOMCount:data.LCount
        });
        setCostingLookup({
          costingRecordID:  data.CostingID,
          costingCode:  data.PrimaryType,
          PrimaryLeahterRecID: data.PrimaryLeatherID,
          SecondaryLeatherRecID: data.SecondaryLeatherID,
          TertriayLeatherRecID: data.TeritiaryLeatherID,
          costingPrice:data.CostingPrice 
        })
      }
    }
  };
  const LeatherinitialValue = {
    RecordID: custleatherdata.RecordID,
    AgreedPrice: custleatherdata.AgreedPrice,
    SortOrder: custleatherdata.SortOrder,
    LeatherDescription: custleatherdata.leatherDescription,
    costPrice: costingLookup.costingPrice,
  };

  const fnleatherSave = async (values, resetForm, del) => {
    setLoading(true);
    if (del) {
      if (custleatherdata.RecordID == "") {
        toast.error("Please Select Leather products");
        setLoading(false);
        return;
      }
    }
    if (values.checkbox == true) {
      values.checkbox = "Y";
    } else {
      values.checkbox = "N";
    }

    const idata = {
      RecordID: custleatherdata.RecordID,
      LeatherDescription:values.LeatherDescription ||"",
      CustomerID: recID,
      LeatherID: selectCLLookupData.CULRecordID || 0,
      Agreedprice: values.AgreedPrice,
      SortOrder: values.SortOrder,
      ColourShadeRecordID: selectclrLookupData.ClrlookupRecordid || 0,
      SLeatherRecordID: leather1Lookup.leather1RecordID || 0,
      TLeatherRecordID: leather2Lookup.leather2RecordID || 0,
      BomID: BOMLookup.BOMRecordID,
      LCount: BOMLookup.BOMCount,
      ProductID: LetherProductLookup.LPRecordID,
      Finyear,
      CompanyID,
      CostingID:costingLookup.costingRecordID,
      CostingPrice:costingLookup.costingPrice,
      VariantPercent: (Number(values.AgreedPrice) -Number(values.costPrice)).toFixed(2)
    };

    console.log("save" + JSON.stringify(idata));
    let action =
    leatherMode === "A" && !del
        ? "insert"
        : leatherMode === "E" && del
        ? "harddelete"
        : "update";
    const response = await dispatch(
      explorePostData({ accessID: "TR093", action, idata })
    );
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      setLoading(false);
      dispatch(fetchExplorelitview("TR093", "Leather", recID, ""));

      resetForm();
     
      selectcellcustleatherdata("", "A", "");
    } else {
      toast.error(response.payload.Msg);
      setLoading(false);
    }
  };

  /*****************File upload************ */
  const changeHandler = async (event) => {
    setSelectedFile(event.target.files[0]);

    console.log(event.target.files[0]);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "custimage");

    const fileData = await dispatch(
      fnFileUpload(formData, supproductdata.RecordID, "TR017")
    );

    console.log("fileData" + JSON.stringify(fileData));
    setUploadFile(fileData.payload.apiResponse);
  };

  /****************************View file in newtab******** */

  const fnViewFile = () => {
    var filePath =
      store.getState().globalurl.custprodattachmentUrl + uploadFile;

    if (uploadFile == "") {
      toast.error("Please Upload File");
      return;
    } else {
      window.open(filePath, "_blank");
    }
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
                    setShow(0);
                  }}
                >
                  Customer
                </Typography>
                {show == "1" ? (
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >
                    {" "}
                    Notification
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
                    Products
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
                    Companies
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
                    Leather
                  </Typography>
                ) : (
                  false
                )}
              </Breadcrumbs>
            </Box>
          </Box>

          {/* ICONS */}

          <Box display="flex">
            {mode == "E" ? (
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Explore</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={show}
                  label="Explore"
                  onChange={handleChange}
                >
                  <MenuItem value={0}>Customer</MenuItem>
                  <MenuItem value={1}>Notification</MenuItem>
                  <MenuItem value={2}>Products</MenuItem>
                  <MenuItem value={3}>Companies</MenuItem>
                  <MenuItem value={4}>Leather</MenuItem>
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
            {/* { <Header title="Products" subtitle="" /> } */}

            <Formik
              initialValues={initialValues}
              onSubmit={(values, setSubmitting) => {
                setTimeout(() => {
                  fnSave(values);
                  // alert("hai");
                }, 100);
              }}
              validationSchema={customersSchema}
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
                    {!isNonMobile && (
                      <Stack
                        sx={{
                          //    width: {sm:'100%',md:'100%',lg:'100%'},
                          gridColumn: "span 2",
                          alignContent: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                          right: "0px",
                        }}
                      >
                        <Avatar
                          variant="rounded"
                          src={userimg}
                          sx={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}

                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Code"
                        value={values.Code}
                        id="Code"
                        name="Code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        autoFocus
                        placeholder="Auto"
                        error={!!touched.Code && !!errors.Code}
                        helperText={touched.Code && errors.Code}
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
                        required
                        value={values.Name}
                        id="Name"
                        name="Name"
                        label="Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Name && !!errors.Name}
                        helperText={touched.Name && errors.Name}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        inputProps={{ maxLength: 35 }}
                        onInvalid={(e) => {
                          e.target.setCustomValidity("Please Fill The Name");
                        }}
                        onInput={(e) => {
                          e.target.setCustomValidity("");
                        }}
                      />
                    </FormControl>
                    {isNonMobile && (
                      <Stack
                        sx={{
                          //    width: {sm:'100%',md:'100%',lg:'100%'},
                          gridColumn: "span 2",
                          alignContent: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                          right: "0px",
                        }}
                      >
                        <Avatar
                          variant="rounded"
                          src={userimg}
                          sx={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}

                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        value={values.Address1}
                        id="Address1"
                        name="Address1"
                        label="Address "
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        error={!!touched.Address1 && !!errors.Address1}
                        helperText={touched.Address1 && errors.Address1}
                        multiline
                        inputProps={{ maxLength: 500 }}
                      />
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
                              label="Country Origin"
                              variant="filled"
                              value={selectCOLookupData.OriginCountryCode}
                              inputProps={{ tabIndex: "-1" }}
                              focused
                              required
                            />

                            {/* <MoreHorizIcon onClick={()=>handleShow('CO')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}
                            <IconButton
                              sx={{ height: 40, width: 40 }}
                              onClick={() => handleShow("CO")}
                            >
                              <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                            </IconButton>
                            <TextField
                              id="outlined-basic"
                              label=""
                              variant="filled"
                              value={selectCOLookupData.OriginCountryName}
                              fullWidth
                              inputProps={{ tabIndex: "-1" }}
                              focused
                            />
                          </FormControl>
                        </FormControl>
                      </FormControl>
                      <FormControl
                        focused
                        variant="filled"
                        sx={{ gridColumn: "span 2" }}
                      >
                        <InputLabel id="productType">Type</InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="productType"
                          name="Type"
                          value={values.Type}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        >
                          <MenuItem value="S">by ship</MenuItem>
                          <MenuItem value="A">by Air</MenuItem>
                        </Select>
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
                              label="Country of Destination"
                              variant="filled"
                              value={selectCFLookupData.FinalCountryCode}
                              focused
                              required
                              inputProps={{ tabIndex: "-1" }}
                            />

                            <IconButton
                              sx={{ height: 40, width: 40 }}
                              onClick={() => handleShow("CF")}
                            >
                              <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                            </IconButton>

                            <TextField
                              id="outlined-basic"
                              label=""
                              variant="filled"
                              value={selectCFLookupData.FinalCountryName}
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
                              label="Port of Origin"
                              variant="filled"
                              value={selectPOLookupData.OrginPortCode}
                              focused
                              inputProps={{ tabIndex: "-1" }}
                            />
                            <IconButton
                              sx={{ height: 40, width: 40 }}
                              onClick={() => handleShow("PO")}
                            >
                              <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                            </IconButton>
                            {/* <MoreHorizIcon onClick={()=>handleShow('PO')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                            <TextField
                              id="outlined-basic"
                              label=""
                              variant="filled"
                              value={selectPOLookupData.OrginPortDescription}
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
                              label="Port of Delivery"
                              variant="filled"
                              value={selectPDLookupData.DeliveryPortCode}
                              focused
                              inputProps={{ tabIndex: "-1" }}
                            />

                            {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}
                            <IconButton
                              sx={{ height: 40, width: 40 }}
                              onClick={() => handleShow("PD")}
                            >
                              <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                            </IconButton>
                            <TextField
                              id="outlined-basic"
                              label=""
                              variant="filled"
                              value={selectPDLookupData.DeliveryPortDescription}
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
                              label="Port of Discharge"
                              variant="filled"
                              value={selectDPLookupData.DischargePortCode}
                              focused
                              inputProps={{ tabIndex: "-1" }}
                            />

                            {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' />
                             */}

                            <IconButton
                              sx={{ height: 40, width: 40 }}
                              onClick={() => handleShow("DP")}
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
                              label="Port of Loading"
                              variant="filled"
                              value={selectPLLookupData.LoadingPortCode}
                              focused
                              inputProps={{ tabIndex: "-1" }}
                            />

                            <IconButton
                              sx={{ height: 40, width: 40 }}
                              onClick={() => handleShow("PL")}
                            >
                              <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                            </IconButton>

                            <TextField
                              id="outlined-basic"
                              label=""
                              variant="filled"
                              value={selectPLLookupData.LoadingPortDescription}
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
                              label="Port of Final Destination"
                              variant="filled"
                              value={selectPFLookupData.FinalPortCode}
                              focused
                              inputProps={{ tabIndex: "-1" }}
                            />
                            <IconButton
                              sx={{ height: 40, width: 40 }}
                              onClick={() => handleShow("PF")}
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
                      <TextField
                        fullWidth
                        variant="filled"
                        type="email"
                        label="Email"
                        value={values.Email}
                        id="Email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Email"
                        inputProps={{ maxLength: 50 }}
                        focused
                        onInvalid={(e) => {
                          e.target.setCustomValidity("Please Fill The Email");
                        }}
                        onInput={(e) => {
                          e.target.setCustomValidity("");
                        }}
                      />
                      <TextField
                        name="identityNO"
                        type="number"
                        id="identityNO"
                        label="Identity No"
                        variant="filled"
                        focused
                        value={values.identityNO}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        multiline
                      />
                       <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Notify"
                        value={values.notify}
                        id="notify"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        // value={values.address2}
                        name="notify"
                       
                        sx={{ gridColumn: "span 2" }}
                        focused
                       
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Notify Fax"
                        value={values.notifyFax}
                        id="notifyFax"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        // value={values.address2}
                        name="notifyFax"
                       
                        sx={{ gridColumn: "span 2" }}
                        focused
                       
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Notify Tel"
                        value={values.notifyTel}
                        id="notifyTel"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        // value={values.address2}
                        name="notifyTel"
                       
                        sx={{ gridColumn: "span 2" }}
                        focused
                       
                      />
                      <FormControl sx={{ gap: "20px" }}>
                        <Box>
                          <Field
                            //  size="small"
                            type="checkbox"
                            name="ForiegnAgentFlag"
                            id="ForiegnAgentFlag"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            as={Checkbox}
                            label="Foreign Agent Flag"
                          />

                          <FormLabel focused={false}>
                            Foreign Agent Flag
                          </FormLabel>
                        </Box>

                        <Box>
                          <Field
                            //  size="small"
                            type="checkbox"
                            name="LocalAgentFlag"
                            id="LocalAgentFlag"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            as={Checkbox}
                            label="Local Agent Flag"
                          />

                          <FormLabel focused={false}>
                            Local Agent Flag
                          </FormLabel>
                        </Box>
                        {/* <FormControlLabel control={ <Field type="checkbox" name="Notifycheckbox" id="Notifycheckbox"  label="Disable" />} label="Notify" /> */}
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
                      {/* <FormControlLabel control={ <Field type="checkbox" name="checkbox" id="checkbox"  label="Disable" />} label="Disable" /> */}
                    </FormControl>
                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
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
                          value={selectcurLookupData.CURlookupRecordid}
                          focused
                          sx={{ display: "none" }}
                        />

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
                            onClick={() => handleShow("CUR")}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>
                          {/* <MoreHorizIcon onClick={()=>handleShow('CUR')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                          <TextField
                            id="outlined-basic"
                            // label="Description"
                            variant="filled"
                            value={selectcurLookupData.CURlookupDesc}
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
                        label="Contact"
                        value={values.Contact}
                        id="Contact"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Contact"
                        inputProps={{ maxLength: 50 }}
                        error={!!touched.Contact && !!errors.Contact}
                        helperText={touched.Contact && errors.Contact}
                        focused
                        onInvalid={(e) => {
                          e.target.setCustomValidity("Please Fill The Contact");
                        }}
                        onInput={(e) => {
                          e.target.setCustomValidity("");
                        }}
                      />

<FormControl sx={{ gridColumn: "span 2" }}>
                        <TextField
                          id="outlined-basic"
                          label="ID"
                          variant="filled"
                          value={selectBankLookupData.BankRecordID}
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
                              label="Bank"
                              variant="filled"
                              value={selectBankLookupData.BankCode}
                              focused
                              required
                              inputProps={{ tabIndex: "-1" }}
                            />

                            <IconButton
                              sx={{ height: 40, width: 40 }}
                              onClick={() => handleShow("BANK")}
                            >
                              <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                            </IconButton>

                            <TextField
                              id="outlined-basic"
                              label=""
                              variant="filled"
                              value={selectBankLookupData.BankName}
                              fullWidth
                              focused
                              inputProps={{ tabIndex: "-1" }}
                            />
                          </FormControl>
                        </FormControl>
                      </FormControl>
                      <TextField
                        fullWidth
                        variant="filled"
                        label="Web"
                        type="text"
                        value={values.Web}
                        id="Web"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        // value={values.address2}
                        name="Web"
                        error={!!touched.Web && !!errors.Web}
                        helperText={touched.Web && errors.Web}
                        focused
                        inputProps={{ maxLength: 50 }}
                      />
                      <TextField
                        fullWidth
                        
                        variant="filled"
                        label="Phone"
                        type="text"
                        id="Phone"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.Phone}
                        name="Phone"
                        // error={!!touched.Phone && !!errors.Phone}
                        // helperText={touched.Phone && errors.Phone}
                        focused
                        inputProps={{ maxLength: 20 }}
                        // onInvalid={(e) => {
                        //   e.target.setCustomValidity("Please Fill The Phone");
                        // }}
                      />
                      {/* <TextField
                        fullWidth
                        variant="filled"
                        label="Fax"
                        value={values.Fax}
                        inputProps={{maxLength:11}}
                        id="Fax"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="number"
                        name="Fax"
                        error={!!touched.Fax && !!errors.Fax}
                        helperText={touched.Fax && errors.Fax}
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 11);
                        }}
                        focused
                      /> */}

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Foreign Agent Commision"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{ maxLength: 6 }}
                        name="Fac"
                        error={!!touched.Fac && !!errors.Fac}
                        helperText={touched.Fac && errors.Fac}
                        value={values.Fac}
                        id="Fac"
                        sx={{
                          background: "#fff6c3",
                          input: { textAlign: "right" },
                        }}
                        focused
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Local Agent Commision"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{ maxLength: 6 }}
                        name="Lac"
                        error={!!touched.Lac && !!errors.Lac}
                        helperText={touched.Lac && errors.Lac}
                        value={values.Lac}
                        id="Lac"
                        // sx={{ gridColumn: "span 2" }}
                        focused
                        sx={{
                          background: "#fff6c3",
                          input: { textAlign: "right" },
                        }}
                      />
                      <TextField
                        name="profit"
                        type="number"
                        id="profit"
                        label="Profit"
                        variant="filled"
                        focused
                        value={values.profit}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onWheel={(e) => e.target.blur()} 
                        sx={{
                          background: "#fff6c3",
                          gridColumn: "span 2",
                          input: { textAlign: "right" },
                        }}
                      />
                      <TextField
                        name="Regularnextno"
                        type="number"
                        id="Regularnextno"
                        label="Regular Next Number"
                        variant="filled"
                        focused
                        value={values.Regularnextno}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onWheel={(e) => e.target.blur()} 
                        sx={{
                          background: "#fff6c3",
                          gridColumn: "span 2",
                          input: { textAlign: "right" },
                        }}
                      />
                      <TextField
                        name="Assortednextno"
                        type="number"
                        id="Assortednextno"
                        label="Assorted Next Number"
                        variant="filled"
                        focused
                        value={values.Assortednextno}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onWheel={(e) => e.target.blur()} 
                        sx={{
                          background: "#fff6c3",
                          gridColumn: "span 2",
                          input: { textAlign: "right" },
                        }}
                      />
                      <TextField
                        name="InvTolPercentage"
                        type="number"
                        id="InvTolPercentage "
                        label="Invoice Tolreance Percentage "
                        variant="filled"
                        focused
                        value={values.InvTolPercentage}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onWheel={(e) => e.target.blur()} 
                        sx={{
                          background: "#fff6c3",
                          gridColumn: "span 2",
                          input: { textAlign: "right" },
                        }}
                      />
 <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Sort Order"
                        value={values.SortOrder}
                        id="SortOrder"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        // value={values.address2}
                        name="SortOrder"
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
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 11);
                        }}
                      />
                     
                    </FormControl>
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px" gap={2}>
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
                        navigate(`/Apps/TR010/Customers`);
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
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
                      filterValue={`CountryRecordID =${selectCOLookupData.OCnRecordID} AND Type = '${values.Type}'`}
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
                      filterValue={`CountryRecordID =${selectCOLookupData.OCnRecordID} AND Type = '${values.Type}'`}
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
                      filterValue={`CountryRecordID =${selectCFLookupData.FCnRecordID} AND Type = '${values.Type}'`}
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
                      filterValue={`CountryRecordID =${selectCFLookupData.FCnRecordID} AND Type = '${values.Type}'`}
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
                      filterValue={`CountryRecordID =${selectCFLookupData.FCnRecordID} AND Type = '${values.Type}'`}
                    />
                  </Popup>
                </form>
              )}
            </Formik>

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
              title="Bank"
              openPopup={openBankPopup}
              setOpenPopup={setOpenBankPopup}
            >
              <Listviewpopup
                accessID="2006"
                screenName="Bank"
                childToParent={childToParent}
                filterName={"CompId"}
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
          </Box>
        ) : (
          false
        )}

        {show == "1" ? (
          <Box m="20px" sx={{ m: 2 }}>
            {/* <Header title="Products" subtitle="" /> */}

            <Formik
              // onSubmit={handleFormSubmit}
              initialValues={initialValues}
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
                    {!isNonMobile && (
                      <Stack
                        sx={{
                          //    width: {sm:'100%',md:'100%',lg:'100%'},
                          gridColumn: "span 2",
                          alignContent: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                          right: "0px",
                        }}
                      >
                        <Avatar
                          variant="rounded"
                          src={userimg}
                          sx={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}
                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Code"
                        value={Code}
                        id="Code"
                        name="Code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        // error={!!touched.Code && !!errors.Code}
                        // helperText={touched.Code && errors.Code}
                        inputProps={{ readOnly: true }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        value={Name}
                        id="Name"
                        name="Name"
                        label="Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{ readOnly: true }}
                        // error={!!touched.Name && !!errors.Name}
                        // helperText={touched.Name && errors.Name}
                        sx={{ gridColumn: "span 2" }}
                        focused
                      />
                    </FormControl>

                    {isNonMobile && (
                      <Stack
                        sx={{
                          //    width: {sm:'100%',md:'100%',lg:'100%'},
                          gridColumn: "span 2",
                          alignContent: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                          right: "0px",
                        }}
                      >
                        <Avatar
                          variant="rounded"
                          src={userimg}
                          sx={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}

                    <FormControl sx={{ gridColumn: "span 2" }}>
                      <Box m="5px">
                        <Box
                          m="5px 0 0 0"
                          height="65vh"
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
                            //onCellClick={handleOnCellClick}
                            //onClick={selectrowdata(params,'E')}
                            onStateChange={(stateParams) =>
                              setRowCount(stateParams.pagination.rowCount)
                            }
                            onCellClick={(params) => {
                              const currentcelldata = params.row;
                              const currentcellField = params.field;
                              fnCustomernot(
                                currentcelldata,
                                "E",
                                currentcellField
                              );
                              console.log(
                                "fnCustomernot" +
                                  JSON.stringify(currentcellField)
                              );
                            }}
                            components={{
                              Toolbar: CustomToolbar,
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
                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <Formik
                        innerRef={ref}
                        initialValues={cusnoticationvalues}
                        onSubmit={(values, { resetForm }) => {
                          setTimeout(() => {
                            fnCnotesave(values, resetForm,false);
                            // alert("hai");
                          }, 100);
                        }}
                        validationSchema={cusnotifySchema}
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
                              {/* <TextField id="outlined-basic" label="ID" 
            variant="filled" 
            // value={selectmaterialLookupData.MlookupRecordid}   
            focused   sx={{display:'none'}}/>  */}
                              <FormControl>
                                <FormLabel sx={{ marginTop: "45px" }}>
                                  Notification Type:
                                </FormLabel>
                                <Field
                                  as="select"
                                  label="Type"
                                  onChange={handleChange}
                                  value={values.NotifyType}
                                  id="NotifyType"
                                  name="NotifyType"
                                  focused
                                  style={style}
                                >
                                  <option>Select</option>
                                  <option value="W">Whats App</option>
                                  <option value="T">SMS Text</option>
                                  <option value="E">EMAIL</option>
                                  <option value="F">FAX</option>
                                  <option value="P">Phone</option>
                                </Field>
                              </FormControl>
                              <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Purpose"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Purpose}
                                id="Purpose"
                                name="Purpose"
                                required
                                focused
                                error={!!touched.Purpose && !!errors.Purpose}
                                helperText={touched.Purpose && errors.Purpose}
                                inputProps={{ maxLength: 250 }}
                                onInvalid={(e) => {
                                  e.target.setCustomValidity(
                                    "Please Fill The Purpose"
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
                                label="Response"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Response}
                                id="Response"
                                name="Response"
                                focused
                                required
                                error={!!touched.Response && !!errors.Response}
                                helperText={touched.Response && errors.Response}
                                inputProps={{ maxLength: 250 }}
                                onInvalid={(e) => {
                                  e.target.setCustomValidity(
                                    "Please Fill The Response"
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
                                label="Sort Order"
                                value={values.SortOrder}
                                id="SortOrder"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                // value={values.address2}
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

                              {/* <FormControlLabel control={ <Field type="checkbox" name="checkbox" id="checkbox"  label="Disable" />} label="Disable" /> */}
                            </FormControl>

                            {/* </Box> */}
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
                                        fnCnotesave(values, resetForm, true);
                                        
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
                                  setShow(0);
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

        {show == "2" ? (
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
                    {!isNonMobile && (
                      <Stack
                        sx={{
                          //    width: {sm:'100%',md:'100%',lg:'100%'},
                          gridColumn: "span 2",
                          alignContent: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                          right: "0px",
                        }}
                      >
                        <Avatar
                          variant="rounded"
                          src={userimg}
                          sx={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}
                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Code"
                        value={values.Code}
                        id="Code"
                        name="Code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        error={!!touched.Code && !!errors.Code}
                        helperText={touched.Code && errors.Code}
                        inputProps={{ readOnly: true }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        value={values.Name}
                        id="Name"
                        name="Name"
                        label="Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{ readOnly: true }}
                        error={!!touched.Name && !!errors.Name}
                        helperText={touched.Name && errors.Name}
                        sx={{ gridColumn: "span 2" }}
                        focused
                      />
                    </FormControl>

                    {isNonMobile && (
                      <Stack
                        sx={{
                          //    width: {sm:'100%',md:'100%',lg:'100%'},
                          gridColumn: "span 2",
                          alignContent: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                          right: "0px",
                        }}
                      >
                        <Avatar
                          variant="rounded"
                          src={userimg}
                          sx={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}

                    <FormControl sx={{ gridColumn: "span 2" }}>
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
                              const currentcell = params.row;
                              const currentcellField = params.field;
                              selectcelldata(
                                currentcell,
                                "E",
                                currentcellField
                              );
                              console.log(
                                "Product selectData" +
                                  JSON.stringify(currentcell)
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
                      {/* <Footer/> initialValues={productInitialvalues} */}
                    </FormControl>
                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <Formik
                        innerRef={ref}
                        initialValues={productInitialvalues}
                        onSubmit={(values, { resetForm }) => {
                          setTimeout(() => {
                            fnproductSave(values, resetForm,false);
                            // alert("hai");
                          }, 100);
                        }}
                        validationSchema={cusproductSchema}
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
                          <form
                            onSubmit={handleSubmit}
                            onChange={handleClick(values)}
                          >
                            <FormControl
                              sx={{ gridColumn: "span 2", gap: "40px" }}
                              style={{ width: "100%" }}
                            >
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
                                  value={selectCPLookupData.CPlookupRecordid}
                                  focused
                                  sx={{ display: "none" }}
                                />
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
                                    label="Product Id"
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
                                  {/* <MoreHorizIcon onClick={()=>handleShow('CP')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                                  <TextField
                                    id="psDesc"
                                    // label="Description"
                                    variant="filled"
                                    value={selectCPLookupData.CPlookupDesc}
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
                                  id="psID"
                                  label="ID"
                                  variant="filled"
                                  value={selectCPLookupData.CPlookupRecordid}
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
                                    id="costingCode"
                                    label="BOM"
                                    variant="filled"
                                    value={costLookupData.costLookupCode}
                                    focused
                                    
                                    inputProps={{ tabIndex: "-1" }}
                                    fullWidth
                                  />
                                  <IconButton
                                    sx={{ height: 40, width: 40 }}
                                    onClick={() => handleShow("COST")}
                                  >
                                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                  </IconButton>
                                </FormControl>
                              </FormControl>
                            
                              {/* {boMode == "E" ? (
                                <> */}
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Description"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.Diesdescription}
                                    id="Diesdescription"
                                    name="Diesdescription"
                                    focused
                                    error={
                                      !!touched.Diesdesc && !!errors.Diesdesc
                                    }
                                    helperText={
                                      touched.Diesdesc && errors.Diesdesc
                                    }

                                    // inputProps={{ readOnly: true }}
                                  />
                                {/* </>
                              ) : (
                                false
                              )} */}
                              <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                required
                                label="Agreed Price"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.AgreedPrice}
                                id="AgreedPrice"
                                name="AgreedPrice"
                                focused
                                error={
                                  !!touched.AgreedPrice && !!errors.AgreedPrice
                                }
                                helperText={
                                  touched.AgreedPrice && errors.AgreedPrice
                                }
                                sx={{
                                  background: "#fff6c3",
                                  input: { textAlign: "right" },
                                }}
                                onInvalid={(e) => {
                                  e.target.setCustomValidity(
                                    "Please Fill The Agreed Price"
                                  );
                                }}
                                onWheel={(e) => e.target.blur()} 
                                onInput={(e) => {
                                  e.target.setCustomValidity("");
                                }}
                              />
                              
                              <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label=" Price"
                                id="costPrice"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="costPrice"
                                value={Number(values.costPrice)}
                                sx={{
                                  gridColumn: "span 2",
                                  background: "#fff6c3",
                                  input: { textAlign: "right" },
                                }}
                                InputProps={{
                                  readOnly: true,
                                }}
                                focused
                                //  inputProps={{ readOnly: true }}
                              />
                              <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label=" Variant Percentage"
                                id="variantPercentage"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="variantPercentage"
                                value={
                                  Number(values.AgreedPrice) -
                                  Number(values.costPrice)
                                }
                                sx={{ gridColumn: "span 2" }}
                                focused
                                onWheel={(e) => e.target.blur()} 
                                InputProps={{
                                  readOnly: true,
                                  inputProps: {
                                    style: {
                                      textAlign: "right",
                                      background: "#fff6c3",
                                    },
                                  },
                                }}
                              />

                             
                              <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Sort Order"
                                value={values.SortOrder}
                                id="SortOrder"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                // value={values.address2}
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
                                onInput={(e) => {
                                  e.target.value = Math.max(
                                    0,
                                    parseInt(e.target.value)
                                  )
                                    .toString()
                                    .slice(0, 11);
                                }}
                              />
                              {boMode == "E" ? (
                                <FormControl
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Box>
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
                                      <CloudCircleIcon
                                        fontSize="large"
                                        color="primary"
                                      />
                                    </IconButton>
                                    <Button
                                      variant="contained"
                                      component={"a"}
                                      onClick={() => {
                                        fnViewFile();
                                      }}
                                    >
                                      View
                                    </Button>
                                  </Box>
                                </FormControl>
                              ) : (
                                false
                              )}

                              {/* <FormControlLabel control={ <Field type="checkbox" name="checkbox" id="checkbox"  label="Disable" />} label="Disable" /> */}
                            </FormControl>

                            {/* </Box> */}
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
                                        fnCnotesave(values, resetForm, true);
                                        
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
                                  setShow(0);
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

                  {/* <Box display="flex" justifyContent="end" mt="20px" gap={2}>
        <Button  color="secondary" variant="contained"  onClick={() => {fnSave(values)}}>
          Save
        </Button>
        <Button  color="error" variant="contained" onClick={() => { navigate(`/Apps/TR001/Product Master`)  }}>
          Cancel
        </Button>
      </Box> */}
                  <Popup
                    title="Customer Product"
                    openPopup={openCPpopup}
                    setOpenPopup={setOpenCPpopup}
                  >
                    <Listviewpopup
                      accessID="2002"
                      screenName="Customer Product"
                      childToParent={childToParent}
                    />
                  </Popup>

                  <Popup
                    title="Product Costing"
                    openPopup={OpenCostPopup}
                    setOpenPopup={setOpenCostPopup}
                  >
                    <Listviewpopup
                      accessID="2066"
                      screenName="Product Costing"
                      childToParent={childToParent}
                      filterName={'parentID'}
                      filterValue={selectCPLookupData.CPlookupRecordid}
                    />
                  </Popup>

                  <Popup
                    title="Primary Leather"
                    openPopup={openCLpopup}
                    setOpenPopup={setOpenCLpopup}
                  >
                    <Listviewpopup
                      accessID="2034"
                      screenName="Primary Leather"
                      childToParent={childToParent}
                      filterName="Type"
                      filterValue={"L"}
                    />
                  </Popup>
                </Box>
              )}
            </Formik>
          </Box>
        ) : (
          false
        )}
        {show == "3" ? (
          <Box m="20px" sx={{ m: 2 }}>
            {/* <Header title="Products" subtitle="" /> */}

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
                    {!isNonMobile && (
                      <Stack
                        sx={{
                          //    width: {sm:'100%',md:'100%',lg:'100%'},
                          gridColumn: "span 2",
                          alignContent: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                          right: "0px",
                        }}
                      >
                        <Avatar
                          variant="rounded"
                          src={userimg}
                          sx={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}
                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Code"
                        value={values.Code}
                        id="Code"
                        name="Code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        error={!!touched.Code && !!errors.Code}
                        helperText={touched.Code && errors.Code}
                        inputProps={{ readOnly: true }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        value={values.Name}
                        id="Name"
                        name="Name"
                        label="Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{ readOnly: true }}
                        error={!!touched.Name && !!errors.Name}
                        helperText={touched.Name && errors.Name}
                        sx={{ gridColumn: "span 2" }}
                        focused
                      />
                    </FormControl>

                    {isNonMobile && (
                      <Stack
                        sx={{
                          //    width: {sm:'100%',md:'100%',lg:'100%'},
                          gridColumn: "span 2",
                          alignContent: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                          right: "0px",
                        }}
                      >
                        <Avatar
                          variant="rounded"
                          src={userimg}
                          sx={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}

                    <FormControl sx={{ gridColumn: "span 2" }}>
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
                              const currentcell = params.row;
                              const currentcellField = params.field;
                              selectcelldata(
                                currentcell,
                                "E",
                                currentcellField
                              );
                              console.log(
                                "Product selectData" +
                                  JSON.stringify(currentcell)
                              );
                            }}
                            components={{
                              Toolbar: CustombarCompany,
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
                      {/* <Footer/> initialValues={productInitialvalues} */}
                    </FormControl>
                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <Formik
                        innerRef={ref}
                        initialValues={productcompnyInitialValue}
                        onSubmit={(values, { resetForm }) => {
                          setTimeout(() => {
                            fnCusCompanySave(false);
                            // alert("hai");
                          }, 100);
                        }}
                        // validationSchema={cusproductSchema}
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
                                id="psID"
                                label="ID"
                                variant="filled"
                                value={selectCCLookupData.CClookupRecordid}
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
                                    label="Company"
                                    variant="filled"
                                    value={selectCCLookupData.CClookupCode}
                                    focused
                                    required
                                    inputProps={{ tabIndex: "-1" }}
                                  />
                                  <IconButton
                                    sx={{ height: 40, width: 40 }}
                                    onClick={() => handleShow("CC")}
                                  >
                                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                  </IconButton>
                                  {/* <MoreHorizIcon onClick={()=>handleShow('CP')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                                  <TextField
                                    id="psDesc"
                                    // label="Description"
                                    variant="filled"
                                    value={selectCCLookupData.CClookupDesc}
                                    fullWidth
                                    inputProps={{ tabIndex: "-1" }}
                                    focused
                                  />
                                </FormControl>
                              </FormControl>

                              {/* <FormControlLabel control={ <Field type="checkbox" name="checkbox" id="checkbox"  label="Disable" />} label="Disable" /> */}
                            </FormControl>

                            {/* </Box> */}
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
                                        fnCnotesave(values, resetForm, true);
                                        
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
                                  setShow(0);
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
                    title="Customer Company"
                    openPopup={openCCpopup}
                    setOpenPopup={setOpenCCpopup}
                  >
                    <Listviewpopup
                      accessID="2030"
                      screenName="Customer Company"
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
                    {!isNonMobile && (
                      <Stack
                        sx={{
                          //    width: {sm:'100%',md:'100%',lg:'100%'},
                          gridColumn: "span 2",
                          alignContent: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                          right: "0px",
                        }}
                      >
                        <Avatar
                          variant="rounded"
                          src={userimg}
                          sx={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}
                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Code"
                        value={values.Code}
                        id="Code"
                        name="Code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        error={!!touched.Code && !!errors.Code}
                        helperText={touched.Code && errors.Code}
                        inputProps={{ readOnly: true }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        value={values.Name}
                        id="Name"
                        name="Name"
                        label="Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{ readOnly: true }}
                        error={!!touched.Name && !!errors.Name}
                        helperText={touched.Name && errors.Name}
                        sx={{ gridColumn: "span 2" }}
                        focused
                      />
                    </FormControl>

                    {isNonMobile && (
                      <Stack
                        sx={{
                          //    width: {sm:'100%',md:'100%',lg:'100%'},
                          gridColumn: "span 2",
                          alignContent: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                          right: "0px",
                        }}
                      >
                        <Avatar
                          variant="rounded"
                          src={userimg}
                          sx={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}
                    <FormControl sx={{ gridColumn: "span 2" }}>
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
                              const currentcell = params.row;
                              const currentcellField = params.field;
                              selectcellcustleatherdata(
                                currentcell,
                                "E",
                                currentcellField
                              );
                              console.log(
                                "Product selectData" +
                                  JSON.stringify(currentcell)
                              );
                            }}
                            components={{
                              Toolbar: CustomToolbarLeather,
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
                      {/* <Footer/> initialValues={productInitialvalues} */}
                    </FormControl>
                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <Formik
                        innerRef={ref}
                        initialValues={LeatherinitialValue}
                        onSubmit={(values, { resetForm }) => {
                          setTimeout(() => {
                            fnleatherSave(values, resetForm,false);
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
                        }) => (
                          <form
                            onSubmit={handleSubmit}
                            onChange={handleClick(values)}
                          >
                            <FormControl
                              sx={{ gridColumn: "span 2", gap: "40px" }}
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
                                    marginTop: "50px",
                                  }}
                                >
                                  <TextField
                                    id="psCode"
                                    label="Product"
                                    variant="filled"
                                    value={LetherProductLookup.LPCode}
                                    focused
                                    required
                                    inputProps={{ tabIndex: "-1" }}
                                  />
                                  <IconButton
                                    sx={{ height: 40, width: 40 }}
                                    onClick={() => handleShow("PRD")}
                                  >
                                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                  </IconButton>
                                  <TextField
                                    id="psDesc"
                                    // label="Description"
                                    variant="filled"
                                    value={LetherProductLookup.LPName}
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
                                  id="psID"
                                  label="ID"
                                  variant="filled"
                                  value={BOMLookup.BOMRecordID}
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
                                    id="psCode"
                                    label="BOM"
                                    variant="filled"
                                    value={BOMLookup.BOMCode}
                                    focused
                                    required
                                    inputProps={{ tabIndex: "-1" }}
                                    fullWidth
                                  />
                                  <IconButton
                                    sx={{ height: 40, width: 40 }}
                                    onClick={() => handleShow("BOM")}
                                  >
                                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                  </IconButton>
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
                                    label="Costing"
                                    variant="filled"
                                    value={costingLookup.costingCode}
                                    focused
                                    required
                                    inputProps={{ tabIndex: "-1" }}
                                    fullWidth
                                  />
                                  <IconButton
                                    sx={{ height: 40, width: 40 }}
                                    onClick={() => handleShow("COST")}
                                  >
                                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                  </IconButton>
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
                                
                                
                              
                                {BOMLookup.BOMCount == "1" ||
                    BOMLookup.BOMCount == "2" ||
                    BOMLookup.BOMCount == "3" ? (
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
                        variant="filled"
                        value={selectCLLookupData.CULCode}
                        focused
                        inputProps={{ tabIndex: "-1" }}
                      />
                      <IconButton
                        sx={{ height: 40, width: 40 }}
                        onClick={() => handleShow("CL")}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>
                    </Box>
                    ) : (
                      false
                    )}
                    {BOMLookup.BOMCount == "2" || BOMLookup.BOMCount == "3" ? (
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
                                    label="Secondary Leather"
                                    variant="filled"
                                    focused
                                    inputProps={{ tabIndex: "-1" }}
                                    value={leather1Lookup.leather1Code}
                                  />
                                  <IconButton
                                    onClick={() => handleShow("LEATHER1")}
                                    sx={{ height: 40, width: 40 }}
                                  >
                                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                  </IconButton>
                                </Box>
                    ) : (
                      false
                    )}
                    {BOMLookup.BOMCount == "3" ? (
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
                        label="Secondary Leather"
                        variant="filled"
                        focused
                        inputProps={{ tabIndex: "-1" }}
                        value={leather2Lookup.leather2Code }
                      />
                      <IconButton
                        onClick={() => handleShow("LEATHER2")}
                        sx={{ height: 40, width: 40 }}
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
                                    type="text"
                                    label="Description"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.LeatherDescription}
                                    id="LeatherDescription"
                                    name="LeatherDescription"
                                    focused
                                  />

                              <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Agreed Price"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.AgreedPrice}
                                id="AgreedPrice"
                                name="AgreedPrice"
                                focused
                                onWheel={(e) => e.target.blur()} 
                                sx={{
                                  background: "#fff6c3",
                                  input: { textAlign: "right" },
                                }}
                              />
                              <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label=" Price"
                                id="costPrice"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="costPrice"
                                value={values.costPrice}
                                sx={{
                                  gridColumn: "span 2",
                                  background: "#fff6c3",
                                  input: { textAlign: "right" },
                                }}
                                InputProps={{
                                  readOnly: true,
                                }}
                                focused
                                //  inputProps={{ readOnly: true }}
                              />
                              <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label=" Variant Percentage"
                                id="variantPercentage"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="variantPercentage"
                                value={
                                  (Number(values.AgreedPrice) -Number(values.costPrice)).toFixed(2)
                                }
                                sx={{ gridColumn: "span 2" }}
                                focused
                                onWheel={(e) => e.target.blur()} 
                                InputProps={{
                                  readOnly: true,
                                  inputProps: {
                                    style: {
                                      textAlign: "right",
                                      background: "#fff6c3",
                                    },
                                  },
                                }}
                              />
                              <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Sort Order"
                                value={values.SortOrder}
                                id="SortOrder"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="SortOrder"
                                sx={{
                                  background: "#fff6c3",
                                  input: { textAlign: "right" },
                                }}
                                focused
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
                            </FormControl>

                            {/* </Box> */}
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
                                        fnleatherSave(values, resetForm, true);
                                        
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
                                  setShow(0);
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
                    title="Leather"
                    openPopup={OpenLPrdPopup}
                    setOpenPopup={setOpenLPrdPopup}
                  >
                    <Listviewpopup
                      accessID="2027"
                      screenName="Leather"
                      childToParent={childToParent}
                      filterName={"parentID"}
                      filterValue={recID}
                    />
                  </Popup>
                  <Popup
                    title="Costing"
                    openPopup={openCostingPopup}
                    setOpenPopup={setOpenCostingPopup}
                  >
                    <Listviewpopup
                      accessID="2058"
                      screenName="Costing"
                      childToParent={childToParent}
                      filterName={"parentID"}
                      filterValue={BOMLookup.BOMRecordID}
                    />
                  </Popup>
                  <Popup
                    title="Primary Leather"
                    openPopup={openCLpopup}
                    setOpenPopup={setOpenCLpopup}
                  >
                    <Listviewpopup
                      accessID="2034"
                      screenName="Primary Leather"
                      childToParent={childToParent}
                      filterName={"parentID"}
                      filterValue={costingLookup.PrimaryLeahterRecID}
                    />
                  </Popup>
                  <Popup
                    title="Secondary Leather"
                    openPopup={openleather1Popup}
                    setOpenPopup={setOpenleather1Popup}
                  >
                    <Listviewpopup
                      accessID="2034"
                      screenName="Secondary Leather"
                      childToParent={childToParent}
                      filterName={"parentID"}
                      filterValue={costingLookup.SecondaryLeatherRecID}
                    />
                  </Popup>
                  <Popup
                    title="Tertiary Leather"
                    openPopup={openleather2Popup}
                    setOpenPopup={setOpenleather2Popup}
                  >
                    <Listviewpopup
                      accessID="2034"
                      screenName="Tertiary Leather"
                      childToParent={childToParent}
                      filterName={"parentID"}
                      filterValue={costingLookup.TertriayLeatherRecID}
                    />
                  </Popup>
                  <Popup
                    title="BOM"
                    openPopup={openBOMPopup}
                    setOpenPopup={setOpenBOMPopup}
                  >
                    <Listviewpopup
                      accessID="2019"
                      screenName="BOM"
                      childToParent={childToParent}
                      filterValue={LetherProductLookup.LPRecordID}
                      filterName="parentID"
                    />
                  </Popup>
                  <Popup
                    title="Color"
                    openPopup={OpenCLRPopup}
                    setOpenPopup={setOpenCLRPopup}
                  >
                    <Listviewpopup
                      accessID="2044"
                      screenName="Color"
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

export default Editcustomermaster;
