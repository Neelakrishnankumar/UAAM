import React from "react";
import {
  TextField,
  Box,
  Typography,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  useTheme,
  Checkbox,
  Breadcrumbs,
  FormControlLabel,
  LinearProgress,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Formik, Field } from "formik";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
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
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Form } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  explorePostData,
  getFetchData,
  postData,
  StockProcessApi,
} from "../../../store/reducers/Formapireducer";
import Popup from "../popup";
import Listviewpopup from "../Lookup";
import { toast } from "react-hot-toast";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
const Editpacking = () => {
  // *************** PAGE VARIABLES *************** //
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const yearData = sessionStorage.getItem("year");
  const yearFlag = sessionStorage.getItem("YearFlag");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const year = sessionStorage.getItem("year");
  const getLoading = useSelector((state) => state.formApi.getLoading);

  // *************** PAGE PARAMS *************** //
  const recID = params.id;
  const mode = params.Mode;
  const accessID = params.accessID;

  // *************** CALL REDUX ACTION TO GET DATA *************** //
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
    if (mode === "E") {
      dispatch(fetchExplorelitview("TR110", "packinglist", recID, ""));
    }
  }, [location.key]);

  // *************** REDUX STATES *************** //
  const data = useSelector((state) => state.formApi.Data);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const ref = useRef(null);

  // *************** HEADER PAGE LOOKUP  *************** //
  const [isPopupData, setisPopupdata] = useState(false);

  // INVOICE
  const [invoiceLookup, setInvoiceLookup] = useState({
    invRecordID: "",
    invCode: "",
    invName: "",
  });

  // Leather
  const [leatherLookup, setLeatherLookup] = useState({
    leaRecordID: "",
    leaCode: "",
    leaName: "",
  });

  // CUSTOMER
  const [customerLookup, setCustomerLookup] = useState({
    cusRecordID: "",
    cusCode: "",
    cusName: "",
  });

  // MATERIAL
  const [materialLookup, setMaterialLookup] = useState({
    matRecordID: "",
    matCode: "",
    matName: "",
  });
  const [openCusPopup, setOpenCusPopup] = useState(false);
  const [openLeaPopup, setOpenLeaPopup] = useState(false);
  const [openInvPopup, setOpenInvPopup] = useState(false);
  const [openMatPopup, setOpenMatPopup] = useState(false);

  function openPopup(type) {
    if (type == "CUS") {
      setOpenCusPopup(true);
    }
    if (type == "LEA") {
      setOpenLeaPopup(true);
    }
    if (type == "INV") {
      setOpenInvPopup(true);
    }
    if (type == "MAT") {
      setOpenMatPopup(true);
    }
  }

  const childToParent = async (childdata, type) => {
    console.log(
      "🚀 ~ file: Editcosting.jsx:134 ~ childToParent ~ childdata:",
      childdata
    );
    if (type == "Customer") {
      setisPopupdata(true);
      setCustomerLookup({
        cusRecordID: childdata.RecordID,
        cusCode: childdata.Code,
        cusName: childdata.Name,
      });
      setOpenCusPopup(false);
    }

    if (type == "Leather") {
      setisPopupdata(true);
      setLeatherLookup({
        leaRecordID: childdata.RecordID,
        leaCode: childdata.Code,
        leaName: childdata.Name,
      });
      setOpenLeaPopup(false);
    }

    if (type == "Invoice") {
      setisPopupdata(true);
      setInvoiceLookup({
        invRecordID: childdata.RecordID,
        invCode: childdata.Code,
        invName: childdata.Name,
      });
      setCustomerLookup({
        cusRecordID: childdata.CustomerRecordID,
        cusCode: childdata.CustomerCode,
        cusName: childdata.CustomerName,
      });
      setOpenInvPopup(false);
    }
    if (type == "Material") {
      setisPopupdata(true);
      setMaterialLookup({
        matRecordID: childdata.RecordID,
        matCode: childdata.Code,
        matName: childdata.Name,
      });
      setOpenMatPopup(false);
    }
  };

  if (!isPopupData) {
    // INVOICE
    invoiceLookup.invRecordID = data.InvoiceID;
    invoiceLookup.invCode = data.InvoiceNo;
    invoiceLookup.invName = data.InvoiceDate;

    // MATERIAL
    leatherLookup.leaRecordID = data.MaterialCategoryID;
    leatherLookup.leaCode = data.MaterialCategoryCode;
    leatherLookup.leaName = data.MaterialCategoryDescription;

    // CUSTOMER
    customerLookup.cusRecordID = data.CustomerID;
    customerLookup.cusCode = data.CustomerCode;
    customerLookup.cusName = data.CustomerName;
  }

  // *************** HEADER SCREEN SAVE FUNCTION *************** //

  const headerSaveFn = async (values) => {
    let action = mode === "A" ? "insert" : "update";
    const idata = {
      RecordID: recID,
      InvoiceID: invoiceLookup.invRecordID,
      CustomerID: customerLookup.cusRecordID,
      MaterialCategoryID: leatherLookup.leaRecordID,
      PackingDate: values.packingDate,
      NoofBundles: values.nofBundles,
      CompanyID,
      Finyear,
    };

    const response = await dispatch(postData({ accessID, action, idata }));
    console.log(
      "🚀 ~ file: Editpacking.jsx:207 ~ headerSaveFn ~ response:",
      response
    );
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate(`/Apps/TR109/Leather Packing List`);
    } else {
      toast.error(response.payload.Msg);
    }
  };
  const fnProcess = async () => {
    const props = { accessID, recID };
    const Data = await dispatch(StockProcessApi(props));
    console.log("🚀 ~ file: Editpacking.jsx:320 ~ fnProcess ~ Data:", Data);
    if (Data.payload.Status == "Y") {
      toast.success(Data.payload.Msg);
      navigate(`/Apps/TR109/Leather Packing List`);
    } else {
      toast.success(Data.payload.Msg);
    }
  };
  // *************** PACKING DETAIL SCREEN *************** //

  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );
  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );
  // console.log("🚀 ~ file: Editpacking.jsx:207 ~ Editpacking ~ explorelistViewcolumn:", explorelistViewcolumn)

  var VISIBLE_FIELDS = [
    "SLNO",
    "MaterialCode",
    "MaterialDescription",
    "NoOfPieces",
    "action",
  ];
  const columns = React.useMemo(
    () =>
      explorelistViewcolumn.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
    [explorelistViewcolumn]
  );
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
          <Typography>List of Packing</Typography>
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
          <IconButton
            onClick={() => selectRowData({ rowData: {}, mode: "A", field: "" })}
          >
            <AddOutlinedIcon />
          </IconButton>
        </Box>
      </GridToolbarContainer>
    );
  }
  const [pageSize, setPageSize] = React.useState(10);

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
          navigate("/Apps/TR109/Leather Packing List");
        }
      } else {
        return;
      }
    });
  };

  const [exploremode, seExploremode] = useState("A");
  const [Color, setColor] = useState();
  const [detailData, setDetailData] = useState({
    detailRecordID: "",
    rollOfNumber: "",
    noOfPieces: "",
    totalSqft: "",
    weight: "",
    length: "",
    breath: "",
    height: "",
    cbm: "",
    sortOrder: "",
    boxnumber: "",
    Sameplist: "",
    noofRolles: "",
  });

  const selectRowData = ({ rowData, mode, field }) => {
    console.log(
      "🚀 ~ file: Editpacking.jsx:311 ~ selectRowData ~ rowData:",
      rowData
    );
    console.log("data1--", rowData.Sameplist);
    setColor(rowData.Sameplist);
    seExploremode(mode);
    if (mode == "A") {
      setDetailData({
        detailRecordID: "",
        rollOfNumber: "",
        noOfPieces: "",
        totalSqft: "",
        weight: "",
        length: "",
        breadth: "",
        height: "",
        cbm: "",
        sortOrder: "",
        boxnumber: "",
        Sameplist: rowData.Sameplist,
        noofRolles:""
      });
      setMaterialLookup({
        matRecordID: "",
        matCode: "",
        matName: "",
      });
    } else {
      if (field == "action") {
        console.log("data2--", rowData.Sameplist);
        setMaterialLookup({
          matRecordID: rowData.MaterialID,
          matCode: rowData.MaterialCode,
          matName: rowData.MaterialDescription,
        });
        setDetailData({
          detailRecordID: rowData.RecordID,
          rollOfNumber: rowData.RollNumbers,
          noOfPieces: rowData.NoOfPieces,
          totalSqft: rowData.TotalSqft,
          weight: rowData.Weight,
          length: rowData.Length,
          breadth: rowData.Breadth,
          height: rowData.Height,
          cbm: rowData.CBM,
          sortOrder: rowData.SortOrder,
          boxnumber: rowData.boxnumber,
          Sameplist: rowData.Sameplist,
          noofRolles: rowData.noofRolles,
        });
      }
    }
  };

  const headerInitialValue = {
    packingDate: data.Date,
    nofBundles: data.NoofBundles,
    rollOfNumber: detailData.rollOfNumber,
    noOfPieces: detailData.noOfPieces,
    totalSqft: detailData.totalSqft,
    weight: detailData.weight,
    length: detailData.length,
    breadth: detailData.breadth,
    height: detailData.height,
    cbm: detailData.cbm,
    sortOrder: detailData.sortOrder,
    boxnumber: detailData.boxnumber,
    Sameplist: detailData.Sameplist,
    noofRolles:detailData.noofRolles
  };
  console.log("type" + detailData.Sameplist);

  const detailPackingFn = async (values, resetForm, del) => {
    let action =
      exploremode === "A" && !del
        ? "insert"
        : exploremode === "E" && del
        ? "harddelete"
        : "update";
    if (values.Sameplist == true) {
      values.Sameplist = "Y";
    } else {
      values.Sameplist = "N";
    }
    const idata = {
      RecordID: exploremode === "A" ? "-1" : detailData.detailRecordID,
      ParentID: recID,
      MaterialID: materialLookup.matRecordID,
      MaterialCategoryID: leatherLookup.leaRecordID,
      NoofRolls: values.rollOfNumber,
      RollNumbers: values.rollOfNumber,
      NoofPieces: values.noOfPieces,
      TotalSqft: values.totalSqft,
      Weight: values.weight,
      Length: values.length,
      Breadth: values.breadth,
      Height: values.height,
      CBM: values.cbm,
      SortOrder: values.sortOrder,
      BoxNumber: values.boxnumber,
      YearID: year,
      Sameplist: values.Sameplist,
      noofRolles:values.noofRolles
    };
    console.log(idata);
    const response = await dispatch(
      explorePostData({ accessID: "TR110", action, idata })
    );
    console.log(
      "🚀 ~ file: Editproduct.jsx:420 ~ productBomFn ~ response:",
      response
    );
    if (response.payload.Status == "Y") {
      setDetailData({
        detailRecordID: "",
        rollOfNumber: "",
        noOfPieces: "",
        totalSqft: "",
        weight: "",
        length: "",
        breadth: "",
        height: "",
        cbm: "",
        sortOrder: "",
        boxnumber: "",
        Sameplist: "",
      });
      setMaterialLookup({
        matRecordID: "",
        matCode: "",
        matName: "",
      });
      await dispatch(fetchExplorelitview("TR110", "BOM", recID, ""));
      toast.success(response.payload.Msg);

      selectRowData({ rowData: {}, mode: "A", field: "" });
      resetForm();
    } else {
      toast.error(response.payload.Msg);
    }
  };

  const handlecheckboxChange = (e) => {
    console.log(e.target.value);
  };

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
            maxItems={3}
            aria-label="breadcrumb"
            separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
          >
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate(`/Apps/TR109/Leather%20Packing%20List`);
              }}
            >
              Leather Packing List
            </Typography>
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              Leather Packing
            </Typography>
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              {mode === "A" ? "New" : customerLookup.cusName}
            </Typography>
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
            initialValues={headerInitialValue}
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
              setTimeout(() => {
                mode === "A"
                  ? headerSaveFn(values, resetForm)
                  : detailPackingFn(values, resetForm, false);
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
                      label="Invoice ID"
                      variant="filled"
                      focused
                      inputProps={{ tabIndex: "-1" }}
                      value={invoiceLookup.invCode}
                      required
                    />
                    <IconButton
                      onClick={() => openPopup("INV")}
                      sx={{ height: 40, width: 40 }}
                    >
                      <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                    </IconButton>
                    <TextField
                      value={invoiceLookup.invName}
                      id="outlined-basic"
                      variant="filled"
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
                      gridColumn: "span 2",
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Consignee"
                      variant="filled"
                      focused
                      inputProps={{ tabIndex: "-1" }}
                      value={customerLookup.cusCode}
                      required
                    />
                    <IconButton
                      // onClick={() => openPopup("CUS")}
                      sx={{ height: 40, width: 40 }}
                    >
                      <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                    </IconButton>
                    <TextField
                      value={customerLookup.cusName}
                      id="outlined-basic"
                      variant="filled"
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
                      gridColumn: "span 2",
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Article"
                      variant="filled"
                      focused
                      inputProps={{ tabIndex: "-1", readOnly: true }}
                      value={leatherLookup.leaCode}
                    />
                    <IconButton
                      onClick={() => openPopup("LEA")}
                      sx={{ height: 40, width: 40 }}
                    >
                      <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                    </IconButton>
                    <TextField
                      value={leatherLookup.leaName}
                      id="outlined-basic"
                      variant="filled"
                      fullWidth
                      inputProps={{ tabIndex: "-1", readOnly: true }}
                      focused
                    />
                  </Box>
                  <TextField
                    name="packingDate"
                    type="date"
                    id="packingDate"
                    label="Date"
                    variant="filled"
                    sx={{ gridColumn: "span 2" }}
                    focused
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.packingDate}
                    inputFormat="YYYY-MM-DD"
                  />
                  <TextField
                    name="nofBundles"
                    type="text"
                    id="nofBundles"
                    label="No.Of Bundles"
                    variant="filled"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nofBundles}
                    focused
                    sx={{
                      gridColumn: "span 2",
                      background: "#fff6c3",
                      input: { textAlign: "right" },
                    }}
                  />
                  <FormControl
                    fullWidth
                    sx={{ gridColumn: "span 2", gap: "40px" }}
                  >
                    {""}
                  </FormControl>

                  {mode === "E" && (
                    <React.Fragment>
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
                              onCellClick={(params) =>
                                selectRowData({
                                  rowData: params.row,
                                  mode: "E",
                                  field: params.field,
                                })
                              }
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
                        sx={{ gridColumn: "span 2", gap: "40px", mt: 5 }}
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
                            label="Article No"
                            variant="filled"
                            focused
                            inputProps={{ tabIndex: "-1" }}
                            value={materialLookup.matCode}
                            required
                          />
                          <IconButton
                            onClick={() => openPopup("MAT")}
                            sx={{ height: 40, width: 40 }}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>
                          <TextField
                            label="Article Name"
                            variant="filled"
                            fullWidth
                            inputProps={{ tabIndex: "-1" }}
                            value={materialLookup.matName}
                            focused
                          />
                        </Box>
                        <TextField
                          name="rollOfNumber"
                          type="text"
                          id="rollOfNumber"
                          label="Roll Number"
                          variant="filled"
                          sx={{ gridColumn: "span 2" }}
                          focused
                          onWheel={(e) => e.target.blur()} 
                          value={values.rollOfNumber}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <TextField
                          name="noOfPieces"
                          type="number"
                          id="noOfPieces"
                          label="No.Of Pieces "
                          variant="filled"
                          sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                          focused
                          onWheel={(e) => e.target.blur()} 
                          value={values.noOfPieces}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                        />
                        <TextField
                          name="totalSqft"
                          type="number"
                          id="totalSqft"
                          label="Total Sq.feet"
                          variant="filled"
                          sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                          focused
                          onWheel={(e) => e.target.blur()} 
                          value={values.totalSqft}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                        />
                          <TextField
                          name="length"
                          type="number"
                          id="length"
                          label="Length(cm)"
                          variant="filled"
                          sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                          focused
                          onWheel={(e) => e.target.blur()} 
                          value={values.length}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                        />
                         <TextField
                        name="breadth"
                        type="number"
                        id="breadth"
                        label="Breadth(cm)"
                        variant="filled"
                        sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                        focused
                        onWheel={(e) => e.target.blur()} 
                        value={values.breadth}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                      />
                      
                      </FormControl>
                      <TextField
                        name="weight"
                        type="number"
                        id="weight"
                        label="Weight(Kgs)"
                        variant="filled"
                        sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                        focused
                        onWheel={(e) => e.target.blur()} 
                        value={values.weight}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                      />
 <TextField
                          name="height"
                          type="number"
                          id="height"
                          label="Height(cm)"
                          variant="filled"
                          sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                          focused
                          onWheel={(e) => e.target.blur()} 
                          value={values.height}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                        />
                    

                      <TextField
                        name="cbm"
                        type="number"
                        id="cbm"
                        label="CBM"
                        variant="filled"
                        sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                        focused
                        onWheel={(e) => e.target.blur()} 
                        value={values.cbm}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                      />
                      <TextField
                        name="noofRolles"
                        type="number"
                        id="noofRolles"
                        label="No of Rolles"
                        variant="filled"
                        sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                        focused
                        onWheel={(e) => e.target.blur()} 
                        value={values.noofRolles}
                        onBlur={handleBlur}
                        onChange={handleChange}
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
                        label="Sort order"
                        variant="filled"
                        sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                        focused
                        onWheel={(e) => e.target.blur()} 
                        value={values.sortOrder}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                      />
                      <TextField
                        name="boxnumber"
                        type="number"
                        id="boxnumber"
                        label="Box Number"
                        variant="filled"
                        sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                        focused
                        onWheel={(e) => e.target.blur()} 
                        value={values.boxnumber}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                      />

                      <Box>
                        {/* <Field type="checkbox" name="newsletter" checked={Color||values.Sameplist} /> */}
                        <Field
                          type="checkbox"
                          name="Sameplist"
                          id="Sameplist"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          as={Checkbox}
                          label="checkbox"
                        />
                        <FormLabel focused={false}>Use Sameplist</FormLabel>
                        {/* <FormControl
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <FormControl sx={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
                        <FormControlLabel control={<Field type="checkbox" name="Sameplist" id="Sameplist"  label="Sameplist" onChange={handleChange} />} label="Sameplist" />
        
                            
                       </FormControl>
                      
                      </FormControl>  */}
                      </Box>
                    </React.Fragment>
                  )}
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
                  <LoadingButton
                    variant="contained"
                    color="secondary"
                    type="submit"
                  >
                    SAVE
                  </LoadingButton>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      navigate("/Apps/TR109/Leather Packing List");
                    }}
                  >
                    CANCEL
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          <Popup
            title="Customer"
            openPopup={openCusPopup}
            setOpenPopup={setOpenCusPopup}
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
            title="Leather"
            openPopup={openLeaPopup}
            setOpenPopup={setOpenLeaPopup}
          >
            <Listviewpopup
              accessID="2070"
              screenName="Leather"
              childToParent={childToParent}
              filterName="parentID"
              filterValue={invoiceLookup.invRecordID}
            />
          </Popup>
          <Popup
            title="Invoice"
            openPopup={openInvPopup}
            setOpenPopup={setOpenInvPopup}
          >
            <Listviewpopup
              accessID="2033"
              screenName="Invoice"
              childToParent={childToParent}
              filterName={""}
              filterValue={`Type IN('L','LL') AND compID = '${CompanyID}'`}
            />
          </Popup>
          <Popup
            title="Material"
            openPopup={openMatPopup}
            setOpenPopup={setOpenMatPopup}
          >
            <Listviewpopup
              accessID="2013"
              screenName="Material"
              childToParent={childToParent}
              filterName={"parentID"}
              filterValue={`parentID=${leatherLookup.leaRecordID} AND InvoiceID=${invoiceLookup.invRecordID}`}
            />
          </Popup>
        </Box>
      ) : (
        false
      )}
    </React.Fragment>
  );
};

export default Editpacking;
