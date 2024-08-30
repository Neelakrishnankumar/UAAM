import {
  TextField,
  Box,
  Typography,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  FormControlLabel,
  Tooltip,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  useTheme,
  Breadcrumbs,
  LinearProgress,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { Field, Formik } from "formik";
import { CheckBox } from "@mui/icons-material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { gradeSchema } from "../../Security/validation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  fetchApidata,
  getFetchData,
  postApidata,
  postData,
  explorePostData,
} from "../../../store/reducers/Formapireducer";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import Listviewpopup from "../Lookup";
import Popup from "../popup";
import { tokens } from "../../../Theme";
import React, { useState, useEffect, useRef } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { FunctionSchema } from "../../Security/validation";
// import {  HsnSchema } from "../../Security/validation";
// import CryptoJS from "crypto-js";
const Editfunction = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  const data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const location = useLocation();
  const [pageSize, setPageSize] = React.useState(10);
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  const colors = tokens(theme.palette.mode);

  // *************** INITIALVALUE  *************** //

  const InitialValue = {
    code: data.Code,
    name: data.Description,
    sortorder: data.SortOrder,
    disable: data.Disable === "Y" ? true : false,
  };

  const Fnsave = async (values) => {
    let action = mode === "A" ? "insert" : "update";
    var isCheck = "N";
    if (values.disable == true) {
      isCheck = "Y";
    }
    const idata = {
      RecordID: recID,
      Code: values.code,
      Description: values.name,
      SortOrder: values.sortorder,
      Disable: isCheck,
      Finyear,
      CompanyID,
    };

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate("/Apps/TR121/Functions");
    } else {
      toast.error(response.payload.Msg);
    }
  };

  /**************************************Employee***************** */

  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );
  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );
  const exploreLoading = useSelector((state) => state.exploreApi.loading);

  const [show, setScreen] = React.useState("0");
  // **********ScreenChange Function*********
  const screenChange = (event) => {
    setScreen(event.target.value);
    if (event.target.value == "1") {
      dispatch(
        fetchExplorelitview("TR125", "Employees", `FunctionsID=${recID}`, "")
      );
      selectCellData({ rowData: {}, mode: "A", field: "" });
    }
  };
  const [funEmpRecID, setFunEmpRecID] = useState("");
  const [isPopupData, setisPopupdata] = React.useState(false);
  const [openEmployeePopup, setOpenEmployeePopup] = useState(false);
  function handleShow(type) {
    if (type == "EMPLOYEE") {
      setOpenEmployeePopup(true);
    }
  }
  const [selectEmployeeLookup, setselectEmployeeLookup] = React.useState({
    EmployeelookupRecordid: "",
    EmployeelookupCode: "",
    EmployeelookupDesc: "",
  });

  //************************** Lookup value assign type based Function *****************/
  const childToParent = (childdata, type) => {
    console.log("data---" + JSON.stringify(childdata));
    setisPopupdata(true);
    if (type == "Employees") {
      setselectEmployeeLookup({
        EmployeelookupRecordid: childdata.RecordID,
        EmployeelookupCode: childdata.Code,
        EmployeelookupDesc: childdata.Name,
      });
      // setfunctionrecID(childdata.FunctionsID)
      setOpenEmployeePopup(false);
    }
  };
  // search

  const VISIBLE_FIELDS = ["SLNO", "EmployeeCode", "EmployeeName", "action"];
  const columns = React.useMemo(
    () =>
      explorelistViewcolumn.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
    [explorelistViewcolumn]
  );

  /******************Employee values assign a state variale******************** */
  const selectCellData = ({ rowData, mode, field }) => {
    console.log(
      "🚀 ~ file: Editfunction.jsx:178 ~ selectcelldata ~ rowData:",
      rowData
    );

    setempMode(mode);

    if (mode == "A") {
      setFunEmpRecID("");
      setselectEmployeeLookup({
        EmployeelookupRecordid: "",
        EmployeelookupCode: "",
        EmployeelookupDesc: "",
      });
    } else {
      if (field == "action") {
        setFunEmpRecID(rowData.RecordID);
        setselectEmployeeLookup({
          EmployeelookupRecordid: rowData.EmployeeID,
          EmployeelookupCode: rowData.EmployeeCode,
          EmployeelookupDesc: rowData.EmployeeName,
        });
      }
    }
  };
  // **********Grid header function************
  const [rowCount, setRowCount] = useState(0);
  const [empMode, setempMode] = useState("A");

  function Employee() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>List of Employee</Typography>
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
          <Tooltip title="ADD">
            <IconButton type="reset">
              <AddOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </GridToolbarContainer>
    );
  }
  const EmployeeInitialValue = {
    code: data.Code,
    name: data.Description,
  };

  const FnEmployeesave = async (values, resetForm, del) => {
   
    let action =
      empMode === "A" && !del
        ? "insert"
        : empMode === "E" && del
        ? "harddelete"
        : "update";
    const idata = {
      RecordID: funEmpRecID,
      EmployeeID: selectEmployeeLookup.EmployeelookupRecordid,
      FunctionsID: recID,
      Finyear,
      CompanyID,
    };
    // console.log("save" + JSON.stringify(saveData));

    const response = await dispatch(
      explorePostData({ accessID: "TR125", action, idata })
    );
    if (response.payload.Status == "Y") {
      dispatch(
        fetchExplorelitview("TR125", "Employees", `FunctionsID=${recID}`, "")
      );

      toast.success(response.payload.Msg);
     
      selectCellData({ rowData: {}, mode: "A", field: "" });
      resetForm();
    } else {
      toast.error(response.payload.Msg);
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
          navigate("/Apps/TR121/Functions");
        }
      } else {
        return;
      }
    });
  };
  return (
    <React.Fragment>
    {getLoading?<LinearProgress/>:false}
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box display="flex" borderRadius="3px" alignItems="center">
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
                  setScreen(0);
                }}
              >
                Functions
              </Typography>
              {show == "1" ? (
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  Employee
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
                <MenuItem value={0}>Function</MenuItem>
                <MenuItem value={1}>Employee</MenuItem>
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
            <IconButton color="error" onClick={() => fnLogOut("Logout")}>
              <LogoutOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {show == 0 && !getLoading ? (
        <Box m="20px">
          <Formik
            initialValues={InitialValue}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                Fnsave(values);
              }, 100);
            }}
            validationSchema={FunctionSchema}
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
                      name="code"
                      type="text"
                      id="code"
                      label="Code"
                      variant="filled"
                      focused
                      required
                      value={values.code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.code && !!errors.code}
                      helperText={touched.code && errors.code}
                      autoFocus
                    />
                    <TextField
                      name="name"
                      type="text"
                      id="name"
                      label="Name"
                      variant="filled"
                      focused
                      value={values.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                      autoFocus
                    />

                    <TextField
                      name="sortorder"
                      type="number"
                      id="sortorder"
                      label="Sort Order"
                      variant="filled"
                      focused
                      value={values.sortorder}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.sortorder && !!errors.sortorder}
                      helperText={touched.sortorder && errors.sortorder}
                      sx={{ background: "#fff6c3" }}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                      onWheel={(e) => e.target.blur()} 
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 8);
                      }}
                    />
                    <Box>
                      <Field
                        type="checkbox"
                        name="disable"
                        id="disable"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        as={Checkbox}
                        label="Disable"
                      />

                      <FormLabel focused={false}>Disable</FormLabel>
                    </Box>
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                  {YearFlag == "true" ? (
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
                      disabled={true}
                    >
                      Save
                    </Button>
                  )}
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => {
                      navigate("/Apps/TR121/Functions");
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      ) : (
        false
      )}
      {show == "1" ? (
        <Box m="10px">
          <Formik
            initialValues={EmployeeInitialValue}
            onSubmit={(values, { resetForm }) => {
              setTimeout(() => {
                FnEmployeesave(values, resetForm, false);
              }, 100);
            }}
            //  validationSchema={ HsnSchema}
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
              <form
                onSubmit={handleSubmit}
                onReset={() => {
                  selectCellData({ rowData: {}, mode: "A", field: "" });
                  resetForm();
                }}
              >
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
                  {/* <FormControl
                    fullWidth
                    sx={{ gridColumn: "span 2", gap: "40px" }}
                  > */}
                  <TextField
                    name="code"
                    type="text"
                    id="code"
                    label="Code"
                    variant="filled"
                    focused
                    required
                    value={values.code}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{ gridColumn: "span 2" }}
                    // error={!!touched.code && !!errors.code}
                    // helperText={touched.code && errors.code}

                    autoFocus
                  />
                  <TextField
                    name="name"
                    type="text"
                    id="name"
                    label="Name"
                    variant="filled"
                    focused
                    sx={{ gridColumn: "span 2" }}
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    // error={!!touched.name && !!errors.name}
                    // helperText={touched.name && errors.name}

                    autoFocus
                  />
                  {/* </FormControl> */}

                  <Box sx={{ gridColumn: "span 2" }}>
                    <Box
                      height="350px"
                      sx={{
                        "& .MuiDataGrid-root": {
                          // border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                          // borderBottom: "none",
                        },
                        "& .name-column--cell": {
                          color: colors.greenAccent[300],
                        },
                        "& .MuiDataGrid-columnHeaders": {
                          backgroundColor: colors.blueAccent[800],
                          // borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                          backgroundColor: colors.primary[400],
                        },
                        "& .MuiDataGrid-footerContainer": {
                          // borderTop: "none",
                          backgroundColor: colors.blueAccent[800],
                        },
                        "& .MuiCheckbox-root": {
                          color: `${colors.greenAccent[200]} !important`,
                        },
                      }}
                    >
                      <DataGrid
                        // checkboxSelection
                        loading={exploreLoading}
                        rows={explorelistViewData}
                        columns={columns}
                        disableSelectionOnClick
                        getRowId={(row) => row.RecordID}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) =>
                          setPageSize(newPageSize)
                        }
                        onCellClick={(params) => {
                          selectCellData({
                            rowData: params.row,
                            mode: "E",
                            field: params.field,
                          });
                        }}
                        rowsPerPageOptions={[5, 10, 20]}
                        pagination
                        components={{
                          Toolbar: Employee,
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
                      />
                    </Box>
                  </Box>

                  <FormControl sx={{ gridColumn: "span 2", gap: "30px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        id="employee"
                        label="Employee"
                        variant="filled"
                        focused
                        required
                        inputProps={{ tabIndex: "-1" }}
                        value={selectEmployeeLookup.EmployeelookupCode}
                      />
                      <IconButton
                        onClick={() => handleShow("EMPLOYEE")}
                        sx={{ height: 40, width: 40 }}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>
                      <TextField
                        id="employee"
                        variant="filled"
                        fullWidth
                        inputProps={{ tabIndex: "-1" }}
                        focused
                        value={selectEmployeeLookup.EmployeelookupDesc}
                      />
                    </Box>
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="end" mt="30px" gap={2}>
                  {YearFlag == "true" ? (
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
                      disabled={true}
                    >
                      Save
                    </Button>
                  )}
                  {YearFlag == "true" ? (
                    <Button
                      onClick={() =>{ Swal.fire({
                        title: `Do you want Delete?`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Confirm",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          FnEmployeesave(values, resetForm, true);
                          
                        } else {
                          return;
                        }
                      });
}}
                      color="error"
                      variant="contained"
                    >
                      Delete
                    </Button>
                  ) : (
                    <Button color="error" variant="contained" disabled={true}>
                      Delete
                    </Button>
                  )}
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
                <Popup
                  title="Employees"
                  openPopup={openEmployeePopup}
                  setOpenPopup={setOpenEmployeePopup}
                >
                  <Listviewpopup
                    accessID="2024"
                    screenName="Employees"
                    childToParent={childToParent}
                  />
                </Popup>
              </form>
            )}
          </Formik>
        </Box>
      ) : (
        false
      )}
    </React.Fragment>
  );
};

export default Editfunction;
