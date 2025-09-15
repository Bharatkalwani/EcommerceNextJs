"use client"

import { useParams, useRouter } from "next/navigation";
import { products } from "../../../../lib/products";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";

import {
    Button,
    Container,
    Typography,
    Card,
    CardMedia,
    CardContent,
} from "@mui/material";



const page = () => {
    const params = useParams()
    const router = useRouter();
    const dispatch = useDispatch()
    const product = products.find((p) => p.id === params?.id);
    if (!product) {
        return null
    }

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, quantity: 1 }))
        router.push("/cart")
    }

    return (
        <Container sx={{ py: 6 }}>
            <Card sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, p: 2 }}>
                <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    sx={{ width: { xs: "100%", md: 400 }, borderRadius: 2 }}
                />
                <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h4" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        ₹{product.price}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4 }}>
                        {product.description}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={addToCartHandler}
                    >
                        Add to Cart
                    </Button>
                </CardContent>
            </Card>
        </Container>
    )
};

export default page;