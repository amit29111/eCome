import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { removeFromCart, updateQuantity, clearCart } from '../redux/slices/cartSlice';
import Button from '../components/Button';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalItems, totalAmount } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleQuantityChange = (item, newQuantity) => {
    dispatch(updateQuantity({
      productId: item.product._id,
      size: item.size,
      color: item.color,
      quantity: newQuantity,
    }));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart({
      productId: item.product._id,
      size: item.size,
      color: item.color,
    }));
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  const shippingCost = totalAmount > 999 ? 0 : 99;
  const finalTotal = totalAmount + shippingCost;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link to="/shop">
            <Button>Continue Shopping</Button>
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
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <button
            onClick={() => dispatch(clearCart())}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.product._id}-${item.size}-${item.color}`} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <Link to={`/product/${item.product._id}`} className="flex-shrink-0">
                    <img
                      src={item.product.images?.[0]?.url || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&auto=format&fit=crop&q=60'}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.product._id}`}
                      className="text-lg font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">{item.product.brand}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      {item.size && (
                        <span className="text-sm text-gray-600">Size: {item.size}</span>
                      )}
                      {item.color && (
                        <span className="text-sm text-gray-600">Color: {item.color}</span>
                      )}
                    </div>
                  </div>

                  {/* Price and Quantity */}
                  <div className="flex flex-col items-end space-y-2">
                    <p className="text-lg font-bold text-gray-900">₹{item.price}</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item, item.quantity - 1)}
                        className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item, item.quantity + 1)}
                        className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item)}
                      className="text-red-600 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Item Total:</span>
                    <span className="font-medium">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items ({totalItems}):</span>
                  <span>₹{totalAmount}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className={shippingCost === 0 ? 'text-green-600' : ''}>
                    {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
                  </span>
                </div>

                {totalAmount <= 999 && (
                  <p className="text-sm text-gray-500">
                    Add ₹{999 - totalAmount} more for free shipping
                  </p>
                )}
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                fullWidth
                className="mt-6"
              >
                Proceed to Checkout
              </Button>

              <Link to="/shop" className="block mt-4">
                <Button variant="outline" fullWidth>
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;