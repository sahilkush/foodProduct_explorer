import ProductCard from "./productcard";

/**
 * ProductList renders a list of products and an optional Load More button
 */
function ProductList({ products, error, loading, onSelect, onLoadMore, showLoadMore }) {
  if (loading && products.length === 0) {
    return <p className="text-center col-span-full text-white">Loading...</p>;
  }

  return (
    <>
      {products.map((product, index) => (
        <ProductCard
          key={index}
          product={product}
          onSelect={() => onSelect(product)}
        />
      ))}

      {showLoadMore && (
        <div className="col-span-full flex justify-center mt-6">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className={`bg-green-500 text-white px-6 py-2 rounded-full transition-all ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-green-600'}`}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </>
  );
}

export default ProductList;


