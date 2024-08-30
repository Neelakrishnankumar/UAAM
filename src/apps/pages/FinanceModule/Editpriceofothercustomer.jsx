import React, { useState } from "react";
import {
  TextField,
  Box,
  Typography,
  Button,
  IconButton,
  useTheme,
  Tooltip,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Formik } from "formik";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { tokens } from "../../../Theme";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import Popup from "../popup";
import Listviewpopup from "../Lookup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { proPriceTracking, resetTrackingData } from "../../../store/reducers/Formapireducer";
import Swal from "sweetalert2";

const Editpriceofothercustomer = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const YearRecorid = sessionStorage.getItem("YearRecorid");
  const trackingData = useSelector((state) => state.formApi.trackingData);
  const isLoading = useSelector((state) => state.formApi.loading);

  function ProductToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>Price List</Typography>
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
  const row = [
    {
      modelno: "code",
      id: 1,
      description: "description",
      
      price: 100,
    },
  ];

  const column = [
    {
      field: "SLNO",
      headerName: "SLNo",
      width: 50,
    },
    {
      field: "ProductCode",
      headerName: "Code",
      flex: 1,
    },
    {
      field: "ProductDescription",
      headerName: "Description",
      flex: 1,
    },
    // {
    //   field: "Total",
    //   headerName: "Cost",
    //   flex: 1,
    // },
    {
      field: "Amount",
      headerName: "Price",
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
//  CUSTOMER
 const [customerLookup, setCustomerLookup] = useState({
  cusRecordID: "",
  cusCode: "",
  cusName: "",
});

    const [openComPopup, setOpenComPopup] = useState(false);
    const [openCusPopup, setOpenCusPopup] = useState(false);
    function openPopup(type) {
      if (type == "COM") {
        setOpenComPopup(true);
      }
      if (type == "CUS") {
        setOpenCusPopup(true);
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
      if (type == "Customer") {
        setCustomerLookup({
          cusRecordID: childdata.RecordID,
          cusCode: childdata.Code,
          cusName: childdata.Name,
        });
        setOpenCusPopup(false);
      }
    };
    
    // const priceTrackingFn = async () => {
  
    //   const idata = {
    //     CompanyID:companyLookup.comRecordID,
    //     CustomerID:customerLookup.cusRecordID,
    //     YearID:YearRecorid

    //   }
    //   const response = await dispatch(
    //     proPriceTracking({
    //       idata
    //     })
    //   );
    //   // console.log("🚀 ~ file: Editreport.jsx:266 ~ reportFn ~ response:", response)
    // };
    const fnLogOut = (props) =>{
        Swal.fire({
          title: `Do you want ${props}?`,
          // text:data.payload.Msg,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: props
        }).then( (result)=>{
            if(result.isConfirmed){
              if(props === 'Logout'){
              navigate("/")}
              if(props === 'Close'){
                navigate(`/Apps/TR091/Costing`)
              }
            }else{
              return
            }
        })
      }
  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box display="flex" borderRadius="3px" alignItems="center">
          <Typography variant="h3">Price Of Other Customer</Typography>
        </Box>
        <Box display="flex">
        <Tooltip title="Close">
        <IconButton onClick={() =>fnLogOut('Close')} color="error">
              <ResetTvIcon  />
            </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
             <IconButton onClick={() => fnLogOut('Logout')} color="error">
             <LogoutOutlinedIcon />
          </IconButton>
        </Tooltip>
        </Box>
      </Box>

      <Box m="20px">
        <Formik>
          {({}) => (
            <form>
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
              </Box>
              <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                <Button
                //  onClick={priceTrackingFn} 
                 variant="contained" color="secondary">
                  APPLY
                </Button>
                <Button onClick={()=>{
                   setCompanyLookup({
                    comRecordID: "",
                    comCode: "",
                    comName: "",
                  });
                  setCustomerLookup({
                    cusRecordID: "",
                    cusCode: "",
                    cusName: "",
                  });
                  dispatch(resetTrackingData());
                }} variant="contained" color="error">
                  RESET
                </Button>
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
                    rows={[]}
                    loading={isLoading}
                    columns={column}
                    disableSelectionOnClick
                    getRowId={(row) => row.Id}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    onCellClick={(params) => {
                      const currentRow = params.row;
                      const currentcellField = params.field;
                      //   selectcelldata(currentRow, "E", currentcellField);

                      console.log(JSON.stringify(params));
                    }}
                    components={{
                      Toolbar: ProductToolbar,
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
      </Box>
    </React.Fragment>
  );
};

export default Editpriceofothercustomer;
