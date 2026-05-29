import { Link } from "react-router-dom";
import { Home } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1500px] mx-auto px-4 py-20 text-center">
        <Home className="w-24 h-24 mx-auto mb-6 text-gray-300" />
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-gray-600 mb-8">{description}</p>
        <Link
          to="/"
          className="inline-block bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 py-3 px-8 rounded-full font-medium transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
