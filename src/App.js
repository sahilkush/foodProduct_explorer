import { useEffect } from "react";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import SortDropdown from "./components/SortDropdown";
import ProductDetailPanel from "./components/ProductDetailPanel";
import ProductGrid from "./components/ProductGrid";
import ProductList from "./components/ProductList";
import useProducts from "./hooks/useProducts";

/**
 * Main App component that manages the food product explorer interface
 * Handles product fetching, filtering, sorting, and display
 */
function App() {
  const {
    products,
    error,
    loading,
    selectedProduct,
    setSelectedProduct,
    fetchProductsByName,
    fetchProductByBarcode,
    fetchProductsByCategory,
    sortProducts,
    loadMore,
  } = useProducts();

  useEffect(() => {}, []);

  return (
    <div className="min-h-screen grid-cols-4 bg-slate-900 p-4 sm:p-6">
      <div className="flex justify-between">
          <h1 className="text-3xl text-white font-bold text-left mb-4"> Food Product Explorer</h1>
          <SearchBar onSearch={fetchProductsByName} onBarcodeSearch={fetchProductByBarcode} />
      </div>

      
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex justify-end gap-4 mb-4 w-full">
          <CategoryFilter onCategorySelect={fetchProductsByCategory} />
          <SortDropdown onSort={sortProducts} />  
        </div>

      <div className={`transition-all duration-300 sm:h-[calc(100vh-10rem)] sm:flex sm:gap-6`}>
        
        <ProductGrid hasDetailOpen={Boolean(selectedProduct)}>
          <ProductList
            products={products}
            error={error}
            loading={loading}
            onSelect={setSelectedProduct}
          />
        </ProductGrid>

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
            onClick={loadMore}
            disabled={loading}
            className={`bg-green-500 text-white px-6 py-2 rounded-full transition-all ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-green-600'}`}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
