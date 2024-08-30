import { Box,  Checkbox,  useTheme, Stack, TextField, FormControl, Popover,IconButton, FormControlLabel, FormLabel, Button, Typography, InputBase, Avatar } from "@mui/material";
import React from 'react'
import { tokens } from "../../Theme";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import Header from "../../ui-components/Header";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import Footer from "../../ui-components/Footer";
import ChGPassWord from '../../assets/img/ChGPassWord.png'
import { useNavigate } from "react-router-dom";


const Changepassword = () => {
  const theme  = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="Change Password" subtitle="" />
      <Box
        m="40px 0 0 0"
        height="69vh"
        >
   <Stack
      component="form"
      sx={{
        width: {sm:'100%',md:'100%',lg:'100%'},
        
      }}
      mt={'100px'}
      spacing={3}
      noValidate
      autoComplete="off"
      direction={'row'}
    >

        <Stack  
       
        sx={{
        width: {sm:'100%',md:'100%',lg:'100%'},
        
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center'
    }}
    >
    <Avatar variant="square" src={ChGPassWord} sx={{display:{xs:'none',sm:'none',md:'block',lg:"block"},width:'300px',height:'300px'}} />
        </Stack>
        <Stack
         sx={{
            width: {sm:'100%',md:'100%',lg:'100%'},
          }}
          spacing={2}
          >
        <FormControl >
      <FormLabel>Current Password</FormLabel>
      <TextField
        hiddenLabel
        id=""
        placeholder="Enter Current Password "
        variant="filled"
       
      />
      </FormControl>
      <FormControl>
      <FormLabel>New Password</FormLabel>
      <TextField
        hiddenLabel
        id=""
        placeholder="Enter New Password"
        variant="filled"
      />
      </FormControl>
      
      <FormControl>
      <FormLabel>Confirm Password</FormLabel>
      <TextField
        hiddenLabel
        id=""
        placeholder="Enter Confirm Password "
        variant="filled"
      />
      </FormControl>
      <Button variant="contained" color={"success"} >Save</Button>

      <Button variant="contained" color={"error"} onClick={()=>navigate('/Apps/TR002/Product%20Category')}>Cancel</Button>
        </Stack>
       


    </Stack>
 
       

      
      </Box>
      
      {/* <Footer/> */}

     
    </Box>
    
  );
};

export default Changepassword;