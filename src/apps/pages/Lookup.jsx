import { Box,  IconButton,  useTheme,Typography,Tooltip } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

import { tokens } from "../../Theme";
import React from 'react';
import Header from "../../ui-components/Header";
import {useDemoData} from '@mui/x-data-grid-generator';
import Footer from "../../ui-components/Footer";
import { useNavigate,useLocation, NavLink } from "react-router-dom";
import { apiActions } from "../../store/reducers/Listviewreducer";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { fetchLookup } from "../../store/reducers/Lookupapireducer";


const Listviewpopup = ({childToParent,accessID,screenName,filterName,filterValue ,comUomNum}) => {
//  console.log("🚀 ~ file: Lookup.jsx:27 ~ Listviewpopup ~ filterName:", filterName)
 
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = React.useState(10);
  var filter=""
  // console.log("🚀 ~ file: Lookup.jsx:26 ~ Listviewpopup ~ filter", filter)
 
  if((filterName!=undefined)&&(filterValue!=undefined) )
  {


    
    if((accessID=="2013")||(accessID=="2014")||(accessID=="2000")||(accessID=="2025") || (accessID == "2020")|| (accessID == "2031"))
    {
      filter =filterValue;
    }else if (accessID == "2049"){
     filter= filterName+">"+"'"+filterValue+"'";
    }
    else if(accessID=="2005")
    {
   
    if(filterValue=="M")
    {
    filter = "Type NOT IN ('A','C','S')";
    }
    else{
      filter = filterName+"="+"'"+filterValue+"'";
    }
    }
else
{
  if(filterName=="" && filterValue){
 filter =filterValue
  }else filter = filterName+"="+"'"+filterValue+"'";

}
}

// console.log("filterstat"+filter)
  const lookuplistViewData = useSelector((state) => state.lookupApi.lookuprowData);
  const lookuplistViewcolumn = useSelector((state) => state.lookupApi.lookupcolumnData);
  console.log("🚀 ~ Listviewpopup ~ lookuplistViewcolumn:", lookuplistViewcolumn)
  const loading = useSelector((state) => state.lookupApi.loading);
  const compID = sessionStorage.getItem("compID")

  var VISIBLE_FIELDS ;
  if (accessID == "2057") {
    VISIBLE_FIELDS = ['SLNO','Name','Code','Stock',];
  } else if (accessID == "2071"){
    VISIBLE_FIELDS = ['SLNO','Name','Code','LatestRate','FixedRate','LatestRate','Totalqty','MaterialCost'];
  }
  else {
    VISIBLE_FIELDS = ['SLNO','Name','Code',]; 
  }


  const columns = React.useMemo(
    () => lookuplistViewcolumn.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [lookuplistViewcolumn],
  );
  

  React.useEffect(() => {
    dispatch(fetchLookup(accessID,screenName,filter,'',compID,comUomNum));
  },[location.key]);

  var to
  var screen  

  if (accessID === '2003'){
      to = '/Apps/TR025/Country'
      screen = 'Countries'
  }else if ( accessID === '2005'){
    to = '/Apps/TR049/UOM%20Type'
    screen = 'UOM Type'
  }else if (accessID === '2006'){
    to = '/Apps/TR022/Bank'
    screen = 'Bank Master'
  }else if (accessID === '2014'){
    to = '/Apps/TR025/Country'
    screen = 'Countries'
  }else if (accessID === '2004'){
    to = '/Apps/TR023/Currency/EditCurrency/-1/A'
    screen = 'Currency'
  }else if (accessID === '2000'){
    to = '/Apps/TR044/Materials%20Type'
    screen = 'Materials Type'
  }else if ( accessID === '2009'){
    to = '/Apps/TR010/Customers/EditCustomers/-1/A/0'
    screen = 'Customers'
  }else if (accessID === '2017'){
    to = '/Apps/TR009/Suppliers/EditSuppliers/-1/A'
    screen = 'Suppliers'
  }else if ( accessID === '2020'){
    to = '/Apps/TR058/Remarks%20Type'
    screen = 'Remarks'
  }else if ( accessID === '2011'){
    to = '/Apps/TR044/Materials%20Type'
    screen = 'Material Categories'
  }else if (accessID === '2007'){
    to = '/Apps/TR083/Colors%20-%20Material%20type'
    screen = 'colors'

  }else if (accessID === '2022'){
    to = '/Apps/TR061/Grade/EditGrade/-1/A'
    screen = 'Grade'
  }else if (accessID === '2022'){
    to = '/Apps/TR157/Ratings/EditPurchaseOrderParameter/-1/A'
    screen = 'Ratings'
  }else if (accessID === '2023'){
    to = '/Apps/TR062/Substance/EditSubstance/-1/A'
    screen = 'Substance'
  }else if ( accessID === '2024'){
    to = '/Apps/TR027/Employees/EditEmployees/-1/A'
    screen = 'Employees'
  }else if (accessID === '2013'){
    to = '/Apps/TR044/Materials%20Type'
    screen = 'Materals Type'
  }else if ( accessID === '2008'){
     to = '/Apps/TR036/Airlines/EditAirlines/-1/A'
     screen = 'Airlines'
  }else if( accessID === '2010'){
    to = '/Apps/TR026/Department/EditDepartment/-1/A'
    screen = 'Department'
  }
  else if( accessID === '2002'){
    to = '/Apps/TR002/Categories'
    screen = 'Categories'
  }else if( accessID === '2019'){
    to = '/Apps/TR002/Categories'
    screen = 'Categories'
  }else if( accessID === '2001'){
    to = '/Apps/TR072/Process%20Stage'
    screen = 'Process Stage'
  }
  else if( accessID === '2027'){
    to = '/Apps/TR002/Categories'
    screen = 'Categories'
  }
  else if( accessID === '2031'){
    to = '/Apps/TR044/Materials%20Type'
    screen = 'Materals Type'
  }
  else if( accessID === '2030'){
    to = '/Apps/TR014/Company'
    screen = 'Company'
  }
  else if( accessID === '2033'){
    to = '/Apps/TR043/Invoice%20Types'
    screen = 'Invoice'
  }
  else if( accessID === '2037'){
    to = '/Apps/TR023/Currency'
    screen = 'Currency'
  }
  else if( accessID === '2034'){
    to = '/Apps/TR044/Materials%20Type'
    screen = 'Material'
  }
  else if( accessID === '2034'){
    to = '/Apps/TR044/Materials%20Type'
    screen = 'Material'
  }
  else if( accessID === '2044'){
    to = '/Apps/TR083/Colors%20-%20Material%20type'
    screen = 'Color'
  }
  else if( accessID === '2032'){
    to = '/Apps/TR085/Over%20Head'
    screen = 'Over Head'
  }
  else if( accessID === '2038'){
    to = '/Apps/TR044/Materials%20Type'
    screen = 'Material'
  }

  else if( accessID === '2039'){
    to = '/Apps/TR099/Companies'
    screen = 'Companies'
  }
  else if( accessID === '2040'){
    to = '/Apps/TR096/HSN'
    screen = 'HSN'
  }
  else if( accessID === '2035'){
    to = '/Apps/TR072/Process%20Stage'
    screen = 'Process/Stage'
  }
  else if( accessID === '2036'){
    to = '/Apps/TR044/Materials%20Type'
    screen = 'Material'
  }
  else if( accessID === '2041'){
    to = '/Apps/TR044/Materials%20Type'
    screen = 'Material'
  }
  else if( accessID === '2029'){
    to = '/Apps/TR043/Invoice%20Types'
    screen = 'Invoice'
  }
  else if( accessID === '2045'){
    to = '/Apps/TR002/Categories'
    screen = 'Categories'
  }
  else if( accessID === '2043'){
    to = '/Apps/TR044/Materials%20Type'
    screen = 'Material'
  }

  
  else{
    to = accessID
    screen = screenName
  }

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
        <Typography variant='h5'  mt='2px'>{screenName}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <GridToolbarQuickFilter />
          <Tooltip title="Add" >
          {/* {/ <NavLink to={`/Apps/${to}/${screen}`} target='_blank' rel="opener"> /} */}
          
          <NavLink to={to} target='_blank' rel="opener">
          <IconButton color="primary"  >
            <AddOutlinedIcon />
          </IconButton>
          </NavLink>
          </Tooltip>
          {/* <Tooltip title="Reset" >
          <IconButton color="primary"  >
            <BackspaceOutlinedIcon />
          </IconButton>
          </Tooltip> */}
        </Box>
      </GridToolbarContainer>
    );
  }

  return (
    <React.Fragment>
     
    <Box >
   
          <Box
      
        // height="70vh"
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
      {lookuplistViewcolumn && <DataGrid sx={{ height:500, width:{xs:'100%',md:800} }}
        
        // checkboxSelection 
        rows={lookuplistViewData} 
        columns={columns} 
        disableSelectionOnClick
        getRowId={row=>row.RecordID}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination   
           onRowClick={(params) => {
           const currentRow = params.row;            
            childToParent(currentRow,screenName,filterValue);
      } }
    components={{
      Toolbar: CustomToolbar,
    }}
    componentsProps={{
      toolbar: {
        showQuickFilter: true,
        quickFilterProps: { debounceMs: 500 },
      },
    }}
    loading={loading}
        />}
      </Box>
     
    </Box>
    
     </React.Fragment>
  );
};
//export const screenNames = Listviewpopup.screenName;
export default Listviewpopup;