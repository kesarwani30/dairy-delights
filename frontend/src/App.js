import { useEffect, useState, createContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./components/Header";
import DairyView from "./components/DairyView";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import axios from "axios";

export const DataContext = createContext();

function App() {
  const [originalProduct, setOriginalProduct] = useState([]); // Store original data
  const [product, setProduct] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("none"); // Default: No Sort

  useEffect(() => {
    async function getProduct() {
      try {
        console.log("ENV:", process.env);
        const response = await axios.get(`${process.env.REACT_APP_BASEURL}/products`);
        setProduct(response.data);
        setOriginalProduct(response.data); // Save unmodified product list
      } catch (err) {
        console.log(err);
      }
    }
    getProduct();
  }, []);

  // Filtering logic for search
  const filterProduct = (masterdata, searchWord) => {
    return masterdata.filter((d) =>
      d.productName.toLowerCase().includes(searchWord.toLowerCase())
    );
  };

  const searchDairyHandle = (e) => {
    setSearchText(e.target.value);
  };

  const clearSearch = () => setSearchText("");

  const handleSortChange = (sortType) => {
    setSortOption(sortType);
    
    if (sortType === "none") {
      setProduct(originalProduct); // Reset to original order
      return;
    }

    let sortedProducts = [...originalProduct];

    switch (sortType) {
      case "priceAsc":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "nameAsc":
        sortedProducts.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case "nameDesc":
        sortedProducts.sort((a, b) => b.productName.localeCompare(a.productName));
        break;
      default:
        return;
    }

    setProduct(sortedProducts); // Update sorted data
  };

  // Apply filtering
  let displayDairy = filterProduct(product, searchText);

  return (
    <DataContext.Provider value={{ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser, displayDairy, cart, setCart, product, setProduct }}>
      <BrowserRouter>
        <ScrollToTop />
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Header 
            searchText={searchText} 
            onSearchProduct={searchDairyHandle} 
            clear={clearSearch} 
            onSortChange={handleSortChange} 
            sortOption={sortOption} // Pass selected sort option
          />
          <Box sx={{ flexGrow: 1, paddingTop: "60px" }}>
            <DairyView  />
          </Box>
          <Footer />
        </Box>
      </BrowserRouter>
    </DataContext.Provider>
  );
}

export default App;
