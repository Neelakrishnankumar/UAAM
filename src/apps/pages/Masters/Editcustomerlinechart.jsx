import React, { useEffect } from "react";
import { TextField, Box, Typography, FormControl, FormLabel, Button, IconButton, Tooltip, } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Formik } from "formik";
// import CustomerLineChart from "./CustomerLine";
import Chart from 'react-apexcharts';
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { useState } from "react";
import Popup from "../popup";
import Listviewpopup from "../Lookup";
import { customerorderanalysis, resetTrackingData } from "../../../store/reducers/Formapireducer";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
const Editcustomerlinechart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams()
  const isNonMobile = useMediaQuery("(min-width:600px)")
  const compID = sessionStorage.getItem("compID")
  const YearRecorid = sessionStorage.getItem("YearRecorid")
  const [isPopupData, setisPopupdata] = useState(false);
  const seriesData = useSelector((state) => state.formApi.customerData);
  const[loading , setLoading ] = useState(false);
  const [customerLookup, setCustomerLookup] = useState({
    cusRecordID: "",
    cusCode: "",
    cusName: "",
  });
  const [openCusPopup, setOpenCusPopup] = useState(false);
  function openPopup(type) {
    if (type == "CUS") {
      setOpenCusPopup(true);
    }
  }
  // const childToParent = async (childdata, type) => {
  //   if (type == "Customer") {
  //     setisPopupdata(true);
  //     setCustomerLookup({
  //       cusRecordID: childdata.RecordID,
  //       cusCode: childdata.Code,
  //       cusName: childdata.Name,
  //     });
  //     setOpenCusPopup(false);
  //   }
  // }
  const data = { Query: { RecordID: params.id, CompanyID:compID, Finyear:YearRecorid} }

  useEffect(()=>{
    dispatch( customerorderanalysis({data}));

  },[])
  const customerorderFn = async () => {

    if(customerLookup.cusRecordID){
      setLoading(true)

      const data = { Query: { RecordID: customerLookup.cusRecordID, CompanyID:compID, Finyear:YearRecorid} }
  
      // const response = await dispatch( customerorderanalysis(customerLookup.cusRecordID,compID,YearRecorid));
      const response = await dispatch( customerorderanalysis({data}));
       console.log("🚀 ~ file: Editreport.jsx:266 ~ reportFn ~ response:", response)

       if(response.payload.Status === "Y"){
        setLoading(false)
       }else setLoading(false)
    }else toast.error("Please select customer lookup")

  };


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
              navigate("/Apps/TR010/Customers")
            }
          }else{
            return
          }
      })
    }

  const chartData = {
    height: 480,
    type: 'line',
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        type: 'category',
        categories:  seriesData ?  seriesData.categories : ["Loading..."],
        label:{
          formatter: function(value, timestamp, opts) {
            return  value + 'HEllo'
          }
        }
        
      }
    },
    
  };

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box
          display="flex"
          borderRadius="3px"
          alignItems="center"
        >
          <Typography variant="h3">Customer Order Analysis</Typography>
        </Box>
        <Box display="flex">
         
        <Tooltip title="Close">
<IconButton onClick={() =>   fnLogOut('Close')} color="error">
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
        <Formik>{({ }) => (
          <form>
            <Box
              display="grid"
              gridTemplateColumns="repeat(4 , minMax(0,1fr))"
              gap="30px"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span4" }
              }}
            >
              {/* <Box
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
              </Box> */}

            </Box>

            {/* <Box display="flex" justifyContent="end" mt="20px" gap="20px">
              <LoadingButton loading={loading} variant="contained" color="secondary" onClick={customerorderFn}>
                APPLY
              </LoadingButton>
              <Button onClick={() => {
                dispatch(resetTrackingData());
              setCustomerLookup({
                cusRecordID: "",
                cusCode: "",
                cusName: "",
              })
              
              }} variant="contained" color="error">
                RESET
              </Button>
            </Box> */}
            <Box sx={{ gridColumn: "span 4", m: 10 }}>
            {seriesData && seriesData.categories &&(<Chart
                            
                            series={seriesData.series}
                            {...{
                              height: 480,
                              type: 'line',
                              // options: {
                              //   chart: {
                              //     id: "basic-bar"
                              //   },
                              //   xaxis: {
                              //     type: 'category',
                              //     categories:  seriesData ?  seriesData.categories : ["Loading..."],
                              //     label:{
                              //       formatter: function(value) {
                              //         return value + "$";
                              //       }
                              //     }
                                  
                              //   }
                              // },
                              
                            }} 
                            options={{
                              chart: {
                                id: "basic-bar"
                              },
                              xaxis: {
                                type: 'category',
                                categories:  seriesData ?  seriesData.categories : ["Loading..."],
                                // labels:{
                                //   formatter:value => `${value}| ${value}| ${value}`
                                // }
                                
                              }
                            }}
                            
                            />)}
            </Box>
          </form>
        )}

        </Formik>
        {/* <Popup
          title="Customer"
          openPopup={openCusPopup}
          setOpenPopup={setOpenCusPopup}
        >
          <Listviewpopup
            accessID="2009"
            screenName="Customer"
            childToParent={childToParent}
          />
        </Popup> */}
      </Box>

    </React.Fragment>
  )
}

export default Editcustomerlinechart;
