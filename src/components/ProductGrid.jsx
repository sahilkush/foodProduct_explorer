/**
 * ProductGrid lays out its children in a responsive grid
 */
function ProductGrid({ hasDetailOpen, children }) {
  return (
    <div className={`${hasDetailOpen ? 'sm:w-2/3' : 'w-full'} grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 overflow-y-auto pr-2 `}>
      {children}
    </div>
  );
}

export default ProductGrid;


