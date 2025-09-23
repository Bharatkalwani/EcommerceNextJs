"use client";

import { Grid, Paper, Typography } from "@mui/material";

export default function AdminDashboardPage() {
  // later you'll fetch these from your backend
  const totalUsers = 42;
  const totalProducts = 128;

  const stats = [
    { label: "Total Users", value: totalUsers },
    { label: "Total Products", value: totalProducts },
  ];

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid size ={{ xs: 12,sm:6,md:4 }}  key={stat.label}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: 3,
              }}
            >
              <Typography variant="h6" color="text.secondary">
                {stat.label}
              </Typography>
              <Typography variant="h3" color="primary" mt={2}>
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
