import {
  TextField,
  Box,
  Paper,
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
import * as Yup from 'yup';
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
import React, { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { BinSchema } from "../../Security/validation";
import {
  dataGridHeaderFooterHeight,
  dataGridHeight,
  dataGridPageSize,
  dataGridRowHeight,
  formGap,
} from "../../../ui-components/utils";
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
  const rowData = location.state || {};
  console.log(rowData, "--rowData");
  var secondaryCurrentPage = parseInt(
    sessionStorage.getItem("secondaryCurrentPage")
  );
  const [pageSize, setPageSize] = React.useState(10);
  const [page, setPage] = React.useState(secondaryCurrentPage);
  const [errorMsgData, setErrorMsgData] = useState(null);
  const [validationSchema, setValidationSchema] = useState(null);
  const [validationSchema1, setValidationSchema1] = useState(null);
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/validationcms.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch validationcms.json");
        return res.json();
      })
      .then((data) => {
        setErrorMsgData(data);

        const schema = Yup.object().shape({
          binname: Yup.string().required(data.Bin.name),
        });
        setValidationSchema(schema);
        const schema1 = Yup.object().shape({
          shelvesname: Yup.string().required(data.Bin.shelvesname),
          shelvescode: Yup.string().required(data.Bin.shelvescode),

        });
        setValidationSchema1(schema1);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, []);
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  // const validationSchema = Yup.object({
  //   binname: Yup.string().required('Please fill the Bin Name')
  //     .matches(/[a-zA-Z\s/,.-]+$/, "Please enter alphabets only"),
  // });
  const colors = tokens(theme.palette.mode);
  const handlePagechange = (pageno) => {
    setPage(pageno);
    sessionStorage.setItem("secondaryCurrentPage", pageno);
  };
  // *************** INITIALVALUE  *************** //
  // const HsnSchema = Yup.object().shape({
  //   shelvescode: Yup.string()
  //     .trim()
  //     .required("Please fill the Shelves Code"),
  //   shelvesname: Yup.string()
  //     .trim()
  //     .required("Please fill the Shelves Name")
  //     .matches(/[a-zA-Z\s/,.-]+$/, "Please enter alphabets only"),
  //   sortorder: Yup.number()
  //     .nullable()
  //     .transform((_, val) => (val ? Number(val) : null)),
  //   // add other validations as needed
  // });
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
      SortOrder: values.sortorder || 0,
      Disable: isCheck,
      LocationRecordID: parentID,
      // Finyear,
      // CompanyID,
    };

    const data = await dispatch(postData({ accessID, action, idata }));
    console.log(data);
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      navigate(
        `/Apps/Secondarylistview/TR129/Bins/${params.filtertype}/${params.parentID}`, { state: rowData }
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

  const VISIBLE_FIELDS = ["slno", "Code", "Name", "action"];
  // const columns = React.useMemo(
  //   () =>
  //     explorelistViewcolumn.filter((column) =>
  //       VISIBLE_FIELDS.includes(column.field)
  //     ),
  //   [explorelistViewcolumn]
  // );
  // const columns = React.useMemo(() => {

  //   let visibleColumns = explorelistViewcolumn.filter((column) =>
  //     VISIBLE_FIELDS.includes(column.field)
  //   );


  //   if (VISIBLE_FIELDS.includes("slno")) {
  //     const slnoColumn = {
  //       field: "slno",
  //       headerName: "SL#",
  //       width: 50,
  //       sortable: false,
  //       filterable: false,
  //       valueGetter: (params) =>
  //         `${params.api.getRowIndexRelativeToVisibleRows(params.id) + 1}`,
  //     };


  //     visibleColumns = [slnoColumn, ...visibleColumns];
  //   }

  //   return visibleColumns;
  // }, [explorelistViewcolumn, VISIBLE_FIELDS]);

  const columns = React.useMemo(() => {
    let visibleColumns = explorelistViewcolumn.filter((column) =>
      VISIBLE_FIELDS.includes(column.field)
    );

    if (VISIBLE_FIELDS.includes("slno")) {

      const slnoColumn = {
        field: "slno",
        headerName: "SL#",
        width: 50,
        sortable: false,
        filterable: false,
        valueGetter: (params) =>
          page * pageSize +
          params.api.getRowIndexRelativeToVisibleRows(params.id) +
          1,
      };
      visibleColumns = [slnoColumn, ...visibleColumns];
    }

    return visibleColumns;
  }, [explorelistViewcolumn, VISIBLE_FIELDS]);
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
          <Typography>Shelves & Racks</Typography>
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
      SortOrder: values.sortorder || 0,
      BinsRecordID: recID,
      Disable: "N",
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
      title: errorMsgData.Warningmsg[props],
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
                      navigate("/Apps/TR014/Company", { state: rowData });
                    }}
                  >
                    {`Company(${rowData.CompanyName})`}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => {
                      navigate(
                        `/Apps/Secondarylistview/TR128/Location/${params.parentID}`, { state: rowData }
                      );
                    }}
                  >
                    {`Location(${rowData.LocationName})`}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => {
                      navigate(
                        `/Apps/Secondarylistview/TR129/Bins/${params.filtertype}/${params.parentID}`, { state: rowData }
                      );
                    }}
                  >
                    {mode === "E"
                      ? `Bin(${rowData.bin})`
                      : "Bin(New)"}
                    {/* {`Bin(${rowData.bin})`} */}
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
        </Paper>

        {!getLoading && show == 0 ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            {/* <Box m="20px"> */}
            <Box>
              <Formik
                initialValues={InitialValue}
                onSubmit={(values, setSubmitting) => {
                  setTimeout(() => {
                    Fnsave(values);
                  }, 100);
                }}
                validationSchema={validationSchema}
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
                      gridTemplateColumns="repeat(4 , minMax(0,1fr))"
                      sx={{
                        "& > div": {
                          gridColumn: isNonMobile ? undefined : "span 4",
                        },
                      }}
                    >
                      <FormControl
                        fullWidth
                        sx={{ gridColumn: "span 2", gap: formGap }}
                      >
                        <TextField
                          name="bincode"
                          type="text"
                          id="bincode"
                          label="Bin Code"
                          placeholder="Auto"
                          variant="standard"
                          focused
                          value={values.bincode}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.bincode && !!errors.bincode}
                          helperText={touched.bincode && errors.bincode}
                          InputProps={{ readOnly: true }}
                        // autoFocus
                        />
                        <TextField
                          name="binname"
                          type="text"
                          id="binname"
                          label={
                            <>
                              Bin Name<span style={{ color: "red", fontSize: "20px" }}> * </span>
                            </>
                          }
                          variant="standard"
                          focused
                          value={values.binname}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.binname && !!errors.binname}
                          helperText={touched.binname && errors.binname}
                          autoFocus
                        // onInvalid={(e) => {
                        //   e.target.setCustomValidity(
                        //     "Please fill the Bin Name"
                        //   );
                        // }}
                        // onInput={(e) => {
                        //   e.target.setCustomValidity("");
                        // }}
                        // required
                        />

                        <TextField
                          name="sortorder"
                          type="number"
                          id="sortorder"
                          label="Sort Order"
                          variant="standard"
                          focused
                          value={values.sortorder}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.sortorder && !!errors.sortorder}
                          helperText={touched.sortorder && errors.sortorder}
                          sx={{ background: "" }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          onInput={(e) => {
                            e.target.value = Math.max(
                              0,
                              parseInt(e.target.value)
                            )
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
                        disabled={isLoading} // Ensure it is disabled while loading
                      >
                        Save
                      </LoadingButton>

                      <Button
                        color="warning"
                        variant="contained"
                        onClick={() => {
                          navigate(
                            -1
                            // `/Apps/Secondarylistview/TR129/Bins/${params.filtertype}/${params.parentID}`
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
          </Paper>
        ) : (
          false
        )}
        {!getLoading && show == "1" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            {/* <Box m="10px"> */}
            <Formik
              initialValues={ShelvesInitialValue}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  FnShelvessave(values, resetForm, false);
                }, 100);
              }}
              validationSchema={validationSchema1}
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
                    gap={formGap}
                    padding={1}
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    {/* <FormControl
                    fullWidth
                    sx={{ gridColumn: "span 2", gap:formGap }}
                  > */}
                    <TextField
                      name="bincode"
                      type="text"
                      id="bincode"
                      label="Bin Code"
                      variant="standard"
                      focused
                      // required
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
                      variant="standard"
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
                        m="5px 0 0 0"
                        // height={dataGridHeight}
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
                          rows={explorelistViewData}
                          columns={columns}
                          disableSelectionOnClick
                          getRowId={(row) => row.RecordID}
                          rowHeight={dataGridRowHeight}
                          headerHeight={dataGridHeaderFooterHeight}
                          pageSize={pageSize}
                          page={page}
                          onPageChange={(pageno) => handlePagechange(pageno)}
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
                          getRowClassName={(params) =>
                            params.indexRelativeToCurrentPage % 2 === 0
                              ? "odd-row"
                              : "even-row"
                          }
                        />
                      </Box>
                    </Box>

                    <FormControl
                      fullWidth
                      sx={{ gridColumn: "span 2", gap: formGap }}
                    >
                      <TextField
                        name="shelvescode"
                        type="text"
                        id="shelvescode"
                        label={
                          <>
                            Shelves Code<span style={{ color: "red", fontSize: "20px" }}> * </span>
                          </>
                        }
                        variant="standard"
                        focused
                        value={values.shelvescode}
                        onBlur={handleBlur}
                        // onChange={handleChange}
                        onChange={(e) => {
                          const val = e.target.value;

                          // only letters + numbers
                          if (/^[a-zA-Z0-9]*$/.test(val)) {
                            handleChange(e);
                          }
                        }}
                        error={!!touched.shelvescode && !!errors.shelvescode}
                        helperText={touched.shelvescode && errors.shelvescode}
                        // onInvalid={(e) => {
                        //   e.target.setCustomValidity(
                        //     "Please fill the Shelves Code"
                        //   );
                        // }}
                        // onInput={(e) => {
                        //   e.target.setCustomValidity("");
                        // }}
                        // required
                        autoFocus
                      />
                      <TextField
                        name="shelvesname"
                        type="text"
                        id="shelvesname"
                        label={
                          <>
                            Shelves Name<span style={{ color: "red", fontSize: "20px" }}> * </span>
                          </>
                        }
                        variant="standard"
                        focused
                        value={values.shelvesname}
                        onBlur={handleBlur}
                        // onChange={handleChange}
                        onChange={(e) => {
                          const val = e.target.value;

                          // only letters + numbers
                          if (/^[a-zA-Z0-9]*$/.test(val)) {
                            handleChange(e);
                          }
                        }}
                        error={!!touched.shelvesname && !!errors.shelvesname}
                        helperText={touched.shelvesname && errors.shelvesname}
                        // onInvalid={(e) => {
                        //   e.target.setCustomValidity(
                        //     "Please fill the Shelves Name"
                        //   );
                        // }}
                        // onInput={(e) => {
                        //   e.target.setCustomValidity("");
                        // }}
                        // required
                        autoFocus
                      />
                      <TextField
                        name="sortorder"
                        type="number"
                        id="sortorder"
                        label="Sort Order"
                        variant="standard"
                        focused
                        value={values.sortorder}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.sortorder && !!errors.sortorder}
                        helperText={touched.sortorder && errors.sortorder}
                        sx={{ background: "" }}
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
                  <Box
                    display="flex"
                    padding={1}
                    justifyContent="end"
                    mt="30px"
                    gap={2}
                  >
                    {/* {YearFlag == "true" ? ( */}

                    <LoadingButton
                      color="secondary"
                      variant="contained"
                      type="submit"
                      loading={isLoading}
                    >
                      Save
                    </LoadingButton>
                    {/* // ) : (
                  //   <Button
                  //     color="secondary"
                  //     variant="contained"
                  //     disabled={true}
                  //   >
                  //     Save
                  //   </Button>
                  // )}
                 // {YearFlag == "true" ? ( */}

                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => {
                        Swal.fire({
                          title: errorMsgData.Warningmsg.Delete,
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Confirm",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            FnShelvessave(values, resetForm, true);
                          } else {
                            return;
                          }
                        });
                      }}
                    >
                      Delete
                    </Button>

                    {/* <Button
                      onClick={() => FnShelvessave(values, resetForm, true)}
                      color="error"
                      variant="contained"
                    >
                      Delete
                    </Button> */}

                    {/* ) : (
                    <Button color="error" variant="contained" disabled={true}>
                      Delete
                    </Button>
                  )} */}
                    <Button
                      onClick={() => setScreen(0)}
                      type="reset"
                      color="warning"
                      variant="contained"
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
      </Box>
    </React.Fragment>
  );
};

export default Editbin;
