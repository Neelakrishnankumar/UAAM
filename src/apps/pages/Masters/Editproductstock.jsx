import React, { useState, useEffect ,useRef} from "react";
import { TextField, Box, Typography,Breadcrumbs, FormControl,FormLabel,Button, IconButton,useTheme,Tooltip,Stack } from "@mui/material";
import  useMediaQuery  from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from '@mui/icons-material/ResetTv';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Formik } from "formik";
import { DataGrid, GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
    GridToolbarQuickFilter,} from "@mui/x-data-grid";
    import { useNavigate, useParams } from "react-router-dom";
    import { tokens } from "../../../Theme";
    import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Form } from "react-router-dom";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import Listviewpopup from "../Lookup";
import Popup from "../popup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import basicSchema from "../../Security/validation";
import {
  fetchApidata,
  postApidata,
  stockApidata,
  stockGetData,
  getFetchData
} from "../../../store/reducers/Formapireducer";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion from '@mui/material/Accordion';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { fnFileUpload } from "../../../store/reducers/Imguploadreducer";
import store from "../../../index";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
const Editproductstock = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const params = useParams();
    var yearData = sessionStorage.getItem("year"); 
    const navigate = useNavigate()
    const { toggleSidebar, broken, rtl } = useProSidebar();
    const dispatch = useDispatch();
    
    var recID = params.id;
    // var mode = params.Mode;
    var accessID = params.accessID;
    var mode = params.Mode;
    var stockcode = params.Code;
    var stockdesc = params.Desc;
    
    const Data = useSelector((state) => state.formApi.Data);
    const stockData = useSelector((state) => state.formApi.materialStockData);
    console.log("🚀 ~ file: Editstock.jsx:76 ~ Editstock ~ stockData:", stockData)
    const Status = useSelector((state) => state.formApi.Status);
    const Msg = useSelector((state) => state.formApi.msg);
    const isLoading = useSelector((state) => state.formApi.loading);
    // const YearFlag = sessionStorage.getItem("YearFlag")
    
  
   
    useEffect(() => {
      // dispatch(fetchApidata("TR001", "get", recID));
      // dispatch(stockApidata("TR069", recID,"P",yearData));
  
      dispatch(getFetchData({accessID:"TR001",get :"get", recID}));

      dispatch(stockGetData({accessID:"TR069", recID,Type:"PO",yearData}));
    }, []);
    
    const isNonMobile = useMediaQuery("(min-width:600px)")
    const stockIntialValue = {
      OpenstockProductQty:stockData.OpenstockProductQty,
      RecievedStockProductQty:stockData.RecievedStockProductQty,
      IssuedStockPrdQty:stockData.IssuedStockPrdQty,
      RequirementStockPrdQty:stockData.RequirementStockPrdQty,
      Stock:stockData.Stock,
      BALANCE:stockData.BALANCE,
      OpenstockOsdate:stockData.Osdate
    }
   
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
  const ref = useRef(null)
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
              navigate(-1)
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
            
             
             <Box display="flex" borderRadius="3px" alignItems="center">
             {broken && !rtl && (
          <IconButton
            
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        )}
             <Breadcrumbs maxItems={2} aria-label="breadcrumb" separator={<NavigateNextIcon sx={{color:'#0000D1'}}/>}>
            <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} onClick={() => { navigate(`/Apps/TR002/Product%20Categories`); }}>Product</Typography>
            <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} onClick={() => { navigate(`/Apps/TR002/Product%20Categories`); }}>{stockdesc}</Typography>
            <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} onClick={() => { navigate(`/Apps/TR002/Product%20Categories`); }}>Stock</Typography>
            </Breadcrumbs>
                      </Box>
            </Box>
             <Box display="flex">
              <Tooltip title='Close'>
             {/* <IconButton  color="error" onClick={() => navigate(`/Apps/Secondarylistview/TR001/Product%20Master/${stockcode }/${stockdesc}`)}> */}
             <IconButton  color="error" onClick={() => fnLogOut('Close')}>
              <ResetTvIcon />
            </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
                <IconButton >
                    <LogoutOutlinedIcon onClick={() => fnLogOut('Logout')} color="error"/>
                </IconButton>
                </Tooltip>

             </Box>
          </Box>
          <Box m="20px" sx={{ m: 2 }}>
            
            <Formik
              // onSubmit={handleFormSubmit}
              initialValues={stockIntialValue}
              enableReinitialize={true}
              validationSchema={basicSchema}
            >
              {({ values, errors, touched, handleBlur, handleChange }) => (
                <form>
          
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(4 , minMax(0,1fr))"
                  gap="30px"
                  sx={{
                    "& > div":{gridColumn : isNonMobile ? undefined : "span 4"} 
                  }}
                >
                    {!isNonMobile &&  <Stack
                        sx={{
                          gridColumn: "span 2",
                          alignContent: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                          right: "0px",
                        }}
                      >
                        <img
                           src={userimg}
                          style={{
                            width: "200px",
                            height: "150px",
                           
                          }}
                        />
                      </Stack>}
                     
                     <FormControl
                  fullWidth
                  sx={{ gridColumn: "span 2", gap: "40px" }}
                >
  <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        value={stockcode}
                        id="stockcode"
                        name="stockcode"
                        label="Model"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.ModelNo && !!errors.ModelNo}
                        helperText={touched.ModelNo && errors.ModelNo}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        inputProps={{ maxLength: 10, readOnly: true }}
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        value={stockdesc}
                        // id="Desc"
                        // name="Desc"
                        label="Description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        sx={{ gridColumn: "span 2" }}
                        focused
                        // error={!!touched.Desc && !!errors.Desc}
                        // helperText={touched.Desc && errors.Desc}
                        inputProps={{ maxLength: 50, readOnly: true }}
                        multiline
                      />
                      </FormControl>
                       <FormControl sx={{ gridColumn: "span 2" }}>
                       {isNonMobile &&  <Stack
                        sx={{
                          gridColumn: "span 2",
                          alignContent: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                          right: "0px",
                        }}
                      >
                        <img
                           src={userimg}
                          style={{
                            width: "200px",
                            height: "150px",
                           
                          }}
                        />
                      </Stack>}
                     
                      
                            
                    </FormControl>
                   
                   
                  <TextField
                    name="OpenstockProductQty"
                    type="number"
                    id="OpenstockProductQty"
                    value={values.OpenstockProductQty}
                    label="Opening Stock"
                    variant="filled"
                    focused
                    inputProps={{style: { textAlign: 'right' }}}
                    InputProps={{ readOnly: true }}
                   sx={{ background: "#fff6c3",gridColumn: "span 2"}}
                    />
                     {values.OpenstockOsdate !== "0" ?
                  <TextField
                    name="OpenstockOsdate"
                    type="Date"
                    id="OpenstockOsdate"
                    value={values.OpenstockOsdate}
                    label="Opening Stock Date"
                    variant="filled"
                    focused
                    inputFormat="YYYY-MM-DD"
                    // inputProps={{style: { textAlign: 'right' }}}
                    InputProps={{ readOnly: true }}
                   sx={{ background: "#fff6c3",gridColumn: "span 2"}}
                    />: false}
                 
                     {/* <TextField
                    name="RecievedStockProductQty"
                    type="text"
                    id="RecievedStockProductQty"
                    label="Received Qty"
                    variant="filled"
                    value={values.RecievedStockProductQty}
                    focused
                    inputProps={{ readOnly: true }}
                    /> */}
                    
                    <TextField
                    name="IssuedStockPrdQty"
                    type="number"
                    id="IssuedStockPrdQty"
                    label="Issued Qty(Production + Out DC)"
                    variant="filled"
                    value={values.IssuedStockPrdQty}
                    focused
                    inputProps={{style: { textAlign: 'right' }}}
                    InputProps={{ readOnly: true }}
                    sx={{ background: "#fff6c3",gridColumn: "span 2"}}
                    />

                    <TextField
                    name="Stock"
                    type="number"
                    id="Stock"
                    label="Available Stock"
                    variant="filled"
                    value={values.Stock}
                    focused
                    sx={{  background: "#FFDAC0",gridColumn: "span 2"}}
                    inputProps={{style: { textAlign: 'right' }}}
                    InputProps={{ readOnly: true }}
                    />
                     <Tooltip title="Requirement Qty - Batchissue Qty">
                    <TextField
                    name="RequirementStockPrdQty"
                    type="number"
                    id="RequirementStockPrdQty"
                    label="Requirement Qty(Asper ProductionCard)"
                    variant="filled"
                    value={values.RequirementStockPrdQty}
                    focused
                    sx={{ background: "#fff6c3",gridColumn: "span 2"}}
                    inputProps={{style: { textAlign: 'right' }}}
                     InputProps={{ readOnly: true }}
                    />
                    </Tooltip>
                    <TextField
                    name="BALANCE"
                    type="number"
                    id="BALANCE"
                    label="Balance"
                    value={values.BALANCE}
                    variant="filled"
                    focused
                    inputProps={{style: { textAlign: 'right' }}}
                    InputProps={{ readOnly: true }}
                    sx={{  background: "#FFDAC0",gridColumn: "span 2"}}
                    />
                   
                    <FormControl
                  fullWidth
                  sx={{ gridColumn: "span 2", gap: "40px" }}
                >
             
                    </FormControl>
                   
                    </Box>
                    </form>)}
                    </Formik>
                    <Box display="flex" justifyContent="end" mt="20px" gap="20px">
{/* <Button variant="contained" color="secondary">Apps/Secondarylistview/TR001/Product%20Master/131/TUBE%20HOLDER%20CASE
    SAVE
</Button> */}
{/* <Button variant="contained" color="error" onClick={() => navigate(`/Apps/Secondarylistview/TR001/Product%20Master/${stockcode }/${stockdesc}`)}> */}
<Button variant="contained" color="error" onClick={() => navigate(-1)}>
    CANCEL
</Button>
                 </Box>
                   
                    </Box>
                    
                


          </Box>
      </React.Fragment>  
    )
}

export default Editproductstock;
