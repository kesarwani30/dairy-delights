import { useContext} from "react";
import { DataContext } from "../App";
import axios from "axios"
import { Link,useNavigate } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Box, Button } from "@mui/material";

export default function DairyCard({ dairy }) {

  const { isLoggedIn, cart, setCart,currentUser,setProduct } = useContext(DataContext); 
  const navigate = useNavigate();
  const url=`${process.env.REACT_APP_BASEURL}/products/`


  const addToCart = () => {
    const existingItem = cart.find((item) => item.id === dairy.id);
    if (existingItem) {
      // Increase quantity if already in cart
      setCart(cart.map((item) =>
        item.id === dairy.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // Add new product with quantity 1
      setCart([...cart, { ...dairy, quantity: 1 }]);
    }
    navigate("/cart"); // Redirect to cart after adding
  };

  const deleteProduct = (pid) => {
    if(window.confirm("Are you sure you want to delete this product?")){
    axios
      .delete(url + pid)
      .then(() => {
        alert("Deleted successfully!");
        setProduct((prevProducts) => prevProducts.filter((item) => item.id !== pid)); // Update UI
      })
      .catch((err) => {
        alert("Error deleting product: " + err.message);
      });
    }
  };


  return (
    <Card
      sx={{
        width: 300,
        margin: 2,
        borderRadius: 3,
        boxShadow: 4,
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        image={dairy.image}
        alt={dairy.productName}
        sx={{
          height: 350,
          width: "100%",
          objectFit: "fill",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      />
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {dairy.productName}
          </Typography>
          <Typography variant="body1" fontWeight="bold" color="text.secondary">
            ₹{dairy.price}
          </Typography>

          {isLoggedIn && currentUser.role==="ROLE_USER" && (
          <Link to="/moredetails" state={{data:dairy}}>
            <Button variant="outlined" color="primary" sx={{ mt: 1 }}>
              More Details
            </Button>
          </Link>)}

          
          {isLoggedIn && currentUser.role==="ROLE_USER" && (
            <Button variant="contained" color="success" sx={{ mt: 1 }} onClick={addToCart}>
              Buy Now
            </Button>
          )}
          {isLoggedIn && currentUser.role === "ROLE_ADMIN" && (
            <Button variant="contained" color="warning" sx={{ mt: 1, mx: 1 }}
              onClick={() => navigate("/editproduct", { state: { product: dairy } })}>
              Edit
            </Button>)}
          {isLoggedIn && currentUser.role==="ROLE_ADMIN" && (
            <Button variant="contained" color="success" sx={{ mt: 1 }} onClick={()=>deleteProduct(dairy.id)} >
              Delete
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
    
  );
}
