function SortDropdown({ onSort }) {
  return (
    <div className="border border-none px-0 py-2 rounded w-80 sm:w-80 bg-slate-900 ml-2 ">
      <select
        onChange={(e) => onSort(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded w-80 bg-slate-700 hover:bg-slate-800"
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
