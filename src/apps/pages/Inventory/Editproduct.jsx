import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  MenuItem,
  Box,
  Button,
  TextField,
  IconButton,
  Stack,
  FormLabel,
  FormControl,
  Typography,
  Select,
  InputLabel,
  Tooltip,
  Breadcrumbs,
  Checkbox,
  useMediaQuery,
  useTheme,
  LinearProgress,
  Chip,
} from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import store from "../../../index";
import { toast } from "react-hot-toast";
import Listviewpopup from "../Lookup";
import Popup from "../popup";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { tokens } from "../../../Theme";
import { LoadingButton } from "@mui/lab";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import {
  CustomerpriceorderQty,
  bomCopyApiData,
  bomCopyFn,
  dpConversionData,
  explorePostData,
  getFetchData,
  getVersionBom,
  postData,
  stockGetData,
} from "../../../store/reducers/Formapireducer";
import {
  proBomSchema,
  probomSchema,
  productsHeaderSchema,
} from "../../Security/validation";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import { fnFileUpload } from "../../../store/reducers/Imguploadreducer";
import Swal from "sweetalert2";
import { PrintOutlined } from "@mui/icons-material";

const Editproduct = () => {
  // *************** PAGE VARIABLES *************** //
  const [OrderQty, setOrderQty] = React.useState(null);
  const [recordID, setRecordID] = React.useState(null);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    const response = await dispatch(
      CustomerpriceorderQty({
        data: { RecordID: recordID, Orderqty: OrderQty, Pdfflag: "Y" },
      })
    );
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      dispatch(
        fetchExplorelitview("TR017", "Product Cost", `PrdRecordID=${recID}`, "")
      );
    }
    console.log(response);
    setOpen(false);
  };

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
  // *************** PAGE PARAMS *************** //
  const recID = params.id;
  const mode = params.Mode;
  const accessID = params.accessID;
  const headerID = params.headerid;
  const productDescription = params.Type;

  // *************** PAGE STATES *************** //
  const [show, setShow] = useState(1);

  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);

  // *************** REDUX STATES *************** //
  const data = useSelector((state) => state.formApi.Data);
  const exploreData = useSelector((state) => state.formApi.exploreData);
  const status = useSelector((state) => state.formApi.Status);
  const Msgs = useSelector((state) => state.formApi.msg);
  const loading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const conversionData = useSelector((state) => state.formApi.conversionData);
  const stockData = useSelector((state) => state.formApi.materialStockData);
  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );
  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );
  const exploreLoading = useSelector((state) => state.exploreApi.loading);

  // *************** HEADER SCREEN INITIALVALUE *************** //

  const [hsnLookup, SetHsnLookup] = useState({
    hsnRecordID: "",
    hsnCode: "",
  });
  const productInitialValue = {
    modelNo: data.ModelNo,
    description: data.Desc,
    imageurl: data.ImageName
      ? store.getState().globalurl.imageUrl + data.ImageName
      : store.getState().globalurl.imageUrl + "Defaultimg.jpg",
    productionPerDay: Number(data.Ppday),
    width: Number(data.Width).toFixed(2),
    length: Number(data.Length).toFixed(2),
    height: Number(data.Height).toFixed(2),
    weight: Number(data.Weight).toFixed(2),
    netWeight: Number(data.NetWeight).toFixed(2),
    breadth: Number(data.Breadth).toFixed(2),
    sortOrder: Number(data.SortOrder),
    disable: data.Disable === "Y" ? true : false,
    productType: data.ProductType,
  };

  // *************** HEADER SCREEN SAVE FUNCTION *************** //

  const productHeaderFn = async (values) => {
    let action = mode === "A" ? "insert" : "update";
    var isCheck = "N";
    if (values.disable == true) {
      isCheck = "Y";
    }
    const idata = {
      RecordId: recID,
      NetWeight: values.netWeight,
      Pgrid: headerID,
      Frqty: 0,
      InventoryUom: 0,
      Weight: values.weight,
      Breadth: values.breadth,
      Height: values.height,
      Width: values.width,
      Length: values.length,
      Ppday: values.productionPerDay,
      Desc: values.description,
      ModelNo: values.modelNo,
      SortOrder: values.sortOrder,
      ImageName: data.ImageName,
      Disable: isCheck,
      Bomothers: 0,
      Dss: 0,
      Code: 0,
      Costprice: 0,
      quantity: 0,
      Price: 0,
      ProductType: values.productType,
      Finyear,
      CompanyID,
      Hsn: hsnLookup.hsnRecordID,
      HsnRecID: hsnLookup.hsnRecordID,
      HsnCode: hsnLookup.hsnCode,
    };

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      if (mode === "A") {
        navigate(
          `/Apps/Secondarylistview/TR001/Product Master/${headerID}/${productDescription}/EditProduct Master/${response.payload.Recid}/E`
        );
      }
    } else {
      toast.error(response.payload.Msg ? response.payload.Msg : "Error");
    }
  };

  // *************** PRODUCT EXPLORE SCREEN CHANGE FUNCTION *************** //
  const exploreChange = async (event) => {
    if (event.target.value === 2) {
      const response = await dispatch(getVersionBom({ recID }));
      if (response.payload.Status == "Y") {
        dispatch(
          fetchExplorelitview(
            "TR016",
            "BOM",
            `parentID='${response.payload.Data.RecordID}' AND Type != 'L'`,
            ""
          )
        );
      } else {
        dispatch(
          fetchExplorelitview(
            "TR016",
            "BOM",
            `parentID='-1' AND Type != 'L'`,
            ""
          )
        );
      }
      selectCellBomData({ rowData: {}, mode: "A", field: "" });
    }
    if (event.target.value === 8) {
      const response = await dispatch(getVersionBom({ recID }));
      if (response.payload.Status == "Y") {
        dispatch(
          fetchExplorelitview(
            "TR016",
            "BOM",
            `parentID='${response.payload.Data.RecordID}' AND Type = 'L'`,
            ""
          )
        );
      } else {
        dispatch(
          fetchExplorelitview(
            "TR016",
            "BOM",
            `parentID='-1' AND Type = 'L'`,
            ""
          )
        );
      }
      selectCellBomData({ rowData: {}, mode: "A", field: "" });
    }
    if (event.target.value === 4) {
      dispatch(
        fetchExplorelitview("TR017", "Product Cost", `PrdRecordID=${recID}`, "")
      );
      selectCellBomData({ rowData: {}, mode: "A", field: "" });
    }
    if (event.target.value === 5) {
      dispatch(fetchExplorelitview("TR106", "Dies", recID, ""));
      selectCellBomData({ rowData: {}, mode: "A", field: "" });
    }
    if (event.target.value === 7) {
      dispatch(stockGetData({ accessID: "TR069", recID, Type: "P", yearData }));
    }
    setShow(event.target.value);
  };

  // *************** PRODUCT BOM SCREEN  *************** //

  const [bomMode, SetBomMode] = useState("A");
  const [fileName, setFileName] = useState("");
  const [fixedRate, setFixedRate] = useState("");
  const [colorRecID, setColorRecID] = useState("");
  const [CuomRecID, setCuomRecID] = useState("");
  const [bomParentID, setBomParentID] = useState("");

  const [rowCount, setRowCount] = useState(0);
  function bomCustomToolbar() {
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
            {show == 2
              ? "List of Materials"
              : show == 8
              ? "List of Leather Bom"
              : "List of Customer"}
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
            <IconButton type="reset">
              <AddOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </GridToolbarContainer>
    );
  }

  /*********************** VISIBLE FIELD IN EXPLORE SCREEN ********************** */

  var VISIBLE_FIELDS = [];
  if (show == 2 || show == 8) {
    VISIBLE_FIELDS = ["SLNO", "MtlCode", "Description", "TotalQty", "action"];
  } else if (show == 3) {
    VISIBLE_FIELDS = ["SLNO", "DesignCode", "Length", "Width", "action"];
  } else if (show == 5) {
    VISIBLE_FIELDS = ["SLNO", "Code", "Name", "DiesCount", "action"];
  } else {
    VISIBLE_FIELDS = [
      "SLNO",
      "CustID",
      "CustName",
      "AgreedPrice",
      "action",
      "print",
      "Qty",
    ];
  }

  const visibleColumns = React.useMemo(
    () =>
      explorelistViewcolumn.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
    [explorelistViewcolumn]
  );

  // ***************  BOM LOOKUP  *************** //

  const [stageprocessLookup, SetStageprocessLookup] = useState({
    SPRecordID: "",
    SPCode: "",
    SPName: "",
  });

  const [materialLookup, SetmaterialLookup] = useState({
    matRecordID: "",
    matCode: "",
    matName: "",
    isDesignpattern: "",
    uomConversionType: "",
    uomConDesc: "",
    materialType: "",
    total: "",
    mgroup: "",
    fixedRate: "",
    WastageforCosting: 0,
    latestRate: "",
  });

  const [jobworkLookup, SetJobworkLookup] = useState({
    JWRecordID: "",
    JWCode: "",
    JWName: "",
  });
  const [bomRowData, SetBomRowData] = useState({
    bomRecordID: "",
    bomQuantity: "",
    materialCost: "",
    sortOrder: "",
    materialType: "",
    cuomRecID: "",
    puomRecID: "",
    Wastage: "",
    TotalQty: "",
  });

  const [customerLookup, setCustomerLookup] = useState({
    cusRecordID: "",
    cusCode: "",
    cusName: "",
  });
  const [customerBomLookup, setCustomerBomLookup] = useState({
    cusBomRecordID: "",
    cusBomCode: "",
    cusBomName: "",
  });

  const [productPriceData, setProductPriceData] = useState({
    costPrice: "",
    agreedPrice: "",
    recordID: "",
  });

  const [diesLookup, setDiesLookup] = useState({
    diesRecordID: "",
    diesCode: "",
    diesName: "",
  });

  const [productDiesData, setProductDiesData] = useState({
    count: "",
    sortOrder: "",
    recordID: "",
  });

  const [productLookup, setProductLookup] = useState({
    proRecordID: "",
    proCode: "",
    proName: "",
  });
  const [openPopup, setIsOpenPopup] = useState(false);
  const [openSPPopup, setOpenSPopup] = useState(false);
  const [openMatPopup, setOpenMatopup] = useState(false);
  const [openDesPopup, setOpenDespopup] = useState(false);
  const [openGrdPopup, setOpenGrdpopup] = useState(false);
  const [openSubPopup, setOpenSubpopup] = useState(false);
  const [openCusPopup, setOpenCuspopup] = useState(false);
  const [openCusBomPopup, setOpenCusBompopup] = useState(false);
  const [openDiePopup, setOpenDiepopup] = useState(false);
  const [openHsnPopup, setOpenHsnpopup] = useState(false);
  const [openPrdPopup, setOpenPrdpopup] = useState(false);
  const [openJwPopup, setOpenJwpopup] = useState(false);

  if (openPopup == false) {
    hsnLookup.hsnRecordID = data.Hsn;
    hsnLookup.hsnCode = data.HsnCode;
  }
  function handleOpen(type) {
    if (type == "JW") {
      setOpenJwpopup(true);
    }
    if (type == "BOM") {
      setOpenCusBompopup(true);
    }
    if (type == "SP") {
      setOpenSPopup(true);
    }
    if (type == "MT") {
      if (stageprocessLookup.SPRecordID == "") {
        toast.error("Please select stage/process Lookup");
      } else setOpenMatopup(true);
    }
    if (type == "DES") {
      setOpenDespopup(true);
    }
    if (type == "GRD") {
      setOpenGrdpopup(true);
    }
    if (type == "SUB") {
      setOpenSubpopup(true);
    }
    if (type == "CUS") {
      setOpenCuspopup(true);
    }
    if (type == "DIE") {
      setOpenDiepopup(true);
    }
    if (type == "HSN") {
      setOpenHsnpopup(true);
    }
    if (type == "PRD") {
      setOpenPrdpopup(true);
    }
  }

  const childToParent = (childdata, type) => {
    console.log(
      "🚀 ~ file: Editproduct.jsx:288 ~ childToParent ~ childdata:",
      childdata
    );

    if (type == "Jobwork") {
      SetJobworkLookup({
        JWRecordID: childdata.RecordID,
        JWCode: childdata.Code,
        JWName: childdata.Name,
      });
      setOpenJwpopup(false);
    }

    if (type == "Process/Stage") {
      SetStageprocessLookup({
        SPRecordID: childdata.ProcessRecordID,
        SPCode: childdata.Code,
        SPName: childdata.Name,
      });
      setOpenSPopup(false);
    }
    if (type === "Material") {
      SetmaterialLookup({
        matRecordID: childdata.MaterialRecordID,
        matCode: childdata.Code,
        matName: childdata.Name,
        isDesignpattern: childdata.DesignApp,
        uomConversionType: childdata.UomType,
        uomConDesc: childdata.ConsumptionDesc,
        materialType: childdata.Type,
        total: Number(childdata.Total).toFixed(4),
        mgroup: childdata.MGroup,
        fixedRate: childdata.Fixrate,
        WastageforCosting: Number(childdata.WastageforCosting).toFixed(2),
        latestRate: childdata.LatestConsumptionCost,
      });
      setColorRecID(childdata.ColourRecordID);
      setCuomRecID(childdata.CUomRecordID);
      setFixedRate(Number(childdata.ConsumptionCost).toFixed(6));
      setOpenMatopup(false);
    }
    if (type == "Design Pattern") {
      SetDesignPatternLookup({
        DPCode: childdata.Code,
        DPRecordID: childdata.RecordID,
        DPName: childdata.Name,
      });
      setOpenDespopup(false);
    }
    if (type == "Grade") {
      SetGradeLookup({
        grdCode: childdata.Code,
        grdRecordID: childdata.RecordID,
        grdName: childdata.Name,
      });
      setOpenGrdpopup(false);
    }
    if (type == "Substance") {
      SetSubstanceLookup({
        subCode: childdata.Code,
        subRecordID: childdata.RecordID,
        subName: childdata.Name,
      });
      setOpenSubpopup(false);
    }
    if (type == "Customer") {
      setCustomerLookup({
        cusCode: childdata.Code,
        cusRecordID: childdata.RecordID,
        cusName: childdata.Name,
      });
      setOpenCuspopup(false);
    }
    if (type == "BOM") {
      setCustomerBomLookup({
        cusBomCode: childdata.Code,
        cusBomRecordID: childdata.RecordID,
        cusBomName: childdata.Name,
      });
      setOpenCusBompopup(false);
    }
    if (type == "Materials") {
      setDiesLookup({
        diesCode: childdata.Code,
        diesRecordID: childdata.RecordID,
        diesName: childdata.Name,
      });
      setOpenDiepopup(false);
    }
    if (type == "HSN") {
      SetHsnLookup({
        hsnRecordID: childdata.RecordID,
        hsnCode: childdata.Code,
      });
      setIsOpenPopup(true);
      setOpenHsnpopup(false);
    }
    if (type == "Products") {
      setProductLookup({
        proCode: childdata.Code,
        proRecordID: childdata.RecordID,
        proName: childdata.Name,
      });
      setOpenPrdpopup(false);
    }
  };

  const selectCellBomData = ({ rowData, mode, field }) => {
    console.log(
      "🚀 ~ file: Editproduct.jsx:280 ~ selectCellBomData ~ rowData:",
      rowData
    );
    SetBomMode(mode);
    if (mode == "A") {
      setFileName("");
      setFixedRate("");
      SetStageprocessLookup({
        SPRecordID: "",
        SPCode: "",
        SPName: "",
      });
      SetJobworkLookup({
        JWRecordID: "",
        JWCode: "",
        JWName: "",
      });
      SetmaterialLookup({
        matRecordID: "",
        matCode: "",
        matName: "",
        isDesignpattern: "",
        uomConversionType: "",
        uomConDesc: "",
        materialType: "",
        total: "",
        mgroup: "",
        fixedRate: "",
        WastageforCosting: 0,
        latestRate: "",
      });
      SetBomRowData({
        bomRecordID: "",
        bomQuantity: "",
        materialCost: "",
        sortOrder: "",
        materialType: "",
        cuomRecID: "",
        puomRecID: "",
        Wastage: "",
        TotalQty: "",
      });
      setCustomerLookup({
        cusRecordID: "",
        cusCode: "",
        cusName: "",
      });
      setCustomerBomLookup({
        cusBomCode: "",
        cusBomRecordID: "",
        cusBomName: "",
      });
      setProductPriceData({
        costPrice: "",
        agreedPrice: "",
        recordID: "",
      });
      setDiesLookup({
        diesRecordID: "",
        diesCode: "",
        diesName: "",
      });
      setProductDiesData({
        count: "",
        sortOrder: "",
        recordID: "",
      });
    } else {
      if (field == "action") {
        setBomParentID(rowData.parentID);
        setFileName(rowData.Attachments);
        setFixedRate(Number(rowData.ConsumptionCost).toFixed(6));
        setCuomRecID();
        setColorRecID();
        SetBomRowData({
          bomRecordID: rowData.RecordID,
          bomQuantity: rowData.Quantity,
          materialCost: rowData.MaterialCost,
          sortOrder: rowData.SortOrder,
          materialType: rowData.Type,
          cuomRecID: rowData.McuomRecordID,
          puomRecID: rowData.PuomRecordID,
          TotalQty: rowData.TotalQty,
          Wastage: rowData.Wastage,
        });
        SetStageprocessLookup({
          SPRecordID: rowData.PsRecordID,
          SPCode: rowData.PsCode,
          SPName: rowData.PsDesc,
        });
        SetJobworkLookup({
          JWRecordID: rowData.ComponentID ? rowData.ComponentID : "",
          JWCode: rowData.ComponentCode ? rowData.ComponentCode : "",
          JWName: rowData.ComponentDesc ? rowData.ComponentDesc : "",
        });
        SetmaterialLookup({
          matRecordID: rowData.MtlRecordID,
          matCode: rowData.MtlCode,
          matName: rowData.MtlDesc,
          isDesignpattern: rowData.DesignApp,
          uomConversionType: rowData.UomType,
          uomConDesc: rowData.ConsumptionDesc,
          materialType: rowData.Type,
          total: Number(rowData.Total).toFixed(4),
          mgroup: rowData.MGroup,
          fixedRate: rowData.Fixrate,
          WastageforCosting: Number(rowData.WastageforCosting).toFixed(2),
          latestRate: rowData.LatestConsumptionCost,
        });
        setCustomerLookup({
          cusRecordID: rowData.CustRecordID,
          cusCode: rowData.CustID,
          cusName: rowData.CustName,
        });
        setCustomerBomLookup({
          cusBomCode: rowData.BomCode,
          cusBomRecordID: rowData.BomheaderID,
          cusBomName: "",
        });
        setProductPriceData({
          costPrice: rowData.Costprice,
          agreedPrice: rowData.AgreedPrice,
          recordID: rowData.RecordID,
        });
        setDiesLookup({
          diesCode: rowData.Code,
          diesRecordID: rowData.MaterialID,
          diesName: rowData.Name,
        });
        setProductDiesData({
          count: rowData.DiesCount,
          // sortOrder:  rowData.SortOrder          ,
          recordID: rowData.RecordID,
          sortOrder: rowData.SortOrder,
        });
      }
    }
  };

  // *************** BOM SCREEN INITIAL VALUE *************** //
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
  const bomInitialValue = {
    modelNo: data.ModelNo,
    description: data.Desc,
    imageurl: data.ImageName
      ? store.getState().globalurl.imageUrl + data.ImageName
      : store.getState().globalurl.imageUrl + "Defaultimg.jpg",
    referenceNo: exploreData != "N" ? exploreData.ReferenceNo : "",
    versionName: exploreData != "N" ? exploreData.Versionname : "",
    referenceDate: exploreData != "N" ? exploreData.Bhdate : currentdate,
    bomQuantity: Number(bomRowData.bomQuantity).toFixed(4),
    materialCost: Number(bomRowData.materialCost).toFixed(2),
    sortOreder: bomRowData.sortOrder,
    fixedRate,
    Wastage: Number(bomRowData.Wastage).toFixed(2),
    TotalQty: Number(bomRowData.TotalQty).toFixed(4),
    Wastageforcosting: Number(materialLookup.WastageforCosting).toFixed(2),
    matFixRate: materialLookup.fixedRate,
    latestRate: materialLookup.latestRate,
  };

  // *************** GET FILES FROM INPUT *************** //

  const getFileChange = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "attachments");
    const fileData = await dispatch(
      fnFileUpload(formData, bomRowData.bomRecordID, "TR016")
    );
    setFileName(fileData.payload.apiResponse);
  };

  // *************** PRODUCT BOM SCREEN SAVE FUNCTION *************** //

  const [refNum, setRefNum] = useState();
  const [refName, setRefName] = useState();
  const [refDate, setRefDate] = useState();
  const fncurrencySave = async (values, resetForm, del) => {
    let action =
      bomMode === "A" && !del
        ? "insert"
        : bomMode === "E" && del
        ? "harddelete"
        : "update";

    const idata = {
      RecordID: bomRowData.bomRecordID,
      Prdid: recID,
      CUomRecordID: CuomRecID,
      CoRecordID: colorRecID,
      Description: materialLookup.matName,
      Mtlid: materialLookup.matRecordID,
      Psid: stageprocessLookup.SPRecordID,
      Quantity: values.bomQuantity,
      Versionname: refName || values.versionName,
      // material cost for boards and normal material MtlCost:materialLookup.mgroup == "B" || materialLookup.mgroup == "FM"  || materialLookup.mgroup == "EV"? (Math.ceil((Number(values.bomQuantity) +(values.bomQuantity * (values.Wastage/100))).toFixed(4)/Number(materialLookup.total))* Number(materialLookup.fixedRate)).toFixed(4) :((Number(values.bomQuantity) +(values.bomQuantity * (Number(values.Wastage)/100))).toFixed(4) * Number(values.fixedRate)).toFixed(4),
      MtlCost:
        show == 8
          ? (
              values.bomQuantity * Number(values.fixedRate) +
              values.bomQuantity *
                Number(values.fixedRate) *
                (Number(values.Wastageforcosting) / 100)
            ).toFixed(4)
          : (
              values.bomQuantity * Number(values.fixedRate) +
              values.bomQuantity *
                Number(values.fixedRate) *
                (Number(values.Wastageforcosting) / 100)
            ).toFixed(4),
      SortOrder: 0,
      Disable: "N",
      Attachments: fileName,
      ReferenceNo: refNum || values.referenceNo,
      Bhdate: refDate || values.referenceDate,
      Finyear,
      CompanyID,
      ComponentID: jobworkLookup.JWRecordID,
      Wastage: values.Wastage,
      WastageforCosting: values.Wastageforcosting,
      TotalQty: (
        Number(values.bomQuantity) +
        values.bomQuantity * (values.Wastage / 100)
      ).toFixed(2),
      BoardNumbers:
        materialLookup.mgroup == "B" ||
        materialLookup.mgroup == "FM" ||
        materialLookup.mgroup == "EV"
          ? Math.ceil(
              (
                Number(values.bomQuantity) +
                values.bomQuantity * (values.Wastage / 100)
              ).toFixed(2) / Number(materialLookup.total)
            )
          : 0,
      Fixedrate: show == 8 ? 0 : values.matFixRate,
      LatestMtlCost:
        show == 8
          ? (
              values.bomQuantity * Number(values.latestRate) +
              values.bomQuantity *
                Number(values.latestRate) *
                (Number(values.Wastageforcosting) / 100)
            ).toFixed(4)
          : (
              values.bomQuantity * Number(values.latestRate) +
              values.bomQuantity *
                Number(values.latestRate) *
                (Number(values.Wastageforcosting) / 100)
            ).toFixed(4),
    };

    const response = await dispatch(
      explorePostData({ accessID: "TR016", action, idata })
    );
    if (response.payload.Status == "Y") {
      await dispatch(
        show == 2
          ? fetchExplorelitview(
              "TR016",
              "BOM",
              `parentID='${response.payload.Recid}' AND Type != 'L'`,
              ""
            )
          : fetchExplorelitview(
              "TR016",
              "BOM",
              `parentID='${response.payload.Recid}' AND Type = 'L'`,
              ""
            )
      );
      toast.success(response.payload.Msg);

      selectCellBomData({ rowData: {}, mode: "A", field: "" });
    } else {
      toast.error(response.payload.Msg);
    }
  };

  // *************** PRODUCT BOM LEATHER DESIGN PATTERN SCREEN  *************** //

  const [designMode, setDesignMode] = useState("A");

  function bomDesignpatternCustomToolbar() {
    return (
      <React.Fragment>
        <GridToolbarContainer
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography>List of Design Pattern</Typography>
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
              <IconButton type="reset">
                <AddOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </GridToolbarContainer>
      </React.Fragment>
    );
  }

  // ***************  BOM LOOKUP  *************** //

  const [designPatternLookup, SetDesignPatternLookup] = useState({
    DPRecordID: "",
    DPCode: "",
    DPName: "",
  });

  const [gradeLookup, SetGradeLookup] = useState({
    grdRecordID: "",
    grdCode: "",
    grdName: "",
  });

  const [substanceLookup, SetSubstanceLookup] = useState({
    subRecordID: "",
    subCode: "",
    subName: "",
  });

  const [bomDesignRowData, SetBomDesignRowData] = useState({
    lenght: "",
    width: "",
    nos: "",
    wastageinper: "",
    sortOrder: "",
    recordID: "",
  });

  const selectCellDesignData = ({ rowData, mode, field }) => {
    //  console.log(
    //    "🚀 ~ file: Editproduct.jsx:280 ~ selectCellBomData ~ rowData:",
    //    rowData
    //  );
    setDesignMode(mode);
    if (mode == "A") {
      SetDesignPatternLookup({
        DPRecordID: "",
        DPCode: "",
        DPName: "",
      });
      SetGradeLookup({
        grdRecordID: "",
        grdCode: "",
        grdName: "",
      });
      SetSubstanceLookup({
        subRecordID: "",
        subCode: "",
        subName: "",
      });
      SetBomDesignRowData({
        lenght: "",
        width: "",
        nos: "",
        wastageinper: "",
        sortOrder: "",
        recordID: "",
      });
    } else {
      if (field == "action") {
        SetDesignPatternLookup({
          DPRecordID: rowData.DesignPatternRecordID,
          DPCode: rowData.DesignCode,
          DPName: rowData.DesignDescription,
        });
        SetGradeLookup({
          grdRecordID: rowData.GradeRecordID,
          grdCode: rowData.GradeCode,
          grdName: rowData.GradeDescription,
        });
        SetSubstanceLookup({
          subRecordID: rowData.SubstanceRecordID,
          subCode: rowData.SubstanceCode,
          subName: rowData.SubstanceDescription,
        });
        SetBomDesignRowData({
          recordID: rowData.RecordID,
          lenght: rowData.Length,
          width: rowData.Width,
          nos: rowData.Nos,
          wastageinper: rowData.WastageinPercent,
          sortOrder: rowData.SortOrder,
        });
      }
    }
  };
  const bomDesignpatternInitialValue = {
    modelNo: data.ModelNo,
    description: data.Desc,
    length: Number(bomDesignRowData.lenght).toFixed(2),
    width: Number(bomDesignRowData.width).toFixed(2),
    nos: designMode == "A" ? 1 : bomDesignRowData.nos,
    wastageinper: 0,
    sortOrder: bomDesignRowData.sortOrder,
  };

  const bomDesignFn = async (values, resetForm, del) => {
    let action =
      designMode === "A" && !del
        ? "insert"
        : designMode === "E" && del
        ? "harddelete"
        : "update";

    if (del && !bomDesignRowData.recordID) {
      toast.error("Please Select Design Pattern ");
      return;
    }
    const idata = {
      RecordID: bomDesignRowData.recordID,
      Length: values.length,
      Width: conversionData.Type == "L" ? 1 : values.width,
      queueMicrotaskuantity: 0,
      WastageinPercent: 0,
      GradeRecordID: gradeLookup.grdRecordID,
      SubstanceRecordID: substanceLookup.subRecordID,
      SortOrder: values.sortOrder,
      DesignPatternRecordID: designPatternLookup.DPRecordID,
      ConsumptionuomRecordID: 0,
      ProductRecordID: recID,
      BomRecordID: bomRowData.bomRecordID,
      Total: (
        Number(
          Number(values.length) *
            Number(conversionData.Type == "L" ? 1 : values.width)
        ) * values.nos
      ).toFixed(4),
      MaterialRecordID: materialLookup.matRecordID,
      TotalSqft: (
        (
          Number(
            Number(values.length) *
              Number(conversionData.Type == "L" ? 1 : values.width)
          ) * values.nos
        ).toFixed(4) * Number(conversionData.Conversionrate)
      ).toFixed(4),
      Nos: values.nos,
      Finyear,
      CompanyID,
    };

    const response = await dispatch(
      explorePostData({ accessID: "TR046", action, idata })
    );
    if (response.payload.Status == "Y") {
      await dispatch(
        fetchExplorelitview("TR046", "BOM", bomRowData.bomRecordID, "")
      );
      toast.success(response.payload.Msg);

      selectCellDesignData({ rowData: {}, mode: "A", field: "" });
      resetForm();
    } else {
      toast.error(response.payload.Msg);
    }
  };

  // *************** PRODUCT PRICE SCREEN  *************** //

  const productPriceInitialValue = {
    modelNo: data.ModelNo,
    description: data.Desc,
    imageurl: data.ImageName
      ? store.getState().globalurl.imageUrl + data.ImageName
      : store.getState().globalurl.imageUrl + "Defaultimg.jpg",
    costPrice: Number(productPriceData.costPrice).toFixed(2),
    agreedPrice: Number(productPriceData.agreedPrice).toFixed(2),
  };

  const productPriceFn = async (values, resetForm, del) => {
    let action =
      bomMode === "A" && !del
        ? "insert"
        : bomMode === "E" && del
        ? "harddelete"
        : "update";

    const idata = {
      RecordID: productPriceData.recordID,
      AgreedPrice: values.agreedPrice,
      OrderQty: "0",
      DeliveredQty: "0",
      PendingQty: "0",
      SortOrder: 0,
      Disable: 0,
      MaterialRecordID: 0,
      PrdRecordID: recID,
      CustRecordID: customerLookup.cusRecordID,
      VariantPercentage: Number(values.agreedPrice) - Number(values.costPrice),
      Costprice: values.costPrice,
      quantity: values.quantity,
      Diesdescription: 0,
      Diesimage: 0,
      Finyear,
      CompanyID,
      CostingID: customerBomLookup.cusBomRecordID,
      BomheaderID: customerBomLookup.cusBomRecordID,
    };

    const response = await dispatch(
      explorePostData({ accessID: "TR017", action, idata })
    );
    if (response.payload.Status == "Y") {
      dispatch(
        fetchExplorelitview("TR017", "Product Cost", `PrdRecordID=${recID}`, "")
      );

      toast.success(response.payload.Msg);

      selectCellBomData({ rowData: {}, mode: "A", field: "" });
      resetForm();
    } else {
      toast.error(response.payload.Msg);
    }
  };

  // *************** PRODUCT DIES SCREEN  *************** //

  const productDiesInitialValue = {
    modelNo: data.ModelNo,
    description: data.Desc,
    imageurl: data.ImageName
      ? store.getState().globalurl.imageUrl + data.ImageName
      : store.getState().globalurl.imageUrl + "Defaultimg.jpg",
    count: productDiesData.count,
    sortOrder: productDiesData.sortOrder,
  };

  const productDiesFn = async (values, resetForm, del) => {
    let action =
      bomMode === "A" && !del
        ? "insert"
        : bomMode === "E" && del
        ? "harddelete"
        : "update";

    const idata = {
      RecordID: productDiesData.recordID,
      DiesCount: values.count,
      SortOrder: values.sortOrder,
      MaterialID: diesLookup.diesRecordID,
      ProductID: recID,
      Finyear,
      CompanyID,
    };

    const response = await dispatch(
      explorePostData({ accessID: "TR106", action, idata })
    );
    if (response.payload.Status == "Y") {
      dispatch(fetchExplorelitview("TR106", "Dies", recID, ""));

      toast.success(response.payload.Msg);

      selectCellBomData({ rowData: {}, mode: "A", field: "" });
      resetForm();
    } else {
      toast.error(response.payload.Msg);
    }
  };

  // *************** PRODUCT DIES SCREEN  *************** //

  const productStockInitialValue = {
    modelNo: data.ModelNo,
    description: data.Desc,
    imageurl: data.ImageName
      ? store.getState().globalurl.imageUrl + data.ImageName
      : store.getState().globalurl.imageUrl + "Defaultimg.jpg",
    openstockProductQty: stockData.OpenstockProductQty,
    recievedStockProductQty: stockData.RecievedStockProductQty,
    issuedStockPrdQty: stockData.IssuedStockPrdQty,
    requirementStockPrdQty: stockData.RequirementStockPrdQty,
    stock: stockData.Stock,
    openStockDate: stockData.Osdate,
    balance: stockData.BALANCE,
  };

  const [bomLoading, setBomLoading] = useState(false);

  const bomCopy = async () => {
    if (productLookup.proRecordID == "") {
      toast.error("Please Select Product");
      return;
    }
    setBomLoading(true);

    const ResponseData = await dispatch(
      bomCopyFn({
        data: { BhprdRecordID: productLookup.proRecordID },
        accessID: accessID,
      })
    );
    if (ResponseData.payload.Status == "Y") {
      setBomLoading(false);
      toast.success("Inserted Successfully");
      navigate(
        `/Apps/Secondarylistview/TR001/Product%20Master/${headerID}/${productDescription}`
      );
    } else setBomLoading(false);
  };

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
            `/Apps/Secondarylistview/TR001/Product%20Master/${headerID}/${productDescription}`
          );
        }
      } else {
        return;
      }
    });
  };
  return (
    <React.Fragment>
      {loading ? <LinearProgress /> : false}
      <Box display="flex" justifyContent="space-between" p={1}>
        <Box display="flex" borderRadius="3px" alignItems={"center"}>
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
              Categories{" "}
              {productDescription == "product-category"
                ? false
                : `(${productDescription}})`}
            </Typography>
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate(
                  `/Apps/Secondarylistview/TR001/Product%20Master/${headerID}/${productDescription}`
                );
              }}
            >
              List of Products
            </Typography>

            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => setShow(1)}
            >
              {data.Desc ? data.Desc : "New Product"}
            </Typography>

            {show === 2 ? (
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(``);
                }}
              >
                BOM
              </Typography>
            ) : (
              false
            )}
            {show === 5 ? (
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(``);
                }}
              >
                Dies
              </Typography>
            ) : (
              false
            )}
            {show === 6 ? (
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                BOM Copy
              </Typography>
            ) : (
              false
            )}
            {show === 3 ? (
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                Design Pattern
              </Typography>
            ) : (
              false
            )}
            {show === 4 ? (
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                Customer Price
              </Typography>
            ) : (
              false
            )}
            {show === 8 ? (
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                Leather BOM
              </Typography>
            ) : (
              false
            )}
            {show === 7 ? (
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
          {mode == "E" && show !== 3 && (
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">Explore</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={show}
                label="Explore"
                onChange={exploreChange}
              >
                <MenuItem value={1}>Product</MenuItem>
                <MenuItem value={2}>BOM</MenuItem>
                <MenuItem value={8}>Leather BOM</MenuItem>
                <MenuItem value={4}>Customer Price</MenuItem>
                <MenuItem value={5}>Dies</MenuItem>
                <MenuItem value={6}>BOM Copy</MenuItem>
                <MenuItem value={7}>Stock</MenuItem>
              </Select>
            </FormControl>
          )}
          <IconButton onClick={() => fnLogOut("Close")} color="error">
            <ResetTvIcon />
          </IconButton>
          <IconButton onClick={() => fnLogOut("Logout")} color="error">
            <LogoutOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
      {show === 1 ? (
        !loading ? (
          <Box m="10px">
            <Formik
              initialValues={productInitialValue}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  productHeaderFn(values, resetForm);
                }, 100);
              }}
              validationSchema={productsHeaderSchema}
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
                        <img
                          src={values.imageurl}
                          style={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}
                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <TextField
                        fullWidth
                        variant="filled"
                        label="Model"
                        name="modelNo"
                        value={values.modelNo}
                        type="text"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.modelNo && !!errors.modelNo}
                        helperText={touched.modelNo && errors.modelNo}
                        focused
                        autoFocus
                        onInvalid={(e) => {
                          e.target.setCustomValidity("Please Fill The Model");
                        }}
                        onInput={(e) => {
                          e.target.setCustomValidity("");
                        }}
                        inputProps={{ maxLength: 10 }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Description"
                        name="description"
                        value={values.description}
                        error={!!touched.description && !!errors.description}
                        helperText={touched.description && errors.description}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        focused
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
                          gridColumn: "span 2",
                          alignContent: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                          right: "0px",
                        }}
                      >
                        <img
                          src={values.imageurl}
                          style={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}
                    <FormControl
                      focused
                      variant="filled"
                      sx={{ gridColumn: "span 2" }}
                    >
                      <InputLabel id="productType">Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="productType"
                        name="productType"
                        value={values.productType}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      >
                        <MenuItem value="S">Sample</MenuItem>
                        <MenuItem value="A">Approved</MenuItem>
                        <MenuItem value="G">General</MenuItem>
                      </Select>
                    </FormControl>
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
                        id="hsnCode"
                        label="HSN"
                        variant="filled"
                        value={hsnLookup.hsnCode}
                        focused
                        required
                        onWheel={(e) => e.target.blur()}
                        inputProps={{ tabIndex: "-1" }}
                      />
                      <IconButton
                        sx={{ height: 40, width: 40 }}
                        onClick={() => handleOpen("HSN")}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>
                    </Box>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Production Per Day"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        !!touched.productionPerDay && !!errors.productionPerDay
                      }
                      helperText={
                        touched.productionPerDay && errors.productionPerDay
                      }
                      name="productionPerDay"
                      value={values.productionPerDay}
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
                      label="Width (in cm)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.width && !!errors.width}
                      helperText={touched.width && errors.width}
                      name="width"
                      value={values.width}
                      sx={{ gridColumn: "span 2", background: "#fff6c3" }}
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
                      label="Height (in cm)"
                      name="height"
                      value={values.height}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.height && !!errors.height}
                      helperText={touched.height && errors.height}
                      sx={{ gridColumn: "span 2", background: "#fff6c3" }}
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
                      label="Weight"
                      name="weight"
                      value={values.weight}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.weight && !!errors.weight}
                      helperText={touched.weight && errors.weight}
                      sx={{ gridColumn: "span 2", background: "#fff6c3" }}
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
                      label="Length (in cm)"
                      name="length"
                      value={values.length}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.length && !!errors.length}
                      helperText={touched.length && errors.length}
                      sx={{ gridColumn: "span 2", background: "#fff6c3" }}
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
                      label="Net Weight"
                      name="netWeight"
                      value={values.netWeight}
                      error={!!touched.netWeight && !!errors.netWeight}
                      helperText={touched.netWeight && errors.netWeight}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{ gridColumn: "span 2", background: "#fff6c3" }}
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
                      label="Breath (in cm)"
                      name="breadth"
                      value={values.breadth}
                      error={!!touched.breadth && !!errors.breadth}
                      helperText={touched.breadth && errors.breadth}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{ gridColumn: "span 2", background: "#fff6c3" }}
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
                      label="Sort Order"
                      name="sortOrder"
                      value={values.sortOrder}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                      focused
                      onWheel={(e) => e.target.blur()}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                    />

                    <Box sx={{ gridColumn: "span 2" }}>
                      <Field
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
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px" gap={2}>
                    {yearFlag == "true" ? (
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
                    <Button
                      color="warning"
                      variant="contained"
                      onClick={() => {
                        navigate(
                          `/Apps/Secondarylistview/TR001/Product%20Master/${headerID}/${productDescription}`
                        );
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                  <Popup
                    title="HSN"
                    openPopup={openHsnPopup}
                    setOpenPopup={setOpenHsnpopup}
                  >
                    <Listviewpopup
                      accessID="2040"
                      screenName="HSN"
                      childToParent={childToParent}
                    />
                  </Popup>
                </form>
              )}
            </Formik>
          </Box>
        ) : (
          false
        )
      ) : (
        false
      )}

      {show === 2 ? (
        <Box m="10px">
          <Formik
            initialValues={bomInitialValue}
            enableReinitialize={true}
            validationSchema={proBomSchema}
            onSubmit={(values, { resetForm }) => {
              setTimeout(() => {
                fncurrencySave(values, resetForm, false);
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
              resetForm,
            }) => (
              <form
                onSubmit={handleSubmit}
                onReset={() => {
                  selectCellBomData({ rowData: {}, mode: "A", field: "" });
                }}
              >
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
                      id="modelNo"
                      name="modelNo"
                      label="Model"
                      value={values.modelNo}
                      focused
                      inputProps={{ readOnly: true }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      id="description"
                      name="description"
                      label="Description"
                      value={values.description}
                      focused
                      inputProps={{ readOnly: true }}
                    />
                  </FormControl>
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
                      src={values.imageurl}
                      style={{ width: "200px", height: "150px" }}
                    />
                  </Stack>

                  {exploreData != "N" ? (
                    <React.Fragment>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Reference & Version No"
                        name="referenceNo"
                        value={values.referenceNo}
                        required
                        focused
                        inputProps={{ readOnly: true }}
                        sx={{
                          gridColumn: "span 1",
                          background: "#fff6c3",
                          input: { textAlign: "right" },
                        }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Version Name"
                        name="versionName"
                        value={values.versionName}
                        required
                        focused
                        inputProps={{ readOnly: true }}
                        sx={{
                          gridColumn: "span 1",
                        }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="Date"
                        label="Date"
                        name="referenceDate"
                        value={values.referenceDate}
                        inputFormat="YYYY-MM-DD"
                        sx={{ gridColumn: "span 2" }}
                        focused
                        inputProps={{ readOnly: true }}
                      />
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Reference & Version No"
                        name="referenceNo"
                        onChange={(e) => setRefNum(e.target.value)}
                        value={refNum}
                        required
                        focused
                        sx={{
                          gridColumn: "span 1",
                          background: "#fff6c3",
                          input: { textAlign: "right" },
                        }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Version Name"
                        name="versionName"
                        onChange={(e) => setRefName(e.target.value)}
                        value={refName}
                        required
                        focused
                        sx={{
                          gridColumn: "span 1",
                        }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="Date"
                        label="Date"
                        name="referenceDate"
                        onChange={(e) => setRefDate(e.target.value)}
                        value={refDate}
                        inputFormat="YYYY-MM-DD"
                        sx={{ gridColumn: "span 2" }}
                        focused
                        // inputProps={{ readOnly: true }}
                      />
                    </React.Fragment>
                  )}
                  <Box sx={{ gridColumn: "span 2" }}>
                    <Box
                      height="500px"
                      sx={{
                        "& .name-column--cell": {
                          color: colors.greenAccent[300],
                        },
                        "& .MuiDataGrid-columnHeaders": {
                          backgroundColor: colors.blueAccent[800],
                        },
                        "& .MuiDataGrid-virtualScroller": {
                          backgroundColor: colors.primary[400],
                        },
                        "& .MuiDataGrid-footerContainer": {
                          backgroundColor: colors.blueAccent[800],
                        },
                        "& .MuiCheckbox-root": {
                          color: `${colors.greenAccent[200]} !important`,
                        },
                      }}
                    >
                      <DataGrid
                        rows={explorelistViewData}
                        columns={visibleColumns}
                        disableSelectionOnClick
                        getRowId={(row) => row.RecordID}
                        onCellClick={(params) => {
                          selectCellBomData({
                            rowData: params.row,
                            mode: "E",
                            field: params.field,
                          });
                        }}
                        rowsPerPageOptions={[5, 10, 20]}
                        pagination
                        components={{
                          Toolbar: bomCustomToolbar,
                        }}
                        onStateChange={(stateParams) =>
                          setRowCount(stateParams.pagination.rowCount)
                        }
                        loading={exploreLoading}
                        componentsProps={{
                          toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                          },
                        }}
                      />
                    </Box>
                  </Box>

                  <FormControl sx={{ gridColumn: "span 2", gap: "30px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        id="psCode"
                        label="Stage / Process"
                        variant="filled"
                        value={stageprocessLookup.SPCode}
                        focused
                        required
                        inputProps={{ tabIndex: "-1" }}
                      />
                      <IconButton
                        sx={{ height: 40, width: 40 }}
                        onClick={() => handleOpen("SP")}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>

                      <TextField
                        id="psDesc"
                        variant="filled"
                        value={stageprocessLookup.SPName}
                        fullWidth
                        inputProps={{ tabIndex: "-1" }}
                        focused
                      />
                    </Box>
                    <Box
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
                        value={materialLookup.matCode}
                        focused
                        required
                        inputProps={{ tabIndex: "-1" }}
                      />
                      <IconButton
                        sx={{ height: 40, width: 40 }}
                        onClick={() => handleOpen("MT")}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>

                      <TextField
                        id="outlined-basic"
                        variant="filled"
                        value={materialLookup.matName}
                        fullWidth
                        inputProps={{ tabIndex: "-1" }}
                        focused
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="Job Work"
                        variant="filled"
                        value={jobworkLookup.JWCode}
                        focused
                        inputProps={{ tabIndex: "-1" }}
                      />
                      <IconButton
                        sx={{ height: 40, width: 40 }}
                        onClick={() => handleOpen("JW")}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>

                      <TextField
                        id="outlined-basic"
                        variant="filled"
                        value={jobworkLookup.JWName}
                        fullWidth
                        inputProps={{ tabIndex: "-1" }}
                        focused
                      />
                    </Box>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label={`BOM Quantity (${materialLookup.uomConDesc})`}
                      id="bomQuantity"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.bomQuantity}
                      name="bomQuantity"
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                      focused
                      onWheel={(e) => e.target.blur()}
                      error={!!touched.bomQuantity && !!errors.bomQuantity}
                      helperText={touched.bomQuantity && errors.bomQuantity}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Wastage For Production"
                        name="Wastage"
                        id="Wastage"
                        value={values.Wastage}
                        onBlur={handleBlur}
                        onChange={handleChange}
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
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Wastage For Costing"
                        name="Wastageforcosting"
                        id="Wastageforcosting"
                        value={values.Wastageforcosting}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onWheel={(e) => e.target.blur()}
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
                    </Box>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Total (BOM Quantity + Wastage For Production)"
                      id="TotalQty"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={(
                        Number(values.bomQuantity) +
                        values.bomQuantity * (values.Wastage / 100)
                      ).toFixed(2)}
                      name="TotalQty"
                      sx={{
                        gridColumn: "span 2",
                        background: "#FFDAC0",
                        input: { textAlign: "right" },
                      }}
                      focused
                      onWheel={(e) => e.target.blur()}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Fixed Rate"
                        name="fixedRate"
                        id="fixedRate"
                        value={values.matFixRate}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={{
                          gridColumn: "span 2",
                          background: "#fff6c3",
                          input: { textAlign: "right" },
                        }}
                        inputProps={{ readOnly: true }}
                        focused
                      />
                      <TextField
                        fullWidth
                        type="number"
                        variant="filled"
                        label=" Material Cost"
                        id="materialCost"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={(
                          values.bomQuantity * Number(values.fixedRate) +
                          values.bomQuantity *
                            Number(values.fixedRate) *
                            (Number(values.Wastageforcosting) / 100)
                        ).toFixed(4)}
                        name="materialCost"
                        sx={{
                          gridColumn: "span 2",
                          background: "#fff6c3",
                          input: { textAlign: "right" },
                        }}
                        inputProps={{ readOnly: true }}
                        focused
                      />
                    </Box>

                    {/* <TextField
                   fullWidth
                   variant="filled"
                   type="number"
                   label="Sort Order"
                   value={values.sortOreder}
                   id="sortOreder"
                   onBlur={handleBlur}
                   onChange={handleChange}
                   name="sortOreder"
                   // error={!!touched.SortOrder && !!errors.SortOrder}
                   // helperText={touched.SortOrder && errors.SortOrder}
                   sx={{
                     gridColumn: "span 2",
                     background: "#fff6c3",
                     input: { textAlign: "right" },
                   }}
                   focused
                 /> */}
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
                          onChange={getFileChange}
                        />
                        <PictureAsPdfOutlinedIcon fontSize="large" />
                      </IconButton>
                      <Button
                        variant="contained"
                        component={"a"}
                        onClick={() => {
                          fileName
                            ? window.open(
                                store.getState().globalurl.attachmentUrl +
                                  fileName,
                                "_blank"
                              )
                            : toast.error("Please Upload File");
                        }}
                      >
                        View
                      </Button>

                      {materialLookup.isDesignpattern === "Y" &&
                      bomMode === "E" ? (
                        <Button
                          sx={{ ml: "60px" }}
                          variant="contained"
                          onClick={async () => {
                            const response = await dispatch(
                              dpConversionData({
                                Purchase: bomRowData.cuomRecID,
                                FromID: bomRowData.puomRecID,
                                Type: materialLookup.uomConversionType,
                                MaterialID: materialLookup.matRecordID,
                              })
                            );
                            if (response.payload.Status == "Y") {
                              selectCellDesignData({
                                rowData: {},
                                mode: "A",
                                field: "",
                              });

                              setShow(3);
                              dispatch(
                                fetchExplorelitview(
                                  "TR046",
                                  "BOM Details",
                                  bomRowData.bomRecordID,
                                  ""
                                )
                              );
                            } else toast.error(response.payload.Msg);
                            //  console.log(
                            //    "🚀 ~ file: Productdetail.jsx:2997 ~ onClick={async ~ response:",
                            //    response
                            //  );
                            // if(response.){}
                          }}
                        >
                          Design Pattern
                        </Button>
                      ) : (
                        false
                      )}
                    </Box>
                    <Box display="flex" justifyContent="end" gap={2}>
                      {yearFlag == "true" ? (
                        <LoadingButton
                          color="secondary"
                          variant="contained"
                          type="submit"
                          disabled={isSubmitting}
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
                      {yearFlag == "true" ? (
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
                                fncurrencySave(values, resetForm, "harddelete");
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
                        onClick={() => setShow(1)}
                        color="warning"
                        variant="contained"
                      >
                        Cancel
                      </Button>
                    </Box>
                  </FormControl>
                </Box>
              </form>
            )}
          </Formik>
          <Popup
            title="Process/Stage"
            openPopup={openSPPopup}
            setOpenPopup={setOpenSPopup}
          >
            <Listviewpopup
              accessID="2035"
              screenName="Process/Stage"
              childToParent={childToParent}
            />
          </Popup>
          <Popup
            title="Material"
            openPopup={openMatPopup}
            setOpenPopup={setOpenMatopup}
          >
            <Listviewpopup
              accessID="2036"
              screenName="Material"
              childToParent={childToParent}
              filterName={"parentID"}
              filterValue={`${stageprocessLookup.SPRecordID}' AND Type !='L`}
            />
          </Popup>
          <Popup
            title="Jobwork"
            openPopup={openJwPopup}
            setOpenPopup={setOpenJwpopup}
          >
            <Listviewpopup
              accessID="2079"
              screenName="Jobwork"
              childToParent={childToParent}
            />
          </Popup>
        </Box>
      ) : (
        false
      )}
      {show === 8 ? (
        <Box m="10px">
          <Formik
            initialValues={bomInitialValue}
            enableReinitialize={true}
            validationSchema={proBomSchema}
            onSubmit={(values, { resetForm }) => {
              setTimeout(() => {
                fncurrencySave(values, resetForm, false);
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
              resetForm,
            }) => (
              <form
                onSubmit={handleSubmit}
                onReset={() => {
                  selectCellBomData({ rowData: {}, mode: "A", field: "" });
                  resetForm();
                }}
              >
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
                      id="modelNo"
                      name="modelNo"
                      label="Model"
                      value={values.modelNo}
                      focused
                      inputProps={{ readOnly: true }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      id="description"
                      name="description"
                      label="Description"
                      value={values.description}
                      focused
                      inputProps={{ readOnly: true }}
                    />
                  </FormControl>
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
                      src={values.imageurl}
                      style={{ width: "200px", height: "150px" }}
                    />
                  </Stack>

                  {exploreData != "N" ? (
                    <React.Fragment>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Reference & Version No"
                        name="referenceNo"
                        value={values.referenceNo}
                        required
                        focused
                        inputProps={{ readOnly: true }}
                        sx={{
                          gridColumn: "span 1",
                          background: "#fff6c3",
                          input: { textAlign: "right" },
                        }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Version Name"
                        name="versionName"
                        value={values.versionName}
                        required
                        focused
                        inputProps={{ readOnly: true }}
                        sx={{
                          gridColumn: "span 1",
                        }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="Date"
                        label="Date"
                        name="referenceDate"
                        value={values.referenceDate}
                        inputFormat="YYYY-MM-DD"
                        sx={{ gridColumn: "span 2" }}
                        focused
                        inputProps={{ readOnly: true }}
                      />
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Reference & Version No"
                        name="referenceNo"
                        onChange={(e) => setRefNum(e.target.value)}
                        value={refNum}
                        required
                        focused
                        sx={{
                          gridColumn: "span 1",
                          background: "#fff6c3",
                          input: { textAlign: "right" },
                        }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Version Name"
                        name="versionName"
                        onChange={(e) => setRefName(e.target.value)}
                        value={refName}
                        required
                        focused
                        sx={{
                          gridColumn: "span 1",
                        }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="Date"
                        label="Date"
                        name="referenceDate"
                        onChange={(e) => setRefDate(e.target.value)}
                        value={refDate}
                        inputFormat="YYYY-MM-DD"
                        sx={{ gridColumn: "span 2" }}
                        focused
                        // inputProps={{ readOnly: true }}
                      />
                    </React.Fragment>
                  )}
                  <Box sx={{ gridColumn: "span 2" }}>
                    <Box
                      height="500px"
                      sx={{
                        "& .MuiDataGrid-root": {
                          // border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                          // borderBottom: "none",
                        },
                        "& .name-column--cell": {
                          color: colors.greenAccent[300],
                        },
                        "& .MuiDataGrid-columnHeaders": {
                          backgroundColor: colors.blueAccent[800],
                          // borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                          backgroundColor: colors.primary[400],
                        },
                        "& .MuiDataGrid-footerContainer": {
                          // borderTop: "none",
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
                        columns={visibleColumns}
                        disableSelectionOnClick
                        getRowId={(row) => row.RecordID}
                        // pageSize={10}
                        // onPageSizeChange={(newPageSize) =>
                        //   setPageSize(newPageSize)
                        // }
                        onCellClick={(params) => {
                          selectCellBomData({
                            rowData: params.row,
                            mode: "E",
                            field: params.field,
                          });
                        }}
                        rowsPerPageOptions={[5, 10, 20]}
                        pagination
                        components={{
                          Toolbar: bomCustomToolbar,
                        }}
                        onStateChange={(stateParams) =>
                          setRowCount(stateParams.pagination.rowCount)
                        }
                        loading={exploreLoading}
                        componentsProps={{
                          toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                          },
                        }}
                      />
                    </Box>
                  </Box>

                  <FormControl sx={{ gridColumn: "span 2", gap: "30px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        id="psCode"
                        label="Stage / Process"
                        variant="filled"
                        value={stageprocessLookup.SPCode}
                        focused
                        required
                        inputProps={{ tabIndex: "-1" }}
                      />
                      <IconButton
                        sx={{ height: 40, width: 40 }}
                        onClick={() => handleOpen("SP")}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>

                      <TextField
                        id="psDesc"
                        variant="filled"
                        value={stageprocessLookup.SPName}
                        fullWidth
                        inputProps={{ tabIndex: "-1" }}
                        focused
                      />
                    </Box>
                    <Box
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
                        value={materialLookup.matCode}
                        focused
                        required
                        inputProps={{ tabIndex: "-1" }}
                      />
                      <IconButton
                        sx={{ height: 40, width: 40 }}
                        onClick={() => handleOpen("MT")}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>

                      <TextField
                        id="outlined-basic"
                        variant="filled"
                        value={materialLookup.matName}
                        fullWidth
                        inputProps={{ tabIndex: "-1" }}
                        focused
                      />
                    </Box>

                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="BOM Quantity"
                      id="bomQuantity"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.bomQuantity}
                      name="bomQuantity"
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                      focused
                      onWheel={(e) => e.target.blur()}
                      error={!!touched.bomQuantity && !!errors.bomQuantity}
                      helperText={touched.bomQuantity && errors.bomQuantity}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Wastage for Production"
                        name="Wastage"
                        id="Wastage"
                        value={values.Wastage}
                        onBlur={handleBlur}
                        onChange={handleChange}
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
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Wastage For Costing"
                        name="Wastageforcosting"
                        id="Wastageforcosting"
                        value={values.Wastageforcosting}
                        onBlur={handleBlur}
                        onChange={handleChange}
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
                      />
                    </Box>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Total (BOM Quantity + Wastage for Production)"
                      id="TotalQty"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={(
                        Number(values.bomQuantity) +
                        values.bomQuantity * (values.Wastage / 100)
                      ).toFixed(2)}
                      name="TotalQty"
                      sx={{
                        gridColumn: "span 2",
                        background: "#FFDAC0",
                        input: { textAlign: "right" },
                      }}
                      focused
                    />

                    {/* {materialLookup.mgroup == "B" || materialLookup.mgroup == "FM"  || materialLookup.mgroup == "EV" ?<TextField
                      fullWidth
                      type="number"
                      variant="filled"
                      label="Number of Boards"
                      id="numberOfBoards"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={Math.ceil((Number(values.bomQuantity) +(values.bomQuantity * (values.Wastage/100))).toFixed(4)/Number(materialLookup.total))}
                      name="numberOfBoards"
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                      inputProps={{ readOnly: true }}
                      focused
                    /> : false } */}
                    {/* {materialLookup.mgroup == "B" || materialLookup.mgroup == "FM"  || materialLookup.mgroup == "EV" ? <TextField
                      fullWidth
                      type="number"
                      variant="filled"
                      label=" Material Cost"
                      id="materialCost"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={(Math.ceil((Number(values.bomQuantity) +(values.bomQuantity * (values.Wastage/100))).toFixed(4)/Number(materialLookup.total))* Number(materialLookup.fixedRate)).toFixed(4)}
                      name="materialCost"
                      sx={{
                        gridColumn: "span 2",
                        background: "#FFDAC0",
                        input: { textAlign: "right" },
                      }}
                      inputProps={{ readOnly: true }}
                      focused
                    /> :  
                    
                    <TextField
                    fullWidth
                    type="number"
                    variant="filled"
                    label=" Material Cost"
                    id="materialCost"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={((Number(values.bomQuantity) +(values.bomQuantity * (Number(values.Wastage)/100))).toFixed(4) * Number(values.fixedRate)).toFixed(4)}
                    name="materialCost"
                    sx={{
                      gridColumn: "span 2",
                      background: "#fff6c3",
                      input: { textAlign: "right" },
                    }}
                    inputProps={{ readOnly: true }}
                    focused
                  /> } */}

                    <TextField
                      fullWidth
                      type="number"
                      variant="filled"
                      label=" Material Cost"
                      id="materialCost"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={(
                        values.bomQuantity * Number(values.fixedRate) +
                        values.bomQuantity *
                          Number(values.fixedRate) *
                          (Number(values.Wastageforcosting) / 100)
                      ).toFixed(4)}
                      name="materialCost"
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                      inputProps={{ readOnly: true }}
                      focused
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Sort Order"
                      value={values.sortOreder}
                      id="sortOreder"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="sortOreder"
                      onWheel={(e) => e.target.blur()}
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                      focused
                    />
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
                          onChange={getFileChange}
                        />
                        <PictureAsPdfOutlinedIcon fontSize="large" />
                      </IconButton>
                      <Button
                        variant="contained"
                        component={"a"}
                        onClick={() => {
                          fileName
                            ? window.open(
                                store.getState().globalurl.attachmentUrl +
                                  fileName,
                                "_blank"
                              )
                            : toast.error("Please Upload File");
                        }}
                      >
                        View
                      </Button>

                      {materialLookup.isDesignpattern === "Y" &&
                      bomMode === "E" ? (
                        <Button
                          sx={{ ml: "60px" }}
                          variant="contained"
                          onClick={async () => {
                            const response = await dispatch(
                              dpConversionData({
                                Purchase: bomRowData.cuomRecID,
                                FromID: bomRowData.puomRecID,
                                Type: materialLookup.uomConversionType,
                                MaterialID: materialLookup.matRecordID,
                              })
                            );
                            if (response.payload.Status == "Y") {
                              selectCellDesignData({
                                rowData: {},
                                mode: "A",
                                field: "",
                              });

                              setShow(3);
                              dispatch(
                                fetchExplorelitview(
                                  "TR046",
                                  "BOM Details",
                                  bomRowData.bomRecordID,
                                  ""
                                )
                              );
                            } else
                              toast.error(
                                response.payload.Msg
                                  ? response.payload.Msg
                                  : "Check Material Conversion"
                              );
                            //  console.log(
                            //    "🚀 ~ file: Productdetail.jsx:2997 ~ onClick={async ~ response:",
                            //    response
                            //  );
                            // if(response.){}
                          }}
                        >
                          Design Pattern
                        </Button>
                      ) : (
                        false
                      )}
                    </Box>
                    <Box display="flex" justifyContent="end" gap={2}>
                      {yearFlag == "true" ? (
                        <LoadingButton
                          color="secondary"
                          variant="contained"
                          type="submit"
                          disabled={isSubmitting}
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
                      {yearFlag == "true" ? (
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
                                fncurrencySave(values, resetForm, "harddelete");
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
                        onClick={() => setShow(1)}
                        color="warning"
                        variant="contained"
                      >
                        Cancel
                      </Button>
                    </Box>
                  </FormControl>
                </Box>
              </form>
            )}
          </Formik>
          <Popup
            title="Process/Stage"
            openPopup={openSPPopup}
            setOpenPopup={setOpenSPopup}
          >
            <Listviewpopup
              accessID="2035"
              screenName="Process/Stage"
              childToParent={childToParent}
              filterName={"Type"}
              filterValue={"CC"}
            />
          </Popup>
          <Popup
            title="Material"
            openPopup={openMatPopup}
            setOpenPopup={setOpenMatopup}
          >
            <Listviewpopup
              accessID="2036"
              screenName="Material"
              childToParent={childToParent}
              filterName={"parentID"}
              filterValue={`${stageprocessLookup.SPRecordID}' AND Type ='L`}
            />
          </Popup>
        </Box>
      ) : (
        false
      )}

      {show === 3 ? (
        <Box m="10px">
          <Formik
            initialValues={bomDesignpatternInitialValue}
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
              setTimeout(() => {
                bomDesignFn(values, resetForm, false);
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
              resetForm,
            }) => (
              <form
                onSubmit={handleSubmit}
                onReset={() => {
                  selectCellDesignData({ rowData: {}, mode: "A", field: "" });
                  resetForm();
                }}
              >
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
                    id="modelNo"
                    name="modelNo"
                    label="Model"
                    value={values.modelNo}
                    focused
                    inputProps={{ readOnly: true }}
                    sx={{ gridColumn: "span 2" }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    id="description"
                    name="description"
                    label="Description"
                    value={values.description}
                    focused
                    inputProps={{ readOnly: true }}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <FormControl sx={{ gridColumn: "span 2" }}>
                    <Typography>{materialLookup.matName}</Typography>
                    <Box
                      height="457px"
                      sx={{
                        "& .name-column--cell": {
                          color: colors.greenAccent[300],
                        },
                        "& .MuiDataGrid-columnHeaders": {
                          backgroundColor: colors.blueAccent[800],
                          // borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                          backgroundColor: colors.primary[400],
                        },
                        "& .MuiDataGrid-footerContainer": {
                          // borderTop: "none",
                          backgroundColor: colors.blueAccent[800],
                        },
                        "& .MuiCheckbox-root": {
                          color: `${colors.greenAccent[200]} !important`,
                        },
                      }}
                    >
                      <DataGrid
                        rows={explorelistViewData}
                        columns={visibleColumns}
                        disableSelectionOnClick
                        getRowId={(row) => row.RecordID}
                        // pageSize={10}
                        // onPageSizeChange={(newPageSize) =>
                        //   setPageSize(newPageSize)
                        // }
                        loading={exploreLoading}
                        onCellClick={(params) => {
                          selectCellDesignData({
                            rowData: params.row,
                            mode: "E",
                            field: params.field,
                          });
                        }}
                        rowsPerPageOptions={[5, 10, 20]}
                        pagination
                        components={{
                          Toolbar: bomDesignpatternCustomToolbar,
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
                  </FormControl>
                  <FormControl sx={{ gridColumn: "span 2", gap: "30px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        id="designPattern"
                        label="Design Pattern"
                        variant="filled"
                        focused
                        required
                        inputProps={{ tabIndex: "-1" }}
                        value={designPatternLookup.DPCode}
                      />
                      <IconButton
                        onClick={() => handleOpen("DES")}
                        sx={{ height: 40, width: 40 }}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>
                      <TextField
                        id="designPattern"
                        variant="filled"
                        fullWidth
                        inputProps={{ tabIndex: "-1" }}
                        focused
                        value={designPatternLookup.DPName}
                      />
                    </Box>

                    {materialLookup.materialType == "L" ? (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <TextField
                          id="grade"
                          label="Grade"
                          variant="filled"
                          focused
                          required
                          inputProps={{ tabIndex: "-1" }}
                          value={gradeLookup.grdCode}
                        />
                        <IconButton
                          onClick={() => handleOpen("GRD")}
                          sx={{ height: 40, width: 40 }}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>
                        <TextField
                          id="grade"
                          variant="filled"
                          fullWidth
                          inputProps={{ tabIndex: "-1" }}
                          focused
                          value={gradeLookup.grdName}
                        />
                      </Box>
                    ) : (
                      false
                    )}
                    {materialLookup.materialType == "L" ? (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <TextField
                          id="substance"
                          label="Substance"
                          variant="filled"
                          focused
                          required
                          inputProps={{ tabIndex: "-1" }}
                          value={substanceLookup.subCode}
                        />
                        <IconButton
                          onClick={() => handleOpen("SUB")}
                          sx={{ height: 40, width: 40 }}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>
                        <TextField
                          id="substance"
                          variant="filled"
                          fullWidth
                          inputProps={{ tabIndex: "-1" }}
                          focused
                          value={substanceLookup.subName}
                        />
                      </Box>
                    ) : (
                      false
                    )}

                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      id="length"
                      name="length"
                      label="Length (in cm)"
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.length}
                      sx={{
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
                      type={conversionData.Type == "A" ? "number" : "text"}
                      label=" Width (in cm)"
                      id="width"
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={conversionData.Type == "A" ? values.width : "N/A"}
                      name="width"
                      sx={{
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                      focused
                      InputProps={{
                        readOnly: conversionData.Type == "A" ? false : true,
                      }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Nos"
                      id="nos"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="nos"
                      value={values.nos}
                      sx={{
                        background: "#fff6c3",
                      }}
                      focused
                      required
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                    />
                    {materialLookup.materialType != "L" ? (
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Area"
                        sx={{
                          gridColumn: "span 2",
                          background: "#FFDAC0",
                          input: { textAlign: "right" },
                        }}
                        focused
                        inputProps={{ readOnly: true }}
                        value={(
                          Number(values.length) *
                          Number(conversionData.Type == "L" ? 1 : values.width)
                        ).toFixed(2)}
                      />
                    ) : (
                      false
                    )}
                    {materialLookup.materialType != "L" ? (
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Total"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        value={(
                          Number(
                            Number(values.length) *
                              Number(
                                conversionData.Type == "L" ? 1 : values.width
                              )
                          ) * values.nos
                        ).toFixed(4)}
                        sx={{
                          gridColumn: "span 2",
                          background: "#FFDAC0",
                          input: { textAlign: "right" },
                        }}
                        inputProps={{ readOnly: true }}
                      />
                    ) : (
                      false
                    )}
                  </FormControl>
                  {materialLookup.materialType == "L" ? (
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Area"
                      sx={{
                        gridColumn: "span 2",
                        background: "#FFDAC0",
                        input: { textAlign: "right" },
                      }}
                      focused
                      inputProps={{ readOnly: true }}
                      value={(
                        Number(values.length) *
                        Number(conversionData.Type == "L" ? 1 : values.width)
                      ).toFixed(2)}
                    />
                  ) : (
                    false
                  )}
                  {/* <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Wastage in Percent"
                    name="wastageinper"
                    id="wastageinper"
                    value={values.wastageinper}
                    onBlur={handleBlur}
                    onChange={handleChange}
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
                  /> */}
                  {materialLookup.materialType == "L" ? (
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Total"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      focused
                      value={(
                        Number(
                          Number(values.length) *
                            Number(
                              conversionData.Type == "L" ? 1 : values.width
                            )
                        ) * values.nos
                      ).toFixed(4)}
                      sx={{
                        gridColumn: "span 2",
                        background: "#FFDAC0",
                        input: { textAlign: "right" },
                      }}
                      inputProps={{ readOnly: true }}
                    />
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
                      }}
                    >
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label={
                          conversionData.Type == "A"
                            ? "Square Centimeter"
                            : "Centimeter"
                        }
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        value={(
                          Number(
                            Number(values.length) *
                              Number(
                                conversionData.Type == "L" ? 1 : values.width
                              )
                          ) * values.nos
                        ).toFixed(4)}
                        sx={{
                          gridColumn: "span 2",
                          background: "#FFDAC0",
                          input: { textAlign: "right" },
                        }}
                        inputProps={{ readOnly: true }}
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
                          materialLookup.uomConDesc === "Numbers"
                            ? "Square Centimeter"
                            : materialLookup.uomConDesc
                        }
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        value={(
                          (
                            Number(
                              Number(values.length) *
                                Number(
                                  conversionData.Type == "L" ? 1 : values.width
                                )
                            ) * values.nos
                          ).toFixed(4) * Number(conversionData.Conversionrate)
                        ).toFixed(4)}
                        sx={{
                          gridColumn: "span 2",
                          background: "#FFDAC0",
                          input: { textAlign: "right" },
                        }}
                        inputProps={{ readOnly: true }}
                      />
                    </FormControl>
                  </FormControl>

                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Sort Order"
                    id="sortOrder"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="sortOrder"
                    value={values.sortOrder}
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
                </Box>
                <Box display="flex" justifyContent="end" mt="30px" gap={2}>
                  {yearFlag == "true" ? (
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
                  {yearFlag == "true" ? (
                    <Button
                      onClick={() => bomDesignFn(values, resetForm, true)}
                      color="error"
                      variant="contained"
                    >
                      Delete
                    </Button>
                  ) : (
                    <Button color="error" variant="contained" disabled={true}>
                      Delete
                    </Button>
                  )}
                  <Button type="reset" color="warning" variant="contained">
                    Cancel
                  </Button>
                  <Button
                    sx={{ ml: "60px" }}
                    variant="contained"
                    onClick={() => {
                      setShow(materialLookup.materialType == "L" ? 8 : 2);
                      dispatch(
                        materialLookup.materialType == "L"
                          ? fetchExplorelitview(
                              "TR016",
                              "BOM",
                              `parentID='${bomParentID}' AND Type = 'L'`,
                              ""
                            )
                          : fetchExplorelitview(
                              "TR016",
                              "BOM",
                              `parentID='${bomParentID}' AND Type != 'L'`,
                              ""
                            )
                      );
                      selectCellBomData({ rowData: {}, mode: "A", field: "" });
                    }}
                  >
                    BOM
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          <Popup
            title="Design Pattern"
            openPopup={openDesPopup}
            setOpenPopup={setOpenDespopup}
          >
            <Listviewpopup
              accessID="2015"
              screenName="Design Pattern"
              childToParent={childToParent}
            />
          </Popup>

          <Popup
            title="Grade"
            openPopup={openGrdPopup}
            setOpenPopup={setOpenGrdpopup}
          >
            <Listviewpopup
              accessID="2022"
              screenName="Grade"
              childToParent={childToParent}
            />
          </Popup>
          <Popup
            title="Substance"
            openPopup={openSubPopup}
            setOpenPopup={setOpenSubpopup}
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

      {show === 4 ? (
        <Box m="10px">
          <Formik
            initialValues={productPriceInitialValue}
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
              setTimeout(() => {
                productPriceFn(values, resetForm, false);
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
              resetForm,
            }) => (
              <form
                onSubmit={handleSubmit}
                onReset={() => {
                  selectCellBomData({ rowData: {}, mode: "A", field: "" });
                  resetForm();
                }}
              >
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
                      id="modelNo"
                      name="modelNo"
                      label="Model"
                      value={values.modelNo}
                      focused
                      inputProps={{ readOnly: true }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      id="description"
                      name="description"
                      label="Description"
                      value={values.description}
                      focused
                      inputProps={{ readOnly: true }}
                    />
                  </FormControl>
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
                      src={values.imageurl}
                      style={{ width: "200px", height: "150px" }}
                    />
                  </Stack>
                  <Box sx={{ gridColumn: "span 2" }}>
                    <Box
                      height="350px"
                      sx={{
                        "& .MuiDataGrid-root": {
                          // border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                          // borderBottom: "none",
                        },
                        "& .name-column--cell": {
                          color: colors.greenAccent[300],
                        },
                        "& .MuiDataGrid-columnHeaders": {
                          backgroundColor: colors.blueAccent[800],
                          // borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                          backgroundColor: colors.primary[400],
                        },
                        "& .MuiDataGrid-footerContainer": {
                          // borderTop: "none",
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
                        columns={visibleColumns}
                        disableSelectionOnClick
                        getRowId={(row) => row.RecordID}
                        onCellClick={(params) => {
                          if (params.field == "Qty") {
                            setOrderQty(params.row.Qty);
                            setRecordID(params.row.RecordID);
                            handleClickOpen();
                          }
                          selectCellBomData({
                            rowData: params.row,
                            mode: "E",
                            field: params.field,
                          });
                        }}
                        rowsPerPageOptions={[5, 10, 20]}
                        pagination
                        components={{
                          Toolbar: bomCustomToolbar,
                        }}
                        onStateChange={(stateParams) =>
                          setRowCount(stateParams.pagination.rowCount)
                        }
                        loading={exploreLoading}
                        componentsProps={{
                          toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                          },
                        }}
                      />

                      <Box p={2} sx={{ gap: 5, display: "flex" }}>
                        <Chip
                          icon={<PrintOutlined color="" />}
                          label="All Bom"
                          variant="outlined"
                        />
                        <Chip
                          icon={<PrintOutlined color="primary" />}
                          label="Internal Order"
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                  </Box>
                  <FormControl sx={{ gridColumn: "span 2", gap: "30px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        id="customerid"
                        label="Custommer ID"
                        variant="filled"
                        focused
                        required
                        inputProps={{ tabIndex: "-1" }}
                        value={customerLookup.cusCode}
                      />
                      <IconButton
                        onClick={() => handleOpen("CUS")}
                        sx={{ height: 40, width: 40 }}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>
                      <TextField
                        id="customerid"
                        variant="filled"
                        fullWidth
                        inputProps={{ tabIndex: "-1" }}
                        focused
                        value={customerLookup.cusName}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        id="customerid"
                        label="BOM"
                        variant="filled"
                        focused
                        required
                        fullWidth
                        inputProps={{ tabIndex: "-1" }}
                        value={customerBomLookup.cusBomCode}
                      />
                      <IconButton
                        onClick={() => handleOpen("BOM")}
                        sx={{ height: 40, width: 40 }}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>
                    </Box>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Agreed Price"
                      id="agreedPrice"
                      value={values.agreedPrice}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="agreedPrice"
                      sx={{
                        background: "#fff6c3",
                      }}
                      focused
                      onWheel={(e) => e.target.blur()}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                    />
                    <TextField
                      name="costPrice"
                      type="number"
                      id="costPrice"
                      label="Costing Price"
                      variant="filled"
                      value={values.costPrice}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      focused
                      InputProps={{
                        readOnly: true,
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
                      value={
                        Number(values.agreedPrice) - Number(values.costPrice)
                      }
                      focused
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{
                        background: "#FFDAC0",
                        input: { textAlign: "right" },
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="end" mt="30px" gap={2}>
                  {yearFlag == "true" ? (
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
                  {yearFlag == "true" ? (
                    <Button
                      onClick={() => productPriceFn(values, resetForm, true)}
                      color="error"
                      variant="contained"
                    >
                      Delete
                    </Button>
                  ) : (
                    <Button color="error" variant="contained" disabled={true}>
                      Delete
                    </Button>
                  )}
                  <Button
                    type="reset"
                    color="warning"
                    variant="contained"
                    onClick={() => {
                      setShow(1);
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
                <Dialog
                  open={open}
                  onClose={() => setOpen(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Order Quantity"}
                  </DialogTitle>
                  <DialogContent>
                    <TextField
                      name="quantity"
                      type="number"
                      id="quantity"
                      label="Quantity"
                      variant="filled"
                      value={OrderQty}
                      onBlur={handleBlur}
                      onChange={(e) => setOrderQty(e.target.value)}
                      focused
                      sx={{
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleClose} autoFocus>
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
                <Popup
                  title="Customer"
                  openPopup={openCusPopup}
                  setOpenPopup={setOpenCuspopup}
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
                  title="BOM"
                  openPopup={openCusBomPopup}
                  setOpenPopup={setOpenCusBompopup}
                >
                  <Listviewpopup
                    accessID="2019"
                    screenName="BOM"
                    childToParent={childToParent}
                    filterName={"parentID"}
                    filterValue={recID}
                  />
                </Popup>
              </form>
            )}
          </Formik>
        </Box>
      ) : (
        false
      )}
      {show === 5 ? (
        <Box m="10px">
          <Formik
            initialValues={productDiesInitialValue}
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
              setTimeout(() => {
                fncurrencySave(values, resetForm, false);
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
              resetForm,
            }) => (
              <form
                onSubmit={handleSubmit}
                onReset={() => {
                  selectCellBomData({ rowData: {}, mode: "A", field: "" });
                  resetForm();
                }}
              >
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
                      id="modelNo"
                      name="modelNo"
                      label="Model"
                      value={values.modelNo}
                      focused
                      inputProps={{ readOnly: true }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      id="description"
                      name="description"
                      label="Description"
                      value={values.description}
                      focused
                      inputProps={{ readOnly: true }}
                    />
                  </FormControl>
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
                      src={values.imageurl}
                      style={{ width: "200px", height: "150px" }}
                    />
                  </Stack>
                  <Box sx={{ gridColumn: "span 2" }}>
                    <Box
                      height="350px"
                      sx={{
                        "& .MuiDataGrid-root": {},
                        "& .MuiDataGrid-cell": {},
                        "& .name-column--cell": {
                          color: colors.greenAccent[300],
                        },
                        "& .MuiDataGrid-columnHeaders": {
                          backgroundColor: colors.blueAccent[800],
                        },
                        "& .MuiDataGrid-virtualScroller": {
                          backgroundColor: colors.primary[400],
                        },
                        "& .MuiDataGrid-footerContainer": {
                          backgroundColor: colors.blueAccent[800],
                        },
                        "& .MuiCheckbox-root": {
                          color: `${colors.greenAccent[200]} !important`,
                        },
                      }}
                    >
                      <DataGrid
                        rows={explorelistViewData}
                        columns={visibleColumns}
                        disableSelectionOnClick
                        getRowId={(row) => row.RecordID}
                        onCellClick={(params) => {
                          selectCellBomData({
                            rowData: params.row,
                            mode: "E",
                            field: params.field,
                          });
                        }}
                        rowsPerPageOptions={[5, 10, 20]}
                        pagination
                        components={{
                          Toolbar: bomCustomToolbar,
                        }}
                        onStateChange={(stateParams) =>
                          setRowCount(stateParams.pagination.rowCount)
                        }
                        loading={exploreLoading}
                        componentsProps={{
                          toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                          },
                        }}
                      />
                    </Box>
                  </Box>
                  <FormControl sx={{ gridColumn: "span 2", gap: "30px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        id="dies"
                        label="Dies"
                        variant="filled"
                        focused
                        required
                        inputProps={{ tabIndex: "-1" }}
                        value={diesLookup.diesCode}
                      />
                      <IconButton
                        onClick={() => handleOpen("DIE")}
                        sx={{ height: 40, width: 40 }}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>
                      <TextField
                        id="dies"
                        variant="filled"
                        fullWidth
                        inputProps={{ tabIndex: "-1" }}
                        focused
                        value={diesLookup.diesName}
                      />
                    </Box>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Count"
                      id="count"
                      value={values.count}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="count"
                      sx={{
                        background: "#fff6c3",
                      }}
                      focused
                      onWheel={(e) => e.target.blur()}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                    />
                    <TextField
                      name="sortOrder"
                      type="number"
                      id="sortOrder"
                      label="Sort Order"
                      variant="filled"
                      value={values.sortOrder}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      focused
                      onWheel={(e) => e.target.blur()}
                      sx={{
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                    />
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="end" mt="30px" gap={2}>
                  {yearFlag == "true" ? (
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
                  {yearFlag == "true" ? (
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
                            fncurrencySave(values, resetForm, "harddelete");
                          } else {
                            return;
                          }
                        });
                      }}
                    >
                      Delete
                    </Button>
                  ) : (
                    <Button color="error" variant="contained" disabled={true}>
                      Delete
                    </Button>
                  )}
                  <Button
                    type="reset"
                    color="warning"
                    variant="contained"
                    onClick={() => {
                      setShow(1);
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
                <Popup
                  title="Materials"
                  openPopup={openDiePopup}
                  setOpenPopup={setOpenDiepopup}
                >
                  <Listviewpopup
                    accessID="2041"
                    screenName="Materials"
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
      {show == 6 ? (
        <Box m="10px" sx={{ m: 2 }}>
          <Box
            display="grid"
            gridTemplateColumns="repeat(4 , minMax(0,1fr))"
            gap="30px"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
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
                id="customerid"
                label="Product ID"
                variant="filled"
                focused
                required
                inputProps={{ tabIndex: "-1" }}
                value={productLookup.proCode}
              />
              <IconButton
                onClick={() => handleOpen("PRD")}
                sx={{ height: 40, width: 40 }}
              >
                <img src="https://img.icons8.com/color/48/null/details-popup.png" />
              </IconButton>
              <TextField
                id="customerid"
                variant="filled"
                fullWidth
                inputProps={{ tabIndex: "-1" }}
                focused
                value={productLookup.proName}
              />
            </Box>
          </Box>

          <Box display="flex" justifyContent="end" mt="20px" gap="20px">
            {yearFlag == "true" ? (
              <LoadingButton
                loading={bomLoading}
                onClick={bomCopy}
                variant="contained"
                color="secondary"
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
              }}
            >
              CANCEL
            </Button>
          </Box>
          <Popup
            title=" Products"
            openPopup={openPrdPopup}
            setOpenPopup={setOpenPrdpopup}
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

      {show === 7 ? (
        <Box m="10px">
          <Formik
            initialValues={productStockInitialValue}
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
                  <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      id="modelNo"
                      name="modelNo"
                      label="Model"
                      value={values.modelNo}
                      focused
                      inputProps={{ readOnly: true }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      id="description"
                      name="description"
                      label="Description"
                      value={values.description}
                      focused
                      inputProps={{ readOnly: true }}
                    />
                  </FormControl>
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
                      src={values.imageurl}
                      style={{ width: "200px", height: "150px" }}
                    />
                  </Stack>
                  <FormControl
                    fullWidth
                    sx={{ gridColumn: "span 2", gap: "30px" }}
                  >
                    <TextField
                      name="openstockProductQty"
                      type="number"
                      id="openstockProductQty"
                      label="Opening Stock"
                      variant="filled"
                      value={values.openstockProductQty}
                      focused
                      inputProps={{ style: { textAlign: "right" } }}
                      InputProps={{ readOnly: true }}
                      sx={{ background: "#fff6c3" }}
                    />

                    <TextField
                      name="issuedStockPrdQty"
                      type="number"
                      id="issuedStockPrdQty"
                      value={values.issuedStockPrdQty}
                      label="Issued Qty(Production + Out DC)"
                      variant="filled"
                      focused
                      inputProps={{ style: { textAlign: "right" } }}
                      InputProps={{ readOnly: true }}
                      sx={{ background: "#fff6c3" }}
                    />

                    <Tooltip title="OpeningStock - IssueQty">
                      <TextField
                        name="stock"
                        type="number"
                        id="stock"
                        value={values.stock}
                        label="Available Stock"
                        variant="filled"
                        focused
                        sx={{ background: "#FFDAC0" }}
                        inputProps={{ style: { textAlign: "right" } }}
                        InputProps={{ readOnly: true }}
                      />
                    </Tooltip>
                    <Tooltip title="Requirement Qty - Batchissue Qty">
                      <TextField
                        name="requirementStockPrdQty"
                        type="number"
                        value={values.requirementStockPrdQty}
                        id="requirementStockPrdQty"
                        label="Requirement Qty(Asper ProductionCard)"
                        variant="filled"
                        focused
                        sx={{ background: "#fff6c3" }}
                        inputProps={{ style: { textAlign: "right" } }}
                        InputProps={{ readOnly: true }}
                      />
                    </Tooltip>
                    <Tooltip title="Stock-RequirementQty">
                      <TextField
                        name="balance"
                        type="number"
                        value={values.balance}
                        id="balance"
                        label="Balance"
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
                    <TextField
                      name="openStockDate"
                      type="Date"
                      id="openStockDate"
                      label="Opening Stock Date"
                      variant="filled"
                      focused
                      value={values.openStockDate}
                      inputFormat="YYYY-MM-DD"
                      InputProps={{ readOnly: true }}
                    />
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="end" mt="30px" gap={2}>
                  <Button
                    type="reset"
                    color="warning"
                    variant="contained"
                    onClick={() => {
                      setShow(1);
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      ) : null}
    </React.Fragment>
  );
};

export default Editproduct;
