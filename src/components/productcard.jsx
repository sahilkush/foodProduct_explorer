import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.code}`}>
      <div className="border p-4 rounded shadow-md bg-white hover:shadow-lg transition">
        <img
          src={product.image_front_small_url}
          alt={product.product_name}
          className="w-full h-40 object-contain mb-2"
        />
        <h2 className="font-bold text-lg sm:text-xl">{product.product_name || "No Name"}</h2>
        <p className="text-sm text-gray-500">Category: {product.categories_tags?.[0] || "N/A"}</p>
        <p className="mt-1">
          Nutrition Grade:{" "}
          <span className="uppercase font-bold">
            {product.nutrition_grades || "N/A"}
          </span>
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;
