import { Box, IconButton, Typography, useTheme,Menu ,MenuItem,InputBase} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../Theme";
// import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import React from 'react';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaFileExcel } from 'react-icons/fa';
import { useParams } from "react-router-dom";
import { TbReport } from "react-icons/tb";



const Topbar = ({Tittle}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  

  let screen = ""
  let to =""
 
   if (window.location.pathname == '/Apps/TR001/Product%20Master'){
     screen += ' List of Products'
     to+='/Apps/TR001/Product%20Master/EditProduct%20Master/-1/A'
   }
   else if(window.location.pathname == '/Apps/TR002/Product%20Category'){
    screen += 'Product Categories'
    to+='/Apps/TR002/Product%20Category/EditProduct%20Category/-1/A'
   }
   else if(window.location.pathname == '/Apps/TR003/Material%20Category'){
    screen += 'Material Categories'
    to+='/Apps/TR003/Material%20Category/EditMaterial%20Category/-1/A'
   }
   else if(window.location.pathname == '/Apps/TR011/Proforma%20Invoice'){
    screen += 'Proforma Invoice'
    to+='/Apps/TR011/Proforma%20Invoice/EditProforma%20Invoice'
   }
   else if(window.location.pathname == '/Apps/Proforma%20Invoice/Editproforma'){
    screen += 'Proforma Invoice'
   }
   else if(window.location.pathname == '/Apps/TR004/Material%20List'){
    screen += 'List of Materials'
    to+='/Apps/TR004/Material%20List/EditMaterial list/-1/A'
   }
   else if(window.location.pathname == '/Apps/TR010/Customer'){
    screen += 'Customer '
    to+='/Apps/TR010/Customer%20Master/EditCustomer/-1/A'
   }
   else if(window.location.pathname == '/Apps/TR009/Supplier'){
    screen += 'Supplier'
    to+='/Apps/TR009/Supply%20Master/EditSupplier/-1/A'
   }
   else if(window.location.pathname == '/Apps/TR016/BOM'){
    screen += 'BOM'
    to+='/Apps/TR016/BOM/EditBOM/-1/A'
   }

  

 
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);}

  return (
    <Box display="flex" justifyContent="space-between" p={2} >
      {/* SEARCH BAR */}
      <Box
        display="flex"
        // backgroundColor={colors.primary[400]}
        borderRadius="3px"
       
        alignItems={'center'}
      >
        {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton> */}
     <Typography variant="h3">{screen}</Typography>
      </Box>

      {/* ICONS */}

      <Box display="flex">
        {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton> */}
          {screen == undefined? false :
      <Link >   
         <IconButton color="error">
          <TbReport/>
        </IconButton></Link>}
      {screen == undefined? false :
      <Link >   
         <IconButton color="success">
          <FaFileExcel/>
        </IconButton></Link>}
     
      <Link to={to}>   
         <IconButton>
          <AddOutlinedIcon/>
        </IconButton></Link>
      {/* {screen == undefined ? <Link to={to}>   
         <IconButton>
          <PrintOutlinedIcon/>
        </IconButton></Link>
      <Link to={to}>   
         <IconButton>
          <AddOutlinedIcon/>
        </IconButton></Link>: false} */}

        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon/>
          ) : (
            <LightModeOutlinedIcon/>
          )}
        </IconButton>
     
      
     
        <IconButton  onClick={handleMenu}>
          <SettingsOutlinedIcon/>
        </IconButton> 
        <Menu  anchorEl={anchorEl} keepMounted
              // anchorOrigin={{
              //   vertical: 'bottom',
              //   horizontal: 'right',
              // }}
              // transformOrigin={{
              //   vertical: 'bottom',
              //   horizontal: 'right',
              // }}
              open={Boolean(anchorEl)}
              onClose={handleClose}>
                {/* <MenuItem onClick={()=>navigate('./MyProfile')} >Profile</MenuItem> */}
                <MenuItem onClick={()=>navigate('/Apps/changepassword')} >Change Password</MenuItem>
                <MenuItem onClick={()=>navigate('/')}>Logout</MenuItem>
              </Menu>
        {/* <IconButton>
          <PersonOutlinedIcon />
        </IconButton> */}
      </Box>
    </Box>
  );
};

export default Topbar;