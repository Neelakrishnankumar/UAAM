import React from "react";
import {
  TextField,
  Box,
  Typography,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  Select,
  InputLabel,
  MenuItem,
  LinearProgress,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Formik, Field } from "formik";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApidata,
  getFetchData,
  postApidata,
  postData,
} from "../../../store/reducers/Formapireducer";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { OverheadSchema } from "../../Security/validation";
const Editoverhead = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const accessID = params.accessID;
  const recID = params.id;
  const mode = params.Mode;
  const location = useLocation();
  const navigate = useNavigate();
  const data = useSelector((state) => state.formApi.Data);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const [loading, setLoading] = useState(false);
  const { toggleSidebar, broken, rtl } = useProSidebar();
  // console.log("🚀 ~ file: Editoverhead.jsx:20 ~ Editoverhead ~ data:", data);
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  // const YearRecorid = sessionStorage.getItem("YearRecorid");
  // const CompanyID = sessionStorage.getItem("compID");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const initialValue = {
    code: data.Code,
    name: data.Name,
    frequency: data.Frequency,
    productCost: data.Productcost,
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const fnSave = async (values) => {
    let action = mode === "A" ? "insert" : "update";
    setLoading(true);

    const idata = {
      RecordID: recID,
      Code: values.code,
      Name: values.name,
      Frequency: values.frequency,
      Productcost: values.productCost,
      Finyear,
      CompanyID,
    };

    // console.log("🚀 ~ file: Editoverhead.jsx:57 ~ fnSave ~ saveData:", saveData)

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      // setIni(true)
      setLoading(false);
      navigate(`/Apps/TR085/Over Head`);
    } else {
      toast.error(response.payload.Msg);
      setLoading(false);
    }
  };
  const style = {
    height: "55px",
    border: "2px solid #1769aa ",
    borderRadius: "6px",
    backgroundColor: "#EDEDED",
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
          navigate("/Apps/TR085/Over Head");
        }
      } else {
        return;
      }
    });
  };
  return (
    <React.Fragment>
      {getLoading ? <LinearProgress /> : false}
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box display="flex" borderRadius="3px" alignItems="center">
          {broken && !rtl && (
            <IconButton onClick={() => toggleSidebar()}>
              <MenuOutlinedIcon />
            </IconButton>
          )}
          <Typography variant="h3">Over Head</Typography>
        </Box>
        <Box display="flex">
          <IconButton color="error" onClick={() => fnLogOut("Close")}>
            <ResetTvIcon />
          </IconButton>
          <IconButton>
            <LogoutOutlinedIcon
              color="error"
              onClick={() => fnLogOut("Logout")}
            />
          </IconButton>
        </Box>
      </Box>

      {!getLoading ? (
        <Box m="20px">
          <Formik
            initialValues={initialValue}
            onSubmit={(values, { resetForm }) => {
              setTimeout(() => {
                fnSave(values);
              }, 100);
            }}
            validationSchema={OverheadSchema}
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
                      name="code"
                      type="text"
                      id="code"
                      label="Code"
                      variant="filled"
                      focused
                      value={values.code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.code && !!errors.code}
                      helperText={touched.code && errors.code}
                      autoFocus
                    />
                    <TextField
                      name="name"
                      type="text"
                      id="name"
                      label="Name"
                      variant="filled"
                      focused
                      value={values.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                      autoFocus
                    />
                    <FormControl
                      focused
                      variant="filled"
                      sx={{ gridColumn: "span 2" }}
                    >
                      <InputLabel id="frequency">Frequency</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="frequency"
                        name="frequency"
                        value={values.frequency}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      >
                        <MenuItem>Select</MenuItem>
                        <MenuItem value="D">Daily</MenuItem>
                        <MenuItem value="W">Weekly</MenuItem>
                        <MenuItem value="M">Monthly</MenuItem>
                        <MenuItem value="Y">Yearly</MenuItem>
                        <MenuItem value="B">By Monthly</MenuItem>
                        <MenuItem value="S">Six Month</MenuItem>
                        <MenuItem value="Q">Quarterly</MenuItem>
                        <MenuItem value="F">Fortnightly</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl
                      focused
                      variant="filled"
                      sx={{ gridColumn: "span 2" }}
                    >
                      <InputLabel id="productCost">Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="productCost"
                        name="productCost"
                        value={values.productCost}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      >
                        <MenuItem value="P">Cost Of Product</MenuItem>
                        <MenuItem value="E">Cost Of Employee</MenuItem>
                        <MenuItem value="M">Cost Of Material</MenuItem>
                        <MenuItem value="F">Cost Of Fixed Assets</MenuItem>
                      </Select>
                    </FormControl>
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                  <LoadingButton
                    variant="contained"
                    color="secondary"
                    type="submit"
                    loading={loading}
                  >
                    SAVE
                  </LoadingButton>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      navigate("/Apps/TR085/Over Head");
                    }}
                  >
                    CANCEL
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      ) : (
        false
      )}
    </React.Fragment>
  );
};

export default Editoverhead;
