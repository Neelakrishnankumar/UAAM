// import React, { useState, useEffect } from "react";
// import {
//   Select,
//   Avatar,
//   Stack,
//   Grid,
//   Paper,
//   FormLabel,
//   TextField,
//   Button,
//   Autocomplete,
//   Box,
//   Link,
//   IconButton,
//   FormControl,
//   InputLabel,
//   OutlinedInput,
//   InputAdornment,
//   FormHelperText,
//   FormGroup,
//   MenuItem,
//   Typography,
// } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import { useNavigate } from "react-router-dom";
// import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// import Tabss from "../../ui-components/tabs";
// import LgemsLogo from "../../assets/img/LOGO.jpg9.png";
// import Newlogoimg from "../../assets/img/Newlogo.png";
// import "../../index.css";
// import { useFormik } from "formik";
// import basicSchema from "./validation";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   authentication,
//   fetchApidata,
// } from "../../store/reducers/LoginReducer";
// import { fetchComboData1 } from "../../store/reducers/Comboreducer";
// import { fetchyearComboData } from "../../store/reducers/LoginReducer";
// import store from "../../index";
// import { toast } from "react-hot-toast";
// import { useParams } from "react-router-dom";
// import { Field, Form, Formik, ErrorMessage } from "formik";
// import background from "../../assets/img/background.jpg";
// import { LoadingButton } from "@mui/lab";
// import BexATMLogo from "../../assets/img/BexATM.png";
// const style = {
//   height: "55px",
//   border: "2px solid #1769aa ",
//   borderRadius: "5px",
// };

// const Login = () => {
//   const navigate = useNavigate();
//   const Data = useSelector((state) => state.loginApi.Data);
//   const Status = useSelector((state) => state.loginApi.Status);
//   const Msg = useSelector((state) => state.loginApi.msg);
//   const isLoading = useSelector((state) => state.loginApi.loading);
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();

//   const CompanyCombo = useSelector((state) => state.comboApi.company);
//   const YearCombo = useSelector((state) => state.comboApi.year);

//   React.useEffect(() => {
//     dispatch(fetchComboData1("TR014", "getall", "-1", "Company"));
//     dispatch(fetchComboData1("TR015", "getall", "-1", "Year"));
//   }, []);

//   const [value, setValues] = React.useState({
//     showPassword: false,
//   });

//   const handleClickShowPassword = () => {
//     setValues({
//       ...value,
//       showPassword: !value.showPassword,
//     });
//   };

//   const [company, setCompanycombo] = React.useState();
//   const [year, setYearcombo] = React.useState();

//   const initialValues = {
//     username: "",
//     password: "",
//     company: company,
//     year: year,
//   };
//   const clear = async (values) => {
//     setCompanycombo("");
//     setYearcombo("");
//   };
//   const fnLogin = async (values) => {
//     // setLoading(true);

//     // if ((values.company == "")||(values.company == undefined)) {
//     //   toast.error("Please select company");
//     //   setLoading(false);
//     //   return;
//     // }
//     if (values.username == "") {
//       toast.error("Username should not be empty");
//       setLoading(false);
//       return;
//     }
//     if (values.password == "") {
//       toast.error("Password shoud not be empty");
//       setLoading(false);
//       return;
//     }
//     // if ((values.year == "")||(values.year == undefined)) {
//     //   toast.error("Please select year");
//     //   setLoading(false);
//     //   return;
//     // }
//     //  const data = await dispatch(fetchApidata(values.username,values.password,values.company,values.year));
//     const idata = {
//       username: values.username,
//       password: values.password,
//       yearrecordid: values.year,
//       companyrecordid: values.company,
//     };
//     const data = await dispatch(
//       fetchApidata(
//         values.username,
//         values.password
//         //values.company,values.year
//       )
//     );
//     console.log("🚀 ~ file: Login.jsx:126 ~ Login ~ data:", data);
//     var loginrecordID = data.payload.apiResponse.Recordid;
//     //  var UserName = data.payload.apiResponse.Name

//     sessionStorage.setItem("loginRecid", loginrecordID);

//     if (data.payload.Status == "Y") {
//       //  var loginrecordID = data.payload.apiResponse.Recordid
//       var company = data.payload.apiResponse.Company;
//       var year = data.payload.apiResponse.Year;
//       var YearFlag = data.payload.apiResponse.YearFlag;
//       var CompanyRecordid = data.payload.apiResponse.CompanyRecordid;
//       var stockflag = data.payload.apiResponse.Process;
//       var Cifbysea = data.payload.apiResponse.Cifbysea;
//       var Cifbyair = data.payload.apiResponse.Cifbyair;
//       var Fob = data.payload.apiResponse.Fob;
//       var Overhead = data.payload.apiResponse.Overhead;
//       var YearRecorid = data.payload.apiResponse.YearRecorid;
//       var Groupaccess = data.payload.apiResponse.Groupaccess;
//       var UserName = data.payload.apiResponse.Name;
//       var labourCharge = data.payload.apiResponse.Labourcharges;

//       var Modules = data.payload.apiResponse.Modules;

//       sessionStorage.setItem("loginRecid", loginrecordID);
//       sessionStorage.setItem("UserName", UserName);
//       sessionStorage.setItem("labourCharge", labourCharge);
//       sessionStorage.setItem("company", company);
//       sessionStorage.setItem("year", year);
//       sessionStorage.setItem("YearFlag", YearFlag);
//       sessionStorage.setItem("compID", CompanyRecordid);
//       sessionStorage.setItem("stockflag", stockflag);
//       sessionStorage.setItem("currentPage", 0);
//       sessionStorage.setItem("secondaryCurrentPage", 0);
//       sessionStorage.setItem("Cifbysea", Cifbysea);
//       sessionStorage.setItem("Cifbyair", Cifbyair);
//       sessionStorage.setItem("Fob", Fob);
//       sessionStorage.setItem("Overhead", Overhead);
//       sessionStorage.setItem("YearRecorid", YearRecorid);
//       sessionStorage.setItem("Groupaccess", JSON.stringify(Groupaccess));
//       sessionStorage.setItem("Modules", JSON.stringify(Modules));
//       //navigate("/Apps/TR014/Company");
//       navigate("/Apps/AAM");
//     } else {
//       setLoading(false);
//       toast.error(data.payload.message);
//     }
//   };
//   return (
//     <div className="wrapper">
//       <Box display={"table"} height="99vh" width="100%">
//         <IconButton sx={{ position: "absolute", right: "20px" }} color={"info"}>
//           <HelpOutlineOutlinedIcon />
//         </IconButton>
//         <Grid
//           container
//           sx={{ display: "table-cell", verticalAlign: "middle" }}
//           rowSpacing={5}
//           columnSpacing={{ xs: 1, sm: 2, md: 3 }}
//         >
//           <Formik
//             // onSubmit={handleFormSubmit}
//             initialValues={initialValues}
//             enableReinitialize={true}
//             // validationSchema={basicSchema}
//             onSubmit={(values, setSubmitting) => {
//               setTimeout(() => {
//                 fnLogin(values);
//               }, 100);
//             }}
//           >
//             {({
//               values,
//               errors,
//               touched,
//               handleBlur,
//               handleChange,
//               handleSubmit,
//               resetForm,
//             }) => (
//               <form onSubmit={handleSubmit}>
//                 <Stack
//                   component="form"
//                   height={{ sm: "520px", md: "300px" }}
//                   width={{ sm: "291px", md: "700px" }}
//                   sx={{
//                     boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
//                     borderRadius: "10px",
//                     backgroundColor: "white",
//                     padding: "15px",
//                     margin: "20px auto",
//                   }}
//                   spacing={{ sm: 4, md: 2 }}
//                   autoComplete="off"
//                   direction={{ sm: "column", md: "row" }}
//                 >
//                   {/* <Stack
//                     sx={{
//                       width: {
//                         sm: "100%",
//                         md: "100%",
//                         lg: "100%",
//                         fontSize: "50px",
//                         fontWeight: "semibold",
//                       },
//                       alignContent: "center",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       // backgroundImage: `url(${background})`,
//                       backgroundSize: "cover",
//                       padding: 1,
//                       borderRadius: "5px",
//                     }}
//                   >
//                     <Avatar
//                       variant="rounded"
//                       src={Newlogoimg}
//                       sx={{ width: "100%", height: "100%" }}
//                     ></Avatar>
//                   </Stack> */}
//                   <Stack
//                     sx={{
//                       width: { sm: "100%", md: "100%", lg: "100%" },
//                       height: "100%",
//                       display: "flex",
//                       flexDirection: "column",
//                       alignContent: "center",
//                       justifyContent: "flexend",
//                       alignItems: "center",
//                       backgroundImage: `url(${BexATMLogo})`,
//                       backgroundRepeat: "no-repeat",
//                       backgroundPosition: "center",
//                       backgroundSize: "75%",
//                       padding: 1,
//                       borderRadius: "5px",
//                       height: "300px",
//                       // marginBottom: "50px",
//                       marginTop: "-30px",
//                       flexDirection: "column-reverse",
//                     }}
//                     spacing={2}

//                   >

//                     <Typography
//                       variant="p"
//                       sx={{
//                         marginBottom: 5,
//                         // marginRight: 2,
//                         textAlign: "center",
//                         // fontWeight: "600",
//                         fontSize:"13px",
//                       }}
//                     >
//                       Version 1.0
//                     </Typography>
//                     <Typography
//                       variant="h6"
//                       sx={{
//                         marginTop: 2,
//                         textAlign: "center",
//                         fontWeight: "600",
//                       }}
//                     >
//                       Account Access Management
//                     </Typography>
//                   </Stack>

//                   <Stack
//                     sx={{
//                       width: { sm: "100%", md: "100%", lg: "100%" },
//                     }}
//                     spacing={2}
//                   >

//                     <FormControl sx={{ marginTop: { sm: "5px", md: "60px" } }}>
//                       <TextField
//                         margin="normal"
//                         focused
//                         label="Username"
//                         id="username"
//                         value={values.username}
//                         onBlur={handleBlur}
//                         onChange={handleChange}
//                         onSubmit={handleSubmit}
//                         fullWidth
//                         required
//                         error={!!touched.username && !!errors.username}
//                         helperText={touched.username && errors.username}
//                       />
//                     </FormControl>

//                     <FormControl focused margin="normal" fullWidth required>
//                       <InputLabel>Password</InputLabel>
//                       <OutlinedInput
//                         id="password"
//                         type={value.showPassword ? "text" : "password"}
//                         value={values.password}
//                         onBlur={handleBlur}
//                         onChange={handleChange}
//                         //  placeholder='Enter password'
//                         error={!!touched.password && !!errors.password}
//                         helperText={touched.password && errors.password}
//                         endAdornment={
//                           <InputAdornment position="end">
//                             <IconButton
//                               onClick={handleClickShowPassword}
//                               edge="end"
//                             >
//                               {value.showPassword ? (
//                                 <VisibilityOffIcon />
//                               ) : (
//                                 <VisibilityIcon />
//                               )}
//                             </IconButton>
//                           </InputAdornment>
//                         }
//                         label="Password"
//                       />
//                     </FormControl>
//                     <FormControl fullWidth>
//                     </FormControl>
//                     <Stack direction={"row"} justifyContent="end" gap={"10px"}>
//                       <LoadingButton
//                         onClick={() => {
//                           fnLogin(values);
//                         }}
//                         color="success"
//                         loading={isLoading}
//                         variant="contained"
//                       // type="submit"
//                       >
//                         Ok
//                       </LoadingButton>
//                       <Button
//                         variant="contained"
//                         color={"warning"}
//                         onClick={() => {
//                           {
//                             clear(values);
//                           }
//                           {
//                             resetForm();
//                           }
//                         }}
//                       >
//                         Cancel
//                       </Button>
//                     </Stack>
//                   </Stack>
//                 </Stack>
//               </form>
//             )}
//           </Formik>
//         </Grid>
//       </Box>
//     </div>
//   );
// };

// export default Login;


import { LoadingButton } from "@mui/lab";
import {
  Card,
  Checkbox,
  Grid,
  TextField,
  Button,
  Box,
  Link,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Typography,
  FormControlLabel,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchApidata } from "../../store/reducers/LoginReducer";
import { toast } from "react-hot-toast";
import { fetchComboData1 } from "../../store/reducers/Comboreducer";
// import background from "../../assets/img/Back_Office_Final.png";
// import background from "../../assets/img/UAAM_CoverImage.png";
import background from "../../assets/img/UAAM_Cover1.png";
import * as Yup from "yup";
const FlexBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: "center",
}));

const ContentBox = styled(Box)(({ theme }) => ({
  height: "100%",
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    minHeight: "100vh",
    justifyContent: "center",
  },
}));

const JWTRoot = styled(JustifyBox)(({ theme }) => ({
  minHeight: "90vh",
  "& .card": {
    width: "100%",
    minHeight: "90vh",
    display: "flex",
    // borderRadius: 12,
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      boxShadow: "none",
      borderRadius: 0,
      minHeight: "90vh",
    },
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#f5f9fa",
    borderRadius: "8px",
    "& fieldset": {
      borderColor: "#e0e0e0",
    },
    "&:hover fieldset": {
      borderColor: "#00796b",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00796b",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#666",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#00796b",
  },
}));

const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  backgroundColor: "#f5f9fa",
  borderRadius: "8px",
  "& fieldset": {
    borderColor: "#e0e0e0",
  },
  "&:hover fieldset": {
    borderColor: "#00796b",
  },
  "&.Mui-focused fieldset": {
    borderColor: "#00796b",
  },
}));

const LoginButton = styled(LoadingButton)(({ theme }) => ({
  // backgroundColor: "#00796b",
  background: "#0A4063",
  background: "radial-gradient(circle, rgba(10, 64, 99, 1) 40%, rgba(6, 128, 150, 1) 100%)",
  color: "#ffffff",
  padding: "12px 0",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: 600,
  textTransform: "none",
  // "&:hover": {
  //   backgroundColor: "#00695c",
  // },
  "&:hover": {
    background: "radial-gradient(circle, rgba(10, 64, 99, 1) 40%, rgba(6, 128, 150, 1) 100%)",
  },

  "& .MuiCircularProgress-root": {
    color: "#ffffff",
  },
}));
const Login = () => {
  const navigate = useNavigate();
  const Data = useSelector((state) => state.loginApi.Data);
  const Status = useSelector((state) => state.loginApi.Status);
  const Msg = useSelector((state) => state.loginApi.msg);
  const isLoading = useSelector((state) => state.loginApi.loading);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const CompanyCombo = useSelector((state) => state.comboApi.company);
  const YearCombo = useSelector((state) => state.comboApi.year);

  React.useEffect(() => {
    dispatch(fetchComboData1("TR014", "getall", "-1", "Company"));
    dispatch(fetchComboData1("TR015", "getall", "-1", "Year"));
  }, []);

  const [value, setValues] = React.useState({
    showPassword: false,
  });

  // const handleClickShowPassword = () => {
  //   setValues({
  //     ...value,
  //     showPassword: !value.showPassword,
  //   });
  // };
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const [company, setCompanycombo] = React.useState();
  const [year, setYearcombo] = React.useState();

    const validationSchema = Yup.object().shape({
    username: Yup.string().required("Please enter the Username"),
    password: Yup.string().required("Please enter the Password"),
  });

  const initialValues = {
    username: "",
    password: "",
    company: company,
    year: year,
    remember: false,
  };
  const clear = async (values) => {
    setCompanycombo("");
    setYearcombo("");
  };
  const fnLogin = async (values) => {
    // setLoading(true);

    // if ((values.company == "")||(values.company == undefined)) {
    //   toast.error("Please select company");
    //   setLoading(false);
    //   return;
    // }
    if (values.username == "") {
      toast.error("Username should not be empty");
      setLoading(false);
      return;
    }
    if (values.password == "") {
      toast.error("Password shoud not be empty");
      setLoading(false);
      return;
    }
    // if ((values.year == "")||(values.year == undefined)) {
    //   toast.error("Please select year");
    //   setLoading(false);
    //   return;
    // }
    //  const data = await dispatch(fetchApidata(values.username,values.password,values.company,values.year));
    const idata = {
      username: values.username,
      password: values.password,
      yearrecordid: values.year,
      companyrecordid: values.company,
    };
    const data = await dispatch(
      fetchApidata(
        values.username,
        values.password
        //values.company,values.year
      )
    );
    console.log("🚀 ~ file: Login.jsx:126 ~ Login ~ data:", data);
    var loginrecordID = data.payload.apiResponse.Recordid;
    //  var UserName = data.payload.apiResponse.Name

    sessionStorage.setItem("loginRecid", loginrecordID);

    if (data.payload.Status == "Y") {
      //  var loginrecordID = data.payload.apiResponse.Recordid
      var company = data.payload.apiResponse.Company;
      var year = data.payload.apiResponse.Year;
      var YearFlag = data.payload.apiResponse.YearFlag;
      var CompanyRecordid = data.payload.apiResponse.CompanyRecordid;
      var stockflag = data.payload.apiResponse.Process;
      var Cifbysea = data.payload.apiResponse.Cifbysea;
      var Cifbyair = data.payload.apiResponse.Cifbyair;
      var Fob = data.payload.apiResponse.Fob;
      var Overhead = data.payload.apiResponse.Overhead;
      var YearRecorid = data.payload.apiResponse.YearRecorid;
      var Groupaccess = data.payload.apiResponse.Groupaccess;
      var UserName = data.payload.apiResponse.Name;
      var labourCharge = data.payload.apiResponse.Labourcharges;

      var Modules = data.payload.apiResponse.Modules;

      sessionStorage.setItem("loginRecid", loginrecordID);
      sessionStorage.setItem("UserName", UserName);
      sessionStorage.setItem("labourCharge", labourCharge);
      sessionStorage.setItem("company", company);
      sessionStorage.setItem("year", year);
      sessionStorage.setItem("YearFlag", YearFlag);
      sessionStorage.setItem("compID", CompanyRecordid);
      sessionStorage.setItem("stockflag", stockflag);
      sessionStorage.setItem("currentPage", 0);
      sessionStorage.setItem("secondaryCurrentPage", 0);
      sessionStorage.setItem("Cifbysea", Cifbysea);
      sessionStorage.setItem("Cifbyair", Cifbyair);
      sessionStorage.setItem("Fob", Fob);
      sessionStorage.setItem("Overhead", Overhead);
      sessionStorage.setItem("YearRecorid", YearRecorid);
      sessionStorage.setItem("Groupaccess", JSON.stringify(Groupaccess));
      sessionStorage.setItem("Modules", JSON.stringify(Modules));
      //navigate("/Apps/TR014/Company");
      navigate("/Apps/AAM");
    } else {
      setLoading(false);
      toast.error(data.payload.message);
    }
  };
  return (
    <JWTRoot>
      <Card
        className="card"
        sx={{
          width: "100%",
          boxShadow: { xs: "none", sm: 3 },
          borderRadius: { xs: 0, sm: 0 },

          // ✅ Add this
          backgroundImage: {
            xs: `url(${background})`,
            sm: "none",
          },
          backgroundSize: {
            xs: "cover",
            sm: "unset",
          },
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Grid container sx={{
          height: "100vh",
        }}>

          <Grid item sm={7} xs={12}>

            <ContentBox
              sx={{
                mx: "auto",
                width: "100%",
                // maxWidth: { xs: "100%", sm: 500 },
                // px: { xs: 3, sm: 8 },
                // py: { xs: 4, sm: 8 },
                maxWidth: { xs: "95%", sm: 420 },
                // px: { xs: 2, sm: 6 },
                // py: { xs: 4, sm: 6 },
                 paddingRight: { xs: 2, sm: 6 },
                paddingLeft: { xs: 1, sm: 6 },
                paddingTop: { xs: 0, sm: 0 },
                paddingBottom: { xs: 0, sm: 0 },
                backgroundColor: "#ffffff",
                // ✅ Transparent on xs so background shows
                backgroundColor: {
                  xs: "rgba(255,255,255,0.85)",
                  sm: "#ffffff",
                },
                backdropFilter: {
                  xs: "blur(15px)",
                  sm: "none",
                },
              }}
            >

              {/* Header */}
              <Box mb={3}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: "20px", sm: "30px" },
                    fontWeight: 600,
                    // mb: 0.5,

                    // background: "linear-gradient(180deg, rgba(10,64,99,1) 53%, rgba(6,128,150,1) 100%)",
                    background: "linear-gradient(180deg,rgba(10, 64, 99, 1) 37%, rgba(6, 128, 150, 1) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                    textAlign: "center"
                  }}
                >
                  Login to your Account
                </Typography>
              </Box>
              <Formik
                // onSubmit={handleFormSubmit}
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={(values, setSubmitting) => {
                  setTimeout(() => {
                    fnLogin(values);
                  }, 100);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  resetForm,
                }) => (
                  <form onSubmit={handleSubmit}>

                    <Stack
                      spacing={2}
                    >

                      <StyledTextField
                        // margin="normal"
                        // focused
                        name="username"
                        label="Username"
                        id="username"
                        placeholder="Username"
                        value={values.username}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        fullWidth
                        // required
                        error={!!touched.username && !!errors.username}
                        helperText={touched.username && errors.username}
                         InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Box sx={{ color: "#999", fontSize: "20px" }}>#</Box>
                            </InputAdornment>
                          ),
                        }}
                      />


                      <StyledTextField
                        id="password"
                        // type={value.showPassword ? "text" : "password"}
                        type={showPassword ? "text" : "password"}
                        value={values.password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        //  placeholder='Enter password'
                        error={!!touched.password && !!errors.password}
                        helperText={touched.password && errors.password}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Box sx={{ color: "#999", fontSize: "17px" }}>🔒</Box>
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleClickShowPassword} edge="end">
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                              </IconButton>
                            </InputAdornment>
                          ),
                           sx: {
                            paddingRight: "14px",
                            paddingLeft: "7px",
                          },
                        }}
                        label="Password"
                      />

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          // mt: 1,
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="remember"
                              checked={values.remember}
                              onChange={handleChange}
                              sx={{
                                color: "#00796b",
                                "&.Mui-checked": {
                                  color: "#00796b",
                                },
                              }}
                            />
                          }
                          label={
                            <Typography sx={{ color: "#666", fontSize: "14px" }}>
                              Remember me
                            </Typography>
                          }
                        />
                        {/* <Link
                          onClick={() => navigate("/Forgotpassword")}
                          sx={{
                            // color: "#00796b",
                            color: "#608dcb",
                            fontSize: "14px",
                            cursor: "pointer",
                            textDecoration: "none",
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          }}
                        >
                          Forget Password?
                        </Link> */}
                      </Box>
                      <LoginButton
                        type="submit"
                        loading={isLoading}
                        variant="contained"
                        fullWidth
                        sx={{ mt: 3 }}
                      >
                        Login
                      </LoginButton>
                    </Stack>
                  </form>
                )}
              </Formik>

            </ContentBox>
          </Grid>

           {/* Right Side: Image */}
          <Grid
            item
            sm={5}
            xs={false}
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center", // CHANGED: Added to center vertically
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                backgroundImage: `url(${background})`,
                // backgroundSize: "cover",
                backgroundSize: "contain",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                // height: "100%",
                height: "98vh",
                minHeight: "100vh",
                width: "100%",
              }}

            />
          </Grid>
        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default Login;
