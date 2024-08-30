import { Typography, Box, useTheme, Grid, Button } from "@mui/material";
import { tokens } from "../Theme";
import { useNavigate } from "react-router-dom";
const Header = ({ title, btnName,to,secondbtnName }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  return (
    <Box mb="30px">
      <Grid container  >
        <Grid item xs={8} sm={11} md={11}>
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0", }}
      >
        {title}
      </Typography>
      </Grid >
      <Grid item xs={3} sm={1} md={1}>
      
      {/* <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography> */}
     {btnName==undefined? false :<Button variant="contained" color="secondary"  onClick={()=>navigate(to)}>{btnName}</Button>}
     {secondbtnName==undefined? false :<Button variant="contained" color="secondary"  onClick={()=>navigate(to)}>{secondbtnName}</Button>}
      </Grid>
      </Grid>
    </Box>
  );
};

export default Header;