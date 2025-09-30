/**
 * ProductCard component that displays a product in a card format
 * @param {Object} product - The product object containing product information
 * @param {Function} onSelect - Callback function triggered when card is clicked
 */
function ProductCard({ product, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className="border p-4 rounded-xl shadow bg-slate-700 hover:bg-slate-950 hover:shadow-md cursor-pointer transition-all duration-300 w-80"
    >
      <img
        src={product.image_front_small_url}
        alt={product.product_name}
        className="w-full h-40 object-contain mb-2"
      />
      <h2 className="font-bold text-white text-lg">{product.product_name || "No Name"}</h2>
      <p className="text-sm text-gray-500">Category: {product.categories_tags?.[0] || "N/A"}</p>
      <p className="text-white">Nutrition Grade: <span className="uppercase font-bold text-white">{product.nutrition_grades || "N/A"}</span></p>
    </div>
  );
}

export default ProductCard;
