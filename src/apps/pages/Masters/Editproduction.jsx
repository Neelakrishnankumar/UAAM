import React from "react";
import {
  TextField,
  Box,
  Typography,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  useTheme,
  Checkbox,
  Tooltip,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Formik, Field } from "formik";

import ResetTvIcon from "@mui/icons-material/ResetTv";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  postData,
  postPrdBthData,
} from "../../../store/reducers/Formapireducer";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const Editproduction = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const params = useParams();
  console.log("🚀 ~ file: Editproduction.jsx:30 ~ Editproduction ~ params:", params)
  const navigate = useNavigate();
  const yearData = sessionStorage.getItem("year");
  const yearFlag = sessionStorage.getItem("YearFlag");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const ProductioncardRecordID = params.filtertype;
  const Qty =  params.orderQuantity;
  // *************** HEADER SCREEN SAVE FUNCTION *************** //

  const productionCardFn = async (values) => {

    const CuttingComponent = values.cuttingComponent ? "Y" :"N";
    const ProductionMaterial = values.productionComponent ? "Y" :"N";
    const PackingMaterial = values.packingComponent ? "Y" :"N";
    const data = {
      ProductioncardRecordID,
      CuttingComponent,
      ProductionMaterial,
      PackingMaterial,
      YearID:yearData,
      CompanyID,
      Finyear,
      Qty,
    };

    const response = await dispatch(postPrdBthData({ data }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate(`/Apps/Secondarylistview/${params.accessID}/${params.screenName}/${params.filtertype}/${params.Number}/${params.orderQuantity}`)
    } else {
      toast.error(response.payload.Msg);
    }
  };
  const fnLogOut = (props) =>{

      Swal.fire({
        title: `Do you want ${props}?`,
        // text:data.payload.Msg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: props
      }).then( (result)=>{
          if(result.isConfirmed){
            if(props === 'Logout'){
            navigate("/")}
            if(props === 'Close'){
              navigate(`/Apps/Secondarylistview/${params.accessID}/${params.screenName}/${params.filtertype}/${params.Number}/${params.orderQuantity}`)
            }
          }else{
            return
          }
      })
    }
  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box display="flex" borderRadius="3px" alignItems="center">
          <Typography variant="h3">Production Card Issue</Typography>
        </Box>
        <Box display="flex">
        <Tooltip title="Close">
        <IconButton onClick={() =>fnLogOut('Close')} color="error">
              <ResetTvIcon  />
            </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
             <IconButton onClick={() => fnLogOut('Logout')} color="error">
             <LogoutOutlinedIcon />
          </IconButton>
        </Tooltip>
        </Box>
      </Box>

      <Box m="20px">
        <Formik
          initialValues={{
            cuttingComponent: false,
            productionComponent: false,
            packingComponent: false,
          }}
          enableReinitialize={true}
          onSubmit={(values, { resetForm }) => {
            setTimeout(() => {
              productionCardFn(values);
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
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gridTemplateColumns="repeat(4 , minMax(0,1fr))"
                gap="30px"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <FormControl
                  fullWidth
                  sx={{ gridColumn: "span 2", gap: "10px" }}
                >
                  <Box>
                    <Field
                      type="checkbox"
                      name="cuttingComponent"
                      id="cuttingComponent"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                      label="Cutting Component"
                    />

                    <FormLabel focused={false}>Cutting Component</FormLabel>
                  </Box>
                  <Box>
                    <Field
                      type="checkbox"
                      name="productionComponent"
                      id="productionComponent"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                      label="Production Component"
                    />

                    <FormLabel focused={false}>Production Component</FormLabel>
                  </Box>
                  <Box>
                    <Field
                      type="checkbox"
                      name="packingComponent"
                      id="packingComponent"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                      label="Packing Component"
                    />

                    <FormLabel focused={false}>Packing Component</FormLabel>
                  </Box>
                </FormControl>
              </Box>
              <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                <Button type="submit" variant="contained" color="secondary">
                  SAVE
                </Button>
                <Button onClick={()=>       navigate(`/Apps/Secondarylistview/${params.accessID}/${params.screenName}/${params.filtertype}/${params.Number}/${params.orderQuantity}`)} variant="contained" color="error">
                  CANCEL
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </React.Fragment>
  );
};

export default Editproduction;
