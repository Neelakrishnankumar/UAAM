import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Box,
  Typography,
  Breadcrumbs,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  useTheme,
  Tooltip,
  Stack,
  LinearProgress,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Formik } from "formik";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { tokens } from "../../../Theme";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Form } from "react-router-dom";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import Listviewpopup from "../Lookup";
import Popup from "../popup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import basicSchema from "../../Security/validation";
import {
  fetchApidata,
  postApidata,
  stockApidata,
  stockFetchapiData,
  getFetchData,
  stockGetData,
} from "../../../store/reducers/Formapireducer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { fnFileUpload } from "../../../store/reducers/Imguploadreducer";
import store from "../../../index";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
const Editstock = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const params = useParams();
  console.log("🚀 ~ file: Editstock.jsx:55 ~ Editstock ~ params:", params);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  var recID = params.id;
  // var mode = params.Mode;
  var accessID = params.accessID;
  var mode = params.Mode;
  var stockcode = params.Code;
  var stockdesc = params.Desc;
  var Typedata = params.Type;
  var searchPharse = params.searchPharse;
  var yearData = sessionStorage.getItem("year");
  var parentID = params.filtertype;
  var screenName = params.screenName;
  var stckid = params.stckid;
  var filtertype = params.filtertype;

  var Desc = params.Desc;

  const Data = useSelector((state) => state.formApi.Data);
  console.log("🚀 ~ file: Editstock.jsx:80 ~ Editstock ~ Data:", Data);
  const stockData = useSelector((state) => state.formApi.materialStockData);
  console.log(
    "🚀 ~ file: Editstock.jsx:76 ~ Editstock ~ stockData:",
    stockData
  );
  // console.log("🚀 ~ file: Editstock.jsx:72 ~ Editstock ~ Data:", Data)
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.loading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const [Image, setImage] = useState();
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const location = useLocation();

  useEffect(() => {
    if (filtertype == "M" || filtertype == "P" || filtertype == "R") {
      dispatch(getFetchData({ accessID, get: "get", recID }));

      dispatch(
        stockGetData({ accessID: "TR070", recID, Type: filtertype, yearData })
      );
    }
    if (filtertype == "L") {
      dispatch(getFetchData({ accessID, get: "get", recID }));
      dispatch(stockGetData({ accessID: "TR071", recID, Type: "L", yearData }));
    }
  }, [location.key]);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const stockIntialValue = {
    OpenStockQty: stockData.OpenStockQty,
    ReceivedStockQty: stockData.ReceivedStockQty,
    IssuedStockQty: stockData.IssuedStockQty,
    Stock: stockData.Stock,
    RequirementStockQty: stockData.RequirementStockQty,
    BALANCE: stockData.BALANCE,
    OpenStockDate: stockData.Osdate,
    Bin: stockData.Bin,
    OpenstockTotalsqft: stockData.OpenstockTotalsqft,
    RecivedTotalsqft: stockData.RecivedTotalsqft,
    IssuedTotalsqft: stockData.IssuedTotalsqft,
    TotalStock: stockData.TotalStock,
  };

  var userimg = store.getState().globalurl.imageUrl;
  console.log("imgname" + Data.ImageName);
  if (mode == "A") {
    userimg = userimg + "Defaultimg.jpg";
  } else {
    if (
      Data.ImageName == undefined ||
      Data.ImageName == null ||
      Data.ImageName == ""
    ) {
      userimg = userimg + "Defaultimg.jpg";
    } else {
      userimg = userimg + Data.ImageName;
    }
  }
  var Type = "";

  if (filtertype == "M") {
    Type = "Material";
  }

  const navigateClose = () => {
    navigate(
      `/Apps/Secondarylistview/${accessID}/${screenName}/${stckid}/${filtertype}/${Desc}/${searchPharse}/pm`
    );
  };
  var filterName;
  var filterValue;
  if (parentID == "L") {
    filterName = "Type";
    filterValue = "A";
  }
  if (parentID == "M") {
    filterName = "Type";
    filterValue = "M";
  }

  if (parentID == "S") {
    filterName = "Type";
    filterValue = "S";
  }
  var abbrevation = "";
  if (parentID == "L") {
    abbrevation = "Leather";
  }
  if (parentID == "M") {
    abbrevation = "Material";
  }
  if (parentID == "S") {
    abbrevation = "Service";
  }
  if (parentID == "P") {
    abbrevation = "Packing Material";
  }
  if (parentID == "R") {
    abbrevation = "RF Material";
  }
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
          navigate(
            `/Apps/Secondarylistview/${accessID}/${screenName}/${stckid}/${filtertype}/${Desc}/${searchPharse}/pm`
          );
        }
      } else {
        return;
      }
    });
  };
  const ref = useRef(null);

  return (
    <React.Fragment>
      {getLoading ? <LinearProgress /> : false}
      <Box sx={{ height: "100vh", overflow: "auto" }}>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box display="flex" borderRadius="3px" alignItems="center">
            <Box display="flex" borderRadius="3px" alignItems="center">
              {broken && !rtl && (
                <IconButton onClick={() => toggleSidebar()}>
                  <MenuOutlinedIcon />
                </IconButton>
              )}
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
                    navigate(`/Apps/TR044/Materials%20Type`);
                  }}
                >
                  Material Type
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    navigate(
                      `/Apps/Secondarylistview/TR003/${screenName}/${filtertype}`
                    );
                  }}
                >
                  {abbrevation}
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    navigate(
                      `/Apps/Secondarylistview/${accessID}/${screenName}/${stckid}/${filtertype}/${Desc}/${searchPharse}/pm`
                    );
                  }}
                >
                  {stockdesc}
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  {Data.MaterialDescription}
                </Typography>
              </Breadcrumbs>
            </Box>
          </Box>
          <Box display="flex">
            <Tooltip title="Close">
              <IconButton color="error" onClick={() => fnLogOut("Close")}>
                <ResetTvIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton>
                <LogoutOutlinedIcon
                  onClick={() => fnLogOut("Logout")}
                  color="error"
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        {!getLoading ? (
          <Box m="20px" sx={{ m: 2 }}>
            <Formik
              // onSubmit={handleFormSubmit}
              initialValues={stockIntialValue}
              enableReinitialize={true}
              validationSchema={basicSchema}
            >
              {({ values, errors, touched, handleBlur, handleChange }) => (
                <form>
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
                    {!isNonMobile && (
                      <Stack
                        sx={{
                          gridColumn: "span 2",
                          alignContent: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                          right: "0px",
                        }}
                      >
                        <img
                          src={userimg}
                          style={{
                            width: "200px",
                            height: "150px",
                          }}
                        />
                      </Stack>
                    )}

                    {filtertype == "L" ? (
                      <React.Fragment>
                        <FormControl
                          fullWidth
                          sx={{ gridColumn: "span 2", gap: "40px" }}
                        >
                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            value={Data.MaterialCode}
                            id="stockcode"
                            name="stockcode"
                            label="Model"
                            required
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched.ModelNo && !!errors.ModelNo}
                            helperText={touched.ModelNo && errors.ModelNo}
                            sx={{ gridColumn: "span 2" }}
                            focused
                            inputProps={{ maxLength: 10, readOnly: true }}
                          />

                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            value={Data.MaterialDescription}
                            // id="Desc"
                            // name="Desc"
                            label="Description"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            required
                            sx={{ gridColumn: "span 2" }}
                            focused
                            // error={!!touched.Desc && !!errors.Desc}
                            // helperText={touched.Desc && errors.Desc}
                            inputProps={{ maxLength: 50, readOnly: true }}
                            multiline
                          />
                        </FormControl>
                        {isNonMobile && (
                          <Stack
                            sx={{
                              gridColumn: "span 2",
                              alignContent: "center",
                              justifyContent: "center",
                              alignItems: "center",
                              position: "relative",
                              right: "0px",
                            }}
                          >
                            <img
                              src={userimg}
                              style={{
                                width: "200px",
                                height: "150px",
                              }}
                            />
                          </Stack>
                        )}
                        <TextField
                          name="OpenstockTotalsqft"
                          type="number"
                          id="OpenstockTotalsqft"
                          variant="filled"
                          value={values.OpenstockTotalsqft}
                          label="Opening Stock"
                          focused
                          inputProps={{ style: { textAlign: "right" } }}
                          InputProps={{ readOnly: true }}
                          sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                        />
                        {values.OpenStockDate !== "0" ? (
                          <FormControl sx={{ gridColumn: "span 2" }}>
                            <TextField
                              name="OpenStockDate"
                              type="Date"
                              id="OpenStockDate"
                              value={values.OpenStockDate}
                              label="Opening Stock Date"
                              variant="filled"
                              focused
                              inputFormat="YYYY-MM-DD"
                              InputProps={{ readOnly: true }}
                            />
                          </FormControl>
                        ) : (
                          false
                        )}
                        <TextField
                          name="RecivedTotalsqft"
                          type="number"
                          id="RecivedTotalsqft"
                          label="Received Qty (In DC)"
                          variant="filled"
                          value={values.RecivedTotalsqft}
                          focused
                          inputProps={{ style: { textAlign: "right" } }}
                          InputProps={{ readOnly: true }}
                          sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Bin"
                          id="Bin"
                          name="Bin"
                          value={values.Bin}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{ gridColumn: "span 2" }}
                          InputProps={{ readOnly: true }}
                          focused
                        />
                        <TextField
                          name="IssuedTotalsqft"
                          type="number"
                          id="IssuedTotalsqft"
                          label="Issued Qty(Batch issue Qty + Out Dc issue Qty)"
                          variant="filled"
                          value={values.IssuedTotalsqft}
                          focused
                          inputProps={{ style: { textAlign: "right" } }}
                          InputProps={{ readOnly: true }}
                          sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                        />
                        <Tooltip title="Opening Stock + Received Qty - Issue Qty">
                          <TextField
                            name="Stock"
                            type="number"
                            id="Stock"
                            label="Available Stock"
                            variant="filled"
                            value={values.TotalStock}
                            focused
                            inputProps={{ style: { textAlign: "right" } }}
                            InputProps={{ readOnly: true }}
                            sx={{ gridColumn: "span 2", background: "#FFDAC0" }}
                          />
                        </Tooltip>
                        <Tooltip title="Requirement Qty - Batchissue Qty">
                          <TextField
                            name="RequirementStockQty"
                            type="number"
                            id="RequirementStockQty"
                            label="Requirement Qty(as per Production Card)"
                            variant="filled"
                            value={values.RequirementStockQty}
                            focused
                            inputProps={{ style: { textAlign: "right" } }}
                            InputProps={{ readOnly: true }}
                            sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                          />
                        </Tooltip>

                        <Tooltip title="Stock - RequirementQty">
                          <TextField
                            name="BALANCE"
                            type="number"
                            id="BALANCE"
                            label="Effective Stock"
                            value={values.BALANCE}
                            variant="filled"
                            focused
                            inputProps={{ style: { textAlign: "right" } }}
                            InputProps={{ readOnly: true }}
                            sx={{ gridColumn: "span 2", background: "#FFDAC0" }}
                          />
                        </Tooltip>
                        {/* <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        // value={Data.MaterialDescription}
                        // id="Desc"
                        // name="Desc"
                        label="Description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        
                        sx={{ gridColumn: "span 2" }}
                        focused
                        // error={!!touched.Desc && !!errors.Desc}
                        // helperText={touched.Desc && errors.Desc}
                        inputProps={{ maxLength: 50, readOnly: true }}
                        
                      />
                       <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        // value={Data.MaterialDescription}
                        // id="Desc"
                        // name="Desc"
                        label="Total Qty"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        
                        sx={{ gridColumn: "span 2" }}
                        focused
                        // error={!!touched.Desc && !!errors.Desc}
                        // helperText={touched.Desc && errors.Desc}
                        inputProps={{ maxLength: 50, readOnly: true }}
                        
                      />
                        <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        // value={Data.MaterialDescription}
                        // id="Desc"
                        // name="Desc"
                        label="Balance"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        
                        sx={{ gridColumn: "span 2" }}
                        focused
                        // error={!!touched.Desc && !!errors.Desc}
                        // helperText={touched.Desc && errors.Desc}
                        inputProps={{ maxLength: 50, readOnly: true }}
                        
                      /> */}
                      </React.Fragment>
                    ) : (
                      false
                    )}

                    {filtertype == "M" ||
                    filtertype == "P" ||
                    filtertype == "R" ? (
                      <React.Fragment>
                        <FormControl
                          fullWidth
                          sx={{ gridColumn: "span 2", gap: "40px" }}
                        >
                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            value={Data.MaterialCode}
                            id="stockcode"
                            name="stockcode"
                            label="Model"
                            required
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched.ModelNo && !!errors.ModelNo}
                            helperText={touched.ModelNo && errors.ModelNo}
                            sx={{ gridColumn: "span 2" }}
                            focused
                            inputProps={{ maxLength: 10, readOnly: true }}
                          />

                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            value={Data.MaterialDescription}
                            // id="Desc"
                            // name="Desc"
                            label="Description"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            required
                            sx={{ gridColumn: "span 2" }}
                            focused
                            // error={!!touched.Desc && !!errors.Desc}
                            // helperText={touched.Desc && errors.Desc}
                            inputProps={{ maxLength: 50, readOnly: true }}
                            multiline
                          />
                        </FormControl>
                        {isNonMobile && (
                          <Stack
                            sx={{
                              gridColumn: "span 2",
                              alignContent: "center",
                              justifyContent: "center",
                              alignItems: "center",
                              position: "relative",
                              right: "0px",
                            }}
                          >
                            <img
                              src={userimg}
                              style={{
                                width: "200px",
                                height: "150px",
                              }}
                            />
                          </Stack>
                        )}
                        <TextField
                          name="OpenStockQty"
                          type="number"
                          id="OpenStockQty"
                          value={values.OpenStockQty}
                          label="Opening Stock"
                          variant="filled"
                          focused
                          inputProps={{ style: { textAlign: "right" } }}
                          InputProps={{ readOnly: true }}
                          sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                        />
                        {values.OpenStockDate !== "0" ? (
                          <FormControl sx={{ gridColumn: "span 2" }}>
                            <TextField
                              name="OpenStockDate"
                              type="Date"
                              id="OpenStockDate"
                              value={values.OpenStockDate}
                              label="Opening Stock Date"
                              variant="filled"
                              focused
                              inputFormat="YYYY-MM-DD"
                              InputProps={{ readOnly: true }}
                            />
                          </FormControl>
                        ) : (
                          false
                        )}
                        <TextField
                          name="ReceivedStockQty"
                          type="number"
                          id="ReceivedStockQty"
                          label="Received Qty(In DC)"
                          variant="filled"
                          value={values.ReceivedStockQty}
                          focused
                          inputProps={{ style: { textAlign: "right" } }}
                          InputProps={{ readOnly: true }}
                          sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                        />

                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Bin"
                          id="Bin"
                          name="Bin"
                          value={values.Bin}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{ gridColumn: "span 2" }}
                          InputProps={{ readOnly: true }}
                          focused
                        />
                        <TextField
                          name="IssuedStockQty"
                          type="number"
                          id="IssuedStockQty"
                          label="Issued Qty(Batch issue Qty + Out Dc issue Qty)"
                          variant="filled"
                          value={values.IssuedStockQty}
                          focused
                          inputProps={{ style: { textAlign: "right" } }}
                          InputProps={{ readOnly: true }}
                          sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                        />
                        <Tooltip title="Opening Stock + Received Qty - Issue Qty">
                          <TextField
                            name="Stock"
                            type="number"
                            id="Stock"
                            label="Available Stock"
                            variant="filled"
                            value={values.Stock}
                            focused
                            inputProps={{ style: { textAlign: "right" } }}
                            InputProps={{ readOnly: true }}
                            sx={{ gridColumn: "span 2", background: "#FFDAC0" }}
                          />
                        </Tooltip>
                        <Tooltip title="Requirement Qty - Batchissue Qty">
                          <TextField
                            name="RequirementStockQty"
                            type="number"
                            id="RequirementStockQty"
                            label="Requirement Qty(as per Production Card)"
                            variant="filled"
                            value={values.RequirementStockQty}
                            focused
                            inputProps={{ style: { textAlign: "right" } }}
                            InputProps={{ readOnly: true }}
                            sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                          />
                        </Tooltip>

                        <Tooltip title="Stock - Requirement Qty">
                          <TextField
                            name="BALANCE"
                            type="number"
                            id="BALANCE"
                            label="Effective Stock"
                            value={values.BALANCE}
                            variant="filled"
                            focused
                            inputProps={{ style: { textAlign: "right" } }}
                            InputProps={{ readOnly: true }}
                            sx={{ gridColumn: "span 2", background: "#FFDAC0" }}
                          />
                        </Tooltip>
                      </React.Fragment>
                    ) : (
                      false
                    )}

                    {/* <FormControl sx={{ gridColumn: "span 2",gap:'40px' }}>
                       
                      
                      { values.OpenStockDate !== "0"  ? <FormControl >
                      <TextField
                    name="OpenStockDate"
                    type="Date"
                    id="OpenStockDate"
                    value={values.OpenStockDate}
                    label="Opening Stock Date"
                    variant="filled"
                    focused
                    inputFormat="YYYY-MM-DD"
                    // inputProps={{style: { textAlign: 'right' }}}
                    InputProps={{ readOnly: true }}
                    // sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                    />
                   </FormControl>:false}
                   <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Bin"
                      id="bin"
                      name="bin"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      
                      focused
                      />
                    </FormControl>
                        */}
                  </Box>
                </form>
              )}
            </Formik>
            <Box display="flex" justifyContent="end" mt="20px" gap="20px">
              {/* <Button variant="contained" color="secondary">
    SAVE
</Button> */}

              {/* <Button variant="contained" color="error" onClick={() => navigate(`/Apps/Secondarylistview/${accessID}/${screenName}/${stckid}/${filtertype}/${Desc}`)}>
    CANCEL
</Button> */}

              <Button variant="contained" color="error" onClick={navigateClose}>
                CANCEL
              </Button>
            </Box>
          </Box>
        ) : (
          false
        )}
      </Box>
    </React.Fragment>
  );
};

export default Editstock;
