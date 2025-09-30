import { useEffect, useState } from "react";

/**
 * CategoryFilter component that provides category-based filtering for products
 * @param {Function} onCategorySelect - Callback function triggered when category is selected
 */
function CategoryFilter({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * Fetches available categories from the local categories.json file
   */
  const fetchCategories = async () => {
    setLoading(true);
    const res = await fetch("/categories.json");
    const data = await res.json();
    const topCategories = data.tags.slice(0, 20); // only first 20
    setCategories(topCategories);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="border border-none px-0 py-2 rounded w-80 sm:w-80 bg-slate-900">
      <select
        onChange={(e) => onCategorySelect(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded w-80 bg-slate-700 hover:bg-slate-800"
      >
        <option value="">-- Filter by Category --</option>
        {loading && <option>Loading...</option>}
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
