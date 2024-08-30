import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Box,
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
// import { P_columns,p_rows } from "./mockfile";
import { ML_columns, ML_rows } from "../../../dataApi/mockDataApi";
import Popup from "../popup";
import Listviewpopup from "../Lookup";
import { useDispatch, useSelector } from "react-redux";
import {
  getFetchUserData,
  userGroupExplore,
  userGroupRowUpdate,
} from "../../../store/reducers/Explorelitviewapireducer";
import { getFetchData, postData } from "../../../store/reducers/Formapireducer";
import { toast } from "react-hot-toast";
import { LoadingButton } from "@mui/lab";

const Editusergroup = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const recID = params.id;
  const mode = params.Mode;
  const accessID = params.accessID;
  const companyRecID = params.companyRecID;

  // console.log("🚀 ~ file: Editusergroup.jsx:65 ~ Editusergroup ~ Year:", Year)

  useEffect(() => {
    dispatch(getFetchUserData({ accessID, get: "get", recID }));
    if (mode === "A") {
      dispatch(
        userGroupExplore({ CompanyID: companyRecID, UsergroupID: recID })
      );
    }
  }, [location.key]);

  // *************** REDUX STATES *************** //
  const data = useSelector((state) => state.exploreApi.Data);
  const status = useSelector((state) => state.formApi.Status);
  const Msgs = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const rowData = useSelector((state) => state.exploreApi.explorerowData);
  const exploreLoading = useSelector((state) => state.exploreApi.loading);
  // const YearRecorid = sessionStorage.getItem("YearRecorid");
    const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");

  function handleConfirmChange1(event, clickedRow) {
    const updatedData = rowData.map((x) => {
      if ("0" === clickedRow.SM_RECID) {
        return {
          ...x,
          UGA_ADD: event.target.checked,
          UGA_VIEW: event.target.checked,
          UGA_MOD: event.target.checked,
          UGA_DEL: event.target.checked,
          UGA_PRINT: event.target.checked,
          UGA_PROCESS: event.target.checked,
        };
      } else {
        if (x.SM_RECID === clickedRow.SM_RECID) {
          return {
            ...x,
            UGA_ADD: event.target.checked,
            UGA_VIEW: event.target.checked,
            UGA_MOD: event.target.checked,
            UGA_DEL: event.target.checked,
            UGA_PRINT: event.target.checked,
            UGA_PROCESS: event.target.checked,
          };
        }
      }
      return x;
    });
    dispatch(userGroupRowUpdate({ rowData: updatedData }));
  }

  function handleConfirmChange2(event, clickedRow) {
    const updatedData = rowData.map((x) => {
      if ("0" == clickedRow.SM_RECID) {
        return {
          ...x,
          UGA_ADD: event.target.checked,
        };
      } else {
        if (x.SM_RECID === clickedRow.SM_RECID) {
          return {
            ...x,
            UGA_ADD: event.target.checked,
          };
        }
      }
      return x;
    });
    dispatch(userGroupRowUpdate({ rowData: updatedData }));
  }
  function handleConfirmChange3(event, clickedRow) {
    const updatedData = rowData.map((x) => {
      if ("0" === clickedRow.SM_RECID) {
        return {
          ...x,
          UGA_VIEW: event.target.checked,
        };
      } else {
        if (x.SM_RECID === clickedRow.SM_RECID) {
          return {
            ...x,
            UGA_VIEW: event.target.checked,
          };
        }
      }
      return x;
    });
    dispatch(userGroupRowUpdate({ rowData: updatedData }));
  }

  function handleConfirmChange4(event, clickedRow) {
    const updatedData = rowData.map((x) => {
      if ("0" === clickedRow.SM_RECID) {
        return {
          ...x,
          UGA_MOD: event.target.checked,
        };
      } else {
        if (x.SM_RECID === clickedRow.SM_RECID) {
          return {
            ...x,
            UGA_MOD: event.target.checked,
          };
        }
      }
      return x;
    });
    dispatch(userGroupRowUpdate({ rowData: updatedData }));
  }

  function handleConfirmChange5(event, clickedRow) {
    const updatedData = rowData.map((x) => {
      if ("0" === clickedRow.SM_RECID) {
        return {
          ...x,
          UGA_DEL: event.target.checked,
        };
      } else {
        if (x.SM_RECID === clickedRow.SM_RECID) {
          return {
            ...x,
            UGA_DEL: event.target.checked,
          };
        }
      }
      return x;
    });
    dispatch(userGroupRowUpdate({ rowData: updatedData }));
  }
  function handleConfirmChange6(event, clickedRow) {
    const updatedData = rowData.map((x) => {
      if ("0" === clickedRow.SM_RECID) {
        return {
          ...x,
          UGA_PRINT: event.target.checked,
        };
      } else {
        if (x.SM_RECID === clickedRow.SM_RECID) {
          return {
            ...x,
            UGA_PRINT: event.target.checked,
          };
        }
      }
      return x;
    });
    dispatch(userGroupRowUpdate({ rowData: updatedData }));
  }
  function handleConfirmChange7(event, clickedRow) {
    const updatedData = rowData.map((x) => {
      if ("0" === clickedRow.SM_RECID) {
        return {
          ...x,
          UGA_PROCESS: event.target.checked,
        };
      } else {
        if (x.SM_RECID === clickedRow.SM_RECID) {
          return {
            ...x,
            UGA_PROCESS: event.target.checked,
          };
        }
      }
      return x;
    });
    dispatch(userGroupRowUpdate({ rowData: updatedData }));
  }

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
          <Typography>List of Screen Names</Typography>
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
      field: "SLNO",
      headerName: "SLNO",
      width: 50,
    },

    {
      field: "SM_CAPTION1",
      headerName: "Screen Name",
      width: 250,
    },
    {
      field: "all",
      headerName: "All",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Checkbox
            checked={
              params.row?.UGA_ADD &&
              params.row?.UGA_VIEW &&
              params.row?.UGA_MOD &&
              params.row?.UGA_DEL &&
              params.row?.UGA_PRINT &&
              params.row?.UGA_PROCESS
            }
            onChange={(event) => handleConfirmChange1(event, params.row)}
          />
        );
      },
    },
    {
      field: "UGA_ADD",
      headerName: "ADD",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Checkbox
            checked={params.row?.UGA_ADD}
            onChange={(event) => handleConfirmChange2(event, params.row)}
          />
        );
      },
    },

    {
      field: "UGA_VIEW",
      headerName: "VIEW",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Checkbox
            checked={params.row?.UGA_VIEW}
            onChange={(event) => handleConfirmChange3(event, params.row)}
          />
        );
      },
    },
    {
      field: "UGA_MOD",
      headerName: "MODIFY",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Checkbox
            checked={params.row?.UGA_MOD}
            onChange={(event) => handleConfirmChange4(event, params.row)}
          />
        );
      },
    },
    {
      field: "UGA_DEL",
      headerName: "DELETE",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Checkbox
            checked={params.row?.UGA_DEL}
            onChange={(event) => handleConfirmChange5(event, params.row)}
          />
        );
      },
    },
    {
      field: "UGA_PROCESS",
      headerName: "PRINT",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Checkbox
            checked={params.row?.UGA_PRINT}
            onChange={(event) => handleConfirmChange6(event, params.row)}
          />
        );
      },
    },
    {
      field: "UGA_PRINT",
      headerName: "PROCESS",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Checkbox
            checked={params.row?.UGA_PROCESS}
            onChange={(event) => handleConfirmChange7(event, params.row)}
          />
        );
      },
    },
  ];
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
          navigate(`/Apps/Secondarylistview/TR095/Usergroups/${companyRecID}`);
        }
      } else {
        return;
      }
    });
  };

  const userGroupInitialValue = {
    code: data.Code,
    name: data.Name,
    comments: data.Comments,
    disable: data.Disable === "Y" ? true : false,
    sortOrder: data.SortOrder,
  };

  const userGroupSavefn = async (values, resetForm) => {
    let action = mode === "A" ? "insert" : "update";
    var isCheck = "N";
    if (values.disable == true) {
      isCheck = "Y";
    }

    const idata = {
      RecordID: recID,
      Code: values.code,
      Name: values.name,
      Comments: values.comments,
      Company: companyRecID,
      Disable: isCheck,
      SortOrder: values.sortOrder,
      // Finyear: YearRecorid,
      Groupaccess: rowData,
      // YearID:,
      // Company:,
      Finyear,
      CompanyID,
    };

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate(`/Apps/Secondarylistview/TR095/Usergroups/${companyRecID}`);
    } else {
      toast.error(response.payload.Msg);
    }
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
                  navigate("/Apps/TR099/Companies");
                }}
              >
                Companies
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate("/Apps/Secondarylistview/TR095/Usergroups/3");
                }}
              >
                User Group
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

      {!getLoading && data && rowData ? (
        <Box m="20px">
          <Formik
            initialValues={userGroupInitialValue}
            onSubmit={(values, { resetForm }) => {
              setTimeout(() => {
                userGroupSavefn(values, resetForm);
              }, 100);
            }}
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
                  <TextField
                    name="code"
                    type="text"
                    id="code"
                    label="Code"
                    value={values.code}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant="filled"
                    focused
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    name="name"
                    type="text"
                    id="name"
                    label="Name"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant="filled"
                    focused
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    name="comments"
                    type="text"
                    id="comments"
                    value={values.comments}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Comments"
                    variant="filled"
                    focused
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    name="sortOrder"
                    type="number"
                    id="sortOrder"
                    value={values.sortOrder}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Sort Order"
                    variant="filled"
                    focused
                    onWheel={(e) => e.target.blur()} 
                    sx={{
                      gridColumn: "span 2",
                      input: { textAlign: "right" },
                      background: "#fff6c3",
                    }}
                  />
                  <Box sx={{ gridColumn: "span 2" }}>
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
                </Box>
                <Box>
                  <Box m="5px">
                    <Box
                      m="5px 0 0 0"
                      height="65vh"
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
                      }}
                    >
                      {rowData ? (
                        <DataGrid
                          rows={rowData}
                          columns={column}
                          loading={exploreLoading}
                          disableSelectionOnClick
                          getRowId={(row) => row.RecordID}
                          // pageSize={pageSize}
                          // onPageSizeChange={(newPageSize) =>
                          //   setPageSize(newPageSize)
                          // }
                          // rowsPerPageOptions={[5, 10, 20]}
                          // pagination
                          components={{
                            Toolbar: CustomToolbar,
                          }}
                          componentsProps={{
                            toolbar: {
                              showQuickFilter: true,
                              quickFilterProps: { debounceMs: 500 },
                            },
                          }}
                        />
                      ) : (
                        "Loding..."
                      )}
                    </Box>
                  </Box>
                </Box>

                <Box display="flex" justifyContent="end" mt="20px" gap="20px">
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
                    color="error"
                    onClick={() => {
                      navigate(
                        `/Apps/Secondarylistview/TR095/Usergroups/${companyRecID}`
                      );
                    }}
                  >
                    CANCEL
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          {/* <Popup
          title="Company"
          openPopup={openUCpopup}
          setOpenPopup={setOpenUCpopup}
        >
          <Listviewpopup
            accessID="2030"
            screenName="Company"
            childToParent={childToParent}
          />
        </Popup> */}
        </Box>
      ) : (
        "Loading..."
      )}
    </React.Fragment>
  );
};

export default Editusergroup;
