import React, { useEffect, useState } from "react";

const Recommendations = ({ category, currentGrade }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!category) return;

    // Fetch products in the same category
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://world.openfoodfacts.org/category/${category}.json?page_size=10`
        );
        const data = await res.json();

        if (data.products) {
          // Filter products with better nutriscore
          const betterProducts = data.products.filter((p) => {
            return (
              p.nutriscore_grade &&
              p.nutriscore_grade < currentGrade && // better grade
              p.image_front_small_url
            );
          });

          setRecommendations(betterProducts.slice(0, 4)); // show top 4
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [category, currentGrade]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">You may also like</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loading ? (
          <p className="text-gray-500">Loading recommendations...</p>
        ) : recommendations.length > 0 ? (
          recommendations.map((product) => (
            <div
              key={product.id || product.code}
              className="border rounded-lg shadow-sm p-2"
            >
              <img
                src={product.image_front_small_url}
                alt={product.product_name}
                className="w-full h-32 object-contain mb-2"
              />
              <p className="font-medium text-sm">{product.product_name}</p>
              <p className="text-xs text-gray-500 capitalize">
                Nutriscore: {product.nutriscore_grade || "N/A"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No recommendations available.</p>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
