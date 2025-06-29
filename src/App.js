import { useEffect,useState } from "react";
import ProductCard from "./components/productcard";

function App(){
  const [products, setProducts] = useState([]);

  //function to fetch products 
  const fetchProducts = async()=>{
    const res = await fetch("https://world.openfoodfacts.org/cgi/search.pl?search_terms=food&page=1&page_size=20&json=true");
    const data = await res.json();
    setProducts(data.products);
  };

  useEffect(()=>{
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6"> Food Product Explorer</h1>

      {/* Grid of product cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );

}

export default App;
