import { Link } from "react-router-dom";
import { FaUser, FaSignInAlt, FaMapMarkerAlt, FaPhone, FaUsers, FaFileAlt, FaShieldAlt } from "react-icons/fa";

const Profile = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:underline">Home</Link> / <span className="text-black font-semibold">Profile</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Sidebar */}
        <div className="border border-gray-200 p-6 bg-white">
          <div className="flex items-center space-x-4 mb-6">
            <FaUser className="text-4xl text-gray-500" />
            <div>
              <p className="text-lg font-semibold">Hello !</p>
              <Link to="/profile/details" className="text-blue-600 hover:underline">View Details</Link>
            </div>
          </div>

          {/* Menu */}
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center space-x-3 font-semibold text-black border-l-4 border-black pl-2">
              <FaSignInAlt /> <span>Log In / Sign Up</span>
            </li>
            <li className="flex items-center space-x-3 hover:text-black cursor-pointer">
              <span className="text-xl italic">W</span> <span>WestStyleClub</span>
            </li>
            <li className="flex items-center space-x-3 hover:text-black cursor-pointer">
              <FaMapMarkerAlt /> <span>Store Locator</span>
            </li>
            <li className="flex items-center space-x-3 hover:text-black cursor-pointer">
              <FaPhone /> <span>Contact Us</span>
            </li>
            <li className="border-t pt-4"></li>
            <li className="flex items-center space-x-3 hover:text-black cursor-pointer">
              <FaUsers /> <span>About Us</span>
            </li>
            <li className="flex items-center space-x-3 hover:text-black cursor-pointer">
              <FaFileAlt /> <span>Terms of Use</span>
            </li>
            <li className="flex items-center space-x-3 hover:text-black cursor-pointer">
              <FaShieldAlt /> <span>Privacy Policy</span>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 bg-white p-10 border border-gray-200">
          <h2 className="text-2xl font-semibold">Sign Up</h2>
          <p className="text-gray-500 mt-2">Mobile Number</p>
          <input
            type="text"
            placeholder="Enter Mobile Number"
            className="w-full p-3 border-b border-gray-500 outline-none mt-2 text-lg"
          />
          <button className="mt-6 w-full bg-black text-white py-3 font-medium hover:opacity-80">
            SEND OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
