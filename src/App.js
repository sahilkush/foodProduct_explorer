import { useEffect, useState } from "react";
import ProductCard from "./components/productcard";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import SortDropdown from "./components/SortDropdown";

function App() {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [error, setError] = useState("");

  const fetchProducts = async (searchTerm = "food") => {
    setError("");
    const res = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&page=1&page_size=20&json=true`
    );
    const data = await res.json();
    setProducts(data.products);
    setOriginalProducts(data.products);
  };

  const fetchProductByBarcode = async (barcode) => {
    setError("");
    const res = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
    );
    const data = await res.json();
    if (data.status === 1) {
      setProducts([data.product]);
      setOriginalProducts([data.product]);
    } else {
      setProducts([]);
      setOriginalProducts([]);
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
    const sliced = data.products?.slice(0, 20) || [];
    setProducts(sliced);
    setOriginalProducts(sliced);
  };

  const sortProducts = (type) => {
    let sorted = [...originalProducts];
    if (type === "name-asc") {
      sorted.sort((a, b) =>
        (a.product_name || "").localeCompare(b.product_name || "")
      );
    } else if (type === "name-desc") {
      sorted.sort((a, b) =>
        (b.product_name || "").localeCompare(a.product_name || "")
      );
    } else if (type === "grade-asc") {
      sorted.sort((a, b) =>
        (a.nutrition_grades || "z").localeCompare(b.nutrition_grades || "z")
      );
    } else if (type === "grade-desc") {
      sorted.sort((a, b) =>
        (b.nutrition_grades || "z").localeCompare(a.nutrition_grades || "z")
      );
    }
    setProducts(sorted);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
  <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white p-6">
    <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-600">
      🍎 Food Product Explorer
    </h1>

    <div className="max-w-5xl mx-auto space-y-4">
      <SearchBar onSearch={fetchProducts} onBarcodeSearch={fetchProductByBarcode} />
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <CategoryFilter onCategorySelect={fetchProductsByCategory} />
        <SortDropdown onSort={sortProducts} />
      </div>
    </div>

    {error && (
      <p className="text-red-600 font-semibold text-center my-4 animate-pulse">
        {error}
      </p>
    )}

    <div className="mt-8 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.length === 0 && !error ? (
        <p className="text-center col-span-full text-gray-500 text-lg">
          No products to show.
        </p>
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
