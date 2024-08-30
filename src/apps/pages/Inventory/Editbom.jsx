import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import store from "../../../index";
import Popup from "../popup";
import Listviewpopup from "../Lookup";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
} from "@mui/material";
import { useProSidebar } from "react-pro-sidebar";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import Swal from "sweetalert2";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { proBomSchema } from "../../Security/validation";
import {
  dpConversionData,
  explorePostData,
  getBomList,
  getFetchData,
  getVersionBom,
  postData,
} from "../../../store/reducers/Formapireducer";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { toast } from "react-hot-toast";
import { tokens } from "../../../Theme";
import { LoadingButton } from "@mui/lab";
import { fnFileUpload } from "../../../store/reducers/Imguploadreducer";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";

const Editbom = () => {
  // *************** PAGE VARIABLES *************** //
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  console.log("🚀 ~ params:", params)
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const yearData = sessionStorage.getItem("year");
  const yearFlag = sessionStorage.getItem("YearFlag");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  //  console.log(params);
  // *************** PAGE PARAMS *************** //
  const recID = params.id;
  const mode = params.Mode;
  const accessID = params.accessID;
  const headerID = params.filtertype;
  const productDescription = params.Type;
  const screenName = params.screenName;

  // *************** PAGE STATES *************** //
  const [show, setShow] = useState(1);

  const bomCall = async () => {
    const response = await dispatch(
      getBomList({ recid: recID, action: "get", ProductID: headerID })
    );
    if (response.payload.Status == "Y") {
      dispatch(
        fetchExplorelitview("TR016", "BOM",`parentID='${response.payload.Data.RecordID}'`, "")
      );
    } else {
      dispatch(fetchExplorelitview("TR016", "BOM", "-1", ""));
    }
  };
  useEffect(() => {
    dispatch(getFetchData({ accessID: "TR001", get: "get", recID: headerID }));
    bomCall();
  }, [location.key]);

  // *************** REDUX STATES *************** //
  const data = useSelector((state) => state.formApi.Data);
  const exploreData = useSelector((state) => state.formApi.exploreData);
  const status = useSelector((state) => state.formApi.Status);
  const Msgs = useSelector((state) => state.formApi.msg);
  const loading = useSelector((state) => state.formApi.loading);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const conversionData = useSelector((state) => state.formApi.conversionData);
  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );
  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );
  const exploreLoading = useSelector((state) => state.exploreApi.loading);
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
  if (show == 1) {
    VISIBLE_FIELDS = ["SLNO", "MtlCode", "Description", "TotalQty", "action"];
  } else {
    VISIBLE_FIELDS = ["SLNO", "DesignCode", "Length", "Width", "action"];
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
    materialType:"",
    total:"",
    mgroup:"",
    fixedRate:"",
    WastageforCosting:0,
    latestRate:""
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
    Wastage:"",
    TotalQty:"",
  });

  const [openSPPopup, setOpenSPopup] = useState(false);
  const [openMatPopup, setOpenMatopup] = useState(false);
  const [openDesPopup, setOpenDespopup] = useState(false);
  const [openGrdPopup, setOpenGrdpopup] = useState(false);
  const [openSubPopup, setOpenSubpopup] = useState(false);
  const [openJwPopup, setOpenJwpopup] = useState(false);
  function handleOpen(type) {
    if (type == "JW") {
      setOpenJwpopup(true);
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
  }

  const childToParent = (childdata, type) => {
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
        total:Number(childdata.Total).toFixed(4),
        mgroup:childdata.MGroup,
        fixedRate:childdata.Fixrate,
        latestRate:childdata.LatestMtlCost,
        WastageforCosting:Number(childdata.WastageforCosting).toFixed(2),
      });
      setColorRecID(childdata.ColourRecordID);
      setCuomRecID(childdata.CUomRecordID);
      setFixedRate(Number(childdata.ConsumptionCost).toFixed(4));
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
        total:"",
        mgroup:"",
        fixedRate:"",
        WastageforCosting:0,
        latestRate:""
      });
      SetBomRowData({
        bomRecordID: "",
        bomQuantity: "",
        Wastage:"",
        materialCost: "",
        sortOrder: "",
        materialType: "",
        cuomRecID: "",
        puomRecID: "",
        TotalQty:"",
      });
    } else {
      if (field == "action") {
        setBomParentID(rowData.parentID);
        setFileName(rowData.Attachments);
        setFixedRate(Number(rowData.ConsumptionCost).toFixed(4));
        setCuomRecID();
        setColorRecID();
        SetBomRowData({
          bomRecordID: rowData.RecordID,
          bomQuantity: rowData.Quantity,
          Wastage:rowData.Wastage,
          materialCost: rowData.MaterialCost,
          sortOrder: rowData.SortOrder,
          materialType: rowData.Type,
          cuomRecID: rowData.McuomRecordID,
          puomRecID: rowData.PuomRecordID,
          TotalQty: rowData.TotalQty,
        });
        SetStageprocessLookup({
          SPRecordID: rowData.PsRecordID,
          SPCode: rowData.PsCode,
          SPName: rowData.PsDesc,
        });
        SetJobworkLookup({
          JWRecordID: rowData.ComponentID ? rowData.ComponentID :"",
          JWCode: rowData.ComponentCode ? rowData.ComponentCode :"",
          JWName: rowData.ComponentDesc ? rowData.ComponentDesc :"",
        });
        SetmaterialLookup({
          matRecordID: rowData.MtlRecordID,
          matCode: rowData.MtlCode,
          matName: rowData.MtlDesc,
          isDesignpattern: rowData.DesignApp,
          uomConversionType: rowData.UomType,
          uomConDesc: rowData.ConsumptionDesc,
          materialType: rowData.Type,
          total:Number(rowData.Total).toFixed(4),
          mgroup:rowData.MGroup,
          fixedRate:rowData.Fixrate,
          latestRate:rowData.LatestRate,
          WastageforCosting:Number(rowData.WastageforCosting).toFixed(2),
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
    referenceNo: exploreData ? exploreData.ReferenceNo : "",
    versionName: exploreData ? exploreData.Versionname : "",
    referenceDate: exploreData ? exploreData.Bhdate : currentdate,
    bomQuantity: Number(bomRowData.bomQuantity).toFixed(4),
    materialCost: Number(bomRowData.materialCost).toFixed(2),
    sortOreder: bomRowData.sortOrder,
    fixedRate,
    Wastage:Number(bomRowData.Wastage).toFixed(2),
    TotalQty:Number(bomRowData.TotalQty).toFixed(4),
    Wastageforcosting:Number(materialLookup.WastageforCosting).toFixed(2),
    matFixRate: materialLookup.fixedRate,
    latestRate:materialLookup.latestRate
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

  const productBomFn = async (values, resetForm, del) => {
    let action =
      bomMode === "A" && !del
        ? "insert"
        : bomMode === "E" && del
        ? "harddelete"
        : "update";

        if(del && !bomRowData.bomRecordID){
          toast.error("Please Select Bom Details ");
          return;
        }
    const idata = {
      RecordID: bomRowData.bomRecordID,
      Prdid: headerID,
      CUomRecordID: CuomRecID,
      CoRecordID: colorRecID,
      Description: materialLookup.matName,
      Mtlid: materialLookup.matRecordID,
      Psid: stageprocessLookup.SPRecordID,
      Quantity: values.bomQuantity,
      MtlCost:show == 8 ?((values.bomQuantity * Number(values.fixedRate)) + (((values.bomQuantity * Number(values.fixedRate)) * (Number(values.Wastageforcosting)/100)))).toFixed(4):((values.bomQuantity * Number(values.fixedRate)) + (((values.bomQuantity * Number(values.fixedRate)) * (Number(values.Wastageforcosting)/100)))).toFixed(4) ,
      SortOrder: values.sortOreder,
      Disable: "N",
      Attachments: fileName,
      ReferenceNo: values.referenceNo,
      Versionname: values.versionName,
      Bhdate: values.referenceDate,
      Wastage:values.Wastage,
      WastageforCosting:values.Wastageforcosting,
      TotalQty:(Number(values.bomQuantity) +(values.bomQuantity * (values.Wastage/100))).toFixed(2),
      BoardNumbers: materialLookup.mgroup == "B" || materialLookup.mgroup == "FM"  || materialLookup.mgroup == "EV"?  Math.ceil((Number(values.bomQuantity) +(values.bomQuantity * (values.Wastage/100))).toFixed(0)/Number(materialLookup.total)):0,
      LatestMtlCost:show == 8 ?((values.bomQuantity * Number(values.latestRate)) + (((values.bomQuantity * Number(values.latestRate)) * (Number(values.Wastageforcosting)/100)))).toFixed(4):((values.bomQuantity * Number(values.latestRate)) + (((values.bomQuantity * Number(values.latestRate)) * (Number(values.Wastageforcosting)/100)))).toFixed(4),
      Fixedrate:show == 8 ? 0 :values.matFixRate,
      ComponentID: jobworkLookup.JWRecordID,
    };

    const response = await dispatch(
      explorePostData({ accessID: "TR016", action, idata })
    );
    if (response.payload.Status == "Y") {
      await dispatch(
        fetchExplorelitview("TR016", "BOM",`parentID='${response.payload.Recid}'` , "")
      );
      toast.success(response.payload.Msg);

      selectCellBomData({ rowData: {}, mode: "A", field: "" });
      resetForm();
    } else {
      toast.error(response.payload.Msg);
    }
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
            `/apps/Secondarylistview/${accessID}/${params.screenName}/${params.filtertype}/${params.Number}/${params.Desc}/all-bom/${params.bomproductid}`
          );
        }
      } else {
        return;
      }
    });
  };

  // *************** PRODUCT BOM LEATHER DESIGN PATTERN SCREEN  *************** //

  const [designMode, setDesignMode] = useState("A");

  function bomDesignpatternCustomToolbar() {
    return (
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
    recordID:""
  });

  const selectCellDesignData = ({ rowData, mode, field }) => {
    console.log(
      "🚀 ~ file: Editproduct.jsx:280 ~ selectCellBomData ~ rowData:",
      rowData
    );
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
        recordID:""
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
    nos: designMode == "A"?1 : bomDesignRowData.nos,
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

        if(del && !bomDesignRowData.recordID){
          toast.error("Please Select Design Pattern ");
          return;
        }
    const idata = {
      RecordID:bomDesignRowData.recordID,
      Length: values.length,
      Width: conversionData.Type == "L" ?1 :values.width,
      Quantity: 0,
      WastageinPercent:0 ,
      GradeRecordID: gradeLookup.grdRecordID,
      SubstanceRecordID: substanceLookup.subRecordID,
      SortOrder: values.sortOrder,
      DesignPatternRecordID: designPatternLookup.DPRecordID,
      ConsumptionuomRecordID: 0,
      ProductRecordID: headerID,
      BomRecordID:bomRowData.bomRecordID,
      Total: (Number(
        Number(values.length) *
          Number(conversionData.Type == "L" ? 1 : values.width)
      ) 
   * values.nos).toFixed(4),
      MaterialRecordID:materialLookup.matRecordID ,
      TotalSqft:((Number(
        Number(values.length) *
          Number(conversionData.Type == "L" ? 1 : values.width)
      )  * values.nos).toFixed(4) * Number(conversionData.Conversionrate)).toFixed(4),
      Nos:values.nos,
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
  return (
    <React.Fragment>
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
                navigate(`/Apps/TR002/Categories`);
              }}
            >
             {params.Number}
            </Typography>
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate(`/Apps/Secondarylistview/TR001/Product%20Master/${params.bomproductid}/${params.Number}`);
              }}
            >
             {params.Desc}
            </Typography>
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate(
                  `/Apps/Secondarylistview/${accessID}/List of Bom/${headerID}/${params.Number}/${params.Desc}/all-bom/${params.bomproductid}`
                );
              }}
            >
              {screenName}
            </Typography>
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              {data.Desc}
            </Typography>

          
            {show == 3 ?<Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate(`/Apps/TR002/Product%20Categories`);
              }}
            >
              Design Pattern
            </Typography>:false}
          </Breadcrumbs>
        </Box>

        <Box display="flex">
          <IconButton onClick={() => fnLogOut("Close")} color="error">
            <ResetTvIcon />
          </IconButton>
          <IconButton onClick={() => fnLogOut("Logout")} color="error">
            <LogoutOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
      {show === 1 ? (
        <Box m="10px">
          <Formik
            initialValues={bomInitialValue}
            enableReinitialize={true}
            validationSchema={proBomSchema}
            onSubmit={(values, { resetForm }) => {
              setTimeout(() => {
                productBomFn(values, resetForm, false);
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

                  {exploreData ? (
                    <React.Fragment>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Reference & Version No"
                        name="referenceNo"
                        value={values.referenceNo}
                        required
                        sx={{ gridColumn: "span 1" }}
                        focused
                        inputProps={{ readOnly: true }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Version Name"
                        name="versionName"
                        value={values.versionName}
                        required
                        sx={{ gridColumn: "span 1" }}
                        focused
                        inputProps={{ readOnly: true }}
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
                    false
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
                   onWheel={(e) => e.target.blur()} 
                   sx={{
                     gridColumn: "span 2",
                     background: "#fff6c3",
                     input: { textAlign: "right" },
                   }}
                   focused
                   error={!!touched.bomQuantity && !!errors.bomQuantity}
                   helperText={touched.bomQuantity && errors.bomQuantity}
                 />
               
                   <Box
                   sx={{
                     display: "flex",
                     flexDirection: "row",
                     alignItems: "center",
                     gap:"10px"
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
                      label="Total (BOM Quantity + Wastage For Production)"
                      id="TotalQty"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={(Number(values.bomQuantity) +(values.bomQuantity * (values.Wastage/100))).toFixed(2)}
                      name="TotalQty"
                      onWheel={(e) => e.target.blur()} 
                      sx={{
                        gridColumn: "span 2",
                        background: "#FFDAC0" ,
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
                    <Box
                   sx={{
                     display: "flex",
                     flexDirection: "row",
                     alignItems: "center",
                     gap:"10px"
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
                    value={((values.bomQuantity * Number(values.fixedRate)) + (((values.bomQuantity * Number(values.fixedRate)) * (Number(values.Wastageforcosting)/100)))).toFixed(4) }
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
                           selectCellDesignData({ rowData: {}, mode: "A", field: "" });

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
                     <Button onClick={()=>productBomFn(values, resetForm, true)} color="error" variant="contained">
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
                   <Button onClick={() =>  navigate(`/apps/Secondarylistview/${accessID}/${params.screenName}/${params.filtertype}/${params.Number}/${params.Desc}/all-bom/${params.bomproductid}`)} color="warning" variant="contained">
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
              filterValue={stageprocessLookup.SPRecordID}
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
              resetForm
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

                    {materialLookup.materialType == "L" ? <Box
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
                    </Box>:false}
                    {materialLookup.materialType == "L" ? <Box
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
                    </Box>:false}
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
                      type={conversionData.Type == "A" ?"number" :"text"}
                      label=" Width (in cm)"
                      id="width"
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={conversionData.Type == "A" ?values.width :"N/A"}
                      name="width"
                      sx={{
                        background: "#fff6c3",
                        input:{textAlign:"right"}
                      }}
                      focused
                      InputProps={{
                        readOnly:conversionData.Type == "A" ?false :true
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
                     {materialLookup.materialType != "L" ?  <TextField
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
                  />:false}
                    {materialLookup.materialType != "L" ? 
                     <TextField
                     fullWidth
                     variant="filled"
                     type="number"
                     label="Total"
                     onBlur={handleBlur}
                     onChange={handleChange}
                     focused
                     value={
                       (Number(
                         Number(values.length) *
                           Number(conversionData.Type == "L" ? 1 : values.width)
                       ) 
                    * values.nos).toFixed(4)
                     }
                     sx={{
                       gridColumn: "span 2",
                       background: "#FFDAC0",
                       input: { textAlign: "right" },
                     }}
                     inputProps={{ readOnly: true }}
                   />:false}
                  </FormControl>
                  {materialLookup.materialType == "L" ?   <TextField
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
                  />:false}
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
                  {materialLookup.materialType == "L" ?   <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Total"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    focused
                    value={
                      (Number(
                        Number(values.length) *
                          Number(conversionData.Type == "L" ? 1 : values.width)
                      ) 
                   * values.nos).toFixed(4)
                    }
                    sx={{
                      gridColumn: "span 2",
                      background: "#FFDAC0",
                      input: { textAlign: "right" },
                    }}
                    inputProps={{ readOnly: true }}
                  />:false}
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
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        value={ (Number(
                          Number(values.length) *
                            Number(conversionData.Type == "L" ? 1 : values.width)
                        )   * values.nos).toFixed(4)}
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
                            ?  "Square Centimeter"
                            : materialLookup.uomConDesc
                        }
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        value={((Number(
                          Number(values.length) *
                            Number(conversionData.Type == "L" ? 1 : values.width)
                        )  * values.nos).toFixed(4) * Number(conversionData.Conversionrate)).toFixed(4)}
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
                    loading={isLoading}>
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
                    <Button onClick={()=>  bomDesignFn(values, resetForm, true)} color="error" variant="contained">
                      Delete
                    </Button>
                  ) : (
                    <Button color="error" variant="contained" disabled={true}>
                      Delete
                    </Button>
                  )}
                  <Button type="reset" color="warning" variant="contained"  onClick={() => {
                navigate(
                  `/Apps/Secondarylistview/${accessID}/List of Bom/${headerID}/${params.Number}/${params.Desc}/all-bom/${params.bomproductid}`
                );
              }}>
                    Cancel
                  </Button>
                  <Button
                    sx={{ ml: "60px" }}
                    variant="contained"
                    onClick={() => {
                      setShow(1);
                      dispatch(
                        fetchExplorelitview("TR016", "BOM",`parentID='${bomParentID}'` , "")
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
    </React.Fragment>
  );
};

export default Editbom;
