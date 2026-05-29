import { useParams, Link } from "react-router-dom";
import { Star, StarHalf, Minus, Plus, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart, updateQuantity, cart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-[1500px] mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Return to home
        </Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-5 h-5 fill-[#FFA41C] text-[#FFA41C]" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-5 h-5 fill-[#FFA41C] text-[#FFA41C]" />);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }
    return stars;
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity} item(s) added to cart`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = "/#/cart";
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1500px] mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="text-sm mb-4">
          <Link to="/" className="text-blue-600 hover:underline">
            Home
          </Link>
          <span className="mx-2">&gt;</span>
          <Link to={`/category/${product.category}`} className="text-blue-600 hover:underline">
            {product.category}
          </Link>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-600">{product.title.slice(0, 50)}...</span>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Image */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <img
                src={product.image}
                alt={product.title}
                className="w-full rounded-lg border border-gray-200"
              />
            </div>
          </div>

          {/* Middle Column - Product Info */}
          <div className="lg:col-span-4">
            <h1 className="text-2xl mb-2">{product.title}</h1>

            <div className="text-sm text-blue-600 mb-2">
              Brand: <span className="hover:underline cursor-pointer">{product.brand}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-blue-600 hover:underline cursor-pointer">
                {product.reviewCount.toLocaleString()} ratings
              </span>
            </div>

            <div className="border-t border-gray-300 pt-4 mb-4" />

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-sm text-red-600">-{product.discountPercentage}%</span>
                <span className="text-xs align-super">$</span>
                <span className="text-4xl">
                  {Math.floor(product.discountedPrice)}
                </span>
                <span className="text-xl align-super">
                  {(product.discountedPrice % 1).toFixed(2).slice(1)}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                List Price: <span className="line-through">${product.originalPrice.toFixed(2)}</span>
              </div>
              <div className="text-sm text-gray-600">
                You Save: ${(product.originalPrice - product.discountedPrice).toFixed(2)} (
                {product.discountPercentage}%)
              </div>
            </div>

            {/* Prime Badge */}
            {product.isPrime && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-blue-600 font-bold">prime</span>
                <span className="text-sm">FREE delivery by tomorrow</span>
              </div>
            )}

            <div className="border-t border-gray-300 pt-4 mb-4" />

            {/* Description */}
            <div className="mb-4">
              <h2 className="font-bold mb-2">About this item</h2>
              <p className="text-sm text-gray-700 mb-4">{product.description}</p>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-4">
                <h2 className="font-bold mb-2">Features</h2>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Product Details */}
            <div className="border border-gray-300 rounded p-4 text-sm">
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-bold w-1/3">Brand</td>
                    <td className="py-2">{product.brand}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-bold">Category</td>
                    <td className="py-2">{product.category}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-bold">Stock</td>
                    <td className="py-2">
                      {product.stock > 50 ? (
                        <span className="text-green-700">In Stock</span>
                      ) : product.stock > 0 ? (
                        <span className="text-orange-600">Only {product.stock} left</span>
                      ) : (
                        <span className="text-red-600">Out of Stock</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column - Buy Box */}
          <div className="lg:col-span-3">
            <div className="border border-gray-300 rounded-lg p-4 sticky top-24">
              <div className="text-3xl font-bold mb-2">
                ${product.discountedPrice.toFixed(2)}
              </div>

              {product.isPrime && (
                <div className="flex items-center gap-1 mb-3">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-bold text-blue-600">FREE delivery</span>
                  <span className="text-sm">Tomorrow</span>
                </div>
              )}

              <div className="text-lg font-bold text-green-700 mb-4">
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </div>

              {/* Quantity Selector */}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Quantity:</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-bold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 py-3 px-4 rounded-full font-medium mb-3 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="w-full bg-[#FFA41C] hover:bg-[#FF8F00] text-gray-900 py-3 px-4 rounded-full font-medium mb-4 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Buy Now
              </button>

              {/* Security Features */}
              <div className="border-t pt-4 space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Secure transaction</span>
                </div>
                <div className="flex items-start gap-2">
                  <Truck className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Ships from and sold by ShopHub</span>
                </div>
                <div className="flex items-start gap-2">
                  <RotateCcw className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Easy 30-day returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
