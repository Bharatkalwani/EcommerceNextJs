"use client";
import { addProduct } from "@/lib/api";
import CustomTextField from "@/shared/inputs/CustomInput";
import { Box, Typography, Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {ProductFields} from '@/config/constant'

const page = () => {
    const router = useRouter();
   
    interface FormDataType {
        name: string
        price: number
        stock: number
        description: string
    }

    const [formData, setFormData] = useState<FormDataType>({
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await addProduct(formData)
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
            {
                ProductFields.map((item,index) => (
                    <CustomTextField
                        key={item.name}
                        required
                        label={item.label}
                        name={item.name}
                        value={formData[item.name as keyof FormDataType]} //type assertion
                        onChange={handleChange}
                        fieldType = "text"
                    />
                ))
            }

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} >
                Add Product
            </Button>
        </Box>
    )
};

export default page;