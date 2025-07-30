import {
  Checkbox,
  Breadcrumbs,
  InputLabel,
  Paper,
  useTheme,
  MenuItem,
  Menu,
  Box,
  Button,
  TextField,
  Stack,
  IconButton,
  Avatar,
  FormLabel,
  FormControl,
  Typography,
  FormControlLabel,
  Select,
  Tooltip,
  LinearProgress,
} from "@mui/material";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Formik, Field } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../index";
import {
  explorePostData,
  getFetchData,
  postApidata,
  postApidatawol,
  postData,
} from "../../../store/reducers/Formapireducer";
import { fetchComboData1 } from "../../../store/reducers/Comboreducer";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import basicSchema, { SubscriptionScma } from "../../Security/validation";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Listviewpopup from "../Lookup";
import Popup from "../popup";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { tokens } from "../../../Theme";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  useGridApiRef,
} from "@mui/x-data-grid";
import { uomSchema, uomconversionSchema } from "../../Security/validation";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { LoadingButton } from "@mui/lab";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Swal from "sweetalert2";
import {
  dataGridHeaderFooterHeight,
  dataGridHeight,
  dataGridPageSize,
  dataGridPageSizeOption,
  dataGridRowHeight,
  formGap,
} from "../../../ui-components/utils";
// ***********************************************
// Developer: Radhika
// Purpose:To Create Product Subscription
// ***********************************************
const EditProductSubScription = () => {
  const [pageSize, setPageSize] = React.useState(10);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
const rowData = location.state || {};
console.log(rowData, "--find rowData");

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");

  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var typeUom = params.filtertype;
  var accessID = params.accessID;

  const Data = useSelector((state) => state.formApi.Data);
  console.log("Data formapi");

  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const exploreLoading = useSelector((state) => state.exploreApi.loading);

  const { toggleSidebar, broken, rtl } = useProSidebar();
  const [uomType, setUomType] = useState("");

  const [openUOMPopup, setOpenUOMPopup] = useState(false);
  // ************Lookup Function***************
  function handleShow(type) {
    if (type == "UC") {
      setOpenUOMPopup(true);
    }
  }

  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  const [ini, setIni] = useState(true);
  const [iniuom, setIniuom] = useState(true);
  const [loading, setLoading] = useState(false);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  var userimg = store.getState().globalurl.imageUrl;
  // if (mode == "A") {
  //   userimg = userimg + "DefaultProduct.jpg";
  // } else {
  //   if (
  //     Data.ImageName == undefined ||
  //     Data.ImageName == null ||
  //     Data.ImageName == ""
  //   ) {
  //     userimg = userimg + "DefaultProduct.jpg";
  //   } else {
  //     userimg = userimg + Data.ImageName;
  //   }
  // }

  //*******Assign UOM values from Database in  Yup initial value******* */
  const initialValues = {
    RecordID: Data.RecordID,
    code: Data.Code,
    description: Data.Name,
    sortOrder: Data.SortOrder,
    checkbox: Data.Disable === "Y" ? true : false,

    // Type:Data.Type,
    // MinorDescription: Data.MinorDescription,

    // description:  Data.Description,
    // Type:Data.Type,
    // sortOrder:  Data.SortOrder,
    // checkbox: Data.Disable === "Y" ? true : false,
    // code: Data.Code,
    // MinorDescription: Data.MinorDescription,
  };

  /*********************UOM save******************* */
  const fnSave = async (values) => {
    var idata = {
      RecordID: recID,
      Name: values.description,
      //   YearID: Year,
      //   Type: typeUom,
      Code: values.code || "",
      SortOrder: values.sortOrder,
      Disable: values.checkbox == true ? "Y" : "N",
      //   MinorDescription: typeUom == "C" ? values.MinorDescription : "N",
      //   Finyear,
      //   CompanyID,
    };

    let action = mode === "A" ? "insert" : "update";
    const data = await dispatch(postData({ accessID, action, idata }));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      console.log(mode, "--find mode");
      if (mode == "A") {
        navigate(
          `/Apps/TR240/Products/EditProducts/${data.payload.OurProductRecid}/E`
        );
      }
    } else {
      toast.error(data.payload.Msg);
      setLoading(false);
    }
  };

  /**************************UOM Conversion *************************8 */

  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );
  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );

  console.log(explorelistViewData, "--find explorelistViewData");
  console.log(explorelistViewcolumn, "---find explorelistViewcolumn");

  const [show, setScreen] = React.useState("0");

  const [uomcondata, setUomcondata] = useState({
    RecordID: "",
    NoOfemployee: "",
    NoOfenduser: "",
    price: "",
    offerprice: "",
  });
  const [boMode, setBomode] = useState("A");
  // **********ScreenChange Function*********
  const screenChange = (event) => {
    setScreen(event.target.value);
    // setUomType(Data.Type);
    if (event.target.value == "1") {
      dispatch(fetchExplorelitview("TR239", "Product Subscription", recID, ""));
      selectcelldata("", "A", "");
    }
  };

  //************************* Lookup Data ****************/

  // const [isPopupData, setisPopupdata] = React.useState(false);
  // const [selectUOMLookupData, setselectUOMLookupData] = React.useState({
  //   UOMlookupRecordid: "",
  //   UOMlookupCode: "",
  //   UOMlookupDesc: "",
  // });
  // *************Type based Lookup open Function**************
  // const childToParent = (childdata, type) => {
  //   if (type == "UOM") {
  //     setisPopupdata(true);
  //     setselectUOMLookupData({
  //       UOMlookupRecordid: childdata.RecordID,
  //       UOMlookupCode: childdata.Code,
  //       UOMlookupDesc: childdata.Name,
  //     });
  //     setOpenUOMPopup(false);
  //   } else {
  //   }
  // };
  /****************************Search ***********/

  const VISIBLE_FIELDS = [
    "SLNO",
    "NoOfEmployee",
    "NoOfEndUser",
    "Price",
    "OfferPrice",
    "action",
  ];
  const columns = React.useMemo(
    () =>
      explorelistViewcolumn.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
    [explorelistViewcolumn]
  );

  const ref = useRef();
  //  console.log("🚀 ~ file: Edituoms.jsx:248 ~ Edituom ~ ref:", ref)
  // **********Grid header function************
  const [rowCount, setRowCount] = useState(0);

  function CustomToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>List of Product Subscription</Typography>
          <Typography variant="h5">{`(${rowCount})`}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <GridToolbarQuickFilter />
          <Tooltip title="Add">
            <IconButton
              onClick={() => {
                const reset = ref.current.resetForm;
                selectcelldata("", "A", "");
                reset();
                setIniuom(true);
              }}
            >
              <AddOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </GridToolbarContainer>
    );
  }
  //*******Assign UOM conversion values from Database in  Yup initial value******* */
  const supmateInitialvalues = {
    Description: uomcondata.Description,
    Code: Data.Code,
    NoOfemployee: uomcondata.NoOfemployee,
    NoOfenduser: uomcondata.NoOfenduser,
    price: uomcondata.price,
    offerprice: uomcondata.offerprice,
  };
  /****************** uom conversion values assign a state variale******************** */
  const selectcelldata = (data, bMode, field) => {
    console.log(data, "--find data");
    console.log(bMode, "--find bMode");
    console.log(field, "--find field");

    setBomode(bMode);

    if (bMode == "A") {
      setUomcondata({
        RecordID: "",
        NoOfemployee: "",
        NoOfenduser: "",
        price: "",
        offerprice: "",
      });
      // setselectUOMLookupData({ UOMlookupRecordid: "", UOMlookupDesc: "" });
    } else {
      if (field == "action") {
        setUomcondata({
          RecordID: data.RecordID,
          NoOfemployee: data.NoOfEmployee,
          NoOfenduser: data.NoOfEndUser,
          price: data.Price,
          offerprice: data.OfferPrice,
        });
        // setselectUOMLookupData({
        //   UOMlookupRecordid: data.Touom,
        //   UOMlookupDesc: data.Description,
        // });
      }
    }
  };

  /******************************UOM Conversion  FUNCTION********** */
  const FnProductSub = async (values, resetForm, del) => {
    setLoading(true);

    if (del) {
      // if (uomcondata.RecordID == "") {
      //   toast.error("Please select UOM Conversion");
      setLoading(false);
      //     return;
      //   }
    }

    let action =
      boMode === "A" && !del
        ? "insert"
        : boMode === "E" && del
        ? "harddelete"
        : "update";

    const idata = {
      RecordID: recID,
      NoOfEmployee: values.NoOfemployee,
      NoOfEndUser: values.NoOfenduser,
      Price: values.price,
      OfferPrice: values.offerprice,
      OurProductID: recID,
      RecordID: uomcondata.RecordID,
      // UomRecordID: recID,
      // Touom: selectUOMLookupData.UOMlookupRecordid,
      // Conversion: values.Conversion,
      // ParentCode: values.Code,
      // SortOrder: values.SortOrder,
      //  Finyear,
      // CompanyID,
    };

    console.log(uomcondata.RecordID, "--uomcondata recordID");

    console.log("save" + JSON.stringify(idata));
    const response = await dispatch(
      explorePostData({ accessID: "TR239", action, idata })
    );
    // const data = await dispatch(postApidata("TR028", type, idata));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      setLoading(false);
      dispatch(fetchExplorelitview("TR239", "Product Subscription", recID, ""));
      resetForm();
      setUomcondata({
        RecordID: "",
        NoOfemployee: "",
        NoOfenduser: "",
        price: "",
        offerprice: "",
      });
      // setselectUOMLookupData({ UOMlookupRecordid: "", UOMlookupDesc: "" });
      selectcelldata("", "A", "");
    } else {
      toast.error(response.payload.Msg);
      setLoading(false);
    }
  };

  // const clrForm = () => {
  //   setUomcondata({ RecordID: "", Conversion: "", SortOrder: "" });
  //   setselectUOMLookupData({ UOMlookupRecordid: "", UOMlookupDesc: "" });

  //   selectcelldata("", "A", "");
  // };

  const style = {
    height: "55px",
    border: "2px solid #1769aa ",
    borderRadius: "5px",
    backgroundColor: "#EDEDED",
  };
  // Appreviation
  var apprval = "";
  if (typeUom == "W") {
    apprval = "Weight";
  }
  if (typeUom == "L") {
    apprval = "Length";
  }
  if (typeUom == "C") {
    apprval = "Currency";
  }
  if (typeUom == "V") {
    apprval = "Volume";
  }
  if (typeUom == "S") {
    apprval = "Service";
  }
  if (typeUom == "A") {
    apprval = "Area";
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
          navigate(`/Apps/TR240/Products`);
        }
      } else {
        return;
      }
    });
  };
  return (
    <React.Fragment>
      {getLoading ? <LinearProgress /> : false}
      <Box sx={{ height: "100vh", overflow: "auto" }}>
        <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            p={mode == "E" ? 1 : 2}
          >
            <Box display="flex" borderRadius="3px" alignItems={"center"}>
              {broken && !rtl && (
                <IconButton onClick={() => toggleSidebar()}>
                  <MenuOutlinedIcon />
                </IconButton>
              )}

              <Box
                display={isNonMobile ? "flex" : "none"}
                borderRadius="3px"
                alignItems="center"
              >
                <Breadcrumbs
                  maxItems={3}
                  aria-label="breadcrumb"
                  separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
                >
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => {
                      navigate(`/Apps/TR240/Products`,);
                    }}
                  >
       {mode === "E" ? ` List Of Products(${rowData.Products})` : "List Of Products(New)"}

                    {/* {` List Of Products(${rowData.Products})`} */}
                   
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => {
                      setScreen("0");
                    }}
                  >
                    Products
                  </Typography>
                  {show == "1" ? (
                    <Typography
                      variant="h5"
                      color="#0000D1"
                      sx={{ cursor: "default" }}
                    >
                      Product Subscripton
                    </Typography>
                  ) : (
                    false
                  )}
                </Breadcrumbs>
              </Box>
            </Box>

            <Box display="flex">
              {mode !== "A" ? (
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small">Explore</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={show}
                    label="Explore"
                    onChange={screenChange}
                  >
                    <MenuItem value={0}>Products</MenuItem>
                    <MenuItem value={1}>Product Subscription</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                false
              )}

              <Tooltip title="Close">
                <IconButton onClick={() => fnLogOut("Close")} color="error">
                  <ResetTvIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Logout">
                <IconButton onClick={() => fnLogOut("Logout")} color="error">
                  <LogoutOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Paper>
        {/* <Box
          display={isNonMobile ? "none" : "flex"}
          borderRadius="3px"
          alignItems="center"
        >
          <Breadcrumbs
            maxItems={3}
            aria-label="breadcrumb"
            separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
          >
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate(`/Apps/TR049/UOM Type`);
              }}
            >
              UOM TYPE
            </Typography>

            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate(`/Apps/Secondarylistview/TR008/UOM/${typeUom}`);
              }}
            >
              {apprval}
            </Typography>
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                setScreen(0);
              }}
            >
              Uom
            </Typography>
            {show == "1" ? (
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                Conversion
              </Typography>
            ) : (
              false
            )}
          </Breadcrumbs>
        </Box> */}

        {!getLoading && show == "0" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            {/* <Box m="20px"> */}
            <Formik
              initialValues={initialValues}
              onSubmit={(values, setSubmitting) => {
                setTimeout(() => {
                  fnSave(values);
                }, 100);
              }}
              // validationSchema={SubscriptionScma}
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
                    gap={formGap}
                    padding={1}
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <FormControl sx={{ gridColumn: "span 2", gap: formGap }}>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        // required
                        id="code"
                        name="code"
                        label="Code"
                        placeholder="Auto"
                        value={values.code}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        // error={!!touched.code && !!errors.code}
                        // helperText={touched.code && errors.code}
                        // error={touched.code && !!errors.code}
                        // helperText={touched.code && errors.code ? errors.code : ""}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        // inputProps={{ maxLength: 5 }}
                        InputProps={{ readOnly:true}}
                        // autoFocus
                        // onInvalid={(e) => {
                        //   e.target.setCustomValidity("Please Fill The Code");
                        // }}
                        // onInput={(e) => {
                        //   e.target.setCustomValidity("");
                        // }}
                      />
                   
                        <TextField
                          fullWidth
                          variant="standard"
                          type="text"
                          value={values.description}
                          id="description"
                          name="description"
                          label="Description"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          autoFocus
                          error={!!touched.description && !!errors.description}
                          helperText={touched.description && errors.description}
                          sx={{ gridColumn: "span 2" }}
                          focused
                          inputProps={{ maxLength: 50 }}
                          onInvalid={(e) => {
                            e.target.setCustomValidity(
                              "Please Fill The Description"
                            );
                          }}
                          onInput={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />
                     

                      <TextField
                        fullWidth
                        variant="standard"
                        type="number"
                        value={values.sortOrder}
                        id="sortOrder"
                        name="sortOrder"
                        label="Sort Order"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        // error={!!touched.Coe && !!errors.Coe}
                        // helperText={touched.Coe && errors.Coe}
                        sx={{ gridColumn: "span 2", background: "" }}
                        focused
                        onWheel={(e) => e.target.blur()}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 11);
                        }}
                      />
                      <FormControl>
                        <Box>
                          <Field
                            //  size="small"
                            type="checkbox"
                            name="checkbox"
                            id="checkbox"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            as={Checkbox}
                            label="Disable"
                          />

                          <FormLabel focused={false}>Disable</FormLabel>
                        </Box>
                      </FormControl>
                    </FormControl>
                  </Box>
                  <Box
                    display="flex"
                    padding={1}
                    justifyContent="end"
                    mt="20px"
                    gap="20px"
                  >
                    <LoadingButton
                      color="secondary"
                      variant="contained"
                      type="submit"
                      loading={isLoading}
                      disabled={isLoading}
                    >
                      Save
                    </LoadingButton>
                    {/* {YearFlag == "true" ? (
                      <LoadingButton
                        color="secondary"
                        variant="contained"
                        type="submit"
                        loading={isLoading}
                      >
                        Save
                      </LoadingButton>
                    ) : (
                      <Button
                        color="secondary"
                        variant="contained"
                        type="submit"
                        disabled={true}
                      >
                        Save
                      </Button>
                    )} */}

                    <Button
                      color="warning"
                      variant="contained"
                      onClick={() => {
                        navigate(
                          `/Apps/TR240/Products`
                        );
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
            {/* </Box> */}
          </Paper>
        ) : (
          false
        )}

        {show == "1" ? (
          // <Box m="20px" sx={{ m: 2 }}>
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              // onSubmit={handleFormSubmit}
              initialValues={initialValues}
              enableReinitialize={true}
              // validationSchema={basicSchema}
            >
              {({ values, errors, touched, handleBlur, handleChange }) => (
                <Box>
                  <Box
                    display="grid"
                    gap={formGap}
                    padding={1}
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <FormControl sx={{ gridColumn: "span 2", gap: formGap }}>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        value={values.code}
                        id="code"
                        name="code"
                        label="Code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        // error={!!touched.Coe && !!errors.Coe}
                        // helperText={touched.Coe && errors.Coe}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        inputProps={{ readOnly: true }}
                      />
                    </FormControl>
                    <FormControl sx={{ gridColumn: "span 2", gap: formGap }}>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        value={values.description}
                        id="description"
                        name="description"
                        label="Description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Description && !!errors.Description}
                        helperText={touched.Description && errors.Description}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        inputProps={{ readOnly: true }}
                      />
                    </FormControl>
                    <FormControl
                      sx={{
                        gridColumn: "span 2",
                        gap: formGap,
                        display: "none",
                      }}
                    >
                      {/* <FormControl sx={{ display: "none" }}>
                        <FormLabel>Type</FormLabel>
                        <Field
                          as="select"
                          label="Type"
                          onChange={handleChange}
                          value={values.Type}
                          id="Type"
                          name="Type"
                          focused
                          style={style}
                        >
                          <option>Select</option>
                          <option value="C">Currency</option>
                          {/* <option value='N' >numbers</option> 
                          <option value="W">Weight</option>
                          <option value="L">length</option>
                          <option value="V">volume</option>
                        </Field>
                      </FormControl> */}
                    </FormControl>

                    {/* <Stack
                      sx={{
                        //    width: {sm:'100%',md:'100%',lg:'100%'},
                        gridColumn: "span 2",
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        right: "0px",
                      }}
                    >
                      <img  src={userimg} style={{width:'200px',height:'150px'}} /> 
                    </Stack> */}
                    <FormControl sx={{ gridColumn: "span 2" }}>
                      <Box m="5px">
                        <Box
                          m="5px 0 0 0"
                          // height="65vh"
                          height={dataGridHeight}
                          sx={{
                            "& .MuiDataGrid-root": {
                              border: "none",
                            },
                            "& .MuiDataGrid-cell": {
                              borderBottom: "none",
                            },
                            "& .name-column--cell": {
                              color: colors.greenAccent[300],
                            },
                            "& .MuiDataGrid-columnHeaders": {
                              backgroundColor: colors.blueAccent[800],
                              borderBottom: "none",
                            },
                            "& .MuiDataGrid-virtualScroller": {
                              backgroundColor: colors.primary[400],
                            },
                            "& .MuiDataGrid-footerContainer": {
                              borderTop: "none",
                              backgroundColor: colors.blueAccent[800],
                            },
                            "& .MuiCheckbox-root": {
                              color: `${colors.greenAccent[200]} !important`,
                            },

                            "& .odd-row": {
                              backgroundColor: "",
                              color: "", // Color for odd rows
                            },
                            "& .even-row": {
                              backgroundColor: "#D3D3D3",
                              color: "", // Color for even rows
                            },
                          }}
                        >
                          <DataGrid
                            sx={{
                              "& .MuiDataGrid-footerContainer": {
                                height: dataGridHeaderFooterHeight,
                                minHeight: dataGridHeaderFooterHeight,
                              },
                            }}
                            // checkboxSelection
                            loading={exploreLoading}
                            rows={explorelistViewData}
                            columns={columns}
                            disableSelectionOnClick
                            getRowId={(row) => row.RecordID}
                            rowHeight={dataGridRowHeight}
                            headerHeight={dataGridHeaderFooterHeight}
                            pageSize={dataGridPageSize}
                            onPageSizeChange={(newPageSize) =>
                              setPageSize(newPageSize)
                            }
                            rowsPerPageOptions={dataGridPageSizeOption}
                            // pageSize={pageSize}
                            // onPageSizeChange={(newPageSize) =>
                            //   setPageSize(newPageSize)
                            // }
                            // rowsPerPageOptions={[5, 10, 20]}
                            pagination
                            onCellClick={(params) => {
                              const currentRow = params.row;
                              const currentcellField = params.field;
                              selectcelldata(currentRow, "E", currentcellField);

                              console.log(JSON.stringify(params));
                            }}
                            // rowCount={handleRowCount}
                            components={{
                              Toolbar: CustomToolbar,
                            }}
                            onStateChange={(stateParams) =>
                              setRowCount(stateParams.pagination.rowCount)
                            }
                            componentsProps={{
                              toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                              },
                            }}
                            getRowClassName={(params) =>
                              params.indexRelativeToCurrentPage % 2 === 0
                                ? "odd-row"
                                : "even-row"
                            }
                          />
                        </Box>
                      </Box>
                    </FormControl>
                    <FormControl sx={{ gridColumn: "span 2", gap: formGap }}>
                      <Formik
                        innerRef={ref}
                        initialValues={supmateInitialvalues}
                        onSubmit={(values, { resetForm }) => {
                          setTimeout(() => {
                            FnProductSub(values, resetForm, false);
                          }, 100);
                        }}
                        // validationSchema={SubscriptionScma}
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
                          resetForm,
                        }) => (
                          <form onSubmit={handleSubmit}>
                            <FormControl fullWidth sx={{ gap: formGap, mt: 8 }}>
                              <TextField
                                fullWidth
                                 required
                                variant="standard"
                                type="number"
                                label="No Of Employee"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                id="NoOfemployee"
                                name="NoOfemployee"
                                value={values.NoOfemployee}
                                error={
                                  !!touched.NoOfemployee &&
                                  !!errors.NoOfemployee
                                }
                                helperText={
                                  touched.NoOfemployee && errors.NoOfemployee
                                }
                                sx={{
                                  input: { textAlign: "right" },
                                  //  background: "",
                                }}
                                focused
                                // onInput = {(e) =>{
                                // e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,14)
                                // }}
                              />

                              <TextField
                                fullWidth
                                 required
                                variant="standard"
                                type="number"
                                label="No Of End User"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                id="NoOfenduser"
                                name="NoOfenduser"
                                value={values.NoOfenduser}
                                error={
                                  !!touched.NoOfenduser && !!errors.NoOfenduser
                                }
                                helperText={
                                  touched.NoOfenduser && errors.NoOfenduser
                                }
                                sx={{
                                  input: { textAlign: "right" },
                                  //  background: "",
                                }}
                                focused
                                // onInput = {(e) =>{
                                // e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,14)
                                // }}
                              />

                              <TextField
                                fullWidth
                                //  required
                                variant="standard"
                                type="number"
                                label="Price"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                id="price"
                                name="price"
                                value={values.price}
                                error={!!touched.price && !!errors.price}
                                helperText={touched.price && errors.price}
                                sx={{
                                  input: { textAlign: "right" },
                                  //  background: "",
                                }}
                                focused
                                // onInput = {(e) =>{
                                // e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,14)
                                // }}
                              />
                              <TextField
                                fullWidth
                                //  required
                                variant="standard"
                                type="number"
                                label="Offer Price"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                id="offerprice"
                                name="offerprice"
                                value={values.offerprice}
                                error={
                                  !!touched.offerprice && !!errors.offerprice
                                }
                                helperText={
                                  touched.offerprice && errors.offerprice
                                }
                                sx={{
                                  input: { textAlign: "right" },
                                  //  background: "",
                                }}
                                focused
                                // onInput = {(e) =>{
                                // e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,14)
                                // }}
                              />
                              {/* <TextField
                                                         fullWidth
                                                         variant="standard"
                                                         type="number"
                                                         label="Sort Order"
                                                         id="SortOrder"
                                                         onBlur={handleBlur}
                                                         onChange={handleChange}
                                                        //  value={values.SortOrder}
                                                         name="SortOrder"
                                                         error={
                                                           !!touched.SortOrder && !!errors.SortOrder
                                                         }
                                                         helperText={
                                                           touched.SortOrder && errors.SortOrder
                                                         }
                                                         sx={{
                                                           gridColumn: "span 2",
                                                           background: "",
                                                         }}
                                                         focused
                                                         InputProps={{
                                                           inputProps: {
                                                             style: { textAlign: "right" },
                                                           },
                                                         }}
                                                         onWheel={(e) => e.target.blur()} 
                                                         onInput={(e) => {
                                                           e.target.value = Math.max(
                                                             0,
                                                             parseInt(e.target.value)
                                                           )
                                                             .toString()
                                                             .slice(0, 11);
                                                         }}
                                                       /> */}
                            </FormControl>

                            <Box
                              display="flex"
                              padding={1}
                              justifyContent="flex-end"
                              mt="30px"
                              gap={2}
                            >
                              <LoadingButton
                                color="secondary"
                                variant="contained"
                                type="submit"
                                loading={isLoading}
                                disabled={isLoading}
                              >
                                Save
                              </LoadingButton>
                              {/* {YearFlag == "true" ? (
                                <LoadingButton
                                  color="secondary"
                                  variant="contained"
                                  type="submit"
                                  loading={loading}
                                >
                                  Save
                                </LoadingButton>
                              ) : (
                                <Button
                                  color="secondary"
                                  variant="contained"
                                  disabled={true}
                                >
                                  Save
                                </Button>
                              )} */}
                              <Button
                                color="error"
                                variant="contained"
                                onClick={() => {
                                  Swal.fire({
                                    title: `Do you want Delete?`,
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Confirm",
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      FnProductSub(values, resetForm, true);
                                    } else {
                                      return;
                                    }
                                  });
                                }}
                              >
                                Delete
                              </Button>
                              {/* {YearFlag == "true" ? (
                                <Button
                                  color="error"
                                  variant="contained"
                                  onClick={() => {  Swal.fire({
                                    title: `Do you want Delete?`,
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Confirm",
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      fnUomsave(values, resetForm, true);
                                      
                                    } else {
                                      return;
                                    }
                                  });
                                    
                                  }}
                                >
                                  Delete
                                </Button>
                              ) : (
                                <Button
                                  color="error"
                                  variant="contained"
                                  disabled={true}
                                >
                                  Delete
                                </Button>
                              )} */}
                              <Button
                                type="reset"
                                color="warning"
                                variant="contained"
                                onClick={() => {
                                  setScreen(0);
                                }}
                              >
                                Cancel
                              </Button>
                            </Box>
                            {/* {typeUom == "L" ? (
                              <Popup
                                typeUom
                                title="UOM"
                                openPopup={openUOMPopup}
                                setOpenPopup={setOpenUOMPopup}
                              >
                                <Listviewpopup
                                  accessID="2005"
                                  screenName="UOM"
                                  childToParent={childToParent}
                                />
                              </Popup>
                            ) : (
                              <Popup
                                typeUom
                                title="UOM"
                                openPopup={openUOMPopup}
                                setOpenPopup={setOpenUOMPopup}
                              >
                                <Listviewpopup
                                  accessID="2005"
                                  screenName="UOM"
                                  filterName="Type"
                                  filterValue={uomType}
                                  childToParent={childToParent}
                                />
                              </Popup>
                            )} */}
                          </form>
                        )}
                      </Formik>
                    </FormControl>
                  </Box>
                </Box>
              )}
            </Formik>
            {/* </Box> */}
          </Paper>
        ) : (
          false
        )}
      </Box>
    </React.Fragment>
  );
};

export default EditProductSubScription;
