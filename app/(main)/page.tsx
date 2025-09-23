"use client";

import ProductCard from '../../components/main/ProductCard';
import { Grid, Container } from "@mui/material";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { getAllProducts } from '@/lib/api';
import { Product } from '@/types';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
      useEffect(() => {
        const fetchData = async () => {
          let getProducts = await getAllProducts()
          setProducts(getProducts.products)
        }
        fetchData()
    
      }, []);
    return (
        
        <Container sx={{ py: 4,px: 2 }}>
            <Grid container spacing={4}>
                {
                    products.map((item) => (
                          <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Link key ={item.id} href={`/products/${item.id}`}><ProductCard product={item} /></Link>
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    )
}