import { Search, MapPin, ShoppingCart, Menu, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { categories } from "../data/products";

export default function Header() {
  const { getCartCount } = useCart();
  const [searchCategory, setSearchCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/#/search?q=${encodeURIComponent(searchTerm)}&category=${searchCategory}`;
    }
  };

  return (
    <header className="bg-[#131921] text-white sticky top-0 z-50">
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-2 gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center hover:outline hover:outline-1 hover:outline-white p-2">
          <div className="text-2xl font-bold">
            <span className="text-white">Amazon</span>
            {/* <span className="text-[#FF9900]"></span> */}
          </div>
        </Link>

        {/* Deliver To */}
        <div className="hidden md:flex items-center hover:outline hover:outline-1 hover:outline-white p-2 cursor-pointer">
          <MapPin className="w-5 h-5 mr-1" />
          <div className="text-xs">
            <div className="text-gray-300">Deliver to</div>
            <div className="font-bold">New York 10001</div>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-3xl">
          <div className="flex">
            <div className="relative">
              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="h-10 px-2 pr-8 bg-[#E6E6E6] text-gray-700 text-sm rounded-l border-r border-gray-400 cursor-pointer appearance-none hover:bg-gray-300"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ShopHub"
              className="flex-1 h-10 px-4 text-gray-900 outline-none"
            />
            <button
              type="submit"
              className="h-10 px-4 bg-[#FEBD69] hover:bg-[#F3A847] rounded-r"
            >
              <Search className="w-5 h-5 text-gray-900" />
            </button>
          </div>
        </form>

        {/* Language Selector */}
        <div className="hidden lg:flex items-center hover:outline hover:outline-1 hover:outline-white p-2 cursor-pointer">
          <div className="w-6 h-4 mr-1 bg-white/20 rounded flex items-center justify-center text-xs">
            🇺🇸
          </div>
          <span className="text-sm font-bold">EN</span>
          <ChevronDown className="w-3 h-3 ml-1" />
        </div>

        {/* Account & Lists */}
        <Link to="/account" className="hidden md:flex flex-col hover:outline hover:outline-1 hover:outline-white p-2">
          <div className="text-xs">Hello, Guest</div>
          <div className="text-sm font-bold flex items-center">
            Account & Lists
            <ChevronDown className="w-3 h-3 ml-1" />
          </div>
        </Link>

        {/* Returns & Orders */}
        <Link to="/orders" className="hidden lg:flex flex-col hover:outline hover:outline-1 hover:outline-white p-2">
          <div className="text-xs">Returns</div>
          <div className="text-sm font-bold">& Orders</div>
        </Link>

        {/* Cart */}
        <Link to="/cart" className="flex items-center hover:outline hover:outline-1 hover:outline-white p-2 relative">
          <div className="relative">
            <ShoppingCart className="w-8 h-8" />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF9900] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </div>
          <span className="ml-2 font-bold hidden md:block">Cart</span>
        </Link>
      </div>

      {/* Secondary Navigation */}
      <div className="bg-[#232F3E] px-4 py-2">
        <div className="flex items-center gap-6 text-sm">
          <button className="flex items-center hover:outline hover:outline-1 hover:outline-white px-2 py-1">
            <Menu className="w-5 h-5 mr-2" />
            All
          </button>
          <Link to="/deals" className="hover:outline hover:outline-1 hover:outline-white px-2 py-1">
            Today's Deals
          </Link>
          <Link to="/customer-service" className="hidden md:block hover:outline hover:outline-1 hover:outline-white px-2 py-1">
            Customer Service
          </Link>
          <Link to="/registry" className="hidden md:block hover:outline hover:outline-1 hover:outline-white px-2 py-1">
            Registry
          </Link>
          <Link to="/gift-cards" className="hidden lg:block hover:outline hover:outline-1 hover:outline-white px-2 py-1">
            Gift Cards
          </Link>
          <Link to="/sell" className="hidden lg:block hover:outline hover:outline-1 hover:outline-white px-2 py-1">
            Sell
          </Link>
        </div>
      </div>
    </header>
  );
}
