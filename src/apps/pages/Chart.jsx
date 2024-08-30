import React ,{useEffect}from "react";
import { Chart } from "react-google-charts";
import {  styled } from '@mui/system';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { IconButton, Tooltip, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../Theme";
import { Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { orderFetchapiData,stockvalueFetchapiData } from "../../store/reducers/Formapireducer";
import { useDispatch,useSelector } from "react-redux";
import TotalGrowthBarChart from "./BarChart";
import DonutChart from "./DonutChart";
import PieChart from "./PieChart";
import { useProSidebar } from "react-pro-sidebar";
// import Chart from 'react-apexcharts';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
const CartBox = styled('div')(() => ({
  padding: '4px',
  width:"100%",
  boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.06),0px 5px 8px 0px rgba(0, 0, 0, 0.042),0px 1px 14px 0px rgba(0, 0, 0, 0.036)',
}));


const Chartboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch()
  const finYear = sessionStorage.getItem("year")
  useEffect(() =>{
   dispatch(orderFetchapiData(finYear))
   dispatch(stockvalueFetchapiData(finYear))
  },[])
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const orderData = useSelector((state) => state.formApi.Data);
  const stockValueData = useSelector((state) => state.formApi.stockValue);
  //  console.log("🚀 ~ file: Chart.jsx:116 ~ Chartboard ~ stockValueData:", stockValueData)
  // console.log("🚀 ~ file: Chart.jsx:114 ~ Chartboard ~ data:", orderData)
  return (
    <React.Fragment>
      
  <Box sx={{ height: "100vh", overflow: "auto" }}>
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box display="flex" borderRadius="3px" alignItems={"center"}>
        {broken && !rtl && (
          <IconButton
            
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        )}
          <Typography variant="h3">Dashboard</Typography>
        </Box>

        <Box display="flex">
       
          <Tooltip title="Logout">
          <IconButton onClick={() => navigate("/")} color="error">
            <LogoutOutlinedIcon />
          </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box m="20px">
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(6, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 6" },
          }}
        >
          <Box sx={{ gridColumn: "span 3" }}>
            <CartBox>
           { orderData &&(
           <PieChart Data={orderData}/>
            )
            }
            </CartBox>
            
          </Box>
          <Box sx={{ gridColumn: "span 3" }}>
          <CartBox>
          { stockValueData &&( 
          <DonutChart Data={stockValueData}/>

            )}
            
            </CartBox>
          </Box>
          <Box sx={{ gridColumn: "span 6" }}>
          <CartBox>
            {/* <Chart
              chartType="BarChart"
              width="100%"
              // height="400px"
              data={msvData}
              options={msvoptions}
            /> */}
            <TotalGrowthBarChart/>
            </CartBox>
          </Box>
        </Box>
      </Box>
      
      {/* <Box
        m={2}
        height="45vh"

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
            backgroundColor: colors.grey[800],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor:  colors.grey[800],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.06),0px 5px 8px 0px rgba(0, 0, 0, 0.042),0px 1px 14px 0px rgba(0, 0, 0, 0.036)',
        }}
      >
        <DataGrid 
        
        // checkboxSelection 
        rows={[]} 
        columns={[{field:"id",headerName:'Id',hide:true},{field:"data",headerName:'Sample Data 1'},{field:"data",headerName:'Sample Data 2'},{field:"data",headerName:'Sample Data 3'}] } 
        disableSelectionOnClick
        // getRowId={row=>row.RecordID}
        // pageSize={pageSize}
  // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
  // rowsPerPageOptions={[5, 10, 20]}
  // pagination   
  // components={{
  //   LoadingOverlay: LinearProgress,
  // }}

        />
      </Box> */}
      </Box>
    </React.Fragment>
  );
};

export default Chartboard;
