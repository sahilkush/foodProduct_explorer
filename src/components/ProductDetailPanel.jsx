import Recommendations from "./recommendation";

/**
 * ProductDetailPanel component that displays detailed product information in a side panel
 * @param {Object} product - The product object containing product information
 * @param {Function} onClose - Callback function to close the panel
 */
function ProductDetailPanel({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-fit sm:sticky sm:top-24 animate-slide-in-right transition-all duration-500">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold">{product.product_name}</h2>
        <button
          onClick={onClose}
          className="text-red-500 text-sm underline hover:text-red-700"
        >
          ✖ Close
        </button>
      </div>

      <img
        src={product.image_front_url}
        alt={product.product_name}
        className="w-full h-48 object-contain mb-4"
      />

      <p><strong>Ingredients:</strong> {product.ingredients_text || "N/A"}</p>

      <h3 className="mt-4 font-semibold">Nutrition:</h3>
      <ul className="list-disc list-inside text-sm text-gray-700">
        <li>Energy: {product.nutriments?.["energy-kcal"] || "N/A"} kcal</li>
        <li>Fat: {product.nutriments?.fat || "N/A"} g</li>
        <li>Carbs: {product.nutriments?.carbohydrates || "N/A"} g</li>
        <li>Proteins: {product.nutriments?.proteins || "N/A"} g</li>
      </ul>
      
      <Recommendations 
        category={product.categories_tags?.[0]} 
        currentGrade={product.nutriscore_grade} 
      />
    </div>
  );
}

export default ProductDetailPanel;
