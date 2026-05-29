import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { CreditCard, MapPin, Package, CheckCircle } from "lucide-react";

export default function CheckoutPage() {
  const { cart, getCartTotal, getSavings, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<"shipping" | "payment" | "review" | "success">("shipping");

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  if (cart.length === 0 && step !== "success") {
    navigate("/cart");
    return null;
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("review");
  };

  const handlePlaceOrder = () => {
    clearCart();
    setStep("success");
  };

  if (step === "success") {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <CheckCircle className="w-24 h-24 mx-auto mb-6 text-green-600" />
          <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-2">Thank you for your purchase.</p>
          <p className="text-gray-600 mb-8">
            Your order has been confirmed and will be shipped soon.
          </p>
          <div className="bg-gray-100 rounded-lg p-6 mb-8">
            <div className="text-sm text-gray-600 mb-2">Order Number</div>
            <div className="text-2xl font-bold mb-4">
              #{Math.random().toString(36).substring(2, 11).toUpperCase()}
            </div>
            <div className="text-sm text-gray-600 mb-2">Estimated Delivery</div>
            <div className="text-lg font-bold">
              {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/")}
              className="bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 py-3 px-8 rounded-full font-medium transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate("/orders")}
              className="bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-900 py-3 px-8 rounded-full font-medium transition-colors"
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="max-w-[1200px] mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        {/* Progress Indicator */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-2 ${step === "shipping" ? "text-[#FF9900]" : "text-gray-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === "shipping" ? "bg-[#FF9900] text-white" : "bg-gray-300"
              }`}>
                1
              </div>
              <span className="font-medium hidden sm:inline">Shipping</span>
            </div>
            <div className="flex-1 h-1 bg-gray-300 mx-4">
              <div className={`h-full transition-all ${
                step === "payment" || step === "review" ? "bg-[#FF9900]" : "bg-gray-300"
              }`} style={{ width: step === "payment" || step === "review" ? "100%" : "0%" }} />
            </div>
            <div className={`flex items-center gap-2 ${
              step === "payment" ? "text-[#FF9900]" : step === "review" ? "text-gray-400" : "text-gray-400"
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === "payment" ? "bg-[#FF9900] text-white" : step === "review" ? "bg-gray-300" : "bg-gray-300"
              }`}>
                2
              </div>
              <span className="font-medium hidden sm:inline">Payment</span>
            </div>
            <div className="flex-1 h-1 bg-gray-300 mx-4">
              <div className={`h-full transition-all ${
                step === "review" ? "bg-[#FF9900]" : "bg-gray-300"
              }`} style={{ width: step === "review" ? "100%" : "0%" }} />
            </div>
            <div className={`flex items-center gap-2 ${step === "review" ? "text-[#FF9900]" : "text-gray-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === "review" ? "bg-[#FF9900] text-white" : "bg-gray-300"
              }`}>
                3
              </div>
              <span className="font-medium hidden sm:inline">Review</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Shipping Form */}
            {step === "shipping" && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="w-6 h-6 text-[#FF9900]" />
                  <h2 className="text-2xl font-bold">Shipping Address</h2>
                </div>
                <form onSubmit={handleShippingSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.fullName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Address</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">City</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">State</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.state}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">ZIP Code</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.zipCode}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-6 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 py-3 px-4 rounded-full font-medium transition-colors"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {/* Payment Form */}
            {step === "payment" && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="w-6 h-6 text-[#FF9900]" />
                  <h2 className="text-2xl font-bold">Payment Information</h2>
                </div>
                <form onSubmit={handlePaymentSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Card Number</label>
                      <input
                        type="text"
                        required
                        placeholder="1234 5678 9012 3456"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        required
                        value={paymentInfo.cardName}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiry Date</label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          value={paymentInfo.expiryDate}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV</label>
                        <input
                          type="text"
                          required
                          placeholder="123"
                          value={paymentInfo.cvv}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setStep("shipping")}
                      className="flex-1 bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-900 py-3 px-4 rounded-full font-medium transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 py-3 px-4 rounded-full font-medium transition-colors"
                    >
                      Review Order
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Review Order */}
            {step === "review" && (
              <div className="space-y-6">
                {/* Shipping Info */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#FF9900]" />
                      <h3 className="font-bold">Shipping Address</h3>
                    </div>
                    <button onClick={() => setStep("shipping")} className="text-blue-600 text-sm hover:underline">
                      Edit
                    </button>
                  </div>
                  <div className="text-sm text-gray-700">
                    <p className="font-medium">{shippingInfo.fullName}</p>
                    <p>{shippingInfo.address}</p>
                    <p>
                      {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                    </p>
                    <p>{shippingInfo.phone}</p>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-[#FF9900]" />
                      <h3 className="font-bold">Payment Method</h3>
                    </div>
                    <button onClick={() => setStep("payment")} className="text-blue-600 text-sm hover:underline">
                      Edit
                    </button>
                  </div>
                  <div className="text-sm text-gray-700">
                    <p>Card ending in {paymentInfo.cardNumber.slice(-4)}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Package className="w-5 h-5 text-[#FF9900]" />
                    <h3 className="font-bold">Order Items</h3>
                  </div>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                        <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${(item.discountedPrice * item.quantity).toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Place Order Button */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep("payment")}
                    className="flex-1 bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-900 py-3 px-4 rounded-full font-medium transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 py-3 px-4 rounded-full font-medium transition-colors"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4 pb-4 border-b text-sm">
                <div className="flex justify-between">
                  <span>Items:</span>
                  <span>
                    ${cart.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-green-700 font-bold">
                  <span>Savings:</span>
                  <span>-${getSavings().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="text-green-700">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span>${(getCartTotal() * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
