import { useEffect, useState } from "react";

function CategoryFilter({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    const res = await fetch("https://world.openfoodfacts.org/categories.json");
    const data = await res.json();
    const topCategories = data.tags.slice(0, 20); // only first 20
    setCategories(topCategories);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="mb-6 flex justify-center">
      <select
        onChange={(e) => onCategorySelect(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded w-80"
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
