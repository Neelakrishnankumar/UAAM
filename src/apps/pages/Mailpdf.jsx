import {
    Box,
    Button,
    Card,
    Drawer,
    Icon,
    IconButton,
    Link,
    styled,
    ThemeProvider,
    Tooltip,
    useTheme,
    Badge,
    TextField,
    Chip
  } from '@mui/material';
  import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mailOpen, sendMail } from '../../store/reducers/Listviewapireducer';
import EmailIcon from '@mui/icons-material/Email';
import { Formik } from 'formik';
import AttachEmailTwoToneIcon from '@mui/icons-material/AttachEmailTwoTone';
import { LoadingButton } from '@mui/lab';
import store from '../..';
const StyledBox = styled(Box)(({ theme, textTransformStyle, ellipsis }) => ({
    textTransform: textTransformStyle || 'none',
    whiteSpace: ellipsis ? 'nowrap' : 'normal',
    overflow: ellipsis ? 'hidden' : '',
    textOverflow: ellipsis ? 'ellipsis' : '',
  }));

  const H5 = ({ children, className, ellipsis, textTransform, ...props }) => {
  return (
    <StyledBox
      texttransformstyle={textTransform}
      ellipsis={ellipsis}
      component="h5"
      mb={0}
      mt={0}
      fontSize="14px"
      fontWeight="500"
      lineHeight="1.5"
      {...props}
    >
      {children}
    </StyledBox>
  );
};
  const BadgeSelected = styled(Badge)(() => ({
    top: '0',
    right: '0',
    height: '32px',
    width: '32px',
    borderRadius: '50%',
  }));
  
  const MaxCustomaizer = styled('div')(({ theme }) => ({
    top: 0,
    right: 0,
    zIndex: 50,
    width: 320,
    display: 'flex',
    height: '100vh',
    position: 'fixed',
    paddingBottom: '32px',
    flexDirection: 'column',
    boxShadow: '0px 7px 8px -4px rgba(0, 0, 0, 0.06),0px 12px 17px 2px rgba(0, 0, 0, 0.042),0px 5px 22px 4px rgba(0, 0, 0, 0.036)',
    background: theme.palette.background.default,
    '& .helpText': { margin: '0px .5rem 1rem' },
  }));
  

  const Controller = styled('div')(() => ({
    minHeight: 58,
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
    padding: '14px 20px',
    // boxShadow: themeShadows[6],
    justifyContent: 'space-between',
  }));
  
  const IMG = styled('img')(() => ({ width: '100%' }));
  

  const MatxCustomizer = ({open, screenName,rowData,type}) => {
    // const [open, setOpen] = useState(true);
    const [tabIndex, setTabIndex] = useState(0);

    const dispatch = useDispatch()
  
    const tooglePanel = () => dispatch(mailOpen({}));
  
    const handleTabChange = (index) => setTabIndex(index);
    const mailGetData = useSelector((state) => state.listviewApi.mailGetData);
    console.log("🚀 ~ file: Mailpdf.jsx:96 ~ MatxCustomizer ~ mailGetData:", mailGetData)

    const initialValue = {
      emailTO:mailGetData.To,
      emailCC:mailGetData.CC,
      subject:mailGetData.Subject,
      message:mailGetData.Message,

    }
    const onButtonClick = () => { 
      // using Java Script method to get PDF file 
      fetch('http://skillglow.beyondexs.com/trinity/tcpdf/report.php?compID=3&ipRecID=624').then(response => { 
          response.blob().then(blob => { 
              // Creating new object of PDF file 
              const fileURL = window.URL.createObjectURL(blob); 
              // Setting various property values 
              let alink = document.createElement('a'); 
              alink.href = fileURL; 
              alink.download = 'SamplePDF.pdf'; 
              alink.click(); 
          }) 
      }) 
  } 
  
    return (
      <Fragment>
       
  
          <Drawer
            open={open}
            anchor="right"
            variant="temporary"
            onClose={tooglePanel}
            ModalProps={{ keepMounted: true }}
          >
            <MaxCustomaizer>
              <Controller>
                <Box display="flex">
                  <EmailIcon className="icon" color="primary"/>
                    
                  <H5 sx={{ ml: 1, fontSize: '1rem' }}>{screenName}</H5>
                </Box>
  
                <IconButton onClick={tooglePanel}>
                  <Icon className="icon">close</Icon>
                </IconButton>
              </Controller>
  
              {/* <Box px={3} mb={2} display="flex">
                <Button
                  variant="outlined"
                  onClick={() => handleTabChange(0)}
                  color={tabIndex === 0 ? 'secondary' : 'primary'}
                  sx={{ mr: 2 }}
                >
                  Demos
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleTabChange(1)}
                  color={tabIndex === 1 ? 'secondary' : 'primary'}
                >
                  Settings
                </Button>
              </Box> */}
  
              
                {tabIndex === 0 && (
                  <Box sx={{ mb: 4, mx: 3 }}>
                    <Box display="flex" flexDirection="column">
                     <Formik
                     initialValues={initialValue}
                     enableReinitialize={true}
                     onSubmit={ (values, { resetForm }) => {
                      console.log("🚀 ~ file: Mailpdf.jsx:170 ~ MatxCustomizer ~ values:", values)
                      const idata ={
                        ReferenceID:rowData.row.RecordID,
                        ToID:values.emailTO,
                        Cc:values.emailCC,
                        Subject:values.subject,
                        Message:values.message,
                        Attachment:rowData.link,
                      }
                       setTimeout(async() => {
                       const response = await dispatch(sendMail({ accessID:"TR120", action:"insert", idata }))
                       console.log("🚀 ~ file: Mailpdf.jsx:182 ~ setTimeout ~ response:", response)
                       }, 100);
                     }}
                     >
                     {({
              errors,
              touched,
              handleBlur,
              handleChange,
              isSubmitting,
              values,
              handleSubmit,
              resetForm
            }) => (
                <form onSubmit={handleSubmit}>
            <Box display="grid" height="100%" gap="20px">

           
             <TextField
             required
              focused
              fullWidth
              type="email"
              name="emailTO"
              value={values.emailTO}
              id="standard-basic"
              onChange={handleChange}
              errorMessages={["this field is required"]}
              label="To"
              validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
            />
            <TextField
            focused
              fullWidth
              type="email"
              value={values.emailCC}
              name="emailCC"
              id="standard-basic"
              onChange={handleChange}
              errorMessages={["this field is required"]}
              label="CC"
              validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
            />
            <TextField
            focused
              fullWidth
              type="text"
              value={values.subject}
              name="subject"
              id="standard-basic"
              onChange={handleChange}
              label="Subject"
            />
            <TextField
            focused
              fullWidth
              type="text"
              name="message"
              
              value={values.message}
              multiline
              rows={4}
              id="standard-basic"
              onChange={handleChange}
              label="Message"
            />
            <Chip component="a"  href={rowData.link} target="_blank" 
                    rel="noreferrer"sx={{width:"200px",color:"#1976D2"}}   Filled size="small" label={values.subject} icon={<AttachEmailTwoToneIcon color='primary' />} />
            <Box display="flex" justifyContent="end" mt="10px" gap={2}>

                    <LoadingButton
                      color="info"
                      variant="contained"
                      type="submit"
                      // loading={isLoading}
                    >
                      Send
                    </LoadingButton>

                  
                    
                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={()=>{dispatch(mailOpen({}));resetForm()}}
                  >
                    Cancel
                  </Button>
                </Box>
          
             </Box>
                </form>
            )}

                     </Formik>
                    </Box>
                  </Box>
                )}
  

              
            </MaxCustomaizer>
          </Drawer>
        
      </Fragment>
    );
  };
  
 
  
  export default MatxCustomizer;
  