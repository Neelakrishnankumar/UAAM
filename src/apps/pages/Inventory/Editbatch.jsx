import {
  Box,
  Button,
  TextField,
  IconButton,
  FormControl,
  Typography,
  Tooltip,
  Breadcrumbs,
  LinearProgress,
} from "@mui/material";
import { Formik, Field } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../index";
import {
  fetchApidata,
  getFetchData,
  postApidata,
  postData,
  StockProcessApi,
} from "../../../store/reducers/Formapireducer";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";

import { BatchIssueSchema } from "../../Security/validation";
import Listviewpopup from "../Lookup";
import Popup from "../popup";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
const Editbatch = () => {
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  var Type = params.Type;
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");

  const Data = useSelector((state) => state.formApi.Data);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const location = useLocation();
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);

  const [ini, setIni] = useState(true);
  const [loading, setLoading] = useState(false);
  const style = {
    height: "55px",
    border: "2px solid #1769aa ",
    borderRadius: "5px",
    backgroundColor: "#EDEDED",
  };
  const [isPopupData, setisPopupdata] = React.useState(false);
  const [openBPpopup, setOpenBPpopup] = useState(false);
  const [selectBPLookupData, setselectBPLookupData] = React.useState({
    BPlookupRecordid: "",
    BPlookupCode: "",
    BPlookupDesc: "",
    BPlookupOrderQty: "",
    BPlookupCCompleteQty: "",
    BPlookupPrdCompleteQty: "",
    BPlookupPakCompleteQty: "",
  });

  if (isPopupData == false) {
    selectBPLookupData.BPlookupRecordid = Data.ProductioncardRecordID;
    // selectBPLookupData.BPlookupCode = Data.CountryCode;
    selectBPLookupData.BPlookupDesc = Data.ProductionNumber;
  }
  function handleShow(type) {
    if (type == "BP") {
      setOpenBPpopup(true);
    }
  }
  //************************** Lookup value assign type based Function *****************/
  const childToParent = (childdata, type) => {
    console.log("type---" + type);
    console.log("Data---" + JSON.stringify(childdata));

    if (type == "Production Card") {
      setisPopupdata(true);
      setselectBPLookupData({
        BPlookupRecordid: childdata.RecordID,
        BPlookupCode: childdata.Name,
        BPlookupDesc: childdata.Code,
        BPlookupOrderQty: childdata.OrderQty,
        BPlookupCCompleteQty: childdata.CCCompleteQty,
        BPlookupPrdCompleteQty: childdata.PrdCompleteQty,
        BPlookupPakCompleteQty: childdata.PakCompleteQty,
      });
      setOpenBPpopup(false);
    }
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  var apiData = "";
  apiData = {
    BatchDate: Data.BatchDate,
    BatchQty: Data.BatchQty,
    Reference: Data.Reference,
    Status: Data.Status,
    AdditionalQTY: Data.AdditionalQTY,
  };

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  // inputFormat="YYYY-MM-DD"
  //*******Assign supplymaster values from Database in  Yup initial value******* */
  const initialValues = {
    BatchDate: mode == "A" ? today : apiData.BatchDate,
    BatchQty: Number(apiData.BatchQty).toFixed(4),
    Reference: mode == "A" ? Data.Reference : Data.Reference + " / " + Year,
    Status: mode == "A" ? "Y" : Data.Status,
    AdditionalQTY: apiData.AdditionalQTY,
  };
  
  // **********Save Function*****************
  const fnSave = async (values) => {
    if (Data.Process == "Y") {
      toast.error("Your data Already Processed edit not Applicable");
      return;
    }
    if (mode != "A") {
      toast.error("Only Insert");
      setLoading(false);
    } else {
      if (values.BatchQty == 0) {
        toast.error("Please Enter Batch Quantity");
        setLoading(false);
        return;
      }

      if (
        Type == "CC" &&
        selectBPLookupData.BPlookupOrderQty < values.BatchQty
      ) {
        toast.error(
          `Quantity should be less than Order Quantity ${selectBPLookupData.BPlookupOrderQty} `
        );
        setLoading(false);
        return;
      }

      if (
        Type == "CC" &&
        selectBPLookupData.BPlookupOrderQty < values.BatchQty
      ) {
        toast.error(
          `Quantity should be less than Order Quantity ${selectBPLookupData.BPlookupOrderQty} `
        );
        setLoading(false);
        return;
      }

      if (values.checkbox == true) {
        values.checkbox = "Y";
      } else {
        values.checkbox = "N";
      }

      console.log(values);

      var idata = {
        RecordID: recID,
        BatchQty: values.BatchQty,
        Reference: values.Reference,
        YearID: Year,
        Status: values.Status,
        ProductioncardRecordID: selectBPLookupData.BPlookupRecordid,
        Type: Type,
        BatchDate: values.BatchDate,
        CompletedQTY: 0,
        ReworkQTY: 0,
        DamagedQTY: 0,
        AdditionalQTY: values.AdditionalQTY,
        CompletionDate: "",
        Finyear,
        CompanyID,
      };

      let action = mode === "A" ? "insert" : "update";
      const data = await dispatch(postData({ accessID, action, idata }));
      if (data.payload.Status == "Y") {
        toast.success(data.payload.Msg);
        setIni(true);
        setLoading(false);
        navigate(`/Apps/Secondarylistview/TR074/BATCHS/${Type}`);
      } else {
        toast.error(data.payload.Msg);
        setLoading(false);
      }
    }
  };

  var apprval = "";
  if (accessID == "TR074") {
    if (Type == "CC") {
      apprval = "Cutting Component";
    }
    if (Type == "PC") {
      apprval = "Production";
    }
    if (Type == "PK") {
      apprval = "Packing";
    }
  }

  const fnProcess = async () => {
    const props = { accessID, recID };
    const Data = await dispatch(StockProcessApi(props));
    console.log(
      "🚀 ~ file: Editdeliverychalan.jsx:1236 ~ fnProcess ~ Data:",
      Data
    );
    if (Data.payload.Status == "Y") {
      toast.success(Data.payload.Msg);
      navigate(`/Apps/Secondarylistview/TR074/BATCHS/${Type}`);
    } else {
      toast.success(Data.payload.Msg);
    }
  };
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
          navigate(`/Apps/Secondarylistview/TR074/BATCHS/${Type}`);
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
                  navigate(`/Apps/TR076/Batches`);
                }}
              >
                Batches
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(`/Apps/Secondarylistview/TR074/BATCHS/${Type}`);
                }}
              >
                {mode === "A" ? "New" : apprval}
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box display="flex">
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

        {!getLoading ? (
          <Box m="20px">
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => {
                setTimeout(() => {
                  fnSave(values);
                  // alert("hai");
                }, 100);
              }}
              validationSchema={BatchIssueSchema}
              enableReinitialize={ini}
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
                setFieldError,
              }) => (
                <form onSubmit={handleSubmit}>
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
                    <FormControl
                      fullWidth
                      sx={{ gridColumn: "span 2", gap: "40px" }}
                    >
                      <FormControl
                        sx={{
                          gridColumn: "span 2",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <TextField
                          id="outlined-basic"
                          label="ID"
                          variant="filled"
                          value={selectBPLookupData.BPlookupRecordid}
                          focused
                          sx={{ display: "none" }}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Production Card"
                          variant="filled"
                          value={selectBPLookupData.BPlookupDesc}
                          fullWidth
                          focused
                          required
                          inputProps={{ tabIndex: "-1" }}
                        />
                        <IconButton
                          sx={{ height: 40, width: 40 }}
                          onClick={() => handleShow("BP")}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>
                        {/* <MoreHorizIcon onClick={()=>handleShow('PUR')} color='white' sx={{height:'30px',}} mt='15px' fontSize='medium' /> */}
                      </FormControl>

                      <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        value={values.BatchDate}
                        id="BatchDate"
                        name="BatchDate"
                        label="Batch Date"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputFormat="YYYY-MM-DD"
                        // error={!!touched.Code && !!errors.Code}
                        // helperText={touched.Code && errors.Code}
                        inputProps={{ maxLength: 5 }}
                        focused
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        id="BatchQty"
                        name="BatchQty"
                        value={values.BatchQty}
                        label="Quantity"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.BatchQty && !!errors.BatchQty}
                        helperText={touched.BatchQty && errors.BatchQty}
                        inputProps={{ maxLength: 5 }}
                        focused
                        sx={{ background: "#fff6c3" }}
                        onWheel={(e) => e.target.blur()} 
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 5);
                        }}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                      />
                    </FormControl>
                    <FormControl
                      fullWidth
                      sx={{ gridColumn: "span 2", gap: "40px" }}
                    >
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        id="Reference"
                        name="Reference"
                        value={values.Reference}
                        label="Batch#"
                        placeholder="Auto"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Reference && !!errors.Reference}
                        helperText={touched.Reference && errors.Reference}
                        inputProps={{ maxLength: 15, readOnly: true }}
                        focused
                      />

                      <FormControl>
                        <Field
                          as="select"
                          label="Type"
                          onChange={handleChange}
                          value={values.Status}
                          required
                          id="Status"
                          name="Status"
                          focused
                          style={style}
                        >
                          <option>Status</option>
                          <option value="Y">Yet to Start</option>
                          <option value="I">Inprogress</option>
                          <option value="C">Completed</option>
                        </Field>
                      </FormControl>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        id="AdditionalQTY"
                        name="AdditionalQTY"
                        value={values.AdditionalQTY}
                        label="Additional Qty"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        // error={!!touched.AdditionalQty && !!errors.AdditionalQty}
                        // helperText={touched.AdditionalQty && errors.AdditionalQty}

                        inputProps={{ maxLength: 5 }}
                        focused
                        onWheel={(e) => e.target.blur()} 
                        sx={{ background: "#fff6c3" }}
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 5);
                        }}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                      />
                    </FormControl>
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                    {YearFlag == "true" ? (
                      <LoadingButton
                        color="primary"
                        variant="contained"
                        onClick={fnProcess}
                        disabled={Data.Process != "Y" ? false : true}
                      >
                        Process
                      </LoadingButton>
                    ) : (
                      <Button
                        color="secondary"
                        variant="contained"
                        disabled={true}
                      >
                        Process
                      </Button>
                    )}
                    {YearFlag == "true" ? (
                      <LoadingButton
                        color="secondary"
                        variant="contained"
                        type="submit"
                        loading={loading}
                      >
                        Generate Batch
                      </LoadingButton>
                    ) : (
                      <Button
                        color="secondary"
                        variant="contained"
                        disabled={true}
                      >
                        Generate Batch
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        navigate(
                          `/Apps/Secondarylistview/TR074/BATCHS/${Type}`
                        );
                      }}
                    >
                      CANCEL
                    </Button>
                  </Box>
                  <Popup
                    title="Production Card"
                    openPopup={openBPpopup}
                    setOpenPopup={setOpenBPpopup}
                  >
                    <Listviewpopup
                      accessID="2021"
                      screenName="Production Card"
                      childToParent={childToParent}
                      filterName={"compID"}
                      filterValue={CompanyID}
                    />
                  </Popup>
                </form>
              )}
            </Formik>
          </Box>
        ) : (
          false
        )}
      </Box>
    </React.Fragment>
  );
};

export default Editbatch;
