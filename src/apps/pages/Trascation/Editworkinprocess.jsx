import {
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
    InputLabel,
    Tooltip,
    Breadcrumbs,
    Checkbox
  } from "@mui/material";
  import axios from 'axios'
  import NavigateNextIcon from '@mui/icons-material/NavigateNext';

  import { Formik, Field } from "formik";
  import * as yup from "yup";
  import useMediaQuery from "@mui/material/useMediaQuery";
  import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
  import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
  import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
  import { useParams, useNavigate, useLocation } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import store from "../../../index";
  import {
    batchApidata,
   } from "../../../store/reducers/Formapireducer";
 
  import React, { useState, useEffect, useRef } from "react";

  import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
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
  import { useTheme } from "@mui/material";
  import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
  import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
  import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
  import { fnFileUpload } from "../../../store/reducers/Imguploadreducer";
  import { globalurl } from "../../../global";
  import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
  import ResetTvIcon from '@mui/icons-material/ResetTv';
  import ExpandLessIcon from '@mui/icons-material/ExpandLess';

  // ***********************************************
  //  Developer:Gowsalya
  // Purpose:To Create Products & BOM
  
  // ***********************************************
  const Editworkingprocess = ({}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [pageSize, setPageSize] = React.useState(10);
    const [showVal, setshowValue] = React.useState('');
  const parentID="M"
  
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
   const location = useLocation();
    const isNonMobile = useMediaQuery("(min-width:600px)");
  
   
    const navigate = useNavigate();
    let params = useParams();
    const dispatch = useDispatch();
   
    var mode = params.Mode;
   var productid = params.productID;
   var proformaid = params.proformaID;
   var bomid = params.bomID;
   var proformarecid = params.proformaRecid;
   var filtertype = params.filtertype;
   var invFilter = params.invFilter;
    const Data = useSelector((state) => state.formApi.Data);
    // console.log("🚀 ~ file: Productdetail.jsx:93 ~ Productdetail ~ Data:", Data)
    const Status = useSelector((state) => state.formApi.Status);
    const Msg = useSelector((state) => state.formApi.msg);
    const isLoading = useSelector((state) => state.formApi.loading);
  
    const ProductCategory = useSelector(
      (state) => state.comboApi.productCategory
    );
   
    useEffect(() => {
      dispatch(batchApidata(productid,proformaid,bomid));
      var filter = `${proformarecid}`
      dispatch(fetchExplorelitview("TR077", "Workinginprocess", filter, ""));
     
    }, [location.key]);
    const [ini ,setIni] = useState(true);
    const [iniBom ,setIniBom] = useState(true);
  

    const circle = {
      // margin: '1em 0em',
  
      backgroundColor: "#EDEDED",
      borderRadius: "250px",
      // color: "#8f8b66",
      height: "25px",
      borderColor: "blue",
      width: "25px",
     
      border: "2px solid grey",  
    };
  
    var userimg = store.getState().globalurl.imageUrl;
    if (mode == "A") {
      userimg = userimg + "Defaultimg.jpg";
    } else {
      if (
        Data.ImageName == undefined ||
        Data.ImageName == null ||
        Data.ImageName == ""
      ) {
        userimg = userimg + "Defaultimg.jpg";
      } else {
        userimg = userimg + Data.ImageName;
      }
    }

 
    var apiData = "";
    apiData = {
      OrderQty: Data.OrderQty,
      CompletedQty: Data.CompletedQty,
      PendingQty: Data.PendingQty
     
    };
    //*******Assign Productdetail values from Database in  Yup initial value******* */
    const initialValues = {
     
      OrderQty: apiData.OrderQty,
      CompletedQty: apiData.CompletedQty,
      PendingQty: apiData.PendingQty
      
    };
  
  
  
    const style = {
      height: "55px",
      border: "2px solid #1769aa ",
      borderRadius: "5px",
      backgroundColor: "#EDEDED",
    };
  
 
    
    const [boMode, setBomode] = useState("A");
    const [openGrid, setopenGrid] = useState(false);
   
    const explorelistViewData = useSelector(
      (state) => state.exploreApi.explorerowData
    );
    const explorelistViewcolumn = useSelector(
      (state) => state.exploreApi.explorecolumnData
    );
  
 
    const [uploadFile, setUploadFile] = useState();
  
    const [setrateval, setRate] = useState();

    const [tot, setTot] = useState();
  
  
    const [finalClickInfo, setFinalClickInfo] = useState({
      RecordID: "",
      MtlCode: "",
      Quantity: "",
      MtlCost: "",
      SortOrder: "",
      Disable: "",
      Fixrate:''
    });
  
  
   
  
    const [selectCPLookupData, setselectCPLookupData] = React.useState({
      CPlookupRecordid: "",
      CPlookupCode: "",
      CPlookupDesc: "",
    });
  
    // grade
  const [selectgrdLookupData, setselectgrdLookupData] = React.useState({
    GRDlookupRecordid: "",
    GRDlookupCode: "",
    GRDlookupDesc: "",
  });
  // substance
  const [selectsubLookupData, setselectsubLookupData] = React.useState({
    SUBlookupRecordid: "",
    SUBlookupCode: "",
    SUBlookupDesc: "",
  });
   //************************** Lookup Data *****************/
  
    const [isPopupData, setisPopupdata] = React.useState(false);
    const [selectLookupData, setselectLookupData] = React.useState({
      lookupRecordid: "",
      lookupCode: "",
      lookupDesc: "",
    });
    const [selectInvUOMLookupData, setselectInvUOMLookupData] = React.useState({
      ITUlookupRecordid: "",
      ITUlookupCode: "",
      ITUlookupDesc: "",
    });
    if ( isPopupData == false){
        selectInvUOMLookupData.ITUlookupRecordid = Data.InventoryUom
      selectInvUOMLookupData.ITUlookupDesc = Data.UomDesc
    }
    const [selectprocessLookupData, setselectprocessLookupData] = React.useState({
      PSlookupRecordid: "",
      PSlookupCode: "",
      PSlookupDesc: "",
    });
    const [selectmaterialLookupData, setselectmaterialLookupData] =
      React.useState({
        MlookupRecordid: "",
        MlookupCode: "",
        MlookupDesc: "",
        DesignApp: "",
      });
  
    if (isPopupData == false) {
      selectLookupData.lookupRecordid = Data.Pgrid;
      selectLookupData.lookupCode = Data.PgrCode;
      selectLookupData.lookupDesc = Data.PgrDesc;
   
    }
  
    /****************** BOM values assign a state variale******************** */
    const selectcelldata = (selectedData, bMode, field) => {
      console.log("selectdata" + JSON.stringify(selectedData));
      console.log(selectedData.Fixrate);
  
      setRate(selectedData.Fixrate);
      setBomode(bMode);
      setIniBom(true)
      if (bMode == "A") {
        setUploadFile("");
        setFinalClickInfo({
          RecordID: "",
          Quantity: "",
          MtlCost: "",
          MtlCode: "",
          SortOrder: "",
          Disable: "",
          Fixrate:''
        });
        setselectprocessLookupData({
          PSlookupRecordid: "",
          PSlookupCode: "",
          PSlookupDesc: "",
        });
        setselectmaterialLookupData({
          MlookupRecordid: "",
          MlookupCode: "",
          MlookupDesc: "",
        });
        setselectCPLookupData({
          CPlookupRecordid: "",
          CPlookupCode: "",
          CPlookupDesc: "",
        });
        
      } else {
        if (field == "action") {
          setUploadFile(selectedData.Attachments);
          setFinalClickInfo({
            RecordID: selectedData.RecordID,
            Quantity: selectedData.Quantity,
            MtlCost: selectedData.MtlCost,
            SortOrder: selectedData.SortOrder,
            Disable: selectedData.Disable,
            Fixrate:selectedData.Fixrate
          });
          setselectprocessLookupData({
            PSlookupCode: selectedData.PsCode,
            PSlookupRecordid: selectedData.PsRecordID,
            PSlookupDesc: selectedData.PsDesc,
          });
          setselectmaterialLookupData({
            MlookupCode: selectedData.MtlCode,
            MlookupRecordid: selectedData.MtlRecordID,
            MlookupDesc: selectedData.MtlDesc,
            DesignApp: selectedData.DesignApp,
          });
          setselectCPLookupData({
            CPlookupRecordid: selectedData.PrdRecordID,
            CPlookupCode: selectedData.ProductCode,
            CPlookupDesc: selectedData.ProductName,
          });
        
        }
      }
    };
  
    //*******Assign BOM values from Database in  Yup initial value******* */
    const bomInitialvalues = {
      MtlCode: finalClickInfo.MtlCode,
      Quantity: finalClickInfo.Quantity,
      Quantity: Number(finalClickInfo.Quantity).toFixed(),
      MtlCost: finalClickInfo.MtlCost,
      Fixrate:finalClickInfo.Fixrate,
      SortOrder: finalClickInfo.SortOrder,
      checkbox: finalClickInfo.Disable,
      totalCost:Number().toFixed(2)
    };
    /*************SEARCH********************** */
    var VISIBLE_FIELDS = [];

 
    VISIBLE_FIELDS = [
      "SLNO",
      "BatchType",
      "Reference",
      "StartDate",
      "EndDate",
      "Quantity",
      "completedQty",
      "ReworkQty",
      "DamagedQty",
      "status",
    ];
  

  const columns = React.useMemo(
    () =>
      explorelistViewcolumn.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
    [explorelistViewcolumn]
  );
   
  
  
  // const columns = [
    
  //   { field: 'StartDate', headerName: 'StartDate', width: 130 },
  //   { field: 'EndDate', headerName: 'EndDate', width: 130 },
   
  //   ];


   
  
  
  
    
  
  
   
    const fnshowGrid = () =>
    {
      setopenGrid(true)
    }
    const fncloseGrid = () =>
    {
      setopenGrid(false)
    }

  // **********Grid header function************
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
          <Typography>Batches</Typography>
          
        </Box>
     
        <IconButton>
          <AddOutlinedIcon />
        </IconButton>
        
      </GridToolbarContainer>
    );
  }
   
  var apprVal ="";
  if(filtertype=="P")
  {
    apprVal="Product"
  }
  if(filtertype=="L")
  {
    apprVal="Leather"
  }
  if(filtertype=="M")
  {
    apprVal="Material"
  } 
  var InvAccessID
  var apprValinvoice ="";
  if(invFilter=="SI")
  {
    apprValinvoice="Sample Invoice"
    InvAccessID = "TR073"
  }
  if(invFilter=="PI")
  {
    apprValinvoice="Proforma Invoice"
    InvAccessID = "TR073"
  }
  if(invFilter=="FI")
  {
    apprValinvoice="Final Invoice"
    InvAccessID = "TR073"
  } 
  if(invFilter=="IN")
  {
    apprValinvoice="Proforma Invoice"
    InvAccessID = "TR011"
  } 
 
    return (
      <React.Fragment>
        {/* <Box sx={{ height:'100vh',overflowY:'auto' }}> */}
          <Box display="flex" justifyContent="space-between" p={2}>
            {/* SEARCH BAR */}
            <Box
              display="flex"
              // backgroundColor={colors.primary[400]}
              borderRadius="3px"
              alignItems={"center"}
            >
            <Breadcrumbs maxItems={2} aria-label="breadcrumb" separator={<NavigateNextIcon sx={{color:'#0000D1'}}/>}>
            <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} onClick={() => { navigate(`/Apps/TR043/Invoices`); }}>Invoice</Typography>
            <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} onClick={() => { navigate(`/Apps/Secondarylistview/${InvAccessID}/Proforma%20Invoice/${filtertype}`); }}>{apprVal}</Typography>
            <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} onClick={() => { navigate(`/Apps/Secondarylistview/TR011/Proforma%20Invoice/${filtertype}/${invFilter}/EditProforma%20Invoice/${proformaid}/E`); }}>{apprValinvoice}</Typography>
            <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} onClick={() => { navigate(`/Apps/Secondarylistview/TR011/Proforma%20Invoice/${filtertype}/${invFilter}/EditProforma%20Invoice/${proformaid}/E`); }}>Working Inprogress</Typography>
          
             
              
              </Breadcrumbs>
            </Box>
  
            {/* ICONS */}
  
            <Box display="flex">
             
              <IconButton  color="error" onClick={() => { navigate(`/Apps/Secondarylistview/TR011/Proforma%20Invoice/${filtertype}/${invFilter}/EditProforma%20Invoice/${proformaid}/E`); }}
              >
                <ResetTvIcon/>
              </IconButton>
              <IconButton onClick={() => navigate("/")} color="error">
                <LogoutOutlinedIcon />
              </IconButton>
             
            </Box>
          </Box>
         
         
  
       
            <Box m="20px" sx={{ m: 2 }}>
              {/* <Header title="Products" subtitle="" /> */}
  
              <Formik
                // onSubmit={handleFormSubmit}
                initialValues={initialValues}
                // enableReinitialize={ini}
                // validationSchema={basicSchema}
              >
                {({ values, errors, touched, handleBlur, handleChange }) => (
                  <form>
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
                          fullWidth
                          variant="filled"
                          type="text"
                          value={Data.Description}
                          // id="OrderQty"
                          // name="OrderQty"
                          label="Info"
                          
                          onBlur={handleBlur}
                          onChange={handleChange}
                          // error={!!touched.ModelNo && !!errors.ModelNo}
                          // helperText={touched.ModelNo && errors.ModelNo}
                          sx={{ gridColumn: "span 2" }}
                          focused
                          InputProps={{
                            readOnly: true,
                          }}
                          
                        />
  
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          value={Data.CompletedQty}
                          id="CompletedQty"
                          name="CompletedQty"
                          label="Completed Qty"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          
                          sx={{ gridColumn: "span 2" , background: "#fff6c3" }}
                          focused
                          // error={!!touched.Desc && !!errors.Desc}
                          // helperText={touched.Desc && errors.Desc}
                          inputProps={{ maxLength: 50}}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right", readOnly: true },
                            },
                          }}
                        
                        />
  
                    
                        <Box display="flex" justifyContent="space-between" p={2} mt="-35px">
            {/* SEARCH BAR */}
            <Box
              display="flex"
              // backgroundColor={colors.primary[400]}
              borderRadius="3px"
              alignItems={"center"}
            >
          
              <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}>Batches</Typography>
             
              
           
            </Box>
  
            {/* ICONS */}
          
            {/* <Box display="flex">
            {openGrid == false ?
            <IconButton onClick ={() =>{fnshowGrid()}} style={circle}>
            <ExpandMoreOutlinedIcon />
          </IconButton>
          :''}
          {openGrid == true ?
            <IconButton onClick ={() =>{fncloseGrid()}} style={circle}>
            <ExpandLessIcon  style={circle}/>
          </IconButton>
          :''}
             
            </Box> */}
          </Box>
                      </FormControl>

                      <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                        
                      <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          value={Data.OrderQty}
                          id="OrderQty"
                          name="OrderQty"
                          label="Order Qty"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          
                          sx={{ gridColumn: "span 2" , background: "#fff6c3" }}
                          focused
                          // error={!!touched.Desc && !!errors.Desc}
                          // helperText={touched.Desc && errors.Desc}
                          
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right", readOnly: true },
                            },
                          }}
                        />
                         <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          value={Data.PendingQty}
                          id="PendingQty"
                          name="PendingQty"
                          label="Pending Qty"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          
                          sx={{ gridColumn: "span 2" , background: "#fff6c3" }}
                          focused
                          // error={!!touched.Desc && !!errors.Desc}
                          // helperText={touched.Desc && errors.Desc}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right", readOnly: true },
                            },
                          }}
                        />
                      </FormControl>
                    

                      <FormControl sx={{ gridColumn: "span 4",mt:"-50px" }}>
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
                              // checkboxSelection
                              rows={explorelistViewData}
                              columns={columns}
                              disableSelectionOnClick
                              getRowId={(row) => row.RecordID}
                              pageSize={pageSize}
                              onPageSizeChange={(newPageSize) =>
                                setPageSize(newPageSize)
                              }
                              rowsPerPageOptions={[5, 10, 20]}
                              pagination
                              //onCellClick={handleOnCellClick}
                              //onClick={selectrowdata(params,'E')}
  
                              onCellClick={(params) => {
                                const currentcell = params.row;
                                const currentcellField = params.field;
                                // selectcelldata(
                                //   currentcell,
                                //   "E",
                                //   currentcellField
                                // );
                                console.log(
                                  "selectcelldata" +
                                    JSON.stringify(currentcellField)
                                );
                              }}
                              //   onRowClick={(params) => {
                              //     const currentRow = params.row;
                              //     selectrowdata(currentRow,'E');
  
                              // }
                              // }
  
                              // components={{
                              //   Toolbar: CustomToolbar,
                              // }}
                              componentsProps={{
                                toolbar: {
                                  showQuickFilter: true,
                                  quickFilterProps: { debounceMs: 500 },
                                },
                              }}
                            />
                          </Box>
                        </Box>
                        {/* <Footer/> */}
                      </FormControl>
                    
                    </Box>
                  </form>
                )}
              </Formik>
  
           
            </Box>
        
  
       
  
  
        {/* </Box> */}
      </React.Fragment>
    );
  };
  
  export default Editworkingprocess;
  