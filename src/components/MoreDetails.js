
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";

export default function MoreDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedProduct = location.state?.data;

  if (!selectedProduct) {
    return <Typography variant="h6" color="error" textAlign="center">No product details available.</Typography>;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="80vh" bgcolor="#f5f5f5">
      <Card sx={{ maxWidth: 400, boxShadow: 6, borderRadius: 3, p: 2 }}>
        <CardMedia
          component="img"
          image={"/" + selectedProduct.image}
          alt={selectedProduct.productName}
          sx={{ height: 300, borderRadius: 2 }}
        />
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {selectedProduct.productName}
          </Typography>
          <Typography variant="h6" color="primary">
            ₹{selectedProduct.price}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {selectedProduct.description || "No additional details available."}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {selectedProduct.nutritionalValue || "No additional details available."}
          </Typography>

          {/* Buttons */}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" color="error" fullWidth onClick={() => navigate(-1)}>
              Back
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
