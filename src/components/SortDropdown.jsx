function SortDropdown({ onSort }) {
  return (
    <div className="border border-gray-300 px-4 py-2 rounded w-full sm:w-80">
      <select
        onChange={(e) => onSort(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded w-80"
      >
        <option value="">-- Sort Products --</option>
        <option value="name-asc">Name (A → Z)</option>
        <option value="name-desc">Name (Z → A)</option>
        <option value="grade-asc">Nutrition Grade (A → E)</option>
        <option value="grade-desc">Nutrition Grade (E → A)</option>
      </select>
    </div>
  );
}

export default SortDropdown;
