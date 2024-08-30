import {
  TextField,
  Box,
  Typography,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  Tooltip,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
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
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  getFetchData,
  postData,
  explorePostData,
} from "../../../store/reducers/Formapireducer";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { tokens } from "../../../Theme";
import React, { useState, useEffect, } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { BinSchema } from "../../Security/validation";
// import {  HsnSchema } from "../../Security/validation";
// import CryptoJS from "crypto-js";
const Editbin = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  console.log(params);
  const dispatch = useDispatch();
  const theme = useTheme();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  var parentID = params.filtertype;
  const data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const YearFlag = sessionStorage.getItem("YearFlag");
  const getLoading = useSelector((state) => state.formApi.getLoading);
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
    bincode: data.Code,
    binname: data.Name,
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
      Code: values.bincode,
      Name: values.binname,
      SortOrder: values.sortorder,
      Disable: isCheck,
      LocationRecordID: parentID,
      Finyear,
      CompanyID,
    };

    const data = await dispatch(postData({ accessID, action, idata }));
    console.log(data);
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      navigate(
        `/Apps/Secondarylistview/TR129/Bins/${params.filtertype}/${params.parentID}`
      );
    } else {
      toast.error(data.payload.Msg);
    }
  };

  /**************************************Shelves***************** */

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
        fetchExplorelitview("TR130", "Shelves", `BinsRecordID=${recID}`, "")
      );
      selectCellData({ rowData: {}, mode: "A", field: "" });
    }
  };

  // search

  const VISIBLE_FIELDS = ["SLNO", "Code", "Name", "action"];
  const columns = React.useMemo(
    () =>
      explorelistViewcolumn.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
    [explorelistViewcolumn]
  );

  /******************Employee values assign a state variale******************** */
  const selectCellData = ({ rowData, mode, field }) => {
    setMode(mode);

    if (mode == "A") {
      setShelvesdata({
        RecordID: "",
        Code: "",
        Name: "",
        SortOrder: "",
      });
    } else {
      if (field == "action") {
        console.log(rowData);
        setShelvesdata({
          RecordID: rowData.RecordID,
          Code: rowData.Code,
          Name: rowData.Name,
          SortOrder: rowData.SortOrder,
        });
      }
    }
  };
  // **********Grid header function************
  const [rowCount, setRowCount] = useState(0);
  const [Mode, setMode] = useState("A");
  const [shelvesdata, setShelvesdata] = useState({
    RecordID: "",
    Code: "",
    Name: "",
    SortOrder: "",
  });
  function Shelves() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>Shelves</Typography>
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
  const ShelvesInitialValue = {
    bincode: data.Code,
    binname: data.Name,
    shelvescode: shelvesdata.Code,
    shelvesname: shelvesdata.Name,
    sortorder: shelvesdata.SortOrder,
  };

  const FnShelvessave = async (values, resetForm, del) => {
    let action =
      Mode === "A" && !del
        ? "insert"
        : Mode === "E" && del
        ? "harddelete"
        : "update";
    const idata = {
      RecordID: shelvesdata.RecordID,
      Code: values.shelvescode,
      Name: values.shelvesname,
      SortOrder: values.sortorder,
      BinsRecordID: recID,
      Disable:"N"
    };
    // console.log("save" + JSON.stringify(saveData));

    const response = await dispatch(
      explorePostData({ accessID: "TR130", action, idata })
    );
    if (response.payload.Status == "Y") {
      dispatch(
        fetchExplorelitview("TR130", "Shelves", `BinsRecordID=${recID}`, "")
      );

      toast.success(response.payload.Msg);

      selectCellData({ rowData: {}, mode: "A", field: "" });
      resetForm();
    } else {
      toast.error(response.payload.Msg);
    }
  };

  const fnLogOut = (props) => {
    Swal.fire({
      title: `Do you want ${props}?`,
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
            `/Apps/Secondarylistview/TR129/Bins/${params.filtertype}/${params.parentID}`
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
                  navigate("/Apps/TR014/Company");
                }}
              >
                Company
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/TR128/Location/${params.parentID}`
                  );
                }}
              >
                Location
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/TR129/Bins/${params.filtertype}/${params.parentID}`
                  );
                }}
              >
                Bin
              </Typography>
              {show == "1" ? (
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  Shelves & Racks
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
                <MenuItem value={0}>Bin</MenuItem>
                <MenuItem value={1}>Shelves & Racks</MenuItem>
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

      {!getLoading && show == 0 ? (
        <Box m="20px">
          <Formik
            initialValues={InitialValue}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                Fnsave(values);
              }, 100);
            }}
            validationSchema={BinSchema}
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
                      name="bincode"
                      type="text"
                      id="bincode"
                      label="Bin Code"
                      variant="filled"
                      focused
                      value={values.bincode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.bincode && !!errors.bincode}
                      helperText={touched.bincode && errors.bincode}
                      autoFocus
                    />
                    <TextField
                      name="binname"
                      type="text"
                      id="binname"
                      label="Bin Name"
                      variant="filled"
                      focused
                      value={values.binname}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.binname && !!errors.binname}
                      helperText={touched.binname && errors.binname}
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
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 8);
                      }}
                    />
                    <Box>
                      <Field
                        //  size="small"
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
                      navigate(
                        `/Apps/Secondarylistview/TR129/Bins/${params.filtertype}/${params.parentID}`
                      );
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
      {!getLoading && show == "1" ? (
        <Box m="10px">
          <Formik
            initialValues={ShelvesInitialValue}
            onSubmit={(values, { resetForm }) => {
              setTimeout(() => {
                FnShelvessave(values, resetForm, false);
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
                    name="bincode"
                    type="text"
                    id="bincode"
                    label="Bin Code"
                    variant="filled"
                    focused
                    required
                    value={values.bincode}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{ gridColumn: "span 2" }}
                    // error={!!touched.code && !!errors.code}
                    // helperText={touched.code && errors.code}

                    autoFocus
                  />
                  <TextField
                    name="binname"
                    type="text"
                    id="binname"
                    label="Bin Name"
                    variant="filled"
                    focused
                    sx={{ gridColumn: "span 2" }}
                    value={values.binname}
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
                          Toolbar: Shelves,
                        }}
                        onStateChange={(stateParams) =>
                          setRowCount(stateParams.pagination.rowCount)
                        }
                        loading={exploreLoading}
                        componentsProps={{
                          toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                          },
                        }}
                      />
                    </Box>
                  </Box>

                  <FormControl
                    fullWidth
                    sx={{ gridColumn: "span 2", gap: "40px" }}
                  >
                    <TextField
                      name="shelvescode"
                      type="text"
                      id="shelvescode"
                      label="Shelves Code"
                      variant="filled"
                      focused
                      value={values.shelvescode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      // error={!!touched.name && !!errors.name}
                      // helperText={touched.name && errors.name}

                      autoFocus
                    />
                    <TextField
                      name="shelvesname"
                      type="text"
                      id="shelvesname"
                      label="Shelves Name"
                      variant="filled"
                      focused
                      value={values.shelvesname}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      // error={!!touched.name && !!errors.name}
                      // helperText={touched.name && errors.name}

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
                      //   error={!!touched.SortOrder && !!errors.SortOrder}
                      //   helperText={touched.SortOrder && errors.SortOrder}
                      sx={{ background: "#fff6c3" }}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 8);
                      }}
                    />
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
                      onClick={() => FnShelvessave(values, resetForm, true)}
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
                  <Button onClick={() =>  setScreen(0)} type="reset" color="warning" variant="contained">
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
    </React.Fragment>
  );
};

export default Editbin;
