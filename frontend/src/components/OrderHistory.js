import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

export default function OrderHistory() {
    const [orders, setOrders] = useState([]); // Ensure initial state is an array

    useEffect(() => {
        async function getOrder() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASEURL}/orders`);
                if (Array.isArray(response.data)) {
                    setOrders(response.data);
                } else {
                    console.error("API response is not an array", response.data);
                    setOrders([]); // Avoid crashes by setting it to an empty array
                }
            } catch (err) {
                console.error("Error fetching orders:", err);
                setOrders([]); // Avoid undefined errors by setting an empty array
            }
        }
        getOrder();
    }, []);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Order History
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>User Name</b></TableCell>
                            <TableCell><b>Email</b></TableCell>
                            <TableCell><b>Contact</b></TableCell>
                            <TableCell><b>Product Name</b></TableCell>
                            <TableCell><b>Price (₹)</b></TableCell>
                            <TableCell><b>Quantity</b></TableCell>
                            <TableCell><b>Total Amount (₹)</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.length > 0 ? (
                            orders.map((order) =>
                                order.products && Array.isArray(order.products) ? (
                                    order.products.map((product, index) => (
                                        <TableRow key={`${order.id}-${product.id}`}>
                                            {index === 0 && (
                                                <>
                                                    <TableCell rowSpan={order.products.length}>{order.userName}</TableCell>
                                                    <TableCell rowSpan={order.products.length}>{order.email}</TableCell>
                                                    <TableCell rowSpan={order.products.length}>{order.contact}</TableCell>
                                                </>
                                            )}
                                            <TableCell>{product.productName}</TableCell>
                                            <TableCell>₹{product.price}</TableCell>
                                            <TableCell>{product.quantity}</TableCell>
                                            {index === 0 && (
                                                <TableCell rowSpan={order.products.length}><b>₹{order.totalAmount}</b></TableCell>
                                            )}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow key={order.id}>
                                        <TableCell colSpan={8} align="center">
                                            No Products Found
                                        </TableCell>
                                    </TableRow>
                                )
                            )
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
                                    No Orders Found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
