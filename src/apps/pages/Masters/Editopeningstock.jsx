import React, { useState, useEffect, useRef } from "react";
import {
  Breadcrumbs,
  TextField,
  Box,
  Typography,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  useTheme,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Formik, Field, Form, useField, useFormikContext } from "formik";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { tokens } from "../../../Theme";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import Listviewpopup from "../Lookup";
import Popup from "../popup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  fetchApidata,
  getFetchData,
  postApidata,
} from "../../../store/reducers/Formapireducer";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
async function fetchNewTextC(a, b) {
  await new Promise((r) => setTimeout(r, 200));
  return ` ${Number(a || 0) + Number(b || 0)}`;
}

const MyField = (props) => {
  const {
    values: { Hidesqft, Sidesqft },
    setFieldValue,
    touched,
  } = useFormikContext();
  const [field, meta] = useField(props);

  React.useEffect(() => {
    let isCurrent = true;
    // your business logic around when to fetch goes here.
    // if (
    //   (touched.Hidesqft || touched.Sidesqft)
    // ) {
    fetchNewTextC(Hidesqft, Sidesqft).then((Totalqty) => {
      if (!!isCurrent) {
        // prevent setting old values
        setFieldValue(props.name, Totalqty.trim());
      }
    });
    // }
    return () => {
      isCurrent = false;
    };
  }, [Hidesqft, Sidesqft, setFieldValue, props.name]);

  return (
    <React.Fragment>
      <TextField {...props} {...field} />
    </React.Fragment>
  );
};

const Editopeningstock = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const params = useParams();
  const YearFlag = sessionStorage.getItem("YearFlag");
  const stockflag = sessionStorage.getItem("stockflag");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  var recID = params.id;
  // var mode = params.Mode;
  var accessID = params.accessID;
  var parentID = params.filtertype;
  var yearId = params.yearid;
  const Data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.loading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  var loginrecid = sessionStorage.getItem("loginRecid");
  var yearData = sessionStorage.getItem("year");
  const location = useLocation();
  var filter =
    parentID == "M"
      ? `'${yearId}' AND Type NOT IN('L','PO')`
      : `'${yearId}' AND Type = '${parentID}'`;
  const { toggleSidebar, broken, rtl } = useProSidebar();
  useEffect(() => {
    // dispatch(fetchApidata(accessID, "get", recID));

    dispatch(fetchExplorelitview("TR065", "Openingstock", filter, ""));
    selectcelldata("", "A", "");
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  const [ini, setIni] = useState(true);
  const [loading, setLoading] = useState(false);
  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );
  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );

  /*****************************Search********************** */
  var VISIBLE_FIELDS = [];

  if (parentID == "L") {
    VISIBLE_FIELDS = [
      "SLNO",
      "LeatherCode",
      "LeatherDescription",
      "LeatherColourDescription",
      "action",
    ];
  }

  if (parentID == "P") {
    VISIBLE_FIELDS = [
      "SLNO",
      "Reference",
      "StockDate",
      "ProductCode",
      "ProductDescription",
      "ProductQuantity",
      "action",
    ];
  }
  if (parentID == "M") {
    VISIBLE_FIELDS = [
      "SLNO",
      "MaterialCode",
      "MaterialDescription",
      "MaterialColourDescription",
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
  const [pageSize, setPageSize] = React.useState(10);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [boMode, setBomode] = useState("A");
  //
  const [openext, setopenext] = useState(true);
  const [close, setclose] = useState(false);
  const [showgrid, setshowgrid] = useState(false);
  /********************************* Look up***************************/
  const [isPopupData, setisPopupdata] = React.useState(false);
  const [openstockdata, setOpenstockdata] = useState({
    RecordID: "",
    Reference: "",
    StockDate: "",
    Hideqty: "",
    Hidesqft: "",
    Sideqty: "",
    Sidesqft: "",
    SortOrder: "",
    MaterialQty: "",
    Totalqty: "",
    ProductQty: "",
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
  /****************** Items values assign a state variale******************** */
  const selectcelldata = (data, bMode, field) => {
    // console.log("selectdata" + JSON.stringify(data));

    setBomode(bMode);

    if (bMode == "A") {
      setOpenstockdata({
        RecordID: "",
        Hideqty: "",
        Hidesqft: "",
        Sideqty: "",
        Sidesqft: "",
        MaterialQty: "",
        ProductQty: "",
        Reference: "",
        StockDate: "",
        Totalqty: "",
        SortOrder: "",
      });
      setselectCPLookupData({
        CPlookupRecordid: "",
        CPlookupCode: "",
        CPlookupDesc: "",
        PIUomRecordID: "",
        PUomDescription: "",
        ModelNo: "",
        Height: "",
        Length: "",
        Width: "",
        Breadth: "",
      });
      //  MATERIAL LOOKUP
      setselectDMLookupData({
        DMlookupRecordid: "",
        DMlookupCode: "",
        DMlookupDesc: "",
        Width: "",
        Length: "",
        SubstanceRecordID: "",
        SubstanceCode: "",
        SubstanceDescription: "",
        GradeRecordID: "",
        GradeCode: "",
        GradeDescription: "",
        ColourRecordID: "",
        ColourCode: "",
        ColourDescription: "",
        IUomRecordID: "",
        UomDescription: "",
        Type: "",
      });
      //  LEATHER
      setselectDLLookupData({
        DLlookupRecordid: "",
        DLlookupCode: "",
        DLlookupDesc: "",
        IUomRecordID: "",
        UomDescription: "",
        ColourCode: "",
        ColourDescription: "",
        ColourRecordID: "",
        GradeRecordID: "",
        GradeCode: "",
        GradeDescription: "",
        SubstanceRecordID: "",
        SubstanceCode: "",
        SubstanceDescription: "",
        Length: "",
        Width: "",
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
    } else {
      if (field == "action") {
        // if (data.Disable == "Y") {
        //   setchkbox(true);
        // } else {
        //   setchkbox(false);
        // }

        setOpenstockdata({
          RecordID: data.RecordID,
          Hideqty: data.Hideqty,
          Hidesqft: data.Hidesqft,
          Sideqty: data.Sideqty,
          Sidesqft: data.Sidesqft,
          MaterialQty: data.MaterialQuantity,
          ProductQty: data.ProductQuantity,
          Reference: data.Reference,
          StockDate: data.StockDate,
          SortOrder: data.SortOrder,
          Totalqty: data.Totalsqft,
        });

        // product
        setselectCPLookupData({
          CPlookupCode: data.ProductCode,
          CPlookupDesc: data.ProductDescription,
          CPlookupRecordid: data.ProductRecordID,
          PIUomRecordID: data.PIUomRecordID,
          PUomDescription: data.PUomDescription,
          ModelNo: data.ModelNo,
          Height: data.ProductHeight,
          Length: data.ProductLength,
          Width: data.ProductWidth,
          Breadth: data.ProductBreadth,
        });
        // material

        setselectDMLookupData({
          DMlookupCode: data.MaterialCode,
          DMlookupDesc: data.MaterialDescription,
          DMlookupRecordid: data.MaterialRecordID,
          Width: data.MaterialWidth,
          Length: data.MaterialLength,
          ColourRecordID: data.MaterialColourRecordID,
          ColourCode: data.MaterialColourCode,
          ColourDescription: data.MaterialColourDescription,
          IUomRecordID: data.MUomRecordID,
          UomDescription: data.MUomDescription,
          Type: data.Type,
        });

        // leather
        setselectDLLookupData({
          DLlookupCode: data.LeatherCode,
          DLlookupDesc: data.LeatherDescription,
          DLlookupRecordid: data.LeatherRecordID,
          IUomRecordID: data.LUomRecordID,
          UomDescription: data.LUomDescription,
          ColourCode: data.LeatherColourCode,
          ColourDescription: data.LeatherColourDescription,
          ColourRecordID: data.LeatherColourRecordID,

          Length: data.LeatherLength,
          Width: data.LeatherWidth,
        });
        setselectgrdLookupData({
          GRDlookupCode: data.GradeCode,
          GRDlookupDesc: data.GradeDesc,
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
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  //*******Assign Items values from Database in  Yup initial value******* */
  const openstockInitialvalues = {
    Hideqty: openstockdata.Hideqty,
    Hidesqft: openstockdata.Hidesqft,
    Sideqty: openstockdata.Sideqty,
    Sidesqft: openstockdata.Sidesqft,
    MaterialQty: openstockdata.MaterialQty,
    ProductQty: openstockdata.ProductQty,
    Reference: openstockdata.Reference,
    StockDate: boMode == "A" ? today : openstockdata.StockDate,
    Totalqty: openstockdata.Totalqty,
    SortOrder: openstockdata.SortOrder,
  };

  /******************************* Clear fn************** */
  const clrForm = () => {
    setOpenstockdata({
      RecordID: "",
      Hideqty: "",
      Hidesqft: "",
      Sideqty: "",
      Sidesqft: "",
      MaterialQty: "",
      ProductQty: "",
      Reference: "",
      StockDate: "",
      SortOrder: "",
    });
    setselectCPLookupData({
      CPlookupRecordid: "",
      CPlookupCode: "",
      CPlookupDesc: "",
      PIUomRecordID: "",
      PUomDescription: "",
      ModelNo: "",
      Height: "",
      Length: "",
      Width: "",
      Breadth: "",
    });
    //  MATERIAL LOOKUP
    setselectDMLookupData({
      DMlookupRecordid: "",
      DMlookupCode: "",
      DMlookupDesc: "",
      Width: "",
      Length: "",
      SubstanceRecordID: "",
      SubstanceCode: "",
      SubstanceDescription: "",
      GradeRecordID: "",
      GradeCode: "",
      GradeDescription: "",
      ColourRecordID: "",
      ColourCode: "",
      ColourDescription: "",
      IUomRecordID: "",
      UomDescription: "",
    });
    //  LEATHER
    setselectDLLookupData({
      DLlookupRecordid: "",
      DLlookupCode: "",
      DLlookupDesc: "",
      IUomRecordID: "",
      UomDescription: "",
      ColourCode: "",
      ColourDescription: "",
      ColourRecordID: "",
      GradeRecordID: "",
      GradeCode: "",
      GradeDescription: "",
      SubstanceRecordID: "",
      SubstanceCode: "",
      SubstanceDescription: "",
      Length: "",
      Width: "",
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
    selectcelldata("", "A", "");
  };

  const [openCPpopup, setOpenCPpopup] = useState(false);
  const [openDMpopup, setOpenDMpopup] = useState(false);
  const [openDLpopup, setOpenDLpopup] = useState(false);
  const [openGRDPopup, setOpenGRDPopup] = useState(false);
  const [openSUBPopup, setOpenSUBPopup] = useState(false);
  // ************Lookup Function***************
  function handleShow(type) {
    if (type == "CP") {
      setOpenCPpopup(true);
    }
    if (type == "DM") {
      setOpenDMpopup(true);
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
  }

  function extenableFunct() {
    setshowgrid(true);
    setclose(true);
    setopenext(false);
  }
  function extenablecloseFunct() {
    setshowgrid(false);
    setclose(false);
    setopenext(true);
  }
  //  PRODUCT LOOKUP
  const [selectCPLookupData, setselectCPLookupData] = React.useState({
    CPlookupRecordid: "",
    CPlookupCode: "",
    CPlookupDesc: "",
    PIUomRecordID: "",
    PUomDescription: "",
    ModelNo: "",
    Height: "",
    Length: "",
    Width: "",
    Breadth: "",
  });
  //  MATERIAL LOOKUP
  const [selectDMLookupData, setselectDMLookupData] = React.useState({
    DMlookupRecordid: "",
    DMlookupCode: "",
    DMlookupDesc: "",
    Width: "",
    Length: "",
    SubstanceRecordID: "",
    SubstanceCode: "",
    SubstanceDescription: "",
    GradeRecordID: "",
    GradeCode: "",
    GradeDescription: "",
    ColourRecordID: "",
    ColourCode: "",
    ColourDescription: "",
    IUomRecordID: "",
    UomDescription: "",
    Type: "",
  });
  //  LEATHER
  const [selectDLLookupData, setselectDLLookupData] = React.useState({
    DLlookupRecordid: "",
    DLlookupCode: "",
    DLlookupDesc: "",
    IUomRecordID: "",
    UomDescription: "",
    ColourCode: "",
    ColourDescription: "",
    ColourRecordID: "",
    GradeRecordID: "",
    GradeCode: "",
    GradeDescription: "",
    SubstanceRecordID: "",
    SubstanceCode: "",
    SubstanceDescription: "",
    Length: "",
    Width: "",
  });

  //************************** Lookup value assign type based Function *****************/
  const childToParent = (childdata, type) => {
    console.log("type---" + type);
    console.log("Data---" + JSON.stringify(childdata));
    setisPopupdata(true);

    if (type == "Product") {
      setisPopupdata(true);
      setselectCPLookupData({
        CPlookupCode: childdata.Code,
        CPlookupRecordid: childdata.RecordID,
        CPlookupDesc: childdata.Name,
        PIUomRecordID: childdata.PIUomRecordID,
        PUomDescription: childdata.PUomDescription,
        ModelNo: childdata.ModelNo,
        Height: childdata.Height,
        Length: childdata.Length,
        Width: childdata.Width,
        Breadth: childdata.Breadth,
      });
      setOpenCPpopup(false);
    }
    if (type == "Material") {
      setisPopupdata(true);
      setselectDMLookupData({
        DMlookupCode: childdata.Code,
        DMlookupRecordid: childdata.RecordID,
        DMlookupDesc: childdata.Name,
        Width: childdata.Width,
        Length: childdata.Length,
        ColourRecordID: childdata.ColourRecordID,
        ColourCode: childdata.ColourCode,
        ColourDescription: childdata.ColourDescription,
        IUomRecordID: childdata.MUomRecordID,
        UomDescription: childdata.MUomDescription,
        Type: childdata.Type,
      });
      setOpenDMpopup(false);
    }
    if (type == "Leather") {
      setisPopupdata(true);
      setselectDLLookupData({
        DLlookupCode: childdata.Code,
        DLlookupRecordid: childdata.RecordID,
        DLlookupDesc: childdata.Name,
        IUomRecordID: childdata.MUomRecordID,
        UomDescription: childdata.MUomDescription,
        ColourCode: childdata.ColourCode,
        ColourDescription: childdata.ColourDescription,
        ColourRecordID: childdata.ColourRecordID,
        Length: childdata.Length,
        Width: childdata.Width,
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
  };

  var LookupFilter = "";

  if (parentID == "L") {
    LookupFilter = `Type ='L'`;
  }
  if (parentID == "M") {
    LookupFilter = `Type IN  ('P', 'M', 'R')`;
  }

  var abbrevation = "";
  if (parentID == "L") {
    abbrevation = "Leather";
  }
  if (parentID == "M") {
    abbrevation = "Material ";
  }
  if (parentID == "P") {
    abbrevation = "Product ";
  }

  // **********Save Function*****************
  const fnSave = async (values) => {
    if (stockflag == "Y") {
      toast.error("Your data Already Processed edit not Applicable");
      return;
    }
    setLoading(true);
    setIni(false);
    if (parentID == "L")
      if (values.Totalqty == 0) {
        toast.error("Total Quantity should be Greather than Zero");
        setLoading(false);
        setIni(true);
        return;
      }
    // if (values.Reference == "") {
    //   toast.error("Please Enter Reference");
    //   setLoading(false);
    //   setIni(true);
    //   return;
    // }
    if (parentID == "L") {
      if (selectDLLookupData.DLlookupRecordid == "") {
        toast.error("Please Enter Leather ID");
        setLoading(false);
        setIni(true);
        return;
      }
    }
    if (parentID == "M") {
      if (values.MaterialQty == "") {
        toast.error(" Quantity should be Greather than Zero");
        setLoading(false);
        setIni(true);
        return;
      }
    }
    if (parentID == "P") {
      if (values.ProductQty == "") {
        toast.error(" Quantity should be Greather than Zero");
        setLoading(false);
        setIni(true);
        return;
      }
    }
    if (parentID == "M") {
      if (selectDMLookupData.DMlookupRecordid == "") {
        toast.error("Please Enter Material ID");
        setLoading(false);
        setIni(true);
        return;
      }
    }
    if (parentID == "P") {
      if (selectCPLookupData.CPlookupRecordid == "") {
        toast.error("Please Enter Product ID");
        setLoading(false);
        setIni(true);
        return;
      }
    }

    var saveData = {
      RecordID: openstockdata.RecordID,
      Type:
        parentID == "M"
          ? selectDMLookupData.Type
          : parentID == "P"
          ? "PO"
          : parentID,
      StockDate: values.StockDate,
      Reference: values.Reference,
      SortOrder: values.SortOrder,
      ProductRecordID: selectCPLookupData.CPlookupRecordid,
      MaterialRecordID: selectDMLookupData.DMlookupRecordid,
      ProductQuantity: values.ProductQty,
      LeatherMaterialRecordID: selectDLLookupData.DLlookupRecordid,
      Hideqty: values.Hideqty,
      Hidesqft: values.Hidesqft,
      Sideqty: values.Sideqty,
      Sidesqft: values.Sidesqft,
      YearRecordID: recID,
      SortOrder: 0,
      LastModifiedby: loginrecid,
      Totalsqft: values.Totalqty,
      MaterialQuantity: values.MaterialQty,
      GradeRecordID: selectgrdLookupData.GRDlookupRecordid,
      SubstanceRecordID: selectsubLookupData.SUBlookupRecordid,
    };

    var type = "";

    if (boMode == "A") {
      type = "insert";
    } else {
      type = "update";
    }

    const data = await dispatch(postApidata("TR065", type, saveData));

    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      setIni(true);
      setLoading(false);
      dispatch(fetchExplorelitview("TR065", "Openingstock", filter, ""));

      setOpenstockdata({
        RecordID: "",
        Hideqty: "",
        Hidesqft: "",
        Sideqty: "",
        Sidesqft: "",
        MaterialQty: "",
        ProductQty: "",
        Totalqty: "",
        SortOrder: "",
      });
      // product
      setselectCPLookupData({
        CPlookupRecordid: "",
        CPlookupCode: "",
        CPlookupDesc: "",
        PIUomRecordID: "",
        PUomDescription: "",
        ModelNo: "",
        Height: "",
        Length: "",
        Width: "",
        Breadth: "",
      });
      //  MATERIAL LOOKUP
      setselectDMLookupData({
        DMlookupRecordid: "",
        DMlookupCode: "",
        DMlookupDesc: "",
        Width: "",
        Length: "",
        SubstanceRecordID: "",
        SubstanceCode: "",
        SubstanceDescription: "",
        GradeRecordID: "",
        GradeCode: "",
        GradeDescription: "",
        ColourRecordID: "",
        ColourCode: "",
        ColourDescription: "",
        IUomRecordID: "",
        UomDescription: "",
        Type: "",
      });
      //  LEATHER
      setselectDLLookupData({
        DLlookupRecordid: "",
        DLlookupCode: "",
        DLlookupDesc: "",
        IUomRecordID: "",
        UomDescription: "",
        ColourCode: "",
        ColourDescription: "",
        ColourRecordID: "",
        GradeRecordID: "",
        GradeCode: "",
        GradeDescription: "",
        SubstanceRecordID: "",
        SubstanceCode: "",
        SubstanceDescription: "",
        Length: "",
        Width: "",
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
      // selectcelldata("", "A", "");
    } else {
      toast.error(data.payload.Msg);
      setLoading(false);
    }
  };

  var openstack = "Opening Stock ";
  const [totalQty, setTotalqty] = useState();

  const fnCalc = (values) => {
    values.Totalqty = Number(values.Hidesqft) + Number(values.Sidesqft);
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
          navigate(`/Apps/Secondarylistview/TR063/Financial Year/${parentID}`);
        }
      } else {
        return;
      }
    });
  };
  return (
    <React.Fragment>
      {getLoading ? <LinearProgress /> : false}
      <Box sx={{ height: "100vh", overflow: "auto" }}>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box display="flex" borderRadius="3px" alignItems="center">
            {broken && !rtl && (
              <IconButton onClick={() => toggleSidebar()}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
            <Box display="flex" borderRadius="3px" alignItems="center"></Box>
            <Breadcrumbs
              maxItems={3}
              aria-label="breadcrumb"
              separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
            >
              <Typography
                variant="h3"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(`/Apps/TR064/Opening Stock`);
                }}
              >
                Opening Stock
              </Typography>
              <Typography
                variant="h3"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/TR063/Financial Year/${parentID}`
                  );
                }}
              >
                {abbrevation}
              </Typography>
              <Typography
                variant="h3"
                sx={{ cursor: "default" }}
                color="#0000D1"
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/TR063/Financial Year/${parentID}`
                  );
                }}
              >
                {yearId}
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box display="flex">
            <IconButton onClick={() => fnLogOut("Close")} color="error">
              <ResetTvIcon />
            </IconButton>
            <IconButton onClick={() => fnLogOut("Logout")}>
              <LogoutOutlinedIcon color="error" />
            </IconButton>
          </Box>
        </Box>

        {!getLoading ? (
          <Box m="20px">
            <Formik
              initialValues={openstockInitialvalues}
              onSubmit={(values, setSubmitting) => {
                setTimeout(() => {
                  fnSave(values);
                }, 100);
              }}
              innerRef={ref}
              enableReinitialize={ini}
              // validationSchema={basicSchema}
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
                    {/* HEADER */}
                    <FormControl
                      fullWidth
                      sx={{ gridColumn: "span 2", gap: "40px" }}
                    >
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Bin"
                        value={values.Reference}
                        id="Reference"
                        name="Reference"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        focused
                        error={!!touched.Reference && !!errors.Reference}
                        helperText={touched.Reference && errors.Reference}
                        onInvalid={(e) => {
                          e.target.setCustomValidity("Please Enter Reference");
                        }}
                        onInput={(e) => {
                          e.target.setCustomValidity("");
                        }}
                        inputProps={{ maxLength: 15 }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="Date"
                        label="Date"
                        value={values.StockDate}
                        id="StockDate"
                        name="StockDate"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputFormat="YYYY-MM-DD"
                        focused
                        error={!!touched.StockDate && !!errors.StockDate}
                        helperText={touched.StockDate && errors.StockDate}
                        sx={{ background: "#ffe5f1" }}
                      />
                      <FormControl>
                        <Box m="5px">
                          <Box
                            m="5px 0 0 0"
                            height="60vh"
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
                                selectcelldata(
                                  currentRow,
                                  "E",
                                  currentcellField
                                );

                                console.log(params.row);
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
                    </FormControl>
                    {/* PRODUCT */}
                    {parentID == "P" ? (
                      <FormControl
                        fullWidth
                        sx={{ gridColumn: "span 2", gap: "40px" }}
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
                              marginTop: "240px",
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

                        {/* <TextField
                        id="outlined-basic"
                        label="Inventory UOM"
                        variant="filled"
                        value={selectCPLookupData.PIUomRecordID}
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
                            label="Inventory UOM"
                            variant="filled"
                            value={selectCPLookupData.PUomDescription}
                            fullWidth
                            focused
                            inputProps={{ tabIndex: "-1" }}
                          />
                          <IconButton
                            sx={{ height: 40, width: 40 }}
                            onClick={() => handleShow("UC")}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>
                        </FormControl>
                      </FormControl> */}

                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Quantity"
                          value={values.ProductQty}
                          id="ProductQty"
                          name="ProductQty"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          focused
                          onWheel={(e) => e.target.blur()} 
                          error={!!touched.ProductQty && !!errors.ProductQty}
                          helperText={touched.ProductQty && errors.ProductQty}
                          sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                          onInput={(e) => {
                            e.target.value = Math.max(
                              0,
                              parseInt(e.target.value)
                            )
                              .toString()
                              .slice(0, 10);
                          }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                        />
                        {showgrid == true ? (
                          <>
                            <TextField
                              fullWidth
                              variant="filled"
                              type="number"
                              label="Model NO"
                              value={selectCPLookupData.ModelNo}
                              id="ModelNO"
                              name="ModelNO"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              sx={{
                                gridColumn: "span 2",
                                background: "#fff6c3",
                              }}
                              focused
                              error={!!touched.ModelNO && !!errors.ModelNO}
                              helperText={touched.ModelNO && errors.ModelNO}
                              onInput={(e) => {
                                e.target.value = Math.max(
                                  0,
                                  parseInt(e.target.value)
                                )
                                  .toString()
                                  .slice(0, 10);
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
                              label="Height (in cm)"
                              value={selectCPLookupData.Height}
                              id="height"
                              name="height"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              sx={{
                                gridColumn: "span 2",
                                background: "#fff6c3",
                              }}
                              focused
                              error={!!touched.height && !!errors.height}
                              helperText={touched.height && errors.height}
                              onInput={(e) => {
                                e.target.value = Math.max(
                                  0,
                                  parseInt(e.target.value)
                                )
                                  .toString()
                                  .slice(0, 10);
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
                              label="Length (in cm)"
                              value={selectCPLookupData.Length}
                              id="Length"
                              name="Length"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              sx={{
                                gridColumn: "span 2",
                                background: "#fff6c3",
                              }}
                              focused
                              error={!!touched.Length && !!errors.Length}
                              helperText={touched.Length && errors.Length}
                              onInput={(e) => {
                                e.target.value = Math.max(
                                  0,
                                  parseInt(e.target.value)
                                )
                                  .toString()
                                  .slice(0, 10);
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
                              label="Breadth (in cm)"
                              value={selectCPLookupData.Breadth}
                              id="Breadth"
                              name="Breadth"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              sx={{
                                gridColumn: "span 2",
                                background: "#fff6c3",
                              }}
                              focused
                              error={!!touched.Breadth && !!errors.Breadth}
                              helperText={touched.Breadth && errors.Breadth}
                              onInput={(e) => {
                                e.target.value = Math.max(
                                  0,
                                  parseInt(e.target.value)
                                )
                                  .toString()
                                  .slice(0, 10);
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
                              label="Width (in cm)"
                              value={selectCPLookupData.Width}
                              id="Width"
                              name="Width"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              sx={{
                                gridColumn: "span 2",
                                background: "#fff6c3",
                              }}
                              focused
                              error={!!touched.Width && !!errors.Width}
                              helperText={touched.Width && errors.Width}
                              onInput={(e) => {
                                e.target.value = Math.max(
                                  0,
                                  parseInt(e.target.value)
                                )
                                  .toString()
                                  .slice(0, 10);
                              }}
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: "right" },
                                },
                              }}
                            />
                          </>
                        ) : (
                          ""
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
                            {openext == true ? (
                              <IconButton
                                sx={{ height: 40, width: 40 }}
                                onClick={() => extenableFunct()}
                              >
                                <AddCircleOutlineRoundedIcon />
                              </IconButton>
                            ) : (
                              false
                            )}
                            {close == true ? (
                              <IconButton
                                sx={{ height: 40, width: 40 }}
                                onClick={() => extenablecloseFunct()}
                              >
                                <HighlightOffRoundedIcon />
                              </IconButton>
                            ) : (
                              false
                            )}
                          </FormControl>
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
                                //  onClick={() => {
                                // fnSave(values);
                                // }}
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
                                  `/Apps/Secondarylistview/TR063/Financial Year/${parentID}`
                                );
                              }}
                            >
                              Cancel
                            </Button>
                          </Box>
                        </FormControl>
                      </FormControl>
                    ) : (
                      false
                    )}
                    {/* LEATHER */}
                    {parentID == "L" ? (
                      <FormControl
                        fullWidth
                        sx={{ gridColumn: "span 2", gap: "40px" }}
                      >
                        <TextField
                          id="outlined-basic"
                          label="ID"
                          variant="filled"
                          value={selectDLLookupData.DLlookupRecordid}
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
                              marginTop: "240px",
                            }}
                          >
                            <TextField
                              id="outlined-basic"
                              label="Leather"
                              variant="filled"
                              value={selectDLLookupData.DLlookupCode}
                              focused
                              inputProps={{ tabIndex: "-1" }}
                              required
                            />
                            <IconButton
                              sx={{ height: 40, width: 40 }}
                              onClick={() => handleShow("DL")}
                            >
                              <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                            </IconButton>
                            {/* <MoreHorizIcon onClick={()=>handleShow('MT')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

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

                        {/* grade */}
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
                            gridColumn: "span 2",
                            display: "flex",
                          }}
                        >
                          <FormLabel></FormLabel>
                          <FormControl
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <TextField
                              required
                              id="outlined-basic"
                              label="Grade"
                              variant="filled"
                              value={selectgrdLookupData.GRDlookupCode}
                              focused
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
                              focused
                              inputProps={{ tabIndex: "-1" }}
                            />
                          </FormControl>
                        </FormControl>

                        {/* substance */}
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
                              required
                              id="outlined-basic"
                              label="Substance"
                              variant="filled"
                              value={selectsubLookupData.SUBlookupCode}
                              focused
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
                              focused
                              inputProps={{ tabIndex: "-1" }}
                            />
                          </FormControl>
                        </FormControl>

                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Hide Quantity"
                          value={values.Hideqty}
                          id="Hideqty"
                          name="Hideqty"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                          focused
                          onWheel={(e) => e.target.blur()} 
                          error={!!touched.Hideqty && !!errors.Hideqty}
                          helperText={touched.Hideqty && errors.Hideqty}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                              maxLength: 10,
                            },
                          }}
                        />

                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Hide Sqft"
                          value={values.Hidesqft}
                          id="Hidesqft"
                          name="Hidesqft"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                          focused
                          onWheel={(e) => e.target.blur()} 
                          error={!!touched.Hidesqft && !!errors.Hidesqft}
                          helperText={touched.Hidesqft && errors.Hidesqft}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                              maxLength: 10,
                            },
                          }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Side Quantity"
                          value={values.Sideqty}
                          id="Sideqty"
                          name="Sideqty"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                          focused
                          onWheel={(e) => e.target.blur()} 
                          error={!!touched.Sideqty && !!errors.Sideqty}
                          helperText={touched.Sideqty && errors.Sideqty}
                          inputProps={{ maxLength: 10 }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                              maxLength: 10,
                            },
                          }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Side Sqft"
                          value={values.Sidesqft}
                          id="Sidesqft"
                          name="Sidesqft"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                          focused
                          onWheel={(e) => e.target.blur()} 
                          error={!!touched.Sidesqft && !!errors.Sidesqft}
                          helperText={touched.Sidesqft && errors.Sidesqft}
                          inputProps={{ maxLength: 10 }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                              maxLength: 10,
                            },
                          }}
                        />

                        <MyField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Total Quantity"
                          value={values.Totalqty}
                          id="Totalqty"
                          name="Totalqty"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                          focused
                          onWheel={(e) => e.target.blur()} 
                          required
                          inputProps={{ maxLength: 10 }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                              maxLength: 10,
                            },
                          }}
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Enter The Total Quantity"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                        <FormControl
                          sx={{
                            gridColumn: "span 2",
                            display: "flex",
                          }}
                        >
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
                                //   onClick={() => {
                                //    fnSave(values);
                                //  }}
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
                                  `/Apps/Secondarylistview/TR063/Financial Year/${parentID}`
                                );
                              }}
                            >
                              Cancel
                            </Button>
                          </Box>
                        </FormControl>
                      </FormControl>
                    ) : (
                      false
                    )}
                    {/* MATERIAL */}
                    {parentID == "M" ? (
                      <FormControl
                        fullWidth
                        sx={{ gridColumn: "span 2", gap: "40px" }}
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
                            gridColumn: "span 2",
                            display: "flex",
                          }}
                        >
                          <FormControl
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              marginTop: "240px",
                            }}
                          >
                            <TextField
                              id="psCode"
                              label="Material ID"
                              variant="filled"
                              value={selectDMLookupData.DMlookupCode}
                              focused
                              inputProps={{ tabIndex: "-1" }}
                              required
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
                          type="number"
                          label="Quantity"
                          value={values.MaterialQty}
                          id="MaterialQty"
                          name="MaterialQty"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                          focused
                          required
                          onWheel={(e) => e.target.blur()} 
                          error={!!touched.MaterialQty && !!errors.MaterialQty}
                          helperText={touched.MaterialQty && errors.MaterialQty}
                          inputProps={{ maxLength: 10 }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                              maxLength: 10,
                            },
                          }}
                          onInput={(e) => {
                            e.target.value = Math.max(
                              0,
                              parseInt(e.target.value)
                            )
                              .toString()
                              .slice(0, 10);
                          }}
                        />

                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Length (in cm)"
                          value={selectDMLookupData.Length}
                          id="Length"
                          name="Length"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{
                            gridColumn: "span 2",
                            background: "#fff6c3",
                          }}
                          focused
                          error={!!touched.Length && !!errors.Length}
                          helperText={touched.Length && errors.Length}
                          inputProps={{ maxLength: 10 }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                              maxLength: 10,
                              readOnly: true,
                            },
                          }}
                          onInput={(e) => {
                            e.target.value = Math.max(
                              0,
                              parseInt(e.target.value)
                            )
                              .toString()
                              .slice(0, 10);
                          }}
                        />

                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Width (in cm)"
                          value={selectDMLookupData.Width}
                          id="Width"
                          name="Width"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{
                            gridColumn: "span 2",
                            background: "#fff6c3",
                          }}
                          focused
                          error={!!touched.Width && !!errors.Width}
                          helperText={touched.Width && errors.Width}
                          inputProps={{ maxLength: 10 }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                              maxLength: 10,
                              readOnly: true,
                            },
                          }}
                          onInput={(e) => {
                            e.target.value = Math.max(
                              0,
                              parseInt(e.target.value)
                            )
                              .toString()
                              .slice(0, 10);
                          }}
                        />

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
                              // onClick={() => {
                              //   fnSave(values);
                              // }}
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
                              clrForm();
                            }}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </FormControl>
                    ) : (
                      false
                    )}
                  </Box>

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
                  <Popup
                    title="Material"
                    openPopup={openDMpopup}
                    setOpenPopup={setOpenDMpopup}
                  >
                    <Listviewpopup
                      accessID="2000"
                      screenName="Material"
                      childToParent={childToParent}
                      filterName=""
                      filterValue={LookupFilter}
                    />
                  </Popup>
                  <Popup
                    title="Leather"
                    openPopup={openDLpopup}
                    setOpenPopup={setOpenDLpopup}
                  >
                    <Listviewpopup
                      accessID="2000"
                      screenName="Leather"
                      childToParent={childToParent}
                      filterName=""
                      filterValue={LookupFilter}
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

export default Editopeningstock;
