import React, { useState, useEffect, useRef } from "react";
import { TextField,Tooltip,Breadcrumbs, Box, Typography, FormControl,FormControlLabel,Button,Checkbox, IconButton,InputLabel,useTheme,
    Select,handleChange, MenuItem} from "@mui/material";
import  useMediaQuery  from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import ResetTvIcon from '@mui/icons-material/ResetTv';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
    GridToolbarQuickFilter,
  } from "@mui/x-data-grid";
  import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
  import { tokens } from "../../../Theme";
  import {
    fetchApidata,
    postApidata,
    fetchRecIDApidata
  } from "../../../store/reducers/Formapireducer";
  import { useParams, useNavigate } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import Listviewpopup from "../Lookup";
  import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import Popup from "../popup";
import { toast } from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import { Formik, Field, Form, useField, useFormikContext } from 'formik';
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";




async function fetchNewTextC(a, b) {
  await new Promise((r) => setTimeout(r, 200));
  return ` ${Number(a||0) + Number(b||0)}`;
}

const MyField = (props) => {
  const {
    values: { HideSqft, SideSqft },
    setFieldValue,
    touched
  } = useFormikContext();
  const [field, meta] = useField(props);

  React.useEffect(() => {
    let isCurrent = true;
    // your business logic around when to fetch goes here.
    if (HideSqft !=='' && SideSqft!=='' && (touched.HideSqft ||
    touched.SideSqft)) {
      fetchNewTextC(HideSqft, SideSqft).then((TotalSqft) => {
        if (!!isCurrent) {
          // prevent setting old values
          setFieldValue(props.name, TotalSqft.trim());
          // alert(Totalqty)
        }
        // if (!!isCurrent) {
        //   // prevent setting old values
        //   setFieldValue(props.name, Totalqty.trim());
        //   // alert(Totalqty)
        // }
      });
    }
    return () => {
      isCurrent = false;
    };
  }, [HideSqft, SideSqft, setFieldValue, props.name]);

  return (
    <React.Fragment>
      <TextField {...props} {...field} />
      {/* {!!meta.touched && !!meta.error && <div>{meta.error}</div>} */}
    </React.Fragment>
  );
};





const Editissue = () =>{
    // const [show, setScreen] = React.useState("0");
    const isNonMobile = useMediaQuery("(min-width:600px)")
    // const [pageSize, setPageSize] = React.useState(10);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  const YearFlag = sessionStorage.getItem("YearFlag")
  const Data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.loading);
  const { toggleSidebar, broken, rtl } = useProSidebar();
  var Number=params.Number;
  var Description=params.MaterialDescription;
  var prNumber=params.PcdhRecordID;
  var Type=params.ItemType;
  var Headerqty = params.HeaderQty;
  var prdItem="Production Card Item"
  var hderName="Production Card()";
 
  
  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );
  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );
 const [matId ,setmatid] = useState('');
 const [headerId ,setheraderqty] = useState('');
 const [orderId ,setorderqty] = useState('');
 const [responsedata ,setresponseData] = useState({
  customerid: "",
  proformaid: "",
  productid: "",
 });
 const [custID ,setCustID] = useState('');
 const [proformaID ,setProformaID] = useState('');
 const [ProductID ,setProductID] = useState('');


  useEffect(() => {
    (async () => {
    dispatch(fetchApidata("TR048", "get", recID));
    const data = await dispatch(fetchRecIDApidata("TR048", "get", recID));
   console.log("GEIID"+JSON.stringify(data));
  
   if (data.payload.Status == "Y") {
    setmatid(data.payload.apiResponse.MaterialRecordID)
    setheraderqty(data.payload.apiResponse.HeaderQty)
    setorderqty(data.payload.apiResponse.OrderQuantity)
    setCustID(data.payload.apiResponse.CustomerRecordID)
    setProformaID(data.payload.apiResponse.ProformaRecordID)
    setProductID(data.payload.apiResponse.ProductRecordID)
   
    var explorefilter = `${prNumber} AND MaterialRecordID=${data.payload.apiResponse.MaterialRecordID}`
    dispatch(fetchExplorelitview("TR068", "Issued detail", explorefilter, ""));
   }
else
{
 
  dispatch(fetchExplorelitview("TR068", "Issued detail", "-1", ""));
  
}

// grid
  
  })();
  }, []);
  const [ini ,setIni] = useState(true);
  const [loading, setLoading] = useState(false)
  console.log("---"+JSON.stringify(custID));
  var apiData = "";
  apiData = {
    ProformaNo: Data.ProformaNo,
    CustomerName: Data.CustomerName,
    CustomerCode: Data.CustomerCode,
    ProductCode: Data.ProductCode,
    OrderQuantity: Data.OrderQuantity,
    
  };

  const initialValues = {
    ProformaNo: apiData.ProformaNo,
    CustomerName: apiData.CustomerName,
    CustomerCode: apiData.CustomerCode,
    ProductCode: apiData.ProductCode,
    OrderQuantity: apiData.OrderQuantity,
   
  };
 
  const [prdIssuedItem, setPrdIssuedItem] = useState({
    RecordID: "",
    Date: "",
    EmployeeReference: "",
    IssuedQty: "",
    HideQty:"",
    HideSqft:"",
    SideQty:"",
    SideSqft:"",
    SortOrder:"",
  });
  const [boMode, setBomode] = useState("A");
  const [message, setMessage] = useState(0);
  /********************Look up********************* */
  const [openMATpopup, setOpenMATpopup] = useState(false);
  const [openEMPpopup, setOpenEMPpopup] = useState(false);
  function handleShow(type) {
    if (type == "MAT") {
      setOpenMATpopup(true);
    }
    if (type == "EMP") {
      setOpenEMPpopup(true);
    }
  }

  const [isPopupData, setisPopupdata] = React.useState(false);
// MATERIAL
  const [selectmatLookupData, setselectmatLookupData] = React.useState({
    MATlookupRecordid: "",
    MATlookupCode: "",
    MATlookupDesc: "",
  });
  
  // EMPLOYEE
  const [selectEMPLookupData, setselectEMPLookupData] = React.useState({
    EMPlookupRecordid: "",
    EMPlookupCode: "",
    EMPlookupDesc: "",
  });

  if (isPopupData == false) {
    selectmatLookupData.MATlookupRecordid = Data.MaterialRecordID;
    selectmatLookupData.MATlookupCode = Data.Materialcode;
    selectmatLookupData.MATlookupDesc = Data.MaterialDescription;
  
  }



  const childToParent = (childdata, type) => {
    console.log("type---" + type);
    console.log("Data---" + JSON.stringify(childdata));

    setisPopupdata(true);

    if (type == "Material") {
      setselectmatLookupData({
        MATlookupCode: childdata.Code,
        MATlookupRecordid: childdata.MaterialRecordID,
        MATlookupDesc: childdata.Name,
      
      });
      setmatid(childdata.MaterialRecordID)
      setOpenMATpopup(false);
      var explorefilter = `${prNumber} AND MaterialRecordID=${childdata.MaterialRecordID}`
      console.log("MATERIALID"+JSON.stringify(explorefilter))
        dispatch(fetchExplorelitview("TR068", "Issued detail",explorefilter, ""));
      
      
    }
    if (type == "Employee") {
      setselectEMPLookupData({
        EMPlookupCode: childdata.Code,
        EMPlookupRecordid: childdata.RecordID,
        EMPlookupDesc: childdata.Name,
      });
      setOpenEMPpopup(false);
    
    }
    
  };
console.log("MATID"+JSON.stringify(matId));
  var VISIBLE_FIELDS = [];
 
    VISIBLE_FIELDS = ["SLNO", "Date", "Quantity","EmployeeReference","IssuedQty","action"];
 

  const columns = React.useMemo(
    () =>
      explorelistViewcolumn.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
    [explorelistViewcolumn]
  );
  console.log("Column"+JSON.stringify(explorelistViewcolumn));

  const ref = useRef()
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
              <Typography>List of Production Issues</Typography>
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
              <IconButton onClick={() => {
                setMessage("")
            const reset = ref.current.resetForm
            selectcelldata("", "A", "")
            reset()
            }}>
                <AddOutlinedIcon />
              </IconButton>
            </Box>
          </GridToolbarContainer>
        );
      }
      const [pageSize, setPageSize] = React.useState(10);
   
  /****************** BOM values assign a state variale******************** */
  const selectcelldata = (selectedData, bMode, field) => {
    console.log("selectdata" + JSON.stringify(selectedData));
   
    setBomode(bMode);

    if (bMode == "A") {
      
      setPrdIssuedItem({
        RecordID: "",
        Date: "",
        EmployeeReference: "",
        IssuedQty: "",
        HideQty:"",
        HideSqft:"",
        SideQty:"",
        SideSqft:"",
        TotalSqft:"",
        SortOrder:"",
         });
    
         setselectEMPLookupData({
          // EMPlookupCode: selectedData.PsCode,
          EMPlookupRecordid: "",
          EMPlookupDesc:"" ,
        });
    } else {
      if (field == "action") {
       
        setPrdIssuedItem({
          RecordID: selectedData.RecordID,
          Date: selectedData.PDate,
          EmployeeReference: selectedData.EmployeeReference,
          IssuedQty: selectedData.IssuedQty,
          HideQty:selectedData.HideQty,
          HideSqft:selectedData.HideSqft,
          SideQty:selectedData.SideQty,
          SideSqft:selectedData.SideSqft,
          TotalSqft:selectedData.TotalSqft,
          SortOrder:selectedData.SortOrder,
        });
        setselectEMPLookupData({
          // EMPlookupCode: selectedData.PsCode,
          EMPlookupRecordid: selectedData.EmpRecordID,
          EMPlookupDesc: selectedData.EmployeeReference,
        });
        setselectmatLookupData({
          MATlookupRecordid: selectedData.MaterialRecordID,
          MATlookupCode: selectedData.MaterialCode,
          MATlookupDesc: selectedData.MaterialName,
        });
     
      }
    }
  };
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  
  today =  yyyy + '-' + mm + '-' + dd ;
  const issuedInitialvalues = {
    Date: boMode == "A" ? today : prdIssuedItem.Date ,
    
    IssuedQty: prdIssuedItem.IssuedQty || message,
    HideQty:prdIssuedItem.HideQty,
    HideSqft:prdIssuedItem.HideSqft,
    SideQty:prdIssuedItem.SideQty,
    SideSqft:prdIssuedItem.SideSqft,
    TotalSqft:prdIssuedItem.TotalSqft,
    SortOrder:prdIssuedItem.SortOrder,
  };
var typeofproduct = "";
  if(Type=="Material")
  {
    typeofproduct="M"
  }
  if(Type=="Leather")
  {
    typeofproduct="L"
  }
  // **********Save Function*****************
  const fnSave = async (values) => {
    setLoading(true)
    setIni(false)
    if (selectEMPLookupData.EMPlookupRecordid == "") {
      toast.error("Please Choose Employee Lookup");
      setLoading(false)
      return;
    }

    if(message == ""){
      toast.error("Please Enter Production Quantity");
      setLoading(false)
      return;
    }

    console.log("🚀 ~ file: Editissue.jsx:411 ~ fnSave ~ Data.OrderQuantity < message:", Data.OrderQuantity < message)
    if(Data.OrderQuantity < message){
      toast.error("Production Quantity Should Less Than Order Quantity");
      setLoading(false)
      return;
    }
    // alert(selectmatLookupData.MATlookupRecordid);
    // console.log("🚀 ~ file: Editmaterial.jsx:249 ~ Editmatrial ~ values",values);
 
    // if (values.checkbox == true) {
    //   values.checkbox = "Y";
    // } else {
    //   values.checkbox = "N";
    // }
 

    var saveData = {
      RecordID: recID , 
       ProductioncardRecordID: recID,
       ProformaRecordID:proformaID,
       CustomerRecordID: custID,
       ProductRecordID: ProductID,
       Type:typeofproduct,
      Quantity:values.IssuedQty || message,
     ConsumptionUomRecordID: "",
      MaterialRecordID:matId,
      PDate:values.Date,
      IssuedQty:message,
      EmployeeReference:selectEMPLookupData.EMPlookupRecordid,
      SortOrder:0,
      HideQty:values.HideQty,
      HideSqft:values.HideSqft,
      SideQty:values.SideQty,
      SideSqft:values.SideSqft,
      TotalSqft:values.TotalSqft
    };

  
    var type = "";

    if (boMode == "A") {
      type = "insert";
    } else {
      type = "update";
    }
    
    const data = await dispatch(postApidata("TR068", type, saveData));
   
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      setIni(true)
      setLoading(false)
      var explorefilter = `${prNumber} AND MaterialRecordID=${matId}`
     
      dispatch(fetchExplorelitview("TR068", "Issued detail",explorefilter, ""));
     
      setPrdIssuedItem({
        RecordID: "",
        Date: "",
        EmployeeReference: "",
        IssuedQty: "",
        HideQty:"",
        HideSqft:"",
        SideQty:"",
        SideSqft:"",
        TotalSqft:"",
        SortOrder:"",
         });
    
   
     setMessage("")
     
       selectcelldata("", "A", "");
               
    } else{
       toast.error(data.payload.Msg)
       setLoading(false)  
    };
  };

   


const handleChangefunct = (event) => {

  setMessage(event.target.value)
 
 
};
var matreqVal =  (orderId / headerId) * message
console.log(matreqVal)


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
            navigate(`/Apps/Secondarylistview/TR048/Product%20Card%20Items/${prNumber}/${Number}`)
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
             {/* <Typography variant="h3">{hderName}{prdItem}{Description}</Typography> */}
             {/* <Typography variant="h3"  onClick={() => { navigate( `/Apps/TR047/Production%20Card` ); }}>{hderName}</Typography> */}
             {/* <Typography variant="h3"  onClick={() => { navigate( `/Apps/Secondarylistview/TR048/Product%20Card%20Items/${prNumber}/${Number}` ); }}>{prdItem}</Typography> */}
             {/* <Typography variant="h3">{Description}</Typography> */}
             <Breadcrumbs maxItems={2} aria-label="breadcrumb" separator={<NavigateNextIcon sx={{color:'#0000D1'}}/>}>
            <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}   onClick={() => { navigate( `/Apps/TR047/Production%20Card` ); }}>{`Production Card(${Number})`}</Typography>
            <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}   onClick={() => { navigate( `/Apps/Secondarylistview/TR048/Product%20Card%20Items/${prNumber}/${Number}` ); }}>{prdItem}</Typography>
            
            <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  >{Description}</Typography>
           
            </Breadcrumbs>
            </Box>
             <Box display="flex">
             <Tooltip title="Back">
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
                  // fnSave(values);
                }, 100);
              }}
              // validationSchema={substanceSchema}
              enableReinitialize={ini}
            >
              {({ values, errors, touched, handleBlur, handleChange }) => (
                   <Box>
            
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
                    name="ProformaNo"
                    type="text"
                    id="ProformaNo"
                    label="Proforma Invoice No"
                    variant="filled"
                    value={values.ProformaNo}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{ readOnly:true }}
                    // error={!!touched.Code && !!errors.Code}
                    // helperText={touched.Code && errors.Code}
                    // inputProps={{ maxLength: 5 }}
                    // required
                    focused/>
                     <TextField
                    name="CustomerName"
                    type="text"
                    id="CustomerName"
                    label="Customer Name"
                    variant="filled"
                    value={values.CustomerName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{ readOnly:true }}
                    // error={!!touched.Code && !!errors.Code}
                    // helperText={touched.Code && errors.Code}
                    // inputProps={{ maxLength: 5 }}
                    // required
                    focused/>
                    <TextField
                    name="CustomerCode"
                    type="text"
                    id="CustomerCode"
                    label="Customer Reference"
                    variant="filled"
                    value={values.CustomerCode}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    // error={!!touched.Code && !!errors.Code}
                    // helperText={touched.Code && errors.Code}
                    // inputProps={{ maxLength: 5 }}
                    // required
                    inputProps={{ readOnly:true }}
                    focused/>
                    <TextField
                    name="ProductCode"
                    type="text"
                    id="ProductCode"
                    label="Product Model"
                    variant="filled"
                    value={values.ProductCode}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{ readOnly:true }}
                    // error={!!touched.Code && !!errors.Code}
                    // helperText={touched.Code && errors.Code}
                    // inputProps={{ maxLength: 5 }}
                    // required
                    focused/>
                     <FormControl
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <TextField
                              id="materialname"
                              label="Material Name"
                              variant="filled"
                               value={selectmatLookupData.MATlookupCode}
                              focused
                              required
                              inputProps={{tabIndex:"-1"}}
                            />
                            <IconButton
                              sx={{ height: 40, width: 40 }}
                              // onClick={() => handleShow("MAT")}
                            >
                              <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                            </IconButton>
                            {/* <MoreHorizIcon onClick={()=>handleShow('CP')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                            <TextField
                              id="deacription"
                              label=""
                              variant="filled"
                               value={selectmatLookupData.MATlookupDesc}
                              fullWidth
                              inputProps={{tabIndex:"-1"}}
                              focused
                            />
                          </FormControl>
                    </FormControl>



                    <FormControl
                  fullWidth
                  sx={{ gridColumn: "span 2", gap: "40px" }}
                >
                   <TextField
                    // name="OrderQuantity"
                    type="number"
                    // id="OrderQuantity"
                    label="Order Quantity"
                    variant="filled"
                    value={Headerqty}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    // error={!!touched.Code && !!errors.Code}
                    // helperText={touched.Code && errors.Code}
                    // inputProps={{ maxLength: 5 }}
                    // required
                    focused
                    onWheel={(e) => e.target.blur()} 
                    sx={{ background: "#fff6c3",input:{textAlign: "right"}}}
                    inputProps={{ readOnly:true }}
                   
                    
                    />

<TextField
                    name="OrderQuantity"
                    type="number"
                    id="OrderQuantity"
                    label="Item Required Quantity"
                    variant="filled"
                    value={values.OrderQuantity}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    // error={!!touched.Code && !!errors.Code}
                    // helperText={touched.Code && errors.Code}
                    // inputProps={{ maxLength: 5 }}
                    // required
                    sx={{ background: "#fff6c3"}}
                    onWheel={(e) => e.target.blur()} 
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                      
                      },
                    }}
                    
                    focused/>
                      
                    
                
                    <TextField
                    
                    type="number"
                   
                    name="message"
                    required
                    label="Production Quantity"
                    variant="filled"
                    sx={{ background: "#fff6c3"}}
                    onBlur={handleBlur}
                    onChange={handleChangefunct}
                    value={message}
                    onWheel={(e) => e.target.blur()} 
                    // onChange={handleChange}
                    // error={!!touched.Code && !!errors.Code}
                    // helperText={touched.Code && errors.Code}
                    // inputProps={{ maxLength: 5 }}
                    // required
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                        maxLength: 10,
                      },
                    }}
                  
                    focused/>

               <TextField
                    
                    type="number"
                    
                    label="Material Requirement"
                    variant="filled"
                    value={matreqVal}
                    sx={{ background: "#FFDAC0",input:{textAlign: "right"}}}
                    inputProps={{ readOnly:true }}
                    onWheel={(e) => e.target.blur()} 
                    focused/>
                </FormControl>
             
                <FormControl sx={{ gridColumn: "span 2"}}>
                      <Box m="5px">
                        <Box
                          m="5px 0 0 0"
                          height="60vh"
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
                              selectcelldata(
                                currentcell,
                                "E",
                                currentcellField
                              );
                              console.log(
                                "selectcelldata" +
                                  JSON.stringify(currentcell)
                              );
                            }}
                            //   onRowClick={(params) => {
                            //     const currentRow = params.row;
                            //     selectrowdata(currentRow,'E');

                            // }
                            // }

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
                    </FormControl>
                    <FormControl
                      sx={{
                        gridColumn: "span 2",
                        gap: "40px",
                       
                      }}
                    >
                      <Formik
                      innerRef={ref}
            initialValues={issuedInitialvalues}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                fnSave(values);
              }, 100);
            }}
            // validationSchema={substanceSchema}
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
              <form  onSubmit={handleSubmit}>
              {Type == 'Material' ?
             <FormControl 
             fullWidth
             sx={{ gridColumn: "span 2", gap: "40px" ,mt:"45px"}}
             
           >
   
                    <TextField
                    name="Date"
                    type="date"
                    id="Date"
                    label="Date"
                    variant="filled"
                    value={values.Date}
                    inputFormat="YYYY-MM-DD"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    focused
                    />
                   
                   <TextField
                                id="outlined-basic"
                                label=""
                                variant="filled"
                                 value={selectEMPLookupData.EMPlookupRecordid}
                                focused
                                sx={{ display: "none" }}
                              />

                              <FormControl
                                sx={{
                                  gridColumn: "span 2",
                                  display: "flex",
                                  
                                }}
                              >
                              
                                <FormControl
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
                                >
                            
                                  <TextField
                                    id="outlined-basic"
                                    label="Employee ID"
                                    variant="filled"
                                     value={selectEMPLookupData.EMPlookupDesc}
                                    fullWidth
                                    required
                                    focused
                                    inputProps={{tabIndex:"-1"}}
                                  />
                                  <IconButton
                                    sx={{ height: 40, width: 40 }}
                                    onClick={() => handleShow("EMP")}
                                  >
                                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                  </IconButton>
                                  {/* <MoreHorizIcon  onClick={()=>handleShow('UC')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}
                                </FormControl>
                              </FormControl>

                              <TextField
                    name="IssuedQty"
                    type="number"
                    id="IssuedQty"
                    label="Quantity"
                    variant="filled"
                    value={values.IssuedQty}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{ background: "#fff6c3"}}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                      
                      },
                    }}
                    onWheel={(e) => e.target.blur()} 
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 11);
                    }}
                    
                    focused/>
{/* <TextField
                                    fullWidth
                                    variant="filled"
                                    type="number"
                                    label="Sort Order"
                                    value={values.SortOrder}
                                    id="SortOrder"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="SortOrder"
                                    error={!!touched.SortOrder && !!errors.SortOrder}
                                    helperText={touched.SortOrder && errors.SortOrder}
                                    sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                                    focused
                                    onInput={(e) => {
                                      e.target.value = Math.max(0, parseInt(e.target.value))
                                        .toString()
                                        .slice(0, 11);
                                    }}
                                    InputProps={{
                                      inputProps: {
                                        style: { textAlign: "right" },
                                      },
                                    }}
                                  /> */}
                  </FormControl>
                   :false}          
 {Type == 'Leather' ?
                <FormControl
                sx={{ gridColumn: "span 2", gap: "40px" ,mt:"45px"}}
                style={{ width: "100%" }}
              >
                   <TextField
                    name="Date"
                    type="date"
                    id="Date"
                    label="Date"
                    variant="filled"
                    value={values.Date}
                    inputFormat="YYYY-MM-DD"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    focused
                    />
                       <TextField
                                id="outlined-basic"
                                label=""
                                variant="filled"
                                 value={selectEMPLookupData.EMPlookupRecordid}
                                focused
                                sx={{ display: "none" }}
                              />

                              <FormControl
                                sx={{
                                  gridColumn: "span 2",
                                  display: "flex",
                                
                                }}
                              >
                              
                                <FormControl
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
                                >
                            
                                  <TextField
                                    id="outlined-basic"
                                    label="Employee ID"
                                    variant="filled"
                                     value={selectEMPLookupData.EMPlookupDesc}
                                    fullWidth
                                     required
                                    focused
                                    inputProps={{tabIndex:"-1"}}
                                  />
                                  <IconButton
                                    sx={{ height: 40, width: 40 }}
                                    onClick={() => handleShow("EMP")}
                                  >
                                    <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                  </IconButton>
                                  {/* <MoreHorizIcon  onClick={()=>handleShow('UC')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}
                                </FormControl>
                              </FormControl>

                     <TextField
                        name="HideQty"
                        type="number"
                        id="HideQty"
                        label="Hide Qty"
                        variant="filled"
                        value={values.HideQty}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        sx={{ background: "#fff6c3"}}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                            maxLength: 10,
                          },
                        }}
                        
                        />
                       <TextField
                        name="HideSqft"
                        type="number"
                        id="HideSqft"
                        label="Hide Sqft"
                        variant="filled"
                        value={values.HideSqft}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        sx={{ background: "#fff6c3"}}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                            maxLength: 10,
                          },
                        }}
                        
                        /> 
                        <TextField
                        name="SideQty"
                        type="number"
                        id="SideQty"
                        label="Side Qty"
                        variant="filled"
                        value={values.SideQty}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        sx={{ background: "#fff6c3"}}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                            maxLength: 10,
                          },
                        }}
                        
                        />
                        <TextField
                        name="SideSqft"
                        type="number"
                        id="SideSqft"
                        label="Side Sqft"
                        variant="filled"
                        value={values.SideSqft}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        sx={{ background: "#fff6c3"}}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                            maxLength: 10,
                          },
                        }}
                        
                        />   

<MyField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Total Quantity"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="TotalSqft"
                          name="TotalSqft"
                           value={values.TotalSqft }
                          // error={
                          //   !!touched.Totalqty && !!errors.Totalqty
                          // }
                          // helperText={
                          //   touched.Totalqty && errors.Totalqty
                          // }
                          sx={{ gridColumn: "span 2",background: "#FFDAC0"  }}
                          focused
                          
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                        />
                  
                    </FormControl>:false}

                            <Box
                              display="flex"
                              justifyContent="end"
                              mt="30px"
                              gap={2}
                            >
                              {
  YearFlag == 'true' ? (
                             
                              <LoadingButton
                              color="secondary"
                              variant="contained"
                              type="submit"
                              loading={loading}
                              // onClick={() => {
                              //   fnSave(values);
                              // }}
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
                              <Button
                                type="reset"
                                color="warning"
                                variant="contained"
                                onClick={() =>   navigate(`/Apps/Secondarylistview/TR048/Product%20Card%20Items/${prNumber}/${Number}`)}
                              >
                                Cancel
                              </Button>
                            </Box>
                          </form>
                        )}
                      </Formik>
                    </FormControl>
                </Box>

              
             
       
              <Popup
                    title="Material"
                    openPopup={openMATpopup}
                    setOpenPopup={setOpenMATpopup}
                  >
                    <Listviewpopup
                      accessID="2025"
                      screenName="Material"
                      childToParent={childToParent}
                      filterName=""
                      filterValue={prNumber}
                    />
                  </Popup>
                  <Popup
                    title="Employee"
                    openPopup={openEMPpopup}
                    setOpenPopup={setOpenEMPpopup}
                  >
                    <Listviewpopup
                      accessID="2024"
                      screenName="Employee"
                      childToParent={childToParent}
                     
                    />
                  </Popup>
                
           
</Box>

    )}</Formik>
          </Box>
          </Box>
      </React.Fragment>
    
)}

export default Editissue;