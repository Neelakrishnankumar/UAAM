// import { createSlice } from "@reduxjs/toolkit";

// // var APIurl ="https://uaam.beyondexs.com/api/"
// // var baseurl ="https://uaam.beyondexs.com/"

//  var APIurl ="https://uaamuat.beyondexs.com/api/"
//  var baseurl ="https://uaamuat.beyondexs.com/"

// // var APIurl ="https://dvmtapi.bexatm.com/uaam/api/"
// // var baseurl ="https://dvmtapi.bexatm.com/uaam/api/"

// // var APIurl = "https://phpmigrationapi.bexatm.com/uaam/api/"
// // var baseurl = "https://phpmigrationapi.bexatm.com/"
// // var APIurl ="https://uaamuat.beyondexs.com/api/"
// //  var baseurl ="https://uaamuat.beyondexs.com/"

// const initialState = {
//    name : 'Uaam',
//     listViewurl :APIurl+ 'wslistview_mysql.php',
//     loginUrl:APIurl+ 'LController.php',
//     comboUrl:APIurl+ 'APIController.php',
//     apiUrl :APIurl+ 'APIController.php',
//     imgUploadUrl:baseurl +'imgup.php',
//     imageUrl:baseurl +'uploads/images/',
//     imageNameUpdateUrl:APIurl+ 'CMController.php',
//     attachmentUrl:baseurl +'uploads/attachments/',
//     custprodattachmentUrl:baseurl +'uploads/custimage/',
//     fileUploadUrl:baseurl +'fileupload.php',
//     SalesfileuploadUrl: APIurl+ 'CsvppController.php',

//     dcissueGetUrl:APIurl+ 'DcDetailQuanitySplitUpGetController.php',
//     dcissueUrl:APIurl+ 'DcDetailQuanitySplitUpController.php',
//     csvUploadUrl:APIurl+ 'csvupload.php',

//     pcdurl:APIurl+ 'PCDController.php',
//     pdfurl:baseurl +'tcpdf/',
//     indentUrl:APIurl+ 'IndentController.php',
//     invoiceUrl:APIurl+ 'InvoiceController.php',
//     commonUrl : APIurl+ 'CommonController.php',
//     bomCopyUrl: APIurl+ 'VersioningController.php',
//     bomHeaderUrl: APIurl+ 'BOMController.php',
//     stockUrl:APIurl+ 'StockController.php',
//     batchUrl:APIurl+ 'BatchstructureController.php',
//     finalinvUrl:APIurl+ 'FinalInvoiceController.php',
//     proformainvUrl:APIurl+ 'ProfoinvoiceController.php',
//     orderUrl:APIurl+ 'CustomerOrder.php',
//     stockReqUrl:APIurl+ 'StockRequirement.php',
//     productUrl:APIurl+ 'StockProcedure.php',
//     bomLkUrl:APIurl+ 'InvoiceBomLkController.php',
//     designPUrl:APIurl+ 'UomconversiongetController.php',
//     costingMatrialUrl:APIurl+ 'BomcostController.php?',
//     conversionUrl:APIurl+ 'UomconversiongetController.php',
//     userGroupUrl:APIurl+ 'GroupaccessController.php',
//     dcTrackingUrl:APIurl+ 'DctrackingController.php',
//     trackingUrl:APIurl+ 'MaterialtrackingController.php',
//     supplierTrackUrl:APIurl+ 'SuppliertrackingController.php',

//     materialsTrackingUrl:APIurl+ 'MaterialTrackingChartNew.php',
//     supplytrackingUrl:APIurl+ 'SupplierTrackingChart.php',
//     producttrackingUrl:APIurl+ 'ProductpriceController.php?',
//     pIndentUrl:APIurl+ 'PurchaseIndentController.php',
//     prdCardBthUrl:APIurl+ 'PrdBatchIssueController.php',
//     customerorderanalysisUrl:APIurl+ 'CustomerOrderChart.php?',
//     prductorderanalysisUrl:APIurl+ 'ProductOrderChart.php?',
//     mailContentGeturl:APIurl+ 'EmailController.php',
//     mailSendUrl:APIurl+ 'invoicemail.php',
//     materialUomCovUrl:APIurl+ 'MaterialUOMConversionController.php',
//     decryptUrl:APIurl+ 'HashtokenController.php',
//     costingLeatherUrl:APIurl+ 'BomLeathercost.php',
//     customerLeatherUrl:APIurl+ 'CustomerLeatherController.php',
//     dcsummaryUrl:APIurl+ 'getdcsummary.php',
//      dcpostsummaryUrl:APIurl+ 'postdcsummary.php',
//      getempdeploymentUrl:APIurl+ 'getempdeployment.php?',
//      postempdeployment:APIurl+ 'postempdeployment.php?',
//      matProcurementUrl:APIurl+ 'MaterialProcurementChart.php',
//      stockorderUrl:APIurl+ 'MaterialOrderReportController.php',
//      salesAnalysisUrl:APIurl+ 'Salesanalysisbymaterial.php',
//      purchaseAnalysisUrl:APIurl+ 'Purchaseanalysisbymaterial.php',
//      CashFlowSalesAnalysisUrl:APIurl+ 'Salesanalysisbycost.php',
//      BlockWiseDCControllerurl:APIurl+ 'BlockWiseDCController.php',

//      materiallatestpriceUrl:APIurl+ 'PostMaterialrate.php',
//      employeeattendanceUrl:APIurl+ "getempattendancehistory.php",
//      attendanceUrl:APIurl+ "getempattendance.php",

//      stockanalyticsUrl:APIurl+ "SalesAnalyticsController.php",
//      productwiseChartUrl:APIurl+ "NewChartProductWiseSalesController.php",
//      ProductInterfaceUrl:APIurl+ "tr221_get.php",
//      materialrateUrl:APIurl+ "MaterialRateAnalysisController.php",
//      consumptionUrl:APIurl+ "RequirementConsumptionController.php",
//       locationManualUrl: APIurl+ "ManualSaleLocationController.php",
//       inchargeManualUrl: APIurl+ "ManualSaleEmployeeNameController.php",
//       ProductcatUrl: APIurl+ "ManualDetailProductCatgController.php",
//       subCheckUrl: APIurl+ "SubscriptionRenewalController.php",
//       SubIdGetUrl: APIurl+ "SubscriptionIdGetController.php",
//       trailCompanyUrl: APIurl+ "TrialCompanyPostController.php",
//       CompanyBankGET: APIurl+ "CompanyBankGetContoller.php",
//       CompanyBankUPDATE: APIurl+ "CompanyBankUpdateContoller.php",
//       CompanyReportSettingGet: APIurl+ "CompanyReportSettingGet.php",
//       CompanyReportSettingUpdate: APIurl+ "CompanyReportSettingUpdate.php",

//   };

// export const getUrlSlice = createSlice({
//   name: "globalurl",
//   initialState,
//   reducers: {},
// });

// export default getUrlSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { getConfig } from "./config";

const initialState = {
  name: "Uaam",
  listViewurl: "",
  loginUrl: "",
  comboUrl: "",
  apiUrl: "",
  imgUploadUrl: "",
  imageUrl: "",
  imageNameUpdateUrl: "",
  attachmentUrl: "",
  custprodattachmentUrl: "",
  fileUploadUrl: "",
  SalesfileuploadUrl: "",

  dcissueGetUrl: "",
  dcissueUrl: "",
  csvUploadUrl: "",

  pcdurl: "",
  pdfurl: "",
  indentUrl: "",
  invoiceUrl: "",
  commonUrl: "",
  bomCopyUrl: "",
  bomHeaderUrl: "",
  stockUrl: "",
  batchUrl: "",
  finalinvUrl: "",
  proformainvUrl: "",
  orderUrl: "",
  stockReqUrl: "",
  productUrl: "",
  bomLkUrl: "",
  designPUrl: "",
  costingMatrialUrl: "",
  conversionUrl: "",
  userGroupUrl: "",
  dcTrackingUrl: "",
  trackingUrl: "",
  supplierTrackUrl: "",

  materialsTrackingUrl: "",
  supplytrackingUrl: "",
  producttrackingUrl: "",
  pIndentUrl: "",
  prdCardBthUrl: "",
  customerorderanalysisUrl: "",
  prductorderanalysisUrl: "",
  mailContentGeturl: "",
  mailSendUrl: "",
  materialUomCovUrl: "",
  decryptUrl: "",
  costingLeatherUrl: "",
  customerLeatherUrl: "",
  dcsummaryUrl: "",
  dcpostsummaryUrl: "",
  getempdeploymentUrl: "",
  postempdeployment: "",
  matProcurementUrl: "",
  stockorderUrl: "",
  salesAnalysisUrl: "",
  purchaseAnalysisUrl: "",
  CashFlowSalesAnalysisUrl: "",
  BlockWiseDCControllerurl: "",

  materiallatestpriceUrl: "",
  employeeattendanceUrl: "",
  attendanceUrl: "",

  stockanalyticsUrl: "",
  productwiseChartUrl: "",
  ProductInterfaceUrl: "",
  materialrateUrl: "",
  consumptionUrl: "",
  locationManualUrl: "",
  inchargeManualUrl: "",
  ProductcatUrl: "",
  subCheckUrl: "",
  SubIdGetUrl: "",
  trailCompanyUrl: "",
  CompanyBankGET: "",
  CompanyBankUPDATE: "",
  CompanyReportSettingGet: "",
  CompanyReportSettingUpdate: "",
};

export const getUrlSlice = createSlice({
  name: "globalurl",
  initialState,
  reducers: {
    initGlobalUrl: (state) => {
      const config = getConfig();

      const APIurl = config.API_URL;
      const baseurl = config.BASE_URL;
      const baseurlBOS = config.BOS_URL;
      const baseurlESS = config.ESS_URL;

      state.listViewurl = APIurl + "wslistview_mysql.php";
      state.loginUrl = APIurl + "LController.php";
      state.comboUrl = APIurl + "APIController.php";
      state.apiUrl = APIurl + "APIController.php";
      state.imgUploadUrl = baseurl + "imgup.php";
      state.imageUrl = baseurl + "uploads/images/";
      state.imageNameUpdateUrl = APIurl + "CMController.php";
      state.attachmentUrl = baseurl + "uploads/attachments/";
      state.custprodattachmentUrl = baseurl + "uploads/custimage/";
      state.fileUploadUrl = baseurl + "fileupload.php";
      state.SalesfileuploadUrl = APIurl + "CsvppController.php";

      state.dcissueGetUrl = APIurl + "DcDetailQuanitySplitUpGetController.php";
      state.dcissueUrl = APIurl + "DcDetailQuanitySplitUpController.php";
      state.csvUploadUrl = APIurl + "csvupload.php";

      state.pcdurl = APIurl + "PCDController.php";
      state.pdfurl = baseurl + "tcpdf/";
      state.indentUrl = APIurl + "IndentController.php";
      state.invoiceUrl = APIurl + "InvoiceController.php";
      state.commonUrl = APIurl + "CommonController.php";
      state.bomCopyUrl = APIurl + "VersioningController.php";
      state.bomHeaderUrl = APIurl + "BOMController.php";
      state.stockUrl = APIurl + "StockController.php";
      state.batchUrl = APIurl + "BatchstructureController.php";
      state.finalinvUrl = APIurl + "FinalInvoiceController.php";
      state.proformainvUrl = APIurl + "ProfoinvoiceController.php";
      state.orderUrl = APIurl + "CustomerOrder.php";
      state.stockReqUrl = APIurl + "StockRequirement.php";
      state.productUrl = APIurl + "StockProcedure.php";
      state.bomLkUrl = APIurl + "InvoiceBomLkController.php";
      state.designPUrl = APIurl + "UomconversiongetController.php";
      state.costingMatrialUrl = APIurl + "BomcostController.php?";
      state.conversionUrl = APIurl + "UomconversiongetController.php";
      state.userGroupUrl = APIurl + "GroupaccessController.php";
      state.dcTrackingUrl = APIurl + "DctrackingController.php";
      state.trackingUrl = APIurl + "MaterialtrackingController.php";
      state.supplierTrackUrl = APIurl + "SuppliertrackingController.php";

      state.materialsTrackingUrl = APIurl + "MaterialTrackingChartNew.php";
      state.supplytrackingUrl = APIurl + "SupplierTrackingChart.php";
      state.producttrackingUrl = APIurl + "ProductpriceController.php?";
      state.pIndentUrl = APIurl + "PurchaseIndentController.php";
      state.prdCardBthUrl = APIurl + "PrdBatchIssueController.php";
      state.customerorderanalysisUrl = APIurl + "CustomerOrderChart.php?";
      state.prductorderanalysisUrl = APIurl + "ProductOrderChart.php?";
      state.mailContentGeturl = APIurl + "EmailController.php";
      state.mailSendUrl = APIurl + "invoicemail.php";
      state.materialUomCovUrl = APIurl + "MaterialUOMConversionController.php";
      state.decryptUrl = APIurl + "HashtokenController.php";
      state.costingLeatherUrl = APIurl + "BomLeathercost.php";
      state.customerLeatherUrl = APIurl + "CustomerLeatherController.php";
      state.dcsummaryUrl = APIurl + "getdcsummary.php";
      state.dcpostsummaryUrl = APIurl + "postdcsummary.php";
      state.getempdeploymentUrl = APIurl + "getempdeployment.php?";
      state.postempdeployment = APIurl + "postempdeployment.php?";
      state.matProcurementUrl = APIurl + "MaterialProcurementChart.php";
      state.stockorderUrl = APIurl + "MaterialOrderReportController.php";
      state.salesAnalysisUrl = APIurl + "Salesanalysisbymaterial.php";
      state.purchaseAnalysisUrl = APIurl + "Purchaseanalysisbymaterial.php";
      state.CashFlowSalesAnalysisUrl = APIurl + "Salesanalysisbycost.php";
      state.BlockWiseDCControllerurl = APIurl + "BlockWiseDCController.php";

      state.materiallatestpriceUrl = APIurl + "PostMaterialrate.php";
      state.employeeattendanceUrl = APIurl + "getempattendancehistory.php";
      state.attendanceUrl = APIurl + "getempattendance.php";

      state.stockanalyticsUrl = APIurl + "SalesAnalyticsController.php";
      state.productwiseChartUrl =
        APIurl + "NewChartProductWiseSalesController.php";
      state.ProductInterfaceUrl = APIurl + "tr221_get.php";
      state.materialrateUrl = APIurl + "MaterialRateAnalysisController.php";
      state.consumptionUrl = APIurl + "RequirementConsumptionController.php";
      state.locationManualUrl = APIurl + "ManualSaleLocationController.php";
      state.inchargeManualUrl = APIurl + "ManualSaleEmployeeNameController.php";
      state.ProductcatUrl = APIurl + "ManualDetailProductCatgController.php";
      state.subCheckUrl = APIurl + "SubscriptionRenewalController.php";
      state.SubIdGetUrl = APIurl + "SubscriptionIdGetController.php";
      state.trailCompanyUrl = APIurl + "TrialCompanyPostController.php";
      state.CompanyBankGET = APIurl + "CompanyBankGetContoller.php";
      state.CompanyBankUPDATE = APIurl + "CompanyBankUpdateContoller.php";
      state.CompanyReportSettingGet = APIurl + "CompanyReportSettingGet.php";
      state.CompanyReportSettingUpdate =
        APIurl + "CompanyReportSettingUpdate.php";
      state.UserActivityUrl = APIurl + "UserActivityController.php";

    },
  },
});

export const { initGlobalUrl } = getUrlSlice.actions;

export default getUrlSlice.reducer;
