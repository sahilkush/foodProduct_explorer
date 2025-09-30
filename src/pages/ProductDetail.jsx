import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

/**
 * ProductDetail component that displays detailed information about a specific product
 * Fetches product data based on barcode from URL parameters
 */
function ProductDetail() {
  const { barcode } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    /**
     * Fetches product details from OpenFoodFacts API using the barcode
     */
    const fetchProduct = async () => {
      const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      const data = await res.json();
      if (data.status === 1) {
        setProduct(data.product);
      } else {
        setError("Product not found.");
      }
    };

    fetchProduct();
  }, [barcode]);

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error}
        <br />
        <Link to="/" className="text-blue-600 underline">Back to Home</Link>
      </div>
    );
  }

  if (!product) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <Link to="/" className="text-blue-500 underline mb-4 block">← Back to Home</Link>

      <h1 className="text-xl sm:text-2xl font-bold mb-4">{product.product_name}</h1>
      <img
        src={product.image_front_url}
        alt={product.product_name}
        className="w-full max-h-96 object-contain mb-4"
      />

      <h2 className="font-bold mb-1">Ingredients:</h2>
      <p>{product.ingredients_text || "No data available"}</p>

      <h2 className="font-bold mt-4 mb-1">Nutrition Info:</h2>
      <ul className="list-disc list-inside text-sm text-gray-700">
        <li>Energy: {product.nutriments["energy-kcal"] || "N/A"} kcal</li>
        <li>Fat: {product.nutriments.fat || "N/A"} g</li>
        <li>Carbs: {product.nutriments.carbohydrates || "N/A"} g</li>
        <li>Proteins: {product.nutriments.proteins || "N/A"} g</li>
      </ul>

      <h2 className="font-bold mt-4 mb-1">Labels:</h2>
      <p>{product.labels || "None"}</p>
    </div>
  );
}

export default ProductDetail;
