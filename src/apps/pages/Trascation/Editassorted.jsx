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
  PackingListPostData,
  explorePostData,
  getFetchData,
  postData,
  StockProcessApi,
  cbmCalculation,
} from "../../../store/reducers/Formapireducer";
import { toast } from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
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
const Editassorted = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const CompanyID = sessionStorage.getItem("compID");
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
  useEffect(() => {
    dipatch(getFetchData({ accessID, get: "get", recID: id }));
    var filter = `parentID=${id} AND Type = '${Type}'`;
    dipatch(fetchExplorelitview("TR088", "packinglist", filter, ""));
  }, [location.key]);

  const data = useSelector((state) => state.formApi.Data);
  const isPostLoading = useSelector((state) => state.formApi.postLoading);

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
    CPlookupPrimaryId: "",
    CPlookupSecondaryId: "",
    CPlookupTertiaryId: "",
    CPlookupCode: "",
    CPlookupDesc: "",
  });
  const [selectCARTLookupData, setselectCARTLookupData] = React.useState({
    CARTlookupRecordid: "",
    CARTlookupCode: "",
    CARTLength: "",
    CARTHeight: "",
    CARTBreadth: "",
  });

  const [openINVPopup, setOpenINVPopup] = useState(false);
  const [openPRTPopup, setOpenPRTPopup] = useState(false);
  const [openCARTPopup, setOpenCARTPopup] = useState(false);
  function handleShow(type) {
    if (type == "INV") {
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
        CPlookupPrimaryId: childdata.PrimaryID,
        CPlookupSecondaryId: childdata.SecondaryID,
        CPlookupTertiaryId: childdata.TeriteryID,
      });
      setproductData({
        Length: childdata.Length,
        Breadth: childdata.Width,
        Height: childdata.Height,
        InvoiceQty: childdata.InvoiceQty,
        AssortedSLNO: childdata.AssortedSLNO,
      });

      setOpenPRTPopup(false);
    }
    if (type == "Carton") {
      setselectCARTLookupData({
        CARTlookupRecordid: childdata.MaterialID,
        CARTlookupCode: childdata.Code,
        CARTlookupDesc: childdata.Name,
        CARTBreadth: childdata.Breadth,
        CARTLength: childdata.Length,
        CARTHeight: childdata.Height,
      });

      setCartonData({
        MLength: childdata.Length,
        MBreadth: childdata.Width,
        MHeight: childdata.Height,
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
      Cbm: 0,
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
          `/Apps/Secondarylistview/TR087/Packing List/${Type}/EditAssorted/${response.payload.Recid}/E`
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
    console.log("🚀 ~ file: Editassorted.jsx:320 ~ fnProcess ~ Data:", Data);
    if (Data.payload.Status == "Y") {
      toast.success(Data.payload.Msg);
      navigate(`/Apps/Secondarylistview/TR087/Packing List/${Type}`);
    } else {
      toast.success(Data.payload.Msg);
    }
  };

  const fnCbmCalculation = async () => {
    const data = { HeaderID :  id};
    const Data = await dipatch(cbmCalculation({data}));
    console.log("🚀 ~ file: Editassorted.jsx:320 ~ fnProcess ~ Data:", Data);
    if (Data.payload.Status == "Y") {
      toast.success(Data.payload.Msg);
    } else {
      toast.error(Data.payload.Msg);
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
          <Typography variant="h5">{`(${rowCount})`}</Typography>
          {/* <Typography variant="h5">{`(${explorelistViewData.length})`}</Typography> */}
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
    (state) => state.exploreApi.explorerowData
  );
  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );

  var VISIBLE_FIELDS = [
    "SLNO",
    "ProductCode",
    "ProductName",
    "ActualQty",
    "Remarks",
    "action",
  ];
  const columns = React.useMemo(
    () =>
      explorelistViewcolumn.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
    [explorelistViewcolumn]
  );

  const [exploremode, seExploremode] = useState("A");
  const [cartonData, setCartonData] = useState({
    MLength: "",
    MBreadth: "",
    MHeight: "",
  });
  const [productData, setproductData] = useState({
    Length: "",
    Breadth: "",
    Height: "",
    InvoiceQty: "",
    AssortedSLNO: "",
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
    Remarks: "",
    Startslno: "",
  });

  const selectcelldata = (data, bMode, field) => {
    console.log("selectdata" + JSON.stringify(data));

    seExploremode(bMode);
    if (bMode == "A") {
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
        Remarks: "",
        Startslno: "",
      });
      setselectCPLookupData({
        CPlookupRecordid: "",
        CPlookupPrimaryId: "",
        CPlookupSecondaryId: "",
        CPlookupTertiaryId: "",
        CPlookupCode: "",
        CPlookupDesc: "",
      });
      setselectCARTLookupData({
        CARTlookupRecordid: "",
        CARTlookupCode: "",
        CARTlookupDesc: "",
        CARTBreadth: "",
        CARTLength: "",
        CARTHeight: "",
      });

      setCartonData({
        MHeight: "",
        MLength: "",
        MBreadth: "",
      });
      setproductData({
        Length: "",
        Breadth: "",
        Height: "",
        InvoiceQty: "",
        AssortedSLNO: "",
      });
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
          Remarks: data.Remarks,
          Startslno: data.MStartslno,
        });
        setselectCPLookupData({
          CPlookupRecordid: data.ProductRecordID,
          CPlookupPrimaryId: data.PrimaryID,
          CPlookupSecondaryId: data.SecondaryID,
          CPlookupTertiaryId: data.TeriteryID,
          CPlookupCode: data.ProductCode,
          CPlookupDesc: data.ProductName,
        });
        setselectCARTLookupData({
          CARTlookupRecordid: data.MaterialRecordID,
          CARTlookupCode: data.MaterialCode,
          CARTlookupDesc: data.MaterialName,
          CARTBreadth: data.MBreadth,
          CARTLength: data.MLength,
          CARTHeight: data.MHeight,
        });

        setCartonData({
          MHeight: data.MHeight,
          MLength: data.MLength,
          MBreadth: data.MBreadth,
        });
        setproductData({
          Length: data.Length,
          Breadth: data.Breadth,
          Height: data.Height,
          InvoiceQty: data.ActualQty,
          AssortedSLNO: data.MStartslno,
        });
      }
    }
  };

  const initialValue = {
    cbm: data.Cbm,
    carton: detailData.carton,
    length: productData.Length,
    width: productData.Breadth,
    height: productData.Height,
    quantity: detailData.quantity,
    grossWeight: detailData.grossWeight,
    netWeight: detailData.netWeight,
    MStartslno: productData.AssortedSLNO,
    MCarton: detailData.MCarton,
    MLength: cartonData.MLength,
    MBreadth: cartonData.MBreadth,
    MHeight: cartonData.MHeight,
    MQuantity: productData.InvoiceQty,
    MGrossweight: detailData.MGrossweight,
    Startslno: detailData.Startslno,
    Remarks: detailData.Remarks,
  };

  const ref = useRef();

  const fnListOfItem = async (values, resetForm) => {
    const idata = {
      id: "0",
      RecordID: detailData.RecordID,
      PackinghdrRecordID: id,
      ProductRecordID: selectCPLookupData.CPlookupRecordid,
      PrimaryID: selectCPLookupData.CPlookupPrimaryId,
      SecondaryID: selectCPLookupData.CPlookupSecondaryId,
      TeriteryID: selectCPLookupData.CPlookupTertiaryId,
      Length: 0,
      Breadth: 0,
      Height: 0,
      Quantity: 0,
      MaterialRecordID: selectCARTLookupData.CARTlookupRecordid,
      MLength:selectCARTLookupData.CARTLength,
      MBreadth:selectCARTLookupData.CARTBreadth,
      MHeight:selectCARTLookupData.CARTHeight,
      MaximumCapacity: 0,
      ActualQty: values.MQuantity,
      MStartslno: values.MStartslno,
      MCarton: 1,
      MGrossweight: 0,
      MNetweight: 0,
      Otherweight: 0,
      Type: Type,
      Remarks: values.Remarks,
      Sap: 0,
      MQuantity: 0,
    };

    var action = "insert";
    if (exploremode == "A") {
      action = "insert";
    } else {
      action = "update";
    }

    const response = await dipatch(
      PackingListPostData({
        accessID: "TR088",
        action,
        idata: idata,
        Type: Type,
      })
    );
    console.log(
      "🚀 ~ file: Editpackinglist.jsx:135 ~ fnHeaderSave ~ response:",
      response
    );
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      const reset = ref.current.resetForm;
      selectcelldata("", "A", "");
      resetForm();
      var filter = `parentID=${id} AND Type = '${Type}'`;
      dipatch(fetchExplorelitview("TR088", "packinglist", filter, ""));
    } else {
      toast.error(response.payload.Msg);
    }
  };

  const AntTabs = styled(Tabs)({
    borderBottom: "1px solid #e8e8e8",
    "& .MuiTabs-indicator": {
      backgroundColor: "#1890ff",
    },
  });

  const AntTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: "none",
      minWidth: 0,
      [theme.breakpoints.up("sm")]: {
        minWidth: 0,
      },
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(1),
      color: "rgba(0, 0, 0, 0.85)",
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:hover": {
        color: "#40a9ff",
        opacity: 1,
      },
      "&.Mui-selected": {
        color: "#1890ff",
        fontWeight: theme.typography.fontWeightMedium,
      },
      "&.Mui-focusVisible": {
        backgroundColor: "#d1eaff",
      },
    })
  );

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

  return (
    <React.Fragment>
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
              Assorted
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

      <Box m="20px">
        <Formik
          innerRef={ref}
          initialValues={initialValue}
          onSubmit={(values, { resetForm }) => {
            setTimeout(() => {
              Mode == "A"
                ? fnHeaderSave(values)
                : fnListOfItem(values, resetForm);
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
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gridTemplateColumns="repeat(4 , minMax(0,1fr))"
                gap="30px"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
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
                  {/* <TextField
                    name="cbm"
                    type="number"
                    id="cbm"
                    label="CBM"
                    variant="filled"
                    focused
                    value={values.cbm}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{ background: "#fff6c3" }}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
                  /> */}
                </FormControl>
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
                              selectcelldata(currentRow, "E", currentcellField);
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
                          <TextField
                            id="psDesc"
                            label=""
                            variant="filled"
                            value={selectCARTLookupData.CARTlookupDesc}
                            fullWidth
                            inputProps={{ tabIndex: "-1" }}
                            focused
                          />
                        </FormControl>
                      </FormControl>
                      <TextField
                        name="MQuantity"
                        type="number"
                        id="MQuantity"
                        label="Quanity"
                        variant="filled"
                        sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                        focused
                        value={values.MQuantity}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onWheel={(e) => e.target.blur()} 
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                      />
                      <TextField
                        name="MStartslno"
                        type="number"
                        id="MStartslno"
                        label="Serial Number"
                        variant="filled"
                        sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                        focused
                        value={values.MStartslno}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onWheel={(e) => e.target.blur()} 
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                      />

                      <TextField
                        name="Remarks"
                        type="text"
                        id="Remarks"
                        label="Remarks"
                        variant="filled"
                        focused
                        sx={{ gridColumn: "span 2" }}
                        value={values.Remarks}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        fullWidth
                      />
                    </FormControl>
                  </React.Fragment>
                ) : null}
              </Box>

              <Box display="flex" justifyContent="end" mt="20px" gap="20px">
             
                  <Button
                    color="info"
                    variant="contained"
                    onClick={fnCbmCalculation}
                  >
                    Cbm
                  </Button>
                
                {data.Process != "Y" ? (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={fnProcess}
                  >
                    Process
                  </Button>
                ) : null}
                <LoadingButton
                  loading={isPostLoading}
                  variant="contained"
                  type="submit"
                  color="secondary"
                >
                  SAVE
                </LoadingButton>
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
            filterName={"compID"}
            filterValue={CompanyID}
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
    </React.Fragment>
  );
};

export default Editassorted;
