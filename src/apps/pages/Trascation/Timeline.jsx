import React, {useEffect,useState}from "react";
import {

  Box,

  Button,
  IconButton,

  Breadcrumbs,
  Tooltip
} from "@mui/material";
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from '@mui/icons-material/ResetTv';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ArticleIcon from '@mui/icons-material/Article';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import ReceiptIcon from '@mui/icons-material/Receipt';
import CategoryIcon from '@mui/icons-material/Category';
import AddCardIcon from '@mui/icons-material/AddCard';
import ArchiveIcon from '@mui/icons-material/Archive';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import {
    fetchApidata,
   } from "../../../store/reducers/Formapireducer";

const TimeLine = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  const recID = params.RecordID;
  const mode = params.Mode;
  const accessID = params.accessID;
  const filtertype = params.filtertype
  var invFilter = params.invFilter;
  var proformaid = params.id;
  useEffect(() => {
    dispatch(fetchApidata('TR077', "get", recID));
  }, []);
  const [ini ,setIni] = useState(true);
  const Data = useSelector((state) => state.formApi.Data);
  console.log("🚀 ~ file: Timeline.jsx:50 ~ TimeLine ~ Data:", Data)

  var apprVal ="";
  if(filtertype=="P")
  {
    apprVal="Product"
  }
  if(filtertype=="L")
  {
    apprVal="Leather"
  }
  if(filtertype=="M")
  {
    apprVal="Material"
  } 
  var InvAccessID
  var apprValinvoice ="";
  if(invFilter=="SI")
  {
    apprValinvoice="Sample Invoice"
    InvAccessID = "TR073"
  }
  if(invFilter=="PI")
  {
    apprValinvoice="Proforma Invoice"
    InvAccessID = "TR073"
  }
  if(invFilter=="FI")
  {
    apprValinvoice="Final Invoice"
    InvAccessID = "TR073"
  } 
  if(invFilter=="IN")
  {
    apprValinvoice="Proforma Invoice"
    InvAccessID = "TR011"
  }
  
  return (
    <React.Fragment>
      <Box sx={{ height: "100vh", overflow: "auto" }}>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box display="flex" borderRadius="3px" alignItems="center">
            <Breadcrumbs
              maxItems={2}
              aria-label="breadcrumb"
              separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
            >
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(`/Apps/TR043/Invoices`);
                }}
              >
                Invoice
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/${InvAccessID}/Proforma%20Invoice/${filtertype}`
                  );
                }}
              >
                {apprVal}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/TR011/Proforma%20Invoice/${filtertype}/${invFilter}`
                  );
                }}
              >
                {apprValinvoice}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/TR011/Proforma%20Invoice/${filtertype}/${invFilter}/EditProforma%20Invoice/${proformaid}/E`
                  );
                }}
              >
                Timeline
              </Typography>
            </Breadcrumbs>
          </Box>

          <Box display="flex">
            <Tooltip title="Close">
              <IconButton
                onClick={() =>
                  navigate(
                    `/Apps/Secondarylistview/TR011/Proforma%20Invoice/${filtertype}/${invFilter}/EditProforma%20Invoice/${proformaid}/E`
                  )
                }
                color="error"
              >
                <ResetTvIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton onClick={() =>
                  navigate(
                    `/`
                  )
                }>
                <LogoutOutlinedIcon color="error" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Box sx={{display:'flex', justifyContent:'center', padding:'5px 10px' }}>
          <Typography variant="h4">{Data.Proddesc}-{Data.Prdmodno}- {Number(Data.Orderqty).toFixed(0)}</Typography>
        </Box>
        <Box m="0px 20px" >
          <Box
            display="grid"
            gridTemplateColumns="repeat(4 , minMax(0,1fr))"
            gap="30px"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          ></Box>
          <Timeline position="alternate">
            <TimelineItem>
              <TimelineSeparator>
                {/* <TimelineConnector /> */}
                <Tooltip title="Order" arrow>
                  <TimelineDot color="primary">
                    <ReceiptIcon />
                  </TimelineDot>
                </Tooltip>
                <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <Typography variant="h4" component="span">
                  Order
                </Typography>
                <Typography>{Data.Invoiceid}</Typography>
                <Typography>Date: {Data.Invoicedate}</Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
                <Tooltip title="Production Card" arrow>
                  <TimelineDot color="primary">
                    <ArticleIcon />
                  </TimelineDot>
                </Tooltip>
                <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <Typography variant="h4" component="span">
                  Production Card
                </Typography>
                <Typography>{Data.Productioncardhdrno}</Typography>
                <Typography>Date: {Data.ProductcardSdate}</Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
                <Tooltip title="Cutting Component" arrow>
                  <TimelineDot
                    color={Data.Ccenddate !== "" ? "primary" : "grey"}
                  >
                    <AutoAwesomeMosaicIcon />
                  </TimelineDot>
                </Tooltip>
                <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <Typography variant="h4" component="span">
                  Cutting Component
                </Typography>
                <Typography>Start Date : {Data.Ccstartdate }</Typography>
                <Typography>End Date : {Data.Ccenddate  }</Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
                <Tooltip title="Production" arrow>
                  <TimelineDot
                    color={Data.Prenddate !== "" ? "primary" :  "grey"}
                  >
                    <RoomPreferencesIcon />
                  </TimelineDot>
                </Tooltip>
                <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <Typography variant="h4" component="span">
                  Production
                </Typography>
                <Typography>Start Date : {Data.Prstartdate}</Typography>
                <Typography>End Date : {Data.Prenddate}</Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
                <Tooltip title="Packing" arrow>
                  <TimelineDot
                    color={Data.Pkenddate !== "" ? "primary" :  "grey"}
                  >
                    <ArchiveIcon />
                  </TimelineDot>
                </Tooltip>
                <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <Typography variant="h4" component="span">
                  Packing
                </Typography>
                <Typography>Start Date : {Data.Pkstartdate}</Typography>
                <Typography>End Date : {Data.Pkenddate}</Typography>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
                <Tooltip title="Invoice" arrow>
                  <TimelineDot  color={Data.FinalInvoiceNumber !== "" &&  Data.FinalInvoiceNumber !==""? "primary" :  "grey"}>
                 
                    <ListAltIcon />
                  </TimelineDot>
                </Tooltip>
                {/* <TimelineConnector sx={{ bgcolor: 'secondary.main' }} /> */}
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <Typography variant="h4" component="span">
                  Invoice
                </Typography>
                <Typography>{Data.FinalInvoiceNumber}</Typography>
                <Typography>Date:{Data.FinalInvoiceDate}</Typography>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
          <Box display="flex" justifyContent="end" mt="20px" gap="20px">
            <Button
              color="error"
              variant="contained"
              onClick={() => {
                navigate(
                  `/Apps/Secondarylistview/TR011/Proforma%20Invoice/${filtertype}/${invFilter}/EditProforma%20Invoice/${proformaid}/E`
                );
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default TimeLine;
