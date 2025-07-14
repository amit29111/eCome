import { Link } from "react-router-dom";
import Frame_1 from '../assets/Frame_1.svg'
import Frame_2 from '../assets/Frame_2.svg'


const Footer = () => {
  return (
    <footer className="bg-white text-black border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        
        {/* Download the App */}
        <div>
          <h3 className="text-lg font-semibold">DOWNLOAD THE APP</h3>
          <div className="mt-4 space-y-2">
            <img
              src={Frame_1}
              alt="Google Play"
              className="w-40 cursor-pointer"
            />
            <img
              src={Frame_2}
              alt="App Store"
              className="w-40 cursor-pointer"
            />
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-lg font-semibold">SHOP</h3>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li><Link to="/women" className="hover:text-black">WOMAN</Link></li>
            <li><Link to="/men" className="hover:text-black">MAN</Link></li>
            <li><Link to="/kids" className="hover:text-black">KIDS</Link></li>
            <li><Link to="/beauty" className="hover:text-black">BEAUTY</Link></li>
            <li><Link to="/home" className="hover:text-black">HOME</Link></li>
          </ul>
        </div>

        {/* Sites & Stores */}
        <div>
          <h3 className="text-lg font-semibold">SITES & STORES</h3>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li><Link to="/about" className="hover:text-black">ABOUT US</Link></li>
            <li><Link to="/contact" className="hover:text-black">CONTACT US</Link></li>
            <li><Link to="/store-locator" className="hover:text-black">STORE LOCATOR</Link></li>
            <li><Link to="/media-center" className="hover:text-black">MEDIA CENTER</Link></li>
            <li><Link to="/sitemap" className="hover:text-black">SITEMAP</Link></li>
            <li><Link to="/membership" className="hover:text-black">MEMBERSHIP</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold">JOIN OUR NEWSLETTER</h3>
          <p className="text-gray-600 mt-2">Get the latest updates from our stores</p>
          <div className="mt-4">
            <input
              type="email"
              placeholder="Email Id"
              className="w-full p-2 border-b border-black outline-none text-black bg-transparent"
            />
            <button className="mt-4 w-full bg-black text-white py-2 font-medium hover:opacity-80">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="border-t border-gray-300 text-center text-gray-600 text-sm py-4">
        <div className="flex justify-center space-x-6">
          <Link to="/terms" className="hover:text-black">TERMS & CONDITIONS</Link>
          <Link to="/privacy" className="hover:text-black">PRIVACY POLICY</Link>
          <Link to="/returns" className="hover:text-black">RETURN POLICY</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
