import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../data/products";
import { SlidersHorizontal } from "lucide-react";

export default function CategoryPage() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  let filteredProducts = products;

  if (category && category !== "All") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category.toLowerCase().replace(/\s+/g, "-") === category.toLowerCase()
    );
  }

  if (searchQuery) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  filteredProducts = filteredProducts.filter(
    (p) => p.discountedPrice >= priceRange[0] && p.discountedPrice <= priceRange[1]
  );

  switch (sortBy) {
    case "price-low":
      filteredProducts.sort((a, b) => a.discountedPrice - b.discountedPrice);
      break;
    case "price-high":
      filteredProducts.sort((a, b) => b.discountedPrice - a.discountedPrice);
      break;
    case "rating":
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case "reviews":
      filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
  }

  const categoryName = category
    ? category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "All Products";

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-[1500px] mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            {searchQuery ? `Search results for "${searchQuery}"` : categoryName}
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal className="w-5 h-5" />
                <h2 className="text-xl font-bold">Filters</h2>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-bold mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <a
                      key={cat}
                      href={`/#/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                      className={`block text-sm hover:text-[#C7511F] ${
                        categoryName === cat ? "text-[#C7511F] font-bold" : ""
                      }`}
                    >
                      {cat}
                    </a>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-bold mb-3">Price Range</h3>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      onChange={() => setPriceRange([0, 5000])}
                      checked={priceRange[0] === 0 && priceRange[1] === 5000}
                      className="accent-[#FF9900]"
                    />
                    <span>All Prices</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      onChange={() => setPriceRange([0, 50])}
                      checked={priceRange[0] === 0 && priceRange[1] === 50}
                      className="accent-[#FF9900]"
                    />
                    <span>Under $50</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      onChange={() => setPriceRange([50, 100])}
                      checked={priceRange[0] === 50 && priceRange[1] === 100}
                      className="accent-[#FF9900]"
                    />
                    <span>$50 to $100</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      onChange={() => setPriceRange([100, 500])}
                      checked={priceRange[0] === 100 && priceRange[1] === 500}
                      className="accent-[#FF9900]"
                    />
                    <span>$100 to $500</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      onChange={() => setPriceRange([500, 5000])}
                      checked={priceRange[0] === 500 && priceRange[1] === 5000}
                      className="accent-[#FF9900]"
                    />
                    <span>$500 & Above</span>
                  </label>
                </div>
              </div>

              {/* Prime Filter */}
              <div>
                <h3 className="font-bold mb-3">Shipping</h3>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input type="checkbox" className="accent-[#FF9900]" />
                  <span className="text-blue-600 font-bold">prime</span>
                  <span>FREE Delivery</span>
                </label>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-9">
            {/* Sort Bar */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""}
                </span>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Avg. Customer Review</option>
                    <option value="reviews">Most Reviews</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-20 text-center">
                <h3 className="text-2xl font-bold mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                <a
                  href="/#/"
                  className="inline-block bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 py-3 px-8 rounded-full font-medium transition-colors"
                >
                  Browse All Products
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
