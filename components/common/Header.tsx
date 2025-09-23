"use client";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { Box, Button, Typography, AppBar, Toolbar, IconButton, Badge } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Header() {
  const items = useSelector((state: RootState) => state.cart.items)
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{ flexGrow: 1, color: "inherit", textDecoration: "none" }}
        >
          Ecommerce
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <IconButton color="inherit" component={Link} href="/cart">
            <Badge badgeContent={items.length} color="error">

              <ShoppingCartIcon />
            </Badge>
            <Typography>Cart</Typography>
          </IconButton>
             <Button color="inherit" component={Link} href="/admin">
            Admin
          </Button>
          <Button color="inherit" component={Link} href="/login">
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
