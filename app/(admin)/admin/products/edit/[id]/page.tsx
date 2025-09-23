"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { TextField, Button, Box, Typography } from "@mui/material";
import { getProductById, updateProductById } from "@/lib/api";

// Example Product type (adjust fields as per your DB schema)
interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

export default function EditProductPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch product by ID (replace with your API)
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // 👉 Replace with your API call
                const getProduct = await getProductById(id);
                setProduct(getProduct.data);
            } catch (err) {
                console.error("Failed to load product", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    // Handle form input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct((prev) =>
            prev ? { ...prev, [e.target.name]: e.target.value } : prev
        );
    };

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product) return;

        try {
            await updateProductById(id, product)
            router.push("/admin/products"); // Redirect back to list
        } catch (err) {
            console.error("Update failed", err);
            alert("Failed to update product");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!product) return <p>Product not found.</p>;

    return (
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Edit Product
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Product Name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Price"
                    name="price"
                    type="number"
                    value={product.price}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Description"
                    name="description"
                    multiline
                    rows={4}
                    value={product.description}
                    onChange={handleChange}
                />

                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Save Changes
                </Button>
            </form>
        </Box>
    );
}
