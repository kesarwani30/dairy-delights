import React , {useContext} from "react"
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
import { DataContext } from "../App";

export default function AddProduct() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setProduct } = useContext(DataContext);

  const onSubmit = async (data) => {
    try {
      const newProduct = {
        id: String(Date.now()), // ✅ Generate a unique random ID
        category: data.category,
        productName: data.productName,
        description: data.description,
        price: String(data.price),
        nutritionalValue: data.nutritionalValue,
       
      };
      const response = await axios.post("http://localhost:5000/products", newProduct);


      const addedProduct = response?.data || newProduct;

      setProduct((prevProducts) => [...prevProducts, addedProduct]);
      
      alert("Product added successfully!");
      navigate("/");
      
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
      alert("Error adding product: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <Box sx={{ width: "50%", margin: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>Add Product</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Category"
          {...register("category", { required: "Category is required" })}
          error={!!errors.category}
          helperText={errors.category?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Product Name"
          {...register("productName", { required: "Product Name is required" })}
          error={!!errors.productName}
          helperText={errors.productName?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          {...register("description")}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Price"
          type="number"
          {...register("price", {
            required: "Price is required",
            valueAsNumber: true,
            min: { value: 1, message: "Price must be at least 1" }
          })}
          error={!!errors.price}
          helperText={errors.price?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Nutritional Value"
          {...register("nutritionalValue")}
          margin="normal"
        />
        
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Product
        </Button>
        <Button variant="contained" color="secondary" sx={{ mt: 2, ml: 2 }} onClick={() => navigate("/adminhome")}>
          Back
        </Button>
      </form>
    </Box>
  );
}
