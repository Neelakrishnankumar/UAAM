import {
  Divider,
  Checkbox,
  InputLabel,
  useTheme,
  MenuItem,
  Menu,
  Box,
  Button,
  Breadcrumbs,
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
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Formik, Field } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../index";
import {
  explorePostData,
  fetchApidata,
  postApidata,
  postApidatawol,
  getDeployment,
  postDeployment,
  invoiceExploreGetData,
  postData,
} from "../../../store/reducers/Formapireducer";
import { fnFileUpload } from "../../../store/reducers/Imguploadreducer";
import { fetchComboData1 } from "../../../store/reducers/Comboreducer";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import basicSchema from "../../Security/validation";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Listviewpopup from "../Lookup";
import Popup from "../popup";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { tokens } from "../../../Theme";

import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { imageUpload } from "../../../store/reducers/Imguploadreducer";
// ***********************************************
//  Developer:Gowsalya
// Purpose:To Create Employee

// ***********************************************
const Editemployee = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const listViewData = useSelector((state) => state.listviewApi.rowData);
  const listViewcolumn = useSelector((state) => state.listviewApi.columnData);
  const [pageSize, setPageSize] = React.useState(10);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const YearFlag = sessionStorage.getItem("YearFlag");

  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  const Data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.loading);
  const deploymentData = useSelector((state)=>state.formApi.deploymentData);
  //  console.log("deploymentData",deploymentData);
  const DataExplore = useSelector((state) => state.formApi.inviceEData);
   console.log("🚀 ~ file: Editproformainvoice.jsx:110 ~ DataExplore:", DataExplore)
  const [openDEPopup, setOpenDEPopup] = useState(false);
  const [openLOCATIONPopup, setOpenLOCATIONPopup] = useState(false);
  const [openGATEPopup, setOpenGATEPopup] = useState(false);

  const [openPROPopup, setOpenPROPopup] = useState(false);

  const [Color, setColor] = useState("");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  useEffect(() => {
    dispatch(fetchApidata(accessID, "get", recID));
  }, []);
  const [ini, setIni] = useState(true);
  const [iniProcess, setIniProcess] = useState(true);
  const [loading, setLoading] = useState(false);
  var userimg = store.getState().globalurl.imageUrl;
  if (mode == "A") {
    userimg = userimg + "Defaultimg.jpg";
  } else {
    if (
      Data.ImageName == undefined ||
      Data.ImageName == null ||
      Data.ImageName == ""
    ) {
      userimg = userimg + "Defaultimg.jpg";
    } else {
      userimg = userimg + Data.ImageName;
    }
  }

  var apiData = "";
  apiData = {
    Code: Data.Code,
    Name: Data.Name,
    Job: Data.Job,
    Comm: Data.Comm,
    Mgr: Data.Mgr,
    Sal: Data.Sal,
    Fax: Data.Fax,
    SortOrder: Data.SortOrder,
    Disable: Data.Disable,
    Password: Data.Password,
  };
  //*******Assign Employee values from Database in  Yup initial value******* */
  const initialValues = {
    Code: apiData.Code,
    Name: apiData.Name,
    Job: apiData.Job,
    // DeptRecordID:apiData.DeptRecordID,
    Comm: apiData.Comm,
    Mgr: apiData.Mgr,
    Sal: apiData.Sal,
    Fax: apiData.Fax,
    SortOrder: apiData.SortOrder,
    checkbox: apiData.Disable,
    Password: apiData.Password,
  };

  const [openPopup, setOpenPopup] = useState(false);
  const [isPopupData, setisPopupdata] = React.useState(false);
  const [opendesignPopup, setOpendesignPopup] = useState(false);
  const [openFunPopup, setOpenFunPopup] = useState(false);
  const [openDesPopup, setOpenDesPopup] = useState(false);
  // ************Lookup Function***************
  function handleShow(type) {
    if (type == "DE") {
      setOpenDEPopup(true);
    }
    if (type == "LOCATION") {
      setOpenLOCATIONPopup(true);
    }
    if (type == "GATE") {
      setOpenGATEPopup(true);
    }

    if (type == "PRO") {
      setOpenPROPopup(true);
    }
    if (type == "DESIGN") {
      setOpendesignPopup(true);
    }
    if (type == "FUN") {
      setOpenFunPopup(true);
    }
    if (type == "DISG") {
      setOpenDesPopup(true);
    }
  }

  const [selectLookupData, setselectLookupData] = React.useState({
    lookupRecordid: "",
    lookupCode: "",
    lookupDesc: "",
  });
  const [designLookup, setdesignLookup] = React.useState({
    designlookupRecordid: "",
    designlookupCode: "",
    designlookupDesc: "",
  });
  const [selectproLookupData, setselectproLookupData] = React.useState({
    PROlookupRecordid: "",
    PROlookupCode: "",
    PROlookupDesc: "",
  });

  // ***************  EMPLOYEE-FUNCTION LOOKUP  *************** //

  const [functionLookup, SetFunctionLookup] = useState({
    funRecordID: "",
    funCode: "",
    funName: "",
  });

  const [designationLookup, SetDesignationLookup] = useState({
    desRecordID: "",
    desCode: "",
    desName: "",
  });

  const [locationLookup, SetLocationLookup] = useState({
    locationRecordID: "",
    locationCode: "",
    locationName: "",
  });
  const [gateLookup, SetGateLookup] = useState({
    gateRecordID: "",
    gateCode: "",
    gateName: "",
  });
  if (isPopupData == false) {
    selectLookupData.lookupRecordid = Data.DeptRecordID;
    selectLookupData.lookupCode = Data.DeptCode;
    selectLookupData.lookupDesc = Data.DeptName;

     //Designation
     designLookup.designlookupRecordid = deploymentData.DesignationID;
     designLookup.designlookupCode = deploymentData.DesignationCode;
     designLookup.designlookupDesc = deploymentData.DesignationName;
     //Location
     locationLookup.locationRecordID = deploymentData.LocationID;
     locationLookup.locationCode = deploymentData.LocationCode;
     locationLookup.locationName = deploymentData.LocationName;
 
     //Gate
     gateLookup.gateRecordID = deploymentData.StoregatemasterID;
     gateLookup.gateCode = deploymentData.StoregatemasterCode;
     gateLookup.gateName = deploymentData.StoregatemasterName;
 

  }

  //************************** Lookup value assign type based Function *****************/
  const childToParent = (childdata, type) => {
    console.log("Data---" + JSON.stringify(childdata));
    setisPopupdata(true);
    if (type == "Department") {
      setselectLookupData({
        lookupCode: childdata.Code,
        lookupRecordid: childdata.RecordID,
        lookupDesc: childdata.Name,
      });
      setOpenDEPopup(false);
    }

    if (type == "Process") {
      setselectproLookupData({
        PROlookupCode: childdata.Code,
        PROlookupRecordid: childdata.RecordID,
        PROlookupDesc: childdata.Name,
      });
      setOpenPROPopup(false);
    }
    if (type == "Designation") {
      setdesignLookup({
        designlookupRecordid: childdata.RecordID,
        designlookupCode: childdata.Code,
        designlookupDesc: childdata.Name,
      });
      setOpendesignPopup(false);
    }
    if (type == "Location") {
      SetLocationLookup({
        locationRecordID: childdata.RecordID,
        // locationRecordid: childdata.RecordID,
        locationCode: childdata.Code,
        locationName: childdata.Name,
      });
      setOpenLOCATIONPopup(false);
    }
    if (type == "Gate") {
      SetGateLookup({
        gateRecordID: childdata.RecordID,
        gateCode: childdata.Code,
        gateName: childdata.Name,
      });
      setOpenGATEPopup(false);
    }
    if (type == "Functions") {
      SetFunctionLookup({
        funRecordID: childdata.RecordID,
        funCode: childdata.Code,
        funName: childdata.Name,
      });
      setOpenFunPopup(false);
    }
    if (type == "Designations") {
      SetDesignationLookup({
        desRecordID: childdata.RecordID,
        desCode: childdata.Code,
        desName: childdata.Name,
      });
      setOpenDesPopup(false);
    }
  };
  // **********Save Function*****************
  const fnSave = async (values) => {
    setLoading(true);
    setIni(false);
    if (values.Code == "") {
      toast.error("Please Enter Code");
      return;
    }
    if (values.Name == "") {
      toast.error("Please Enter Description");
      return;
    }
    var isCheck = "N";
    if (values.checkbox == true) {
      isCheck = "Y";
    }

    console.log(locationLookup.locationRecordID, gateLookup.gateRecordID);

    var saveData = {
      RecordID: recID,
      DeptRecordID: selectLookupData.lookupRecordid,
      Code: values.Code,
      Name: values.Name,
      SortOrder: values.SortOrder,
      Disable: values.checkbox === true ? "Y" : "N",
      Job: values.Job,
      Mgr: values.Mgr,
      Sal: values.Sal,
      Comm: values.Comm,
      Password: values.Password,
      DesignID: 0,
      LocationRecID: 0,
      GateRecID: 0,
      WeekOff:0
    };
    var type = "";

    if (mode == "A") {
      type = "insert";
    } else {
      type = "update";
    }

    const data = await dispatch(postApidatawol(accessID, type, saveData));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      setLoading(false);
      navigate(
        `/Apps/TR027/Employees/EditEmployees/${data.payload.apiResponse}/E`
      );
    } else {
      toast.error(data.payload.Msg);
      setLoading(false);
    }
  };

  /**************************************Employee Process***************** */

  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );
  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );
  const exploreLoading = useSelector((state) => state.exploreApi.loading);

  const [show, setScreen] = React.useState("0");
  // material
  const [supprodata, setSupprodata] = useState({
    RecordID: "",
    Comments: "",
    SortOrder: "",
  });
  const [boMode, setBomode] = useState("A");

  
  


  // **********ScreenChange Function*********
  const screenChange = (event) => {
    setScreen(event.target.value);

    if (event.target.value == "1") {
      dispatch(fetchExplorelitview("TR038", "Employee Process", recID, ""));
      dispatch(fetchApidata(accessID, "get", recID));
      selectcelldata("", "A", "");
    }

    if (event.target.value == "0") {
      dispatch(fetchApidata(accessID, "get", recID));
    }
    if (event.target.value == "2") {
      dispatch(fetchExplorelitview("TR125", "Function",`EmployeeID=${recID}` , ""));
      selectCellRowData({ rowData: {}, mode: "A", field: "" });    }
      if (event.target.value == "3") {
        dispatch(fetchExplorelitview("TR126", "Manager",`EmployeeID=${recID}` , ""));
        selectCellRowData({ rowData: {}, mode: "A", field: "" });    }
        if (event.target.value == "4") {
          dispatch(getDeployment({HeaderID:recID}));
          // selectCellRowData({ rowData: {}, mode: "A", field: "" });
    }
        if (event.target.value == "5") {
          dispatch(invoiceExploreGetData({ accessID: "TR209", get: "get", recID }));
            }   
             if (event.target.value == "6") {
        dispatch(fetchExplorelitview("TR210", "Attachment",`EmployeeID=${recID}` , ""));
      selectCellRowData({ rowData: {}, mode: "A", field: "" });
    }
    if (event.target.value == "7") {
      dispatch(
        fetchExplorelitview("TR146", "itemcustody", `EmployeeID=${recID}`, "")
      );
      selectCellRowData({ rowData: {}, mode: "A", field: "" });
    }
    

  };

  /******************Employee values assign a state variale******************** */
  const selectcelldata = (data, bMode, field) => {
    console.log("selectdata" + JSON.stringify(data));

    setBomode(bMode);
    setIniProcess(true);
    if (bMode == "A") {
      setSupprodata({ RecordID: "", Comments: "", SortOrder: "" });
      setselectproLookupData({
        PROlookupRecordid: "",
        PROlookupCode: "",
        PROlookupDesc: "",
      });
    } else {
      if (field == "action") {
        console.log("selectdata" + data.Disable);
        setSupprodata({
          RecordID: data.RecordID,
          Comments: data.Comments,
          SortOrder: data.SortOrder,
        });

        setselectproLookupData({
          PROlookupRecordid: data.PsRecordID,
          PROlookupCode: data.ProcessCode,
          PROlookupDesc: data.ProcessDescription,
        });
      }
    }
  };
  //*******Assign Employee values from Grid table in  Yup initial value******* */
  const supprocessInitialvalues = {
    Comments: supprodata.Comments,
    SortOrder: supprodata.SortOrder,
  };

  /******************************save  Function********** */
  const fnProcess = async (values, resetForm, types) => {
    setIniProcess(false);
    if (types == "harddelete") {
      if (supprodata.RecordID == "") {
        toast.error("Please select Process");
        return;
      }
    }
    if (selectproLookupData.PROlookupCode == "") {
      toast.error("Please Choose Process Lookup");
      return;
    }

    if (values.Comments == "") {
      toast.error("Please Enter Comments");
      return;
    }

    console.log(values);

    var saveData = "";
    var type = "";

    if (types === "harddelete") {
      type = "harddelete";
      saveData = {
        RecordID: supprodata.RecordID,
        EmpRecordID: recID,
        PsRecordID: selectproLookupData.PROlookupRecordid,
        Comments: values.Comments,
        SortOrder: values.SortOrder,
      };
    } else {
      setLoading(true);
      if (boMode == "A") {
        saveData = {
          RecordID: "",
          EmpRecordID: recID,
          PsRecordID: selectproLookupData.PROlookupRecordid,
          Comments: values.Comments,
          SortOrder: values.SortOrder,
        };
        type = "insert";
      } else {
        saveData = {
          RecordID: supprodata.RecordID,
          EmpRecordID: recID,
          PsRecordID: selectproLookupData.PROlookupRecordid,
          Comments: values.Comments,
          SortOrder: values.SortOrder,
        };
        type = "update";
      }
    }
    console.log("save" + JSON.stringify(saveData));

    const data = await dispatch(postApidata("TR038", type, saveData));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      setLoading(false);
      dispatch(fetchExplorelitview("TR038", "Employee Process", recID, ""));
      resetForm();

      setSupprodata({ RecordID: "", Comments: "", SortOrder: "" });
      selectcelldata("", "A", "");
    } else {
      toast.error(data.payload.Msg);
      setLoading(false);
    }
  };
//*********************Contact******************/
const contactInitialvalues = {
  Code: Data.Code,
  Name: Data.Name,
  imageurl: Data.ImageName
? store.getState().globalurl.imageUrl + Data.ImageName
: store.getState().globalurl.imageUrl + "Defaultimg.jpg",
phonenumber:DataExplore.PhoneNumber,
email:DataExplore.Email,
aadharcardnumber:DataExplore.AadharCardNo,
pfnumber:DataExplore.PfNo,
esinumber:DataExplore.EsiNo,
permanentaddress:DataExplore.PermanentAddress,
localaddress:DataExplore.LocalAddress,
};
const fncontact = async (values, types) => {
  
 

  
  console.log(values);

  var saveData = "";
  var type = "";

 
    setLoading(true);
    
      saveData = {
        RecordID: DataExplore.RecordID,
        EmpRecordID: recID,
        PhoneNumber:values.phonenumber,
        Email:values.email,
        AadharCardNo:values.aadharcardnumber,
        PfNo:values.pfnumber,
        EsiNo:values.esinumber,
        PermanentAddress:values.permanentaddress,
        LocalAddress:values.localaddress,
      };
      type = "update";
    
  
  console.log("save" + JSON.stringify(saveData));

  const data = await dispatch(postApidata("TR209", type, saveData));
  if (data.payload.Status == "Y") {
    toast.success(data.payload.Msg);
    setLoading(false);
    dispatch(invoiceExploreGetData({ accessID: "TR209", get: "get", recID }));

    // dispatch(fetchExplorelitview("TR038", "Employee Process", recID, ""));
    // resetForm();

    // setSupprodata({ RecordID: "", Comments: "", SortOrder: "" });
    // selectcelldata("", "A", "");
  } else {
    toast.error(data.payload.Msg);
    setLoading(false);
  }
};
  const style = {
    height: "55px",
    border: "2px solid #1769aa ",
    borderRadius: "5px",
    backgroundColor: "#EDEDED",
  };

  const clrForm = () => {
    setSupprodata({ RecordID: "", Comments: "", SortOrder: "" });
    setselectproLookupData({
      PROlookupRecordid: "",
      PROlookupCode: "",
      PROlookupDesc: "",
    });

    selectcelldata("", "A", "");
  };

  // search

  // const VISIBLE_FIELDS =
  // show === "1"
  //     ? ["SLNO", "ProcessCode", "Comments", "action"]
  //   //   : show === "6"
  //   // ? ["SLNO", "Description","action"]
  //   : show === "2"
  //   ? ["SLNO", "FunctionCode", "FunctionName", "action"]
  //   : ["SLNO", "DesignationCode", "DesignationName", "action"];
  let VISIBLE_FIELDS;

if (show == "6") {
    VISIBLE_FIELDS = ["SLNO", "Description","action"];
} else if (show == "1") {
    VISIBLE_FIELDS = ["SLNO", "ProcessCode", "Comments", "action"];
} else if (show == "2") {
    VISIBLE_FIELDS = ["SLNO", "FunctionCode", "FunctionName", "action"];
} else {
    VISIBLE_FIELDS = ["SLNO", "DesignationCode", "DesignationName", "action"];
}

   

      
  const columns = React.useMemo(
    () =>
      explorelistViewcolumn.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
    [explorelistViewcolumn]
  );

  // **********Grid header function************
  const [rowCount, setRowCount] = useState(0);
  function Custombar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>List of Process</Typography>
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
            <IconButton onClick={() => selectcelldata("", "A", "")}>
              <AddOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </GridToolbarContainer>
    );
  }
  //  function Attachments() {
  //   return (
  //     <GridToolbarContainer
  //       sx={{
  //         display: "flex",
  //         flexDirection: "row",
  //         justifyContent: "space-between",
  //       }}
  //     >
  //       <Box sx={{ display: "flex", flexDirection: "row" }}>
  //         <Typography>
  //           {show == "6" && "List of Attachments"}
  //         </Typography>
  //         <Typography variant="h5">{`(${rowCount})`}</Typography>
  //       </Box>
  //       <Box
  //         sx={{
  //           display: "flex",
  //           flexDirection: "row",
  //           justifyContent: "space-between",
  //         }}
  //       >
  //         <GridToolbarQuickFilter />
  //         <Tooltip title="ADD">
  //           <IconButton type="reset">
  //             <AddOutlinedIcon />
  //           </IconButton>
  //         </Tooltip>
  //       </Box>
  //     </GridToolbarContainer>
  //   );
  // }

  // *************** EMPLOYEE-FUNCTION SCREEN SAVE FUNCTION *************** //

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
          {/* <Typography>
            {show == "2" ? "List of Functions" : "List of Designation"}||{show=="6" && "list of Attachments"}
            
          </Typography> */}
          <Typography>
          {show == "2" ? "List of Functions" : show == "6" ? "List of Attachments" : show == "7" ? "ItemCustody" : "List of Designation"}

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
          <Tooltip title="ADD">
            <IconButton type="reset">
              <AddOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </GridToolbarContainer>
    );
  }
  const [laomode, setLaoMode] = useState("A");
  const [laoEmpRecID, setLaoEmpRecID] = useState("");

  const functionInitialValue = {
    code: Data.Code,
    description: Data.Name,
    imageurl: Data.ImageName
      ? store.getState().globalurl.imageUrl + Data.ImageName
      : store.getState().globalurl.imageUrl + "Defaultimg.jpg",
  };
  const [funMode, setFunMode] = useState("A");
  const [funEmpRecID, setFunEmpRecID] = useState("");

  const [itemCustodyData, setItemCustodyData ] = useState({
    recordID:"",
    itemNO:"",
    itemName:"",
    assestID:"",
    itemValue:"",
    reference:"",
  })


  const selectCellRowData = ({ rowData, mode, field }) => {
    console.log(
      "🚀 ~ file: Editfunction.jsx:178 ~ selectcelldata ~ rowData:",
      rowData
    );

    setFunMode(mode);
    setLaoMode(mode);

    if (mode == "A") {
      setFunMgrRecID("");
      setFunEmpRecID("");
      SetFunctionLookup({
        funRecordID: "",
        funCode: "",
        funName: "",
      });
      SetDesignationLookup({
        desRecordID: "",
        desCode: "",
        desName: "",
      });
      SetEmpLoaData({
        description: "",
        recordID:""
      })
      
        setImgName("")
    
      setItemCustodyData({
        recordID:"",
        itemNO:"",
        itemName:"",
        assestID:"",
        itemValue:"",
        reference:"",   
      })
    } else {
      if (field == "action") {
        setFunMgrRecID(rowData.RecordID);
        setFunEmpRecID(rowData.RecordID);
        SetFunctionLookup({
          funRecordID: rowData.FunctionsID,
          funCode: rowData.FunctionCode,
          funName: rowData.FunctionName,
        });
        SetDesignationLookup({
          desRecordID: rowData.DesignationID,
          desCode: rowData.DesignationCode,
          desName: rowData.DesignationName,
        });
              SetEmpLoaData({
        description: rowData.Description,
        recordID: rowData.RecordID
      })
       setImgName(rowData.Attachment) 
       setItemCustodyData({
        recordID:rowData.RecordID,
        itemNO:rowData.ItemNumber,
        itemName:rowData.ItemName,
        assestID:rowData.ItemValue,
        itemValue:rowData.ItemValue,
        reference:rowData.ItemValue,   
      })
      }
    }
  };
  const empFunctionFn = async (values, resetForm, del) => {
    let action =
      funMode === "A" && !del
        ? "insert"
        : funMode === "E" && del
        ? "harddelete"
        : "update";
    const idata = {
      RecordID: funEmpRecID,
      EmployeeID: recID,
      FunctionsID: functionLookup.funRecordID,
    };
  
    const response = await dispatch(
      explorePostData({ accessID: "TR125", action, idata })
    );
    if (response.payload.Status == "Y") {
      dispatch(
        fetchExplorelitview("TR125", "Function", `EmployeeID=${recID}`, "")
      );

      toast.success(response.payload.Msg);

      selectCellRowData({ rowData: {}, mode: "A", field: "" });
      resetForm();
    } else {
      toast.error(response.payload.Msg);
    }
  };

       // *************** ITEMCUSTODY SCREEN SAVE FUNCTION *************** //

       const itemcustodyInitialValue = {
        code: Data.Code,
        description: Data.Name,
        imageurl: Data.ImageName
          ? store.getState().globalurl.imageUrl + Data.ImageName
          : store.getState().globalurl.imageUrl + "Defaultimg.jpg",
          ItemNumber:itemCustodyData.itemNO,
          ItemName:itemCustodyData.itemName,
          AssestID:itemCustodyData.assestID,
          PurchaseReference:itemCustodyData.reference,
          ItemValue:itemCustodyData.itemValue,
          Disable:"N",
      };
      const empItemCustodyFn = async (values, resetForm, del) => {
        setLoading(true);
        let action =
          funMode === "A" && !del
            ? "insert"
            : funMode === "E" && del
            ? "harddelete"
            : "update";
        const idata = {
          RecordID: itemCustodyData.recordID,
          EmployeeID: recID,
          ItemNumber: values.ItemNumber,
          ItemName: values.ItemName,
          AssestID: values.AssestID,
          PurchaseReference: values.PurchaseReference,
          ItemValue: values.ItemValue,
          Disable: "N",
        };
        // console.log("save" + JSON.stringify(saveData));
    
        const response = await dispatch(
          explorePostData({ accessID: "TR146", action, idata })
        );
        if (response.payload.Status == "Y") {
          setLoading(false);
          dispatch(
            fetchExplorelitview("TR146", "ItemCustody", `EmployeeID=${recID}`, "")
          );
    
          toast.success(response.payload.Msg);
    
          selectCellRowData({ rowData: {}, mode: "A", field: "" });
          resetForm();
        } else {
          setLoading(false);
          toast.error(response.payload.Msg);
        }
      };
    

  // *************** EMPLOYEE-FUNCTION SCREEN SAVE FUNCTION *************** //

  const managerInitialValue = {
    code: Data.Code,
    description: Data.Name,
    imageurl: Data.ImageName
      ? store.getState().globalurl.imageUrl + Data.ImageName
      : store.getState().globalurl.imageUrl + "Defaultimg.jpg",
  };
  const [funMgrRecID, setFunMgrRecID] = useState("");

  const mgrFunctionFn = async (values, resetForm, del) => {
    let action =
      funMode === "A" && !del
        ? "insert"
        : funMode === "E" && del
        ? "harddelete"
        : "update";
    const idata = {
      RecordID: funMgrRecID,
      EmployeeID: recID,
      DesignationID: designationLookup.desRecordID,
    };
    // console.log("save" + JSON.stringify(saveData));

    const response = await dispatch(
      explorePostData({ accessID: "TR126", action, idata })
    );
    if (response.payload.Status == "Y") {
      dispatch(
        fetchExplorelitview("TR126", "Manager", `EmployeeID=${recID}`, "")
      );

      toast.success(response.payload.Msg);

      selectCellRowData({ rowData: {}, mode: "A", field: "" });
      resetForm();
    } else {
      toast.error(response.payload.Msg);
    }
  };

const deploymentInitialValue = {
  code: Data.Code,
  description: Data.Name,
  checkin: deploymentData.CheckInTime,
  checkout: deploymentData.CheckOutTime,
  monday: deploymentData.Monday === "Y" ? true : false,
  tuesday: deploymentData.Tuesday === "Y" ? true : false,
  wednesday: deploymentData.Wednesday === "Y" ? true : false,
  thursday: deploymentData.Thursday === "Y" ? true : false,
  friday: deploymentData.Friday === "Y" ? true : false,
  saturday: deploymentData.Saturday === "Y" ? true : false,
  sunday: deploymentData.Sunday === "Y" ? true : false,
  imageurl: Data.ImageName
    ? store.getState().globalurl.imageUrl + Data.ImageName
    : store.getState().globalurl.imageUrl + "Defaultimg.jpg",
};
// console.log(deploymentInitialValue);
const Fndeployment = async (values, resetForm,del) => {

  const idata = {
   HeaderID:recID,
   CheckInTime:values.checkin,
   CheckOutTime:values.checkout,
   Monday: values.monday === true ? "Y" : "N",
   Tuesday: values.tuesday === true ? "Y" : "N",
   Wednesday: values.wednesday === true ? "Y" : "N",
   Thursday: values.thursday === true ? "Y" : "N",
   Friday: values.friday === true ? "Y" : "N",
   Saturday: values.saturday === true ? "Y" : "N",
   Sunday: values.sunday === true ? "Y" : "N",
   DesignationID: designLookup.designlookupRecordid,
   LocationID: locationLookup.locationRecordID,
   StoregatemasterID: gateLookup.gateRecordID,
   };
 
   const response = await dispatch(
     postDeployment({ data:idata })
   );
   if (response.payload.Status == "Y") {
     toast.success(response.payload.Msg);
   } else {
     toast.error(response.payload.Msg);
   }
  };



  /*************LOA************* */
  const [empLoaData, SetEmpLoaData] = useState({
    recordID: "",
    description:""
  })
  const [bonotifyMode, setnotifyBomode] = useState("6");
  const [selectedFile, setSelectedFile] = useState();
  const [uploadFile, setUploadFile] = useState();
  const [ImageName,setImgName] = useState("")

  const AttachmentInitialValues = {
    code: Data.Code,
    description: Data.Name,
    LoaDescription: empLoaData.description,
     Sortorder:"",
   
  };
 const FnAttachment = async (values, resetForm, del) => {
  
  let action =
      laomode === "A" && !del
        ? "insert"
        : laomode === "E" && del
        ? "harddelete"
        : "update";

    console.log(values);


       const idata = {
          RecordID: empLoaData.recordID,
          EmployeeID: recID,
          Description: values.LoaDescription,
          //  ImageName: ImageName ? ImageName:Data.ImageName,
          Attachment:  ImageName ? ImageName:Data.ImageName,
           Sortorder:"0"
        };
    //     
    console.log("save" + JSON.stringify(idata));

    const response = await dispatch(
      explorePostData({ accessID: "TR210", action, idata })
    );
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      dispatch(fetchExplorelitview("TR210", "List Of Attachments", `EmployeeID=${recID}`, ""));
      resetForm();
      // SetEmpLoaData({
      //   RecordID: "",
      //   LoaDescription: "",
      //   Attachment: "",
      //   Sortorder:"0"
      // });
      setUploadFile("");
     selectCellRowData({ rowData: {}, mode: "A", field: "" });
      resetForm();
    } else {
      toast.error(response.payload.Msg);
     
    }
  };
  const changeHandler = async (event) => {
    setSelectedFile(event.target.files[0]);

    console.log(event.target.files[0]);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "attachments");

    const fileData = await dispatch(
      fnFileUpload(formData)
    );

    console.log("fileData" + JSON.stringify(fileData));
    setUploadFile(fileData.payload.apiResponse);
  };
  const fnViewFile = () => {
    var filePath = store.getState().globalurl.attachmentUrl + uploadFile;

    if (uploadFile == "" || uploadFile == undefined) {
      toast.error("Please Upload File");
      return;
    } else {
      window.open(filePath, "_blank");
    }
  };
 const getFileChange = async (event) => {
    
    setImgName(event.target.files[0]);

    console.log(event.target.files[0]);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "attachments");
  
    const fileData = await dispatch(
      imageUpload({formData})
    );
    setImgName(fileData.payload.name)
    console.log(">>>",fileData.payload)
    console.log("🚀 ~ file: Editdeliverychalan.jsx:1143 ~ getFileChange ~ fileData:", fileData)
    if (fileData.payload.Status == "Y") {
     // console.log("I am here");
     toast.success(fileData.payload.Msg);
     
   }
 
}
  const fnLogOut = (props) =>{
      Swal.fire({
        title: `Do you want ${props}?`,
        // text:data.payload.Msg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: props
      }).then( (result)=>{
          if(result.isConfirmed){
            if(props === 'Logout'){
            navigate("/")}
            if(props === 'Close'){
              navigate("/Apps/TR027/Employees")
            }
          }else{
            return
          }
      })
    }
  return (
    <React.Fragment>
      <Box sx={{ height: "100vh", overflow: "auto" }}>
        <Box display="flex" justifyContent="space-between" p={2}>
          {/* SEARCH BAR */}
          <Box
            display="flex"
            // backgroundColor={colors.primary[400]}
            borderRadius="3px"
            alignItems={"center"}
          >
             {broken && !rtl && (
          <IconButton
            
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        )}
         <Box display={isNonMobile ? 'flex' : 'none'} borderRadius="3px" alignItems="center">
        <Breadcrumbs maxItems={3} aria-label="breadcrumb" separator={<NavigateNextIcon sx={{color:'#0000D1'}}/>}>
        <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} onClick={()=> {setScreen(0)}}>Employee</Typography>
{show == "5" ? (<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  >Contact</Typography>):false}
{show == "1" ? (<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  >Employee Process</Typography>):false}
{show == "2" ? (<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  >Functions</Typography>):false}
{show == "3" ? (<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  >Managers</Typography>):false}
{show == "4" ? (<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  >Deployment</Typography>):false}
{show == "6" ? (<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  >List of Attachments</Typography>):false}
{show == "7" ? (<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  >ItemCustody</Typography>):false}

        </Breadcrumbs>
        </Box>
            {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton> */}

            {/* {show=="2" ? <Typography variant="h3">Supplier Notification</Typography>:false} */}
          </Box>

          {/* ICONS */}

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
                  <MenuItem value={0}>Employee</MenuItem>
                  <MenuItem value={5}>Contact</MenuItem>
                  <MenuItem value={1}>Employee Process</MenuItem>
                  <MenuItem value={2}>Functions</MenuItem>
                  <MenuItem value={3}>Managers</MenuItem>
                  <MenuItem value={4}>Deployment</MenuItem>
                   <MenuItem value={6}>List of Attachments</MenuItem>
                   <MenuItem value={7}>ItemCustody</MenuItem>

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

        {show == "0" ? (
          <Box m="20px">
            {/* { <Header title="Products" subtitle="" /> } */}

            <Formik
              // onSubmit={handleFormSubmit}
              initialValues={initialValues}
              enableReinitialize={true}
              validationSchema={basicSchema}
            >
              {({ values, errors, touched, handleBlur, handleChange }) => (
                <form>
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
                    {!isNonMobile && (
                      <Stack
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
                        <Avatar
                          variant="rounded"
                          src={userimg}
                          sx={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}

                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <TextField
                        id="outlined-basic"
                        label="ID"
                        variant="filled"
                        value={selectLookupData.lookupRecordid}
                        focused
                        sx={{ display: "none" }}
                      />
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
                          label="Department"
                          variant="filled"
                          value={selectLookupData.lookupCode}
                          focused
                          required
                          DE
                          inputProps={{ tabIndex: "-1" }}
                        />
                        {/* <Button  variant='contained'  sx={{height:'30px',width:'30px',mt:'9px'}} > */}
                        {/* <MoreHorizIcon onClick={()=>handleShow('DE')} color='white' sx={{height:'30px',}} mt='15px' fontSize='medium' /> */}
                        {/* </Button> */}
                        <IconButton
                          sx={{ height: 40, width: 40 }}
                          onClick={() => handleShow("DE")}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>
                        <TextField
                          id="outlined-basic"
                          label=""
                          variant="filled"
                          value={selectLookupData.lookupDesc}
                          fullWidth
                          focused
                          inputProps={{ tabIndex: "-1" }}
                        />
                      </FormControl>

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Code"
                        value={values.Code}
                        id="Code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Code"
                        // error={!!touched.Code && !!errors.Code}
                        // helperText={touched.Code && errors.Code}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        required
                        autoFocus
                        inputProps={{ maxLength: 8 }}
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Name"
                        value={values.Name}
                        id="Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Name"
                        // error={!!touched.Name && !!errors.Name}
                        // helperText={touched.Name && errors.Name}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        inputProps={{ maxLength: 90 }}
                        multiline
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="Password"
                        label="Password"
                        value={values.Password}
                        id="Password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Password"
                        // error={!!touched.Password && !!errors.Password}
                        // helperText={touched.Password && errors.Password}
                        focused
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Job"
                        value={values.Job}
                        id="Job"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Job"
                        error={!!touched.Job && !!errors.Job}
                        helperText={touched.Job && errors.Job}
                        focused
                        inputProps={{ maxLength: 90 }}
                      />
                      {/* <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Comments"
                        value={values.Comm}
                        id="Comm"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Comm"
                        error={!!touched.Comm && !!errors.Comm}
                        helperText={touched.Comm && errors.Comm}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        inputProps={{ maxLength: 90 }}
                        multiline
                        rows={2}
                      /> */}

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

                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      {isNonMobile && (
                        <Stack
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
                          <Avatar
                            variant="rounded"
                            src={userimg}
                            sx={{ width: "200px", height: "150px" }}
                          />
                        </Stack>
                      )}

                      {/* <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Manager"
                        value={values.Mgr}
                        id="Mgr"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Mgr"
                        error={!!touched.Mgr && !!errors.Mgr}
                        helperText={touched.Mgr && errors.Mgr}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        inputProps={{ maxLength: 90 }}
                       
                      /> */}
                      
                      
                      
                      {/* <FormControl
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
                        value={designLookup.designlookupRecordid}
                        focused
                        sx={{ display: "none" }}
                      />

                        <TextField
                          id="outlined-basic"
                          label="Designation"
                          variant="filled"
                          value={designLookup.designlookupCode}
                          focused
                          required
                          DE
                          inputProps={{tabIndex:"-1"}}
                        />
                        {/* <Button  variant='contained'  sx={{height:'30px',width:'30px',mt:'9px'}} > */}
                      {/* <MoreHorizIcon onClick={()=>handleShow('DE')} color='white' sx={{height:'30px',}} mt='15px' fontSize='medium' /> */}
                      {/* </Button> */}
                      {/* <IconButton
                          sx={{ height: 40, width: 40 }}
                          onClick={() => handleShow("DESIGN")}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>
                        <TextField
                          id="outlined-basic"
                          label=""
                          variant="filled"
                          value={designLookup.designlookupDesc}
                          fullWidth
                          focused
                          inputProps={{tabIndex:"-1"}}
                        />
                      </FormControl> */} 
 <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Comments"
                        value={values.Comm}
                        id="Comm"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Comm"
                        error={!!touched.Comm && !!errors.Comm}
                        helperText={touched.Comm && errors.Comm}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        inputProps={{ maxLength: 90 }}
                        multiline
                        rows={2}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Salary"
                        value={values.Sal}
                        id="Sal"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Sal"
                        error={!!touched.Sal && !!errors.Sal}
                        helperText={touched.Sal && errors.Sal}
                        sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                        focused
                        onWheel={(e) => e.target.blur()} 
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 8);
                        }}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Sort Order"
                        value={values.SortOrder}
                        id="SortOrder"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="SortOrder"
                        error={!!touched.SortOrder && !!errors.SortOrder}
                        helperText={touched.SortOrder && errors.SortOrder}
                        sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                        focused
                        onWheel={(e) => e.target.blur()} 
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 8);
                        }}
                        
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                      />
                    </FormControl>
                  </Box>
                  <Box display="flex" justifyContent="end" style={{ marginTop: "-10px" }} gap={2}>
                    {YearFlag == "true" ? (
                      <LoadingButton
                        color="secondary"
                        variant="contained"
                        type="submit"
                        loading={loading}
                        onClick={() => {
                          fnSave(values);
                        }}
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
                      color="warning"
                      variant="contained"
                      onClick={() => {
                        navigate(`/Apps/TR027/Employees`);
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                  <Popup
                    title="Department"
                    openPopup={openDEPopup}
                    setOpenPopup={setOpenDEPopup}
                  >
                    <Listviewpopup
                      accessID="2010"
                      screenName="Department"
                      childToParent={childToParent}
                    />
                  </Popup>
                  <Popup
                    title="Location"
                    openPopup={openLOCATIONPopup}
                    setOpenPopup={setOpenLOCATIONPopup}
                  >
                    <Listviewpopup
                      accessID="2051"
                      screenName="Location"
                      childToParent={childToParent}
                    />
                  </Popup>
                  <Popup
                    title="Gate"
                    openPopup={openGATEPopup}
                    setOpenPopup={setOpenGATEPopup}
                  >
                    <Listviewpopup
                      accessID="2050"
                      screenName="Gate"
                      childToParent={childToParent}
                    />
                  </Popup>
                  <Popup
                    title="Designation"
                    openPopup={opendesignPopup}
                    setOpenPopup={setOpendesignPopup}
                  >
                    <Listviewpopup
                      accessID="2047"
                      screenName="Designation"
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
{show == "5" ? (
          <Box m="10px">
            <Formik
              initialValues={contactInitialvalues}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  fncontact(values, resetForm, false);
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
                    selectCellRowData({ rowData: {}, mode: "A", field: "" });
                    resetForm();
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
                        id="Code"
                        name="Code"
                        value={values.Code}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Code"
                        focused
                        // inputProps={{ readOnly: true }}
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        id="Name"
                        name="Name"
                        value={values.Name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Name"
                        focused
                        // inputProps={{ readOnly: true }}
                      />
                      
                    </FormControl>
                    <Stack
                      sx={{
                        gridColumn: "span 2",
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        right: "0px",
                      }}
                      
                    >
                    
                      <img
                        src={userimg}
                        style={{ width: "200px", height: "150px" }}
                      />
                    </Stack>

                   
                   
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        id="phonenumber"
                        name="phonenumber"
                       
                        value={values.phonenumber}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Phone No"
                        focused
                        onWheel={(e) => e.target.blur()} 
                        sx={{gridColumn:"span 2"}}
                       
                      />
                       <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        id="email"
                        name="email"
                       
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Email Id"
                        focused
                        sx={{gridColumn:"span 2"}}
                      />
                     <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        id="aadharcardnumber"
                        name="aadharcardnumber"
                       
                        value={values.aadharcardnumber}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Aadhar Card No"
                        focused
                        onWheel={(e) => e.target.blur()} 
                        sx={{gridColumn:"span 2"}}
                      />
                     <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        id="pfnumber"
                        name="pfnumber"
                       
                        value={values.pfnumber}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="PF No"
                        focused
                        onWheel={(e) => e.target.blur()} 
                        sx={{gridColumn:"span 2"}}
                      />
                     <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        id="esinumber"
                        name="esinumber"
                        inputFormat="HH:mm:aa"
                        value={values.esinumber}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="ESI No"
                        focused
                        onWheel={(e) => e.target.blur()} 
                        sx={{gridColumn:"span 2"}}
                      />
                     <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        id="permanentaddress"
                        name="permanentaddress"
                       multiline
                        value={values.permanentaddress}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Permanent Address"
                        focused
                        sx={{gridColumn:"span 2"}}
                      />
                     <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        id="localaddress"
                        name="localaddress"
                        multiline
                        value={values.localaddress}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Local Address"
                        focused
                        sx={{gridColumn:"span 2"}}
                      />
                   </Box>
                  
                 
                  <Box display="flex" justifyContent="end" mt="10px" gap={2}>
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
                    {/* {YearFlag == "true" ? (
                      <Button
                        onClick={() => mgrFunctionFn(values, resetForm, true)}
                        color="error"
                        variant="contained"
                      >
                        Delete
                      </Button>
                    ) : (
                      <Button color="error" variant="contained" disabled={true}>
                        Delete
                      </Button>
                    )} */}
                    <Button type="reset" color="warning" variant="contained" 
                     onClick={() => {
                      setScreen(0);
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
          <Box m="20px" sx={{ m: 2 }}>
            <Formik
              // onSubmit={handleFormSubmit}
              initialValues={initialValues}
              enableReinitialize={ini}
              validationSchema={basicSchema}
            >
              {({ values, errors, touched, handleBlur, handleChange }) => (
                <form>
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
                    {!isNonMobile && (
                      <Stack
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
                        <Avatar
                          variant="rounded"
                          src={userimg}
                          sx={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}

                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        inputProps={{ maxLength: 8 }}
                        value={values.Code}
                        id="Code"
                        name="Code"
                        label="Code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={{ gridColumn: "span 2" }}
                        focused

                        //  error={!!touched.Desc && !!errors.Desc}
                        //  helperText={touched.Desc && errors.Desc}
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Name"
                        value={values.Name}
                        id="Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Name"
                        error={!!touched.Name && !!errors.Name}
                        helperText={touched.Name && errors.Name}
                        sx={{ gridColumn: "span 2" }}
                        focused
                        inputProps={{ maxLength: 90 }}
                        multiline
                      />

                      <Box m="5px">
                        <Box
                          m="5px 0 0 0"
                          height="55vh"
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
                            rowsPerPageOptions={[5, 10, 20]}
                            pagination
                            onCellClick={(params) => {
                              const currentRow = params.row;
                              const currentcellField = params.field;
                              selectcelldata(currentRow, "E", currentcellField);
                              console.log(JSON.stringify(params));
                            }}
                            components={{
                              Toolbar: Custombar,
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
                    </FormControl>
                    <FormControl sx={{ gridColumn: "span 2",mt:"15px", gap: "40px" }}>
                      <Formik
                        initialValues={supprocessInitialvalues}
                        enableReinitialize={iniProcess}
                        validationSchema={basicSchema}
                        onSubmit={async (values) => {
                          alert("submit", values);
                        }}
                      >
                        {({
                          values,
                          errors,
                          touched,
                          handleBlur,
                          handleChange,
                          resetForm,
                        }) => (
                          <form>
                            <FormControl
                              sx={{ gridColumn: "span 2", gap: "40px" }}
                              style={{ width: "100%" }}
                            >
                              {isNonMobile && (
                                <Stack
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
                                  <Avatar
                                    variant="rounded"
                                    src={userimg}
                                    sx={{ width: "200px", height: "150px" }}
                                  />
                                </Stack>
                              )}

                              <FormControl
                                sx={{
                                  gridColumn: "span 2",
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  marginTop: "50px",
                                }}
                              >
                                <TextField
                                  id="outlined-basic"
                                  label="ID"
                                  variant="filled"
                                  value={selectproLookupData.PROlookupRecordid}
                                  focused
                                  sx={{ display: "none" }}
                                />

                                <TextField
                                  id="outlined-basic"
                                  label="Process"
                                  variant="filled"
                                  value={selectproLookupData.PROlookupCode}
                                  focused
                                  required
                                  inputProps={{ tabIndex: "-1" }}
                                />
                                {/* <Button  variant='contained'  sx={{height:'30px',width:'30px',mt:'9px'}} > */}
                                {/* <MoreHorizIcon onClick={()=>handleShow('SM')} color='white' sx={{height:'30px',}} mt='15px' fontSize='medium' /> */}
                                <IconButton
                                  sx={{ height: 40, width: 40 }}
                                  onClick={() => handleShow("PRO")}
                                >
                                  <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                </IconButton>
                                {/* </Button> */}
                                <TextField
                                  id="outlined-basic"
                                  variant="filled"
                                  value={selectproLookupData.PROlookupDesc}
                                  fullWidth
                                  focused
                                  inputProps={{ tabIndex: "-1" }}
                                />
                              </FormControl>

                              <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                value={values.Comments}
                                id="Comments"
                                name="Comments"
                                label="Comments"
                                required
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!touched.Comments && !!errors.Comments}
                                helperText={touched.Comments && errors.Comments}
                                sx={{
                                  gridColumn: "span 2",
                                }}
                                focused
                                multiline
                                inputProps={{ maxLength: 90 }}
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
                                error={
                                  !!touched.SortOrder && !!errors.SortOrder
                                }
                                helperText={
                                  touched.SortOrder && errors.SortOrder
                                }
                                sx={{ gridColumn: "span 2" }}
                                focused
                                onWheel={(e) => e.target.blur()} 
                                InputProps={{
                                  inputProps: {
                                    style: {
                                      textAlign: "right",
                                      background: "#fff6c3",
                                    },
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
                              {/* <FormControlLabel  control={ <Field type="checkbox" name="checkbox" id="checkbox"  label="Disable" />} label="Disable" /> */}
                            </FormControl>

                            <Box
                              display="flex"
                              justifyContent="end"
                              mt="30px"
                              gap={2}
                            >
                              {YearFlag == "true" ? (
                                <LoadingButton
                                  color="secondary"
                                  variant="contained"
                                  type="submit"
                                  loading={loading}
                                  onClick={() => {
                                    fnProcess(values, resetForm, "");
                                  }}
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
                                  color="error"
                                  variant="contained"
                                  onClick={() => {
                                    fnProcess(values, resetForm, "harddelete");
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
                              title="Process"
                              openPopup={openPROPopup}
                              setOpenPopup={setOpenPROPopup}
                            >
                              <Listviewpopup
                                accessID="2001"
                                screenName="Process"
                                childToParent={childToParent}
                              />
                            </Popup>
                          </form>
                        )}
                      </Formik>
                    </FormControl>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        ) : (
          false
        )}
        {show == "2" ? (
          <Box m="10px">
            <Formik
              initialValues={functionInitialValue}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  empFunctionFn(values, resetForm, false);
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
                    selectCellRowData({ rowData: {}, mode: "A", field: "" });
                    resetForm();
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
                        value={values.code}
                        label="Model"
                        focused
                        inputProps={{ readOnly: true }}
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        id="description"
                        name="description"
                        value={values.description}
                        label="Description"
                        focused
                        inputProps={{ readOnly: true }}
                      />
                    </FormControl>
                    <Stack
                      sx={{
                        gridColumn: "span 2",
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        right: "0px",
                      }}
                    >
                      <img
                        src={values.imageurl}
                        style={{ width: "200px", height: "150px" }}
                      />
                    </Stack>
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
                            selectCellRowData({
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
                          id="function"
                          label="Function"
                          variant="filled"
                          focused
                          required
                          inputProps={{ tabIndex: "-1" }}
                          value={functionLookup.funCode}
                        />
                        <IconButton
                          onClick={() => handleShow("FUN")}
                          sx={{ height: 40, width: 40 }}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>
                        <TextField
                          id="dies"
                          variant="filled"
                          fullWidth
                          inputProps={{ tabIndex: "-1" }}
                          focused
                          value={functionLookup.funName}
                        />
                      </Box>
                    </FormControl>
                  </Box>
                  <Box display="flex" justifyContent="end" style={{ marginTop: "-32px" }} gap={2}>
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
                        onClick={() => empFunctionFn(values, resetForm, true)}
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
                    <Button type="reset" color="warning" variant="contained">
                      Cancel
                    </Button>
                  </Box>
                  <Popup
                    title="Functions"
                    openPopup={openFunPopup}
                    setOpenPopup={setOpenFunPopup}
                  >
                    <Listviewpopup
                      accessID="2048"
                      screenName="Functions"
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

        {show == "3" ? (
          <Box m="10px">
            <Formik
              initialValues={managerInitialValue}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  mgrFunctionFn(values, resetForm, false);
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
                    selectCellRowData({ rowData: {}, mode: "A", field: "" });
                    resetForm();
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
                        value={values.code}
                        label="Model"
                        focused
                        inputProps={{ readOnly: true }}
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        id="description"
                        name="description"
                        value={values.description}
                        label="Description"
                        focused
                        inputProps={{ readOnly: true }}
                      />
                    </FormControl>
                    <Stack
                      sx={{
                        gridColumn: "span 2",
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        right: "0px",
                      }}
                    >
                      <img
                        src={values.imageurl}
                        style={{ width: "200px", height: "150px" }}
                      />
                    </Stack>
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
                            selectCellRowData({
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
                          id="manager"
                          label="Manager"
                          variant="filled"
                          focused
                          required
                          inputProps={{ tabIndex: "-1" }}
                          value={designationLookup.desCode}
                        />
                        <IconButton
                          onClick={() => handleShow("DISG")}
                          sx={{ height: 40, width: 40 }}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>
                        <TextField
                          id="dies"
                          variant="filled"
                          fullWidth
                          inputProps={{ tabIndex: "-1" }}
                          focused
                          value={designationLookup.desName}
                        />
                      </Box>
                    </FormControl>
                  </Box>
                  <Box display="flex" justifyContent="end" style={{ marginTop: "-32px" }}  gap={2}>
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
                        onClick={() => mgrFunctionFn(values, resetForm, true)}
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
                    <Button type="reset" color="warning" variant="contained">
                      Cancel
                    </Button>
                  </Box>
                  <Popup
                    title="Functions"
                    openPopup={openFunPopup}
                    setOpenPopup={setOpenFunPopup}
                  >
                    <Listviewpopup
                      accessID="2048"
                      screenName="Functions"
                      childToParent={childToParent}
                    />
                  </Popup>
                  <Popup
                    title="Designations"
                    openPopup={openDesPopup}
                    setOpenPopup={setOpenDesPopup}
                  >
                    <Listviewpopup
                      accessID="2049"
                      screenName="Designations"
                      childToParent={childToParent}
                      filterName={"Rank"}
                      filterValue={Data.Rank}
                    />
                  </Popup>
              </form>
            )}
          </Formik>
        </Box>
      ) : (
        false
      )}
 {show == "4" ? (
          <Box m="10px">
            <Formik
              initialValues={deploymentInitialValue}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  Fndeployment(values, resetForm, false);
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
                    selectCellRowData({ rowData: {}, mode: "A", field: "" });
                    resetForm();
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
                        value={values.code}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Model"
                        focused
                        // inputProps={{ readOnly: true }}
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        id="description"
                        name="description"
                        value={values.description}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Description"
                        focused
                        // inputProps={{ readOnly: true }}
                      />
                      {/* <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        id="checkin"
                        name="checkin"
                        value={values.checkin}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Checkin"
                        focused
                        // inputProps={{ maxLength:20}}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        id="checkout"
                        name="checkout"
                        value={values.checkout}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Checkout"
                        focused
                        // inputProps={{ readOnly: true }}
                      /> */}
                      {/* <TextField
                        fullWidth
                        variant="filled"
                        label="Checkin"
                        type="text"
                        id="checkin"
                        name="checkin"
                        value={values.checkin}
                      /> */}
                    </FormControl>
                    <Stack
                      sx={{
                        gridColumn: "span 2",
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        right: "0px",
                      }}
                    >
                      <img
                        src={values.imageurl}
                        style={{ width: "200px", height: "150px" }}
                      />
                    </Stack>

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
                          value={designLookup.designlookupRecordid}
                          focused
                          sx={{ display: "none" }}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Designation"
                          variant="filled"
                          value={designLookup.designlookupCode}
                          focused
                          required
                          DESIGN
                          inputProps={{ tabIndex: "-1" }}
                        />
                        {/* <Button  variant='contained'  sx={{height:'30px',width:'30px',mt:'9px'}} > */}
                        {/* <MoreHorizIcon onClick={()=>handleShow('DE')} color='white' sx={{height:'30px',}} mt='15px' fontSize='medium' /> */}
                        {/* </Button> */}
                        <IconButton
                          sx={{ height: 40, width: 40 }}
                          onClick={() => handleShow("DESIGN")}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>
                        <TextField
                          id="outlined-basic"
                          label=""
                          variant="filled"
                          value={designLookup.designlookupDesc}
                          fullWidth
                          focused
                          inputProps={{ tabIndex: "-1" }}
                        />
                      </FormControl>
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
                          value={locationLookup.locationRecordID}
                          focused
                          sx={{ display: "none" }}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Location"
                          variant="filled"
                          value={locationLookup.locationCode}
                          focused
                          required
                          DESIGN
                          inputProps={{ tabIndex: "-1" }}
                        />
                        {/* <Button  variant='contained'  sx={{height:'30px',width:'30px',mt:'9px'}} > */}
                        {/* <MoreHorizIcon onClick={()=>handleShow('DE')} color='white' sx={{height:'30px',}} mt='15px' fontSize='medium' /> */}
                        {/* </Button> */}
                        <IconButton
                          sx={{ height: 40, width: 40 }}
                          onClick={() => handleShow("LOCATION")}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>
                        <TextField
                          id="outlined-basic"
                          label=""
                          variant="filled"
                          value={locationLookup.locationName}
                          fullWidth
                          focused
                          inputProps={{ tabIndex: "-1" }}
                        />
                      </FormControl>
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
                          value={gateLookup.gateRecordID}
                          focused
                          sx={{ display: "none" }}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Gate"
                          variant="filled"
                          value={gateLookup.gateCode}
                          focused
                          required
                          DESIGN
                          inputProps={{ tabIndex: "-1" }}
                        />
                        {/* <Button  variant='contained'  sx={{height:'30px',width:'30px',mt:'9px'}} > */}
                        {/* <MoreHorizIcon onClick={()=>handleShow('DE')} color='white' sx={{height:'30px',}} mt='15px' fontSize='medium' /> */}
                        {/* </Button> */}
                        <IconButton
                          sx={{ height: 40, width: 40 }}
                          onClick={() => handleShow("GATE")}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>
                        <TextField
                          id="outlined-basic"
                          label=""
                          variant="filled"
                          value={gateLookup.gateName}
                          fullWidth
                          focused
                          inputProps={{ tabIndex: "-1" }}
                        />
                      </FormControl>
                    <FormControl
                      sx={{
                        gridColumn: "span 2",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        fullWidth
                        variant="filled"
                        type="time"
                        id="checkin"
                        name="checkin"
                        inputFormat="HH:mm:aa"
                        value={values.checkin}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Check In Time"
                        focused
                        // inputProps={{ maxLength:20}}
                      />
                    </FormControl>
                    <FormControl
                      sx={{
                        gridColumn: "span 2",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        fullWidth
                        variant="filled"
                        type="time"
                        id="checkout"
                        name="checkout"
                        inputFormat="HH:mm:aa"
                        value={values.checkout}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Check Out Time"
                        focused
                        // inputProps={{ readOnly: true }}
                      />
                    </FormControl>

                    {/* <FormControl
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
                        value={checkInLookup.cinRecordID}
                        focused
                        sx={{ display: "none" }}
                      />
                      <TextField
                        id="outlined-basic"
                        label="CheckIn"
                        variant="filled"
                        value={checkInLookup.cinCode}
                        focused
                        required
                        DESIGN
                        inputProps={{ tabIndex: "-1" }}
                      />

                      <IconButton
                        sx={{ height: 40, width: 40 }}
                        onClick={() => handleShow("CIN")}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>
                      <TextField
                        id="outlined-basic"
                        label="CheckIn"
                        variant="filled"
                        value={checkInLookup.cinName}
                        fullWidth
                        focused
                        inputProps={{ tabIndex: "-1" }}
                      />
                    </FormControl> */}
                  </Box>
                  <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                  <Typography variant="h5">Week Off</Typography>
                   <Box>
                          <Field
                            //  size="small"
                            type="checkbox"
                            name="monday"
                            id="monday"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            as={Checkbox}
                            label="Monday"
                          />

                          <FormLabel focused={false}>Monday</FormLabel>
                       
                          <Field
                            //  size="small"
                            type="checkbox"
                            name="tuesday"
                            id="tuesday"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            as={Checkbox}
                            label="Tuesday"
                          />

                          <FormLabel focused={false}>Tuesday</FormLabel>
                       
                          <Field
                            //  size="small"
                            type="checkbox"
                            name="wednesday"
                            id="wednesday"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            as={Checkbox}
                            label="Wednesday"
                          />

                          <FormLabel focused={false}>Wednesday</FormLabel>
                       
                          <Field
                            //  size="small"
                            type="checkbox"
                            name="thursday"
                            id="thursday"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            as={Checkbox}
                            label="Thursday"
                          />

                          <FormLabel focused={false}>Thursday</FormLabel>
                       
                          <Field
                            //  size="small"
                            type="checkbox"
                            name="friday"
                            id="friday"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            as={Checkbox}
                            label="Friday"
                          />

                          <FormLabel focused={false}>Friday</FormLabel>
                       
                          <Field
                            //  size="small"
                            type="checkbox"
                            name="saturday"
                            id="saturday"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            as={Checkbox}
                            label="Saturday"
                          />

                          <FormLabel focused={false}>Saturday</FormLabel>
                       
                          <Field
                            //  size="small"
                            type="checkbox"
                            name="sunday"
                            id="sunday"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            as={Checkbox}
                            label="Sunday"
                          />

                          <FormLabel focused={false}>Sunday</FormLabel>
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
                    {/* {YearFlag == "true" ? (
                      <Button
                        onClick={() => mgrFunctionFn(values, resetForm, true)}
                        color="error"
                        variant="contained"
                      >
                        Delete
                      </Button>
                    ) : (
                      <Button color="error" variant="contained" disabled={true}>
                        Delete
                      </Button>
                    )} */}
                    <Button type="reset" color="warning" variant="contained" 
                     onClick={() => {
                      setScreen(0);
                    }}
                    >
                      Cancel
                    </Button>
                  </Box>

                  <Popup
                    title="Location"
                    openPopup={openLOCATIONPopup}
                    setOpenPopup={setOpenLOCATIONPopup}
                  >
                    <Listviewpopup
                      accessID="2051"
                      screenName="Location"
                      childToParent={childToParent}
                    />
                  </Popup>
                  <Popup
                    title="Gate"
                    openPopup={openGATEPopup}
                    setOpenPopup={setOpenGATEPopup}
                  >
                    <Listviewpopup
                      accessID="2050"
                      screenName="Gate"
                      childToParent={childToParent}
                    />
                  </Popup>
                  <Popup
                    title="Designation"
                    openPopup={opendesignPopup}
                    setOpenPopup={setOpendesignPopup}
                  >
                    <Listviewpopup
                      accessID="2047"
                      screenName="Designation"
                      childToParent={childToParent}
                    />
                  </Popup>
                  {/* <Popup
                    title="CheckIn"
                    openPopup={openCHECKINPopup}
                    setOpenPopup={setOpenCHECKINPopup}
                  >
                    <Listviewpopup
                      accessID=""
                      screenName="CheckIn"
                      childToParent={childToParent}
                    />
                  </Popup> */}
                </form>
              )}
            </Formik>
          </Box>
        ) : (
          false
        )}
        {show == "6" ? (
          <Box m="20px" sx={{ m: 2 }}>
            <Formik
              // onSubmit={handleFormSubmit}
              initialValues={AttachmentInitialValues}
              enableReinitialize={true}
               onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  FnAttachment(values, resetForm, false);
                }, 100);
              }}
              
            >
              {({ values, errors, touched, handleBlur,handleSubmit, handleChange,resetForm}) => (
                <form
                  onSubmit={handleSubmit}
                  onReset={() => {
                    selectCellRowData({ rowData: {}, mode: "A", field: "" });
                    resetForm();
                  }}
                >
                <Box>
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
                        value={values.code}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Model"
                        focused
                        // inputProps={{ readOnly: true }}
                      />

                     <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        id="Name"
                        name="Name"
                        value={values.description}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Name"
                        focused
                        // inputProps={{ readOnly: true }}
                      />
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
                            selectCellRowData({
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
                     
                    </FormControl>

                    
                    <FormControl
                      sx={{
                        gridColumn: "span 2",
                        gap: "40px",
                        mt: { xs: "opx", md: "210px" },
                      }}
                    >
                  <FormControl
                              sx={{ gridColumn: "span 2", gap: "40px" }}
                              style={{ width: "100%" }}
                            >
                              <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        id="LoaDescription"
                        name="LoaDescription"
                        value={values.LoaDescription}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Description"
                        focused
                        inputProps={{ tabIndex: "-1" }}
                      />
                         <FormControl
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                }}
                              >
                                {/* <FormControlLabel control={<Field type="checkbox" name="checkbox" id="checkbox"  label="Disable" />} label="Disable" /> */}
                                <Box>
                                  <Typography variant="h6">
                                    Certificate Attachment
                                  </Typography>
                                  <IconButton
                                    size="large"
                                    color="warning"
                                    aria-label="upload picture"
                                    component="label"
                                  >
                                    <input
                                      hidden
                                      accept=".pdf"
                                      type="file"
                                      onChange={changeHandler}
                                    />
                                    <PictureAsPdfOutlinedIcon fontSize="large" />
                                  </IconButton>
                                  <Button
                                    variant="contained"
                                    component={"a"}
                                    onClick={() => {
                                      fnViewFile();
                                    }}
                                  >
                                    View{" "}
                                  </Button>
                                </Box>
                              </FormControl>
                                 

                             

                              {/* <FormControl
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                }}
                              >
                                
                                <Box>
                                  <Typography variant="h6">
                                    Certificate Attachment
                                  </Typography>
                                 
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
                      onChange={changeHandler}
                    />
                    <PictureAsPdfOutlinedIcon  />
                  </IconButton>
                  <Button
                    variant="contained"
                    component={"a"}
                    onClick={() => {
                      Data.ImageName || ImageName
                        ? window.open(
                          ImageName ?  store.getState().globalurl.attachmentUrl + ImageName : store.getState().globalurl.attachmentUrl +  Data.ImageName,
                            "_blank"
                          )
                        : toast.error("Please Upload File");
                    }}
                  >
                    View
                  </Button>
                                </Box>
                              </FormControl>
                             */}
                             </FormControl>
                             <Box display="flex" justifyContent="end" mt="90px" gap={2}>
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
                      <Button color="error"
                        variant="contained"
                      onClick={() => {
                        Swal.fire({
                          title: `Do you want Delete?`,
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Confirm" ,
                        }).then((result) => {
                          if (result.isConfirmed) {
                            FnAttachment(values,resetForm,"harddelete");
                            
                          } else {
                            return;
                          }
                        }); }}
                      >
                        Delete
                      </Button>
                    ) : (
                      <Button color="error" variant="contained" disabled={true}>
                        Delete
                      </Button>
                    )}
                    <Button type="reset" color="warning" variant="contained">
                      Cancel
                    </Button>
                  </Box>
                      
                    </FormControl>
                  </Box>
                  </Box>
                  </form>
              )}
            </Formik>
          </Box>
        ) : (
          false
        )}
         {show == "7" ? (
          <Box m="10px">
            <Formik
              initialValues={itemcustodyInitialValue}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  empItemCustodyFn(values, resetForm, false);
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
                    selectCellRowData({ rowData: {}, mode: "A", field: "" });
                    resetForm();
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
                        value={values.code}
                        label="Code"
                        focused
                        inputProps={{ readOnly: true }}
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        id="description"
                        name="description"
                        value={values.description}
                        label="Description"
                        focused
                        inputProps={{ readOnly: true }}
                      />
                    </FormControl>
                    <Stack
                      sx={{
                        gridColumn: "span 2",
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        right: "0px",
                      }}
                    >
                      <img
                        src={values.imageurl}
                        style={{ width: "200px", height: "150px" }}
                      />
                    </Stack>
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
                            selectCellRowData({
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
                    <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                value={values.ItemNumber}
                                id="ItemNumber"
                                name="ItemNumber"
                                label="item No"
                                required
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!touched.ItemNumber && !!errors.ItemNumber}
                                helperText={touched.ItemNumber && errors.ItemNumber}
                                sx={{
                                  gridColumn: "span 2",
                                }}
                                focused
                                onWheel={(e) => e.target.blur()} 
                                multiline
                                inputProps={{ maxLength: 90 }}
                              />
                             <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                value={values.ItemName}
                                id="ItemName"
                                name="ItemName"
                                label="Item Name"
                                required
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!touched.ItemName && !!errors.ItemName}
                                helperText={touched.ItemName && errors.ItemName}
                                sx={{
                                  gridColumn: "span 2",
                                }}
                                focused
                                multiline
                                inputProps={{ maxLength: 90 }}
                              />

                              <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                value={values.AssestID}
                                id="AssestID"
                                name="AssestID"
                                label="Assest ID"
                                required
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!touched.AssestID && !!errors.AssestID}
                                helperText={touched.AssestID && errors.AssestID}
                                sx={{
                                  gridColumn: "span 2",
                                }}
                                focused
                                multiline
                                inputProps={{ maxLength: 90 }}
                              />

                              <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                value={values.ItemValue}
                                id="ItemValue"
                                name="ItemValue"
                                label="Item Value"
                                required
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!touched.ItemValue && !!errors.ItemValue}
                                helperText={touched.ItemValue && errors.ItemValue}
                                sx={{
                                  gridColumn: "span 2",
                                }}
                                focused
                                multiline
                                inputProps={{ maxLength: 90 }}
                              />

                              <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                value={values.PurchaseReference}
                                id="PurchaseReference"
                                name="PurchaseReference"
                                label="Reference"
                                required
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!touched.PurchaseReference && !!errors.PurchaseReference}
                                helperText={touched.PurchaseReference && errors.PurchaseReference}
                                sx={{
                                  gridColumn: "span 2",
                                }}
                                focused
                                multiline
                                inputProps={{ maxLength: 90 }}
                              />
                    </FormControl>
                  </Box>
                  <Box display="flex" justifyContent="end" mt="30px" gap={2}>
                    {/* {YearFlag == "true" ? ( */}
                    <LoadingButton
                      color="secondary"
                      variant="contained"
                      type="submit"
                      loading={isLoading}
                    >
                      Save
                    </LoadingButton>
                    {/* ) : (
                      <Button
                        color="secondary"
                        variant="contained"
                        disabled={true}
                      >
                        Save
                      </Button>
                    )}
                    {YearFlag == "true" ? ( */}
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
                        confirmButtonText: "Confirm" ,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          empItemCustodyFn(values,resetForm,"harddelete");
                          
                        } else {
                          return;
                        }
                      }); }}
                    >
                      Delete
                    </Button>
                    {/* ) : (
                      <Button color="error" variant="contained" disabled={true}>
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
                  <Popup
                    title="Functions"
                    openPopup={openFunPopup}
                    setOpenPopup={setOpenFunPopup}
                  >
                    <Listviewpopup
                      accessID="2048"
                      screenName="Functions"
                      childToParent={childToParent}
                    />
                  </Popup>
                  <Popup
                    title="Designations"
                    openPopup={openDesPopup}
                    setOpenPopup={setOpenDesPopup}
                  >
                    <Listviewpopup
                      accessID="2049"
                      screenName="Designations"
                      childToParent={childToParent}
                      filterName={"Rank"}
                      filterValue={Data.Rank}
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

export default Editemployee;
