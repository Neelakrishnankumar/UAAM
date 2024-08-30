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
import React, { useState, useEffect ,useRef } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

import {colorsSchema,colorshadesSchema} from "../../Security/validation";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Listviewpopup from "../Lookup";
import Popup from "../popup";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { tokens } from "../../../Theme";

import { addtionalQtyCal, fetchExplorelitview, lookupOpen, Success } from "../../../store/reducers/Explorelitviewapireducer";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
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
const Editbatchissue = () =>{
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
            <Typography>List of Material Issue</Typography>
            {/* <Typography variant="h5">{`(${explorelistViewData.length})`}</Typography> */}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <GridToolbarQuickFilter />
            <IconButton >
              <AddOutlinedIcon />
            </IconButton>
          </Box>
        </GridToolbarContainer>
      );
    }
    const [pageSize, setPageSize] = React.useState(10);
  // 


  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var Edit = params.Edit;
  var accessID = params.accessID;
  var Type = params.Type;
  const YearFlag = sessionStorage.getItem("YearFlag")
  const Year = sessionStorage.getItem("year")
  const Data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.loading);
  const isPopupOpen = useSelector((state) => state.exploreApi.isLookupOpen);
  console.log("🚀 ~ file: Editbatchissue.jsx:118 ~ Editbatchissue ~ isPopupOpen:", isPopupOpen)
  const { toggleSidebar, broken, rtl } = useProSidebar();

  const filter = `${recID} AND Pstype='${Type}' AND Finyear='${Year}'`
  useEffect(() => {
    dispatch(fetchApidata(accessID, "get", recID));
    dispatch(fetchExplorelitview("TR075", "Material Issue", filter,""));
 
}, []);
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

 const VISIBLE_FIELDS = ["SLNO", "Code", "Description","STOCK","RequiredQty","IssuedQty","Balance", "action","AlreadyIssuedQty","lookup"];
 const columns = React.useMemo(
   () =>
     explorelistViewcolumn.filter((column) =>
       VISIBLE_FIELDS.includes(column.field)
     ),
   [explorelistViewcolumn]
 );

 const row = []


 
 const fnSave = async() => {
  if(Data.Process == "Y"){
    toast.error("Your data Already Processed edit not Applicable")
    return
  }
  setLoading(true)
  setIni(false)
  
  for(let check of explorelistViewData){
        if (check.StockCalculationYN !== "Y"){
          toast.error(check.Code+ "-- Please Check Stock")
          setLoading(false)
          return;
        }
        if(Number(check.IssuedQty) &&  Number( check.AlreadyIssuedQty) >= Number(check.RequiredQty)){
          toast.error("Alredy Required Qty is Max")
          setLoading(false)
          return;
        }
        if(Number(check.IssuedQty) && Number(check.IssuedQty) > Number( check.RequiredQty)) {
          toast.error("Issue Qty must less than Required Qty ")
          setLoading(false)
          return;
        }
  }

  
  const data = await dispatch(postApidata("TR076", "insert", explorelistViewData));
  console.log("🚀 ~ file: Editbatchissue.jsx:170 ~ fnSave ~ data:", data)
  if (data.payload.Status == "Y") {
    toast.success(data.payload.Msg);
    setLoading(false)
    navigate(`/Apps/Secondarylistview/TR074/BATCHS/${Type}`);  
  } else {
    toast.error(data.payload.Msg)
    setLoading(false) 
  };
  
 }
 





var [getRowId, setGetRowId] = useState('');


var spreaddata =[...explorelistViewData]
const i = explorelistViewData.findIndex(x => x.RecordID == getRowId)
  








// console.log(expoListRow);
 const processRowUpdate = (newRow) => {
  const updatedRow = { ...newRow};
  // console.log("🚀 ~ file: Editbatchissue.jsx:203 ~ processRowUpdate ~ updatedRow.IssuedQty:", updatedRow.IssuedQty)
  // console.log("🚀 ~ file: Editbatchissue.jsx:204 ~ processRowUpdate ~ updatedRow.RequiredQty :", updatedRow.RequiredQty )
  if(Number(updatedRow.IssuedQty) && Number(updatedRow.IssuedQty) <= Number( updatedRow.RequiredQty) && !Number( updatedRow.AlreadyIssuedQty) >= Number(updatedRow.RequiredQty) ){
  updatedRow.Balance = (updatedRow.RequiredQty - updatedRow.IssuedQty) - updatedRow.AlreadyIssuedQty
  spreaddata[i] = updatedRow  
 dispatch(Success({rowDataBatch :spreaddata, screen:"batch"}))
}else if(Number(updatedRow.IssuedQty) &&  Number( updatedRow.AlreadyIssuedQty) >= Number(updatedRow.RequiredQty)){
  toast.error("Alredy Required Qty is Max")
}else if(Number(updatedRow.IssuedQty) && Number(updatedRow.IssuedQty) > Number( updatedRow.RequiredQty)) toast.error("Issue Qty must less than Required Qty  ")
};





    const style = {
        height: "55px",
        border: "2px solid #1769aa ",
        borderRadius: "5px",
        backgroundColor: "#EDEDED",
      };
      const [isPopupData, setisPopupdata] = React.useState(false);
      const [openBPpopup, setOpenBPpopup] = useState(false);
      const [selectBPLookupData, setselectBPLookupData] = React.useState({
        BPlookupRecordid: "",
        BPlookupCode: "",
        BPlookupDesc: "",
      });

      if (isPopupData == false) {
        selectBPLookupData.BPlookupRecordid = Data.ProductioncardRecordID;
        // selectBPLookupData.BPlookupCode = Data.CountryCode;
        selectBPLookupData.BPlookupDesc = Data.ProductionNumber;
      }
      function handleShow(type) {
        if (type == "BP") {
          setOpenBPpopup(true);
        }
      }
     //************************** Lookup value assign type based Function *****************/
  const childToParent = (childdata, type) => {
    console.log("Data---" + JSON.stringify(childdata));
    dispatch(lookupOpen())
    dispatch(Success({rowDataBatch :{}, screen:"batch"}))
    if (type == "Production Card") {
        setisPopupdata(true);
      setselectBPLookupData({
        BPlookupRecordid: childdata.RecordID,
        BPlookupCode: childdata.Name,
        BPlookupDesc: childdata.Code,
      });
      setOpenBPpopup(false);
    }
  };


  
  const isNonMobile = useMediaQuery("(min-width:600px)")

  var apiData = "";
  apiData = {
    BatchDate: Data.BatchDate,
    BatchQty: Data.BatchQty,
    Reference: Data.Reference,
    Status: Data.Status,
  
  };
  //*******Assign supplymaster values from Database in  Yup initial value******* */
  const initialValues = {
    BatchDate: apiData.BatchDate,
    BatchQty: Number(apiData.BatchQty).toFixed(4),
    // Reference: Data.Reference + Year,
    Reference: Data.Reference,
    Status: Data.Status,
    AdditionalQty:Data.AdditionalQTY
  };



  var apprval = "";
  if (accessID == "TR074") {
   
    if (Type == "CC") {
      apprval = "Cutting Component";
    }
    if (Type == "PC") {
      apprval = "Production";
    }
    if (Type == "PK") {
      apprval = "Packing";
    }
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
   
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [batchPopupData,setBatchPopupData] = useState({
    RecordID:"",
    SLNO:"",
    BatchRecordID:"",
    MatlRecordID:"",
    Code:"",
    Description:"",
    RequiredQty:"",
    AlreadyIssuedQty:"",
    IssuedQty:"",
    Balance:"",
    parentID:"",
    Pstype:"",
    HideQty:"",
    SideQty:"",
    HideSqft:"",
    SideSqft:"",
    TotalQty:'',
    BIType:"",
    Finyear:"",
    StockCalculation:"",
    StockCalculationYN:"",
    STOCK:"",

  })
  const selectcelldata = (data, bMode, field) => {
    console.log("selectdata" + JSON.stringify(data));

    // setBomode(bMode);
//  console.log(newObj);
    if (bMode == "A") {
      setBatchPopupData(
        {
          RecordID:"",
          SLNO:"",
          BatchRecordID:"",
          MatlRecordID:"",
          Code:"",
          Description:"",
          RequiredQty:"",
          AlreadyIssuedQty:"",
         
          Balance:"",
          parentID:"",
          Pstype:"",
          HideQty:"",
          SideQty:"",
          HideSqft:"",
          SideSqft:"",
          BIType:"",
          Finyear:"",
          StockCalculation:"",
          StockCalculationYN:"",
          STOCK:"",
        }
      )

      
    } else {
      if (field == "action") {
        
        setGetRowId(data.RecordID)
        setBatchPopupData({
            RecordID:data.RecordID,
            SLNO:data.SLNO,
            BatchRecordID:data.BatchRecordID,
            MatlRecordID:data.MatlRecordID,
            Code:data.Code,
            Description:data.Description,
            RequiredQty:data.RequiredQty,
            AlreadyIssuedQty:data.AlreadyIssuedQty,
            Balance:data.Balance,
            parentID:data.parentID,
            Pstype:data.Pstype,
            HideQty:data.HideQty,
            SideQty:data.SideQty,
            HideSqft:data.HideSqft,
            SideSqft:data.SideSqft,
            STOCK:data.STOCK,
            BIType:data.BIType,
            Finyear:data.Finyear,
            StockCalculation:data.StockCalculation,
            StockCalculationYN:data.StockCalculationYN,
           
          })
        setOpen(true);
      }
    }
  };
  const popupinitialValue = {
    Code:batchPopupData.Code,
    Description:batchPopupData.Description,
    IssuedQty:batchPopupData.IssuedQty,
    Balance:batchPopupData.Balance,
    HideQty:batchPopupData.HideQty,
    SideQty:batchPopupData.SideQty,
    HideSqft:batchPopupData.HideSqft,
    SideSqft:batchPopupData.SideSqft,
  
    TotalQty:'',
  }
  
  const calculateTotal = (values) => {
   values.TotalQty =  Number(values.HideSqft) +  Number(values.SideSqft)
  }
 
  const rowReplace = async(value) => {

    const newObj = {
       RecordID:batchPopupData.RecordID,
      SLNO:batchPopupData.SLNO,
      BatchRecordID:batchPopupData.BatchRecordID,
      MatlRecordID:batchPopupData.MatlRecordID,
      Code:batchPopupData.Code,
      Description:batchPopupData.Description,
      RequiredQty:batchPopupData.RequiredQty,
      AlreadyIssuedQty:batchPopupData.AlreadyIssuedQty,
      Balance: Number(batchPopupData.RequiredQty) -(Number( batchPopupData.AlreadyIssuedQty)+ Number( value.TotalQty)),
      parentID:batchPopupData.parentID,
      Pstype:batchPopupData.Pstype,
      IssuedQty:value.TotalQty,  
      HideQty:value.HideQty, 
      SideQty:value.SideQty,
      SideSqft:value.SideSqft,
      HideSqft:value.HideSqft,
      STOCK:batchPopupData.STOCK,
      BIType:batchPopupData.BIType,
      Finyear:batchPopupData.Finyear,
      StockCalculation:batchPopupData.StockCalculation,
      StockCalculationYN:batchPopupData.StockCalculationYN,
    }
  
    setTimeout( () => {  spreaddata[i] = newObj },500)

    setTimeout( () => {dispatch(Success({rowDataBatch :spreaddata, screen:"batch"}))},1500)
    setOpen(false);
  }
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
              navigate(`/Apps/Secondarylistview/TR074/BATCHS/${Type}`)
            }
          }else{
            return
          }
      })
    }
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
                    <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} onClick={() => { navigate(`/Apps/TR076/Batch Process`); }}>Batchs</Typography>
            <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} onClick={() => { navigate(`/Apps/Secondarylistview/TR074/BATCHS/${Type}`); }}>{apprval}</Typography>
           
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
             initialValues={initialValues}
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
                    
<FormControl
                        sx={{
                          gridColumn: "span 2",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <TextField
                          id="outlined-basic"
                          label="ID"
                          variant="filled"
                          value={selectBPLookupData.BPlookupRecordid}
                          focused
                          sx={{ display: "none" }}
                        />
                       <TextField
                          id="outlined-basic"
                          label="Production Card"
                          variant="filled"
                          value={selectBPLookupData.BPlookupDesc}
                          fullWidth
                          focused
                          required
                          inputProps={{tabIndex:"-1"}}
                        />
                        <IconButton
                          sx={{ height: 40, width: 40 }}
                          // onClick={() => handleShow("BP")}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>
                        {/* <MoreHorizIcon onClick={()=>handleShow('PUR')} color='white' sx={{height:'30px',}} mt='15px' fontSize='medium' /> */}
                      </FormControl>

                    
                            

                            


                             

                     <TextField
                    fullWidth
                    variant="filled"
                    type="date"
                    value={values.BatchDate}
                    id="BatchDate"
                    name="BatchDate"
                    label="Batch Date"
                    InputProps={{ readOnly: true }}
                     onBlur={handleBlur}
                    onChange={handleChange}
                    inputFormat="YYYY-MM-DD"
                    // error={!!touched.Code && !!errors.Code}
                    // helperText={touched.Code && errors.Code}
                    
                    inputProps={{readOnly:true}}
                    focused
                    />

                     <TextField
                  fullWidth
                  variant="filled"
                  type="numb er"
                   id="BatchQty"
                  name="BatchQty"
                  value={values.BatchQty}
                  label="Quantity"
                  inputProps={{readOnly:true}}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  // error={!!touched.Code && !!errors.Code}
                  // helperText={touched.Code && errors.Code}
                
                  focused
                  
                  InputProps={{ readOnly: true
                  }}
                  
                  sx={{ background: "#fff6c3",input:{textAlign: "right"}}}
                       onInput={(e) => {
                         e.target.value = Math.max(0, parseInt(e.target.value))
                           .toString()
                           .slice(0, 5);
                       }}
                      //  InputProps={{
                      //   inputProps: {
                      //     style: { textAlign: "right" },
                      //   },
                      // }}
                    />
                    </FormControl>
                    <FormControl fullWidth sx={{gridColumn:"span 2",gap:"40px"}}>

                   <TextField
                     fullWidth
                     variant="filled"
                     type="text"
                      id="Reference"
                     name="Reference"
                     value={values.Reference}
                     label="Batch#"
                     
                     onBlur={handleBlur}
                     onChange={handleChange}
                     // error={!!touched.Code && !!errors.Code}
                     // helperText={touched.Code && errors.Code}
                     InputProps={{ readOnly: true }}
                     
                     focused
                    />

                     <FormControl>
                  
                     <Field
                      as="select"
                      label="Type"
                      // onChange={handleChange}
                      
                      value={values.Status}
                     id="Status"
                     
                      // name="Status"
                      focused
                       
                       style={style}
                       InputProps={{ readOnly: true }}
                       >
                       <option>Status</option>
                        <option disabled value="Y">Yet to Start</option>
                        <option disabled value="I">Inprogress</option>
                         <option disabled value="C">Completed</option>
                               
                       </Field>
                      </FormControl>
                     
                    <FormControl
                        sx={{
                          gridColumn: "span 2",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                
                <TextField
                     fullWidth
                     variant="filled"
                     type="number"
                      id="AdditionalQty"
                     name="AdditionalQty"
                     value={values.AdditionalQty}
                     label="Additional Qty"
                     onWheel={(e) => e.target.blur()} 
                     onBlur={handleBlur}
                     onChange={handleChange}
                     // error={!!touched.Code && !!errors.Code}
                     // helperText={touched.Code && errors.Code}
                     sx={{ background: "#fff6c3",input:{textAlign: "right"}}}
                      
                      
                    //  InputProps={{ readOnly: true }}
                     focused
                    />
                         <Button  size="small" disabled={values.AdditionalQty == 0} variant="contained" color="primary"   onClick={()=>dispatch(addtionalQtyCal({listviewData:explorelistViewData,values}))}>
                  Recalculate
              </Button>
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
                          '& .gridcolor': {
                            backgroundColor: '#f5cbae',
                            color: '#1a3e72',
                          },
                          
                        }}
                      >
                        <DataGrid
                        // key={i}
                          // checkboxSelection
                          rows={explorelistViewData}
                           //editMode="row"
                          columns={columns}
                          disableSelectionOnClick
                          getRowId={(row) => row.RecordID}
                          pageSize={pageSize}
                          onPageSizeChange={(newPageSize) =>
                            setPageSize(newPageSize)
                          }
                          rowsPerPageOptions={[5, 10, 20]}
                          pagination
                          getRowClassName={(params) =>
                            params.row.StockCalculationYN == 'Y' ? '' : 'gridcolor'
                          }
                          onCellDoubleClick={(params) =>{
                            setGetRowId( params.row.RecordID)
                          }}
                          onRowDoubleClick={handleClickOpen}
                          onCellClick={(params) => {
                           
                            const currentRow = params.row;
                            const currentcellField = params.field;
                           
                            selectcelldata(currentRow, "E", currentcellField);
                        
                       
                          }}
                          
                          // onCellEditCommit={processRowUpdate}
                          processRowUpdate={processRowUpdate}
                          
                          // onPreferencePanelClose ={true}
                          components={{
                            Toolbar: CustomToolbar,
                          }}
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
               {Edit=="N"?
               <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                <Button variant="contained" color="error"   onClick={() => {
                  navigate(`/Apps/Secondarylistview/TR074/BATCHS/${Type}`);
                }}>
                  CANCEL
              </Button>
              </Box>
               : <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                  
               {
 YearFlag == 'true' ? (
  
               
                <LoadingButton
                color="secondary"
                variant="contained"
                type="submit"
                loading={loading}
                onClick={() => {
                 fnSave()
               }}
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
                
 )
}
                 <Button variant="contained" color="error"   onClick={() => {
                       navigate(`/Apps/Secondarylistview/TR074/BATCHS/${Type}`);
                     }}>
                       CANCEL
                   </Button>
                     </Box>}
                      <Popup
                              title="Production Card"
                              openPopup={openBPpopup}
                              setOpenPopup={setOpenBPpopup}
                            >
                              <Listviewpopup
                                accessID="2021"
                                screenName="Production Card"
                                childToParent={childToParent}
                              />
                            </Popup>
                            <Popup
                              title="Leather"
                              openPopup={isPopupOpen}
                              setOpenPopup={()=>dispatch(lookupOpen())}
                            >
                              <Listviewpopup
                                accessID="2021"
                                screenName="Leather"
                                childToParent={childToParent}
                              />
                            </Popup>


            </form>


    )}</Formik>
          </Box>
       
      <Dialog open={open} onClose={handleClose}>
      <Formik
             initialValues={popupinitialValue}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                rowReplace(values)
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
              <form onSubmit={handleSubmit} onChange={calculateTotal(values)}>
        <DialogTitle>Leather</DialogTitle>
        <DialogContent>
          
          <DialogContentText>
       
          </DialogContentText>
         
          <TextField
            focused
            margin="dense"
            id="Description"
            name="Description"
            label="Item"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Description}
            type="text"
            fullWidth
            variant="filled"
          />
         
           <TextField
            focused
            margin="dense"
            name="HideQty"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.HideQty}
            label="Hide Qty"
            type="number"
            fullWidth
            variant="filled"
            sx={{ background: "#fff6c3",input:{textAlign: "right", step: "1"}}}
            // onInput={(e) => {
            //   e.target.value = Math.max(0, parseInt(e.target.value))
            //     .toString()
            //     .slice(0, 5);
            // }}
          />
           
           <TextField
            focused
            margin="dense"
            name="SideQty"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.SideQty}
            label="Side Qty"
            type="number"
            fullWidth
            variant="filled"
            sx={{ background: "#fff6c3",input:{textAlign: "right", step: "1"}}}
            // onInput={(e) => {
            //   e.target.value = Math.max(0, parseInt(e.target.value))
            //     .toString()
            //     .slice(0, 5);
            // }}
          />

<TextField
            focused
            margin="dense"
            name="SideSqft"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.SideSqft}
            label="SideSqft"
            type="number"
            fullWidth
            variant="filled"
            sx={{ background: "#fff6c3",input:{textAlign: "right", step: "1"}}}
            // onInput={(e) => {
            //   e.target.value = Math.max(0, parseInt(e.target.value))
            //     .toString()
            //     .slice(0, 5);
            // }}
          />

<TextField
            focused
            margin="dense"
            name="HideSqft"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.HideSqft}
            label="HideSqft"
            type="number"
            fullWidth
            variant="filled"
            sx={{ background: "#fff6c3",input:{textAlign: "right", step: "1"}}}
            // onInput={(e) => {
            //   e.target.value = Math.max(0, parseInt(e.target.value))
            //     .toString()
            //     .slice(0, 5);
            // }}
          />

           <TextField
            focused
            margin="dense"
            name="TotalQty"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.TotalQty}
            label="Total Qty"
            type="number"
            fullWidth
            variant="filled"
            sx={{ background: "#fff6c3",input:{textAlign: "right", step: "1"}}}
            // onInput={(e) => {
            //   e.target.value = Math.max(0, parseInt(e.target.value))
            //     .toString()
            //     .slice(0, 5);
            // }}
          />
          
        </DialogContent>
        <DialogActions>
          <Button type="submit" >Ok</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
        </form>


        )}</Formik>
      </Dialog>
          </Box>
      </React.Fragment>  
    )
}

export default Editbatchissue;