import { useEffect, useState } from "react";
import ProductCard from "./components/productcard";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const fetchProducts = async (searchTerm = "food") => {
    setError("");
    const res = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&page=1&page_size=20&json=true`
    );
    const data = await res.json();
    setProducts(data.products);
  };

  const fetchProductByBarcode = async (barcode) => {
    setError("");
    const res = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
    );
    const data = await res.json();
    if (data.status === 1) {
      setProducts([data.product]);
    } else {
      setProducts([]);
      setError("Product not found with that barcode.");
    }
  };

  const fetchProductsByCategory = async (category) => {
    if (!category) return;
    setError("");
    const res = await fetch(
      `https://world.openfoodfacts.org/category/${category}.json`
    );
    const data = await res.json();
    if (data.products) {
      setProducts(data.products.slice(0, 20));
    } else {
      setError("No products found in this category.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-4">🍎 Food Product Explorer</h1>

      <SearchBar onSearch={fetchProducts} onBarcodeSearch={fetchProductByBarcode} />
      <CategoryFilter onCategorySelect={fetchProductsByCategory} />

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length === 0 && !error ? (
          <p className="text-center col-span-full">No products to show.</p>
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
