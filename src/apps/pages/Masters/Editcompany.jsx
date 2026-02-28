import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Typography,
  Box,
  Divider,
  Paper,
  Button,
  TextField,
  FormLabel,
  FormControl,
  IconButton,
  Checkbox,
  Tooltip,
  LinearProgress,
  MenuItem,
  InputLabel,
  Select,
  Chip,
  Breadcrumbs,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../Theme";
import {
  GridActionsCellItem,
  DataGrid,
  GridRowModes,
  GridToolbarContainer,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  BankFetchData,
  BankpostData,
  CompReportFetchData,
  CompReportpostData,
  getFetchData,
  PolicyFetchData,
  PolicyUpdateData,
  postData,
} from "../../../store/reducers/Formapireducer";
import { toast } from "react-hot-toast";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { LoadingButton } from "@mui/lab";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {
  dataGridHeaderFooterHeight,
  dataGridHeight,
  dataGridRowHeight,
  formGap,
} from "../../../ui-components/utils";
import {
  CheckinAutocomplete,
  SingleFormikOptimizedAutocomplete,
} from "../../../ui-components/global/Autocomplete";
import store from "../../..";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  CompanyimageUpload,
  imageUpload,
} from "../../../store/reducers/Imguploadreducer";
import Resizer from "react-image-file-resizer";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import { Image } from "@mui/icons-material";
import { TbBoxMultiple1 } from "react-icons/tb";
import { nanoid } from "@reduxjs/toolkit";
import { slotListView } from "../../../store/reducers/Explorelitviewapireducer";

export const companySchema = Yup.object().shape({
  address: Yup.string().max(500, "Address must be 500 character "),
  phone: Yup.string().max(10, "Not Valid Phone Number"),
  pincode: Yup.number()
    .min(10000, "Not valid Pin Code")
    .max(999999, "Not valid Pin Code"),
  country: Yup.object().required("Please select a country").nullable(),
  license: Yup.string()
    .matches(
      /^[a-zA-Z0-9]{4}$/,
      "Please enter alphabets only, exactly 4 characters",
    ) // Only letters and digits, 4 characters long
    .test(
      "contains-both",
      "The code must contain both letters and numbers",
      (value) => {
        return /[a-zA-Z]/.test(value) && /\d/.test(value); // Must contain both letters and numbers
      },
    ),
  iECode: Yup.string()
    .matches(/^[-_ a-zA-Z0-9]+$/, "Please enter alphabets only")
    .min(10, "I.E.Code must be 10 character"),
  gst: Yup.string()
    .matches(/^[-_ a-zA-Z0-9]+$/, "Only Numeric and Alphabets ")
    .min(15, "GST must be 15 character"),
  email: Yup.string().email("Please enter a valid Email"),
  name: Yup.string()
    .max(50)
    .matches(/^[A-Za-z\s\.'-]+$/, "Please enter alphabets only"),
});

const Editcompany = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");

  const [errorMsgData, setErrorMsgData] = useState(null);
  const [validationSchema, setValidationSchema] = useState(null);
  const [BankValidationSchema, setBankValidationSchema] = useState(null);
  const [show, setScreen] = React.useState("0");
  const [headerImage, setheaderImage] = useState("");
  const [footerImage, setfooterImage] = useState("");
  const [esignImage, setesignImage] = useState("");
  const [qrCodeImage, setqrCodeImage] = useState("");

  //IMAGE PREVIEW
  const [headerPreview, setHeaderPreview] = useState(""); // blob preview url
  const [footerPreview, setFooterPreview] = useState(""); // blob preview url
  const [eSignPreview, seteSignPreview] = useState(""); // blob preview url
  const [qrCodePreview, setqrCodePreview] = useState(""); // blob preview url

  const data = useSelector((state) => state.formApi.Data);

  let recID = params.id;
  console.log(recID, "--recID");

  let mode = params.Mode;
  let accessID = params.accessID;
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/validationcms.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch validationcms.json");
        return res.json();
      })
      .then((data) => {
        setErrorMsgData(data);
        // const schema = Yup.object().shape({
        //   address: Yup.string().required(data.Company.address),
        //   name: Yup.string().required(data.Company.name),
        //   country: Yup.object().required(data.Company.country).nullable(),
        //   email: Yup.string().required(data.Company.email),
        //   pincode: Yup.string().required(data.Company.pincode),
        //   license: Yup.string().required(data.Company.license),

        //   gst: Yup.string().required(data.Company.gst),
        //   phone: Yup.string().required(data.Company.phone),
        // });
        let schemaFields1 = {
          address: Yup.string().required(data.Company.address),
          name: Yup.string().required(data.Company.name),
          country: Yup.object().required(data.Company.country).nullable(),
          email: Yup.string()
            .required(data.Company.email)
            .matches(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              "Invalid Email format",
            ),

          pincode: Yup.string()
            .required(data.Company.pincode)
            .matches(/^\d{6}$/, "Invalid Pincode"),
          license: Yup.string().required(data.Company.license),
          gst: Yup.string()
            .required(data.Company.gst)
            .matches(
              /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
              "Invalid GST number",
            ),

          phone: Yup.string()
            .required(data.Company.phone)
            .matches(/^[6-9]\d{9}$/, "Invalid Phone Number"),
        };

        // IE Code
        schemaFields1.iECode = Yup.string()
          .nullable()
          .notRequired()
          .transform((value) => (value === "" ? null : value))
          .matches(/^[A-Za-z0-9]{10}$/, data.Company.iECode);

        // RBI Code
        schemaFields1.rbiCode = Yup.string()
          .nullable()
          .notRequired()
          .transform((value) => (value === "" ? null : value))
          .matches(/^[A-Za-z0-9]{7,11}$/, data.Company.rbiCode);

        // ************** 2. BANK SCHEMA **************
        const BankSchema = Yup.object().shape({
          bankname: Yup.string().required(data.BankDetails.bankname),
          branchname: Yup.string().required(data.BankDetails.branchname),
          Accounttype: Yup.string().required(data.BankDetails.Accounttype),

          ifsc: Yup.string()
            .required(data.BankDetails.ifsc)
            .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code"),

          accountnumber: Yup.string()
            .required(data.BankDetails.accountnumber)
            .matches(/^\d{9,18}$/, "Invalid Account Number"),

          bankloc: Yup.string().required(data.BankDetails.bankloc),
          accountholdname: Yup.string().required(
            data.BankDetails.accountholdname,
          ),
          bankaddress: Yup.string().required(data.BankDetails.bankaddress),
        });

        // ************** 3. SET STATE **************
        const schema1 = Yup.object().shape(schemaFields1);

        setBankValidationSchema(BankSchema);
        setValidationSchema(schema1);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, []);
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  const [validationSchema2, setValidationSchema2] = useState(null);

  const { toggleSidebar, broken, rtl } = useProSidebar();
  const Data = useSelector((state) => state.formApi.Data);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);

  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = useState(15);
  const exploreLoading = useSelector((state) => state.exploreApi.loading);

  const partyBankgetdata = useSelector((state) => state.formApi.BankData);
  const CompReportgetdata = useSelector(
    (state) => state.formApi.CompReportData,
  );
  const BankgetLoading = useSelector((state) => state.formApi.BankgetLoading);
  const CompReportgetLoading = useSelector(
    (state) => state.formApi.CompReportgetLoading,
  );
  const BankisLoading = useSelector((state) => state.formApi.BankpostLoading);
  const CompReportpostDataLoading = useSelector(
    (state) => state.formApi.CompReportpostDataLoading,
  );
  const [loading, setLoading] = useState(false);

  //POLICY_GET
  const PolicyData = useSelector((state) => state.formApi.PolicyData);
  const PolicygetLoading = useSelector(
    (state) => state.formApi.PolicygetLoading,
  );

  const rowData = location.state || {};

  const slotRowData = useSelector((state) => state.exploreApi.slotRowData);
  console.log(slotRowData, "--slotRowData");

  const [rows, setRows] = React.useState(slotRowData);

  const [rowModesModel, setRowModesModel] = React.useState({});

  useEffect(() => {
    setRows(slotRowData || []);
  }, [slotRowData]);

  const screenChange = async (event) => {
    setScreen(event.target.value);
    if (event.target.value == "0") {
      console.log(event.target.value, "--find event.target.value");

      if (recID && mode === "E") {
        dispatch(getFetchData({ accessID, get: "get", recID }));
      } else {
        dispatch(getFetchData({ accessID, get: "", recID }));
      }
    }
    if (event.target.value == "1") {
      if (recID && mode === "E") {
        dispatch(BankFetchData({ get: "get", recID }));
      } else {
        dispatch(BankFetchData({ get: "", recID }));
      }
    }
    if (event.target.value == "2") {
      if (recID && mode === "E") {
        dispatch(CompReportFetchData({ recID }));
      } else {
        dispatch(CompReportFetchData({ get: "", recID }));
      }
    }
    //Policy
    if (event.target.value == "3") {
      if (recID && mode === "E") {
        dispatch(PolicyFetchData({ get: "get", recID }));
      } else {
        dispatch(PolicyFetchData({ get: "", recID }));
      }
    }

    //Curriculam Details
    if (event.target.value == "4") {
      if (recID && mode === "E") {
        dispatch(PolicyFetchData({ get: "get", recID }));
        const data = await dispatch(
          slotListView({
            accessID: "TR334",
            screenName: "Slot",
            filter: `CompanyID = ${recID}`,
            any: "",
          }),
        );
        console.log(rows, "--finding rows inside ScreenChange");

        // setRows(slotRowData);
        console.log("🚀 ~ screenChange ~ data:", data);
      } else {
        dispatch(PolicyFetchData({ get: "", recID }));
      }
    }
    //     if (event.target.value === "4") {
    //   if (recID && mode === "E") {
    //     dispatch(PolicyFetchData({ get: "get", recID }));

    //     const data = await dispatch(
    //       slotListView({
    //         accessID: "TR334",
    //         screenName: "Slot",
    //         filter: `CompanyID = ${recID}`,
    //         any: "",
    //       })
    //     );

    //     if (data.payload?.Status === "Y") {
    //       setRows(data.payload.Data.rows);
    //     } else {
    //       setRows([]);
    //     }

    //     console.log("🚀 ~ screenChange ~ data:", data);
    //   } else {
    //     dispatch(PolicyFetchData({ get: "", recID }));
    //   }
    // }
  };

  // const screenChange = async (event) => {
  //   const value = event.target.value;
  //   setScreen(value);

  //   const isEdit = recID && mode === "E";

  //   if (value === "0") {
  //     dispatch(getFetchData({ accessID, get: isEdit ? "get" : "", recID }));
  //   }

  //   if (value === "1") {
  //     dispatch(BankFetchData({ get: isEdit ? "get" : "", recID }));
  //   }

  //   if (value === "2") {
  //     dispatch(CompReportFetchData({ get: isEdit ? "get" : "", recID }));
  //   }

  //   if (value === "3") {
  //         console.log("--calling Slot screen");

  //     dispatch(PolicyFetchData({ get: isEdit ? "get" : "", recID }));
  //   }

  //   if (value === "4") {
  //     console.log("--calling Slot screen");

  //     dispatch(PolicyFetchData({ get: isEdit ? "get" : "", recID }));

  //     if (isEdit) {
  //       const data = await dispatch(
  //         slotListView({
  //           AccessID: "TR334",
  //           ScreenName: "Slot",
  //           Filter: `CompanyID = ${recID}`,
  //           Any: "",
  //         })
  //       );

  //       console.log("🚀 ~ screenChange ~ data:", data);
  //     }
  //   }
  // };

  const initialValues = {
    code: Data.Code,
    recordID: Data.RecordID,
    name: Data.Name,
    address: Data.Address,
    pincode: Data.Pincode,
    phone: Data.Phone,
    fax: Data.Fax,
    email: Data.Email,
    web: Data.Web,
    cst: Data.Cst,
    areacode: Data.Areacode,
    iECode: Data.Iecode,
    rbiCode: Data.Rbicode,
    gst: Data.Gst,
    Lut: Data.Lut,
    sortOrder: Data.SortOrder,
    license: Data.License,
    disable: Data.Disable === "Y" ? true : false,
    stockClose: Data.Process === "Y" ? true : false,
    useregular: Data.Regularslno === "Y" ? true : false,
    noOfEmployees: Data.NumberOfEmployee,
    noofusers: Data.NumberOfUsers,
    country: Data.CnRecordID
      ? {
          RecordID: Data.CnRecordID,
          Code: Data.CountryCode,
          Name: Data.CountryName,
        }
      : null,
    Module: mode === "E" ? Data.Module : "",
  };

  /*************************SAVE FUCTION*********************/
  const fnSave = async (values) => {
    var idata = {
      RecordID: recID,
      CnRecordID: values.country.RecordID || 0,
      CountryCode: values.country.Code || "",
      CountryName: values.country.Name || "",
      Code: values.code,
      Name: values.name,
      Email: values.email,
      Address: values.address,
      Pincode: values.pincode,
      Phone: values.phone,
      Fax: values.fax,
      Web: values.web,
      Cst: values.cst,
      Areacode: values.areacode,
      Iecode: values.iECode,
      Rbicode: values.rbiCode,
      Gst: values.gst,
      Lut: values.Lut,
      SortOrder: values.sortOrder || 0,
      License: values.license,
      Disable: values.disable === true ? "Y" : "N",
      Process: values.stockClose === true ? "Y" : "N",
      Regularslno: values.useregular === true ? "Y" : "N",
      NumberOfEmployee: values.noOfEmployees,
      NumberOfUsers: values.noofusers,
      Module: values.Module,
    };
    console.log(values.Module);

    let action = mode === "A" ? "insert" : "update";
    const data = await dispatch(postData({ accessID, action, idata }));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      // if (mode === "A") {
      //   navigate(-1);
      // } else if (mode === "E") {
      //   setScreen("0");
      // }
      navigate(`/Apps/TR014/Company`);
    } else {
      toast.error(data.payload.Msg);
    }
  };

  const BankInitialValue = {
    code: partyBankgetdata.Code || "",
    name: partyBankgetdata.Name || "",
    bankname: partyBankgetdata.BankName || "",
    Accounttype: partyBankgetdata.BankAccountType || "",
    branchname: partyBankgetdata.BankBranchName || "",
    ifsc: partyBankgetdata.BankIfsc || "",
    bankloc: partyBankgetdata.BankLocation || "",
    accountnumber: partyBankgetdata.BankAccountNo || "",
    bankaddress: partyBankgetdata.BankAddress || "",
    accountholdname: partyBankgetdata.BankAccountHolderName || "",
  };

  const Banksave = async (values, del) => {
    setLoading(true);

    let action =
      mode === "A" && !del
        ? "insert"
        : mode === "E" && del
          ? "harddelete"
          : "update";

    const idata = {
      action: "update",
      RecordID: recID,
      BankName: values.bankname,
      BankBranchName: values.branchname,
      BankAccountHolderName: values.accountholdname,
      BankAccountNo: values.accountnumber,
      BankAccountType: values.Accounttype,
      BankIfsc: values.ifsc,
      BankLocation: values.bankloc,
      BankAddress: values.bankaddress,
    };

    try {
      const response = await dispatch(BankpostData({ idata }));

      if (response.payload.Status === "Y") {
        toast.success(response.payload.Msg);
        // navigate("/Apps/TR243/Party");
        setScreen("1");
      } else {
        toast.error(response.payload.Msg);
      }
    } catch (error) {
      toast.error("An error occurred while saving data.");
    } finally {
      setLoading(false);
    }
  };

  // POLICY SCREEN
  const PolicyInitialValue = {
    code: PolicyData.Code || "",
    name: PolicyData.Name || "",
    noofpermhrs: PolicyData.PerNumberOfHours || "",
    noofpermpermonth: PolicyData.PerNumberOfMonth || "",
    lossofpayrate: PolicyData.PerLossOfPayRate || "",
    freeormonth: PolicyData.IrFreeMonth || "",
    lossofpayrate2: PolicyData.IrLossOfPayRate || "",
    salryrateorday: PolicyData.OtSalaryRatePerDay || "",
  };

  const Policysave = async (values, del) => {
    setLoading(true);

    let action =
      mode === "A" && !del
        ? "insert"
        : mode === "E" && del
          ? "harddelete"
          : "update";

    const idata = {
      action: "update",
      RecordID: recID,
      PerNumberOfHours: values.noofpermhrs,
      PerNumberOfMonth: values.noofpermpermonth,
      PerLossOfPayRate: values.lossofpayrate,
      IrFreeMonth: values.freeormonth,
      IrLossOfPayRate: values.lossofpayrate2,
      OtSalaryRatePerDay: values.salryrateorday,
    };

    try {
      const response = await dispatch(PolicyUpdateData({ idata }));

      if (response.payload.Status === "Y") {
        toast.success(response.payload.Msg);
        // navigate("/Apps/TR243/Party");
        setScreen("3");
      } else {
        toast.error(response.payload.Msg);
      }
    } catch (error) {
      toast.error("An error occurred while saving data.");
    } finally {
      setLoading(false);
    }
  };

  const CompReportInitialValue = {
    code: CompReportgetdata.Code || "",
    name: CompReportgetdata.Name || "",
    CmHeader: CompReportgetdata.CmHeader || "",
    CmFooter: CompReportgetdata.CmFooter || "",
    Signature: CompReportgetdata.Signature || "",
    QrCode: CompReportgetdata.QrCode || "",
  };

  const CompReportsave = async (values, del) => {
    setLoading(true);

    const idata = {
      action: "update",
      CompanyID: recID,
      QrCode:
        qrCodeImage && qrCodeImage !== ""
          ? qrCodeImage
          : CompReportgetdata.QrCode,

      Signature:
        esignImage && esignImage !== ""
          ? esignImage
          : CompReportgetdata.Signature,

      CmHeader:
        headerImage && headerImage !== ""
          ? headerImage
          : CompReportgetdata.CmHeader,

      CmFooter:
        footerImage && footerImage !== ""
          ? footerImage
          : CompReportgetdata.CmFooter,
    };

    try {
      const response = await dispatch(CompReportpostData({ idata }));

      if (response.payload.Status === "Y") {
        toast.success(response.payload.Msg);
        // navigate("/Apps/TR243/Party");
        setScreen("2");
      } else {
        toast.error(response.payload.Msg);
      }
    } catch (error) {
      toast.error("An error occurred while saving data.");
    } finally {
      setLoading(false);
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
          navigate("/Apps/TR014/Company");
        }
      } else {
        return;
      }
    });
  };

  const getFileHeaderChange1 = async (event) => {
    setheaderImage(event.target.files[0]);
    setHeaderPreview(URL.createObjectURL(event.target.files[0]));

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "images");

    const fileData = await dispatch(CompanyimageUpload({ formData }));
    setheaderImage(fileData.payload.name);
    console.log(">>>", fileData.payload);
    console.log(
      "🚀 ~ file: Editdeliverychalan.jsx:1143 ~ getFileChange ~ fileData:",
      fileData,
    );
    if (fileData.payload.Status == "Y") {
      // console.log("I am here");
      toast.success(fileData.payload.Msg);
    }
  };

  const getFileFooterChange = async (event) => {
    setfooterImage(event.target.files[0]);
    setFooterPreview(URL.createObjectURL(event.target.files[0]));
    console.log(event.target.files[0]);
    //setFooterPreview(URL.createObjectURL(event.target.files[0]));

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "images");

    const fileData = await dispatch(CompanyimageUpload({ formData }));
    setfooterImage(fileData.payload.name);
    console.log(">>>", fileData.payload);
    console.log(
      "🚀 ~ file: Editdeliverychalan.jsx:1143 ~ getFileChange ~ fileData:",
      fileData,
    );
    if (fileData.payload.Status == "Y") {
      // console.log("I am here");
      toast.success(fileData.payload.Msg);
    }
  };

  const getFileESignChange = async (event) => {
    setesignImage(event.target.files[0]);

    seteSignPreview(URL.createObjectURL(event.target.files[0]));
    console.log(event.target.files[0]);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "images");

    const fileData = await dispatch(CompanyimageUpload({ formData }));
    setesignImage(fileData.payload.name);
    console.log(">>>", fileData.payload);
    console.log(
      "🚀 ~ file: Editdeliverychalan.jsx:1143 ~ getFileChange ~ fileData:",
      fileData,
    );
    if (fileData.payload.Status == "Y") {
      // console.log("I am here");
      toast.success(fileData.payload.Msg);
    }
  };

  const getFileQRCodeChange = async (event) => {
    setqrCodeImage(event.target.files[0]);

    console.log(event.target.files[0]);
    setqrCodePreview(URL.createObjectURL(event.target.files[0]));
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "images");

    const fileData = await dispatch(CompanyimageUpload({ formData }));
    setqrCodeImage(fileData.payload.name);
    console.log(">>>", fileData.payload);
    console.log(
      "🚀 ~ file: Editdeliverychalan.jsx:1143 ~ getFileChange ~ fileData:",
      fileData,
    );
    if (fileData.payload.Status == "Y") {
      // console.log("I am here");
      toast.success(fileData.payload.Msg);
    }
  };

  //SLOT Screen_COMPANYEXPLORE

  const columns = [
    {
      field: "SLNO",
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
      headerName: "RecordID",
      field: "RecordID",
      width: 100,
      align: "left",
      headerAlign: "center",
      hide: true,
    },

    {
      field: "SlotCode",
      headerName: "Slot Code",
      width: 150,
      align: "left",
      headerAlign: "center",
      editable: true,
    },
    {
      field: "SlotName",
      headerName: "Slot Name",
      width: 150,
      align: "left",
      headerAlign: "center",
      editable: true,
    },
    {
      headerName: "From Time",
      field: "FromTime", // ✅ match exact API field
      width: 150,
       align: "left",
      headerAlign: "center",
      editable: true,
      renderCell: (params) => params.value || "",
      renderEditCell: (params) => <EditTimeCell {...params} />,
    },
    {
      headerName: "To Time",
      field: "ToTime", // ✅ match exact API field
      width: 150,
       align: "left",
      headerAlign: "center",
      editable: true,
      renderCell: (params) => params.value || "",
      renderEditCell: (params) => <EditTimeCell {...params} />,
    },
    {
      field: "Comments",
      headerName: "Comments",
      width: 150,
       align: "left",
      headerAlign: "center",
      editable: true,
      type: "text",
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              material={{
                sx: {
                  color: "primary.main",
                },
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          // <GridActionsCellItem
          //   icon={<AddIcon style={{ color: "#00563B" }} />}
          //   label="Add"
          //   // onClick={() => handleInsertInrow(id)}
          //   color="inherit"
          // />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (RecordID) => () => {
    setRowModesModel({
      ...rowModesModel,
      [RecordID]: { mode: GridRowModes.Edit },
    });
  };

  const handleSaveClick = (RecordID) => () => {
    setRowModesModel({
      ...rowModesModel,
      [RecordID]: { mode: GridRowModes.View },
    });
  };

  const handleDeleteClick = (RecordID) => async () => {
    setRows(rows.filter((row) => row.RecordID !== RecordID));

    if (!isNaN(RecordID)) {
      const idata = {
        //RecordID: recID,
        RecordID: RecordID,
      };

      const response = await dispatch(
        postData({
          accessID: "TR334",
          action: "harddelete",
          idata: idata,
        }),
      );

      if (response.payload?.Status === "Y") {
        toast.success(response.payload.Msg);
        const data = await dispatch(
          slotListView({
            accessID: "TR334",
            screenName: "Slot",
            filter: `CompanyID = ${recID}`,
            any: "",
          }),
        );
        console.log("🚀 ~ screenChange ~ data:", data);
        // if (data.payload.Status == "Y") {
        //   const resData = data.payload.Data.rows.map((value) => {
        //     return {
        //       ...value,
        //       TaskDetailRoleID: {
        //         RecordID: value.TaskDetailRoleID,
        //         Name: value.RoleName,
        //       },
        //     };
        //   });
        //   setRows(resData);
        // } else {
        //   setRows([]); // Ensures rows don't break if explorelistViewData is undefined or not an array
        // }
      } else {
        toast.error(response.payload?.Msg || "Operation failed");
      }
    }
  };

  const handleCancelClick = (RecordID) => () => {
    setRowModesModel({
      ...rowModesModel,
      [RecordID]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.RecordID === RecordID);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.RecordID !== RecordID));
    }
  };

 
  const processRowUpdate = (newRow, oldRow) => {
    const updatedRow = { ...newRow, isNew: false };
    console.log(newRow, "newRow");
    console.log(oldRow, "--oldRow");

    setRows((prevRows) =>
      prevRows.map((row) =>
        row.RecordID === newRow.RecordID ? updatedRow : row,
      ),
    );

    console.log(updatedRow, "--updatedRow");

    return updatedRow;
  };

 
  
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  function EditTimeCell(props) {
    const { id, field, value, api } = props;

    const handleChange = (event) => {
      const newValue = event.target.value;
      api.setEditCellValue({ id, field, value: newValue });
    };

    // Remove seconds if present (09:00:00 → 09:00)
    const formattedValue = value ? value.slice(0, 5) : "";

    return (
      <TextField
        type="time"
        fullWidth
        size="small"
        value={formattedValue}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
      />
    );
  }

  const formatTo12Hour = (time) => {
    if (!time) return "";

    // ✅ If already formatted (contains AM/PM), return as is
    if (
      time.toUpperCase().includes("AM") ||
      time.toUpperCase().includes("PM")
    ) {
      return time;
    }

    const [hour, minute] = time.split(":");
    let h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";

    h = h % 12;
    h = h ? h : 12;

    return `${h}:${minute} ${ampm}`;
  };

  const handleSaveButtonClick = async (action) => {
    const idata = rows.map((row, index) => {
      return {
        RecordID: row.isNew ? 0 : row.RecordID,
        CompanyID: recID,
        Code: row.SlotCode,
        SlotName: row.SlotName,
        Comments: row.Comments,
        FromTime: formatTo12Hour(row.FromTime),
        ToTime: formatTo12Hour(row.ToTime),
        SortOrder: 0,
        // Disable: "",
        // DeleteFlag: ""
      };
    });
    console.log(idata, "--print the idata");

    // return;
    try {
      const response = await dispatch(
        postData({
          accessID: "TR334",
          action: "insert",
          idata: idata,
        }),
      );

      // Check response status for success
      if (response.payload.Status === "Y") {
        toast.success(response.payload.Msg);
        const data = await dispatch(
          slotListView({
            accessID: "TR334",
            screenName: "Slot",
            filter: `CompanyID = ${recID}`,
            any: "",
          }),
        );
        console.log("🚀 ~ screenChange ~ data:", data);
        if (data.payload.Status == "Y") {
          const resData = data.payload.Data.rows.map((value) => {
            return {
              ...value,
              // TaskDetailRoleID: {
              //   RecordID: value.TaskDetailRoleID,
              //   Name: value.RoleName,
              // },
            };
          });
          setRows(resData);
        } else {
          setRows([]); // Ensures rows don't break if explorelistViewData is undefined or not an array
        }
      } else {
        toast.error(response.payload.Msg);
      }
    } catch (error) {
      toast.error("Error occurred during save.");
    }
  };

  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
      const id = nanoid();
      const nextSLNO =
        rows.length > 0 ? Math.max(...rows.map((row) => row.SLNO || 0)) + 1 : 1;
      setRows((oldRows) => [
        ...oldRows,
        {
          RecordID: id, // Temporary ID, replaced after backend save
          SLNO: nextSLNO,
          SlotCode: "",
          SlotName: "",
          FromTime: "",
          ToTime: "",
          Comments: "",
          isNew: true,
        },
      ]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "SlotCode" },
      }));
    };
    return (
      <GridToolbarContainer
        sx={{
          marginBottom: "10px",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add Record
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <Box>
      {getLoading ? <LinearProgress /> : false}
      {BankgetLoading ? <LinearProgress /> : false}
      {BankisLoading ? <LinearProgress /> : false}
      {CompReportgetLoading ? <LinearProgress /> : false}
      {CompReportpostDataLoading ? <LinearProgress /> : false}
      {isLoading ? <LinearProgress /> : false}
      <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box
            display="flex"
            borderRadius="3px"
            alignItems={"center"}
            justifyContent="space-between"
          >
            {broken && !rtl && (
              <IconButton onClick={() => toggleSidebar()}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
            <Breadcrumbs
              maxItems={3}
              aria-label="breadcrumb"
              separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
            >
              <Typography
                variant="h3"
                onClick={() => navigate("/Apps/TR014/Company")}
              >
                {mode === "E"
                  ? `Company(${rowData.CompanyName})`
                  : "Company(New)"}
              </Typography>
              {mode === "E" && show == "0" ? (
                <Typography variant="h3">Company Details</Typography>
              ) : null}
              {mode === "E" && show == "1" ? (
                <Typography variant="h3">Bank Details</Typography>
              ) : null}
              {mode === "E" && show == "2" ? (
                <Typography variant="h3">Report Settings</Typography>
              ) : null}
              {mode === "E" && show == "3" ? (
                <Typography variant="h3">Policy</Typography>
              ) : null}
              {mode === "E" && show == "4" ? (
                <Typography variant="h3">Slots</Typography>
              ) : null}
            </Breadcrumbs>
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
                  <MenuItem value={0}>Company</MenuItem>
                  <MenuItem value={1}>Bank Details</MenuItem>
                  <MenuItem value={2}>Report Settings</MenuItem>
                  <MenuItem value={3}>Policy</MenuItem>
                  <MenuItem value={4}>Slot</MenuItem>
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
      </Paper>
      {/* {!getLoading ? ( */}
      {show == "0" ? (
        <Paper elevation={3} sx={{ margin: "10px" }}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                fnSave(values);
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
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap={formGap}
                  padding={1}
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
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
                    {/* {JSON.stringify(errors)} */}
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="Code"
                      placeholder="Auto"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.code}
                      focused
                      inputProps={{ maxLength: 5 }}
                      InputProps={{ readOnly: true }}
                      name="code"
                      autoFocus
                    />

                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label={
                        <>
                          Name{" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </>
                      }
                      // onInvalid={(e) => {
                      //   e.target.setCustomValidity("Please fill the Name");
                      // }}
                      // onInput={(e) => {
                      //   e.target.setCustomValidity("");
                      // }}
                      value={values.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="name"
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      // required
                      inputProps={{ maxLength: 50 }}
                      autoFocus
                    />

                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label={
                        <>
                          Address{" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </>
                      }
                      value={values.address}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="address"
                      error={!!touched.address && !!errors.address}
                      helperText={touched.address && errors.address}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      // required
                      // onInvalid={(e) => {
                      //   e.target.setCustomValidity("Please fill the Address");
                      // }}
                      // onInput={(e) => {
                      //   e.target.setCustomValidity("");
                      // }}
                      inputProps={{ maxLength: 500 }}
                      multiline
                    />
                    <FormControl
                      sx={{
                        gridColumn: "span 2",
                        display: "flex",
                      }}
                    >
                      <FormControl
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <CheckinAutocomplete
                          label={
                            <>
                              Country
                              <span style={{ color: "red", fontSize: "20px" }}>
                                {" "}
                                *{" "}
                              </span>
                            </>
                          }
                          id="country"
                          name="country"
                          value={values.country}
                          error={!!touched.country && !!errors.country}
                          helperText={touched.country && errors.country}
                          onChange={(e, newValue) => {
                            setFieldValue("country", newValue);
                          }}
                          // log
                          url={`${
                            store.getState().globalurl.listViewurl
                          }?data={"Query":{"AccessID":"2003","ScreenName":"Country","Filter":"","Any":"","CompId":"4"}}`}
                        />

                        {/* {touched.country && errors.country && (
                          <div style={{ color: "red", fontSize: "12px", marginTop: "2px" }}>
                            {errors.country}
                          </div>
                        )} */}
                      </FormControl>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        label="RBI Code"
                        value={values.rbiCode}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="rbiCode"
                        error={!!touched.rbiCode && !!errors.rbiCode}
                        helperText={touched.rbiCode && errors.rbiCode}
                        focused
                        // inputProps={{ maxLength: 5 }}
                      />
                    </FormControl>
                    <TextField
                      fullWidth
                      variant="standard"
                      type="number"
                      label={
                        <>
                          Pincode
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </>
                      }
                      // required
                      // onInvalid={(e) => {
                      //   e.target.setCustomValidity("Please fill the Pincode");
                      // }}
                      value={values.pincode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="pincode"
                      error={!!touched.pincode && !!errors.pincode}
                      helperText={touched.pincode && errors.pincode}
                      sx={{ gridColumn: "span 2" }}
                      focused
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 6);

                        e.target.setCustomValidity("");
                      }}
                    />

                    <TextField
                      fullWidth
                      variant="standard"
                      type="number"
                      label={
                        <>
                          Phone
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </>
                      }
                      // required
                      // onInvalid={(e) => {
                      //   e.target.setCustomValidity("Please fill the Phone");
                      // }}
                      value={values.phone}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="phone"
                      sx={{ gridColumn: "span 2" }}
                      focused
                      error={!!touched.phone && !!errors.phone}
                      helperText={touched.phone && errors.phone}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 10);

                        e.target.setCustomValidity("");
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="standard"
                      type="number"
                      label="No Of Users"
                      value={values.noofusers}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="noofusers"
                      sx={{
                        gridColumn: "span 2",
                        input: { textAlign: "right" },
                      }}
                      focused
                      onWheel={(e) => e.target.blur()}
                    />
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="LUT"
                      value={values.Lut}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="Lut"
                      inputProps={{ readOnly: true }}
                      focused
                    />
                  </FormControl>
                  <FormControl sx={{ gridColumn: "span 2", gap: formGap }}>
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="Web URL"
                      value={values.web}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="web"
                      sx={{ gridColumn: "span 2" }}
                      focused
                    />

                    <TextField
                      fullWidth
                      variant="standard"
                      type="email"
                      label={
                        <>
                          Email ID
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </>
                      }
                      // required
                      // onInvalid={(e) => {
                      //   e.target.setCustomValidity("Please fill the Email Id");
                      // }}
                      // onInput={(e) => {
                      //   e.target.setCustomValidity("");
                      // }}
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      name="email"
                      sx={{ gridColumn: "span 2" }}
                      focused
                      inputProps={{ maxLength: 45 }}
                    />
                    {/* <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="I.E.Code"
                      // required
                      // onInvalid={(e) => {
                      //   e.target.setCustomValidity("Please fill the I.E.Code");
                      // }}
                      // onInput={(e) => {
                      //   e.target.setCustomValidity("");
                      // }}
                      value={values.iECode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="iECode"
                      error={!!touched.iECode && !!errors.iECode}
                      helperText={touched.iECode && errors.iECode}
                      focused
                    // inputProps={{ maxLength: 10 }}
                    /> */}
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      id="iECode"
                      name="iECode"
                      value={values.iECode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="I.E.Code"
                      focused
                      onWheel={(e) => e.target.blur()}
                      error={!!touched.iECode && !!errors.iECode}
                      helperText={touched.iECode && errors.iECode}
                    />

                    {/* <FormControl
                      variant="standard"
                      fullWidth
                      // required 
                      focused>
                      <InputLabel id="module-label">Module</InputLabel>
                      <Select
                        labelId="module-label"
                        id="Module"
                        name="Module"
                        multiple
                        value={values.Module}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        renderValue={(selected) => selected.join(', ')}
                      >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Task">Task</MenuItem>
                        <MenuItem value="Project">Project</MenuItem>
                        <MenuItem value="Attendance">Attendance</MenuItem>
                        <MenuItem value="Request">Request</MenuItem>
                        <MenuItem value="Assessment">Assessment</MenuItem>
                        <MenuItem value="Myprofile">Myprofile</MenuItem>
                      </Select>
                    </FormControl> */}
                    <FormControl variant="standard" fullWidth focused>
                      <InputLabel id="module-label">Module</InputLabel>

                      <Select
                        labelId="module-label"
                        id="Module"
                        name="Module"
                        multiple
                        // Convert comma-separated string to array for MUI Select
                        value={values.Module ? values.Module.split(",") : []}
                        onChange={(e) => {
                          // Convert array back to comma-separated string
                          handleChange({
                            target: {
                              name: "Module",
                              value: e.target.value.join(","),
                            },
                          });
                        }}
                        onBlur={handleBlur}
                        renderValue={(selected) => selected.join(", ")}
                      >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Task">Task</MenuItem>
                        <MenuItem value="Project">Project</MenuItem>
                        <MenuItem value="Attendance">Attendance</MenuItem>
                        <MenuItem value="Request">Request</MenuItem>
                        <MenuItem value="Assessment">Assessment</MenuItem>
                        <MenuItem value="Myprofile">Myprofile</MenuItem>
                      </Select>
                    </FormControl>

                    {/* <FormControl variant="standard" fullWidth focused>
                      <InputLabel id="module-label">Module</InputLabel>

                      <Select
                        labelId="module-label"
                        id="Module"
                        name="Module"
                        multiple
                        value={values.Module?.split(",") || []} // convert string to array safely
                        onChange={(e) => {
                          // Convert selected array back to comma-separated string
                          handleChange({
                            target: {
                              name: "Module",
                              value: e.target.value.join(","),
                            },
                          });
                        }}
                        onBlur={handleBlur}
                        renderValue={(selected) => (
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {selected.map((value) => (
                              <Chip
                                key={value}
                                label={value}
                                onDelete={() => {
                                  // Remove value inside the field
                                  const newSelected = (values.Module || "")
                                    .split(",")
                                    .filter((item) => item !== value)
                                    .join(",");
                                  handleChange({
                                    target: { name: "Module", value: newSelected },
                                  });
                                }}
                              />
                            ))}
                          </Box>
                        )}
                      >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Task">Task</MenuItem>
                        <MenuItem value="Project">Project</MenuItem>
                        <MenuItem value="Attendance">Attendance</MenuItem>
                        <MenuItem value="Request">Request</MenuItem>
                        <MenuItem value="Assessment">Assessment</MenuItem>
                        <MenuItem value="Myprofile">Myprofile</MenuItem>
                      </Select>
                    </FormControl> */}
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label={
                        <>
                          GST
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </>
                      }
                      // required
                      // onInvalid={(e) => {
                      //   e.target.setCustomValidity("Please fill the GST");
                      // }}
                      // onInput={(e) => {
                      //   e.target.setCustomValidity("");
                      // }}
                      value={values.gst}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="gst"
                      error={!!touched.gst && !!errors.gst}
                      helperText={touched.gst && errors.gst}
                      focused
                      inputProps={{ maxLength: 15 }}
                    />

                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label={
                        <>
                          Subscription Code
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </>
                      }
                      // required
                      // onInvalid={(e) => {
                      //   e.target.setCustomValidity(
                      //     "Please fill the Subscription Code"
                      //   );
                      // }}
                      // onInput={(e) => {
                      //   e.target.setCustomValidity("");
                      // }}
                      value={values.license}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="license"
                      error={!!touched.license && !!errors.license}
                      helperText={touched.license && errors.license}
                      focused
                      onInput={(e) => {
                        e.target.setCustomValidity(""); // Clear the custom error
                      }}
                      inputProps={{ maxLength: 4 }}
                    />

                    <TextField
                      fullWidth
                      variant="standard"
                      type="number"
                      label="No Of Employees"
                      value={values.noOfEmployees}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="noOfEmployees"
                      sx={{
                        gridColumn: "span 2",
                        input: { textAlign: "right" },
                      }}
                      focused
                      onWheel={(e) => e.target.blur()}
                    />
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
                  >
                    Save
                  </LoadingButton>

                  <Button
                    color="warning"
                    variant="contained"
                    onClick={() => {
                      navigate("/Apps/TR014/Company");
                    }}
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

      {show == "1" ? (
        <Paper elevation={3} sx={{ margin: "10px" }}>
          <Formik
            initialValues={BankInitialValue}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                Banksave(values);
              }, 100);
            }}
            validationSchema={BankValidationSchema}
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
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap={formGap}
                  padding={1}
                  gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                  // gap="30px"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 2",
                    },
                  }}
                >
                  {/* {CompanyAutoCode == "Y" ? (
                    <TextField
                      name="code"
                      type="text"
                      id="code"
                      label="Code"
                      variant="standard"
                      placeholder="Auto"
                      focused
                      // required
                      value={values.code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.code && !!errors.code}
                      helperText={touched.code && errors.code}
                      sx={{
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                        },
                      }}
                      InputProps={{ readOnly: true }}
                      // autoFocus
                    />
                  ) : ( */}
                  <TextField
                    name="code"
                    type="text"
                    id="code"
                    label={
                      <>
                        Code
                        {/* <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span> */}
                      </>
                    }
                    variant="standard"
                    focused
                    // required
                    value={values.code}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.code && !!errors.code}
                    helperText={touched.code && errors.code}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    InputProps={{
                      inputProps: {
                        readOnly: true,
                      },
                    }}
                    autoFocus
                  />
                  {/* )} */}
                  <TextField
                    name="name"
                    type="text"
                    id="name"
                    label={
                      <>
                        Name
                        {/* <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span> */}
                      </>
                    }
                    variant="standard"
                    focused
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    InputProps={{
                      inputProps: {
                        readOnly: true,
                      },
                    }}
                    // required
                    //autoFocus={CompanyAutoCode == "Y"}
                  />
                  <TextField
                    name="bankname"
                    type="text"
                    id="bankname"
                    label={
                      <>
                        Bank Name
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
                    variant="standard"
                    focused
                    // required
                    value={values.bankname}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.bankname && !!errors.bankname}
                    helperText={touched.bankname && errors.bankname}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    autoFocus
                  />
                  <TextField
                    name="Accounttype"
                    type="text"
                    id="Accounttype"
                    label={
                      <>
                        Account Type
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
                    variant="standard"
                    focused
                    // required
                    value={values.Accounttype}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.Accounttype && !!errors.Accounttype}
                    helperText={touched.Accounttype && errors.Accounttype}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    autoFocus
                  />
                  <TextField
                    name="branchname"
                    label={
                      <>
                        Branch Name
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
                    variant="standard"
                    focused
                    // required
                    value={values.branchname}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    // onChange={(e) => {
                    //   const input = e.target.value.toUpperCase();
                    //   if (/^[A-Z0-9]*$/.test(input) || input === "") {
                    //     handleChange({
                    //       target: {
                    //         name: "branchname",
                    //         value: input,
                    //       },
                    //     });
                    //   }
                    // }}
                    error={!!touched.branchname && !!errors.branchname}
                    helperText={touched.branchname && errors.branchname}
                    sx={{
                      backgroundColor: "#ffffff",
                    }}
                    autoFocus
                  />
                  <TextField
                    name="ifsc"
                    label={
                      <>
                        IFSC Code
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
                    variant="standard"
                    focused
                    // required
                    value={values.ifsc}
                    onBlur={handleBlur}
                    //  onChange={handleChange}
                    onChange={(e) => {
                      const input = e.target.value.toUpperCase();
                      if (/^[0-9A-Z]*$/.test(input) || input === "") {
                        // This updates Formik value correctly
                        handleChange({
                          target: {
                            name: "ifsc",
                            value: input,
                          },
                        });
                      }
                    }}
                    error={!!touched.ifsc && !!errors.ifsc}
                    helperText={touched.ifsc && errors.ifsc}
                    sx={{
                      backgroundColor: "#ffffff",
                    }}
                    autoFocus
                  />
                  <TextField
                    name="accountholdname"
                    type="text"
                    id="accountholdname"
                    label={
                      <>
                        Account Holder Name
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
                    variant="standard"
                    focused
                    // required
                    value={values.accountholdname}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={
                      !!touched.accountholdname && !!errors.accountholdname
                    }
                    helperText={
                      touched.accountholdname && errors.accountholdname
                    }
                    // inputProps={{ maxLength: 10 }}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    autoFocus
                  />

                  <TextField
                    name="bankloc"
                    type="text"
                    id="bankloc"
                    label={
                      <>
                        Bank Location
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
                    variant="standard"
                    focused
                    // required
                    value={values.bankloc}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    autoFocus
                    error={!!touched.bankloc && !!errors.bankloc}
                    helperText={touched.bankloc && errors.bankloc}
                  />
                  {/* <TextField
                    name="accountnumber"
                    type="number"
                    id="accountnumber"
                    label="Account Number"
                    variant="standard"
                    focused
                     required
                    value={values.accountnumber}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    autoFocus
                  /> */}
                  <TextField
                    name="accountnumber"
                    type="text" // use "text" instead of "number" to preserve leading 0s and better control
                    id="accountnumber"
                    label={
                      <>
                        Account Number
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
                    variant="standard"
                    focused
                    // required
                    value={values.accountnumber}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      const input = e.target.value;
                      // Allow only digits
                      if (/^\d*$/.test(input)) {
                        handleChange({
                          target: {
                            name: "accountnumber",
                            value: input,
                          },
                        });
                      }
                    }}
                    error={!!touched.accountnumber && !!errors.accountnumber}
                    helperText={touched.accountnumber && errors.accountnumber}
                    sx={{
                      backgroundColor: "#ffffff",
                    }}
                    autoFocus
                  />
                  <TextField
                    name="bankaddress"
                    type="text"
                    id="bankaddress"
                    label={
                      <>
                        Bank Address
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
                    variant="standard"
                    focused
                    // required
                    value={values.bankaddress}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    error={!!touched.bankaddress && !!errors.bankaddress}
                    helperText={touched.bankaddress && errors.bankaddress}
                    autoFocus
                  />
                </Box>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  padding={1}
                  gap="20px"
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
                  {/* ) : (
                    <Button
                      color="secondary"
                      variant="contained"
                      disabled={true}
                    >
                      Save
                    </Button>
                  )}{" "} */}

                  <Button
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
        </Paper>
      ) : (
        false
      )}

      {show == "2" ? (
        <Paper elevation={3} sx={{ margin: "10px" }}>
          <Formik
            initialValues={CompReportInitialValue}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                CompReportsave(values);
              }, 100);
            }}
            //validationSchema={BankValidationSchema}
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
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap={formGap}
                  padding={1}
                  gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                  // gap="30px"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 2",
                    },
                  }}
                >
                  {/* {CompanyAutoCode == "Y" ? (
                    <TextField
                      name="code"
                      type="text"
                      id="code"
                      label="Code"
                      variant="standard"
                      placeholder="Auto"
                      focused
                      // required
                      value={values.code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.code && !!errors.code}
                      helperText={touched.code && errors.code}
                      sx={{
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                        },
                      }}
                      InputProps={{ readOnly: true }}
                      // autoFocus
                    />
                  ) : ( */}
                  <TextField
                    name="code"
                    type="text"
                    id="code"
                    label={
                      <>
                        Code
                        {/* <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span> */}
                      </>
                    }
                    variant="standard"
                    focused
                    // required
                    value={values.code}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.code && !!errors.code}
                    helperText={touched.code && errors.code}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    InputProps={{
                      inputProps: {
                        readOnly: true,
                      },
                    }}
                    autoFocus
                  />
                  {/* )} */}
                  <TextField
                    name="name"
                    type="text"
                    id="name"
                    label={
                      <>
                        Name
                        {/* <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span> */}
                      </>
                    }
                    variant="standard"
                    focused
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    InputProps={{
                      inputProps: {
                        readOnly: true,
                      },
                    }}
                    // required
                    //autoFocus={CompanyAutoCode == "Y"}
                  />
                </Box>
                <Box
                  // display="flex"
                  // justifyContent="space-between"
                  // padding={1}
                  // gap="20px",
                  display="grid"
                  gap={formGap}
                  padding={1}
                  gridTemplateColumns="repeat(4 , minMax(0,1fr))"
                  // gap="30px"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 2",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Box>
                      {/* HEADER IMAGE */}
                      <Tooltip title="Header Image Upload">
                        <IconButton
                          size="small"
                          color="warning"
                          aria-label="upload picture"
                          component="label"
                        >
                          <input
                            hidden
                            accept="all/*"
                            type="file"
                            onChange={getFileHeaderChange1}
                          />
                          <PictureAsPdfOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                      <Button
                        size="small"
                        variant="contained"
                        component={"a"}
                        onClick={() => {
                          CompReportgetdata.CmHeader || headerImage
                            ? window.open(
                                headerImage
                                  ? store.getState().globalurl.imageUrl +
                                      headerImage
                                  : store.getState().globalurl.imageUrl +
                                      CompReportgetdata.CmHeader,
                                "_blank",
                              )
                            : toast.error("Please Upload File");
                        }}
                      >
                        Header Image View
                      </Button>
                    </Box>
                    <Box>
                      {headerPreview ||
                      headerImage ||
                      CompReportgetdata.CmHeader ? (
                        <img
                          src={
                            headerPreview
                              ? headerPreview
                              : headerImage
                                ? store.getState().globalurl.imageUrl +
                                  headerImage
                                : store.getState().globalurl.imageUrl +
                                  CompReportgetdata.CmHeader
                          }
                          width={175}
                          height={175}
                          style={{
                            objectFit: "contain",
                            border: "1px solid #ccc",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            color: "red",
                            marginTop: 10,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 175,
                            height: 175,
                            border: "1px solid #ccc",
                          }}
                        >
                          Please upload image
                        </div>
                      )}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    {/* FOOTER IMAGE */}
                    <Box>
                      <Tooltip title="Footer Upload">
                        <IconButton
                          size="small"
                          color="warning"
                          aria-label="upload picture"
                          component="label"
                        >
                          <input
                            hidden
                            accept="all/*"
                            type="file"
                            onChange={getFileFooterChange}
                          />
                          <PictureAsPdfOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                      <Button
                        size="small"
                        variant="contained"
                        component={"a"}
                        onClick={() => {
                          CompReportgetdata.CmFooter || footerImage
                            ? window.open(
                                footerImage
                                  ? store.getState().globalurl.imageUrl +
                                      footerImage
                                  : store.getState().globalurl.imageUrl +
                                      CompReportgetdata.CmFooter,
                                "_blank",
                              )
                            : toast.error("Please Upload File");
                        }}
                      >
                        Footer Image View
                      </Button>
                    </Box>
                    <Box>
                      {footerPreview ||
                      footerImage ||
                      CompReportgetdata.CmFooter ? (
                        <img
                          src={
                            footerPreview
                              ? footerPreview
                              : footerImage
                                ? store.getState().globalurl.imageUrl +
                                  footerImage
                                : store.getState().globalurl.imageUrl +
                                  CompReportgetdata.CmFooter
                          }
                          width={175}
                          height={175}
                          style={{
                            objectFit: "contain",
                            border: "1px solid #ccc",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            color: "red",
                            marginTop: 10,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 175,
                            height: 175,
                            border: "1px solid #ccc",
                          }}
                        >
                          Please upload image
                        </div>
                      )}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    {/* E-SIGN IMAGE */}
                    <Box>
                      <Tooltip title="E-Sign Upload">
                        <IconButton
                          size="small"
                          color="warning"
                          aria-label="upload picture"
                          component="label"
                        >
                          <input
                            hidden
                            accept="all/*"
                            type="file"
                            onChange={getFileESignChange}
                          />
                          <PictureAsPdfOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                      <Button
                        size="small"
                        variant="contained"
                        component={"a"}
                        onClick={() => {
                          CompReportgetdata.Signature || esignImage
                            ? window.open(
                                esignImage
                                  ? store.getState().globalurl.imageUrl +
                                      esignImage
                                  : store.getState().globalurl.imageUrl +
                                      CompReportgetdata.Signature,
                                "_blank",
                              )
                            : toast.error("Please Upload File");
                        }}
                      >
                        E-Sign Image View
                      </Button>
                    </Box>
                    <Box>
                      {eSignPreview ||
                      esignImage ||
                      CompReportgetdata.Signature ? (
                        <img
                          src={
                            eSignPreview
                              ? eSignPreview
                              : esignImage
                                ? store.getState().globalurl.imageUrl +
                                  esignImage
                                : store.getState().globalurl.imageUrl +
                                  CompReportgetdata.Signature
                          }
                          width={175}
                          height={175}
                          style={{
                            objectFit: "contain",
                            border: "1px solid #ccc",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            color: "red",
                            marginTop: 10,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 175,
                            height: 175,
                            border: "1px solid #ccc",
                          }}
                        >
                          Please upload image
                        </div>
                      )}
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Box>
                      {/* QR CODE IMAGE */}
                      <Tooltip title="QR Code Upload">
                        <IconButton
                          size="small"
                          color="warning"
                          aria-label="upload picture"
                          component="label"
                        >
                          <input
                            hidden
                            accept="all/*"
                            type="file"
                            onChange={getFileQRCodeChange}
                          />
                          <PictureAsPdfOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                      <Button
                        size="small"
                        variant="contained"
                        component={"a"}
                        onClick={() => {
                          CompReportgetdata.QrCode || qrCodeImage
                            ? window.open(
                                qrCodeImage
                                  ? store.getState().globalurl.imageUrl +
                                      qrCodeImage
                                  : store.getState().globalurl.imageUrl +
                                      CompReportgetdata.QrCode,
                                "_blank",
                              )
                            : toast.error("Please Upload File");
                        }}
                      >
                        QR Code View
                      </Button>
                    </Box>
                    <Box>
                      {qrCodePreview ||
                      qrCodeImage ||
                      CompReportgetdata.QrCode ? (
                        <img
                          src={
                            qrCodePreview
                              ? qrCodePreview
                              : qrCodeImage
                                ? store.getState().globalurl.imageUrl +
                                  qrCodeImage
                                : store.getState().globalurl.imageUrl +
                                  CompReportgetdata.QrCode
                          }
                          width={175}
                          height={175}
                          style={{
                            objectFit: "contain",
                            border: "1px solid #ccc",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            color: "red",
                            marginTop: 10,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 175,
                            height: 175,
                            border: "1px solid #ccc",
                          }}
                        >
                          Please upload image
                        </div>
                      )}
                    </Box>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  padding={1}
                  gap="20px"
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
                  {/* ) : (
                    <Button
                      color="secondary"
                      variant="contained"
                      disabled={true}
                    >
                      Save
                    </Button>
                  )}{" "} */}

                  <Button
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
        </Paper>
      ) : (
        false
      )}
      {/* Policy */}

      {/* {show == "3" ? (
        <Paper elevation={3} sx={{ margin: "10px" }}>
          <Formik
            initialValues={BankInitialValue}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                Banksave(values);
              }, 100);
            }}
            validationSchema={BankValidationSchema}
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
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                            <Typography variant="h5" padding={1}>Permission:</Typography>

           
           <Box
                                display="grid"
                                gridTemplateColumns="repeat(4, minMax(0, 1fr))"
                                gap={formGap}
                                padding={1}
                                sx={{
                                    "& > div": {
                                        gridColumn: isNonMobile ? undefined : "span 4", // Adjust for mobile view
                                    },
                                }}
                            >
                                <FormControl
                                    fullWidth
                                    sx={{ gridColumn: "span 2", gap: formGap }}
                                >
             
                  <TextField
                    name="noofpermhrs"
                    type="number"
                    id="noofpermhrs"
                    label={
                      <>
                        No Of Hours / Permission
                        
                      </>
                    }
                    variant="standard"
                    focused
                    value={values.noofpermhrs}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.noofpermhrs && !!errors.noofpermhrs}
                    helperText={touched.noofpermhrs && errors.noofpermhrs}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    inputProps={{
    style: { textAlign: "right" }
  }}
                   
                  />
                  <TextField
                    name="noofpermpermonth"
                    type="number"
                    id="noofpermpermonth"
                    label={
                      <>
                       No Of Permission / Month
                     
                      </>
                    }
                    variant="standard"
                    focused
                    value={values.noofpermpermonth}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.noofpermpermonth && !!errors.noofpermpermonth}
                    helperText={touched.noofpermpermonth && errors.noofpermpermonth}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                  inputProps={{
                    style: { textAlign: "right" }
                  }}
                    autoFocus
                  />
                  <TextField
                    name="lossofpayrate"
                    type="number"
                    id="lossofpayrate"
                    label={
                      <>
                        Loss of pay rate   
                      
                      </>
                    }
                    variant="standard"
                    focused
                    value={values.lossofpayrate}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.lossofpayrate && !!errors.lossofpayrate}
                    helperText={touched.lossofpayrate && errors.lossofpayrate}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    inputProps={{
                    style: { textAlign: "right" }
                  }}
                    autoFocus
                  />
                  </FormControl>
                       </Box>
                    <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                            <Typography variant="h5" padding={1}>Irregular:</Typography>

                            <Box
                                display="grid"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                gap={formGap}
                                padding={1}
                                sx={{
                                    "& > div": {
                                        gridColumn: isNonMobile ? undefined : "span 4",
                                    },
                                }}
                            >
                                <FormControl fullWidth sx={{ gridColumn: "span 2", gap: formGap }}>
  <TextField
                    name="freeormonth"
                    type="number"
                    id="freeormonth"
                    label={
                      <>
                        Free / Month   
                      
                      </>
                    }
                    variant="standard"
                    focused
                    value={values.freeormonth}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.freeormonth && !!errors.freeormonth}
                    helperText={touched.freeormonth && errors.freeormonth}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    inputProps={{
                    style: { textAlign: "right" }
                  }}
                    autoFocus
                  />
                    <TextField
                    name="lossofpayrate2"
                    type="number"
                    id="lossofpayrate2"
                    label={
                      <>
                        Loss of pay / Rate  
                      
                      </>
                    }
                    variant="standard"
                    focused
                    value={values.lossofpayrate2}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.lossofpayrate2 && !!errors.lossofpayrate2}
                    helperText={touched.lossofpayrate2 && errors.lossofpayrate2}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    inputProps={{
                    style: { textAlign: "right" }
                  }}
                    autoFocus
                  />


 </FormControl>
                       </Box>
                          <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                            <Typography variant="h5" padding={1}>Overtime:</Typography>

                            <Box
                                display="grid"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                gap={formGap}
                                padding={1}
                                sx={{
                                    "& > div": {
                                        gridColumn: isNonMobile ? undefined : "span 4",
                                    },
                                }}
                            >
                                <FormControl fullWidth sx={{ gridColumn: "span 2", gap: formGap }}>
   <TextField
                    name="salryrateorday"
                    type="number"
                    id="salryrateorday"
                    label={
                      <>
                    Salry rate / Day  
                      
                      </>
                    }
                    variant="standard"
                    focused
                    value={values.salryrateorday}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.salryrateorday && !!errors.salryrateorday}
                    helperText={touched.salryrateorday && errors.salryrateorday}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    inputProps={{
                    style: { textAlign: "right" }
                  }}
                    autoFocus
                  />

             

 </FormControl>
                       </Box>
           
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  padding={1}
                  gap="20px"
                >
                 
                  <LoadingButton
                    color="secondary"
                    variant="contained"
                    type="submit"
                    loading={isLoading}
                  >
                    Save
                  </LoadingButton>
               

                  <Button
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
        </Paper>
      ) : (
        false
      )} */}

      {show == "3" ? (
        <Paper elevation={3} sx={{ margin: "10px" }}>
          <Formik
            initialValues={PolicyInitialValue}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                Policysave(values);
              }, 100);
            }}
            // validationSchema={PolicyValidationSchema}
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
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap={formGap}
                  padding={1}
                  gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                  // gap="30px"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 2",
                    },
                  }}
                >
                  <TextField
                    name="code"
                    type="text"
                    id="code"
                    label={<>Code</>}
                    variant="standard"
                    focused
                    // required
                    value={values.code}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.code && !!errors.code}
                    helperText={touched.code && errors.code}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    InputProps={{
                      inputProps: {
                        readOnly: true,
                      },
                    }}
                    autoFocus
                  />
                  {/* )} */}
                  <TextField
                    name="name"
                    type="text"
                    id="name"
                    label={<>Name</>}
                    variant="standard"
                    focused
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    InputProps={{
                      inputProps: {
                        readOnly: true,
                      },
                    }}
                  />
                </Box>
                <Typography variant="h5" padding={1}>
                  Permission:
                </Typography>

                <Box
                  display="grid"
                  gridTemplateColumns="repeat(2, 1fr)"
                  // gridTemplateColumns="repeat(4, minMax(0, 1fr))"
                  gap={formGap}
                  padding={1}
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 2", // Adjust for mobile view
                    },
                  }}
                >
                  {/* <FormControl
                                    fullWidth
                                    sx={{ gridColumn: "span 2", gap: formGap }}
                                > */}

                  <TextField
                    name="noofpermhrs"
                    type="number"
                    id="noofpermhrs"
                    label={<>No Of Hours / Permission</>}
                    variant="standard"
                    focused
                    value={values.noofpermhrs}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.noofpermhrs && !!errors.noofpermhrs}
                    helperText={touched.noofpermhrs && errors.noofpermhrs}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    inputProps={{
                      style: { textAlign: "right" },
                    }}
                  />
                  <TextField
                    name="noofpermpermonth"
                    type="number"
                    id="noofpermpermonth"
                    label={<>No Of Permission / Month</>}
                    variant="standard"
                    focused
                    value={values.noofpermpermonth}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={
                      !!touched.noofpermpermonth && !!errors.noofpermpermonth
                    }
                    helperText={
                      touched.noofpermpermonth && errors.noofpermpermonth
                    }
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    inputProps={{
                      style: { textAlign: "right" },
                    }}
                    autoFocus
                  />
                  <TextField
                    name="lossofpayrate"
                    type="number"
                    id="lossofpayrate"
                    label={<>Loss Of Pay Rate</>}
                    variant="standard"
                    focused
                    value={values.lossofpayrate}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.lossofpayrate && !!errors.lossofpayrate}
                    helperText={touched.lossofpayrate && errors.lossofpayrate}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    inputProps={{
                      style: { textAlign: "right" },
                    }}
                    autoFocus
                  />
                  {/* </FormControl> */}
                </Box>
                <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                <Typography variant="h5" padding={1}>
                  Irregular:
                </Typography>

                <Box
                  display="grid"
                  gridTemplateColumns="repeat(2, 1fr)"
                  // gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  gap={formGap}
                  padding={1}
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  {/* <FormControl fullWidth sx={{ gridColumn: "span 2", gap: formGap }}> */}
                  <TextField
                    name="freeormonth"
                    type="number"
                    id="freeormonth"
                    label={<>Free / Month</>}
                    variant="standard"
                    focused
                    value={values.freeormonth}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.freeormonth && !!errors.freeormonth}
                    helperText={touched.freeormonth && errors.freeormonth}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    inputProps={{
                      style: { textAlign: "right" },
                    }}
                    autoFocus
                  />
                  <TextField
                    name="lossofpayrate2"
                    type="number"
                    id="lossofpayrate2"
                    label={<>Loss Of Pay Rate</>}
                    variant="standard"
                    focused
                    value={values.lossofpayrate2}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.lossofpayrate2 && !!errors.lossofpayrate2}
                    helperText={touched.lossofpayrate2 && errors.lossofpayrate2}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    inputProps={{
                      style: { textAlign: "right" },
                    }}
                    autoFocus
                  />

                  {/* </FormControl> */}
                </Box>
                <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                <Typography variant="h5" padding={1}>
                  Overtime:
                </Typography>

                <Box
                  display="grid"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  gap={formGap}
                  padding={1}
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
                      name="salryrateorday"
                      type="number"
                      id="salryrateorday"
                      label={<>Salary Rate / Day</>}
                      variant="standard"
                      focused
                      value={values.salryrateorday}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        !!touched.salryrateorday && !!errors.salryrateorday
                      }
                      helperText={
                        touched.salryrateorday && errors.salryrateorday
                      }
                      sx={{
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                        },
                      }}
                      inputProps={{
                        style: { textAlign: "right" },
                      }}
                      autoFocus
                    />
                  </FormControl>
                </Box>

                <Box
                  display="flex"
                  justifyContent="flex-end"
                  padding={1}
                  gap="20px"
                >
                  <LoadingButton
                    color="secondary"
                    variant="contained"
                    type="submit"
                    loading={isLoading}
                  >
                    Save
                  </LoadingButton>

                  <Button
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
        </Paper>
      ) : (
        false
      )}
      {show == "4" ? (
        <Paper elevation={3} sx={{ margin: "10px" }}>
          <Formik
            initialValues={PolicyInitialValue}
            onSubmit={(values, setSubmitting) => {
              // setTimeout(() => {
              //   Policysave(values);
              // }, 100);
            }}
            // validationSchema={PolicyValidationSchema}
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
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap={formGap}
                  padding={1}
                  gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                  // gap="30px"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 2",
                    },
                  }}
                >
                  <TextField
                    name="code"
                    type="text"
                    id="code"
                    label={<>Code</>}
                    variant="standard"
                    focused
                    // required
                    value={values.code}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.code && !!errors.code}
                    helperText={touched.code && errors.code}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    InputProps={{
                      inputProps: {
                        readOnly: true,
                      },
                    }}
                    autoFocus
                  />
                  {/* )} */}
                  <TextField
                    name="name"
                    type="text"
                    id="name"
                    label={<>Name</>}
                    variant="standard"
                    focused
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    InputProps={{
                      inputProps: {
                        readOnly: true,
                      },
                    }}
                  />
                </Box>

                <Box
                  m="5px 0 0 0"
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
                    rows={rows}
                    columns={columns}
                    loading={exploreLoading}
                    rowModesModel={rowModesModel}
                    getRowId={(row) => row.RecordID}
                    editMode="row"
                    disableRowSelectionOnClick
                    rowHeight={dataGridRowHeight}
                    headerHeight={dataGridHeaderFooterHeight}
                    experimentalFeatures={{ newEditingApi: true }}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={(error) => {
                      console.error(
                        "Row update validation failed:",
                        error.message,
                      );

                      toast.error(error.message);
                    }}
                    components={{
                      Toolbar: EditToolbar,
                    }}
                    componentsProps={{
                      toolbar: { setRows, setRowModesModel },
                    }}
                    rowsPerPageOptions={[5, 10, 20]}
                    getRowClassName={(params) =>
                      params.indexRelativeToCurrentPage % 2 === 0
                        ? "odd-row"
                        : "even-row"
                    }
                    pagination
                    pageSize={pageSize}
                    page={page}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onPageChange={(newPage) => setPage(newPage)}
                  />
                </Box>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  padding={1}
                  gap="20px"
                >
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleSaveButtonClick}
                  >
                    Save
                  </Button>

                  <Button
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
        </Paper>
      ) : (
        false
      )}
    </Box>
  );
};

export default Editcompany;
