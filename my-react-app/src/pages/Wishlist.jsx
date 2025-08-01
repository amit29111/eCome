import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { fetchWishlist, removeFromWishlist, clearWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { PageLoader } from '../components/Loader';
import Button from '../components/Button';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, isAuthenticated]);

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (item) => {
    const product = item.product;
    dispatch(addToCart({
      product,
      quantity: 1,
      size: product.sizes?.[0]?.size || '',
      color: product.colors?.[0] || '',
    }));
  };

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      dispatch(clearWishlist());
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your wishlist</h2>
          <Link to="/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <PageLoader />;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">Save your favorite items to your wishlist.</p>
          <Link to="/shop">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-600 mt-2">{items.length} items saved</p>
          </div>
          {items.length > 0 && (
            <button
              onClick={handleClearWishlist}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.product._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <Link to={`/product/${item.product._id}`}>
                  <img
                    src={item.product.images?.[0]?.url || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&auto=format&fit=crop&q=60'}
                    alt={item.product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                
                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveFromWishlist(item.product._id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>

                {/* Sale Badge */}
                {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                    {Math.round(((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-3">
                  <p className="text-sm text-gray-500 uppercase tracking-wide">{item.product.brand}</p>
                  <Link
                    to={`/product/${item.product._id}`}
                    className="font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
                  >
                    {item.product.name}
                  </Link>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-lg font-bold text-gray-900">₹{item.product.price}</span>
                  {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                    <span className="text-sm text-gray-500 line-through">₹{item.product.originalPrice}</span>
                  )}
                </div>

                {/* Added Date */}
                <p className="text-xs text-gray-500 mb-4">
                  Added on {new Date(item.addedAt).toLocaleDateString()}
                </p>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button
                    onClick={() => handleAddToCart(item)}
                    fullWidth
                    className="flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </Button>
                  
                  <Button
                    onClick={() => handleRemoveFromWishlist(item.product._id)}
                    variant="outline"
                    fullWidth
                    className="flex items-center justify-center space-x-2 text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Heart className="w-4 h-4" />
                    <span>Remove</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;