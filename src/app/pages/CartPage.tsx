import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getSavings, getCartCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-[1500px] mx-auto px-4 py-20 text-center">
          <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-gray-300" />
          <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add items to get started!</p>
          <Link
            to="/"
            className="inline-block bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 py-3 px-8 rounded-full font-medium transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="max-w-[1500px] mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    Cart ({getCartCount()} {getCartCount() === 1 ? "item" : "items"})
                  </h2>
                  <span className="text-sm text-gray-600">Price</span>
                </div>
              </div>

              {cart.map((item) => (
                <div key={item.id} className="p-4 border-b last:border-b-0">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-32 h-32 object-cover rounded border"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1">
                      <Link to={`/product/${item.id}`} className="hover:text-[#C7511F]">
                        <h3 className="font-medium mb-2">{item.title}</h3>
                      </Link>

                      <div className="text-sm text-gray-600 mb-2">
                        <span className="text-green-700 font-bold">In Stock</span>
                      </div>

                      {item.isPrime && (
                        <div className="flex items-center gap-1 mb-3">
                          <span className="text-xs text-blue-600 font-bold">prime</span>
                          <span className="text-xs text-gray-600">FREE Delivery</span>
                        </div>
                      )}

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex items-center gap-2 border border-gray-300 rounded">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-l"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-r"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm text-blue-600 hover:text-red-600 hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>

                      {/* Savings Info */}
                      {item.discountPercentage > 0 && (
                        <div className="text-sm text-green-700">
                          You're saving ${((item.originalPrice - item.discountedPrice) * item.quantity).toFixed(2)} (
                          {item.discountPercentage}% off)
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="text-2xl font-bold mb-1">
                        ${(item.discountedPrice * item.quantity).toFixed(2)}
                      </div>
                      {item.originalPrice > item.discountedPrice && (
                        <div className="text-sm text-gray-600 line-through">
                          ${(item.originalPrice * item.quantity).toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              {/* Subtotal */}
              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between text-sm">
                  <span>Items ({getCartCount()}):</span>
                  <span>
                    ${cart.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-green-700 font-bold">
                  <span>Savings:</span>
                  <span>-${getSavings().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span className="text-green-700">FREE</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Order Total:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="block w-full bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 py-3 px-4 rounded-full font-medium text-center transition-colors"
              >
                Proceed to Checkout
              </Link>

              {/* Prime Benefits */}
              <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-600 font-bold">prime</span>
                  <span className="text-sm font-bold">Benefits</span>
                </div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• FREE Delivery on eligible orders</li>
                  <li>• Exclusive deals and offers</li>
                  <li>• Fast, FREE delivery</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="mt-6">
          <Link to="/" className="text-blue-600 hover:text-[#C7511F] hover:underline text-sm">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
