import React, { useRef, useState } from "react";
import {
  TextField,
  Box,
  Typography,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  Breadcrumbs,
  useTheme,
  LinearProgress,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Formik, Field } from "formik";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { tokens } from "../../../Theme";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Form, useLocation, useNavigate, useParams } from "react-router-dom";
import Popup from "../popup";
import Listviewpopup from "../Lookup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  explorePostData,
  getFetchData,
  postData,
  PackingListPostData,
  StockProcessApi,
} from "../../../store/reducers/Formapireducer";
import { toast } from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import {
  fetchExplorelitview,
  packingListView,
  packingRowUpdate,
} from "../../../store/reducers/Explorelitviewapireducer";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { packingSchema } from "../../Security/validation";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { styled } from "@mui/material/styles";
import { nanoid } from "@reduxjs/toolkit";
const Editpackinglist = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const location = useLocation();
  const { accessID, id, Mode, Type } = useParams();
  const dipatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const compID = sessionStorage.getItem("compID");
  const YearRecorid = sessionStorage.getItem("YearRecorid");
  const getLoading = useSelector((state) => state.formApi.getLoading);
  useEffect(() => {
    dipatch(getFetchData({ accessID, get: "get", recID: id }));
    var filter = `parentID=${id} AND Type = '${Type}'`;
    // dipatch(fetchExplorelitview("TR088", "packinglist", filter, ""));
    dipatch(
      packingListView({
        accessID: "TR088",
        screenName: "packinglist",
        filter: `parentID=${id} AND Type = '${Type}'`,
        any: "",
        CompID: compID,
      })
    );
  }, [location.key]);

  const data = useSelector((state) => state.formApi.Data);
  const isPostLoading = useSelector((state) => state.formApi.postLoading);
  const packingData = useSelector((state) => state.formApi.pakingListCarton);

  const [isPopupData, setisPopupdata] = React.useState(false);

  const [selectINVLookupData, setselectINVLookupData] = React.useState({
    INVlookupRecordid: "",
    INVlookupCode: "",
    INVlookupDesc: "",
  });

  const [selectCUSLookupData, setselectCUSLookupData] = React.useState({
    CUSlookupRecordid: "",
    CUSlookupCode: "",
    CUSlookupDesc: "",
  });

  const [selectCPLookupData, setselectCPLookupData] = React.useState({
    CPlookupRecordid: "",
    CPlookupCode: "",
    CPlookupDesc: "",
    PrimaryID:"",
    SecondaryID:"",
    TeriteryID:"",
  });
  const [selectCARTLookupData, setselectCARTLookupData] = React.useState({
    CARTlookupRecordid: "",
    CARTlookupCode: "",
    CARTlookupDesc: "",
  });

  const [openINVPopup, setOpenINVPopup] = useState(false);
  const [openPRTPopup, setOpenPRTPopup] = useState(false);
  const [openCARTPopup, setOpenCARTPopup] = useState(false);
  function handleShow(type) {
    if (type == "INV" && Mode == "A") {
      setOpenINVPopup(true);
    }
    if (type == "PRT") {
      setOpenPRTPopup(true);
    }
    if (type == "CART") {
      setOpenCARTPopup(true);
    }
  }
  if (isPopupData == false) {
    selectINVLookupData.INVlookupRecordid = data.InvoiceRecordID;
    selectINVLookupData.INVlookupCode = data.InvoiceNo;
    selectINVLookupData.INVlookupDesc = data.InvoiceDate;

    selectCUSLookupData.CUSlookupRecordid = data.CustRecordID;
    selectCUSLookupData.CUSlookupCode = data.CustomerCode;
    selectCUSLookupData.CUSlookupDesc = data.CustomerName;
  }

  //************************** Lookup value assign type based Function *****************/
  const childToParent = (childdata, type) => {
    // console.log("type---" + type);/
    console.log("Data---" + JSON.stringify(childdata));

    if (type == "Invoice") {
      setisPopupdata(true);
      setselectINVLookupData({
        INVlookupRecordid: childdata.RecordID,
        INVlookupCode: childdata.Code,
        INVlookupDesc: childdata.Name,
      });
      setselectCUSLookupData({
        CUSlookupRecordid: childdata.CustomerRecordID,
        CUSlookupCode: childdata.CustomerCode,
        CUSlookupDesc: childdata.CustomerName,
      });
      setOpenINVPopup(false);
    }

    if (type == "Products") {
      setselectCPLookupData({
        CPlookupRecordid: childdata.ProductRecordID,
        CPlookupCode: childdata.Code,
        CPlookupDesc: childdata.Name,
        PrimaryID:childdata.PrimaryID,
        SecondaryID:childdata.SecondaryID,
        TeriteryID:childdata.TeriteryID,
      });
      setproductData({
        Length: childdata.Length,
        Breadth: childdata.Breadth,
        Height: childdata.Height,
        InvoiceQty: childdata.InvoiceQty,
        NormalSLNO: childdata.NormalSLNO,
        Weight: childdata.Weight,
      });

      setOpenPRTPopup(false);
    }
    if (type == "Carton") {
      setselectCARTLookupData({
        CARTlookupRecordid: childdata.MaterialID,
        CARTlookupCode: childdata.Code,
        CARTlookupDesc: childdata.Name,
      });

      setCartonData({
        MLength: childdata.Length,
        MBreadth: childdata.Breadth,
        MHeight: childdata.Height,
        ActualQty: childdata.ActualQty,
        MaximumCapacity: childdata.MaxQty,
      });
      setOpenCARTPopup(false);
    }
    // setOpenSMPopup(false);
  };

  const fnHeaderSave = async (values) => {
    setLoading(true);
    const idata = {
      RecordID: id,
      InvoiceRecordID: selectINVLookupData.INVlookupRecordid,
      CustRecordID: selectCUSLookupData.CUSlookupRecordid,
      Cbm: values.cbm,
      Type: Type,
      YearID: YearRecorid,
      CompanyID: compID,
    };

    var action = "insert";
    if (Mode == "A") {
      action = "insert";
    } else {
      action = "update";
    }

    const response = await dipatch(postData({ accessID, action, idata }));
    console.log(
      "🚀 ~ file: Editpackinglist.jsx:135 ~ fnHeaderSave ~ response:",
      response
    );
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      setLoading(false);
      if (Mode == "A") {
        navigate(
          `/Apps/Secondarylistview/TR087/Packing List/${Type}/EditPacking List/${response.payload.Recid}/E`
        );
      }
    } else {
      toast.error(response.payload.Msg);
      setLoading(false);
    }
  };
  const fnProcess = async () => {
    const props = { accessID, recID: id };
    const Data = await dipatch(StockProcessApi(props));
    console.log("🚀 ~ file: Editpackinglist.jsx:320 ~ fnProcess ~ Data:", Data);
    if (Data.payload.Status == "Y") {
      toast.success(Data.payload.Msg);
      navigate(`/Apps/Secondarylistview/TR087/Packing List/${Type}`);
    } else {
      toast.success(Data.payload.Msg);
    }
  };
  const [rowCount, setRowCount] = useState(0);
  const [pageSize, setPageSize] = React.useState(10);
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
          <Typography>List of Box</Typography>
          <Typography variant="h5">{`(${rowCount})`}</Typography>{" "}
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
              selectcelldata("", "A", "");
              reset();
            }}
          >
            <AddOutlinedIcon />
          </IconButton>
        </Box>
      </GridToolbarContainer>
    );
  }

  const explorelistViewData = useSelector(
    (state) => state.exploreApi.exploreRowDataID
  );
  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.exploreColumnDataID
  );
  console.log(
    "🚀 ~ file: Editpackinglist.jsx:278 ~ Editpackinglist ~ explorelistViewcolumn:",
    explorelistViewcolumn
  );

  var VISIBLE_FIELDS = [
    "SLNO",
    "ProductCode",
    "ProductName",
    "Quantity",
    "Netweight",
    "ActualQty",
    "Remarks",
  ];
  const columns = React.useMemo(
    () =>
      explorelistViewcolumn.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
    [explorelistViewcolumn]
  );

  const [exploremode, seExploremode] = useState("A");
  const [noofCarton, setnoofCarton] = useState();
  const [grossWeightval, setgrossWeightval] = useState();
  const [netWeightval, setnetWeightval] = useState();
  const [cartonData, setCartonData] = useState({
    MLength: "",
    MBreadth: "",
    MHeight: "",
    ActualQty: "",
    MaximumCapacity: "",
  });
  const [productData, setproductData] = useState({
    Length: "",
    Breadth: "",
    Height: "",
    InvoiceQty: "",
    NormalSLNO: "",
    Weight: "",
    PrimaryID:"",
    SecondaryID:"",
    TeriteryID:"",
  });
  const [detailData, setDetailData] = useState({
    RecordID: "",
    carton: "",
    length: "",
    width: "",
    height: "",
    quantity: "",
    grossWeight: "",
    netWeight: "",
    MStartslno: "",
    MCarton: "",
    MLength: "",
    MBreadth: "",
    MHeight: "",
    MQuantity: "",
    MGrossweight: "",
    MNetweight: "",
    Startslno: "",
    Otherweight: "",
    Weight: "",
    ActualQty: "",
  });

  const selectcelldata = (data, bMode, field) => {
    console.log("selectdata" + JSON.stringify(data));

    if (field == "ActualQty" || field == "Remarks") {
      seExploremode(bMode);
    }
    if (bMode == "A") {
      seExploremode(bMode);
      setDetailData({
        RecordID: "",
        carton: "",
        length: "",
        width: "",
        height: "",
        quantity: "",
        grossWeight: "",
        netWeight: "",
        MStartslno: "",
        MCarton: "",
        MLength: "",
        MBreadth: "",
        MHeight: "",
        MQuantity: "",
        MGrossweight: "",
        MNetweight: "",
        Startslno: "",
        Otherweight: "",
        Weight: "",
        ActualQty: "",
        Remarks: "",
      });
      setselectCPLookupData({
        CPlookupRecordid: "",
        CPlookupCode: "",
        CPlookupDesc: "",
        PrimaryID: "",
        SecondaryID: "",
        TeriteryID: "",
      });
      setselectCARTLookupData({
        CARTlookupRecordid: "",
        CARTlookupCode: "",
        CARTlookupDesc: "",
      });

      setCartonData({
        MHeight: "",
        MLength: "",
        MBreadth: "",
        ActualQty: "",
        MaximumCapacity: "",
      });
      setproductData({
        Length: "",
        Breadth: "",
        Height: "",
        InvoiceQty: "",
        NormalSLNO: "",
        Weight: "",
        PrimaryID:"",
        SecondaryID:"",
        TeriteryID:"",
      });
      setnoofCarton("");
      setgrossWeightval("");
      setnetWeightval("");
    } else {
      if (field == "action") {
        setDetailData({
          RecordID: data.RecordID,
          carton: data.Carton,
          length: data.Length,
          width: data.Breadth,
          height: data.Height,
          quantity: data.Quantity,
          grossWeight: data.Grossweight,
          netWeight: data.Netweight,
          MStartslno: data.MStartslno,
          MCarton: data.MCarton,
          MLength: data.MLength,
          MBreadth: data.MBreadth,
          MHeight: data.MHeight,
          MQuantity: data.MQuantity,
          MGrossweight: data.MGrossweight,
          MNetweight: data.MNetweight,
          Startslno: data.Startslno,
          Otherweight: data.Otherweight,
          Weight: data.Weight,
          ActualQty: data.ActualQty,
          Remarks: data.Remarks,
        });

        setselectCPLookupData({
          CPlookupRecordid: data.ProductRecordID,
          CPlookupCode: data.ProductCode,
          CPlookupDesc: data.ProductName,
          PrimaryID: data.PrimaryID,
          SecondaryID: data.SecondaryID,
          TeriteryID: data.TeriteryID,
          
        });
        setselectCARTLookupData({
          CARTlookupRecordid: data.MaterialRecordID,
          CARTlookupCode: data.MaterialCode,
          CARTlookupDesc: data.MaterialName,
        });

        setCartonData({
          MHeight: data.MHeight,
          MLength: data.MLength,
          MBreadth: data.MBreadth,
          ActualQty: data.ActualQty,
          MaximumCapacity: data.MaximumCapacity,
        });
        setproductData({
          Length: data.Length,
          Breadth: data.Breadth,
          Height: data.Height,
          InvoiceQty: data.Quantity,
          NormalSLNO: data.MStartslno,
          PrimaryID:data.PrimaryID,
          SecondaryID:data.SecondaryID,
          TeriteryID:data.TeriteryID,
          // Weight:data.Weight,
        });
      }
    }
  };

  const initialValue = {
    cbm: data.Cbm,
    carton: detailData.carton,
    length: productData.Length,
    Breadth: productData.Breadth,
    height: productData.Height,
    NormalSLNO: productData.NormalSLNO,
    quantity: detailData.quantity,
    grossWeight: detailData.grossWeight,
    netWeight: detailData.netWeight,
    MStartslno: detailData.MStartslno,
    MCarton: detailData.MCarton,
    MLength: cartonData.MLength,
    MBreadth: cartonData.MBreadth,
    MHeight: cartonData.MHeight,
    MaximumCapacity: cartonData.ActualQty,
    MQuantity: productData.InvoiceQty,
    MGrossweight: detailData.MGrossweight,
    MNetweight: detailData.MNetweight,
    Startslno: detailData.Startslno,
    ActualQty: "",
    Otherweight: detailData.Otherweight,
    sino: detailData.sino,
    NoofCarton: data.NoofCarton,
    Netweight: data.Netweight,
    Gossweight: data.Gossweight,
    Remarks: detailData.Remarks,
  };

  const [currentObj, setcurrentObj] = useState();

  const obj = [];
  const nextSLno = explorelistViewData[explorelistViewData.length - 1];

  const pushArraydata = async (values, data) => {
    setcurrentObj(data);
    var tempQty = values.MQuantity;
    var insertQty = values.ActualQty;
    var siNo =
      explorelistViewData.length == 0
        ? Number(values.NormalSLNO)
        : Number(nextSLno.MStartslno) + 1;
    var SLNO =
      explorelistViewData.length == 0 ? 1 : explorelistViewData.length + 1;
    console.log("tempdata>>" + siNo);
    console.log("insertQty>>" + values.NormalSLNO);

    for (var i = 1; i <= noofCarton; i++) {
      if (tempQty < Math.round(values.ActualQty) && tempQty != 0) {
        insertQty = tempQty;
      }

      obj.push({
        id: nanoid(),
        SLNO: SLNO,
        ActualQty: insertQty,
        MStartslno: siNo,
        Length: values.length,
        Breadth: values.Breadth,
        Height: values.height,
        MLength: values.MLength,
        MBreadth: values.MBreadth,
        MHeight: values.MHeight,
        MaximumCapacity: values.MaximumCapacity,
        MGrossweight: grossWeightval,
        MNetweight: netWeightval,
        Otherweight: values.Otherweight,
        Remarks: values.Remarks ? values.Remarks : '',
        dmlstate: "I",
        MaterialRecordID: selectCARTLookupData.CARTlookupRecordid,
        ProductRecordID: selectCPLookupData.CPlookupRecordid,
        PrimaryID: selectCPLookupData.PrimaryID,
        SecondaryID: selectCPLookupData.SecondaryID,
        TeriteryID: selectCPLookupData.TeriteryID,
        PackinghdrRecordID: id,
        RecordID: detailData.RecordID,
        Type: Type,
        MaterialCode: selectCARTLookupData.CARTlookupCode,
        MaterialName: selectCARTLookupData.CARTlookupDesc,
        ProductCode: selectCPLookupData.CPlookupCode,
        ProductName: selectCPLookupData.CPlookupDesc,
        Netweight: netWeightval,
        Quantity: values.MQuantity,
        MQuantity: "0",
        Sap: "N",
        MCarton: "N",

      });
      SLNO++;
      siNo = parseInt(siNo) + 1;
      tempQty = tempQty - values.ActualQty;
    }
    dipatch(packingRowUpdate({ type: "INSERTED", data: obj }));
  };

  const ref = useRef();

  const fnListOfItem = async (values, resetForm) => {
    var action = exploremode == "A" ? "insert" : "update";

    const idata = {
      id: 0,
      ActualQty: values.MQuantity,
      MStartslno: values.NormalSLNO,
      Length: 0,
      Breadth: 0,
      Height: 0,
      MLength: 0,
      MBreadth: 0,
      MHeight: 0,
      MaximumCapacity: 0,
      MGrossweight: 0,
      MNetweight: 0,
      Otherweight: 0,
      Remarks: values.Remarks,
      dmlstate: 0,
      MaterialRecordID: selectCARTLookupData.CARTlookupRecordid,
      ProductRecordID: selectCPLookupData.CPlookupRecordid,
      PackinghdrRecordID: id,
      RecordID: detailData.RecordID,
      Type: Type,
      Quantity: 0,
    };
    console.log(
      "🚀 ~ file: Editpackinglist.jsx:585 ~ fnListOfItem ~ explorelistViewData:",
      explorelistViewData
    );

    const response = await dipatch(
      PackingListPostData({
        accessID: "TR088",
        action,
        idata: explorelistViewData,
        Type: Type,
      })
    );

    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      const reset = ref.current.resetForm;
      selectcelldata("", "A", "");
      resetForm();

      var filter = `parentID=${id} AND Type = '${Type}'`;
      dipatch(fetchExplorelitview("TR088", "packinglist", filter, ""));
      setnoofCarton("");
      setgrossWeightval("");
      setnetWeightval("");
      // dipatch(packingRowUpdate({ type: "RESET" }));
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
          navigate(`/Apps/Secondarylistview/TR087/Packing List/${Type}`);
        }
      } else {
        return;
      }
    });
  };

  function quantityhandleClick(values) {
    console.log(values);
    // console.log("orderqty" + productData.InvoiceQty);
    // console.log("Actualcapacity" + values.ActualQty);

    if ((productData.InvoiceQty !== "") & (values.ActualQty != "")) {
      var CartonValue = Math.floor(
        Number(productData.InvoiceQty) / Number(values.ActualQty)
      );
      // console.log("roundoffvalue" + "" + CartonValue);
      var cartonRemainder =
        Number(productData.InvoiceQty) % Number(values.ActualQty);
      // console.log("remaindervalue" + "" + cartonRemainder);
      var cartondata = "";
      if (cartonRemainder > 0) {
        cartondata = CartonValue + 1;
      } else {
        cartondata = CartonValue;
      }
      setnoofCarton(cartondata);
      // console.log(cartondata);
    }
    if (productData.Weight !== "" && values.ActualQty !== "") {
      var grossdataval = Number(productData.Weight) * Number(values.ActualQty);
      // console.log(
      //   "TotalGrossValue--" +
      //     productData.Weight +
      //     "actualqty" +
      //     values.ActualQty
      // );
      // console.log("TotalGrossValue--" + grossdataval);
      setgrossWeightval(grossdataval);
    }
    if (detailData.Weight !== "" && detailData.ActualQty !== "") {
      var grossdataval =
        Number(detailData.Weight) * Number(detailData.ActualQty);
      // console.log(
      //   "weight--" + detailData.Weight + "actualqty--" + detailData.ActualQty
      // );
      // console.log("TotalGrossValue--" + grossdataval);
      setgrossWeightval(grossdataval);
    }

    // console.log(values.Otherweight);

    var netWeightdataval = Number(grossWeightval) + Number(values.Otherweight);
    // console.log("netweight" + netWeightdataval);
    setnetWeightval(netWeightdataval);
    // console.log(netWeightval);
  }

  return (
    <React.Fragment>
      {getLoading ? <LinearProgress /> : false}
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box display="flex" borderRadius="3px" alignItems="center">
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
                navigate("/Apps/TR116/Packing%20List");
              }}
            >
              Packing List
            </Typography>
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate(
                  `/Apps/Secondarylistview/TR087/Packing%20List/${Type}`
                );
              }}
            >
              Normal
            </Typography>
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              {Mode === "A" ? "New" : selectCUSLookupData.CUSlookupDesc}
            </Typography>
            {/* <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} >{screenName}</Typography>
             */}
          </Breadcrumbs>
        </Box>
        <Box display="flex">
          <IconButton>
            <ResetTvIcon color="error" onClick={() => fnLogOut("Close")} />
          </IconButton>

          <IconButton>
            <LogoutOutlinedIcon
              color="error"
              onClick={() => fnLogOut("Logout")}
            />
          </IconButton>
        </Box>
      </Box>

      {!getLoading ? (
        <Box m="20px">
          <Formik
            innerRef={ref}
            initialValues={initialValue}
            onSubmit={(values, { resetForm }) => {
              setTimeout(() => {
                Mode == "A" ? fnHeaderSave(values) : pushArraydata(values, "Y");
              }, 100);
            }}
            validationSchema={packingSchema}
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
                onChange={quantityhandleClick(values)}
                onSubmit={handleSubmit}
                onReset={() => {
                  fnListOfItem(values, resetForm);
                }}
              >
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
                        label="ID"
                        variant="filled"
                        value={selectINVLookupData.INVlookupRecordid}
                        focused
                        sx={{ display: "none" }}
                      />

                      <TextField
                        id="outlined-basic"
                        label="Invoice ID"
                        variant="filled"
                        value={selectINVLookupData.INVlookupCode}
                        focused
                        required
                        inputProps={{ tabIndex: "-1" }}
                      />
                      <IconButton
                        sx={{ height: 40, width: 40 }}
                        onClick={() => handleShow("INV")}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>
                      {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                      <TextField
                        id="outlined-basic"
                        label=""
                        variant="filled"
                        value={selectINVLookupData.INVlookupDesc}
                        fullWidth
                        inputProps={{ tabIndex: "-1" }}
                        focused
                      />
                    </FormControl>
                  </FormControl>
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
                        label="ID"
                        variant="filled"
                        value={selectCUSLookupData.CUSlookupRecordid}
                        focused
                        sx={{ display: "none" }}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Customer"
                        variant="filled"
                        value={selectCUSLookupData.CUSlookupCode}
                        focused
                        required
                        inputProps={{ tabIndex: "-1" }}
                      />
                      <IconButton
                        sx={{ height: 40, width: 40 }}
                        // onClick={() => handleShow("CUS")}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>
                      {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                      <TextField
                        id="outlined-basic"
                        label=""
                        variant="filled"
                        value={selectCUSLookupData.CUSlookupDesc}
                        fullWidth
                        inputProps={{ tabIndex: "-1" }}
                        focused
                      />
                    </FormControl>
                  </FormControl>
                  <FormControl
                    fullWidth
                    sx={{ gridColumn: "span 2", gap: "40px" }}
                  >
                    <TextField
                      name="cbm"
                      type="number"
                      id="cbm"
                      label="CBM"
                      variant="filled"
                      focused
                      value={values.cbm}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                      InputProps={{ readOnly: true }}
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                    <TextField
                      name="Gossweight"
                      type="number"
                      id="Gossweight"
                      label="Gross Weight"
                      variant="filled"
                      focused
                      value={values.Gossweight}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                      InputProps={{ readOnly: true }}
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                    <TextField
                      // name="cbm"
                      type="number"
                      // id="cbm"
                      label="Net Weight"
                      variant="filled"
                      focused
                      value={values.Netweight}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{ background: "#fff6c3" }}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                    <TextField
                      name="NoofCarton"
                      type="number"
                      id="NoofCarton"
                      label="No of Carton"
                      variant="filled"
                      focused
                      value={values.NoofCarton}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{ background: "#fff6c3" }}
                      onWheel={(e) => e.target.blur()} 
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                    />
                  </FormControl>
                  <FormControl></FormControl>
                  <FormControl
                    fullWidth
                    sx={{ gridColumn: "span 2", gap: "40px" }}
                  >
                    {""}
                  </FormControl>
                  {Mode == "E" ? (
                    <React.Fragment>
                      <FormControl sx={{ gridColumn: "span 2" }}>
                        <Box m="5px">
                          <Box
                            m="5px 0 0 0"
                            height="73vh"
                            sx={{
                              // "& .MuiDataGrid-root": {
                              //   border: "none",
                              // },
                              // "& .MuiDataGrid-cell": {
                              //   borderBottom: "none",
                              // },
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
                              "& .hot": {
                                backgroundColor: "#ff943975",
                                // color: '#1a3e72',
                              },
                            }}
                          >
                            <DataGrid
                              rows={explorelistViewData}
                              columns={columns}
                              disableSelectionOnClick
                              getRowId={(row) => row.id}
                              pageSize={pageSize}
                              onPageSizeChange={(newPageSize) =>
                                setPageSize(newPageSize)
                              }
                              rowsPerPageOptions={[5, 10, 20]}
                              pagination
                              // onCellClick={(params) => {
                              //   const currentRow = params.row;
                              //   const currentcellField = params.field;
                              //   selectcelldata(currentRow, "E", currentcellField);
                              // }}
                              onCellDoubleClick={(params) => {
                                if (
                                  params.field == "ActualQty" ||
                                  params.field == "Remarks"
                                ) {
                                  seExploremode("E");
                                }
                              }}
                              components={{
                                Toolbar: CustomToolbar,
                              }}
                              onCellEditCommit={(params) => {
                                console.log(
                                  "🚀 ~ file: Editpackinglist.jsx:928 ~ Editpackinglist ~ params:",
                                  params
                                );
                                var spreaddata = [...explorelistViewData];

                                const i = explorelistViewData.findIndex(
                                  (x) => x.id == params.id
                                );

                                spreaddata[i] = {
                                  ...params.row,
                                  ActualQty:
                                    params.field === "ActualQty"
                                      ? params.value
                                      : params.row.ActualQty,
                                  Remarks:
                                    params.field === "Remarks"
                                      ? params.value
                                      : params.row.Remarks,
                                  dmlstate:
                                    params.row.dmlstate == "U" ? "E" : "I",
                                  PackinghdrRecordID: id,
                                };
                                dipatch(
                                  packingRowUpdate({
                                    type: "EDITED",
                                    data: spreaddata,
                                  })
                                );
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
                              getCellClassName={(params) => {
                                if (
                                  params.field === "ActualQty" ||
                                  params.field == "Remarks"
                                ) {
                                  return "hot";
                                }
                              }}
                            />
                          </Box>
                        </Box>
                      </FormControl>

                      <FormControl
                        fullWidth
                        sx={{ gridColumn: "span 2", gap: "40px" }}
                      >
                        <FormControl
                          sx={{
                            gridColumn: "span 2",
                            display: "flex",
                            marginTop: "50px",
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
                              id="psID"
                              label="ID"
                              variant="filled"
                              value={selectCPLookupData.CPlookupRecordid}
                              focused
                              sx={{ display: "none" }}
                            />
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
                              onClick={() => handleShow("PRT")}
                            >
                              <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                            </IconButton>
                            {/* <MoreHorizIcon onClick={()=>handleShow('CP')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

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
                        <FormControl
                          fullWidth
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "20px",
                            mt: "10px",
                          }}
                        >
                          <TextField
                            name="length"
                            type="number"
                            id="length"
                            label="Length (CM)"
                            variant="filled"
                            value={values.length}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            focused
                            fullWidth
                            sx={{
                              background: "#fff6c3",
                              input: { textAlign: "right" },
                            }}
                            InputProps={{ readOnly: true }}
                          />
                          <TextField
                            name="Breadth"
                            type="number"
                            id="Breadth"
                            label="Breadth (CM)"
                            variant="filled"
                            value={values.Breadth}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            focused
                            fullWidth
                            sx={{
                              background: "#fff6c3",
                              input: { textAlign: "right" },
                            }}
                            InputProps={{ readOnly: true }}
                          />
                          <TextField
                            name="height"
                            type="number"
                            id="height"
                            label="Height (CM)"
                            variant="filled"
                            value={values.height}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            focused
                            sx={{
                              background: "#fff6c3",
                              input: { textAlign: "right" },
                            }}
                            InputProps={{ readOnly: true }}
                            fullWidth
                          />
                        </FormControl>
                        <TextField
                          name="MQuantity"
                          type="number"
                          id="MQuantity"
                          label="Order Quantity"
                          variant="filled"
                          focused
                          value={values.MQuantity}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{
                            background: "#fff6c3",
                            input: { textAlign: "right" },
                          }}
                          InputProps={{ readOnly: true }}
                          fullWidth
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
                              id="psID"
                              label="ID"
                              variant="filled"
                              value={selectCARTLookupData.CARTlookupRecordid}
                              focused
                              sx={{ display: "none" }}
                            />
                            <TextField
                              id="psCode"
                              label="Carton"
                              variant="filled"
                              value={selectCARTLookupData.CARTlookupCode}
                              focused
                              required
                              inputProps={{ tabIndex: "-1" }}
                            />
                            <IconButton
                              sx={{ height: 40, width: 40 }}
                              onClick={() => handleShow("CART")}
                            >
                              <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                            </IconButton>
                            {/* <MoreHorizIcon onClick={()=>handleShow('CP')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                            <TextField
                              id="psDesc"
                              label=""
                              variant="filled"
                              value={selectCARTLookupData.CARTlookupDesc}
                              fullWidth
                              inputProps={{ tabIndex: "-1" }}
                              focused
                            />
                            {Mode === "E" ? (
                              <Button
                                disabled={exploremode === "E"}
                                variant="contained"
                                type="submit"
                                color="primary"
                              >
                                Generate
                              </Button>
                            ) : (
                              false
                            )}
                          </FormControl>
                        </FormControl>
                        <FormControl
                          fullWidth
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "20px",
                            mt: "10px",
                          }}
                        >
                          <TextField
                            name="MLength"
                            type="number"
                            id="MLength"
                            label="Length (CM)"
                            variant="filled"
                            value={values.MLength}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            focused
                            fullWidth
                            sx={{
                              background: "#fff6c3",
                              input: { textAlign: "right" },
                            }}
                            InputProps={{ readOnly: true }}
                          />
                          <TextField
                            name="MBreadth"
                            type="number"
                            id="MBreadth"
                            label="Breadth (CM)"
                            variant="filled"
                            value={values.MBreadth}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            focused
                            fullWidth
                            sx={{
                              background: "#fff6c3",
                              input: { textAlign: "right" },
                            }}
                            InputProps={{ readOnly: true }}
                          />
                          <TextField
                            name="MHeight"
                            type="number"
                            id="MHeight"
                            label="Height (CM)"
                            variant="filled"
                            value={values.MHeight}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            focused
                            sx={{
                              background: "#fff6c3",
                              input: { textAlign: "right" },
                            }}
                            InputProps={{ readOnly: true }}
                            fullWidth
                          />
                        </FormControl>
                      </FormControl>
                      <TextField
                        name="MaximumCapacity"
                        type="text"
                        id="MaximumCapacity"
                        label="Maximum capacity/carton"
                        variant="filled"
                        value={values.MaximumCapacity}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        fullWidth
                        sx={{
                          gridColumn: "span 2",
                          background: "#fff6c3",
                          input: { textAlign: "right" },
                        }}
                        InputProps={{ readOnly: true }}
                      />
                      <TextField
                        name="MStartslno"
                        type="text"
                        id="MStartslno"
                        label="SI.NO"
                        variant="filled"
                        value={values.MStartslno}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        fullWidth
                        sx={{
                          gridColumn: "span 2",
                          background: "#fff6c3",
                          input: { textAlign: "right" },
                        }}
                        InputProps={{ readOnly: true }}
                      />
                      <TextField
                        name="ActualQty"
                        type="text"
                        id="ActualQty"
                        label="Actual capacity/carton"
                        variant="filled"
                        value={values.ActualQty}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        fullWidth
                        required
                        sx={{
                          gridColumn: "span 2",
                          background: "#fff6c3",
                          input: { textAlign: "right" },
                        }}
                        onInvalid={(e) => {
                          e.target.setCustomValidity(
                            "Please Fill The Actual capacity/carton"
                          );
                        }}
                        onInput={(e) => {
                          e.target.setCustomValidity("");
                        }}
                      />
                      <TextField
                        name="MGrossweight"
                        type="number"
                        id="MGrossweight"
                        label="Gross Weight (GMS)"
                        variant="filled"
                        focused
                        // defaultValue={values.MGrossweight}

                        value={grossWeightval}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={{
                          gridColumn: "span 2",
                          background:"#FFDAC0",
                          input: { textAlign: "right" },
                        }}
                        InputProps={{ readOnly: true }}
                        fullWidth
                      />
                      <TextField
                        name="NormalSLNO"
                        type="text"
                        id="NormalSLNO"
                        label="Next serial number"
                        variant="filled"
                        value={values.NormalSLNO}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        onWheel={(e) => e.target.blur()} 
                        fullWidth
                        sx={{
                          gridColumn: "span 2",
                          background: "#fff6c3",
                          input: { textAlign: "right" },
                        }}
                        InputProps={{ readOnly: true }}
                      />

                      <TextField
                        name="Otherweight"
                        type="number"
                        id="Otherweight"
                        label="Other weight (GMS)"
                        variant="filled"
                        focused
                        value={values.Otherweight}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onWheel={(e) => e.target.blur()} 
                        sx={{
                          gridColumn: "span 2",
                          background: "#fff6c3",
                          input: { textAlign: "right" },
                        }}
                        fullWidth
                      />

                      <FormControl sx={{ gridColumn: "span 2" }}>
                        <TextField
                          name="Remarks"
                          type="text"
                          id="Remarks"
                          label="Remarks"
                          variant="filled"
                          focused
                          sx={{ gridColumn: "span 2" }}
                          // defaultValue={values.MNetweight}

                          value={values.Remarks}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          fullWidth
                        />
                      </FormControl>
                      <TextField
                        name="MNetweight"
                        type="number"
                        id="MNetweight"
                        label="Net Weight (GMS)"
                        variant="filled"
                        focused
                        sx={{ gridColumn: "span 2", background: "#FFDAC0"}}
                        // defaultValue={values.MNetweight}

                        value={netWeightval}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                        fullWidth
                      />
                    </React.Fragment>
                  ) : null}
                </Box>

                <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                  {data.Process != "Y" ? (
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={fnProcess}
                    >
                      Process
                    </Button>
                  ) : null}
                  {Mode == "A" ? (
                    <LoadingButton
                      loading={isPostLoading}
                      variant="contained"
                      type="submit"
                      color="secondary"
                    >
                      SAVE & Confirm
                    </LoadingButton>
                  ) : (
                    <LoadingButton
                      loading={isPostLoading}
                      variant="contained"
                      type="reset"
                      color="secondary"
                    >
                      SAVE & Confirm
                    </LoadingButton>
                  )}

                  {/* {Mode === "E" && exploremode == "A" ? (
                  <Button variant="contained"  type="submit" color="primary">
                    Generate
                  </Button>
                ) : (
                  false
                )} */}
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => {
                      navigate(
                        `/Apps/Secondarylistview/TR087/Packing List/${Type}`
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
            title="Invoice"
            openPopup={openINVPopup}
            setOpenPopup={setOpenINVPopup}
          >
            <Listviewpopup
              accessID="2033"
              screenName="Invoice"
              childToParent={childToParent}
              filterName={""}
              filterValue={"Type IN('P','PL')"}
            />
          </Popup>
          <Popup
            title="Carton"
            openPopup={openCARTPopup}
            setOpenPopup={setOpenCARTPopup}
          >
            <Listviewpopup
              accessID="2043"
              screenName="Carton"
              childToParent={childToParent}
              filterName={"parentID"}
              filterValue={selectCPLookupData.CPlookupRecordid}
            />
          </Popup>
          <Popup
            title="Products"
            openPopup={openPRTPopup}
            setOpenPopup={setOpenPRTPopup}
          >
            <Listviewpopup
              accessID="2045"
              screenName="Products"
              childToParent={childToParent}
              filterValue={`${selectCUSLookupData.CUSlookupRecordid}' AND HeaderID = '${selectINVLookupData.INVlookupRecordid}`}
              filterName="parentID"
            />
          </Popup>
        </Box>
      ) : (
        false
      )}
    </React.Fragment>
  );
};

export default Editpackinglist;
