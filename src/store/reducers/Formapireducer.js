import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import store from "../../index";
import toast from "react-hot-toast";

const initialState = {
  Data: {},
  Status: "",
  msg: "",
  loading: false,
  getLoading: false,
  expgetLoading: false,
  error: "",
  Successflag: false,
  stockValue: {},
  stockReqData: {},
  inviceEData: {},
  postLoading: false,
  conversionData: {},
  userGroup: [],
  materialStockData:{},
  exploreData:{},
  trackingData:[],
  customerData:{},
  productanalysisData:{},
  pakingListCarton:[],
  summeryData:[],
  hashtokenData:{},
  costingLeatherCost:{
  materialCost:0,
  leatherOneCost:0,
  leatherTwoCost:0,
  leatherThreeCost:0,
  latestmaterialCost:0,
  latestleatherOneCost:0,
  latestleatherTwoCost:0,
  latestleatherThreeCost:0,
  },
customerLeatherData:{},
summaryData:{},
deploymentData:{},
trackingLoading:false,
materialTrackingData:{
  Rateseries:{},
                Qtyseries:{},
                Amountseries:{},
                categories:[],
                TableData:{data:[]},
},
stockorderData:{},
matrialDcTrackData:[],
purchaseorderratingData:[],
searchLoading:false,
empAttendanceData:{},
AttendanceData:{},
};

export const empAttendance = createAsyncThunk(
  "employee/Payrollattendance",
  async ({ data }) => {
    var url = store.getState().globalurl.employeeattendanceUrl;
   
    console.log("get" + JSON.stringify(data));
    console.log("🚀 ~ file: Formapireducer.js:26 ~ data:", data);
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    return response.data;
  }
);
export const CustomerpriceorderQty= createAsyncThunk(
  "products/Customerprice",
  async ({ data }) => {
    var url = store.getState().globalurl.CustomerPriceorderQtyUrl;
   
    console.log("get" + JSON.stringify(data));
    console.log("🚀 ~ file: Formapireducer.js:26 ~ data:", data);
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    return response.data;
  }
);
export const Attendance = createAsyncThunk(
  "employee/attendance",
  async ({ data }) => {
    var url = store.getState().globalurl.attendanceUrl;
   
    console.log("get" + JSON.stringify(data));
    console.log("🚀 ~ file: Formapireducer.js:26 ~ data:", data);
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    return response.data;
  }
);
export const costingBOMData = createAsyncThunk(
  "BOM/costing",
  async ({ HeaderRecordID, ProductRecordID }) => {
    var url = store.getState().globalurl.costingMatrialUrl;
    var data = {
      HeaderRecordID: HeaderRecordID,
      ProductRecordID: ProductRecordID,
    };
    console.log("get" + JSON.stringify(data));
    console.log("🚀 ~ file: Formapireducer.js:26 ~ data:", data);
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    return response.data;
  }
);
export const materialDcTrckData = createAsyncThunk(
  "matrial/dc-tracking",
  async ({ MaterialID, Type }) => {
    var url = store.getState().globalurl.trackingUrl;
    var data = {
      MaterialID,
      Type,
    };
    console.log("get" + JSON.stringify(data));
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    return response.data;
  }
);

export const searchData = createAsyncThunk(
  "all/search",
  async ({data}) => {
    var url = store.getState().globalurl.searchUrl;

    console.log("get" + JSON.stringify(data));
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    return response.data;
  }
);

export const materialDcTrckChartData = createAsyncThunk(
  "matrial/dc-tracking-chart",
  async ({ RecordID, Type }) => {
    var url = store.getState().globalurl.materialsTrackingUrl;
    var data = {
      Query: {
        RecordID: RecordID,
        Type:Type
      },
    };
    data = JSON.stringify(data);
    console.log("get" + JSON.stringify(data));
    const response = await axios.get(url, {
      params: {
        data: data,
      },
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    return response.data;
  }
);
//Material Stock Order
export const stockorder = createAsyncThunk(
  "material category/material stock order",
  async ({ data }) => {
    // var url = 'http://localhost:8080/MYPROJECT/lgems-api/materialStockOrderTrack.php'
    var url = store.getState().globalurl.stockorderUrl;
   
    console.log("get" + JSON.stringify(data));
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    return response.data;
  }
);
//purchaseorderratingData//
export const purchaseorderrating = createAsyncThunk(
  "purchase indent order/ rating",
  async ({ data }) => {

    var url = store.getState().globalurl.PurchaseorderratingUrl;
   
    console.log("get" + JSON.stringify(data));
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    return response.data;
  }
);



// Material Procurement

export const procurementTrackingGet = createAsyncThunk(
  "materil/procurement",
  async ({ RecordID,Type }) => {
    var url = store.getState().globalurl.matProcurementUrl;
    var data = {
      Query: {
        RecordID: RecordID,
        Type
      },
    };
    console.log("get" + JSON.stringify(data));
   const response =  await axios.get(url, {
      params: {
        data: JSON.stringify(data),
      },
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    return response.data;
  }
);
//Customer Leather
export const customerLeather = createAsyncThunk(
  "customer/leather",
  async ({ HeaderRecordID, ProductRecordID, CustomerRecordID }) => {
    var url = store.getState().globalurl.customerLeatherUrl;
    var data = {
      HeaderRecordID: HeaderRecordID,
      ProductRecordID: ProductRecordID,
      CustomerRecordID: CustomerRecordID,
    };
    console.log("get" + JSON.stringify(data));
    console.log("🚀 ~ file: Formapireducer.js:26 ~ data:", data);
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    return response.data;
  }
);

//DC Summary
export const dcSummary = createAsyncThunk(
  "delivery challan/summary",
  async ({ HeaderID ,Type}) => {
    var url = store.getState().globalurl.dcsummaryUrl;
    var data = {
      HeaderID: HeaderID,
      Type
     
    };
    console.log("get" + JSON.stringify(data));
    console.log("🚀 ~ file: Formapireducer.js:26 ~ data:", data);
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    return response.data;
  }
);
export const dcpostSummary = createAsyncThunk(
  "delivery challan/summary/postdata",
  async ({ data}) => {
    var url = store.getState().globalurl.dcpostsummaryUrl;
    console.log("get" + JSON.stringify(data));
    console.log("🚀 ~ file: Formapireducer.js:26 ~ data:", data);
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    return response.data;
  }
);
//Employee Deployment
export const getDeployment = createAsyncThunk(
  "employee/deployment",
  async ({ HeaderID}) => {
    var url = store.getState().globalurl.getempdeploymentUrl;
    var data = {
      HeaderID: HeaderID,
     
    };
    console.log("get" + JSON.stringify(data));
    console.log("🚀 ~ file: Formapireducer.js:26 ~ data:", data);
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    return response.data;
  }
);
export const postDeployment = createAsyncThunk(
  "employee/deployment/postdata",
  async ({ data}) => {
    var url = store.getState().globalurl.postempdeployment;
    console.log("🚀 ~ file: Formapireducer.js:26 ~ data:", data);
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    return response.data;
  }
);
export const costLeatherData = createAsyncThunk(
  "bom/costing/leather",
  async ({ HeaderRecordID, LeatherRecordID,LeatherNumber }) => {
    var url = store.getState().globalurl.costingLeatherUrl;
    var data = {
      HeaderRecordID: HeaderRecordID,
      LeatherRecordID: LeatherRecordID,
      LeatherNumber
    };
    console.log("get" + JSON.stringify(data));
    console.log("🚀 ~ file: Formapireducer.js:26 ~ data:", data);
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });

    return response.data;
  }
);

export const conversionMaterialData = createAsyncThunk(
  "Conversion",
  async ({ ConversionID }) => {
    var url = store.getState().globalurl.conversionUrl;
    var data = { ConversionID: ConversionID };
    console.log("get" + JSON.stringify(data));
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    return response.data;
  }
);

export const uomMaterialRate = createAsyncThunk(
  "material/conversion",
  async ({ fromUomID,toUomID,Type}) => {
    var url = store.getState().globalurl.materialUomCovUrl;
    var data = {FromUOMID:fromUomID,ToUOMID:toUomID,Type};
    console.log("get" + JSON.stringify(data));
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    return response.data;
  }
);
export const dpConversionData = createAsyncThunk(
  "Product/conversion",
  async ({ Purchase,FromID,Type,MaterialID }) => {
    //alert("purchase"+Purchase);
    var url = store.getState().globalurl.designPUrl;
    var data = { ConversionID: Purchase,FromID:FromID,Type:Type,MaterialID:MaterialID };
    console.log("get" + JSON.stringify(data));
    console.log("🚀 ~ file: Formapireducer.js:98 ~ data:", data)
    //alert("data---"+data);
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    return response.data;
  }
);
export const StockProcessApi = createAsyncThunk(
  "Stock/process",
  async (props) => {
    var url = store.getState().globalurl.imageNameUpdateUrl;
    var data = { accessid: props.accessID, Recordid: props.recID ,ImageName:"" ,Action:""};
    console.log("get" + JSON.stringify(data));
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    // console.log("🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:", response)
    return response.data;
  }
);

export const cbmCalculation = createAsyncThunk(
  "packinglist/cbmcalculation",
  async ({data}) => {
    var url = store.getState().globalurl.packinglistCbmUrl;
    console.log("get" + JSON.stringify(data));
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    // console.log("🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:", response)
    return response.data;
  }
);

export const bomCopyFn = createAsyncThunk(
  "Stock/process",
  async ({data,accessID}) => {
    var url = accessID == 'TR001' ? store.getState().globalurl.bomCopyUrl : store.getState().globalurl.bomCopyJobworkUrl;
    console.log("get" + JSON.stringify(data));
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    // console.log("🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:", response)
    return response.data;
  }
);
export const invoiceHeaderGetData = createAsyncThunk(
  "Invoice/Header",
  async (props) => {
    var url = store.getState().globalurl.apiUrl;
    const data = {
      accessid: props.accessID,
      action: props.get,
      recid: props.recID,
    };
    console.log("🚀 ~ data:", JSON.stringify(data))

    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
     console.log("🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:", response)
    return response.data;
  }
);

export const invoiceExploreGetData = createAsyncThunk(
  "Invoice/explore",
  async ({ accessID, get, recID }) => {
    var url = store.getState().globalurl.apiUrl;
    const data = {
      accessid: accessID,
      action: get,
      recid: recID,
    };

    console.log("get" + JSON.stringify(data));
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
     console.log("🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:", response)
    return response.data;
  }
);

export const stockGetData = createAsyncThunk(
  "stock/material",
  async ({ accessID,Type , recID ,yearData}) => {
    var url = store.getState().globalurl.stockUrl;
    var data = {
      Query: {
        accessid: accessID,
        recid: recID,
        Type: Type,
        Year: yearData,
      },
    };
    data = JSON.stringify(data);

    console.log("get" + data);
    const response = await axios
    .get(url, {
      params: {
        data: data,
      },

      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    })
    console.log("🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:", response)
    return response.data.Data;
  }
);

export const InvoicePostData = createAsyncThunk(
  "PostData/header/details",
  async ({ accessID, action, idata }) => {
    const url = store.getState().globalurl.apiUrl;
    const data = {
      accessid: accessID,
      action: action,
      data: idata,
    };
    console.log("get" + JSON.stringify(data));
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
      },
    });
    console.log("🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:", response)
    return response.data;
  }
);

export const InvoicePostExploreData = createAsyncThunk(
  "PostData/explore/details",
  async ({ accessID, action, idata }) => {
    const url = store.getState().globalurl.apiUrl;
    const data = {
      accessid: accessID,
      action: action,
      data: idata,
    };
    console.log("🚀 ~ file: Formapireducer.js:209 ~ data:", JSON.stringify(data))

    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
      },
    });
    console.log("🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:", response)
    return response.data;
  }
);

export const getFetchData = createAsyncThunk(
  "allScreen/Header",
  async ({ accessID, get, recID, }) => {
    var url = store.getState().globalurl.apiUrl;
    const data = {
      accessid: accessID,
      action: get,
      recid: recID,};

    
    console.log("🚀 ~ file: Formapireducer.js:225 ~ data:", JSON.stringify(data))

    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    return response.data;
  }
);

export const postData = createAsyncThunk(
  "allScreen/post",
  async ({ accessID, action, idata }) => {
    const url = store.getState().globalurl.apiUrl;

    const data = {
      accessid: accessID,
      action: action,
      data: idata,
    };
    console.log("get" + JSON.stringify(data));
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
      },
    });
    console.log("🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:", response)
    return response.data;
  }
);

export const explorePostData = createAsyncThunk(
  "allScreen/post/explore",
  async ({ accessID, action, idata }) => {
    const url = store.getState().globalurl.apiUrl;
    const data = {
      accessid: accessID,
      action: action,
      data: idata,
    };
 
    console.log("post" + JSON.stringify(data));
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
      },
    });
    console.log("🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:", response)
    return response.data;
  }
);

export const PackingListPostData = createAsyncThunk(
  "packinglist/post",
  async ({ accessID, action, idata,Type }) => {
    const url = store.getState().globalurl.apiUrl;
    const data = {
      accessid: accessID,
      action: action,
      data: idata,
      type:Type,
    };
 
    console.log("post" + JSON.stringify(data));
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
      },
    });
    // console.log("🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:", response)
    return response.data;
  }
);

export const getVersionBom = createAsyncThunk(
  "product/bom",
  async ({recID}) => {
    var url = store.getState().globalurl.commonUrl;
    var data = {
      recid: recID,
      action: "get",
      accessid: "",
    };


    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
      },
    });
    console.log("🚀 ~ file: Formapireducer.js:314 ~ response:", response)
    return response.data;
  }
);
export const getVersionJobworkBom = createAsyncThunk(
  "jobwork/bom",
  async ({recID}) => {
    var url = store.getState().globalurl.jobworkbomurl;
    var data = {
      recid: recID,
      action: "get",
      accessid: "",
    };


    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
      },
    });
    console.log("🚀 ~ file: Formapireducer.js:314 ~ response:", response)
    return response.data;
  }
);
export const hashtoken = createAsyncThunk(
  "hashtoken/data",
  async ({hashtoken}) => {
    var url = store.getState().globalurl.decryptUrl;
   console.log("Tokeeeeennn",hashtoken);


    const response = await axios.post(url, hashtoken, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
      },
    });
    //alert("response",response);
    console.log("🚀 ~ file: Formapireducer.js:314 ~ response:", response)
    return response.data;
  }
);

export const getBomList = createAsyncThunk(
  "listOfBom/getbom",
  async ({recid,action,ProductID}) => {
    const url = store.getState().globalurl.bomHeaderUrl;
    const data = {
      recid,
      action,
      ProductID,
    };


    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
      },
    });
    console.log("🚀 ~ file: Formapireducer.js:314 ~ response:", response)
    return response.data;
  }
);
export const postPrdBthData = createAsyncThunk(
  "product/bom",
  async ({data}) => {
    var url = store.getState().globalurl.prdCardBthUrl;
    console.log("🚀 ~ file: Formapireducer.js:334 ~ data:", JSON.stringify(data))
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
      },
    });
    console.log("🚀 ~ file: Formapireducer.js:314 ~ response:", response)
    return response.data;
  }
);
export const getDCTracking = createAsyncThunk(
  "Deliverychalan/tracking",
  async ({idata}) => {
    var url = store.getState().globalurl.dcTrackingUrl;
    var data = {
     ...idata
    };
    console.log("🚀 ~ file: Formapireducer.js:334 ~ data:", JSON.stringify(data))

    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
      },
    });
    console.log("🚀 ~ file: Formapireducer.js:345 ~ response:", response)
    return response.data;
  }
);
export const proPriceTracking = createAsyncThunk(
  "Product/Price Tracking",
  async ({idata}) => {
    var url = store.getState().globalurl.producttrackingUrl;
    var data = {
     ...idata
    };
    console.log("🚀 ~ file: Formapireducer.js:334 ~ data:", JSON.stringify(data))

    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
      },
    });
    console.log("🚀 ~ file: Formapireducer.js:345 ~ response:", response)
    return response.data;
  }
);


// export function customerorderanalysis(RecordID,CompanyID,YearID) {
//   return async (dispatch) => {
//     function onSuccess(success) {
//        console.log("chartData---" +JSON.stringify(success));
//       // const datawait = dispatch(
//       //   stockReqSuccess({
//       //     stockReqapiResponse: success.data.Data,
//       //   })
//       // );
//       return success.data.Data;
//     }
//     function onError(error) {
//       //dispatch({ type: ERROR_GENERATED, error });
//       return error;
//     }
//     try {
//       var url = store.getState().globalurl.customerorderanalysisUrl;

//       var data = {
//         Query: {
//           RecordID: RecordID,
//           CompanyID:CompanyID,
//           Finyear:YearID
//         },
//       };
//       data = JSON.stringify(data);
//       // console.log("---"+url);
//       dispatch(pending());

//       const success = await axios.get(url, {
//         params: {
//           data: data,
//         },
//         headers: {
//           Authorization:
//             "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
//         },
//       });
//        console.log("chart Response---" + JSON.stringify(success));
//       return onSuccess(success);
//     } catch (error) {
//       return onError(error);
//     }
//   };
// }


export const customerorderanalysis = createAsyncThunk(
  "Customer Order/Analysis",
  async ({data}) => {
    var url = store.getState().globalurl.customerorderanalysisUrl;
   
    console.log("🚀 ~ file: Formapireducer.js:334 ~ data:", JSON.stringify(data))

    const response = await axios.get(url,  {
      params: {
        data:  JSON.stringify(data),
      },
      headers: {
        Authorization:"eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",

      },
    });
    console.log("🚀 ~ file: Formapireducer.js:345 ~ response:", response)
    return response.data;
  }
);
export const productorderanalysis = createAsyncThunk(
  "Product Order/Analysis",
  async ({data}) => {
    var url = store.getState().globalurl.prductorderanalysisUrl;
   
    console.log("🚀 ~ file: Formapireducer.js:334 ~ data:", JSON.stringify(data))

    const response = await axios.get(url,  {
      params: {
        data:  JSON.stringify(data),
      },
      headers: {
        Authorization:"eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",

      },
    });
    console.log("🚀 ~ file: Formapireducer.js:345 ~ response:", response)
    return response.data;
  }
);
export const getApiSlice = createSlice({
  name: "formApi",
  initialState,
  reducers: {
    resetTrackingData(state) {
     state.trackingData = []
     state.customerData = {}
     state.productanalysisData = {}
     state.summeryData = []
     state.stockorderData=[]
     state.purchaseorderratingData=[]
     state.empAttendanceData=[];
     state.AttendanceData=[];
     state.costingLeatherCost.leatherOneCost = 0
     state.costingLeatherCost.leatherTwoCost = 0
     state.costingLeatherCost.leatherThreeCost = 0
     state.costingLeatherCost.materialCost = 0
     state.costingLeatherCost.latestmaterialCost = 0
     state.costingLeatherCost.latestleatherOneCost = 0
     state.costingLeatherCost.latestleatherTwoCost = 0
     state.costingLeatherCost.latestleatherThreeCost = 0
    },
    ratingChange(state,action){
      const index = [...action.payload.rowdata].findIndex((value) => value.RecordID === action.payload.id)
      action.payload.rowdata[index] = action.payload.rating;
      state.purchaseorderratingData=action.payload.rowdata
    },
    packingListCarton(state,action){
      console.log("🚀 ~ file: Formapireducer.js:502 ~ packingListCarton ~ action:", action)
      console.log("action called");
     switch(action.payload.type){

      case "INSERTED":
       state.pakingListCarton.push(...action.payload.data)
        break
      case "EDITED":
        state.pakingListCarton = action.payload.data
        break
      case "RESET":
          state.pakingListCarton = []
        break
     }
    },
    pending(state) {
      return {
        ...state,
        loading: true,
        error: false,
        Data: {},
      };
    },
    errored(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    Success(state, action) {
      if (action.payload.action == "get") {
        return {
          ...state,
          loading: false,
          error: "",
          Data: action.payload.apiResponse,
        };
      } else {
        return {
          ...state,
          loading: false,
          error: "",
          Data: action.payload.apiResponse,
          Status: action.payload.Status,
          msg: action.payload.Msg,
          Successflag: true,
        };
      }
    },
    stockSuccess(state, action) {
      return {
        ...state,
        stockValue: action.payload.stockapiResponse,
      };
    },
    stockReqSuccess(state, action) {
      return {
        ...state,

        stockReqData: action.payload.stockReqapiResponse,
      };
    },
    userGroupUpdate(state, action) {
      state.userGroup = action.payload.rowData;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(invoiceHeaderGetData.pending, (state, action) => {
        state.Status = "idle";
        state.loading = true;
      })
      .addCase(invoiceHeaderGetData.fulfilled, (state, action) => {
        state.Status = "success";
        state.loading = false;
        if (action.payload.Data.Disable == "Y") {
          action.payload.Data.Disable = true;
        } else action.payload.Data.Disable = false;

        state.Data = action.payload.Data;
      })
      .addCase(invoiceHeaderGetData.rejected, (state, action) => {
        state.Status = "Error";
        state.loading = false;
      })
      .addCase(invoiceExploreGetData.pending, (state, action) => {
        state.Status = "idle";
        state.expgetLoading = true
      })
      .addCase(invoiceExploreGetData.fulfilled, (state, action) => {
        state.Status = "success";
        //  state.loading = false
        if (action.payload.Data.Disable == "Y") {
          action.payload.Data.Disable = true;
        } else action.payload.Data.Disable = false;
        state.expgetLoading = false
        state.inviceEData = action.payload.Data;
      })
      .addCase(invoiceExploreGetData.rejected, (state, action) => {
        state.Status = "Error";
        state.expgetLoading = false
      })

      .addCase(InvoicePostData.pending, (state, action) => {
        state.Status = "idle";
        state.postLoading = true;
      })
      .addCase(InvoicePostData.fulfilled, (state, action) => {
        state.Status = "success";
        state.postLoading = false;
        if (action.meta.arg.idata.Disable == "Y") {
          action.meta.arg.idata.Disable = true;
        } else action.meta.arg.idata.Disable = false;
        if (action.meta.arg.accessID !== "TR012") {
          state.data = action.meta.arg.idata;
        }
      })
      .addCase(InvoicePostData.rejected, (state, action) => {
        state.Status = "Error";
        state.postLoading = false;
      })
      .addCase(InvoicePostExploreData.pending, (state, action) => {
        state.Status = "idle";
        state.loading = true;
      })
      .addCase(InvoicePostExploreData.fulfilled, (state, action) => {
        if (action.meta.arg.idata.Disable == "Y") {
          action.meta.arg.idata.Disable = true;
        } else action.meta.arg.idata.Disable = false;
        state.inviceEData = action.meta.arg.idata;
        state.loading = false;
      })
      .addCase(InvoicePostExploreData.rejected, (state, action) => {
        state.Status = "Error";
        state.loading = false;
      })

      .addCase(getFetchData.pending, (state, action) => {
        state.Status = "idle";
        state.getLoading = true;
        state.Data = {};
        state.msg =  "Loading..."
      })
      .addCase(getFetchData.fulfilled, (state, action) => {
        state.Status = "success";
        state.getLoading = false;
        state.Data = action.payload.Data ? action.payload.Data : {} ;
        // state.msg =  action.payload.Msg
      })
      .addCase(getFetchData.rejected, (state, action) => {
        state.Status = "Error";
        state.getLoading = false;
        state.Data = {};
       toast.error('Something Went Wrong')
      })
      .addCase(postData.pending, (state, action) => {
        state.Status = "idle";
        state.postLoading = true;
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.Status = "success";
        state.postLoading = false;
        // if (action.meta.arg.idata.Disable == "Y") {
        //   action.meta.arg.idata.Disable = true;
        // } else action.meta.arg.idata.Disable = false;

        state.Data = action.meta.arg.idata;
      })
      .addCase(postData.rejected, (state, action) => {
        state.Status = "Error";
        state.postLoading = false;
      })

      .addCase(explorePostData.pending, (state, action) => {
        state.Status = "idle";
        state.postLoading = true;
      })
      .addCase(explorePostData.fulfilled, (state, action) => {
        state.Status = "success";
        state.postLoading = false;
      })
      .addCase(explorePostData.rejected, (state, action) => {
        state.Status = "Error";
        state.postLoading = false;
      })
      .addCase(dpConversionData.fulfilled, (state, action) => {
        state.conversionData = action.payload;
        // console.log("🚀 ~ file: Formapireducer.js:373 ~ .addCase ~ action:", action)
      })
      .addCase(stockGetData.fulfilled, (state, action) => {
        state.materialStockData = action.payload;
        // console.log("🚀 ~ file: Formapireducer.js:373 ~ .addCase ~ action:", action)
      })
      .addCase(getVersionBom.fulfilled, (state, action) => {
        state.Status = "success";

        state.exploreData = action.payload.Data ? action.payload.Data : "N";
      })
      .addCase(getVersionJobworkBom.fulfilled, (state, action) => {
        state.Status = "success";

        state.exploreData = action.payload.Data ? action.payload.Data : "N";
      })
      .addCase( hashtoken.fulfilled, (state, action) => {
        state.Status = "success";

        state.hashtokenData = action.payload;
      })
      .addCase(getBomList.fulfilled, (state, action) => {
        state.Status = "success";

        state.exploreData = action.payload.Data;
      })
      .addCase(getDCTracking.pending, (state, action) => {
        state.Status = "idle";
        state.loading = true;
      })
      .addCase(getDCTracking.fulfilled, (state, action) => {
        state.Status = "success";
        state.loading = false;
        state.trackingData = action.payload.Data;
        state.summeryData = action.payload.Summary;
      })
      .addCase(getDCTracking.rejected, (state, action) => {
        state.Status = "Error";
        state.loading = false;
      })
      .addCase(proPriceTracking.pending, (state, action) => {
        state.Status = "idle";
        state.loading = true;
      })
      .addCase(proPriceTracking.fulfilled, (state, action) => {
        state.Status = "success";
        state.loading = false;
        state.trackingData = action.payload.Data;
      })
      .addCase(proPriceTracking.rejected, (state, action) => {
        state.Status = "Error";
        state.loading = false;
      })
      .addCase(customerorderanalysis.fulfilled, (state, action) => {
        state.Status = "success";
        state.loading = false;
        state.customerData = action.payload.Data;
      })
      .addCase(productorderanalysis.fulfilled, (state, action) => {
        state.Status = "success";
        state.loading = false;
        state.productanalysisData = action.payload.Data;
      })
      .addCase(uomMaterialRate.fulfilled, (state, action) => {
        state.conversionData= action.payload
      })
      .addCase(costLeatherData.fulfilled, (state, action) => {
        console.log("🚀 ~ file: Formapireducer.js:863 ~ .addCase ~ action:", action)
        
        if(action.meta.arg.LeatherNumber == 1 ){
        state.costingLeatherCost.leatherOneCost =  Number(action.payload.LeatherCost).toFixed(2)
        state.costingLeatherCost.latestleatherOneCost =  Number(action.payload.LeatherLatestCost).toFixed(2)
        }
        if(action.meta.arg.LeatherNumber == 2 ){
          state.costingLeatherCost.leatherTwoCost =  Number(action.payload.LeatherCost).toFixed(2)
          state.costingLeatherCost.latestleatherTwoCost =  Number(action.payload.LeatherLatestCost).toFixed(2)
          }
        if(action.meta.arg.LeatherNumber == 3 ){
            state.costingLeatherCost.leatherThreeCost =  Number(action.payload.LeatherCost).toFixed(2)
            state.costingLeatherCost.latestleatherThreeCost =  Number(action.payload.LeatherLatestCost).toFixed(2)
        }
      })
      .addCase(costingBOMData.fulfilled, (state, action) => {
        state.costingLeatherCost.materialCost =  Number(action.payload.Cost).toFixed(2)
        state.costingLeatherCost.latestmaterialCost =  Number(action.payload.LatestCost).toFixed(2)
      })
      .addCase(customerLeather.fulfilled, (state, action) => {
        state.customerLeatherData = action.payload;
        
      })
      .addCase(dcSummary.fulfilled, (state, action) => {
      state.summaryData = action.payload.Data;
        })
        .addCase(getDeployment.fulfilled, (state, action) => {
          state.deploymentData = action.payload.Data;
            })

            .addCase(procurementTrackingGet.pending, (state, action) => {
              state.Status = "idle";
              state.trackingLoading = true;
              state.materialTrackingData={
                Rateseries:{},
                Qtyseries:{},
                Amountseries:{},
                categories:[],
                TableData:{data:[]},
              }
            })
            .addCase(procurementTrackingGet.fulfilled, (state, action) => {
              state.Status = "success";
              state.trackingLoading = false;
              state.materialTrackingData = action.payload.Data;
            })
            .addCase(procurementTrackingGet.rejected, (state, action) => {
              state.Status = "Error";
              state.trackingLoading = false;
              state.materialTrackingData = {};
            })
            .addCase(materialDcTrckData.pending, (state, action) => {
              state.Status = "idle";
              state.trackingLoading = true;
              state.matrialDcTrackData = []
            })
            .addCase(materialDcTrckData.fulfilled, (state, action) => {
              state.Status = "success";
              state.trackingLoading = false;
              state.matrialDcTrackData = action.payload.Data;
            })
            .addCase(materialDcTrckData.rejected, (state, action) => {
              state.Status = "Error";
              state.trackingLoading = false;
              state.matrialDcTrackData = []
            })

            .addCase(searchData.pending, (state, action) => {
              state.Status = "idle";
              state.searchLoading = true;
            })
            .addCase(searchData.fulfilled, (state, action) => {
              state.Status = "success";
              state.searchLoading = false;
            })
            .addCase(searchData.rejected, (state, action) => {
              state.Status = "Error";
              state.searchLoading = false;
            })
            .addCase(materialDcTrckChartData.fulfilled, (state, action) => {
              // state.Status = "success";
              // state.trackingLoading = false;
              state.stockReqData = action.payload.Data;
            })
            .addCase(stockorder.pending, (state, action) => {
              state.Status = "idle";
              state.trackingLoading = true;
              state.stockorderData = []
            })
            
            .addCase(stockorder.fulfilled, (state, action) => {
              state.trackingLoading = false;
              state.stockorderData = action.payload.data;
            })
          //-----------------------------------------//
          .addCase(purchaseorderrating.pending, (state, action) => {
            state.Status = "idle";
            state.trackingLoading = true;
            state.purchaseorderratingData = [];
          })
          
          .addCase(purchaseorderrating.fulfilled, (state, action) => {
            state.trackingLoading = false;
            state.purchaseorderratingData = action.payload.Data;
          })
          .addCase(empAttendance.fulfilled, (state, action) => {

            state.empAttendanceData = action.payload.Data;
            
          })
          .addCase(Attendance.fulfilled, (state, action) => {
    
            state.AttendanceData = action.payload.Data;
            
          })
  },
});

// Destructure and export the plain action creators
export const {
  pending,
  errored,
  userGroupUpdate,
  Success,
  stockSuccess,
  stockReqSuccess,
  resetTrackingData,
  // packingListCarton
  ratingChange
} = getApiSlice.actions;

export default getApiSlice.reducer;

export const fetchApidata =
  (AccessID, Action, idata) => (dispatch, getState) => {
    //  alert(Action);

    var url = store.getState().globalurl.apiUrl;
    var data = {
      accessid: AccessID,
      action: Action,
      recid: idata,
    };

    console.log("🚀 ~ file: Formapireducer.js:794 ~ JSON.stringify(data):", JSON.stringify(data))
    dispatch(pending());
    axios
      .post(url, data, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
        },
      })

      .then((response) => {
        console.log(
          "🚀 ~ file: Formapireducer.js:413 ~ .then ~ response:",
          response
        );
        console.log("response data" + JSON.stringify(response.data));
        var apidata = response.data;
        // console.log("🚀 ~ file: Formapireducer.js:415 ~ .then ~ response.data:", response.data)

        //     apidata=eval(apidata);
        //    console.log("apidatastatus"+typeof(response.data))
        if (apidata.Status == "Y") {
          // console.log("apidata" + JSON.stringify(apidata.Data));

          if (apidata.Data.Disable == "Y") {
            apidata.Data.Disable = true;
          } else apidata.Data.Disable = false;
          if (AccessID == "TR014") {
            if (apidata.Data.Process == "Y") {
              apidata.Data.Process = true;
            } else apidata.Data.Process = false;
          }
          if (AccessID == "TR014") {
            if (apidata.Data.Regularslno == "Y") {
              apidata.Data.Regularslno = true;
            } else apidata.Data.Regularslno = false;
          }
          if (AccessID == "TR003") {
            if (apidata.Data.Hidevisible == "Y") {
              apidata.Data.Hidevisible = true;
            } else apidata.Data.Hidevisible = false;
          }
          if (AccessID == "TR004") {
            if (apidata.Data.Rawmaterial == "Y") {
              apidata.Data.Rawmaterial = true;
            } else apidata.Data.Rawmaterial = false;

            if (apidata.Data.Consumable == "Y") {
              apidata.Data.Consumable = true;
            } else apidata.Data.Consumable = false;

            if (apidata.Data.Sellable == "Y") {
              apidata.Data.Sellable = true;
            } else apidata.Data.Sellable = false;
            if (apidata.Data.DesignApp == "Y") {
              apidata.Data.DesignApp = true;
            } else apidata.Data.DesignApp = false;
          }

          if (AccessID == "TR010") {
            if (apidata.Data.ForiegnAgentFlag == "Y") {
              apidata.Data.ForiegnAgentFlag = true;
            } else apidata.Data.ForiegnAgentFlag = false;

            if (apidata.Data.LocalAgentFlag == "Y") {
              apidata.Data.LocalAgentFlag = true;
            } else apidata.Data.LocalAgentFlag = false;
          }
          if (AccessID == "TR021") {
            if (apidata.Data.Duration == "Y") {
              apidata.Data.Duration = true;
            } else apidata.Data.Duration = false;

            if (apidata.Data.Incharge == "Y") {
              apidata.Data.Incharge = true;
            } else apidata.Data.Incharge = false;
          }
          if (AccessID == "TR009") {
            if (apidata.Data.Jobwork == "Y") {
              apidata.Data.Jobwork = true;
            } else apidata.Data.Jobwork = false;

         
          }
          if (AccessID == "TR110") {
            if (apidata.Data.Sameplist == "Y") {
              apidata.Data.Sameplist = true;
            } else apidata.Data.Sameplist = false;

         
          }
          if (AccessID == "TR085") {
            if (apidata.Data.Productcost == "Y") {
              apidata.Data.Productcost = true;
            } else apidata.Data.Productcost = false;
          }
          dispatch(
            Success({
              action: Action,
              Status: apidata.Status,
              apiResponse: apidata.Data,
              Msg: "",
            })
          );
        } else {
          dispatch(
            Success({
              action: Action,
              Status: apidata.Status,
            })
          );
        }
      })
      .catch((error) => {
        dispatch(errored);
        //dispatch(errored({"action":Action,"Status":apidata.Status,"apiResponse":apidata.Data,"Msg":""}))
      });
  };

export function postApidata(AccessID, Action, idata) {
  return async (dispatch) => {
    function onSuccess(success) {
      console.log("2---" + success.data.Status);

      const datawait = dispatch(
        Success({
          action: Action,
          Status: success.data.Status,
          // data:success.
          apiResponse: {},
          Msg: success.data.Msg,
        })
      );
      return datawait;
    }
    function onError(error) {
      //dispatch({ type: ERROR_GENERATED, error });
      return error;
    }
    try {
      console.log("---",idata);
      var isCompanyID = Object.hasOwn(idata, 'CompanyID');
      var isFinyear = Object.hasOwn(idata, 'Finyear');
      const Finyear = sessionStorage.getItem("YearRecorid");
      const CompanyID = sessionStorage.getItem("compID");
      if(!isCompanyID && AccessID !== 'TR030' && AccessID !== 'TR076'){
        idata = {
          ...idata,
          CompanyID,  
        }
      }
      if(!isFinyear && AccessID !== 'TR030'  && AccessID !== 'TR076'){
        idata = {
          ...idata,
          Finyear,  
        }
      }
      console.log("🚀 ~ file: Formapireducer.js:734 ~ return ~ idata:", idata)
      var url = store.getState().globalurl.apiUrl;
      var data = {
        accessid: AccessID,
        action: Action,
        data: idata,
      };
      dispatch(pending());
      console.log("postdata" + JSON.stringify(data));
      const success = await axios.post(url, data, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
        },
      });
      console.log(
        "🚀 ~ file: Formapireducer.js:335 ~ return ~ success:",
        success
      );
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
}

export function proformainvApidata(
  RecordID,
  ProfoInvoiceNO,
  ProfoInvoiceDate,
  parentID,
  YearID
) {
  return async (dispatch) => {
    function onSuccess(success) {
      console.log("2---" + success.data.Status);

      const datawait = dispatch(
        Success({
          action: "",
          Status: success.data.Status,
          apiResponse: {},
          Msg: success.data.Msg,
        })
      );
      return datawait;
    }
    function onError(error) {
      //dispatch({ type: ERROR_GENERATED, error });
      return error;
    }
    try {
      var url = store.getState().globalurl.proformainvUrl;
      const Finyear = sessionStorage.getItem("YearRecorid");
      const CompanyID = sessionStorage.getItem("compID");
      var data = {
        RecordID: RecordID,
        ProfoInvoiceNO: ProfoInvoiceNO,
        ProfoInvoiceDate: ProfoInvoiceDate,
        type:parentID,
        YearID: YearID,
        CompanyID,
        Finyear
      };
      dispatch(pending());
      console.log("postdata" + JSON.stringify(data));
      const success = await axios.post(url, data, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
        },
      });
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
}

export function finalinvApidata(
  RecordID,
  FinalInvoiceNO,
  FinalInvoiceDate,
  parentID,
  YearID
) {
  return async (dispatch) => {
    function onSuccess(success) {
      console.log("2---" + success.data.Status);

      const datawait = dispatch(
        Success({
          action: "",
          Status: success.data.Status,
          apiResponse: {},
          Msg: success.data.Msg,
        })
      );
      return datawait;
    }
    function onError(error) {
      //dispatch({ type: ERROR_GENERATED, error });
      return error;
    }
    try {
      const Finyear = sessionStorage.getItem("YearRecorid");
      const CompanyID = sessionStorage.getItem("compID");
      var url = store.getState().globalurl.finalinvUrl;
      var data = {
        RecordID: RecordID,
        FinalInvoiceNO: FinalInvoiceNO,
        FinalInvoiceDate: FinalInvoiceDate,
        type:parentID,
        YearID: YearID,
        CompanyID,
        Finyear
      };
      dispatch(pending());
      console.log("postdata" + JSON.stringify(data));
      const success = await axios.post(url, data, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
        },
      });
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
}

export function postApidatawol(AccessID, Action, idata) {
  return async (dispatch) => {
    function onSuccess(success) {
      console.log("2---" + success.data.Status);

      const datawait = dispatch(
        Success({
          action: Action,
          Status: success.data.Status,
          apiResponse: success.data.Recid,
          Msg: success.data.Msg,
          // Data: idata
        })
      );
      return datawait;
    }
    function onError(error) {
      //dispatch({ type: ERROR_GENERATED, error });
      return error;
    }
    try {
      var url = store.getState().globalurl.apiUrl;
      var data = {
        accessid: AccessID,
        action: Action,
        data: idata,
      };
      dispatch(pending());
      console.log("postdata" + JSON.stringify(data));
      const success = await axios.post(url, data, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
        },
      });
      console.log(
        "🚀 ~ file: Formapireducer.js:475 ~ return ~ success:",
        success
      );
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
}

export function fetchRecIDApidata(AccessID, Action, idata) {
  return async (dispatch) => {
    function onSuccess(success) {
      console.log("2---" + success.data.Status);
      const datawait = dispatch(
        Success({
          action: Action,
          Status: success.data.Status,
          apiResponse: success.data.Data,
          Msg: "",
        })
      );
      return datawait;
    }
    function onError(error) {
      //dispatch({ type: ERROR_GENERATED, error });
      return error;
    }
    try {
      var url = store.getState().globalurl.apiUrl;
      var data = {
        accessid: AccessID,
        action: Action,
        recid: idata,
      };
      dispatch(pending());
      console.log("get" + JSON.stringify(data));
      const success = await axios.post(url, data, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
        },
      });
      // console.log("Response---" + JSON.stringify(success));
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
}

export function VersioningFetch(recid) {
  return async (dispatch) => {
    function onSuccess(success) {
      console.log("2---" + success.data.Status);
      const datawait = dispatch(
        Success({
          action: "get",
          Status: success.data.Status,
          apiResponse: success.data.Data,
          Msg: "",
        })
      );
      return datawait;
    }
    function onError(error) {
      //dispatch({ type: ERROR_GENERATED, error });
      return error;
    }
    try {
      var url = store.getState().globalurl.commonUrl;
      var data = {
        recid: recid,
        action: "get",
        accessid: "",
      };

      dispatch(pending());
      console.log("get" + JSON.stringify(data));
      const success = await axios.post(url, data, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
        },
      });
      // console.log("Response---" + JSON.stringify(success));
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
}
// supplier Tracking
export function supplierTrackFetch(SupplierID) {
  return async (dispatch) => {
    function onSuccess(success) {
      console.log("2---" +JSON.stringify(success));
      console.log("2---" +JSON.stringify(success.data.Data));
      const datawait = dispatch(
        Success({
          action: "get",
          Status: success.data.Status,
          apiResponse: success.data.Data,
          Msg: "",
        })
      );
      return datawait;
    }
    function onError(error) {
      //dispatch({ type: ERROR_GENERATED, error });
      return error;
    }
    try {
      var url = store.getState().globalurl.supplierTrackUrl;
      var data = {SupplierID: SupplierID};

      dispatch(pending());
      console.log("get" + JSON.stringify(data));
      const success = await axios.post(url, data, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
        },
      });
       console.log("Response---" + JSON.stringify(success));
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
}

export function TrackingFetchfn(MaterialID,Type) {
  return async (dispatch) => {
    function onSuccess(success) {
      // console.log("2---" +JSON.stringify(success));
      //  console.log("2---" + JSON.stringify(success.data));
      const datawait = dispatch(
        Success({
          // action: "get",
          // Status: success.data.Status,
          apiResponse: success.data,
          // Msg: "",
        })
      );
      return datawait;
    }
    function onError(error) {
      //dispatch({ type: ERROR_GENERATED, error });
      return error;
    }
    try {
      var url = store.getState().globalurl.trackingUrl;
      var data = {
        MaterialID: MaterialID,
        Type:Type,
      
      };

      dispatch(pending());
      console.log("get" + JSON.stringify(data));
      const success = await axios.post(url, data, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
        },
      });
      console.log("Response---" + JSON.stringify(success));
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
}



export function bomCopyApiData(recid, type) {
  return async (dispatch) => {
    function onSuccess(success) {
      console.log("2---" + success.data.Status);
      const datawait = dispatch(
        Success({
          action: "get",
          Status: success.data.Status,
          apiResponse: {},
          Msg: "",
        })
      );
      return datawait;
    }
    function onError(error) {
      //dispatch({ type: ERROR_GENERATED, error });
      return error;
    }
    try {
      var url = store.getState().globalurl.bomCopyUrl;
      var data = {
        BhprdRecordID: recid,
      };

      dispatch(pending());
      console.log("get" + JSON.stringify(data));
      const success = await axios.post(url, data, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
        },
      });
      // console.log("Response---" + JSON.stringify(success));
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
}

export function bomFetchapiData(AccessID, Action, idata) {
  return async (dispatch) => {
    function onSuccess(success) {
      console.log("2---" + success.data.Status);
      const datawait = dispatch(
        Success({
          action: Action,
          Status: success.data.Status,
          apiResponse: success.data.Data,
          Msg: "",
        })
      );
      return datawait;
    }
    function onError(error) {
      //dispatch({ type: ERROR_GENERATED, error });
      return error;
    }
    try {
      var url = store.getState().globalurl.bomHeaderUrl;

      var data = {
        recid: AccessID,
        action: Action,
        ProductID: idata,
      };
      dispatch(pending());
      console.log("get" + JSON.stringify(data));
      const success = await axios.post(url, data, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
        },
      });
      // console.log("Response---" + JSON.stringify(success));
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
}

export function stockFetchapiData(AccessID, Action, idata) {
  return async (dispatch) => {
    function onSuccess(success) {
      console.log("2---" + success.data.Status);
      const datawait = dispatch(
        Success({
          action: Action,
          Status: success.data.Status,
          apiResponse: success.data.Data,
          Msg: "",
        })
      );
      return datawait;
    }
    function onError(error) {
      //dispatch({ type: ERROR_GENERATED, error });
      return error;
    }
    try {
      var url = store.getState().globalurl.apiUrl;
      
      var data = {
        accessid: AccessID,
        action: Action,
        recid: idata,
      };
      dispatch(pending());
      console.log("get" + JSON.stringify(data));
      const success = await axios.post(url, data, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
        },
      });
      console.log("Response---" + JSON.stringify(success));
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
}



export const stockApidata =
  (AccessID, recid, Type, Year) => (dispatch, getState) => {
    //  alert(Action);

    var url = store.getState().globalurl.stockUrl;
    var data = {
      Query: {
        accessid: AccessID,
        recid: recid,
        Type: Type,
        Year: Year,
      },
    };
    data = JSON.stringify(data);
    console.log(data);
    dispatch(pending());
    axios
      .get(url, {
        params: {
          data: data,
        },

        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
        },
      })

      .then((response) => {
        console.log("response data" + JSON.stringify(response.data));
        var apidata = response.data;

        //     apidata=eval(apidata);
        //    console.log("apidatastatus"+typeof(response.data))
        if (apidata.Status == "Y") {
          console.log("apidata" + JSON.stringify(apidata.Data));

          dispatch(
            Success({
              action: "get",
              Status: apidata.Status,
              apiResponse: apidata.Data,
              Msg: "",
            })
          );
        } else {
          dispatch(
            Success({
              action: "get",
              Status: apidata.Status,
              apiResponse: apidata.Data,
              Msg: "",
            })
          );
        }
      })
      .catch((error) => {
        dispatch(errored);
        //dispatch(errored({"action":Action,"Status":apidata.Status,"apiResponse":apidata.Data,"Msg":""}))
      });
  };

export const batchApidata =
  (productID, ProformaID, bomID) => (dispatch, getState) => {
    var url = store.getState().globalurl.batchUrl;
    var data = {
      Query: {
        ProfomID: ProformaID,
        ProductID: productID,
        BomHeader: bomID,
      },
    };
    data = JSON.stringify(data);
    console.log(data);
    dispatch(pending());
    axios
      .get(url, {
        params: {
          data: data,
        },

        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
        },
      })

      .then((response) => {
        console.log("response data" + JSON.stringify(response.data));
        var apidata = response.data;

        //     apidata=eval(apidata);
        //    console.log("apidatastatus"+typeof(response.data))
        if (apidata.Status == "Y") {
          console.log("apidata" + JSON.stringify(apidata.Data));

          dispatch(
            Success({
              action: "get",
              Status: apidata.Status,
              apiResponse: apidata.Data,
              Msg: "",
            })
          );
        } else {
          dispatch(
            Success({
              action: "get",
              Status: apidata.Status,
              apiResponse: apidata.Data,
              Msg: "",
            })
          );
        }
      })
      .catch((error) => {
        dispatch(errored);
        //dispatch(errored({"action":Action,"Status":apidata.Status,"apiResponse":apidata.Data,"Msg":""}))
      });
  };

export function orderFetchapiData(name) {
  return async (dispatch) => {
    function onSuccess(success) {
      console.log("Inside Stock-" + success.data.Status);
      const datawait = dispatch(
        Success({
          Status: success.data.Status,
          apiResponse: success.data.Data,
        })
      );
      return datawait;
    }
    function onError(error) {
      //dispatch({ type: ERROR_GENERATED, error });
      return error;
    }
    try {
      var url = store.getState().globalurl.orderUrl;

      var data = {
        Query: {
          Name: name,
        },
      };
      data = JSON.stringify(data);
      console.log("---" + url);
      dispatch(pending());

      const success = await axios.get(url, {
        params: {
          data: data,
        },
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
        },
      });
      // console.log("Response---" + JSON.stringify(success));
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
}

export function stockvalueFetchapiData(name) {
  return async (dispatch) => {
    function onSuccess(success) {
      console.log("Inside Stock-" + success.data.Status);
      const datawait = dispatch(
        stockSuccess({
          stockapiResponse: success.data.Data,
        })
      );
      return datawait;
    }
    function onError(error) {
      //dispatch({ type: ERROR_GENERATED, error });
      return error;
    }
    try {
      var url = store.getState().globalurl.productUrl;

      var data = {
        Query: {
          Name: name,
        },
      };
      data = JSON.stringify(data);
      console.log("---" + url);
      dispatch(pending());

      const success = await axios.get(url, {
        params: {
          data: data,
        },
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
        },
      });
      // console.log("Response---" + JSON.stringify(success));
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
}

export function MaterialTrackingFetchData(RecordID,Type) {
  return async (dispatch) => {
    function onSuccess(success) {
       console.log("chartData---" +JSON.stringify(success));
      const datawait = dispatch(
        stockReqSuccess({
          stockReqapiResponse: success.data.Data,
        })
      );
      return datawait;
    }
    function onError(error) {
      //dispatch({ type: ERROR_GENERATED, error });
      return error;
    }
    try {
      var url = store.getState().globalurl.materialsTrackingUrl;

      var data = {
        Query: {
          RecordID: RecordID,
          Type:Type
        },
      };
      data = JSON.stringify(data);
     console.log("---"+data);
      dispatch(pending());

      const success = await axios.get(url, {
        params: {
          data: data,
        },
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
        },
      });
       console.log("chart Response---" + JSON.stringify(success));
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
}



export function supplierTrackingFetchData(RecordID) {
  return async (dispatch) => {
    function onSuccess(success) {
       console.log("Inside Stock-" +JSON.stringify(success));
      const datawait = dispatch(
        stockReqSuccess({
          stockReqapiResponse: success.data.Data,
        })
      );
      return datawait;
    }
    function onError(error) {
      //dispatch({ type: ERROR_GENERATED, error });
      return error;
    }
    try {
      var url = store.getState().globalurl.supplytrackingUrl;

      var data = {
        Query: {
          RecordID: RecordID,
        },
      };
      data = JSON.stringify(data);
      // console.log("---"+url);
      dispatch(pending());

      const success = await axios.get(url, {
        params: {
          data: data,
        },
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
        },
      });
      console.log("Response---" + JSON.stringify(success));
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
}

export function stockRequirementFetchapiData(name) {
  return async (dispatch) => {
    function onSuccess(success) {
      // console.log("Inside Stock-" + success.data.Status);
      const datawait = dispatch(
        stockReqSuccess({
          stockReqapiResponse: success.data.Data,
        })
      );
      return datawait;
    }
    function onError(error) {
      //dispatch({ type: ERROR_GENERATED, error });
      return error;
    }
    try {
      var url = store.getState().globalurl.stockReqUrl;

      var data = {
        Query: {
          Name: name,
        },
      };
      data = JSON.stringify(data);
      console.log("🚀 ~ file: Formapireducer.js:1353 ~ return ~ data:", data)
      // console.log("---"+url);
      dispatch(pending());

      const success = await axios.get(url, {
        params: {
          data: data,
        },
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
        },
      });
      // console.log("Response---" + JSON.stringify(success));
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
}
