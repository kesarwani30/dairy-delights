import React, { useContext } from "react";
import { DataContext } from "../App";
import { AppBar, Toolbar, Typography, InputBase, Box, IconButton, Button, Badge, MenuItem, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";

const SearchContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px", // Space between sort dropdown and search bar
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)"
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
  padding: "8px 12px",
  borderRadius: "5px",
  width: "300px",
  display: "flex",
  alignItems: "center",
  boxShadow: "0px 2px 5px rgba(0,0,0,0.2)"
}));

export default function Header({ searchText, onSearchProduct, clear, onSortChange, sortOption }) {
  const { isLoggedIn, currentUser, setIsLoggedIn, setCurrentUser, cart } = useContext(DataContext);
  const navigate = useNavigate();

  let logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/home");
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#FFF8E1", color: "#8B4513" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
        
        {/* Left Side - Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box 
            sx={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 1 }}
            onClick={() => navigate("/")}
          >
            <img 
              src="dairies/logo.jpg"  
              alt="Dairy Delight Logo"
              style={{ width: "120px", height: "60px" }}
            />
          </Box>
          {isLoggedIn && currentUser.role === "ROLE_ADMIN" && (
            <Link to="/addproduct">
              <Button variant="contained" color="secondary">
                Add a Product
              </Button>
            </Link>
          )}
        </Box>

        {/* Center - Sorting & Search Bar */}
        <SearchContainer>
          {/* Sorting Dropdown */}
          <Select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            size="small"
            sx={{ backgroundColor: "#fff", borderRadius: "5px", minWidth: "150px" }}
          >
            <MenuItem value="none">Default</MenuItem>
            <MenuItem value="priceAsc">Price: Low to High</MenuItem>
            <MenuItem value="priceDesc">Price: High to Low</MenuItem>
            <MenuItem value="nameAsc">Name: A to Z</MenuItem>
            <MenuItem value="nameDesc">Name: Z to A</MenuItem>
          </Select>

          {/* Search Bar */}
          <Search>
            <InputBase placeholder="Search" value={searchText} onChange={onSearchProduct} fullWidth />
            {searchText && (
              <IconButton onClick={clear} size="small">
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
          </Search>
        </SearchContainer>

        {/* Right Side - Auth & Cart */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {isLoggedIn && (
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Welcome, {currentUser.name}
            </Typography>
          )}

          {/* Cart Button - Visible Only After Login */}
          {isLoggedIn && currentUser.role === "ROLE_USER" && (
            <IconButton color="inherit" onClick={() => navigate("/cart")}>
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          )}

          {isLoggedIn && currentUser.role === "ROLE_ADMIN" && (
            <Link to="/orderHistory">
              <Button variant="contained" color="secondary">
                Order History
              </Button>
            </Link>
          )}

          {isLoggedIn ? (
            <Button color="inherit" variant="outlined" onClick={logout}>
              Logout
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button color="inherit">Login</Button>
              </Link>
              <Link to="/signup">
                <Button color="inherit" variant="outlined">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
