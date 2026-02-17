import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useLocation, useParams } from "react-router-dom";

const NotificationPage = () => {
      const location = useLocation();
      if (location.pathname === "/approval/notification/T") {
        window.history.pushState(null, document.title, "#");
      }

      const params = useParams()
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f0f4f8"
    >
      <Card sx={{ p: 4, textAlign: "center", borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          <CheckCircleIcon sx={{ fontSize: 80, color: "green" }} />
          <Typography variant="h5" mt={2} fontWeight="bold">
             Company created successfully
            </Typography>
          {/* {params.status == "AP" &&
              <Typography variant="body1" mt={1} color="text.secondary">
            Submitted task has been successfully reviewed and approved.
          </Typography>} */}
        </CardContent>
      </Card>
    </Box>
  );
};

export default NotificationPage;
