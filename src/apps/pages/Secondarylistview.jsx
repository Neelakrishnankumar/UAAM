import {
  Box,
  IconButton,
  useTheme,
  Typography,
  Breadcrumbs,
  Tooltip,
  Chip,
} from "@mui/material";
import OpenInBrowserOutlinedIcon from "@mui/icons-material/OpenInBrowserOutlined";
import EmailIcon from "@mui/icons-material/Email";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { tokens, ColorModeContext } from "../../Theme";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {
  fetchListview,
  productionColorlookupOpen,
  productionlookupOpen,
} from "../../store/reducers/Listviewapireducer";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import { useContext } from "react";
import MatxCustomizer from "./Mailpdf";
import Listviewpopup from "./Lookup";
import Popup from "./popup";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import axios from "axios";
import toast from "react-hot-toast";
import store from "../..";
const ListviewSecondary = () => {
  const colorMode = useContext(ColorModeContext);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  console.log("🚀 ~ ListviewSecondary ~ params:", params);
  const isproductionPopupOpen = useSelector(
    (state) => state.listviewApi.isLookupOpen
  );

  const isproductionColorPopupOpen = useSelector(
    (state) => state.listviewApi.isLookupColorOpen
  );
  // console.log("🚀 file: Secondarylistview.jsx:122 ~ ListviewSecondary ~ isproductionPopupOpen:", isproductionPopupOpen)
  const YearFlag = sessionStorage.getItem("YearFlag");
  const year = sessionStorage.getItem("year");
  var secondaryCurrentPage = parseInt(
    sessionStorage.getItem("secondaryCurrentPage")
  );
  var accessID = params.secondaryAccessID
    ? params.secondaryAccessID
    : params.accessID;
  const [pageSize, setPageSize] = React.useState(10);
  const [collapse, setcollapse] = React.useState(false);
  const [page, setPage] = React.useState(secondaryCurrentPage);
  var parentID = params.filtertype;
  var InvType = params.InvType;
  var Code = params.Code;
  var parentRecID = params.parentRecID;
  var CusID = params.CusID;
  const compID = sessionStorage.getItem("compID");
  var screenName = params.screenName;
  var Type = params.Type;
  var remarkDec = params.remarkDec;
  const { toggleSidebar, broken, rtl } = useProSidebar();

  const rowData = location.state || {};
  var Description = params.Desc;
  var Number = params.Number;
  var filter;
  var invoiceFilter = `${parentID}' AND Invtype='${Number}'AND Finyear='${year}' AND CompID = '${compID}`;
  if (accessID == "TR087") {
    if (parentID == "A") {
      screenName = "Assorted";
    }
  }
  if (accessID == "TR011") {
    filter = invoiceFilter;
  } else if (accessID == "TR074") {
    filter = `${parentID}' AND Finyear='${year}' AND CompID = '${compID}`;
  } else if (accessID == "TR112" || accessID == "TR112") {
    filter = `'${parentID}' AND Finyear='${year}'`;
  } else if (accessID == "TR047") {
    filter = `${parentID}' AND Finyear='${year}`;
  } else if (accessID == "TR115") {
    filter = `RemarkCode='${parentID}' AND Finyear='${year}'`;
  } else if (accessID == "TR052") {
    filter = `${parentID}' AND Finyear='${year}' AND RemarkRecordID='${parentRecID}' AND CompID = '${compID}`;
  } else if (accessID == "TR151") {
    filter = "";
  } else if (accessID == "TR063") {
    filter = `Finyear='${year}'`;
  } else if (accessID == "TR004") {
    filter = `parentID='${parentID}' AND STKType='${Number}'AND (Finyear='${year}' OR Finyear IS NULL)`;
  } else if (accessID == "TR084") {
    filter = `${parentID}`;
  } else if (accessID == "TR079") {
    filter = `${parentID}' AND  Type='${Number}`;
  } else if (accessID == "TR097") {
    filter = `${
      parentID.slice(-1) == "I"
        ? "(DcType IN ('I','B'))"
        : parentID === "PO"
        ? "(DcType IN ('O','P'))"
        : "(DcType IN ('O','B'))"
    }`;
  } else if (accessID == "TR102") {
    filter = `InvType='${parentID}'`;
  } else if (accessID == "TR123") {
    filter = `EmployeeID='${params.filtertype}'`;
  } else if (accessID == "TR124") {
    filter = `EmployeeID='${params.filtertype}'`;
  } else if (
    accessID == "TR104" ||
    accessID == "TR113" ||
    accessID == "TR111"
  ) {
    filter = "";
  } else if (accessID == "TR105") {
    filter = `CustomerID ='${CusID}' AND InvType='${InvType}'`;
  } else if (accessID == "TR118") {
    filter = "";
  } else if (accessID == "TR051") {
    filter = `parentID='${parentID}' AND ${
      params.remarkDec === "L" ? "(Type IN ('L'))" : "(Type NOT IN ('L'))"
    }`;
  } else if (accessID == "TR091") {
    filter = `parentID=${params.bomID}`;
  } else if (accessID == "TR087") {
    filter = `${parentID}' AND CompID = '${compID}`;
  } else {
    filter = parentID;
  }
  const listViewData = useSelector((state) => state.listviewApi.rowData);
  const open = useSelector((state) => state.listviewApi.mailOpen);
  const mailData = useSelector((state) => state.listviewApi.mailData);
  const loading = useSelector((state) => state.listviewApi.loading);
  const listViewcolumn = useSelector((state) => state.listviewApi.columnData);
  //here change
  const alternateMaterialRecordID = useSelector(
    (state) => state.listviewApi.materialRecID
  );

  const productionCardRecid = useSelector(
    (state) => state.listviewApi.productionCardRecid
  );

  const alternateColorsRecordID  = useSelector(
    (state) => state.listviewApi.colorsRecID
  );
  const childToParent = async (childdata, type) => {
    console.log("🚀 ~ childToParent ~ childdata:",    {
      FromMatrialID: childdata.parentID,
      ToMatrialID: childdata.RecordID,
      PrCardHeaderID: productionCardRecid,
    })
    var url = store.getState().globalurl.alterNateMaterial;

    const response = await axios.post(
      url,
      {
        FromMatrialID:childdata.RecordID ,
        ToMatrialID:childdata.parentID ,
        PrCardHeaderID: productionCardRecid,
      },
      {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
        },
      }
    );

    if (response.data.status == 200) {
      toast.success(response.data.message);
      dispatch(productionlookupOpen({ materialRecID: 0, productionCardID: 0 }));
      dispatch(fetchListview(accessID, screenName, filter, "", compID));
    } else {
      toast.error(response.data.message);
      dispatch(productionlookupOpen({ materialRecID: 0, productionCardID: 0 }));
      dispatch(fetchListview(accessID, screenName, filter, "", compID));
    }
    
  };

  function filterByID(item) {
    if (item.hide !== true) {
      return true;
    }
  }

  const columns = React.useMemo(
    () => listViewcolumn.filter(filterByID),
    [listViewcolumn]
  );

  var apprval = "";
  var hderName = `Production Card(${params.Number})`;

  var to;
  var apprval = "";
  var screen;
  var invoice;

  // UOM
  if (accessID == "TR008") {
    screen = "UOM TYPE";
    to = "/Apps/TR049/UOM%20Type";
    if (parentID == "W") {
      apprval = "Weight";
    }
    if (parentID == "L") {
      apprval = "Length";
    }
    if (parentID == "C") {
      apprval = "Currency";
    }
    if (parentID == "V") {
      apprval = "Volume";
    }
    if (parentID == "S") {
      apprval = "Service";
    }
    if (parentID == "A") {
      apprval = "Area";
    }
  }

  if (accessID == "TR073") {
    to = "/Apps/TR043/Invoices";
    screen = "Invoices";
    if (parentID == "L") {
      apprval = "Leather-Export";
    }
    if (parentID == "P") {
      apprval = "Product-Export";
    }
    if (parentID == "M") {
      apprval = "Material";
    }
  }
  if (accessID == "TR084") {
    to = "/Apps/TR043/Invoices";
    screen = "Invoices";
    if (parentID == "LL") {
      apprval = "Leather-Domestic";
    }
    if (parentID == "PL") {
      apprval = "Product-Domestic";
    }
  }
  if (accessID == "TR011") {
    screen = "Invoices";
    if (parentID == "L") {
      apprval = "Leather-Export";
    }
    if (parentID == "P") {
      apprval = "Product-Export";
      to = `/Apps/Secondarylistview/TR073/Proforma%20Invoice/${parentID}`;
    }
    if (parentID == "M") {
      apprval = "Material";
    }
  }
  if (accessID == "TR011") {
    if (Number == "SI") {
      invoice = "Sample Invoice";
    }
    if (Number == "PI") {
      invoice = "Proforma Invoice";
    }
    if (Number == "FI") {
      invoice = "Final Invoice";
    }
  }
  if (accessID == "TR102") {
    if (parentID == "SI") {
      invoice = "Sample Invoice";
    }
    if (parentID == "PI") {
      invoice = "Proforma Invoice";
    }
    if (parentID == "FI") {
      invoice = "Final Invoice";
    }
  }
  if (accessID == "TR105") {
    if (InvType == "SI") {
      invoice = "Sample Invoice";
    }
    if (InvType == "PI") {
      invoice = "Proforma Invoice";
    }
    if (InvType == "FI") {
      invoice = "Final Invoice";
    }
  }
  if (accessID == "TR151" || accessID == "TR052" || accessID == "TR097") {
    screen = "Delivery Challan";
    to = "/Apps/TR059/Delivery%20Type";
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
  }
  var materialsecondType = "";

  if (accessID == "TR004") {
    screen = "Material Type";
    to = "/Apps/TR044/Materials%20Type";
    if (Number == "L") {
      apprval = "Leather";
      materialsecondType = "Material Type";
    }
    if (Number == "M") {
      apprval = "Material";
      materialsecondType = "Material Type";
    }
    if (Number == "S") {
      apprval = "Service";
      materialsecondType = "Material Type";
    }
    if (Number == "R") {
      apprval = "RF Material";
      materialsecondType = "Material Type";
    }
    if (Number == "P") {
      apprval = "Packing Material";
      materialsecondType = "Material Type";
    }
    if (Number == "LS") {
      apprval = "Sales-Leather";
      materialsecondType = "Material Type";
    }
  }

  if (accessID == "TR054") {
    screen = "Remarks";
    to = "/Apps/TR058/Remarks%20Type";
    if (parentID == "I") {
      apprval = "Delivery Chalan In";
    }
    if (parentID == "O") {
      apprval = "Delivery Chalan Out";
    }
    if (parentID == "P") {
      apprval = "Production Remarks";
    }
    if (parentID == "R") {
      apprval = "Returnable";
    }
    if (parentID == "N") {
      apprval = "Non-Returnable";
    }
  }
  var materialType = "";
  if (accessID == "TR003") {
    to = "/Apps/TR044/Materials Type";
    if (parentID == "L") {
      apprval = "Leather Type";
      materialType = "Material Type";
    }
    if (parentID == "M") {
      apprval = "Material";
      materialType = "Material Type";
    }
    if (parentID == "S") {
      apprval = "Service";
      materialType = "Material Type";
    }
    if (parentID == "R") {
      apprval = "RF Material";
      materialType = "Material Type";
    }
    if (parentID == "P") {
      apprval = "Packing Material";
      materialType = "Material Type";
    }
    if (parentID == "LS") {
      apprval = "Sales - Leather";
      materialType = "Material Type";
    }
  }

  if (accessID == "TR074" || accessID == "TR079") {
    to = "/Apps/TR076/Batches";
    if (parentID == "CC") {
      apprval = "Cutting Component";
    }
    if (parentID == "PC") {
      apprval = "Production";
    }
    if (parentID == "PK") {
      apprval = "Packing";
    }
  }
  if (accessID == "TR063") {
    to = "/Apps/TR064/Opening Stock";
    if (parentID == "M") {
      apprval = "Material";
    }
    if (parentID == "L") {
      apprval = "Leather";
    }
    if (parentID == "P") {
      apprval = "Product";
    }
  }
  var abbrevation = "";
  if (accessID == "TR079") {
    to = "/Apps/TR078/Stock Enquiry";
    if (parentID == "PC") {
      abbrevation = "Material ";
    }
    if (parentID == "CC") {
      abbrevation = "Leather";
    }
  }
  if (accessID == "TR080") {
    to = "/Apps/TR078/Stock Enquiry";
    if (Description == "PC") {
      abbrevation = "Material ";
    }
    if (Description == "CC") {
      abbrevation = "Leather";
    }
  }
  if (accessID == "TR032") {
    to = "/Apps/TR083/Colors";
    if (parentID == "M") {
      apprval = "Material";
    }
    if (parentID == "L") {
      apprval = "Leather";
    }
  }
  if (accessID == "TR138") {
    // to = `/Apps/Secondarylistview/TR137/Fixed%20Assets%20Category/${parentID}`;
    if (parentID == "M") {
      apprval = "Machinerys";
    }
    if (parentID == "T") {
      apprval = "Tools AND Vessles";
    }
    if (parentID == "MC") {
      apprval = "Miscellaneous";
    }
    if (parentID == "F") {
      apprval = "Fornutures";
    }
  }
  if (accessID == "TR086") {
    // to = `/Apps/Secondarylistview/TR137/Fixed%20Assets%20Category/${parentID}`;
    if (parentID == "P") {
      apprval = "Product";
    }
    if (parentID == "E") {
      apprval = "Employee";
    }
    if (parentID == "M") {
      apprval = "Material";
    }
    if (parentID == "F") {
      apprval = "Fixed Asset";
    }
  }
  if (accessID == "TR115") {
    to = "/Apps/TR078/Stock%20Enquiry";
    if (parentID == "R0001") {
      apprval = "(Purchase)";
    }
    if (parentID == "R0002") {
      apprval = "(Loan)";
    }
    if (parentID == "NR003") {
      apprval = "(Scrap)";
    }
    if (parentID == "R0003") {
      apprval = "(Job Work)";
    }
    if (parentID == "R0004") {
      apprval = "(Repair)";
    }
    if (parentID == "NR001") {
      apprval = "(Despatches)";
    }
    if (parentID == "NR002") {
      apprval = "(Compliments Or Samples)";
    }
  }
  if (accessID == "TR087") {
    to = "/Apps/TR078/Stock%20Enquiry";
    if (parentID == "N") {
      apprval = "Normal";
    }
    if (parentID == "A") {
      apprval = "Assorted";
    }
  }

  var openstackname = "Opening Stock";

  function CustomToolbar(listViewData) {
    function doesArrayContainNegative() {
      for (var arr of listViewData) {
        if (arr.Shortage < 0) return true;
      }
      return false;
    }
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {accessID == "TR008" || accessID == "TR054" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
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
                  navigate(to);
                }}
              >
                {screen}
              </Typography>

              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                {apprval}
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR052" || accessID == "TR151" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
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
                    `/Apps/Secondarylistview/TR097/Remarks/${params.filtertype}`
                  );
                }}
              >
                Remarks({remarkDec})
              </Typography>
              {/* <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  onClick={() => {navigate(to)}}>{screen}</Typography> */}
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR073" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
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
                  navigate(to);
                }}
              >
                {screen}
              </Typography>

              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(to);
                }}
              >
                {apprval}
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR084" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
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
                  navigate(to);
                }}
              >
                {screen}
              </Typography>

              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(to);
                }}
              >
                {apprval}
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR011" ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                  navigate("/Apps/TR043/Invoices");
                }}
              >
                {screen}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(to);
                }}
              >
                {apprval}
              </Typography>

              {Number !== "IN" && params.filtertype != "L" ? (
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  {invoice}
                </Typography>
              ) : (
                false
              )}
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR137" ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                  navigate("/Apps/TR135/Fixed%20Asset%20Type");
                }}
              >
                Fixed Asset Type
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(to);
                }}
              >
                Fixed Asset Category
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR141" ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                  navigate("/Apps/TR140/Customer-Product");
                }}
              >
                {`Customer-Product(${params.Number})`}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                List of BOM
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR091" ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                  navigate("/Apps/TR140/Customer-Product");
                }}
              >
                {`Customer-Product(${params.productDescription})`}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(to);
                }}
              >
                {`BOM(${params.bomVersion})`}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(to);
                }}
              >
                List of costing
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR138" ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                  navigate("/Apps/TR135/Fixed%20Asset%20Type");
                }}
              >
                Fixed Asset Type
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/TR137/Fixed%20Assets%20Category/${params.Number}`
                  );
                }}
              >
                Fixed Asset Category
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(to);
                }}
              >
                Fixed Asset
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR086" ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                  navigate("/Apps/TR136/Finance%20Category");
                }}
              >
                Finance Category
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(to);
                }}
              >
                Finance Entry
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR102" ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                  navigate("/Apps/TR101/Order%20Enquiry");
                }}
              >
                Order Enquiry
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                {invoice}
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR103" ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                  navigate("/Apps/TR101/Order%20Enquiry");
                }}
              >
                Order Enquiry
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                Customer Group
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR104" ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                  navigate("/Apps/TR101/Order%20Enquiry");
                }}
              >
                Order Enquiry
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate("/Apps/Secondarylistview/TR103/Customergroup/5");
                }}
              >
                {parentID}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                Invoice Type
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR108" ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                  navigate("/Apps/TR047/Production%20Card");
                }}
              >
                {hderName}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                Production Card Item
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                {screenName}
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR105" ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                  navigate("/Apps/TR101/Order%20Enquiry");
                }}
              >
                Order Tracking
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate("/Apps/Secondarylistview/TR103/Customergroup/5");
                }}
              >
                Customer Group
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/TR104/Invoicegroup/007/${CusID}`
                  );
                }}
              >
                Invoice Type
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                {invoice}
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR004" ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                  navigate(to);
                }}
              >
                {materialsecondType}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/TR003/Material%20Category/${Number}`
                  );
                }}
              >
                {apprval}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/TR003/Material%20Category/${Number}`
                  );
                }}
              >
                {Description}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >{`List of ${apprval}`}</Typography>
              {/* <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} >{invoice}</Typography>   */}
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR074" ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                  navigate(to);
                }}
              >
                Batches
              </Typography>

              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(to);
                }}
              >
                {apprval}
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR063" ? (
          // <Box sx={{ display: "flex", flexDirection: "row" }}>
          //   <Typography variant="h3" color="#0000D1" sx={{cursor:'pointer'}}  onClick={() => { navigate( `/Apps/TR064/Opening Stock` ); }}>{openstackname}</Typography>
          //   <Typography variant="h3" color="#0000D1" >{screenName}</Typography>

          // </Box>
          <Box display="flex" borderRadius="3px" alignItems="center">
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
                  navigate(`/Apps/TR064/Opening Stock`);
                }}
              >
                {openstackname}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(to);
                }}
              >
                {apprval}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                {screenName}
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR032" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
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
                  navigate(`/Apps/TR083/Colors - Material type`);
                }}
              >
                Colors(MT)
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(to);
                }}
              >
                {apprval}
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR033" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
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
                  navigate(`/Apps/TR083/Colors - Material type`);
                }}
              >
                Colors(MT)
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate("/Apps/Secondarylistview/TR032/Colors/L");
                }}
              >{`Leather(${params.Number})`}</Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                Color shades
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR117" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
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
                  navigate(`/Apps/TR083/Colors - Material type`);
                }}
              >
                Colors(MT)
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate("/Apps/Secondarylistview/TR032/Colors/L");
                }}
              >{`Leather(${params.Number})`}</Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >{`Color Shades(${params.Desc})`}</Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR003" ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                  navigate(to);
                }}
              >
                {materialType}
              </Typography>
              {/* <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} onClick={() => { navigate(to); }}>{apprval}</Typography> */}
              {parentID == "L" || parentID == "LS" ? (
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  {apprval}
                </Typography>
              ) : (
                ""
              )}
              {parentID == "M" || parentID == "S" ? (
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >{`${apprval} Categories`}</Typography>
              ) : (
                ""
              )}
              {parentID == "R" || parentID == "P" ? (
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >{`${apprval} Categories`}</Typography>
              ) : (
                ""
              )}
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR021" ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                  navigate(`/Apps/TR072/Process%20Stage`);
                }}
              >
                Process Stage
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(`/Apps/TR072/Process%20Stage`);
                }}
              >
                {Number}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                List Of Process
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR001" ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                {`Categories (${Number})`}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                List of Products
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR148" ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                  navigate(`/Apps/TR147/Jobwork Category`);
                }}
              >
                {`Categories (${Number})`}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                List of Jobwork
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR048" ? (
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
                navigate(`/Apps/TR047/Production%20Card`);
              }}
            >
              {" "}
              {hderName}
            </Typography>

            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              {screenName}
            </Typography>
          </Breadcrumbs>
        ) : accessID == "TR056" ? (
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
                navigate(`/Apps/TR047/Production%20Card`);
              }}
            >
              {" "}
              {hderName}
            </Typography>
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate("");
              }}
            >
              Indent Items
            </Typography>

            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              {screenName}
            </Typography>
          </Breadcrumbs>
        ) : accessID == "TR051" ? (
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
                navigate(`/Apps/TR047/Production%20Card`);
              }}
            >{`Production Card(${params.prdNumber})`}</Typography>
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate(
                  `/Apps/Secondarylistview/TR118/Indent Type/${parentID}/${params.prdNumber}`
                );
              }}
            >
              {params.remarkDec === "L" ? "Leather" : "Material"}
            </Typography>
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              Indent Items
            </Typography>
          </Breadcrumbs>
        ) : accessID == "TR118" ? (
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
                navigate(`/Apps/TR047/Production%20Card`);
              }}
            >
              {" "}
              {`Production Card(${params.Number})`}
            </Typography>
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              Indent Type
            </Typography>
          </Breadcrumbs>
        ) : accessID == "TR119" ? (
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
                navigate(`/Apps/TR047/Production%20Card`);
              }}
            >
              {" "}
              {`Production Card(${params.Number})`}
            </Typography>
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              {params.Desc === "L" ? "Leather" : "Material"}
            </Typography>
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              Indent Items
            </Typography>
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              List of supplier
            </Typography>
          </Breadcrumbs>
        ) : accessID == "TR050" ? (
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
                navigate("/Apps/TR002/Categories");
              }}
            >
              {`Categories (${Number})`}
            </Typography>
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate(
                  `/Apps/Secondarylistview/TR001/Product%20Master/${params.bomproductid}/${Number}`
                );
              }}
            >
              {Description}
            </Typography>
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              {screenName}
            </Typography>
          </Breadcrumbs>
        ) : accessID == "TR079" ? (
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
                navigate("/Apps/TR078/Stock%20Enquiry");
              }}
            >
              Stock Enquiry
            </Typography>
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              {abbrevation} Category
            </Typography>
            {/* <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} >{screenName}</Typography>
             */}
          </Breadcrumbs>
        ) : accessID == "TR080" ? (
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
                navigate("/Apps/TR078/Stock%20Enquiry");
              }}
            >
              Stock Enquiry
            </Typography>
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate(
                  `/Apps/Secondarylistview/TR079/Material%20Category/${Description}`
                );
              }}
            >
              {abbrevation} Category{" "}
            </Typography>
            {/* <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} >{screenName}</Typography> */}
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              {Number}
            </Typography>
          </Breadcrumbs>
        ) : accessID == "TR111" ? (
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
                navigate("/Apps/TR078/Stock%20Enquiry");
              }}
            >
              Stock Enquiry
            </Typography>
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              List Of Supplier
            </Typography>
            {/* <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} >{screenName}</Typography> */}
          </Breadcrumbs>
        ) : accessID == "TR112" ? (
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
                navigate("/Apps/TR078/Stock%20Enquiry");
              }}
            >
              Stock Enquiry
            </Typography>
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate(
                  "/Apps/Secondarylistview/TR111/List%20of%20Supplier/S/Supplier"
                );
              }}
            >
              List Of Supplier
            </Typography>
            {/* <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} >List Of Material</Typography> */}
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              {Number}
            </Typography>
          </Breadcrumbs>
        ) : accessID == "TR113" ? (
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
                navigate("/Apps/TR078/Stock%20Enquiry");
              }}
            >
              Stock Enquiry
            </Typography>
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              List Of Production Card
            </Typography>
            {/* <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} >{screenName}</Typography>
             */}
          </Breadcrumbs>
        ) : accessID == "TR115" ? (
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
                navigate("/Apps/TR078/Stock%20Enquiry");
              }}
            >
              Stock Enquiry
            </Typography>
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              List Of Material{apprval}
            </Typography>
            {/* <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} >{screenName}</Typography>
             */}
          </Breadcrumbs>
        ) : accessID == "TR114" ? (
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
                navigate("/Apps/TR078/Stock%20Enquiry");
              }}
            >
              Stock Enquiry
            </Typography>
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate(
                  "/Apps/Secondarylistview/TR113/List%20of%20ProductionCard/PD"
                );
              }}
            >
              List Of Production Card
            </Typography>
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              Product Card Items
            </Typography>
            {/* <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} >{Number}</Typography> */}
          </Breadcrumbs>
        ) : accessID == "TR128" ? (
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
                navigate("/Apps/TR014/Company");
              }}
            >
              Company
            </Typography>
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              Location
            </Typography>

            {/* <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} >{screenName}</Typography>
             */}
          </Breadcrumbs>
        ) : accessID == "TR127" ? (
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
                navigate("/Apps/TR014/Company");
              }}
            >
              Company
            </Typography>
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate(
                  `/Apps/Secondarylistview/TR128/Location/${params.Number}`
                );
              }}
            >
              Location
            </Typography>
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              Gate Entry
            </Typography>
            {/* <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} >{screenName}</Typography>
             */}
          </Breadcrumbs>
        ) : accessID == "TR129" ? (
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
                navigate("/Apps/TR014/Company");
              }}
            >
              Company
            </Typography>
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate(
                  `/Apps/Secondarylistview/TR128/Location/${params.Number}`
                );
              }}
            >
              Location
            </Typography>
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              Bin
            </Typography>
            {/* <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} >{screenName}</Typography>
             */}
          </Breadcrumbs>
        ) : accessID == "TR097" ? (
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
              {screenName}
            </Typography>
          </Breadcrumbs>
        ) : accessID == "TR132" ? (
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
                navigate("/Apps/TR123/Check%20In");
              }}
            >
              Check In
            </Typography>

            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              {screenName}
            </Typography>
          </Breadcrumbs>
        ) : accessID == "TR134" ? (
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
                navigate("/Apps/TR123/Check%20In");
              }}
            >
              Check In
            </Typography>
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate(
                  `/Apps/Secondarylistview/TR132/DailyTask/${params.Number}`
                );
              }}
            >
              DailyTask
            </Typography>
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              {screenName}
            </Typography>
          </Breadcrumbs>
        ) : accessID == "TR095" ? (
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
                navigate("/Apps/TR099/Companies");
              }}
            >
              Companies
            </Typography>
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              User Groups
            </Typography>
          </Breadcrumbs>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography variant="h3" color="#0000D1">
              {screenName}
            </Typography>
          </Box>
        )}
        <Box justifyContent="end" display="flex">
          {broken && !rtl && (
            <IconButton onClick={() => toggleSidebar()}>
              <MenuOutlinedIcon />
            </IconButton>
          )}
          <GridToolbarQuickFilter />
          {accessID == "TR048" ? (
            false
          ) : accessID == "TR051" ? (
            false
          ) : accessID == "TR073" ? (
            false
          ) : accessID == "TR063" ? (
            false
          ) : accessID == "TR054" ? (
            false
          ) : accessID == "TR079" ? (
            false
          ) : accessID == "TR080" ? (
            false
          ) : accessID == "TR097" ? (
            false
          ) : accessID == "TR102" ? (
            false
          ) : accessID == "TR103" ? (
            false
          ) : accessID == "TR104" ? (
            false
          ) : accessID == "TR105" ? (
            false
          ) : accessID == "TR111" ? (
            false
          ) : accessID == "TR112" ? (
            false
          ) : accessID == "TR113" ? (
            false
          ) : accessID == "TR114" ? (
            false
          ) : accessID == "TR115" ? (
            false
          ) : accessID == "TR003" ? (
            <Box>
              <Tooltip arrow title="Stock Order">
                <IconButton
                  onClick={() => {
                    navigate("./stock-care-by");
                  }}
                >
                  <AssessmentIcon sx={{ marginTop: "10px" }} color="primary" />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="Add">
                <IconButton>
                  <AddOutlinedIcon
                    onClick={() => {
                      navigate(
                        `./Edit${
                          screenName === "Remarks"
                            ? "Delivery Chalan"
                            : screenName
                        }/-1/A`
                      );
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          ) : YearFlag == "true" ? (
            <Tooltip arrow title="Add">
              <IconButton>
                <AddOutlinedIcon
                  onClick={() => {
                    navigate(
                      `./Edit${
                        screenName === "Remarks"
                          ? "Delivery Chalan"
                          : screenName
                      }/-1/A`
                    );
                  }}
                />
              </IconButton>
            </Tooltip>
          ) : (
            false
          )}
          {accessID == "TR048" && !doesArrayContainNegative() ? (
            <Tooltip arrow title="Production Card Issue">
              <PendingActionsIcon
                sx={{ marginTop: "10px" }}
                color="primary"
                onClick={() => {
                  navigate("./TR300/Editproduction");
                }}
              />
            </Tooltip>
          ) : (
            false
          )}
          <GridToolbarExport
            printOptions={{ disableToolbarButton: true }}
            csvOptions={{
              fileName: `${screenName}`,
            }}
            slotProps={{ toolbar: { csvOptions: { allColumns: true } } }}
          />

          <IconButton onClick={() => navigate("/")} color="error">
            <LogoutOutlinedIcon />
          </IconButton>
        </Box>
      </GridToolbarContainer>
    );
  }

  React.useEffect(() => {
    dispatch(fetchListview(accessID, screenName, filter, "", compID));
  }, [location.key]);

  const handlePagechange = (pageno) => {
    setPage(pageno);
    sessionStorage.setItem("secondaryCurrentPage", pageno);
  };


  return (
    <React.Fragment>
      <Box m="5px">
        <Box
          m="5px 0 0 0"
          height="85vh"
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
            "& .gridcolor": {
              backgroundColor: "#f5cbae",
              color: "#1a3e72",
            },
          }}
        >
          <DataGrid
            key={accessID}
            rows={listViewData}
            columns={columns}
            page={page}
            disableSelectionOnClick
            getRowId={(row) => row.RecordID}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            onPageChange={(pageno) => handlePagechange(pageno)}
            components={{
              Toolbar: () => CustomToolbar(listViewData),
            }}
            loading={loading}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            getRowClassName={(params) =>
              params.row.Rate > params.row.FixedRate ||
              params.row.RemarkRecordID == "24"||
              params.row.Colourflag == "Y"
                ? "gridcolor"
                : ""
            }
          />
        </Box>
        {accessID == "TR001" ? (
          <Box
            display="flex"
            flexDirection="row"
            padding="25px"
            sx={{ overflowY: "auto" }}
          >
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="List of BOM"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<ListAltOutlinedIcon color="error" />}
              label="Stock"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<AddPhotoAlternateIcon color="primary" />}
              label="Image Upload"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR032" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="List of Color Shades"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR033" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="List of Customer"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR050" ? (
          <Box
            display="flex"
            flexDirection="row"
            padding="25px"
            sx={{ overflowY: "auto" }}
          >
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            <Chip
              icon={<SettingsBackupRestoreIcon color="primary" />}
              label="Process"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<PrintOutlinedIcon color="primary" />}
              label="Cutting Component"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<PrintOutlinedIcon color="success" />}
              label="Production"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<PrintOutlinedIcon color="error" />}
              label="Packing"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<PrintOutlinedIcon color="" />}
              label="All BOM"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<PrintOutlinedIcon color="" />}
              label="Internal Order"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<EmailIcon color="primary" />}
              label="Email"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR003" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="Material"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<AddPhotoAlternateIcon color="primary" />}
              label="Image Upload"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR004" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="Stock"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<AddPhotoAlternateIcon color="primary" />}
              label="Image Upload"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR097" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="List of Delivery Challan"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR079" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="Stock"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR111" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR113" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR048" ? (
          <Box display="flex" flexDirection="row" padding="25px" gap={3}>
            <Chip
              icon={<SummarizeOutlinedIcon color="primary" />}
              label="Issue"
              variant="outlined"
            />
                        <Chip
              icon={<OpenInBrowserOutlinedIcon color="primary" />}
              label="Alternate Material"
              variant="outlined"
            />
            <Chip
              icon={<OpenInBrowserOutlinedIcon color="warning" />}
              label="Alternate Color"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR118" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR051" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR119" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="Indent Order"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR074" ? (
          <Box
            display="flex"
            flexDirection="row"
            padding="25px"
            sx={{ overflowY: "auto" }}
          >
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="Issue"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<ListAltOutlinedIcon color="error" />}
              label="Completion"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<TaskAltOutlinedIcon color="success" />}
              label="Completed"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<PrintOutlinedIcon color="primary" />}
              label="Print"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<EmailIcon color="primary" />}
              label="Email"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR087" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            <Chip
              icon={<PrintOutlinedIcon color="primary" />}
              label="Print"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<EmailIcon color="primary" />}
              label="Email"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR073" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="Invoice"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR103" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="Stock"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR104" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="Stock"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR011" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            <Chip
              icon={<PrintOutlinedIcon color="primary" />}
              label="Print"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<EmailIcon color="primary" />}
              label="Email"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="Post Shipment"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR084" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            <Chip
              icon={<PrintOutlinedIcon color="primary" />}
              label="Print"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<EmailIcon color="primary" />}
              label="Email"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR080" ? (
          false
        ) : accessID == "TR112" ? (
          false
        ) : accessID == "TR114" ? (
          false
        ) : accessID == "TR115" ? (
          false
        ) : accessID == "TR102" ? (
          false
        ) : (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
          </Box>
        )}
      </Box>
      <MatxCustomizer
        open={open}
        screenName={invoice}
        rowData={mailData}
        type={Number}
      />
      <Popup
        title="Material"
        openPopup={isproductionPopupOpen}
        setOpenPopup={() =>
          dispatch(productionlookupOpen({ materialRecID: "" }))
        }
      >
        <Listviewpopup
          accessID="2085"
          screenName="Material"
          childToParent={childToParent}
          filterName={"parentID"}
          filterValue={alternateMaterialRecordID}
        />
      </Popup>

      <Popup
        title="Colors"
        openPopup={isproductionColorPopupOpen}
        setOpenPopup={() =>
          dispatch(productionColorlookupOpen({ materialRecID: ""}))
        }
      >
        <Listviewpopup
          accessID="2085"
          screenName="Colors"
          childToParent={childToParent}
          filterName={"parentID"}
          filterValue={alternateMaterialRecordID}
        />
      </Popup>
    </React.Fragment>
  );
};

export default ListviewSecondary;
