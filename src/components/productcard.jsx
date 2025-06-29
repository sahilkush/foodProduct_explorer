function ProductCard({product}){
    return(
        <div className="border p-4 rounded shadow-md bg-white">
            <img src = {product.image_front_small_url} alt = {product.product_name} className = "w-full h-40 object-contain mb-2" />
            <h2 className="font-bold text-lg">{product.product_name || "No Name"}</h2>
            <p className="text-sm text-grey-500">Category: {product.categories_tags?.[0] || "N/A" }</p>
            <p className="mt-1">
                Nutrition Grade:{""}
                <span className="uppercase font-bold">
                    {product.nutrition_grades || "N/A"}
                </span>
            </p>
        </div>
    );
}

export default ProductCard;