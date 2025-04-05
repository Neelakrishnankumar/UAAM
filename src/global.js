import { createSlice } from "@reduxjs/toolkit";



const initialState = {
   name : 'Uaam',

    listViewurl :'https://uaam.beyondexs.com/api/wslistview_mysql.php',
    loginUrl:'https://uaam.beyondexs.com/api/LController.php',
    comboUrl:'https://uaam.beyondexs.com/api/APIController.php',
    apiUrl :'https://uaam.beyondexs.com/api/APIController.php',
    imgUploadUrl:'https://uaam.beyondexs.com/imgup.php',
    imageUrl:'https://uaam.beyondexs.com/uploads/images/',
    imageNameUpdateUrl:'https://uaam.beyondexs.com/api/CMController.php',
    attachmentUrl:'https://uaam.beyondexs.com/uploads/attachments/',
    custprodattachmentUrl:'https://uaam.beyondexs.com/uploads/custimage/',
    fileUploadUrl:'https://uaam.beyondexs.com/fileupload.php',

    SalesfileuploadUrl: 'https://uaam.beyondexs.com/api/CsvppController.php',
     
    dcissueGetUrl:'https://uaam.beyondexs.com/api/DcDetailQuanitySplitUpGetController.php',
    dcissueUrl:'https://uaam.beyondexs.com/api/DcDetailQuanitySplitUpController.php',
    csvUploadUrl:'https://uaam.beyondexs.com/api/csvupload.php',
   
    pcdurl:'https://uaam.beyondexs.com/api/PCDController.php',
    pdfurl:'https://uaam.beyondexs.com/tcpdf/',
    indentUrl:'https://uaam.beyondexs.com/api/IndentController.php',
    invoiceUrl:'https://uaam.beyondexs.com/api/InvoiceController.php',
    commonUrl : 'https://uaam.beyondexs.com/api/CommonController.php',
    bomCopyUrl: 'https://uaam.beyondexs.com/api/VersioningController.php',
    bomHeaderUrl: 'https://uaam.beyondexs.com/api/BOMController.php',
    stockUrl:'https://uaam.beyondexs.com/api/StockController.php',
    batchUrl:'https://uaam.beyondexs.com/api/BatchstructureController.php',
    finalinvUrl:'https://uaam.beyondexs.com/api/FinalInvoiceController.php',
    proformainvUrl:'https://uaam.beyondexs.com/api/ProfoinvoiceController.php',
    orderUrl:'https://uaam.beyondexs.com/api/CustomerOrder.php',
    stockReqUrl:'https://uaam.beyondexs.com/api/StockRequirement.php',
    productUrl:'https://uaam.beyondexs.com/api/StockProcedure.php',
    bomLkUrl:'https://uaam.beyondexs.com/api/InvoiceBomLkController.php',
    designPUrl:'https://uaam.beyondexs.com/api/UomconversiongetController.php',
    costingMatrialUrl:'https://uaam.beyondexs.com/api/BomcostController.php?',
    conversionUrl:'https://uaam.beyondexs.com/api/UomconversiongetController.php',
    userGroupUrl:'https://uaam.beyondexs.com/api/GroupaccessController.php',
    dcTrackingUrl:'https://uaam.beyondexs.com/api/DctrackingController.php',
    trackingUrl:'https://uaam.beyondexs.com/api/MaterialtrackingController.php',
    supplierTrackUrl:'https://uaam.beyondexs.com/api/SuppliertrackingController.php',
   
    materialsTrackingUrl:'https://uaam.beyondexs.com/api/MaterialTrackingChartNew.php',
    supplytrackingUrl:'https://uaam.beyondexs.com/api/SupplierTrackingChart.php',
    producttrackingUrl:'https://uaam.beyondexs.com/api/ProductpriceController.php?',
    pIndentUrl:'https://uaam.beyondexs.com/api/PurchaseIndentController.php',
    prdCardBthUrl:'https://uaam.beyondexs.com/api/PrdBatchIssueController.php',
    customerorderanalysisUrl:'https://uaam.beyondexs.com/api/CustomerOrderChart.php?',
    prductorderanalysisUrl:'https://uaam.beyondexs.com/api/ProductOrderChart.php?',
    mailContentGeturl:'https://uaam.beyondexs.com/api/EmailController.php',
    mailSendUrl:'https://uaam.beyondexs.com/api/invoicemail.php',
    materialUomCovUrl:'https://uaam.beyondexs.com/api/MaterialUOMConversionController.php',
    decryptUrl:'https://uaam.beyondexs.com/api/HashtokenController.php',
    costingLeatherUrl:'https://uaam.beyondexs.com/api/BomLeathercost.php',
    customerLeatherUrl:'https://uaam.beyondexs.com/api/CustomerLeatherController.php',
    dcsummaryUrl:'https://uaam.beyondexs.com/api/getdcsummary.php',
     dcpostsummaryUrl:'https://uaam.beyondexs.com/api/postdcsummary.php',
     getempdeploymentUrl:'https://uaam.beyondexs.com/api/getempdeployment.php?',
     postempdeployment:'https://uaam.beyondexs.com/api/postempdeployment.php?',
     matProcurementUrl:'https://uaam.beyondexs.com/api/MaterialProcurementChart.php',
     stockorderUrl:'https://uaam.beyondexs.com/Api/MaterialOrderReportController.php',
     salesAnalysisUrl:'https://uaam.beyondexs.com/api/Salesanalysisbymaterial.php',
     purchaseAnalysisUrl:'https://uaam.beyondexs.com/api/Purchaseanalysisbymaterial.php',
     CashFlowSalesAnalysisUrl:'https://uaam.beyondexs.com/api/Salesanalysisbycost.php',
     BlockWiseDCControllerurl:'https://uaam.beyondexs.com/api/BlockWiseDCController.php',
     
     materiallatestpriceUrl:'https://uaam.beyondexs.com/api/PostMaterialrate.php',
     employeeattendanceUrl:"https://uaam.beyondexs.com/api/getempattendancehistory.php",
     attendanceUrl:"https://uaam.beyondexs.com/api/getempattendance.php",
    
     stockanalyticsUrl:"https://uaam.beyondexs.com/api/SalesAnalyticsController.php",
     productwiseChartUrl:"https://uaam.beyondexs.com/api/NewChartProductWiseSalesController.php",
     ProductInterfaceUrl:"https://uaam.beyondexs.com/api/tr221_get.php",
     materialrateUrl:"https://uaam.beyondexs.com/api/MaterialRateAnalysisController.php",
     consumptionUrl:"https://uaam.beyondexs.com/api/RequirementConsumptionController.php",
      locationManualUrl: "https://uaam.beyondexs.com/api/ManualSaleLocationController.php",
      inchargeManualUrl: "https://uaam.beyondexs.com/api/ManualSaleEmployeeNameController.php",
      ProductcatUrl: "https://uaam.beyondexs.com/api/ManualDetailProductCatgController.php",
      subCheckUrl: "https://uaam.beyondexs.com/api/SubscriptionRenewalController.php",
      SubIdGetUrl: "https://uaam.beyondexs.com/api/SubscriptionIdGetController.php",

  };

export const getUrlSlice = createSlice({
  name: "globalurl",
  initialState,
  reducers: {},
});

export default getUrlSlice.reducer;
