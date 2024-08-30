import {
    TextField,
    Box,
    Typography,
    FormControl,
    FormLabel,
    Button,
    IconButton,
    FormControlLabel,
    Tooltip,
    Checkbox,
    LinearProgress,
  } from "@mui/material";
  import useMediaQuery from "@mui/material/useMediaQuery";
  import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
  import ResetTvIcon from "@mui/icons-material/ResetTv";
  import { Field, Formik } from "formik";
  import { CheckBox } from "@mui/icons-material";
  import { substanceSchema } from "../../Security/validation";
  import { useParams, useNavigate, useLocation } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { toast } from "react-hot-toast";
  import {
    fetchApidata,
    getFetchData,
    postApidata,
    postData,
    StockProcessApi,
    hashtoken
  } from "../../../store/reducers/Formapireducer";
  import React, { useState, useEffect, useRef } from "react";
  import { LoadingButton } from "@mui/lab";
  import Swal from "sweetalert2";
  import { useProSidebar } from "react-pro-sidebar";
  import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
  import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
  import store from "../../../index";
  // ***********************************************
  // Developer:Priya
  // Purpose:To Create Substance
  // ***********************************************
  const Editinspection = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const navigate = useNavigate();
    let params = useParams();
    const dispatch = useDispatch();
    var recID = params.id;
    var mode = params.Mode;
    var accessID = params.accessID;
    const Data = useSelector((state) => state.formApi.Data);
    const Status = useSelector((state) => state.formApi.Status);
    const Msg = useSelector((state) => state.formApi.msg);
    const isLoading = useSelector((state) => state.formApi.loading);
    // const getLoading = useSelector((state) => state.formApi.getLoading);
    const location = useLocation();
    const YearFlag = sessionStorage.getItem("YearFlag");
    const Year = sessionStorage.getItem("year");
    const Finyear = sessionStorage.getItem("YearRecorid");
    const compID = sessionStorage.getItem("compID");
    const hashtokendata = useSelector((state) => state.formApi.hashtokenData);

    const { toggleSidebar, broken, rtl } = useProSidebar();
    useEffect(() => {
      dispatch(getFetchData({ accessID, get: "get", recID }));
      dispatch(hashtoken({hashtoken:{"Indentdata":`compID=${compID}&intRecID=${recID}&Year=${Year}`}}));
    }, [location.key]);
    const [ini, setIni] = useState(true);
    const [loading, setLoading] = useState(false);
    
   
    //*******Assign Substance values from Database in  Yup initial value******* */
    const initialValues = {
      //  RecordID: Data.RecordID,
      leatherpattern: Data.LeatherPattern,
      linepattern: Data.LinePattern,
      additionalpattern: Data.AdditionalPattern,
      instruction: Data.Instructions,
      
    };
    // **********Save Function*****************
    const fnSave = async (values) => {
      setLoading(true);
      setIni(false);

  
     
      console.log(values);
  
      var idata = {
        RecordID: recID,
        LeatherPattern: values.leatherpattern,
        LinePattern: values.linepattern,
        AdditionalPattern: values.additionalpattern,
        Instructions: values.instruction,
       
        // YearID: Year,
        // Finyear,
        // compID,
      };
      // var type = "";
  
      // if (mode == "A") {
      //   type = "insert";
      // } else {
      //   type = "update";
      // }
  
      // const data = await dispatch(postApidata(accessID, type, idata));
      let action = "update";
      const data = await dispatch(postData({ accessID, action, idata }));
      if (data.payload.Status == "Y") {
        toast.success(data.payload.Msg);
        setIni(true);
        setLoading(false);
        navigate(`/Apps/TR047/Production Card`);
      } else {
        toast.error(data.payload.Msg);
        setLoading(false);
      }
    };
    const fnProcess = async() => {

      const props = {accessID,recID}
      const Data = await dispatch(StockProcessApi(props))
       console.log("🚀 ~ file: Editinspection.jsx:320 ~ fnProcess ~ Data:", Data)
      if (Data.payload.Status == "Y") {
        toast.success(Data.payload.Msg);
        navigate( `/Apps/TR146/Production Card/EditInspection Form/${recID}`)
      }else{
        toast.success(Data.payload.Msg);
  
      }}
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const ref = useRef(null);
    const fnLogOut = (props) => {
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
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: props,
      }).then((result) => {
        if (result.isConfirmed) {
          if (props === "Logout") {
            navigate("/");
          }
          if (props === "Close") {
            navigate("/Apps/TR047/Production Card");
          }
        } else {
          return;
        }
      });
    };
    return (
      <React.Fragment>
        {/* {getLoading ? <LinearProgress /> : false} */}
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box display="flex" borderRadius="3px" alignItems="center">
            {broken && !rtl && (
              <IconButton onClick={() => toggleSidebar()}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
            <Typography variant="h3">Inspection Form</Typography>
          </Box>
          <Box display="flex">
            <Tooltip title="Close">
              <IconButton onClick={() => fnLogOut("Close")} color="error">
                <ResetTvIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton onClick={() => fnLogOut("Logout")}>
                <LogoutOutlinedIcon color="error" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
  
        
          <Box m="20px">
            <Formik
              initialValues={initialValues}
              onSubmit={(values, setSubmitting) => {
                setTimeout(() => {
                  fnSave(values);
                }, 100);
              }}
              // validationSchema={substanceSchema}
              enableReinitialize={true}
            >
              {({
                errors,
                touched,
                handleBlur,
                handleChange,
                isSubmitting,
                values,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(4 , minMax(0,1fr))"
                    gap="30px"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <FormControl
                      fullWidth
                      sx={{ gridColumn: "span 2", gap: "40px" }}
                    >
                     
                      <TextField
                        name="leatherpattern"
                        type="text"
                        id="leatherpattern"
                        label="Leather Pattern"
                        variant="filled"
                        focused
                        value={values.leatherpattern}
                        onBlur={handleBlur}
                        onChange={handleChange}
                       required
                        autoFocus
                       />
                       <TextField
                        name="linepattern"
                        type="text"
                        id="linepattern"
                        label="Lining Pattern"
                        variant="filled"
                        focused
                        value={values.linepattern}
                        onBlur={handleBlur}
                        onChange={handleChange}
                       required
                        autoFocus
                       />
                        <TextField
                        name="additionalpattern"
                        type="text"
                        id="additionalpattern"
                        label="Additional Pattern"
                        variant="filled"
                        focused
                        value={values.additionalpattern}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        autoFocus
                       />
                       <TextField
                        name="instruction"
                        type="text"
                        id="instruction"
                        label="Instruction"
                        variant="filled"
                        focused
                        value={values.instruction}
                        onBlur={handleBlur}
                        onChange={handleChange}
                       multiline
                        autoFocus
                        required
                       />
                     
                    </FormControl>
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                    {YearFlag == "true" ? (
                      <LoadingButton
                        color="secondary"
                        variant="contained"
                        type="submit"
                        loading={loading}
                        //disabled={isSubmitting}
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
                    )}
                    
                   {Data.InspectionProcess != "Y" ? (
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={fnProcess}
                    >
                      Process
                    </Button>
                  ) : null}
                   {Data.InspectionProcess == "Y" ?( 
                    <a  href={`${
                      store.getState().globalurl.pdfurl
                    }productioncardinspection.php?Token=${hashtokendata.Hashtoken}`} target="_blank" 
                    rel="noreferrer">
                    <Button  variant="contained" color="primary" >
                    <PrintOutlinedIcon/>
                    </Button>
                    </a>
                       ):null}
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
       
      </React.Fragment>
    );
  };
  
  export default Editinspection;
  