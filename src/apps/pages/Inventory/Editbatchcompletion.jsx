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
  import {BatchIssueSchema} from "../../Security/validation";
  import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
  import Listviewpopup from "../Lookup";
  import Popup from "../popup";
  import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
  import { tokens } from "../../../Theme";

  import { fetchExplorelitview,Success} from "../../../store/reducers/Explorelitviewapireducer";
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
  } from "@mui/x-data-grid";
  import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
  import ResetTvIcon from '@mui/icons-material/ResetTv';
  import NavigateNextIcon from '@mui/icons-material/NavigateNext';
  import { LoadingButton } from "@mui/lab";
  import Swal from "sweetalert2";
  import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
  const Editbatchcompletion = () =>{
    const navigate = useNavigate();
    let params = useParams();
    const dispatch = useDispatch();
    var recID = params.id;
    var mode = params.Mode;
    var accessID = params.accessID;
    var Type = params.Type;
    const YearFlag = sessionStorage.getItem("YearFlag")
    const Year = sessionStorage.getItem("year")
    const Data = useSelector((state) => state.formApi.Data);
    const Status = useSelector((state) => state.formApi.Status);
    const Msg = useSelector((state) => state.formApi.msg);
    const isLoading = useSelector((state) => state.formApi.loading);
    const { toggleSidebar, broken, rtl } = useProSidebar();
    useEffect(() => {
      // dispatch(fetchApidata(accessID, "get", recID));
      dispatch(fetchApidata(accessID, "get", recID));
   
  }, []);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  var [getRowId, setGetRowId] = useState('');
  const [pageSize, setPageSize] = React.useState(10);
  const handleClickOpen = () => {
   
  };
  var explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );
  console.log("🚀 ~ file: Editbatchissue.jsx:150 ~ Editbatchissue ~ explorelistViewData:", explorelistViewData)
  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );
  const VISIBLE_FIELDS = ["SLNO", "Code", "Description","STOCK","RequiredQty","IssuedQty","Balance", "action","AlreadyIssuedQty","lookup"];
 const columns = React.useMemo(
   () =>
     explorelistViewcolumn.filter((column) =>
       VISIBLE_FIELDS.includes(column.field)
     ),
   [explorelistViewcolumn]
 );

 const row = []

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

var spreaddata =[...explorelistViewData]
const i = explorelistViewData.findIndex(x => x.RecordID == getRowId)

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
  const [ini ,setIni] = useState(true);
  const [loading, setLoading] = useState(false)
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
      console.log("type---" + type);
      console.log("Data---" + JSON.stringify(childdata));
  
      if (type == "Production Card") {
          setisPopupdata(true);
        setselectBPLookupData({
          BPlookupRecordid: childdata.RecordID,
          BPlookupCode: childdata.Code,
          BPlookupDesc: childdata.Name,
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
      CompletedQTY: Data.CompletedQTY,
      ReworkQTY: Data.ReworkQTY,
      DamagedQTY: Data.DamagedQTY,
      AdditionalQTY: Data.AdditionalQTY,
      CompletionDate:Data.CompletionDate
    
    };
    //*******Assign supplymaster values from Database in  Yup initial value******* */
    const initialValues = {
      BatchDate: apiData.BatchDate,
      BatchQty: Number(apiData.BatchQty).toFixed(4),
      Reference: apiData.Reference + Year ,
      Status: apiData.Status,
      CompletedQTY: apiData.CompletedQTY,
      ReworkQTY: apiData.ReworkQTY,
      DamagedQTY: apiData.DamagedQTY,
      AdditionalQTY: apiData.AdditionalQTY,
      CompletionDate:apiData.CompletionDate
    };
  
    // **********Save Function*****************
    const fnSave = async (values) => {
      if(Data.Process == "Y"){
        toast.error("Your data Already Processed edit not Applicable")
        return
      }
      setLoading(true)
      setIni(false)
      if(values.CompletedQTY == 0){
        toast.error("Please Enter Completed Quantity");
        setLoading(false)
        return
      }
      if (values.CompletionDate < Data.BatchDate  ){
        toast.error("Completion Date should be in Greater than Batch Date")
        setLoading(false)
        return
      }
      
     
      var saveData = {
        RecordID: recID,
        BatchQty: values.BatchQty,
        Reference: values.Reference,
        Status: values.Status,
        ProductioncardRecordID:selectBPLookupData.BPlookupRecordid,
        Type: Type,
        BatchDate:values.BatchDate,
        CompletedQTY:values.CompletedQTY,
        ReworkQTY:0,
        DamagedQTY:values.DamagedQTY,
        AdditionalQTY:values.AdditionalQTY,
        CompletionDate:values.CompletionDate,
        YearID:Year,
      };
      var type = "";
  
      
        type = "update";
          
  
      const data = await dispatch(postApidata(accessID, type, saveData));
      if (data.payload.Status == "Y") {
        toast.success(data.payload.Msg);
        setLoading(false)
        // http://localhost:3000/Apps/Secondarylistview/TR074/BATCHS/CC
        navigate(`/Apps/Secondarylistview/TR074/BATCHS/${Type}`);
      } else{
         toast.error(data.payload.Msg)
         setLoading(false)  
      };

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
                navigate(`/Apps/Secondarylistview/TR074/BATCHS/${Type}`)
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
                  fnSave(values);
                  // alert("hai");
                }, 100);
              }}
              validationSchema={BatchIssueSchema}
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
                       {/* <TextField
                      name="proformanumber"
                      type="text"
                      id="proformanumber"
                      label="Proforma Number"
                      variant="filled"
                      focused
                      /> */}
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
                 
                        </FormControl>
  
  
                       <TextField
                      fullWidth
                      variant="filled"
                      type="date"
                      value={values.BatchDate}
                      id="BatchDate"
                      name="BatchDate"
                      label="Batch Date"
                      
                       onBlur={handleBlur}
                      onChange={handleChange}
                      inputFormat="YYYY-MM-DD"
                      // error={!!touched.Code && !!errors.Code}
                      // helperText={touched.Code && errors.Code}
                    
                      InputProps={{ readOnly: true }}
                      focused
                      />
                     
                       <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                     id="BatchQty"
                    name="BatchQty"
                    value={values.BatchQty}
                    label="Quantity"
                    sx={{input:{textAlign:'right'},background: "#fff6c3"}}
                    onBlur={handleBlur}
                    onChange={handleChange}
                   
                    InputProps={{ readOnly: true }}
                    focused
                      />
  
                    
  
                      
                        
                        <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                     id="CompletedQTY"
                    name="CompletedQTY"
                    value={values.CompletedQTY}
                    label="Completed Qty"
                    sx={{input:{textAlign:'right'},background: "#fff6c3"}}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    // error={!!touched.Code && !!errors.Code}
                    // helperText={touched.Code && errors.Code}
                    required
                    onInvalid={(e) => { e.target.setCustomValidity('Please Fill The Completed Quantity') }} 
                    onWheel={(e) => e.target.blur()} 
                    focused
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 10);
                        e.target.setCustomValidity('')
                    }}
                      />
                    
                    {Type =="PC" ?
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                     id="DamagedQTY"
                    name="DamagedQTY"
                    value={values.DamagedQTY}
                    label="Rejected Qty"
                    onWheel={(e) => e.target.blur()} 
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 10);
              
                    }}
                    inputProps={{maxLength:5}}
                   sx={{input:{textAlign:'right'},background: "#fff6c3"}}
                    focused
                     />:''}
                      </FormControl>

                      <FormControl
                    fullWidth
                    sx={{ gridColumn: "span 2", gap: "40px" }}
                  >

  
  
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
                      //  error={!!touched.Reference && !!errors.Reference}
                      //  helperText={touched.Reference && errors.Reference}
                       InputProps={{ readOnly: true }}
                       inputProps={{maxLength:5}}
                       focused
                      />
                   
  
                    
  
                       <FormControl>
                    
                       <Field
                        as="select"
                        label="Type"
                        // onChange={handleChange}
                        value={values.Status}
                       id="Status"
                       
                        focused
                        InputProps={{ readOnly: true }}
                         style={style}
                         >
                         <option disabled>Status</option>
                          {/* <option disabled value="Y">Yet to Start</option> */}
                          <option disabled value="I">Inprogress</option>
                           {/* <option disabled value="C">Completed</option> */}
                                 
                         </Field>
                        </FormControl>
                        <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                      id="AdditionalQTY"
                     name="AdditionalQTY"
                     value={values.AdditionalQTY}
                    label="Additional Qty"
                    
                    onBlur={handleBlur}
                    onChange={handleChange}
                    // error={!!touched.Code && !!errors.Code}
                    // helperText={touched.Code && errors.Code}
                    sx={{input:{textAlign:'right'},background: "#fff6c3"}}
                    InputProps={{ readOnly: true }}
                    focused
                    onWheel={(e) => e.target.blur()} 
                      />
                     
                       {/* <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                     id="ReworkQTY"
                    name="ReworkQTY"
                     value={values.ReworkQTY}
                    label="Rejected Qty/Rework Qty"
                    
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 10);
              
                    }}
                    inputProps={{maxLength:5}}
                    sx={{input:{textAlign:'right'},background: "#fff6c3"}}
                    focused
                      /> */}

                  <TextField
                      fullWidth
                      variant="filled"
                      type="date"
                      value={values.CompletionDate}
                      id="CompletionDate"
                      name="CompletionDate"
                      label="Completion Date"
                       onBlur={handleBlur}
                      onChange={handleChange}
                      inputFormat="YYYY-MM-DD"
                      focused
                      required
                      onWheel={(e) => e.target.blur()} 
                      onInvalid={(e) => { e.target.setCustomValidity('Please Fill The Completion Date') }} 
                   
                      onInput={(e) => {
                       
                          e.target.setCustomValidity('')
                      }}
                      />
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
                           
                            // selectcelldata(currentRow, "E", currentcellField);
                        
                       
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
                  <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                  {
  YearFlag == 'true' ? (
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
                  )
                }
                    <Button variant="contained" color="error"   onClick={() => {
                          navigate(`/Apps/Secondarylistview/TR074/BATCHS/${Type}`);
                        }}>
                          CANCEL
                      </Button>
                        </Box>
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
  
  
              </form>
  
  
      )}</Formik>
            </Box>
            </Box>
        </React.Fragment>  
      )
  }
  
  export default Editbatchcompletion;