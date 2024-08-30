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
 stockorder,
 resetTrackingData,
} from "../../../store/reducers/Formapireducer";
import { useNavigate,useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
const Editstockcare = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let params = useParams();
  var Typesdata = params.Type;
//   const trackingData = useSelector((state) => state.formApi.trackingData);
//   const summeryData = useSelector((state) => state.formApi.summeryData);
//   console.log("🚀 ~ file: Editreport.jsx:52 ~ Editreport ~ summeryData:", summeryData)
//   const isLoading = useSelector((state) => state.formApi.loading);
const stockorderData = useSelector((state) => state.formApi.stockorderData);
const getLoading = useSelector((state) => state.formApi.trackingLoading);
console.log("stockorder",stockorderData);
  // function CustomToolbar() {
  //   return (
  //     <GridToolbarContainer
  //       sx={{
  //         display: "flex",


  
  //         flexDirection: "row",
  //         justifyContent: "space-between",
  //       }}
  //     >
  //       <Box sx={{ display: "flex", flexDirection: "row" }}>
  //         <Typography>Transaction History</Typography>
  //       </Box>
  //       <Box
  //         sx={{
  //           display: "flex",
  //           flexDirection: "row",
  //           justifyContent: "space-between",
  //         }}
  //       >
  //         <GridToolbarQuickFilter />
  //       </Box>
  //     </GridToolbarContainer>
  //   );
  // }
  var materialType = "";
  // console.log("---" + JSON.stringify(Data));
  var BC_type_Material = "";
  if (Typesdata == "M") {
    materialType = "Material Category";
    BC_type_Material = "Material Type";
  }
  function stockOrderMaterial() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>Stock Order</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <GridToolbarQuickFilter />
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
      field: "Code",
      headerName: "Code",
      flex: 1,
    },
    {
      field: "Description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "Uom",
      headerName: "UOM",
      flex: 1,
    },
    {
      field: "StockQty",
      headerName: "Stock",
      flex: 1,
    },
   
    
  ];

  // *************** HEADER PAGE LOOKUP  *************** //
 

 
  
  const initialValue = {
    
    StockCareBy:"",
    Reorderlevel:"",
  };

  const FnSave = async (values) => {
   
    const data = {
      Type:Typesdata,
      StockCareBy:values.StockCareBy,
      Reorderlevel:values.Reorderlevel,
    }
    
    setIsShow(false)

    const response = await dispatch(stockorder({data}))
    if(response.payload.status == 200){
      toast.success(response.payload.message)
    }else{
      
      toast.error(response.payload.message)
    }
    // console.log("🚀 ~ FnSave ~ response:", response)
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
          navigate(`/Apps/Secondarylistview/TR003/Material%20Category/${Typesdata}`);
        }
      } else {
        return;
      }
    });
  };

  const [isShow, setIsShow] = useState(false)


  // SUMMERY LIST VIEW

 
  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box display="flex" borderRadius="3px" alignItems="center">
          <Typography variant="h3">Material Stock Order</Typography>
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
             FnSave(values, resetForm);
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
               

                <TextField
                  name="StockCareBy"
                   value={values.StockCareBy}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  sx={{ gridColumn: "span 2" }}
                  variant="filled"
                  focused
                  label="Stock Care By"
                  select
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value={"D"}>Daily</MenuItem>
                  <MenuItem value={"W"}>Weekly</MenuItem>
                  <MenuItem value={"M"}>Monthly</MenuItem>
                  <MenuItem value={"A"}>Any Time</MenuItem>
                </TextField>
                <TextField
                  name="Reorderlevel"
                    value={values.Reorderlevel}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  sx={{ gridColumn: "span 2" }}
                  variant="filled"
                  focused
                  label="Stock Reach Below"
                  select
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value={"M"}>Stock Quantity Less Then Minimum Quantity</MenuItem>
                  <MenuItem value={"R"}>Stock Quantity Less Then Reorder Quantity</MenuItem>
                 
                </TextField>
               
</Box>

                {/* <Collapse  in={isShow}>
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
                </Collapse> */}

              
              
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
                  loading={getLoading}
                    rows={stockorderData}
                    columns={column}
                    disableSelectionOnClick
                    getRowId={(row) => row.RecordID}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    // loading={isLoading}
                    // onCellClick={(params) => {
                    //   const currentRow = params.row;
                    //   const currentcellField = params.field;
                    //     // selectcelldata(currentRow, "E", currentcellField);

                    //   console.log(JSON.stringify(params));
                    // }}
                    components={{
                      Toolbar: stockOrderMaterial,
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
        
      </Box>
    </React.Fragment>
  );
};
export default Editstockcare;
