import { useEffect, useState } from "react";
import ProductCard from "./components/productcard";
import SearchBar from "./components/SearchBar";

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async (searchTerm = "food") => {
    const res = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&page=1&page_size=20&json=true`
    );
    const data = await res.json();
    setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-4"> Food Product Explorer</h1>

      <SearchBar onSearch={fetchProducts} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <p className="text-center col-span-full">No products found.</p>
        ) : (
          products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
