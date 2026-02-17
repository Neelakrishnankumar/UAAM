import React from "react";
import { Routes, Route } from "react-router-dom";
import Apps from "./apps/Apps";
import Login from "./apps/Security/Login";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./apps/pages/pdf/pdf";
import Trialcompany from "./apps/pages/CompanyTrail/Trailcompany";
import NotificationPage from "./ui-components/Notification";
import UnderMaintenance from "./apps/pages/UnderMaintanance";

const App = () => {
  const location = useLocation();
  if (location.pathname === "/") {
    window.history.pushState(null, document.title, "#");
  }
  return (
    <React.Fragment>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
         {/* <Route path="/*" element={<UnderMaintenance/>} /> */}
        <Route path="/*" element={<Login />} />
        <Route path="/Apps/*" element={<Apps />} />
        <Route path="/trial-company" element={<Trialcompany />} />
        <Route path="/trial-comapny" element={<Trialcompany />} />
           <Route path="/trial-company/notification" element={<NotificationPage/>} /> 
      </Routes>
    </React.Fragment>
  );
};

export default App;
