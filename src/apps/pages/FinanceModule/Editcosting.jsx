import React, { useCallback, useRef } from "react";
import {
  TextField,
  Box,
  Typography,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  MenuItem,
  InputLabel,
  Select,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import MatxCustomizer from "../Mailpdf";
import { mailOpen, getMail } from "../../../store/reducers/Listviewapireducer";
import EmailIcon from "@mui/icons-material/Email";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Formik, Field, useFormikContext } from "formik";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import Popup from "../popup";
import Listviewpopup from "../Lookup";
import {
  Link,
  useHref,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useState, useEffect } from "react";
import {
  postApidata,
  costingBOMData,
  getFetchData,
  postData,
  StockProcessApi,
  hashtoken,
  costLeatherData,
  resetTrackingData,
} from "../../../store/reducers/Formapireducer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import PrintIcon from "@mui/icons-material/Print";
import store from "../../..";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Swal from "sweetalert2";
import GetError from "../../../ui-components/Error";
const style = {
  height: "55px",
  borderBottom: "2px solid #1769aa ",
  backgroundColor: "#EDEDED",
  borderTop: "2px solid #EDEDED",
  borderRight: "2px solid #EDEDED",
  borderLeft: "2px solid #EDEDED",
  borderTopLeftRadius: "3px",
  borderTopRightRadius: "3px",
};
const Editcosting = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // *************** GET SESSION STORAGE DATA *************** //
  const yearData = sessionStorage.getItem("year");
  const yearFlag = sessionStorage.getItem("YearFlag");
  const Cifbysea = Number(sessionStorage.getItem("Cifbysea"));
  // console.log("🚀 ~ Editcosting ~ Cifbysea:", Cifbysea);
  const Cifbyair = Number(sessionStorage.getItem("Cifbyair"));
  // console.log("🚀 ~ Editcosting ~ Cifbyair:", Cifbyair);
  const Fob = Number(sessionStorage.getItem("Fob"));
  // console.log("🚀 ~ Editcosting ~ Fob:", Fob);
  const Overhead = Number(sessionStorage.getItem("Overhead"));
  // console.log("🚀 ~ Editcosting ~ Overhead:", Overhead);
  const labourCharge = Number(sessionStorage.getItem("labourCharge"));
  // console.log("🚀 ~ Editcosting ~ labourCharge:", labourCharge);
  const compID = sessionStorage.getItem("compID");
  const CompanyName = sessionStorage.getItem("company");
  // const Data = useSelector((state) => state.formApi.Data);
  // console.log("🚀 ~ file: Editcosting.jsx:71 ~ Editcosting ~ Data:", Data);
  const hashtokendata = useSelector((state) => state.formApi.hashtokenData);
  // console.log("🚀 ~ Editcosting ~ hashtokendata:", hashtokendata);
  const Finyear = sessionStorage.getItem("YearRecorid");
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const CompanyID = sessionStorage.getItem("compID");
  // *************** PAGE HOOK *************** //
  const {
    accessID,
    id,
    Mode,
    secondaryAccessID,
    productID,
    customerID,
    bomID,
    bomVersion,
    productDescription,
    FirstLeatherID,
  } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // *************** API INITIAL CALL *************** //

  // const { CustomerID, ProductID, BomID } = location.state;
  // console.log("🚀 ~ Editcosting ~ location.state:", location.state);
  const { toggleSidebar, broken, rtl } = useProSidebar();
  useEffect(() => {
    if(Mode == "A"){

      dispatch(resetTrackingData());
    }
    dispatch(getFetchData({ accessID: "TR091", get: "get", recID: id }));
    // dispatch(
    //   costingBOMData({
    //     HeaderRecordID: bomID,
    //     ProductRecordID: productID,
    //   })
    // );
    dispatch(
      hashtoken({
        hashtoken: {
          Indentdata: `compID=${compID}&PBBHID=${bomID}&CustomerID=${customerID}&ProductID=${productID}&LeatherID=${FirstLeatherID}`,
        },
      })
    );
    // setTimeout(() => {
    //   dispatch(
    //     hashtoken({
    //       hashtoken: {
    //         Indentdata: `compID=${compID}&PBBHID=${bomID}&CustomerID=${customerID}&ProductID=${productID}&LeatherID=${currencyLookup.curRecordID}`,
    //       },
    //     })
    //   );
    // }, 5000);

  }, [location.key]);
  const [loading, setLoading] = useState(false);
  // *************** REDUX STATES *************** //
  const data = useSelector((state) => state.formApi.Data);
  // console.log("🚀 ~ file: Editcosting.jsx:88 ~ Editcosting ~ data:", data);
  const status = useSelector((state) => state.formApi.Status);
  const msgs = useSelector((state) => state.formApi.msg);
  // const isLoading = useSelector((state) => state.formApi.getLoading);
  const leatherCost = useSelector((state) => state.formApi.costingLeatherCost);

  // *************** HEADER PAGE LOOKUP  *************** //
  const [isPopupData, setisPopupdata] = useState(false);
  var invoice;
  const mailData = useSelector((state) => state.listviewApi.mailData);
  const open = useSelector((state) => state.listviewApi.mailOpen);
  // CUSTOMER
  const [customerLookup, setCustomerLookup] = useState({
    cusRecordID: "",
    cusCode: "",
    cusName: "",
    cusCommision: "",
    cusProift: 0,
    cusConversion: 0,
    cusCurCode: "Customer Currency",
  });

  const [productLookup, setProductLookup] = useState({
    proRecordID: "",
    proCode: "",
    proName: "",
    productionPerDay: "",
  });

  // CURRENCY
  const [currencyLookup, setCurrencyLookup] = useState({
    curRecordID: "",
    curCode: "",
    curName: "",
    fixRate: "",
  });
  const [leather1Lookup, setleather1Lookup] = useState({
    leather1RecordID: "",
    leather1Code: "",
    leather1Name: "",
  });
  const [leather2Lookup, setleather2Lookup] = useState({
    leather2RecordID: "",
    leather2Code: "",
    leather2Name: "",
  });
  // BOM
  const [bomLookup, setBomLookup] = useState({
    bomRecordID: "",
    bomCode: "",
    bomName: "",
    bomCount: "",
  });

  const [openCusPopup, setOpenCusPopup] = useState(false);
  const [openProPopup, setOpenProPopup] = useState(false);
  const [openCurPopup, setOpenCurPopup] = useState(false);
  const [openBomPopup, setOpenBomPopup] = useState(false);
  const [openBomDetaPopup, setOpenBomDetaPopup] = useState(false);
  const [openleather1Popup, setOpenleather1Popup] = useState(false);
  const [openleather2Popup, setOpenleather2Popup] = useState(false);
  function openPopup(type) {
    if (type == "CUS") {
      setOpenCusPopup(true);
    }
    if (type == "BOMDET") {
      setOpenBomDetaPopup(true);
    }
    if (type == "PRO") {
      if (customerLookup.cusRecordID == "") {
        toast.error("Please select customer Lookup");
      } else setOpenProPopup(true);
    }
    if (type == "CUR") {
      setOpenCurPopup(true);
    }
    if (type == "LEATHER1") {
      setOpenleather1Popup(true);
    }
    if (type == "LEATHER2") {
      setOpenleather2Popup(true);
    }
    if (type == "BOM") {
      if (productLookup.proRecordID == "") {
        toast.error("Please select Product Lookup");
      } else setOpenBomPopup(true);
    }
  }

  const childToParent = async (childdata, type) => {
    console.log(
      "🚀 ~ file: Editcosting.jsx:187 ~ childToParent ~ childdata:",
      childdata
    );

    if (type == "Customer") {
      setisPopupdata(true);
      setCustomerLookup({
        cusRecordID: childdata.RecordID,
        cusCode: childdata.Code,
        cusName: childdata.Name,
        cusCurCode: childdata.CurrencyCode,
        cusConversion: Number(childdata.Conversion),
        cusCommision: childdata.Commision,
        cusProift: childdata.Profit,
      });
      setOpenCusPopup(false);
    }
    if (type == "Product") {
      setisPopupdata(true);
      setProductLookup({
        proRecordID: childdata.ProductRecordID,
        proCode: childdata.Code,

        proName: childdata.Name,
        productionPerDay: childdata.Productionperday,
      });
      setOpenProPopup(false);
    }
    if (type == "Leather") {
      setisPopupdata(true);
      setCurrencyLookup({
        curRecordID: childdata.RecordID,
        curCode: childdata.Code,
        curName: childdata.Name,
        fixRate: childdata.Fixrate,
      });

      await dispatch(
        costLeatherData({
          HeaderRecordID: bomLookup.bomRecordID,
          LeatherRecordID: childdata.RecordID,
          LeatherNumber: 1,
        })
      );

      setOpenCurPopup(false);
    }
    if (type == "Leather1") {
      setisPopupdata(true);
      setleather1Lookup({
        leather1RecordID: childdata.RecordID,
        leather1Code: childdata.Code,
        leather1Name: childdata.Name,
      });
      await dispatch(
        costLeatherData({
          HeaderRecordID: bomLookup.bomRecordID,
          LeatherRecordID: childdata.RecordID,
          LeatherNumber: 2,
        })
      );
      setOpenleather1Popup(false);
    }
    if (type == "Leather2") {
      setisPopupdata(true);
      setleather2Lookup({
        leather2RecordID: childdata.RecordID,
        leather2Code: childdata.Code,
        leather2Name: childdata.Name,
      });
      await dispatch(
        costLeatherData({
          HeaderRecordID: bomLookup.bomRecordID,
          LeatherRecordID: childdata.RecordID,
          LeatherNumber: 3,
        })
      );
      setOpenleather2Popup(false);
    }
    if (type == "BOM") {
      setisPopupdata(true);
      setBomLookup({
        bomRecordID: childdata.RecordID,
        bomCode: childdata.Code,
        bomName: childdata.Name,
        bomCount: childdata.Count,
      });
      await dispatch(
        costingBOMData({
          HeaderRecordID: childdata.RecordID,
          ProductRecordID: productLookup.proRecordID,
        })
      );

      setOpenBomPopup(false);
    }
  };

  if (isPopupData === false) {
    // CUSTOMER
    customerLookup.cusCode = data.CustomerCode;
    customerLookup.cusName = data.CustomerName;
    customerLookup.cusRecordID = data.CustomerID;
    customerLookup.cusCommision = Number(data.Commision);
    customerLookup.cusProift = Number(data.Profit);
    customerLookup.cusConversion = Number(data.Conversion);
    customerLookup.cusCurCode = data.ConversionCode || "Customer currency";

    // PRODUCTS
    productLookup.productionPerDay = data.ProductionPerDay || 0;
    productLookup.proCode = data.ProductCode;
    productLookup.proName = data.ProductDescription;
    productLookup.proRecordID = data.ProductID;

    // BOM
    bomLookup.bomCode = data.BomCode;
    bomLookup.bomName = data.BomName;
    bomLookup.bomRecordID = data.BomID;
    bomLookup.bomCount = data.LeatherCount;

    //  Leather

    currencyLookup.curCode = data.LeatherCode;
    currencyLookup.curName = data.LeatherDescription;
    currencyLookup.curRecordID = data.LeatherID;
    currencyLookup.fixRate = data.fixRate;
    //Leather1
    leather1Lookup.leather1Code = data.SecondLeatherCode;
    leather1Lookup.leather1Name = data.SeondLeatherDescription;
    leather1Lookup.leather1RecordID = data.SecondLeatherID;
    // Leather2
    leather2Lookup.leather2Code = data.ThirdLeatherCode;
    leather2Lookup.leather2Name = data.ThirdLeatherDescription;
    leather2Lookup.leather2RecordID = data.ThirdLeatherID;
  }

  // *************** HEADER PAGE INITIAL VALUE *************** //
  const costingInitialvalue = {
    production: productLookup.productionPerDay,
    profitPercentage: customerLookup.cusProift,
    profit: Number(data.Profitamount).toFixed(2),
    commisionPercentage: customerLookup.cusCommision,
    commision: data.Commisionamount,
    // bom: Number(costval || 0) + leatherCost,
    bom: isPopupData
      ? (
          Number(leatherCost.materialCost) +
          Number(leatherCost.leatherOneCost) +
          Number(leatherCost.leatherTwoCost) +
          Number(leatherCost.leatherThreeCost)
        ).toFixed(2)
      : Number(data.Sum).toFixed(2),
    latestbom: isPopupData
      ? (
          Number(leatherCost.latestmaterialCost) +
          Number(leatherCost.latestleatherOneCost) +
          Number(leatherCost.latestleatherTwoCost) +
          Number(leatherCost.latestleatherThreeCost)
        ).toFixed(2)
      : Number(data.latestsum).toFixed(2),
    frieght: Mode === "A" ? "E" : data.Transport,
    total: data.Total,
    frieghtOptionPercentage: data.Transportpercentage,
    frieghtOption: data.Transportamount,
    frieghtOption2: data.Transportamount,
    labourCharge: data.Labourcharges,
    overHead: data.Overhead || 0,
    netTotalINR: data.NettotalINR,
    netToatalCusCurrency: data.Nettotalcurrency,
    frieghtOptionCombo: Mode === "A" ? "E" : data.Transport,
    roundFraction: Number(data.Roundoffraction),
    Dss: Number(data.Dss),
    netTotalCUSCurrency: Number(data.Roundoftotal),
    costadjustment: Number(data.ProductCostAdjustment),
  };

  const overHaedChange = (values) => {
    // console.log("🚀 ~ overHaedChange ~ values:", values)
    values.labourCharge =
      isPopupData !== false
        ? Number(labourCharge / (values.production || 1)).toFixed(2)
        : Number(labourCharge / (values.production || 1)).toFixed(2);
  };
  const profitChange = (values) => {
    values.profit =
      (
        Number(values.labourCharge) +
        Number(values.bom) +
        Number(values.Dss) +
        (Number(values.labourCharge) +
          Number(values.bom) +
          Number(values.Dss)) *
          (Number(Overhead) / 100)
      ).toFixed(2) *
        (Number(values.profitPercentage) / 100) +
      Number(
        (
          Number(values.labourCharge) +
          Number(values.bom) +
          Number(values.Dss) +
          (Number(values.labourCharge) +
            Number(values.bom) +
            Number(values.Dss)) *
            (Number(Overhead) / 100)
        ).toFixed(2)
      );
    values.profit2 =
      (
        Number(values.labourCharge) +
        Number(values.bom) +
        Number(values.Dss) +
        (Number(values.labourCharge) +
          Number(values.bom) +
          Number(values.Dss)) *
          (Number(Overhead) / 100)
      ).toFixed(2) *
        (Number(values.profitPercentage) / 100) +
      Number(
        (
          Number(values.labourCharge) +
          Number(values.latestbom) +
          Number(values.Dss) +
          (Number(values.labourCharge) +
            Number(values.latestbom) +
            Number(values.Dss)) *
            (Number(Overhead) / 100)
        ).toFixed(2)
      );
  };

  const frieghtOptinChange = ({ values }) => {
    // console.log("🚀 ~ frieghtOptinChange ~ values:", values)
    var total = values.profit;
    switch (values.frieghtOptionCombo) {
      case "F":
        isPopupData !== false
          ? (values.frieghtOptionPercentage = Fob)
          : (values.frieghtOptionPercentage = data.Fob);

        break;
      case "C":
        isPopupData !== false
          ? (values.frieghtOptionPercentage = Cifbysea)
          : (values.frieghtOptionPercentage = data.Cifbysea);
        break;
      case "A":
        isPopupData !== false
          ? (values.frieghtOptionPercentage = Cifbyair)
          : (values.frieghtOptionPercentage = data.Cifbyair);
        break;
      default:
        values.netTotalINR = (Number(total) + Number(values.commision)).toFixed(
          2
        );
        values.netTotalINR2 = (
          Number(values.profit2) + Number(values.commision2)
        ).toFixed(2);
    }
    commisionChange(values);
  };

  const frieghtChange = (values) => {
    var total = values.profit;
    switch (values.frieghtOptionCombo) {
      case "E":
        values.frieghtOption = values.profit;
        values.frieghtOption2 = values.profit2;
        break;
      default:
        values.frieghtOption = Number(
          values.profit * (Number(values.frieghtOptionPercentage) / 100) +
            values.profit
        ).toFixed(2);
        values.frieghtOption2 = Number(
          values.profit2 * (Number(values.frieghtOptionPercentage) / 100) +
            values.profit2
        ).toFixed(2);
        // console.log("🚀 ~ frieghtChange ~ values.frieghtOption2:", values.frieghtOption2)

        values.netTotalINR = (
          Number(values.frieghtOption) + Number(values.commision)
        ).toFixed(2);
        values.netTotalINR2 = (
          Number(values.frieghtOption2) + Number(values.commision2)
        ).toFixed(2);
      // console.log("🚀 ~ frieghtChange ~ values.netTotalINR2 :", values.netTotalINR2 )
    }
  };

  const commisionChange = (values) => {
    // console.log("🚀 ~ commisionChange ~ values:", values)

    var total =
      values.frieghtOptionCombo == "E"
        ? Number(values.profit)
        : Number(values.frieghtOption);
    var total2 =
      values.frieghtOptionCombo == "E"
        ? Number(values.profit2)
        : Number(values.frieghtOption2);
    var diffPercentage = Number((100 - values.commisionPercentage).toFixed(2));

    var onePecentageOfTotal = Number((total / diffPercentage).toFixed(2));
    var onePecentageOfTotal2 = Number((total2 / diffPercentage).toFixed(2));
    values.total = Number((onePecentageOfTotal.toFixed(2) * 100).toFixed(2));
    values.total2 = Number((onePecentageOfTotal2.toFixed(2) * 100).toFixed(2));
    values.commision = (
      (Number(values.total) * values.commisionPercentage) /
      100
    ).toFixed(2);
    values.commision2 = ((Number(values.total2) * values.commisionPercentage) /100).toFixed(2);
      console.log("🚀 ~ commisionChange ~  values.commision2:",  values.commision2)
      console.log("🚀 ~ commisionChange ~ values.commisionPercentage:", values.commisionPercentage)
      console.log("🚀 ~ commisionChange ~ Number(values.total2):", Number(values.total2))

    // frieghtOptinChange({
    //   frieght: values.frieght,
    //   values: values,
    // });
  };
  const CurrencyExchange = (values) => {
    values.netToatalCusCurrency = Number(
      values.netTotalINR * (1/Number(customerLookup.cusConversion))
    ).toFixed(2);
    values.netToatalCusCurrency2 = Number(
      values.netTotalINR2 * (1/Number(customerLookup.cusConversion))
    ).toFixed(2);
  };

  const fnSave = async (values) => {
    if (data.Process == "Y") {
      toast.error("Your data Already Processed edit not Applicable");
      return;
    }
    setLoading(true);
    let action = Mode == "A" ? "insert" : "update";
    let idata = {
      RecordID: id,
      CustomerID: customerLookup.cusRecordID,
      ProductID: productLookup.proRecordID,
      BomID: bomLookup.bomRecordID,
      ProductionPerDay: values.production,
      Profit: values.profitPercentage,
      Commision: values.commisionPercentage,
      Cifbysea: Cifbysea,
      Cifbyair: Cifbyair,
      Fob: Fob,
      Overhead: Overhead,
      Total: values.total,
      Transportpercentage: values.frieghtOptionPercentage,
      Transportamount: values.frieghtOption,
      Profitamount: values.profit,
      Commisionamount: values.commision,
      NettotalINR: values.netTotalINR,
      Nettotalcurrency: values.netToatalCusCurrency,
      Sum: values.bom,
      latestsum: values.latestbom,
      Transport: values.frieghtOptionCombo,
      LeatherID: currencyLookup.curRecordID,
      SecondLeatherID: leather1Lookup.leather1RecordID,
      ThirdLeatherID: leather2Lookup.leather2RecordID,
      Roundoffraction: values.roundFraction,
      Labourcharges: (
        Number(values.labourCharge) +
        Number(values.labourCharge) * (Number(Overhead) / 100)
      ).toFixed(2),
      Dss: values.Dss,
      Roundoftotal: Number(
        Number(values.netToatalCusCurrency) +
          Number(values.Dss) +
          Number(values.roundFraction)
      ).toFixed(2),
      Finyear,
      CompanyID,
      ProductCostAdjustment: values.costadjustment,
      ProductCostAdjustment: 0,
      LeatherCount: bomLookup.bomCount,
      BomFlag: bomLookup.bomCount == "0" ? "Y" : "N",
    };
    const response = await dispatch(
      postData({ accessID: "TR091", action, idata })
    );
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      setLoading(false);
      // navigate(`/Apps/TR091/Costing`) /Apps/Secondarylistview/TR141/Costing/3414/NAME%20TAG/256/costing-product/1/3525/TR091;
      secondaryAccessID
        ? navigate(
            `/Apps/Secondarylistview/TR141/Costing/${productID}/${productDescription}/${customerID}/costing-product/${bomVersion}/${bomID}/${secondaryAccessID}`
          )
        : navigate("/Apps/TR140/Customer-Product");
    } else {
      toast.error(response.payload.Msg);
      setLoading(false);
    }
  };
  // const fnCancel = async (values) => {
  //   // if (data.Process == "Y") {
  //   //   toast.error("Your data Already Processed edit not Applicable");
  //   //   return;
  //   // }
  //   setLoading(true);
    
  //   let idata = {
  //     RecordID: id,
  //     CustomerID: customerLookup.cusRecordID,
  //     ProductID: productLookup.proRecordID,
  //     BomID: bomLookup.bomRecordID,
  //     ProductionPerDay: 0,
  //     Profit: 0,
  //     Commision: 0,
  //     Cifbysea: Cifbysea,
  //     Cifbyair: Cifbyair,
  //     Fob: Fob,
  //     Overhead: Overhead,
  //     Total: values.total,
  //     Transportpercentage: values.frieghtOptionPercentage,
  //     Transportamount: values.frieghtOption,
  //     Profitamount: 0,
  //     Commisionamount:0,
  //     NettotalINR:0,
  //     Nettotalcurrency: values.netToatalCusCurrency,
  //     Sum: 0,
  //     latestsum: values.latestbom,
  //     Transport: values.frieghtOptionCombo,
  //     LeatherID: currencyLookup.curRecordID,
  //     SecondLeatherID: leather1Lookup.leather1RecordID,
  //     ThirdLeatherID: leather2Lookup.leather2RecordID,
  //     Roundoffraction:0,
  //     Labourcharges:0,
  //     Dss: 0,
  //     Roundoftotal: Number(
  //       Number(values.netToatalCusCurrency) +
  //         Number(values.Dss) +
  //         Number(values.roundFraction)
  //     ).toFixed(2),
  //     Finyear,
  //     CompanyID,
  //     ProductCostAdjustment: values.costadjustment,
  //     ProductCostAdjustment: 0,
  //     LeatherCount: bomLookup.bomCount,
  //     BomFlag: bomLookup.bomCount == "0" ? "Y" : "N",
  //   };
  //   const response = await dispatch(
  //     postData({ accessID: "TR091", idata })
  //   );
  //   // if (response.payload.Status == "Y") {
  //   //   toast.success(response.payload.Msg);
  //   //   setLoading(false);
  //     // navigate(`/Apps/TR091/Costing`) /Apps/Secondarylistview/TR141/Costing/3414/NAME%20TAG/256/costing-product/1/3525/TR091;
  //     secondaryAccessID
  //       ? navigate(
  //           `/Apps/Secondarylistview/TR141/Costing/${productID}/${productDescription}/${customerID}/costing-product/${bomVersion}/${bomID}/${secondaryAccessID}`
  //         )
  //       : navigate("/Apps/TR140/Customer-Product");
  //   // } else {
  //   //   toast.error(response.payload.Msg);
  //   //   setLoading(false);
  //   // }
  // };
  const fnProcess = async () => {
    const props = { accessID, recID: id };
    const Data = await dispatch(StockProcessApi(props));
    if (Data.payload.Status == "Y") {
      toast.success(Data.payload.Msg);
      secondaryAccessID
        ? navigate(
            `/Apps/Secondarylistview/TR141/Costing/${productID}/${productDescription}/${customerID}/costing-product/${bomVersion}/${bomID}/${secondaryAccessID}`
          )
        : navigate("/Apps/TR140/Customer-Product");
    } else {
      toast.success(Data.payload.Msg);
    }
  };
  const bomPrint = () => {
    if (bomLookup.bomRecordID) {
      window.open(
        `${
          store.getState().globalurl.pdfurl
        }BOMCOST.php?Token=${hashtokendata}`,
        "_blank"
      );
    } else {
      toast.error("Please Select BOM Lookup");
    }
  };

  const fnLogOut = (props) => {
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
          secondaryAccessID
            ? navigate(
                `/Apps/Secondarylistview/TR141/Costing/${productID}/${productDescription}/${customerID}/costing-product/${bomVersion}/${bomID}/${secondaryAccessID}`
              )
            : navigate("/Apps/TR140/Customer-Product");
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
          <Typography variant="h3">Costing</Typography>
        </Box>
        <Box display="flex">
          <IconButton color="error" onClick={() => fnLogOut("Close")}>
            <ResetTvIcon />
          </IconButton>
          <IconButton>
            <LogoutOutlinedIcon
              color="error"
              onClick={() => fnLogOut("Logout")}
            />
          </IconButton>
        </Box>
      </Box>

      {!getLoading && data ? (
        <Box m="20px">
          <Formik
            initialValues={costingInitialvalue}
            onSubmit={(values, { resetForm }) => {
              setTimeout(() => {
                fnSave(values, resetForm);
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
                      alignItems: "center",
                      gridColumn: "span 2",
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Customer"
                      variant="filled"
                      focused
                      inputProps={{ tabIndex: "-1" }}
                      value={customerLookup.cusCode}
                    />
                    <IconButton
                      onClick={() => openPopup("CUS")}
                      sx={{ height: 40, width: 40 }}
                    >
                      <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                    </IconButton>
                    <TextField
                      id="outlined-basic"
                      variant="filled"
                      fullWidth
                      inputProps={{ tabIndex: "-1" }}
                      value={customerLookup.cusName}
                      focused
                    />
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
                      id="outlined-basic"
                      label="Product"
                      variant="filled"
                      focused
                      inputProps={{ tabIndex: "-1" }}
                      value={productLookup.proCode}
                    />
                    <IconButton
                      onClick={() => openPopup("PRO")}
                      sx={{ height: 40, width: 40 }}
                    >
                      <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                    </IconButton>
                    <TextField
                      value={productLookup.proName}
                      id="outlined-basic"
                      variant="filled"
                      fullWidth
                      inputProps={{ tabIndex: "-1" }}
                      focused
                    />
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
                      id="outlined-basic"
                      label="BOM"
                      variant="filled"
                      focused
                      inputProps={{ tabIndex: "-1" }}
                      value={bomLookup.bomCode}
                    />
                    <IconButton
                      onClick={() => openPopup("BOM")}
                      sx={{ height: 40, width: 40 }}
                    >
                      <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                    </IconButton>
                    <TextField
                      id="outlined-basic"
                      variant="filled"
                      fullWidth
                      inputProps={{ tabIndex: "-1" }}
                      focused
                      value={bomLookup.bomName}
                    />
                    {data.Process == "Y" ? (
                      <IconButton onClick={bomPrint}>
                        <PrintIcon />
                      </IconButton>
                    ) : null}
                    {data.Process == "Y" ? (
                      <IconButton
                        color="info"
                        size="small"
                        onClick={() => {
                          dispatch(
                            mailOpen({
                              row: { RecordID: id },
                              link: `${
                                store.getState().globalurl.pdfurl
                              }BOMCOST.php?Token=${hashtokendata.Hashtoken}`,
                            })
                          );
                          dispatch(
                            getMail({
                              Templateid: "ET_009",
                              RecordID: id,
                              UserName: "Trinity",
                            })
                          );
                        }}
                      >
                        <EmailIcon />
                      </IconButton>
                    ) : null}
                    <IconButton
                      onClick={() => openPopup("BOMDET")}
                      sx={{ height: 40, width: 40 }}
                    >
                      <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                    </IconButton>
                  </Box>
                  <MatxCustomizer
                    open={open}
                    screenName={invoice}
                    rowData={mailData}
                    type={""}
                  />
                  <FormControl
                    fullWidth
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gridColumn: "span 2",
                      gap: "20px",
                      //  mt: "10px",
                    }}
                  >
                    {bomLookup.bomCount == "1" ||
                    bomLookup.bomCount == "2" ||
                    bomLookup.bomCount == "3" ? (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <TextField
                          title={currencyLookup.curName}
                          id="outlined-basic"
                          label="Primary Leather"
                          variant="filled"
                          focused
                          inputProps={{ tabIndex: "-1" }}
                          value={currencyLookup.curCode}
                          fullWidth
                        />
                        <IconButton
                          onClick={() => openPopup("CUR")}
                          sx={{ height: 40, width: 40 }}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>
                      </Box>
                    ) : (
                      false
                    )}
                    {bomLookup.bomCount == "2" || bomLookup.bomCount == "3" ? (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gridColumn: "span 2",
                        }}
                      >
                        <TextField
                          title={leather1Lookup.leather1Name}
                          id="outlined-basic"
                          label="Secondary Leather"
                          variant="filled"
                          focused
                          inputProps={{ tabIndex: "-1" }}
                          value={leather1Lookup.leather1Code}
                        />
                        <IconButton
                          onClick={() => openPopup("LEATHER1")}
                          sx={{ height: 40, width: 40 }}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>
                      </Box>
                    ) : (
                      false
                    )}
                    {bomLookup.bomCount == "3" ? (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gridColumn: "span 2",
                        }}
                      >
                        <TextField
                          title={leather2Lookup.leather2Name}
                          id="outlined-basic"
                          label="Tertiary Leather "
                          variant="filled"
                          focused
                          inputProps={{ tabIndex: "-1" }}
                          value={leather2Lookup.leather2Code}
                        />
                        <IconButton
                          onClick={() => openPopup("LEATHER2")}
                          sx={{ height: 40, width: 40 }}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>
                      </Box>
                    ) : (
                      false
                    )}
                  </FormControl>
                  <TextField
                    name="production"
                    id="production"
                    value={values.production}
                    onChange={overHaedChange(values)}
                    type="text"
                    label="Production/Day"
                    variant="filled"
                    focused
                    inputProps={{ readOnly: true }}
                    sx={{
                      gridColumn: "span 2",
                      input: { textAlign: "right" },
                      background: "#fff6c3",
                    }}
                  />
                  <TextField
                    name="bom"
                    id="bom"
                    value={values.bom}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{ readOnly: true }}
                    label="BOM(Sum Of Materials Cost)"
                    variant="filled"
                    sx={{
                      gridColumn: "span 2",
                      input: { textAlign: "right" },
                      background: "#fff6c3",
                    }}
                    focused
                  />
                  <TextField
                    name="Dss"
                    id="Dss"
                    value={values.Dss}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="number"
                    label="DSS (Dyes And Tools)"
                    variant="filled"
                    focused
                    sx={{
                      gridColumn: "span 4",
                      input: { textAlign: "right" },
                      background: "#fff6c3",
                    }}
                  />
                  <TextField
                    name="labourCharge"
                    id="labourCharge"
                    value={values.labourCharge}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    label="Labour Charges"
                    variant="filled"
                    focused
                    inputProps={{ readOnly: true }}
                    sx={{
                      gridColumn: "span 2",
                      input: { textAlign: "right" },
                      background: "#fff6c3",
                    }}
                  />
                  <TextField
                    name="overHead"
                    id="overHead"
                    value={(
                      Number(values.labourCharge) +
                      Number(values.bom) +
                      Number(values.Dss) +
                      (Number(values.labourCharge) +
                        Number(values.bom) +
                        Number(values.Dss)) *
                        (Number(Overhead) / 100)
                    ).toFixed(2)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    label={`Over Head (${Overhead}%)`}
                    variant="filled"
                    focused
                    inputProps={{ readOnly: true }}
                    sx={{
                      gridColumn: "span 2",
                      input: { textAlign: "right" },
                      background: "#fff6c3",
                    }}
                  />
                  <FormControl
                    sx={{
                      gridColumn: "span 2",
                    }}
                    onChange={profitChange(values)}
                  >
                    <TextField
                      name="profitPercentage"
                      id="profitPercentage"
                      value={values.profitPercentage}
                      // inputProps={{ readOnly: true }}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      label="Profit (%)"
                      variant="filled"
                      sx={{
                        gridColumn: "span 2",
                        input: { textAlign: "right" },
                        background: "#fff6c3",
                      }}
                      focused
                    />
                  </FormControl>

                  <TextField
                    name="profit"
                    id="profit"
                    value={Number(values.profit).toFixed(2)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    label="Profit (INR)"
                    variant="filled"
                    focused
                    inputProps={{ readOnly: true }}
                    sx={{
                      gridColumn: "span 2",
                      input: { textAlign: "right" },
                      background: "#fff6c3",
                    }}
                  />

                  {/* <TextField
                  name="total"
                  id="total"
                  value={values.total}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{ readOnly: true }}
                  label="Total (INR)"
                  sx={{ gridColumn: "span 4" }}
                  variant="filled"
                  focused
                /> */}

                  {/* <FormControl
                  onChange={frieghtOptinChange({
                    frieght: values.frieght,
                    values: values,
                  })}
                  sx={{ gridColumn: "span 4" }}
                >
                  <FormLabel>Frieght</FormLabel>
                  <Field
                    as="select"
                    id="frieghtOptionCombo"
                    label="Type"
                    name="frieghtOptionCombo"
                    // onChange={(e) => {
                    //   setFrieghtOption(e.target.value)

                    // }}
                    value={values.frieghtOptionCombo}
                    style={style}
                  >
                    <option value="E">Ex-Factory</option>
                    <option value="F">FOB</option>
                    <option value="C">CIF by Sea</option>
                    <option value="A">CIF by Air</option>
                  </Field>
                </FormControl> */}
                  <FormControl
                    focused
                    variant="filled"
                    onChange={frieghtOptinChange({
                      frieght: values.frieght,
                      values: values,
                    })}
                    sx={{ gridColumn: "span 4" }}
                  >
                    <InputLabel id="productType">Frieght</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="frieghtOptionCombo"
                      name="frieghtOptionCombo"
                      value={values.frieghtOptionCombo}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <MenuItem value="E">Ex-Factory</MenuItem>
                      <MenuItem value="F">FOB</MenuItem>
                      <MenuItem value="C">CIF by Sea</MenuItem>
                      <MenuItem value="A">CIF by Air</MenuItem>
                    </Select>
                  </FormControl>

                  {values.frieghtOptionCombo !== "E" ? (
                    <React.Fragment>
                      <TextField
                        name="frieghtOptionPercentage"
                        id="frieghtOptionPercentage"
                        value={values.frieghtOptionPercentage}
                        onBlur={handleBlur}
                        onChange={frieghtChange(values)}
                        label={"Freight Percentage"}
                        variant="filled"
                        sx={{
                          gridColumn: "span 2",
                          input: { textAlign: "right" },
                          background: "#fff6c3",
                        }}
                        focused
                        inputProps={{ readOnly: true }}
                      />

                      <TextField
                        name="frieghtOption"
                        id="frieghtOption"
                        value={values.frieghtOption}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        label={"Freight Rate"}
                        variant="filled"
                        inputProps={{ readOnly: true }}
                        sx={{
                          gridColumn: "span 2",
                          input: { textAlign: "right" },
                          background: "#fff6c3",
                        }}
                        focused
                      />
                    </React.Fragment>
                  ) : null}
                  <FormControl sx={{ gridColumn: "span 2",}} onChange={commisionChange(values)}>
                  <TextField
                    name="commisionPercentage"
                    id="commisionPercentage"
                    value={values.commisionPercentage}
                   
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    label="Commision (%)"
                    sx={{
                     
                      input: { textAlign: "right" },
                      background: "#fff6c3",
                    }}
                    // inputProps={{ readOnly: true }}
                    variant="filled"
                    focused
                  />
                  </FormControl>
                  
                  <TextField
                    name="commision"
                    id="commision"
                    value={values.commision}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    label="Commision"
                    variant="filled"
                    focused
                    inputProps={{ readOnly: true }}
                    sx={{
                      gridColumn: "span 2",
                      input: { textAlign: "right" },
                      background: "#fff6c3",
                    }}
                  />

                  {/* <TextField
                    name="netTotalINR"
                    id="netTotalINR"
                    value={values.netTotalINR}
                    onChange={CurrencyExchange(values)}
                    label={`${
                      values.frieghtOptionCombo === "F"
                        ? "FOB"
                        : values.frieghtOptionCombo === "C"
                        ? "CIF by Sea"
                        : values.frieghtOptionCombo === "A"
                        ? "CIF by Air"
                        : ""
                    } Net Total(INR)`}
                    variant="filled"
                    sx={{
                      gridColumn: "span 2",
                      input: { textAlign: "right" },
                      background: "#fff6c3",
                    }}
                    focused
                    inputProps={{ readOnly: true }}
                  /> */}

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "10px",
                      gridColumn: "span 2",
                    }}
                  >
                    <TextField
                      fullWidth
                      name="netTotalINR"
                      id="netTotalINR"
                      value={values.netTotalINR}
                      onChange={CurrencyExchange(values)}
                      label={`${
                        values.frieghtOptionCombo === "F"
                          ? "FOB"
                          : values.frieghtOptionCombo === "C"
                          ? "CIF by Sea"
                          : values.frieghtOptionCombo === "A"
                          ? "CIF by Air"
                          : ""
                      } Net Total(INR)`}
                      variant="filled"
                      sx={{
                        gridColumn: "span 2",
                        input: { textAlign: "right" },
                        background: "#fff6c3",
                      }}
                      focused
                      inputProps={{ readOnly: true }}
                    />
                    <TextField
                      name="netTotalINR2"
                      id="netTotalINR2"
                      value={values.netTotalINR2}
                      onChange={CurrencyExchange(values)}
                      label={`${
                        values.frieghtOptionCombo === "F"
                          ? "FOB"
                          : values.frieghtOptionCombo === "C"
                          ? "CIF by Sea"
                          : values.frieghtOptionCombo === "A"
                          ? "CIF by Air"
                          : ""
                      } Net Total(INR) -Latest Rate`}
                      variant="filled"
                      sx={{
                        gridColumn: "span 2",
                        input: { textAlign: "right" },
                        background: "#fff6c3",
                      }}
                      focused
                      fullWidth
                      inputProps={{ readOnly: true }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "10px",
                      gridColumn: "span 2",
                    }}
                  >
                    <TextField
                      name="netToatalCusCurrency"
                      id="netToatalCusCurrency"
                      value={values.netToatalCusCurrency}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      label={`${
                        values.frieghtOptionCombo === "F"
                          ? "FOB"
                          : values.frieghtOptionCombo === "C"
                          ? "CIF by Sea"
                          : values.frieghtOptionCombo === "A"
                          ? "CIF by Air"
                          : ""
                      } Gross Total(${customerLookup.cusCurCode})`}
                      variant="filled"
                      focused
                      inputProps={{ readOnly: true }}
                      sx={{
                        gridColumn: "span 2",
                        input: { textAlign: "right" },
                        background: "#fff6c3",
                      }}
                      fullWidth
                    />
                    <TextField
                      fullWidth
                      name="netToatalCusCurrency2"
                      id="netToatalCusCurrency2"
                      value={values.netToatalCusCurrency2}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      label={`${
                        values.frieghtOptionCombo === "F"
                          ? "FOB"
                          : values.frieghtOptionCombo === "C"
                          ? "CIF by Sea"
                          : values.frieghtOptionCombo === "A"
                          ? "CIF by Air"
                          : ""
                      } Gross Total(${customerLookup.cusCurCode}) -Latest Rate`}
                      variant="filled"
                      focused
                      inputProps={{ readOnly: true }}
                      sx={{
                        gridColumn: "span 2",
                        input: { textAlign: "right" },
                        background: "#fff6c3",
                      }}
                    />
                  </Box>

                  <TextField
                    name="roundFraction"
                    id="roundFraction"
                    value={Number(values.roundFraction).toFixed(2)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="number"
                    label={"Round of Fraction"}
                    variant="filled"
                    focused
                    sx={{
                      gridColumn: "span 2",
                      input: { textAlign: "right" },
                      background: "#fff6c3",
                    }}
                  />
                  <Tooltip arrow title={`Actual Rate ${customerLookup.cusConversion}`}>

                 
                  <TextField
                    name="netTotalCUSCurrency"
                    id="netTotalCUSCurrency"
                    // value={
                    //   Number((
                    //     Number(values.netToatalCusCurrency) +((Number(values.costadjustment) / 100)*values.netToatalCusCurrency)) +
                    //  Number(values.roundFraction)).toFixed(2)
                    // }
                    value={Number(
                      Number(values.netToatalCusCurrency) +
                        Number(values.roundFraction)
                    ).toFixed(2)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="number"
                    label={`${
                      values.frieghtOptionCombo === "F"
                        ? "FOB"
                        : values.frieghtOptionCombo === "C"
                        ? "CIF by Sea"
                        : values.frieghtOptionCombo === "A"
                        ? "CIF by Air"
                        : ""
                    } Net Total(${customerLookup.cusCurCode})  `}
                    variant="filled"
                    focused
                    inputProps={{ readOnly: true }}
                    sx={{
                      gridColumn: "span 2",
                      input: { textAlign: "right" },
                      background: "#fff6c3",
                    }}
                  />
                   </Tooltip>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                  {data.Process != "Y" ? (
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={fnProcess}
                    >
                      Process
                    </Button>
                  ) : null}
                  <Button type="submit" variant="contained" color="secondary">
                    SAVE
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      secondaryAccessID
                        ? navigate(
                            `/Apps/Secondarylistview/TR141/Costing/${productID}/${productDescription}/${customerID}/costing-product/${bomVersion}/${bomID}/${secondaryAccessID}`
                          )
                        : navigate("/Apps/TR140/Customer-Product");
                    }}
                  >
                    CANCEL
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          <Popup
            title="Customer"
            openPopup={openCusPopup}
            setOpenPopup={setOpenCusPopup}
          >
            <Listviewpopup
              accessID="2009"
              screenName="Customer"
              childToParent={childToParent}
              filterName={"compID"}
              filterValue={CompanyID}
            />
          </Popup>
          <Popup
            title="Product"
            openPopup={openProPopup}
            setOpenPopup={setOpenProPopup}
          >
            <Listviewpopup
              accessID="2027"
              screenName="Product"
              childToParent={childToParent}
              filterValue={customerLookup.cusRecordID}
              filterName="parentID"
            />
          </Popup>
          <Popup
            title="Leather"
            openPopup={openCurPopup}
            setOpenPopup={setOpenCurPopup}
          >
            <Listviewpopup
              accessID="2038"
              screenName="Leather"
              childToParent={childToParent}
            />
          </Popup>
          <Popup
            title="Leather1"
            openPopup={openleather1Popup}
            setOpenPopup={setOpenleather1Popup}
          >
            <Listviewpopup
              accessID="2038"
              screenName="Leather1"
              childToParent={childToParent}
            />
          </Popup>
          <Popup
            title="Leather2"
            openPopup={openleather2Popup}
            setOpenPopup={setOpenleather2Popup}
          >
            <Listviewpopup
              accessID="2038"
              screenName="Leather2"
              childToParent={childToParent}
            />
          </Popup>
          <Popup
            title="BOM"
            openPopup={openBomPopup}
            setOpenPopup={setOpenBomPopup}
          >
            <Listviewpopup
              accessID="2019"
              screenName="BOM"
              childToParent={childToParent}
              filterValue={productLookup.proRecordID}
              filterName="parentID"
            />
          </Popup>
          <Popup
            title="BOM Details"
            openPopup={openBomDetaPopup}
            setOpenPopup={setOpenBomDetaPopup}
          >
            <Listviewpopup
              accessID="2071"
              screenName="BOM Details"
              childToParent={childToParent}
              filterValue={bomLookup.bomRecordID}
              filterName="parentID"
            />
          </Popup>
        </Box>
      ) : !getLoading && Mode == "E" && !data ? (
        <GetError />
      ) : (
        false
      )}
    </React.Fragment>
  );
};

export default Editcosting;
