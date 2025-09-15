"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { addToCart,decreaseQuantity} from "../../../store/cartSlice";
import { Box, Button, Typography, Card, CardContent, Grid } from "@mui/material";

export default function CartPage() {
  const cartItems =useSelector((state:RootState)=>state.cart.items)
  const dispatch = useDispatch<AppDispatch>();

  const totalPrice = cartItems.reduce(
    (total, item) => Math.round(total + item.price * item.quantity),
    0
  );

  return (
    <Box display="flex" gap={4} p={4}>
      {/* Left: Cart Items */}
      <Box flex={2}>
        <Typography variant="h4" mb={2}>Your Cart</Typography>
        <Grid container spacing={2}>
          {cartItems.map((item) => (
            <Grid size={{ xs: 12 }} key={item.id}>
              <Card>
                <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2">₹{item.price}</Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <Button
                      variant="outlined"
                      size="small"
                       onClick={() => dispatch(decreaseQuantity(item.id))}
                    >-</Button>

                    <Typography>{item.quantity}</Typography>

                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))}
                    >+</Button>
                  </Box>

                  <Typography>₹{Math.round(item.price * item.quantity)}</Typography>

                  <Button
                    color="error"
                    // onClick={() => dispatch(removeFromCart(item.id))}
                  >Remove</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Right: Total */}
      <Box flex={1} border="1px solid #ddd" borderRadius={2} p={3} height="fit-content">
        <Typography variant="h5">Summary</Typography>
        <Typography mt={2}>Total Items: {cartItems.length}</Typography>
        <Typography mt={1}>Total Price: ₹{totalPrice}</Typography>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
}
