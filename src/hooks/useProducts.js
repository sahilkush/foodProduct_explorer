import { useEffect, useRef, useState } from "react";

/**
 * useProducts manages fetching, searching, category filtering, sorting, and pagination
 * for OpenFoodFacts products. Keeps App components lean by centralizing data logic.
 */
function useProducts() {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(1);
  const [lastSearchTerm, setLastSearchTerm] = useState("food");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // In-memory caches
  const searchCacheRef = useRef(new Map()); // key: `search:${term}:${page}` -> products
  const categoryCacheRef = useRef(new Map()); // key: `category:${name}` -> products

  const getLocalCache = (key) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const setLocalCache = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore quota errors
    }
  };

  /**
   * Fetch products by name (search term)
   */
  const fetchProductsByName = async (searchTerm = "food", nextPage = 1, append = false) => {
    const term = (searchTerm || "").trim();
    if (!term) return;
    setError("");
    setLastSearchTerm(term);
    setLoading(true);

    const key = `search:${term}:${nextPage}`;
    let cached = searchCacheRef.current.get(key) || getLocalCache(key);
    if (!cached) {
      const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(term)}&page=${nextPage}&page_size=20&json=true`);
      const data = await res.json();
      cached = data.products || [];
      searchCacheRef.current.set(key, cached);
      setLocalCache(key, cached);
    }

    if (append) {
      setProducts((prev) => [...prev, ...cached]);
      setOriginalProducts((prev) => [...prev, ...cached]);
    } else {
      setProducts(cached);
      setOriginalProducts(cached);
    }
    setLoading(false);
  };

  /**
   * Fetch a product by barcode
   */
  const fetchProductByBarcode = async (barcode) => {
    const code = (barcode || "").trim();
    if (!code) return;
    setError("");
    setLoading(true);
    const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${encodeURIComponent(code)}.json`);
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
    setLoading(false);
  };

  /**
   * Fetch products by category
   */
  const fetchProductsByCategory = async (category) => {
    if (!category) return;
    setError("");
    setLoading(true);
    const key = `category:${category}`;
    let cached = categoryCacheRef.current.get(key) || getLocalCache(key);
    if (!cached) {
      const res = await fetch(`https://world.openfoodfacts.org/category/${encodeURIComponent(category)}.json`);
      const data = await res.json();
      cached = data.products?.slice(0, 20) || [];
      categoryCacheRef.current.set(key, cached);
      setLocalCache(key, cached);
    }
    setProducts(cached);
    setOriginalProducts(cached);
    setSelectedProduct(null);
    setLoading(false);
  };

  /**
   * Sort currently loaded products according to provided type
   */
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

  /**
   * Load the next page of the last search and append
   */
  const loadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchProductsByName(lastSearchTerm, nextPage, true);
  };

  useEffect(() => {
    fetchProductsByName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    products,
    error,
    loading,
    page,
    lastSearchTerm,
    selectedProduct,
    setSelectedProduct,
    fetchProductsByName,
    fetchProductByBarcode,
    fetchProductsByCategory,
    sortProducts,
    loadMore,
  };
}

export default useProducts;


