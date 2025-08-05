import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Box,
  Paper,
  Breadcrumbs,
  Typography,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  Tooltip,
  Checkbox,
  LinearProgress,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Formik, Field } from "formik";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApidata,
  getFetchData,
  postApidata,
  postData,
} from "../../../store/reducers/Formapireducer";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Popup from "../popup";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Listviewpopup from "../Lookup";
import { UserSchema } from "../../Security/validation";
import { formGap } from "../../../ui-components/utils";
import store from "../../..";
import { SingleFormikOptimizedAutocomplete } from "../../../ui-components/global/Autocomplete";
const Edituser = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const accessID = params.accessID;
  const recID = params.id;
  const mode = params.Mode;
  const location = useLocation();
  const rowData = location.state || {};
  console.log(rowData, "--rowData");

  const companyRecID = params.companyRecID;
  // const logincompanyRecID = sessionStorage.getItem("compID");
  // const YearRecorid = sessionStorage.getItem("YearRecorid");
  const data = useSelector((state) => state.formApi.Data);
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const [loading, setLoading] = useState(false);
  const { toggleSidebar, broken, rtl } = useProSidebar();
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  const initialValue = {
    code: data.Code,
    name: data.Name1,
    password: data.Password,
    comfirmpassword: data.Password,
    email: data.Email,
    comments: data.Comm1,
    disable: data.Disable == "Y" ? true : false,
    sortorder: data.Sortorder,
    usergroup: data.GrpID ? { RecordID: data.GrpID, Code: data.GroupCode, Name: data.GroupName } : null

  };
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const fnSave = async (values) => {
    var action = mode === "A" ? "insert" : "update";
    if (values.password != values.comfirmpassword) {
      toast.error("The confirm password confirmation does not match");
      return;
    }
    var isCheck = "N";
    if (values.disable == true) {
      isCheck = "Y";
    }
    const idata = {
      RecordID: recID,
      GrpID: values.usergroup.RecordID || 0,
      GroupCode: values.usergroup.Code || '',
      GroupName: values.usergroup.Name || '',
      // GrpID: selectUGLookupData.UGlookupRecordid,
      Code: values.code,
      Name1: values.name,
      Password: values.password,
      Email: values.email,
      Comm1: values.comments,
      Disable: values.checkbox == true ? "Y" : "N",
      Sortorder: values.sortorder,

      // YearID: YearRecorid,
      // Company: logincompanyRecID,
      //YearID:Finyear,
      SubscriptionID: params.parentID,
      Company: companyRecID,
    };
    const data = await dispatch(postData({ accessID, action, idata }));
    // return
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      // setIni(true)
      setLoading(false);
      navigate(-1);
    } else {
      toast.error(data.payload.Message);

      setLoading(false);
    }
  };
  const [isPopupData, setisPopupdata] = React.useState(false);
  const [selectUGLookupData, setselectUGLookupData] = React.useState({
    UGlookupRecordid: "",
    UGlookupCode: "",
    UGlookupDesc: "",
  });
  if (isPopupData == false) {
    selectUGLookupData.UGlookupRecordid = data.GrpID;
    selectUGLookupData.UGlookupCode = data.GroupCode;
    selectUGLookupData.UGlookupDesc = data.GroupName;
  }
  const [openUGPopup, setOpenUGPopup] = useState(false);
  function handleShow(type) {
    if (type == "UG") {
      setOpenUGPopup(true);
    }
  }
  //************************** Lookup value assign type based Function *****************/
  const childToParent = (childdata, type) => {
    console.log("type---" + type);
    console.log("Data---" + JSON.stringify(childdata));
    if (type == "UserGroup") {
      setisPopupdata(true);
      setselectUGLookupData({
        UGlookupRecordid: childdata.RecordID,
        UGlookupCode: childdata.Code,
        UGlookupDesc: childdata.Name,
      });
      setOpenUGPopup(false);
    }
  };
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
          navigate(-1);
        }
      } else {
        return;
      }
    });
  };
  return (
    <React.Fragment>
      {/* {getLoading ? <LinearProgress /> : false} */}
      <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box display="flex" borderRadius="3px" alignItems="center">
            {broken && !rtl && (
              <IconButton onClick={() => toggleSidebar()}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
            <Box
              display={isNonMobile ? "flex" : "none"}
              borderRadius="3px"
              alignItems="center"
            >
              <Breadcrumbs
                maxItems={3}
                aria-label="breadcrumb"
                separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
              >
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    navigate("/Apps/TR014/Company", { state: rowData });
                  }}
                >
                  {`Companies(${rowData.CompanyName})`}
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    navigate(`/Apps/Secondarylistview/TR238/subscription/${companyRecID}`, { state: rowData });
                  }}
                >
                  {`Subscriptions(${rowData.SubsName})`}
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  {mode === "E" ? `Users(${rowData.Users})` : "Users(New)"}

                  {/* {`Users(${rowData.Users})`} */}
                </Typography>
              </Breadcrumbs>
            </Box>
          </Box>
          <Box display="flex">
            <Tooltip title="Close">
              <IconButton onClick={() => fnLogOut("Close")} color="error">
                <ResetTvIcon />
              </IconButton>
            </Tooltip>
            <IconButton>
              <LogoutOutlinedIcon color="error" />
            </IconButton>
          </Box>
        </Box>
      </Paper>
      {/* {!getLoading ? ( */}
      <Paper elevation={3} sx={{ margin: "10px" }}>
        {/* <Box m="20px"> */}
        <Formik
          initialValues={initialValue}
          onSubmit={(values, { resetForm }) => {
            setTimeout(() => {
              fnSave(values, resetForm);
            }, 100);
          }}
          validationSchema={UserSchema}
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
            setFieldTouched,
            setFieldValue
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gridTemplateColumns="repeat(4 , minMax(0,1fr))"
                gap={formGap}
                padding={1}
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                <TextField
                  name="code"
                  type="text"
                  id="code"
                  label="Code"
                  placeholder="Auto"
                  variant="standard"
                  focused
                  sx={{ gridColumn: "span 2" }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.code}
                  error={!!touched.code && !!errors.code}
                  helperText={touched.code && errors.code}
                  InputProps={{ readOnly: true }}
                // autoFocus
                />
                <TextField
                  required
                  name="name"
                  type="text"
                  id="name"
                  label="Name"
                  variant="standard"
                  focused
                  sx={{ gridColumn: "span 2" }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  autoFocus
                />
                <FormControl sx={{ gridColumn: "span 2", display: "flex" }}>
                  <FormControl
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <SingleFormikOptimizedAutocomplete
                      label="User Group"
                      id="usergroup"
                      name="usergroup"
                      value={values.usergroup}
                     
                      onChange={(newValue) => {
                        setFieldValue("usergroup", newValue)
                      }}
                      
                      url={`${store.getState().globalurl.listViewurl}?data={"Query":{"AccessID":"2039","ScreenName":"UserGroup","Filter":"CompanyID='${companyRecID}'","Any":"","CompId":"4"}}`}
                    />
                    {/* <TextField
                        id="outlined-basic"
                        label="ID"
                        variant="standard"
                        value={selectUGLookupData.UGRecordID}
                        focused
                        sx={{ display: "none" }}
                      />
                      <TextField
                        id="outlined-basic"
                        label="User Group"
                        variant="standard"
                        value={selectUGLookupData.UGlookupCode}
                        focused
                        required
                        inputProps={{ tabIndex: "-1" }}
                      />
                      <IconButton
                        sx={{ height: 40, width: 40 }}
                        onClick={() => handleShow("UG")}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>
                      {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> 

                      <TextField
                        id="outlined-basic"
                       
                        variant="standard"
                        value={selectUGLookupData.UGlookupDesc}
                        fullWidth
                        inputProps={{ tabIndex: "-1" }}
                        focused
                      /> */}
                  </FormControl>
                </FormControl>
                <TextField
                  name="password"
                  type="password"
                  id="password"
                  label="Password"
                  variant="standard"
                  focused
                  required
                  sx={{ gridColumn: "span 2" }}
                  onFocus={() => setFieldTouched("password", true)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  error={touched.password && !!errors.password} // Show error only if touched
                  helperText={touched.password ? errors.password : ""} // Show text only when touched
                  inputProps={{ maxLength: 8 }}
                />

                <TextField
                  name="comfirmpassword"
                  type="password"
                  id="comfirmpassword"
                  label="Confirm Password"
                  variant="standard"
                  focused
                  required
                  sx={{ gridColumn: "span 2" }}
                  onFocus={() => setFieldTouched("comfirmpassword", true)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.comfirmpassword}
                  error={touched.comfirmpassword && !!errors.comfirmpassword} // Show error only if touched
                  helperText={
                    touched.comfirmpassword ? errors.comfirmpassword : ""
                  } // Show text only when touched
                  inputProps={{ maxLength: 8 }}
                />

                <TextField
                  name="email"
                  type="text"
                  id="email"
                  label="Email"
                  variant="standard"
                  focused
                  sx={{ gridColumn: "span 2" }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                // autoFocus
                />
                <TextField
                  name="comments"
                  type="text"
                  id="comments"
                  label="Comments"
                  variant="standard"
                  focused
                  sx={{ gridColumn: "span 2" }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.comments}
                  error={!!touched.comments && !!errors.comments}
                  helperText={touched.comments && errors.comments}
                // autoFocus
                />
                <TextField
                  name="sortorder"
                  type="number"
                  id="sortorder"
                  label="Sort Order"
                  variant="standard"
                  focused
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.sortorder}
                  error={!!touched.sortorder && !!errors.sortorder}
                  helperText={touched.sortorder && errors.sortorder}
                  // autoFocus
                  sx={{ gridColumn: "span 2", background: "" }}
                  onWheel={(e) => e.target.blur()}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "right" },
                    },
                  }}
                />
                <Box>
                  <Field
                    //  size="small"
                    type="checkbox"
                    name="disable"
                    id="disable"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    as={Checkbox}
                    label="Disable"
                  />

                  <FormLabel focused={false}>Disable</FormLabel>
                </Box>
              </Box>
              <Box
                display="flex"
                padding={1}
                justifyContent="end"
                mt="20px"
                gap="20px"
              >
                <Button variant="contained" color="secondary" type="submit">
                  SAVE
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  CANCEL
                </Button>
              </Box>
            </form>
          )}
        </Formik>
        <Popup
          title="UserGroup"
          openPopup={openUGPopup}
          setOpenPopup={setOpenUGPopup}
        >
          <Listviewpopup
            accessID="2039"
            screenName="UserGroup"
            childToParent={childToParent}
            filterName={"CompanyID"}
            filterValue={companyRecID}
          />
        </Popup>
        {/* </Box> */}
      </Paper>
      {/* ) : (
        false
      )} */}
    </React.Fragment>
  );
};

export default Edituser;
