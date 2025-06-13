import React, { useContext } from "react";
import { Box, Button, Badge } from "@mui/material";
import { DataContext } from "../App"; // Import Global Data Context

export default function CategoryNavbar({ onCategorySelect, selectedCategory,categoryCounts }){
  const { displayDairy } = useContext(DataContext); // Access global product data

  // Extract unique categories dynamically
  const categories = ["All", ...new Set(displayDairy.map((product) => product.category))];

  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 2, bgcolor: "#f8f9fa", padding: "10px", flexWrap: "wrap" }}>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "contained" : "outlined"}
          onClick={() => onCategorySelect(category)}
          sx={{ position: "relative" }}
        >
          {category}  
          {/* Show count in a badge next to the category name */}
        <Badge
            badgeContent={categoryCounts[category]}
            sx={{
                marginLeft: "20px",
                "& .MuiBadge-badge": {
                backgroundColor: "#64b5f6",  // Lighter blue (you can adjust this)
                color: "#ffffff",            // White text for better contrast
                fontSize: "12px",
                fontWeight: "bold",
                minWidth: "22px",
                height: "22px",
                borderRadius: "50%",        // Circular shape
                padding: "5px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Adds a subtle shadow
                },
            }}
            />

        </Button>
      ))}
    </Box>
  );
};


