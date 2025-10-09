"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { TextField, Button, Box, Typography } from "@mui/material";
import { getProductById, updateProductById } from "@/lib/api";
import { ProductFields } from '@/config/constant'
import { Product } from '@/types/index'
import CustomTextField from "@/shared/inputs/CustomInput";
import toast from "react-hot-toast";


export default function EditProductPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

   interface FormDataType {
        name: string
        price: number
        stock: number
        description: string
    }

    const [product, setProduct] = useState<FormDataType | null>({
        name: "",
        price: 0,
        stock: 0,
        description: "",
    });

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

    // Handle fo4rm submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product) return;

        try {
            await updateProductById(id, product)
            router.push("/admin/products");
            toast.success("Product Updated!");
        } catch (err) {
            console.error("Update failed", err);
            toast.error("Failed to update product!");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!product) return <p>Product not found.</p>;

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Edit Product
            </Typography>

            {
                ProductFields.map((item, index) => (
                    <CustomTextField
                        key={item.name}
                        required
                        label={item.label}
                        name={item.name}
                        // value={formData[item.name as keyof FormDataType]} //type assertion
                        onChange={handleChange}
                        fieldType="text"
                    />
                ))
            }

            

            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Update
            </Button>
        </Box>
    );
}
