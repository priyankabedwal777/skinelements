import React from "react";
import {
  Home,
  MessageSquare,
  DollarSign,
  ShoppingCart,
  Store,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";

const Sidebar = () => {
  const { user, handleLogout } = useAuth();
  const { sidebarTab, setSidebarTab } = useData();

  const sidebarItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "chatbot", icon: MessageSquare, label: "Chatbot" },
    { id: "profit", icon: DollarSign, label: "Profit Analysis" },
    { id: "amazon", icon: ShoppingCart, label: "Amazon Integration" },
    { id: "shopify", icon: Store, label: "Shopify Integration" },
  ];

  return (
    <div className="w-72 bg-white shadow-lg h-screen flex flex-col fixed top-0 left-0">
      {/* User Info */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-semibold">
              {user.name?.[0] || "U"}
            </div>
          )}
          <div>
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="p-4 flex-1">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setSidebarTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors cursor-pointer ${
              sidebarTab === item.id
                ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout Btn */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 border border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
