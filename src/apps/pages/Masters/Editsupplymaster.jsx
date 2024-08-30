import {
  InputLabel,
  useTheme,
  MenuItem,
  Box,
  Breadcrumbs,
  Button,
  TextField,
  Stack,
  IconButton,
  Avatar,
  FormLabel,
  FormControl,
  Typography,
  Select,
  Tooltip,
  Checkbox,
  LinearProgress,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Formik, Field } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../index";
import {
  explorePostData,
  fetchApidata,
  getFetchData,
  postApidata,
  postApidatawol,
  postData,
  supplierTrackFetch,
} from "../../../store/reducers/Formapireducer";
import { fetchComboData1 } from "../../../store/reducers/Comboreducer";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import basicSchema from "../../Security/validation";
import {
  suppliersSchema,
  supmaterialSchema,
  supnotifySchema,
} from "../../Security/validation";
import Listviewpopup from "../Lookup";
import Popup from "../popup";
import { tokens } from "../../../Theme";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SupplierBarChart from "./supplierTrackingChart";
// ***********************************************
//  Developer:Gowsalya
// Purpose:Create supply

// ***********************************************
const Editsupplymaster = () => {
  const [pageSize, setPageSize] = React.useState(10);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const YearFlag = sessionStorage.getItem("YearFlag");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  const Data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.loading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const postLoading = useSelector((state) => state.formApi.postLoading);
  const exploreLoading = useSelector((state) => state.exploreApi.loading);
  sessionStorage.setItem("recID", recID);

  const { toggleSidebar, broken, rtl } = useProSidebar();
  const [openSMPopup, setOpenSMPopup] = useState(false);

  var loginrecid = sessionStorage.getItem("loginRecid");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  // console.log(loginrecid);
  // ************Lookup Function***************
  function handleShow(type) {
    if (type == "SM") {
      setOpenSMPopup(true);
    }
  }

  useEffect(() => {
    // dispatch(fetchApidata(accessID, "get", recID));
    dispatch(getFetchData({accessID,get:"get", recID}));
    // dispatch(fetchComboData1("TR002", "getall", recID, "ProductCategory"));
  }, [location.key]);
  // save
  const [ini, setIni] = useState(true);
  const [iniNotification, setIniNotification] = useState(true);
  const [loading, setLoading] = useState(false);
  const Year = sessionStorage.getItem("year");
  const [iniMaterial, setIniMaterial] = useState(true);
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

  //*******Assign supplymaster values from Database in  Yup initial value******* */
  const initialValues = {
    Gst: Data.Gst,
    Suppliertype: Data.Suppliertype,
    Cst: Number(Data.Cst).toFixed(2),
    Tngst: Number(Data.Tngst).toFixed(2),
    Email: Data.Email,
    Fax: Data.Fax,
    Code: Data.Code,
    Ph1: Data.Ph1,
    Address3: Data.Address3,
    Address2: Data.Address2,
    Address1: Data.Address1,
    Name: Data.Name,
    Ph2: Data.Ph2,
    SortOrder: Data.SortOrder,
    checkbox: Data.Disable == "Y" ? true : false,
    Jobwork: Data.Jobwork == "Y" ? true : false,
  };

  // **********Save Function*****************
  const fnSave = async (values) => {
    var idata = {
      RecordID: Data.RecordID,
      Gst: values.Gst,
      Suppliertype: values.Suppliertype,
      Cst: 0,
      Tngst: "0",
      YearID: Year,
      Email: values.Email,
      Fax: values.Fax,
      Code: values.Code,
      Ph1: values.Ph1,
      Address3: values.Address3,
      Address2: values.Address2,
      Address1: values.Address1,
      Name: values.Name,
      Ph2: values.Ph2,
      SortOrder: values.SortOrder,
      Disable: values.checkbox == true ? "Y" : "N",
      Jobwork: values.Jobwork == true ? "Y" : "N",
      Finyear,
      CompanyID,
    };
    let action = mode === "A" ? "insert" : "update";
    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      if (mode === "A") {
        navigate(
          `/Apps/TR009/Suppliers/EditSuppliers/${response.payload.Recid}/E`
        );
      }
    } else {
      toast.error(response.payload.Msg ? response.payload.Msg : "Error");
    }
  };

  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );
  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );
  const [show, setScreen] = React.useState("0");
  // material
  const [supmatedata, setsupmatedata] = useState({
    RecordID: "",
    AgreedPrice: "",
    OrderQty: "",
    DeliverQty: "",
    PendingQty: "",
    SortOrder: "",
    Disable: "",
  });
  const [boMode, setBomode] = useState("A");
  // notify
  const [supnotifyedata, setsupnotifyedata] = useState({
    RecordID: "",
    NotifyType: "",
    Purpose: "",
    Response: "",
    SortOrder: "",
    Disable: "",
  });
  const [bonotifyMode, setnotifyBomode] = useState("A");
  const [SuppliertrackRow, setSuppliertrackRow] = useState({});
  const [code, setcode] = useState("");
  const [desc, setdesc] = useState("");
  // **********ScreenChange Function*********
  const handleChange = async (event) => {
    setScreen(event.target.value);
    setcode(Data.Code);
    setdesc(Data.Name);
    if (event.target.value == "1") {
      dispatch(
        fetchExplorelitview("TR019", "Supplier Master", `parentID=${recID}`, "")
      );
      // dispatch(fetchApidata(accessID, "get", recID));
      selectcelldata("", "A", "");
    }
    if (event.target.value == "2") {
      dispatch(
        fetchExplorelitview("TR020", "Supplier Notification", recID, "")
      );
      // dispatch(fetchApidata(accessID, "get", recID));
      selectNotifycelldata("", "A", "");
    }
    if (event.target.value == "3") {
      const data = await dispatch(supplierTrackFetch(recID));
      console.log("--payload--" + JSON.stringify(data.payload.apiResponse));
      var TrackingRow = data.payload.apiResponse;
      setSuppliertrackRow(data.payload.apiResponse);
    }
  };
  console.log(SuppliertrackRow);

  const Trackincolumns = [
    { field: "SLNO", headerName: "SLNO", headerAlign: "center" },
    { field: "Id", headerName: "Id", hide: true, headerAlign: "center" },
    { field: "Date", headerName: "Date", headerAlign: "center" },
    {
      field: "DcNo",
      headerName: "DcNo",
      headerAlign: "center",
    },
    {
      field: "Type",
      headerName: "Type",
      headerAlign: "center",
    },
    {
      field: "Code",
      headerName: "Code",
      editable: true,
      headerAlign: "center",
    },
    {
      field: "Material",
      headerName: "Material",
      editable: true,
      headerAlign: "center",
      width: 150,
    },
    {
      field: "Quantity",
      headerName: "Quantity",
      editable: true,
      headerAlign: "center",
    },
    {
      field: "RemarkCode",
      headerName: "RemarkCode",
      editable: true,
      headerAlign: "center",
    },
    {
      field: "TransactionType",
      headerName: "TransactionType",
      editable: true,
      headerAlign: "center",
    },
  ];

  //*************************MATERIAL Lookup Data ****************/

  const [isPopupData, setisPopupdata] = React.useState(false);
  const [selectSMLookupData, setselectSMLookupData] = React.useState({
    SMlookupRecordid: "",
    SMlookupCode: "",
    SMlookupDesc: "",
  });
  //************************** Lookup value assign type based Function *****************/
  const childToParent = (childdata, type) => {
    console.log("type---" + type);
    console.log("Data---" + JSON.stringify(childdata));

    if (type == "Supplier Material") {
      setselectSMLookupData({
        SMlookupRecordid: childdata.RecordID,
        SMlookupCode: childdata.Code,
        SMlookupDesc: childdata.Name,
      });
      setOpenSMPopup(false);
    }
  };

  /******************  Supplier values assign a state variale******************** */
  const selectcelldata = (data, bMode, field) => {
    console.log("selectdata" + JSON.stringify(data));

    setBomode(bMode);
    setIniNotification(true);
    setIniMaterial(true);
    if (bMode == "A") {
      setsupmatedata({
        RecordID: "",
        AgreedPrice: "",
        OrderQty: "",
        DeliverQty: "",
        PendingQty: "",
        SortOrder: "",
        Disable: data.Disable,
      });
      setselectSMLookupData({
        SMlookupRecordid: "",
        SMlookupCode: "",
        SMlookupDesc: "",
      });
    } else {
      if (field == "action") {
        setsupmatedata({
          RecordID: data.RecordID,
          AgreedPrice: data.AgreedPrice,
          OrderQty: data.OrderQty,
          DeliverQty: data.DeliverQty,
          PendingQty: data.PendingQty,
          SortOrder: data.SortOrder,
          Disable: data.Disable,
        });
        setselectSMLookupData({
          SMlookupRecordid: data.MtlRecordID,
          SMlookupCode: data.MaterialCode,
          SMlookupDesc: data.MaterialName,
        });
      }
    }
  };
  //*******Assign supplier material values from Grid table in  Yup initial value******* */
  const supmateInitialvalues = {
    // AgreedPrice: supmatedata.AgreedPrice,
    AgreedPrice: Number(supmatedata.AgreedPrice).toFixed(3),
    OrderQty: supmatedata.OrderQty,
    DeliverQty: supmatedata.DeliverQty,
    PendingQty: supmatedata.PendingQty,
    SortOrder: supmatedata.SortOrder,
    checkbox: supmatedata.Disable,
  };
  /******************  Supplier notification values assign a state variale******************** */
  const selectNotifycelldata = (datanotify, notifyMode, fieldvalue) => {
    console.log("selectdata" + JSON.stringify(datanotify));

    setnotifyBomode(notifyMode);

    if (notifyMode == "A") {
      setsupnotifyedata({
        RecordID: "",
        NotifyType: "",
        Purpose: "",
        Response: "",
        SortOrder: "",
        Disable: datanotify.Disable,
      });
    } else {
      if (fieldvalue == "action") {
        setsupnotifyedata({
          RecordID: datanotify.RecordID,
          NotifyType: datanotify.NotifyType,
          Purpose: datanotify.Purpose,
          Response: datanotify.Response,
          SortOrder: datanotify.SortOrder,
          Disable: datanotify.Disable,
        });
      }
    }
  };
  //*******Assign supplier notification values from Grid table in  Yup initial value******* */
  const supNotifyInitialvalues = {
    NotifyType: supnotifyedata.NotifyType,
    Purpose: supnotifyedata.Purpose,
    Response: supnotifyedata.Response,
    SortOrder: supnotifyedata.SortOrder,
    checkbox: supnotifyedata.Disable,
  };




  // clear form
  const clrnotifyForm = () => {
    setsupnotifyedata({
      RecordID: "",
      NotifyType: "",
      Purpose: "",
      Response: "",
      SortOrder: "",
      Disable: "",
    });

    selectNotifycelldata("", "A", "");
  };

  /******************************supplier material Save  FUNCTION********** */
  const fnmaterialSave = async (values, resetForm, del) => {
    if(!del){

      setLoading(true)
    }
    if (del) {
      if (supmatedata.RecordID == "") {
        toast.error("Please Select Supplier Material");
        setLoading(false);
        return;
      }
    }





    const idata = {
          RecordID: supmatedata.RecordID,
          AgreedPrice: values.AgreedPrice,
          OrderQty: "0",
          DeliveredQty: "0",
          PendingQty: "0",
          SortOrder: values.SortOrder,
          Disable: 0,
          MtlRecordID: selectSMLookupData.SMlookupRecordid,
          SuppRecordID: recID,
          ApprovedPrice: 0,
          LatestPrice: 0,
          LatestPurchaseDate: 0,
          LatestPurchaseQty: 0,
          ReorderQty: 0,
          Location: 0,
          Ratingormark: 0,
          LeadTime: 0,
          Type: "S",
          Finyear,
          CompanyID,
        }

   

    let action =
      boMode === "A" && !del
        ? "insert"
        : boMode === "E" && del
        ? "harddelete"
        : "update";
    // const data = await dispatch(postApidata("TR019", type, saveData));
    const response = await dispatch(
      explorePostData({ accessID: "TR019", action, idata })
    );
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      setLoading(false);
      dispatch(
        fetchExplorelitview("TR019", "Supplier Master", `parentID=${recID}`, "")
      );
      resetForm();
      setsupmatedata({
        RecordID: "",
        AgreedPrice: "",
        OrderQty: "",
        DeliverQty: "",
        PendingQty: "",
        SortOrder: "",
        Disable: "",
      });
      selectcelldata("", "A", "");
    } else {
      toast.error(response.payload.Msg);
      setLoading(false);
    }
  };

  function handleClick(values) {
    // console.log(values);
 
    values.PendingQty = Number(values.OrderQty - Number(values.DeliverQty)); // set number to the state
  }

  // ************suppliernotify save**************
  const fnNotifySave = async (values, resetForm, del) => {
    setLoading(true);
    if (del) {
      if (supnotifyedata.RecordID == "") {
        toast.error("Please Select Supplier Notification");
         setLoading(false);
        return;
      }
    }
    if (values.NotifyType == "") {
      toast.error("Please Choose Notification Type");
      return;
    }

    if (values.Purpose == "") {
      toast.error("Please Enter Purpose");
      return;
    }

    console.log(values);

    if (values.checkbox == true) {
      values.checkbox = "Y";
    } else {
      values.checkbox = "N";
    }
        const idata = {
          RecordID: supnotifyedata.RecordID,
          NotificationType: values.NotifyType,
          Purpose: values.Purpose,
          Response: values.Response,
          SortOrder: values.SortOrder,
          Disable: values.checkbox,
          UsrRecordID: loginrecid,
          SuppRecordID: recID,
          Finyear,
          CompanyID,
        };
        
   
 let action =
      bonotifyMode === "A" && !del
        ? "insert"
        : bonotifyMode === "E" && del
        ? "harddelete"
        : "update";
   
    const response = await dispatch(
      explorePostData({ accessID: "TR020", action, idata })
    );
    // const data = await dispatch(postApidata("TR020", type, saveData));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      dispatch(
        fetchExplorelitview("TR020", "Supplier Notification", recID, "")
      );
      
      setLoading(false);
      resetForm();
      setsupnotifyedata({
        RecordID: "",
        NotifyType: "",
        Purpose: "",
        Response: "",
        SortOrder: "",
        Disable: "",
      });
      selectNotifycelldata("", "A", "");
    } else {
      toast.error(response.payload.Msg);
      setLoading(false);
    }
  };

  const style = {
    // margin: '1em 0em',

    height: "55px",

    borderBottom: "2px solid #1769aa ",
    // borderRadius: "5px",
    backgroundColor: "#EDEDED",

    borderTop: "2px solid #EDEDED",
    borderRight: "2px solid #EDEDED",
    borderLeft: "2px solid #EDEDED",
    borderTopLeftRadius: "3px",
    borderTopRightRadius: "3px",
  };



  //material search
  var VISIBLE_FIELDS = [];

  if (show == "1") {
    VISIBLE_FIELDS = [
      "SLNO",
      "MaterialCode",
      "MaterialName",
      "AgreedPrice",
      "action",
    ];
  } else if (show == "2") {
    VISIBLE_FIELDS = [
      "SLNO",
      "NotificationType",
      "Purpose",
      "Response",
      "action",
    ];
  } else if (show == "3") {
    VISIBLE_FIELDS = [
      "SLNO",
      "Date",
      "DC Number",
      "Type",
      "Material",
      "Quantity",
      "Transaction Type",
      "action",
    ];
  }
  console.log(explorelistViewcolumn);
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
          <Typography>List of Supplier Notification</Typography>
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
                clrnotifyForm();
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
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>List of Supplier Material</Typography>
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
          navigate("/Apps/TR009/Suppliers");
        }
      } else {
        return;
      }
    });
  };

  return (
    <React.Fragment>
      { getLoading ?<LinearProgress  />:false}
      <Box sx={{ height: "100vh", overflow: "auto" }}>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box
            display="flex"
            borderRadius="3px"
            alignItems={"center"}
          >
            {broken && !rtl && (
              <IconButton onClick={() => toggleSidebar()}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
            <Box
              display={isNonMobile ? "flex" : "none"}
              borderRadius="3px"
              alignItems="center"
            >
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
                    setScreen(0);
                  }}
                >
                  Supplier
                </Typography>
                {show == "1" ? (
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >
                    Materials
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
                    Supplier Notification
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
                    Tracking
                  </Typography>
                ) : (
                  false
                )}
              </Breadcrumbs>
            </Box>
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
                  onChange={handleChange}
                >
                  <MenuItem value={0}>Supplier</MenuItem>
                  <MenuItem value={1}>Materials</MenuItem>
                  <MenuItem value={2}>Supplier Notification</MenuItem>
                  <MenuItem value={3}>Tracking</MenuItem>
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
        {show == "0" && !getLoading ? (
          <Box m="20px">

            <Formik
              initialValues={initialValues}
              onSubmit={(values, setSubmitting) => {
                setTimeout(() => {
                  fnSave(values);
                }, 100);
              }}
              validationSchema={suppliersSchema}
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
                        <Avatar
                          variant="rounded"
                          src={userimg}
                          sx={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}

                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        value={values.Code}
                        id="Code"
                        name="Code"
                        label="Code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Code && !!errors.Code}
                        helperText={touched.Code && errors.Code}
                        inputProps={{ readOnly: true }}
                        focused
                        autoFocus
                        placeholder="Auto"
                        onInvalid={(e) => {
                          e.target.setCustomValidity("Please Fill The Code");
                        }}
                        onInput={(e) => {
                          e.target.setCustomValidity("");
                        }}
                      />

                      <TextField
                        required
                        fullWidth
                        variant="filled"
                        type="text"
                        inputProps={{ maxLength: 50 }}
                        value={values.Name}
                        id="Name"
                        name="Name"
                        label="Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        error={!!touched.Name && !!errors.Name}
                        helperText={touched.Name && errors.Name}
                        onInvalid={(e) => {
                          e.target.setCustomValidity("Please Fill The Name");
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
                        <Avatar
                          variant="rounded"
                          src={userimg}
                          sx={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}

                   <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Email && !!errors.Email}
                        helperText={touched.Email && errors.Email}
                        name="Email"
                        value={values.Email}
                        id="Email"
                        sx={{ gridColumn: "span 2" }}
                        focused
                        inputProps={{ maxLength: 100 }}
                      />

                      <TextField
                        fullWidth
                        required
                        variant="filled"
                        type="text"
                        label="Address"
                        name="Address1"
                        value={values.Address1}
                        id="Address1"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        error={!!touched.Address1 && !!errors.Address1}
                        helperText={touched.Address1 && errors.Address1}
                        // inputProps={{ maxLength: 50}}
                        multiline
                        onInvalid={(e) => {
                          e.target.setCustomValidity("Please Fill The Address");
                        }}
                        onInput={(e) => {
                          e.target.setCustomValidity("");
                        }}
                      />
                      <TextField
                        fullWidth
                        required
                        variant="filled"
                        type="number"
                        label="Phone"
                        name="Ph1"
                        value={values.Ph1}
                        id="Ph1"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        error={!!touched.Ph1 && !!errors.Ph1}
                        helperText={touched.Ph1 && errors.Ph1}
                        inputProps={{ maxLength: 11 }}
                        onInvalid={(e) => {
                          e.target.setCustomValidity("Please Fill The Phone");
                        }}
                        onWheel={(e) => e.target.blur()} 
                        onInput={(e) => {
                          e.target.setCustomValidity("");
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 11);
                        }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Phone 2"
                        name="Ph2"
                        value={values.Ph2}
                        id="Ph2"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        error={!!touched.Ph2 && !!errors.Ph2}
                        helperText={touched.Ph2 && errors.Ph2}
                        onWheel={(e) => e.target.blur()} 
                        onInvalid={(e) => {
                          e.target.setCustomValidity("Please Fill The Phone 2");
                        }}
                      />
                    </FormControl>
                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <FormControl focused variant="filled">
                        <InputLabel id="productType">Type</InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="Suppliertype"
                          name="Suppliertype"
                          value={values.Suppliertype}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        >
                          <MenuItem value="I">International Supply</MenuItem>
                          <MenuItem value="D">Domestic Supply</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="GST"
                        value={values.Gst}
                        id="Gst"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Gst"
                        error={!!touched.Gst && !!errors.Gst}
                        helperText={touched.Gst && errors.Gst}
                        sx={{ gridColumn: "span 2" }}
                        focused
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Sort Order"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.SortOrder}
                        name="SortOrder"
                        error={!!touched.Weight && !!errors.Weight}
                        helperText={touched.Weight && errors.Weight}
                        sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                        // value={values.Weight}
                        id="SortOrder"
                        focused
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                        onWheel={(e) => e.target.blur()} 
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 11);
                        }}
                      />
                      <Box>
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
                        <Box>
                          <Field
                            type="checkbox"
                            name="Jobwork"
                            id="Jobwork"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            as={Checkbox}
                            label="Jobwork"
                          />

                          <FormLabel focused={false}>Jobwork</FormLabel>
                        </Box>
                      </Box>
                    </FormControl>
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px" gap={2}>
                    {YearFlag == "true" ? (
                      <LoadingButton
                        color="secondary"
                        variant="contained"
                        type="submit"
                        loading={postLoading}
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
                        navigate(`/Apps/TR009/Suppliers`);
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        ) : (
          false
        )}

        {show == "1" ? (
          <Box m="20px" sx={{ m: 2 }}>
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
                        <Avatar
                          variant="rounded"
                          src={userimg}
                          sx={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}

                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        value={values.Code}
                        id="Code"
                        name="Code"
                        label="Code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Coe && !!errors.Coe}
                        helperText={touched.Coe && errors.Coe}
                        // sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                        focused
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        inputProps={{ maxLength: 50, readOnly: true }}
                        value={values.Name}
                        id="Name"
                        name="Name"
                        label="Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        error={!!touched.Desc && !!errors.Desc}
                        helperText={touched.Desc && errors.Desc}
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
                        <Avatar
                          variant="rounded"
                          src={userimg}
                          sx={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}

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

                              // console.log(JSON.stringify(params));
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
                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <Formik
                        innerRef={ref}
                        initialValues={supmateInitialvalues}
                        onSubmit={(values, { resetForm }) => {
                          setTimeout(() => {
                            fnmaterialSave(values, resetForm,false);
                            // alert("hai");
                          }, 100);
                        }}
                        validationSchema={supmaterialSchema}
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
                            onChange={handleClick(values)}
                          >
                            <FormControl
                              sx={{ gridColumn: "span 2", gap: "40px" }}
                              style={{ width: "100%" }}
                            >
                              <TextField
                                id="outlined-basic"
                                label="ID"
                                variant="filled"
                                value={selectSMLookupData.SMlookupRecordid}
                                focused
                                sx={{ display: "none" }}
                              />

                              <FormControl
                                sx={{
                                  gridColumn: "span 2",
                                  display: "flex",
                                }}
                              >
                                {/* <FormLabel>Material </FormLabel> */}
                                <FormControl
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginTop: "50px",
                                  }}
                                >
                                  <TextField
                                    id="outlined-basic"
                                    label="Material"
                                    variant="filled"
                                    value={selectSMLookupData.SMlookupCode}
                                    focused
                                    required
                                    inputProps={{ tabIndex: "-1" }}
                                  />
                                  <IconButton
                                    sx={{ height: 40, width: 40 }}
                                    onClick={() => handleShow("SM")}
                                  >
                                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                  </IconButton>
                                  {/* <MoreHorizIcon  onClick={()=>handleShow('SM')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                                  <TextField
                                    id="outlined-basic"
                                    // label="Description"
                                    variant="filled"
                                    value={selectSMLookupData.SMlookupDesc}
                                    fullWidth
                                    inputProps={{ tabIndex: "-1" }}
                                    focused
                                  />
                                </FormControl>
                              </FormControl>

                              {/* <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Order Qty"
                                id="OrderQty"
                                onInput={(e) => {
                                  // e.target.value = Math.max(0, parseInt(e.target.value))
                                  //   .toString()
                                  //   .slice(0, 10);
                                    e.target.setCustomValidity('')
                                }}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.OrderQty}
                                name="OrderQty"
                                // sx={{ gridColumn: "span 2" }}
                                error={!!touched.OrderQty && !!errors.OrderQty}
                                helperText={touched.OrderQty && errors.OrderQty}
                                sx={{ background: "#fff6c3", input:{textAlign:"right"} }}
                                focused
                                required
                                onInvalid={(e) => { e.target.setCustomValidity('Please Fill The Order Quantity') }} 
                               
                              />

                              <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Delivered Qty"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                id="DeliverQty"
                                name="DeliverQty"
                                // onInput={(e) => {
                                //   e.target.value = Math.max(0, parseInt(e.target.value))
                                //     .toString()
                                //     .slice(0, 10);
                                // }}
                                value={values.DeliverQty}
                                error={
                                  !!touched.DeliverQty && !!errors.DeliverQty
                                }
                                helperText={
                                  touched.DeliverQty && errors.DeliverQty
                                }
                                sx={{ background: "#fff6c3", input:{textAlign:"right"} }}
                                focused
                              />
                              <TextField
                                fullWidth
                                variant="filled"
                                label="Pending Qty"
                                inputProps={{readOnly:true}}
                                //  value={values.PendingQty}
                                value={values.PendingQty}
                                id="PendingQty"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                // onBlur={handleClick}
                                // onChange={handleClick}
                                //  onClick={handleClick}
                                name="PendingQty"
                                //  error={!!touched.PendingQty && !!errors.PendingQty}
                                //  helperText={touched.PendingQty && errors.PendingQty}
                                sx={{ background: "#fff6c3", input:{textAlign:"right"} }}
                                focused
                              /> */}

                              <TextField
                                fullWidth
                                variant="filled"
                                label="Agreed Price"
                                value={values.AgreedPrice}
                                id="AgreedPrice"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="AgreedPrice"
                                error={
                                  !!touched.AgreedPrice && !!errors.AgreedPrice
                                }
                                helperText={
                                  touched.AgreedPrice && errors.AgreedPrice
                                }
                                sx={{
                                  background: "#fff6c3",
                                  input: { textAlign: "right" },
                                }}
                                focused
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
                                  background: "#fff6c3",
                                  input: { textAlign: "right" },
                                }}
                                focused
                                onWheel={(e) => e.target.blur()} 
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
        
                            
             </FormControl>
             */}
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
                                        fnmaterialSave(values, resetForm, true);
                                        
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
                                  setScreen(0);
                                }}
                              >
                                Cancel
                              </Button>
                            </Box>
                            <Popup
                              title="Supplier Material"
                              openPopup={openSMPopup}
                              setOpenPopup={setOpenSMPopup}
                            >
                              <Listviewpopup
                                accessID="2000"
                                screenName="Supplier Material"
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

        {/* notify */}
        {show == "2" ? (
          <Box m="20px" sx={{ m: 2 }}>
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
                        <Avatar
                          variant="rounded"
                          src={userimg}
                          sx={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}

                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        value={values.Code}
                        id="Code"
                        name="Code"
                        label="Code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Coe && !!errors.Coe}
                        helperText={touched.Coe && errors.Coe}
                        inputProps={{ maxLength: 50, readOnly: true }}
                        focused
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        inputProps={{ maxLength: 50, readOnly: true }}
                        value={values.Name}
                        id="Name"
                        name="Name"
                        label="Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        error={!!touched.Desc && !!errors.Desc}
                        helperText={touched.Desc && errors.Desc}
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
                        <Avatar
                          variant="rounded"
                          src={userimg}
                          sx={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}

                    <FormControl sx={{ gridColumn: "span 2" }}>
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
                              const particularRow = params.row;
                              const currentparticularField = params.field;
                              selectNotifycelldata(
                                particularRow,
                                "E",
                                currentparticularField
                              );
                              //  alert("hi"+JSON.stringify(particularRow));
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
                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <Formik
                        innerRef={ref}
                        initialValues={supNotifyInitialvalues}
                        onSubmit={(values, { resetForm }) => {
                          setTimeout(() => {
                            fnNotifySave(values, resetForm,false);
                            // alert("hai");
                          }, 100);
                        }}
                        validationSchema={supnotifySchema}
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
                              <FormControl>
                                <FormLabel sx={{ marginTop: "45px" }}>
                                  Notification Type:
                                </FormLabel>
                                <Field
                                  as="select"
                                  label="Type"
                                  onChange={handleChange}
                                  value={values.NotifyType}
                                  id="NotifyType"
                                  name="NotifyType"
                                  focused
                                  style={style}
                                  required
                                >
                                  <option>Select</option>
                                  <option value="W">Whats App</option>
                                  <option value="T">SMS Text</option>
                                  <option value="E">EMAIL</option>
                                  <option value="F">FAX</option>
                                  <option value="P">Phone</option>
                                </Field>

                                {/* <Select
                                 
                                  onChange={handleChange}
                                  value={values.NotifyType}
                                  id="NotifyType"
                                  name="NotifyType"
                                  style={style}
                                  label="select"
                                
                               required
                                
                                 onInvalid={(e) => { e.target.setCustomValidity('Please Fill The Notifytype') }} 
                                 onInput ={(e) => { e.target.setCustomValidity('') }}
                                >
                                  
                                    <MenuItem value={"W"}>Whats App</MenuItem>
                                    <MenuItem value={"T"}>SMS Text</MenuItem>
                                    <MenuItem value={"E"}>EMAIL</MenuItem>
                                    <MenuItem value={"F"}>FAX</MenuItem>
                                    <MenuItem value={"P"}>Phone</MenuItem>
                                  </Select>  
                                             */}
                              </FormControl>

                              {/* <InputLabel>Select</InputLabel> */}
                              {/* <Select
                              onChange={handleChange}
                              value={values.NotifyType}
                              id="NotifyType"
                              name="NotifyType"
                              style={notify}
                              label="select"
                              required
                              onInvalid={(e) => { e.target.setCustomValidity('Please Fill The Type') }}
                              onInput ={(e) => { e.target.setCustomValidity('') }} 
                            >
                            
                            </Select> */}

                              {/* <TextField
                              select
                              onChange={handleChange}
                              value={values.NotifyType}
                              id="NotifyType"
                              name="NotifyType"
                              // style={notify}
                              variant="filled"
                              label="Type"
                              focused
                              required
                              // onInvalid={(e) => { e.target.setCustomValidity('Please Fill The Type') }}
                              // on ={(e) => { e.target.setCustomValidity('') }} 
                             
                              >
                                    <MenuItem value={""}>Slect Notification</MenuItem>
                                    <MenuItem value={"W"}>Whats App</MenuItem>
                                    <MenuItem value={"T"}>SMS Text</MenuItem>
                                    <MenuItem value={"E"}>EMAIL</MenuItem>
                                    <MenuItem value={"F"}>FAX</MenuItem>
                                    <MenuItem value={"P"}>Phone</MenuItem>
                              </TextField> */}

                              <TextField
                                fullWidth
                                variant="filled"
                                label="Purpose"
                                value={values.Purpose}
                                id="Purpose"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                required
                                name="Purpose"
                                error={!!touched.Purpose && !!errors.Purpose}
                                helperText={touched.Purpose && errors.Purpose}
                                sx={{ gridColumn: "span 2" }}
                                focused
                                onInvalid={(e) => {
                                  e.target.setCustomValidity(
                                    "Please Fill The Purpose"
                                  );
                                }}
                                onInput={(e) => {
                                  e.target.setCustomValidity("");
                                }}
                              />

                              <TextField
                                fullWidth
                                required
                                variant="filled"
                                label="Response"
                                value={values.Response}
                                id="Response"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="Response"
                                error={!!touched.Response && !!errors.Response}
                                helperText={touched.Response && errors.Response}
                                sx={{ gridColumn: "span 2" }}
                                focused
                                onInvalid={(e) => {
                                  e.target.setCustomValidity(
                                    "Please Fill The Response"
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
                                label="Sort Order"
                                value={values.SortOrder}
                                id="SortOrder"
                                onBlur={handleBlur}
                                onChange={handleChange}
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
                                    Swal.fire({
                                      title: `Do you want Delete?`,
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#3085d6",
                                      cancelButtonColor: "#d33",
                                      confirmButtonText: "Confirm",
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        fnNotifySave(values, resetForm, true);
                                        
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
                                  setScreen(0);
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
          </Box>
        ) : (
          false
        )}
        {show == "3" ? (
          <Box m="20px" sx={{ m: 2 }}>
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
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      value={code}
                      id="Code"
                      name="Code"
                      label="Code"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.Coe && !!errors.Coe}
                      helperText={touched.Coe && errors.Coe}
                      inputProps={{ maxLength: 50, readOnly: true }}
                      focused
                      sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      inputProps={{ maxLength: 50, readOnly: true }}
                      value={desc}
                      id="Name"
                      name="Name"
                      label="Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      error={!!touched.Desc && !!errors.Desc}
                      helperText={touched.Desc && errors.Desc}
                    />
                  </Box>
                  <Box sx={{ gridColumn: "span 4" }}>
                    <SupplierBarChart />
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
                        rows={SuppliertrackRow}
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
      </Box>
    </React.Fragment>
  );
};

export default Editsupplymaster;
