import React from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Chatbot from "../chatbot/Chatbot";
import ProfitAnalysis from "../profit/ProfitAnalysis";
import AmazonIntegration from "../integrations/AmazonIntegration";
import ShopifyIntegration from "../integrations/ShopifyIntegration";
import { useData } from "../../context/DataContext";

const DashboardLayout = () => {
  const { sidebarTab } = useData();

  const renderContent = () => {
    switch (sidebarTab) {
      case "dashboard":
        return <Dashboard />;
      case "chatbot":
        return <Chatbot />;
      case "profit":
        return <ProfitAnalysis />;
      case "amazon":
        return <AmazonIntegration />;
      case "shopify":
        return <ShopifyIntegration />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 overflow-auto ml-72">{renderContent()}</div>
    </div>
  );
};

export default DashboardLayout;
