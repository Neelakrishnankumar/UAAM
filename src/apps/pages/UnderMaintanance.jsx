import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";

const UnderMaintenance = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f4f6f8",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          maxWidth: 500,
          textAlign: "center",
          borderRadius: 4,
        }}
      >
        <BuildIcon sx={{ fontSize: 80, color: "primary.main", mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Under Maintenance
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Our site is currently under maintenance.  
          We're working hard to improve your experience.  
          Please check back later.
        </Typography>
        {/* <Button
          variant="contained"
          color="primary"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </Button> */}
      </Paper>
    </Box>
  );
};

export default UnderMaintenance;
