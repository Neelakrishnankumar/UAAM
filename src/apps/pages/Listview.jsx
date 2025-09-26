import {
  Box,
  IconButton,
  useTheme,
  MenuItem,
  Typography,
  Menu,
  Tooltip,
  Chip,
  LinearProgress,
  Paper,
  InputBase,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";

import Swal from "sweetalert2";
import MatxCustomizer from "./Mailpdf";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { tokens, ColorModeContext } from "../../Theme";
import { useProSidebar } from "react-pro-sidebar";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { fetchListview } from "../../store/reducers/Listviewapireducer";
import useMediaQuery from "@mui/material/useMediaQuery";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useState, useEffect } from "react";
import { fnCsvFileUpload } from "../../store/reducers/Imguploadreducer";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { screenRightsData } from "../../store/reducers/screenRightsreducer";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import PauseCircleOutlinedIcon from "@mui/icons-material/PauseCircleOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import NotStartedOutlinedIcon from "@mui/icons-material/NotStartedOutlined";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import SearchIcon from "@mui/icons-material/Search";
import EmailIcon from "@mui/icons-material/Email";
import { searchData } from "../../store/reducers/Formapireducer";
import PinDropIcon from "@mui/icons-material/PinDrop";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import toast from "react-hot-toast";
import {
  dataGridHeaderFooterHeight,
  dataGridHeight,
  dataGridPageSize,
  dataGridPageSizeOption,
  dataGridRowHeight,
} from "../../ui-components/utils";

const Listview = () => {
  const navigate = useNavigate();
  const colorMode = useContext(ColorModeContext);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const YearFlag = sessionStorage.getItem("YearFlag");
  var currentPage = parseInt(sessionStorage.getItem("currentPage"));
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  var accessID = params.accessID;
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const [pageSize, setPageSize] = React.useState(15);
  const [page, setPage] = React.useState(currentPage || 0);
  const [collapse, setcollapse] = React.useState(false);
  var invoice;
  const mailData = useSelector((state) => state.listviewApi.mailData);
  const searchLoading = useSelector((state) => state.formApi.searchLoading);
  console.log(
    "🚀 ~ file: Secondarylistview.jsx:122 ~ ListviewSecondary ~ mailData:",
    mailData
  );
  const open = useSelector((state) => state.listviewApi.mailOpen);
  var screenName = params.screenName;
  // console.log("🚀 ~ file: Listview.jsx:54 ~ Listview ~ screenName", screenName);
  const year = sessionStorage.getItem("year");
  const listViewData = useSelector((state) => state.listviewApi.rowData);
  console.log(
    "🚀 ~ file: Listview.jsx:55 ~ Listview ~ listViewData:",
    listViewData
  );
  const loading = useSelector((state) => state.listviewApi.loading);
  const { UGA_ADD, UGA_VIEW, UGA_MOD, UGA_DEL, UGA_PROCESS, UGA_PRINT } =
    useSelector((state) => state.screenRights.data);
  // console.log("🚀 ~ file: Listview.jsx:61 ~ Listview ~ UGA_MOD:", UGA_MOD)

  // console.log("🚀 ~ file: Listview.jsx:60 ~ Listview ~ rightsData:", JSON.stringify(rightsData))

  // console.log("rowdata" + JSON.stringify(listViewData));
  const listViewcolumn = useSelector((state) => state.listviewApi.columnData);
  const [selectedFile, setSelectedFile] = useState();
  const [uploadFile, setUploadFile] = useState();
  const compID = sessionStorage.getItem("compID");
  const YearRecorid = sessionStorage.getItem("YearRecorid");
  const [errorMsgData, setErrorMsgData] = useState(null);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/validationcms.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch validationcms.json");
        return res.json();
      })
      .then((data) => {
        setErrorMsgData(data);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, []);
  // console.log(
  //   "🚀 ~ file: Listview.jsx:58 ~ Listview ~ listViewcolumn",
  //   listViewcolumn
  // );
  // `CompanyID=${compID} AND compID=${YearRecorid}`
  React.useEffect(() => {
    dispatch(
      fetchListview(
        accessID,
        screenName,
        accessID == "TR010" ||
          accessID == "TR140" ||
          accessID == "TR047" ||
          accessID == "TR152" ||
          accessID == "TR155" ||
          accessID == "TR022"
          ? `compID=${compID}`
          : "",
        "",
        compID
      )
    );
    // dispatch(screenRightsData(accessID));
  }, [location.key]);

  function filterByID(item) {
    if (item.hide !== true) {
      return true;
    }
  }
  function filterByIDShow(item) {
    if (item.field != "action") {
      return true;
    }
  }

  // const columns = React.useMemo(
  //   () => listViewcolumn.filter(filterByID),
  //   [listViewcolumn]
  // );
  // const columns = React.useMemo(
  //   () => listViewcolumn.filter(filterByID) ? [{
  //     field: "slno",
  //     headerName: "SL#",
  //     width: 50,
  //     sortable: false,
  //     filterable: false,
  //     valueGetter: (params) =>
  //       `${params.api.getRowIndexRelativeToVisibleRows(params.id) + 1}`
  //   }, , ...listViewcolumn.filter(filterByID)] : [],
  //   [listViewcolumn]
  // );
  const columns = React.useMemo(
    () =>
      listViewcolumn.filter(filterByID)
        ? [
            {
              field: "slno",
              headerName: "SL#",
              width: 50,
              sortable: false,
              filterable: false,
              valueGetter: (params) =>
                page * pageSize +
                params.api.getRowIndexRelativeToVisibleRows(params.id) +
                1,
            },
            ...listViewcolumn.filter(filterByID),
          ]
        : [],
    [listViewcolumn, page, pageSize] // include page & pageSize as deps
  );
  const columnShow = React.useMemo(
    () => columns.filter(filterByIDShow),
    [listViewcolumn]
  );
  // console.log("🚀 ~ file: Listview.jsx:94 ~ Listview ~ columnShow:", columnShow)
  const rows = React.useMemo(() => {
    return listViewData;
  }, [listViewData]);

  /*****************File upload************ */
  const changeHandler = async (event) => {
    setSelectedFile(event.target.files[0]);

    console.log(event.target.files[0]);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "csv");

    console.log("fileData" + JSON.stringify(formData));
    const fileData = await dispatch(fnCsvFileUpload(formData));

    setUploadFile(fileData.payload.apiResponse);
  };

  const [productFilter, setProductFilter] = useState();
  const searchProduct = async () => {
    if (!productFilter) {
      toast.success("Please type modelno");
      return;
    }
    const idata = {
      accessID: accessID,
      filter: productFilter,
    };

    const response = await dispatch(searchData({ data: idata }));
    if (response.payload.status == 200) {
      // toast.success(response.payload.message);

      if (accessID == "TR002") {
        navigate(
          `/Apps/Secondarylistview/TR001/Product Master/${response.payload.data.PRD_PGRID}/${response.payload.data.PGR_DESC}`
        );
      }
      if (accessID == "TR044") {
        navigate(
          `/Apps/Secondarylistview/TR004/List of Materials/${response.payload.data.MGR_ID}/${response.payload.data.MGR_TYPE}/${response.payload.data.MTL_DESC}/${response.payload.data.MGR_MGROUP}/pm/`
        );
      }
    } else {
      toast.error(
        response.payload.message ? response.payload.message : "Error"
      );
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
        // if (props === "Close") {
        //   navigate(-1);
        // }
      } else {
        return;
      }
    });
  };
  function CustomToolbar() {
    return (
      <GridToolbarContainer
        key={location.key}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {broken && !rtl && (
          <IconButton
            sx={{ margin: "0 6 0 2" }}
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        )}
        <Box sx={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <Typography variant="h3">{screenName}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <GridToolbarQuickFilter key={accessID} />
          {accessID == "TR002" ? (
            <Tooltip arrow title="Product Tracking">
              <AssessmentIcon
                sx={{ marginTop: "10px" }}
                color="primary"
                onClick={() => {
                  navigate(
                    "/Apps/TR200/Editproducttracking/EditProduct Tracking/1/A"
                  );
                }}
              />
            </Tooltip>
          ) : (
            false
          )}
          {/* {accessID == "TR091" ? (
            <Tooltip arrow title="Price Of Other Customer">
              <AssessmentIcon
                sx={{ marginTop: "10px" }}
                color="primary"
                onClick={() => {
                  navigate("./price-of-other-customer");
                }}
              />
            </Tooltip>
          ) : (
            false
          )} */}
          {/* {accessID == "TR010" ? (
            <Tooltip arrow title="Customer Line Chart">
              <AssessmentIcon
                sx={{ marginTop: "10px" }}
                color="primary"
                onClick={() => {
                  navigate("/Apps/TR400/Editcustomerlinechart/EditCustomer Line Chart/1/A");
                }}
              />
            </Tooltip>
          ) : (
            false
          )} */}
          {accessID == "TR043" ? (
            <Tooltip arrow title="Product Line Chart">
              <AssessmentIcon
                sx={{ marginTop: "10px" }}
                color="primary"
                onClick={() => {
                  navigate(`/Apps/product-analysis/1/E`);
                }}
              />
            </Tooltip>
          ) : (
            false
          )}
          {screenName == "UOM Type" ? (
            false
          ) : screenName == "Invoice Category" ? (
            false
          ) : screenName == "Materials Type" ? (
            false
          ) : accessID == "TR059" ? (
            false
          ) : accessID == "TR072" ? (
            false
          ) : accessID == "TR058" ? (
            false
          ) : accessID == "TR047" ? (
            false
          ) : accessID == "TR076" ? (
            false
          ) : accessID == "TR064" ? (
            false
          ) : accessID == "TR099" ? (
            false
          ) : accessID == "TR043" ? (
            false
          ) : accessID == "TR101" ? (
            false
          ) : accessID == "TR078" ? (
            false
          ) : accessID == "TR116" ? (
            false
          ) : accessID == "TR124" ? (
            false
          ) : accessID == "TR083" ? (
            false
          ) : accessID == "TR136" ? (
            false
          ) : accessID == "TR135" ? (
            false
          ) : (
            // UGA_ADD ? (

            <Tooltip arrow title="Add">
              <IconButton>
                <AddOutlinedIcon
                  onClick={() => {
                    navigate(
                      `./Edit${screenName}/-1/A${
                        accessID === "TR010" ? "/0" : ""
                      }`,
                      {
                        state: {
                          CustomerID: "-1",
                          ProductID: "-1",
                          BomID: "-1",
                        },
                      }
                    );
                  }}
                />
                {/* <AddOutlinedIcon
  onClick={() => {
    navigate(
      `./Edit${screenName}/-1/A${accessID === "TR010" ? "/0" : ""}`,
      {
        state: accessID === "TR014"
          ? { CompanyName: -1 }
          : accessID === "TR095"
          ? { ...st }
          : {
            CustomerID: "-1",
            ProductID: "-1",
            BomID: "-1",
            }
      }
    );
  }}
/> */}
              </IconButton>
            </Tooltip>
          )}
          {/* <Tooltip arrow title="Excel">
            <IconButton  color="primary">
            <input hidden accept="all/*"  type="file" onChange={changeHandler}/>
            <FileUploadIcon />
          </IconButton>
            </Tooltip> */}
          {accessID == "TR064" ? (
            <Tooltip arrow title="Excel">
              <IconButton
                size="large"
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  accept="all/*"
                  type="file"
                  onChange={changeHandler}
                />
                <FileUploadIcon />
              </IconButton>
            </Tooltip>
          ) : (
            false
          )}
          {accessID == "TR059" ? (
            <Tooltip arrow title="Report">
              <AssessmentIcon
                sx={{ marginTop: "10px" }}
                color="primary"
                onClick={() => {
                  navigate("/Apps/TR100/Editreport/EditReport/1/A");
                }}
              />
            </Tooltip>
          ) : (
            false
          )}

          <GridToolbarExport
            printOptions={{ disableToolbarButton: true }}
            csvOptions={{
              fileName: `${screenName}`,
            }}
          />

          <Tooltip arrow title="Logout">
            <IconButton onClick={() => fnLogOut("Logout")} color="error">
              <LogoutOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </GridToolbarContainer>
    );
  }

  // var filter
  // if(accessID == "TR047"){
  //   filter =`Finyear='${year}'`
  // }else {
  //   filter =""
  // }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePagechange = (pageno) => {
    setPage(pageno);
    sessionStorage.setItem("currentPage", pageno);
  };

  return (
    <React.Fragment>
      <Box m="5px">
        {accessID == "TR002" || accessID == "TR044" ? (
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 300,
              height: 30,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search..."
              inputProps={{ "aria-label": "search google maps" }}
              type="text"
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              disabled={searchLoading}
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
            >
              {searchLoading ? (
                <CircularProgress size={20} />
              ) : (
                <SearchIcon onClick={searchProduct} />
              )}
            </IconButton>
          </Paper>
        ) : (
          false
        )}
        <Box
          m="5px 0 0 0"
          padding={2}
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
              // borderBottom: "none",
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
              backgroundColor: "#d0edec",
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
            key={accessID}
            rows={rows}
            // columns={UGA_MOD || UGA_VIEW ? columns : columnShow}
            columns={columns}
            loading={loading}
            disableSelectionOnClick
            getRowId={(row) => row.RecordID}
            rowHeight={dataGridRowHeight}
            headerHeight={dataGridHeaderFooterHeight}
            pageSize={pageSize}
            page={page}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            // rowsPerPageOptions={dataGridPageSizeOption}
            rowsPerPageOptions={[5, 10, 15, 20, 25]}
            onPageChange={(pageno) => handlePagechange(pageno)}
            components={{
              Toolbar: CustomToolbar,
            }}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0
                ? "odd-row"
                : "even-row"
            }
          />
        </Box>
        {accessID == "TR049" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="List of UOM"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR072" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="List Of Process"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR058" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="List of Remarks"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR010" ? (
          <Box
            display="flex"
            flexDirection="row"
            padding="25px"
            sx={{ overflowY: "auto" }}
          >
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            <Chip
              icon={<WysiwygIcon color="primary" />}
              label="Customer Products"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<AssessmentIcon color="primary" />}
              label="Customer Analysis"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<AddPhotoAlternateIcon color="primary" />}
              label="Image Upload"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR099" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="List of User Rights"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR014" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<EditIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            <Chip
              icon={<PinDropIcon color="primary" />}
              label="Locations"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<SubscriptionsIcon color="primary" />}
              label="Subscriptions"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR009" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<EditIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            <Chip
              icon={<AddPhotoAlternateIcon color="primary" />}
              label="Image Upload"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR083" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="List of Colors"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR002" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="Products"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<AddPhotoAlternateIcon color="primary" />}
              label="Image Upload"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR044" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label=" List of Category"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR064" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="List of Stock"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR059" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="List of Delivery Challan"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR078" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR047" ? (
          <Box
            display="flex"
            flexDirection="row"
            padding="25px"
            sx={{ overflowY: "auto" }}
          >
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="Production Card Items"
              variant="outlined"
            />
            <Chip
              icon={<ListAltOutlinedIcon color="error" />}
              label="Indent Items"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<PrintOutlinedIcon color="primary" />}
              label="Print"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<SettingsBackupRestoreIcon color="primary" />}
              label="Process"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<EmailIcon color="primary" />}
              label="Email"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<PlayCircleOutlineOutlinedIcon color="success" />}
              label="Not yet Started"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<NotStartedOutlinedIcon color="primary" />}
              label="Inprogress"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<TaskAltOutlinedIcon color="success" />}
              label="Completed"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<PauseCircleOutlinedIcon color="warning" />}
              label="Pause"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR076" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="List of Batch"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR116" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="Packing List"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR109" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            <Chip
              icon={<PrintOutlinedIcon color="primary" />}
              label="Print"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<EmailIcon color="primary" />}
              label="Email"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR043" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="List of Invoice"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR101" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="Order Enquiry"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR027" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />

            <Chip
              icon={<AddPhotoAlternateIcon color="primary" />}
              label="Image Upload"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR099" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="List of User Rights"
              variant="outlined"
            />
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="List of Users"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR014" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<EditIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="Location"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="Subscription"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<EditIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
          </Box>
        )}
      </Box>
      <MatxCustomizer
        open={open}
        screenName={invoice}
        rowData={mailData}
        type={""}
      />
    </React.Fragment>
  );
};
export default Listview;
