import { useContext, useState} from "react";
import DairyCard from "./DairyCard";
import IntroSection from "./IntroSection";
import CategoryNavbar from "./CategoryNavbar";
import { DataContext } from "../App"; // Access global data

export default function DairyList() {
  const { displayDairy } = useContext(DataContext); // Get global products
  const [selectedCategory, setSelectedCategory] = useState("All");



  // Function to filter products by category
  const filterByCategory = (products, category) => {
    if (category === "All") return products;
    return products.filter((product) => product.category === category);
  };

  // Generate category count dynamically
  const categoryCounts = displayDairy.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  // Add "All" category count
  categoryCounts["All"] = displayDairy.length;

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Apply category filter
  const filteredDairy = filterByCategory(displayDairy, selectedCategory);

  const dairylist = {
    display: "flex",
    flexWrap: "wrap",
    marginLeft: "40px",
  };

  return (
    <div>
      <IntroSection />

      {/* Pass categoryCounts to CategoryNavbar */}
      <CategoryNavbar 
        onCategorySelect={handleCategorySelect} 
        selectedCategory={selectedCategory} 
        categoryCounts={categoryCounts} 
      />

      <div style={dairylist}>
        {filteredDairy.map((d) => (
          <DairyCard key={d.id} dairy={d} />
        ))}
      </div>
    </div>
  );
}
