"use client";
import { addProduct } from "@/lib/api";
import { Box, Typography, Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";


const page = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        price: 0,
        stock: 0,
        description: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
         e.preventDefault();  
           console.log("add",formData)
          let saveProduct =await addProduct(formData)
          console.group("saveProduct",saveProduct)
      
        router.push("/admin/products/")
    }
    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: 500,
                mx: "auto",
                mt: 6,
                p: 4,
                display: "flex",
                flexDirection: "column",
                gap: 3,
                border: "1px solid #ddd",
                borderRadius: 2,
                boxShadow: 2,
            }}
        >
            <Typography variant="h5" mb={2}>
                Add Product
            </Typography>
            <TextField
                required
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />
            <TextField
                required
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
            />
            <TextField
                required
                label="Stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
            />
            <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}

            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} >
                Add Product
            </Button>
        </Box>
    )
};

export default page;