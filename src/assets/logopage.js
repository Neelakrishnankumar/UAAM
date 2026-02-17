import React from "react";
import BexATMLogo from "../assets/img/BexATM.png";
import { Typography } from "@mui/material";

const Logopage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* <img src="/Newlogo.png" alt="Logo" style={{ width: "400px", height: "auto" }} /> */}
      <img
        src={BexATMLogo}
        alt="Logo"
        style={{ width: "400px", height: "auto" }}
      />
      <Typography variant="h6" sx={{fontWeight:"600"}}>Version 1.0</Typography>
    </div>
  );
};

export default Logopage;
