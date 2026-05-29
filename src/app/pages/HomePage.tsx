import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import HeroBanner from "../components/HeroBanner";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function HomePage() {
  const electronicsRef = useRef<HTMLDivElement>(null);
  const fashionRef = useRef<HTMLDivElement>(null);
  const homeKitchenRef = useRef<HTMLDivElement>(null);
  const booksRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const electronicsProducts = products.filter((p) => p.category === "Electronics").slice(0, 8);
  const fashionProducts = products.filter((p) => p.category === "Fashion").slice(0, 8);
  const homeKitchenProducts = products.filter((p) => p.category === "Home & Kitchen").slice(0, 8);
  const booksProducts = products.filter((p) => p.category === "Books").slice(0, 8);
  const dealsProducts = products.filter((p) => p.discountPercentage >= 30).slice(0, 8);
  const recommendedProducts = products.slice(0, 12);

  const categoryCards = [
    {
      title: "Electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300",
      link: "/category/electronics"
    },
    {
      title: "Fashion",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300",
      link: "/category/fashion"
    },
    {
      title: "Home & Kitchen",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=300",
      link: "/category/home-kitchen"
    },
    {
      title: "Sports",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300",
      link: "/category/sports"
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Category Cards */}
      <div className="max-w-[1500px] mx-auto px-4 -mt-48 mb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoryCards.map((category) => (
            <a
              key={category.title}
              href={`#${category.link}`}
              className="bg-white p-6 rounded shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold mb-4">{category.title}</h3>
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <span className="text-blue-600 text-sm hover:text-orange-600 hover:underline">
                Shop now
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Deal of the Day */}
      <div className="max-w-[1500px] mx-auto px-4 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <div className="flex items-baseline gap-2 mb-4">
            <h2 className="text-2xl font-bold">Deal of the Day</h2>
            <span className="text-sm text-blue-600 hover:text-orange-600 hover:underline cursor-pointer">
              See all deals
            </span>
          </div>
          <div className="relative">
            <div
              ref={electronicsRef}
              className="flex overflow-x-auto gap-4 scrollbar-hide pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {dealsProducts.map((product) => (
                <div key={product.id} className="min-w-[280px]">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <button
              onClick={() => scroll(electronicsRef, "left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll(electronicsRef, "right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Electronics Section */}
      <div className="max-w-[1500px] mx-auto px-4 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <div className="flex items-baseline gap-2 mb-4">
            <h2 className="text-2xl font-bold">Top Electronics</h2>
            <a href="/#/category/Electronics" className="text-sm text-blue-600 hover:text-orange-600 hover:underline">
              See more
            </a>
          </div>
          <div className="relative">
            <div
              ref={fashionRef}
              className="flex overflow-x-auto gap-4 scrollbar-hide pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {electronicsProducts.map((product) => (
                <div key={product.id} className="min-w-[280px]">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <button
              onClick={() => scroll(fashionRef, "left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll(fashionRef, "right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Fashion Section */}
      <div className="max-w-[1500px] mx-auto px-4 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <div className="flex items-baseline gap-2 mb-4">
            <h2 className="text-2xl font-bold">Fashion Trends</h2>
            <a href="/#/category/Fashion" className="text-sm text-blue-600 hover:text-orange-600 hover:underline">
              See more
            </a>
          </div>
          <div className="relative">
            <div
              ref={homeKitchenRef}
              className="flex overflow-x-auto gap-4 scrollbar-hide pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {fashionProducts.map((product) => (
                <div key={product.id} className="min-w-[280px]">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <button
              onClick={() => scroll(homeKitchenRef, "left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll(homeKitchenRef, "right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Home & Kitchen Section */}
      <div className="max-w-[1500px] mx-auto px-4 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <div className="flex items-baseline gap-2 mb-4">
            <h2 className="text-2xl font-bold">Home & Kitchen Essentials</h2>
            <a href="/#/category/Home & Kitchen" className="text-sm text-blue-600 hover:text-orange-600 hover:underline">
              See more
            </a>
          </div>
          <div className="relative">
            <div
              ref={booksRef}
              className="flex overflow-x-auto gap-4 scrollbar-hide pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {homeKitchenProducts.map((product) => (
                <div key={product.id} className="min-w-[280px]">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <button
              onClick={() => scroll(booksRef, "left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll(booksRef, "right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="max-w-[1500px] mx-auto px-4 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Recommended for you</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
