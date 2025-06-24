import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleCart, getItemCount } = useCart();
  const [activeTab, setActiveTab] = useState("WOMEN");

  const tabs = [
    { name: "WOMEN", path: "/" },
    { name: "MEN", path: "/men" },
    { name: "KIDS", path: "/kids" },
  ];

  // Update active tab based on current route
  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.path === location.pathname);
    if (currentTab) {
      setActiveTab(currentTab.name);
    }
  }, [location.pathname]);

  const handleTabClick = (tab: { name: string; path: string }) => {
    setActiveTab(tab.name);
    navigate(tab.path);
  };

  return (
    <header
      className={cn("w-full bg-white border-b border-gray-100", className)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Navigation Tabs */}
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleTabClick(tab)}
                className={cn(
                  "py-2 px-1 border-b-2 font-medium text-sm tracking-wide transition-colors duration-200",
                  activeTab === tab.name
                    ? "border-brand-green text-brand-green"
                    : "border-transparent text-gray-700 hover:text-gray-500 hover:border-gray-300",
                )}
              >
                {tab.name}
              </button>
            ))}
          </nav>

          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-sm flex items-center justify-center">
              <img src="./public/assets/green-shopping-bag.png" />
            </div>
          </div>

          {/* Shopping Cart */}
          <div className="flex items-center">
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-950 hover:text-gray-500 transition-colors duration-200"
            >
              <ShoppingCart className="w-6 h-6" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-base rounded-full flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
