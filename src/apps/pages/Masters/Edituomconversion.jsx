import {
  Typography,
  Box,
  Button,
  TextField,
  Stack,
  IconButton,
  Avatar,
  Menu,
  FormControl,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormGroup,
  RadioGroup,
  Radio,
} from "@mui/material";
import { Formik, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../index";
import {
  fetchApidata,
  postApidata,
} from "../../../store/reducers/Formapireducer";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import basicSchema from "../../Security/validation";
import wallet from "../../../assets/img/wallet.jpg";
import Topbar from "../../../ui-components/global/Topbar";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const Edituomconversion = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const navigate = useNavigate();
  let params = useParams();

  const initialValues = {
    Hidevisible: "",
    Desc: "",
    Code: "",
    Mgroup: "",

    SortOrder: "",
    checkbox: "",
  };

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between" p={2}>
        {/* SEARCH BAR */}
        <Box
          display="flex"
          // backgroundColor={colors.primary[400]}
          borderRadius="3px"
          alignItems={"center"}
        >
          {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton> */}
          <Typography variant="h3">Bank Master</Typography>
        </Box>

        {/* ICONS */}

        <Box display="flex">
          {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton> */}
          <IconButton onClick={() => navigate("/")} color="error">
            <LogoutOutlinedIcon />
          </IconButton>
          {/* <IconButton onClick={handleMenu}>
            <SettingsOutlinedIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            
            <MenuItem onClick={() => navigate("./changepassword")}>
              Change Password
            </MenuItem>
            <MenuItem onClick={() => navigate("/")}>Logout</MenuItem>
          </Menu> */}
        </Box>
      </Box>
      <Box m="20px">
        <Formik
          // onSubmit={handleFormSubmit}
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={basicSchema}
        >
          {({ values, errors, touched, handleBlur, handleChange }) => (
            <form>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    //  value={values.Code}
                    id="Description"
                    name="Description"
                    // error={!!touched.Code && !!errors.Code}
                    // helperText={touched.Code && errors.Code}

                    focused
                    required
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Type"
                    // value={values.Desc}
                    id="Type"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    select
                    name="Type"
                    // error={!!touched.Desc && !!errors.Desc}
                    // helperText={touched.Desc && errors.Desc}
                    sx={{ gridColumn: "span 2" }}
                    focused
                    required
                    inputProps={{ maxLength: 50 }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="Number"
                    label="Sort Order"
                    // value={values.Desc}
                    id="SortOrder"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="SortOrder"
                    // error={!!touched.Desc && !!errors.Desc}
                    // helperText={touched.Desc && errors.Desc}
                    sx={{ gridColumn: "span 2" }}
                    focused
                    onWheel={(e) => e.target.blur()} 

                    // inputProps={{ maxLength: 50}}
                  />
                  <FormControl>
                    <Field
                      type="checkbox"
                      name="checkbox"
                      id="checkbox"
                      as={FormControlLabel}
                      control={<Checkbox checked={false} />}
                      label="Disable"
                    />
                  </FormControl>
                </FormControl>
                {/*      
    <FormControl sx={{ gridColumn: "span 2" }}>
     <Stack  
       
       sx={{
    //    width: {sm:'100%',md:'100%',lg:'100%'},
       gridColumn: "span 2",
       alignContent:'center',
       justifyContent:'center',
       alignItems:'center',
       position:'relative',
       right:'0px'
       
   }}
   >
   <Avatar variant="rounded" src={userimg} sx={{width:'200px',height:'150px'}} />
   
       </Stack>
     </FormControl> */}
              </Box>
              <Box display="flex" justifyContent="end" mt="20px" gap={2}>
                <Button color="secondary" variant="contained">
                  Save
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => {
                    navigate(`/Apps/TR022/UOM`);
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </React.Fragment>
  );
};

export default Edituomconversion;
