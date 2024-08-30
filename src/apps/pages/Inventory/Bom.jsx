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
    Breadcrumbs
  } from "@mui/material";
  import NavigateNextIcon from '@mui/icons-material/NavigateNext';
  import DragHandleIcon from '@mui/icons-material/DragHandle';
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
    bomFetchapiData,
    dpConversionData
  
  } from "../../../store/reducers/Formapireducer";
  import { fetchComboData1 } from "../../../store/reducers/Comboreducer";
  import React, { useState, useEffect, useRef } from "react";
  import { toast } from "react-hot-toast";
  import basicSchema from "../../Security/validation";
  import {probomSchema} from "../../Security/validation";
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
  import ResetTvIcon from '@mui/icons-material/ResetTv';
import { Rectangle } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
  // ***********************************************
  //  Developer:Gowsalya
  // Purpose:To Create Products & BOM
  
  // ***********************************************
  const Bomproduct = ({}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [pageSize, setPageSize] = React.useState(10);
    const { toggleSidebar, broken, rtl } = useProSidebar();
  const parentID="M"
  const [ uomRecID, setUomRecID ] = useState({
    puomRecID:'',
    cuomRecID:''
  })
  const [wastageValue, setwastageValue] = useState();
  const [materialType, setMaterialType ] = useState('')
  const [wastagePercent, setWastagePercent] = useState(0);
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
    const YearFlag = sessionStorage.getItem("YearFlag")
    const handleFormSubmit = (values) => {
      console.log(values);
    };
  
    const navigate = useNavigate();
    let params = useParams();
    const dispatch = useDispatch();
    var recID = params.id;
    var mode = params.Mode;
    var accessID = params.accessID;
    var headerID = params.productid;
    var screenName = params.screenName
    var desc = params.Type;
    var path = `${desc}`
    const conversionData = useSelector((state) => state.formApi.conversionData);
    const Data = useSelector((state) => state.formApi.Data);
    console.log("🚀 ~ file: Productdetail.jsx:93 ~ Productdetail ~ Data:", Data)
    const Status = useSelector((state) => state.formApi.Status);
    const Msg = useSelector((state) => state.formApi.msg);
    const isLoading = useSelector((state) => state.formApi.loading);
  
    const ProductCategory = useSelector(
      (state) => state.comboApi.productCategory
    );
  

    const productBomData = async() =>{
      const data = await dispatch(bomFetchapiData(recID, "get", headerID));
      console.log("--payload--" + JSON.stringify(data));
      if (show == "2"){
      if (data.payload.Status == "Y") {
        //alert(data.payload.apiResponse.ReferenceNo);

        setBOMHdata(true);
        setbohRefNO(data.payload.apiResponse.ReferenceNo);
        setbohDate(data.payload.apiResponse.Bhdate);
        setbohRecID(data.payload.apiResponse.RecordID);
        console.log("🚀 ~ file: Bom.jsx:135 ~ productBomData ~ data.payload.apiResponse.RecordID:", data.payload.apiResponse.RecordID)
        dispatch(
          fetchExplorelitview(
            "TR016",
            "BOM",
            data.payload.apiResponse.RecordID,
            ""
          )
        );
        dispatch(fetchApidata('TR001', "get", headerID));
        // selectcelldata("", "A", "");
      } else {
        setBOMHdata(false);
        setbohDate(currentdate);
        dispatch(fetchExplorelitview("TR016", "BOM", "-1", ""));
        dispatch(fetchApidata('TR001', "get", headerID));
        // selectcelldata("", "A", "");
      }}
    }






    useEffect(() => {
      dispatch(fetchApidata("TR001", "get", headerID));
      productBomData()
    
    }, [location.key]);
  
    const [ini ,setIni] = useState(true);
    const [loading, setLoading] = useState(false)

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
    const [modelID, setmodelD] = useState("");
    const [prodDesc, setprodDesc] = useState("");
  
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
      NetWeight: apiData.NetWeight,
      Pgrid: apiData.Pgrid,
      Frqty: apiData.Frqty,
      Weight: apiData.Weight,
      Breadth: apiData.Breadth,
      Height: apiData.Height,
      Width: apiData.Width,
      Length: apiData.Length,
      Bomothers: apiData.Bomothers,
      Dss: apiData.Dss,
      Ppday: apiData.Ppday,
      Desc: apiData.Desc,
      ModelNo: apiData.ModelNo,
      Code: apiData.Code,
      ImageName: apiData.ImageName,
      LeaPattern: apiData.LeaPattern,
      Image: apiData.Image,
      LinePattern: apiData.LinePattern,
      SortOrder: apiData.SortOrder,
      checkbox: apiData.Disable,
      bohRefNOS: "",
    };
  
    const [openPCPopup, setOpenPCPopup] = useState(false);
    const [openMTPopup, setOpenMTPopup] = useState(false);
    const [openPSPopup, setOpenPSPopup] = useState(false);
    const [openCUPopup, setOpenCUPopup] = useState(false);
    const [openDPPopup, setOpenDPPopup] = useState(false);
    const [openITUPopup, setOpenITUPopup] = useState(false);
    const [openGRDPopup, setOpenGRDPopup] = useState(false);
    const [openSUBPopup, setOpenSUBPopup] = useState(false);
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
      if (type == "GRD") {
        setOpenGRDPopup(true);
      }
      if (type == "SUB") {
        setOpenSUBPopup(true);
      }
    }
  
 
  
    /*************************************BOM SCREEN********************* */
    const [show, setShow] = useState("2");
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
    console.log("🚀 ~ file: Bom.jsx:271 ~ Bomproduct ~ explorelistViewcolumn:", explorelistViewcolumn)
  
    const [selectedFile, setSelectedFile] = useState();
    const [uploadFile, setUploadFile] = useState();
  
    const [setrateval, setRate] = useState();
    const [mateval, setmateval] = useState("0");
    const [tot, setTot] = useState();
    const [totquantity, setquantity] = useState();
    const [wastageval, setwastageval] = useState();
  
    const [finalClickInfo, setFinalClickInfo] = useState({
      RecordID: "",
      MtlCode: "",
      Quantity: "",
      MtlCost: "",
      SortOrder: "",
      Disable: "",
    });
  
    const [bomdata, setBomdata] = useState({
      RecordID: "",
      Length: "",
      Width: "",
      Quantity: "",
      SortOrder: "",
      WastageinPercent: "",
      Nos: '',
    });
    const [bomMode, setBommode] = useState("A");
  
    /*****************File upload************ */
    const changeHandler = async (event) => {
      setSelectedFile(event.target.files[0]);
  
      console.log(event.target.files[0]);
  
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      formData.append("type", "custimage");
  
      const fileData = await dispatch(
        fnFileUpload(formData, edata.RecordID, "TR017")
      );
  
      console.log("fileData" + JSON.stringify(fileData));
      setUploadFile(fileData.payload.apiResponse);
    };
  
    var bomFilter = `${finalClickInfo.RecordID}`;
    // Design App type based button show function
    const bomDetail = () => {
    
      setShow("3");
      selectbomdetailcelldata("", "A", "");
      setselectdpatternLookupData({
        DesignPatternRecordID: "",
        DesignCode: "",
        DesignDescription: "",
      });
      dispatch(fetchExplorelitview("TR046", "BOM Details", bomFilter, ""));
      dispatch(fetchApidata('TR001', "get", headerID));
    };
    // Bom button function
    function fnvalue() {
      
      setShow("2");
      dispatch(
        fetchExplorelitview(
          "TR016",
          "BOM",
           recID
        )
      );
      dispatch(fetchApidata('TR001', "get", headerID));
    }
  
    /********************BOM HEADER DATA************* */
    const [isBOMHdata, setBOMHdata] = useState(false);
    const [bohRefNO, setbohRefNO] = useState("");
    const [bohDate, setbohDate] = useState("");
    const [bohRecID, setbohRecID] = useState("");
  
  
  
  
  
  
  
  
  
  
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
    if ( isPopupData == false){
        selectInvUOMLookupData.ITUlookupRecordid = Data.InventoryUom
      selectInvUOMLookupData.ITUlookupDesc = Data.UomDesc
    }
    const [selectprocessLookupData, setselectprocessLookupData] = React.useState({
      PSlookupRecordid: "",
      PSlookupCode: "",
      PSlookupDesc: "",
    });
    const [selectmaterialLookupData, setselectmaterialLookupData] =
      React.useState({
        MlookupRecordid: "",
        MlookupCode: "",
        MlookupDesc: "",
        DesignApp: "",
        coneConversion:"",
      });
  
    if (isPopupData == false) {
      selectLookupData.lookupRecordid = Data.Pgrid;
      selectLookupData.lookupCode = Data.PgrCode;
      selectLookupData.lookupDesc = Data.PgrDesc;
      //  selectInvUOMLookupData.ITUlookupRecordid = Data.InventoryUom
      //  selectInvUOMLookupData.ITUlookupDesc = Data.UomDesc
    }
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
    /****************** BOM values assign a state variale******************** */
    const selectcelldata = (selectedData, bMode, field) => {
      console.log("selectdata" + JSON.stringify(selectedData));
      console.log(selectedData.Fixrate);
  
      
      setBomode(bMode);
  
      if (bMode == "A") {
        setUploadFile("");
        setFinalClickInfo({
          RecordID: "",
          Quantity: "",
          MtlCost: "",
          MtlCode: "",
          SortOrder: "",
          Disable: "",
        });
        setselectprocessLookupData({
          PSlookupRecordid: "",
          PSlookupCode: "",
          PSlookupDesc: "",
        });
        setselectmaterialLookupData({
          MlookupRecordid: "",
          MlookupCode: "",
          MlookupDesc: "",
          coneConversion:"",
        });
      } else {
        
        if (field == "action") {
          setRate(selectedData.Fixrate);
          setMaterialType(selectedData.Type)
          setUploadFile(selectedData.Attachments);
          sessionStorage.setItem("BOMREC" ,selectedData.RecordID)
          setUomRecID({
            cuomRecID:selectedData.McuomRecordID,
            puomRecID:selectedData.PuomRecordID
          })
          setFinalClickInfo({
            RecordID: selectedData.RecordID,
            Quantity: selectedData.Quantity,
            MtlCost: tot,
            SortOrder: selectedData.SortOrder,
            Disable: selectedData.Disable,
          });
          setselectprocessLookupData({
            PSlookupCode: selectedData.PsCode,
            PSlookupRecordid: selectedData.PsRecordID,
            PSlookupDesc: selectedData.PsDesc,
          });
          setselectmaterialLookupData({
            MlookupCode: selectedData.MtlCode,
            MlookupRecordid: selectedData.MtlRecordID,
            MlookupDesc: selectedData.MtlDesc,
            DesignApp: selectedData.DesignApp,
            coneConversion:selectedData.PurchaseDesc,
          });
        }
      }
    };
  
    //*******Assign BOM values from Database in  Yup initial value******* */
    const bomInitialvalues = {
      MtlCode: finalClickInfo.MtlCode,
      Quantity: Number(finalClickInfo.Quantity).toFixed(4),
      MtlCost: finalClickInfo.MtlCost,
      SortOrder: finalClickInfo.SortOrder,
      checkbox: finalClickInfo.Disable,
      totalCost: Number().toFixed(2),
    };
    /*************SEARCH********************** */
    var VISIBLE_FIELDS 
    if (show == "2"){
  
       VISIBLE_FIELDS = ["SLNO", "Description", "Quantity", "action"];
    }else{
      VISIBLE_FIELDS = ["SLNO","CustID","CustName", "AgreedPrice", "action"];
    }
   
  
    const columns = React.useMemo(
      () =>
        explorelistViewcolumn.filter((column) =>
          VISIBLE_FIELDS.includes(column.field)
        ),
      [explorelistViewcolumn]
    );
   const VISIBLE_FIELDSDESIGN = ["SLNO", "Pattern", "Length","Width","Nos", "action"];
    const designPatternColumns = React.useMemo(
      () =>
        explorelistViewcolumn.filter((column) =>
        VISIBLE_FIELDSDESIGN.includes(column.field)
        ),
      [VISIBLE_FIELDSDESIGN]
    );
  
  
  
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
      OpenstockProductQty:Data.OpenstockProductQty,
      RecievedStockProductQty:Data.RecievedStockProductQty,
      IssuedStockPrdQty:Data.IssuedStockPrdQty,
      RequirementStockPrdQty:Data.RequirementStockPrdQty,
      Stock:Data.Stock,
      BALANCE:Data.BALANCE
    }
  
  
  
  const ref =  useRef();
const [iniBom, setIniBom] = useState(true)
    // **********Grid header function************
    const [rowCount ,setRowCount] = useState(0);
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
              <IconButton onClick={() => {
            const reset = ref.current.resetForm
            selectbomdetailcelldata("", "A", "")
            reset()
            }}>
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
      setLoading(true)
      setIniBom(false)
      if (uploadFile == undefined) {
        document = "";
      } else {
        document = uploadFile;
      }
      if (selectprocessLookupData.PSlookupCode == "") {
        toast.error("Please Choose Process/stage Lookup");
        setLoading(false)
        return;
      }
      if (bohRefNO == "") {
        toast.error("Please Choose Reference No");
        setLoading(false)
        return;
      }
      
      if (bohDate == "") {
        toast.error("Please Choose Date");
        setLoading(false)
        return;
      }
      if (selectmaterialLookupData.MlookupCode == "") {
        toast.error("Please Choose Material Lookup");
        setLoading(false)
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
        if (boMode == "A") {
          saveData = {
            RecordID: "",
            Prdid: headerID,
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
            Prdid: headerID,
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
        setIniBom(true)
        setLoading(false)
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
        setLoading(false)
        toast.error(data.payload.Msg)
        
      };
    };
  
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
  
    //************************** Lookup value assign type based Function *****************/
  
    const childToParent = (childdata, type) => {
      console.log("type---" + type);
      console.log("Data---" + JSON.stringify(childdata));
      if (type == "Product Category") {
        setisPopupdata(true);
        setselectLookupData({
          lookupCode: childdata.Code,
          lookupRecordid: childdata.RecordID,
          lookupDesc: childdata.Name,
        });
        setOpenPCPopup(false);
      }
      if (type == "Inventory UOM"){
        setisPopupdata(true);
        setselectInvUOMLookupData({
          ITUlookupRecordid: childdata.RecordID,
          ITUlookupCode: childdata.Code,
          ITUlookupDesc: childdata.Name,
        });
        setOpenITUPopup(false)
      }
      if (type == "Process/Stage") {
        setselectprocessLookupData({
          PSlookupCode: childdata.Code,
          PSlookupRecordid: childdata.RecordID,
          PSlookupDesc: childdata.Name,
        });
        setOpenPSPopup(false);
      }
      if (type == "Material") {
        var materialrate = childdata.Fixrate;
        setmateval(materialrate);
  
        setselectmaterialLookupData({
          MlookupCode: childdata.Code,
          MlookupRecordid: childdata.RecordID,
          MlookupDesc: childdata.Name,
          DesignApp: childdata.DesignApp,
          coneConversion:childdata.Purchase,
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
    
      if (type == "Substance") {
        setisPopupdata(true);
        setselectsubLookupData({
          SUBlookupCode: childdata.Code,
          SUBlookupRecordid: childdata.RecordID,
          SUBlookupDesc: childdata.Name,
        });
        setOpenSUBPopup(false);
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
          Nos: '',
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
      } else {
        if (valuefield == "action") {
          setIni(true)
          setBomdata({
            RecordID: databom.RecordID,
            Length: databom.Length,
            Width: databom.Width,
            Quantity: databom.Quantity,
            SortOrder: databom.SortOrder,
            WastageinPercent: databom.WastageinPercent,
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
            GRDlookupCode:databom.GradeCode,
            GRDlookupDesc: databom.GradeDescription,
            GRDlookupRecordid:databom.GradeRecordID
          })
          setselectsubLookupData({
            SUBlookupCode:databom.SubstanceCode,
            SUBlookupDesc: databom.SubstanceDescription,
            SUBlookupRecordid:databom.SubstanceRecordID
          })
          setWastagePercent(databom.WastageinPercent);
        }
      }
    };
    // //*******Assign Bom values from Database in  Yup initial value******* */
    const bomdetailInitialvalues = {
      Length: bomdata.Length,
      Width: bomdata.Width,
      Quantity: Number(bomdata.Quantity).toFixed(4),
      SortOrder: bomdata.SortOrder,
      WastageinPercent: bomdata.WastageinPercent,
      noofDesign:bomMode == "A" ? 1 :bomdata.Nos,
    };
  
    const bomRecID = sessionStorage.getItem("BOMREC")
    /****************************** bomdetailSave  FUNCTION********** */
    const fnBomdetailSave = async (values, resetForm,types) => {
      setLoading(true)
      setIniBom(false)
       if(types == 'harddelete'){
        if(bomdata.RecordID == ""){
        toast.error("Please Select Bom Details ");
        setLoading(false)
        return;
        }
       }
  
      if (selectdpatternLookupData.DesignCode == "") {
        toast.error("Please Choose Design Pattern Lookup");
        setLoading(false)
        return;
      }
  
      if (values.Length == "") {
        toast.error("Please Enter Length");
        setLoading(false)
        return;
  
  
      }
      if(materialType == "L"){
      if (selectgrdLookupData.GRDlookupRecordid == "") {
        toast.error("Please Choose Grade Lookup");
        setLoading(false)
        return;
      }
      if (selectsubLookupData.SUBlookupRecordid == "") {
        toast.error("Please Choose Substance Lookup");
        setLoading(false)
        return;
      }
    }
      console.log(values);
  
      var saveData = "";
      var type = "";
      var wastageinpercentage=0;
      if((wastagePercent==0)||(wastagePercent==""))
      {
        wastageinpercentage = values.WastageinPercent;
      }
      else wastageinpercentage = wastagePercent;
    if(types === 'harddelete'){
      type= "harddelete"
      saveData = {
        RecordID: bomdata.RecordID,
        Length: values.Length,
        Width: values.Width,
        GradeRecordID:selectgrdLookupData.GRDlookupRecordid ,
        SubstanceRecordID:selectsubLookupData.SUBlookupRecordid ,
        Quantity: values.Quantity,
        WastageinPercent: wastageinpercentage,
        SortOrder: values.SortOrder,
        DesignPatternRecordID: selectdpatternLookupData.DesignPatternRecordID,
        ConsumptionuomRecordID: selectcuomLookupData.CUomRecordID,
        ProductRecordID: recID,
        BomRecordID: finalClickInfo.RecordID,
        Total: wastageval,
        MaterialRecordID: selectmaterialLookupData.MlookupRecordid,
        TotalSqft:sqfeet,
        Nos:values.noofDesign,
        //Wastagemargin:values.wastageMargin,
        //Wastagemarginsqft:totalWastageMarginsqft
  
      };
    }else{
      if (bomMode == "A") {
        saveData = {
          RecordID: "",
          Length: values.Length,
          Width: values.Width,
          Quantity: values.Quantity,
          WastageinPercent: wastageinpercentage,
          GradeRecordID:selectgrdLookupData.GRDlookupRecordid ,
          SubstanceRecordID:selectsubLookupData.SUBlookupRecordid ,
          SortOrder: values.SortOrder,
          DesignPatternRecordID: selectdpatternLookupData.DesignPatternRecordID,
          ConsumptionuomRecordID: selectcuomLookupData.CUomRecordID,
          ProductRecordID: recID,
          BomRecordID: finalClickInfo.RecordID,
          Total: wastageval,
          MaterialRecordID: selectmaterialLookupData.MlookupRecordid,
          TotalSqft:sqfeet,
          Nos:values.noofDesign,
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
          GradeRecordID:selectgrdLookupData.GRDlookupRecordid ,
          SubstanceRecordID:selectsubLookupData.SUBlookupRecordid ,
          SortOrder: values.SortOrder,
          DesignPatternRecordID: selectdpatternLookupData.DesignPatternRecordID,
          ConsumptionuomRecordID: selectcuomLookupData.CUomRecordID,
          ProductRecordID: recID,
          BomRecordID: finalClickInfo.RecordID,
          Total: wastageval,
          MaterialRecordID: selectmaterialLookupData.MlookupRecordid,
          TotalSqft:sqfeet,
          Nos:values.noofDesign,
       // Wastagemargin:values.wastageMargin,
       // Wastagemarginsqft:totalWastageMarginsqft
  
        };
        type = "update";
      }}
      console.log("save" + JSON.stringify(saveData));
      
      const data = await dispatch(postApidata("TR046", type, saveData));
      // console.log("🚀 ~ file: Productdetail.jsx:1161 ~ fnBomdetailSave ~ data:", data)
      if (data.payload.Status == "Y") {
        toast.success(data.payload.Msg);
        setLoading(false)
        dispatch(fetchExplorelitview("TR046", "BOM Details", bomRecID, ""));
       
        resetForm();
        setBomdata({
          RecordID: "",
          Length: "",
          Width: "",
          Quantity: "",
          SortOrder: "",
          WastageinPercent: "",
          wastageval: "",
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
        setIniBom(true)
        selectbomdetailcelldata("", "A", "");
        setWastagePercent(0)
      } else{
         toast.error(data.payload.Msg)
         setLoading(false)  
      };
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
      selectbomdetailcelldata("", "A", "");
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
  
    function quantityhandleClick(values) {
      console.log(values);
      console.log("statewastage value"+wastageValue)
      var detsquantity = Number(values.Length) * Number(values.Width);
      setquantity(detsquantity.toFixed(2));
      console.log("Tot--"+wastagePercent);
      if((wastagePercent==0)||(wastagePercent==""))
      {
        var wastageValuedts = Number(totquantity) + Number(totquantity)* Number(values.WastageinPercent / 100);
      }
      else
      {
        var wastageValuedts = Number(totquantity) + Number(totquantity)* Number(wastagePercent / 100);
      }
      //var wastageValuedmargin = Number(totquantity) + Number(totquantity) * Number(values.wastageMargin / 100);
  console.log("wastage"+wastageValuedts);
      
      if(values.noofDesign > 1){
      setwastageval(wastageValuedts.toFixed(2) * values.noofDesign);
      }else setwastageval(wastageValuedts.toFixed(2));
  
      // if(values.noofDesign > 1){
      //   setTotalWastagemargin(wastageValuedmargin * values.noofDesign);
      //   }else setTotalWastagemargin(wastageValuedmargin);
       
      var feet = Number(wastageval) * Number(conversionData.Conversionrate)
       console.log("🚀 ~ file: Productdetail.jsx:1337 ~ quantityhandleClick ~ wastageval:", wastageval)
      //var W_M_sqft = Number(totalWastageMargin) * Number(conversionData.Conversion)
  
      
       
        setSqfeet(Number(feet).toFixed(5))
        //setTotalWastagemarginsqft(Number(W_M_sqft).toFixed(5))
      
    }
  
    // **************Bom Detail calculation************
    function matcalshandleClick(values) {
      if (boMode == "E") {
     const split_string = selectmaterialLookupData.coneConversion.split(/([+-]?([0-9]*[.])?[0-9]+)/)
      values.totalCost = selectmaterialLookupData.coneConversion.includes("Cone") ? (values.Quantity * (setrateval/(Number(split_string[1])*1000)).toFixed(2)) :(values.Quantity * setrateval).toFixed(2)
      // setTot(totalvalue.toFixed(2));
    } else {
     const split_string = selectmaterialLookupData.coneConversion.split(/([+-]?([0-9]*[.])?[0-9]+)/)
      values.totalCost = selectmaterialLookupData.coneConversion.includes("Cone") ? (values.Quantity * (mateval/(Number(split_string[1])*1000)).toFixed(2))  :(values.Quantity * mateval).toFixed(2)
      // setTot(totalvalue.toFixed(2));

      // setTot(totalvalue.toFixed(2));
    }
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
                navigate(`/Apps/Secondarylistview/${accessID}/List of Bom/${headerID}`)
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
            <Box
              display="flex"
              borderRadius="3px"
              alignItems={"center"}
            >
               {broken && !rtl && (
          <IconButton
            
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        )}
            <Breadcrumbs maxItems={2} aria-label="breadcrumb" separator={<NavigateNextIcon sx={{color:'#0000D1'}}/>}>
              <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} onClick={() => { navigate(`/Apps/TR002/Categories`); }}>Product</Typography>
              <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} onClick={() => { navigate(`/Apps/Secondarylistview/${accessID}/List of Bom/${headerID}`); }}>{screenName}</Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
               
              >
                { Data.Desc}
              </Typography>
           
              {show == "2" ? (    <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} onClick={() => { navigate(`/Apps/TR002/Product%20Categories`); }}>BOM</Typography>):false}
              {show == "3" ? (  <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} onClick={() => { navigate(`/Apps/TR002/Product%20Categories`); }}>Design Pattern</Typography>):false}
                
              </Breadcrumbs>
            </Box>
  
            {/* ICONS */}
  
            <Box display="flex">
             
              <IconButton onClick={() => fnLogOut('Close')} color="error">
                <ResetTvIcon/>
              </IconButton>
              <IconButton onClick={() => fnLogOut('Logout')} color="error">
                <LogoutOutlinedIcon />
              </IconButton>
            </Box>
          </Box>
         
  
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
                   {!isNonMobile && <Stack
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
                           marginBottom: "40px",
                         }}
                       />
                     </Stack>}
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
                   {isNonMobile && <Stack
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
                           marginBottom: "40px",
                         }}
                       />
                     </Stack>}
                     {isBOMHdata == true ? (
                       <TextField
                         fullWidth
                         variant="filled"
                         type="Date"
                         value={bohDate}
                         onChange={(e) => {
                           setbohDate(e.target.value);
                         }}
                         label="Date"
                         inputFormat="YYYY-MM-DD"
                         sx={{ gridColumn: "span 2" }}
                         focused
                         inputProps={{ readOnly: true }}
                       />
                     ) : (
                       <TextField
                         fullWidth
                         variant="filled"
                         type="Date"
                         value={bohDate}
                         onChange={(e) => {
                           setbohDate(e.target.value);
                         }}
                         label="Date"
                         inputFormat="YYYY-MM-DD"
                         sx={{ gridColumn: "span 2" }}
                         focused
                       />
                     )}
                   </FormControl>
                   {/* <Stack
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
                         style={{ width: "200px", height: "150px" }}
                       />
                     </Stack> */}
 
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
                                   marginTop:"50px",
                                 }}
                               >
                                  <TextField
                               id="psID"
                               label="ID"
                               variant="filled"
                               value={selectprocessLookupData.PSlookupRecordid}
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
                                   inputProps={{tabIndex:"-1"}}
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
                                   inputProps={{tabIndex:"-1"}}
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
                                   inputProps={{tabIndex:"-1"}}
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
                                   inputProps={{tabIndex:"-1"}}
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
                                       onClick={() => {
                                         bomDetail("3");
                                         dispatch(dpConversionData({Purchase:uomRecID.puomRecID}))
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
                                   fnBomSave(values, resetForm, "harddelete");
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
                                 
                                 navigate(`/Apps/Secondarylistview/TR050/List%20of%20BOM/${headerID}`)
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
             title="Material"
             openPopup={openMTPopup}
             setOpenPopup={setOpenMTPopup}
           >
             <Listviewpopup
               accessID="2036"
               screenName="Material"
               childToParent={childToParent}
               filterName={"parentID"}
               filterValue={selectprocessLookupData.processRecID}
   
            
             />
           </Popup>
         </Box>
          ) : (
            false
          )}
  
          {show =='3'? (
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
                              helperText={touched.Quantity && errors.Quantity}
                              focused
                              // inputProps={{ maxLength: 11, readOnly: true }}
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
                              onChange={(e)=>setWastagePercent(e.target.value)}
                              sx={{
                                gridColumn: "span 2",
                                background: "#fff6c3",
                              }}
                              focused
                              error={
                                !!touched.WastageinPercent &&
                                !!errors.WastageinPercent
                              }
                              helperText={
                                touched.WastageinPercent &&
                                errors.WastageinPercent
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
                      
                      {/* <FormLabel>Stage/Process</FormLabel> */}
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
                          label="Square Centimeter"
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
                            )
                              // .toString()
                              // .slice(0, 11);
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
                          label={conversionData.Description === "Numbers" ? "Square Centimeter":conversionData.Description }
                          value={conversionData.Description === "Numbers" ? wastageval:sqfeet}
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
                                  marginTop:"70px",
                                }}
                              >
                                <TextField
                                  id="psCode"
                                  label="Design Pattern"
                                  variant="filled"
                                  value={selectdpatternLookupData.DesignCode}
                                  focused
                                  required
                                  inputProps={{tabIndex:"-1"}}
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
                                  inputProps={{tabIndex:"-1"}}
                                  focused
                                />
                              </FormControl>
                            </FormControl>

{materialType === "L" && (<React.Fragment>
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
                                  required
                                  inputProps={{tabIndex:"-1"}}
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
                                  inputProps={{tabIndex:"-1"}}
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
                                  required
                                  inputProps={{tabIndex:"-1"}}
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
                                  inputProps={{tabIndex:"-1"}}
                                  focused
                                />
                              </FormControl>
                            </FormControl> </React.Fragment>)}

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

                            <TextField
                              fullWidth
                              variant="filled"
                              type="number"
                              label=" Width (in cm)"
                              value={values.Width}
                              id="Width"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              name="Width"
                              error={!!touched.Width && !!errors.Width}
                              helperText={touched.Width && errors.Width}
                              sx={{
                                gridColumn: "span 2",
                                background: "#fff6c3",
                                marginTop:"25px",
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
                              error={!!touched.noofDesign && !!errors.noofDesign}
                              helperText={touched.noofDesign && errors.noofDesign}
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
           
        </Box>
      </React.Fragment>
    );
  };
  
  export default Bomproduct;
  