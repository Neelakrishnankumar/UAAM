import {
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
  InputLabel,
  Tooltip,
  Breadcrumbs,
  Checkbox,
} from "@mui/material";
import axios from "axios";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { Formik, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../index";
import {
  fetchApidata,
  postApidata,
  fetchRecIDApidata,
  postApidatawol,
  VersioningFetch,
  bomCopyApiData,
  stockApidata,
  dpConversionData,
  explorePostData,
  stockGetData,
  StockProcessApi
} from "../../../store/reducers/Formapireducer";
import { fetchComboData1 } from "../../../store/reducers/Comboreducer";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import basicSchema from "../../Security/validation";
import { productsSchema, probomSchema } from "../../Security/validation";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Listviewpopup from "../Lookup";
import Popup from "../popup";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

import { tokens } from "../../../Theme";
import { useTheme } from "@mui/material";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import { fnFileUpload } from "../../../store/reducers/Imguploadreducer";
import { globalurl } from "../../../global";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { customerSchema } from "../../Security/validation";
// ***********************************************
//  Developer:Gowsalya
// Purpose:To Create Products & BOM

// ***********************************************
const Productdetail = ({}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [pageSize, setPageSize] = React.useState(10);

  const parentID = "M";

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const location = useLocation();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const YearFlag = sessionStorage.getItem("YearFlag");
  const compID = sessionStorage.getItem("compID");
  const YearRecorid = sessionStorage.getItem("YearRecorid");

  var yearData = sessionStorage.getItem("year");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  var headerID = params.headerid;
  var desc = params.Type;
  var path = `${desc}`;
  const Data = useSelector((state) => state.formApi.Data);
  console.log("🚀 ~ file: Productdetail.jsx:93 ~ Productdetail ~ Data:", Data)
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.loading);
  const conversionData = useSelector((state) => state.formApi.conversionData);
  const stockData = useSelector((state) => state.formApi.materialStockData);
  console.log("🚀 ~ file: Productdetail.jsx:119 ~ Productdetail ~ stockData:", stockData)
  // console.log("🚀 ~ file: Productdetail.jsx:112 ~ Productdetail ~ conversionData:", conversionData)
  const { toggleSidebar, broken, rtl } = useProSidebar();

  useEffect(() => {
    dispatch(fetchApidata(accessID, "get", recID));
    // dispatch(fetchComboData1("TR002", "getall", recID, "ProductCategory"));
  }, [location.key]);
  const [ini, setIni] = useState(true);
  const [iniBom, setIniBom] = useState(true);
  const [iniproduct, setIniProduct] = useState(true);
  const [iniDies, setIniDies] = useState(true);
  const [loading, setLoading] = useState(false);

  var imageName;
  var userimg = `${store.getState().globalurl.imageUrl}`;

  if (mode == "A") {
    userimg = userimg + "Defaultimg.jpg";
    // imageName="Defaultimg.jpg"
  } else {
    if (Data.ImageName) {
      userimg = userimg + Data.ImageName;
      // setImageName(Data.ImageName)
      // imageName= Data.ImageName
    } else {
      userimg = userimg + "Defaultimg.jpg";
      // imageName="Defaultimg.jpg"
    }
  }
  const [modelID, setmodelD] = useState("");
  const [prodDesc, setprodDesc] = useState("");
  const [wastageValue, setwastageValue] = useState();
  var apiData = "";
  apiData = {
    NetWeight: Data.NetWeight,
    Pgrid: Data.Pgrid,
    Frqty: Data.Frqty,
    Weight: Data.Weight,
    Breadth: Data.Breadth,
    Height: Data.Height,
    Width: Data.Width,
    Length: Data.Length,
    Bomothers: Data.Bomothers,
    Dss: Data.Dss,
    Ppday: Data.Ppday,
    Desc: Data.Desc,
    ProductType: Data.ProductType,
    ModelNo: Data.ModelNo,
    Code: Data.Code,
    ImageName: Data.ImageName,
    LeaPattern: Data.LeaPattern,
    Image: Data.Image,
   
    LinePattern: Data.LinePattern,
    SortOrder: Data.SortOrder,
    Disable: Data.Disable,
  };
  //*******Assign Productdetail values from Database in  Yup initial value******* */
  const initialValues = {
    // NetWeight: apiData.NetWeight,
    NetWeight: Number(apiData.NetWeight).toFixed(2),
    Pgrid: apiData.Pgrid,
    // Frqty:Data.Ppday,
    // Weight: apiData.Weight,
    Weight: Number(apiData.Weight).toFixed(2),
    // Breadth: apiData.Breadth,
    Breadth: Number(apiData.Breadth).toFixed(2),
    // Height: apiData.Height,
    Height: Number(apiData.Height).toFixed(2),
    // Width: apiData.Width,
    Width: Number(apiData.Width).toFixed(2),
    // Length: apiData.Length,
    Length: Number(apiData.Length).toFixed(2),
    Bomothers: apiData.Bomothers,
    Dss: apiData.Dss,
    Ppday: apiData.Ppday,
    Desc: apiData.Desc,
    ProductType: apiData.ProductType,
    ModelNo: apiData.ModelNo,
    Code: apiData.Code,
    ImageName: apiData.ImageName,
    LeaPattern: apiData.LeaPattern,
    Image: apiData.Image,
    LinePattern: apiData.LinePattern,
    SortOrder: apiData.SortOrder,
    checkbox: apiData.Disable,
    bohRefNOS: "",
    price: Data.Price,
    costPrice: Data.Costprice,
   
  };

  const [openPCPopup, setOpenPCPopup] = useState(false);
  const [openMTPopup, setOpenMTPopup] = useState(false);
  const [openPSPopup, setOpenPSPopup] = useState(false);
  const [openCUPopup, setOpenCUPopup] = useState(false);
  const [openDPPopup, setOpenDPPopup] = useState(false);
  const [openITUPopup, setOpenITUPopup] = useState(false);
  const [openCPpopup, setOpenCPpopup] = useState(false);
  const [openGRDPopup, setOpenGRDPopup] = useState(false);
  const [openSUBPopup, setOpenSUBPopup] = useState(false);
  const [openCUSpopup, setOpenCUSpopup] = useState(false);
  const [openHSNPopup, setOpenHSNPopup] = useState(false);
  const [openMATERIALpopup, setOpenMATERIALpopup] = useState(false);
  // ************Lookup Function***************
  function handleShow(type) {
    if (type == "PC") {
      setOpenPCPopup(true);
    }
    if (type == "MT") {
      setOpenMTPopup(true);
    }
    if (type == "PS") {
      setOpenPSPopup(true);
    }
    if (type == "CU") {
      setOpenCUPopup(true);
    }
    if (type == "DP") {
      setOpenDPPopup(true);
    }
    if (type == "ITU") {
      setOpenITUPopup(true);
    }
    if (type == "CP") {
      setOpenCPpopup(true);
    }
    if (type == "GRD") {
      setOpenGRDPopup(true);
    }
    if (type == "SUB") {
      setOpenSUBPopup(true);
    }
    if (type == "CUS") {
      setOpenCUSpopup(true);
    }
    if (type == "MATERIAL") {
      setOpenMATERIALpopup(true);
    }
    if (type == "HSN") {
      setOpenHSNPopup(true);
    }
  }
  //************Save Function*******************
  const fnSave = async (values) => {
    setLoading(true);
    setIni(false);
 


    var isCheck = "N";
    if (values.checkbox == true) {
      isCheck = "Y";
    }

    console.log(values);

    var saveData = {
      RecordId: recID,
      NetWeight: values.NetWeight,
      Pgrid: headerID,
      InventoryUom: 0,
      Frqty: 0,
      Weight: values.Weight,
      Breadth: values.Breadth,
      Height: values.Height,
      Width: values.Width,
      Length: values.Length,
      Bomothers: values.Bomothers,
      Dss: values.Dss,
      Ppday: values.Ppday,
      Desc: values.Desc,
      ProductType: values.ProductType,
      ModelNo: values.ModelNo,
      Code: values.Code,
      ImageName: values.ImageName,
      LeaPattern: values.LeaPattern,
      Image: values.Image,
      LinePattern: values.LinePattern,
      SortOrder: values.SortOrder,
      Disable: isCheck,
      Costprice: values.costPrice,
      Price: values.price,
      Hsn:selecthsnLookupData.HSNlookupRecordid,
    };
    // console.log("🚀 ~ file: Productdetail.jsx:245 ~ fnSave ~ saveData:", saveData)
    var type = "";

    if (mode == "A") {
      type = "insert";
    } else {
      type = "update";
    }

    const data = await dispatch(postApidatawol(accessID, type, saveData));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      setIni(true);
      setLoading(false);
      navigate(
        `/Apps/Secondarylistview/TR001/Product Master/${headerID}/${desc}/EditProduct Master/${data.payload.apiResponse}/E`
      );
    } else {
      toast.error(data.payload.Msg);
      setLoading(false);
    }
  };
  const style = {
    height: "55px",
    border: "2px solid #1769aa ",
    borderRadius: "5px",
    backgroundColor: "#EDEDED",
  };

  /*************************************BOM SCREEN********************* */
  const [show, setShow] = useState("1");
  const [showval, setvalShow] = useState("5");
  const [edata, setedata] = useState({
    RecordID: "",
    MtlCode: "",
    Quantity: "",
    MtlCost: "",
    SortOrder: "",
    Disable: "",
  });
  const [currentRow, setcurrentRow] = React.useState([]);
  const [boMode, setBomode] = useState("A");
  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );
  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );

  console.log(explorelistViewcolumn);

  const [selectedFile, setSelectedFile] = useState();
  const [uploadFile, setUploadFile] = useState();

  const [setrateval, setRate] = useState(0);
  const [mateval, setmateval] = useState(0);
  const [tot, setTot] = useState();
  const [totquantity, setquantity] = useState();
  const [wastageval, setwastageval] = useState();
  const [wastageTotvalue, setwastageTotvalue] = useState();
  const [finalClickInfo, setFinalClickInfo] = useState({
    RecordID: "",
    MtlCode: "",
    Quantity: "",
    MtlCost: "",
    SortOrder: "",
    Disable: "",
    Fixrate: "",
    coneConversion:""
  });

  const [bomdata, setBomdata] = useState({
    RecordID: "",
    Length: "",
    Width: "",
    Quantity: "",
    SortOrder: "",
    WastageinPercent: "",
    //  Wastagemargin: '',
    Nos: "",
  });
  const [bomMode, setBommode] = useState("A");

  const [selectCPLookupData, setselectCPLookupData] = React.useState({
    CPlookupRecordid: "",
    CPlookupCode: "",
    CPlookupDesc: "",
  });
  //HSN
 
   


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

  /*****************File upload************ */
  const changeHandler = async (event) => {
    setSelectedFile(event.target.files[0]);

    console.log(event.target.files[0]);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "attachments");

    const fileData = await dispatch(
      fnFileUpload(formData, edata.RecordID, "TR016")
    );

    console.log("fileData" + JSON.stringify(fileData));
    setUploadFile(fileData.payload.apiResponse);
  };

  var bomFilter = `${finalClickInfo.RecordID}`;

  // Design App type based button show function
  const bomDetail = (val) => {
    setvalShow(val);
    setShow("5");
    selectbomdetailcelldata("", "A", "");
    setselectdpatternLookupData({
      DesignPatternRecordID: "",
      DesignCode: "",
      DesignDescription: "",
    });
    dispatch(fetchExplorelitview("TR046", "BOM Details", bomFilter, ""));
    dispatch(fetchApidata(accessID, "get", recID));
  };
  // Bom button function
  function fnvalue() {
    setvalShow("2");
    setShow("2");
    selectcelldata("", "A", "");
    dispatch(fetchApidata(accessID, "get", recID));
    dispatch(fetchExplorelitview("TR016", "BOM", bohRecID, ""));
  }

  /********************BOM HEADER DATA************* */
  const [isBOMHdata, setBOMHdata] = useState(false);
  const [bohRefNO, setbohRefNO] = useState("");
  const [bohDate, setbohDate] = useState("");
  const [bohRecID, setbohRecID] = useState("");

  const productfilter = "PrdRecordID=" + recID;
  console.log(show);
  /********************Explore change function************* */
  const handleChange = async (event) => {
    setShow(event.target.value);
    setvalShow(0);
    setmodelD(Data.ModelNo);
    setprodDesc(Data.Desc);
    // alert(bohRecID)
    /**********Listview call ******************/
    if (event.target.value == "2") {
      const data = await dispatch(VersioningFetch(recID));
      console.log("--payload--" + JSON.stringify(data));
      dispatch(fetchApidata(accessID, "get", recID));
      if (data.payload.Status == "Y") {
        //alert(data.payload.apiResponse.ReferenceNo);
        setBOMHdata(true);
        setbohRefNO(data.payload.apiResponse.ReferenceNo);
        setbohDate(data.payload.apiResponse.Bhdate);
        setbohRecID(data.payload.apiResponse.RecordID);
        dispatch(
          fetchExplorelitview(
            "TR016",
            "BOM",
            data.payload.apiResponse.RecordID,
            ""
          )
        );

        selectcelldata("", "A", "");
      } else {
        setBOMHdata(false);
        setbohDate(currentdate);
        dispatch(fetchExplorelitview("TR016", "BOM", "-1", ""));

        selectcelldata("", "A", "");
      }
    }
    if (event.target.value == "1") {
      dispatch(fetchApidata(accessID, "get", recID));
    }
    if (event.target.value == "3") {
      dispatch(fetchExplorelitview("TR046", "BOM Details", "", ""));
      dispatch(fetchApidata(accessID, "get", recID));
      selectcelldata("", "A", "");
    }
    if (event.target.value == "4") {
      dispatch(fetchApidata(accessID, "get", recID));
      dispatch(stockGetData({accessID:"TR069", recID, Type:"P", yearData}));
      // dispatch(stockApidata());
    }
    if (event.target.value == "6") {
      dispatch(fetchApidata(accessID, "get", recID));
    }
    if (event.target.value == "7") {
      dispatch(fetchExplorelitview("TR017", "Product Cost", productfilter, ""));

      selectcelldata("", "A", "");
      dispatch(fetchApidata(accessID, "get", recID));
    }
    if (event.target.value == "8") {
      dispatch(fetchExplorelitview("TR106", "Dies", recID, ""));

      selectcelldata("", "A", "");
      dispatch(fetchApidata(accessID, "get", recID));
    }
  };

  //************************** Lookup Data *****************/

  const [isPopupData, setisPopupdata] = React.useState(false);
  const [selectLookupData, setselectLookupData] = React.useState({
    lookupRecordid: "",
    lookupCode: "",
    lookupDesc: "",
  });
  const [selectInvUOMLookupData, setselectInvUOMLookupData] = React.useState({
    ITUlookupRecordid: "",
    ITUlookupCode: "",
    ITUlookupDesc: "",
  });
  if (isPopupData == false) {
    selectInvUOMLookupData.ITUlookupRecordid = Data.InventoryUom;
    selectInvUOMLookupData.ITUlookupDesc = Data.UomDesc;
  }
  const [selectprocessLookupData, setselectprocessLookupData] = React.useState({
    PSlookupRecordid: "",
    PSlookupCode: "",
    PSlookupDesc: "",
    processRecID: "",
  });
  const [selecthsnLookupData, setselecthsnLookupData] = React.useState({
    HSNlookupRecordid: "",
    HSNlookupCode: "",
   });
   if (isPopupData == false) {
    selecthsnLookupData.HSNlookupRecordid = Data.HsnRecID;
    selecthsnLookupData.HSNlookupCode = Data.HsnCode;
   
  }
  const [selectmaterialLookupData, setselectmaterialLookupData] =
    React.useState({
      MlookupRecordid: "",
      MlookupCode: "",
      MlookupDesc: "",
      DesignApp: "",
      coneConversion:"",
      uomConversionType:"",
      uomConDesc:""
    });

  if (isPopupData == false) {
    selectLookupData.lookupRecordid = Data.Pgrid;
    selectLookupData.lookupCode = Data.PgrCode;
    selectLookupData.lookupDesc = Data.PgrDesc;
    //  selectInvUOMLookupData.ITUlookupRecordid = Data.InventoryUom
    //  selectInvUOMLookupData.ITUlookupDesc = Data.UomDesc
  }

  const [productCustomerData, setProductCutomerData] = useState({
    price: "",
    variousPercentage: "",
    agreedPrice: "",
    recordID: "",
  });
  const [DiesData, setDiesData] = useState({
    DiesCount: "",
    SortOrder: "",
    recordID: "",
  });
  /****************** BOM values assign a state variale******************** */
  const selectcelldata = (selectedData, bMode, field) => {
    console.log("selectdata" + JSON.stringify(selectedData));
    console.log(selectedData.Fixrate);


    setBomode(bMode);
    setIniBom(true);
    setIniProduct(true);
    setIniDies(true);
    if (bMode == "A") {
      setUploadFile("");
      setFinalClickInfo({
        RecordID: "",
        Quantity: "",
        MtlCost: "",
        MtlCode: "",
        SortOrder: "",
        Disable: "",
        Fixrate: "",
        coneConversion:""
      });
      setselectprocessLookupData({
        PSlookupRecordid: "",
        PSlookupCode: "",
        PSlookupDesc: "",
        processRecID: "",
      });
      setselectmaterialLookupData({
        MlookupRecordid: "",
        MlookupCode: "",
        MlookupDesc: "",
        coneConversion:"",
        uomConversionType:"",
        uomConDesc:""
      });
      setselectCPLookupData({
        CPlookupRecordid: "",
        CPlookupCode: "",
        CPlookupDesc: "",
      });
      setProductCutomerData({
        agreedPrice: "",
        price: "",
        variousPercentage: "",
        recordID: "",
      });
      setselectCUSTLookupData({
        CUSTlookupCode: "",
        CUSTlookupRecordid: "",
        CUSTlookupDesc: "",
      });
      setDiesData({
        DiesCount: "",
        SortOrder: "",
        recordID: "",
      });
      setselectMATERIALLookupData({
        MATERIALlookupCode: "",
        MATERIALlookupRecordid: "",
        MATERIALlookupDesc: "",
      });
    } else {
      if (field == "action") {
        setRate(selectedData.ConsumptionCost);
        console.log("---" + selectedData.PuomRecordID);

        setMaterialType(selectedData.Type);
        setUomRecID({
          cuomRecID: selectedData.McuomRecordID,
          puomRecID: selectedData.PuomRecordID,
        });
        setUploadFile(selectedData.Attachments);
        setbohRecID(selectedData.parentID);
        sessionStorage.setItem("BOMREC", selectedData.RecordID);
        // console.log("🚀 ~ file: Productdetail.jsx:617 ~ selectcelldata ~ selectedData.RecordID:", selectedData.RecordID)
        setFinalClickInfo({
          RecordID: selectedData.RecordID,
          Quantity: selectedData.Quantity,
          MtlCost: selectedData.MtlCost,
          SortOrder: selectedData.SortOrder,
          Disable: selectedData.Disable,
          Fixrate: selectedData.Fixrate,
          
        });
        setselectprocessLookupData({
          PSlookupCode: selectedData.PsCode,
          PSlookupRecordid: selectedData.PsRecordID,
          PSlookupDesc: selectedData.PsDesc,
          processRecID: selectedData.PsRecordID,
        });
        if(show == "2"){
        setselectmaterialLookupData({
          MlookupCode: selectedData.MtlCode,
          MlookupRecordid: selectedData.MtlRecordID,
          MlookupDesc: selectedData.MtlDesc,
          DesignApp: selectedData.DesignApp,
          coneConversion:selectedData.PurchaseDesc,
          uomConversionType:selectedData.UomType,
          uomConDesc:selectedData.ConsumptionDesc
        });}
        setselectCPLookupData({
          CPlookupRecordid: selectedData.PrdRecordID,
          CPlookupCode: selectedData.ProductCode,
          CPlookupDesc: selectedData.ProductName,
        });
        console.log("ageed"+selectedData.AgreedPrice);
        setProductCutomerData({
          agreedPrice: selectedData.AgreedPrice,
          price: selectedData.Costprice,
          variousPercentage: selectedData.VariantPercentage,
          recordID: selectedData.RecordID,
        });
        setselectCUSTLookupData({
          CUSTlookupCode: selectedData.CustID,
          CUSTlookupRecordid: selectedData.CustRecordID,
          CUSTlookupDesc: selectedData.CustName,
        });

        setDiesData({
          DiesCount: selectedData.DiesCount,
          SortOrder: selectedData.SortOrder,
          recordID: selectedData.RecordID,
        });
        setselectMATERIALLookupData({
          MATERIALlookupCode: selectedData.Code,
          MATERIALlookupRecordid: selectedData.MaterialID,
          MATERIALlookupDesc: selectedData.Name,
        });
      }
    }
  };

  //*******Assign BOM values from Database in  Yup initial value******* */
  const bomInitialvalues = {
    MtlCode: finalClickInfo.MtlCode,
    // Quantity: finalClickInfo.Quantity,
    Quantity: Number(finalClickInfo.Quantity).toFixed(4),
    MtlCost: finalClickInfo.MtlCost,
    Fixrate: finalClickInfo.Fixrate,
    SortOrder: finalClickInfo.SortOrder,
    checkbox: finalClickInfo.Disable,
    totalCost: Number().toFixed(2),
  };
  /*************SEARCH********************** */

  var VISIBLE_FIELDS;
  if (show == "2") {
    VISIBLE_FIELDS = ["SLNO", "MtlCode", "Description", "Quantity", "action"];
  } else if (show == "7") {
    VISIBLE_FIELDS = ["SLNO", "CustID", "CustName", "AgreedPrice", "action"];
  } else {
    VISIBLE_FIELDS = ["SLNO", "Code", "Name", "DiesCount", "action"];
  }

  const columns = React.useMemo(
    () =>
      explorelistViewcolumn.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
    [explorelistViewcolumn]
  );
  const VISIBLE_FIELDSDESIGN = [
    "SLNO",
    "Pattern",
    "Length",
    "Width",
    "action",
  ];
  const designPatternColumns = React.useMemo(
    () =>
      explorelistViewcolumn.filter((column) =>
        VISIBLE_FIELDSDESIGN.includes(column.field)
      ),
    [VISIBLE_FIELDSDESIGN]
  );
  // console.log("🚀 ~ file: Productdetail.jsx:596 ~ Productdetail ~ designPatternColumns:", designPatternColumns)

  /********************STOCK DATA************* */
  // const [stockData ,setStockData] = useState({
  //    OpenstockProductQty:'',
  //     RecievedStockProductQty:'',
  //     IssuedStockPrdQty:'',
  //     RequirementStockPrdQty:'',
  //     Stock:'',
  //     Balance:''
  // })
  // console.log("🚀 ~ file: Productdetail.jsx:544 ~ Productdetail ~ stockData:", JSON.stringify(stockData))

  /********************STOCK DATA************* */
  const stockIntialValue = {
    OpenstockProductQty: stockData.OpenstockProductQty,
    RecievedStockProductQty: stockData.RecievedStockProductQty,
    IssuedStockPrdQty: stockData.IssuedStockPrdQty,
    RequirementStockPrdQty: stockData.RequirementStockPrdQty,
    Stock: stockData.Stock,
    OpenStockDate: stockData.Osdate,
    BALANCE: stockData.BALANCE,
  };

  const ref = useRef();

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
          <Typography>List of Materials</Typography>
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
  function CustomerToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>List of Customer</Typography>
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
  function DiesToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>List of Dies</Typography>
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
  // **********Grid header function************
  function Custombar() {
    return (
      <>
        <Typography>{selectmaterialLookupData.MlookupDesc}</Typography>
        <GridToolbarContainer
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography>Bom Details</Typography>
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
            <IconButton
              onClick={() => {
                const reset = ref.current.resetForm;

                clrBomdetForm();
                reset();
              }}
            >
              <AddOutlinedIcon />
            </IconButton>
          </Box>
        </GridToolbarContainer>
      </>
    );
  }
  const [colorRecID, setColorId] = useState();
  const [uomRecordID, setUomId] = useState();

  /******************************BOM SAVE FUNCTION********** */
  const fnBomSave = async (values, resetForm, types) => {
    var document = "";

    setIniBom(false);
    if (uploadFile == undefined) {
      document = "";
    } else {
      document = uploadFile;
    }
    if (selectprocessLookupData.PSlookupCode == "") {
      toast.error("Please Choose Process/stage Lookup");
      setLoading(false);
      return;
    }
    if (bohRefNO == "") {
      toast.error("Please Choose Reference No");
      setLoading(false);
      return;
    }

    if (bohDate == "") {
      toast.error("Please Choose Date");
      setLoading(false);
      return;
    }
    if (selectmaterialLookupData.MlookupCode == "") {
      toast.error("Please Choose Material Lookup");
      setLoading(false);
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

    if (types === "harddelete") {
      type = "harddelete";
      saveData = {
        RecordID: finalClickInfo.RecordID,
        Prdid: recID,
        CUomRecordID: uomRecordID,
        CoRecordID: colorRecID,
        Description: selectmaterialLookupData.MlookupDesc,
        Mtlid: selectmaterialLookupData.MlookupRecordid,
        Psid: selectprocessLookupData.PSlookupRecordid,
        Quantity: values.Quantity,
        MtlCost: values.totalCost,
        SortOrder: values.SortOrder,
        Disable: values.checkbox,
        Attachments: document,
        ReferenceNo: bohRefNO,
        Bhdate: bohDate,
      };
    } else {
      setLoading(true);
      if (boMode == "A") {
        saveData = {
          RecordID: "",
          Prdid: recID,
          CUomRecordID: uomRecordID,
          CoRecordID: colorRecID,
          Description: selectmaterialLookupData.MlookupDesc,
          Mtlid: selectmaterialLookupData.MlookupRecordid,
          Psid: selectprocessLookupData.PSlookupRecordid,
          Quantity: values.Quantity,
          MtlCost: values.totalCost,
          SortOrder: values.SortOrder,
          Disable: values.checkbox,
          Attachments: document,
          ReferenceNo: bohRefNO,
          Bhdate: bohDate,
        };
        type = "insert";
      } else {
        saveData = {
          RecordID: finalClickInfo.RecordID,
          Prdid: recID,
          CUomRecordID: uomRecordID,
          CoRecordID: colorRecID,
          Description: selectmaterialLookupData.MlookupDesc,
          Mtlid: selectmaterialLookupData.MlookupRecordid,
          Psid: selectprocessLookupData.PSlookupRecordid,
          Quantity: values.Quantity,
          MtlCost: values.totalCost,
          SortOrder: values.SortOrder,
          Disable: values.checkbox,
          Attachments: document,
          ReferenceNo: bohRefNO,
          Bhdate: bohDate,
        };
        type = "update";
      }
    }
    console.log("bomsave" + JSON.stringify(saveData));

    const data = await dispatch(postApidatawol("TR016", type, saveData));
    console.log("Response---", JSON.stringify(data));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      setIniBom(true);
      setLoading(false);
      //alert(data.payload.apiResponse);
      dispatch(
        fetchExplorelitview("TR016", "BOM", data.payload.apiResponse, "")
      );
      resetForm();
      setFinalClickInfo({
        RecordID: "",
        Quantity: "",
        MtlCost: "",
        SortOrder: "",
        Disable: "",
      });
      setUploadFile("");
      selectcelldata("", "A", "");
    } else {
      setLoading(false);
      toast.error(data.payload.Msg);
    }
  };
  const fnProcess = async() => {

    const props = {accessID,recID}
    const Data = await dispatch(StockProcessApi(props))
     console.log("🚀 ~ file: Editproduct.jsx:320 ~ fnProcess ~ Data:", Data)
    if (Data.payload.Status == "Y") {
      toast.success(Data.payload.Msg);
      navigate( `Apps/Secondarylistview/TR050/List%20of%20Bom/${parentID}`)
    }else{
      toast.success(Data.payload.Msg);

    }}
  /*********************Form Clear******* */
  const clrForm = () => {
    setFinalClickInfo({
      RecordID: "",
      Quantity: "",
      MtlCost: "",
      SortOrder: "",
      Disable: "",
    });
    setUploadFile("");
    setTot("");
    selectcelldata("", "A", "");
  };

  /****************************View file in newtab******** */

  const fnViewFile = () => {
    var filePath = store.getState().globalurl.attachmentUrl + uploadFile;

    if (uploadFile == "") {
      toast.error("Please Upload File");
      return;
    } else {
      window.open(filePath, "_blank");
    }
  };

  const [selectCUSTLookupData, setselectCUSTLookupData] = React.useState({
    CUSTlookupRecordid: "",
    CUSTlookupCode: "",
    CUSTlookupDesc: "",
    Costprice:""
  });
  const [selectMATERIALLookupData, setselectMATERIALLookupData] =
    React.useState({
      MATERIALlookupRecordid: "",
      MATERIALlookupCode: "",
      MATERIALlookupDesc: "",
    });
  //************************** Lookup value assign type based Function *****************/

  const childToParent = (childdata, type) => {
    console.log("type---" + type);
    console.log("Data---" + JSON.stringify(childdata));
    setIniProduct(true);
    if (type == "Product Category") {
      setisPopupdata(true);
      setselectLookupData({
        lookupCode: childdata.Code,
        lookupRecordid: childdata.RecordID,
        lookupDesc: childdata.Name,
      });
      setOpenPCPopup(false);
    }
    if (type == "Products") {
      setselectCPLookupData({
        CPlookupRecordid: childdata.RecordID,
        CPlookupCode: childdata.Code,
        CPlookupDesc: childdata.Name,
      });
      setOpenCPpopup(false);
    }
    if (type == "Inventory UOM") {
      setisPopupdata(true);
      setselectInvUOMLookupData({
        ITUlookupRecordid: childdata.RecordID,
        ITUlookupCode: childdata.Code,
        ITUlookupDesc: childdata.Name,
      });
      setOpenITUPopup(false);
    }
    if (type == "Process/Stage") {
      setselectprocessLookupData({
        PSlookupCode: childdata.Code,
        PSlookupRecordid: childdata.ProcessRecordID,
        PSlookupDesc: childdata.Name,
        processRecID: childdata.ProcessRecordID,
      });
      setOpenPSPopup(false);
    }
    if (type == "Materials") {
      // var materialrate = childdata.Fixrate;
      setmateval(childdata.ConsumptionCost);

      setselectmaterialLookupData({
        MlookupCode: childdata.Code,
        MlookupRecordid: childdata.MaterialRecordID,
        MlookupDesc: childdata.Name,
        DesignApp: childdata.DesignApp,
        coneConversion:childdata.Purchase,
        uomConversionType:childdata.UomType,
        uomConDesc:childdata.ConsumptionDesc
      });

      setColorId(childdata.ColourRecordID);
      setUomId(childdata.CUomRecordID);
      setOpenMTPopup(false);
    }
    if (type == "Consumtion UOM") {
      setselectcuomLookupData({
        UomCode: childdata.Code,
        CUomRecordID: childdata.RecordID,
        UomDescription: childdata.Name,
      });
      setOpenCUPopup(false);
    }
    if (type == "Design Pattern") {
      setselectdpatternLookupData({
        DesignCode: childdata.Code,
        DesignPatternRecordID: childdata.RecordID,
        DesignDescription: childdata.Name,
      });
      setOpenDPPopup(false);
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
    if (type == "HSN") {
      setisPopupdata(true);
      setselecthsnLookupData({
        HSNlookupCode: childdata.Code,
        HSNlookupRecordid: childdata.RecordID,
       
      });
      setOpenHSNPopup(false);
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
    if (type == "Customer") {
      setselectCUSTLookupData({
        CUSTlookupCode: childdata.Code,
        CUSTlookupRecordid: childdata.RecordID,
        CUSTlookupDesc: childdata.Name,
      });
      setOpenCUSpopup(false);
    }
    if (type == "Material") {
      setselectMATERIALLookupData({
        MATERIALlookupCode: childdata.Code,
        MATERIALlookupRecordid: childdata.RecordID,
        MATERIALlookupDesc: childdata.Name,
      });
      setOpenMATERIALpopup(false);
    }
  };

  const [selectcuomLookupData, setselectcuomLookupData] = React.useState({
    CUomRecordID: "",
    UomCode: "",
    UomDescription: "",
  });
  const [selectdpatternLookupData, setselectdpatternLookupData] =
    React.useState({
      DesignPatternRecordID: "",
      DesignCode: "",
      DesignDescription: "",
    });

  /*****************bom grid Assign value Function ******************** */
  const selectbomdetailcelldata = (databom, bomMode, valuefield) => {
    console.log("selectdata" + JSON.stringify(databom));

    setBommode(bomMode);

    if (bomMode == "A") {
      setBomdata({
        RecordID: "",
        Length: "",
        Width: "",
        Quantity: "",
        SortOrder: "",
        WastageinPercent: "",
        Nos: "",
      });
      setselectdpatternLookupData({
        DesignPatternRecordID: "",
        DesignCode: "",
        DesignDescription: "",
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
      setWastagePercent("")
    } else {
      if (valuefield == "action") {
        setBomdata({
          RecordID: databom.RecordID,
          Length: databom.Length,
          Width: databom.Width,
          Quantity: databom.Quantity,
          SortOrder: databom.SortOrder,
          WastageinPercent: databom.c,
          //  Wastagemargin: databom.Wastagemargin,
          Nos: databom.Nos,

        });
        setselectcuomLookupData({
          CUomRecordID: databom.CUomRecordID,
          UomCode: databom.UomCode,
          UomDescription: databom.UomDescription,
        });
        setselectdpatternLookupData({
          DesignPatternRecordID: databom.DesignPatternRecordID,
          DesignCode: databom.DesignCode,
          DesignDescription: databom.DesignDescription,
        });
        setselectgrdLookupData({
          GRDlookupCode: databom.GradeCode,
          GRDlookupDesc: databom.GradeDescription,
          GRDlookupRecordid: databom.GradeRecordID,
        });
        setselectsubLookupData({
          SUBlookupCode: databom.SubstanceCode,
          SUBlookupDesc: databom.SubstanceDescription,
          SUBlookupRecordid: databom.SubstanceRecordID,
        });
        setWastagePercent(databom.WastageinPercent);
      }
    }
  };
  // //*******Assign Bom values from Database in  Yup initial value******* */
  const bomdetailInitialvalues = {
    Length: bomdata.Length,
    Width: bomdata.Width,
    Quantity: Number(bomdata.Quantity).toFixed(2),
    SortOrder: bomdata.SortOrder,
    WastageinPercent: bomdata.WastageinPercent,
    //  wastageMargin:bomdata.Wastagemargin,
    noofDesign: bomMode == "A" ? 1 : bomdata.Nos,
    // wastageMarginsqft:  bomdata.Wastagemarginsqft
  };

  const bomRecID = sessionStorage.getItem("BOMREC");

  /****************************** bomdetailSave  FUNCTION********** */
  const fnBomdetailSave = async (values, resetForm, types) => {
    setIniBom(false);
    if (types == "harddelete") {
      if (bomdata.RecordID == "") {
        toast.error("Please Select Bom Details ");
        setLoading(false);
        return;
      }
    }

    if (selectdpatternLookupData.DesignCode == "") {
      toast.error("Please Choose Design Pattern Lookup");
      setLoading(false);
      return;
    }

    if (values.noofDesign <= 0) {
      toast.error("No of Design Pattern Should Greater than 0");
      setLoading(false);
      return;
    }

    if (values.Length == "") {
      toast.error("Please Enter Length");
      setLoading(false);
      return;
    }
    if (materialType == "L") {
      if (selectgrdLookupData.GRDlookupRecordid == "") {
        toast.error("Please Choose Grade Lookup");
        setLoading(false);
        return;
      }
      if (selectsubLookupData.SUBlookupRecordid == "") {
        toast.error("Please Choose Substance Lookup");
        setLoading(false);
        return;
      }
    }
    console.log(values);

    var saveData = "";
    var type = "";
    var wastageinpercentage = 0;
    if (wastagePercent == 0 || wastagePercent == "") {
      wastageinpercentage = values.WastageinPercent;
    } else wastageinpercentage = wastagePercent;
    if (types === "harddelete") {
      type = "harddelete";
      saveData = {
        RecordID: bomdata.RecordID,
        Length: values.Length,
        Width: values.Width,
        GradeRecordID: selectgrdLookupData.GRDlookupRecordid,
        SubstanceRecordID: selectsubLookupData.SUBlookupRecordid,
        Quantity: values.Quantity,
        WastageinPercent: wastageinpercentage,
        SortOrder: values.SortOrder,
        DesignPatternRecordID: selectdpatternLookupData.DesignPatternRecordID,
        ConsumptionuomRecordID: selectcuomLookupData.CUomRecordID,
        ProductRecordID: recID,
        BomRecordID: finalClickInfo.RecordID,
        Total: wastageval,
        MaterialRecordID: selectmaterialLookupData.MlookupRecordid,
        TotalSqft: sqfeet,
        Nos: values.noofDesign,
        //Wastagemargin:values.wastageMargin,
        //Wastagemarginsqft:totalWastageMarginsqft
      };
    } else {
      setLoading(true);
      if (bomMode == "A") {
        saveData = {
          RecordID: "",
          Length: values.Length,
          Width: values.Width,
          Quantity: values.Quantity,
          WastageinPercent: wastageinpercentage,
          GradeRecordID: selectgrdLookupData.GRDlookupRecordid,
          SubstanceRecordID: selectsubLookupData.SUBlookupRecordid,
          SortOrder: values.SortOrder,
          DesignPatternRecordID: selectdpatternLookupData.DesignPatternRecordID,
          ConsumptionuomRecordID: selectcuomLookupData.CUomRecordID,
          ProductRecordID: recID,
          BomRecordID: finalClickInfo.RecordID,
          Total: wastageval,
          MaterialRecordID: selectmaterialLookupData.MlookupRecordid,
          TotalSqft: sqfeet,
          Nos: values.noofDesign,
          //  Wastagemargin:values.wastageMargin,
          // Wastagemarginsqft:totalWastageMarginsqft
        };
        type = "insert";
      } else {
        saveData = {
          RecordID: bomdata.RecordID,
          Length: values.Length,
          Width: values.Width,
          Quantity: values.Quantity,
          WastageinPercent: wastageinpercentage,
          GradeRecordID: selectgrdLookupData.GRDlookupRecordid,
          SubstanceRecordID: selectsubLookupData.SUBlookupRecordid,
          SortOrder: values.SortOrder,
          DesignPatternRecordID: selectdpatternLookupData.DesignPatternRecordID,
          ConsumptionuomRecordID: selectcuomLookupData.CUomRecordID,
          ProductRecordID: recID,
          BomRecordID: finalClickInfo.RecordID,
          Total: wastageval,
          MaterialRecordID: selectmaterialLookupData.MlookupRecordid,
          TotalSqft: sqfeet,
          Nos: values.noofDesign,
          // Wastagemargin:values.wastageMargin,
          // Wastagemarginsqft:totalWastageMarginsqft
        };
        type = "update";
      }
    }
    console.log("save" + JSON.stringify(saveData));

    const data = await dispatch(postApidata("TR046", type, saveData));
    // console.log("🚀 ~ file: Productdetail.jsx:1161 ~ fnBomdetailSave ~ data:", data)
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      setLoading(false);
      dispatch(fetchExplorelitview("TR046", "BOM Details", bomRecID, ""));
      setWastagePercent("")
      resetForm();
      setBomdata({
        RecordID: "",
        Length: "",
        Width: "",
        Quantity: "",
        SortOrder: "",
        WastageinPercent: "",
        wastageval: "",
        coneConversion:"",
      });
      setselectcuomLookupData({
        CUomRecordID: "",
        UomCode: "",
        UomDescription: "",
      });
      setselectdpatternLookupData({
        DesignPatternRecordID: "",
        DesignCode: "",
        DesignDescription: "",
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
      setIniBom(true);
      selectbomdetailcelldata("", "A", "");
      setWastagePercent(0);
    } else {
      toast.error(data.payload.Msg);
      setLoading(false);
    }
  };
  //******Bom detail clear****** */
  const clrBomdetForm = () => {
    setBomdata({
      RecordID: "",
      Length: "",
      Width: "",
      Quantity: "",
      SortOrder: "",
      WastageinPercent: "",
    });
    setselectcuomLookupData({
      CUomRecordID: "",
      UomCode: "",
      UomDescription: "",
    });
    setselectdpatternLookupData({
      DesignPatternRecordID: "",
      DesignCode: "",
      DesignDescription: "",
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

  };

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
  // **************Bom Detail calculation************
  const [sqfeet, setSqfeet] = useState();
  const [wastagePercent, setWastagePercent] = useState(0);
  const [totalWastageMargin, setTotalWastagemargin] = useState();
  const [totalWastageMarginsqft, setTotalWastagemarginsqft] = useState();
  const [uomRecID, setUomRecID] = useState({
    puomRecID: "",
    cuomRecID: "",
  });
  const [materialType, setMaterialType] = useState("");

  function quantityhandleClick(values) {
    console.log(values);
    console.log("statewastage value" + wastageValue);
    var detsquantity = Number(values.Length) * Number(conversionData.Type == "L" ? 1:values.Width);
    setquantity(detsquantity.toFixed(2));
    console.log("Tot--" + wastagePercent);
    if (wastagePercent == 0 || wastagePercent == "") {
      var wastageValuedts =
        Number(totquantity) +
        Number(totquantity) * Number(values.WastageinPercent / 100);
    } else {
      var wastageValuedts =
        Number(totquantity) +
        Number(totquantity) * Number(wastagePercent / 100);
    }
    //var wastageValuedmargin = Number(totquantity) + Number(totquantity) * Number(values.wastageMargin / 100);
    console.log("wastage" + wastageValuedts);

    if (values.noofDesign > 1) {
      setwastageval((wastageValuedts * values.noofDesign).toFixed(2));
    } else setwastageval(wastageValuedts.toFixed(2));

    // if(values.noofDesign > 1){
    //   setTotalWastagemargin(wastageValuedmargin * values.noofDesign);
    //   }else setTotalWastagemargin(wastageValuedmargin);

    var feet = Number(wastageval) * Number(conversionData.Conversionrate);
    //var W_M_sqft = Number(totalWastageMargin) * Number(conversionData.Conversion)

    setSqfeet(Number(feet).toFixed(5));
    //setTotalWastagemarginsqft(Number(W_M_sqft).toFixed(5))
  }

  // **************Bom Detail calculation************
  function matcalshandleClick(values) {
    if (boMode == "E") {
    //  const split_string = selectmaterialLookupData.coneConversion.split(/([+-]?([0-9]*[.])?[0-9]+)/)
      values.totalCost = (Number(values.Quantity) * Number(setrateval)).toFixed(2)
      // values.totalCost = selectmaterialLookupData.coneConversion.includes("Cone") ? (values.Quantity * (setrateval/(Number(split_string[1])*1000)).toFixed(2)) :(values.Quantity * setrateval).toFixed(2)
    } else {
    //  const split_string = selectmaterialLookupData.coneConversion.split(/([+-]?([0-9]*[.])?[0-9]+)/)
      // values.totalCost = selectmaterialLookupData.coneConversion.includes("Cone") ? (values.Quantity * (mateval/(Number(split_string[1])*1000)).toFixed(2))  :(values.Quantity * mateval).toFixed(2)
      values.totalCost = (Number(values.Quantity) * Number(mateval)).toFixed(2)
    }
  }

  const bomCopy = async () => {
    if (selectCPLookupData.CPlookupRecordid == "") {
      toast.error("Please Select Product");
    }

    const ResponseData = await dispatch(
      bomCopyApiData(selectCPLookupData.CPlookupRecordid)
    );
    if (ResponseData.payload.Status == "Y") {
      toast.success("Inserted Successfully");
      navigate(
        `/Apps/Secondarylistview/TR001/Product%20Master/${headerID}/${desc}`
      );
    }
  };
  const fnLogOut = (props) => {
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
            `/Apps/Secondarylistview/TR001/Product%20Master/${headerID}/${desc}`
          );
        }
      } else {
        return;
      }
    });
  };

  //  PRODUCT CUSTOMER

  const productCusInitialValue = {
    costprice: productCustomerData.price,
    agreedPrice:Number(productCustomerData.agreedPrice).toFixed(2),
    variousPercentage:productCustomerData.variousPercentage,
  };

  const productCusSave = async (values, resetForm, types) => {


    const idata = {
      RecordID: productCustomerData.recordID,
      AgreedPrice:values.agreedPrice,
      OrderQty: "0",
      DeliveredQty: "0",
      PendingQty: "0",
      SortOrder: 0,
      Disable: 0,
      MaterialRecordID:0,
      PrdRecordID: recID,
      CustRecordID: selectCUSTLookupData.CUSTlookupRecordid,
      VariantPercentage: values.agreedPrice - values.costprice,
      Costprice:values.costprice,
      Diesdescription:0,
    Diesimage:0,
    CompanyID:compID,
    Finyear:YearRecorid
    };
    var action;
    if (types === "harddelete") {
      action = "harddelete";
    } else {
      setLoading(true);
      if (boMode == "A") {
        action = "insert";
      } else {
        action = "update";
      }
    }

      const data = await dispatch(
        explorePostData({ accessID: "TR017", action, idata })
      );
      console.log(data);
      if (data.payload.Status == "Y") {
        toast.success(data.payload.Msg);
        setIniProduct(true);
        setLoading(false);
        selectcelldata("", "A", "");
        setProductCutomerData({
        agreedPrice: "",
        price: "",
        variousPercentage: "",
        recordID: "",
      });
        dispatch(
          fetchExplorelitview("TR017", "Products Customer", productfilter, "")
        );
      } else {
        toast.error(data.payload.Msg);
        setLoading(false);
      }
   
  };
  const diesInitialValue = {
    DiesCount: DiesData.DiesCount,
    SortOrder: DiesData.SortOrder,
  };
  const diesSave = async (values, resetForm, types) => {
    const idata = {
      RecordID: DiesData.recordID,
      DiesCount: values.DiesCount,
      SortOrder: values.SortOrder,
      MaterialID: selectMATERIALLookupData.MATERIALlookupRecordid,
      ProductID: recID,
      YearID: YearRecorid,
      CompanyID: compID,
    };

    var action;
    if (types === "harddelete") {
      action = "harddelete";
    } else {
      setLoading(true);
      if (boMode == "A") {
        action = "insert";
      } else {
        action = "update";
      }
    }

    const data = await dispatch(
      explorePostData({ accessID: "TR106", action, idata })
    );
    console.log(data);
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      setLoading(false);
      selectcelldata("", "A", "");
      dispatch(fetchExplorelitview("TR106", "Dies", recID, ""));
    } else {
      toast.error(data.payload.Msg);
      setLoading(false);
    }
  };

  console.log("stock" + Data.Desc);

  return (
    <React.Fragment>
      {/* <Box sx={{ height:'100vh',overflowY:'auto' }}> */}
      <Box display="flex" justifyContent="space-between" p={2}>
        {/* SEARCH BAR */}
        <Box
          display="flex"
          // backgroundColor={colors.primary[400]}
          borderRadius="3px"
          alignItems={"center"}
        >
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
                navigate(`/Apps/TR002/Categories`);
              }}
            >
              Product
            </Typography>
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate(`/Apps/Secondarylistview/TR001/Product Master/${headerID}/${desc}`);
              }}
            >
              {path}
            </Typography>

            {show == "4" ? (
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  setShow(1);
                  dispatch(fetchApidata(accessID, "get", recID));
                }}
              >
                {prodDesc}
              </Typography>
            ) : (
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  setShow(1);
                }}
              >
                {mode === "A" ? "New" : Data.Desc}
              </Typography>
            )}

            {show == "2" ? (
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                // onClick={() => {
                //   navigate(``);
                // }}
              >
                BOM
              </Typography>
            ) : (
              false
            )}
            {show == "4" ? (
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                // onClick={() => {
                //   navigate(``);
                // }}
              >
                Stock
              </Typography>
            ) : (
              false
            )}
            {show == "5" ? (
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                // onClick={() => {
                //   navigate(``);
                // }}
              >
                Design Pattern
              </Typography>
            ) : (
              false
            )}
            {show == "6" ? (
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                // onClick={() => {
                //   navigate(``);
                // }}
              >
                BOM Copy
              </Typography>
            ) : (
              false
            )}
            {show == "7" ? (
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                // onClick={() => {
                //   navigate(``);
                // }}
              >
                Customer Price
              </Typography>
            ) : (
              false
            )}
            {show == "8" ? (
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                // onClick={() => {
                //   navigate(``);
                // }}
              >
                Dies
              </Typography>
            ) : (
              false
            )}
          </Breadcrumbs>
        </Box>

        {/* ICONS */}

        <Box display="flex">
          {(mode == "E") && (show != 5)? (
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">Explore</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={show}
                label="Explore"
                onChange={handleChange}
              >
                <MenuItem value={1}>Product</MenuItem>
                <MenuItem value={2}>BOM</MenuItem>
                <MenuItem value={4}>Stock</MenuItem>
                {/* {showval == 3 ? (
                  <MenuItem value={5}>Design Pattern</MenuItem>
                ) : (
                  false
                )} */}
                <MenuItem value={6}>BOM Copy</MenuItem>
                <MenuItem value={7}>Customer Price</MenuItem>
                <MenuItem value={8}>Dies</MenuItem>
              </Select>
            </FormControl>
          ) : (
            false
          )}
          <IconButton onClick={() => fnLogOut("Close")} color="error">
            <ResetTvIcon />
          </IconButton>
          <IconButton onClick={() => fnLogOut("Logout")} color="error">
            <LogoutOutlinedIcon />
          </IconButton>
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
          {/* <IconButton>
          <PersonOutlinedIcon />
        </IconButton> */}
        </Box>
      </Box>

      {show == "1" ? (
        <Box m="20px">
          {/* { <Header title="Products" subtitle="" />  } */}

          <Formik
            initialValues={initialValues}
            onSubmit={(values, { resetForm }) => {
              setTimeout(() => {
                fnSave(values, resetForm);
              }, 100);
            }}
            validationSchema={productsSchema}
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
                      <img
                        src={userimg}
                        style={{ width: "200px", height: "150px" }}
                      />
                    </Stack>
                  )}
                  <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      value={values.ModelNo}
                      id="ModelNo"
                      name="ModelNo"
                      label="Model"
                     
                      placeholder="Auto"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.ModelNo && !!errors.ModelNo}
                      helperText={touched.ModelNo && errors.ModelNo}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      autoFocus
                     
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                      }}
                      inputProps={{ maxLength: 10, readOnly: true }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      value={values.Desc}
                      id="Desc"
                      name="Desc"
                      label="Description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      sx={{ gridColumn: "span 2" }}
                      focused
                      error={!!touched.Desc && !!errors.Desc}
                      helperText={touched.Desc && errors.Desc}
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
                      <img
                        src={userimg}
                        style={{ width: "200px", height: "150px" }}
                      />
                    </Stack>
                  )}

                  {/* { <FormLabel>Model#:</FormLabel> } */}
                  <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                    {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Leather Pattern"
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.LeaPattern && !!errors.LeaPattern}
                helperText={touched.LeaPattern && errors.LeaPattern}
                name="LeaPattern"
                value={values.LeaPattern}
                id="LeaPattern"
                sx={{ gridColumn: "span 2"}}
                focused
                inputProps={{ maxLength:20}}
              /> */}
                    {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Line Pattern"
               
                name="LinePattern"
                value={values.LinePattern}
                id="LinePattern"
                onBlur={handleBlur}
                onChange={handleChange}
                sx={{ gridColumn: "span 2"}}
                focused
                error={!!touched.LinePattern && !!errors.LinePattern}
                helperText={touched.LinePattern && errors.LinePattern}
                inputProps={{ maxLength:20}}
              /> */}
                    {/* <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Others"
                onBlur={handleBlur}
                onChange={handleChange}
               name="Bomothers"
                error={!!touched.Bomothers && !!errors.Bomothers}
                helperText={touched.Bomothers && errors.Bomothers}
                value={values.Bomothers}
                id="Bomothers"
                sx={{ gridColumn: "span 2"}}
                focused
                InputProps={{
                  inputProps: {
                      style: { textAlign: "right" },
                  }
              }}
              /> */}
                    <FormControl>
                      <React.Fragment>
                        <FormLabel>Type</FormLabel>

                        <Field
                          as="select"
                          label="Type"
                          onChange={handleChange}
                          value={values.ProductType}
                          id="ProductType"
                          name="ProductType"
                          focused
                          style={style}
                        >
                          {/* <option>Sample</option> */}
                          <option value="S">Sample</option>
                          <option value="A">Approved</option>
                          <option value="G">General</option>
                        </Field>
                      </React.Fragment>
                    </FormControl>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Production Per Day"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="Ppday"
                      error={!!touched.Ppday && !!errors.Ppday}
                      helperText={touched.Ppday && errors.Ppday}
                      value={values.Ppday}
                      id="Ppday"
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
                          .slice(0, 22);
                      }}
                    />
                    {/* <FormControl
                      sx={{
                        gridColumn: "span 2",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <TextField
                        id="inventoryuom"
                        label="Inventory UOM"
                        variant="filled"
                        value={selectInvUOMLookupData.ITUlookupDesc}
                        fullWidth
                        required
                        focused
                        // onInvalid={(e) => { e.target.setCustomValidity('Please Fill The Inventory UOM') }}
                        // onInput ={(e) => { e.target.setCustomValidity('') }}
                      />
                      <IconButton
                        sx={{ height: 40, width: 40 }}
                        onClick={() => handleShow("ITU")}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>
                    </FormControl> */}
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Height (in cm)"
                      value={values.Height}
                      id="Height"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      // value={values.address2}
                      name="Height"
                      error={!!touched.Height && !!errors.Height}
                      helperText={touched.Height && errors.Height}
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
                      type="number"
                      label="Length (in cm)"
                      value={values.Length}
                      id="Length"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      // value={values.address2}
                      name="Length"
                      error={!!touched.Length && !!errors.Length}
                      helperText={touched.Length && errors.Length}
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
                      type="number"
                      label="Breath (in cm)"
                      value={values.Breadth}
                      id="Breadth"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="Breadth"
                      error={!!touched.Breadth && !!errors.Breadth}
                      helperText={touched.Breadth && errors.Breadth}
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
                      type="number"
                      label="Price(MRP)"
                      value={values.price}
                      id="price"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      // value={values.address2}
                      name="price"
                      // error={!!touched.NetWeight && !!errors.NetWeight}
                      // helperText={touched.NetWeight && errors.NetWeight}
                      sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                      focused
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                    />
                    <FormControl>
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
                  </FormControl>
                  <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                  <FormControl
                      sx={{
                        gridColumn: "span 2",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop:"20px"
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="ID"
                        variant="filled"
                         value={selecthsnLookupData.HSNlookupRecordid}
                        focused
                        sx={{ display: "none"  }}
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
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Width (in cm)"
                      value={values.Width}
                      id="Width"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      // value={values.address2}
                      name="Width"
                      error={!!touched.Width && !!errors.Width}
                      helperText={touched.Width && errors.Width}
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
                      type="number"
                      label="Weight"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      // value={values.address2}
                      name="Weight"
                      error={!!touched.Weight && !!errors.Weight}
                      helperText={touched.Weight && errors.Weight}
                      sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                      value={values.Weight}
                      id="Weight"
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
                      label=" Net Weight"
                      value={values.NetWeight}
                      id="NetWeight"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      // value={values.address2}
                      name="NetWeight"
                      error={!!touched.NetWeight && !!errors.NetWeight}
                      helperText={touched.NetWeight && errors.NetWeight}
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
                      type="number"
                      label=" Cost Price"
                      value={values.costPrice}
                      id="costPrice"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      // value={values.address2}
                      name="costPrice"
                      // error={!!touched.NetWeight && !!errors.NetWeight}
                      // helperText={touched.NetWeight && errors.NetWeight}
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
                      navigate(
                        `/Apps/Secondarylistview/TR001/Product%20Master/${headerID}/${desc}`
                      );
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          <Popup
            title="Product Category"
            openPopup={openPCPopup}
            setOpenPopup={setOpenPCPopup}
          >
            <Listviewpopup
              accessID="TR002"
              screenName="Product Category"
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
          <Popup
            title="Inventory UOM"
            openPopup={openITUPopup}
            setOpenPopup={setOpenITUPopup}
          >
            <Listviewpopup
              accessID="2005"
              screenName="Inventory UOM"
              childToParent={childToParent}
            />
          </Popup>
        </Box>
      ) : (
        false
      )}

      {show == "2" ? (
        <Box m="20px" sx={{ m: 2 }}>
          {/* <Header title="Products" subtitle="" /> */}

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
                      <img
                        src={userimg}
                        style={{ width: "200px", height: "150px" }}
                      />
                    </Stack>
                  )}
                  <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      value={initialValues.ModelNo}
                      id="ModelNo"
                      name="ModelNo"
                      label="Model"
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.ModelNo && !!errors.ModelNo}
                      helperText={touched.ModelNo && errors.ModelNo}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      inputProps={{ maxLength: 10, readOnly: true }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      value={values.Desc}
                      id="Desc"
                      name="Desc"
                      label="Description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      sx={{ gridColumn: "span 2" }}
                      focused
                      error={!!touched.Desc && !!errors.Desc}
                      helperText={touched.Desc && errors.Desc}
                      inputProps={{ maxLength: 50, readOnly: true }}
                      multiline
                    />

                    {isBOMHdata == true ? (
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        value={bohRefNO}
                        onChange={(e) => {
                          setbohRefNO(e.target.value);
                        }}
                        label="Reference & Version No"
                        required
                        sx={{ gridColumn: "span 2" }}
                        focused
                        inputProps={{ maxLength: 50, readOnly: true }}
                      />
                    ) : (
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        value={bohRefNO}
                        onChange={(e) => {
                          setbohRefNO(e.target.value);
                        }}
                        label="Reference & Version No"
                        required
                        sx={{ gridColumn: "span 2" }}
                        focused
                        inputProps={{ maxLength: 50 }}
                      />
                    )}
                  </FormControl>
                  <FormControl sx={{ gridColumn: "span 2" }}>
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
                        <img
                          src={userimg}
                          style={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}
                   
                  </FormControl>
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
                          //onCellClick={handleOnCellClick}
                          //onClick={selectrowdata(params,'E')}

                          onCellClick={(params) => {
                            const currentcell = params.row;
                            const currentcellField = params.field;
                            selectcelldata(currentcell, "E", currentcellField);
                            console.log(
                              "selectcelldata" +
                                JSON.stringify(currentcellField)
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
                    {/* <Footer/> */}
                  </FormControl>
                  <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                    <Formik
                      innerRef={ref}
                      initialValues={bomInitialvalues}
                      onSubmit={(values, { resetForm }) => {
                        setTimeout(() => {
                          fnBomSave(values, resetForm, "");
                          // alert("hai");
                        }, 100);
                      }}
                      validationSchema={probomSchema}
                      enableReinitialize={iniBom}
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
                          onChange={matcalshandleClick(values)}
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
                                  id="psID"
                                  label="ID"
                                  variant="filled"
                                  value={
                                    selectprocessLookupData.PSlookupRecordid
                                  }
                                  focused
                                  sx={{ display: "none" }}
                                />
                                <TextField
                                  id="psCode"
                                  label="Stage / Process"
                                  variant="filled"
                                  value={selectprocessLookupData.PSlookupCode}
                                  focused
                                  required
                                  inputProps={{ tabIndex: "-1" }}
                                />
                                <IconButton
                                  sx={{ height: 40, width: 40 }}
                                  onClick={() => handleShow("PS")}
                                >
                                  <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                </IconButton>
                                {/* <MoreHorizIcon onClick={()=>handleShow('PS')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                                <TextField
                                  id="psDesc"
                                  variant="filled"
                                  value={selectprocessLookupData.PSlookupDesc}
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
                              value={selectmaterialLookupData.MlookupRecordid}
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
                                  value={selectmaterialLookupData.MlookupCode}
                                  focused
                                  required
                                  inputProps={{ tabIndex: "-1" }}
                                />
                                <IconButton
                                  sx={{ height: 40, width: 40 }}
                                  onClick={() => handleShow("MT")}
                                >
                                  <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                </IconButton>
                                {/* <MoreHorizIcon onClick={()=>handleShow('MT')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                                <TextField
                                  id="outlined-basic"
                                  variant="filled"
                                  value={selectmaterialLookupData.MlookupDesc}
                                  fullWidth
                                  inputProps={{ tabIndex: "-1" }}
                                  focused
                                />
                              </FormControl>
                            </FormControl>
                            {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Code"
                required
                onBlur={handleBlur}
                onChange={handleChange}
                id="MtlCode"
                name="MtlCode"
                value={values.MtlCode}
             //   error={!!touched.code && !!errors.code}
               // helperText={touched.code && errors.code}
                sx={{ gridColumn: "span 2" }}
                focused
              
              /> */}

                            <TextField
                              fullWidth
                              variant="filled"
                              type="number"
                              label="BOM Quantity"
                              id="Quantity"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.Quantity}
                              name="Quantity"
                              sx={{
                                gridColumn: "span 2",
                                background: "#fff6c3",
                              }}
                              focused
                              error={!!touched.Quantity && !!errors.Quantity}
                              helperText={touched.Quantity && errors.Quantity}
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: "right" },
                                },
                              }}
                            />

                            <TextField
                              fullWidth
                              variant="filled"
                              label=" Material Cost"
                              value={values.totalCost}
                              id="totalCost"
                              onBlur={handleBlur}
                              name="totalCost"
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
                              label="Sort Order"
                              value={values.SortOrder}
                              id="SortOrder"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              name="SortOrder"
                              error={!!touched.SortOrder && !!errors.SortOrder}
                              helperText={touched.SortOrder && errors.SortOrder}
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
                            <FormControl
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              {/* <FormControlLabel control={<Field type="checkbox" name="checkbox" id="checkbox"  label="Disable" />} label="Disable" /> */}
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
                                  <PictureAsPdfOutlinedIcon fontSize="large" />
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
                                {boMode === "E" ? (
                                  selectmaterialLookupData.DesignApp == "Y" ? (
                                    <Button
                                      sx={{ ml: "60px" }}
                                      variant="contained"
                                      component={"a"}
                                      onClick={async() => {
                                        

                                       const response = await dispatch(
                                          dpConversionData({
                                            Purchase: uomRecID.cuomRecID,
                                            FromID : uomRecID.puomRecID,
                                            Type:selectmaterialLookupData.uomConversionType,
                                            MaterialID:selectmaterialLookupData.MlookupRecordid
                                          
                                          })
                                        );
                                        if(response.payload.Status == "Y"){
                                          bomDetail("3");
                                        }else  toast.error(response.payload.Msg)
                                        console.log("🚀 ~ file: Productdetail.jsx:2997 ~ onClick={async ~ response:", response)
                                        // if(response.){}
                                      }}
                                    >
                                      Design Pattern
                                    </Button>
                                  ) : (
                                    false
                                  )
                                ) : (
                                  false
                                )}
                              </Box>
                            </FormControl>
                          </FormControl>

                          {/* </Box> */}
                          <Box
                            display="flex"
                            justifyContent="end"
                            mt="30px"
                            gap={2}
                          >
                             {Data.Process == "N" ?(
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={fnProcess}
                      
                    >
                      Process
                    </Button>
                ):null}
                            {YearFlag == "true" ? (
                              <LoadingButton
                                color="secondary"
                                variant="contained"
                                type="submit"
                                // onClick={() => {
                                //   fnBomSave(values, resetForm, "");
                                // }}
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
                               onClick={() => {  Swal.fire({
                                 title: `Do you want Delete?`,
                                 icon: "warning",
                                 showCancelButton: true,
                                 confirmButtonColor: "#3085d6",
                                 cancelButtonColor: "#d33",
                                 confirmButtonText: "Confirm",
                               }).then((result) => {
                                 if (result.isConfirmed) {
                                  fnBomSave(values, resetForm, "harddelete");
                                   
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
                                setShow(1);
                                dispatch(fetchApidata(accessID, "get", recID));
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
            title="Process/Stage"
            openPopup={openPSPopup}
            setOpenPopup={setOpenPSPopup}
          >
            <Listviewpopup
              accessID="2035"
              screenName="Process/Stage"
              childToParent={childToParent}
            />
          </Popup>
          <Popup
            title="Materials"
            openPopup={openMTPopup}
            setOpenPopup={setOpenMTPopup}
          >
            <Listviewpopup
              accessID="2036"
              screenName="Materials"
              childToParent={childToParent}
              filterName={"parentID"}
              filterValue={selectprocessLookupData.processRecID}
            />
          </Popup>
        </Box>
      ) : (
        false
      )}

      {showval == 3 ? (
        <Box m="20px" sx={{ m: 2 }}>
          {/* <Header title="Products" subtitle="" /> */}

          <Formik
            // onSubmit={handleFormSubmit}
            initialValues={initialValues}
            enableReinitialize={ini}
            validationSchema={basicSchema}
          >
            {({ values, errors, touched, handleBlur, handleChange }) => (
              <form onSubmit={quantityhandleClick(values)}>
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
                    value={values.ModelNo}
                    id="ModelNo"
                    name="ModelNo"
                    label="Model"
                    required
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.ModelNo && !!errors.ModelNo}
                    helperText={touched.ModelNo && errors.ModelNo}
                    sx={{ gridColumn: "span 2" }}
                    focused
                    inputProps={{ maxLength: 10, readOnly: true }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    value={values.Desc}
                    id="Desc"
                    name="Desc"
                    label="Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    sx={{ gridColumn: "span 2" }}
                    focused
                    error={!!touched.Desc && !!errors.Desc}
                    helperText={touched.Desc && errors.Desc}
                    inputProps={{ maxLength: 50, readOnly: true }}
                    multiline
                  />

                  <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
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
                          columns={designPatternColumns}
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
                            selectbomdetailcelldata(
                              currentcell,
                              "E",
                              currentcellField
                            );
                            console.log(
                              "selectbomdetailcelldata" + JSON.stringify(params)
                            );
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
                    {/* <Footer/> */}

                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Area"
                      value={totquantity}
                      sx={{
                        gridColumn: "span 2",
                        background: "#FFDAC0",
                        input: { textAlign: "right" },
                      }}
                      focused
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Wastage in Percent"
                      name="WastageinPercent"
                      value={values.WastageinPercent || wastagePercent}
                      id="WastageinPercent"
                      onBlur={handleBlur}
                      onChange={(e) => setWastagePercent(e.target.value)}
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                      }}
                      focused
                      error={
                        !!touched.WastageinPercent && !!errors.WastageinPercent
                      }
                      helperText={
                        touched.WastageinPercent && errors.WastageinPercent
                      }
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                      inputProps={{ maxLength: 11 }}
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
                          fullWidth
                          variant="filled"
                          type="number"
                          label={conversionData.Type == "A"?"Square Centimeter":"Centimeter"}
                          value={wastageval}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{ gridColumn: "span 2", background: "#FFDAC0" }}
                          focused
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          onInput={(e) => {
                            e.target.value = Math.max(
                              0,
                              parseInt(e.target.value)
                            );
                          }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            height: 40,
                            width: 40,
                          }}
                        >
                          <DragHandleIcon />
                        </Box>

                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label={
                            selectmaterialLookupData.uomConDesc === "Numbers"
                              ?  "Square Centimeter"
                              : selectmaterialLookupData.uomConDesc
                          }
                          value={
                            selectmaterialLookupData.uomConDesc === "Numbers"
                              ? wastageval
                              : sqfeet
                          }
                          // value={sqfeet}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{ gridColumn: "span 2", background: "#FFDAC0" }}
                          focused
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
                      </FormControl>
                    </FormControl>
                  </FormControl>
                  <FormControl sx={{ gridColumn: "span 2", gap: "30px" }}>
                    <Formik
                      innerRef={ref}
                      initialValues={bomdetailInitialvalues}
                      enableReinitialize={iniBom}
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
                        <form onSubmit={quantityhandleClick(values)}>
                          <FormControl
                            sx={{ gridColumn: "span 2", gap: "40px" }}
                            fullWidth
                          >
                            <TextField
                              id="psID"
                              label="ID"
                              variant="filled"
                              value={
                                selectdpatternLookupData.DesignPatternRecordID
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
                              {/* <FormLabel>Stage/Process</FormLabel> */}
                              <FormControl
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  marginTop: "70px",
                                }}
                              >
                                <TextField
                                  id="psCode"
                                  label="Design Pattern"
                                  variant="filled"
                                  value={selectdpatternLookupData.DesignCode}
                                  focused
                                  required
                                  inputProps={{ tabIndex: "-1" }}
                                />
                                <IconButton
                                  sx={{ height: 40, width: 40 }}
                                  onClick={() => handleShow("DP")}
                                >
                                  <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                </IconButton>

                                <TextField
                                  id="psDesc"
                                  variant="filled"
                                  value={
                                    selectdpatternLookupData.DesignDescription
                                  }
                                  fullWidth
                                  inputProps={{ tabIndex: "-1" }}
                                  focused
                                />
                              </FormControl>
                            </FormControl>

                            {materialType == "L" && (
                              <React.Fragment>
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
                                    value={
                                      selectgrdLookupData.GRDlookupRecordid
                                    }
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
                                      required
                                      inputProps={{ tabIndex: "-1" }}
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
                                    value={
                                      selectsubLookupData.SUBlookupRecordid
                                    }
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
                                      required
                                      inputProps={{ tabIndex: "-1" }}
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
                                      inputProps={{ tabIndex: "-1" }}
                                      focused
                                    />
                                  </FormControl>
                                </FormControl>{" "}
                              </React.Fragment>
                            )}

                            <TextField
                              fullWidth
                              variant="filled"
                              type="number"
                              label="Length (in cm)"
                              id="Length"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.Length}
                              name="Length"
                              sx={{
                                gridColumn: "span 2",
                                background: "#fff6c3",
                              }}
                              error={!!touched.Length && !!errors.Length}
                              helperText={touched.Length && errors.Length}
                              focused
                              required
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: "right" },
                                },
                              }}
                            />

                        {conversionData.Type == "A" ?   
                        <TextField
                              fullWidth
                              variant="filled"
                              type="number"
                              label=" Width (in cm)"
                              value={conversionData.Type == "L" ? 1:values.Width}
                              id="Width"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              name="Width"
                              error={!!touched.Width && !!errors.Width}
                              helperText={touched.Width && errors.Width}
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
                            />:false}

                            <TextField
                              fullWidth
                              variant="filled"
                              type="number"
                              label="Nos"
                              id="noofDesign"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.noofDesign}
                              name="noofDesign"
                              sx={{
                                gridColumn: "span 2",
                                background: "#fff6c3",
                              }}
                              error={
                                !!touched.noofDesign && !!errors.noofDesign
                              }
                              helperText={
                                touched.noofDesign && errors.noofDesign
                              }
                              focused
                              required
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
                              label="Total"
                              value={wastageval}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              sx={{
                                gridColumn: "span 2",
                                background: "#FFDAC0",
                              }}
                              focused
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: "right" },
                                },
                              }}
                              // inputProps={{ maxLength: 11 }}
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
                              error={!!touched.SortOrder && !!errors.SortOrder}
                              helperText={touched.SortOrder && errors.SortOrder}
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
                                onClick={() => {
                                  fnBomdetailSave(values, resetForm);
                                }}
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
                                onClick={() => {
                                  fnBomdetailSave(
                                    values,
                                    resetForm,
                                    "harddelete"
                                  );
                                }}
                                color="error"
                                variant="contained"
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
                                clrBomdetForm();
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              sx={{ ml: "60px" }}
                              variant="contained"
                              component={"a"}
                              onClick={fnvalue}
                            >
                              BOM
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

          <Popup
            title="Design Pattern"
            openPopup={openDPPopup}
            setOpenPopup={setOpenDPPopup}
          >
            <Listviewpopup
              accessID="2015"
              screenName="Design Pattern"
              childToParent={childToParent}
            />
          </Popup>
          <Popup
            title="Consumtion UOM"
            openPopup={openCUPopup}
            setOpenPopup={setOpenCUPopup}
          >
            <Listviewpopup
              accessID="2005"
              screenName="Consumtion UOM"
              childToParent={childToParent}
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
        </Box>
      ) : (
        false
      )}
      {show == 4 ? (
        <Box m="20px" sx={{ m: 2 }}>
          <Formik
            // onSubmit={handleFormSubmit}
            initialValues={stockIntialValue}
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
                      <img
                        src={userimg}
                        style={{ width: "200px", height: "150px" }}
                      />
                    </Stack>
                  )}
                  <FormControl
                    fullWidth
                    sx={{ gridColumn: "span 2", gap: "40px" }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      value={modelID}
                      id="ModelNo"
                      name="ModelNo"
                      label="Model"
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.ModelNo && !!errors.ModelNo}
                      helperText={touched.ModelNo && errors.ModelNo}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      inputProps={{ maxLength: 10, readOnly: true }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      value={prodDesc}
                      id="Desc"
                      name="Desc"
                      label="Description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      sx={{ gridColumn: "span 2" }}
                      focused
                      error={!!touched.Desc && !!errors.Desc}
                      helperText={touched.Desc && errors.Desc}
                      inputProps={{ maxLength: 50, readOnly: true }}
                      multiline
                    />
                  </FormControl>
                  <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
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
                        <img
                          src={userimg}
                          style={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}
                  </FormControl>

                  <FormControl
                    fullWidth
                    sx={{ gridColumn: "span 2", gap: "40px" }}
                  >
                    <TextField
                      name="OpenstockProductQty"
                      type="number"
                      id="OpenstockProductQty"
                      value={values.OpenstockProductQty}
                      label="Opening Stock"
                      variant="filled"
                      focused
                      inputProps={{ style: { textAlign: "right" } }}
                      InputProps={{ readOnly: true }}
                      sx={{ background: "#fff6c3" }}
                    />

                    <TextField
                      name="IssuedStockPrdQty"
                      type="number"
                      id="IssuedStockPrdQty"
                      label="Issued Qty(Production + Out DC)"
                      variant="filled"
                      value={values.IssuedStockPrdQty}
                      focused
                      inputProps={{ style: { textAlign: "right" } }}
                      InputProps={{ readOnly: true }}
                      sx={{ background: "#fff6c3" }}
                    />

                    <Tooltip title="OpeningStock - IssueQty">
                      <TextField
                        name="Stock"
                        type="number"
                        id="Stock"
                        label="Available Stock"
                        variant="filled"
                        value={values.Stock}
                        focused
                        sx={{ background: "#FFDAC0" }}
                        inputProps={{ style: { textAlign: "right" } }}
                        InputProps={{ readOnly: true }}
                      />
                    </Tooltip>
                    <Tooltip title="Requirement Qty - Batchissue Qty">
                      <TextField
                        name="RequirementStockPrdQty"
                        type="number"
                        id="RequirementStockPrdQty"
                        label="Requirement Qty(Asper ProductionCard)"
                        variant="filled"
                        value={values.RequirementStockPrdQty}
                        focused
                        sx={{ background: "#fff6c3" }}
                        inputProps={{ style: { textAlign: "right" } }}
                        InputProps={{ readOnly: true }}
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
                        sx={{ background: "#FFDAC0" }}
                      />
                    </Tooltip>
                  </FormControl>
                  <FormControl
                    fullWidth
                    sx={{ gridColumn: "span 2", gap: "40px" }}
                  >
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
                  {/* {parentID == 'L' ?   
                    <FormControl
                  fullWidth
                  sx={{ gridColumn: "span 2", gap: "40px" }}
                >
                    <TextField
                    name="openingstock"
                    type="text"
                    id="openingstock"
                    label="Opening Stock"
                    variant="filled"
                    focused/>
                    <TextField
                    name="receivedhideqty"
                    type="text"
                    id="receivedhideqty"
                    label="Received Hide Qty"
                    variant="filled"
                    focused/>
                    <TextField
                    name="receivedhidesqft"
                    type="text"
                    id="receivedhidesqft"
                    label="Received Hide sq.ft"
                    variant="filled"
                    focused/>
                    <TextField
                    name="receivedsideqty"
                    type="text"
                    id="receivedsideqty"
                    label="Received Side Qty"
                    variant="filled"
                    focused/>
                    <TextField
                    name="receivedsidesqft"
                    type="text"
                    id="receivedsidesqft"
                    label="Received Side sq.ft"
                    variant="filled"
                    focused/>
                    <TextField
                    name="issuedhideqty"
                    type="text"
                    id="issuedhideqty"
                    label="Issued Hide Qty"
                    variant="filled"
                    focused/>
                    </FormControl>:false}
                     {parentID == 'L' ?   
                     <FormControl
                   fullWidth
                   sx={{ gridColumn: "span 2", gap: "40px" }}
                 >
                    <TextField
                    name="issuedhidesqft"
                    type="text"
                    id="issuedhidesqft"
                    label="Issued Hide sq.ft"
                    variant="filled"
                    focused/>
                    <TextField
                    name="issuedsideqty"
                    type="text"
                    id="issuedsideqty"
                    label="Issued Side Qty"
                    variant="filled"
                    focused/>
                    <TextField
                    name="issuedSidesqft"
                    type="text"
                    id="issuedSidesqft"
                    label="Issued Side sq.ft"
                    variant="filled"
                    focused/>
                    <TextField
                    name="stock"
                    type="text"
                    id="stock"
                    label="Stock"
                    variant="filled"
                    focused/>
                    <TextField
                    name="requirement"
                    type="text"
                    id="requirement"
                    label="Requirement"
                    variant="filled"
                    focused/>
                    <TextField
                    name="balance"
                    type="text"
                    id="balance"
                    label="Balance"
                    variant="filled"
                    focused/>
                   
                    
                    </FormControl>:false} */}
                </Box>
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
                setShow(1);
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

      {show == 6 ? (
        <Box m="20px" sx={{ m: 2 }}>
          <Box
            display="grid"
            gridTemplateColumns="repeat(4 , minMax(0,1fr))"
            gap="30px"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <FormControl
              sx={{ gridColumn: "span 2", gap: "40px" }}
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
                {/* <FormLabel>product Id</FormLabel> */}
                <FormControl
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    id="psCode"
                    label="product Id"
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
            </FormControl>
          </Box>

          <Box display="flex" justifyContent="end" mt="20px" gap="20px">
            {YearFlag == "true" ? (
              <LoadingButton
                onClick={() => {
                  bomCopy();
                }}
                variant="contained"
                color="secondary"
                loading={loading}
              >
                SAVE
              </LoadingButton>
            ) : (
              <Button color="secondary" variant="contained" disabled={true}>
                Save
              </Button>
            )}
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setShow(1);
                dispatch(fetchApidata(accessID, "get", recID));
              }}
            >
              CANCEL
            </Button>
          </Box>
          <Popup
            title=" Products"
            openPopup={openCPpopup}
            setOpenPopup={setOpenCPpopup}
          >
            <Listviewpopup
              accessID="2002"
              screenName="Products"
              childToParent={childToParent}
            />
          </Popup>
        </Box>
      ) : (
        false
      )}
      {show == "7" ? (
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
                      <img
                        src={userimg}
                        style={{ width: "200px", height: "150px" }}
                      />
                    </Stack>
                  )}
                  <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      value={initialValues.ModelNo}
                      id="ModelNo"
                      name="ModelNo"
                      label="Model"
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.ModelNo && !!errors.ModelNo}
                      helperText={touched.ModelNo && errors.ModelNo}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      inputProps={{ maxLength: 10, readOnly: true }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      value={values.Desc}
                      id="Desc"
                      name="Desc"
                      label="Description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      sx={{ gridColumn: "span 2" }}
                      focused
                      error={!!touched.Desc && !!errors.Desc}
                      helperText={touched.Desc && errors.Desc}
                      inputProps={{ maxLength: 50, readOnly: true }}
                      multiline
                    />
                  </FormControl>
                  <FormControl sx={{ gridColumn: "span 2" }}>
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
                        <img
                          src={userimg}
                          style={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}
                   
                  </FormControl>

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
                          //onCellClick={handleOnCellClick}
                          //onClick={selectrowdata(params,'E')}

                          onCellClick={(params) => {
                            const currentcell = params.row;
                            const currentcellField = params.field;
                            selectcelldata(currentcell, "E", currentcellField);
                          }}
                          //   onRowClick={(params) => {
                          //     const currentRow = params.row;
                          //     selectrowdata(currentRow,'E');

                          // }
                          // }

                          components={{
                            Toolbar: CustomerToolbar,
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
                    {/* <Footer/> */}
                  </FormControl>
                  <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                    <Formik
                      innerRef={ref}
                      initialValues={productCusInitialValue}
                      validationSchema={customerSchema}
                      onSubmit={(values, { resetForm }) => {
                        setTimeout(() => {
                          productCusSave(values, resetForm, "hard");
                          // alert("hai");
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
                        >
                          <FormControl
                            sx={{ gridColumn: "span 2", gap: "40px" }}
                            style={{ width: "100%" }}
                          >
                            <TextField
                              id="psID"
                              label="ID"
                              variant="filled"
                              value={selectCUSTLookupData.CUSTlookupRecordid}
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
                                  label="Customer ID"
                                  variant="filled"
                                  value={selectCUSTLookupData.CUSTlookupCode}
                                  focused
                                  required
                                  inputProps={{ tabIndex: "-1" }}
                                  sx={{ marginTop: "50px" }}
                                />
                                <IconButton
                                  sx={{
                                    height: 40,
                                    width: 40,
                                    marginTop: "50px",
                                  }}
                                  onClick={() => handleShow("CUS")}
                                >
                                  <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                </IconButton>
                                {/* <MoreHorizIcon onClick={()=>handleShow('PS')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                                <TextField
                                  id="psDesc"
                                  variant="filled"
                                  value={selectCUSTLookupData.CUSTlookupDesc}
                                  fullWidth
                                  inputProps={{ tabIndex: "-1" }}
                                  focused
                                  sx={{ marginTop: "50px" }}
                                />
                              </FormControl>
                            </FormControl>
                            <TextField
                              name="agreedPrice"
                              type="text"
                              id="agreedPrice"
                              value={values.agreedPrice}
                              label="Agreed Price"
                              variant="filled"
                              focused
                              onBlur={handleBlur}
                              onChange={handleChange}
                              sx={{
                                background: "#fff6c3",
                                input: { textAlign: "right" },
                              }}
                              error={!!touched.agreedPrice && !!errors.agreedPrice}
                      helperText={touched.agreedPrice && errors.agreedPrice} 
                            />
                            <TextField
                              name="costprice"
                              type="number"
                              id="costprice"
                              label="Costing Price"
                              variant="filled"
                              value={values.costprice}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              focused
                              InputProps={{
                                readOnly: true
                              }}
                              sx={{
                                background: "#fff6c3",
                                input: { textAlign: "right" },
                              }}
                            />
                            <TextField
                              name="variousPercentage"
                              type="number"
                              id="variousPercentage"
                              label="Various Percentage"
                              variant="filled"
                              value={Number(values.agreedPrice) - Number(values.costprice)}
                              focused
                              onBlur={handleBlur}
                              onChange={handleChange}
                              sx={{
                                background: "#fff6c3",
                                input: { textAlign: "right" },
                              }}
                              InputProps={{
                                readOnly: true
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
                                // onClick={() => {
                                //   fnBomSave(values, resetForm, "");
                                // }}
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
                              
                                  productCusSave(values,resetForm,"harddelete");
                                  
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
                                setShow(1);
                                dispatch(fetchApidata(accessID, "get", recID));
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
            title="Customer"
            openPopup={openCUSpopup}
            setOpenPopup={setOpenCUSpopup}
          >
            <Listviewpopup
              accessID="2009"
              screenName="Customer"
              childToParent={childToParent}
            />
          </Popup>
        </Box>
      ) : (
        false
      )}
      {show == "8" ? (
        <Box m="20px" sx={{ m: 2 }}>
          {/* <Header title="Products" subtitle="" /> */}

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
                      <img
                        src={userimg}
                        style={{ width: "200px", height: "150px" }}
                      />
                    </Stack>
                  )}
                  <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      value={initialValues.ModelNo}
                      id="ModelNo"
                      name="ModelNo"
                      label="Model"
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.ModelNo && !!errors.ModelNo}
                      helperText={touched.ModelNo && errors.ModelNo}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      inputProps={{ maxLength: 10, readOnly: true }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      value={values.Desc}
                      id="Desc"
                      name="Desc"
                      label="Description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      sx={{ gridColumn: "span 2" }}
                      focused
                      error={!!touched.Desc && !!errors.Desc}
                      helperText={touched.Desc && errors.Desc}
                      inputProps={{ maxLength: 50, readOnly: true }}
                      multiline
                    />
                  </FormControl>
                   <FormControl sx={{ gridColumn: "span 2" }}>
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
                        <img
                          src={userimg}
                          style={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}
                   
                  </FormControl>

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
                          //onCellClick={handleOnCellClick}
                          //onClick={selectrowdata(params,'E')}

                          onCellClick={(params) => {
                            const currentcell = params.row;
                            const currentcellField = params.field;
                            selectcelldata(currentcell, "E", currentcellField);
                            console.log(
                              "selectcelldata" +
                                JSON.stringify(currentcellField)
                            );
                          }}
                          //   onRowClick={(params) => {
                          //     const currentRow = params.row;
                          //     selectrowdata(currentRow,'E');

                          // }
                          // }

                          components={{
                            Toolbar: DiesToolbar,
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
                    {/* <Footer/> */}
                  </FormControl>
                  <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                    <Formik
                      innerRef={ref}
                      initialValues={diesInitialValue}
                      onSubmit={(values, { resetForm }) => {
                        setTimeout(() => {
                          diesSave(values, resetForm, "");
                          // alert("hai");
                        }, 100);
                      }}
                      validationSchema={probomSchema}
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
                              value={
                                selectMATERIALLookupData.MATERIALlookupRecordid
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
                                  label="Dies"
                                  variant="filled"
                                  value={
                                    selectMATERIALLookupData.MATERIALlookupCode
                                  }
                                  focused
                                  required
                                  inputProps={{ tabIndex: "-1" }}
                                  sx={{ marginTop: "50px" }}
                                />
                                <IconButton
                                  sx={{
                                    height: 40,
                                    width: 40,
                                    marginTop: "50px",
                                  }}
                                  onClick={() => handleShow("MATERIAL")}
                                >
                                  <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                </IconButton>
                                {/* <MoreHorizIcon onClick={()=>handleShow('PS')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                                <TextField
                                  id="psDesc"
                                  variant="filled"
                                  value={
                                    selectMATERIALLookupData.MATERIALlookupDesc
                                  }
                                  fullWidth
                                  inputProps={{ tabIndex: "-1" }}
                                  focused
                                  sx={{ marginTop: "50px" }}
                                />
                              </FormControl>
                            </FormControl>
                            <TextField
                              name="DiesCount"
                              type="number"
                              id="DiesCount"
                              label="Count"
                              variant="filled"
                              value={values.DiesCount}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              focused
                              sx={{
                                background: "#fff6c3",
                                input: { textAlign: "right" },
                              }}
                            />

                            <TextField
                              name="SortOrder"
                              type="number"
                              id="SortOrder"
                              value={values.SortOrder}
                              label="Sort Order"
                              variant="filled"
                              focused
                              onBlur={handleBlur}
                              onChange={handleChange}
                              sx={{
                                background: "#fff6c3",
                                input: { textAlign: "right" },
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
                                // onClick={() => {
                                //   fnBomSave(values, resetForm, "");
                                // }}
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
                                  diesSave(values, resetForm, "harddelete");
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
                                setShow(1);
                                dispatch(fetchApidata(accessID, "get", recID));
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
            title="Material"
            openPopup={openMATERIALpopup}
            setOpenPopup={setOpenMATERIALpopup}
          >
            <Listviewpopup
              accessID="2041"
              screenName="Material"
              childToParent={childToParent}
            />
          </Popup>
        </Box>
      ) : (
        false
      )}
    </React.Fragment>
  );
};

export default Productdetail;
