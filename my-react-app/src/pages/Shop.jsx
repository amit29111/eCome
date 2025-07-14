
import { useState } from "react";
import { Heart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Studiofit Red Text Printed Cotton-Blend Tub Top",
    price: 499,
    image: "/path-to-image1.jpg",
  },
  {
    id: 2,
    name: "Studiofit Red Star Printed High-Rise Cotton Skirt",
    price: 799,
    image: "/path-to-image2.jpg",
  },
  {
    id: 3,
    name: "Studiofit Red Cotton-Blend Crop Top",
    price: 399,
    image: "/path-to-image3.jpg",
  },
  {
    id: 4,
    name: "Studiofit Red Criss-Cross Cotton-Blend Crop Top",
    price: 399,
    image: "/path-to-image4.jpg",
  },
];

export default function ProductGrid() {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="relative group border p-4 rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 object-cover rounded-lg"
            />
            <button
              className="absolute top-4 right-4"
              onClick={() => toggleFavorite(product.id)}
            >
              <Heart
                className={`w-6 h-6 ${favorites.includes(product.id) ? "fill-red-500" : "stroke-black"}`}
              />
            </button>
            <div className="mt-3">
              <h3 className="text-sm text-gray-600 uppercase">Studiofit</h3>
              <h5 className="text-md font-semibold">{product.name}</h5>
              <p className="text-md` font-bold mt-1">₹ {product.price}.00</p>
            </div>
            <button 
               className="mt-2 bg-black text-white px-4 py-2 rounded"
              //  onClick={() => dispatch(addToCart(product))}
             >
               Add to Cart
             </button>
          </div>
        ))}
      </div>
    </div>
  );
}

