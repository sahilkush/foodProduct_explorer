// ✅ App.jsx
import { useEffect, useState } from "react";
import ProductCard from "./components/productcard";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import SortDropdown from "./components/SortDropdown";
import ProductDetailPanel from "./components/ProductDetailPanel";

function App() {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(1);
  const [lastSearchTerm, setLastSearchTerm] = useState("food");
  const [error, setError] = useState("");

  const fetchProducts = async (searchTerm = "food", nextPage = 1, append = false) => {
    setError("");
    setLastSearchTerm(searchTerm);
    const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&page=${nextPage}&page_size=20&json=true`);
    const data = await res.json();
    const newProducts = data.products;
    if (append) {
      setProducts((prev) => [...prev, ...newProducts]);
      setOriginalProducts((prev) => [...prev, ...newProducts]);
    } else {
      setProducts(newProducts);
      setOriginalProducts(newProducts);
    }
  };

  const fetchProductByBarcode = async (barcode) => {
    setError("");
    const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    const data = await res.json();
    if (data.status === 1) {
      setProducts([data.product]);
      setOriginalProducts([data.product]);
    } else {
      setProducts([]);
      setOriginalProducts([]);
      setError("Product not found with that barcode.");
    }
    setSelectedProduct(null);
  };

  const fetchProductsByCategory = async (category) => {
    if (!category) return;
    setError("");
    const res = await fetch(`https://world.openfoodfacts.org/category/${category}.json`);
    const data = await res.json();
    const sliced = data.products?.slice(0, 20) || [];
    setProducts(sliced);
    setOriginalProducts(sliced);
    setSelectedProduct(null);
  };

  const sortProducts = (type) => {
    let sorted = [...originalProducts];
    if (type === "name-asc") {
      sorted.sort((a, b) => (a.product_name || "").localeCompare(b.product_name || ""));
    } else if (type === "name-desc") {
      sorted.sort((a, b) => (b.product_name || "").localeCompare(a.product_name || ""));
    } else if (type === "grade-asc") {
      sorted.sort((a, b) => (a.nutrition_grades || "z").localeCompare(b.nutrition_grades || "z"));
    } else if (type === "grade-desc") {
      sorted.sort((a, b) => (b.nutrition_grades || "z").localeCompare(a.nutrition_grades || "z"));
    }
    setProducts(sorted);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen grid-cols-4 bg-slate-900 p-4 sm:p-6">
      <div className="flex justify-start justify-between">
          <h1 className="text-3xl text-white font-bold text-left mb-4"> Food Product Explorer</h1>
          <SearchBar onSearch={fetchProducts} onBarcodeSearch={fetchProductByBarcode} />
      </div>

      
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex justify-end gap-4 mb-4 w-full">
          <CategoryFilter onCategorySelect={fetchProductsByCategory} />
          <SortDropdown onSort={sortProducts} />  
        </div>

      <div className={`transition-all duration-300 sm:h-[calc(100vh-10rem)] sm:flex sm:gap-6`}>
        
        <div className={`${selectedProduct ? 'sm:w-2/3' : 'w-full'} grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 overflow-y-auto pr-2 `}>
        
          {products.length === 0 && !error ? (
            <p className="text-center col-span-full">No products to show.</p>
          ) : (
            products.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                onSelect={() => setSelectedProduct(product)}
              />
            ))
          )}
          
        </div>

        {selectedProduct && (
          <div className="sm:w-1/3 mt-6 sm:mt-0 overflow-y-auto self-start sticky top-24">
            <ProductDetailPanel
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          </div>
        )}
      </div>

      {products.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              const nextPage = page + 1;
              setPage(nextPage);
              fetchProducts(lastSearchTerm, nextPage, true);
            }}
            className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-all"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
