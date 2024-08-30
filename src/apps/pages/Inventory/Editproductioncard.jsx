import React from "react";
import { TextField, Box, Typography, FormControl,FormLabel,Button, IconButton,Tooltip} from "@mui/material";
import  useMediaQuery  from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Formik,Field } from "formik";
import ResetTvIcon from '@mui/icons-material/ResetTv';
import {  useNavigate } from "react-router-dom";
// import  { useState, useEffect } from "react";
import { useRef } from "react";
import Swal from "sweetalert2";
const Editproductioncard = () =>{
    const navigate = useNavigate();
    const style = {
  

        height: "55px",
        border: "2px solid #1769aa ",
        borderRadius: "5px",
        backgroundColor: "#EDEDED",
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
                navigate("/Apps/TR047/Production Card")
              }
            }else{
              return
            }
        })
      }
      const ref = useRef(null)
    return(
        <React.Fragment>
          <Box display="flex" justifyContent="space-between" p={2}>
            <Box
             display="flex"
             borderRadius="3px"
             alignItems="center"
            >
             <Typography variant="h3">Production Card</Typography>
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
          <Formik>{({}) =>(
            <form>
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(4 , minMax(0,1fr))"
                  gap="30px"
                  sx={{
                    "& > div":{gridColumn : isNonMobile ? undefined : "span4"} 
                  }}
                >
                     <FormControl
                  fullWidth
                  sx={{ gridColumn: "span 2", gap: "40px" }}
                >
                     <TextField
                    name="proformanumber"
                    type="text"
                    id="proformanumber"
                    label="Proforma Number"
                    variant="filled"
                    focused/>
                      <TextField
                    name="productmodel"
                    type="text"
                    id="productmodel"
                    label="Product Model"
                    variant="filled"
                    focused/>
                      <TextField
                    name="bom"
                    type="text"
                    id="bom"
                    label="BOM"
                    variant="filled"
                    focused/>
                      <TextField
                    name="version"
                    type="text"
                    id="version"
                    label="Version"
                    variant="filled"
                    focused/>

                     <TextField
                    name="date"
                    type="date"
                    id="date"
                    label="Date"
                    variant="filled"
                    focused/>
                     <TextField
                    name="quantity"
                    type="text"
                    id="quantity"
                    label="Quantity"
                    variant="filled"
                    focused/>
  <TextField
                    name="reference"
                    type="text"
                    id="reference"
                    label="Reference"
                    variant="filled"
                    focused/>
                     <FormControl>
                     {/* <FormLabel>Notification Type:</FormLabel>   */}
                     <Field
                                as="select"
                                label="Type"
                               
                                id="NotifyType"
                                name="NotifyType"
                                focused
                                style={style}
                              >
                                <option>Status</option>
                                <option value="Y">Yet to Start</option>
                                <option value="I">Inprogress</option>
                                <option value="C">Completed</option>
                               
                              </Field>
                              </FormControl>
                              
                    </FormControl>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px" gap="20px">
<Button variant="contained" color="secondary">
    SAVE
</Button>
<Button variant="contained" color="error">
    CANCEL
</Button>
                 </Box>



            </form>


    )}</Formik>
          </Box>
        
      </React.Fragment>  
    )
}

export default Editproductioncard;