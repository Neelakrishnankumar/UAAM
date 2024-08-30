import { ColorModeContext, useMode } from "../Theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Sidebars from "../ui-components/global/Sidebar";
import React from "react";
import Changepassword from "./Security/Changepassword";
import Listview from "./pages/Listview";
import { useParams } from "react-router-dom";
import Productdetail from "./pages/Inventory/Productdetail";
import Editmaterialcategory from "./pages/Inventory/Editmaterialcategory";
import Editproductcategory from "./pages/Inventory/Editproductcategory";
import Imageupload from "./pages/Imageupload";
import Chartboard from "./pages/Chart";
import Editcustomermaster from "./pages/Masters/Editcustomermaster";
// import Editbom from './pages/Masters/Editbom';
import Editsupplymaster from "./pages/Masters/Editsupplymaster";
import Editprocess from "./pages/Masters/Editprocess";
import Editemployee from "./pages/HR/Editemployees";
import Edituom from "./pages/Masters/Edituoms";
import Edituomconversion from "./pages/Masters/Edituomconversion";
import Editdept from "./pages/HR/Editdept";
import Edittaxmaster from "./pages/Masters/Edittaxmaster";
import Editcurrency from "./pages/Masters/Editcurrency";
import Editcolorshades from "./pages/Masters/Editcolorshades";
import Editcountry from "./pages/Masters/Editcountry";
import Editleathermaster from "./pages/Masters/Editleathermaster";
import Editairlines from "./pages/Masters/Editairlines";
import Editproformainvoice from "./pages/Trascation/Editproformainvoice";
import Editmatrial from "./pages/Inventory/Editmaterial";
import ListviewSecondary from "./pages/Secondarylistview";
import Editdesignpattern from "./pages/Masters/Editdesignpattern";
import Editremarks from "./pages/Masters/Editremarks";
import Editindentorder from "./pages/Inventory/Editindentorder";
import Editdeliverychalan from "./pages/Masters/Editdeliverychalan";
import Editcustomerorder from "./pages/Masters/Editcustomerorder";
import Editgrade from "./pages/Masters/Editgrade";
import Editsubstance from "./pages/Masters/Editsubstance";
import Editopeningstock from "./pages/Masters/Editopeningstock";
import Editcompany from "./pages/Masters/Editcompany";
import Editbankmasters from "./pages/Masters/Editbankmasters";
import Editissue from "./pages/Masters/Editissue";
import NotFound from "./Security/NotFound";
import Editstock from "./pages/Masters/Editstock";
import Bomproduct from "./pages/Inventory/Bom";
import Editproductstock from "./pages/Masters/Editproductstock";
import Editbatch from "./pages/Inventory/Editbatch";
import Editbatchcompletion from "./pages/Inventory/Editbatchcompletion";
import Editbatchissue from "./pages/Inventory/Editbatchissue";
import Editworkingprocess from "./pages/Trascation/Editworkinprocess";
import TimeLine from "./pages/Trascation/Timeline";
import Editindcoutdc from "./pages/Masters/Editoutdcindc";
import { MyProSidebarProvider } from "../ui-components/global/sideBarContext";
import Editlocalinvoce from "./pages/Trascation/Editlocalinvoce";
import Editpackinglist from "./pages/Trascation/Editpackinglist";
import Editpacking from "./pages/Trascation/Editpacking";
import Editproduct from "./pages/Inventory/Editproduct";
import Editfinance from "./pages/FinanceModule/Editfinance";
import Editoverhead from "./pages/FinanceModule/Editoverhead";
import Editcosting from "./pages/FinanceModule/Editcosting";
import Edituser from "./pages/security1/Edituser";
import Editusergroup from "./pages/security1/Editusergroup";
import EditHsn from "./pages/Masters/EditHsn";
import Editreport from "./pages/Masters/Editreport";
import Editpurchaseindent from "./pages/Masters/Editpurchaseindent";
import Editproducttracking from "./pages/Masters/Editproducttracking";
import Editproduction from "./pages/Masters/Editproduction";
import Editcustomerlinechart from "./pages/Masters/Editcustomerlinechart";

import Editassorted from "./pages/Trascation/Editassorted";
import ProductAnalysis from "./pages/Trascation/ProductAlaysis";
import Editcolor from "./pages/Masters/Editcolor";
import Editcolorcustomer from "./pages/Masters/Editcolorcustomer";
import Editbom from "./pages/Inventory/Editbom";
import Editfunction from "./pages/HR/Editfunction";
import Editdesignation from "./pages/HR/Editdesignation";
import Editcheckin from "./pages/Empolyee/Editchechin";
import Editcheckout from "./pages/Empolyee/Editcheckout";
import Editlocation from "./pages/Masters/Editlocation";
import Editgate from "./pages/Masters/Editgate";
import Editbin from "./pages/Masters/Editbin";
import Editproject from "./pages/HR/Editproject";

import EditDailytask from "./pages/Empolyee/Editdailytask";

import EditDailyHourstask from "./pages/Empolyee/EditDailyHourTask";
import Editfixedassettype from "./pages/FinanceModule/Editfixedassettype";
import Editfixedassetcategory from "./pages/FinanceModule/Editfixedassetcategory";
import Editfixedasset from "./pages/FinanceModule/Editfixedasset";
import EditEmpCheckin from "./pages/Empolyee/EditEmpCheckin";
import EditEmpCheckout from "./pages/Empolyee/EditEmpCheckout";
import Editstockcare from './pages/Inventory/Editstockcare';
import Editpriceofothercustomer from "./pages/FinanceModule/Editpriceofothercustomer";
import EditEmpfinance from "./pages/Empolyee/EditEmpfinance";
import Editpostshipment from "./pages/Trascation/Editpostshipment";
import Editjobworkcategory from "./pages/Inventory/Editjobworkcategory";
import EditJobwork from "./pages/Inventory/EditJobwork";


import Editinspection from "./pages/Inventory/Editinspection";
import Editpurchaseorder from "./pages/FinanceModule/Editpurchaseorder";
 import Editpurchaseorderopen from "./pages/FinanceModule/Editpurchaseorderopen";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./pages/pdf/pdf";
import EditPurchaseOrderParameter from "./pages/Masters/EditrPurchaseOrderParameter";
// import Editcostingnew from "./pages/FinanceModule/Editproductcosting";
 import EditSalaryComponent from "./pages/Empolyee/EditSalaryComponent";
 import EditSatuaryComponent from "./pages/Empolyee/EditSatuaryComponent";
 import EditemployeePayroll from "./pages/Empolyee/EditemployeePayroll";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* <Sidebars/> */}
          <MyProSidebarProvider>
            <div style={{ height: "100%", width: "100%" }}>
              <main className="content">
                {/* <Topbar Tittle={screenName} /> */}

                <Routes>
                <Route path="/:accessID/:screenName/EditEmployeePayroll/:id/:Mode" element={ <EditemployeePayroll/>}/>
                <Route
                    path="/:accessID/:screenName/EditSalary Component/:id/:Mode"
                    element={<EditSalaryComponent/>}
                  />
                                   <Route
                    path="/:accessID/:screenName/EditSatuary Component/:id/:Mode"
                    element={<EditSatuaryComponent />}
                  />
                  <Route path="/:accessID/:screenName" element={<Listview />} />
                  <Route path="/pdf" element={<MyDocument/> }/>
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:filtertype/:Number/:Desc/all-bom/:bomproductid/EditList of BOM/:id/:mode"
                    element={<Editbom />}
                  />

                  {/* <Route path="/Secondarylistview/:accessID/:screenName/:headerid/:Type/EditProduct Master/:id/:Mode" element={ <Productdetail/>}/> */}
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:headerid/:Type/EditProduct Master/:id/:Mode"
                    element={<Editproduct />}
                  />
                  {/* <Route path="/Secondarylistview/:accessID/:screenName/:productid/EditList of BOM/:id/:Mode" element={ <Bomproduct/>}/> */}
                  <Route
                    path="/:accessID/:screenName/EditCategories/:id/:Mode"
                    element={<Editproductcategory />}
                  />
                   <Route
                    path="/:accessID/:screenName/EditJobwork Category/:id/:Mode"
                    element={<Editjobworkcategory />}
                  />
                   <Route
                    path="/:accessID/:screenName/EditJob-Work/:id/:Mode"
                    element={<EditJobwork />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:Type/EditMaterial Category/:id/:Mode"
                    element={<Editmaterialcategory />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:filtertype/:invoiceType/EditLocal Invoice/:id/:Mode"
                    element={<Editlocalinvoce />}
                  />
                  <Route path="/changepassword" element={<Changepassword />} />
                  <Route
                    path="/:screenName/imageupload/:accessID/:id"
                    element={<Imageupload />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:Type/EditMaterial Category/imageupload/:id"
                    element={<Imageupload />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:parentID/:Type/:parentName/:SearchPhrase/imageupload/:id"
                    element={<Imageupload />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:parentID/:parentName/imageupload/:id"
                    element={<Imageupload />}
                  />
                  <Route path="/Chart" element={<Chartboard />} />
                  <Route
                    path="/:accessID/Editproductstock/:id/:Code/:Desc/:Mode"
                    element={<Editproductstock />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:stckid/:filtertype/:Desc/:searchPharse/pm/Editstock/:id/:Mode"
                    element={<Editstock />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditBOMS/:id/:Mode"
                    element={<Editbom />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditCustomers/:id/:Mode/:show"
                    element={<Editcustomermaster />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:Type/:Desc/Editprocess/:id/:Mode"
                    element={<Editprocess />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditSuppliers/:id/:Mode"
                    element={<Editsupplymaster />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditBank/:id/:Mode"
                    element={<Editbankmasters />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditCompany/:id/:Mode"
                    element={<Editcompany />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditEmployees/:id/:Mode"
                    element={<Editemployee />}
                  />
                          <Route 
                          path="/:accessID/:screenName/EditEmpfinance entry/E/:RecordID/:Name" 
                          element={ <EditEmpfinance/>}/>
                  <Route
                    path="/:accessID/:screenName/EditUOM/:id/:Mode"
                    element={<Edituom />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditUOM Conversion/:id/:Mode"
                    element={<Edituomconversion />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditDepartment/:id/:Mode"
                    element={<Editdept />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditTax Master/:id/:Mode"
                    element={<Edittaxmaster />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditCurrency/:id/:Mode"
                    element={<Editcurrency />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:parentrecID/:materialType/EditColors/:id/:Mode"
                    element={<Editcolorshades />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:parentrecID/:materialType/:colorShade/EditColors-customer/:id/:Mode"
                    element={<Editcolorcustomer />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:materialType/EditColors/:id/:Mode"
                    element={<Editcolor />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditCountry/:id/:Mode"
                    element={<Editcountry />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditLeather Master/:id/:Mode"
                    element={<Editleathermaster />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditAirlines/:id/:Mode"
                    element={<Editairlines />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditDesign Pattern/:id/:Mode"
                    element={<Editdesignpattern />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditGrade/:id/:Mode"
                    element={<Editgrade />}
                  />
                    <Route
                    path="/:accessID/:screenName/EditPaurchase Order Parameter/:id/:Mode"
                    element={<EditPurchaseOrderParameter />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditSubstance/:id/:Mode"
                    element={<Editsubstance />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:filtertype/EditUOM/:id/:Mode"
                    element={<Edituom />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:filtertype/:invFilter/EditProforma Invoice/:id/:Mode"
                    element={<Editproformainvoice />}
                  />
                   <Route
                    path="/Secondarylistview/:accessID/:screenName/:filtertype/:invFilter/Editpostshipment/:id/:Mode"
                    element={<Editpostshipment />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:headerid/:filtertype/:Desc/:searchPharse/pm/EditList of Materials/:id/:Mode"
                    element={<Editmatrial />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:filtertype/:secondaryAccessID/:parentRecID/DC/:remarkType/:remarkDec/EditDelivery Chalan/:id/:Mode"
                    element={<Editdeliverychalan />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditCustomer Order/:id/:Mode"
                    element={<Editcustomerorder />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:filtertype"
                    element={<ListviewSecondary />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:filtertype/EditRemarks/:id/:Mode"
                    element={<Editremarks />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:filtertype/EditFinancial Year/:id/:yearid/:Mode"
                    element={<Editopeningstock />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:PcdhRecordID/:Number/:Decs/EditIssue/:id/:MaterialDescription/:ItemType/:HeaderQty/:Mode"
                    element={<Editissue />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:filtertype/:Number"
                    element={<ListviewSecondary />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:filtertype/:Number/:Desc"
                    element={<ListviewSecondary />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:filtertype/:Number/:Desc/all-bom/:bomproductid"
                    element={<ListviewSecondary />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:filtertype/:Number/:Desc/:searchPharse/pm"
                    element={<ListviewSecondary />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:filtertype/:CusID/:secondaryAccessID/:InvoiceName/:InvType"
                    element={<ListviewSecondary />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:filtertype/:Desc/EditProforma%20Invoice/:id/:Mode/Editworkinprocess/:productID/:proformaID/:bomID/:proformaRecid"
                    element={<ListviewSecondary />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:filtertype/:invFilter/EditProforma Invoice/:id/:Mode/Timeline/:RecordID"
                    element={<TimeLine />}
                  />
                  <Route path="*" element={<NotFound />} />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:Type/EditBATCHS/:id/:Mode"
                    element={<Editbatch />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:Type/Editbatchcompletion/:id/:Mode"
                    element={<Editbatchcompletion />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:Type/Editbatchissue/:id/:Mode"
                    element={<Editbatchissue />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:Type/Editbatchissue/:id/:Mode/:Edit"
                    element={<Editbatchissue />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:filtertype/:invFilter/EditProforma Invoice/:id/:Mode/Editworkinprocess/:productID/:proformaID/:bomID/:proformaRecid/E"
                    element={<Editworkingprocess />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditStock Enquiry/:id/:Mode"
                    element={<Editindcoutdc />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:Type/EditPacking List/:id/:Mode"
                    element={<Editpackinglist />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:Type/EditAssorted/:id/:Mode"
                    element={<Editassorted />}
                  />
                  {/* <Route path="/:accessID/:screenName/EditPacking List/:id/:Mode" element={ <Editpackinglist/>}/> */}
                  <Route
                    path="/:accessID/:screenName/EditLeather Packing List/:id/:Mode"
                    element={<Editpacking />}
                  />
                   <Route
                    path="/:accessID/Production Card/EditInspection Form/:id"
                    element={<Editinspection />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditOver Head/:id/:Mode"
                    element={<Editoverhead />}
                  />
                   <Route
                    path="/:accessID/:screenName/EditIndent Purchase Order/:id/:Mode"
                    element={<Editpurchaseorder />}
                  />
                      <Route
                    path="/:accessID/:screenName/EditOpen Purchase Order/:id/:Mode"
                    element={<Editpurchaseorderopen />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:parentID/:filtertype/EditFinance Entry/:id/:Mode"
                    element={<Editfinance />}
                  />
                  {/* <Route
                    path="/:accessID/:screenName/EditCosting/:id/:Mode"
                    element={<Editcosting />}
                  /> */}
                  <Route
                    path="/:accessID/:screenName/price-of-other-customer/:id"
                    element={<Editpriceofothercustomer />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditUser/:id/:Mode"
                    element={<Edituser />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:companyRecID/EditUsergroups/:id/:Mode"
                    element={<Editusergroup />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditHSN/:id/:Mode"
                    element={<EditHsn />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:filtertype/:secondaryAccessID/:parentRecID/DC/:remarkType/:remarkDec"
                    element={<ListviewSecondary />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenNamePre/:filtertype/:prdNumber/:secondaryAccessID/:screenName/PC/:remarkType/:remarkDec"
                    element={<ListviewSecondary />}
                  />
                  <Route 
                    path="/Secondarylistview/:accessID/:screenName/:productID/:productDescription/:customerID/costing-product/:bomVersion/:bomID/:secondaryAccessID"
                    element={<ListviewSecondary />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:productID/:productDescription/:customerID/costing-product/:bomVersion/:bomID/:secondaryAccessID/:FirstLeatherID/EditCosting/:id/:Mode"
                    element={<Editcosting />}
                  />
                   <Route
                    path="/TR140/Customer-Product/EditCustomer-Product/:id/:Mode"
                    element={<Editcosting />}
                  />
                   {/* <Route
                    path="/TR140/Customer-Product/EditCustomer-Product-new/:id/:Mode"
                    element={<Editcostingnew />}
                  /> */}
                  <Route
                    path="/:accessID/:screenName/EditReport/:id/:Mode"
                    element={<Editreport />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:supplierID/:parenid/:prdCardNo/:Type/EditIndent Order/:id/:Mode"
                    element={<Editindentorder />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:supplierID/:parentid/:prdCardNo/:Type/EditMaterial IndentOrder/:id/:Mode"
                    element={<Editpurchaseindent />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditProduct Tracking/:id/:Mode"
                    element={<Editproducttracking />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:filtertype/:Number/:orderQuantity/:prdaccessID/EditProduction"
                    element={<Editproduction />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditProduction/:id/:Mode"
                    element={<Editproduction />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditCustomer Line Chart/:id/:Mode"
                    element={<Editcustomerlinechart />}
                  />
                  {/* <Route path="/:accessID/:screenName/EditProduct Line Chart/:id/:Mode" element={ <Editproductlinechart/>}/> */}
                  <Route
                    path="product-analysis/:id/:Mode"
                    element={<ProductAnalysis />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditFunctions/:id/:Mode"
                    element={<Editfunction />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditDesignation/:id/:Mode"
                    element={<Editdesignation />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditCheck In/:id/:Mode"
                    element={<Editcheckin />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:parentID/EditCheck In/:id/:Mode"
                    element={<Editcheckin />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditCheck Out/:id/:Mode"
                    element={<Editcheckout />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:parentID/EditCheck Out/:id/:Mode"
                    element={<EditEmpCheckout/>}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:filtertype/EditLocation/:id/:Mode"
                    element={<Editlocation />}
                  />
                  <Route path="/Secondarylistview/:accessID/:screenName/:Type/stock-care-by" element={ <Editstockcare/>}/>
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:filtertype/:parentID/EditGate Entry/:id/:Mode"
                    element={<Editgate />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:filtertype/:parentID/EditBins/:id/:Mode"
                    element={<Editbin />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:conscreenName/:filtertype/EditDailyTask/:id/:Mode"
                    element={<EditDailytask />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:filtertype/:parentID/EditDaily Hour Task/:id/:Mode"
                    element={<EditDailyHourstask />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditFixed Asset Type/:id/:Mode"
                    element={<Editfixedassettype />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:filtertype/EditFixed Assets Category/:id/:Mode"
                    element={<Editfixedassetcategory />}
                  />
                  <Route
                    path="/Secondarylistview/:accessID/:screenName/:filtertype/:parentID/EditFixed Assets/:id/:Mode"
                    element={<Editfixedasset />}
                  />
                  <Route
                    path="/:accessID/:screenName/EditProject/:id/:Mode"
                    element={<Editproject />}
                  />
                </Routes>
              </main>
            </div>
          </MyProSidebarProvider>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
