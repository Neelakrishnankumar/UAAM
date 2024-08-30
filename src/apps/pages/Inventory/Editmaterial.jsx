import React, { useState, useEffect, useRef } from "react";

import {
  useTheme,
  Select,
  InputLabel,
  MenuItem,
  Box,
  Button,
  TextField,
  Stack,
  IconButton,
  Avatar,
  FormLabel,
  FormControl,
  Typography,
  Checkbox,
  Tooltip,
  Breadcrumbs,
  Chip,
  Skeleton,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Formik, Field } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  fetchApidata,
  postApidata,
  postApidatawol,
  stockApidata,
  TrackingFetchfn,
  explorePostData,
  uomMaterialRate,
  procurementTrackingGet,
  getFetchData,
  postData,
  materialDcTrckData,
} from "../../../store/reducers/Formapireducer";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import basicSchema from "../../Security/validation";
import { materialSchema, matsupplierSchema } from "../../Security/validation";
import store from "../../../index";
import Listviewpopup from "../Lookup";
import Popup from "../popup";
import { tokens } from "../../../Theme";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MaterialBarChart from "./materialTrackingChart";
import MaterialLineChart from "./MaterialLineChart";
// ***********************************************
//  Developer:Priya
// Purpose:To Create Material based on material type

// ***********************************************
const Editmatrial = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [show, setScreen] = React.useState("0");
  const [pageSize, setPageSize] = React.useState(10);
  const location = useLocation();

  var yearData = sessionStorage.getItem("year");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");

  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  var parentID = params.filtertype;
  var headerid = params.headerid;
  var Descriptionval = params.Desc;
  var searchPharse = params.searchPharse;

  const Data = useSelector((state) => state.formApi.Data);
  const uomData = useSelector((state) => state.formApi.conversionData);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.loading);
  const isPostLoading = useSelector((state) => state.formApi.postLoading);
  const procurementData = useSelector(
    (state) => state.formApi.materialTrackingData
  );
  const procurementLoading = useSelector(
    (state) => state.formApi.trackingLoading
  );
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const exploreLoading = useSelector((state) => state.exploreApi.loading);
  const trackingRowData = useSelector(
    (state) => state.formApi.matrialDcTrackData
  );
  sessionStorage.setItem("recID", recID);
  sessionStorage.setItem("parentID", parentID);
  const [openSMPopup, setOpenSMPopup] = useState(false);
  const [openPURPopup, setOpenPURPopup] = useState(false);
  const [openCONPopup, setOpenCONPopup] = useState(false);
  const [openCOLPopup, setOpenCOLPopup] = useState(false);
  const [openSUPPopup, setOpenSUPPopup] = useState(false);
  const [openGRDPopup, setOpenGRDPopup] = useState(false);
  const [openSUBPopup, setOpenSUBPopup] = useState(false);
  const [openITUPopup, setOpenITUPopup] = useState(false);
  const [openPROPopup, setOpenPROPopup] = useState(false);
  const [openHSNPopup, setOpenHSNPopup] = useState(false);
  const [openCusPopup, setOpenCusPopup] = useState(false);
  const [openProPopup, setOpenProPopup] = useState(false);
  const [openCSPopup, setOpenCSPopup] = useState(false);
  const [openLOCATIONPopup, setOpenLOCATIONPopup] = useState(false);
  const [openBINPopup, setOpenBINPopup] = useState(false);
  const [openSHELVESPopup, setOpenSHELVESPopup] = useState(false);
  const [openMATERIALPopup, setOpenMATERIALPopup] = useState(false);
  const [openCustomerPopup, setOpenCustomerPopup] = useState(false);
  // ************Lookup Function***************
  function handleShow(type) {
    if (type == "CUSTOMER") {
      setOpenCustomerPopup(true);
    }
    if (type == "SM") {
      setOpenSMPopup(true);
    }
    if (type == "PUR") {
      setOpenPURPopup(true);
    }
    if (type == "CON") {
      setOpenCONPopup(true);
    }
    if (type == "COL") {
      setOpenCOLPopup(true);
    }
    if (type == "CS") {
      setOpenCSPopup(true);
    }
    if (type == "SUP") {
      setOpenSUPPopup(true);
    }
    if (type == "GRD") {
      setOpenGRDPopup(true);
    }
    if (type == "SUB") {
      setOpenSUBPopup(true);
    }
    if (type == "ITU") {
      setOpenITUPopup(true);
    }
    if (type == "PRO") {
      setOpenPROPopup(true);
    }
    if (type == "HSN") {
      setOpenHSNPopup(true);
    }
    if (type == "CUS") {
      setOpenCusPopup(true);
    }
    if (type == "LOCATION") {
      setOpenLOCATIONPopup(true);
    }
    if (type == "BIN") {
      setOpenBINPopup(true);
    }
    if (type == "SHELVES") {
      setOpenSHELVESPopup(true);
    }
    if (type == "MATERIAL") {
      setOpenMATERIALPopup(true);
    }
    if (type == "PROD") {
      if (customerLookup.cusRecordID == "") {
        toast.error("Please select customer Lookup");
      } else setOpenProPopup(true);
    }
  }

  const { toggleSidebar, broken, rtl } = useProSidebar();
  useEffect(() => {
    if (mode == "A") {
      if (parentID == "L") {
        dispatch(
          getFetchData({ accessID: "TR089", get: "get", recID: headerid })
        );
      } else dispatch(getFetchData({ accessID, get: "get", recID }));
    } else {
      dispatch(getFetchData({ accessID, get: "get", recID }));
    }
  }, [location.key]);
  const [ini, setIni] = useState(true);
  const [iniSupplier, setIniSupplier] = useState(true);
  const [loading, setLoading] = useState(false);
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

  //*******Assign Material values from Database in  Yup initial value******* */
  const initialValues = {
    MaterialCode: Data.MaterialCode,
    MaterialDescription: Data.MaterialDescription,
    FamilyName:Data.Familyname,
    MgrID: Data.MgrID,
    PUomRecordID: Data.PUomRecordID,
    CUomRecordID: Data.CUomRecordID,
    CoRecordID: Data.CoRecordID,
    Length: Data.Length ? Number(Data.Length).toFixed(2) : "",
    Width: Data.Width ? Number(Data.Width).toFixed(2) : "",
    height: Number(Data.Height),
    Limit: Number(Data.Limit).toFixed(2),
    minimumquantity: Number(Data.MinimumQuantity).toFixed(2),
    Wastage: Data.Wastage,
    ImageName: Data.ImageName,
    Type: Data.Type,
    Rawmaterial: Data.Rawmaterial == "Y" ? true : false,
    Consumable: Data.Consumable == "Y" ? true : false,
    Sellable: Data.Sellable == "Y" ? true : false,
    SortOrder: Data.SortOrder,
    checkbox: Data.DISABLE == "Y" ? true : false,
    Identflag: Data.Identflag == "Y" ? true : false,
    ColorVariant: Data.Colourvarient == "Y" ? true : false,
    ByProduct:Data.Byproduct == "Y" ? true : false,
    FixRate: Data.FixRate ? Number(Data.FixRate).toFixed(2) : "",
    RequiredQuantity: Data.RequiredQuantity,
    AvailableStock: Data.AvailableStock,
    DesignApp: Data.DesignApp == "Y" ? true : false,
    ReservedQuantity: Data.ReservedQuantity,
    nextIndentNO: Data.Nextno,
    LateRate: Data.LateRate,
    fluxuation: Data.Fluxuation,
    StockCareBy:  mode == "A" ? "D" :Data.StockCareBy,
    reorderlevel:Number(Data.ReOrderLevel) ,
    uomConversionType: mode == "A" ? "A" : Data.UOMConversionType,
    color: Data.LeatherColor,
  };

  var materialWarning;
  if (Number(Data.Weightedaveragepercentage) + Number(Data.Fluxuation) > 0) {
    materialWarning = "success";
  } else {
    materialWarning = "warning";
  }
  const [openPopup, setOpenPopup] = useState(false);
  /********************************Look up****************** */
  const [isPopupData, setisPopupdata] = React.useState(false);

  const [selectmatLookupData, setselectmatLookupData] = React.useState({
    MATlookupRecordid: "",
    MATlookupCode: "",
    MATlookupDesc: "",
  });
  const [selectpurLookupData, setselectpurLookupData] = React.useState({
    PURlookupRecordid: "",
    PURlookupCode: "",
    PURlookupDesc: "",
  });
  const [selectconLookupData, setselectconLookupData] = React.useState({
    CONlookupRecordid: "",
    CONlookupCode: "",
    CONlookupDesc: "",
  });
  const [selectcolLookupData, setselectcolLookupData] = React.useState({
    COLlookupRecordid: "",
    COLlookupCode: "",
    COLlookupDesc: "",
  });
  const [selectCSLookupData, setselectCSLookupData] = React.useState({
    CSlookupRecordid: "",
    CSlookupCode: "",
    CSlookupDesc: "",
  });
  const [selectsupLookupData, setselectsupLookupData] = React.useState({
    SUPlookupRecordid: "",
    SUPlookupCode: "",
    SUPlookupDesc: "",
  });
  const [selectgrdLookupData, setselectgrdLookupData] = React.useState({
    GRDlookupRecordid: "",
    GRDlookupCode: "",
    GRDlookupDesc: "",
  });
  const [selectsubLookupData, setselectsubLookupData] = React.useState({
    SUBlookupRecordid: "",
    SUBlookupCode: "",
    SUBlookupDesc: "",
  });
  const [selecthsnLookupData, setselecthsnLookupData] = React.useState({
    HSNlookupRecordid: "",
    HSNlookupCode: "",
    HSNlookupDesc: "",
    HSNlookupIgst: "",
    HSNlookupSgst: "",
    HSNlookupCsgt: "",
  });

  // Inventory
  const [selectITULookupData, setselectITULookupData] = React.useState({
    ITUlookupRecordid: "",
    ITUlookupCode: "",
    ITUlookupDesc: "",
  });
  const [selectPROLookupData, setselectPROLookupData] = React.useState({
    PROlookupRecordid: "",
    PROlookupCode: "",
    PROlookupDesc: "",
  });
  //Bins & Location

  const [selectLOCATIONLookupData, setselectLOCATIONLookupData] =
    React.useState({
      LOCATIONlookupRecordid: "",
      LOCATIONlookupCode: "",
      LOCATIONlookupDesc: "",
    });
  const [selectBINLookupData, setselectBINLookupData] = React.useState({
    BINlookupRecordid: "",
    BINlookupCode: "",
    BINlookupDesc: "",
  });
  const [selectSHELVESLookupData, setselectSHELVESLookupData] = React.useState({
    SHELVESlookupRecordid: "",
    SHELVESlookupCode: "",
    SHELVESlookupDesc: "",
  });
  const [selectMATERIALLookupData, setselectMATERIALLookupData] =
    React.useState({
      MATERIALlookupRecordid: "",
      MATERIALlookupCode: "",
      MATERIALlookupDesc: "",
    });

  // Inventory
  if (isPopupData == false) {
    selectITULookupData.ITUlookupRecordid = Data.IUomRecordID;
    selectITULookupData.ITUlookupCode = Data.MgrCode;
    selectITULookupData.ITUlookupDesc = Data.iUomDescription;
  }
  if (isPopupData == false) {
    selectmatLookupData.MATlookupRecordid = Data.MgrID;
    selectmatLookupData.MATlookupCode = Data.MgrCode;
    selectmatLookupData.MATlookupDesc = Data.MgrDescription;
  }
  if (isPopupData == false) {
    selectpurLookupData.PURlookupRecordid = Data.PUomRecordID;

    selectpurLookupData.PURlookupDesc = Data.PUomDescription;
  }
  if (isPopupData == false) {
    selectconLookupData.CONlookupRecordid = Data.CUomRecordID;

    selectconLookupData.CONlookupDesc = Data.CUomDescription;
  }

  if (isPopupData == false) {
    selectcolLookupData.COLlookupRecordid = Data.CoRecordID;
    selectcolLookupData.COLlookupCode = Data.ColourCode;
    selectcolLookupData.COLlookupDesc = Data.ColourDescription;
  }
  //Color Shades

  if (isPopupData == false) {
    selectCSLookupData.CSlookupRecordid = Data.CSRecordID;
    selectCSLookupData.CSlookupCode = Data.ColourshadeCode;
    selectCSLookupData.CSlookupDesc = Data.ColourshadeDescription;
  }
  if (isPopupData == false) {
    selectgrdLookupData.GRDlookupRecordid = Data.GRecordID;
    selectgrdLookupData.GRDlookupCode = Data.GradeCode;
    selectgrdLookupData.GRDlookupDesc = Data.GradeDescription;
  }
  if (isPopupData == false) {
    selectsubLookupData.SUBlookupRecordid = Data.SubstanceRecordID;
    selectsubLookupData.SUBlookupCode = Data.SubstanceCode;
    selectsubLookupData.SUBlookupDesc = Data.SubstanceDescription;
  }
  if (isPopupData == false) {
    selecthsnLookupData.HSNlookupRecordid = Data.HsnRecID;
    selecthsnLookupData.HSNlookupCode = Data.HsnCode;
    selecthsnLookupData.HSNlookupCsgt = Data.Cgst;
    selecthsnLookupData.HSNlookupIgst = Data.Igst;
    selecthsnLookupData.HSNlookupSgst = Data.Sgst;
  }
  //Bins & Location
  if (isPopupData == false) {
    selectLOCATIONLookupData.LOCATIONlookupRecordid = Data.LocationRecordID;
    selectLOCATIONLookupData.LOCATIONlookupCode = Data.LocationCode;
    selectLOCATIONLookupData.LOCATIONlookupDesc = Data.LocationName;
  }
  if (isPopupData == false) {
    selectBINLookupData.BINlookupRecordid = Data.BinsRecordID;
    selectBINLookupData.BINlookupCode = Data.BinsCode;
    selectBINLookupData.BINlookupDesc = Data.BinsName;
  }
  if (isPopupData == false) {
    selectSHELVESLookupData.SHELVESlookupRecordid = Data.ShelvesRecordID;
    selectSHELVESLookupData.SHELVESlookupCode = Data.ShelvesCode;
    selectSHELVESLookupData.SHELVESlookupDesc = Data.ShelvesName;
  }
  if (isPopupData == false) {
    selectMATERIALLookupData.MATERIALlookupRecordid = Data.AlternateMaterialID;
    selectMATERIALLookupData.MATERIALlookupCode = Data.AlternateMaterialCode;
    selectMATERIALLookupData.MATERIALlookupDesc = Data.AlternateMaterialName;
  }
  // *************Type based Lookup open Function**************
  // useEffect(() => {
  //   return () => {
  //       if (history.action === 'POP') {
  //           history.go(1);
  //       }
  //   };
  // }, [history]);
  const childToParent = async (childdata, type, uomType) => {
    console.log("Data---" + JSON.stringify(childdata));
    if (type == "Material Category") {
      setisPopupdata(true);
      setselectmatLookupData({
        MATlookupCode: childdata.Code,
        MATlookupRecordid: childdata.RecordID,
        MATlookupDesc: childdata.Name,
      });
      setOpenSMPopup(false);
    }
    if (type == "Purchase UOM") {
      setisPopupdata(true);
      setselectpurLookupData({
        PURlookupCode: childdata.Code,
        PURlookupRecordid: childdata.RecordID,
        PURlookupDesc: childdata.Name,
      });
      // if (parentID == "L") {
      //   const sumOfMaterial = await dispatch(
      //     conversionMaterialData({
      //       ConversionID: childdata.RecordID,
      //     })
      //   );
      //   console.log("conversionMaterialData--" + JSON.stringify(sumOfMaterial));
      //   var conversionRate = sumOfMaterial.payload.Conversionrate;
      //   console.log("conversionRate" + JSON.stringify(conversionRate));
      //   setLengthvalue(conversionRate);
      //   setwidthvalue(conversionRate);
      // }
      setOpenPURPopup(false);
      if (selectconLookupData && selectpurLookupData) {
        dispatch(
          uomMaterialRate({
            fromUomID: childdata.RecordID,
            toUomID: selectconLookupData.CONlookupRecordid,
            Type: parentID == "P" && searchPharse == "PP" ? "A" : uomType || "",
          })
        );
      }
    }

    if (type == "Consumption UOM") {
      setisPopupdata(true);
      setselectconLookupData({
        CONlookupCode: childdata.Code,
        CONlookupRecordid: childdata.RecordID,
        CONlookupDesc: childdata.Name,
      });
      setOpenCONPopup(false);

      dispatch(
        uomMaterialRate({
          fromUomID: selectpurLookupData.PURlookupRecordid,
          toUomID: childdata.RecordID,
          Type: parentID == "P" && searchPharse == "PP" ? "A" : uomType || "",
        })
      );
    }
    // Inventory
    if (type == "Inventory UOM") {
      setisPopupdata(true);
      setselectITULookupData({
        ITUlookupCode: childdata.Code,
        ITUlookupRecordid: childdata.RecordID,
        ITUlookupDesc: childdata.Name,
      });
      setOpenITUPopup(false);
    }

    if (type == "Color") {
      setisPopupdata(true);
      setselectcolLookupData({
        COLlookupCode: childdata.Code,
        COLlookupRecordid: childdata.RecordID,
        COLlookupDesc: childdata.Name,
      });
      setOpenCOLPopup(false);
    }
    if (type == "Color Shades") {
      setisPopupdata(true);
      setselectCSLookupData({
        CSlookupCode: childdata.Code,
        CSlookupRecordid: childdata.RecordID,
        CSlookupDesc: childdata.Name,
      });
      setOpenCSPopup(false);
    }

    if (type == "Supplier") {
      setselectsupLookupData({
        SUPlookupCode: childdata.Code,
        SUPlookupRecordid: childdata.RecordID,
        SUPlookupDesc: childdata.Name,
      });
      setOpenSUPPopup(false);
    }

    if (type == "Grade") {
      setisPopupdata(true);
      setselectgrdLookupData({
        GRDlookupCode: childdata.Code,
        GRDlookupRecordid: childdata.RecordID,
        GRDlookupDesc: childdata.Name,
      });
      setOpenGRDPopup(false);
    }

    if (type == "Substance") {
      setisPopupdata(true);
      setselectsubLookupData({
        SUBlookupCode: childdata.Code,
        SUBlookupRecordid: childdata.RecordID,
        SUBlookupDesc: childdata.Name,
      });
      setOpenSUBPopup(false);
    }
    if (type == "Process") {
      setisPopupdata(true);
      setselectPROLookupData({
        PROlookupRecordid: childdata.RecordID,
        PROlookupCode: childdata.Code,
        PROlookupDesc: childdata.Name,
      });
      setOpenPROPopup(false);
    }
    if (type == "HSN") {
      setisPopupdata(true);
      setselecthsnLookupData({
        HSNlookupCode: childdata.Code,
        HSNlookupRecordid: childdata.RecordID,
        HSNlookupCsgt: childdata.Cgst,
        HSNlookupIgst: childdata.Igst,
        HSNlookupSgst: childdata.Sgst,
      });
      setOpenHSNPopup(false);
    }
    if (type == "Customer") {
      setisPopupdata(true);
      setCustomerLookup({
        cusRecordID: childdata.RecordID,
        cusCode: childdata.Code,
        cusName: childdata.Name,
      });
      setOpenCusPopup(false);
    }
    if (type == "Customers") {
      selectCustomerConfigLookup({
        recordID: childdata.RecordID,
        code: childdata.Code,
        description: childdata.Name,
      });
      setOpenCustomerPopup(false);
    }
    //Bins & Location
    if (type == "Location") {
      setisPopupdata(true);
      setLocationLookup({
        locationRecordID: childdata.RecordID,
        locationCode: childdata.Code,
        locationName: childdata.Name,
      });
      setOpenLOCATIONPopup(false);
    }
    if (type == "Bin") {
      setisPopupdata(true);
      setBinLookup({
        binRecordID: childdata.RecordID,
        binCode: childdata.Code,
        binName: childdata.Name,
      });
      setOpenBINPopup(false);
    }
    if (type == "Shelves") {
      setisPopupdata(true);
      setShelvesLookup({
        shelvesRecordID: childdata.RecordID,
        shelvesCode: childdata.Code,
        shelvesName: childdata.Name,
      });
      setOpenSHELVESPopup(false);
    }
    if (type == "MATERIAL") {
      setisPopupdata(true);
      setMATERIALLookup({
        MATERIALRecordID: childdata.RecordID,
        MATERIALCode: childdata.Code,
        MATERIALName: childdata.Name,
      });
      setOpenMATERIALPopup(false);
    }
    if (type == "Product") {
      setisPopupdata(true);
      setProductLookup({
        proRecordID: childdata.ProductRecordID,
        proCode: childdata.Code,
        proName: childdata.Name,
        height: Number(childdata.Height),
        length: Number(childdata.Length),
        width: Number(childdata.Width),
      });
      setOpenProPopup(false);
    }
  };
  //************Save Function*******************
  const fnSave = async (values, types) => {
    console.log("🚀 ~ fnSave ~ values:", values);
    if (values.uomConversionType == "L" && uomData.Conversionunit == "N") {
      values.Width = 1;
    }

    if (
      values.uomConversionType == "A" &&
      uomData.Conversionunit == "NA" &&
      selectpurLookupData.PURlookupDesc == "MTRS"
    ) {
      values.Width = 100;
    }
    var isRawmaterial = "N";
    var isConsumable = "N";
    var isDesignApp = "N";
    var isSellable = "N";
    if (parentID == "M") {
      if (values.Rawmaterial == true) {
        isRawmaterial = "Y";
      }
      if (values.Consumable == true) {
        isConsumable = "Y";
      }
      if (values.Sellable == true) {
        isSellable = "Y";
      }
    }
    if (parentID == "P") {
      isSellable = "N";
      isDesignApp = "N";
      isConsumable = "N";
      isRawmaterial = "N";
    }

    if (parentID == "S") {
      isSellable = "N";
      isDesignApp = "N";
      isConsumable = "N";
      isRawmaterial = "N";
    }
    if (parentID == "L") {
      isSellable = "Y";
      isDesignApp = "Y";
      isConsumable = "Y";
      isRawmaterial = "N";
    }
    if (parentID == "R") {
      isSellable = "N";
      isDesignApp = "Y";
      isConsumable = "N";
      isRawmaterial = "N";
    }
    var idata = {
      RecordID: recID,
      MaterialCode: values.MaterialCode,
      MaterialDescription: values.MaterialDescription,
      Familyname:values.FamilyName,
      MgrID: headerid,
      PUomRecordID: selectpurLookupData.PURlookupRecordid,
      PUomDescription: selectpurLookupData.PURlookupDesc,
      CUomRecordID: selectconLookupData.CONlookupRecordid,
      CUomDescription: selectconLookupData.CONlookupDesc,
      HsnRecID: selecthsnLookupData.HSNlookupRecordid,
      HsnCode: selecthsnLookupData.HSNlookupCode,
      Igst: selecthsnLookupData.HSNlookupIgst,
      Cgst: selecthsnLookupData.HSNlookupCsgt,
      Sgst: selecthsnLookupData.HSNlookupSgst,
      FixRate: values.FixRate,
      CoRecordID: selectcolLookupData.COLlookupRecordid,
      ColourCode: selectcolLookupData.COLlookupCode,
      ColourDescription: selectcolLookupData.COLlookupDesc,
      CSRecordID: selectCSLookupData.CSlookupRecordid,
      ColourshadeCode: selectCSLookupData.CSlookupCode,
      ColourshadeDescription: selectCSLookupData.CSlookupDesc,
      Length: values.Length == "N/A" ? 1 : values.Length,
      Width: values.Width == "N/A" ? 1 : values.Width,
      Limit: values.Limit,
      Wastage: values.Wastage,
      ImageName: values.ImageName,
      Type: parentID,
      Rawmaterial: isRawmaterial,
      Consumable: isConsumable,
      Sellable: isSellable,
      Disable: values.checkbox == true ? "Y" : "N",
      Colourvarient: values.ColorVariant == true ? "Y" : "N",
      Byproduct:values.ByProduct == true ? "Y" : "N",
      SortOrder: values.SortOrder,
      Grade: values.Grade,
      DesignApp: isDesignApp,
      Nextno: values.nextIndentNO,
      RequiredQuantity: values.RequiredQuantity,
      AvailableStock: values.AvailableStock,
      ReservedQuantity: parentID == "S" ? 0 : values.ReservedQuantity,
      GRecordID: parentID == "S" ? 0 : selectgrdLookupData.GRDlookupRecordid,
      GradeCode: parentID == "S" ? 0 : selectgrdLookupData.GRDlookupCode,
      GradeDescription: parentID == "S" ? 0 : selectgrdLookupData.GRDlookupDesc,
      SubstanceRecordID: selectsubLookupData.SUBlookupRecordid,
      SubstanceCode: selectsubLookupData.SUBlookupCode,
      SubstanceDescription: selectsubLookupData.SUBlookupDesc,
      IUomRecordID: "0",
      LateRate: values.LateRate,
      Fluxuation: values.fluxuation,
      MinimumQuantity: values.minimumquantity,
      StockCareBy: values.StockCareBy,
      ReOrderLevel: values.reorderlevel,
      YearID: Year,
      Finyear,
      CompanyID,
      Height: values.height,
      ConsumptionCost:
      isPopupData  == true ?  ((parentID == "P" && searchPharse != "PP") || parentID == "F"
          ? values.FixRate
          : uomData.Conversionunit == "N"
          ? (
              (Number(uomData.Conversionrate) /
                (values.Length * values.Width)) *
              Number(values.FixRate)
            ).toFixed(6)
          : uomData.Conversionunit == "NA"
          ? (Number(values.FixRate) / (values.Length * values.Width)).toFixed(6)
          : (
              (1 / Number(uomData.Conversionrate)) *
              Number(values.FixRate)
            ).toFixed(6) ) : Data.ConsumptionCost,
      LatestConCost:
      isPopupData  == true ? ((parentID == "P" && searchPharse != "PP") || parentID == "F"
          ? values.LateRate
          : uomData.Conversionunit == "N"
          ? (
              (Number(uomData.Conversionrate) /
                (values.Length * values.Width)) *
              Number(values.LateRate)
            ).toFixed(6)
          : uomData.Conversionunit == "NA"
          ? (Number(values.LateRate) / (values.Length * values.Width)).toFixed(
              6
            )
          : (
              (1 / Number(uomData.Conversionrate)) *
              Number(values.LateRate)
            ).toFixed(6)) : Data.LatestConCost,
      ConsumptionQty:isPopupData  == true ?(
        (parentID == "P" && searchPharse != "PP") || parentID == "F"
          ? 1
          : uomData.Conversionunit == "D"
          ? (1 / Number(uomData.Conversionrate)).toFixed(6) ||
            Data.ConsumptionQty
          : uomData.Conversionunit == "NA"
          ? 1 / (values.Length * values.Width) || Data.ConsumptionQty
          : (
              Number(uomData.Conversionrate) /
              (values.Length * values.Width)
            ).toFixed(6) ) :Data.ConsumptionQty,
      UOMConversionType:
        parentID == "L" ? "A" : parentID == "R" ? values.uomConversionType : "",
      ConversionFactor:
        parentID == "P" || parentID == "F"
          ? 1
          : uomData.Conversionrate || Data.ConversionFactor,
      Finyear,
      CompanyID,
      Identflag: values.Identflag == true ? "Y" : "N",
      LeatherColor: parentID == "LS" ? values.color : "",
    };

    // console.log("🚀 ~ fnSave ~ idata:", idata)
    // return
    const action = mode === "A" ? "insert" : "update";
    // const data = await dispatch(postApidatawol(accessID, type, saveData));
    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      if (mode === "A") {
        setLoading(false);
        navigate(
          `/Apps/Secondarylistview/TR004/List of Materials/${headerid}/${parentID}/${Descriptionval}/${searchPharse}/pm/EditList of Materials/${response.payload.Recid}/E`
        );
      }
    } else {
      setLoading(false);
      toast.error(response.payload.Msg ? response.payload.Msg : "Error");
    }
  };

  // **********ScreenChange Function*********
  const screenChange = async (event) => {
    setScreen(event.target.value);
    setcode(Data.MaterialCode);
    setdesc(Data.MaterialDescription);
    if (event.target.value == "1") {
      dispatch(
        fetchExplorelitview(
          "TR019",
          "Material supplier",
          `MtlRecordID=${recID}`,
          ""
        )
      );
      selectcelldata("", "A", "");
    }

    if (event.target.value == "3") {
      dispatch(
        fetchExplorelitview("TR090", "Material Process", `${recID}`, "")
      );
      selectcelldata("", "A", "");
    }
    if (event.target.value == "6") {
      dispatch(materialDcTrckData({ MaterialID: recID, Type: parentID }));
    }
    if (event.target.value == "5") {
      dispatch(
        fetchExplorelitview("TR107", "Material Capacity", `${recID}`, "")
      );
      selectcelldata("", "A", "");
    }
    if (event.target.value == "7") {
      dispatch(
        fetchExplorelitview(
          "TR131",
          "Bins & Location",
          `MaterialMasterRecordID=${recID}`,
          ""
        )
      );
      selectcelldata("", "A", "");
    }
    if (event.target.value == "9") {
      dispatch(
        fetchExplorelitview(
          "TR139",
          "Alternate Materials",
          `MaterialID=${recID}`,
          ""
        )
      );
      selectcelldata("", "A", "");
    }
    if (event.target.value == "10") {
      dispatch(
        fetchExplorelitview("TR145", "Configure Customers", `${recID}`, "")
      );
      selectcelldata("", "A", "");
    }
    if (event.target.value == "8") {
      dispatch(procurementTrackingGet({ RecordID: recID, Type: parentID }));
      selectcelldata("", "A", "");
    }
  };
  const Trackincolumns = [
    { field: "SLNO", headerName: "SLNO", width: 90, headerAlign: "center" },
    {
      field: "Id",
      headerName: "Id",
      width: 50,
      hide: true,
      headerAlign: "center",
    },
    { field: "Date", headerName: "Date", width: 90, headerAlign: "center" },

    {
      field: "DcNo",
      headerName: "DcNo",
      headerAlign: "center",
      width: 90,
    },
    {
      field: "Type",
      headerName: "Type",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "Quantity",
      headerName: "Quantity",
      headerAlign: "center",
      width: 100,
    },
    {
      field: "TransactionType",
      headerName: "TransactionType",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "Source",
      headerName: "Source",
      headerAlign: "center",
      flex: 1,
    },
  ];

  const procurementColumns = [
    { field: "SLNO", headerName: "SLNO", width: 90, headerAlign: "center" },
    {
      field: "Id",
      headerName: "Id",
      width: 50,
      hide: true,
      headerAlign: "center",
    },
    { 
      field: "Date", 
      headerName: 
      "Date", 
      width: 90, 
      headerAlign: "center",
      align:'center'
     },

    {
      field: "Supplier Name",
      headerName: "Supplier",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "UOM",
      headerName: "Uom",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "Quantity",
      headerName: "Quantity",
      headerAlign: "center",
      width: 150,
      align:"right"
    },
    {
      field: "Rate",
      headerName: "Rate",
      headerAlign: "center",
      width: 150,
      align:"right"
    },
    {
      field: "Amount",
      headerName: "Amount",
      headerAlign: "center",
      width: 150,
      align:"right"
    },
  ];

  /********************Material supplier *****************/

  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );

  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );

  const [boMode, setBomode] = useState("A");
  const [matsupdata, setMatsupdata] = useState({
    RecordID: "",
    ApprovedPrice: "",
    LatestPrice: "",
    LatestPurchaseDate: "",
    LatestPurchaseQty: "",
    ReorderQty: "",
    LeadTime: "",
    Ratingormark: "",
    Location: "",
    SortOrder: "",
    Disable: "",
    invoiceNo: "",
  });

  //  MATERIAL CUSTOMER SCREEN
  const [customerConfigLookup, selectCustomerConfigLookup] = React.useState({
    recordID: "",
    code: "",
    description: "",
  });

  //  MATERIAL CAPCITY SCREEN
  // CUSTOMER
  const [customerLookup, setCustomerLookup] = useState({
    cusRecordID: "",
    cusCode: "",
    cusName: "",
  });

  // PRODUCT
  const [productLookup, setProductLookup] = useState({
    proRecordID: "",
    proCode: "",
    proName: "",
    height: Number,
    width: Number,
    length: Number,
  });

  const [matCapData, setMatCapData] = useState({
    capRecordID: "",
    maxCapacity: "",
    cusRecomndation: "",
    sortOrder: "",
    Length: "",
    width: "",
    height: "",
  });
  const [alternateData, setalternateData] = useState({
    SortOrder: "",
  });
  //Bins & Location
  const [locationdata, setlocationdata] = useState({
    RecordID: "",
    SortOrder: "",
  });
  const [locationLookup, setLocationLookup] = useState({
    locationRecordID: "",
    locationCode: "",
    locationName: "",
  });
  const [binLookup, setBinLookup] = useState({
    binRecordID: "",
    binCode: "",
    binName: "",
  });
  const [shelvesLookup, setShelvesLookup] = useState({
    shelvesRecordID: "",
    shelvesCode: "",
    shelvesName: "",
  });
  const [MATERIALLookup, setMATERIALLookup] = useState({
    MATERIALRecordID: "",
    MATERIALCode: "",
    MATERIALName: "",
  });

  /****************** Material Supplier values assign a state variale******************** */
  const selectcelldata = (data, bMode, field) => {
    console.log("selectdata" + JSON.stringify(data));

    setBomode(bMode);
    setIniSupplier(true);
    if (bMode == "A") {
      setMatsupdata({
        RecordID: "",
        ApprovedPrice: "",
        LatestPrice: "",
        LatestPurchaseDate: "",
        LatestPurchaseQty: "",
        ReorderQty: "",
        LeadTime: "",
        Ratingormark: "",
        Location: "",
        SortOrder: "",
        Disable: "",
        invoiceNo: "",
      });
      setselectsupLookupData({
        SUPlookupRecordid: "",
        SUPlookupCode: "",
        SUPlookupDesc: "",
      });
      setselectPROLookupData({
        PROlookupRecordid: "",
        PROlookupCode: "",
        PROlookupDesc: "",
      });
      setMatCapData({
        capRecordID: "",
        maxCapacity: "",
        cusRecomndation: "",
        sortOrder: "",
        Length: "",
        width: "",
        height: "",
      });
      setCustomerLookup({
        cusRecordID: "",
        cusCode: "",
        cusName: "",
      });
      setalternateData({
        SortOrder: "",
      });
      setlocationdata({
        RecordID: "",
        SortOrder: "",
      });
      setLocationLookup({
        locationRecordID: "",
        locationCode: "",
        locationName: "",
      });
      setBinLookup({
        binRecordID: "",
        binCode: "",
        binName: "",
      });
      setShelvesLookup({
        shelvesRecordID: "",
        shelvesCode: "",
        shelvesName: "",
      });
      setMATERIALLookup({
        MATERIALRecordID: "",
        MATERIALCode: "",
        MATERIALName: "",
      });
      setMaterialID("");
      setProductLookup({
        proRecordID: "",
        proCode: "",
        proName: "",
        height: "",
        length: "",
        width: "",
      });
      setprocessRecID("");
      selectCustomerConfigLookup({
        recordID: "",
        code: "",
        description: "",
      });
      setConfigCusRecID("");
    } else {
      if (field == "action") {
        setMatsupdata({
          RecordID: data.RecordID,
          ApprovedPrice: data.ApprovedPrice,
          LatestPrice: data.LatestPrice,
          LatestPurchaseDate: data.LatestPurchaseDate,
          LatestPurchaseQty: data.LatestPurchaseQty,
          ReorderQty: data.ReorderQty,
          LeadTime: data.LeadTime,
          Ratingormark: data.Ratingormark,
          Location: data.Location,
          SortOrder: data.SortOrder,
          Disable: data.Disable,
          invoiceNo: data.InvoiceNo,
        });
        setselectsupLookupData({
          SUPlookupRecordid: data.SuppRecordID,
          SUPlookupCode: data.SupplierCode,
          SUPlookupDesc: data.SupplierDescription,
        });

        setselectPROLookupData({
          PROlookupRecordid: data.ProcessRecordID,
          PROlookupCode: data.ProcessCode,
          PROlookupDesc: data.ProcessDescription,
        });
        setprocessRecID(data.RecordID);
        setMatCapData({
          capRecordID: data.RecordID,
          cusRecomndation: data.ActualQty,
          maxCapacity: data.MaxQty,
          sortOrder: data.SortOrder,
        });
        setCustomerLookup({
          cusCode: data.CustomerCode,
          cusName: data.Customer,
          cusRecordID: data.CustomerID,
        });
        setalternateData({
          SortOrder: data.SortOrder,
        });
        //Bin & Location
        setlocationdata({
          RecordID: data.RecordID,
          SortOrder: data.SortOrder,
        });
        setLocationLookup({
          locationRecordID: data.LocationRecordID,
          locationCode: data.LocationCode,
          locationName: data.LocationName,
        });
        setBinLookup({
          binRecordID: data.BinsRecordID,
          binCode: data.BinsCode,
          binName: data.BinsName,
        });
        setShelvesLookup({
          shelvesRecordID: data.ShelvesRecordID,
          shelvesCode: data.ShelvesCode,
          shelvesName: data.ShelvesName,
        });
        setMATERIALLookup({
          MATERIALRecordID: data.AlternateMaterialID,
          MATERIALCode: data.AlternateMaterialCode,
          MATERIALName: data.AlternateMaterialName,
        });
        setMaterialID(data.RecordID);
        setProductLookup({
          proRecordID: data.ProductID,
          proCode: data.ProductCode,
          proName: data.Product,
          height: Number(data.Height),
          length: Number(data.Length),
          width: Number(data.Width),
        });
        selectCustomerConfigLookup({
          recordID: data.CustomerID,
          code: data.Code,
          description: data.Description,
        });
        setConfigCusRecID(data.RecordID);
      }
    }
  };
  //*******Assign supmaster values from Database in  Yup initial value******* */
  const supmasterInitialvalues = {
    ApprovedPrice: matsupdata.ApprovedPrice,
    LatestPrice: matsupdata.LatestPrice,
    LatestPurchaseDate: matsupdata.LatestPurchaseDate,
    LatestPurchaseQty: matsupdata.LatestPurchaseQty,
    ReorderQty: matsupdata.ReorderQty,
    LeadTime: matsupdata.LeadTime,
    Ratingormark: matsupdata.Ratingormark,
    Location: matsupdata.Location,
    SortOrder: matsupdata.SortOrder,
    checkbox: matsupdata.Disable,
  };

  /******************************Material supplier SAVE FUNCTION********** */
  const fnMatsupplier = async (values, resetForm, del) => {
    setLoading(true);
    if (del) {
      if (selectsupLookupData.SUPlookupCode == "") {
        toast.error("Please Choose Supplier Lookup ");
        setLoading(false);
        return;
      }
    }
    if (values.ApprovedPrice == "") {
      toast.error("Please Enter ApprovedPrice ");
      setLoading(false);
      return;
    }

    if (values.ReorderQty == "") {
      toast.error("Please Enter ReorderQty ");
      setLoading(false);
      return;
    }

    if (values.checkbox == true) {
      values.checkbox = "Y";
    } else {
      values.checkbox = "N";
    }

    const idata = {
      RecordID: matsupdata.RecordID,
      MtlRecordID: recID,
      ApprovedPrice: values.ApprovedPrice,
      LatestPrice: values.LatestPrice,
      LatestPurchaseDate: values.LatestPurchaseDate,
      LatestPurchaseQty: values.LatestPurchaseQty,
      ReorderQty: values.ReorderQty,
      LeadTime: values.LeadTime,
      Ratingormark: values.Ratingormark,
      Location: values.Location,
      SuppRecordID: selectsupLookupData.SUPlookupRecordid,
      SortOrder: values.SortOrder,
      OrderQty: "0",
      DeliveredQty: "0",
      PendingQty: "0",
      AgreedPrice: "0",
      Disable: values.checkbox,
      Type: parentID,
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
      explorePostData({ accessID: "TR019", action, idata })
    );

    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);

      setLoading(false);
      dispatch(
        fetchExplorelitview(
          "TR019",
          "Material supplier",
          `MtlRecordID=${recID}`,
          ""
        )
      );
      resetForm();
      setMatsupdata({
        RecordID: "",
        ApprovedPrice: "",
        LatestPrice: "",
        LatestPurchaseDate: "",
        LatestPurchaseQty: "",
        ReorderQty: "",
        LeadTime: "",
        Ratingormark: "",
        Location: "",
        SortOrder: "",
        Disable: "",
        invoiceNo: "",
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
  /******************************Bins & Location Initial Values ********** */
  const locationInitialvalues = {
    sortorder: locationdata.SortOrder,
  };
  /******************************Bins & Location SAVE FUNCTION********** */
  const FnLocationsave = async (values, resetForm, del) => {
    let action =
      boMode === "A" && !del
        ? "insert"
        : boMode === "E" && del
        ? "harddelete"
        : "update";
    const idata = {
      RecordID: locationdata.RecordID,
      MaterialMasterRecordID: recID,
      LocationRecordID: locationLookup.locationRecordID,
      BinsRecordID: binLookup.binRecordID,
      ShelvesRecordID: shelvesLookup.shelvesRecordID,
      SortOrder: values.sortorder,
    };
    const response = await dispatch(
      explorePostData({ accessID: "TR131", action, idata })
    );
    if (response.payload.Status == "Y") {
      dispatch(
        fetchExplorelitview(
          "TR131",
          "Bins & Location",
          `MaterialMasterRecordID=${recID}`,
          ""
        )
      );

      toast.success(response.payload.Msg);

      selectcelldata("", "A", "");
      resetForm();
    } else {
      toast.error(response.payload.Msg);
    }
  };

  /**********************Search & Visible fields******************** */

  var VISIBLE_FIELDS;

  if (show == "1") {
    VISIBLE_FIELDS = [
      "SLNO",
      "SupplierDescription",
      "ApprovedPrice",
      "ReorderQty",
      "action",
    ];
  } else if (show == "3") {
    VISIBLE_FIELDS = ["SLNO", "ProcessCode", "ProcessDescription", "action"];
  } else if (show == "6") {
    VISIBLE_FIELDS = [
      "SLNO",
      "Date",
      "DC Number",
      "Type",
      "Quantity",
      "Transaction Type",
      "Source",
      "action",
    ];
  } else if (show == "7") {
    VISIBLE_FIELDS = [
      "SLNO",
      "LocationCode",
      "LocationName",
      "BinsCode",
      "BinsName",
      "action",
    ];
  } else if (show == "9") {
    VISIBLE_FIELDS = [
      "SLNO",
      "AlternateMaterialCode",
      "AlternateMaterialName",
      "Stock",
      "action",
    ];
  } else if (show == "10") {
    VISIBLE_FIELDS = ["SLNO", "Code", "Description", "action"];
  } else {
    VISIBLE_FIELDS = ["SLNO", "Product", "MaxQty", "ActualQty", "action"];
  }

  const columns = React.useMemo(
    () =>
      explorelistViewcolumn.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
    [explorelistViewcolumn]
  );

  console.log(explorelistViewcolumn);
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
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>Material Supplier</Typography>
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
  function ProcessCustombar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>
            {show == 3 ? "Material Process" : "Alternate Material"}
          </Typography>
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
  function CapacityCustombar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>Material Capacity</Typography>
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
  function Location() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>Bins & Location</Typography>
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
  function TrackingToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>Transaction History</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <GridToolbarQuickFilter />
          <IconButton>
            <AddOutlinedIcon />
          </IconButton>
        </Box>
      </GridToolbarContainer>
    );
  }

  const [code, setcode] = useState("");
  const [desc, setdesc] = useState("");
  //********************STOCK DATA************ //

  const stockIntialValue = {
    OpenStockQty: Data.OpenStockQty,
    OpenstockTotalsqft: Data.OpenstockTotalsqft,
    IssuedTotalsqft: Data.IssuedTotalsqft,
    TotalStock: Data.TotalStock,
    RecivedTotalsqft: Data.RecivedTotalsqft,
    ReceivedStockQty: Data.ReceivedStockQty,
    IssuedStockQty: Data.IssuedStockQty,
    Stock: Data.Stock,
    RequirementStockQty: Data.RequirementStockQty,
    Balance: Data.Balance,

    OpenStockHideQty: Data.OpenStockHideQty,
    OpenStockHideSqft: Data.OpenStockHideSqft,
    OpenStockSideQty: Data.OpenStockSideQty,
    OpenStockSideSqft: Data.OpenStockSideSqft,
    RecievedStockHideQty: Data.RecievedStockHideQty,
    RecievedStockHideSqft: Data.RecievedStockHideSqft,
    RecievedStockSideQty: Data.RecievedStockSideQty,
    RecievedStockSideSqft: Data.RecievedStockSideSqft,
    IssuedStockHideQty: Data.IssuedStockHideQty,
    IssuedStockHideSqft: Data.IssuedStockHideSqft,
    IssuedStockSideQty: Data.IssuedStockSideQty,
    IssuedStockSideSqft: Data.IssuedStockSideSqft,

    StockHideQty: Data.StockHideQty,
    StockHideSqft: Data.StockHideSqft,
    StockSideQty: Data.StockSideQty,
    StockSideSqft: Data.StockSideSqft,
    OpenStockDate: Data.Osdate,
    Stock: Data.Stock,
    RequirementStockQty: Data.RequirementStockQty,
    BALANCE: Data.BALANCE,
  };

  var filterName;
  var filterValue;
  if (parentID == "L" || parentID == "LS") {
    filterName = "Type";
    filterValue = "A";
  }
  if (parentID == "M") {
    filterName = "Type";
    filterValue = "M";
  }
  if (parentID == "R") {
    filterName = "Type";
    filterValue = "L";
  }

  if (parentID == "S") {
    filterName = "Type";
    filterValue = "S";
  }
  var abbrevation = "";
  if (parentID == "L") {
    abbrevation = "Leather";
  }
  if (parentID == "M") {
    abbrevation = "Material";
  }
  if (parentID == "S") {
    abbrevation = "Service";
  }
  if (parentID == "P") {
    abbrevation = "Packing Material";
  }
  if (parentID == "R") {
    abbrevation = "RF Material";
  }
  if (parentID == "LS") {
    abbrevation = "Sales-Leather";
  }

  var LookupFilter = "";
  if (parentID == "L") {
    LookupFilter = `${parentID}`;
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
          navigate(
            `/Apps/Secondarylistview/TR004/List%20of%20Materials/${headerid}/${parentID}/${Descriptionval}/${searchPharse}/pm`
          );
        }
      } else {
        return;
      }
    });
  };

  const [processRecID, setprocessRecID] = useState();
  const [MaterialID, setMaterialID] = useState();
  /******************************Material Process SAVE FUNCTION********** */
  const fnMatprocess = async (values, resetForm, del) => {
    setLoading(true);
    if (del) {
      if (selectPROLookupData.PROlookupCode == "") {
        toast.error("Please Choose Process Lookup ");
        setLoading(false);
        return;
      }
    }

    const idata = {
      RecordID: processRecID,
      MaterialRecordID: recID,
      ProcessRecordID: selectPROLookupData.PROlookupRecordid,
    };

    let action =
      boMode === "A" && !del
        ? "insert"
        : boMode === "E" && del
        ? "harddelete"
        : "update";

    const response = await dispatch(
      explorePostData({ accessID: "TR090", action, idata })
    );
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      setLoading(false);
      dispatch(
        fetchExplorelitview("TR090", "Material Process", `${recID}`, "")
      );
      resetForm();
      selectcelldata("", "A", "");
    } else {
      toast.error(response.payload.Msg);
      setLoading(false);
    }
  };
  /******************************Material Customer SAVE FUNCTION********** */

  const [configCusRecID, setConfigCusRecID] = useState("");
  const fnConfigMaterial = async (values, resetForm, del) => {
    setLoading(true);
    if (del) {
      if (customerConfigLookup.recordID == "") {
        toast.error("Please Choose Customer Lookup ");
        setLoading(false);
        return;
      }
    }

    const idata = {
      RecordID: configCusRecID,
      LeatherID: recID,
      CustomerID: customerConfigLookup.recordID,
    };

    let action =
      boMode === "A" && !del
        ? "insert"
        : boMode === "E" && del
        ? "harddelete"
        : "update";

    const response = await dispatch(
      explorePostData({ accessID: "TR145", action, idata })
    );
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      setLoading(false);
      dispatch(
        fetchExplorelitview("TR145", "Material Customer", `${recID}`, "")
      );
      resetForm();
      selectcelldata("", "A", "");
    } else {
      toast.error(response.payload.Msg);
      setLoading(false);
    }
  };
  /******************************Alternate Material SAVE FUNCTION********** */
  const alternatemateialInitialValue = {
    SortOrder: alternateData.SortOrder,
  };
  const fnAlternateMaterial = async (values, resetForm, del) => {
    setLoading(true);

    const idata = {
      RecordID: MaterialID,
      MaterialID: recID,
      AlternateID: MATERIALLookup.MATERIALRecordID,
      SortOrder: values.SortOrder,
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
      explorePostData({ accessID: "TR139", action, idata })
    );
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      setLoading(false);
      dispatch(
        fetchExplorelitview(
          "TR139",
          "Alternate Materials",
          `MaterialID=${recID}`,
          ""
        )
      );
      resetForm();
      selectcelldata("", "A", "");
    } else {
      toast.error(response.payload.Msg);
      setLoading(false);
    }
  };
  const matCapInitialValue = {
    maxCapacity: matCapData.maxCapacity,
    cusRecomndation: matCapData.cusRecomndation,
    sortOrder: matCapData.sortOrder,
    headerHeight: Number(Data.Height),
    headerLength: Number(Data.Length),
    headerWidth: Number(Data.Width),
  };
  const materialCAPFn = async (values, resetForm, del) => {
    if (
      Math.floor(
        (values.headerHeight * values.headerLength * values.headerWidth) /
          (productLookup.height * productLookup.length * productLookup.width)
      ) < values.cusRecomndation
    ) {
      toast.error("Customer Recommendation must less than Max Capacity");
      return;
    }
    let action =
      boMode === "A" && !del
        ? "insert"
        : boMode === "E" && del
        ? "harddelete"
        : "update";

    const idata = {
      RecordID: matCapData.capRecordID,
      ProductID: productLookup.proRecordID,
      MaterialID: recID,
      CustomerID: customerLookup.cusRecordID,
      MaxQty: Math.floor(
        (values.headerHeight * values.headerLength * values.headerWidth) /
          (productLookup.height * productLookup.length * productLookup.width)
      ),
      ActualQty: values.cusRecomndation,
      SortOrder: values.sortOrder,
      Finyear,
      CompanyID,
    };

    const response = await dispatch(
      explorePostData({ accessID: "TR107", action, idata })
    );
    if (response.payload.Status == "Y") {
      await dispatch(fetchExplorelitview("TR107", "BOM", recID, ""));
      toast.success(response.payload.Msg);

      selectcelldata("", "A", "");
      resetForm();
    } else {
      toast.error(response.payload.Msg);
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ height: "100vh", overflow: "auto" }}>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box display="flex" borderRadius="3px" alignItems={"center"}>
            {broken && !rtl && (
              <IconButton onClick={() => toggleSidebar()}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
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
                  navigate(`/Apps/TR044/Materials Type`);
                }}
              >
                Material Type
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/TR003/Material%20Category/${parentID}`
                  );
                }}
              >
                {abbrevation}
              </Typography>

              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/TR003/Material%20Category/${parentID}`
                  );
                }}
              >
                {Descriptionval}
              </Typography>
              {show == "6" || show == "4" ? (
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    setScreen(0);
                  }}
                >
                  {desc}
                </Typography>
              ) : (
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    setScreen(0);
                  }}
                >
                  {mode === "A" ? "New" : Data.MaterialDescription}
                </Typography>
              )}
              {show == "1" ? (
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  Configure Supplier
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
                  Configure Process
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
                  Tracking
                </Typography>
              ) : (
                false
              )}
              {show == "7" ? (
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  Bins & Location
                </Typography>
              ) : (
                false
              )}
              {show == "8" ? (
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  Purchase Analytics
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
                  Configure BOM
                </Typography>
              ) : (
                false
              )}
              {show == "5" ? (
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  Capacity
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
                  Stock
                </Typography>
              ) : (
                false
              )}
            </Breadcrumbs>
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
                  <MenuItem value={0}>Material </MenuItem>
                  {parentID != "LS" && (
                    <MenuItem value={1}>Configure Supplier</MenuItem>
                  )}

                  {parentID === "LS" && (
                    <MenuItem value={10}>Configure Customer</MenuItem>
                  )}
                  <MenuItem value={3}>Configure Process</MenuItem>
                  {parentID !== "S" && <MenuItem value={6}>Tracking</MenuItem>}
                  {searchPharse === "CA" && (
                    <MenuItem value={5}>Capacity</MenuItem>
                  )}
                  <MenuItem value={7}>Bins & Location</MenuItem>
                  <MenuItem value={8}>Purchase Analytics</MenuItem>
                  {parentID !== "LS" && (
                    <MenuItem value={9}>Alternate Materials</MenuItem>
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
        {!getLoading && show == "0" ? (
          <Box m="20px">
            <Formik
              initialValues={initialValues}
              onSubmit={(values, setSubmitting) => {
                setTimeout(() => {
                  fnSave(values);
                }, 100);
              }}
              validationSchema={materialSchema}
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
                          gridColumn: "span 2",
                          alignContent: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                          right: "0px",
                        }}
                      >
                        <Chip
                          sx={{
                            position: "absolute",
                            zIndex: 9,
                            right: 0,
                            top: 0,
                          }}
                          icon={<NotificationImportantIcon />}
                          color={materialWarning}
                        />
                        <Avatar
                          variant="rounded"
                          src={userimg}
                          sx={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}
                    <FormControl sx={{ gridColumn: "span 2", gap: "30px" }}>
                      {parentID == "LS" ? (
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="ID"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            !!touched.MaterialCode && !!errors.MaterialCode
                          }
                          helperText={
                            touched.MaterialCode && errors.MaterialCode
                          }
                          id="MaterialCode"
                          name="MaterialCode"
                          value={values.MaterialCode}
                          focused
                          autoFocus
                          onInvalid={(e) => {
                            e.target.setCustomValidity("Please Fill The ID");
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                      ) : (
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="ID"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            !!touched.MaterialCode && !!errors.MaterialCode
                          }
                          helperText={
                            touched.MaterialCode && errors.MaterialCode
                          }
                          placeholder="Auto"
                          id="MaterialCode"
                          name="MaterialCode"
                          value={values.MaterialCode}
                          focused
                          autoFocus
                          inputProps={{ readOnly: true }}
                          onInvalid={(e) => {
                            e.target.setCustomValidity("Please Fill The ID");
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                      )}
                      {parentID == "P" && searchPharse == "CA" ? (
                        <FormControl
                          fullWidth
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "20px",
                          }}
                        >
                          <TextField
                            name="Length"
                            type="number"
                            id="Length"
                            label="Length"
                            variant="filled"
                            value={values.Length}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            focused
                            required
                            fullWidth
                            sx={{ background: "#fff6c3" }}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right" },
                              },
                            }}
                            onInvalid={(e) => {
                              e.target.setCustomValidity(
                                "Please Fill The Length"
                              );
                            }}
                            onInput={(e) => {
                              e.target.setCustomValidity("");
                            }}
                          />
                          <TextField
                            name="Width"
                            type="number"
                            id="Width"
                            label="Width"
                            variant="filled"
                            value={values.Width}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            focused
                            required
                            fullWidth
                            sx={{ background: "#fff6c3" }}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right" },
                              },
                            }}
                            onInvalid={(e) => {
                              e.target.setCustomValidity(
                                "Please Fill The Breadth"
                              );
                            }}
                            onInput={(e) => {
                              e.target.setCustomValidity("");
                            }}
                          />
                          <TextField
                            name="height"
                            type="number"
                            id="height"
                            label="Height"
                            variant="filled"
                            value={values.height}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            focused
                            required
                            sx={{ background: "#fff6c3" }}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right" },
                              },
                            }}
                            fullWidth
                            onInvalid={(e) => {
                              e.target.setCustomValidity(
                                "Please Fill The Height"
                              );
                            }}
                            onInput={(e) => {
                              e.target.setCustomValidity("");
                            }}
                          />
                        </FormControl>
                      ) : (
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Description"
                          required
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{ gridColumn: "span 2" }}
                          id="MaterialDescription"
                          name="MaterialDescription"
                          value={values.MaterialDescription}
                          focused
                          inputProps={{
                            maxLength: 50,
                            readOnly:
                              parentID === "L" && parentID != "LS"
                                ? true
                                : false,
                          }}
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
                      )}
                    </FormControl>
                    {isNonMobile && (
                      <Stack
                        sx={{
                          gridColumn: "span 2",
                          alignContent: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                          right: "0px",
                        }}
                      >
                        <Chip
                          sx={{
                            position: "absolute",
                            zIndex: 9,
                            right: 0,
                            top: 0,
                          }}
                          icon={<NotificationImportantIcon />}
                          color={materialWarning}
                        />
                        <Avatar
                          variant="rounded"
                          src={userimg}
                          sx={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}

                    {parentID == "R" ? (
                      <FormControl
                        focused
                        variant="filled"
                        sx={{ gridColumn: "span 2" }}
                      >
                        <InputLabel id="productType">Type</InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="uomConversionType"
                          name="uomConversionType"
                          value={values.uomConversionType}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          onClick={() => {
                            setisPopupdata(true);
                            setselectpurLookupData({
                              PURlookupRecordid: "",
                              PURlookupCode: "",
                              PURlookupDesc: "",
                            });
                            setselectconLookupData({
                              CONlookupRecordid: "",
                              CONlookupCode: "",
                              CONlookupDesc: "",
                            });
                          }}
                        >
                          <MenuItem value="A">Area</MenuItem>
                          <MenuItem value="L">Length</MenuItem>
                        </Select>
                      </FormControl>
                    ) : // <FormControl
                    //   sx={{ gridColumn: "span 2" }}
                    //   onChange={() => {
                    //     setisPopupdata(true)
                    //     setselectpurLookupData({
                    //       PURlookupRecordid: "",
                    //       PURlookupCode: "",
                    //       PURlookupDesc: "",
                    //     });
                    //     setselectconLookupData({
                    //       CONlookupRecordid: "",
                    //       CONlookupCode: "",
                    //       CONlookupDesc: "",
                    //     });
                    //   }}
                    // >

                    //     <FormLabel>Type</FormLabel>

                    //     <Field
                    //       as="select"
                    //       label="Type"
                    //       onChange={handleChange}
                    //       value={values.uomConversionType}
                    //       id="uomConversionType"
                    //       name="uomConversionType"
                    //       focused
                    //       style={style}
                    //     >
                    //       {/* <option>Sample</option> */}
                    //       <option value="A">Area</option>
                    //       <option value="L">Length</option>
                    //     </Field>

                    // </FormControl>
                    null}

                    {parentID != "S" &&
                    parentID !== "LS" &&
                    searchPharse != "CA" ? (
                      <FormControl
                        sx={{
                          gridColumn: "span 2",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <TextField
                          id="outlined-basic"
                          label="ID"
                          variant="filled"
                          value={selectpurLookupData.PURlookupRecordid}
                          focused
                          sx={{ display: "none" }}
                        />

                        <TextField
                          id="outlined-basic"
                          label="Purchase UOM"
                          variant="filled"
                          value={selectpurLookupData.PURlookupDesc}
                          fullWidth
                          focused
                          required
                          inputProps={{ tabIndex: "-1" }}
                        />
                        <IconButton
                          sx={{ height: 40, width: 40 }}
                          onClick={() => handleShow("PUR")}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>
                      </FormControl>
                    ) : null}

                    {searchPharse != "CA" && parentID !== "LS" ? (
                      <FormControl
                        sx={{
                          gridColumn: "span 2",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <TextField
                          id="outlined-basic"
                          label="ID"
                          variant="filled"
                          value={selectconLookupData.CONlookupRecordid}
                          focused
                          sx={{ display: "none" }}
                        />

                        <TextField
                          id="outlined-basic"
                          label="Consumption UOM"
                          variant="filled"
                          value={selectconLookupData.CONlookupDesc}
                          fullWidth
                          focused
                          inputProps={{ tabIndex: "-1" }}
                        />
                        <IconButton
                          sx={{ height: 40, width: 40 }}
                          onClick={() => handleShow("CON")}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>
                      </FormControl>
                    ) : (
                      false
                    )}

                    <FormControl
                      sx={{
                        gridColumn: "span 2",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="ID"
                        variant="filled"
                        value={selecthsnLookupData.HSNlookupRecordid}
                        focused
                        sx={{ display: "none" }}
                      />

                      <TextField
                        id="outlined-basic"
                        label="HSN"
                        variant="filled"
                        value={selecthsnLookupData.HSNlookupCode}
                        fullWidth
                        focused
                        inputProps={{ tabIndex: "-1" }}
                      />
                      <IconButton
                        sx={{ height: 40, width: 40 }}
                        onClick={() => handleShow("HSN")}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>
                    </FormControl>

                    {parentID == "M" ? (
                      <React.Fragment>
                        <FormControl
                          sx={{
                            gridColumn: "span 2",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="ID"
                            variant="filled"
                            value={selectcolLookupData.COLlookupRecordid}
                            focused
                            sx={{ display: "none" }}
                          />

                          <TextField
                            id="outlined-basic"
                            label="Color"
                            variant="filled"
                            value={selectcolLookupData.COLlookupCode}
                            focused
                            inputProps={{ tabIndex: "-1" }}
                          />
                          {/* <Button  variant='contained'  sx={{height:'30px',width:'30px',mt:'9px'}} > */}
                          <IconButton
                            sx={{ height: 40, width: 40 }}
                            onClick={() => handleShow("COL")}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>
                          {/* <MoreHorizIcon onClick={()=>handleShow('COL')} color='white' sx={{height:'30px',}} mt='15px' fontSize='medium' /> */}
                          {/* </Button> */}
                          <TextField
                            id="outlined-basic"
                            variant="filled"
                            value={selectcolLookupData.COLlookupDesc}
                            fullWidth
                            focused
                            inputProps={{ tabIndex: "-1" }}
                          />
                        </FormControl>

                        <FormControl
                          focused
                          variant="filled"
                          sx={{ gridColumn: "span 2" }}
                        >
                          <InputLabel id="productType">
                            Stock Care By
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-filled-label"
                            id="StockCareBy"
                            name="StockCareBy"
                            value={values.StockCareBy}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          >
                            <MenuItem value="D">Daily</MenuItem>
                            <MenuItem value="W">Weekly</MenuItem>
                            <MenuItem value="M">Monthly</MenuItem>
                            <MenuItem value="AT">Any Time</MenuItem>
                          </Select>
                        </FormControl>
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Limit"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          // value={values.address2}

                          error={!!touched.Limit && !!errors.Limit}
                          helperText={touched.Limit && errors.Limit}
                          sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                          id="Limit"
                          name="Limit"
                          value={values.Limit}
                          focused
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          onInvalid={(e) => {
                            e.target.setCustomValidity("Please Fill The Limit");
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                        
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                    {parentID == "LS" ? (
                      <React.Fragment>
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Color"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.color}
                          name="color"
                          error={!!touched.color && !!errors.color}
                          helperText={touched.color && errors.color}
                          sx={{
                            gridColumn: "span 2",
                          }}
                          focused
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Fixed Rate"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          error={!!touched.FixRate && !!errors.FixRate}
                          helperText={touched.FixRate && errors.FixRate}
                          sx={{
                            gridColumn: "span 2",
                            background: "#fff6c3",
                            input: { textAlign: "right" },
                          }}
                          id="FixRate"
                          name="FixRate"
                          value={values.FixRate}
                          focused
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Latest Rate With GST"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.LateRate}
                          error={!!touched.LateRate && !!errors.LateRate}
                          helperText={touched.LateRate && errors.LateRate}
                          sx={{
                            gridColumn: "span 2",
                            background: "#fff6c3",
                            input: { textAlign: "right" },
                          }}
                          id="LateRate"
                          name="LateRate"
                          focused
                          InputProps={{ readOnly: true }}
                        />
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                    {parentID == "L" ? (
                      <React.Fragment>
                        <FormControl
                          sx={{
                            gridColumn: "span 2",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="ID"
                            variant="filled"
                            value={selectcolLookupData.COLlookupRecordid}
                            focused
                            sx={{ display: "none" }}
                          />

                          <TextField
                            id="outlined-basic"
                            label="Color"
                            variant="filled"
                            value={selectcolLookupData.COLlookupCode}
                            focused
                            required
                            inputProps={{ tabIndex: "-1" }}
                          />
                          {/* <Button  variant='contained'  sx={{height:'30px',width:'30px',mt:'9px'}} > */}
                          <IconButton
                            sx={{ height: 40, width: 40 }}
                            onClick={() => handleShow("COL")}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>
                          {/* <MoreHorizIcon onClick={()=>handleShow('COL')} color='white' sx={{height:'30px',}} mt='15px' fontSize='medium' /> */}
                          {/* </Button> */}
                          <TextField
                            id="outlined-basic"
                            variant="filled"
                            value={selectcolLookupData.COLlookupDesc}
                            fullWidth
                            focused
                            inputProps={{ tabIndex: "-1" }}
                          />
                        </FormControl>
                        <FormControl
                          sx={{
                            gridColumn: "span 2",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="ID"
                            variant="filled"
                            value={selectCSLookupData.CSlookupRecordid}
                            focused
                            sx={{ display: "none" }}
                          />

                          <TextField
                            id="outlined-basic"
                            label="Color Shades"
                            variant="filled"
                            value={selectCSLookupData.CSlookupCode}
                            focused
                            inputProps={{ tabIndex: "-1" }}
                          />
                          {/* <Button  variant='contained'  sx={{height:'30px',width:'30px',mt:'9px'}} > */}
                          <IconButton
                            sx={{ height: 40, width: 40 }}
                            onClick={() => handleShow("CS")}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>
                          {/* <MoreHorizIcon onClick={()=>handleShow('COL')} color='white' sx={{height:'30px',}} mt='15px' fontSize='medium' /> */}
                          {/* </Button> */}
                          <TextField
                            id="outlined-basic"
                            variant="filled"
                            value={selectCSLookupData.CSlookupDesc}
                            fullWidth
                            focused
                            inputProps={{ tabIndex: "-1" }}
                          />
                        </FormControl>
                        <FormControl
                          focused
                          variant="filled"
                          sx={{ gridColumn: "span 2" }}
                        >
                          <InputLabel id="productType">
                            Stock Care By
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-filled-label"
                            id="StockCareBy"
                            name="StockCareBy"
                            value={values.StockCareBy}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          >
                            <MenuItem value="D">Daily</MenuItem>
                            <MenuItem value="W">Weekly</MenuItem>
                            <MenuItem value="M">Monthly</MenuItem>
                            <MenuItem value="AT">Any Time</MenuItem>
                          </Select>
                        </FormControl>
                        <TextField
                          fullWidth
                          variant="filled"
                          type="Number"
                          label="Next Indent No"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.nextIndentNO}
                          name="nextIndentNO"
                          error={
                            !!touched.nextIndentNO && !!errors.nextIndentNO
                          }
                          helperText={
                            touched.nextIndentNO && errors.nextIndentNO
                          }
                          sx={{
                            gridColumn: "span 2",
                            background: "#fff6c3",
                            input: { textAlign: "right" },
                          }}
                          focused
                          onWheel={(e) => e.target.blur()} 
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Limit"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          // value={values.address2}

                          error={!!touched.Limit && !!errors.Limit}
                          helperText={touched.Limit && errors.Limit}
                          sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                          id="Limit"
                          name="Limit"
                          value={values.Limit}
                          focused
                          onWheel={(e) => e.target.blur()} 
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          onInvalid={(e) => {
                            e.target.setCustomValidity("Please Fill The Limit");
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                    {parentID == "R" ? (
                      <React.Fragment>
                        <FormControl
                          sx={{
                            gridColumn: "span 2",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="ID"
                            variant="filled"
                            value={selectcolLookupData.COLlookupRecordid}
                            focused
                            sx={{ display: "none" }}
                          />

                          <TextField
                            id="outlined-basic"
                            label="Color"
                            variant="filled"
                            value={selectcolLookupData.COLlookupCode}
                            focused
                            required
                            inputProps={{ tabIndex: "-1" }}
                          />
                          {/* <Button  variant='contained'  sx={{height:'30px',width:'30px',mt:'9px'}} > */}
                          <IconButton
                            sx={{ height: 40, width: 40 }}
                            onClick={() => handleShow("COL")}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>
                          {/* <MoreHorizIcon onClick={()=>handleShow('COL')} color='white' sx={{height:'30px',}} mt='15px' fontSize='medium' /> */}
                          {/* </Button> */}
                          <TextField
                            id="outlined-basic"
                            variant="filled"
                            value={selectcolLookupData.COLlookupDesc}
                            fullWidth
                            focused
                            inputProps={{ tabIndex: "-1" }}
                          />
                        </FormControl>
                        <FormControl
                          focused
                          variant="filled"
                          sx={{ gridColumn: "span 2" }}
                        >
                          <InputLabel id="productType">
                            Stock Care By
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-filled-label"
                            id="StockCareBy"
                            name="StockCareBy"
                            value={values.StockCareBy}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          >
                            <MenuItem value="D">Daily</MenuItem>
                            <MenuItem value="W">Weekly</MenuItem>
                            <MenuItem value="M">Monthly</MenuItem>
                            <MenuItem value="AT">Any Time</MenuItem>
                          </Select>
                        </FormControl>
                        <TextField
                          fullWidth
                          variant="filled"
                          type="Number"
                          label="Next Indent No"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.nextIndentNO}
                          name="nextIndentNO"
                          error={
                            !!touched.nextIndentNO && !!errors.nextIndentNO
                          }
                          helperText={
                            touched.nextIndentNO && errors.nextIndentNO
                          }
                          sx={{
                            gridColumn: "span 2",
                            background: "#fff6c3",
                            input: { textAlign: "right" },
                          }}
                          focused
                          onWheel={(e) => e.target.blur()} 
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Limit"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.Limit && !!errors.Limit}
                          helperText={touched.Limit && errors.Limit}
                          sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                          id="Limit"
                          name="Limit"
                          value={values.Limit}
                          focused
                          onWheel={(e) => e.target.blur()} 
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          onInvalid={(e) => {
                            e.target.setCustomValidity("Please Fill The Limit");
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                      </React.Fragment>
                    ) : (
                      ""
                    )}

                    {parentID == "L" ? (
                      <React.Fragment>
                        <FormControl
                          fullWidth
                          sx={{
                            gridColumn: "span 2",
                            display: "flex",
                            flexDirection: "row",
                            gap: "20px",
                          }}
                        >
                          <TextField
                            fullWidth
                            variant="filled"
                            type={
                              selectpurLookupData.PURlookupDesc == "Numbers" ||
                              selectpurLookupData.PURlookupDesc == "MTRS"
                                ? "number"
                                : "text"
                            }
                            label="Length (in cm)"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            required={
                              selectpurLookupData.PURlookupDesc == "Numbers" ||
                              selectpurLookupData.PURlookupDesc == "MTRS"
                                ? true
                                : false
                            }
                            sx={{
                              background: "#fff6c3",
                              input: { textAlign: "right" },
                            }}
                            id="Length"
                            name="Length"
                            value={
                              selectpurLookupData.PURlookupDesc == "Numbers" ||
                              selectpurLookupData.PURlookupDesc == "MTRS"
                                ? values.Length
                                : "N/A"
                            }
                            focused
                          />

                          <TextField
                            fullWidth
                            variant="filled"
                            type={
                              selectpurLookupData.PURlookupDesc == "Numbers" ||
                              selectpurLookupData.PURlookupDesc == "MTRS"
                                ? "number"
                                : "text"
                            }
                            label="Width (in cm)"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            required={
                              selectpurLookupData.PURlookupDesc == "Numbers" ||
                              selectpurLookupData.PURlookupDesc == "MTRS"
                                ? true
                                : false
                            }
                            sx={{
                              gridColumn: "span 2",
                              background: "#fff6c3",
                              input: { textAlign: "right" },
                            }}
                            id="Width"
                            name="Width"
                            // value={values.Width}
                            value={
                              selectpurLookupData.PURlookupDesc == "Numbers" ||
                              selectpurLookupData.PURlookupDesc == "MTRS"
                                ? values.Width
                                : "N/A"
                            }
                            focused
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right" },
                              },
                            }}
                            inputProps={{
                              readOnly:
                                selectpurLookupData.PURlookupDesc !=
                                  "Numbers" ||
                                selectpurLookupData.PURlookupDesc != "MTRS"
                                  ? true
                                  : false,
                            }}
                          />
                        </FormControl>
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Fluctuation"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          // value={values.address2}
                          error={!!touched.fluxuation && !!errors.fluxuation}
                          helperText={touched.fluxuation && errors.fluxuation}
                          sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                          id="fluxuation"
                          name="fluxuation"
                          value={values.fluxuation}
                          focused
                          onWheel={(e) => e.target.blur()} 
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          inputProps={{ maxLength: 3 }}
                        />
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                    {parentID == "M" ||
                    parentID == "R" ||
                    parentID == "F" ||
                    parentID == "P" ||
                    parentID == "L" ? (
                      <React.Fragment>
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Reorder Level"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                          id="reorderlevel"
                          name="reorderlevel"
                          value={values.reorderlevel}
                          focused
                          onWheel={(e) => e.target.blur()} 
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
                          label="Minimum Quantity"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                          id="minimumquantity"
                          name="minimumquantity"
                          value={values.minimumquantity}
                          focused
                          onWheel={(e) => e.target.blur()} 
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          // inputProps={{ maxLength: 3 }}
                        />
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                    {parentID == "R" ||
                    (parentID == "P" && searchPharse == "PP") ? (
                      <React.Fragment>
                        <FormControl
                          fullWidth
                          sx={{
                            gridColumn: "span 2",
                            display: "flex",
                            flexDirection: "row",
                            gap: "20px",
                          }}
                        >
                          <TextField
                            fullWidth
                            variant="filled"
                            type={
                              selectpurLookupData.PURlookupDesc == "Numbers" ||
                              selectpurLookupData.PURlookupDesc == "MTRS"
                                ? "number"
                                : "text"
                            }
                            label="Length (in cm)"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            // value={values.Length}
                            value={
                              selectpurLookupData.PURlookupDesc == "Numbers" ||
                              selectpurLookupData.PURlookupDesc == "MTRS"
                                ? values.Length
                                : "N/A"
                            }
                            required={
                              selectpurLookupData.PURlookupDesc == "Numbers" ||
                              selectpurLookupData.PURlookupDesc == "MTRS"
                                ? true
                                : false
                            }
                            error={!!touched.Length && !!errors.Length}
                            helperText={touched.Length && errors.Length}
                            sx={{
                              background: "#fff6c3",
                              input: { textAlign: "right" },
                            }}
                            id="Length"
                            name="Length"
                            focused
                          />

                          <TextField
                            fullWidth
                            variant="filled"
                            type={
                              selectpurLookupData.PURlookupDesc == "Numbers" &&
                              values.uomConversionType != "L"
                                ? "number"
                                : selectpurLookupData.PURlookupDesc == "MTRS" &&
                                  values.uomConversionType != "L"
                                ? "number"
                                : selectpurLookupData.PURlookupDesc !=
                                    "Numbers" && values.uomConversionType == "L"
                                ? "text"
                                : "text"
                            }
                            label="Width (in cm)"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={
                              selectpurLookupData.PURlookupDesc == "Numbers" &&
                              values.uomConversionType != "L"
                                ? values.Width
                                : selectpurLookupData.PURlookupDesc ==
                                    "Numbers" && values.uomConversionType == "L"
                                ? 1
                                : selectpurLookupData.PURlookupDesc == "MTRS" &&
                                  values.uomConversionType == "A"
                                ? 100
                                : "N/A"
                            }
                            required={
                              selectpurLookupData.PURlookupDesc == "Numbers" ||
                              selectpurLookupData.PURlookupDesc == "MTRS"
                                ? true
                                : false
                            }
                            error={!!touched.Width && !!errors.Width}
                            helperText={touched.Width && errors.Width}
                            sx={{
                              gridColumn: "span 2",
                              background: "#fff6c3",
                              input: { textAlign: "right" },
                            }}
                            id="Width"
                            name="Width"
                            focused
                            inputProps={{
                              readOnly:
                                values.uomConversionType == "L" &&
                                selectpurLookupData.PURlookupDesc != "Numbers"
                                  ? true
                                  : values.uomConversionType == "A" &&
                                    selectpurLookupData.PURlookupDesc == "MTRS"
                                  ? true
                                  : false,
                            }}
                          />
                        </FormControl>
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Fluctuation"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.fluxuation && !!errors.fluxuation}
                          helperText={touched.fluxuation && errors.fluxuation}
                          sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                          id="fluxuation"
                          name="fluxuation"
                          value={values.fluxuation}
                          focused
                          onWheel={(e) => e.target.blur()} 
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          inputProps={{ maxLength: 3 }}
                        />
                      </React.Fragment>
                    ) : (
                      ""
                    )}

                    {parentID == "M" ||
                    parentID == "R" ||
                    parentID == "F" ||
                    parentID == "P" ||
                    parentID == "L" ? (
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Fixed Rate"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        error={!!touched.FixRate && !!errors.FixRate}
                        helperText={touched.FixRate && errors.FixRate}
                        sx={{
                          gridColumn: "span 2",
                          background: "#fff6c3",
                          input: { textAlign: "right" },
                        }}
                        id="FixRate"
                        name="FixRate"
                        value={values.FixRate}
                        onWheel={(e) => e.target.blur()} 
                        focused
                      />
                    ) : null}
                    {parentID == "M" ||
                    parentID == "R" ||
                    parentID == "F" ||
                    parentID == "P" ? (
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Latest Rate with GST"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.LateRate}
                        error={!!touched.LateRate && !!errors.LateRate}
                        helperText={touched.LateRate && errors.LateRate}
                        sx={{
                          gridColumn: "span 2",
                          background: "#fff6c3",
                          input: { textAlign: "right" },
                        }}
                        id="LateRate"
                        name="LateRate"
                        focused
                        onWheel={(e) => e.target.blur()} 
                        // InputProps={{ readOnly:true}}
                      />
                    ) : null}
                    {parentID == "L" ? (
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Latest Rate With GST"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.LateRate}
                        error={!!touched.LateRate && !!errors.LateRate}
                        helperText={touched.LateRate && errors.LateRate}
                        sx={{
                          gridColumn: "span 2",
                          background: "#fff6c3",
                          input: { textAlign: "right" },
                        }}
                        id="LateRate"
                        name="LateRate"
                        focused
                        InputProps={{ readOnly: true }}
                      />
                    ) : null}
                     <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Family Name"
                      value={values.FamilyName}
                      id="FamilyName"
                      name="FamilyName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        !!touched.FamilyName &&
                        !!errors.FamilyName
                      }
                      helperText={
                        touched.FamilyName &&
                        errors.FamilyName
                      }
                      sx={{ gridColumn: "span 2" }}
                      focused
                      inputProps={{ maxLength: 50}}
                      multiline
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
                   

                    {parentID == "L" || parentID == "LS" ? (
                      <React.Fragment>
                        <FormControl sx={{ gridColumn:{lg:"span 1",md:"span 2", sm: 'span 2'}}}>
                          <Box
                            width={"312px"}
                            display="flex"
                            flexDirection='row'
                            pr={1}
                          >
                            <Box>
                              <Field
                                //  size="small"
                                type="checkbox"
                                name="ByProduct"
                                id="ByProduct"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="ByProduct"
                                checked={values.ByProduct}
                              />

                              <FormLabel focused={false}>By Product</FormLabel>
                            </Box>
                            <Box marginLeft="95px">
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
                          </Box>
                          <Box
                            width={"312px"}
                            display="flex"
                            flexDirection={{ xs: "column", sm: "row" }}
                            pr={1}
                          >
                            <Box>
                              <Field
                                //  size="small"
                                type="checkbox"
                                name="Identflag"
                                id="Identflag"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="Identflag"
                                checked={values.Identflag}
                              />

                              <FormLabel focused={false}>
                                NonIndentMaterial
                              </FormLabel>
                            </Box>
                            <Box marginLeft="35px">
                              <Field
                                //  size="small"
                                type="checkbox"
                                name="ColorVariant"
                                id="ColorVariant"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="ColorVariant"
                                checked={values.ColorVariant}
                              />

                              <FormLabel focused={false}>Color Variant</FormLabel>
                            </Box>
                          </Box>
                        
                        </FormControl>
                        <FormControl sx={{ gridColumn:{lg:"span 1",md:"span 2", sm: 'span 2'}}}>
                          <Box
                            width={"312px"}
                            display="flex"
                            flexDirection='row'
                          >
                            <Box>
                              <Field
                                //  size="small"
                                type="checkbox"
                                name="Rawmaterial"
                                id="Rawmaterial"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="Raw material"
                                checked={false}
                              />

                              <FormLabel focused={false}>
                                Raw material
                              </FormLabel>
                            </Box>
                            <Box marginLeft="80px">
                              <Field
                                //  size="small"
                                type="checkbox"
                                name="Consumable"
                                id="Consumable"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="Consumable"
                                checked={true}
                              />

                              <FormLabel focused={false}>Consumable</FormLabel>
                            </Box>
                          </Box>

                          <Box
                            width={"312px"}
                            display="flex"
                            flexDirection={{ xs: "column", sm: "row" }}
                          >
                            <Box>
                              <Field
                                //  size="small"
                                type="checkbox"
                                name="DesignApp"
                                id="DesignApp"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="Design Pattern Applicable"
                                checked={true}
                              />

                              <FormLabel focused={false}>
                                Design Pattern Applicable
                              </FormLabel>
                            </Box>
                            <Box marginLeft="10px">
                              <Field
                                type="checkbox"
                                name="Sellable"
                                id="Sellable"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="Sellable"
                                checked={true}
                              />

                              <FormLabel focused={false}>Sellable</FormLabel>
                            </Box>
                          </Box>                   
                        </FormControl>
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                    {parentID == "P" ? (
                      <React.Fragment>
                        <FormControl sx={{ gridColumn:{lg:"span 1",md:"span 2", sm: 'span 2'}}}>
                          <Box
                            width={"312px"}
                            display="flex"
                           flexDirection='row'
                          >
                            <Box>
                              <Field
                                type="checkbox"
                                name="Rawmaterial"
                                id="Rawmaterial"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="Raw material"
                                checked={false}
                              />

                              <FormLabel focused={false}>
                                Raw material
                              </FormLabel>
                            </Box>
                            <Box marginLeft="80px">
                              <Field
                                //  size="small"
                                type="checkbox"
                                name="Consumable"
                                id="Consumable"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="Consumable"
                                checked={true}
                              />

                              <FormLabel focused={false}>Consumable</FormLabel>
                            </Box>
                          </Box>

                          <Box
                            width={"312px"}
                            display="flex"
                            flexDirection={{ xs: "column", sm: "row" }}
                          >
                            <Box>
                              <Field
                                //  size="small"
                                type="checkbox"
                                name="DesignApp"
                                id="DesignApp"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="Design Pattern Applicable"
                                checked={true}
                              />

                              <FormLabel focused={false}>
                                Design Pattern Applicable
                              </FormLabel>
                            </Box>
                            <Box marginLeft="10px">
                              <Field
                                type="checkbox"
                                name="Sellable"
                                id="Sellable"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="Sellable"
                                checked={true}
                              />

                              <FormLabel focused={false}>Sellable</FormLabel>
                            </Box>
                          </Box>
                        </FormControl>
                        <FormControl sx={{ gridColumn:{lg:"span 1",md:"span 2", sm: 'span 2'}}}>

                          <Box
                            width={"312px"}
                            display="flex"
                           flexDirection='row'
                            pr={1}
                          >
                            <Box>
                              <Field
                                //  size="small"
                                type="checkbox"
                                name="ByProduct"
                                id="ByProduct"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="ByProduct"
                                checked={values.ByProduct}
                              />

                              <FormLabel focused={false}>By-Product</FormLabel>
                            </Box>
                            <Box marginLeft="95px">
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
                          </Box>
                          <Box
                            width={"312px"}
                            display="flex"
                            flexDirection={{ xs: "column", sm: "row" }}
                            pr={1}
                          >
                            <Box>
                              <Field
                                //  size="small"
                                type="checkbox"
                                name="Identflag"
                                id="Identflag"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="Identflag"
                                checked={values.Identflag}
                              />

                              <FormLabel focused={false}>
                                Non Indent Material
                              </FormLabel>
                            </Box>
                            
                            <Box marginLeft="35px">
                              <Field
                                //  size="small"
                                type="checkbox"
                                name="ColorVariant"
                                id="checkbox"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="Color Variant"
                                checked={values.ColorVariant}
                              />

                              <FormLabel focused={false}>Color Variant</FormLabel>
                            </Box>
                          </Box>
                        </FormControl>
                      </React.Fragment>
                    ) : (
                      ""
                    )}

                    {parentID == "R" ? (
                      <React.Fragment>
                        <FormControl sx={{ gridColumn:{lg:"span 1",md:"span 2", sm: 'span 2'}}}>
                          <Box
                            width={"312px"}
                            display="flex"
                           flexDirection='row'
                          >
                            <Box>
                              <Field
                                type="checkbox"
                                name="Rawmaterial"
                                id="Rawmaterial"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="Raw material"
                                checked={false}
                              />

                              <FormLabel focused={false}>
                                Raw material
                              </FormLabel>
                            </Box>
                            <Box marginLeft="80px">
                              <Field
                                type="checkbox"
                                name="Consumable"
                                id="Consumable"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="Consumable"
                                checked={false}
                              />

                              <FormLabel focused={false}>Consumable</FormLabel>
                            </Box>
                          </Box>

                          <Box
                            width={"312px"}
                            display="flex"
                            flexDirection={{ xs: "column", sm: "row" }}
                          >
                            <Box>
                              <Field
                                //  size="small"
                                type="checkbox"
                                name="DesignApp"
                                id="DesignApp"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="Design Pattern Applicable"
                                checked={true}
                              />

                              <FormLabel focused={false}>
                                Design Pattern Applicable
                              </FormLabel>
                            </Box>
                            <Box marginLeft="10px">
                              <Field
                                type="checkbox"
                                name="Sellable"
                                id="Sellable"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="Sellable"
                                checked={false}
                                //  sx={{paddingRight:{xs:"19px",md:'19px'}}}
                              />

                              <FormLabel focused={false}>Sellable</FormLabel>
                            </Box>
                          </Box>

                        </FormControl>
                        <FormControl sx={{ gridColumn:{lg:"span 1",md:"span 2", sm: 'span 2'}}}>

                          <Box
                            width={"312px"}
                            display="flex"
                           flexDirection='row'
                            pr={1}
                          >
                            <Box>
                              <Field
                                type="checkbox"
                                name="ByProduct"
                                id="ByProduct"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="ByProduct"
                                checked={values.ByProduct}
                              />

                              <FormLabel focused={false}>By-Product</FormLabel>
                            </Box>
                            <Box marginLeft="95px">
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
                          </Box>
                          <Box
                            width={"312px"}
                            display="flex"
                            flexDirection={{ xs: "column", sm: "row" }}
                            pr={1}
                          >
                            <Box>
                              <Field
                                //  size="small"
                                type="checkbox"
                                name="Identflag"
                                id="Identflag"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="Identflag"
                                checked={values.Identflag}
                              />

                              <FormLabel focused={false}>
                                Non Indent Material
                              </FormLabel>
                            </Box>
                            <Box marginLeft="35px">
                              <Field
                                //  size="small"
                                type="checkbox"
                                name="ColorVariant"
                                id="checkbox"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="Color Variant"
                                checked={values.ColorVariant}
                              />

                              <FormLabel focused={false}>Color Variant</FormLabel>
                            </Box>
                          </Box>
                        </FormControl>
                      </React.Fragment>
                    ) : (
                      ""
                    )}

                    {parentID == "M"  ? (
                      <React.Fragment>
                        <FormControl sx={{ gridColumn:{lg:"span 1",md:"span 2", sm: 'span 2'}}}>
                          <Box
                            width={"312px"}
                            display="flex"
                            flexDirection='row'
                          >
                            <Box>
                              <Field
                                //  size="small"
                                type="checkbox"
                                name="Rawmaterial"
                                id="Rawmaterial"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="Raw Material"
                                checked={values.Rawmaterial}
                              />

                              <FormLabel focused={false}>
                                Raw Material
                              </FormLabel>
                            </Box>

                            <Box marginLeft="80px">
                              <Field
                                //  size="small"
                                type="checkbox"
                                name="Consumable"
                                id="Consumable"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="Consumable"
                                checked={values.Consumable}
                              />

                              <FormLabel focused={false}>Consumable</FormLabel>
                            </Box>
                          </Box>

                          <Box
                            width={"312px"}
                            display="flex"
                            flexDirection='row'
                            pr={1}
                          >
                            <Box>
                              <Field
                                type="checkbox"
                                name="DesignApp"
                                id="DesignApp"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="Design Pattern Applicable"
                                checked={values.DesignApp}
                                disabled
                              />

                              <FormLabel focused={false}>
                                Design Pattern Applicable
                              </FormLabel>
                            </Box>

                            <Box marginLeft="10px">
                              <Field
                                //  size="small"
                                type="checkbox"
                                name="Sellable"
                                id="Sellable"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="Sellable"
                                checked={values.Sellable}
                              />

                              <FormLabel focused={false}>Sellable</FormLabel>
                            </Box>
                          </Box>

                        </FormControl>
                        <FormControl sx={{ gridColumn:{lg:"span 1",md:"span 2", sm: 'span 2'}}}>
                          <Box
                            width={"312px"}
                            display="flex"
                            flexDirection='row'
                            pr={1}
                          >
                            <Box>
                              <Field
                                //  size="small"
                                type="checkbox"
                                name="ByProduct"
                                id="ByProduct"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="ByProduct"
                                checked={values.ByProduct}
                              />

                              <FormLabel focused={false}>By-Product</FormLabel>
                            </Box>
                            <Box marginLeft="83px">
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
                          </Box>

                          <Box
                            width={"312px"}
                            display="flex"
                            flexDirection='row'
                            pr={1}
                          >
                            <Box>
                              <Field
                                //  size="small"
                                type="checkbox"
                                name="Identflag"
                                id="Identflag"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="Identflag"
                                checked={values.Identflag}
                              />

                              <FormLabel focused={false}>
                                Non Indent Material
                              </FormLabel>
                            </Box>
                            <Box marginLeft="35px">
                              <Field
                                //  size="small"
                                type="checkbox"
                                name="ColorVariant"
                                id="checkbox"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as={Checkbox}
                                label="Color Variant"
                                checked={values.ColorVariant}
                              />

                              <FormLabel focused={false}>Color Variant</FormLabel>
                            </Box>
                            </Box>

                        </FormControl>
                      </React.Fragment>
                    ) : (''
                    //   <FormControl sx={{ gridColumn:'span 4'}}>
                    //   <Box
                    //     width={"312px"}
                    //     display="flex"
                    //     flexDirection='row'
                    //   >
                    //     <Box>
                    //       <Field
                    //         //  size="small"
                    //         type="checkbox"
                    //         name="Rawmaterial"
                    //         id="Rawmaterial"
                    //         onChange={handleChange}
                    //         onBlur={handleBlur}
                    //         as={Checkbox}
                    //         label="Raw Material"
                    //         checked={values.Rawmaterial}
                    //       />

                    //       <FormLabel focused={false}>
                    //         Raw Material
                    //       </FormLabel>
                    //     </Box>

                    //     <Box marginLeft="80px">
                    //       <Field
                    //         //  size="small"
                    //         type="checkbox"
                    //         name="Consumable"
                    //         id="Consumable"
                    //         onChange={handleChange}
                    //         onBlur={handleBlur}
                    //         as={Checkbox}
                    //         label="Consumable"
                    //         checked={values.Consumable}
                    //       />

                    //       <FormLabel focused={false}>Consumable</FormLabel>
                    //     </Box>
                    //   </Box>

                    //   <Box
                    //     width={"312px"}
                    //     display="flex"
                    //     flexDirection='row'
                    //     pr={1}
                    //   >
                    //     <Box>
                    //       <Field
                    //         type="checkbox"
                    //         name="DesignApp"
                    //         id="DesignApp"
                    //         onChange={handleChange}
                    //         onBlur={handleBlur}
                    //         as={Checkbox}
                    //         label="Design Pattern Applicable"
                    //         checked={values.DesignApp}
                    //         disabled
                    //       />

                    //       <FormLabel focused={false}>
                    //         Design Pattern Applicable
                    //       </FormLabel>
                    //     </Box>

                    //     <Box marginLeft="10px">
                    //       <Field
                    //         //  size="small"
                    //         type="checkbox"
                    //         name="Sellable"
                    //         id="Sellable"
                    //         onChange={handleChange}
                    //         onBlur={handleBlur}
                    //         as={Checkbox}
                    //         label="Sellable"
                    //         checked={values.Sellable}
                    //       />

                    //       <FormLabel focused={false}>Sellable</FormLabel>
                    //     </Box>
                    //   </Box>

                    // </FormControl>
                    )}

                    {parentID == "S" ? (
                      <React.Fragment>
                        <FormControl sx={{ gridColumn: "span 4" }}>
                          <Box>
                            <Field
                              //  size="small"
                              type="checkbox"
                              name="ByProduct"
                              id="ByProduct"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              as={Checkbox}
                              label="ByProduct"
                              checked={values.ByProduct}
                            />

                            <FormLabel focused={false}>By Product</FormLabel>
                          </Box>
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
                      </React.Fragment>
                    ) : (
                      ""
                    )}

                <Box display="flex" justifyContent="end" mt="20px" gap={2}  sx={{ gridColumn: {md:"span 4",lg:'span 2'},pt:3, pb:3 }}>
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
                      color="warning"
                      variant="contained"
                      onClick={() =>
                        navigate(
                          `/Apps/Secondarylistview/TR004/List%20of%20Materials/${headerid}/${parentID}/${Descriptionval}/${searchPharse}/pm`
                        )
                      }
                    >
                      Cancel
                    </Button>
                  </Box>
                  </Box>
                 
                  <Popup
                    title="Purchase UOM"
                    openPopup={openPURPopup}
                    setOpenPopup={setOpenPURPopup}
                  >
                    {parentID == "S" || parentID == "L" ? (
                      <Listviewpopup
                        accessID="2005"
                        screenName="Purchase UOM"
                        childToParent={childToParent}
                        filterName={filterName}
                        filterValue={filterValue}
                      />
                    ) : parentID == "M" ? (
                      <Listviewpopup
                        accessID="2005"
                        screenName="Purchase UOM"
                        filterName={filterName}
                        filterValue={filterValue}
                        childToParent={childToParent}
                      />
                    ) : parentID == "R" ? (
                      <Listviewpopup
                        accessID="2005"
                        screenName="Purchase UOM"
                        filterName={filterName}
                        filterValue={values.uomConversionType}
                        childToParent={childToParent}
                      />
                    ) : (
                      <Listviewpopup
                        accessID="2005"
                        screenName="Purchase UOM"
                        filterName={filterName}
                        filterValue={filterValue}
                        childToParent={childToParent}
                      />
                    )}
                  </Popup>
                  <Popup
                    title="Consumption UOM"
                    openPopup={openCONPopup}
                    setOpenPopup={setOpenCONPopup}
                  >
                    {parentID == "S" || parentID == "L" ? (
                      <Listviewpopup
                        accessID="2005"
                        screenName="Consumption UOM"
                        childToParent={childToParent}
                        filterName={filterName}
                        filterValue={filterValue}
                      />
                    ) : parentID == "M" ? (
                      <Listviewpopup
                        accessID="2005"
                        screenName="Consumption UOM"
                        filterName={filterName}
                        filterValue={filterValue}
                        childToParent={childToParent}
                      />
                    ) : parentID == "R" ? (
                      <Listviewpopup
                        accessID="2005"
                        screenName="Consumption UOM"
                        filterName={filterName}
                        filterValue={values.uomConversionType}
                        childToParent={childToParent}
                      />
                    ) : (
                      <Listviewpopup
                        accessID="2005"
                        screenName="Consumption UOM"
                        filterName={filterName}
                        filterValue={filterValue}
                        childToParent={childToParent}
                        comUomNum={parentID == "P" ? true : false}
                      />
                    )}
                  </Popup>
                </form>
              )}
            </Formik>

            <Popup
              title="Material Category"
              openPopup={openSMPopup}
              setOpenPopup={setOpenSMPopup}
            >
              <Listviewpopup
                accessID="2011"
                screenName="Material Category"
                childToParent={childToParent}
              />
            </Popup>

            {/* inventory uom */}
            <Popup
              title="Inventory UOM"
              openPopup={openITUPopup}
              setOpenPopup={setOpenITUPopup}
            >
              {parentID == "S" || parentID == "L" || parentID == "R" ? (
                <Listviewpopup
                  accessID="2005"
                  screenName="Inventory UOM"
                  childToParent={childToParent}
                  filterName={filterName}
                  filterValue={filterValue}
                />
              ) : parentID == "M" ? (
                <Listviewpopup
                  accessID="2005"
                  screenName="Inventory UOM"
                  childToParent={childToParent}
                />
              ) : (
                ""
              )}
            </Popup>
            <Popup
              title="Color"
              openPopup={openCOLPopup}
              setOpenPopup={setOpenCOLPopup}
            >
              <Listviewpopup
                accessID="2007"
                screenName="Color"
                childToParent={childToParent}
                filterName="parentID"
                filterValue={
                  parentID === "R" ? "M" : parentID === "LS" ? "L" : parentID
                }
              />
            </Popup>
            <Popup
              title="Color Shades"
              openPopup={openCSPopup}
              setOpenPopup={setOpenCSPopup}
            >
              <Listviewpopup
                accessID="2044"
                screenName="Color Shades"
                childToParent={childToParent}
                filterName="parentID"
                filterValue={selectcolLookupData.COLlookupRecordid}
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
            <Popup
              title="HSN"
              openPopup={openHSNPopup}
              setOpenPopup={setOpenHSNPopup}
            >
              <Listviewpopup
                accessID="2040"
                screenName="HSN"
                childToParent={childToParent}
              />
            </Popup>
          </Box>
        ) : (
          false
        )}

        {show == "1" ? (
          <Box m="20px">
            <Formik
              // onSubmit={handleFormSubmit}
              initialValues={initialValues}
              enableReinitialize={true}
              // validationSchema={basicSchema}
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
                        id="MaterialCode"
                        name="MaterialCode"
                        label="Code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.MaterialCode}
                        error={!!touched.MaterialCode && !!errors.MaterialCode}
                        helperText={touched.MaterialCode && errors.MaterialCode}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        inputProps={{ maxLength: 10, readOnly: true }}
                      />
                      {parentID == "P" && searchPharse == "CA" ? (
                        <FormControl
                          fullWidth
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "20px",
                          }}
                        >
                          <TextField
                            name="Length"
                            type="number"
                            id="Length"
                            label="Length"
                            variant="filled"
                            value={values.Length}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            focused
                            onWheel={(e) => e.target.blur()} 
                            required
                            fullWidth
                            sx={{ background: "#fff6c3" }}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right" },
                              },
                            }}
                            onInvalid={(e) => {
                              e.target.setCustomValidity(
                                "Please Fill The Length"
                              );
                            }}
                            onInput={(e) => {
                              e.target.setCustomValidity("");
                            }}
                          />
                          <TextField
                            name="Width"
                            type="number"
                            id="Width"
                            label="Width"
                            variant="filled"
                            value={values.Width}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            focused
                            onWheel={(e) => e.target.blur()} 
                            required
                            fullWidth
                            sx={{ background: "#fff6c3" }}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right" },
                              },
                            }}
                            onInvalid={(e) => {
                              e.target.setCustomValidity(
                                "Please Fill The Breadth"
                              );
                            }}
                            onInput={(e) => {
                              e.target.setCustomValidity("");
                            }}
                          />
                          <TextField
                            name="height"
                            type="number"
                            id="height"
                            label="Height"
                            variant="filled"
                            value={values.height}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            focused
                            onWheel={(e) => e.target.blur()} 
                            required
                            sx={{ background: "#fff6c3" }}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right" },
                              },
                            }}
                            fullWidth
                            onInvalid={(e) => {
                              e.target.setCustomValidity(
                                "Please Fill The Height"
                              );
                            }}
                            onInput={(e) => {
                              e.target.setCustomValidity("");
                            }}
                          />
                        </FormControl>
                      ) : (
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Description"
                          required
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            !!touched.MaterialDescription &&
                            !!errors.MaterialDescription
                          }
                          helperText={
                            touched.MaterialDescription &&
                            errors.MaterialDescription
                          }
                          sx={{ gridColumn: "span 2" }}
                          id="MaterialDescription"
                          name="MaterialDescription"
                          value={values.MaterialDescription}
                          focused
                          inputProps={{
                            maxLength: 50,
                            readOnly: parentID === "L" ? true : false,
                          }}
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
                      )}

                      <Box m="5px">
                        <Box
                          height={{ xs: "37vh", md: "57vh" }}
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
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Invoice No"
                        id="InvoiceNo"
                        value={matsupdata.invoiceNo}
                        name="InvoiceNo"
                        focused
                        inputProps={{ readOnly: true }}
                      />
                    </FormControl>
                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <Formik
                        innerRef={ref}
                        initialValues={supmasterInitialvalues}
                        onSubmit={(values, { resetForm }) => {
                          setTimeout(() => {
                            fnMatsupplier(values, resetForm, false);
                          }, 100);
                        }}
                        validationSchema={matsupplierSchema}
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
                              fullWidth
                            >
                              <TextField
                                id="outlined-basic"
                                label="ID"
                                variant="filled"
                                value={selectsupLookupData.SUPlookupRecordid}
                                focused
                                sx={{ display: "none" }}
                              />

                              <FormControl
                                sx={{
                                  gridColumn: "span 2",
                                  display: "flex",
                                }}
                              >
                                {/* <FormLabel>Supply Master</FormLabel> */}
                                <FormControl
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginTop: "230px",
                                  }}
                                >
                                  <TextField
                                    id="outlined-basic"
                                    label="Supply Master"
                                    variant="filled"
                                    value={selectsupLookupData.SUPlookupCode}
                                    focused
                                    required
                                    inputProps={{ tabIndex: "-1" }}
                                  />
                                  <IconButton
                                    sx={{ height: 40, width: 40 }}
                                    onClick={() => handleShow("SUP")}
                                  >
                                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                  </IconButton>
                                  {/* <MoreHorizIcon  onClick={()=>handleShow('SUP')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                                  <TextField
                                    id="outlined-basic"
                                    variant="filled"
                                    value={selectsupLookupData.SUPlookupDesc}
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
                                label="Approved Price"
                                id="ApprovedPrice"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.ApprovedPrice}
                                name="ApprovedPrice"
                                error={
                                  !!touched.ApprovedPrice &&
                                  !!errors.ApprovedPrice
                                }
                                helperText={
                                  touched.ApprovedPrice && errors.ApprovedPrice
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
                                onInvalid={(e) => {
                                  e.target.setCustomValidity(
                                    "Please Fill The Approved Price"
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
                                label="Reorder Quantity"
                                id="ReorderQty"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.ReorderQty}
                                name="ReorderQty"
                                error={
                                  !!touched.ReorderQty && !!errors.ReorderQty
                                }
                                helperText={
                                  touched.ReorderQty && errors.ReorderQty
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
                                onInvalid={(e) => {
                                  e.target.setCustomValidity(
                                    "Please Fill The Reorder Quantity"
                                  );
                                }}
                                onInput={(e) => {
                                  e.target.value = Math.max(
                                    0,
                                    parseInt(e.target.value)
                                  )
                                    .toString()
                                    .slice(0, 11);
                                  e.target.setCustomValidity("");
                                }}
                              />
                              <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Lead time"
                                id="LeadTime"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.LeadTime}
                                name="LeadTime"
                                error={!!touched.LeadTime && !!errors.LeadTime}
                                helperText={touched.LeadTime && errors.LeadTime}
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
                                onInput={(e) => {
                                  e.target.value = Math.max(
                                    0,
                                    parseInt(e.target.value)
                                  )
                                    .toString()
                                    .slice(0, 11);
                                }}
                              />
                              <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Rating"
                                id="Ratingormark"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Ratingormark}
                                name="Ratingormark"
                                error={
                                  !!touched.Ratingormark &&
                                  !!errors.Ratingormark
                                }
                                helperText={
                                  touched.Ratingormark && errors.Ratingormark
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
                                onInput={(e) => {
                                  e.target.setCustomValidity("");
                                }}
                              />
                              <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Latest Price"
                                id="LatestPrice"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.LatestPrice}
                                name="LatestPrice"
                                error={
                                  !!touched.LatestPrice && !!errors.LatestPrice
                                }
                                helperText={
                                  touched.LatestPrice && errors.LatestPrice
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
                                onInput={(e) => {
                                  e.target.setCustomValidity("");
                                }}
                              />
                              <TextField
                                fullWidth
                                variant="filled"
                                type="date"
                                label="Latest Purchase Date"
                                id="LatestPurchaseDate"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.LatestPurchaseDate}
                                name="LatestPurchaseDate"
                                //  error={!!touched.latestPurchaseDate && !!errors.latestPurchaseDate}
                                //  helperText={touched.latestPurchaseDate && errors.latestPurchaseDate}
                                sx={{ gridColumn: "span 2" }}
                                focused
                                inputFormat="YYYY-MM-DD"
                                inputProps={{ maxLength: 11 }}
                              />
                              <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Latest Purchase Quantity"
                                id="LatestPurchaseQty"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.LatestPurchaseQty}
                                name="LatestPurchaseQty"
                                error={
                                  !!touched.LatestPurchaseQty &&
                                  !!errors.LatestPurchaseQty
                                }
                                helperText={
                                  touched.LatestPurchaseQty &&
                                  errors.LatestPurchaseQty
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
                                onInput={(e) => {
                                  e.target.value = Math.max(
                                    0,
                                    parseInt(e.target.value)
                                  )
                                    .toString()
                                    .slice(0, 11);
                                }}
                              />

                              <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Location"
                                id="Location"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Location}
                                name="Location"
                                error={!!touched.Location && !!errors.Location}
                                helperText={touched.Location && errors.Location}
                                sx={{ gridColumn: "span 2" }}
                                focused
                                inputProps={{ maxLength: 50 }}
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
                                onInput={(e) => {
                                  e.target.value = Math.max(
                                    0,
                                    parseInt(e.target.value)
                                  )
                                    .toString()
                                    .slice(0, 11);
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
                                    fnMatsupplier(values, resetForm, true);
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
                                  // dispatch(
                                  //   fetchApidata(accessID, "get", recID)
                                  // );
                                }}
                              >
                                Cancel
                              </Button>
                            </Box>
                            <Popup
                              title="Supplier"
                              openPopup={openSUPPopup}
                              setOpenPopup={setOpenSUPPopup}
                            >
                              <Listviewpopup
                                accessID="2017"
                                screenName="Supplier"
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
        {show == "3" ? (
          <Box m="20px">
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
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      id="MaterialCode"
                      name="MaterialCode"
                      label="Code"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.MaterialCode}
                      error={!!touched.MaterialCode && !!errors.MaterialCode}
                      helperText={touched.MaterialCode && errors.MaterialCode}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      inputProps={{ maxLength: 10, readOnly: true }}
                    />
                    {parentID == "P" && searchPharse == "CA" ? (
                      <FormControl
                        fullWidth
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "20px",
                        }}
                      >
                        <TextField
                          name="Length"
                          type="number"
                          id="Length"
                          label="Length"
                          variant="filled"
                          value={values.Length}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          focused
                          required
                          fullWidth
                          sx={{ background: "#fff6c3" }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Length"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                        <TextField
                          name="Width"
                          type="number"
                          id="Width"
                          label="Width"
                          variant="filled"
                          value={values.Width}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          focused
                          required
                          fullWidth
                          sx={{ background: "#fff6c3" }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Breadth"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                        <TextField
                          name="height"
                          type="number"
                          id="height"
                          label="Height"
                          variant="filled"
                          value={values.height}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          focused
                          required
                          sx={{ background: "#fff6c3" }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          fullWidth
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Height"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                      </FormControl>
                    ) : (
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Description"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={
                          !!touched.MaterialDescription &&
                          !!errors.MaterialDescription
                        }
                        helperText={
                          touched.MaterialDescription &&
                          errors.MaterialDescription
                        }
                        sx={{ gridColumn: "span 2" }}
                        id="MaterialDescription"
                        name="MaterialDescription"
                        value={values.MaterialDescription}
                        focused
                        inputProps={{
                          maxLength: 50,
                          readOnly: parentID === "L" ? true : false,
                        }}
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
                    )}

                    <Box m="5px" sx={{ gridColumn: "span 2" }}>
                      <Box
                        height={{ xs: "45vh", md: "65vh" }}
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
                          }}
                          components={{
                            Toolbar: ProcessCustombar,
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

                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <Formik
                        innerRef={ref}
                        initialValues={supmasterInitialvalues}
                        onSubmit={(values, { resetForm }) => {
                          setTimeout(() => {
                            fnMatprocess(values, resetForm, false);
                            // alert("hai");
                          }, 100);
                        }}
                        validationSchema={matsupplierSchema}
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
                              fullWidth
                            >
                              <TextField
                                id="outlined-basic"
                                label="ID"
                                variant="filled"
                                value={selectPROLookupData.PROlookupRecordid}
                                focused
                                sx={{ display: "none" }}
                              />

                              <FormControl
                                sx={{
                                  gridColumn: "span 2",
                                  display: "flex",
                                }}
                              >
                                {/* <FormLabel>Supply Master</FormLabel> */}
                                <FormControl
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginTop: "40px",
                                  }}
                                >
                                  <TextField
                                    id="outlined-basic"
                                    label="Process"
                                    variant="filled"
                                    value={selectPROLookupData.PROlookupCode}
                                    focused
                                    required
                                    inputProps={{ tabIndex: "-1" }}
                                  />
                                  <IconButton
                                    sx={{ height: 40, width: 40 }}
                                    onClick={() => handleShow("PRO")}
                                  >
                                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                  </IconButton>
                                  {/* <MoreHorizIcon  onClick={()=>handleShow('SUP')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                                  <TextField
                                    id="outlined-basic"
                                    variant="filled"
                                    value={selectPROLookupData.PROlookupDesc}
                                    fullWidth
                                    inputProps={{ tabIndex: "-1" }}
                                    focused
                                  />
                                </FormControl>
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
                                    fnMatprocess(values, resetForm, true);
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
                                  // dispatch(
                                  //   fetchApidata(accessID, "get", recID)
                                  // );
                                }}
                              >
                                Cancel
                              </Button>
                            </Box>
                            <Popup
                              title="Supplier"
                              openPopup={openSUPPopup}
                              setOpenPopup={setOpenSUPPopup}
                            >
                              <Listviewpopup
                                accessID="2017"
                                screenName="Supplier"
                                childToParent={childToParent}
                              />
                            </Popup>
                            <Popup
                              title="Process"
                              openPopup={openPROPopup}
                              setOpenPopup={setOpenPROPopup}
                            >
                              <Listviewpopup
                                accessID="2001"
                                screenName="Process"
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
        {show == 2 ? (
          <Box m="20px" sx={{ m: 2 }}>
            <Formik
              // onSubmit={handleFormSubmit}
              initialValues={stockIntialValue}
              enableReinitialize={ini}
              // validationSchema={basicSchema}
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
                        label="ID"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        // value={values.firstName}
                        // name="firstName"
                        error={!!touched.MaterialCode && !!errors.MaterialCode}
                        helperText={touched.MaterialCode && errors.MaterialCode}
                        id="MaterialCode"
                        name="MaterialCode"
                        value={code}
                        focused
                        sx={{ gridColumn: "span 2" }}
                        inputProps={{ readOnly: true }}
                      />
                      {parentID == "P" && searchPharse == "CA" ? (
                        <FormControl
                          fullWidth
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "20px",
                          }}
                        >
                          <TextField
                            name="Length"
                            type="number"
                            id="Length"
                            label="Length"
                            variant="filled"
                            value={values.Length}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            focused
                            required
                            fullWidth
                            sx={{ background: "#fff6c3" }}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right" },
                              },
                            }}
                            onInvalid={(e) => {
                              e.target.setCustomValidity(
                                "Please Fill The Length"
                              );
                            }}
                            onInput={(e) => {
                              e.target.setCustomValidity("");
                            }}
                          />
                          <TextField
                            name="Width"
                            type="number"
                            id="Width"
                            label="Width"
                            variant="filled"
                            value={values.Width}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            focused
                            required
                            fullWidth
                            sx={{ background: "#fff6c3" }}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right" },
                              },
                            }}
                            onInvalid={(e) => {
                              e.target.setCustomValidity(
                                "Please Fill The Breadth"
                              );
                            }}
                            onInput={(e) => {
                              e.target.setCustomValidity("");
                            }}
                          />
                          <TextField
                            name="height"
                            type="number"
                            id="height"
                            label="Height"
                            variant="filled"
                            value={values.height}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            focused
                            required
                            sx={{ background: "#fff6c3" }}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right" },
                              },
                            }}
                            fullWidth
                            onInvalid={(e) => {
                              e.target.setCustomValidity(
                                "Please Fill The Height"
                              );
                            }}
                            onInput={(e) => {
                              e.target.setCustomValidity("");
                            }}
                          />
                        </FormControl>
                      ) : (
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Description"
                          required
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            !!touched.MaterialDescription &&
                            !!errors.MaterialDescription
                          }
                          helperText={
                            touched.MaterialDescription &&
                            errors.MaterialDescription
                          }
                          sx={{ gridColumn: "span 2" }}
                          id="MaterialDescription"
                          name="MaterialDescription"
                          value={values.MaterialDescription}
                          focused
                          inputProps={{
                            maxLength: 50,
                            readOnly: parentID === "L" ? true : false,
                          }}
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
                      )}
                      {parentID == "L" ? (
                        <>
                          <TextField
                            name="OpenstockTotalsqft"
                            type="number"
                            id="OpenstockTotalsqft"
                            variant="filled"
                            value={values.OpenstockTotalsqft}
                            label="Opening Stock"
                            focused
                            inputProps={{ style: { textAlign: "right" } }}
                            InputProps={{ readOnly: true }}
                            sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                          />
                          <TextField
                            name="RecivedTotalsqft"
                            type="number"
                            id="RecivedTotalsqft"
                            label="Received Qty (In DC)"
                            variant="filled"
                            value={values.RecivedTotalsqft}
                            focused
                            inputProps={{ style: { textAlign: "right" } }}
                            InputProps={{ readOnly: true }}
                            sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                          />

                          <TextField
                            name="IssuedTotalsqft"
                            type="number"
                            id="IssuedTotalsqft"
                            label="Issued Qty(Production + Out DC)"
                            variant="filled"
                            value={values.IssuedTotalsqft}
                            focused
                            inputProps={{ style: { textAlign: "right" } }}
                            InputProps={{ readOnly: true }}
                            sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                          />
                          <Tooltip title="OpeningStock + ReceivedQty - IssueQty">
                            <TextField
                              name="TotalStock"
                              type="number"
                              id="TotalStock"
                              label="Available Stock"
                              variant="filled"
                              value={values.TotalStock}
                              focused
                              inputProps={{ style: { textAlign: "right" } }}
                              InputProps={{ readOnly: true }}
                              sx={{
                                gridColumn: "span 2",
                                background: "#FFDAC0",
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="Requirement Qty - Batchissue Qty">
                            <TextField
                              name="RequirementStockQty"
                              type="number"
                              id="RequirementStockQty"
                              label="Requirement Qty(Asper ProductionCard)"
                              variant="filled"
                              value={values.RequirementStockQty}
                              focused
                              inputProps={{ style: { textAlign: "right" } }}
                              InputProps={{ readOnly: true }}
                              sx={{
                                gridColumn: "span 2",
                                background: "#fff6c3",
                              }}
                            />
                          </Tooltip>

                          <Tooltip title="Stock-RequirementQty">
                            <TextField
                              name="BALANCE"
                              type="number"
                              id="BALANCE"
                              label="Balance"
                              value={values.BALANCE}
                              variant="filled"
                              focused
                              inputProps={{ style: { textAlign: "right" } }}
                              InputProps={{ readOnly: true }}
                              sx={{
                                gridColumn: "span 2",
                                background: "#FFDAC0",
                              }}
                            />
                          </Tooltip>
                        </>
                      ) : (
                        false
                      )}

                      {parentID == "M" ? (
                        <>
                          <TextField
                            name="OpenStockQty"
                            type="number"
                            id="OpenStockQty"
                            value={values.OpenStockQty}
                            label="Opening Stock"
                            variant="filled"
                            focused
                            inputProps={{ style: { textAlign: "right" } }}
                            InputProps={{ readOnly: true }}
                            sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                          />
                          <TextField
                            name="ReceivedStockQty"
                            type="number"
                            id="ReceivedStockQty"
                            label="Received Qty (In DC)"
                            variant="filled"
                            value={values.ReceivedStockQty}
                            focused
                            inputProps={{ style: { textAlign: "right" } }}
                            InputProps={{ readOnly: true }}
                            sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                          />

                          <TextField
                            name="IssuedStockQty"
                            type="number"
                            id="IssuedStockQty"
                            label="Issued Qty(Production + Out DC)"
                            variant="filled"
                            value={values.IssuedStockQty}
                            focused
                            inputProps={{ style: { textAlign: "right" } }}
                            InputProps={{ readOnly: true }}
                            sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                          />
                          <Tooltip title="Opening Stock + Received Qty - Issue Qty">
                            <TextField
                              name="Stock"
                              type="number"
                              id="Stock"
                              label="Available Stock"
                              variant="filled"
                              value={values.Stock}
                              focused
                              inputProps={{ style: { textAlign: "right" } }}
                              InputProps={{ readOnly: true }}
                              sx={{
                                gridColumn: "span 2",
                                background: "#FFDAC0",
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="Requirement Qty - Batchissue Qty">
                            <TextField
                              name="RequirementStockQty"
                              type="number"
                              id="RequirementStockQty"
                              label="Requirement Qty(as per Production Card)"
                              variant="filled"
                              value={values.RequirementStockQty}
                              focused
                              inputProps={{ style: { textAlign: "right" } }}
                              InputProps={{ readOnly: true }}
                              sx={{
                                gridColumn: "span 2",
                                background: "#fff6c3",
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="Stock-RequirementQty">
                            <TextField
                              name="BALANCE"
                              type="number"
                              id="BALANCE"
                              label="Effective Stock"
                              value={values.BALANCE}
                              variant="filled"
                              focused
                              inputProps={{ style: { textAlign: "right" } }}
                              InputProps={{ readOnly: true }}
                              sx={{
                                gridColumn: "span 2",
                                background: "#FFDAC0",
                              }}
                            />
                          </Tooltip>
                        </>
                      ) : (
                        false
                      )}
                    </FormControl>

                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <Stack
                        sx={{
                          gridColumn: "span 2",
                          alignContent: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                          right: "0px",
                        }}
                      >
                        <img
                          src={userimg}
                          style={{
                            width: "200px",
                            height: "150px",
                          }}
                        />
                      </Stack>
                      {values.OpenStockDate !== "0" ? (
                        <TextField
                          name="OpenStockDate"
                          type="Date"
                          id="OpenStockDate"
                          value={values.OpenStockDate}
                          label="Opening Stock Date"
                          variant="filled"
                          focused
                          inputFormat="YYYY-MM-DD"
                          // inputProps={{style: { textAlign: 'right' }}}
                          InputProps={{ readOnly: true }}
                          // sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                        />
                      ) : (
                        false
                      )}
                    </FormControl>
                  </Box>
                  {/* {parentID == "L" ?
                    
    //                      <Box
    //                     display="grid"
    //                     gridTemplateColumns="repeat(4 , minMax(0,1fr))"
    //                     gap="30px"
    //                     mt={3}
    //                     sx={{
    //                       "& > div": {
    //                         gridColumn: isNonMobile ? undefined : "span 4",
    //                       },
    //                     }}
    //                   >
                      
                    
    //                  <TableContainer component={Paper} sx={{gridColumn:'span 4',backgroundColor:'#EDEDED'}}>
    //   <Table  aria-label="simple table">
    //     <TableHead >
    //       <TableRow>
    //         <TableCell sx={{color:"#1976D2"}}>Description</TableCell>
    //         <TableCell sx={{color:"#1976D2"}} align="center">Hide Quantity</TableCell>
    //         <TableCell sx={{color:"#1976D2"}} align="center">Hide Sqft</TableCell>
    //         <TableCell sx={{color:"#1976D2"}} align="center">Side Quantity</TableCell>
    //         <TableCell sx={{color:"#1976D2"}} align="center">Side Sqft</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
          
    //         <TableRow
    //           // key={row.name}
    //           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //         >
    //           <TableCell sx={{color:"#1976D2" }} component="th" scope="row">
    //             Opening Stock
    //           </TableCell>
    //           <TableCell  align="right">{values.OpenStockHideQty}</TableCell>
    //           <TableCell align="right">{values.OpenStockHideSqft}</TableCell>
    //           <TableCell align="right">{values.OpenStockSideQty}</TableCell>
    //           <TableCell align="right">{values.OpenStockSideSqft}</TableCell>
    //         </TableRow>

    //         <TableRow
    //           // key={row.name}
    //           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //         >
    //           <TableCell sx={{color:"#1976D2"}} component="th" scope="row">
    //             Received
    //           </TableCell>
    //           <TableCell  align="right">{values.RecievedStockHideQty}</TableCell>
    //           <TableCell align="right">{values.RecievedStockHideSqft}</TableCell>
    //           <TableCell align="right">{values.RecievedStockSideQty}</TableCell>
    //           <TableCell align="right">{values.RecievedStockSideSqft}</TableCell>
    //         </TableRow>
    //         <TableRow
    //           // key={row.name}
    //           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //         >
    //           <TableCell sx={{color:"#1976D2"}} component="th" scope="row">
    //             Issued
    //           </TableCell>
    //           <TableCell  align="right">{values.IssuedStockHideQty}</TableCell>
    //           <TableCell align="right">{values.IssuedStockHideSqft}</TableCell>
    //           <TableCell align="right">{values.IssuedStockSideQty}</TableCell>
    //           <TableCell align="right">{values.IssuedStockSideSqft}</TableCell>
    //         </TableRow>
    //         <TableRow
    //           // key={row.name}
    //           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //         >
    //           <TableCell sx={{color:"#1976D2"}} component="th" scope="row">
    //              Stock
    //           </TableCell>
    //   <Tooltip title="OpeningStockHideQty+ReceivedHideQty-IssueHideQty"><TableCell  align="right">{values.StockHideQty}</TableCell></Tooltip>
    //   <Tooltip title="OpeningStockHideSqft+ReceivedHideSqft-IssueHideSqft"><TableCell align="right">{values.StockHideSqft}</TableCell></Tooltip>
    //   <Tooltip title="OpeningStockSideQty+ReceivedSideQty-IssueSideQty"><TableCell align="right">{values.StockSideQty}</TableCell></Tooltip>
    //   <Tooltip title="StockSideSqft+ReceivedSideSqft-IssueSideSqft"><TableCell align="right">{values.StockSideSqft}</TableCell></Tooltip>
    //         </TableRow>
    //         <TableRow
    //           // key={row.name}
    //           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //         >
    //           <TableCell sx={{color:"#1976D2"}} component="th" scope="row">
                 
    //           </TableCell>
    //           <TableCell  align="right"></TableCell>
    //           <TableCell  align="right"></TableCell>
    //           <TableCell sx={{color:"#1976D2"}} align="right">Requirement Quantity</TableCell>
    //           <TableCell  align="right">{values.RequirementStockQty}</TableCell>
    //         </TableRow>
    //     </TableBody>
    //   </Table>
    // </TableContainer>
   
    // <Box sx={{display:'flex',gridColumn:'span 4',justifySelf:'flex-end',width:{xs:"100%",md:'250px'}}}>
    // <TableContainer component={Paper} sx={{backgroundColor:'#EDEDED',justifyContent:'end'}}>
    //   <Table   aria-label="simple table">
     
    //     <TableBody>
          
            
       
    //         <TableRow
    //           // key={row.name}
    //           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //         >
              
    //           <TableCell sx={{color:"#1976D2"}} component="th" scope="row">
    //              Balance
    //           </TableCell>
    //           <Tooltip title="OpeningStock-RequiermentQty">
    //           <TableCell  align="right">{values.BALANCE}</TableCell>
    //           </Tooltip>
    //         </TableRow>
    //     </TableBody>
    //   </Table>
    // </TableContainer>
    // </Box>
    //                   </Box>
                    :false} */}
                </form>
              )}
            </Formik>
            <Box display="flex" justifyContent="end" mt="20px" gap="20px">
              {/* <Button variant="contained" color="secondary">
    SAVE
</Button> */}
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setScreen(0);
                  dispatch(fetchApidata(accessID, "get", recID));
                }}
              >
                CANCEL
              </Button>
            </Box>
          </Box>
        ) : (
          false
        )}

        {show == "6" ? (
          <Box m="20px">
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
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      id="MaterialCode"
                      name="MaterialCode"
                      label="Code"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={code}
                      error={!!touched.MaterialCode && !!errors.MaterialCode}
                      helperText={touched.MaterialCode && errors.MaterialCode}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      inputProps={{ maxLength: 10, readOnly: true }}
                    />
                    {/* {parentID == "P" && searchPharse == "CA" ? (
                      <FormControl
                        fullWidth
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "20px",
                          gridColumn: "span 2",
                        }}
                      >
                        <TextField
                          name="Length"
                          type="number"
                          id="Length"
                          label="Length"
                          variant="filled"
                          value={values.Length}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          focused
                          required
                          fullWidth
                          sx={{ background: "#fff6c3" }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Length"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                        <TextField
                          name="Width"
                          type="number"
                          id="Width"
                          label="Width"
                          variant="filled"
                          value={values.Width}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          focused
                          required
                          fullWidth
                          sx={{ background: "#fff6c3" }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Breadth"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                        <TextField
                          name="height"
                          type="number"
                          id="height"
                          label="Height"
                          variant="filled"
                          value={values.height}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          focused
                          required
                          sx={{ background: "#fff6c3" }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          fullWidth
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Height"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                      </FormControl>
                    ) : ( */}
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Description"
                      value={desc}
                      id="MaterialDescription"
                      name="MaterialDescription"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        !!touched.MaterialDescription &&
                        !!errors.MaterialDescription
                      }
                      helperText={
                        touched.MaterialDescription &&
                        errors.MaterialDescription
                      }
                      sx={{ gridColumn: "span 2" }}
                      focused
                      inputProps={{ maxLength: 50, readOnly: true }}
                      multiline
                    />
                    {/* )} */}
                  </Box>
                  <Box sx={{ gridColumn: "span 4" }}>
                    <MaterialBarChart RecordID={recID} Type={parentID} />
                  </Box>
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
                        loading={procurementLoading}
                        rows={trackingRowData}
                        columns={Trackincolumns}
                        disableSelectionOnClick
                        getRowId={(row) => row.Id}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) =>
                          setPageSize(newPageSize)
                        }
                        rowsPerPageOptions={[5, 10, 20]}
                        pagination
                        onCellClick={(params) => {
                          const currentRow = params.row;
                          const currentcellField = params.field;
                          //   selectcelldata(currentRow, "E", currentcellField);

                          console.log(JSON.stringify(params));
                        }}
                        components={{
                          Toolbar: TrackingToolbar,
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
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      id="MaterialCode"
                      name="MaterialCode"
                      label="Code"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.MaterialCode}
                      error={!!touched.MaterialCode && !!errors.MaterialCode}
                      helperText={touched.MaterialCode && errors.MaterialCode}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      inputProps={{ maxLength: 10, readOnly: true }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Description"
                      value={values.MaterialDescription}
                      id="MaterialDescription"
                      name="MaterialDescription"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        !!touched.MaterialDescription &&
                        !!errors.MaterialDescription
                      }
                      helperText={
                        touched.MaterialDescription &&
                        errors.MaterialDescription
                      }
                      sx={{ gridColumn: "span 2" }}
                      focused
                      inputProps={{ maxLength: 50, readOnly: true }}
                      multiline
                    />

                    <Box m="5px" sx={{ gridColumn: "span 2" }}>
                      <Box
                        height={{ xs: "45vh", md: "65vh" }}
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
                          }}
                          components={{
                            Toolbar: CapacityCustombar,
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

                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <Formik
                        innerRef={ref}
                        initialValues={matCapInitialValue}
                        onSubmit={(values, { resetForm }) => {
                          setTimeout(() => {
                            materialCAPFn(values, resetForm, false);
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
                          <form onSubmit={handleSubmit}>
                            <FormControl
                              sx={{ gridColumn: "span 2", gap: "40px", mt: 5 }}
                              style={{ width: "100%" }}
                            >
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
                                  label="Customer"
                                  variant="filled"
                                  focused
                                  inputProps={{ tabIndex: "-1" }}
                                  value={customerLookup.cusCode}
                                />
                                <IconButton
                                  onClick={() => handleShow("CUS")}
                                  sx={{ height: 40, width: 40 }}
                                >
                                  <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                </IconButton>
                                <TextField
                                  id="outlined-basic"
                                  variant="filled"
                                  fullWidth
                                  inputProps={{ tabIndex: "-1" }}
                                  value={customerLookup.cusName}
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
                                  label="Product"
                                  variant="filled"
                                  focused
                                  inputProps={{ tabIndex: "-1" }}
                                  value={productLookup.proCode}
                                />
                                <IconButton
                                  onClick={() => handleShow("PROD")}
                                  sx={{ height: 40, width: 40 }}
                                >
                                  <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                </IconButton>
                                <TextField
                                  value={productLookup.proName}
                                  id="outlined-basic"
                                  variant="filled"
                                  fullWidth
                                  inputProps={{ tabIndex: "-1" }}
                                  focused
                                />
                              </Box>

                              <TextField
                                name="maxCapacity"
                                type="number"
                                id="maxCapacity"
                                label="Maximum Capacity"
                                variant="filled"
                                sx={{
                                  gridColumn: "span 2",
                                  background: "#fff6c3",
                                  input: { textAlign: "right" },
                                }}
                                focused
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={Math.floor(
                                  (values.headerHeight *
                                    values.headerLength *
                                    values.headerWidth) /
                                    (productLookup.height *
                                      productLookup.length *
                                      productLookup.width)
                                )}
                              />
                              <TextField
                                name="cusRecomndation"
                                type="number"
                                id="cusRecomndation"
                                label="Customer Recommendation"
                                variant="filled"
                                sx={{
                                  gridColumn: "span 2",
                                  background: "#fff6c3",
                                  input: { textAlign: "right" },
                                }}
                                focused
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.cusRecomndation}
                              />
                              <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Sort Order"
                                id="sortOrder"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.sortOrder}
                                name="sortOrder"
                                sx={{
                                  gridColumn: "span 2",
                                  background: "#fff6c3",
                                  input: { textAlign: "right" },
                                }}
                                focused
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
                              {YearFlag == "true" ? (
                                <Button
                                  color="error"
                                  variant="contained"
                                  onClick={() => {
                                    materialCAPFn(values, resetForm, true);
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
                                  // dispatch(
                                  //   fetchApidata(accessID, "get", recID)
                                  // );
                                }}
                              >
                                Cancel
                              </Button>
                            </Box>
                            <Popup
                              title="Customer"
                              openPopup={openCusPopup}
                              setOpenPopup={setOpenCusPopup}
                            >
                              <Listviewpopup
                                accessID="2009"
                                screenName="Customer"
                                childToParent={childToParent}
                                filterValue={CompanyID}
                                filterName="CompID"
                              />
                            </Popup>
                            <Popup
                              title="Product"
                              openPopup={openProPopup}
                              setOpenPopup={setOpenProPopup}
                            >
                              <Listviewpopup
                                accessID="2027"
                                screenName="Product"
                                childToParent={childToParent}
                                filterValue={customerLookup.cusRecordID}
                                filterName="parentID"
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
        {show == "4" ? (
          <Box m="20px">
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
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      id="MaterialCode"
                      name="MaterialCode"
                      label="Code"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.MaterialCode}
                      error={!!touched.MaterialCode && !!errors.MaterialCode}
                      helperText={touched.MaterialCode && errors.MaterialCode}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      inputProps={{ maxLength: 10, readOnly: true }}
                    />
                    {parentID == "P" && searchPharse == "CA" ? (
                      <FormControl
                        fullWidth
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "20px",
                        }}
                      >
                        <TextField
                          name="Length"
                          type="number"
                          id="Length"
                          label="Length"
                          variant="filled"
                          value={values.Length}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          focused
                          required
                          fullWidth
                          sx={{ background: "#fff6c3" }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Length"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                        <TextField
                          name="Width"
                          type="number"
                          id="Width"
                          label="Width"
                          variant="filled"
                          value={values.Width}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          focused
                          required
                          fullWidth
                          sx={{ background: "#fff6c3" }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Breadth"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                        <TextField
                          name="height"
                          type="number"
                          id="height"
                          label="Height"
                          variant="filled"
                          value={values.height}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          focused
                          required
                          sx={{ background: "#fff6c3" }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          fullWidth
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Height"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                      </FormControl>
                    ) : (
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Description"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={
                          !!touched.MaterialDescription &&
                          !!errors.MaterialDescription
                        }
                        helperText={
                          touched.MaterialDescription &&
                          errors.MaterialDescription
                        }
                        sx={{ gridColumn: "span 2" }}
                        id="MaterialDescription"
                        name="MaterialDescription"
                        value={values.MaterialDescription}
                        focused
                        inputProps={{
                          maxLength: 50,
                          readOnly: parentID === "L" ? true : false,
                        }}
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
                    )}

                    <Box m="5px" sx={{ gridColumn: "span 2" }}>
                      <Box
                        height={{ xs: "45vh", md: "65vh" }}
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
                            Toolbar: ProcessCustombar,
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

                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <Formik
                        innerRef={ref}
                        initialValues={supmasterInitialvalues}
                        onSubmit={(values, { resetForm }) => {
                          setTimeout(() => {
                            fnMatprocess(values, resetForm, "");
                            // alert("hai");
                          }, 100);
                        }}
                        validationSchema={matsupplierSchema}
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
                              fullWidth
                            >
                              <TextField
                                id="outlined-basic"
                                label="ID"
                                variant="filled"
                                value={selectPROLookupData.PROlookupRecordid}
                                focused
                                sx={{ display: "none" }}
                              />

                              <FormControl
                                sx={{
                                  gridColumn: "span 2",
                                  display: "flex",
                                }}
                              >
                                {/* <FormLabel>Supply Master</FormLabel> */}
                                <FormControl
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginTop: "40px",
                                  }}
                                >
                                  <TextField
                                    id="outlined-basic"
                                    label="Process"
                                    variant="filled"
                                    value={selectPROLookupData.PROlookupCode}
                                    focused
                                    required
                                    inputProps={{ tabIndex: "-1" }}
                                  />
                                  <IconButton
                                    sx={{ height: 40, width: 40 }}
                                    onClick={() => handleShow("PRO")}
                                  >
                                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                  </IconButton>
                                  {/* <MoreHorizIcon  onClick={()=>handleShow('SUP')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                                  <TextField
                                    id="outlined-basic"
                                    variant="filled"
                                    value={selectPROLookupData.PROlookupDesc}
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
                                value={selectPROLookupData.PROlookupRecordid}
                                focused
                                sx={{ display: "none" }}
                              />

                              <FormControl
                                sx={{
                                  gridColumn: "span 2",
                                  display: "flex",
                                }}
                              >
                                {/* <FormLabel>Supply Master</FormLabel> */}
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
                                    value={selectPROLookupData.PROlookupCode}
                                    focused
                                    required
                                    inputProps={{ tabIndex: "-1" }}
                                  />
                                  <IconButton
                                    sx={{ height: 40, width: 40 }}
                                    onClick={() => handleShow("PRO")}
                                  >
                                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                  </IconButton>
                                  {/* <MoreHorizIcon  onClick={()=>handleShow('SUP')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                                  <TextField
                                    id="outlined-basic"
                                    variant="filled"
                                    value={selectPROLookupData.PROlookupDesc}
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
                                label="Remarks"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="remarks"
                                value={values.remarks}
                                id="remarks"
                                sx={{ gridColumn: "span 2" }}
                                focused
                              />
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
                                    fnMatprocess(
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
                              )}
                              <Button
                                type="reset"
                                color="warning"
                                variant="contained"
                                onClick={() => {
                                  setScreen(0);
                                  dispatch(
                                    fetchApidata(accessID, "get", recID)
                                  );
                                }}
                              >
                                Cancel
                              </Button>
                            </Box>
                            <Popup
                              title="Supplier"
                              openPopup={openSUPPopup}
                              setOpenPopup={setOpenSUPPopup}
                            >
                              <Listviewpopup
                                accessID="2017"
                                screenName="Supplier"
                                childToParent={childToParent}
                              />
                            </Popup>
                            <Popup
                              title="Process"
                              openPopup={openPROPopup}
                              setOpenPopup={setOpenPROPopup}
                            >
                              <Listviewpopup
                                accessID="2001"
                                screenName="Process"
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
        {show == "7" ? (
          <Box m="20px">
            <Formik
              // onSubmit={handleFormSubmit}
              initialValues={initialValues}
              enableReinitialize={ini}
              validationSchema={basicSchema}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  FnLocationsave(values, resetForm, false);
                }, 100);
              }}
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
                        id="MaterialCode"
                        name="MaterialCode"
                        label="Code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.MaterialCode}
                        error={!!touched.MaterialCode && !!errors.MaterialCode}
                        helperText={touched.MaterialCode && errors.MaterialCode}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        inputProps={{ maxLength: 10, readOnly: true }}
                      />
                      {parentID == "P" && searchPharse == "CA" ? (
                        <FormControl
                          fullWidth
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "20px",
                          }}
                        >
                          <TextField
                            name="Length"
                            type="number"
                            id="Length"
                            label="Length"
                            variant="filled"
                            value={values.Length}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            focused
                            required
                            fullWidth
                            sx={{ background: "#fff6c3" }}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right" },
                              },
                            }}
                            onInvalid={(e) => {
                              e.target.setCustomValidity(
                                "Please Fill The Length"
                              );
                            }}
                            onInput={(e) => {
                              e.target.setCustomValidity("");
                            }}
                          />
                          <TextField
                            name="Width"
                            type="number"
                            id="Width"
                            label="Width"
                            variant="filled"
                            value={values.Width}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            focused
                            required
                            fullWidth
                            sx={{ background: "#fff6c3" }}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right" },
                              },
                            }}
                            onInvalid={(e) => {
                              e.target.setCustomValidity(
                                "Please Fill The Breadth"
                              );
                            }}
                            onInput={(e) => {
                              e.target.setCustomValidity("");
                            }}
                          />
                          <TextField
                            name="height"
                            type="number"
                            id="height"
                            label="Height"
                            variant="filled"
                            value={values.height}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            focused
                            required
                            sx={{ background: "#fff6c3" }}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right" },
                              },
                            }}
                            fullWidth
                            onInvalid={(e) => {
                              e.target.setCustomValidity(
                                "Please Fill The Height"
                              );
                            }}
                            onInput={(e) => {
                              e.target.setCustomValidity("");
                            }}
                          />
                        </FormControl>
                      ) : (
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Description"
                          required
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            !!touched.MaterialDescription &&
                            !!errors.MaterialDescription
                          }
                          helperText={
                            touched.MaterialDescription &&
                            errors.MaterialDescription
                          }
                          sx={{ gridColumn: "span 2" }}
                          id="MaterialDescription"
                          name="MaterialDescription"
                          value={values.MaterialDescription}
                          focused
                          inputProps={{
                            maxLength: 50,
                            readOnly: parentID === "L" ? true : false,
                          }}
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
                      )}

                      <Box m="5px">
                        <Box
                          height={{ xs: "45vh", md: "65vh" }}
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
                            }}
                            components={{
                              Toolbar: Location,
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
                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <Formik
                        innerRef={ref}
                        initialValues={locationInitialvalues}
                        onSubmit={(values, { resetForm }) => {
                          setTimeout(() => {
                            FnLocationsave(values, resetForm, false);
                            // alert("hai");
                          }, 100);
                        }}
                        // validationSchema={matsupplierSchema}
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
                              fullWidth
                            >
                              <TextField
                                id="outlined-basic"
                                label="ID"
                                variant="filled"
                                value={locationLookup.locationRecordID}
                                focused
                                sx={{ display: "none" }}
                              />

                              <FormControl
                                sx={{
                                  gridColumn: "span 2",
                                  display: "flex",
                                }}
                              >
                                {/* <FormLabel>Supply Master</FormLabel> */}
                                <FormControl
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginTop: "230px",
                                  }}
                                >
                                  <TextField
                                    id="outlined-basic"
                                    label="Location Name"
                                    variant="filled"
                                    value={locationLookup.locationCode}
                                    focused
                                    required
                                    inputProps={{ tabIndex: "-1" }}
                                  />
                                  <IconButton
                                    sx={{ height: 40, width: 40 }}
                                    onClick={() => handleShow("LOCATION")}
                                  >
                                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                  </IconButton>
                                  {/* <MoreHorizIcon  onClick={()=>handleShow('SUP')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                                  <TextField
                                    id="outlined-basic"
                                    variant="filled"
                                    value={locationLookup.locationName}
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
                                value={binLookup.binRecordID}
                                focused
                                sx={{ display: "none" }}
                              />

                              <FormControl
                                sx={{
                                  gridColumn: "span 2",
                                  display: "flex",
                                }}
                              >
                                {/* <FormLabel>Supply Master</FormLabel> */}
                                <FormControl
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
                                >
                                  <TextField
                                    id="outlined-basic"
                                    label="Bin Name"
                                    variant="filled"
                                    value={binLookup.binCode}
                                    focused
                                    required
                                    inputProps={{ tabIndex: "-1" }}
                                  />
                                  <IconButton
                                    sx={{ height: 40, width: 40 }}
                                    onClick={() => handleShow("BIN")}
                                  >
                                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                  </IconButton>
                                  {/* <MoreHorizIcon  onClick={()=>handleShow('SUP')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                                  <TextField
                                    id="outlined-basic"
                                    variant="filled"
                                    value={binLookup.binName}
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
                                value={shelvesLookup.shelvesRecordID}
                                focused
                                sx={{ display: "none" }}
                              />

                              <FormControl
                                sx={{
                                  gridColumn: "span 2",
                                  display: "flex",
                                }}
                              >
                                {/* <FormLabel>Supply Master</FormLabel> */}
                                <FormControl
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
                                >
                                  <TextField
                                    id="outlined-basic"
                                    label="Shelves"
                                    variant="filled"
                                    value={shelvesLookup.shelvesCode}
                                    focused
                                    required
                                    onWheel={(e) => e.target.blur()} 
                                    inputProps={{ tabIndex: "-1" }}
                                  />
                                  <IconButton
                                    sx={{ height: 40, width: 40 }}
                                    onClick={() => handleShow("SHELVES")}
                                  >
                                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                  </IconButton>
                                  {/* <MoreHorizIcon  onClick={()=>handleShow('SUP')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                                  <TextField
                                    id="outlined-basic"
                                    variant="filled"
                                    value={shelvesLookup.shelvesName}
                                    fullWidth
                                    inputProps={{ tabIndex: "-1" }}
                                    focused
                                  />
                                </FormControl>
                              </FormControl>
                              <TextField
                                name="sortorder"
                                type="number"
                                id="sortorder"
                                label="Sort Order"
                                variant="filled"
                                focused
                                value={values.sortorder}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                //   error={!!touched.SortOrder && !!errors.SortOrder}
                                //   helperText={touched.SortOrder && errors.SortOrder}
                                sx={{ background: "#fff6c3" }}
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
                                    .slice(0, 8);
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
                                        FnLocationsave(values, resetForm, true);
                                        
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
                              )}
                              <Button
                                type="reset"
                                color="warning"
                                variant="contained"
                                onClick={() => {
                                  setScreen(0);
                                  // dispatch(
                                  //   fetchApidata(accessID, "get", recID)
                                  // );
                                }}
                              >
                                Cancel
                              </Button>
                            </Box>
                            <Popup
                              title="Location"
                              openPopup={openLOCATIONPopup}
                              setOpenPopup={setOpenLOCATIONPopup}
                            >
                              <Listviewpopup
                                accessID="2051"
                                screenName="Location"
                                childToParent={childToParent}
                              />
                            </Popup>
                            <Popup
                              title="Bin"
                              openPopup={openBINPopup}
                              setOpenPopup={setOpenBINPopup}
                            >
                              <Listviewpopup
                                accessID="2052"
                                screenName="Bin"
                                childToParent={childToParent}
                              />
                            </Popup>
                            <Popup
                              title="Shelves"
                              openPopup={openSHELVESPopup}
                              setOpenPopup={setOpenSHELVESPopup}
                            >
                              <Listviewpopup
                                accessID="2053"
                                screenName="Shelves"
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
        {show == "8" ? (
          <Box m="20px">
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
                    gridTemplateColumns="repeat(6, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 6",
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      id="MaterialCode"
                      name="MaterialCode"
                      label="Code"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={code}
                      error={!!touched.MaterialCode && !!errors.MaterialCode}
                      helperText={touched.MaterialCode && errors.MaterialCode}
                      sx={{ gridColumn: "span 3" }}
                      focused
                      inputProps={{ maxLength: 10, readOnly: true }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Description"
                      value={desc}
                      id="MaterialDescription"
                      name="MaterialDescription"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        !!touched.MaterialDescription &&
                        !!errors.MaterialDescription
                      }
                      helperText={
                        touched.MaterialDescription &&
                        errors.MaterialDescription
                      }
                      sx={{ gridColumn: "span 3" }}
                      focused
                      inputProps={{ maxLength: 50, readOnly: true }}
                      multiline
                    />
                    <Box sx={{ gridColumn: "span 2" }}>
                      {procurementLoading ? (
                        <Skeleton
                          height={270}
                          variant="rectangular"
                          width="100%"
                        >
                          {/* <div style={{ paddingTop: '57%' }} /> */}
                        </Skeleton>
                      ) : (
                        <MaterialLineChart
                          yData={[procurementData.Rateseries]}
                          xData={procurementData.categories}
                          title={"Rate"}
                        />
                      )}
                    </Box>
                    <Box sx={{ gridColumn: "span 2" }}>
                      {procurementLoading ? (
                        <Skeleton
                          height={270}
                          variant="rectangular"
                          width="100%"
                        >
                          {/* <div style={{ paddingTop: '57%' }} /> */}
                        </Skeleton>
                      ) : (
                        <MaterialLineChart
                          yData={[procurementData.Qtyseries]}
                          xData={procurementData.categories}
                          title={"Quantity"}
                        />
                      )}
                    </Box>
                    <Box sx={{ gridColumn: "span 2" }}>
                      {procurementLoading ? (
                        <Skeleton
                          height={270}
                          variant="rectangular"
                          width="100%"
                        >
                          {/* <div style={{ paddingTop: '57%' }} /> */}
                        </Skeleton>
                      ) : (
                        <MaterialLineChart
                          yData={[procurementData.Amountseries]}
                          xData={procurementData.categories}
                          e
                          title={"Amount"}
                        />
                      )}
                    </Box>
                  </Box>

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
                        rows={procurementData.TableData.data || []}
                        columns={procurementColumns}
                        disableSelectionOnClick
                        getRowId={(row) => row.Id}
                        pageSize={pageSize}
                        loading={procurementLoading}
                        onPageSizeChange={(newPageSize) =>
                          setPageSize(newPageSize)
                        }
                        rowsPerPageOptions={[5, 10, 20]}
                        pagination
                        components={{
                          Toolbar: TrackingToolbar,
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
                </Box>
              )}
            </Formik>
          </Box>
        ) : (
          false
        )}
        {show == "9" ? (
          <Box m="20px">
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
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      id="MaterialCode"
                      name="MaterialCode"
                      label="Code"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.MaterialCode}
                      error={!!touched.MaterialCode && !!errors.MaterialCode}
                      helperText={touched.MaterialCode && errors.MaterialCode}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      inputProps={{ maxLength: 10, readOnly: true }}
                    />
                    {parentID == "P" && searchPharse == "CA" ? (
                      <FormControl
                        fullWidth
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "20px",
                        }}
                      >
                        <TextField
                          name="Length"
                          type="number"
                          id="Length"
                          label="Length"
                          variant="filled"
                          value={values.Length}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          focused
                          required
                          fullWidth
                          sx={{ background: "#fff6c3" }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Length"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                        <TextField
                          name="Width"
                          type="number"
                          id="Width"
                          label="Width"
                          variant="filled"
                          value={values.Width}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          focused
                          required
                          fullWidth
                          sx={{ background: "#fff6c3" }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Breadth"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                        <TextField
                          name="height"
                          type="number"
                          id="height"
                          label="Height"
                          variant="filled"
                          value={values.height}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          focused
                          required
                          sx={{ background: "#fff6c3" }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          fullWidth
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Height"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                      </FormControl>
                    ) : (
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Description"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={
                          !!touched.MaterialDescription &&
                          !!errors.MaterialDescription
                        }
                        helperText={
                          touched.MaterialDescription &&
                          errors.MaterialDescription
                        }
                        sx={{ gridColumn: "span 2" }}
                        id="MaterialDescription"
                        name="MaterialDescription"
                        value={values.MaterialDescription}
                        focused
                        inputProps={{
                          maxLength: 50,
                          readOnly: parentID === "L" ? true : false,
                        }}
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
                    )}

                    <Box m="5px" sx={{ gridColumn: "span 2" }}>
                      <Box
                        height={{ xs: "45vh", md: "65vh" }}
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
                          }}
                          components={{
                            Toolbar: ProcessCustombar,
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

                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <Formik
                        innerRef={ref}
                        initialValues={alternatemateialInitialValue}
                        onSubmit={(values, { resetForm }) => {
                          setTimeout(() => {
                            FnLocationsave(values, resetForm, false);
                            // alert("hai");
                          }, 100);
                        }}
                        // validationSchema={matsupplierSchema}
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
                              fullWidth
                            >
                              <TextField
                                id="outlined-basic"
                                label="ID"
                                variant="filled"
                                value={MATERIALLookup.MATERIALRecordID}
                                focused
                                sx={{ display: "none" }}
                              />

                              <FormControl
                                sx={{
                                  gridColumn: "span 2",
                                  display: "flex",
                                }}
                              >
                                {/* <FormLabel>Supply Master</FormLabel> */}
                                <FormControl
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginTop: "40px",
                                  }}
                                >
                                  <TextField
                                    id="outlined-basic"
                                    label="Material"
                                    variant="filled"
                                    value={MATERIALLookup.MATERIALCode}
                                    focused
                                    required
                                    inputProps={{ tabIndex: "-1" }}
                                  />
                                  <IconButton
                                    sx={{ height: 40, width: 40 }}
                                    onClick={() => handleShow("MATERIAL")}
                                  >
                                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                  </IconButton>
                                  {/* <MoreHorizIcon  onClick={()=>handleShow('SUP')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                                  <TextField
                                    id="outlined-basic"
                                    variant="filled"
                                    value={MATERIALLookup.MATERIALName}
                                    fullWidth
                                    inputProps={{ tabIndex: "-1" }}
                                    focused
                                  />
                                </FormControl>
                              </FormControl>
                              <TextField
                                name="SortOrder"
                                type="number"
                                id="SortOrder"
                                label="Sort Order"
                                variant="filled"
                                focused
                                value={values.SortOrder}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                //   error={!!touched.SortOrder && !!errors.SortOrder}
                                //   helperText={touched.SortOrder && errors.SortOrder}
                                sx={{ background: "#fff6c3" }}
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
                                    .slice(0, 8);
                                }}
                              />
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
                                        FnLocationsave(values, resetForm, true);
                                        
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
                              )}
                              <Button
                                type="reset"
                                color="warning"
                                variant="contained"
                                onClick={() => {
                                  setScreen(0);
                                  // dispatch(
                                  //   fetchApidata(accessID, "get", recID)
                                  // );
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
            <Popup
              title="MATERIAL"
              openPopup={openMATERIALPopup}
              setOpenPopup={setOpenMATERIALPopup}
            >
              <Listviewpopup
                accessID="2056"
                screenName="MATERIAL"
                childToParent={childToParent}
                filterName={"parentID"}
                filterValue={recID}
              />
            </Popup>
          </Box>
        ) : (
          false
        )}
        {show == "10" ? (
          <Box m="20px">
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
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      id="MaterialCode"
                      name="MaterialCode"
                      label="Code"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.MaterialCode}
                      error={!!touched.MaterialCode && !!errors.MaterialCode}
                      helperText={touched.MaterialCode && errors.MaterialCode}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      inputProps={{ maxLength: 10, readOnly: true }}
                    />
                    {parentID == "P" && searchPharse == "CA" ? (
                      <FormControl
                        fullWidth
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "20px",
                        }}
                      >
                        <TextField
                          name="Length"
                          type="number"
                          id="Length"
                          label="Length"
                          variant="filled"
                          value={values.Length}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          focused
                          required
                          fullWidth
                          sx={{ background: "#fff6c3" }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Length"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                        <TextField
                          name="Width"
                          type="number"
                          id="Width"
                          label="Width"
                          variant="filled"
                          value={values.Width}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          focused
                          required
                          fullWidth
                          sx={{ background: "#fff6c3" }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Breadth"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                        <TextField
                          name="height"
                          type="number"
                          id="height"
                          label="Height"
                          variant="filled"
                          value={values.height}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          focused
                          required
                          sx={{ background: "#fff6c3" }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          fullWidth
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Height"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                      </FormControl>
                    ) : (
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Description"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={
                          !!touched.MaterialDescription &&
                          !!errors.MaterialDescription
                        }
                        helperText={
                          touched.MaterialDescription &&
                          errors.MaterialDescription
                        }
                        sx={{ gridColumn: "span 2" }}
                        id="MaterialDescription"
                        name="MaterialDescription"
                        value={values.MaterialDescription}
                        focused
                        inputProps={{
                          maxLength: 50,
                          readOnly: parentID === "L" ? true : false,
                        }}
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
                    )}

                    <Box m="5px" sx={{ gridColumn: "span 2" }}>
                      <Box
                        height={{ xs: "45vh", md: "65vh" }}
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
                          }}
                          components={{
                            Toolbar: ProcessCustombar,
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

                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <Formik
                        innerRef={ref}
                        initialValues={supmasterInitialvalues}
                        onSubmit={(values, { resetForm }) => {
                          setTimeout(() => {
                            fnConfigMaterial(values, resetForm, false);
                            // alert("hai");
                          }, 100);
                        }}
                        validationSchema={matsupplierSchema}
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
                              fullWidth
                            >
                              <TextField
                                id="outlined-basic"
                                label="ID"
                                variant="filled"
                                value={selectPROLookupData.PROlookupRecordid}
                                focused
                                sx={{ display: "none" }}
                              />

                              <FormControl
                                sx={{
                                  gridColumn: "span 2",
                                  display: "flex",
                                }}
                              >
                                {/* <FormLabel>Supply Master</FormLabel> */}
                                <FormControl
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginTop: "40px",
                                  }}
                                >
                                  <TextField
                                    id="outlined-basic"
                                    label="Customer"
                                    variant="filled"
                                    value={customerConfigLookup.code}
                                    focused
                                    required
                                    inputProps={{ tabIndex: "-1" }}
                                  />
                                  <IconButton
                                    sx={{ height: 40, width: 40 }}
                                    onClick={() => handleShow("CUSTOMER")}
                                  >
                                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                  </IconButton>
                                  <TextField
                                    id="outlined-basic"
                                    variant="filled"
                                    value={customerConfigLookup.description}
                                    fullWidth
                                    inputProps={{ tabIndex: "-1" }}
                                    focused
                                  />
                                </FormControl>
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
                                    fnConfigMaterial(values, resetForm, true);
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
                                  // dispatch(
                                  //   fetchApidata(accessID, "get", recID)
                                  // );
                                }}
                              >
                                Cancel
                              </Button>
                            </Box>
                            <Popup
                              title="Customers"
                              openPopup={openCustomerPopup}
                              setOpenPopup={setOpenCustomerPopup}
                            >
                              <Listviewpopup
                                accessID="2009"
                                screenName="Customers"
                                childToParent={childToParent}
                                filterName={"compID"}
                                filterValue={CompanyID}
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

export default Editmatrial;
