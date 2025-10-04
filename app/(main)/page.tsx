"use client";

import ProductCard from '../../components/main/ProductCard';
import { Grid, Container, TextField } from "@mui/material";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { getAllProducts } from '@/lib/api';
import { Product } from '@/types';
import toast from "react-hot-toast";
import { useDebounce } from "@/hooks/useDebounce";

export default function HomePage() {
  const [search, setSearch] = useState<string>("")
  const [products, setProducts] = useState<Product[]>([]);
 const debouncedSearch = useDebounce(search, 500);
  console.log()
  useEffect(() => {
    const fetchData = async () => {
      let getProducts = await getAllProducts(1, 20, debouncedSearch)
      setProducts(getProducts.data.products)
      toast.success("Product fetched successfully!");
    }
    fetchData()

  }, [debouncedSearch]);
  
  
  return (
    <Container sx={{ py: 4, px: 2 }}>
      <TextField
        placeholder='Search Products'
        className=' w-full h-25'
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Grid container spacing={4}>
        {
          products.map((item) => (
            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Link key={item.id} href={`/products/${item.id}`}><ProductCard product={item} /></Link>
            </Grid>
          ))
        }
      </Grid>
    </Container>

  )
}