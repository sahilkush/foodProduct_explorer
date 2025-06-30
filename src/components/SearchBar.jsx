import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center mb-6 gap-2"
    >
      <input
        type="text"
        placeholder="Search for food (e.g., milk, chips)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-80"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
