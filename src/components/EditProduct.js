import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";
import { DataContext } from "../App"; // Import global context

export default function EditProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state;
  const { setProduct } = useContext(DataContext); // Get setProduct from context

  const [updatedProduct, setUpdatedProduct] = useState(product);
  const url = "http://localhost:5000/products/";

  const handleChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(url + updatedProduct.id, updatedProduct)
      .then(() => {
        alert("Product updated successfully!");

        // ✅ **Update the global product state dynamically**
        setProduct((prevProducts) =>
          prevProducts.map((item) =>
            item.id === updatedProduct.id ? updatedProduct : item
          )
        );

        navigate("/adminhome"); // Redirect to admin dashboard
      })
      .catch((err) => {
        alert("Error updating product: " + err.message);
      });
  };

  return (
    <Box sx={{ width: "50%", margin: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>Edit Product</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Category"
          name="category"
          value={updatedProduct.category}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Product Name"
          name="productName"
          value={updatedProduct.productName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={updatedProduct.description}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={updatedProduct.price}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Nutritional Value"
          name="nutritionalValue"
          value={updatedProduct.nutritionalValue}
          onChange={handleChange}
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Update Product
        </Button>

      </form>
      
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} onClick={()=>{navigate("/")}} >
          Back
        </Button>
    </Box>
  );
}
