"use client";

import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        textAlign: "center",
        py: 3,
      mt: "auto",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </Typography>
    </Box>
  );
}


