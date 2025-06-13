import React, { useContext } from "react";
import { DataContext } from "../App";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { Box, Typography, Button, Card, CardContent } from "@mui/material";

export default function Cart() {
  const { cart, setCart, isLoggedIn, currentUser } = useContext(DataContext);
  const navigate= useNavigate()

  if (!isLoggedIn) {
    return (
      <Typography variant="h6" color="error" textAlign="center">
        Please log in to proceed with checkout.
      </Typography>
    );
  }

  const handleQuantityChange = (productId, change) => {
    const updatedCart = cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    setCart(updatedCart);
  };

  const handleRemove = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const handleCheckout = async () => {
    const orderDetails = {
      userId: currentUser.id , 
      userName: currentUser.name ,
      email: currentUser.emailid ,
      contact:currentUser.contact,
      products: cart.map(({ id, productName, price, quantity }) => ({
        id,
        productName,
        price,
        quantity,
      })),
      totalAmount: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASEURL}/orders`, orderDetails);
      console.log("Order placed successfully:", response.data);
      alert("Order placed successfully!");
      setCart([]); // Clear cart after successful checkout
      navigate("/");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };


  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {cart.length === 0 && (
        <Box textAlign="center">
        <Typography variant="h6">Your cart is empty.</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate("/")} 
          sx={{ mt: 2 }}
        >
          Go Back to Home
        </Button>
      </Box>
        
      ) } 
      {cart.map((item) => (
          <Card key={item.id} sx={{ mb: 2, p: 2 }}>
            <CardContent>
                <img src={item.image} alt="item_image" height="150px" width="150px" />
              <Typography variant="h6">{item.productName}</Typography>
              <Typography>Price: ₹{item.price}</Typography>
              <Typography>Quantity: {item.quantity}</Typography>

              <Box mt={2} display="flex" alignItems="center">
                <Button variant="contained" onClick={() => handleQuantityChange(item.id, -1)}>-</Button>
                <Typography mx={2}>{item.quantity}</Typography>
                <Button variant="contained" onClick={() => handleQuantityChange(item.id, 1)}>+</Button>
                <Button variant="outlined" color="error" onClick={() => handleRemove(item.id)} sx={{ ml: 2 }}>
                  Remove
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}

        {cart.length > 0 && (
          <Box mt={3}>
            <Typography variant="h5">
              Total: ₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
            </Typography>
            <Box display="flex" gap={2} mt={2}>
              <Button variant="contained" color="primary" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
              <Button variant="contained" color="primary" onClick={() => navigate("/")}>
                Add More Products
              </Button>
            </Box>
          </Box>
        )}
    </Box>
  );
}
