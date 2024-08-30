import React, { useState } from "react";
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
  Autocomplete,
  MenuItem,
  Collapse,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Formik, Field } from "formik";
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
import ResetTvIcon from "@mui/icons-material/ResetTv";
import Popup from "../popup";
import Listviewpopup from "../Lookup";
import {
  getDCTracking,
  resetTrackingData,
} from "../../../store/reducers/Formapireducer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useParams } from "react-router-dom";
const Editreport = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  var screenName = params.screenName;
  const trackingData = useSelector((state) => state.formApi.trackingData);
  const summeryData = useSelector((state) => state.formApi.summeryData);
  console.log("🚀 ~ file: Editreport.jsx:52 ~ Editreport ~ summeryData:", summeryData)
  const isLoading = useSelector((state) => state.formApi.loading);

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
          <GridToolbarExport
            printOptions={{ disableToolbarButton: true }}
            csvOptions={{
              fileName: `${screenName}`,
            }}
          />
        </Box>
      </GridToolbarContainer>
    );
  }
  
  function summeryCustomToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>Transaction Summery</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <GridToolbarQuickFilter />
          <GridToolbarExport
            printOptions={{ disableToolbarButton: true }}
            csvOptions={{
              fileName: `${screenName}`,
            }}
          />
        </Box>
      </GridToolbarContainer>
    );
  }
  const [pageSize, setPageSize] = React.useState(10);

  const column = [
    {
      field: "SLNO",
      headerName: "SLNO",
      width: 30,
    },
    {
      field: "Date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "DcNo",
      headerName: "DC Number",
      flex: 1,
    },
    {
      field: "Type",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "Description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "Quantity",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "TransactionType",
      headerName: "Transaction Type",
      flex: 1,
    },
    {
      field: "Source",
      headerName: "Source",
      flex: 1,
    },
  ];

  // *************** HEADER PAGE LOOKUP  *************** //
  const [isPopupData, setisPopupdata] = useState(false);

  // COMPANY
  const [companyLookup, setCompanyLookup] = useState({
    comRecordID: "",
    comCode: "",
    comName: "",
  });

  // SUPPLIER
  const [supplierLookup, setSupplierLookup] = useState({
    supRecordID: "",
    supCode: "",
    supName: "",
  });

  // MATERIAL
  const [materialLookup, setMaterialLookup] = useState({
    matRecordID: "",
    matCode: "",
    matName: "",
    matType: "",
  });
 // CUSTOMER
 const [customerLookup, setCustomerLookup] = useState({
  cusRecordID: "",
  cusCode: "",
  cusName: "",
});

const [productLookup, setProductLookup] = useState({
  proRecordID: "",
  proCode: "",
  proName: "",

});
  const [openComPopup, setOpenComPopup] = useState(false);
  const [openSupPopup, setOpenSupPopup] = useState(false);
  const [openMatPopup, setOpenMatPopup] = useState(false);
  const [openCusPopup, setOpenCusPopup] = useState(false);
  const [openProPopup, setOpenProPopup] = useState(false);
  function openPopup(type) {
    if (type == "COM") {
      setOpenComPopup(true);
    }
    if (type == "SUP") {
      setOpenSupPopup(true);
    }
    if (type == "MAT") {
      setOpenMatPopup(true);
    }
    if (type == "CUS") {
      setOpenCusPopup(true);
    }
    if (type == "PRO") {
      if (customerLookup.cusRecordID == "") {
        toast.error("Please select customer Lookup");
      } else 
      setOpenProPopup(true);
    }
  }

  const childToParent = async (childdata, type) => {
    if (type == "Company") {
      setisPopupdata(true);
      setCompanyLookup({
        comRecordID: childdata.RecordID,
        comCode: childdata.Code,
        comName: childdata.Name,
      });
      setOpenComPopup(false);
    }
    if (type == "Supplier") {
      setisPopupdata(true);
      setSupplierLookup({
        supRecordID: childdata.RecordID,
        supCode: childdata.Code,
        supName: childdata.Name,
      });
      setOpenSupPopup(false);
    }
    if (type == "Material") {
      setisPopupdata(true);
      setMaterialLookup({
        matRecordID: childdata.RecordID,
        matCode: childdata.Code,
        matName: childdata.Name,
        matType: childdata.Type,
      });
      setOpenMatPopup(false);
    }
    if (type == "Customer") {
      setCustomerLookup({
        cusRecordID: childdata.RecordID,
        cusCode: childdata.Code,
        cusName: childdata.Name,
      });
      setOpenCusPopup(false);
    }
    if (type == "Product") {
      setProductLookup({
        proRecordID: childdata.ProductRecordID,
        proCode: childdata.Code,
        proName: childdata.Name,
      });
      setOpenProPopup(false);
    }
  };

  const initialValue = {
    dcType:"",
    fromDate: "",
    toDate: "",
    loan: false,
    purchase: false,
    jobwork: false,
    despatches: false,
    repair: false,
    sample: false,
    scrap: false,
  };

  const reportFn = async (values) => {
    const RemarkID = `${values.loan ? "23," : ""}${
      values.purchase ?"22," : ""
    }${values.jobwork ?"26," : ""}${values.despatches ? "28," : ""}${
      values.repair ?"27," : ""
    }${values.sample ? "30," : ""}${values.scrap ? "25," : ""}`;

    const idata = {
      SupplierID: supplierLookup.supRecordID,
      RemarkID: RemarkID
        ? `(${RemarkID.substring(0, RemarkID.length - 1)})`
        : "",
      CompanyID: companyLookup.comRecordID,
      MaterialID: materialLookup.matRecordID,
      Type: materialLookup.matType,
      Fromdate: values.fromDate,
      Todate: values.toDate,
      ProductID:productLookup.proRecordID,
      CustomerID:customerLookup.cusRecordID,
      DcdType:values.dcType
    }
    if(idata.CompanyID || idata.CustomerID || idata.DcdType || idata.Fromdate || idata.MaterialID || idata.ProductID ||idata.RemarkID  ||idata.SupplierID ||idata.Todate ||idata.Type){
    
      setIsShow(false)
      const response = await dispatch(
      getDCTracking({
        idata
      })
    );}
    
    // console.log("🚀 ~ file: Editreport.jsx:266 ~ reportFn ~ response:", response)
  };

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
          navigate("/Apps/TR059/Delivery Type");
        }
      } else {
        return;
      }
    });
  };

  const [isShow, setIsShow] = useState(false)


  // SUMMERY LIST VIEW

  const summeryColumn = [
    {
      field: "SLNO",
      headerName: "SLNO",
      width: 30,
    },
    {
      field: "DATE",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "Type",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "Quantity",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "TransactionType",
      headerName: "Transaction Type",
      flex: 1,
    },
  ];
  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box display="flex" borderRadius="3px" alignItems="center">
          <Typography variant="h3">Delivery Challan Tracking</Typography>
        </Box>
        <Box display="flex">
          <IconButton
            onClick={() => {
              fnLogOut("Close");
            }}
          >
            <ResetTvIcon color="error" />
          </IconButton>
          <IconButton
            onClick={() => {
              fnLogOut("Logout");
            }}
          >
            <LogoutOutlinedIcon color="error" />
          </IconButton>
        </Box>
      </Box>

      <Box m="20px">
        <Formik
          initialValues={initialValue}
          onSubmit={(values, { resetForm }) => {
            setTimeout(() => {
              reportFn(values, resetForm);
            }, 100);
          }}
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
              onReset={() => {
                resetForm();
                setCompanyLookup({
                  comRecordID: "",
                  comCode: "",
                  comName: "",
                });
                setSupplierLookup({
                  supRecordID: "",
                  supCode: "",
                  supName: "",
                });
                setMaterialLookup({
                  matRecordID: "",
                  matCode: "",
                  matName: "",
                  matType: "",
                });
                setCustomerLookup({
                  cusRecordID: "",
                  cusCode: "",
                  cusName: "",
                });
                setProductLookup({
                  proRecordID: "",
                  proCode: "",
                  proName: "",
                })
                dispatch(resetTrackingData());
              }}
            >
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
                    id="outlined-basic"
                    label="Company"
                    variant="filled"
                    focused
                    inputProps={{ tabIndex: "-1" }}
                    value={companyLookup.comCode}
                  />
                  <IconButton
                    onClick={() => openPopup("COM")}
                    sx={{ height: 40, width: 40 }}
                  >
                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                  </IconButton>
                  <TextField
                    id="outlined-basic"
                    variant="filled"
                    fullWidth
                    inputProps={{ tabIndex: "-1" }}
                    value={companyLookup.comName}
                    focused
                  />
                </Box>

                <TextField
                  name="dcType"
                  value={values.dcType}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  sx={{ gridColumn: "span 2" }}
                  variant="filled"
                  focused
                  label="DC Type"
                  select
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value={"I"}>DC In</MenuItem>
                  <MenuItem value={"O"}>DC Out</MenuItem>
                  <MenuItem value={"B"}>Both</MenuItem>
                </TextField>
                <TextField
                  type="date"
                  id="fromDate"
                  label="From Date"
                  variant="filled"
                  focused
                  inputFormat="YYYY-MM-DD"
                  sx={{ gridColumn: "span 2" }}
                  name="fromDate"
                  value={values.fromDate}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <FormControl  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gridColumn: "span 2",
                  }}>


                <TextField
                  name="toDate"
                  type="date"
                  id="toDate"
                  label="To Date"
                  variant="filled"
                  focused
                  inputFormat="YYYY-MM-DD"
                  fullWidth
                  value={values.toDate}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                 <IconButton  onClick={()=>setIsShow(!isShow)}  >
                 {isShow ?<ArrowDropUpIcon/>:<ArrowDropDownIcon/>}
               </IconButton>
                  </FormControl>
</Box>

                <Collapse  in={isShow}>
                <Box
                marginTop="30px"
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
                    id="outlined-basic"
                    label="Supplier"
                    variant="filled"
                    focused
                    inputProps={{ tabIndex: "-1" }}
                    value={supplierLookup.supCode}
                  />
                  <IconButton
                    onClick={() => openPopup("SUP")}
                    sx={{ height: 40, width: 40 }}
                  >
                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                  </IconButton>
                  <TextField
                    id="outlined-basic"
                    variant="filled"
                    fullWidth
                    inputProps={{ tabIndex: "-1" }}
                    value={supplierLookup.supName}
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
                    label="Material"
                    variant="filled"
                    focused
                    inputProps={{ tabIndex: "-1" }}
                    value={materialLookup.matCode}
                  />
                  <IconButton
                    onClick={() => openPopup("MAT")}
                    sx={{ height: 40, width: 40 }}
                  >
                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                  </IconButton>
                  <TextField
                    id="outlined-basic"
                    variant="filled"
                    fullWidth
                    inputProps={{ tabIndex: "-1" }}
                    value={materialLookup.matName}
                    focused
                  />
                </Box>

                <Box sx={{ gridColumn: "span 4" }}>
                  <Field
                    type="checkbox"
                    name="loan"
                    id="loan"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    as={Checkbox}
                    label="Loan"
                  />

                  <FormLabel focused={false}>Loan</FormLabel>

                  <Field
                    type="checkbox"
                    name="purchase"
                    id="purchase"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    as={Checkbox}
                    label="Purchase"
                  />

                  <FormLabel focused={false}>Purchase</FormLabel>
                  <Field
                    type="checkbox"
                    name="jobwork"
                    id="jobwork"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    as={Checkbox}
                    label="Job Work"
                  />

                  <FormLabel focused={false}>Job Work</FormLabel>

         
                  <Field
                    type="checkbox"
                    name="repair"
                    id="repair"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    as={Checkbox}
                    label="Repair"
                  />

                  <FormLabel focused={false}>Repair</FormLabel>
               

                  <Field
                    type="checkbox"
                    name="scrap"
                    id="scrap"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    as={Checkbox}
                    label="Scrap"
                  />

                  <FormLabel focused={false}>Scrap</FormLabel>
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
                    label="Customer"
                    variant="filled"
                    focused
                    inputProps={{ tabIndex: "-1" }}
                    value={customerLookup.cusCode}
                  />
                  <IconButton
                    onClick={() => openPopup("CUS")}
                    sx={{ height: 40, width: 40 }}
                  >
                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                  </IconButton>
                  <TextField
                    id="outlined-basic"
                    variant="filled"
                    fullWidth
                    inputProps={{ tabIndex: "-1" }}
                    value={customerLookup.cusName}
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
                    label="Product"
                    variant="filled"
                    focused
                    inputProps={{ tabIndex: "-1" }}
                    value={productLookup.proCode}
                  />
                  <IconButton
                    onClick={() => openPopup("PRO")}
                    sx={{ height: 40, width: 40 }}
                  >
                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                  </IconButton>
                  <TextField
                    value={productLookup.proName}
                    id="outlined-basic"
                    variant="filled"
                    fullWidth
                    inputProps={{ tabIndex: "-1" }}
                    focused
                  />
                </Box>
                <Box sx={{ gridColumn: "span 4" }}>
                  <Field
                    type="checkbox"
                    name="despatches"
                    id="despatches"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    as={Checkbox}
                    label="Despatches"
                  />

                  <FormLabel focused={false}>Despatches</FormLabel>
                  
                  <Field
                    type="checkbox"
                    name="sample"
                    id="sample"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    as={Checkbox}
                    label="Sample"
                  />

                  <FormLabel focused={false}>Sample</FormLabel>

                  <Field
                    type="checkbox"
                    name="scrap"
                    id="scrap"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    as={Checkbox}
                    label="Scrap"
                  />

                  <FormLabel focused={false}>Scrap</FormLabel>
                </Box></Box>
                </Collapse>

              
              
              <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                <Button type="submit" variant="contained" color="secondary">
                  APPLY
                </Button>
                {/* <Button variant="contained" color="error">
                  FILTER
                </Button> */}
                <Button type="reset" variant="contained" color="error">
                  RESET
                </Button>
              </Box>

              <Box m="5px">
                <Box
                  m="5px 0 0 0"
                  height="400px"
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
                    rows={trackingData}
                    columns={column}
                    disableSelectionOnClick
                    getRowId={(row) => row.Id}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    loading={isLoading}
                    // onCellClick={(params) => {
                    //   const currentRow = params.row;
                    //   const currentcellField = params.field;
                    //     // selectcelldata(currentRow, "E", currentcellField);

                    //   console.log(JSON.stringify(params));
                    // }}
                    components={{
                      Toolbar: CustomToolbar,
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

              <Box m="5px">
                <Box
                  m="5px 0 0 0"
                  height="300px"
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
                    rows={summeryData}
                    columns={summeryColumn}
                    disableSelectionOnClick
                    getRowId={(row) => row.Id}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    loading={isLoading}
                    // onCellClick={(params) => {
                    //   const currentRow = params.row;
                    //   const currentcellField = params.field;
                    //     // selectcelldata(currentRow, "E", currentcellField);

                    //   console.log(JSON.stringify(params));
                    // }}
                    components={{
                      Toolbar: summeryCustomToolbar,
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
            </form>
          )}
        </Formik>
        <Popup
          title="Company"
          openPopup={openComPopup}
          setOpenPopup={setOpenComPopup}
        >
          <Listviewpopup
            accessID="2030"
            screenName="Company"
            childToParent={childToParent}
          />
        </Popup>
        <Popup
          title="Supplier"
          openPopup={openSupPopup}
          setOpenPopup={setOpenSupPopup}
        >
          <Listviewpopup
            accessID="2017"
            screenName="Supplier"
            childToParent={childToParent}
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
          />
        </Popup>
        <Popup
          title="Customer"
          openPopup={openCusPopup}
          setOpenPopup={setOpenCusPopup}
        >
          <Listviewpopup
            accessID="2009"
            screenName="Customer"
            childToParent={childToParent}
          />
        </Popup>
        <Popup
          title="Product"
          openPopup={openProPopup}
          setOpenPopup={setOpenProPopup}
        >
          <Listviewpopup
            accessID="2027"
            screenName="Product"
            childToParent={childToParent}
            filterValue={customerLookup.cusRecordID}
            filterName="parentID"
          />
        </Popup>
      </Box>
    </React.Fragment>
  );
};
export default Editreport;
