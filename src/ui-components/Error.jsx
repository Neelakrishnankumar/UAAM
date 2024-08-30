import { Box, Button, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BadRequest from "../assets/icon/400error.svg"

const FlexBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const JustifyBox = styled(FlexBox)(() => ({
  maxWidth: 250,
  flexDirection: 'column',
  justifyContent: 'center',
}));

const IMG = styled('img')(() => ({
  width: '100%',
  marginBottom: '32px',
}));

const NotFoundRoot = styled(FlexBox)(() => ({
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  height: '50vh !important',
}));

const GetError = (Data) => {

  const navigate = useNavigate();

  return (
    <NotFoundRoot>
      <JustifyBox>
        <IMG src={BadRequest} alt="" />
        {/* <IMG  >Inprogress</IMG> */}
{/* <Typography variant='h1' color='red'>ERROR</Typography> */}

        <Button
          color="primary"
          variant="contained"
          sx={{ textTransform: 'capitalize',marginTop:10 }}
          onClick={() => navigate(-1)}
          
        >
          Go Back
        </Button>
      </JustifyBox>
    </NotFoundRoot>
  );
};

export default GetError;
