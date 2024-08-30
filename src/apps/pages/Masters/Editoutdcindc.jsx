import {
  Checkbox,
  InputLabel,
  useTheme,
  MenuItem,
  Menu,
  Box,
  Button,
  TextField,
  Stack,
  IconButton,
  Avatar,
  FormLabel,
  FormControl,
  Typography,
  FormControlLabel,
  Select,
  Tooltip,
  Breadcrumbs
} from "@mui/material";
import { Formik, Field, useFormik, useFormikContext } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams, useNavigate,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../index";
import {
  fetchApidata,
  postApidata,
  postApidatawol,
} from "../../../store/reducers/Formapireducer";
import { fetchComboData1 } from "../../../store/reducers/Comboreducer";
import React, { useState, useEffect ,useRef} from "react";
import { toast } from "react-hot-toast";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import {colorsSchema,colorshadesSchema} from "../../Security/validation";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Listviewpopup from "../Lookup";
import Popup from "../popup";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { tokens } from "../../../Theme";

import { fetchExplorelitview, Success } from "../../../store/reducers/Explorelitviewapireducer";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
  GridCellEditStopReasons 
} from "@mui/x-data-grid";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from '@mui/icons-material/ResetTv';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";

const Editindcoutdc = () =>{
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rowCount ,setRowCount] = useState(0);
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
            <Typography>List of Dc</Typography>
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
           
          </Box>
        </GridToolbarContainer>
      );
    }
    const [pageSize, setPageSize] = React.useState(10);
  // 

  const location = useLocation();
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  var Type = params.Type;
  const YearFlag = sessionStorage.getItem("YearFlag")
  const Data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.loading);
  const { toggleSidebar, broken, rtl } = useProSidebar();

 
  useEffect(() => {
  //   dispatch(fetchApidata(accessID, "get", recID));
  dispatch(fetchExplorelitview("TR081", "Stock","",""));
 
}, [location.key]);
const [ini ,setIni] = useState(true);
const [loading, setLoading] = useState(false)

var explorelistViewData = useSelector(
  (state) => state.exploreApi.explorerowData
);
console.log("🚀 ~ file: Editbatchissue.jsx:150 ~ Editbatchissue ~ explorelistViewData:", explorelistViewData)
const explorelistViewcolumn = useSelector(
  (state) => state.exploreApi.explorecolumnData
);
// console.log("🚀 ~ file: Editbatchissue.jsx:120 ~ Editbatchissue ~ explorelistViewcolumn:", explorelistViewcolumn)


 /****************************Search ***********/
 
 const VISIBLE_FIELDS = ["SLNO", "Code", "HeaderDate","CodeDesc","Quantity"];
 const columns = React.useMemo(
   () =>
     explorelistViewcolumn.filter((column) =>
       VISIBLE_FIELDS.includes(column.field)
     ),
   [explorelistViewcolumn]
 );

 const row = []


var [getRowId, setGetRowId] = useState('');

    const style = {
  

        height: "55px",
        border: "2px solid #1769aa ",
        borderRadius: "5px",
        backgroundColor: "#EDEDED",
      };
      const [isPopupData, setisPopupdata] = React.useState(false);
      const [openBPpopup, setOpenBPpopup] = useState(false);
      const [OpenSUPpopup, setOpenSUPpopup] = React.useState(false);
      const [selectSUPLookupData, setselectSUPLookupData] = React.useState({
        SUPlookupRecordid: "",
        SUPlookupCode: "",
        SUPlookupDesc: "",
      });

    
      function handleShow(type) {
        if (type == "SUP") {
          setOpenSUPpopup(true);
        }
      }
     //************************** Lookup value assign type based Function *****************/
  const childToParent = (childdata, type) => {
    console.log("type---" + type);
    console.log("Data---" + JSON.stringify(childdata));
    

    if (type == "Supplier") {
        setisPopupdata(true);
        // var filter =`'${childdata.RecordID}'`
       
        dispatch(fetchExplorelitview("TR081", "Stock", childdata.RecordID,""));
        setselectSUPLookupData({
        SUPlookupRecordid: childdata.RecordID,
        SUPlookupCode: childdata.Code,
        SUPlookupDesc: childdata.Name,
      });
      setOpenSUPpopup(false);
      console.log(selectSUPLookupData.SUPlookupRecordid)
     
    }
  };
  
  const isNonMobile = useMediaQuery("(min-width:600px)")

  const fnLogOut = (props) =>{
    //   if(Object.keys(ref.current.touched).length === 0){
    //     if(props === 'Logout'){
    //       navigate("/")}
    //       if(props === 'Close'){
    //         navigate("/Apps/TR022/Bank Master")
    //       }
      
    //       return
    //  }
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
              navigate(`/Apps/TR078/Stock%20Enquiry`)
            }
          }else{
            return
          }
      })
    }
    const ref = useRef(null)
 

  
 
    return(
        <React.Fragment>
            <Box sx={{ height: "100vh", overflow: "auto" }}>
          <Box display="flex" justifyContent="space-between" p={2}>
            <Box
             display="flex"
             borderRadius="3px"
             alignItems="center"
            >
               {broken && !rtl && (
          <IconButton
            
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        )}
               <Breadcrumbs maxItems={2} aria-label="breadcrumb" separator={<NavigateNextIcon sx={{color:'#0000D1'}}/>}>
               <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} onClick={() => { navigate(`/Apps/TR078/Stock%20Enquiry`); }}>Stock Enquiry</Typography>
                    <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} onClick={() => { navigate(`/Apps/TR078/Stock%20Enquiry`); }}> Out Dc vs In Dc</Typography>
           
           
               </Breadcrumbs>
            </Box>
             <Box display="flex">

             <Tooltip title="Close">
          <IconButton onClick={() =>  fnLogOut('Close')} color="error">
              <ResetTvIcon />
            </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
            <IconButton onClick={() => fnLogOut('Logout')} color="error">
              <LogoutOutlinedIcon />
            </IconButton>
            </Tooltip>
             </Box>
          </Box>
          


          <Box
           m="20px"
          >
          <Formik
            //  initialValues={initialValues}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
           
              }, 100);
            }}
            // validationSchema={suppliersSchema}
            enableReinitialize={ini}
          >
            {({
              errors,
              touched,
              handleBlur,
              handleChange,
              isSubmitting,
              values,
              handleSubmit,
              resetForm
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(4 , minMax(0,1fr))"
                  gap="30px"
                  sx={{
                    "& > div":{gridColumn : isNonMobile ? undefined : "span 4"} 
                  }}
                >
                     <FormControl
                  fullWidth
                  sx={{ gridColumn: "span 2", gap: "40px" }}
                >
                  
                           <TextField
                              id="outlined-basic"
                              label="ID"
                              variant="filled"
                              value={selectSUPLookupData.SUPlookupRecordid}
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
                                }}
                              >
                                <TextField
                                  id="outlined-basic"
                                  label="Supplier"
                                  variant="filled"
                                   value={selectSUPLookupData.SUPlookupCode}
                                  focused
                                  required
                                  inputProps={{tabIndex:"-1"}}
                                />
                                <IconButton
                                  sx={{ height: 40, width: 40 }}
                                  onClick={() => handleShow("SUP")}
                                >
                                  <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                </IconButton>
                                {/* <MoreHorizIcon  onClick={()=>handleShow('SM')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                                <TextField
                                  id="outlined-basic"
                                  // label="Description"
                                  variant="filled"
                                  value={selectSUPLookupData.SUPlookupDesc}
                                  fullWidth
                                  inputProps={{tabIndex:"-1"}}
                                  focused
                                />
                              </FormControl>
                            </FormControl>
                   
                    </FormControl>
                 
                      <FormControl fullWidth sx={{gridColumn:"span 4",gap:"40px"}}>
<FormControl>
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
                        key={location.key}
                          // checkboxSelection
                          rows={explorelistViewData}
                           //editMode="row"
                          columns={columns}
                          disableSelectionOnClick
                          getRowId={(row) => row.SLNO}
                          pageSize={pageSize}
                          onPageSizeChange={(newPageSize) =>
                            setPageSize(newPageSize)
                          }
                          rowsPerPageOptions={[5, 10, 20]}
                          pagination
                        
                          onCellDoubleClick={(params) =>{
                            setGetRowId( params.row.RecordID)
                          }}
                          // onRowDoubleClick={handleClickOpen}
                          onCellClick={(params) => {
                           
                            const currentRow = params.row;
                            const currentcellField = params.field;
                           
                            // selectcelldata(currentRow, "E", currentcellField);
                        
                       
                          }}
                          
                          // onCellEditCommit={processRowUpdate}
                          // processRowUpdate={processRowUpdate}
                          
                          // onPreferencePanelClose ={true}
                          components={{
                            Toolbar: CustomToolbar,
                          }}
                          onStateChange={(stateParams) => setRowCount(stateParams.pagination.rowCount)}
                          componentsProps={{
                            toolbar: {
                              showQuickFilter: true,
                              quickFilterProps: { debounceMs: 500 },
                            },
                          }}

                          experimentalFeatures={{ newEditingApi: true }}
                        />
                      </Box>
                    </Box>
                  </FormControl>
      
                    </FormControl>
                
                </Box>
            
                      <Popup
                              title="Supplier"
                              openPopup={OpenSUPpopup}
                              setOpenPopup={setOpenSUPpopup}
                            >
                              <Listviewpopup
                                accessID="2017"
                                screenName="Supplier"
                                childToParent={childToParent}
                              />
                            </Popup>


            </form>


    )}</Formik>
          </Box>
       
    
          </Box>
      </React.Fragment>  
    )
}

export default Editindcoutdc;