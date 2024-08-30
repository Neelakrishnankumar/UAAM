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
import { useDispatch, useSelector } from  "react-redux";
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
  resetTrackingData,
  empAttendance,
  Attendance,
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
import { Code } from "@mui/icons-material";
import { type } from "@testing-library/user-event/dist/type";
// ***********************************************
//  Developer:Gowsalya
// Purpose:To Create Employee

// ***********************************************
const EditemployeePayroll = () => {
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
  const [openADPopup, setOpenADPopup] = useState(false);
  const [openLOCATIONPopup, setOpenLOCATIONPopup] = useState(false);
  const [openGATEPopup, setOpenGATEPopup] = useState(false);
  const empAttendanceData = useSelector((state) => state.formApi.empAttendanceData);
  console.log("empAttendanceData", empAttendanceData);

  const AttendanceData = useSelector((state) => state.formApi.AttendanceData);
  console.log("AttendanceData", AttendanceData);

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
  const [funMode, setFunMode] = useState("A");
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


  const [isPopupData, setisPopupdata] = React.useState(false);
  const [opendesignPopup, setOpendesignPopup] = useState(false);

  // ************Lookup Function***************
  function handleShow(type) {
    if (type == "DE") {
      setOpenDEPopup(true);
    }

    
    if (type == "AD") {
      setOpenADPopup(true);
    }
    
  }

  const [selectLookupData, setselectLookupData] = React.useState({
    lookupRecordid: "",
    lookupCode: "",
    lookupDesc: "",
  });
   const [ADLookupData, setADLookupData] = React.useState({
    adRecordID: "",
    adType: "",
    adDesc: "",
    adCategory: "",
  });
 
  
  // ***************  EMPLOYEE-FUNCTION LOOKUP  *************** //


  if (isPopupData == false) {
    selectLookupData.lookupRecordid = Data.DeptRecordID;
    selectLookupData.lookupCode = Data.DeptCode;
    selectLookupData.lookupDesc = Data.DeptName;
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
    };
      if (type == "Allowance" || type == "Deduction") {
        setADLookupData({
          adType: childdata.Type,
          adRecordID: childdata.RecordID,
          adDesc: childdata.Name,
          adCategory:childdata.SalaryCategory,
         
        });
        setOpenADPopup(false);
    };

    
    
  }
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

    // console.log(locationLookup.locationRecordID, gateLookup.gateRecordID);

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
      dispatch(fetchExplorelitview("TR206", "Employee Allowances", `${recID} AND Category='A'`, ""));
      dispatch(fetchApidata(accessID, "get", recID));
      selectCellRowData({
        rowData: {},
        mode: "A",
        field: "",
      });
    }
    
    if (event.target.value == "5") {
      dispatch(fetchExplorelitview("TR206", "Employee Deductions", `${recID} AND Category='D'`, ""));
      dispatch(fetchApidata(accessID, "get", recID));
      selectCellRowData({
        rowData: {},
        mode: "A",
        field: "",
      });
    }

    if (event.target.value == "0") {
      dispatch(fetchApidata(accessID, "get", recID));
    }
      if (event.target.value == "2") {
        dispatch(fetchExplorelitview("TR208", "Leave", `EmployeeID=${recID}`, ""));
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
    
    } else {
      if (field == "action") {
        console.log("selectdata" + data.Disable);
        setSupprodata({
          RecordID: data.RecordID,
          Comments: data.Comments,
          SortOrder: data.SortOrder,
        });

      
      }
    }
  };
  //*******Assign Employee values from Grid table in  Yup initial value******* */
 

  /******************************save  Function********** */

//*********************Contact******************/



  

  let VISIBLE_FIELDS;
 if (show == "2") {
    VISIBLE_FIELDS = ["SLNO","LeaveCategory","FromDate","ToDate","Type","action"];
  }else if(show == "1") {
    VISIBLE_FIELDS = ["SLNO","Category","Type","value","EffectiveValue","action"];
  }else {
    VISIBLE_FIELDS = ["SLNO","Category","Type","value","EffectiveValue","action"];
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

  // *************** EMPLOYEE-FUNCTION SCREEN SAVE FUNCTION *************** //
  
  function LeaveTool() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>{(show == "2" ? "List of Leave" : (show == "1" ? "List of Allowance" :"List of Deductions"))}</Typography>
          
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
  function empAttendanceTool() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>Payroll Attendance</Typography>
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
  function AttendanceTool() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>Attendance</Typography>
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
      headerName: "SL.NO",
      
    },
    {
      field: "EmployeeName",
      headerName: "Name",
      width:150,
    },
    // {
    //   field: "Block",
    //   headerName: "Block",
    //   flex: 1,
    // },
    {
      field: "Day1Status",
      headerName: "1",
      flex: 1,
    },
    {
      field: "Day2Status",
      headerName: "2",
      flex: 1,
    },
    {
      field: "Day3Status",
      headerName: "3",
      flex: 1,
    },
    {
      field: "Day4Status",
      headerName: "4",
      flex: 1,
    },
    {
      field: "Day5Status",
      headerName: "5",
      flex: 1,
    },
    {
      field: "Day6Status",
      headerName: "6",
      flex: 1,
    },
    {
      field: "Day7Status",
      headerName: "7",
      flex: 1,
    },
    {
      field: "Day8Status",
      headerName: "8",
      flex: 1,
    },
    {
      field: "Day9Status",
      headerName: "9",
      flex: 1,
    },
    {
      field: "Day10Status",
      headerName: "10",
      flex: 1,
    },
    {
      field: "Day11Status",
      headerName: "11",
      flex: 1,
    },
    {
      field: "Day12Status",
      headerName: "12",
      flex: 1,
    },
    {
      field: "Day13Status",
      headerName: "13",
      flex: 1,
    },
    {
      field: "Day14Status",
      headerName: "14",
      flex: 1,
    },
    {
      field: "Day15Status",
      headerName: "15",
      flex: 1,
    },

    {
      field: "Day16Status",
      headerName: "16",
      flex: 1,
    },
    {
      field: "Day17Status",
      headerName: "17",
      flex: 1,
    },{
      field: "Day18Status",
      headerName: "18",
      flex: 1,
    },
    {
      field: "Day19Status",
      headerName: "19",
      flex: 1,
    },
    {
      field: "Day20Status",
      headerName: "20",
      flex: 1,
    },
   
    {
      field: "Day21Status",
      headerName: "21",
      flex: 1,
    },

    {
      field: "Day22Status",
      headerName: "22",
      flex: 1,
    },

    {
      field: "Day23Status",
      headerName: "23",
      flex: 1,
    },

    {
      field: "Day24Status",
      headerName: "24",
      flex: 1,
    },

    {
      field: "Day25Status",
      headerName: "25",
      flex: 1,
    },

    {
      field: "Day26Status",
      headerName: "26",
      flex: 1,
    },

    {
      field: "Day27Status",
      headerName: "27",
      flex: 1,
    },
    {
      field: "Day28Status",
      headerName: "28",
      flex: 1,
    },

    {
      field: "Day29Status",
      headerName: "29",
      flex: 1,
    },

    {
      field: "Day30Status",
      headerName: "30",
      flex: 1,
    },

    {
      field: "Day31Status",
      headerName: "31",
      flex: 1,
    },

    {
      field: "TotalPresent",
      headerName: "Present",
     
    },
    {
      field: "TotalAbsent",
      headerName: "Absent",
    
    }, {
      field: "TotalLeave",
      headerName: "Leave",
     
    },
    {
      field: "TotalOT",
      headerName: "Total",
      
    },
   
    
  ];
  const AttColumn = [
    {
      field: "SLNO",
      headerName: "SL.NO",
      
    },
    
    {
      field: "EmplyeeCheckInDateTime",
      headerName: "Emplyee CheckIn Date Time",
      flex: 1,
    },
    {
    field: "EmplyeeCheckOutDateTime",
    headerName: "Emplyee CheckOut Date Time",
    flex: 1,
    
  },
  {
    field: "NumberOfHoursWorked",
    headerName: "Number Of Hours Worked",
    flex: 1,
  },

  ];



  
  const [itemCustodyData, setItemCustodyData ] = useState({
    recordID:"",
    itemNO:"",
    itemName:"",
    assestID:"",
    itemValue:"",
    reference:"",
  })

  const [leaveData, setLeaveData ] = useState({
    recordID:"",
    fromDate: "",
    toDate: "",
    leaveCategory: "",
    type:""
  })
  const [allDecData, setAllDecData ] = useState({
    recordID:"",
    value: "",
    sortOrder: "",
  })

  const selectCellRowData = ({ rowData, mode, field }) => {
    console.log(
      "🚀 ~ file: Editfunction.jsx:178 ~ selectcelldata ~ rowData:",
      rowData
    );

    setFunMode(mode);
    // setLaoMode(mode);

    if (mode == "A") {

      setAllDecData({
        recordID:"",
        value: "",
        sortOrder: "",
      })
    
      setADLookupData({
        adType: '',
        adRecordID:'',
        adDesc: '',
        adCategory:'',
       
      });
     setLeaveData({
      recordID:"",
      fromDate: "",
      toDate: "",
      leaveCategory: "",
      type:""
     })
    } else {
      if (field == "action") {
     
       setItemCustodyData({
        recordID:rowData.RecordID,
        itemNO:rowData.ItemNumber,
        itemName:rowData.ItemName,
        assestID:rowData.ItemValue,
        itemValue:rowData.ItemValue,
        reference:rowData.ItemValue,   
      })
      setLeaveData({
        recordID:rowData.RecordID,
        fromDate: rowData.FromDate,
        toDate: rowData.ToDate,
        leaveCategory: rowData.LeaveCategory,
        type:rowData.Type
      
      })
      setAllDecData({
        recordID:rowData.RecordID,
        value: rowData.value,
        sortOrder: rowData.Sortorder,
      })
      setADLookupData({
        adType: rowData.Type,
        adRecordID:rowData.SalaryComponentID,
        adDesc: rowData.Name,
        adCategory:rowData.Category,
       
      });
      }
    }
  };
//-------------------------------------LEAVE SAVE FUNCTION---------------------------------------------//

const leaveInitialValue={
code: Data.Code,
description: Data.Name,
Type:leaveData.type,
FromDate: leaveData.fromDate,
ToDate: leaveData.toDate,
LeaveCategory: leaveData.leaveCategory,
SortOrder: "1",
Disable: "N",
imageurl: Data.ImageName
? store.getState().globalurl.imageUrl + Data.ImageName
: store.getState().globalurl.imageUrl + "Defaultimg.jpg",
}

const leaveFNsave= async(values,resetForm,del)=>{
setLoading(true);
let action=
funMode === "A" && !del
            ? "insert"
            : funMode === "E" && del
            ? "harddelete"
            : "update";
            const idata={
              RecordID:leaveData.recordID,
              Type:values.Type,
              FromDate:values.FromDate,
              ToDate:values.ToDate,
              LeaveCategory:values.LeaveCategory,
              EmployeeID: recID,
              SortOrder: "1",
              Disable: "N"
            }
            const response = await dispatch(
              explorePostData({ accessID: "TR208", action, idata })
            );
            if (response.payload.Status == "Y") {
              setLoading(false);
              dispatch(
                fetchExplorelitview("TR208", "Leave", `EmployeeID=${recID}`, "")
              );
        
              toast.success(response.payload.Msg);
        
              selectCellRowData({ rowData: {}, mode: "A", field: "" });
              resetForm();
            } else {
              setLoading(false);
              toast.error(response.payload.Msg);
            }
}




 // **********Save Function*****************
 const AllDedInitialValues={
  code: Data.Code,
  description: Data.Name,
  imageurl: Data.ImageName
  ? store.getState().globalurl.imageUrl + Data.ImageName
  : store.getState().globalurl.imageUrl + "Defaultimg.jpg",
  salaryCategory: (ADLookupData.adCategory === 'A') ? "Allowances" : (ADLookupData.adCategory === 'D') ? "Deductions":ADLookupData.adCategory ,
  type:ADLookupData.adType,
  value:allDecData.value,
  sortorder:allDecData.sortOrder

  
 };




const AllDedFNsave=async(values,resetForm, del)=>{
setLoading(true);
let action=
funMode === "A" && !del
            ? "insert"
            : funMode === "E" && del
            ? "harddelete"
            : "update";
var isCheck = "N";
if (values.checkbox == true) {
 isCheck = "Y";
}
const idata={
"RecordID": allDecData.recordID,
"SalaryComponentID": ADLookupData.adRecordID,
"SCName": ADLookupData.adDesc,
"SCType": values.type,
"SCCategory": show == '1' ? 'A' : "D",
"Value": values.value,
"EffectiveValue":show == '1' ? Number(Data.Sal)+ Number(values.value):Number(Data.Sal)- Number(values.value),
"SortOrder":1,
"Disable": "N",

parentID:recID,

}


const response = await dispatch(
  explorePostData({ accessID: "TR206", action, idata })
);
if (response.payload.Status == "Y") {
  setLoading(false);
  const query = show == "1" 
  ? `${recID} AND Category='A'`
  : `${recID} AND Category='D'`;
  dispatch(
    fetchExplorelitview("TR206", "AllowancesAndDeductions", query, "")
  );

  toast.success(response.payload.Msg);

  selectCellRowData({ rowData: {}, mode: "A", field: "" });
  resetForm();
} else {
  setLoading(false);
  toast.error(response.payload.Msg);
}
}
       // *************** ITEMCUSTODY SCREEN SAVE FUNCTION *************** //

       const itemcustodyInitialValue = {
        code: Data.Code,
        description: Data.Name,
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
    

  // *************** PAYROLL ATTENDANCE *************** //
const PAttInitialvalues={
  code: Data.Code,
  description: Data.Name,
  month:"",
  year:"",
}
  const attFnSave = async (values) => {
 
    const data = {
  Month:values.month.toString(),
  Year:values.year,
    }
 

    dispatch(empAttendance({data}));
};

const AttInitialvalues={
  code: Data.Code,
  description: Data.Name,
  Sal: Data.Sal,
  month:"",
  year:"",
}
  const attendaceFnSave = async (values) => {
 
    const data = {
  Month:values.month.toString(),
  Year:values.year,
    }
 

    dispatch(Attendance({data}));
};


  
 const getFileChange = async (event) => {
    
    // setImgName(event.target.files[0]);

    console.log(event.target.files[0]);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "attachments");
  
    const fileData = await dispatch(
      imageUpload({formData})
    );
    // setImgName(fileData.payload.name)
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
{show == "1" ? (<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  >Allowances</Typography>):false}
{show == "5" ? (<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  >Deductions</Typography>):false}
                {show == "2" ? (<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  >Leave</Typography>):false}
                {show == "3" ? (<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  >Attendance</Typography>):false}
                {show == "4" ? (<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  >Payroll Attendance</Typography>):false}
               
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
                 
                  <MenuItem value={1}>Allowances</MenuItem>
                  <MenuItem value={5}>Deductions</MenuItem>
                  <MenuItem value={2}>Leave</MenuItem>
                  <MenuItem value={3}>Attendance</MenuItem>
                  <MenuItem value={4}>Payroll Attendance</MenuItem>
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
                  <Box display="flex" justifyContent="end" mt="20px" gap={2}>
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

       
        {show == "1" ? (
          <Box m="10px">
            <Formik
              initialValues={AllDedInitialValues}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  AllDedFNsave(values, resetForm, false);
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
                          // rows={[]}
                          // columns={[]}
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
                            Toolbar: LeaveTool,
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
                        id="outlined-basic"
                        label="ID"
                        variant="filled"
                        value={ADLookupData.adRecordID}
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
                          label="Allowances"
                          variant="filled"
                          value={ADLookupData.adDesc}
                          focused
                          required
                          fullWidth
                          inputProps={{ tabIndex: "-1" }}
                        />
                   
                        <IconButton
                          sx={{ height: 40, width: 40 }}
                          onClick={() => handleShow("AD")}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>
                    
                      </FormControl>
            
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        id="salaryCategory"
                        name="salaryCategory"
                        value={values.salaryCategory}
                        label="Salary Category"
                        focused
                        inputProps={{ readOnly: true }}
                      />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        id="type"
                        name="type"
                        value={values.type}
                        label="Type"
                        focused
                        inputProps={{ readOnly: true }}
                      />
                    
                  <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        id="value"
                        name="value"
                        value={values.value}
                        label="Value"
                        focused
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // inputProps={{ readOnly: true }}
                      />
                        <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        id="effectivevalue"
                        name="effectivevalue"
                        value={Number(Data.Sal)+ Number(values.value)}
                        label="Effective Value"
                        focused
                        inputProps={{ readOnly: true }}
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
                    sx={{ background: "#fff6c3" }}
                    onWheel={(e) => e.target.blur()} 
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
                   
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
                          AllDedFNsave(values,resetForm,"harddelete");
                          
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
                    <Popup
                    title="Allowance"
                    openPopup={openADPopup}
                    setOpenPopup={setOpenADPopup}
                  >
                    <Listviewpopup
                      accessID="2082"
                      screenName="Allowance"
                      childToParent={childToParent}
                      filterName={"SalaryCategory"}
                      filterValue={"A"}
                    />
                  </Popup>
                  </Box>
                 
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
              initialValues={AllDedInitialValues}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  AllDedFNsave(values, resetForm, false);
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
                          // rows={[]}
                          // columns={[]}
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
                            Toolbar: LeaveTool,
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
                        id="outlined-basic"
                        label="ID"
                        variant="filled"
                        value={ADLookupData.adRecordID}
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
                          label="Deductions"
                          variant="filled"
                          value={ADLookupData.adDesc}
                          focused
                          required
                          fullWidth
                          inputProps={{ tabIndex: "-1" }}
                        />
                   
                        <IconButton
                          sx={{ height: 40, width: 40 }}
                          onClick={() => handleShow("AD")}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>
                    
                      </FormControl>
            
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        id="salaryCategory"
                        name="salaryCategory"
                        value={values.salaryCategory}
                        label="Salary Category"
                        focused
                        inputProps={{ readOnly: true }}
                      />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        id="type"
                        name="type"
                        value={values.type}
                        label="Type"
                        focused
                        inputProps={{ readOnly: true }}
                      />
                    
                  <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        id="value"
                        name="value"
                        value={values.value}
                        label="Value"
                        focused
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // inputProps={{ readOnly: true }}
                      />
                        <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        id="effectivevalue"
                        name="effectivevalue"
                        value={Number(Data.Sal)- Number(values.value)}
                        label="Effective Value"
                        focused
                        inputProps={{ readOnly: true }}
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
                    sx={{ background: "#fff6c3" }}
                    onWheel={(e) => e.target.blur()} 
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
                   
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
                         AllDedFNsave(values,resetForm,"harddelete");
                         
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
                    <Popup
                    title="Deduction"
                    openPopup={openADPopup}
                    setOpenPopup={setOpenADPopup}
                  >
                    <Listviewpopup
                      accessID="2082"
                      screenName="Deduction"
                      childToParent={childToParent}
                      filterName={"SalaryCategory"}
                      filterValue={"D"}
                    />
                  </Popup>
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
              initialValues={leaveInitialValue}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  leaveFNsave(values, resetForm, false);
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
                        src={userimg}
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
                          Toolbar: LeaveTool,
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
                 
                       {/* <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="LeaveCategory"
                        value={values.LeaveCategory}
                        id="LeaveCategory"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="LeaveCategory"
                       
                        focused
                        
                      /> */}
                      <FormControl
                    focused
                    variant="filled"
                    sx={{ gridColumn: "span 2" }}
                  >
                    <InputLabel variant="filled" id="LeaveCategory">{<span>Leave Category <span style={{ color: 'red' }}>*</span></span>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      fullWidth
                      variant="filled"
                      type="text"
                      // label="LeaveCategory"
                      value={values.LeaveCategory}
                      id="LeaveCategory"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="LeaveCategory"
                      required
                      focused
                    >
                      <MenuItem value="FH">First Half</MenuItem>
                      <MenuItem value="SH">Second Half</MenuItem> 
                      <MenuItem value="N">None</MenuItem>
                    
                    </Select>
                  </FormControl> 
                    <TextField
                      name="FromDate"
                      type="date"
                      id="FromDate"
                      label="From Date"
                      inputFormat="YYYY-MM-DD"
                      variant="filled"
                      focused
                      value={values.FromDate}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                     
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      name="ToDate"
                      type="date"
                      id="ToDate"
                      label="To Date"
                      inputFormat="YYYY-MM-DD"
                      variant="filled"
                      focused
                      value={values.ToDate}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                     
                      sx={{ gridColumn: "span 2" }}
                    />
                 
                   <FormControl
                    focused
                    variant="filled"
                    sx={{ gridColumn: "span 2" }}
                  >
                    <InputLabel id="Type">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="Type"
                      name="Type"
                      value={values.Type}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="A">Applied</MenuItem>
                      <MenuItem value="R">Rejected</MenuItem> 
                      <MenuItem value="D">Approved</MenuItem>
                    
                    </Select>
                  </FormControl> 
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
                          leaveFNsave(values,resetForm,"harddelete");
                          
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
              initialValues={AttInitialvalues}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  attendaceFnSave(values, resetForm);
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
                  resetForm();
                    dispatch(resetTrackingData());
                  }}
                  
                >
                  <Box
                    // display="grid"
                    // gap="30px"
                    // gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    // sx={{
                    //   "& > div": {
                    //     gridColumn: isNonMobile ? undefined : "span 4",
                    //   },
                    // }}
                    display="grid"
                    gridTemplateColumns="repeat(4 , minMax(0,1fr))"
                    gap="30px"
                    sx={{
                      "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}
                  >
                   
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
                        sx={{ gridColumn: "span 2" }}
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
                        }}/>
   
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
                        sx={{ gridColumn: "span 2" }}
                      />
                      <TextField
      fullWidth
      variant="filled"
      type="month"
      id="month"
      name="month"
      label="Month"
      value={values.month}
      focused
      // sx={{ gridColumn: "span 2" }}
      onChange={handleChange}
      onBlur={handleBlur}
      select
    >
       <MenuItem value={"1"}>1</MenuItem>
      <MenuItem value={"2"}>2</MenuItem>
      <MenuItem value={"3"}>3</MenuItem>
      <MenuItem value={"4"}>4</MenuItem>
      <MenuItem value={"5"}>5</MenuItem>
      <MenuItem value={"6"}>6</MenuItem>
      <MenuItem value={"7"}>7</MenuItem>
      <MenuItem value={"8"}>8</MenuItem>
      <MenuItem value={"9"}>9</MenuItem>
      <MenuItem value={"10"}>10</MenuItem>
      <MenuItem value={"11"}>11</MenuItem>
      <MenuItem value={"12"}>12</MenuItem>
      </TextField>
    <TextField
      fullWidth
      variant="filled"
      type="number"
      id="year"
      name="year"
      label="Year"
      value={values.year}
      inputProps={{ min: "1900", max: "2100", step: "1" }}
      focused
      onChange={handleChange}
      onBlur={handleBlur}
      // sx={{ gridColumn: "span 2" }}
    />
  </Box>
                   <Box display="flex" justifyContent="end" mt="20px" gap="20px">
              <Button type="submit" variant="contained" color="secondary">
                APPLY
              </Button>
              <Button type="reset" variant="contained" color="primary">
                PROCESS
              </Button>
              <Button type="reset" variant="contained" color="error">
                RESET
              </Button>
            </Box>
                      
                 
                    <Box sx={{ gridColumn: "span 4" }}>
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
                          // rows={explorelistViewData}
                          // columns={columns}
                          rows={AttendanceData}
                          columns={AttColumn}
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
                            Toolbar: AttendanceTool,
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
              initialValues={PAttInitialvalues}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  attFnSave(values, resetForm);
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
                  resetForm();
                    dispatch(resetTrackingData());
                  }}
                >
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(4 , minMax(0,1fr))"
                    gap="30px"
                    sx={{
                      "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}
                  >
                   
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
                        sx={{ gridColumn: "span 2" }}
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
                        sx={{ gridColumn: "span 2" }}
                      />
                     <TextField
      fullWidth
      variant="filled"
      type="month"
      id="month"
      name="month"
      label="Month"
      value={values.month}
      focused
      sx={{ gridColumn: "span 2" }}
      onChange={handleChange}
      onBlur={handleBlur}
      select
    >
      <MenuItem value={"1"}>1</MenuItem>
      <MenuItem value={"2"}>2</MenuItem>
      <MenuItem value={"3"}>3</MenuItem>
      <MenuItem value={"4"}>4</MenuItem>
      <MenuItem value={"5"}>5</MenuItem>
      <MenuItem value={"6"}>6</MenuItem>
      <MenuItem value={"7"}>7</MenuItem>
      <MenuItem value={"8"}>8</MenuItem>
      <MenuItem value={"9"}>9</MenuItem>
      <MenuItem value={"10"}>10</MenuItem>
      <MenuItem value={"11"}>11</MenuItem>
      <MenuItem value={"12"}>12</MenuItem>
      </TextField>
                        <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        id="year"
                        name="year"
                        value={values.year}
                        label="Year"
                        focused
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{ gridColumn: "span 2" }}
                      />
                       </Box>
                   <Box display="flex" justifyContent="end" mt="20px" gap="20px">
              <Button type="submit" variant="contained" color="secondary">
                APPLY
              </Button>
              {/* <Button type="reset" variant="contained" color="primary">
                PROCESS
              </Button> */}
              <Button type="reset" variant="contained" color="error">
                RESET
              </Button>
            </Box>
                 
                  
                  <Box m="5px">
              <Box
                m="5px 0 0 0"
                height="400px"
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
                  rows={empAttendanceData}
                  columns={column}
                  disableSelectionOnClick
                  getRowId={(row) => row.RecordID}
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[5, 10, 20]}
                  pagination
                  // loading={isLoading}
                  // onCellClick={(params) => {
                  //   const currentRow = params.row;
                  //   const currentcellField = params.field;
                  //     // selectcelldata(currentRow, "E", currentcellField);

                  //   console.log(JSON.stringify(params));
                  // }}
                  components={{
                    Toolbar: empAttendanceTool,
                  }}
                  componentsProps={{
                    toolbar: {
                      showQuickFilter: true,
                      quickFilterProps: { debounceMs: 500 },
                    },
                  }}
                />
              </Box>
            </Box>
               
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

export default EditemployeePayroll;
