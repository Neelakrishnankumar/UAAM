import {
  TextField,
  Box,
  Typography,
  Stack,
  MenuItem,
  FormControl,
  FormLabel,
  InputLabel,
  Button,
  Select,
  useTheme,
  IconButton,
  Breadcrumbs,
  Tooltip,
  Checkbox,
  LinearProgress,
  Rating,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { Field, Formik } from "formik";
import { fnFileUpload } from "../../../store/reducers/Imguploadreducer";
import { proBomSchema } from "../../Security/validation";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import { useDispatch, useSelector } from "react-redux";
import { GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import store from "../../../index";
import { tokens } from "../../../Theme";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-hot-toast";
import {
  getFetchData,
  postData,
  dpConversionData,
  getVersionJobworkBom,
  explorePostData,
  bomCopyFn,
} from "../../../store/reducers/Formapireducer";
import React, { useState, useEffect, useRef } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Popup from "../popup";
import Listviewpopup from "../Lookup";

// import CryptoJS from "crypto-js";
const EditJobwork = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  const data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const theme = useTheme();
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const colors = tokens(theme.palette.mode);
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");

  const { toggleSidebar, broken, rtl } = useProSidebar();
  const location = useLocation();
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);

  // *************** PAGE VARIABLES *************** //

  const yearData = sessionStorage.getItem("year");
  // const yearFlag = sessionStorage.getItem("YearFlag");

  // *************** PAGE PARAMS *************** //
  const headerID = params.headerid;
  const jobworkCatDescription = params.catName;

  // *************** PAGE STATES *************** //
  const [show, setShow] = useState(1);
  const exploreLoading = useSelector((state) => state.exploreApi.loading);

  // *************** JOBWORK BOM SCREEN SAVE FUNCTION *************** //

  const [refNum, setRefNum] = useState("");
  const [refDate, setRefDate] = useState("");
  const [jobworkCost, setJobworkCost] = useState("");
  const [openSUPPopup, setOpenSUPPopup] = useState(false);
  // *************** REDUX STATES *************** //

  const exploreData = useSelector((state) => state.formApi.exploreData);
  console.log("Display date" + exploreData);
  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );

  // *************** GET FILES FROM INPUT *************** //

  const getFileChange = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "attachments");
    const fileData = await dispatch(
      fnFileUpload(formData, bomRowData.bomRecordID, "TR016")
    );
    // console.log("🚀 ~ file: Editproduct.jsx:647 ~ getFileChange ~ fileData:", fileData)
    setFileName(fileData.payload.apiResponse);
  };

  // *************** INITIALVALUE  *************** //
  const [lookupOpen, setLookupOpen] = useState(false);

  const [hsnLookup, SetHsnLookup] = useState({
    hsnRecordID: "",
    hsnCode: "",
    hsnName: "",
    hsnIgst: "",
    hsnCgst: "",
    hsnSgst: "",
  });
  const [puomLookup, SetPuomLookup] = useState({
    puomRecordID: "",
    puomCode: "",
    puomName: "",
  });
  const [matproductLookup, SetmatproductLookup] = useState({
    matproductRecordID: "",
    matproductcode: "",
    matproductname: "",
    matproductfixedrate: "",
    matproductlatestrate: "",
  });
  console.log(matproductLookup);

  const [cuomLookup, SetCuomLookup] = useState({
    cuomRecordID: "",
    cuomCode: "",
    cuomName: "",
  });

  if (lookupOpen == false) {
    hsnLookup.hsnCode = data.HsnCode;
    hsnLookup.hsnRecordID = data.HsnID;
    hsnLookup.hsnCgst = data.Cgst;
    hsnLookup.hsnSgst = data.Sgst;
    hsnLookup.hsnIgst = data.Igst;

    puomLookup.puomName = data.PUomDescription;
    puomLookup.puomCode = "";
    puomLookup.puomRecordID = data.PurchaseUom;

    cuomLookup.cuomName = data.CUomDescription;
    cuomLookup.cuomCode = "";
    cuomLookup.cuomRecordID = data.ConsumptionUom;
    //material lookup
    matproductLookup.matproductcode = data.MaterialCode;
    matproductLookup.matproductname = data.MaterialName;
    matproductLookup.matproductRecordID = data.MaterialID;
    matproductLookup.matproductfixedrate = data.FixRate;
    matproductLookup.matproductlatestrate = data.LateRate;
  }

  const InitialValue = {
    code: data.Code,
    name: data.Name,
    igst: hsnLookup.hsnIgst,
    cgst: hsnLookup.hsnCgst,
    sgst: hsnLookup.hsnSgst,
    fixedRate: matproductLookup.matproductfixedrate,
    latestRate: matproductLookup.matproductlatestrate,
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
      Name: values.name,
      SortOrder: values.sortorder,
      Disable: isCheck,
      Finyear,
      CompanyID,
      parentID: headerID,
      ConsumptionUom: cuomLookup.cuomRecordID,
      PurchaseUom: puomLookup.puomRecordID,
      HsnID: hsnLookup.hsnRecordID,
      MaterialID: matproductLookup.matproductRecordID,
      FixRate:values.fixedRate,
      LateRate:values.latestRate,
    };

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      if (mode == "A") {
        navigate(
          `/Apps/TR148/Job-Work`
        );
      }
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
            `/Apps/TR148/Job-Work`
          );
          // navigate("Apps/TR146/JobWork Category");
        }
      } else {
        return;
      }
    });
  };

  // *************** JOBWORK BOM SCREEN  *************** //

  const [bomMode, SetBomMode] = useState("A");
  const [fileName, setFileName] = useState("");
  const [matsupdata, setMatsupdata] = useState({
    RecordID: "",
    ApprovedPrice: "",
    LatestPrice: "",
    LatestPurchaseDate: "",
    LatestPurchaseQty: "",
    ReorderQty: "",
    LeadTime: "",
    Ratingormark: "",
    Location: "",
    SortOrder: "",
    Disable: "",
    invoiceNo: "",
  });

  function bomCustomToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>
            {show == 2
              ? "List of Materials"
              : show == 3
              ? "List of Supplier"
              : "List of Leather Bom"}
          </Typography>
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
            <IconButton type="reset">
              <AddOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </GridToolbarContainer>
    );
  }

  /*********************** VISIBLE FIELD IN EXPLORE SCREEN ********************** */

  var VISIBLE_FIELDS = [];
  if (show == 3) {
    VISIBLE_FIELDS = [
      "SLNO",
      "Code",
      "Name",
      "Code",
      "ApprovedPrice",
      "ReorderQty",
      "action",
    ];
  } else if (show == 2) {
    VISIBLE_FIELDS = ["SLNO", "MtlCode", "MtlDesc", "Quantity", "action"];
  } else {
    VISIBLE_FIELDS = ["SLNO", "CustID", "CustName", "AgreedPrice", "action"];
  }

  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );

  const visibleColumns = React.useMemo(
    () =>
      explorelistViewcolumn.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
    [explorelistViewcolumn]
  );

  // *************** JOBWORK EXPLORE SCREEN CHANGE FUNCTION *************** //
  const exploreChange = async (event) => {
    if (event.target.value === 2) {
      const response = await dispatch(getVersionJobworkBom({ recID }));
      if (response.payload.Status == "Y") {
        dispatch(
          fetchExplorelitview(
            "TR149",
            "JobworkBom",
            `'${response.payload.Data.RecordID}'`,
            ""
          )
        );
      } else {
        dispatch(fetchExplorelitview("TR149", "JobworkBom", `'-1' `, ""));
      }
      selectCellBomData({ rowData: {}, mode: "A", field: "" });
    }
    if (event.target.value === 3) {
      // const response = await dispatch(getVersionJobworkBom({ recID }));
      // if (response.payload.Status == "Y") {
      dispatch(fetchExplorelitview("TR158", "Configure supplier", recID, ""));
      // }

      selectCellBomData({ rowData: {}, mode: "A", field: "" });
    }

    //**********CONFIGURE SUPPLIER SCREEN***************//
    setShow(event.target.value);
  };
  const [rowCount, setRowCount] = useState(1);

  // ***************  BOM LOOKUP  *************** //

  const [materialLookup, SetmaterialLookup] = useState({
    matRecordID: "",
    matCode: "",
    matName: "",
    materialRate: "",
    fixedRate: "",
  });

  const [bomRowData, SetBomRowData] = useState({
    bomRecordID: "",
    bomQuantity: "",
    materialCost: "",
  });
  // ***************  CONFIGURE SUPPLIER LOOKUP  *************** //
  const [selectsupLookupData, setselectsupLookupData] = React.useState({
    SUPlookupRecordid: "",
    SUPlookupCode: "",
    SUPlookupDesc: "",
  });
  /**************LOOK UP ONCLICK ***********/

  const [matOpen, setMatOpen] = useState(false);
  const [hsnOpen, setHsnOpen] = useState(false);
  const [puomOpen, setPuomOpen] = useState(false);
  const [cuomsnOpen, setCuomOpen] = useState(false);
  const [materialOpen, setmaterialOpen] = useState(false);
  function handleOpen(params) {
    if (params == "MAT") {
      setMatOpen(true);
    }
    if (params == "HSN") {
      setHsnOpen(true);
    }
    if (params == "MATERIAL") {
      setmaterialOpen(true);
    }
    if (params == "PUOM") {
      setPuomOpen(true);
    }
    if (params == "CUOM") {
      setCuomOpen(true);
    }
    if (params == "SUP") {
      setOpenSUPPopup(true);
    }
  }
  const childToParent = (childdata, type) => {
    console.log(
      "🚀 ~ file: Editproduct.jsx:288 ~ childToParent ~ childdata:",
      childdata
    );

    if (type == "Material") {
      SetmaterialLookup({
        matRecordID: childdata.MaterialRecordID,
        matCode: childdata.Code,
        matName: childdata.Name,
        materialRate: Number(childdata.ConsumptionCost).toFixed(6),
        fixedRate: Number(childdata.Fixrate).toFixed(2),
      });
      setMatOpen(false);
    }
    if (type == "HSN") {
      SetHsnLookup({
        hsnRecordID: childdata.RecordID,
        hsnCode: childdata.Code,
        hsnName: childdata.Name,
        hsnIgst: childdata.Igst,
        hsnCgst: childdata.Cgst,
        hsnSgst: childdata.Sgst,
      });
      setHsnOpen(false);
      setLookupOpen(true);
    }
    if (type == "MATERIAL") {
      SetmatproductLookup({
        matproductRecordID: childdata.RecordID,
        matproductcode: childdata.Code,
        matproductname: childdata.Name,
        matproductfixedrate: childdata.FixRate,
        matproductlatestrate: childdata.LateRate,
      });
      SetPuomLookup({
        puomRecordID: childdata.PUomRecordID,
        puomCode: childdata.PurchaseUomCode,
        puomName: childdata.PurchaseUomName,
      });
      SetHsnLookup({
        hsnRecordID: childdata.HsnRecID,
        hsnCode: childdata.HsnCode,
        hsnIgst: childdata.Igst,
        hsnCgst: childdata.Cgst,
        hsnSgst: childdata.Sgst,
      });
      SetCuomLookup({
        cuomRecordID: childdata.CUomRecordID,
        cuomCode: childdata.ConsumptionUomCode,
        cuomName: childdata.ConsumptionUomName,
      });
      setmaterialOpen(false);
      setLookupOpen(true);
      console.log(childdata);
    }

    if (type == "Purchase UOM") {
      SetPuomLookup({
        puomRecordID: childdata.RecordID,
        puomCode: childdata.Code,
        puomName: childdata.Name,
      });
      setPuomOpen(false);
      setLookupOpen(true);
    }
    if (type == "Consumption UOM") {
      SetCuomLookup({
        cuomRecordID: childdata.RecordID,
        cuomCode: childdata.Code,
        cuomName: childdata.Name,
      });
      setCuomOpen(false);
      setLookupOpen(true);
    }
    if (type == "Supplier") {
      setselectsupLookupData({
        SUPlookupCode: childdata.Code,
        SUPlookupRecordid: childdata.RecordID,
        SUPlookupDesc: childdata.Name,
      });
      setOpenSUPPopup(false);
    }
  };

  const selectCellBomData = ({ rowData, mode, field }) => {
    console.log(
      "🚀 ~ file: Editproduct.jsx:280 ~ selectCellBomData ~ rowData:",
      rowData
    );
    SetBomMode(mode);
    if (mode == "A") {
      SetmaterialLookup({
        matRecordID: "",
        matCode: "",
        matName: "",
        materialRate: "",
        fixedRate: "",
      });
      SetBomRowData({
        bomRecordID: "",
        bomQuantity: "",
        materialCost: "",
      });
      setMatsupdata({
        RecordID: "",
        ApprovedPrice: "",
        LatestPrice: "",
        LatestPurchaseDate: "",
        LatestPurchaseQty: "",
        ReorderQty: "",
        LeadTime: "",
        Ratingormark: "",
        Location: "",
        SortOrder: "",
        Disable: "",
        invoiceNo: "",
      });
      setselectsupLookupData({
        SUPlookupRecordid: "",
        SUPlookupCode: "",
        SUPlookupDesc: "",
      });
    } else {
      if (field == "action") {
        SetmaterialLookup({
          matRecordID: rowData.MtlRecordID,
          matCode: rowData.MtlCode,
          matName: rowData.MtlDesc,
          materialRate: Number(rowData.ConsumptionCost).toFixed(6),
          fixedRate: Number(rowData.Fixrate).toFixed(2),
        });
        SetBomRowData({
          bomRecordID: rowData.RecordID,
          bomQuantity: rowData.Quantity,
          materialCost: "",
        });
        setselectsupLookupData({
          SUPlookupRecordid: rowData.SuppRecordID,
          SUPlookupCode: rowData.Code,
          SUPlookupDesc: rowData.Name,
        });
        setMatsupdata({
          RecordID: rowData.RecordID,
          ApprovedPrice: rowData.ApprovedPrice,
          LatestPrice: rowData.LatestPrice,
          LatestPurchaseDate: rowData.LatestPurchaseDate,
          LatestPurchaseQty: rowData.LatestPurchaseQty,
          ReorderQty: rowData.ReorderQty,
          LeadTime: rowData.LeadTime,
          Ratingormark: rowData.Ratingormark,
          Location: rowData.Location,
          SortOrder: rowData.SortOrder,
          Disable: rowData.Disable,
          invoiceNo: rowData.InvoiceNo,
        });
      }
    }
  };
  const current = new Date();
  var month = `${current.getMonth() + 1}`;
  if (month < 10) {
    month = "0" + month;
  }
  var Day = `${current.getDate()}`;
  if (Day < 10) {
    Day = "0" + Day;
  }
  const currentdate = `${current.getFullYear()}-${month}-${Day}`;

  const jobworkBomFn = async (values, resetForm, del) => {
    // console.log("🚀 ~ file: Editproduct.jsx:652 ~ productBomFn ~ values:", values)

    let action =
      bomMode === "A" && !del
        ? "insert"
        : bomMode === "E" && del
        ? "harddelete"
        : "update";

    const idata = {
      RecordID: bomRowData.bomRecordID,
      JobWorkID: recID,
      MaterialID: materialLookup.matRecordID,
      Quantity: values.quantity,
      MtlCost: (Number(values.quantity) * Number(values.materialRate)).toFixed(
        2
      ),
      ReferenceNo: refNum ? refNum : values.referenceNo,
      Jbhdate: refDate ? refDate : values.referenceDate,
      Jobworkcost: jobworkCost ? jobworkCost || 0 : values.jobworkCost || 0,
      Fixedrate: materialLookup.fixedRate,
    };

    const response = await dispatch(
      explorePostData({ accessID: "TR149", action, idata })
    );
    if (response.payload.Status == "Y") {
      await dispatch(
        fetchExplorelitview(
          "TR149",
          "jobworkbom",
          `'${response.payload.Recid}'`,
          ""
        )
      );
      toast.success(response.payload.Msg);

      selectCellBomData({ rowData: {}, mode: "A", field: "" });
      // resetForm();
    } else {
      toast.error(response.payload.Msg);
    }
  };

  //------------------------CI+ONFIGURE SUPPLIER SAVE FUNCTION---------------------------------------//
  const supmasterInitialvalues = {
    code: data.Code,
    name: data.Name,
    ApprovedPrice: matsupdata.ApprovedPrice,
    LatestPrice: matsupdata.LatestPrice,
    LatestPurchaseDate: matsupdata.LatestPurchaseDate,
    LatestPurchaseQty: matsupdata.LatestPurchaseQty,
    ReorderQty: matsupdata.ReorderQty,
    LeadTime: matsupdata.LeadTime,
    Ratingormark: matsupdata.Ratingormark,
    Location: matsupdata.Location,
    SortOrder: matsupdata.SortOrder,
    checkbox: matsupdata.Disable,
  };

  const csFNSave = async (values, resetform, del) => {
    // setLoading(true);
    let action =
      bomMode === "A" && !del
        ? "insert"
        : bomMode === "E" && del
        ? "harddelete"
        : "update";

    const idata = {
      RecordID: matsupdata.RecordID,
      MaterialID: materialLookup.matRecordID,
      ApprovedPrice: values.ApprovedPrice,
      LatestPrice: values.LatestPrice,
      LatestPurchaseDate: values.LatestPurchaseDate,
      LatestPurchaseQty: values.LatestPurchaseQty,
      ReorderQty: values.ReorderQty,
      LeadTime: values.LeadTime,
      Ratingormark: values.Ratingormark,
      Location: values.Location,
      SuppRecordID: selectsupLookupData.SUPlookupRecordid,
      SortOrder: values.SortOrder,
      OrderQty: "0",
      DeliverQty: "0",
      PendingQty: "0",
      AgreedPrice: "0",
      Disable: values.checkbox,
      JobID: recID,
      Finyear,
      CompanyID,
      InvoiceNo: matsupdata.invoiceNo,
    };
    const response = await dispatch(
      explorePostData({ accessID: "TR158", action, idata })
    );

    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      selectCellBomData({ rowData: {}, mode: "A", field: "" });
      // setLoading(false);
      dispatch(
        fetchExplorelitview("TR158", "configure supplier", `'${recID}'`, "")
      );

      // resetForm();
    } else {
      toast.error(response.payload.Msg);
      selectCellBomData({ rowData: {}, mode: "A", field: "" });
    }
  };

  const bomCopy = async () => {
    // setBomLoading(true)

    const ResponseData = await dispatch(
      bomCopyFn({ data: { JobworkID: recID }, accessID: accessID })
    );
    if (ResponseData.payload.Status == "Y") {
      toast.success("Inserted Successfully");
      navigate(
        `/Apps/Secondarylistview/TR148/Job%20Work/${headerID}/${jobworkCatDescription}`
      );
    }
  };
  return (
    <React.Fragment>
      {getLoading ? <LinearProgress /> : false}
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box display="flex" borderRadius="3px" alignItems="center">
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
                navigate(`/Apps/TR148/Job-Work Component`);
              }}
            >
              List of JobWork
            </Typography>

            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => setShow(1)}
            >
              {data.Name ? data.Name : ""}
            </Typography>
            {show === 2 ? (
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(``);
                }}
              >
                Jobwork BOM
              </Typography>
            ) : (
              false
            )}
            {show == 3 ? (
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                Configure Supplier
              </Typography>
            ) : (
              false
            )}
          </Breadcrumbs>

          {broken && !rtl && (
            <IconButton onClick={() => toggleSidebar()}>
              <MenuOutlinedIcon />
            </IconButton>
          )}
          {/* <Typography variant="h3">Jobwork</Typography> */}
        </Box>
        <Box display="flex">
          {mode == "E" && (
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">Explore</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={show}
                label="Explore"
                onChange={exploreChange}
              >
                <MenuItem value={1}>Jobwork</MenuItem>
                <MenuItem value={2}>BOM</MenuItem>
                <MenuItem value={3}>Configure Supplier</MenuItem>
                <MenuItem onClick={bomCopy}>BOM Copy</MenuItem>
              </Select>
            </FormControl>
          )}
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
      </Box>

      {!getLoading && show == 1 ? (
        <Box m="20px">
          <Formik
            initialValues={InitialValue}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                Fnsave(values);
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
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      // alignItems: "center",
                      gridColumn: "span 2",
                    }}
                  >
                    <TextField
                      id="Code"
                      label="Material"
                      variant="filled"
                      value={matproductLookup.matproductcode}
                      focused
                      required
                      inputProps={{ tabIndex: "-1" }}
                    />
                    <IconButton
                      sx={{ height: 40, width: 40 }}
                      onClick={() => handleOpen("MATERIAL")}
                    >
                      <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                    </IconButton>
                    <TextField
                      id="Name"
                      //label="Material"
                      variant="filled"
                      value={matproductLookup.matproductname}
                      focused
                      required
                      inputProps={{ tabIndex: "-1" }}
                      fullWidth
                    />
                  </Box>

                  {/* <TextField
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
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      name="name"
                      type="text"
                      id="name"
                      label="Description"
                      variant="filled"
                      focused
                      value={values.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                      autoFocus
                      required
                      sx={{ gridColumn: "span 2"}}
                    /> */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gridColumn: "span 2",
                    }}
                  >
                    <TextField
                      id="uomCode"
                      label="Purchase UOM"
                      variant="filled"
                      value={puomLookup.puomName}
                      focused
                      required
                      inputProps={{ tabIndex: "-1" }}
                      fullWidth
                    />
                    <IconButton
                      sx={{ height: 40, width: 40 }}
                      onClick={() => handleOpen("PUOM")}
                    >
                      <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gridColumn: "span 2",
                    }}
                  >
                    <TextField
                      id="uomCode"
                      label="Consumption UOM"
                      variant="filled"
                      value={cuomLookup.cuomName}
                      focused
                      required
                      inputProps={{ tabIndex: "-1" }}
                      fullWidth
                    />
                    <IconButton
                      sx={{ height: 40, width: 40 }}
                      onClick={() => handleOpen("CUOM")}
                    >
                      <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gridColumn: "span 2",
                    }}
                  >
                    <TextField
                      id="hsnCode"
                      label="HSN"
                      variant="filled"
                      value={hsnLookup.hsnCode}
                      focused
                      fullWidth
                      inputProps={{ tabIndex: "-1" }}
                    />
                    <IconButton
                      sx={{ height: 40, width: 40 }}
                      onClick={() => handleOpen("HSN")}
                    >
                      <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                    </IconButton>
                  </Box>
                  <TextField
                    name="igst"
                    type="number"
                    id="igst"
                    label="IGST"
                    variant="filled"
                    focused
                    value={values.igst}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{
                      background: "#fff6c3",
                      gridColumn: "span 2",
                      input: { textAlign: "right" },
                    }}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    name="cgst"
                    type="number"
                    id="cgst"
                    label="CGST"
                    variant="filled"
                    focused
                    value={values.cgst}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{
                      background: "#fff6c3",
                      gridColumn: "span 2",
                      input: { textAlign: "right" },
                    }}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    name="sgst"
                    type="number"
                    id="sgst"
                    label="SGST"
                    variant="filled"
                    focused
                    value={values.sgst}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{
                      background: "#fff6c3",
                      gridColumn: "span 2",
                      input: { textAlign: "right" },
                    }}
                    InputProps={{ readOnly: true }}
                  />

                  <TextField
                    name="fixedRate"
                    type="number"
                    id="fixedRate"
                    label="Fixed Rate"
                    variant="filled"
                    focused
                    value={values.fixedRate}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{ background: "#fff6c3", gridColumn: "span 2" }}
                    onWheel={(e) => e.target.blur()}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
                  />
                  <TextField
                    name="latestRate"
                    type="number"
                    id="latestRate"
                    label="Latest Rate"
                    variant="filled"
                    focused
                    value={values.latestRate}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{ background: "#fff6c3", gridColumn: "span 2" }}
                    onWheel={(e) => e.target.blur()}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
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
                    sx={{ background: "#fff6c3", gridColumn: "span 2" }}
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
                        `/Apps/TR148/Job-Work`
                      );
                      // navigate("Apps/TR146/JobWork Category");
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
                <Popup
                  title="HSN"
                  openPopup={hsnOpen}
                  setOpenPopup={setHsnOpen}
                >
                  <Listviewpopup
                    accessID="2040"
                    screenName="HSN"
                    childToParent={childToParent}
                  />
                </Popup>
                <Popup
                  title="MATERIAL"
                  openPopup={materialOpen}
                  setOpenPopup={setmaterialOpen}
                >
                  <Listviewpopup
                    accessID="2083"
                    screenName="MATERIAL"
                    childToParent={childToParent}
                  />
                </Popup>
                <Popup
                  title="Purchase UOM"
                  openPopup={puomOpen}
                  setOpenPopup={setPuomOpen}
                >
                  <Listviewpopup
                    accessID="2005"
                    screenName="Purchase UOM"
                    childToParent={childToParent}
                    filterName={""}
                    filterValue={"M"}
                  />
                </Popup>
                <Popup
                  title="Consumption UOM"
                  openPopup={cuomsnOpen}
                  setOpenPopup={setCuomOpen}
                >
                  <Listviewpopup
                    accessID="2005"
                    screenName="Consumption UOM"
                    childToParent={childToParent}
                    filterName={""}
                    filterValue={"M"}
                  />
                </Popup>
              </form>
            )}
          </Formik>
        </Box>
      ) : (
        false
      )}
      {show === 2 ? (
        <Box m="10px">
          <Formik
            initialValues={{
              code: data.Code,
              description: data.Name,
              quantity: bomRowData.bomQuantity,
              materialRate: materialLookup.materialRate,
              referenceNo: exploreData != "N" ? exploreData.ReferenceNo : "",
              jobworkCost: exploreData != "N" ? exploreData.JobworkCost : "",
              referenceDate:
                exploreData != "N" ? exploreData.Bhdate : currentdate,
              fixedRate: materialLookup.fixedRate,
            }}
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
              setTimeout(() => {
                jobworkBomFn(values, resetForm, false);
              }, 100);
            }}
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
                  selectCellBomData({ rowData: {}, mode: "A", field: "" });
                }}
              >
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  {/* <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}> */}
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    id="code"
                    name="code"
                    label="Code"
                    value={values.code}
                    focused
                    inputProps={{ readOnly: true }}
                    sx={{ gridColumn: "span 2" }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    id="description"
                    name="description"
                    label="Description"
                    value={values.description}
                    focused
                    inputProps={{ readOnly: true }}
                    sx={{ gridColumn: "span 2" }}
                  />

                  {exploreData != "N" ? (
                    <React.Fragment>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Reference & Version No"
                        name="referenceNo"
                        value={values.referenceNo}
                        required
                        focused
                        inputProps={{ readOnly: true }}
                        sx={{
                          gridColumn: "span 1",
                          background: "#fff6c3",
                          input: { textAlign: "right" },
                        }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Jobwork Cost"
                        name="jobworkCost"
                        value={values.jobworkCost}
                        required
                        focused
                        inputProps={{ readOnly: true }}
                        sx={{
                          gridColumn: "span 1",
                          background: "#fff6c3",
                          input: { textAlign: "right" },
                        }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="Date"
                        label="Date"
                        name="referenceDate"
                        value={values.referenceDate}
                        inputFormat="YYYY-MM-DD"
                        sx={{ gridColumn: "span 2" }}
                        focused
                        inputProps={{ readOnly: true }}
                      />
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Reference & Version No"
                        name="referenceNo"
                        onChange={(e) => setRefNum(e.target.value)}
                        value={refNum}
                        required
                        focused
                        sx={{
                          gridColumn: "span 1",
                          background: "#fff6c3",
                          input: { textAlign: "right" },
                        }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Jobwork Cost"
                        name="jobworkCost"
                        onChange={(e) => setJobworkCost(e.target.value)}
                        value={jobworkCost}
                        required
                        focused
                        inputProps={{ readOnly: true }}
                        sx={{
                          gridColumn: "span 1",
                          background: "#fff6c3",
                          input: { textAlign: "right" },
                        }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="Date"
                        label="Date"
                        name="referenceDate"
                        onChange={(e) => setRefDate(e.target.value)}
                        value={refDate}
                        inputFormat="YYYY-MM-DD"
                        sx={{ gridColumn: "span 2" }}
                        focused
                        // inputProps={{ readOnly: true }}
                      />
                    </React.Fragment>
                  )}
                  <Box sx={{ gridColumn: "span 2" }}>
                    <Box
                      height="500px"
                      sx={{
                        "& .name-column--cell": {
                          color: colors.greenAccent[300],
                        },
                        "& .MuiDataGrid-columnHeaders": {
                          backgroundColor: colors.blueAccent[800],
                        },
                        "& .MuiDataGrid-virtualScroller": {
                          backgroundColor: colors.primary[400],
                        },
                        "& .MuiDataGrid-footerContainer": {
                          backgroundColor: colors.blueAccent[800],
                        },
                        "& .MuiCheckbox-root": {
                          color: `${colors.greenAccent[200]} !important`,
                        },
                      }}
                    >
                      <DataGrid
                        rows={explorelistViewData}
                        columns={visibleColumns}
                        disableSelectionOnClick
                        getRowId={(row) => row.RecordID}
                        onCellClick={(params) => {
                          selectCellBomData({
                            rowData: params.row,
                            mode: "E",
                            field: params.field,
                          });
                        }}
                        rowsPerPageOptions={[5, 10, 20]}
                        pagination
                        components={{
                          Toolbar: bomCustomToolbar,
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

                  <FormControl sx={{ gridColumn: "span 2", gap: "30px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="Material"
                        variant="filled"
                        value={materialLookup.matCode}
                        focused
                        required
                        inputProps={{ tabIndex: "-1" }}
                      />
                      <IconButton
                        sx={{ height: 40, width: 40 }}
                        onClick={() => handleOpen("MAT")}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>

                      <TextField
                        id="outlined-basic"
                        variant="filled"
                        value={materialLookup.matName}
                        fullWidth
                        inputProps={{ tabIndex: "-1" }}
                        focused
                      />
                    </Box>

                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label={`Quantity`}
                      id="quantity"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.quantity}
                      name="quantity"
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                        input: { textAlign: "right" },
                      }}
                      focused
                      onWheel={(e) => e.target.blur()}
                      error={!!touched.quantity && !!errors.quantity}
                      helperText={touched.quantity && errors.quantity}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Fixed Rate"
                        name="fixedRate"
                        id="fixedRate"
                        value={values.fixedRate}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={{
                          gridColumn: "span 2",
                          background: "#fff6c3",
                          input: { textAlign: "right" },
                        }}
                        inputProps={{ readOnly: true }}
                        focused
                      />
                      <TextField
                        fullWidth
                        type="number"
                        variant="filled"
                        label=" Material Cost"
                        id="materialCost"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={(
                          Number(values.quantity) * Number(values.materialRate)
                        ).toFixed(2)}
                        name="materialCost"
                        sx={{
                          gridColumn: "span 2",
                          background: "#fff6c3",
                          input: { textAlign: "right" },
                        }}
                        inputProps={{ readOnly: true }}
                        focused
                      />
                    </Box>
                    {/* <TextField
                      fullWidth
                      type="number"
                      variant="filled"
                      label=" Material Cost"
                      id="materialCost"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={(Number(values.quantity) * Number(values.materialRate)).toFixed(2)}
                      inputProps={{ readOnly: true }}
                      focused
                    /> */}

                    <Box display="flex" justifyContent="end" gap={2}>
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
                                jobworkBomFn(values, resetForm, true);
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
                        <Button
                          color="error"
                          variant="contained"
                          disabled={true}
                        >
                          Delete
                        </Button>
                      )}
                      <Button
                        onClick={() => setShow(1)}
                        color="warning"
                        variant="contained"
                      >
                        Cancel
                      </Button>
                    </Box>
                  </FormControl>
                </Box>
              </form>
            )}
          </Formik>

          <Popup title="Material" openPopup={matOpen} setOpenPopup={setMatOpen}>
            <Listviewpopup
              accessID="2036"
              screenName="Material"
              childToParent={childToParent}
            />
          </Popup>
        </Box>
      ) : (
        false
      )}
      {show == 3 ? (
        <Box m="10px">
          <Formik
            initialValues={supmasterInitialvalues}
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
              setTimeout(() => {
                csFNSave(values, resetForm, false);
              }, 100);
            }}
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
                  selectCellBomData({ rowData: {}, mode: "A", field: "" });
                }}
              >
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      id="code"
                      name="code"
                      label="Code"
                      value={values.code}
                      focused
                      inputProps={{ readOnly: true }}
                      sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      id="description"
                      name="description"
                      label="Description"
                      value={values.name}
                      focused
                      inputProps={{ readOnly: true }}
                      sx={{ gridColumn: "span 2" }}
                    />
                    {/* </FormControl> */}
                    {/* <Stack
                    sx={{
                      gridColumn: "span 2",
                      alignContent: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                      right: "0px",
                    }}
                  ></Stack> */}

                    <Box sx={{ gridColumn: "span 2" }}>
                      <Box
                        height="460px"
                        sx={{
                          "& .name-column--cell": {
                            color: colors.greenAccent[300],
                          },
                          "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: colors.blueAccent[800],
                          },
                          "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: colors.primary[400],
                          },
                          "& .MuiDataGrid-footerContainer": {
                            backgroundColor: colors.blueAccent[800],
                          },
                          "& .MuiCheckbox-root": {
                            color: `${colors.greenAccent[200]} !important`,
                          },
                        }}
                      >
                        <DataGrid
                          rows={explorelistViewData}
                          columns={visibleColumns}
                          disableSelectionOnClick
                          getRowId={(row) => row.RecordID}
                          onCellClick={(params) => {
                            selectCellBomData({
                              rowData: params.row,
                              mode: "E",
                              field: params.field,
                            });
                          }}
                          rowsPerPageOptions={[5, 10, 20]}
                          pagination
                          components={{
                            Toolbar: bomCustomToolbar,
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
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Invoice No"
                      id="InvoiceNo"
                      value={matsupdata.invoiceNo}
                      name="InvoiceNo"
                      focused
                      inputProps={{ readOnly: true }}
                    />
                  </FormControl>
                  <FormControl sx={{ gridColumn: "span 2", gap: "30px" }}>
                    {/* <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="Supply Master"
                        variant="filled"
                        value={selectsupLookupData.SUPlookupRecordid}
                        focused
                        required
                        inputProps={{ tabIndex: "-1" }}
                      />
                      <TextField
                                    id="outlined-basic"
                                    label="Supply Master"
                                    variant="filled"
                                    value={selectsupLookupData.SUPlookupCode}
                                    focused
                                    required
                                    inputProps={{ tabIndex: "-1" }}
                                  />
                      <IconButton
                        sx={{ height: 40, width: 40 }}
                        onClick={() => handleShow("SUP")}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>

                      <TextField
                        id="outlined-basic"
                        variant="filled"
                        value={selectsupLookupData.SUPlookupDesc}
                        fullWidth
                        inputProps={{ tabIndex: "-1" }}
                        focused
                      />
                    </Box> */}
                    <TextField
                      id="outlined-basic"
                      label="ID"
                      variant="filled"
                      value={selectsupLookupData.SUPlookupRecordid}
                      focused
                      sx={{ display: "none" }}
                    />

                    <FormControl
                      sx={{
                        gridColumn: "span 2",
                        display: "flex",
                      }}
                    >
                      {/* <FormLabel>Supply Master</FormLabel> */}
                      <FormControl
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: "230px",
                        }}
                      >
                        <TextField
                          id="outlined-basic"
                          label="Supply Master"
                          variant="filled"
                          value={selectsupLookupData.SUPlookupCode}
                          focused
                          required
                          inputProps={{ tabIndex: "-1" }}
                        />
                        <IconButton
                          sx={{ height: 40, width: 40 }}
                          onClick={() => handleOpen("SUP")}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>
                        {/* <MoreHorizIcon  onClick={()=>handleShow('SUP')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                        <TextField
                          id="outlined-basic"
                          variant="filled"
                          value={selectsupLookupData.SUPlookupDesc}
                          fullWidth
                          inputProps={{ tabIndex: "-1" }}
                          focused
                        />
                      </FormControl>
                    </FormControl>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Approved Price"
                      id="ApprovedPrice"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.ApprovedPrice}
                      name="ApprovedPrice"
                      error={!!touched.ApprovedPrice && !!errors.ApprovedPrice}
                      helperText={touched.ApprovedPrice && errors.ApprovedPrice}
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                      }}
                      focused
                      onWheel={(e) => e.target.blur()}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                      onInvalid={(e) => {
                        e.target.setCustomValidity(
                          "Please Fill The Approved Price"
                        );
                      }}
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Reorder Quantity"
                      id="ReorderQty"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.ReorderQty}
                      name="ReorderQty"
                      error={!!touched.ReorderQty && !!errors.ReorderQty}
                      helperText={touched.ReorderQty && errors.ReorderQty}
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                      }}
                      focused
                      onWheel={(e) => e.target.blur()}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                      onInvalid={(e) => {
                        e.target.setCustomValidity(
                          "Please Fill The Reorder Quantity"
                        );
                      }}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 11);
                        e.target.setCustomValidity("");
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Lead time"
                      id="LeadTime"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.LeadTime}
                      name="LeadTime"
                      error={!!touched.LeadTime && !!errors.LeadTime}
                      helperText={touched.LeadTime && errors.LeadTime}
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                      }}
                      focused
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                      onWheel={(e) => e.target.blur()}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 11);
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Rating"
                      id="Ratingormark"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.Ratingormark}
                      name="Ratingormark"
                      error={!!touched.Ratingormark && !!errors.Ratingormark}
                      helperText={touched.Ratingormark && errors.Ratingormark}
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                      }}
                      focused
                      onWheel={(e) => e.target.blur()}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Latest Price"
                      id="LatestPrice"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.LatestPrice}
                      name="LatestPrice"
                      error={!!touched.LatestPrice && !!errors.LatestPrice}
                      helperText={touched.LatestPrice && errors.LatestPrice}
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                      }}
                      focused
                      onWheel={(e) => e.target.blur()}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="date"
                      label="Latest Purchase Date"
                      id="LatestPurchaseDate"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.LatestPurchaseDate}
                      name="LatestPurchaseDate"
                      //  error={!!touched.latestPurchaseDate && !!errors.latestPurchaseDate}
                      //  helperText={touched.latestPurchaseDate && errors.latestPurchaseDate}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      inputFormat="YYYY-MM-DD"
                      inputProps={{ maxLength: 11 }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Latest Purchase Quantity"
                      id="LatestPurchaseQty"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.LatestPurchaseQty}
                      name="LatestPurchaseQty"
                      error={
                        !!touched.LatestPurchaseQty &&
                        !!errors.LatestPurchaseQty
                      }
                      helperText={
                        touched.LatestPurchaseQty && errors.LatestPurchaseQty
                      }
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                      }}
                      focused
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                      onWheel={(e) => e.target.blur()}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 11);
                      }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Location"
                      id="Location"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.Location}
                      name="Location"
                      error={!!touched.Location && !!errors.Location}
                      helperText={touched.Location && errors.Location}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      inputProps={{ maxLength: 50 }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Sort Order"
                      id="SortOrder"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.SortOrder}
                      name="SortOrder"
                      error={!!touched.SortOrder && !!errors.SortOrder}
                      helperText={touched.SortOrder && errors.SortOrder}
                      sx={{
                        gridColumn: "span 2",
                        background: "#fff6c3",
                      }}
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

                    <Box display="flex" justifyContent="end" gap={2}>
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
                                csFNSave(values, resetForm, true);
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
                        <Button
                          color="error"
                          variant="contained"
                          disabled={true}
                        >
                          Delete
                        </Button>
                      )}
                      <Button
                        onClick={() => setShow(1)}
                        color="warning"
                        variant="contained"
                      >
                        Cancel
                      </Button>
                    </Box>
                  </FormControl>
                </Box>
              </form>
            )}
          </Formik>

          <Popup
            title="Supplier"
            openPopup={openSUPPopup}
            setOpenPopup={setOpenSUPPopup}
          >
            <Listviewpopup
              accessID="2017"
              screenName="Supplier"
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

export default EditJobwork;
