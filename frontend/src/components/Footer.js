import React from "react";
import { Container, Grid, Typography, IconButton, Box, Link } from "@mui/material";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom"; // Importing Link for navigation

export default function Footer() {
    return (
        <Box sx={{ backgroundColor: "#2E3B55", color: "white", py: 4, mt: 5 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Branding Section */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h5" fontWeight="bold">Dairy Delight</Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Bringing fresh and delicious dairy products to your home with love and care.
                        </Typography>
                    </Grid>

                    {/* Navigation Links */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h6" fontWeight="bold">Quick Links</Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
                            <Link component={RouterLink} to="/aboutus" sx={{ color: "white", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
                                About Us
                            </Link>
                            <Link component={RouterLink} to="/contactus" sx={{ color: "white", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
                                Contact Us
                            </Link>
                        </Box>
                    </Grid>

                    {/* Social Media */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h6" fontWeight="bold">Follow Us</Typography>
                        <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                            <IconButton sx={{ color: "white" }}><Facebook /></IconButton>
                            <IconButton sx={{ color: "white" }}><Instagram /></IconButton>
                            <IconButton sx={{ color: "white" }}><Twitter /></IconButton>
                            <IconButton sx={{ color: "white" }}><YouTube /></IconButton>
                        </Box>
                    </Grid>
                </Grid>

                {/* Copyright Section */}
                <Box sx={{ textAlign: "center", mt: 3, borderTop: "1px solid gray", pt: 2 }}>
                    <Typography variant="body2">&copy; {new Date().getFullYear()} Dairy Delight. All rights reserved.</Typography>
                </Box>
            </Container>
        </Box>
    );
}
