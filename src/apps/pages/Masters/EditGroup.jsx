// import React, { useState, useEffect, useRef } from "react";
// import {
//   TextField,
//   Box,
//   Paper,
//   Typography,
//   FormControl,
//   FormLabel,
//   Button,
//   Breadcrumbs,
//   IconButton,
//   Tooltip,
//   useTheme,
//   LinearProgress,
// } from "@mui/material";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
// import { Formik, Field } from "formik";
// import ResetTvIcon from "@mui/icons-material/ResetTv";
// import Swal from "sweetalert2";
// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
// import { tokens } from "../../../Theme";
// import * as Yup from "yup";
// import {
//   DataGrid,
//   GridToolbarContainer,
//   GridToolbarColumnsButton,
//   GridToolbarFilterButton,
//   GridToolbarExport,
//   GridToolbarDensitySelector,
//   GridToolbarQuickFilter,
//   GridCellEditStopReasons,
// } from "@mui/x-data-grid";
// import { useProSidebar } from "react-pro-sidebar";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";
// // import { P_columns,p_rows } from "./mockfile";
// import { ML_columns, ML_rows } from "../../../dataApi/mockDataApi";
// import Popup from "../popup";
// import Listviewpopup from "../Lookup";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getFetchUserData,
//   GroupExplore,
//   userGroupExplore,
//   userGroupRowUpdate,
// } from "../../../store/reducers/Explorelitviewapireducer";
// import { getFetchData, postData } from "../../../store/reducers/Formapireducer";
// import { toast } from "react-hot-toast";
// import { LoadingButton } from "@mui/lab";
// import {
//   dataGridHeaderFooterHeight,
//   dataGridHeight,
//   dataGridPageSize,
//   dataGridPageSizeOption,
//   formGap,
// } from "../../../ui-components/utils";

// const EditGroup = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const { toggleSidebar, broken, rtl } = useProSidebar();
//   const isNonMobile = useMediaQuery("(min-width:600px)");
//   const dispatch = useDispatch();
//   const params = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const rowDatastate = location.state || {};
//   console.log(rowDatastate, "--rowDatastate");
//   const [page, setPage] = useState(0);

//   const recID = params.id;
//   const mode = params.Mode;

//   const accessID = params.accessID;
//   const companyRecID = params.companyRecID;
//   const [pageSize, setPageSize] = React.useState(20);


//   useEffect(() => {
//     dispatch(getFetchUserData({ accessID, get: "get", recID }));
//     if (mode === "A") {
//       dispatch(
//         GroupExplore({ Type: "SelectAll" })
//       );
//     }
//   }, [location.key]);

//   // *************** REDUX STATES *************** //
//   const data = useSelector((state) => state.exploreApi.Data);
//   const status = useSelector((state) => state.formApi.Status);
//   const Msgs = useSelector((state) => state.formApi.msg);
//   const isLoading = useSelector((state) => state.formApi.postLoading);
//   const getLoading = useSelector((state) => state.formApi.getLoading);
//   const rowData = useSelector((state) => state.exploreApi.Groupget);
//   console.log(rowData,"rowData....");
//   const exploreLoading = useSelector((state) => state.exploreApi.loading);
//   // const YearRecorid = sessionStorage.getItem("YearRecorid");
//   const Finyear = sessionStorage.getItem("YearRecorid");
//   const CompanyID = sessionStorage.getItem("compID");
//   const [errorMsgData, setErrorMsgData] = useState(null);
//   const [validationSchema, setValidationSchema] = useState(null);
//   useEffect(() => {
//     fetch(process.env.PUBLIC_URL + "/validationcms.json")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch validationcms.json");
//         return res.json();
//       })
//       .then((data) => {
//         setErrorMsgData(data);


//         const schema1 = Yup.object().shape({
//           name: Yup.string().required(data.Usergroup.name),
//         });
//         setValidationSchema(schema1);
//       })
//       .catch((err) => console.error("Error loading validationcms.json:", err));
//   }, []);

//   function CustomToolbar() {
//     return (
//       <GridToolbarContainer
//         sx={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//         }}
//       >
//         <Box sx={{ display: "flex", flexDirection: "row" }}>
//           <Typography>List of Companies</Typography>
//         </Box>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//           }}
//         >
//           <GridToolbarQuickFilter />
//         </Box>
//       </GridToolbarContainer>
//     );
//   }
//   const column = [
//     // {
//     //   field: "SLNO",
//     //   headerName: "SL#",
//     //   width: 50,
//     // },
//     // {
//     //   field: "slno",
//     //   headerName: "SL#",
//     //   width: 50,
//     //   sortable: false,
//     //   filterable: false,
//     //   valueGetter: (params) =>
//     //     `${params.api.getRowIndexRelativeToVisibleRows(params.id) + 1}`
//     // },
//     {
//       field: "slno",
//       headerName: "SL#",
//       width: 60,
//       sortable: false,
//       filterable: false,
//       disableColumnMenu: true,
//       valueGetter: (params) => {
//         const index = params.api.getRowIndexRelativeToVisibleRows(params.id);

//         const totalVisibleRows = params.api.getAllRowIds().length;
//         const totalAllRows = params.api.getRowsCount();

//         if (totalVisibleRows < totalAllRows) {
//           return index + 1;
//         } else {
//           return page * pageSize + index + 1;
//         }
//       },
//     },
//     {
//       field: "Name",
//       headerName: "Company Name",
//       headerAlign: "center",
//        flex: 1,
//     },
//     {
//       field: "Select",
//       headerName: "Select Company",
//       flex: 1,
//       // width: 10,
//       align: "center",
//       headerAlign: "center",
//       renderCell: (params) => {
//         return (
//           <Checkbox
//             checked={params.row?.Select}
//           />
//         );
//       },
//     },

//   ];
//   const fnLogOut = (props) => {
//     Swal.fire({
//       title: errorMsgData.Warningmsg[props],
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: props,
//     }).then((result) => {
//       if (result.isConfirmed) {
//         if (props === "Logout") {
//           navigate("/");
//         }
//         if (props === "Close") {
//           navigate(`/Apps/Secondarylistview/TR095/Usergroups/${companyRecID}`);
//         }
//       } else {
//         return;
//       }
//     });
//   };

//   const userGroupInitialValue = {
//     code: data.Code,
//     name: data.Name,   
//   };

//   const GroupSavefn = async (values, resetForm) => {
//     let action = mode === "A" ? "insert" : "update";
//     var isCheck = "N";
//     if (values.disable == true) {
//       isCheck = "Y";
//     }

//     const idata = {
//       RecordID: recID,
//       Code: values.code || "",
//       Name: values.name,
//       Company: companyRecID,
//       CompanyGroupIDs: "",
//     };

//     const response = await dispatch(postData({ accessID, action, idata }));
//     if (response.payload.Status == "Y") {
//       toast.success(response.payload.Msg);
//       navigate(-1);
//       // navigate(`/Apps/Secondarylistview/TR095/Usergroups/${companyRecID}`,{state:rowData});
//     } else {
//       toast.error(response.payload.Msg);
//     }
//   };
//   return (
//     <React.Fragment>
//       {/* {getLoading ? <LinearProgress /> : false} */}
//       <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
//         <Box display="flex" justifyContent="space-between" p={2}>
//           <Box display="flex" borderRadius="3px" alignItems="center">
//             {broken && !rtl && (
//               <IconButton onClick={() => toggleSidebar()}>
//                 <MenuOutlinedIcon />
//               </IconButton>
//             )}
//             <Box
//               display={isNonMobile ? "flex" : "none"}
//               borderRadius="3px"
//               alignItems="center"
//             >
//               <Breadcrumbs
//                 maxItems={3}
//                 aria-label="breadcrumb"
//                 separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
//               >

//                 <Typography
//                   variant="h5"
//                   color="#0000D1"
//                   sx={{ cursor: "default" }}               
//                 >
//                  Group
//                 </Typography>
//               </Breadcrumbs>
//             </Box>
//           </Box>
//           <Box display="flex">
//             <Tooltip title="Close">
//               <IconButton onClick={() => fnLogOut("Close")} color="error">
//                 <ResetTvIcon />
//               </IconButton>
//             </Tooltip>
//             <IconButton>
//               <LogoutOutlinedIcon
//                 onClick={() => fnLogOut("Logout")}
//                 color="error"
//               />
//             </IconButton>
//           </Box>
//         </Box>
//       </Paper>
//       {/* {!getLoading && data && rowData ? ( */}
//       <Paper elevation={3} sx={{ margin: "10px" }}>
//         <Box>
//           <Formik
//             initialValues={userGroupInitialValue}
//             onSubmit={(values, { resetForm }) => {
//               setTimeout(() => {
//                 GroupSavefn(values, resetForm);
//               }, 100);
//             }}
//             enableReinitialize={true}
//             validationSchema={validationSchema}
//           >
//             {({
//               errors,
//               touched,
//               handleBlur,
//               handleChange,
//               isSubmitting,
//               values,
//               handleSubmit,
//               resetForm,
//             }) => (
//               <form onSubmit={handleSubmit}>
//                 <Box
//                   display="grid"
//                   gridTemplateColumns="repeat(4 , minMax(0,1fr))"
//                   gap={formGap}
//                   padding={1}
//                   sx={{
//                     "& > div": {
//                       gridColumn: isNonMobile ? undefined : "span 4",
//                     },
//                   }}
//                 >
//                   <TextField
//                     name="code"
//                     type="text"
//                     id="code"
//                     label="Code"
//                     placeholder="Auto"
//                     value={values.code}
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     variant="standard"
//                     focused
//                     sx={{ gridColumn: "span 2" }}
//                     InputProps={{ readOnly: true }}
//                   />
//                   <TextField
//                     name="name"
//                     type="text"
//                     id="name"
//                     label={
//                       <>
//                         Name<span style={{ color: "red", fontSize: "20px" }}> * </span>
//                       </>
//                     }
//                     value={values.name}
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     variant="standard"
//                     focused
//                     // required
//                     sx={{ gridColumn: "span 2" }}
//                     autoFocus
//                     error={!!touched.name && !!errors.name}
//                     helperText={touched.name && errors.name}
//                   // onInvalid={(e) => {
//                   //   e.target.setCustomValidity(
//                   //     "Please fill the Name"
//                   //   );
//                   // }}
//                   // onInput={(e) => {
//                   //   e.target.setCustomValidity("");
//                   // }}

//                   />

//                   {/* <Box sx={{ gridColumn: "span 2" }}>
//                     <Field
//                       type="checkbox"
//                       name="disable"
//                       id="disable"
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       as={Checkbox}
//                       label="Disable"
//                     />
//                     <FormLabel focused={false}>Disable</FormLabel>
//                   </Box> */}
//                 </Box>
//                 <Box>
//                   <Box m="5px">
//                     <Box
//                       m="5px 0 0 0"
//                       height={dataGridHeight}
//                       // height="65vh"
//                       sx={{
//                         "& .MuiDataGrid-root": {
//                           border: "none",
//                         },
//                         "& .MuiDataGrid-cell": {
//                           borderBottom: "none",
//                         },
//                         "& .name-column--cell": {
//                           color: colors.greenAccent[300],
//                         },
//                         "& .MuiDataGrid-columnHeaders": {
//                           backgroundColor: colors.blueAccent[800],
//                           borderBottom: "none",
//                         },
//                         "& .MuiDataGrid-virtualScroller": {
//                           backgroundColor: colors.primary[400],
//                         },
//                         "& .MuiDataGrid-footerContainer": {
//                           borderTop: "none",
//                           backgroundColor: colors.blueAccent[800],
//                         },
//                         "& .MuiCheckbox-root": {
//                           color: `${colors.greenAccent[200]} !important`,
//                         },
//                         "& .odd-row": {
//                           backgroundColor: "",
//                           color: "", // Color for odd rows
//                         },
//                         "& .even-row": {
//                           backgroundColor: "#c4f5f2",
//                           color: "", // Color for even rows
//                         },
//                       }}
//                     >
//                       {/* {rowData ? ( */}
//                         <DataGrid
//                           sx={{
//                             "& .MuiDataGrid-footerContainer": {
//                               height: dataGridHeaderFooterHeight,
//                               minHeight: dataGridHeaderFooterHeight,
//                             },
//                           }}
//                           rows={rowData}
//                           columns={column}
//                           loading={exploreLoading}
//                           disableSelectionOnClick
//                           getRowId={(row) => row.RecordID}
//                           headerHeight={dataGridHeaderFooterHeight}
//                           pageSize={pageSize}
//                           page={page}
//                           onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//                           onPageChange={(newPage) => setPage(newPage)}
//                           rowsPerPageOptions={dataGridPageSizeOption}
//                           pagination
//                           // pageSize={pageSize}
//                           // onPageSizeChange={(newPageSize) =>
//                           //   setPageSize(newPageSize)
//                           // }
//                           // rowsPerPageOptions={[5, 10, 20]}
//                           // pagination
//                           components={{
//                             Toolbar: CustomToolbar,
//                           }}
//                           componentsProps={{
//                             toolbar: {
//                               showQuickFilter: true,
//                               quickFilterProps: { debounceMs: 500 },
//                             },
//                           }}
//                           getRowClassName={(params) =>
//                             params.indexRelativeToCurrentPage % 2 === 0
//                               ? "odd-row"
//                               : "even-row"
//                           }
//                           rowHeight={30}
//                         />
//                       {/* ) : (
//                         "Loading..."
//                       )} */}
//                     </Box>
//                   </Box>
//                 </Box>

//                 <Box
//                   display="flex"
//                   padding={1}
//                   justifyContent="end"
//                   mt="20px"
//                   gap="20px"
//                 >
//                   <LoadingButton
//                     loading={isLoading}
//                     variant="contained"
//                     color="secondary"
//                     type="submit"
//                   >
//                     SAVE
//                   </LoadingButton>
//                   <Button
//                     variant="contained"
//                     color="warning"
//                     onClick={() => {
//                       navigate(
//                         -1
//                         // `/Apps/Secondarylistview/TR095/Usergroups/${companyRecID}`
//                       );
//                     }}
//                   >
//                     CANCEL
//                   </Button>
//                 </Box>
//               </form>
//             )}
//           </Formik>
//           {/* <Popup
//           title="Company"
//           openPopup={openUCpopup}
//           setOpenPopup={setOpenUCpopup}
//         >
//           <Listviewpopup
//             accessID="2030"
//             screenName="Company"
//             childToParent={childToParent}
//           />
//         </Popup> */}
//         </Box>
//       </Paper>
//       {/* ) : (
//         "Loading..."
//       )} */}
//     </React.Fragment>
//   );
// };

// export default EditGroup;
import React, { useState, useEffect, useRef } from "react";
import {
    TextField,
    Box,
    Paper,
    Typography,
    FormControl,
    FormLabel,
    Button,
    Breadcrumbs,
    IconButton,
    Tooltip,
    useTheme,
    LinearProgress,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Formik, Field } from "formik";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import Swal from "sweetalert2";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { tokens } from "../../../Theme";
import * as Yup from "yup";
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
    GridToolbarQuickFilter,
    GridCellEditStopReasons,
} from "@mui/x-data-grid";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import { useParams, useNavigate, useLocation } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useDispatch, useSelector } from "react-redux";
import {
    getFetchUserData,
    GroupExplore,
    userGroupExplore,
    userGroupRowUpdate,
} from "../../../store/reducers/Explorelitviewapireducer";
import { getFetchData, postData } from "../../../store/reducers/Formapireducer";
import { toast } from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import {
    dataGridHeaderFooterHeight,
    dataGridHeight,
    dataGridPageSize,
    dataGridPageSizeOption,
    formGap,
} from "../../../ui-components/utils";
import { MultiFormikOptimizedAutocomplete } from "../Autocomplete";

const EditGroup = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { toggleSidebar, broken, rtl } = useProSidebar();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const rowDatastate = location.state || {};

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);

    // Tracks selected company RecordIDs (array of strings)
    const [selectedCompanyIDs, setSelectedCompanyIDs] = useState([]);

    const recID = params.id;
    const mode = params.Mode;
    const accessID = params.accessID;
    const companyRecID = params.companyRecID;

    useEffect(() => {
        dispatch(getFetchUserData({ accessID, get: "get", recID }));
        if (mode === "A") {
            dispatch(GroupExplore({ Type: "SelectAll" }));
        }
    }, [location.key]);

    // ---- Pre-populate selected companies when editing (mode !== "A") ----
    // Assumes rowData rows have a `Select: true/false` field from the API
    useEffect(() => {
        if (rowData && rowData.length > 0) {
            const preSelected = rowData
                .filter((row) => row.Select === true)
                .map((row) => row.RecordID);
            setSelectedCompanyIDs(preSelected);
        }
    }, []);   // run once after rowData loads; adjust dependency if needed

    // *************** REDUX STATES *************** //
    const data = useSelector((state) => state.exploreApi.Data);
    const status = useSelector((state) => state.formApi.Status);
    const Msgs = useSelector((state) => state.formApi.msg);
    const isLoading = useSelector((state) => state.formApi.postLoading);
    const getLoading = useSelector((state) => state.formApi.getLoading);
    const rowData = useSelector((state) => state.exploreApi.Groupget);
    const exploreLoading = useSelector((state) => state.exploreApi.loading);
    const listViewurl = useSelector((state) => state.globalurl.listViewurl);
    const Finyear = sessionStorage.getItem("YearRecorid");
    const CompanyID = sessionStorage.getItem("compID");

    const [errorMsgData, setErrorMsgData] = useState(null);
    const [validationSchema, setValidationSchema] = useState(null);

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/validationcms.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch validationcms.json");
                return res.json();
            })
            .then((data) => {
                setErrorMsgData(data);
                const schema1 = Yup.object().shape({
                    name: Yup.string().required(data.Group.name),
                    Company: Yup.array()
                        .min(1, data.Group.Company)  //FIXED
                        .required(data.Group.Company)
                });
                setValidationSchema(schema1);
            })
            .catch((err) => console.error("Error loading validationcms.json:", err));
    }, []);

    // ---- Toggle a single company checkbox ----
    const handleCheckboxToggle = (recordID) => {
        setSelectedCompanyIDs((prev) =>
            prev.includes(recordID)
                ? prev.filter((id) => id !== recordID)
                : [...prev, recordID]
        );
    };

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
                    <Typography>List of Companies</Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <GridToolbarQuickFilter />
                </Box>
            </GridToolbarContainer>
        );
    }

    const column = [
        {
            field: "slno",
            headerName: "SL#",
            width: 60,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            valueGetter: (params) => {
                const index = params.api.getRowIndexRelativeToVisibleRows(params.id);
                const totalVisibleRows = params.api.getAllRowIds().length;
                const totalAllRows = params.api.getRowsCount();
                if (totalVisibleRows < totalAllRows) {
                    return index + 1;
                } else {
                    return page * pageSize + index + 1;
                }
            },
        },
        {
            field: "Name",
            headerName: "Company Name",
            headerAlign: "center",
            flex: 1,
        },
        {
            field: "Select",
            headerName: "Select Company",
            flex: 1,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                const isChecked = selectedCompanyIDs.includes(params.row.RecordID);
                return (
                    <Checkbox
                        checked={isChecked}
                        onChange={() => handleCheckboxToggle(params.row.RecordID)}
                    />
                );
            },
        },
    ];

    const fnLogOut = (props) => {
        Swal.fire({
            title: errorMsgData?.Warningmsg?.[props] || `Are you sure you want to ${props}?`,
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
                    navigate(`/Apps/Secondarylistview/TR095/Usergroups/${companyRecID}`);
                }
            }
        });
    };

    const GroupInitialValue = {
        code: data.Code || "",
        name: data.Name || "",
        Company: Array.isArray(data.CompanyID)
            ? data.CompanyID.map((d) => ({
                RecordID: String(d.CompanyID),
                Name: d.CompanyName,
            }))
            : [],
        sortOrder: data.SortOrder,
        disable: data.Disable === "Y" ? true : false,
    };

    const GroupSavefn = async (values, resetForm) => {
        const action = mode === "A" ? "insert" : "update";

        // Join selected company RecordIDs as comma-separated string (adjust separator if API expects array)
        // const companyGroupIDs = selectedCompanyIDs.join(",");
        const CompanyIds = values.Company?.map((d) => d.RecordID) || [];
        const idata = {
            RecordID: recID,
            Code: values.code || "",
            Name: values.name,
            CompanyID: CompanyIds.join(","),
            SortOrder: values.sortOrder || 0,
            Disable: values.disable === true ? "Y" : "N",
            DeleteFlag: "N"
        };

        const response = await dispatch(postData({ accessID, action, idata }));
        if (response.payload.Status === "Y") {
            toast.success(response.payload.Msg);
            navigate(-1);
        } else {
            toast.error(response.payload.Msg);
        }
    };

    return (
        <React.Fragment>
            <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
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
                                >
                                    Group
                                </Typography>
                            </Breadcrumbs>
                        </Box>
                    </Box>
                    <Box display="flex">
                        <Tooltip title="Close">
                            <IconButton onClick={() => fnLogOut("Close")} color="error">
                                <ResetTvIcon />
                            </IconButton>
                        </Tooltip>
                        <IconButton>
                            <LogoutOutlinedIcon
                                onClick={() => fnLogOut("Logout")}
                                color="error"
                            />
                        </IconButton>
                    </Box>
                </Box>
            </Paper>

            <Paper elevation={3} sx={{ margin: "10px" }}>
                <Box>
                    <Formik
                        initialValues={GroupInitialValue}
                        onSubmit={(values, { resetForm }) => {
                            setTimeout(() => {
                                GroupSavefn(values, resetForm);
                            }, 100);
                        }}
                        enableReinitialize={true}
                        validationSchema={validationSchema}
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
                            setFieldValue
                        }) => (
                            <form onSubmit={handleSubmit}>
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
                                    <FormControl gap={1} sx={{ gridColumn: "span 2" }}>
                                        <TextField
                                            name="code"
                                            type="text"
                                            id="code"
                                            label="Code"
                                            placeholder="Auto"
                                            value={values.code}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            variant="standard"
                                            focused
                                            sx={{ gridColumn: "span 2" }}
                                            InputProps={{ readOnly: true }}
                                        />
                                    </FormControl>
                                    <FormControl gap={1} sx={{ gridColumn: "span 2" }}>
                                        <TextField
                                            name="name"
                                            type="text"
                                            id="name"
                                            label={
                                                <>
                                                    Name<span style={{ color: "red", fontSize: "20px" }}> * </span>
                                                </>
                                            }
                                            value={values.name}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            variant="standard"
                                            focused
                                            sx={{ gridColumn: "span 2" }}
                                            autoFocus
                                        // error={!!touched.name && !!errors.name}
                                        // helperText={touched.name && errors.name}
                                        />
                                        {touched.name && errors.name && (
                                            <div style={{ color: "red", fontSize: "10px", marginTop: "2px" }}>
                                                {errors.name}
                                            </div>
                                        )}
                                    </FormControl>
                                    <FormControl gap={1} sx={{ gridColumn: "span 2" }}>
                                        <MultiFormikOptimizedAutocomplete
                                            sx={{
                                                width: "100%",
                                                gridColumn: "span 2",
                                            }}
                                            name="Company"
                                            label={
                                                <>
                                                    Company
                                                    <span style={{ color: "red", fontSize: "20px" }}>
                                                        *
                                                    </span>
                                                </>
                                            }
                                            id="Company"
                                            value={values.Company}
                                            onChange={(e, newValue) => {
                                                setFieldValue("Company", newValue, true);
                                            }}
                                            isOptionEqualToValue={(option, value) =>
                                                String(option.RecordID) === String(value.RecordID)
                                            }
                                            error={!!touched.Company && !!errors.Company}
                                            helperText={touched.Company && errors.Company}
                                            url={`${listViewurl}?data=${JSON.stringify({
                                                Query: {
                                                    AccessID: "2030",
                                                    ScreenName: "Company",
                                                    Filter: "",
                                                    Any: "",
                                                },
                                            })}`}
                                        />
                                        {touched.Company && errors.Company && (
                                            <div style={{ color: "red", fontSize: "10px", marginTop: "2px" }}>
                                                {errors.Company}
                                            </div>
                                        )}
                                    </FormControl>
                                    <FormControl gap={1} sx={{ gridColumn: "span 2" }}>
                                        <TextField
                                            fullWidth
                                            variant="standard"
                                            type="number"
                                            label="Sort Order"
                                            value={values.sortOrder}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            name="sortOrder"
                                            error={!!touched.sortOrder && !!errors.sortOrder}
                                            helperText={touched.sortOrder && errors.sortOrder}
                                            sx={{
                                                gridColumn: "span 2",
                                                background: "",
                                                input: { textAlign: "right" },
                                            }}
                                            focused
                                            onWheel={(e) => e.target.blur()}
                                        />
                                    </FormControl>
                                    <FormControl>
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
                                        loading={isLoading}
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                    >
                                        SAVE
                                    </LoadingButton>
                                    <Button
                                        variant="contained"
                                        color="warning"
                                        onClick={() => navigate(-1)}
                                    >
                                        CANCEL
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Paper>
        </React.Fragment>
    );
};

export default EditGroup;