import { useState } from "react";

function SearchBar({ onSearch, onBarcodeSearch }) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("name"); // name or barcode

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (mode === "name") {
      onSearch(query.trim());
    } else {
      onBarcodeSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" flex-end flex-col items-end gap-4 mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder={mode === "name" ? "Search by name (e.g. milk)" : "Enter barcode"}
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
      </div>

      <div className="flex gap-4 text-sm text-white">
        <label >
          <input
            type="radio"
            name="mode"
            value="name"
            checked={mode === "name"}
            onChange={() => setMode("name")}
            className="mr-1 bg-black"
          />
          Search by Name
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value="barcode"
            checked={mode === "barcode"}
            onChange={() => setMode("barcode")}
            className="mr-1"
          />
          Search by Barcode
        </label>
      </div>
    </form>
  );
}

export default SearchBar;
