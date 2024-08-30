import React from "react";
import { Routes, Route } from "react-router-dom";
import Apps from "./apps/Apps";
// import Forgotpassword from './apps/Security/Forgotpassword';
import Login from "./apps/Security/Login";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./apps/pages/pdf/pdf";

const App = () => {
  const location = useLocation();
  // console.log("🚀 ~ file: App.js:14 ~ App ~ location:", location)
  if (location.pathname === "/") {
    window.history.pushState(null, document.title, "#");
  }
  return (
    <React.Fragment>
      {/* <ToastContainer position="top-center" theme="colored"/> */}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="/Apps/*" element={<Apps />} />
        {/* <Route path="/pdf" element={<PDFViewer width={"100%"} height={"900px"}><MyDocument/> </PDFViewer>}/> */}
        {/* <Route path="/pdf" element={<MyDocument/> }/> */}
      </Routes>


        {/* <Route path="/Apps/Forgotpassword" element={<Forgotpassword/>} /> */}
    </React.Fragment>
  );
};

export default App;
