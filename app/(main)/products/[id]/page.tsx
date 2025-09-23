"use client"

import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { getProductById } from "@/lib/api";
import {
    Button,
    Container,
    Typography,
    Card,
    CardMedia,
    CardContent,
} from "@mui/material";
import { useEffect, useState } from "react";

const page = () => {
    const params = useParams()
    const router = useRouter();
    const dispatch = useDispatch()
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
               const id = params?.id as string | undefined;
            const data = await getProductById(id)
            setProduct(data)

        }
        fetchData()
    }, [])


    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, quantity: 1 }))
        router.push("/cart")
    }

      // ⛔ prevent rendering UI before product is loaded
  if (!product) {
    return <Container sx={{ py: 6 }}><Typography>Loading...</Typography></Container>;
  }

    return (
        <Container sx={{ py: 6 }}>
            <Card sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, p: 2 }}>
                <CardMedia
                    component="img"
                    image={product.productUrl}
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