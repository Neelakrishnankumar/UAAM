import { Box,  IconButton,  useTheme,Tooltip,Stack } from "@mui/material";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import { DataGrid, } from "@mui/x-data-grid";
// import { tokens } from "../../Theme";
import Header from "../../../ui-components/Header";
import {tokens} from "../../../Theme"

import React from 'react';



import { useNavigate } from "react-router-dom";
const columns = [
    { field: 'id', headerName: 'id' ,hide:true},
  { field: 'SL', headerName: 'SL#', width: 60 },
  { field: 'Product', headerName: 'Product',width:100},
  { field: 'Description', headerName: 'Description',flex:1 },
  { field: 'Qty', headerName: 'Qty', width: 60 },
  { field: 'Rate', headerName: 'Rate', width: 60  },
  { field: 'Hide', headerName: 'Hide', width: 60  },
  { field: 'HideSqFt', headerName: 'Hide SqFt',width: 60  },
  { field: 'Side', headerName: 'Side', width: 60  },
  { field: 'SideSqFt', headerName: 'Side SqFt',width: 60  },
  { field: 'Amount', headerName: 'Amount', width: 60  },
 
];

const rows = [
  { id: 1, SL: '1', Product: 'jw81wy',Description:'Kangaroo Finished Leather Lace LHG Whisky -109',Qty:'881.38',Rate:'.75',Amount:'661.04', },
  { id: 2, SL: '2', Product: 'jwgree',Description:'Kangaroo Finished Leather Lace Grey co:No.20',Qty:'603.55',Rate:'.95',Amount:'573.75', },
  { id: 3, SL: '3', Product: 'jwecsbc',Description:'Kangaroo Finished Leather Lace Sky Blue Col:No.74',Qty:'93.22',Rate:'.95',Amount:'88.56', },


];

const Proformatrailer = () => {


  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <React.Fragment>
    <Box m="20px">  {/*onClick={() => {navigate(`/Apps/DetailScreen/Edit${screenName}/${accessID}/-1/A`)}} */}

 
     
      <Box
       
        height="500px"
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
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid 
         
        rows={rows} 
        columns={columns} 
        disableSelectionOnClick
       
        />
      </Box>
  
    </Box>
   
     </React.Fragment>
  );
};

export default Proformatrailer;