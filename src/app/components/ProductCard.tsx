import { Star, StarHalf } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.title.slice(0, 30)}... added to cart`);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-[#FFA41C] text-[#FFA41C]" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 fill-[#FFA41C] text-[#FFA41C]" />);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    return stars;
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white rounded border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-200 flex flex-col h-full"
    >
      {/* Product Image */}
      <div className="relative mb-3 flex-shrink-0">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover rounded"
        />
        {product.discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            -{product.discountPercentage}%
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-sm mb-2 line-clamp-2 flex-shrink-0">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2 flex-shrink-0">
          <div className="flex">{renderStars(product.rating)}</div>
          <span className="text-xs text-blue-600">
            {product.reviewCount.toLocaleString()}
          </span>
        </div>

        {/* Price */}
        <div className="mb-2 flex-shrink-0">
          <div className="flex items-baseline gap-2">
            <span className="text-xs align-super">$</span>
            <span className="text-2xl font-bold">
              {Math.floor(product.discountedPrice)}
            </span>
            <span className="text-xs align-super">
              {(product.discountedPrice % 1).toFixed(2).slice(1)}
            </span>
          </div>
          {product.originalPrice > product.discountedPrice && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">List:</span>
              <span className="text-xs text-gray-600 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="text-xs text-red-600 font-bold">
                ({product.discountPercentage}% off)
              </span>
            </div>
          )}
        </div>

        {/* Prime Badge */}
        {product.isPrime && (
          <div className="mb-2 flex-shrink-0">
            <div className="flex items-center gap-1">
              <span className="text-xs text-blue-600 font-bold">prime</span>
              <span className="text-xs text-gray-600">FREE delivery</span>
            </div>
          </div>
        )}

        {/* Stock Status */}
        <div className="text-xs mb-3 flex-shrink-0">
          {product.stock > 50 ? (
            <span className="text-green-700">In Stock</span>
          ) : product.stock > 0 ? (
            <span className="text-orange-600">Only {product.stock} left in stock</span>
          ) : (
            <span className="text-red-600">Out of Stock</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full mt-auto bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 py-2 px-4 rounded-full text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
