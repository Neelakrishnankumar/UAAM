import React from "react";
import {
  TextField,
  Box,
  Typography,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  Breadcrumbs,
  LinearProgress,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Formik } from "formik";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApidata,
  getFetchData,
  postApidata,
  postData,
} from "../../../store/reducers/Formapireducer";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect, useState, useRef } from "react";
import Popup from "../popup";
import Listviewpopup from "../Lookup";
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { FinanceSchema } from "../../Security/validation";
import { fileUpload } from "../../../store/reducers/Imguploadreducer";
import store from "../../../index";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import { financeentrySchema } from "../../Security/validation";

const Editfinance = () => {
  const dispatch = useDispatch();
  const params = useParams();
  console.log("params", params);
  const accessID = params.accessID;
  const recID = params.id;
  const mode = params.Mode;
  var parentID = params.parentID;
  const filtertype = params.filtertype;
  const location = useLocation();
  const navigate = useNavigate();
  const data = useSelector((state) => state.formApi.Data);
  const [loading, setLoading] = useState(false);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  const [ImageName, setImgName] = useState("");
  const initialValue = {
    date: data.FEDate,
    referenceifany: data.Referenceifany,
    amount: data.Amount,
    comments: data.Comments,
    approvedby: data.Approvedby,
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const fnSave = async (values) => {
    setLoading(true);

    const idata = {
      RecordID: recID,
      FEDate: values.date,
      Referenceifany: values.referenceifany,
      Amount: values.amount,
      Comments: values.comments,
      // Approvedby:values.approvedby,
      OverheadsRecordID: selectOHLookupData.OHlookupRecordid,
      Attachment: ImageName ? ImageName : data.Attachment,
      FinanceCategoryType: parentID,
      Approvedby: selectEMPLOYEELookupData.EMPLOYEElookupRecordid,
      Finyear,
      CompanyID,
    };

    //   var type = "";
    //   if (mode == "A") {
    //     type = "insert";
    //   } else {
    //     type = "update";
    //   }

    // const data = await dispatch(postApidata(accessID,type,idata))
    let action = mode === "A" ? "insert" : "update";
    const responce = await dispatch(postData({ accessID, action, idata }));

    if (responce.payload.Status == "Y") {
      toast.success(responce.payload.Msg);
      // setIni(true)
      setLoading(false);
      navigate(
        `/Apps/Secondarylistview/TR086/Finance Entry/${parentID}/${filtertype}`
      );
    } else {
      toast.error(responce.payload.Msg);
      setLoading(false);
    }
  };

  const [isPopupData, setisPopupdata] = React.useState(false);
  const [selectOHLookupData, setselectOHLookupData] = React.useState({
    OHlookupRecordid: "",
    OHlookupCode: "",
    OHlookupDesc: "",
  });
  if (isPopupData == false) {
    selectOHLookupData.OHlookupRecordid = data.OverheadRecordID;
    selectOHLookupData.OHlookupCode = data.Code;
    selectOHLookupData.OHlookupDesc = data.Name;
  }
  const [selectEMPLOYEELookupData, setselectEMPLOYEELookupData] =
    React.useState({
      EMPLOYEElookupRecordid: "",
      EMPLOYEElookupCode: "",
      EMPLOYEElookupDesc: "",
    });
  if (isPopupData == false) {
    selectEMPLOYEELookupData.EMPLOYEElookupRecordid = data.Approvedby;
    selectEMPLOYEELookupData.EMPLOYEElookupCode = data.ApprovedCode;
    selectEMPLOYEELookupData.EMPLOYEElookupDesc = data.ApprovedName;
  }
  const [openOHPopup, setOpenOHPopup] = useState(false);
  const [openEMPLOYEEPopup, setOpenEMPLOYEEPopup] = useState(false);
  function handleShow(type) {
    if (type == "OH") {
      setOpenOHPopup(true);
    }
    if (type == "EMP" || type == "PRD" || type == "MAT" || type == "FIA") {
      setOpenEMPLOYEEPopup(true);
    }
  }

  //************************** Lookup value assign type based Function *****************/
  const childToParent = (childdata, type) => {
    console.log("type---" + type);
    console.log("Data---" + JSON.stringify(childdata));

    if (type == "OverHead") {
      setisPopupdata(true);
      setselectOHLookupData({
        OHlookupRecordid: childdata.RecordID,
        OHlookupCode: childdata.Code,
        OHlookupDesc: childdata.Name,
      });
      setOpenOHPopup(false);
    }
    if (
      type == "Employee" ||
      type == "Products" ||
      type == "Material" ||
      type == "Fixed Assets"
    ) {
      setisPopupdata(true);
      setselectEMPLOYEELookupData({
        EMPLOYEElookupRecordid: childdata.RecordID,
        EMPLOYEElookupCode: childdata.Code,
        EMPLOYEElookupDesc: childdata.Name,
      });
      setOpenEMPLOYEEPopup(false);
    }
  };
  const ref = useRef(null);
  // *************** GET FILES FROM INPUT *************** //

  const getFileChange = async (event) => {
    setImgName(event.target.files[0]);

    console.log(event.target.files[0]);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "attachments");

    const fileData = await dispatch(fileUpload({ formData }));
    setImgName(fileData.payload.name);
    console.log(">>>", fileData.payload);
    console.log(
      "🚀 ~ file: Editdeliverychalan.jsx:1143 ~ getFileChange ~ fileData:",
      fileData
    );
    if (fileData.payload.Status == "Y") {
      // console.log("I am here");
      toast.success(fileData.payload.Msg);
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
          navigate(
            `/Apps/Secondarylistview/TR086/Finance Entry/${parentID}/${filtertype}`
          );
        }
      } else {
        return;
      }
    });
  };
  return (
    <React.Fragment>
      {getLoading ? <LinearProgress /> : false}
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box display="flex" borderRadius="3px" alignItems="center">
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
                navigate(`/Apps/TR136/Finance%20Category`);
              }}
            >
              Finance Category
            </Typography>

            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate(
                  `/Apps/Secondarylistview/TR086/Finance Entry/${parentID}/${filtertype}`
                );
              }}
            >
              Finance Entry
            </Typography>

            {/* <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  
                >
                  {mode === "A" ? "New"}
                </Typography> */}
          </Breadcrumbs>
        </Box>
        <Box display="flex">
          <IconButton color="error" onClick={() => fnLogOut("Close")}>
            <ResetTvIcon />
          </IconButton>
          <IconButton>
            <LogoutOutlinedIcon
              color="error"
              onClick={() => fnLogOut("Logout")}
            />
          </IconButton>
        </Box>
      </Box>

      {!getLoading ? (
        <Box m="20px">
          <Formik
            initialValues={initialValue}
            onSubmit={(values, { resetForm }) => {
              setTimeout(() => {
                fnSave(values);
              }, 100);
            }}
            validationSchema={ financeentrySchema}
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
                    <TextField
                      name="date"
                      type="date"
                      id="date"
                      label="Date"
                      variant="filled"
                      focused
                      value={values.date}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputFormat="YYYY-MM-DD"
                      error={!!touched.date && !!errors.date}
                      helperText={touched.date && errors.date}
                      autoFocus
                    />
                    <TextField
                      name="referenceifany"
                      type="text"
                      id="referenceifany"
                      label="Reference If Any"
                      variant="filled"
                      focused
                      value={values.referenceifany}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        !!touched.referenceifany && !!errors.referenceifany
                      }
                      helperText={
                        touched.referenceifany && errors.referenceifany
                      }
                      autoFocus
                    />

                    <FormControl sx={{ gridColumn: "span 2", display: "flex" }}>
                      <FormControl
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <TextField
                          id="outlined-basic"
                          label="ID"
                          variant="filled"
                          value={selectOHLookupData.OHRecordID}
                          focused
                          sx={{ display: "none" }}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Over Head"
                          variant="filled"
                          value={selectOHLookupData.OHlookupCode}
                          focused
                          // required
                          inputProps={{ tabIndex: "-1" }}
                        />
                        <IconButton
                          sx={{ height: 40, width: 40 }}
                          onClick={() => handleShow("OH")}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>
                        {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                        <TextField
                          id="outlined-basic"
                          label=""
                          variant="filled"
                          value={selectOHLookupData.OHlookupDesc}
                          fullWidth
                          inputProps={{ tabIndex: "-1" }}
                          focused
                        />
                      </FormControl>
                    </FormControl>

                    <TextField
                      name="amount"
                      type="text"
                      id="amount"
                      label="Amount"
                      variant="filled"
                      focused
                      value={values.amount}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.amount && !!errors.amount}
                      helperText={touched.amount && errors.amount}
                      autoFocus
                    />
                    <TextField
                      name="comments"
                      type="text"
                      id="comments"
                      label="comments"
                      variant="filled"
                      focused
                      value={values.comments}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.comments && !!errors.comments}
                      helperText={touched.comments && errors.comments}
                      autoFocus
                    />
                    {/* <TextField
                    name="approvedby"
                    type="text"
                    id="approvedby"
                    label="Approved By"
                    variant="filled"
                    focused
                    value={values.approvedby}
                    onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.approvedby && !!errors.approvedby}
                    helperText={touched.approvedby && errors.approvedby}
                    
                    autoFocus
                    /> */}
                    {parentID == "P" ? (
                      <FormControl
                        sx={{ gridColumn: "span 2", display: "flex" }}
                      >
                        <FormControl
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="ID"
                            variant="filled"
                            value={
                              selectEMPLOYEELookupData.EMPLOYEElookupRecordid
                            }
                            focused
                            sx={{ display: "none" }}
                          />
                          <TextField
                            id="outlined-basic"
                            label="Product"
                            variant="filled"
                            value={selectEMPLOYEELookupData.EMPLOYEElookupCode}
                            focused
                            // required
                            inputProps={{ tabIndex: "-1" }}
                          />
                          <IconButton
                            sx={{ height: 40, width: 40 }}
                            onClick={() => handleShow("PRD")}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>
                          {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                          <TextField
                            id="outlined-basic"
                            label=""
                            variant="filled"
                            value={selectEMPLOYEELookupData.EMPLOYEElookupDesc}
                            fullWidth
                            inputProps={{ tabIndex: "-1" }}
                            focused
                          />
                        </FormControl>
                      </FormControl>
                    ) : null}
                    {parentID == "E" ? (
                      <FormControl
                        sx={{ gridColumn: "span 2", display: "flex" }}
                      >
                        <FormControl
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="ID"
                            variant="filled"
                            value={selectEMPLOYEELookupData.EMPLOYEERecordID}
                            focused
                            sx={{ display: "none" }}
                          />
                          <TextField
                            id="outlined-basic"
                            label="Employee"
                            variant="filled"
                            value={selectEMPLOYEELookupData.EMPLOYEElookupCode}
                            focused
                            // required
                            inputProps={{ tabIndex: "-1" }}
                          />
                          <IconButton
                            sx={{ height: 40, width: 40 }}
                            onClick={() => handleShow("EMP")}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>
                          {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                          <TextField
                            id="outlined-basic"
                            label=""
                            variant="filled"
                            value={selectEMPLOYEELookupData.EMPLOYEElookupDesc}
                            fullWidth
                            inputProps={{ tabIndex: "-1" }}
                            focused
                          />
                        </FormControl>
                      </FormControl>
                    ) : null}
                    {parentID == "M" ? (
                      <FormControl
                        sx={{ gridColumn: "span 2", display: "flex" }}
                      >
                        <FormControl
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="ID"
                            variant="filled"
                            value={
                              selectEMPLOYEELookupData.EMPLOYEElookupRecordid
                            }
                            focused
                            sx={{ display: "none" }}
                          />
                          <TextField
                            id="outlined-basic"
                            label="Material"
                            variant="filled"
                            value={selectEMPLOYEELookupData.EMPLOYEElookupCode}
                            focused
                            // required
                            inputProps={{ tabIndex: "-1" }}
                          />
                          <IconButton
                            sx={{ height: 40, width: 40 }}
                            onClick={() => handleShow("MAT")}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>
                          {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                          <TextField
                            id="outlined-basic"
                            label=""
                            variant="filled"
                            value={selectEMPLOYEELookupData.EMPLOYEElookupDesc}
                            fullWidth
                            inputProps={{ tabIndex: "-1" }}
                            focused
                          />
                        </FormControl>
                      </FormControl>
                    ) : null}
                    {parentID == "F" ? (
                      <FormControl
                        sx={{ gridColumn: "span 2", display: "flex" }}
                      >
                        <FormControl
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="ID"
                            variant="filled"
                            value={
                              selectEMPLOYEELookupData.EMPLOYEElookupRecordid
                            }
                            focused
                            sx={{ display: "none" }}
                          />
                          <TextField
                            id="outlined-basic"
                            label="Fixed Asset"
                            variant="filled"
                            value={selectEMPLOYEELookupData.EMPLOYEElookupCode}
                            focused
                            // required
                            inputProps={{ tabIndex: "-1" }}
                          />
                          <IconButton
                            sx={{ height: 40, width: 40 }}
                            onClick={() => handleShow("FIA")}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton>
                          {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                          <TextField
                            id="outlined-basic"
                            label=""
                            variant="filled"
                            value={selectEMPLOYEELookupData.EMPLOYEElookupDesc}
                            fullWidth
                            inputProps={{ tabIndex: "-1" }}
                            focused
                          />
                        </FormControl>
                      </FormControl>
                    ) : null}
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                  <IconButton
                    size="large"
                    color="warning"
                    aria-label="upload picture"
                    component="label"
                  >
                    <input
                      hidden
                      accept="all/*"
                      type="file"
                      onChange={getFileChange}
                    />
                    <PictureAsPdfOutlinedIcon />
                  </IconButton>
                  <Button
                    variant="contained"
                    component={"a"}
                    onClick={() => {
                      data.Attachment || ImageName
                        ? window.open(
                            ImageName
                              ? store.getState().globalurl.attachmentUrl +
                                  ImageName
                              : store.getState().globalurl.attachmentUrl +
                                  data.Attachment,
                            "_blank"
                          )
                        : toast.error("Please Upload File");
                    }}
                  >
                    View
                  </Button>
                  <LoadingButton
                    loading={loading}
                    variant="contained"
                    color="secondary"
                    type="submit"
                  >
                    SAVE
                  </LoadingButton>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      navigate(
                        `/Apps/Secondarylistview/TR086/Finance Entry/${parentID}/${filtertype}`
                      );
                    }}
                  >
                    CANCEL
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          <Popup
            title="OverHead"
            openPopup={openOHPopup}
            setOpenPopup={setOpenOHPopup}
          >
            <Listviewpopup
              accessID="2032"
              screenName="OverHead"
              childToParent={childToParent}
              filterName={"FinanceCategoryType"}
              filterValue={parentID}
            />
          </Popup>
          <Popup
            title={
              parentID == "E"
                ? "Employee"
                : parentID == "P"
                ? "Products"
                : parentID == "F"
                ? "Fixed Assets"
                : "Material"
            }
            openPopup={openEMPLOYEEPopup}
            setOpenPopup={setOpenEMPLOYEEPopup}
          >
            <Listviewpopup
              accessID={
                parentID == "E"
                  ? "2024"
                  : parentID == "P"
                  ? "2002"
                  : parentID == "F"
                  ? "2055"
                  : "2000"
              }
              screenName={
                parentID == "E"
                  ? "Employee"
                  : parentID == "P"
                  ? "Products"
                  : parentID == "F"
                  ? "Fixed Assets"
                  : "Material"
              }
              childToParent={childToParent}
            />
          </Popup>
        </Box>
      ) : (
        false
      )}
    </React.Fragment>
  );
};

export default Editfinance;
