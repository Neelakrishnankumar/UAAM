import React from "react";
import {
  TextField,
  Box,
  Typography,
  FormControl,
  Button,
  IconButton,
  Select,
  InputLabel,
  MenuItem,
  LinearProgress,
  useTheme,
  Tooltip,
  Stack,
  Rating
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { Formik } from "formik";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { explorePostData, getFetchData, postData, purchaseorderrating } from "../../../store/reducers/Formapireducer";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { PurchaseOrderNoSchema } from "../../Security/validation";
import { tokens } from "../../../Theme";
import { GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Popup from "../popup";
import Listviewpopup from "../Lookup";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";

const Editpurchaseorderopen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const accessID = params.accessID;
  const recID = params.id;
  const mode = params.Mode;
  const location = useLocation();
  const navigate = useNavigate();
  const data = useSelector((state) => state.formApi.Data);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const YearFlag = sessionStorage.getItem("YearFlag");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const PurchaseOrderRatingData=useSelector((state) => state.formApi.purchaseorderratingData);
  console.log("PurchaseOrderRating",PurchaseOrderRatingData);
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  const Finyear = sessionStorage.getItem("YearRecorid");
  const compID = sessionStorage.getItem("compID");

  const isNonMobile = useMediaQuery("(min-width:600px)");

    // ***************  PURCHASEORDER LOOKUP  *************** //
    const [isPopupData, setisPopupdata] = React.useState(false);
    const [supplierLookup, SetsupplierLookup] = useState({
      supRecordID: "",
      supCode: "",
      supName: "",
    });
  
    if (isPopupData == false) {
      supplierLookup.supRecordID = data.SupplierID;
      supplierLookup.supCode = data.Code;
      supplierLookup.supName = data.SupplierName;
    }

//**********************************Order ITEMS LOOKUP******************/
const [matcatLookup, SetmatcatLookup] = useState({
  matcatRecordID: "",
  matcatCode: "",
  matcatName: "",
});
const [matLookup, SetmatLookup] = useState({
  matRecordID: "",
  matCode: "",
  matName: "",
  matFixeRate: "",
  matLatestRate: "",
  matSgst: "",
  matIgst: "",
  matCgst: "",
});
//********************end of lookup set value in order ITEMS***********************/
/**************initial value set in ordritems row data******************/


 /********PURCHASEORDER[ORDER ITEMS] SAVE FUNCTIONS**********/


    const [supplierOpen, setsupplierOpen] = useState(false);
    const [matcatOpen, setmatcatOpen] = useState(false);
    const [matOpen, setMatOpen] = useState(false);
  
    function handleOpen(params) {
      if (params == "SUP") {
        setsupplierOpen(true);
      }
      if (params == "MATC") {
        setmatcatOpen(true);
      }
      if (params == "MAT") {
        setMatOpen(true);
      }

      }

    const childToParent = (childdata, type) => {
      console.log(
        "🚀 ~ file: Editproduct.jsx:288 ~ childToParent ~ childdata:",
        childdata
      );
  
      if (type == "Supplier") {
        SetsupplierLookup({
          supRecordID: childdata.RecordID,
          supCode: childdata.Code,
          supName: childdata.Name,
        });
        setsupplierOpen(false);
        setisPopupdata(true);
      }
        //******ASSIGN CHILDDATA*ORDER ITEMS MATERIALS LOOKUP********//
    if (type == "Material Category") {
      SetmatcatLookup({
        matcatRecordID: childdata.RecordID,
        matcatCode: childdata.Code,
        matcatName: childdata.Name,
       
      });
      setmatcatOpen(false);
    }
    if (type == "Material") {
      SetmatLookup({
        matRecordID: childdata.RecordID,
        matCode: childdata.Code,
        matName: childdata.Name,
        matFixeRate: childdata.Fixrate,
        matLatestRate: childdata.Laterate,
        matSgst: childdata.Sgst,
        matIgst: childdata.Igst,
        matCgst: childdata.Cgst,
      });
      setMatOpen(false);
    }
    }
  const InitialValue = {
    date: data.Orderdate,
    purchaseorderno: data.PurchaseOrderNo,
  };

  const fnSave = async (values) => {
    let action = mode === "A" ? "insert" : "update";
    const idata = {
      RecordID: recID,
      PurchaseOrderDate: values.date,
      PurchaseOrderNo: values.purchaseorderno,
      SupplierID: supplierLookup.supRecordID,
      Sortorder: 0,
      Disable: "N",
      SupplierName: "",
      Finyear,
      compID:compID,
    };
    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      setLoading(false);
      if(mode == 'A'){

        navigate(`/Apps/TR155/Open Purchase Order/EditOpen Purchase Order/${response.payload.Recid}/E`);  
          }
    } else {
      toast.error(response.payload.Msg);
      setLoading(false);
    }
  };

  // *************** PAGE STATES *************** //
  const [show, setShow] = useState(1);
  const exploreLoading = useSelector((state) => state.exploreApi.loading);

  // *************** PURCHASE ORDER EXPLORE SCREEN CHANGE FUNCTION *************** //

  const exploreChange = async (event) => {
//************ORDER ITEMS LISTVIEW****************//
if (event.target.value === 2) {
  dispatch(
    fetchExplorelitview("TR156", "purchaseorderorderitems", recID, "")
  );

  selectCellOrderData({ rowData: {}, mode: "A", field: "" });
}
if (event.target.value === 3) {
  dispatch(purchaseorderrating({data:{RecordID:recID}}) );
  

  selectCellOrderData({ rowData: {}, mode: "A", field: "" });
}
/******END OF ORDER ITEMS  LISTVIEW********/
    setShow(event.target.value);
  };

  const [rowCount, setRowCount] = useState(0);
  function CustomToolbar(screenName) {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>{screenName}</Typography>
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
 const explorelistViewData = useSelector(
  (state) => state.exploreApi.explorerowData
);
var VISIBLE_FIELDS = [];
if (show == 2) {
  VISIBLE_FIELDS = [
    "SLNO",
    "Material",
    "Orderqty",
    "Netprice",
    "action",
  ];
}
//  else if (show == 3) {
//   VISIBLE_FIELDS = ["SLNO", "Material", "Orderqty", "Netprice", "action"];
// }
 else {
  VISIBLE_FIELDS = ["SLNO", "CustID", "CustName", "AgreedPrice", "action"];
}

const explorelistViewcolumn = useSelector(
  (state) => state.exploreApi.explorecolumnData
);

const visibleColumns = React.useMemo(
  () =>
    explorelistViewcolumn.filter((column) =>
      VISIBLE_FIELDS.includes(column.field)
    ),
  [explorelistViewcolumn]
);


 /*********************ORDER ITEMS LOOKUP DATA(SET A VALUE)*********/
 const [orderRowData, SetOrderRowData] = useState({
  orderRecordID: 0,
  discount: 0,
  orderQtyTolerance: 0,
  orderQty: 0,
});
 const [orderMode, setOrderMode] = useState("A");

 const selectCellOrderData = ({ rowData, mode, field }) => {
   console.log(
     "🚀 ~ file: Editproduct.jsx:280 ~ selectCellOrderData ~ rowData:",
     rowData
   );
   setOrderMode(mode);
/*****************INSIDE GRID UPDATE FUNCTION CALL*********************/
   if (mode == "A") {

    SetmatcatLookup({
      matcatRecordID: "",
      matcatCode: "",
      matcatName: "",
    });
     SetmatLookup({
       matRecordID: "",
       matCode: "",
       matName: "",
       matFixeRate: "",
       matLatestRate: "",
       matSgst: "",
       matIgst: "",
       matCgst: "",
     });

     SetOrderRowData({
      orderRecordID: "",
      discount: "",
       orderQtyTolerance: "",
       orderQty: "",
     });
   } else {
     if (field == "action") {
      SetmatcatLookup({
        matcatRecordID: rowData.CategoryID,
        matcatCode: rowData.CategoryCode,
        matcatName: rowData.CategoryDescription,
     
      });
       SetmatLookup({
         matRecordID: rowData.MaterialID,
         matCode: rowData.Code,
         matName: rowData.Description,
         matFixeRate: rowData.Fixrate,
         matLatestRate: rowData.Latestrate,
         matSgst: rowData.Sgst,
         matIgst: rowData.Igst,
         matCgst: rowData.Cgst,
       });

       SetOrderRowData({
         orderRecordID: rowData.RecordID,
         discount: rowData.Discount,
         orderQtyTolerance: rowData.Tolerance,
         orderQty: rowData.Orderqty,

       });
     }
   }
 };
//**********************************BEFORE SEND TO SAVE FUNCTION SET A VALUES//
 

const InitialValueorder = {
  date: data.Orderdate,
  purchaseorderno: data.PurchaseOrderNo,
  orderQtyTolerance: Number(orderRowData.orderQtyTolerance),
  orderQty: Number(orderRowData.orderQty),
  fixedRate: matLookup.matFixeRate,
  latestRate: matLookup.matLatestRate,
  price: 0,
  discount: Number(orderRowData.discount),
  sgst: Number(matLookup.matSgst).toFixed(2),
  igst: Number(matLookup.matIgst).toFixed(2),
  cgst: Number(matLookup.matCgst).toFixed(2),
  grossPrice: 0,
  netPrice: 0,
};


//**********************ORDER ITEMS SAVE FUNCTIONS********************************//
const orderpurchaseorderFn = async (values, resetForm, del) => {
  // console.log("🚀 ~ file: Editproduct.jsx:652 ~ productBomFn ~ values:", values)

  let action =
    orderMode === "A" && !del
      ? "insert"
      : orderMode === "E" && del
      ? "harddelete"
      : "update";

  const idata = {
    RecordID: orderRowData.orderRecordID,
    HeaderID:recID,
    CategoryID: matcatLookup.matcatRecordID,
    SupplierID:  supplierLookup.supRecordID,
    MaterialID:matLookup.matRecordID,
    Tolerance: values.orderQtyTolerance,
    Orderqty: values.orderQty,
    Fixrate: values.fixedRate,
    Latestrate: values.latestRate,
    Price: (values.orderQty * values.fixedRate).toFixed(2),
    Discount: values.discount,
    GrossPrice: (
      (values.orderQty * values.fixedRate).toFixed(2) -
      (values.orderQty * values.fixedRate).toFixed(2) *
        (values.discount / 100)
    ).toFixed(2),
    // Finyear: "",
    Igst: values.igst,
    Cgst: values.cgst,
    Sgst: values.sgst,
    Netprice: (
      Number(
        Number((
          (values.orderQty * values.fixedRate).toFixed(2) -
          (values.orderQty * values.fixedRate).toFixed(2) *
            (values.discount / 100)
        ).toFixed(2) *
          (values.igst / 100)) +
          Number((
            (values.orderQty * values.fixedRate).toFixed(2) -
            (values.orderQty * values.fixedRate).toFixed(2) *
              (values.discount / 100)
          ).toFixed(2) *
            (values.cgst / 100)) +
          Number((
            (values.orderQty * values.fixedRate).toFixed(2) -
            (values.orderQty * values.fixedRate).toFixed(2) *
              (values.discount / 100)
          ).toFixed(2) *
            (values.sgst / 100))
      ) +
      Number(
        (
          (values.orderQty * values.fixedRate).toFixed(2) -
          (values.orderQty * values.fixedRate).toFixed(2) *
            (values.discount / 100)
        ).toFixed(2)
      )
    ).toFixed(2),
  };

  const response = await dispatch(
    explorePostData({ accessID: "TR156", action, idata })
  );
  if (response.payload.Status == "Y") {
    await dispatch(
      fetchExplorelitview("TR156", "purchaseorderorderitems", recID, "")
    );
    toast.success(response.payload.Msg);

    selectCellOrderData({ rowData: {}, mode: "A", field: "" });
  } else {
    toast.error(response.payload.Msg);
  }
};

// *************** INDENT ITEM SCREEN  *************** //

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
          navigate("/Apps/TR155/ Open Purchase Order");
        }
      } else {
        return;
      }
    });
  };

  const [rating,setRating]=useState(0);
  const columnsRatings = [
    { field: 'HeaderID', headerName: 'HeaderID', width: 180, hide:true },
    { field: 'slNo', headerName: 'SLNO', width: 80,},
    // {
    //   field: 'code',
    //   headerName: 'Code',
    //   editable: true,
    //   align: 'left',
    //   headerAlign: 'left',
    // },
    { field: 'Parameter', headerName: 'Parameter', flex:1, editable: true },
    

    {
      field: 'Rating',
      headerName: 'Rating',
      type: 'rating',
      width: 220,
      editable: true,
      renderCell:(params) => {
        return(
          <Rating value={Number(params.row.Rating)} onChange={(e) =>setRating(e.target.value)}  precision={0.5} />
        )
      }
    },
  ];
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
          <Typography variant="h3">Open Purchase Order </Typography>
        </Box>
        <Box display="flex">
          {mode == 'E' ?<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Explore</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={show}
              label="Explore"
              onChange={exploreChange}
            >
              <MenuItem value={1}>Open Purchase Order </MenuItem>
              <MenuItem value={2}>Order Items</MenuItem>
              <MenuItem value={3}>Rating</MenuItem>
              <MenuItem>Process</MenuItem>
            </Select>
          </FormControl>:false}
          <IconButton color="error" onClick={() => fnLogOut("Close")}>
            <ResetTvIcon />
          </IconButton>
          <IconButton>
            <LogoutOutlinedIcon
              color="error"
              onClick={() => fnLogOut("Logout")}
            />
          </IconButton>
        </Box>
      </Box>
      {/* PURCHASE ORDER */}
      {!getLoading && show === 1 ? (
        <Box m="20px">
          <Formik
            initialValues={InitialValue}
            onSubmit={(values, { resetForm }) => {
              setTimeout(() => {
                fnSave(values);
              }, 100);
            }}
            // validationSchema={PurchaseOrderNoSchema}
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
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <FormControl
                    fullWidth
                    sx={{ gridColumn: "span 2", gap: "40px" }}
                  >
                    <TextField
                      name="date"
                      type="date"
                      id="date"
                      label="Date"
                      variant="filled"
                      focused
                        value={values.date}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoFocus
                    />

                    <TextField
                      name="purchaseorderno"
                      type="text"
                      id="purchaseorderno"
                      label="PurchaseOrder No"
                      variant="filled"
                      // placeholder="auto"
                      // inputProps={{ readOnly: true }}
                      focused
                        value={values.purchaseorderno}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                    />

                    <FormControl
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gridColumn: "span 2",
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="Supplier"
                        variant="filled"
                           value={supplierLookup.supCode}
                        focused
                        required
                        inputProps={{ tabIndex: "-1" }}
                      />
                      <IconButton
                        sx={{ height: 40, width: 40 }}
                           onClick={() => handleOpen("SUP")}
                        tabIndex={"-1"}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>

                      <TextField
                        id="outlined-basic"
                        label=""
                        variant="filled"
                           value={supplierLookup.supName}
                        fullWidth
                        inputProps={{ tabIndex: "-1" }}
                        focused
                      />
                    </FormControl>
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                 
                 
                 {YearFlag == "true" ? (
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
                    variant="contained"
                    color="error"
                    onClick={() => {
                      navigate("/Apps/TR155/Open Purchase Order ");
                    }}
                  >
                    CANCEL
                  </Button>
                </Box>
                <Popup
                  title="Supplier"
                  openPopup={supplierOpen}
                  setOpenPopup={setsupplierOpen}
                >
                  <Listviewpopup
                    accessID="2017"
                    screenName="Supplier"
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
      {/* ORDER ITEMS */}
      {show === 2 ? (
        <Box m="10px"
        //  onClick={toggleTextField}
         >
          <Formik
            initialValues={InitialValueorder}
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
              setTimeout(() => {
                orderpurchaseorderFn(values, resetForm, false);
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
                  selectCellOrderData({ rowData: {}, mode: "A", field: "" });
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
                      name="purchaseorderno"
                      type="text"
                      id="purchaseorderno"
                      label="PurchaseOrder No"
                      variant="filled"
                      placeholder="auto"
                      inputProps={{ readOnly: true }}
                      focused
                      value={values.purchaseorderno}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.code && !!errors.code}
                      helperText={touched.code && errors.code}
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                      //   autoFocus
                    />
                  </FormControl>
                  <Stack
                    sx={{
                      gridColumn: "span 2",
                    }}
                  >
                    <TextField
                      name="date"
                      type="date"
                      id="date"
                      label="Date"
                      variant="filled"
                      focused
                      value={values.date}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.date && !!errors.date}
                      helperText={touched.date && errors.date}
                      autoFocus
                    />
                  </Stack>

                  <Box sx={{ gridColumn: "span 2" }}>
                    <Box
                      height="470px"
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
                        // // checkboxSelection
                        rows={explorelistViewData}
                        columns={visibleColumns}
                        disableSelectionOnClick
                        getRowId={(row) => row.RecordID}
                        // pageSize={10}
                        // onPageSizeChange={(newPageSize) =>
                        //   setPageSize(newPageSize)
                        // }
                        onCellClick={(params) => {
                          selectCellOrderData({
                            rowData: params.row,
                            mode: "E",
                            field: params.field,
                          });
                        }}
                        rowsPerPageOptions={[5, 10, 20]}
                        pagination
                        components={{
                          Toolbar: () => CustomToolbar("List of Order Items"),
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
                        id="materialCategory"
                        label="Material Category"
                        variant="filled"
                        focused
                        required
                        inputProps={{ tabIndex: "-1" }}
                        value={matcatLookup.matcatCode}
                      />
                      <IconButton
                        onClick={() => handleOpen("MATC")}
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
                        value={matcatLookup.matcatName}
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
                        id="material"
                        label="Material"
                        variant="filled"
                        focused
                        required
                        inputProps={{ tabIndex: "-1" }}
                        value={matLookup.matCode}
                      />
                      <IconButton
                        onClick={() => handleOpen("MAT")}
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
                        value={matLookup.matName}
                      />
                    </Box>
                    <TextField
                      name="orderQtyTolerance"
                      type="number"
                      id="orderQtyTolerance"
                      label="Order Qty Tolerance"
                      variant="filled"
                      value={values.orderQtyTolerance}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      focused
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                      // InputProps={{
                      //   readOnly: true,
                      // }}
                    />

                    <TextField
                      name="orderQty"
                      type="number"
                      id="orderQty"
                      label="Order Qty"
                      variant="filled"
                      value={values.orderQty}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      focused
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                    />
                    <TextField
                      name="fixedRate"
                      type="number"
                      id="fixedRate"
                      label="Fixed Rate"
                      variant="filled"
                      value={values.fixedRate}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      focused
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name="latestRate"
                      type="number"
                      id="latestRate"
                      label="Latest Purchase"
                      variant="filled"
                      value={values.latestRate}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      focused
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </FormControl>

                  <FormControl sx={{ gridColumn: "span 2", gap: "30px" }}>
                    <TextField
                      name="igst"
                      type="number"
                      id="igst"
                      label="IGST"
                      variant="filled"
                      value={values.igst}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      focused
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name="cgst"
                      type="number"
                      id="cgst"
                      label="CGST"
                      variant="filled"
                      value={values.cgst}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      focused
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name="sgst"
                      type="number"
                      id="sgst"
                      label="SGST"
                      variant="filled"
                      value={values.sgst}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      focused
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </FormControl>
                  <FormControl sx={{ gridColumn: "span 2", gap: "30px" }}>
                    <TextField
                      name="price"
                      type="number"
                      id="price"
                      label="Price"
                      variant="filled"
                   
                      value={(values.orderQty * values.fixedRate).toFixed(2)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      focused
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name="discount"
                      type="number"
                      id="discount"
                      label="Discount %"
                      variant="filled"
                      value={values.discount}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      focused
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                    />

<TextField

                      name="grossPrice"
                      type="number"
                      id="grossPrice"
                      label="Gross Price"
                     
                      variant="filled"
                      value={(
                        (values.orderQty * values.fixedRate).toFixed(2) -
                        (values.orderQty * values.fixedRate).toFixed(2) *
                          (values.discount / 100)
                      ).toFixed(2)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      focused
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                      InputProps={
                        {
                          readOnly: true,
                        }
                      }
                                    
                    />
 
                    <TextField
                      name="netPrice"
                      type="number"
                      id="netPrice"
                      label="Net Price"
                      variant="filled"
                     value={(
                      Number(
                        Number((
                          (values.orderQty * values.fixedRate).toFixed(2) -
                          (values.orderQty * values.fixedRate).toFixed(2) *
                            (values.discount / 100)
                        ).toFixed(2) *
                          (values.igst / 100)) +
                          Number((
                            (values.orderQty * values.fixedRate).toFixed(2) -
                            (values.orderQty * values.fixedRate).toFixed(2) *
                              (values.discount / 100)
                          ).toFixed(2) *
                            (values.cgst / 100)) +
                          Number((
                            (values.orderQty * values.fixedRate).toFixed(2) -
                            (values.orderQty * values.fixedRate).toFixed(2) *
                              (values.discount / 100)
                          ).toFixed(2) *
                            (values.sgst / 100))
                      ) +
                      Number(
                        (
                          (values.orderQty * values.fixedRate).toFixed(2) -
                          (values.orderQty * values.fixedRate).toFixed(2) *
                            (values.discount / 100)
                        ).toFixed(2)
                      )
                    ).toFixed(2)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      focused
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                      InputProps={
                        {
                          // readOnly: true,
                        }
                      }
                    />
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="end" mt="30px" gap={2}>
                  {YearFlag == "true" ? (
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
                  {YearFlag == "true" ? (
                    <Button
                      onClick={()=>orderpurchaseorderFn(values, resetForm, true)}
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
                 {/* /**************MATERIAL CATEGORY*********************/}

                <Popup
                  title="Material Category"
                  openPopup={matcatOpen}
                  setOpenPopup={setmatcatOpen}
                >
                  <Listviewpopup
                    accessID="2011"
                    screenName="Material Category"
                    childToParent={childToParent}
                
                  />
                </Popup>
                {/* /**************MATERIAL*********************/}

                 <Popup
                  title="Material"
                  openPopup={matOpen}
                  setOpenPopup={setMatOpen}
                >
                  <Listviewpopup
                    accessID="2077"
                    screenName="Material"
                    childToParent={childToParent}
                    filterName={"parentID"}
                    filterValue={`${supplierLookup.supRecordID}' AND CategoryID = '${matcatLookup.matcatRecordID}`}
                  />
                </Popup>
              </form>
            )}
          </Formik>
        </Box>
      ) : (
        false
      )}

      {/* Rating  */}
      {show === 3 ? (
        <Box m="10px">
          <Formik
            initialValues={{}}
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
              setTimeout(() => {
                //   productPriceFn(values, resetForm, false);
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
                  //    selectCellBomData({ rowData: {}, mode: "A", field: "" });
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
                      name="code"
                      type="text"
                      id="code"
                      label="PurchaseOrder No"
                      variant="filled"
                      placeholder="auto"
                      inputProps={{ readOnly: true }}
                      focused
                      //   value={values.code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.code && !!errors.code}
                      helperText={touched.code && errors.code}
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                      //   autoFocus
                    />
                  </FormControl>
                  <Stack
                    sx={{
                      gridColumn: "span 2",
                    }}
                  >
                    <TextField
                      name="date"
                      type="date"
                      id="name"
                      label="Date"
                      variant="filled"
                      focused
                      //   value={values.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.date && !!errors.date}
                      helperText={touched.date && errors.date}
                      autoFocus
                    />
                  </Stack>
                  <Box sx={{ gridColumn: "span 4" }}>
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
                        // checkboxSelection
                        rows={PurchaseOrderRatingData}
                        columns={columnsRatings}
                        disableSelectionOnClick
                        getRowId={(row) => row.RecordID}
                        // pageSize={10}
                        // onPageSizeChange={(newPageSize) =>
                        //   setPageSize(newPageSize)
                        // }
                        //  onCellClick={(params) => {
                        //    selectCellBomData({
                        //      rowData: params.row,
                        //      mode: "E",
                        //      field: params.field,
                        //    });
                        //  }}
                        rowsPerPageOptions={[5, 10, 20]}
                        pagination
                        components={{
                          Toolbar: () => CustomToolbar("List of Ratings"),
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
                </Box>
                {/* <Box display="flex" justifyContent="end" mt="30px" gap={2}>
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
                      // onClick={()=>productPriceFn(values, resetForm, true)}
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
                </Box> */}
                {/* <Popup
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
          </Popup> */}
              </form>
            )}
          </Formik>
        </Box>
      ) : (
        false
      )}
    </React.Fragment>
  );
};

export default Editpurchaseorderopen;
