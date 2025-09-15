import React from "react";
import { Store } from "lucide-react";

const ShopifyIntegration = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Shopify Integration
      </h1>

      <div className="bg-white rounded-xl shadow p-8 max-w-md mx-auto">
        <div className="text-center mb-6">
          <Store className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900">
            Connect to Shopify
          </h2>
          <p className="text-gray-600">Enter your Shopify store details</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="your-email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shop Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="your-shop-name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Token
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your API token"
            />
          </div>

          <button
            type="button"
            className="w-full bg-gradient-to-r from-green-500 to-green-600 
            text-white py-3 rounded-lg font-medium 
            hover:from-green-600 hover:to-green-700 transition-colors"
          >
            Connect to Shopify
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShopifyIntegration;
