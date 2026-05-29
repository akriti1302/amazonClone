import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#232F3E] text-white mt-12">
      {/* Back to Top */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="bg-[#37475A] hover:bg-[#485769] text-center py-4 cursor-pointer transition-colors"
      >
        <span className="text-sm">Back to top</span>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[1500px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Get to Know Us */}
          <div>
            <h3 className="font-bold mb-4">Get to Know Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-300 hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-gray-300 hover:underline">
                  Press Releases
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-gray-300 hover:underline">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          {/* Make Money with Us */}
          <div>
            <h3 className="font-bold mb-4">Make Money with Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/sell" className="text-gray-300 hover:underline">
                  Sell on ShopHub
                </Link>
              </li>
              <li>
                <Link to="/affiliate" className="text-gray-300 hover:underline">
                  Become an Affiliate
                </Link>
              </li>
              <li>
                <Link to="/advertise" className="text-gray-300 hover:underline">
                  Advertise Your Products
                </Link>
              </li>
              <li>
                <Link to="/fulfillment" className="text-gray-300 hover:underline">
                  Fulfillment by ShopHub
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment Products */}
          <div>
            <h3 className="font-bold mb-4">Payment Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/rewards" className="text-gray-300 hover:underline">
                  ShopHub Rewards
                </Link>
              </li>
              <li>
                <Link to="/credit-cards" className="text-gray-300 hover:underline">
                  ShopHub Credit Cards
                </Link>
              </li>
              <li>
                <Link to="/reload" className="text-gray-300 hover:underline">
                  Reload Your Balance
                </Link>
              </li>
              <li>
                <Link to="/currency" className="text-gray-300 hover:underline">
                  Currency Converter
                </Link>
              </li>
            </ul>
          </div>

          {/* Let Us Help You */}
          <div>
            <h3 className="font-bold mb-4">Let Us Help You</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/account" className="text-gray-300 hover:underline">
                  Your Account
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-300 hover:underline">
                  Your Orders
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:underline">
                  Shipping Rates & Policies
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:underline">
                  Returns & Replacements
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-300 hover:underline">
                  Help
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-600">
        <div className="max-w-[1500px] mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <div className="text-2xl font-bold">
                <span className="text-white">Shop</span>
                <span className="text-[#FF9900]">Hub</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-300">
              <Link to="/conditions" className="hover:underline">
                Conditions of Use
              </Link>
              <Link to="/privacy" className="hover:underline">
                Privacy Notice
              </Link>
              <Link to="/interest-ads" className="hover:underline">
                Interest-Based Ads
              </Link>
            </div>
            <div className="text-xs text-gray-400">
              © 2026, ShopHub.com, Inc. or its affiliates
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
