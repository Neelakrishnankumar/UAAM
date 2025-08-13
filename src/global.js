
import { createSlice } from "@reduxjs/toolkit";

// var APIurl ="https://uaam.beyondexs.com/api/"
// var baseurl ="https://uaam.beyondexs.com/"
// var APIurl ="https://dvmtapi.bexatm.com/uaam/api/"
// var baseurl ="https://dvmtapi.bexatm.com/uaam/api/"

var APIurl = "https://phpmigrationapi.bexatm.com/uaam/api/"
var baseurl = "https://phpmigrationapi.bexatm.com/"
 
const initialState = {
   name : 'Uaam',
    listViewurl :APIurl+ 'wslistview_mysql.php',
    loginUrl:APIurl+ 'LController.php',
    comboUrl:APIurl+ 'APIController.php',
    apiUrl :APIurl+ 'APIController.php',
    imgUploadUrl:baseurl +'imgup.php',
    imageUrl:baseurl +'uploads/images/',
    imageNameUpdateUrl:APIurl+ 'CMController.php',
    attachmentUrl:baseurl +'uploads/attachments/',
    custprodattachmentUrl:baseurl +'uploads/custimage/',
    fileUploadUrl:baseurl +'fileupload.php',   
    SalesfileuploadUrl: APIurl+ 'CsvppController.php',
     
    dcissueGetUrl:APIurl+ 'DcDetailQuanitySplitUpGetController.php',
    dcissueUrl:APIurl+ 'DcDetailQuanitySplitUpController.php',
    csvUploadUrl:APIurl+ 'csvupload.php',
   
    pcdurl:APIurl+ 'PCDController.php',
    pdfurl:baseurl +'tcpdf/',
    indentUrl:APIurl+ 'IndentController.php',
    invoiceUrl:APIurl+ 'InvoiceController.php',
    commonUrl : APIurl+ 'CommonController.php',
    bomCopyUrl: APIurl+ 'VersioningController.php',
    bomHeaderUrl: APIurl+ 'BOMController.php',
    stockUrl:APIurl+ 'StockController.php',
    batchUrl:APIurl+ 'BatchstructureController.php',
    finalinvUrl:APIurl+ 'FinalInvoiceController.php',
    proformainvUrl:APIurl+ 'ProfoinvoiceController.php',
    orderUrl:APIurl+ 'CustomerOrder.php',
    stockReqUrl:APIurl+ 'StockRequirement.php',
    productUrl:APIurl+ 'StockProcedure.php',
    bomLkUrl:APIurl+ 'InvoiceBomLkController.php',
    designPUrl:APIurl+ 'UomconversiongetController.php',
    costingMatrialUrl:APIurl+ 'BomcostController.php?',
    conversionUrl:APIurl+ 'UomconversiongetController.php',
    userGroupUrl:APIurl+ 'GroupaccessController.php',
    dcTrackingUrl:APIurl+ 'DctrackingController.php',
    trackingUrl:APIurl+ 'MaterialtrackingController.php',
    supplierTrackUrl:APIurl+ 'SuppliertrackingController.php',
   
    materialsTrackingUrl:APIurl+ 'MaterialTrackingChartNew.php',
    supplytrackingUrl:APIurl+ 'SupplierTrackingChart.php',
    producttrackingUrl:APIurl+ 'ProductpriceController.php?',
    pIndentUrl:APIurl+ 'PurchaseIndentController.php',
    prdCardBthUrl:APIurl+ 'PrdBatchIssueController.php',
    customerorderanalysisUrl:APIurl+ 'CustomerOrderChart.php?',
    prductorderanalysisUrl:APIurl+ 'ProductOrderChart.php?',
    mailContentGeturl:APIurl+ 'EmailController.php',
    mailSendUrl:APIurl+ 'invoicemail.php',
    materialUomCovUrl:APIurl+ 'MaterialUOMConversionController.php',
    decryptUrl:APIurl+ 'HashtokenController.php',
    costingLeatherUrl:APIurl+ 'BomLeathercost.php',
    customerLeatherUrl:APIurl+ 'CustomerLeatherController.php',
    dcsummaryUrl:APIurl+ 'getdcsummary.php',
     dcpostsummaryUrl:APIurl+ 'postdcsummary.php',
     getempdeploymentUrl:APIurl+ 'getempdeployment.php?',
     postempdeployment:APIurl+ 'postempdeployment.php?',
     matProcurementUrl:APIurl+ 'MaterialProcurementChart.php',
     stockorderUrl:APIurl+ 'MaterialOrderReportController.php',
     salesAnalysisUrl:APIurl+ 'Salesanalysisbymaterial.php',
     purchaseAnalysisUrl:APIurl+ 'Purchaseanalysisbymaterial.php',
     CashFlowSalesAnalysisUrl:APIurl+ 'Salesanalysisbycost.php',
     BlockWiseDCControllerurl:APIurl+ 'BlockWiseDCController.php',
     
     materiallatestpriceUrl:APIurl+ 'PostMaterialrate.php',
     employeeattendanceUrl:APIurl+ "getempattendancehistory.php",
     attendanceUrl:APIurl+ "getempattendance.php",
    
     stockanalyticsUrl:APIurl+ "SalesAnalyticsController.php",
     productwiseChartUrl:APIurl+ "NewChartProductWiseSalesController.php",
     ProductInterfaceUrl:APIurl+ "tr221_get.php",
     materialrateUrl:APIurl+ "MaterialRateAnalysisController.php",
     consumptionUrl:APIurl+ "RequirementConsumptionController.php",
      locationManualUrl: APIurl+ "ManualSaleLocationController.php",
      inchargeManualUrl: APIurl+ "ManualSaleEmployeeNameController.php",
      ProductcatUrl: APIurl+ "ManualDetailProductCatgController.php",
      subCheckUrl: APIurl+ "SubscriptionRenewalController.php",
      SubIdGetUrl: APIurl+ "SubscriptionIdGetController.php",
      trailCompanyUrl: APIurl+ "TrialCompanyPostController.php",

  };

export const getUrlSlice = createSlice({
  name: "globalurl",
  initialState,
  reducers: {},
});

export default getUrlSlice.reducer;

