"use client";

import { products } from '../../lib/products'
import ProductCard from '../../components/main/ProductCard';
import { Grid, Container } from "@mui/material";

export default function HomePage() {
    return (
        <Container sx={{ py: 4,px: 2 }}>
            <Grid container spacing={4}>
                {
                    products.map((item) => (
                          <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
                            <ProductCard product={item} />
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    )
}