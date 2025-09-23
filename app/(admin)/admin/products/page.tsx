"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Button, IconButton, Paper, Stack, Pagination } from "@mui/material";
import { getAllProducts,deleteProductById } from "@/lib/api";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Product } from "@/types";


export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1); // current page
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10; 


  const fetchData = async (pageNo: number) => {
    let getProducts = await getAllProducts(pageNo, pageSize)
     setTotalCount(getProducts.pagination.total)
    setProducts(getProducts.products)
  }
  useEffect(() => {

    fetchData(page)

  }, [page,totalCount]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value); 
  }

  const handleAddProduct = () => {
    router.push("/admin/products/add")
  }

  const handleEdit = (id: number) => {
    router.push(`/admin/products/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    console.log("data",id)
    if (!confirm("Are you sure you want to delete this product?")) return;
     await deleteProductById(id);
     setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Product Name', width: 200 },
    { field: 'price', headerName: 'Price', width: 100, type: 'number', },
    {
      field: 'stock',
      headerName: 'Stock',
      type: 'number',
      width: 100,
    },
    {
      field: 'description',
      headerName: 'Description',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleEdit(params.row.id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>All Products</Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleAddProduct}>
        Add Product
      </Button>

      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={products}
          columns={columns}
          hideFooterPagination
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
      <Stack spacing={2} direction="row" justifyContent="center">
        <Pagination
          count={Math.ceil(totalCount/ pageSize)} // total pages
          page={page}
           onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </Box>
  );
}
