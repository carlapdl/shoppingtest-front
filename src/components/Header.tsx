import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { useQuery } from '@apollo/client'; //apollo client
import { GET_CATEGORIES_QUERY } from '@/queries/Categories'; //categories gql

interface HeaderProps {
  className?: string;
}

// Define the type for a single category object
interface Category {
  id: number; 
  name: string;
}

//export const tabs = useState<any>(null);

const Header = ({ className }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleCart, getItemCount } = useCart();
  //const [activeTab, setActiveTab] = useState("WOMEN");

  // Fetch categories using Apollo Client's useQuery hook
  const { loading, error, data } = useQuery(GET_CATEGORIES_QUERY);

  const [activeTab, setActiveTab] = useState<Category | null>(null);

  // Ensure data and categories array exist
  const categories: Category[] = data?.categories || [];

  //console.log(categories[0]);

  const tabs = useState(null);
  // If no active category is set yet, and categories are loaded, set the first one as active
  if (categories.length > 0 && !activeTab) {
    //console.log(categories[0].id);
    setActiveTab(categories[0]);

    categories.map((category: { id: number; name: string }, index: number) => ( // <--- Update type definition
      tabs[index] = {
        'name': category.name,
        'path': '/'+category.id
      }         
    ));
    //console.log(tabs);
  }

  /*
  const tabs = [
    { name: "WOMEN", path: "/" },
    { name: "MEN", path: "/men" },
    { name: "KIDS", path: "/kids" },
  ];
*/
  // Update active tab based on current route
  /*
  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.path === location.pathname);
    if (currentTab) {
      setActiveTab(currentTab.name);
    }
  }, [location.pathname]);*/

useEffect(() => {
    const currentTab = categories.find((category) => category.id === activeTab?.id);
    if (currentTab) {
      setActiveTab(currentTab);
    }
}, [data, activeTab]);
/*
  const handleTabClick = (tab: { name: string; path: string }) => {
    setActiveTab(tab.name);
    navigate(tab.path);
  };
  */

  const handleTabClick = (category) => {
    if(activeTab?.id === category.id){
        setActiveTab(category.id);
        if(category.id == 1){
          navigate('/');
        }else{
          navigate('/'+category.id);
        }
    }
  };

  return (
    <header
      className={cn("w-full bg-white border-b border-gray-100", className)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Navigation Tabs */}
          <nav className="flex space-x-8">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => handleTabClick(category)}
                data-testid={
                  activeTab?.id === category.id
                    ? "active-category-link"
                    : "category-link"
                }
                className={cn(
                  "py-2 px-1 border-b-2 font-medium text-sm tracking-wide transition-colors duration-200",
                  activeTab?.id === category.id
                    ? "border-brand-green text-brand-green"
                    : "border-transparent text-gray-700 hover:text-gray-500 hover:border-gray-300",
                )}
              >
                {category.name.toUpperCase()}
              </button>
            ))}
          </nav>

          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-sm flex items-center justify-center">
              <img src="/assets/green-shopping-bag.png" />
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
