import { Link } from "react-router-dom";
import CarouselBanner from "./CarouselBanner";

const Home = () => {
  return (
    <div className="max-w-[1440px] mx-auto">
      {/* Hero Section */}
        <CarouselBanner/>

      {/* Categories Section */}
      <div className="px-10 py-16">
        <h2 className="text-3xl font-semibold text-center mb-10">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Men", "Women", "Kids"].map((category, index) => (
            <Link
              key={index}
              to={`/category/${category.toLowerCase()}`}
              className="group relative"
            >
              <img
                src={`https://images.unsplash.com/photo-1496302662116-35cc4f36df92?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBlcnNvbnxlbnwwfDB8MHx8fDA%3D?${category}`}
                alt={category}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <span className="text-white text-2xl font-semibold">{category}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Trending Now */}
      <div className="px-10 py-16 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center mb-10">Trending Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white p-4 shadow-md">
              <img
                src={`https://plus.unsplash.com/premium_photo-1664202526559-e21e9c0fb46a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFzaGlvbnxlbnwwfDB8MHx8fDA%3D=${index}`}
                alt="Trending"
                className="w-full h-[300px] object-cover"
              />
              <p className="mt-4 text-lg font-medium">Trendy Outfit</p>
              <p className="text-gray-600">₹1299</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-black text-white text-center py-10">
        <h2 className="text-2xl font-semibold">Get the Latest Updates</h2>
        <p className="text-gray-400 mt-2">Sign up for exclusive deals & discounts.</p>
        <div className="flex justify-center mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 text-black outline-none"
          />
          <button className="px-6 py-2 bg-white text-black font-medium hover:bg-gray-200">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

